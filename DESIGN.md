# DESIGN.md - CleanRoom Labs Homepage

## Purpose

Document the homepage visual system for the CleanRoom Labs reverse-engineering workspace.

## Design Intent

The homepage presents the project as a technical portfolio for clean-room web reconstruction. The interface should feel like a focused lab environment: dark, precise, evidence-led, and route-oriented.

## Source Context

- Baseline: existing `/` homepage and protected `/sample` route.
- Reference: no external reference site used for this homepage restyle.
- Transfer mode: editorial homepage restyle for the real project application.

## Brand Principles

- Evidence before claims.
- Demo isolation over destructive experimentation.
- Original implementation over asset or source reuse.
- Direct navigation to working routes.

## Visual System

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#050604` | Page and footer base |
| Surface | `#080907`, `zinc-950` | Cards and panels |
| Border | `zinc-800`, `zinc-900` | Section separation and panels |
| Text primary | `zinc-50`, `zinc-100` | Headlines and active labels |
| Text secondary | `zinc-300`, `zinc-400`, `zinc-500` | Body copy and metadata |
| Accent | `emerald-300` | CTAs, route states, active signals |

### Typography

| Role | Font / Style | Usage |
|---|---|---|
| Display | System sans, black weight, normal tracking | Hero and section headlines |
| Body | System sans, relaxed leading | Explanatory copy |
| Technical metadata | Monospace | Stack notes and status labels |

### Spacing & Layout

- Desktop content is constrained to `max-w-[1400px]`.
- Hero uses an asymmetric two-column composition.
- Major sections use large vertical spacing: `py-28` to `md:py-40`.
- Demo cards use a two-column responsive grid tied only to routes that exist in this checkout.

### Surfaces

- Panels use near-black fills with restrained emerald highlights.
- The hero visual uses existing local Field Supply SVG assets.
- Demo cards are route objects with hover movement and visible state.

### Borders, Radius, Shadows

- Primary panels use `rounded-[1.5rem]`.
- Buttons use pill radii.
- Shadows are used only for the hero media panel where depth supports hierarchy.

### Imagery & Assets

- No generated images or downloaded assets are used.
- Homepage visuals reuse existing local SVG assets from `public/assets/field-supply/`.

## Component Guidelines

### Header / Navigation

- Keep navigation one line on desktop.
- Prioritize in-app anchors and working routes.
- Avoid generic external CTAs without a real destination.

### Hero

- Keep the headline wide and short enough to avoid a tall text wall.
- Limit hero text elements to one eyebrow, headline, subtext, and CTAs.
- Use local visual assets to show the project context without creating fake UI screenshots.

### Cards

- Demo cards are clickable route cards.
- Each card includes label, title, concise description, stack, and status.
- Hover states may translate slightly and reveal a subtle image scale.

### CTA

- Primary CTAs use `bg-zinc-100 text-zinc-950`.
- Secondary CTAs use dark fills with visible borders.
- CTA labels stay short and do not wrap at desktop sizes.

### Footer

- Footer reinforces project purpose and repeats only useful app navigation.

## Motion System

### Motion Intent

- Motion is calm and production-oriented.
- Interactions use hover translate, image scale, icon movement, and tactile active states.

### Animation Tokens

| Token | Value | Usage |
|---|---|---|
| Hover transition | `duration-500` to `duration-700` | Demo card movement and image reveal |
| Active press | `active:scale-[0.98]` | Buttons |
| Icon nudge | `group-hover:translate-x-1` | Route affordance |

### Reduced Motion

- Core content remains fully legible without motion.
- Motion is decorative and non-essential.

## Accessibility & Readability

- Buttons use high contrast text/background pairs.
- Copy is kept in readable line lengths.
- Link destinations use real routes and anchors.
- The page avoids horizontal overflow with `overflow-x-hidden`.

## Clean-Room Differentiation

- This homepage is not based on an external website audit.
- It documents and showcases existing clean-room demo routes while preserving `/sample`.
- No proprietary assets, external brand expressions, or source code are reused.

## Implementation Notes

- The homepage is a Server Component in `app/page.tsx`.
- Header and footer are shared only by the homepage in the current app.
- Existing demo routes remain isolated under `/demos/...`.

## Do / Don't

### Do

- Keep route links working and obvious.
- Keep `/sample` positioned as the protected baseline.
- Use emerald as the single accent across the page.

### Don't

- Add fake documentation CTAs that point at non-routed repository files.
- Add generated imagery without explicit permission.
- Convert `/sample` into an experiment target.
