# Field Supply — Demo Conventions & Clean-Room Template

This document details the naming conventions and clean-room documentation standards for all reference-inspired demonstrations.

---

## Directory & File Naming Conventions

All reverse-engineering and style-transfer experiments must follow these strict path conventions to maintain isolation and readability:

1. **Demo Page Route**:
   ```txt
   /demos/field-supply-{reference}-inspired
   ```
   *Example*: `/demos/field-supply-clyde-inspired` or `app/demos/field-supply-clyde-inspired/page.tsx`

2. **Clean-Room Notes Document for New Demos**:
   ```txt
   docs/demos/field-supply-{reference}-inspired/clean-room-notes.md
   ```
   *Example*: `docs/demos/field-supply-clyde-inspired/clean-room-notes.md`

3. **Design-System Document for New Demos**:
   ```txt
   docs/demos/field-supply-{reference}-inspired/DESIGN.md
   ```
   *Example*: `docs/demos/field-supply-clyde-inspired/DESIGN.md`

4. **Existing Flat Demo Docs**:
   Existing flat files such as `docs/demos/field-supply-darkroom-inspired.md` should not be broken. If adding `DESIGN.md` to an existing flat-doc demo, either migrate the demo documentation to a folder cleanly or add `docs/demos/<demo-slug>/DESIGN.md` and link between the flat notes and the folder docs.

5. **Audit & Evidence Assets Directory**:
   ```txt
   .tmp/reverse-engineer/field-supply-{reference}-inspired/
   ```
   *Example*: `.tmp/reverse-engineer/field-supply-clyde-inspired/manifest.json`

---

## Clarification Contract Before Planning

Before proposing or implementing a reference-inspired demo, state the transfer contract and ask only for missing context.

### Required Dimensions
- **Target mode**: `Motion-only transfer`, `Visual restyle`, `Editorial redesign`, or `Full concept demo`.
- **Baseline preservation**: `/sample` is immutable by default and the output route must be explicit.
- **Light/dark direction**: ask when either could work; do not silently convert a light baseline into dark mode.
- **Layout and copywriting permission**: state what is preserved, what may change if approved, and what will not change without approval.
- **Asset generation permission**: default to no new image assets; ask before generating supporting assets.
- **Motion intensity**: default public demo routes to `Showcase demo`, visible within 3 seconds without debug mode.
- **Technical preference**: ask only when relevant; otherwise use the simplest robust clean-room approach.
- **Documentation**: name the `DESIGN.md` and clean-room notes paths.

### Standard Clarification Format
```markdown
## Clarification Needed

### Proposed route
`/demos/...`

### Baseline preservation
I will not modify `/sample`.

### Transfer mode
Recommended: Motion-only transfer / Visual restyle / Editorial redesign / Full concept demo

### Light or dark direction
Recommended: Light / Dark
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
I will create:
`docs/demos/<demo-slug>/DESIGN.md`

### Questions
1. ...
2. ...
```

### Standard Plan Format
```markdown
## Implementation Plan

### Route
...

### Transfer contract
- Mode:
- Light/dark:
- Preserve:
- Allowed changes:
- Not allowed:

### Reference findings
...

### Clean-room transformation
Observed principle:
...

Implementation decision:
...

Intentionally changed:
...

### DESIGN.md output
...

### Files to create/change
...

### Validation
...
```

---

## Clean-Room Documentation Template

Every new demo must include a completed copy of `skills/web-reverse-engineer/templates/clean-room-notes.md`, saved at `docs/demos/field-supply-{reference}-inspired/clean-room-notes.md`:

```markdown
# Clean-Room Notes: Field Supply — {Reference}-Inspired

## Baseline
- Source route: `/sample`
- Must remain unchanged: yes

## Reference
- URL: [Insert target URL, e.g., https://joinclyde.com]
- Inspection date: [YYYY-MM-DD]

## User-approved transfer contract
- Transfer mode: [Motion-only transfer / Visual restyle / Editorial redesign / Full concept demo]
- Light/dark direction: [Light / Dark]
- Motion intensity: [Calm production / Showcase demo / Debug/analysis]
- Layout changes allowed: [Yes/No/details]
- Copy changes allowed: [Yes/No/details]
- Asset generation allowed: [No new assets / SVG-CSS-canvas only / generated images with permission]
- Output route: `/demos/field-supply-{reference}-inspired`

## Observed principles
List the visual, layout, scroll, or animation principles observed:
* **Principle 1**: [e.g., Slow floating background gradient mesh with high Gaussian blur]
* **Principle 2**: [e.g., Staggered letter-spacing reveal transitions on headers]

## Clean-room implementation decisions
Detail how you rebuilt these effects from scratch without copying proprietary assets or minified scripts:
* **Decision 1**: [e.g., Simulated the gradient mesh via absolute CSS circles using backdrop-filter blur]
* **Decision 2**: [e.g., Orchestrated entry transitions using standard Tailwind delays and Framer Motion]

## What changed from baseline
Document what visual styles, backgrounds, colors, typography, or spacing choices were added or modified relative to the original `/sample` site:
* **Background**: [e.g., Changed from warm off-white to deep slate gray]
* **Typography**: [e.g., Lifted letter-spacing, altered font sizing]
* **Animations**: [e.g., Added layout-based fades and scrolling transforms]

## What was preserved from baseline
* **Brand**: [e.g., Field Supply brand identity and local assets were preserved]
* **Copywriting**: [e.g., Existing product copy was preserved]
* **Layout**: [e.g., Section order was preserved]

## What was not copied from reference
* **Code & Scripts**: [e.g., No original JavaScript bundles, shaders, or compiled stylesheet rules were copied]
* **Logos & Brand Assets**: [e.g., Reference brand marks, iconography, and copy were omitted]

## Generated/local assets
* [Document whether no new assets, local SVG/CSS/canvas only, or approved generated images were used]

## DESIGN.md
* Path: `docs/demos/field-supply-{reference}-inspired/DESIGN.md`

## Evidence
* Audit manifest path: `.tmp/reverse-engineer/field-supply-{reference}-inspired/manifest.json`
* Reference screenshot: `.tmp/reverse-engineer/field-supply-{reference}-inspired/reference.png`
* Clean-room screenshot: `.tmp/reverse-engineer/field-supply-{reference}-inspired/implementation.png`

## Validation
* Lint status: [Passed/Failed]
* Typecheck status: [Passed/Failed]
* Production Build: [Successful/Failed]
```
