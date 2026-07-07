#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const defaults = {
  baseUrl: 'http://127.0.0.1:3000',
  fps: 12,
  gifWidth: 960,
  viewportWidth: 1280,
  viewportHeight: 800,
};

function parseArgs(argv) {
  return argv.reduce(
    (options, arg) => {
      if (!arg.startsWith('--')) return options;

      const [key, rawValue = ''] = arg.slice(2).split('=');
      const value = rawValue.trim();

      if (key === 'base-url' && value) options.baseUrl = value.replace(/\/$/, '');
      if (key === 'fps' && value) options.fps = Number(value);
      if (key === 'gif-width' && value) options.gifWidth = Number(value);
      if (key === 'viewport' && value.includes('x')) {
        const [width, height] = value.split('x').map(Number);
        options.viewportWidth = width;
        options.viewportHeight = height;
      }

      return options;
    },
    { ...defaults },
  );
}

const options = parseArgs(process.argv.slice(2));

if (!Number.isFinite(options.fps) || options.fps < 1) {
  throw new Error(`Invalid --fps value: ${options.fps}`);
}

if (!Number.isFinite(options.gifWidth) || options.gifWidth < 320) {
  throw new Error(`Invalid --gif-width value: ${options.gifWidth}`);
}

const tmpDir = path.join(repoRoot, '.tmp', 'readme-gif');
const frameDir = path.join(tmpDir, 'story-frames');
const gifPath = path.join(repoRoot, 'docs', 'assets', 'web-reverse-engineer-demo.gif');
const palettePath = path.join(tmpDir, 'palette.png');
const metadataPath = path.join(tmpDir, 'metadata.json');
const contactSheetPath = path.join(tmpDir, 'contact-sheet.png');

const storyboard = [
  {
    type: 'card',
    name: 'Opening title',
    seconds: 3,
    eyebrow: 'Agent skill demo',
    title: 'web-reverse-engineer',
    subtitle: 'Study the interface. Rebuild it clean.',
    tone: 'opening',
  },
  {
    type: 'route',
    name: 'Baseline',
    route: '/sample',
    seconds: 3.5,
    label: 'BASELINE',
    title: 'One untouched source page',
    subtitle: 'Field Supply · neutral starting point',
    overlayTone: 'light',
  },
  {
    type: 'transition',
    name: 'Principles transition',
    seconds: 2.5,
    title: 'Extract principles, not pixels',
    subtitle: 'Motion · hierarchy · interaction · constraints',
  },
  {
    type: 'route',
    name: 'Clyde-inspired demo',
    route: '/demos/joinclyde-background-field',
    seconds: 6,
    label: 'DEMO 01',
    title: 'Ambient canvas motion',
    subtitle: 'Reference-inspired · original implementation',
    overlayTone: 'dark',
  },
  {
    type: 'transition',
    name: 'Behavior transition',
    seconds: 2.5,
    title: 'Same baseline, new behavior',
    subtitle: 'One source page becomes multiple clean-room directions',
  },
  {
    type: 'route',
    name: 'Ochi-inspired interactions',
    route: '/demos/field-supply-ochi-interactions-inspired',
    seconds: 6.5,
    label: 'DEMO 02',
    title: 'Pointer-aware interactions',
    subtitle: 'Eyes track the cursor · rows respond',
    overlayTone: 'light',
    cursor: true,
    interact: async (page, progress) => {
      if (progress < 0.58) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        const target = await page
          .locator('[data-field-eye]')
          .first()
          .boundingBox()
          .catch(() => null);
        const center = target
          ? { x: target.x + target.width * 1.5, y: target.y + target.height * 0.5 }
          : { x: 900, y: 415 };
        const radiusX = target ? target.width * 2.6 : 230;
        const radiusY = target ? target.height * 1.25 : 120;
        const angle = progress * Math.PI * 4.2;
        await moveVisibleCursor(
          page,
          center.x + Math.cos(angle) * radiusX,
          center.y + Math.sin(angle) * radiusY,
          2,
        );
        return;
      }

      await page.evaluate(() => window.scrollTo({ top: 820, behavior: 'instant' }));
      const localProgress = (progress - 0.58) / 0.42;
      const x = 170 + localProgress * 720;
      const y = 505 + Math.sin(localProgress * Math.PI * 2) * 75;
      await moveVisibleCursor(page, x, y, 2);
    },
  },
  {
    type: 'transition',
    name: 'Runtime transition',
    seconds: 2.5,
    title: 'Runtime mechanics become reusable patterns',
    subtitle: 'Canvas loops and interaction math become portable code',
  },
  {
    type: 'route',
    name: 'Stripe Sessions-inspired demo',
    route: '/demos/field-supply-stripe-sessions-inspired',
    seconds: 6,
    label: 'DEMO 03',
    title: 'Procedural hero animation',
    subtitle: 'Canvas 2D · sine-wave gradient plane',
    overlayTone: 'light',
  },
  {
    type: 'card',
    name: 'Closing card',
    seconds: 3.5,
    eyebrow: 'Build clean-room demos faster',
    title: 'Clean-room web inspiration for AI coding agents',
    subtitle: 'npm install web-reverse-engineer',
    footer: 'GitHub · Live demos · SKILL.md',
    tone: 'closing',
  },
];

