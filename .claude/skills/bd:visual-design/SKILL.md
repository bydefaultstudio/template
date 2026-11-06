---
name: visual-design
description: "Use for layout, composition, colour, imagery, spacing and hierarchy on any visual output (web pages, decks, social, print, identity applications). Rules and numbers for making work feel considered rather than templated."
---

# Visual design

Start with `/bd:design-direction` if the work is new. This skill covers execution.

## Hierarchy

- Three levers: **size, weight, colour**. Use one or two between neighbouring levels. Save all three for the single most important element.
- One entry point and one focal point per view. Name it, make it win, demote the rest.
- Size steps between levels of at least 1.5x.
- Labels sit below values: smaller, lighter or muted.
- Tests: squint (or blur) test and greyscale test. Hierarchy must survive both.
- Differentiate one element only. If everything is highlighted, nothing is.

## Composition and spacing

- Spacing scale: **4, 8, 16, 24, 32, 48, 64, 96, 128**. No off-scale values.
- Space between groups is always larger than space within groups.
- A heading gets at least twice the space above it that it has below.
- Section gaps: 120 to 240px desktop, 72 to 112px phone.
- Grids: 12 columns desktop, 8 tablet, 4 mobile. Gutters 16 to 32. Outer margins 16 to 32px, equal on both sides.
- Pick 2 or 3 strong alignment edges per page and stick to them.
- Balance can be symmetric or asymmetric, but it must look intended.
- Watch for "visual cliffs": a crowded section next to an empty one. No blank stretch over half a screen except one deliberate rest.
- No two neighbouring sections share the same layout.
- Break the grid on purpose, for emphasis, never by accident.

## Colour

- **Proportion:** ground 70 to 90%, ink for text, accent under 5% of a screen. Put the accent on the action and at most one other thing. Not on headings, icons or bullets.
- 4 to 5 tinted neutrals (warm or cool, never flat grey) plus 1 to 3 accents. Same colour, same meaning everywhere.
- No pure black or white for large areas. Use near-black and off-white with a slight tint.
- Separate surfaces with tone, not lines (2 to 6 lightness points apart). Don't nest panel inside panel.
- Colour fields can work like chapters: hard edges, each field with its own ink, neighbours differ in lightness, not only hue.
- Never use colour as the only signal.
- Dark mode: show elevation with lighter surfaces, not shadows. Desaturate brand colours 10 to 20%. Body text around #E0E0E0, not pure white. Provide reversed logos.

## Depth

Choose one depth strategy per project (borders, soft shadows, tonal layers or flat) and commit. If using shadows, use a small scale (sm, md, lg) made of two layers: one tight and dark, one soft and wide.

## Imagery

- One dominant image beats six small ones.
- Two or three fixed aspect ratios per project (for example 4:5, 16:10, 1:1).
- One treatment for all images (untouched, greyscale, or multiply on a colour field).
- Art-direct crops per breakpoint. Portrait crops for phones.
- Text over images: a neutral scrim of 40 to 55% black over the text area only, and check contrast manually.
- Showing software: a real fragment at true size with numbers that add up. Never grey-bar fake UI.
- Illustration style is a decision: geometric or organic, flat or dimensional, detailed or minimal, line weight, and a palette subset. Write it down.

## Polish

- Concentric radius: outer radius = inner radius + padding.
- Buttons are square or fully round, decided once. The soft 9 to 16px radius is the weak default.
- Design error, empty and loading states with the same care as the main view. One rough screen lowers trust in every screen around it.
- Stress-test with real and worst-case content (see `web/references/worst-case-content.md`).

## When the design looks "safe"

Reframe: what if this were a magazine spread, a record sleeve, a protest poster, a museum label, a shop window? Fill space with scale, real content, real pictures or flat colour, never another ornament.

Sources: Owl-Listener/designer-skills, Leonxlnx/taste-skill, wondelai refactoring-ui and top-design, Dammyjay93/interface-design, bencium impact-designer (all MIT).
