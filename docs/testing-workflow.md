# Field Supply — Demo Testing Workflow

This document outlines the testing workflow and conventions for implementing style-transfer and reverse-engineering experiments in this project.

---

## Testing Workflow Guidelines

To ensure stable, repeatable, and clean testing conditions:

1. **Clarification Contract**:
   Before any implementation plan or code change, the agent must state the transfer contract and ask only for missing context:
   * Target mode: `Motion-only transfer`, `Visual restyle`, `Editorial redesign`, or `Full concept demo`.
   * Baseline preservation: `/sample` remains unchanged by default, and the output route must be stated.
   * Light/dark direction: ask when either direction could work; do not silently convert a light baseline into dark mode.
   * Layout and copywriting permission: state what is preserved, what may change if approved, and what will not change without approval.
   * Asset generation permission: default to no new image assets; ask before generating supporting images, textures, icons, or other major assets.
   * Motion intensity: default public demos to `Showcase demo`, visible within 3 seconds without debug mode.
   * Technical preference: ask only when relevant; otherwise use the simplest robust clean-room approach.
   * Design documentation: every demo needs `DESIGN.md` plus clean-room notes.

2. **Baseline Preservation**: 
   The `/sample` route serves as the immutable, neutral baseline. Under no circumstances should `/sample` or its core component `components/sample/FieldSupplyPage.tsx` be mutated during experiments, unless explicitly requested by the user.

3. **Isolated Routes**: 
   Every new experiment or reference-inspired style transfer gets its own dedicated route under `/demos/<demo-slug>`. For example:
   * `/demos/field-supply-clyde-inspired`
   * `/demos/field-supply-darkroom-inspired`
   * `/demos/field-supply-fleava-inspired`
   * `/demos/field-supply-vovi-inspired`

4. **Isolated Notes and Design Documentation**: 
   Each new demo must have:
   ```txt
   docs/demos/<demo-slug>/clean-room-notes.md
   docs/demos/<demo-slug>/DESIGN.md
   ```
   Existing flat notes such as `docs/demos/<demo-slug>.md` should not be broken. If adding `DESIGN.md` for an existing flat-doc demo, create a folder next to it and link between the files.

5. **Audit and Evidence Containment**: 
   Any dynamic runtime screenshots, Playwright audit manifests, or temporary research files generated during deconstruction must be saved under the dedicated folder:
   ```txt
   .tmp/reverse-engineer/<demo-slug>/
   ```
   Prefer normal-mode screenshots and video evidence. Debug overlays can supplement the proof, but they should not be the only evidence for a public demo.

6. **Commit Scope**: 
   * Generated files inside `.tmp/` must not be committed to Git by default (they are ignored in `.gitignore`).
   * Only commit verified source code files, documentation, reusable design assets, and curated evidence specifically selected for preservation.

---

## Test Prompt Bank

Use the following prompts for testing the reverse-engineering workflow:

### Test Prompt 1
```txt
Dùng skill `skills/web-reverse-engineer/SKILL.md`, inspect https://joinclyde.com rồi tạo demo riêng tại `/demos/field-supply-clyde-inspired`. Dùng `/sample` làm baseline, giữ nguyên brand/copy Field Supply, nhưng không sửa `/sample`. Hỏi phần còn thiếu trong transfer contract trước khi plan/code.
```

### Test Prompt 2
```txt
Inspect https://joinclyde.com và liệt kê các animation/runtime effect tìm được. Chưa code. Cho biết effect nào phù hợp nhất để apply vào một demo riêng dựa trên `/sample`, và đề xuất transfer mode/light-dark/motion intensity trước.
```

### Test Prompt 3
```txt
Tạo route `/demos/field-supply-clyde-inspired` từ `/sample`, dùng clean-room style transfer từ JoinClyde: dark premium background, glowing animated gradients, nhưng giữ copy Field Supply và không copy assets/code. Không sửa `/sample`. Tạo clean-room notes và `docs/demos/field-supply-clyde-inspired/DESIGN.md`.
```

### Test Prompt 4
```txt
Dùng `/sample` làm baseline. Inspect https://darkroom.kaploom.com rồi đề xuất cách tạo `/demos/field-supply-darkroom-inspired`: tối giản, atmospheric, editorial hơn. Chưa code và không sửa `/sample`. Hỏi trước nếu cần chuyển light baseline sang dark hoặc đổi layout/copy.
```

### Test Prompt 5
```txt
Test full workflow: clarify transfer contract, inspect JoinClyde, tạo audit manifest, viết clean-room notes và DESIGN.md, implement một hero animation tại `/demos/field-supply-clyde-inspired`, lưu normal-mode evidence screenshot, rồi chạy lint/typecheck/build. Không sửa `/sample`.
```
