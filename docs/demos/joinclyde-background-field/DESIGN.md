# JoinClyde Background Field Demo Design System

## Design Intent
Create a separate Field Supply demo route that preserves the baseline product story while applying a dark, kinetic background-field treatment informed by observed canvas and transition principles.

## Visual Principles
- Dark warm-black canvas foundation with high-legibility parchment text.
- Brass and moss highlights for product-context continuity.
- Restrained violet accents only in the background field.
- Translucent panels and subtle grain for depth.

## Color Tokens
- `background/base`: `#080604`
- `background/depth`: `#0d0907`
- `text/primary`: `#fff6e8`
- `text/muted`: `#cdbf9d`
- `accent/brass`: `#f0bf55`
- `accent/moss`: `#596547`
- `accent/violet`: `rgba(147, 76, 201, 0.38)`
- `border/warm`: `rgba(255, 241, 207, 0.14)`

## Typography
- Preserve the repo default sans and serif pairings.
- Use serif display text for Field Supply headlines.
- Use compact mono uppercase labels for product taxonomy, navigation, and metadata.

## Spacing
- Keep the baseline section order and generous vertical rhythm.
- Use `max-w-7xl` for product sections and `px-6` page gutters.
- Keep cards at `rounded-lg` to match the repo's demo guidance.

## Layout Rules
- `/sample` remains untouched.
- Demo lives at `/demos/joinclyde-background-field`.
- Stable section IDs remain `sample-header`, `sample-hero`, `sample-products`, `sample-materials`, `sample-lifestyle`, `sample-quote`, and `sample-cta`.

## Component Treatments
- Header uses dark translucent glass with a thin warm border.
- Product cards use warm translucent surfaces, subtle blur, and restrained hover states.
- Media frames use existing local Field Supply SVG assets only.

## Motion Principles
- Canvas 2D bands drift slowly with trigonometric offsets.
- Translucent panel outlines move independently from bands.
- Scroll position lightly offsets background elements.
- `prefers-reduced-motion` produces a static composition.

## Accessibility And Readability
- Text remains on dark, stable surfaces with high contrast.
- Canvas is `aria-hidden`.
- Interactive controls keep visible hover/focus-friendly contrast.
- Motion is decorative and nonessential.

## Implementation Notes
- Background implementation: `components/animation/JoinClydeBackgroundField.tsx`.
- Page implementation: `components/demos/JoinClydeBackgroundFieldPage.tsx`.
- App route: `app/demos/joinclyde-background-field/page.tsx`.

## Clean-Room Differentiation
- Uses original code, local Field Supply assets, and Field Supply copy.
- Does not use reference assets, source code, custom fonts, or exact page composition.
