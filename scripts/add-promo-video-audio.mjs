#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const defaults = {
  video: '.tmp/promo-video/exports/web-reverse-engineer-launch-16x9.mp4',
  background: '.tmp/promo-video/sounds/mariokhol-dark-ambient-sci-fi-documentary-268026.mp3',
  whoosh: '.tmp/promo-video/sounds/dragon-studio-simple-whoosh-03-433005.mp3',
  output: '.tmp/promo-video/exports/web-reverse-engineer-launch-16x9-audio.mp4',
  metadata: '.tmp/promo-video/metadata.json',
  backgroundVolume: 0.18,
  whooshVolume: 0.52,
  backgroundFadeIn: 1,
  backgroundFadeOut: 2,
  whooshPreroll: 0.05,
  whooshFadeOut: 0.45,
  audioBitrate: '192k',
};

function parseArgs(argv) {
  const options = { ...defaults };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--')) continue;

    const [key, inlineValue] = arg.slice(2).split('=');
    const nextValue = argv[index + 1]?.startsWith('--') ? '' : argv[index + 1];
    const value = (inlineValue ?? nextValue ?? '').trim();
    if (inlineValue === undefined && value) index += 1;

    if (key === 'video' && value) options.video = value;
    if (key === 'background' && value) options.background = value;
    if (key === 'whoosh' && value) options.whoosh = value;
    if (key === 'output' && value) options.output = value;
    if (key === 'metadata' && value) options.metadata = value;
    if (key === 'background-volume' && value) options.backgroundVolume = Number(value);
    if (key === 'whoosh-volume' && value) options.whooshVolume = Number(value);
    if (key === 'background-fade-in' && value) options.backgroundFadeIn = Number(value);
    if (key === 'background-fade-out' && value) options.backgroundFadeOut = Number(value);
    if (key === 'whoosh-preroll' && value) options.whooshPreroll = Number(value);
    if (key === 'whoosh-fade-out' && value) options.whooshFadeOut = Number(value);
    if (key === 'audio-bitrate' && value) options.audioBitrate = value;
  }

  return options;
}

const options = parseArgs(process.argv.slice(2));

function resolveRepoPath(value) {
  return path.isAbsolute(value) ? value : path.resolve(repoRoot, value);
}

function assertFiniteNumber(name, value, min = 0) {
  if (!Number.isFinite(value) || value < min) {
    throw new Error(`Invalid --${name} value: ${value}`);
  }
}

assertFiniteNumber('background-volume', options.backgroundVolume);
assertFiniteNumber('whoosh-volume', options.whooshVolume);
assertFiniteNumber('background-fade-in', options.backgroundFadeIn);
assertFiniteNumber('background-fade-out', options.backgroundFadeOut);
assertFiniteNumber('whoosh-preroll', options.whooshPreroll);
assertFiniteNumber('whoosh-fade-out', options.whooshFadeOut);

const videoPath = resolveRepoPath(options.video);
const backgroundPath = resolveRepoPath(options.background);
const whooshPath = resolveRepoPath(options.whoosh);
const outputPath = resolveRepoPath(options.output);
const metadataPath = resolveRepoPath(options.metadata);
const audioWorkDir = path.join(repoRoot, '.tmp', 'promo-video', 'audio-work');

function run(command, args, label) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    throw new Error(
      `${label} failed with exit code ${result.status}\n${result.stdout || ''}${result.stderr || ''}`,
    );
  }

  return result.stdout.trim();
}

function ffprobeJson(filePath) {
  const output = run(
    'ffprobe',
    ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', filePath],
    `ffprobe ${path.relative(repoRoot, filePath)}`,
  );

  return JSON.parse(output);
}

function getDurationSeconds(probe, filePath) {
  const streamDuration = probe.streams
    ?.map((stream) => Number(stream.duration))
    .find((duration) => Number.isFinite(duration) && duration > 0);
  const formatDuration = Number(probe.format?.duration);
  const duration = streamDuration || formatDuration;

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`Could not determine duration for ${path.relative(repoRoot, filePath)}`);
  }

  return duration;
}

function getAudioStream(probe, filePath) {
  const stream = probe.streams?.find((candidate) => candidate.codec_type === 'audio');
  if (!stream) throw new Error(`No audio stream found in ${path.relative(repoRoot, filePath)}`);
  return stream;
}

async function readMetadataScenes() {
  if (!existsSync(metadataPath)) return null;
  const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
  return Array.isArray(metadata.scenes) ? metadata.scenes : null;
}

function deriveWhooshEvents(scenes) {
  if (!scenes) {
    return [
      { name: 'Transform to Clyde', start: 10.2, seconds: 4 },
      { name: 'Transform to Ochi', start: 19.7, seconds: 4 },
      { name: 'Transform to Stripe', start: 30.2, seconds: 4 },
    ];
  }

  let offset = 0;
  const events = [];

  for (const scene of scenes) {
    const seconds = Number(scene.seconds);
    if (!Number.isFinite(seconds) || seconds <= 0) continue;

    if (scene.type === 'wipe') {
      events.push({
        name: scene.name,
        start: offset,
        seconds,
      });
    }

    offset += seconds;
  }

  if (events.length === 0) {
    throw new Error('No wipe scenes found in metadata and fallback was not used');
  }

  return events;
}

