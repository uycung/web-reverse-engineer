#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const defaults = {
  baseUrl: 'http://127.0.0.1:3000',
  fps: 30,
  viewportWidth: 1920,
  viewportHeight: 1080,
  crf: 18,
  previewCrf: 25,
  preset: 'medium',
  frameType: 'jpeg',
  frameQuality: 96,
};

function parseArgs(argv) {
  return argv.reduce(
    (options, arg) => {
      if (!arg.startsWith('--')) return options;

      const [key, rawValue = ''] = arg.slice(2).split('=');
      const value = rawValue.trim();

      if (key === 'base-url' && value) options.baseUrl = value.replace(/\/$/, '');
      if (key === 'fps' && value) options.fps = Number(value);
      if (key === 'viewport' && value.includes('x')) {
        const [width, height] = value.split('x').map(Number);
        options.viewportWidth = width;
        options.viewportHeight = height;
      }
      if (key === 'crf' && value) options.crf = Number(value);
      if (key === 'preview-crf' && value) options.previewCrf = Number(value);
      if (key === 'preset' && value) options.preset = value;
      if (key === 'frame-type' && ['jpeg', 'png'].includes(value)) options.frameType = value;
      if (key === 'frame-quality' && value) options.frameQuality = Number(value);
      if (key === 'no-preview') options.preview = false;
      if (key === 'encode-only') options.encodeOnly = true;

      return options;
    },
    { ...defaults, preview: true },
  );
}

const options = parseArgs(process.argv.slice(2));

if (!Number.isFinite(options.fps) || options.fps < 1) {
  throw new Error(`Invalid --fps value: ${options.fps}`);
}

if (!Number.isFinite(options.viewportWidth) || !Number.isFinite(options.viewportHeight)) {
  throw new Error(`Invalid --viewport value: ${options.viewportWidth}x${options.viewportHeight}`);
}

if (!Number.isFinite(options.crf) || options.crf < 0 || options.crf > 51) {
  throw new Error(`Invalid --crf value: ${options.crf}`);
}

if (!Number.isFinite(options.previewCrf) || options.previewCrf < 0 || options.previewCrf > 51) {
  throw new Error(`Invalid --preview-crf value: ${options.previewCrf}`);
}

const tmpDir = path.join(repoRoot, '.tmp', 'promo-video');
const frameDir = path.join(tmpDir, 'frames');
const stillDir = path.join(tmpDir, 'preview-stills');
const exportDir = path.join(tmpDir, 'exports');
const extension = options.frameType === 'png' ? 'png' : 'jpg';
const framePattern = path.join(frameDir, `frame-%05d.${extension}`);
const metadataPath = path.join(tmpDir, 'metadata.json');
const contactSheetPath = path.join(tmpDir, 'contact-sheet.png');
const outputPath = path.join(exportDir, 'web-reverse-engineer-launch-16x9.mp4');
const previewOutputPath = path.join(exportDir, 'web-reverse-engineer-launch-16x9-preview.mp4');

const browserFrame = {
  x: 96,
  y: 232,
  width: 1728,
  height: 804,
  chrome: 44,
};

browserFrame.contentX = browserFrame.x;
browserFrame.contentY = browserFrame.y + browserFrame.chrome;
browserFrame.contentWidth = browserFrame.width;
browserFrame.contentHeight = browserFrame.height - browserFrame.chrome;

const creatorIdentity = {
  handle: '@uycung',
  platforms: [
    { label: 'GitHub', mark: 'GH' },
    { label: 'Substack', mark: 'S' },
    { label: 'LinkedIn', mark: 'in' },
  ],
};

