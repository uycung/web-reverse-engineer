---
name: web-reverse-engineer
description: "Web reverse-engineering workflow for inspecting public web frontends, extracting design/runtime principles, and rebuilding clean-room implementations inside a target project."
---

# Web Reverse-Engineering Skill

## Purpose

This skill helps an agent inspect a public reference website, understand its visual and runtime mechanisms, and create a **clean-room implementation** inside a target project.

It is intended for:

- design/style transfer,
- animation reverse-engineering,
- canvas/WebGL/background deconstruction,
- scroll and interaction analysis,
- runtime UI behavior analysis,
- creating project-specific implementations inspired by observed principles.

It is **not** a website copier, clone generator, or pixel-perfect reproduction tool.

The objective is to:

1. Inspect a real website runtime.
2. Understand technical and visual mechanisms.
3. Extract high-level principles.
4. Rebuild an original implementation in the user's project.
5. Avoid copying proprietary code, assets, logos, copywriting, brand identity, or exact expressive output.

---

## Core Rules

### Clean-room only

Do not copy or reuse:

- proprietary source code,
- minified bundles,
- shader strings,
- CSS files,
- image/video/audio assets,
- custom fonts,
- logos,
- trademarked brand elements,
- copywriting,
- exact layouts,
- exact animation timing or composition.

Allowed:

- inspect public runtime behavior,
- record metadata,
- take screenshots for analysis,
- extract high-level design and motion principles,
- rebuild original code using different implementation details,
- preserve the user's own existing project content when requested.

### Public and accessible references only

Do not bypass:

- authentication,
- paywalls,
- private routes,
- access controls,
- anti-scraping protections.

If the reference depends on protected assets, private APIs, or proprietary media, state the limitation and propose an original alternative.

### Ask before generating assets

Some agents can create images, SVGs, textures, icons, or other assets.

Default:

- Do not generate new image assets unless the user approves.
- Programmatic CSS/canvas/SVG shapes are allowed when they are part of the implementation and do not copy reference assets.
- Never download and reuse proprietary assets from the reference website.

---

## When to Use This Skill

Use this skill when the user asks for something like:

- “Make this page feel like [reference site].”
- “Copy the animation style from [reference site], but apply it to my project.”
- “Inspect this landing page and rebuild the background effect.”
- “Create a clean-room demo inspired by this website.”
- “Analyze the canvas/WebGL/scroll effect on this page.”
- “Extract more than static design tokens from this site.”

Do not use this skill for ordinary CSS tweaks, simple component styling, or static page implementation where no reference deconstruction is needed.

---

## Transfer Modes

Before planning or coding, identify the requested transfer mode.

### 1. Motion-only transfer

Preserve:

- existing brand,
- layout,
- copywriting,
- section order,
- data,
- local assets.

Change only:

- animation layer,
- background behavior,
- transitions,
- interaction patterns,
- supporting motion wrappers.

Use this when the user wants to keep their current page but apply a reference-inspired animation or interaction.

### 2. Visual restyle

Preserve:

- core content,
- brand,
- product/theme,
- general structure.

May change:

- color palette,
- surfaces,
- spacing rhythm,
- typography treatment,
- card styling,
- section atmosphere,
- motion treatment.

Use this when the user wants a recognizable restyle while keeping the same content.

### 3. Editorial redesign

Preserve:

- underlying product/theme,
- core message.

May change:

- layout,
- copywriting,
- section rhythm,
- hierarchy,
- visual storytelling.

Use this only when the user approves broader creative changes.

### 4. Full concept demo

Create a new fictional or independent page inspired by the reference.

Use this only when the user wants a standalone demo or concept, not an application to an existing page.

---

## Clarification Contract

Ask only for missing information. If the user already answered a dimension, record it and move on.

Before implementation, make the following explicit:

### Baseline / target project

Clarify:

- What page, route, component, or project should receive the implementation?
- Is the source page a protected baseline?
- Should the implementation modify the existing page or create a separate variant/demo?
- What is the desired output path?

### Transfer mode

State the recommended transfer mode:

- Motion-only transfer
- Visual restyle
- Editorial redesign
- Full concept demo

Do not substantially rewrite copy or layout unless the user approved a mode that allows it.

