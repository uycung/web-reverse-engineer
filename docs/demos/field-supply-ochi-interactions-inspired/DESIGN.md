# Field Supply - Ochi Interactions Inspired Design

## Design Intent

Create a light, editorial Field Supply demo that proves three motion principles: magnetic pointer response, watchful product-eyes, and smooth masked text reveals. The demo should feel like Field Supply, not like the reference brand.

## Visual Principles

- Preserve the warm off-white Field Supply base.
- Use one high-energy accent to make motion legible: lime `#d5f05f`.
- Keep geometric surfaces practical and product-focused.
- Let motion create emphasis instead of adding new imagery.

## Color Tokens

- `background`: `#f3f0e8`
- `surface`: `#f7f2e7`
- `surface-muted`: `#e8e1d1`
- `ink`: `#1c1b1a`
- `muted-ink`: `#4f5049`
- `field-olive`: `#596547`
- `motion-lime`: `#d5f05f`
- `utility-rust`: `#b85d3b`

## Typography

- Hero and major section headings use the existing serif stack with extra-heavy weight, uppercase, tight line-height, and zero letter spacing.
- Body and product copy keep the existing system sans stack.
- Labels and navigation keep the existing mono treatment and uppercase rhythm.
- Text size is responsive with fixed clamp ranges, not viewport-scaled body copy.

## Spacing

- Header height remains 80px.
- Hero fills the first viewport below the header on desktop.
- Main content keeps the baseline section order and generous 64-96px vertical section rhythm.
- Cards use stable aspect ratios for product imagery and do not resize on hover.

## Layout Rules

- `/sample` remains the neutral baseline.
- Demo output is isolated at `/demos/field-supply-ochi-interactions-inspired`.
- The demo keeps the baseline content sequence: header, hero, products, materials, lifestyle, quote, CTA, stockists, footer.
- Motion bands can be inserted between baseline sections because they are treatment layers, not content replacements.

## Component Treatments

- `MagneticTarget`: wraps buttons, media, and cards; spring-smoothed translation and small rotation respond to pointer distance from element center.
- `PointerEyes`: two circular eyes with constrained pupils and small geometric blocks; built from local CSS/React shapes.
- `RevealLine`: masks a line and animates the inner span from below when it enters the viewport.
- `MarqueeBand`: loops repeated Field Supply phrases in a continuous horizontal track.

## Motion Principles

- Magnetic movement is limited to 8-18px and 0.8-2.2 degrees of rotation.
- Eye pupils are constrained to a small radius so the component feels controlled, not distracting.
- Reveal lines use 720ms cubic easing with short staggered delays.
- Marquee bands use linear 19-22s loops, with opposite directions for variation.
- Pointer-specific motion is disabled for touch/coarse pointers.
- `prefers-reduced-motion` disables magnetic transforms and reveal offsets where possible.

## Accessibility And Readability

- All interactive controls remain native links or buttons.
- Pointer eyes are `aria-hidden`.
- Text bands use Field Supply wording but are decorative; core information remains in static copy.
- Text contrast stays high against the warm light base and olive/lime bands.
- Motion is visible but bounded to avoid layout shift.

## Implementation Notes

- The route `page.tsx` remains a server component and owns metadata.
- The interactive demo component uses `'use client'`.
- Framer Motion is already available in the project and is used for springs, reveal transitions, and marquee movement.
- No global CSS changes are required.

## Clean-Room Differentiation Notes

- The implementation does not copy Ochi assets, fonts, videos, logo, copywriting, CSS, or JavaScript bundles.
- The reference was used only to identify general interaction principles.
- The demo uses Field Supply data and local Field Supply assets.