const storyboard = [
  {
    type: 'card',
    name: 'Hook',
    seconds: 3.2,
    tone: 'hook',
    title: 'Turn web inspiration into original UI.',
    subtitle: 'A clean-room skill for AI coding agents.',
  },
  {
    type: 'hold',
    name: 'User problem',
    route: '/sample',
    seconds: 4,
    label: 'Your page',
    title: 'Start with your page.',
    subtitle: 'Then give your agent a public reference.',
    urlLabel: '/sample',
  },
  {
    type: 'principle',
    name: 'Principle extraction',
    seconds: 3,
    title: 'Study behavior, not source.',
    subtitle: 'Motion · hierarchy · interaction · constraints',
  },
  {
    type: 'wipe',
    name: 'Transform to Clyde',
    fromRoute: '/sample',
    toRoute: '/demos/joinclyde-background-field',
    seconds: 4,
    label: 'Result 01',
    title: 'Ambient motion from observed principles',
    subtitle: '',
    urlLabel: '/demos/joinclyde-background-field',
  },
  {
    type: 'hold',
    name: 'Clyde demo hold',
    route: '/demos/joinclyde-background-field',
    seconds: 5.5,
    label: 'Original implementation',
    title: 'Original Canvas 2D background field',
    subtitle: 'No copied code. No copied assets.',
    urlLabel: '/demos/joinclyde-background-field',
  },
  {
    type: 'wipe',
    name: 'Transform to Ochi',
    fromRoute: '/sample',
    toRoute: '/demos/field-supply-ochi-interactions-inspired',
    seconds: 4,
    label: 'Result 02',
    title: 'Pointer-aware interaction',
    subtitle: '',
    urlLabel: '/demos/field-supply-ochi-interactions-inspired',
  },
  {
    type: 'hold',
    name: 'Ochi demo hold',
    route: '/demos/field-supply-ochi-interactions-inspired',
    seconds: 6.5,
    label: 'Clean-room interaction',
    title: 'Interaction math, rebuilt clean-room',
    subtitle: 'Eyes track the cursor · rows respond',
    urlLabel: '/demos/field-supply-ochi-interactions-inspired',
    cursor: true,
    interact: async ({ stagePage, routePage, progress }) => {
      const { contentWidth } = browserFrame;

      if (progress < 0.46) {
        await routePage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        const local = progress / 0.46;
        const eased = easeOutCubic(Math.min(1, local));
        const x = contentWidth * (0.92 - eased * 0.2);
        const y = 160 + eased * 210;
        await moveCursor(stagePage, routePage, x, y, 5);
        return;
      }

      await routePage.evaluate(() => window.scrollTo({ top: 820, behavior: 'instant' }));
      const local = (progress - 0.46) / 0.54;
      const eased = easeOutCubic(Math.min(1, local));
      const x = 340 + eased * 920;
      const y = 410 + Math.sin(eased * Math.PI) * 82;
      await moveCursor(stagePage, routePage, x, y, 5);
    },
  },
  {
    type: 'wipe',
    name: 'Transform to Stripe',
    fromRoute: '/sample',
    toRoute: '/demos/field-supply-stripe-sessions-inspired',
    seconds: 4,
    label: 'Result 03',
    title: 'Procedural hero motion',
    subtitle: '',
    urlLabel: '/demos/field-supply-stripe-sessions-inspired',
  },
  {
    type: 'hold',
    name: 'Stripe demo hold',
    route: '/demos/field-supply-stripe-sessions-inspired',
    seconds: 5.5,
    label: 'Canvas 2D',
    title: 'Canvas 2D sine-wave animation',
    subtitle: 'Runtime behavior becomes reusable code',
    urlLabel: '/demos/field-supply-stripe-sessions-inspired',
  },
  {
    type: 'recap',
    name: 'Why it matters',
    seconds: 5,
    title: 'Not a website copier.',
    lines: [
      'Studies runtime behavior.',
      'Extracts design principles.',
      'Guides original implementation.',
    ],
    footer: 'Works as a portable SKILL.md workflow.',
  },
  {
    type: 'install',
    name: 'Final CTA',
    seconds: 6,
    title: 'Use it with your coding agent.',
    subtitle: 'Portable SKILL.md workflow. Clean-room by design.',
    command: 'npm install web-reverse-engineer',
    footer: 'web-reverse-engineer · Live demos · SKILL.md',
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function socialBadgesHtml({ prefix = '' } = {}) {
  const badges = creatorIdentity.platforms
    .map(
      (platform) => `
        <span class="social-badge">
          <span class="social-badge__mark">${escapeHtml(platform.mark)}</span>
          <span>${escapeHtml(platform.label)}</span>
        </span>
      `,
    )
    .join('');

  return `
    <div class="creator-strip">
      ${prefix ? `<span class="creator-strip__prefix">${escapeHtml(prefix)}</span>` : ''}
      <strong>${escapeHtml(creatorIdentity.handle)}</strong>
      <span class="creator-strip__divider"></span>
      <span class="creator-strip__badges">${badges}</span>
    </div>
  `;
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function routeUrl(route) {
  return `${options.baseUrl}${route}`;
}

function baseCss() {
  return `
    :root {
      color-scheme: dark;
      --paper: #f4f0e8;
      --ink: #111312;
      --moss: #aebd73;
      --accent: #d7f75b;
      --cyan: #8ad7ff;
      --rust: #ce7350;
      --progress: 0;
      --wipe-progress: 0;
    }
    * { box-sizing: border-box; }
    html,
    body {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #090a0b;
      color: #f7f4eb;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      text-rendering: geometricPrecision;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background:
        radial-gradient(circle at calc(24% + var(--progress) * 8%) 18%, rgba(215, 247, 91, 0.17), transparent 32%),
        radial-gradient(circle at 82% calc(78% - var(--progress) * 7%), rgba(138, 215, 255, 0.14), transparent 34%),
        linear-gradient(135deg, #090a0b 0%, #151719 46%, #08090a 100%);
    }
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      opacity: 0.18;
      background-image:
        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px);
      background-size: 48px 48px;
      transform: translate3d(calc(var(--progress) * -18px), calc(var(--progress) * -12px), 0);
      mask-image: radial-gradient(circle at 50% 52%, black 0%, transparent 78%);
    }
    .stage {
      position: relative;
      z-index: 1;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    .caption {
      position: absolute;
      left: 96px;
      top: 42px;
      z-index: 8;
      display: grid;
      max-width: 980px;
      gap: 9px;
    }
    .caption__label {
      width: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      background: rgba(12, 14, 15, 0.7);
      padding: 7px 11px;
      color: var(--accent);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      box-shadow: 0 12px 34px rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(14px) saturate(1.2);
      opacity: min(1, var(--progress) * 7);
      transform: translate3d(calc((1 - min(1, var(--progress) * 7)) * -22px), 0, 0);
    }
    .caption__title {
      max-width: 860px;
      color: #fffdf4;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 46px;
      font-weight: 900;
      line-height: 0.96;
      letter-spacing: 0;
      text-shadow: 0 2px 28px rgba(0, 0, 0, 0.36);
      opacity: min(1, var(--progress) * 5);
      transform: translate3d(calc((1 - min(1, var(--progress) * 5)) * 82px), 0, 0);
    }
    .caption__subtitle {
      max-width: 760px;
      color: rgba(247, 244, 235, 0.75);
      font-size: 19px;
      font-weight: 700;
      line-height: 1.25;
      text-shadow: 0 1px 18px rgba(0, 0, 0, 0.34);
      opacity: min(1, max(0, (var(--progress) - 0.08) * 6));
      transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - 0.08) * 6))) * 16px), 0);
    }
    .browser {
      position: absolute;
      left: ${browserFrame.x}px;
      top: ${browserFrame.y}px;
      width: ${browserFrame.width}px;
      height: ${browserFrame.height}px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      background: #111312;
      box-shadow:
        0 38px 110px rgba(0, 0, 0, 0.46),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
      transform: none;
      transform-origin: center bottom;
    }
    .browser__bar {
      height: ${browserFrame.chrome}px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.11);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
        rgba(17, 19, 18, 0.94);
      padding: 0 17px;
    }
    .browser__dots {
      display: inline-flex;
      gap: 8px;
    }
    .browser__dots span {
      width: 11px;
      height: 11px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.32);
    }
    .browser__dots span:nth-child(1) { background: #ff7369; }
    .browser__dots span:nth-child(2) { background: #ffcb58; }
    .browser__dots span:nth-child(3) { background: #75d779; }
    .browser__url {
      flex: 1;
      min-width: 0;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.23);
      padding: 7px 14px;
      color: rgba(247, 244, 235, 0.72);
      font-size: 13px;
      font-weight: 750;
      letter-spacing: 0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .browser__viewport {
      position: relative;
      height: calc(100% - ${browserFrame.chrome}px);
      overflow: hidden;
      background: #f3f0e8;
      isolation: isolate;
    }
    .route-frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
      background: #f3f0e8;
      object-fit: cover;
    }
    .route-frame--demo {
      z-index: 2;
      clip-path: inset(0 0 0 calc((1 - var(--wipe-progress)) * 100%));
      will-change: clip-path;
    }
    .scan {
      position: absolute;
      z-index: 5;
      top: -5%;
      bottom: -5%;
      left: calc((1 - var(--wipe-progress)) * 100%);
      width: 4px;
      transform: translateX(-50%);
      background: #f7fff1;
      box-shadow:
        0 0 13px rgba(215, 247, 91, 0.95),
        0 0 36px rgba(138, 215, 255, 0.64),
        0 0 76px rgba(215, 247, 91, 0.4);
    }
    .scan::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: -46px;
      width: 104px;
      background:
        linear-gradient(90deg, rgba(215, 247, 91, 0.38), rgba(138, 215, 255, 0.2), transparent),
        repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0 1px, transparent 1px 9px);
      filter: blur(10px);
      opacity: 0.88;
    }
    .scan::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: -18px;
      width: 26px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.36), transparent);
      filter: blur(6px);
    }
    .cursor {
      position: absolute;
      z-index: 9;
      left: 0;
      top: 0;
      width: 30px;
      height: 30px;
      border: 2px solid #0d0f0f;
      border-radius: 999px;
      background: rgba(215, 247, 91, 0.82);
      box-shadow:
        0 0 0 7px rgba(247, 244, 235, 0.72),
        0 18px 42px rgba(0, 0, 0, 0.28);
      transform: translate3d(-120px, -120px, 0);
      pointer-events: none;
    }
  `;
}

function browserChrome(urlLabel) {
  return `
    <div class="browser__bar">
      <span class="browser__dots" aria-hidden="true"><span></span><span></span><span></span></span>
      <div class="browser__url">${escapeHtml(urlLabel)}</div>
    </div>
  `;
}

function captionHtml(scene) {
  return `
    <section class="caption">
      <div class="caption__label">${escapeHtml(scene.label)}</div>
      <div class="caption__title">${escapeHtml(scene.title)}</div>
      ${scene.subtitle ? `<div class="caption__subtitle">${escapeHtml(scene.subtitle)}</div>` : ''}
    </section>
  `;
}

function routeStageHtml(scene) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${baseCss()}</style>
  </head>
  <body>
    <main class="stage">
      ${captionHtml(scene)}
      <section class="browser">
        ${browserChrome(scene.urlLabel || scene.route)}
        <div class="browser__viewport">
          <img class="route-frame" id="demo-image" alt="">
        </div>
      </section>
      ${scene.cursor ? '<div class="cursor" id="promo-cursor"></div>' : ''}
    </main>
  </body>
</html>`;
}

function wipeStageHtml(scene) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${baseCss()}</style>
  </head>
  <body>
    <main class="stage">
      ${captionHtml(scene)}
      <section class="browser">
        ${browserChrome(scene.urlLabel || scene.toRoute)}
        <div class="browser__viewport">
          <img class="route-frame" id="baseline-image" alt="">
          <img class="route-frame route-frame--demo" id="demo-image" alt="">
          <div class="scan" aria-hidden="true"></div>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

function wordsHtml(value) {
  return String(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => `<span style="--i:${index}">${escapeHtml(word)}</span>`)
    .join(' ');
}

function cardStageHtml(scene) {
  const hasCommand = Boolean(scene.command);
  const isClosing = scene.tone === 'closing';
  const isHook = scene.tone === 'hook';

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${baseCss()}
      .card-stage {
        position: relative;
        z-index: 2;
        display: grid;
        min-height: 100vh;
        align-content: center;
        padding: 86px 116px;
      }
      .brand-rule {
        position: absolute;
        left: 96px;
        right: 96px;
        top: 54px;
        display: flex;
        justify-content: space-between;
        color: rgba(247, 244, 235, 0.58);
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .creator-strip {
        position: absolute;
        left: 116px;
        bottom: 294px;
        display: inline-flex;
        align-items: center;
        gap: 13px;
        width: fit-content;
        color: rgba(247, 244, 235, 0.66);
        font-size: 17px;
        font-weight: 850;
        letter-spacing: 0.01em;
        opacity: min(1, max(0, (var(--progress) - 0.34) * 8));
        transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - 0.34) * 8))) * 18px), 0);
      }
      .creator-strip strong {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 18px;
      }
      .creator-strip__prefix {
        color: rgba(247, 244, 235, 0.48);
      }
      .creator-strip__divider {
        width: 1px;
        height: 20px;
        background: rgba(247, 244, 235, 0.18);
      }
      .creator-strip__badges {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .social-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: 1px solid rgba(247, 244, 235, 0.13);
        border-radius: 999px;
        background: rgba(247, 244, 235, 0.035);
        padding: 6px 10px 6px 7px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }
      .social-badge__mark {
        display: grid;
        width: 24px;
        height: 24px;
        place-items: center;
        border-radius: 6px;
        background: rgba(215, 247, 91, 0.1);
        color: var(--accent);
        font-size: 10px;
        font-weight: 950;
        letter-spacing: 0;
        text-transform: none;
      }
      .title-block {
        max-width: ${isClosing ? '980px' : '1240px'};
      }
      h1 {
        margin: 0;
        max-width: 1240px;
        color: #fffdf4;
        font-family: Georgia, "Times New Roman", serif;
        font-size: ${isClosing ? '112px' : '106px'};
        font-weight: 950;
        line-height: ${isClosing ? '0.86' : '0.9'};
        letter-spacing: 0;
        opacity: min(1, var(--progress) * 7);
        transform: translate3d(calc((1 - min(1, var(--progress) * 7)) * 160px), 0, 0);
      }
      .subtitle {
        display: flex;
        flex-wrap: wrap;
        gap: 0 0.34em;
        margin-top: 28px;
        max-width: 980px;
        color: rgba(247, 244, 235, 0.78);
        font-size: ${isClosing ? '34px' : '32px'};
        font-weight: 760;
        line-height: 1.1;
      }
      .subtitle span {
        display: inline-block;
        opacity: min(1, max(0, (var(--progress) - (0.18 + var(--i) * 0.035)) * 12));
        transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - (0.18 + var(--i) * 0.035)) * 12))) * 28px), 0);
      }
      .kicker {
        margin-top: 24px;
        max-width: 760px;
        color: rgba(247, 244, 235, 0.54);
        font-size: ${isClosing ? '18px' : '20px'};
        font-weight: 750;
        line-height: 1.25;
        opacity: min(1, max(0, (var(--progress) - 0.46) * 7));
        transform: translate3d(calc((1 - min(1, max(0, (var(--progress) - 0.46) * 7))) * -28px), 0, 0);
      }
      .command {
        display: inline-flex;
        width: fit-content;
        margin-top: 30px;
        border: 1px solid rgba(215, 247, 91, 0.32);
        border-radius: 14px;
        background: rgba(8, 9, 9, 0.76);
        padding: 18px 24px;
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 30px;
        font-weight: 900;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
      }
      .tiles {
        position: absolute;
        right: 106px;
        bottom: 86px;
        display: grid;
        grid-template-columns: repeat(3, 116px);
        gap: 14px;
        opacity: min(0.78, max(0.26, var(--progress) * 1.4));
      }
      .tile {
        aspect-ratio: 1;
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 18px;
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.12), transparent),
          rgba(255, 255, 255, 0.035);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
      }
      .tile:nth-child(2) { background-color: rgba(215, 247, 91, 0.3); transform: translateY(-22px); }
      .tile:nth-child(4) { background-color: rgba(206, 115, 80, 0.22); }
      .tile:nth-child(5) { background-color: rgba(138, 215, 255, 0.2); transform: translateY(-22px); }
    </style>
  </head>
  <body>
    <main class="card-stage">
      <div class="brand-rule"><span>web-reverse-engineer</span><span>SKILL.md</span></div>
      <section class="title-block">
        <h1>${escapeHtml(scene.title)}</h1>
        <div class="subtitle">${wordsHtml(scene.subtitle)}</div>
        ${hasCommand ? `<div class="command">${escapeHtml(scene.command)}</div>` : ''}
        ${scene.kicker ? `<div class="kicker">${escapeHtml(scene.kicker)}</div>` : ''}
      </section>
      ${isHook ? socialBadgesHtml({ prefix: 'by' }) : ''}
      <div class="tiles" aria-hidden="true">
        <div class="tile"></div><div class="tile"></div><div class="tile"></div>
        <div class="tile"></div><div class="tile"></div><div class="tile"></div>
      </div>
    </main>
  </body>
</html>`;
}

function beatStageHtml(scene) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${baseCss()}
      .beat {
        position: relative;
        z-index: 2;
        display: grid;
        min-height: 100vh;
        place-items: center;
        text-align: center;
      }
      .beat__wipe {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(215, 247, 91, 0.36), rgba(138, 215, 255, 0.2), transparent);
        opacity: 0.65;
        transform: translate3d(calc(-88% + var(--progress) * 176%), 0, 0) skewX(-12deg);
        filter: blur(10px);
      }
      .beat__content {
        position: relative;
        z-index: 2;
        opacity: calc(0.4 + var(--progress) * 0.6);
        transform: translate3d(0, calc((1 - var(--progress)) * 12px), 0);
      }
      h2 {
        margin: 0;
        color: #fffdf4;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 84px;
        line-height: 0.9;
        letter-spacing: 0;
      }
      p {
        margin: 18px 0 0;
        color: rgba(247, 244, 235, 0.7);
        font-size: 34px;
        font-weight: 780;
      }
    </style>
  </head>
  <body>
    <main class="beat">
      <div class="beat__wipe" aria-hidden="true"></div>
      <section class="beat__content">
        <h2>${escapeHtml(scene.title)}</h2>
        <p>${escapeHtml(scene.subtitle)}</p>
      </section>
    </main>
  </body>
</html>`;
}

function principleStageHtml(scene) {
  const tokens = scene.subtitle.split(' · ').map((token) => `<span>${escapeHtml(token)}</span>`).join('');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${baseCss()}
      .principle {
        position: relative;
        z-index: 2;
        display: grid;
        min-height: 100vh;
        grid-template-columns: 0.92fr 1.08fr;
        align-items: center;
        gap: 70px;
        padding: 96px;
      }
      h2 {
        margin: 0;
        max-width: 780px;
        color: #fffdf4;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 92px;
        line-height: 0.92;
        letter-spacing: 0;
        opacity: min(1, var(--progress) * 6);
        transform: translate3d(calc((1 - min(1, var(--progress) * 6)) * -90px), 0, 0);
      }
      .principle__flow {
        position: relative;
        min-height: 520px;
        border-left: 1px solid rgba(247, 244, 235, 0.2);
        padding-left: 44px;
      }
      .flow-word {
        display: grid;
        gap: 8px;
        margin-bottom: 38px;
        opacity: min(1, max(0, (var(--progress) - var(--delay)) * 7));
        transform: translate3d(calc((1 - min(1, max(0, (var(--progress) - var(--delay)) * 7))) * 80px), 0, 0);
      }
      .flow-word small {
        color: var(--accent);
        font-size: 13px;
        font-weight: 950;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .flow-word strong {
        color: rgba(247, 244, 235, 0.9);
        font-size: 42px;
        line-height: 1;
      }
      .principle__line {
        position: absolute;
        left: 0;
        top: 74px;
        width: 2px;
        height: min(360px, calc(var(--progress) * 720px));
        background: linear-gradient(180deg, var(--accent), rgba(138, 215, 255, 0.88), transparent);
        box-shadow: 0 0 34px rgba(215, 247, 91, 0.42);
      }
      .tokens {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 44px;
        max-width: 720px;
      }
      .tokens span {
        border-bottom: 2px solid rgba(215, 247, 91, 0.6);
        padding-bottom: 8px;
        color: rgba(247, 244, 235, 0.72);
        font-size: 22px;
        font-weight: 850;
        opacity: min(1, max(0, (var(--progress) - 0.38) * 8));
      }
    </style>
  </head>
  <body>
    <main class="principle">
      <h2>${escapeHtml(scene.title)}</h2>
      <section class="principle__flow">
        <div class="principle__line" aria-hidden="true"></div>
        <div class="flow-word" style="--delay:0.1"><small>Reference</small><strong>public interface</strong></div>
        <div class="flow-word" style="--delay:0.24"><small>Extract</small><strong>observable principles</strong></div>
        <div class="flow-word" style="--delay:0.38"><small>Guide</small><strong>original implementation</strong></div>
        <div class="tokens">${tokens}</div>
      </section>
    </main>
  </body>
</html>`;
}