### Light vs dark direction

If the reference style could work either way, ask or propose:

```md
Which visual direction do you want?

A. Light adaptation
- Preserve the current light brand feel.
- Motion must remain visible on a light background.
- Lower contrast, more editorial.

B. Dark adaptation
- Convert the target/demo route to a darker, more immersive style.
- Higher contrast and stronger glow/motion.
- More dramatic departure from the baseline.

C. Agent proposes both options first.
````

Do not silently convert a light baseline into dark mode.

### Layout and copywriting permission

State clearly:

```md
Preserve:
- Brand
- Product data
- Existing copywriting
- Section order
- Local assets

Allowed to change:
- Background layer
- Surface opacity
- Section spacing
- Card treatment
- Motion layer

Not allowed unless approved:
- Rewriting headlines
- Replacing product copy
- Changing core layout
- Changing brand identity
```

If layout or copywriting changes would improve the result, propose them as optional.

### Asset generation permission

Ask when relevant:

```md
Do you want new supporting assets for this implementation?

A. No new assets. Reuse existing local assets only.
B. Generate simple local SVG/CSS/canvas assets only.
C. Generate image assets if useful, but ask before each major asset.
```

### Motion intensity

Ask or infer:

```md
Motion intensity:

A. Calm production
- Subtle, premium, low distraction.

B. Showcase demo
- Clearly visible within a few seconds.
- Useful for portfolio/demo proof.

C. Debug/analysis
- Exaggerated motion or overlays for testing only.
```

For public demos, prefer `Showcase demo` unless the user asks for production subtlety.

Acceptance rule:

> If a normal viewer cannot perceive the animation in normal mode without debug overlays, mouse movement, or explanation, the animation demo fails.

### Technical preference

Ask only if needed:

* CSS gradients/keyframes
* Canvas 2D
* WebGL
* Framer Motion
* simplest robust approach
* match reference mechanism where feasible

Default:

> Use the simplest robust clean-room approach that achieves the approved visual effect.

---

## Standard Clarification Output

When clarification is needed, respond in this format:

```md
## Clarification Needed

### Target
- Reference:
- Baseline / target page:
- Proposed output:

### Baseline preservation
- I will / will not modify the source page.

### Transfer mode
Recommended:
Reason:

### Light or dark direction
Recommended:
Reason:

### Layout & copy
Preserve:
- ...

May change if approved:
- ...

Will not change without approval:
- ...

### Assets
Recommended:
- No new assets / SVG only / generated image assets with permission

### Motion intensity
Recommended:
- Calm production / Showcase demo / Debug only

### DESIGN.md
I will create or update:
- ...

### Questions
1. ...
2. ...
```

If the user already provided enough information, skip clarification and proceed to the implementation plan.

---

## Workflow

### Step 1 — Intake and Contract

Collect:

* reference URL,
* target page/project,
* output path,
* transfer mode,
* light/dark direction,
* layout/copy permissions,
* asset generation permission,
* motion intensity,
* technical constraints,
* documentation paths.

Do not start implementation until the contract is clear enough.

---

### Step 2 — Reference Audit

Inspect the reference website using browser automation or devtools.

Capture:

* page title and URL,
* viewport size,
* screenshots,
* DOM structure around relevant sections,
* loaded scripts,
* loaded stylesheets,
* loaded images/media/fonts,
* canvas elements,
* canvas context type if detectable,
* CSS animations/transitions,
* transform/filter/mask/blend-mode usage,
* scroll-linked behavior,
* runtime animation libraries,
* WebGL indicators,
* requestAnimationFrame usage where detectable.

Save audit evidence in a temporary project-appropriate location, such as:

```txt
.tmp/reverse-engineer/<slug>/
```

unless the target project has a different convention.

---

### Step 3 — Static Design Analysis

Extract high-level static design principles:

* color families,
* foreground/background contrast,
* typography feel,
* spacing rhythm,
* layout density,
* surface treatment,
* borders/radius/shadows,
* card treatments,
* imagery style,
* section composition.

This is similar to static `design.md` extraction, but it is not enough for runtime animation. Continue into motion/runtime analysis when relevant.

---

### Step 4 — Runtime Animation Analysis

Analyze:

* CSS keyframes,
* transitions,
* transform states,
* masks,
* blend modes,
* filters,
* canvas drawing loops,
* WebGL contexts,
* shader indicators,
* scroll-linked timelines,
* pointer/mouse interactions,
* procedural noise or gradient systems.

If the effect depends on WebGL and normal inspection is insufficient, recommend deeper inspection with tools such as Spector.js or browser WebGL debuggers.

Document only high-level principles. Do not copy shader code, uniforms, textures, or proprietary implementation details.

---

### Step 5 — Clean-Room Transformation

Before coding, write a short transformation note:

```md
Observed principle:
- ...