async function ensureAppIsReachable(baseUrl) {
  const response = await fetch(baseUrl, { method: 'GET' }).catch((error) => {
    throw new Error(`Could not reach ${baseUrl}: ${error.message}`);
  });

  if (!response.ok) {
    throw new Error(`Expected ${baseUrl} to return 2xx, received ${response.status}`);
  }
}

async function settlePage(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images)
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            }),
        ),
    );
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function cardHtml(scene) {
  const isClosing = scene.tone === 'closing';
  const title = escapeHtml(scene.title);
  const subtitle = escapeHtml(scene.subtitle);
  const eyebrow = escapeHtml(scene.eyebrow);
  const footer = scene.footer ? escapeHtml(scene.footer) : '';

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      :root {
        color-scheme: light;
        --ink: #181715;
        --moss: #596547;
        --paper: #f3f0e8;
        --cream: #fbf7ea;
        --lime: #d5f05f;
        --rust: #b85d3b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at 78% 14%, rgba(213, 240, 95, 0.38), transparent 28%),
          radial-gradient(circle at 20% 86%, rgba(184, 93, 59, 0.16), transparent 25%),
          linear-gradient(135deg, var(--paper), var(--cream));
        color: var(--ink);
      }
      .grain {
        position: absolute;
        inset: 0;
        opacity: 0.16;
        background-image:
          linear-gradient(90deg, rgba(24, 23, 21, 0.055) 1px, transparent 1px),
          linear-gradient(rgba(24, 23, 21, 0.045) 1px, transparent 1px);
        background-size: 42px 42px;
        transform: translate3d(calc(var(--progress, 0) * -16px), calc(var(--progress, 0) * -10px), 0);
      }
      .sweep {
        position: absolute;
        inset: auto -15% 14% -15%;
        height: 28%;
        background: linear-gradient(90deg, transparent, rgba(89, 101, 71, 0.18), rgba(213, 240, 95, 0.42), transparent);
        filter: blur(18px);
        transform: translate3d(calc(-30% + var(--progress, 0) * 65%), 0, 0) rotate(-4deg);
      }
      .rule {
        position: absolute;
        left: 56px;
        right: 56px;
        top: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.11em;
        text-transform: uppercase;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .mark {
        display: grid;
        width: 24px;
        height: 24px;
        place-items: center;
        border-radius: 6px;
        background: var(--moss);
        color: var(--cream);
        font-size: 11px;
      }
      .stage {
        position: relative;
        z-index: 2;
        display: grid;
        min-height: 100vh;
        align-content: center;
        padding: 88px 72px 78px;
      }
      .content {
        max-width: ${isClosing ? '910px' : '880px'};
        transform: translate3d(0, calc((1 - var(--progress, 0)) * 18px), 0);
        opacity: calc(0.24 + var(--progress, 0) * 0.76);
      }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        margin-bottom: 24px;
        border: 1px solid rgba(24, 23, 21, 0.16);
        border-radius: 999px;
        background: rgba(251, 247, 234, 0.72);
        padding: 8px 12px;
        color: var(--moss);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        max-width: 940px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: ${isClosing ? '76px' : '104px'};
        line-height: ${isClosing ? '0.94' : '0.86'};
        letter-spacing: 0;
        text-transform: ${isClosing ? 'none' : 'uppercase'};
      }
      p {
        margin: 30px 0 0;
        max-width: 700px;
        color: rgba(24, 23, 21, 0.72);
        font-size: ${isClosing ? '34px' : '32px'};
        font-weight: ${isClosing ? '800' : '650'};
        line-height: 1.18;
      }
      .command {
        display: inline-flex;
        width: fit-content;
        margin-top: 30px;
        border: 1px solid rgba(24, 23, 21, 0.18);
        border-radius: 16px;
        background: #181715;
        padding: 17px 22px;
        color: #d5f05f;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 28px;
        font-weight: 800;
        box-shadow: 0 24px 70px rgba(24, 23, 21, 0.18);
      }
      .footer {
        margin-top: 28px;
        color: rgba(24, 23, 21, 0.52);
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .tiles {
        position: absolute;
        right: 74px;
        bottom: 58px;
        display: grid;
        grid-template-columns: repeat(3, 96px);
        gap: 12px;
        opacity: 0.88;
        transform: translate3d(calc((1 - var(--progress, 0)) * 34px), 0, 0);
      }
      .tile {
        aspect-ratio: 1;
        border: 1px solid rgba(24, 23, 21, 0.14);
        border-radius: 18px;
        background: rgba(251, 247, 234, 0.7);
        box-shadow: 0 20px 52px rgba(24, 23, 21, 0.08);
      }
      .tile:nth-child(2) { background: rgba(213, 240, 95, 0.62); transform: translateY(-18px); }
      .tile:nth-child(3) { background: rgba(89, 101, 71, 0.22); }
      .tile:nth-child(4) { background: rgba(184, 93, 59, 0.18); }
      .tile:nth-child(5) { background: rgba(24, 23, 21, 0.08); transform: translateY(-18px); }
      .tile:nth-child(6) { background: rgba(213, 240, 95, 0.34); }
    </style>
  </head>
  <body>
    <div class="grain"></div>
    <div class="sweep"></div>
    <div class="rule">
      <span class="brand"><span class="mark">WR</span> web-reverse-engineer</span>
      <span>Clean-room workflow</span>
    </div>
    <main class="stage">
      <section class="content">
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title}</h1>
        ${
          isClosing
            ? `<div class="command">${subtitle}</div>${footer ? `<div class="footer">${footer}</div>` : ''}`
            : `<p>${subtitle}</p>`
        }
      </section>
      <div class="tiles" aria-hidden="true">
        <div class="tile"></div><div class="tile"></div><div class="tile"></div>
        <div class="tile"></div><div class="tile"></div><div class="tile"></div>
      </div>
    </main>
  </body>
</html>`;
}

function transitionHtml(scene) {
  const title = escapeHtml(scene.title);
  const subtitle = escapeHtml(scene.subtitle);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        height: 100vh;
        overflow: hidden;
        display: grid;
        place-items: center;
        background:
          linear-gradient(90deg, rgba(24, 23, 21, 0.08) 1px, transparent 1px),
          linear-gradient(rgba(24, 23, 21, 0.06) 1px, transparent 1px),
          #181715;
        background-size: 44px 44px;
        color: #fbf7ea;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .wipe {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(213, 240, 95, 0.86), transparent);
        transform: translate3d(calc(-105% + var(--progress, 0) * 210%), 0, 0) skewX(-10deg);
        opacity: 0.28;
      }
      .panel {
        position: relative;
        z-index: 2;
        max-width: 900px;
        padding: 0 72px;
        text-align: center;
        transform: translate3d(0, calc((1 - var(--progress, 0)) * 16px), 0);
        opacity: calc(0.25 + var(--progress, 0) * 0.75);
      }
      .pill {
        display: inline-flex;
        margin-bottom: 22px;
        border: 1px solid rgba(251, 247, 234, 0.22);
        border-radius: 999px;
        padding: 8px 13px;
        color: #d5f05f;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 0.11em;
        text-transform: uppercase;
      }
      h2 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 62px;
        line-height: 0.98;
        letter-spacing: 0;
      }
      p {
        margin: 20px auto 0;
        max-width: 650px;
        color: rgba(251, 247, 234, 0.68);
        font-size: 22px;
        line-height: 1.25;
      }
    </style>
  </head>
  <body>
    <div class="wipe" aria-hidden="true"></div>
    <section class="panel">
      <div class="pill">Transfer contract</div>
      <h2>${title}</h2>
      <p>${subtitle}</p>
    </section>
  </body>
</html>`;
}

