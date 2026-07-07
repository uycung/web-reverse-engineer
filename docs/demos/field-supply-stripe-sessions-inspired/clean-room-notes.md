# Clean-Room Notes: Field Supply — Stripe Sessions 2026-Inspired

## Baseline
- Source route: `/sample`
- Must remain unchanged: yes

## Reference
- URL: https://stripe.com/sessions/2026
- Inspection date: 2026-07-06

## User-approved transfer contract
- Transfer mode: Motion-only transfer
- Light/dark direction: Light
- Motion intensity: Showcase demo
- Layout changes allowed: No (baseline grid/section order unchanged; hero section only gains `relative z-0 overflow-hidden` for stacking/clipping)
- Copy changes allowed: No (all headline, product, material, and lifestyle copy identical to `/sample`)
- Asset generation allowed: No new assets — reused existing `/assets/field-supply/*` SVGs; the wave itself is programmatic Canvas 2D, not an asset
- Output route: `/demos/field-supply-stripe-sessions-inspired`

## Observed principles
* **Masked, negative-z hero canvas**: a single WebGL `<canvas>` sits in a container with `position: absolute; z-index: -1`, nested inside an `overflow: hidden` section wrapper — confined to the hero viewport only, never bleeding into other sections, always behind text content.
* **Small-palette gradient plane**: CSS custom properties (`--gradientColorZero..Three`, `--gradient-line-offset`) indicate the shader is driven by ~4 color stops plus a line-offset uniform, not arbitrary noise — the visual reads as a folded, gradient-lit plane rather than a literal photographic or video background.
* **Slow continuous morph**: comparing frames 0.5s/2s/3.5s apart, the fold seam and a soft specular highlight visibly shift position — a continuous ambient loop, not scroll- or pointer-linked.
* **Respects reduced motion**: with `prefers-reduced-motion: reduce` emulated, the shape freezes at its initial pose.
* **Composition**: the shape occupies the lower-right/diagonal region of the hero, leaving the upper-left (where the headline sits) on a clear, plain background — motion supports the layout instead of competing with it.

## Clean-room implementation decisions
* Built `components/animation/StripeSessionsHeroWave.tsx`: an original Canvas 2D (no WebGL, no shader code) renderer drawing 3 stacked wave bands, each a filled path sampled from an independent `sin(x·frequency + phase + time·speed)` function (own amplitude/frequency/phase/drift direction per band), plus a `radial-gradient` + `screen` blend "glow" and a thin crest stroke that both track the top band's curve — all original math, not reverse-engineered from the actual shader uniforms (which were never extracted; audit was DOM/CSS/network-level only).
* Iterated once on the visual: an initial single folded-plane silhouette read as too flat/geometric, so it was replaced with the current layered sine-wave bands for a more literal, recognizable "wave" motif closer to the reference's own `Hero26Wave` naming — geometry and math remain original either way.
* Canvas sized against its own hero-section parent via `ResizeObserver` (hero-scoped, not full-page), positioned `absolute inset-0 -z-10`, `pointer-events-none`, `aria-hidden`.
* Hero `<section>` given an explicit `z-0` (not just `relative`) so the canvas's negative z-index is scoped locally — mirrors the structural principle behind the reference's own `Section__container { z-index: 1 }`, discovered necessary during implementation when the canvas was otherwise invisible (its `-z-10` escaped to the document root stacking context).
* `prefers-reduced-motion: reduce` freezes the render at a fixed time value with no `requestAnimationFrame` loop, matching the reference's own accessibility behavior.

## What changed from baseline
* **Background**: hero section gained one new decorative Canvas 2D layer (three layered wave bands rolling along the bottom edge) confined behind existing content; no other section changed.
* **Palette (new layer only)**: introduced cobalt → teal → emerald (three shades, one per band) with a warm gold traveling highlight, used only for the wave layer.
* **Structural classes**: hero `<section>` gained `relative z-0 overflow-hidden`; no grid/column/copy changes.
* **Navigation**: added a "Baseline" nav link and a "Compare baseline" header CTA linking to `/sample`, matching the existing `joinclyde-background-field` demo's convention.

## What was preserved from baseline
* **Brand**: Field Supply identity, logo mark, and voice unchanged.
* **Copywriting**: all headline, body, product, material, and lifestyle copy identical to `/sample`.
* **Layout**: section order, grid structure, and all local SVG assets unchanged.

## What was not copied from reference
* **Code & Scripts**: no Stripe JavaScript bundles, shader/GLSL code, or minified assets were downloaded or reused (audit was Playwright DOM/CSS/network inspection only).
* **Logos & Brand Assets**: no Stripe wordmark, iconography, imagery, or copy was used.
* **Exact colors/uniforms**: gradient hex values and shader uniforms were not extracted; the new palette and geometry are original.

## Generated/local assets
* No new image/SVG assets generated. The wave is rendered entirely at runtime via Canvas 2D (`StripeSessionsHeroWave.tsx`); all other imagery reuses existing `/assets/field-supply/*.svg` files already in the repo.

## DESIGN.md
- Path: `docs/demos/field-supply-stripe-sessions-inspired/DESIGN.md`

## Evidence
- Audit manifest: `.tmp/reverse-engineer/field-supply-stripe-sessions-inspired/manifest.json`
- Deep audit data: `.tmp/reverse-engineer/field-supply-stripe-sessions-inspired/deep-audit.json`
- Reference screenshots: `reference-hero.png`, `wave-frame-1.png`, `wave-frame-2.png`, `wave-frame-3.png`, `wave-reduced-motion.png`
- Transformation notes: `.tmp/reverse-engineer/field-supply-stripe-sessions-inspired/transformation-notes.md`
- Implementation screenshots (normal mode): `implementation-frame-1.png`, `implementation-frame-2.png`, `implementation-fullpage.png`, `implementation-mobile.png`, `implementation-reduced-motion.png`

## Validation
* Lint status: Passed (`pnpm lint`)
* Typecheck status: Passed (`pnpm typecheck`)
* Production Build: Passed (`pnpm build`)
* Runtime check: No browser console errors observed across desktop, mobile, and reduced-motion Playwright passes; `/sample` confirmed unchanged.
