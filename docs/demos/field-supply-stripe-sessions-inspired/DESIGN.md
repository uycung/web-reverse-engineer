# Stripe Sessions Hero Wave Demo Design System

## Design Intent
Preserve the existing Field Supply baseline (brand, copy, layout, product data) unchanged and add one new visual layer: an ambient, slowly animating background confined to the hero section, inspired by the structural/motion principle observed on the Stripe Sessions 2026 hero (a masked, negative-z WebGL canvas rendering a gradient-lit "wave" behind the headline — the reference's own script chunk is literally named `Hero26Wave`). The light/white direction of the baseline is preserved rather than converted to dark.

## Visual Principles
- Light, editorial baseline stays fully intact — cream page background (`#faf8f5`), serif display headline, mono labels.
- One new ambient layer: three stacked, translucent wave bands confined to `#sample-hero`, sitting at negative z-index behind all hero text/content, rolling along the bottom edge of the hero like a horizon line.
- Each band has its own amplitude, frequency, phase, and drift speed/direction, so the bands cross and part like real overlapping swells rather than one flat shape moving in lockstep.
- The waves sit low in the hero (roughly the bottom third), leaving the headline and CTA row on plain background for legibility — mirrors the reference's own composition principle (motion supports the layout, never competes with it) without reusing its exact geometry.
- A soft, blurred specular highlight travels back and forth along the topmost wave's crest, echoing the reference's "moving light" principle, plus a thin lightened stroke tracing that same crest for definition.
- Motion is continuous, slow, and non-looping-modulo (driven directly by elapsed time, so there's no visible seam/jump) — calm ambient, not distracting, in line with "Showcase demo" visibility (readable within 3 seconds) without competing with text.

## Color Tokens (new palette — intentionally distinct from both the reference and the baseline)
- `wave/cobalt`: `rgba(15, 76, 129, 0.88)` — cool leading edge, top band
- `wave/teal`: `rgba(23, 158, 166, 0.86)` — mid transition, top band
- `wave/emerald`: `rgba(23, 184, 148, 0.86)` — trailing edge, top band
- `wave/mid-band`: cobalt/teal/emerald darkened ~15%, alpha 0.72–0.8 — second band, creates depth beneath the top band
- `wave/back-band`: cobalt/teal/emerald darkened further, alpha 0.6–0.75 — third, lowest band
- `wave/crest-highlight`: `rgba(255, 246, 214, 0.35)` — thin lightened stroke along the top crest (screen blend)
- `wave/glow`: `rgba(255, 205, 120, 0.78)` — traveling warm highlight (screen blend)
- Baseline tokens (unchanged from `/sample`): `background/cream #faf8f5`, `text/primary #1c1b1a`, `text/muted #595754`, `accent/moss #596547`, `accent/copper #b85d3b`

## Typography
Unchanged from baseline: serif display headline (`font-serif`), mono uppercase labels/nav (`font-mono uppercase tracking-wider`), sans body text.

## Spacing & Layout
Unchanged from baseline grid (`max-w-7xl`, 12-col hero grid, existing section rhythm). The hero section gains `relative z-0 overflow-hidden` so the canvas layer is scoped and clipped to that section only.

## Component Treatments
- `StripeSessionsHeroWave` (`components/animation/StripeSessionsHeroWave.tsx`): a `<canvas>` sized to its parent hero section via `ResizeObserver`, absolutely positioned `inset-0 -z-10`, `pointer-events-none`, `aria-hidden`.
- Hero content (headline, CTAs, product image card) unchanged in markup/copy; only wrapping classes added for stacking/clipping.
- Nav gains a "Baseline" link and header gains a "Compare baseline" CTA linking to `/sample`, matching the existing `joinclyde-background-field` demo's convention for baseline comparison.

## Motion Principles
- Canvas 2D only (no WebGL) — each of the 3 wave bands is a filled path sampled from `y = baseY·height + amplitude·height·sin(xFraction·frequency·2π + phase + time·speed)`, closed down to the bottom of the canvas and filled with a left-to-right linear gradient.
- Bands differ in frequency, phase, and speed sign (some drift left, some right) so they visually interleave instead of moving as one rigid unit.
- A radial-gradient glow (screen blend, blurred) oscillates back and forth along the top band's crest via `Math.sin`, plus a thin screen-blended stroke traces that same crest.
- Driven directly by the `requestAnimationFrame` timestamp (no modulo wrap) — no scroll or pointer coupling (matches the reference's self-contained ambient-loop behavior observed during audit).
- `prefers-reduced-motion: reduce` freezes the render at a fixed time value (single draw call, no rAF loop) — mirrors the reference's own accessibility behavior confirmed during the audit.

## Accessibility / Readability Rules
- Canvas is `aria-hidden="true"` and `pointer-events-none` — purely decorative, does not intercept focus/clicks.
- Confined to the hero section and kept behind all text via `-z-10` inside a locally-scoped stacking context (`z-0` on the section) — never overlaps body copy elsewhere on the page.
- Colors and glow intensity tuned to stay well below the contrast of the dark headline text against the cream background.

## Implementation Notes
- The hero `<section>` must set an explicit `z-0` (not just `relative`) so the canvas's `-z-10` creates a locally scoped stacking context — without it, the negative z-index escapes to the document root and paints beneath the page's own background, making the canvas invisible. Confirmed via runtime debugging during this build (canvas had correct pixel data but wasn't visible until this fix).
- Canvas resizes against its parent hero section's bounding rect (`ResizeObserver`), not `window`, since the effect must stay hero-scoped rather than full-page.

## Clean-Room Differentiation Notes
- No WebGL/shader code, script bundles, or exact color values from stripe.com were used — see `docs/demos/field-supply-stripe-sessions-inspired/clean-room-notes.md` for the full audit trail.
- Geometry is an original sine-sampled path construction (three independently-parameterized bands), not a ported mesh or shader.
- Palette (cobalt → teal → emerald with a warm gold glow) is original, distinct from Stripe's blurple/magenta/orange and from the baseline's moss/copper/sand.
- Composition (layered waves rolling along the bottom edge) differs from the reference's single diagonal folded-plane silhouette, while preserving the same underlying principle: a masked, negative-z, gradient-lit ambient motion layer confined to the hero.