function recapStageHtml(scene) {
  const lines = scene.lines
    .map((line, index) => `<li style="--i:${index}"><span></span>${escapeHtml(line)}</li>`)
    .join('');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${baseCss()}
      .recap {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 0.94fr 1.06fr;
        min-height: 100vh;
        align-items: center;
        gap: 76px;
        padding: 96px;
      }
      .recap h2 {
        margin: 0;
        max-width: 760px;
        color: #fffdf4;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 104px;
        line-height: 0.86;
        letter-spacing: 0;
        opacity: min(1, var(--progress) * 6);
        transform: translate3d(calc((1 - min(1, var(--progress) * 6)) * -90px), 0, 0);
      }
      .recap__right {
        position: relative;
        border-left: 1px solid rgba(247, 244, 235, 0.18);
        padding-left: 46px;
      }
      .recap__right::before {
        content: "";
        position: absolute;
        left: -2px;
        top: 0;
        width: 3px;
        height: min(100%, calc(var(--progress) * 150%));
        background: linear-gradient(180deg, var(--accent), rgba(138, 215, 255, 0.82), transparent);
        box-shadow: 0 0 34px rgba(215, 247, 91, 0.32);
      }
      ul {
        display: grid;
        gap: 24px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: flex;
        align-items: center;
        gap: 16px;
        color: rgba(247, 244, 235, 0.9);
        font-size: 38px;
        font-weight: 860;
        line-height: 1.02;
        opacity: min(1, max(0, (var(--progress) - (0.18 + var(--i) * 0.12)) * 8));
        transform: translate3d(calc((1 - min(1, max(0, (var(--progress) - (0.18 + var(--i) * 0.12)) * 8))) * 90px), 0, 0);
      }
      li span {
        flex: 0 0 auto;
        width: 16px;
        height: 16px;
        border: 2px solid var(--accent);
        border-radius: 999px;
        box-shadow: 0 0 24px rgba(215, 247, 91, 0.45);
      }
      .recap__footer {
        margin-top: 50px;
        width: fit-content;
        border-top: 1px solid rgba(247, 244, 235, 0.18);
        padding-top: 18px;
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 22px;
        font-weight: 850;
        opacity: min(1, max(0, (var(--progress) - 0.66) * 7));
        transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - 0.66) * 7))) * 20px), 0);
      }
    </style>
  </head>
  <body>
    <main class="recap">
      <h2>${escapeHtml(scene.title)}</h2>
      <section class="recap__right">
        <ul>${lines}</ul>
        <div class="recap__footer">${escapeHtml(scene.footer)}</div>
      </section>
    </main>
  </body>
