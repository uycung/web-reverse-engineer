# `AGENTS.md`

# Next.js Version Awareness

This project may use a newer Next.js version than the agent's training data. Before changing framework-sensitive code, check the installed Next.js version and read the relevant local docs in `node_modules/next/dist/docs/`.

Do not assume older Pages Router/App Router conventions, caching behavior, metadata APIs, route handler APIs, or async params/searchParams behavior are still valid. Heed deprecation notices and validate with `pnpm typecheck` and `pnpm build`.

# Project Agent Rules

This repository is a demo and testbed for the project-local `web-reverse-engineer` skill.

The reusable skill lives at:

```txt
skills/web-reverse-engineer/SKILL.md
```

Read and follow that skill before implementing or modifying any reference-inspired demo.

---

## Skill Ownership

* Only modify skills within this repository, under `skills/web-reverse-engineer/`.
* Never modify agent configuration or skills outside the repository root — this includes any global or user-level agent config, regardless of which coding agent or tool is used.
* Keep `SKILL.md` generic enough to be installed into other projects.
* Put repository-specific demo rules in this `AGENTS.md`, not in `SKILL.md`.

---

## Baseline Preservation

`/sample` is the neutral Field Supply baseline.

Rules:

* Do not modify `/sample` during experiments unless the user explicitly asks.
* Do not modify `components/sample/FieldSupplyPage.tsx` unless the task is specifically about improving the baseline.
* Reference-inspired experiments must be created as separate demo routes.
* Keep before/after comparison possible.

Default demo route convention:

```txt
/demos/field-supply-{reference}-inspired
```

Example:

```txt
/demos/field-supply-ochi-interactions-inspired
/demos/field-supply-stripe-sessions-inspired
```

---

## Demo Isolation

New demos should normally use:

```txt
app/demos/<demo-slug>/page.tsx
components/demos/<DemoName>Page.tsx
components/animation/<EffectName>.tsx
docs/demos/<demo-slug>/clean-room-notes.md
docs/demos/<demo-slug>/DESIGN.md
.tmp/reverse-engineer/<demo-slug>/
```

Temporary evidence goes under:

```txt
.tmp/reverse-engineer/<demo-slug>/
```

Do not commit `.tmp` outputs by default.

If curated evidence is intentionally needed for publishing, copy selected files into a docs-controlled folder and keep file sizes reasonable.

---

## Transfer Contract First

Before coding any reference-inspired demo, state the transfer contract.

Include:

* reference URL,
* baseline route,
* output route,
* transfer mode,
* light/dark direction,
* layout permission,
* copywriting permission,
* asset generation permission,
* motion intensity,
* technical approach if relevant,
* `DESIGN.md` path,
* clean-room notes path,
* evidence path.

Do not proceed if the user has not approved or clearly implied the important parts.

---

## Layout and Copywriting

Do not change the following unless the user approved a transfer mode that allows it:

* Field Supply brand identity,
* product names,
* product descriptions,
* section order,
* baseline copywriting,
* local baseline SVG assets,
* core layout structure.

If layout or copy changes would improve the demo, propose them first.

Allowed by default for motion-only demos:

* background layer,
* animation wrappers,
* surface opacity,
* z-index and stacking context,
* motion-specific containers,
* reduced-motion fallback,
* small demo labels or comparison links when useful.

---

## Light / Dark Direction

Ask or propose light vs dark direction when not obvious.

Do not silently convert the light `/sample` baseline into dark mode.

If the user asks for maximum visual impact or the reference is strongly dark, propose a dark route as an option, but get confirmation before implementation.

---

## Asset Generation

Do not generate new images, textures, icons, SVG illustrations, or other visual assets unless the user approved asset generation.

Allowed without separate permission:

* programmatic canvas shapes,
* CSS gradients,
* React/CSS geometric shapes,
* animation-only drawing primitives.

Not allowed:

* downloading reference assets,
* copying logos,
* copying brand imagery,
* reusing custom fonts from the reference site,
* copying reference screenshots into the public UI.

---

## DESIGN.md Requirement

Every demo must include a design document.

For this repo, save it at:

```txt
docs/demos/<demo-slug>/DESIGN.md
```

Also create:

```txt
docs/demos/<demo-slug>/clean-room-notes.md
```

The clean-room notes should record:

* baseline,
* reference,
* inspection date,
* user-approved transfer contract,
* observed principles,
* clean-room implementation decisions,
* what changed from baseline,
* what was preserved from baseline,
* what was not copied from reference,
* generated/local assets,
* DESIGN.md path,
* evidence paths,
* validation status.

Existing examples already follow this structure for Stripe Sessions and Ochi-style demos, including approved transfer contract, preservation rules, evidence, DESIGN.md path, and validation results.

---

## Evidence and QA

For each demo, save temporary audit and QA evidence under:

```txt
.tmp/reverse-engineer/<demo-slug>/
```

Prefer normal-mode evidence:

* reference screenshot,
* implementation screenshot,
* animation frame sequence or short recording if useful,
* mobile screenshot,
* reduced-motion screenshot if the demo has animation.

Debug overlays may supplement evidence, but cannot be the only proof.

For animation demos, `pnpm build` passing is not enough.

The demo passes only if a normal viewer can perceive the intended effect in normal mode without reading an explanation.

---

## Validation

Before final response, run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

If a command is unavailable, inspect `package.json` and use the closest equivalent.

Also perform browser QA for demos when possible:

* desktop viewport,
* mobile viewport,
* no horizontal overflow,
* no console errors,
* reduced-motion behavior,
* text readability,
* animation visible in normal mode.

---

## Language and Positioning

Avoid copier language in public docs and final reports.

Do not use:

* clone,
* replica,
* perfect copy,
* copy exactly,
* duplicate.

Prefer:

* inspired by,
* clean-room implementation,
* reimplementation,
* style transfer,
* reference-inspired,
* observed principle,
* original implementation.

---

## Final Report Expectations

When finishing a demo task, report:

* route created,
* files changed,
* transfer contract followed,
* what changed,
* what was preserved,
* what was not copied,
* DESIGN.md path,
* clean-room notes path,
* evidence paths,
* lint/typecheck/build status,
* browser QA status,
* confirmation that `/sample` was not modified.