Clean-room implementation decision:
- ...

What is intentionally changed:
- ...
```

Examples:

```md
Observed principle:
- The reference uses a soft animated gradient field behind the hero.

Clean-room implementation decision:
- Rebuild with original Canvas 2D radial fields using a different palette, timing model, and composition.

What is intentionally changed:
- Brand, copy, layout rhythm, color values, motion speed, and shape positions.
```

---

### Step 6 — Implementation

Implement only what the user approved.

Requirements:

* original code only,
* no copied reference assets,
* no copied copywriting,
* no copied logos,
* no exact reference layout,
* preserve baseline content when requested,
* support responsive layouts,
* respect `prefers-reduced-motion`,
* avoid hydration errors,
* avoid console errors,
* provide graceful fallback for Canvas/WebGL failures.

---

### Step 7 — DESIGN.md

Every real project application or demo should produce a `DESIGN.md`.

The file should be portable and useful for future agents/design tools.

Recommended sections:

```md
# DESIGN.md — {Project or Demo Name}

## Purpose

## Design Intent

## Source Context
- Baseline:
- Reference:
- Transfer mode:

## Brand Principles

## Visual System

### Color Tokens
| Token | Value | Usage |
|---|---|---|

### Typography
| Role | Font / Style | Usage |
|---|---|---|

### Spacing & Layout

### Surfaces

### Borders, Radius, Shadows

### Imagery & Assets

## Component Guidelines

### Header / Navigation

### Hero

### Cards

### CTA

### Footer

## Motion System

### Motion Intent

### Animation Tokens
| Token | Value | Usage |
|---|---|---|

### Reduced Motion

## Accessibility & Readability

## Clean-Room Differentiation

## Implementation Notes

## Do / Don’t
```

Location rules:

* For a real user project, create or update root-level `DESIGN.md` unless the user or project convention says otherwise.
* If a root `DESIGN.md` already exists, update it carefully. Do not overwrite blindly.
* For local demos or experiments, save `DESIGN.md` near the demo documentation according to that project’s convention.

---

### Step 8 — Evidence and Validation

Save evidence that proves the reference was inspected and the implementation works.

Prefer:

* reference screenshot,
* audit manifest,
* transformation notes,
* implementation screenshot,
* normal-mode animation screenshots or video,
* reduced-motion screenshot if relevant.

Debug screenshots are allowed, but cannot be the only proof.

Run the project’s validation commands, usually:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

or the equivalent package-manager scripts.

For animation demos, build success is not enough. Verify normal viewer perception:

* visible in normal mode,
* no debug mode required,
* no mouse movement required unless the effect is explicitly pointer-driven,
* no explanation required to notice the effect.

---

## Standard Implementation Plan Output

After clarification, respond with:

```md
## Implementation Plan

### Output
- Route/component/path:

### Transfer contract
- Mode:
- Light/dark:
- Preserve:
- Allowed changes:
- Not allowed:
- Assets:
- Motion intensity:

### Reference findings
- ...

### Clean-room transformation
Observed principle:
- ...

Implementation decision:
- ...

Intentionally changed:
- ...

### DESIGN.md output
- ...

### Files to create/change
- ...

### Validation
- ...
```

---

## Standard Final Report

After implementation, report:

```md
## Completed

### Output
- ...

### Reference inspected
- ...

### Transfer contract followed
- ...

### What changed
- ...

### What was preserved
- ...

### What was not copied
- ...

### DESIGN.md
- ...

### Evidence
- ...

### Validation
- Lint:
- Typecheck:
- Build:
- Browser/runtime QA:

### Notes
- ...
```