</html>`;
}

function installStageHtml(scene) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${baseCss()}
      .install {
        position: relative;
        z-index: 2;
        display: grid;
        min-height: 100vh;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 76px;
        padding: 96px 96px 132px;
      }
      h2 {
        margin: 0;
        max-width: 760px;
        color: #fffdf4;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 92px;
        line-height: 0.9;
        letter-spacing: 0;
        opacity: min(1, var(--progress) * 6);
        transform: translate3d(calc((1 - min(1, var(--progress) * 6)) * -90px), 0, 0);
      }
      p {
        margin: 26px 0 0;
        max-width: 720px;
        color: rgba(247, 244, 235, 0.7);
        font-size: 30px;
        font-weight: 760;
        line-height: 1.12;
        opacity: min(1, max(0, (var(--progress) - 0.16) * 8));
        transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - 0.16) * 8))) * 24px), 0);
      }
      .terminal {
        border: 1px solid rgba(247, 244, 235, 0.16);
        border-radius: 18px;
        background: rgba(6, 7, 7, 0.76);
        box-shadow: 0 36px 110px rgba(0, 0, 0, 0.42);
        overflow: hidden;
        opacity: min(1, max(0, (var(--progress) - 0.22) * 7));
        transform: translate3d(calc((1 - min(1, max(0, (var(--progress) - 0.22) * 7))) * 90px), 0, 0);
      }
      .install__right {
        display: grid;
        gap: 18px;
      }
      .terminal__bar {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 44px;
        border-bottom: 1px solid rgba(247, 244, 235, 0.12);
        padding: 0 16px;
      }
      .terminal__bar span {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: rgba(247, 244, 235, 0.28);
      }
      .terminal__bar span:nth-child(1) { background: #ff7369; }
      .terminal__bar span:nth-child(2) { background: #ffcb58; }
      .terminal__bar span:nth-child(3) { background: #75d779; }
      code {
        display: block;
        padding: 34px 30px 38px;
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 30px;
        font-weight: 900;
        letter-spacing: 0;
        white-space: nowrap;
        clip-path: inset(0 calc((1 - min(1, max(0, (var(--progress) - 0.26) * 12))) * 100%) 0 0);
      }
      .creator-strip {
        display: inline-flex;
        align-items: center;
        justify-self: end;
        gap: 12px;
        width: fit-content;
        color: rgba(247, 244, 235, 0.68);
        font-size: 17px;
        font-weight: 850;
        letter-spacing: 0.01em;
        opacity: min(1, max(0, (var(--progress) - 0.5) * 8));
        transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - 0.5) * 8))) * 18px), 0);
      }
      .creator-strip strong {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 18px;
      }
      .creator-strip__prefix {
        color: rgba(247, 244, 235, 0.48);
      }
      .creator-strip__divider {
        width: 1px;
        height: 22px;
        background: rgba(247, 244, 235, 0.18);
      }
      .creator-strip__badges {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .social-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: 1px solid rgba(247, 244, 235, 0.14);
        border-radius: 999px;
        background: rgba(247, 244, 235, 0.04);
        padding: 6px 10px 6px 7px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }
      .social-badge__mark {
        display: grid;
        width: 24px;
        height: 24px;
        place-items: center;
        border-radius: 6px;
        background: rgba(215, 247, 91, 0.1);
        color: var(--accent);
        font-size: 10px;
        font-weight: 950;
        letter-spacing: 0;
        text-transform: none;
      }
      .install__footer {
        position: absolute;
        left: 96px;
        right: 96px;
        bottom: 58px;
        display: flex;
        justify-content: space-between;
        gap: 32px;
        border-top: 1px solid rgba(247, 244, 235, 0.16);
        padding-top: 18px;
        color: rgba(247, 244, 235, 0.66);
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 0.02em;
        text-transform: none;
        opacity: min(1, max(0, (var(--progress) - 0.58) * 7));
        transform: translate3d(0, calc((1 - min(1, max(0, (var(--progress) - 0.58) * 7))) * 18px), 0);
      }
      .install__footer strong {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      }
    </style>
  </head>
  <body>
    <main class="install">
      <section>
        <h2>${escapeHtml(scene.title)}</h2>
        <p>${escapeHtml(scene.subtitle)}</p>
      </section>
      <section class="install__right">
        <div class="terminal">
          <div class="terminal__bar"><span></span><span></span><span></span></div>
          <code>${escapeHtml(scene.command)}</code>
        </div>
        ${socialBadgesHtml()}
      </section>
      <footer class="install__footer">
        <strong>web-reverse-engineer</strong>
        <span>${escapeHtml(scene.footer.replace(/^web-reverse-engineer · /, ''))}</span>
      </footer>
    </main>
  </body>
</html>`;
}