function routeOverlayCss(scene) {
  const dark = scene.overlayTone === 'dark';
  const panelBackground = dark ? 'rgba(24, 27, 22, 0.86)' : 'rgba(8, 10, 12, 0.78)';
  const panelBorder = dark ? 'rgba(213, 240, 95, 0.34)' : 'rgba(255, 255, 255, 0.18)';
  const accent = dark ? 'rgba(213, 240, 95, 0.92)' : 'rgba(213, 240, 95, 0.86)';

  return `
    #readme-demo-overlay {
      position: fixed;
      top: 82px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2147483000;
      width: 700px;
      max-width: calc(100% - 96px);
      pointer-events: none;
      color: #ffffff;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      text-align: center;
      text-rendering: geometricPrecision;
    }
    #readme-demo-overlay .readme-demo-panel {
      position: relative;
      overflow: hidden;
      display: grid;
      justify-items: center;
      gap: 8px;
      border: 1px solid ${panelBorder};
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, ${dark ? '0.08' : '0.1'}), transparent 58%),
        ${panelBackground};
      padding: 16px 26px 18px;
      box-shadow:
        0 18px 50px rgba(0, 0, 0, ${dark ? '0.46' : '0.28'}),
        inset 0 1px 0 rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(16px) saturate(1.15);
    }
    #readme-demo-overlay .readme-demo-panel::before {
      content: "";
      position: absolute;
      inset: 0 0 auto;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${accent}, transparent);
      opacity: 0.92;
    }
    #readme-demo-overlay .readme-demo-panel::after {
      content: "";
      position: absolute;
      inset: 1px;
      border-radius: 17px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      pointer-events: none;
    }
    #readme-demo-overlay .readme-demo-label {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      width: fit-content;
      margin-top: 1px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      padding: 6px 10px;
      color: ${accent};
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
    }
    #readme-demo-overlay .readme-demo-label::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: ${accent};
      box-shadow: 0 0 16px ${accent};
    }
    #readme-demo-overlay .readme-demo-title {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 34px;
      font-weight: 900;
      line-height: 1.02;
      letter-spacing: 0;
      text-shadow: 0 1px 18px rgba(0, 0, 0, 0.22);
    }
    #readme-demo-overlay .readme-demo-subtitle {
      color: rgba(255, 255, 255, 0.72);
      font-size: 15px;
      font-weight: 700;
      line-height: 1.25;
    }
    #readme-demo-cursor {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2147483001;
      width: 28px;
      height: 28px;
      border: 2px solid #181715;
      border-radius: 999px;
      background: rgba(213, 240, 95, 0.72);
      box-shadow: 0 0 0 6px rgba(251, 247, 234, 0.68), 0 14px 36px rgba(24, 23, 21, 0.24);
      transform: translate3d(-120px, -120px, 0);
      pointer-events: none;
    }
  `;
}

