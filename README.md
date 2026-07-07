# Web Reverse Engineering for Clean-Room Reimplementation

> **🔗 Live demo:** _coming soon_ <!-- TODO: fill in after human connects Netlify -->

A public portfolio demonstration showcasing a clean-room workflow: inspecting a public reference website to understand its complex visual and technical mechanisms, extracting high-level animation/design principles, and building an original, brand-different implementation from scratch.

This repository serves as a proof of concept showing how to study premium web designs ethically, without replicating proprietary source code or violating copyright and trademark boundaries.

---

## The Core Philosophy

> **Inspect a public reference to understand technical and visual mechanisms, then build a distinct original page inspired by the discovered principles.**

This project is **not** for copying websites or exact page expressions. Rather than producing exact reproductions, we translate raw visual deconstruction into reusable design principles, which are then applied through an explicit transfer contract covering colors, motion tuning, copywriting, assets, and layouts.

### Why Standard Design Export Tools Fall Short
Traditional design extraction tools (such as CSS extractors or browser extensions) are excellent at pulling static tokens: font sizes, margin spacing, static hex colors, and basic images. However, they are completely blind to:
1. **Procedural Animations:** E.g., custom HTML5 `<canvas>` rendering loops, math-driven curves, particle systems, and shader setups.
2. **Scroll-Driven Motion:** Dynamic calculations linked to viewport offset, custom scroll friction systems (e.g., Locomotive Scroll, GSAP ScrollTrigger).
3. **Complex State Interaction:** Advanced micro-interactions, blend modes (`mix-blend-mode`), and physics-based transitions.
4. **Build-Time Bundling:** Obfuscated, chunked bundles containing dynamic runtime rendering parameters.

This project demonstrates a deeper level of web deconstruction: auditing the running page, abstracting its mechanics into mathematical rules, and writing high-performance React/TypeScript code from scratch.

---

## Legal & Ethical Guardrails

To ensure absolute respect for intellectual property, this project adheres to strict clean-room engineering principles:

* **No Code Copying:** Proprietary JavaScript packages, production bundles, stylesheets, or WebGL/shader files are never copied or reused.
* **No Asset Copying:** We do not download or host copyrighted assets (trademarks, vector files, logos, custom fonts, images, or media) from the reference site.
* **Brand Separation:** Demonstrations use neutral or fictional product contexts with original copy and completely distinct typography.
* **Different Visual Palette:** We shift reference palettes into new product contexts and re-tune animation velocities/formulas.
* **Design Terms:** We frame our work as *"inspired by"*, *"clean-room reconstruction"*, *"style transfer"*, and *"technical deconstruction"*. We avoid terms that imply exact copying.

For the full list of rules, see [`docs/legal-ethical-guardrails.md`](docs/legal-ethical-guardrails.md).

---

## 🛠️ Project Structure

```txt
web-reverse-engineer-demo/
  app/                        # Next.js App Router Pages
    layout.tsx                # Root Layout
    page.tsx                  # Homepage describing methodology
    sample/                   # Immutable "before" baseline (Field Supply)
    demos/                    # Isolated clean-room demo routes
  components/
    site/                     # Shared Main Website Components
      Header.tsx
      Footer.tsx
    sample/
      FieldSupplyPage.tsx     # Baseline page component (do not edit during experiments)
    demos/                    # Per-demo layout components
    animation/                # Specialized Canvas/Trig animation components
  docs/                       # Research Documentation
    methodology.md            # Step-by-Step Technical Process
    legal-ethical-guardrails.md
    demos/                    # Per-demo clean-room notes and DESIGN.md files
      <demo-slug>/
        clean-room-notes.md
        DESIGN.md
  skills/
    web-reverse-engineer/
      SKILL.md                # Reusable, project-portable skill definition
      scripts/
        scrape_site_assets.js # Playwright-based Inspection Tool
  .tmp/
    reverse-engineer/         # Gitignored, per-demo temporary audit evidence
  public/                     # Public Static Assets
```

---

## Getting Started

### Prerequisites
* Node.js v18+
* pnpm (preferred) or npm

### Installation
Clone the repository and install dependencies:
```bash
pnpm install
```

Install Playwright Chromium binaries (required for the deconstruction script):
```bash
pnpm exec playwright install chromium
```