async function ensureAppIsReachable(baseUrl) {
  const response = await fetch(`${baseUrl}/sample`, { method: 'GET' }).catch((error) => {
    throw new Error(`Could not reach ${baseUrl}: ${error.message}`);
  });

  if (!response.ok) {
    throw new Error(`Expected ${baseUrl}/sample to return 2xx, received ${response.status}`);
  }
}

async function setStageContent(page, html) {
  await page.goto('about:blank', { waitUntil: 'domcontentloaded' });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function settleRoutePage(page) {
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page
    .waitForFunction(() => document.body?.innerText?.trim().length > 80, null, { timeout: 8000 })
    .catch(() => {});
  await page
    .evaluate(async () => {
      const existing = document.querySelector('#promo-video-capture-style');
      if (!existing) {
        const style = document.createElement('style');
        style.id = 'promo-video-capture-style';
        style.textContent = `
          html, body { scrollbar-width: none !important; }
          ::-webkit-scrollbar { display: none !important; }
        `;
        document.head.appendChild(style);
      }

      await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1200))]);
      await Promise.race([
        Promise.all(
          Array.from(document.images)
            .filter((image) => !image.complete)
            .map(
              (image) =>
                new Promise((resolve) => {
                  image.addEventListener('load', resolve, { once: true });
                  image.addEventListener('error', resolve, { once: true });
                }),
            ),
        ),
        new Promise((resolve) => setTimeout(resolve, 1600)),
      ]);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    })
    .catch(() => {});
}