function seconds(value) {
  return Number(value.toFixed(3));
}

function buildFilter({ videoDuration, whooshDuration, events }) {
  const fadeOutStart = Math.max(0, videoDuration - options.backgroundFadeOut);
  const filters = [
    `[1:a]atrim=0:${seconds(videoDuration)},asetpts=PTS-STARTPTS,` +
      `afade=t=in:st=0:d=${seconds(options.backgroundFadeIn)},` +
      `afade=t=out:st=${seconds(fadeOutStart)}:d=${seconds(options.backgroundFadeOut)},` +
      `volume=${options.backgroundVolume}[bg]`,
  ];

  const mixInputs = ['[bg]'];

  events.forEach((event, index) => {
    const inputIndex = index + 2;
    const trimDuration = Math.min(Number(event.seconds) || 4, whooshDuration);
    const fadeStart = Math.max(0, trimDuration - options.whooshFadeOut);
    const delayMs = Math.max(0, Math.round((event.start - options.whooshPreroll) * 1000));
    const label = `w${index}`;

    filters.push(
      `[${inputIndex}:a]atrim=0:${seconds(trimDuration)},asetpts=PTS-STARTPTS,` +
        `afade=t=out:st=${seconds(fadeStart)}:d=${seconds(options.whooshFadeOut)},` +
        `volume=${options.whooshVolume},adelay=${delayMs}|${delayMs}[${label}]`,
    );
    mixInputs.push(`[${label}]`);
  });

  filters.push(
    `${mixInputs.join('')}amix=inputs=${mixInputs.length}:duration=first:normalize=0,` +
      'alimiter=limit=0.95,aresample=48000[aout]',
  );

  return filters.join(';');
}

async function main() {
  for (const filePath of [videoPath, backgroundPath, whooshPath]) {
    if (!existsSync(filePath)) {
      throw new Error(`Missing required input: ${path.relative(repoRoot, filePath)}`);
    }
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await mkdir(audioWorkDir, { recursive: true });

  const videoProbe = ffprobeJson(videoPath);
  const backgroundProbe = ffprobeJson(backgroundPath);
  const whooshProbe = ffprobeJson(whooshPath);
  const videoDuration = getDurationSeconds(videoProbe, videoPath);
  const backgroundDuration = getDurationSeconds(backgroundProbe, backgroundPath);
  const whooshDuration = getDurationSeconds(whooshProbe, whooshPath);
  const backgroundAudioStream = getAudioStream(backgroundProbe, backgroundPath);
  const whooshAudioStream = getAudioStream(whooshProbe, whooshPath);
  const scenes = await readMetadataScenes();
  const events = deriveWhooshEvents(scenes);
  const filterComplex = buildFilter({ videoDuration, whooshDuration, events });

  const args = [
    '-y',
    '-i',
    videoPath,
    '-stream_loop',
    '-1',
    '-i',
    backgroundPath,
  ];

  for (const _event of events) {
    args.push('-i', whooshPath);
  }

  args.push(
    '-filter_complex',
    filterComplex,
    '-map',
    '0:v:0',
    '-map',
    '[aout]',
    '-map_metadata',
    '0',
    '-c:v',
    'copy',
    '-c:a',
    'aac',
    '-b:a',
    options.audioBitrate,
    '-movflags',
    '+faststart',
    '-shortest',
    outputPath,
  );

  run('ffmpeg', args, 'ffmpeg audio mix');

  const outputStats = await stat(outputPath);
  const report = {
    output: path.relative(repoRoot, outputPath),
    sourceVideo: path.relative(repoRoot, videoPath),
    background: path.relative(repoRoot, backgroundPath),
    whoosh: path.relative(repoRoot, whooshPath),
    videoDurationSeconds: seconds(videoDuration),
    backgroundDurationSeconds: seconds(backgroundDuration),
    whooshDurationSeconds: seconds(whooshDuration),
    backgroundAudio: {
      codec: backgroundAudioStream.codec_name,
      sampleRate: backgroundAudioStream.sample_rate,
      channels: backgroundAudioStream.channels,
    },
    whooshAudio: {
      codec: whooshAudioStream.codec_name,
      sampleRate: whooshAudioStream.sample_rate,
      channels: whooshAudioStream.channels,
    },
    outputAudio: {
      codec: 'aac',
      bitrate: options.audioBitrate,
    },
    videoCodec: 'copied',
    backgroundVolume: options.backgroundVolume,
    whooshVolume: options.whooshVolume,
    backgroundFadeInSeconds: options.backgroundFadeIn,
    backgroundFadeOutSeconds: options.backgroundFadeOut,
    whooshPrerollSeconds: options.whooshPreroll,
    whooshFadeOutSeconds: options.whooshFadeOut,
    whooshEvents: events.map((event) => ({
      name: event.name,
      startSeconds: seconds(Math.max(0, event.start - options.whooshPreroll)),
      sceneStartSeconds: seconds(event.start),
      sceneDurationSeconds: seconds(event.seconds),
    })),
    sizeBytes: outputStats.size,
    sizeMB: Number((outputStats.size / 1024 / 1024).toFixed(2)),
  };

  const reportPath = path.join(audioWorkDir, `${path.basename(outputPath, '.mp4')}.json`);
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
