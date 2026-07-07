# Web Reverse-Engineer Skill

This skill defines the workflow and helper scripts used to reverse-engineer public websites for the purpose of clean-room reimplementation.

## Overview

The `web-reverse-engineer` skill provides instructions and automation to audit reference sites, extract design and animation patterns, and reimplement them cleanly without copying proprietary assets or source code.

### Core Philosophy

The primary focus is **clean-room reimplementation**. 
This is **NOT** for copying a website, brand, or exact page expression. The goal is to:
1. **Analyze**: Understand how a page does canvas animations, WebGL rendering, scroll triggers, etc.
2. **Translate**: Extract high-level mathematical/design principles (e.g. "three blurred canvas blobs moving procedurally").
3. **Rebuild**: Implement a distinct, original version (e.g. "SignalForge with teal and purple palettes, new copy, and different speeds").

---

## Folder Structure

```txt
skills/web-reverse-engineer/
  SKILL.md             # The main instruction frontmatter/workflow file
  README.md            # This documentation file
  templates/
    clean-room-notes.md # Template for documenting reimplementations
    DESIGN.md           # Portable design-system template for demos/projects
  scripts/
    scrape_site_assets.js # Playwright deconstruction crawler
```

---

## Clarification Contract

Before an agent proposes or implements a reference-inspired demo, it must make the transfer contract explicit. Ask only for missing context, but cover these dimensions:

1. **Target mode**
   - `Motion-only transfer`: preserve layout, copywriting, assets, and brand; apply only animation/background/interaction principles.
   - `Visual restyle`: preserve core content and brand; allow palette, surfaces, spacing, section rhythm, typography treatment, and composition changes.
   - `Editorial redesign`: allow larger layout and copywriting changes while preserving the underlying product/theme.
   - `Full concept demo`: create a new fictional brand/page inspired by the reference, not tied to the existing baseline.

   Default: when the user says "dựa trên /sample", "giữ brand/copy", or "không sửa /sample", choose `Motion-only transfer` or `Visual restyle`. Do not substantially rewrite copy or layout unless explicitly approved.

2. **Baseline preservation**
   - Confirm whether the source page is protected.
   - Confirm the output route.
   - In this repo, `/sample` is immutable and experiments go under `/demos/...`.

3. **Light vs dark direction**
   - Ask or propose light/dark direction when either could work.
   - Default to light when the user asks to keep the current brand feel.
   - If the reference is dark or the user wants maximum visual impact, propose dark but ask first.
   - Never silently convert a light baseline into dark mode.

4. **Layout and copywriting permission**
   - State what will be preserved.
   - State what may change if approved.
   - Do not rewrite headlines, replace product copy, change core layout, or change brand identity unless the transfer mode allows it.

5. **Asset generation permission**
   - Default to no new image assets.
   - Programmatic canvas/CSS/SVG shapes are allowed when they are part of the implementation and do not copy reference assets.
   - Ask before generating new supporting assets, and never download or reuse proprietary assets from the reference site.

6. **Motion intensity**
   - `Calm production`: subtle, premium, low distraction.
   - `Showcase demo`: clearly visible within 3 seconds.
   - `Debug/analysis`: exaggerated motion or overlays for testing only.

   Default for public demo routes is `Showcase demo`. If a normal user cannot perceive the animation within 3 seconds without debug mode, the demo fails.

7. **Technical preference**
   - Ask only when relevant: CSS gradients/keyframes, Canvas 2D, WebGL, Framer Motion, simplest robust approach, or matching the reference mechanism where feasible.
   - Default to the simplest robust clean-room approach that achieves the visible effect.

8. **Design documentation**
   - Every demo or real project application must include a `DESIGN.md`.
   - Demo routes use `docs/demos/<demo-slug>/DESIGN.md` and `docs/demos/<demo-slug>/clean-room-notes.md`.
   - If an existing demo uses flat docs such as `docs/demos/<demo-slug>.md`, keep that file working and link it to the folder-based `DESIGN.md` if adding one.
   - Real projects use root-level `DESIGN.md`, updated carefully if it already exists.

Use the full Step 2 response format and post-clarification implementation plan in `SKILL.md`.

---

## How to Run the Audit Script

The local helper script crawls a target URL and records metadata about active canvas elements, style overrides, and network asset payloads.

### Prerequisites

Ensure you have playwright dependencies installed:
```bash
pnpm install
pnpm exec playwright install chromium
```

### Execution Command

```bash
node skills/web-reverse-engineer/scripts/scrape_site_assets.js <target-url>
```

For example, to audit JoinClyde:
```bash
node skills/web-reverse-engineer/scripts/scrape_site_assets.js https://www.joinclyde.com
```

### Expected Output & Caveats

1. **Manifest File**: Saved to `.tmp/reverse-engineer/[clean-domain]_manifest.json`. To prevent massive file sizes, large lists like loaded assets and animated elements are saved as a summary count with a capped sample of up to 50 items.
2. **Screenshot**: Full-page view saved to `.tmp/reverse-engineer/[clean-domain]_screenshot.png`.
3. **Terminal Output**: A concise text printout showcasing viewport metadata, canvas styles/counts, and request breakdowns.
4. **Canvas/WebGL Caveat**: Detection of WebGL or 2D contexts is **best-effort**. If a site already initialized a WebGL context, the canvas may reject subsequent `.getContext` calls in our evaluator script. Therefore, context type is checked defensively and might show as `already_bound_or_error` or `unknown`.

---

## Clean-Room Rules

Every developer/agent building a demo inspired by a reference site must:
- State the transfer contract before coding.
- Keep `/sample` unchanged unless the user explicitly requests otherwise.
- Create a copy of `skills/web-reverse-engineer/templates/clean-room-notes.md` inside `docs/demos/<demo-slug>/clean-room-notes.md` for new demos.
- Create a `DESIGN.md` from `skills/web-reverse-engineer/templates/DESIGN.md` inside `docs/demos/<demo-slug>/DESIGN.md` for new demos.
- Document all observed principles, implementation strategies, and differences.
- Keep `.tmp/` out of Git commits. Keep reference screenshots and manifests local.
- Never use branding elements, copywriting, or logos from the reference site.
- Avoid public wording that implies exact copying. Use "inspired by", "reconstruction", or "style transfer".