async function prepareRoutePages(context) {
  const routes = [
    ...new Set(
      storyboard.flatMap((scene) => [scene.route, scene.fromRoute, scene.toRoute].filter(Boolean)),
    ),
  ];
  const pages = new Map();

  for (const route of routes) {
    console.log(`Preparing route layer: ${route}`);
    const page = await context.newPage();
    await page.setViewportSize({
      width: browserFrame.contentWidth,
      height: browserFrame.contentHeight,
    });
    await page.goto(routeUrl(route), { waitUntil: 'domcontentloaded' });
    await settleRoutePage(page);
    pages.set(route, page);
  }

  return pages;
}

async function captureRouteDataUrl(page) {
  const buffer = await page.screenshot({
    type: 'jpeg',
    quality: options.frameQuality,
    animations: 'allow',
    caret: 'hide',
    scale: 'css',
  });

  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

async function setStageImage(page, id, src) {
  await page.evaluate(
    ({ imageId, imageSrc }) => {
      const image = document.querySelector(`#${imageId}`);
      if (image instanceof HTMLImageElement) {
        image.src = imageSrc;
      }
    },
    { imageId: id, imageSrc: src },
  );
}

async function moveCursor(stagePage, routePage, x, y, steps = 2) {
  await routePage.mouse.move(x, y, { steps });
  await stagePage.evaluate(
    ({ left, top }) => {
      const cursor = document.querySelector('#promo-cursor');
      if (cursor instanceof HTMLElement) {
        cursor.style.transform = `translate3d(${left - 15}px, ${top - 15}px, 0)`;
      }
    },
    { left: browserFrame.contentX + x, top: browserFrame.contentY + y },
  );
}

async function captureFrame(page, frameNumber) {
  const framePath = path.join(frameDir, `frame-${String(frameNumber).padStart(5, '0')}.${extension}`);
  const optionsForType =
    options.frameType === 'jpeg' ? { type: 'jpeg', quality: options.frameQuality } : { type: 'png' };

  await page.screenshot({
    path: framePath,
    animations: 'allow',
    caret: 'hide',
    scale: 'css',
    ...optionsForType,
  });
}

async function captureSceneFrames({ page, scene, frameState, routePage, beforeCapture }) {
  const count = Math.round(scene.seconds * options.fps);

  for (let index = 0; index < count; index += 1) {
    const linear = count <= 1 ? 1 : index / (count - 1);
    const eased = easeInOutCubic(linear);
    const wipeProgress = scene.type === 'wipe' ? eased : linear;

    await page.evaluate(
      ({ progress, wipe }) => {
        document.documentElement.style.setProperty('--progress', String(progress));
        document.documentElement.style.setProperty('--wipe-progress', String(wipe));
      },
      { progress: linear, wipe: wipeProgress },
    );

    if (scene.interact) {
      await scene.interact({
        stagePage: page,
        routePage,
        progress: linear,
      });
    }

    if (beforeCapture) {
      await beforeCapture({ progress: linear, index });
    }

    await captureFrame(page, frameState.count);
    frameState.count += 1;
  }
}

async function captureCardScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}`);
  await setStageContent(page, cardStageHtml(scene));
  await captureSceneFrames({ page, scene, frameState });
}

async function captureBeatScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}`);
  await setStageContent(page, beatStageHtml(scene));
  await captureSceneFrames({ page, scene, frameState });
}