async function injectRouteOverlay(page, scene) {
  await page.addStyleTag({ content: routeOverlayCss(scene) });
  const overlay = {
    label: scene.label,
    title: scene.title,
    subtitle: scene.subtitle,
    cursor: scene.cursor,
  };

  await page.evaluate(({ label, title, subtitle, cursor }) => {
    document.querySelector('#readme-demo-overlay')?.remove();
    document.querySelector('#readme-demo-cursor')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'readme-demo-overlay';
    overlay.innerHTML = `
      <div class="readme-demo-panel">
        <div class="readme-demo-label"></div>
        <div class="readme-demo-title"></div>
        <div class="readme-demo-subtitle"></div>
      </div>
    `;
    overlay.querySelector('.readme-demo-label').textContent = label;
    overlay.querySelector('.readme-demo-title').textContent = title;
    overlay.querySelector('.readme-demo-subtitle').textContent = subtitle;
    document.body.appendChild(overlay);

    if (cursor) {
      const pointer = document.createElement('div');
      pointer.id = 'readme-demo-cursor';
      document.body.appendChild(pointer);
    }
  }, overlay);
}

async function moveVisibleCursor(page, x, y, steps = 1) {
  await page.mouse.move(x, y, { steps });
  await page.evaluate(
    ({ left, top }) => {
      const cursor = document.querySelector('#readme-demo-cursor');
      if (cursor instanceof HTMLElement) {
        cursor.style.transform = `translate3d(${left - 14}px, ${top - 14}px, 0)`;
      }
    },
    { left: x, top: y },
  );
}

async function captureFrame(page, frameState) {
  const framePath = path.join(frameDir, `frame-${String(frameState.count).padStart(4, '0')}.png`);
  await page.screenshot({
    path: framePath,
    animations: 'allow',
    caret: 'hide',
    scale: 'css',
  });
  frameState.count += 1;
}

async function captureTimedScene(page, scene, frameState) {
  const frameCount = Math.round(scene.seconds * options.fps);

  for (let frame = 0; frame < frameCount; frame += 1) {
    const progress = frameCount <= 1 ? 1 : frame / (frameCount - 1);
    await page.evaluate((value) => {
      document.documentElement.style.setProperty('--progress', String(value));
    }, progress);

    if (scene.interact) {
      await scene.interact(page, progress);
    }

    await captureFrame(page, frameState);
    await page.waitForTimeout(1000 / options.fps);
  }
}

