# Clean-Room Notes: Field Supply - JoinClyde Background Field

## Baseline
- Source route: `/sample`
- Must remain unchanged: yes

## Reference
- URL: https://joinclyde.com
- Inspection date: 2026-07-04

## User-approved transfer contract
- Transfer mode: Visual restyle
- Light/dark direction: Dark adaptation
- Motion intensity: Showcase demo
- Layout changes allowed: Limited surface, section treatment, and atmospheric background changes; preserve Field Supply product structure and stable `sample-*` section anchors.
- Copy changes allowed: No product, brand, or core section copy changes. Small route/navigation labels are allowed where they identify the demo or link back to `/sample`.
- Asset generation allowed: No downloaded or generated image assets. Programmatic Canvas 2D shapes, grain, bands, and panel outlines are allowed.
- Output route: `/demos/joinclyde-background-field`

## Observed principles
- Multiple 2D canvas surfaces appear across the reference page, including large absolute backgrounds and smaller transformed canvas elements near product/card areas.
- The reference uses a dark premium foundation with warm amber, violet, and soft highlight fields to stage key content.
- Several canvas surfaces are mirrored or rotated with transform matrices, creating an off-axis product-stage feeling rather than a flat static background.
- Header, menu, link, and content treatments rely on measured opacity/transform transitions around a smooth-scroll document state.
- Subtle grain, layered shadows, and translucent surfaces add depth and prevent the dark sections from reading as flat black.

## Clean-room implementation decisions
- Built `components/animation/JoinClydeBackgroundField.tsx`: an original Canvas 2D renderer with slow luminous bands, translucent rounded panel outlines, subtle grid drift, grain texture, scroll-responsive offsets, and lightweight pointer easing.
- Kept all reference-specific runtime details at principle level only; no production bundles, canvas drawing code, CSS files, or shader/source assets were copied.
- Rebuilt the page in `components/demos/JoinClydeBackgroundFieldPage.tsx` as a separate Field Supply route using local product SVGs and Field Supply copy.
- Retained stable anchor IDs (`sample-header`, `sample-hero`, `sample-products`, `sample-materials`, `sample-lifestyle`, `sample-quote`, `sample-cta`) so the demo remains comparable to `/sample`.
- Implemented reduced-motion behavior by freezing the canvas at a static composition when `prefers-reduced-motion: reduce` is active.

## What changed from baseline
- **Background**: the light baseline background is replaced in this route with a dark Canvas 2D field containing drifting brass/moss/violet bands, ghost panel outlines, grid lines, and grain.
- **Surfaces**: header, product cards, media frames, quote block, stockists, and CTA surfaces use dark translucent panels with warm borders.
- **Palette**: shifted the route to warm black, parchment text, brass accents, moss tags, and restrained violet background highlights.
- **Hero treatment**: the baseline hero content is staged over the background field with a darker media frame and stronger contrast.
- **Navigation**: added a "Baseline" link and "Compare baseline" CTA that point to `/sample`.

## What was preserved from baseline
- Field Supply brand identity, local FS mark, product names, pricing, capacity labels, descriptions, material notes, lifestyle cases, quote, CTA copy, and stockist content.
- Local Field Supply SVG assets from `/public/assets/field-supply/`.
- Section order and primary product-page structure.
- `/sample` route and `components/sample/FieldSupplyPage.tsx`.

## What was not copied from reference
- No JoinClyde source code, bundles, CSS files, canvas drawing routines, shaders, SVGs, images, videos, logos, font files, or copywriting were used.
- The demo does not reproduce JoinClyde's product layout, brand identity, hero composition, calls to action, product cards, or exact canvas transforms.
- The color tokens, band geometry, panel outlines, timing, scroll offsets, and page structure are original to this repo.

## Generated/local assets
- No image or SVG assets were generated.
- The background is rendered at runtime via Canvas 2D (`JoinClydeBackgroundField.tsx`).
- Existing local Field Supply SVG assets are reused from `/public/assets/field-supply/`.

## DESIGN.md
- Path: `docs/demos/joinclyde-background-field/DESIGN.md`

## Evidence
- Audit manifest path: `.tmp/reverse-engineer/joinclyde-background-field/manifest.json`
- Transformation notes: `.tmp/reverse-engineer/joinclyde-background-field/transformation-notes.md`
- Reference screenshot: `.tmp/reverse-engineer/joinclyde-background-field/reference-screenshot.png`
- Clean-room desktop screenshot: `.tmp/reverse-engineer/joinclyde-background-field/implementation.png`
- Clean-room mobile screenshot: `.tmp/reverse-engineer/joinclyde-background-field/implementation-mobile.png`

## Validation
- Lint status: passed (`./node_modules/.bin/eslint .`)
- Typecheck status: passed (`./node_modules/.bin/tsc --noEmit`)
- Production build: passed (`./node_modules/.bin/next build`)
- Browser QA: passed during local Playwright capture for `/demos/joinclyde-background-field`: one canvas rendered, no console/page errors, and no horizontal overflow on desktop or mobile.