async function capturePrincipleScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}`);
  await setStageContent(page, principleStageHtml(scene));
  await captureSceneFrames({ page, scene, frameState });
}

async function captureRecapScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}`);
  await setStageContent(page, recapStageHtml(scene));
  await captureSceneFrames({ page, scene, frameState });
}

async function captureInstallScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}`);
  await setStageContent(page, installStageHtml(scene));
  await captureSceneFrames({ page, scene, frameState });
}

async function captureHoldScene(page, scene, frameState, routePages) {
  console.log(`Capturing ${scene.name}: ${scene.route}`);
  await setStageContent(page, routeStageHtml(scene));
  const routePage = routePages.get(scene.route);
  if (!routePage) throw new Error(`Route page not prepared for ${scene.route}`);
  await routePage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

  const useLiveRouteFrames = scene.route !== '/sample';
  if (!useLiveRouteFrames) {
    await setStageImage(page, 'demo-image', await captureRouteDataUrl(routePage));
  }

  if (scene.cursor) {
    await moveCursor(page, routePage, browserFrame.contentWidth * 0.79, 300);
  }

  await captureSceneFrames({
    page,
    scene,
    frameState,
    routePage,
    beforeCapture: useLiveRouteFrames
      ? async () => {
          await setStageImage(page, 'demo-image', await captureRouteDataUrl(routePage));
        }
      : null,
  });
}

async function captureWipeScene(page, scene, frameState, routePages) {
  console.log(`Capturing ${scene.name}: ${scene.fromRoute} -> ${scene.toRoute}`);
  await setStageContent(page, wipeStageHtml(scene));
  const baselinePage = routePages.get(scene.fromRoute);
  const demoPage = routePages.get(scene.toRoute);
  if (!baselinePage) throw new Error(`Route page not prepared for ${scene.fromRoute}`);
  if (!demoPage) throw new Error(`Route page not prepared for ${scene.toRoute}`);

  await baselinePage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await demoPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await setStageImage(page, 'baseline-image', await captureRouteDataUrl(baselinePage));
  await setStageImage(page, 'demo-image', await captureRouteDataUrl(demoPage));
  await captureSceneFrames({ page, scene, frameState });
}

function runFfmpeg(args, label) {
  const result = spawnSync('ffmpeg', args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    throw new Error(`${label} failed\n${result.stdout || ''}\n${result.stderr || ''}`.trim());
  }

  return result;
}

function selectedContactSheetFilter() {
  const picks = [];
  let cursor = 0;

  for (const scene of storyboard) {
    const frames = Math.round(scene.seconds * options.fps);
    const localPosition = scene.type === 'wipe' ? 0.5 : 0.58;
    picks.push(cursor + Math.max(0, Math.min(frames - 1, Math.floor(frames * localPosition))));
    cursor += frames;
  }

  const expression = [...new Set(picks)]
    .slice(0, 12)
    .map((index) => `eq(n\\,${index})`)
    .join('+');

  return `select=${expression},scale=480:270:flags=lanczos,tile=4x3:margin=18:padding=10:color=0x090a0b`;
}

async function encodeVideo(frameCount) {
  if (!existsSync(path.join(frameDir, `frame-00000.${extension}`))) {
    throw new Error('No frames were captured.');
  }

  await mkdir(exportDir, { recursive: true });
  await mkdir(stillDir, { recursive: true });

  runFfmpeg(
    [
      '-y',
      '-framerate',
      String(options.fps),
      '-i',
      framePattern,
      '-vf',
      'scale=in_range=pc:out_range=tv,format=yuv420p',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      String(options.crf),
      '-preset',
      options.preset,
      outputPath,
    ],
    'MP4 encoding',
  );

  if (options.preview) {
    runFfmpeg(
      [
        '-y',
        '-i',
        outputPath,
        '-c:v',
        'libx264',
        '-pix_fmt',
        'yuv420p',
        '-crf',
        String(options.previewCrf),
        '-preset',
        'veryfast',
        '-vf',
        'scale=1280:720:flags=lanczos:in_range=pc:out_range=tv,format=yuv420p',
        previewOutputPath,
      ],
      'Preview MP4 encoding',
    );
  }

  runFfmpeg(
    [
      '-y',
      '-framerate',
      String(options.fps),
      '-i',
      framePattern,
      '-vf',
      selectedContactSheetFilter(),
      '-frames:v',
      '1',
      '-update',
      '1',
      contactSheetPath,
    ],
    'Contact sheet generation',
  );

  const stillScenes = [
    ['hook', 0.55],
    ['user-problem', 0.58],
    ['principle-extraction', 0.58],
    ['clyde-wipe-midpoint', 0.5],
    ['clyde-hold', 0.58],
    ['ochi-wipe-midpoint', 0.5],
    ['ochi-hold', 0.58],
    ['stripe-wipe-midpoint', 0.5],
    ['stripe-hold', 0.58],
    ['why-it-matters', 0.58],
    ['final-cta', 0.78],
  ];
  const sceneByName = new Map(storyboard.map((scene) => [scene.name, scene]));
  const stillMap = [
    ['hook', 'Hook'],
    ['user-problem', 'User problem'],
    ['principle-extraction', 'Principle extraction'],
    ['clyde-wipe-midpoint', 'Transform to Clyde'],
    ['clyde-hold', 'Clyde demo hold'],
    ['ochi-wipe-midpoint', 'Transform to Ochi'],
    ['ochi-hold', 'Ochi demo hold'],
    ['stripe-wipe-midpoint', 'Transform to Stripe'],
    ['stripe-hold', 'Stripe demo hold'],
    ['why-it-matters', 'Why it matters'],
    ['final-cta', 'Final CTA'],
  ];
  const sceneOffsets = new Map();
  let offset = 0;
  for (const scene of storyboard) {
    sceneOffsets.set(scene.name, offset);
    offset += Math.round(scene.seconds * options.fps);
  }

  for (const [slug, sceneName] of stillMap) {
    const scene = sceneByName.get(sceneName);
    const position = stillScenes.find(([key]) => key === slug)?.[1] ?? 0.5;
    const frameIndex =
      sceneOffsets.get(sceneName) + Math.floor(Math.round(scene.seconds * options.fps) * position);
    const source = path.join(frameDir, `frame-${String(frameIndex).padStart(5, '0')}.${extension}`);
    const target = path.join(stillDir, `${slug}.jpg`);
    runFfmpeg(['-y', '-i', source, '-frames:v', '1', '-q:v', '2', target], `Still ${slug}`);
  }

  const outputStats = await stat(outputPath);
  const previewStats = options.preview && existsSync(previewOutputPath) ? await stat(previewOutputPath) : null;
  const metadata = {
    output: path.relative(repoRoot, outputPath),
    previewOutput: previewStats ? path.relative(repoRoot, previewOutputPath) : null,
    width: options.viewportWidth,
    height: options.viewportHeight,
    fps: options.fps,
    frameCount,
    durationSeconds: Number((frameCount / options.fps).toFixed(2)),
    codec: 'H.264',
    pixelFormat: 'yuv420p',
    crf: options.crf,
    previewCrf: previewStats ? options.previewCrf : null,
    sizeBytes: outputStats.size,
    sizeMB: Number((outputStats.size / 1024 / 1024).toFixed(2)),
    previewSizeBytes: previewStats?.size ?? null,
    previewSizeMB: previewStats ? Number((previewStats.size / 1024 / 1024).toFixed(2)) : null,
    baseUrl: options.baseUrl,
    viewport: `${options.viewportWidth}x${options.viewportHeight}`,
    frameType: options.frameType,
    temporaryFrameDir: path.relative(repoRoot, frameDir),
    contactSheet: path.relative(repoRoot, contactSheetPath),
    previewStillsDir: path.relative(repoRoot, stillDir),
    scenes: storyboard.map((scene) => ({
      name: scene.name,
      type: scene.type,
      seconds: scene.seconds,
      route: scene.route,
      fromRoute: scene.fromRoute,
      toRoute: scene.toRoute,
      title: scene.title,
      subtitle: scene.subtitle,
      label: scene.label,
    })),
  };

  await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(JSON.stringify(metadata, null, 2));
}

async function main() {
  if (options.encodeOnly) {
    const frameFiles = (await readdir(frameDir)).filter(
      (file) => file.startsWith('frame-') && file.endsWith(`.${extension}`),
    );
    await encodeVideo(frameFiles.length);
    return;
  }

  await ensureAppIsReachable(options.baseUrl);
  await rm(frameDir, { recursive: true, force: true });
  await rm(stillDir, { recursive: true, force: true });
  await mkdir(frameDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: options.viewportWidth, height: options.viewportHeight },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    colorScheme: 'light',
  });
  const page = await context.newPage();
  await page.setViewportSize({
    width: options.viewportWidth,
    height: options.viewportHeight,
  });

  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => {
    consoleErrors.push(error.message);
  });

  const frameState = { count: 0 };
  const routePages = await prepareRoutePages(context);

  try {
    for (const scene of storyboard) {
      if (scene.type === 'card') await captureCardScene(page, scene, frameState);
      if (scene.type === 'beat') await captureBeatScene(page, scene, frameState);
      if (scene.type === 'principle') await capturePrincipleScene(page, scene, frameState);
      if (scene.type === 'recap') await captureRecapScene(page, scene, frameState);
      if (scene.type === 'install') await captureInstallScene(page, scene, frameState);
      if (scene.type === 'hold') await captureHoldScene(page, scene, frameState, routePages);
      if (scene.type === 'wipe') await captureWipeScene(page, scene, frameState, routePages);
    }
  } finally {
    await browser.close();
  }

  await encodeVideo(frameState.count);

  if (consoleErrors.length > 0) {
    console.warn('Console errors captured during recording:');
    console.warn([...new Set(consoleErrors)].join('\n'));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