async function captureCardScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}`);
  await page.setContent(scene.type === 'transition' ? transitionHtml(scene) : cardHtml(scene), {
    waitUntil: 'load',
  });
  await settlePage(page);
  await captureTimedScene(page, scene, frameState);
}

async function captureRouteScene(page, scene, frameState) {
  console.log(`Capturing ${scene.name}: ${scene.route}`);
  await page.goto(`${options.baseUrl}${scene.route}`, { waitUntil: 'networkidle' });
  await settlePage(page);
  await page.waitForTimeout(350);
  await injectRouteOverlay(page, scene);

  if (scene.cursor) {
    await moveVisibleCursor(page, 980, 390);
  }

  await captureTimedScene(page, scene, frameState);
}

function runFfmpeg(args, label) {
  const result = spawnSync('ffmpeg', args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    throw new Error(
      `${label} failed\n${result.stdout || ''}\n${result.stderr || ''}`.trim(),
    );
  }
}

function contactSheetSelectFilter() {
  const indices = [];
  let cursor = 0;

  for (const scene of storyboard) {
    const frames = Math.round(scene.seconds * options.fps);
    indices.push(cursor + Math.floor(frames * 0.45));
    cursor += frames;
  }

  const uniqueIndices = [...new Set(indices)].slice(0, 9);
  const selectExpression = uniqueIndices.map((index) => `eq(n\\,${index})`).join('+');

  return `select=${selectExpression},scale=320:-1:flags=lanczos,tile=3x3`;
}

async function encodeGif(frameCount) {
  if (!existsSync(path.join(frameDir, 'frame-0000.png'))) {
    throw new Error('No frames were captured.');
  }

  await mkdir(path.dirname(gifPath), { recursive: true });

  const framePattern = path.join(frameDir, 'frame-%04d.png');
  const scaleFilter = `scale=${options.gifWidth}:-1:flags=lanczos`;

  runFfmpeg(
    [
      '-y',
      '-framerate',
      String(options.fps),
      '-i',
      framePattern,
      '-vf',
      `${scaleFilter},palettegen=max_colors=56:reserve_transparent=0`,
      palettePath,
    ],
    'Palette generation',
  );

  runFfmpeg(
    [
      '-y',
      '-framerate',
      String(options.fps),
      '-i',
      framePattern,
      '-i',
      palettePath,
      '-lavfi',
      `${scaleFilter}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5`,
      '-loop',
      '0',
      gifPath,
    ],
    'GIF encoding',
  );

  runFfmpeg(
    [
      '-y',
      '-framerate',
      String(options.fps),
      '-i',
      framePattern,
      '-vf',
      contactSheetSelectFilter(),
      '-frames:v',
      '1',
      '-update',
      '1',
      contactSheetPath,
    ],
    'Contact sheet generation',
  );

  const gifStats = await stat(gifPath);
  const metadata = {
    output: path.relative(repoRoot, gifPath),
    width: options.gifWidth,
    height: Math.round((options.gifWidth / options.viewportWidth) * options.viewportHeight),
    fps: options.fps,
    frameCount,
    durationSeconds: Number((frameCount / options.fps).toFixed(2)),
    sizeBytes: gifStats.size,
    sizeMB: Number((gifStats.size / 1024 / 1024).toFixed(2)),
    baseUrl: options.baseUrl,
    viewport: `${options.viewportWidth}x${options.viewportHeight}`,
    temporaryFrameDir: path.relative(repoRoot, frameDir),
    contactSheet: path.relative(repoRoot, contactSheetPath),
    scenes: storyboard.map((scene) => ({
      name: scene.name,
      type: scene.type,
      route: scene.route,
      seconds: scene.seconds,
      label: scene.label,
      title: scene.title,
      subtitle: scene.subtitle,
    })),
  };

  await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(JSON.stringify(metadata, null, 2));
}

async function main() {
  await ensureAppIsReachable(options.baseUrl);
  await rm(frameDir, { recursive: true, force: true });
  await mkdir(frameDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: options.viewportWidth, height: options.viewportHeight },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    colorScheme: 'light',
  });
  const page = await context.newPage();

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

  try {
    for (const scene of storyboard) {
      if (scene.type === 'route') {
        await captureRouteScene(page, scene, frameState);
      } else {
        await captureCardScene(page, scene, frameState);
      }
    }
  } finally {
    await browser.close();
  }

  await encodeGif(frameState.count);

  if (consoleErrors.length > 0) {
    console.warn('Console errors captured during recording:');
    console.warn(consoleErrors.join('\n'));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
