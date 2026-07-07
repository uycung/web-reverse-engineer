# Field Supply — Neutral Sample Site Documentation

This document explains the role, architecture, and design decisions of the neutral sample landing page for the fictional brand **Field Supply**.

---

## 1. Purpose of the Neutral Sample Site

In web reverse-engineering and style-transfer demos, having a stable "before" target is critical. The neutral sample site acts as a clean, realistic baseline website. 
Instead of writing design-rich implementations from scratch for every single demo, subsequent style-transfer demos can target this exact page structure and transform it using CSS, animations, and shader effects inspired by premium reference sites (e.g., JoinClyde, Fleava, Darkroom, or Vovi Studio).

Having this shared starting point allows clear **before/after comparisons** of the visual styles, motion systems, and deconstruction principles.

---

## 2. Why Field Supply Was Chosen

The fictional brand **Field Supply** (modern field gear and travel essentials) was chosen for several specific reasons:
* **Versatility**: The rugged-yet-refined everyday-carry aesthetic is neutral enough to support clean editorial layouts, minimal Swiss styles, high-motion 3D agency effects, or dark ambient neon GLSL glow effects.
* **Rich Structure**: It supports diverse layouts, containing headers, hero galleries, grid-based product cards, material bullet points, multi-use-case sections, reviews/quotes, and clean CTAs.
* **Realistic Content**: It uses solid, grounded product copy and realistic visual assets rather than typical generic "AI SaaS" placeholder content, making the final demos look like genuine, high-quality consumer products.

---

## 3. Route

The neutral baseline is served at:

`/sample`

A clear card linking to this route has been added to the main demo page index.

---

## 4. Stable Section IDs

To make this page easily targetable for future style-transfer demos, we use stable, descriptive DOM section IDs. **Subsequent demos should keep these IDs intact** to allow simple DOM selectors to bind to scroll timelines or apply specialized stylesheet modifications:

| Section Name | DOM ID | Content / Purpose |
| :--- | :--- | :--- |
| Header / Navigation | `sample-header` | Main navbar containing brand logo, menu links, and primary CTA. |
| Hero Section | `sample-hero` | Brand positioning, primary tagline, secondary navigation button, and flat-lay graphics. |
| Product Highlights | `sample-products` | Grid layout of three main products (Transit Pack, Field Pouch, All-Weather Rolltop). |
| Materials Section | `sample-materials` | Descriptive list of materials (waxed canvas, lining, hardware) and swatch assets. |
| Lifestyle Section | `sample-lifestyle` | 3-column study of transition use-cases (commute, studio, trailhead). |
| Testimonial / Quote | `sample-quote` | Editorial quote component attributed to Mara Chen, location scout. |
| CTA / Footer Box | `sample-cta` | Final kit bundle CTA encouraging user interaction. |

---

## 5. Reusable Demo Strategy

Future demos that use this page as a baseline should follow this workflow:

1. **Duplicate or Wrapper Route**: Create a new route (e.g., `/demos/[reference-name]-inspired`) that either imports this page's underlying layout structure or overrides it via a layout wrapper.
2. **Apply Style Sheets & Animation Scripts**: Include custom stylesheets or import specialized motion scripts (such as Framer Motion, GSAP, or custom Canvas loops) to dynamically inject animations into the DOM nodes identified by the IDs above.
3. **Keep Copy & Structure Intact**: The text copy, labels, and product properties should remain identical to ensure the style transfer is a pure demonstration of **design and motion shifts** rather than content rewriting.

---

## 6. What Should Remain Stable for Comparison

To keep comparisons clean and mathematically comparable (e.g., in clean-room deconstruction reports), please keep the following elements stable:
* All text strings in titles, cards, and bullets.
* All DOM node section IDs (`sample-header` through `sample-cta`).
* The relative visual positions and semantic elements of the content flow.
* The local relative paths of vector graphics assets:
  * [transit-pack.svg](../public/assets/field-supply/transit-pack.svg)
  * [field-pouch.svg](../public/assets/field-supply/field-pouch.svg)
  * [rolltop.svg](../public/assets/field-supply/rolltop.svg)
  * [material-swatches.svg](../public/assets/field-supply/material-swatches.svg)
  * [hero-composition.svg](../public/assets/field-supply/hero-composition.svg)
