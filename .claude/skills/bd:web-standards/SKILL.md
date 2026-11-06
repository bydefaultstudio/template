---
name: web-standards
description: "Use for websites: site structure, navigation, page and section design, content models, Webflow builds, responsive behaviour, performance and pre-launch checks. Points to the pinned web interface rules and worst-case test content."
---

# Web

## Order of work

1. Audience and the site's one main job.
2. Message: the argument of each page, written before design.
3. Structure: sitemap, navigation, content model.
4. Direction (see `/bd:design-direction`), typography, tokens.
5. Design key templates, then the rest.
6. UX audit, accessibility check, performance check.
7. Final review (see `/bd:design-critique`), then Erlen signs off.

Each step has "done when" criteria recorded in the project's log. Steps can be deferred with a reason, never silently skipped.

## Pages are arguments

- Each section makes one claim and proves it. A section with no claim gets cut.
- This replaces the template sequence (hero, logos, 3 features, testimonial, pricing, CTA).
- Carry the idea through pricing, FAQ and footer. The commonest failure is a strong hero followed by stock blocks.
- Headlines: two lines or fewer at every width, around 32 characters.
- Never invent proof: no made-up clients, quotes, logos or numbers. Placeholder details must be listed for Erlen to confirm.

## Structure and navigation

- **Information architecture:** audit content (keep, revise, merge, remove), card sort (open for new structures, closed to check), draft, tree test, then sitemap and content model.
- Design from tasks inward, not from the homepage outward. Never mirror the client's org chart.
- Primary content no more than 3 levels deep.
- Top nav: 4 to 7 items. More than 7 means the structure needs work. Nav is usually a wordmark, 3 to 5 links and one action.
- No hamburger for primary navigation on desktop.
- Active state shown by more than colour (weight, underline or bar).
- The footer is a designed close, not a dumping ground.
- **Content model** (types, fields, relationships) drives components and maps directly to Webflow CMS collections.

## Responsive

- The phone is its own composition: re-break headlines, re-crop images to portrait, keep nav to one row.
- Breakpoints roughly 375, 640, 1024, 1440. Fluid type with `clamp()`.
- Use `min-height: 100dvh`, not `100vh`. Never disable zoom.
- Test at 320px and 2560px, at 200% zoom, and on a real mid-range phone over a slow connection.

## Performance is a design constraint

- Largest contentful paint under 2.5s. Layout shift under 0.1. Lighthouse 90 or above.
- Images: AVIF or WebP with `srcset`, explicit width and height (or `aspect-ratio`), lazy-load below the fold, prioritise the hero image.
- Fonts: WOFF2, subset, `font-display: swap`, preload only the critical file, total under about 200KB.
- Video over animated GIF, with a still fallback.
- Third-party scripts async or deferred.

## Scroll and interaction

- No scroll hijacking.
- Parallax only on decorative layers, never on text, and small (under about 8% of the element's movement).
- One "live thing" per site is plenty: an interaction built from real content that works with a thumb and never blocks reading.
- Horizontal galleries need an obvious affordance.

## Before launch

- Run the rules in `references/web-interface-guidelines.md` (accessibility, focus, forms, images, performance, touch, dark mode, locale). House override: sentence case for headings and buttons, not Title Case.
- Test every component with `references/worst-case-content.md` (long names, long emails, German compounds, zero, one and a million, missing images, right-to-left text).
- Check `/bd:accessibility-standards` and `/bd:motion`.
- Check the meta title, description, social share image and favicon.

## Handoff to developers

Tokens not hex values, every state, motion duration and easing, tab order, character limits and truncation, minimum and maximum content, text expansion, asset formats and sizes.

Sources: vercel-labs/web-interface-guidelines (MIT, pinned copy), emilkowalski/skill break-ui (MIT, pinned copy), Owl-Listener/designer-skills IA, navigation, responsive, handoff (MIT), Leonxlnx/taste-skill copy and layout (MIT), wondelai top-design and create-website (MIT).
