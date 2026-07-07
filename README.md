# web-reverse-engineer

> A portable agent skill for studying public reference websites and rebuilding their mechanisms as original, clean-room implementations — plus a live demo app that shows the skill in action.
>
> [**🔗 Live demos**](https://web-reverse-engineer.netlify.app/)

This repository contains two things:

1. **The skill** — [`skills/web-reverse-engineer/`](skills/web-reverse-engineer/): a reusable, tool-agnostic workflow (SKILL.md + inspection scripts) you can install into any project. It teaches a coding agent how to inspect a running public website, extract high-level animation/design principles, and rebuild an original implementation from scratch.
2. **The demo app** — a Next.js site with three reference-inspired demos, built entirely by following the skill. It doubles as the proof of concept and the portfolio.

---

## The Core Philosophy

> **Inspect a public reference to understand technical and visual mechanisms, then build a distinct original page inspired by the discovered principles.**

This project is **not** for copying websites or exact page expressions. Raw visual deconstruction is translated into reusable design principles, which are then applied through an explicit transfer contract covering colors, motion tuning, copywriting, assets, and layouts.

### Why standard design export tools fall short

Traditional design extraction tools (CSS extractors, browser extensions) are excellent at pulling static tokens: font sizes, margins, hex colors, basic images. However, they are completely blind to:

1. **Procedural animations** — custom HTML5 `<canvas>` rendering loops, math-driven curves, particle systems, shader setups.
2. **Scroll-driven motion** — dynamic calculations linked to viewport offset, custom scroll friction systems (e.g., Locomotive Scroll, GSAP ScrollTrigger).
3. **Complex state interaction** — advanced micro-interactions, blend modes (`mix-blend-mode`), physics-based transitions.
4. **Build-time bundling** — obfuscated, chunked bundles containing dynamic runtime rendering parameters.

This skill operates at that deeper level: auditing the running page, abstracting its mechanics into mathematical rules, and writing high-performance React/TypeScript code from scratch.

---

## Install the skill

The skill is a self-contained folder: [`skills/web-reverse-engineer/`](skills/web-reverse-engineer/) with a `SKILL.md` (the workflow definition) and `scripts/` (a Playwright-based inspection tool). It's built on the open `SKILL.md` standard (agentskills.io), so most agent tools discover it automatically — the agent reads the YAML frontmatter (`name` + `description`) at startup and loads the full skill body only when a task matches it. No registration step beyond putting the folder in the right place.

### Get the skill folder

**Via npm** (recommended — always up to date):

```bash
npm install web-reverse-engineer
```

The skill lives at `node_modules/web-reverse-engineer/` (`SKILL.md` + `scripts/`). Copy it into the skills directory for your tool, per the table below.

**Or copy directly from this repo:**

```bash
cp -r skills/web-reverse-engineer /path/to/destination/
```

### Where each agent looks for it

| Tool | Project-scoped (this repo/team only) | Personal (every project) |
|---|---|---|
| **Claude Code** | `.claude/skills/web-reverse-engineer/` | `~/.claude/skills/web-reverse-engineer/` |
| **Codex CLI** | `.agents/skills/web-reverse-engineer/` (repo root) | `$HOME/.agents/skills/web-reverse-engineer/` |
| **Other `SKILL.md`-compatible tools** (Cursor, OpenClaw, …) | check the tool's docs — most follow the same `.agents/skills/` or tool-specific convention | same |

Example for Claude Code, global install:

```bash
cp -r node_modules/web-reverse-engineer ~/.claude/skills/web-reverse-engineer
```

Example for Codex CLI, personal install:

```bash
cp -r node_modules/web-reverse-engineer $HOME/.agents/skills/web-reverse-engineer
```

Once copied, asking the agent to "study this reference site and rebuild its hero animation" will trigger the skill automatically — no restart needed for Claude Code; Codex CLI picks up new skills automatically but a restart resolves it if one doesn't appear.

### No skill system in your tool?

Reference the file explicitly from its instructions file instead — e.g., add a line to your `AGENTS.md` / rules file:

```
For any reference-inspired rebuild task, first read and follow
skills/web-reverse-engineer/SKILL.md.
```

### What the skill enforces

Before any reference-inspired demo is proposed or implemented, the agent must state a **clarification contract**: the transfer mode (motion-only transfer, visual restyle, editorial redesign, or full concept demo), what is preserved vs. allowed to change (baseline, layout, copy, light/dark direction, assets), the motion intensity target, and where design documentation will live. The full contract and the 8-layer workflow are defined in [`SKILL.md`](skills/web-reverse-engineer/SKILL.md); repository-specific conventions for this repo live in [`AGENTS.md`](AGENTS.md).

---

## Live demos

Each demo restyles the same immutable baseline page ("Field Supply") on its own route, so you can flip between a demo and the baseline to see exactly what the transfer changed — and what it deliberately left alone.

| Demo | Live | Transfer | Reference |
|---|---|---|---|
| **Clyde-inspired background field** | [/demos/joinclyde-background-field](https://web-reverse-engineer.netlify.app/demos/joinclyde-background-field) | Dark-theme, whole-page style transfer — programmatic Canvas 2D ambient background of drifting gradient bands and translucent panels | joinclyde.com |
| **Ochi interactions–inspired** | [/demos/field-supply-ochi-interactions-inspired](https://web-reverse-engineer.netlify.app/demos/field-supply-ochi-interactions-inspired) | Light-theme, motion-only micro-interactions — pointer-aware eyes driven by `atan2` vector math, masked row reveals, marquee bands, magnetic hover targets | ochi.design |
| **Stripe Sessions–inspired** | [/demos/field-supply-stripe-sessions-inspired](https://web-reverse-engineer.netlify.app/demos/field-supply-stripe-sessions-inspired) | Light-theme hero animation — programmatic Canvas 2D sine-wave gradient plane | stripe.com/sessions/2026 |

**Baseline for comparison:** [/sample](https://web-reverse-engineer.netlify.app/sample) — the untouched "before" page every demo starts from.

Each demo documents its process in `docs/demos/<demo-slug>/` (`clean-room-notes.md` + `DESIGN.md`).

---

## Legal & Ethical Guardrails

To ensure absolute respect for intellectual property, this project adheres to strict clean-room engineering principles:

* **No code copying:** Proprietary JavaScript packages, production bundles, stylesheets, and WebGL/shader files are never copied or reused.
* **No asset copying:** Copyrighted assets (trademarks, vector files, logos, custom fonts, images, media) from the reference site are never downloaded or hosted.
* **Brand separation:** Demonstrations use neutral or fictional product contexts with original copy and completely distinct typography.
* **Different visual palette:** Reference palettes are shifted into new product contexts, and animation velocities/formulas are re-tuned.
* **Vocabulary:** The work is framed as *"inspired by"*, *"clean-room implementation"*, *"reimplementation"*, *"style transfer"*, and *"reference-inspired"*. Terms implying exact copying are avoided.

For the full list of rules, see [`docs/legal-ethical-guardrails.md`](docs/legal-ethical-guardrails.md).

---

## Run the demo app locally

You only need this section if you want to run the demos yourself or build on the repo. To just use the skill, see [Install the skill](#install-the-skill) above.

### Prerequisites

* Node.js v18+
* pnpm (preferred) or npm

### Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000):

* Main homepage: `/`
* Baseline sample page: `/sample`
* Demo routes: `/demos/<demo-slug>`

### Run the deconstruction script

To audit a reference URL, trace its asset payload, and discover its canvas setup, first install the Playwright Chromium binary (one-time):

```bash
pnpm exec playwright install chromium
```

Then point the script at a reference URL:

```bash
node skills/web-reverse-engineer/scripts/scrape_site_assets.js https://www.joinclyde.com
```

This writes a JSON manifest (page viewport metadata, canvas sizes/contexts, stylesheet details) to `.tmp/reverse-engineer/www_joinclyde_com_manifest.json`.

### Quality checks

```bash
pnpm run lint        # ESLint
pnpm run typecheck   # TypeScript
pnpm run build       # Production build
```

---

## Repository structure

```txt
web-reverse-engineer-demo/
  app/                        # Next.js App Router pages
    layout.tsx                # Root layout
    page.tsx                  # Homepage describing methodology
    sample/                   # Immutable "before" baseline (Field Supply)
    demos/                    # Isolated clean-room demo routes
  components/
    site/                     # Shared site components (Header, Footer)
    sample/
      FieldSupplyPage.tsx     # Baseline page component (do not edit during experiments)
    demos/                    # Per-demo layout components
    animation/                # Specialized Canvas/trig animation components
  docs/
    methodology.md            # Step-by-step technical process
    legal-ethical-guardrails.md
    demos/                    # Per-demo clean-room notes and DESIGN.md files
      <demo-slug>/
        clean-room-notes.md
        DESIGN.md
  skills/
    web-reverse-engineer/
      SKILL.md                # Reusable, project-portable skill definition
      scripts/
        scrape_site_assets.js # Playwright-based inspection tool
  .tmp/
    reverse-engineer/         # Gitignored, per-demo temporary audit evidence
  public/                     # Public static assets
```

Repository-specific agent conventions (baseline route, demo naming, docs paths) live in [`AGENTS.md`](AGENTS.md); the skill itself stays generic and portable.

---

## Roadmap

* [ ] Additional reference-inspired demo (TBD)
* [ ] Expand `docs/methodology.md` with a worked example walkthrough