---

## Project-local skill

This repository includes a project-local copy of the `web-reverse-engineer` skill under `skills/web-reverse-engineer`.

The skill documents the workflow used to inspect reference websites, extract high-level runtime animation/design principles, and rebuild distinct clean-room demos.

Before any reference-inspired demo is proposed or implemented, the agent must state a clarification contract:

* **Transfer mode:** `Motion-only transfer`, `Visual restyle`, `Editorial redesign`, or `Full concept demo`.
* **Baseline preservation:** `/sample` is immutable by default, and experiments go under `/demos/...`.
* **Light/dark direction:** ask or propose direction when either could work; never silently convert a light baseline into dark mode.
* **Layout and copywriting permission:** state what is preserved, what may change if approved, and what will not change without approval.
* **Asset generation permission:** default to no new image assets; ask before generating supporting assets.
* **Motion intensity:** public demos default to `Showcase demo`, visible within 3 seconds without debug mode.
* **Design documentation:** new demos create `docs/demos/<demo-slug>/DESIGN.md` and `docs/demos/<demo-slug>/clean-room-notes.md`. Real project applications create or update root-level `DESIGN.md`.

This skill (`SKILL.md`) is written to be generic and portable — you can copy `skills/web-reverse-engineer/SKILL.md` into any other project. Repository-specific conventions (baseline route, demo naming, docs paths) live separately in [`AGENTS.md`](AGENTS.md).

---

## 💻 Commands

### 1. Run the Deconstruction Script
To audit a reference URL, trace its asset payload, and discover its canvas setup:
```bash
node skills/web-reverse-engineer/scripts/scrape_site_assets.js https://www.joinclyde.com
```
This writes a JSON manifest report containing page viewport metadata, canvas sizes/contexts, and stylesheet details to:
`.tmp/reverse-engineer/www_joinclyde_com_manifest.json`

### 2. Run the Web Application
Launch the local Next.js server to view the main site and available demos:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

* Main Home page: `http://localhost:3000/`
* Baseline sample page: `http://localhost:3000/sample`
* Demo routes: `http://localhost:3000/demos/<demo-slug>`

### 3. Check Code Quality & Build
```bash
pnpm run lint        # Run ESLint
pnpm run typecheck   # Check TypeScript types
pnpm run build       # Build Next.js production build
```

---

## Included Demos

* **Clyde-inspired background field** (`/demos/joinclyde-background-field`) — dark-theme, whole-page style transfer with a programmatic Canvas 2D ambient background of drifting gradient bands and translucent panels (reference: joinclyde.com).
* **Ochi interactions–inspired** (`/demos/field-supply-ochi-interactions-inspired`) — light-theme, motion-only micro-interaction transfer: pointer-aware eyes driven by `atan2` vector math, masked row reveals, marquee text bands, and magnetic hover targets (reference: ochi.design).
* **Stripe Sessions–inspired** (`/demos/field-supply-stripe-sessions-inspired`) — light-theme hero-section animation transfer with a programmatic Canvas 2D sine-wave gradient plane (reference: stripe.com/sessions/2026).

Each demo has its own `clean-room-notes.md` and `DESIGN.md` under `docs/demos/<demo-slug>/`.

---

## Install the skill

The reusable skill lives in [`skills/web-reverse-engineer/`](skills/web-reverse-engineer/). Three ways to use it in your own projects:

### Project-local copy
Copy the skill folder into your project (adjust the destination to wherever your agent tool discovers skills, e.g. `.claude/skills/`):
```bash
cp -r skills/web-reverse-engineer /path/to/your-project/.claude/skills/web-reverse-engineer
```

### Global copy
Copy the same folder into your agent tool's user-level skills directory so it is available in every project. The exact location varies by tool — for example `~/.claude/skills/` for Claude Code; check your tool's documentation for its skills path.

### npm (once published)
```bash
npm install web-reverse-engineer
```
Then copy `node_modules/web-reverse-engineer/SKILL.md` (and `scripts/`) into your skills directory as above. _Not yet published — see roadmap._

## Roadmap
* [ ] Additional reference-inspired demo (TBD)
* [ ] Expand `docs/methodology.md` with a worked example walkthrough