# Clean-Room Notes: Field Supply - Ochi Interactions Inspired

## Baseline
- Source route: `/sample`
- Must remain unchanged: yes

## Reference
- URL: https://ochi.design/
- Inspection date: 2026-07-06

## User-approved transfer contract
- Transfer mode: Motion-only transfer
- Light/dark direction: Light adaptation
- Motion intensity: Showcase demo
- Layout changes allowed: Limited section treatment and motion wrappers only; preserve section order and Field Supply content.
- Copy changes allowed: No product, brand, or core section copy changes. Small demo labels are allowed where they describe the interaction layer.
- Asset generation allowed: No downloaded or generated image assets. Programmatic CSS/React shapes only.
- Output route: `/demos/field-supply-ochi-interactions-inspired`

## Observed principles
- Large editorial headings are split into horizontal rows with overflow-hidden masks and smooth vertical reveals.
- Repeated uppercase text bands create continuous horizontal movement with a linear cadence.
- Pointer-aware graphic elements use eye-like circular forms and small geometric shapes to create a magnetic, watchful interaction.
- Links use transform-based text movement rather than color-only hover states.
- The reference pairs restrained light backgrounds with a high-energy green accent.

## Clean-room implementation decisions
- Rebuilt row reveals from scratch using Framer Motion `whileInView` transitions in `RevealLine`.
- Rebuilt continuous text bands using original Field Supply phrases in `MarqueeBand`; no Ochi wording is reused.
- Rebuilt pointer-following eyes as local div/CSS geometry in `PointerEyes`, with constrained pupil movement based on pointer angle and distance.
- Rebuilt magnetic hover as a generic `MagneticTarget` wrapper that maps pointer distance from an element center to spring-smoothed translation and slight rotation.
- Kept the Field Supply light palette and added an olive/lime accent band so the demo remains tied to `/sample`.

## What changed from baseline
- Added magnetic pointer pull to hero media, CTAs, product cards, material callouts, lifestyle cards, and the CTA button.
- Added pointer-following eye modules inside the hero product frame and quote section.
- Added two moving text bands using Field Supply phrases.
- Converted selected section headings to masked reveal lines.
- Tightened headline scale and rhythm to make the motion visible quickly in a public demo route.

## What was preserved from baseline
- Field Supply brand identity.
- Existing product data, pricing, descriptions, material notes, lifestyle cases, quote, stockists, and local SVG assets.
- Section order and main anchor IDs.
- `/sample` route and `components/sample/FieldSupplyPage.tsx`.

## What was not copied from reference
- No Ochi source code, bundles, CSS files, shaders, SVGs, images, videos, logos, font files, or copywriting were used.
- The demo does not reproduce Ochi layout, project listings, agency content, logo, or proprietary media.
- The implementation uses Field Supply content and a separate component structure.

## Generated/local assets
- No image assets were generated.
- Programmatic CSS/React shapes were created for eyes and geometric blocks.
- Existing local Field Supply SVG assets are reused from `/public/assets/field-supply/`.

## DESIGN.md
- Path: `docs/demos/field-supply-ochi-interactions-inspired/DESIGN.md`

## Evidence
- Audit manifest path: `.tmp/reverse-engineer/field-supply-ochi-interactions-inspired/manifest.json`
- Transformation notes: `.tmp/reverse-engineer/field-supply-ochi-interactions-inspired/transformation-notes.md`
- Reference screenshot: `.tmp/reverse-engineer/field-supply-ochi-interactions-inspired/reference.png`
- Clean-room screenshot: `.tmp/reverse-engineer/field-supply-ochi-interactions-inspired/implementation.png`

## Validation
- Lint status: passed (`pnpm run lint`)
- Typecheck status: passed (`pnpm run typecheck`)
- Production build: passed (`pnpm run build`)
- Browser QA: passed on local dev server (`http://localhost:3000/demos/field-supply-ochi-interactions-inspired`): desktop hero visible with no media overlap, no horizontal overflow, eyes rendered, console errors empty; mobile prior pass had no horizontal overflow and visible mobile menu.
