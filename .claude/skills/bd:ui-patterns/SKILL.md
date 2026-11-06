---
name: ui-patterns
description: "Use for interface design: components, buttons, forms, states, tokens, design systems, dashboards and app screens. Concrete rules for hierarchy, states and polish in product UI."
---

# UI

## Hierarchy inside interfaces

- Combine size, weight and colour. One 14px size can hold three tiers: value (600, primary ink), label (500, secondary), meta (400, muted).
- Four text levels: primary, secondary, tertiary, muted. Muted text must still pass contrast (see `/bd:accessibility-standards`).
- One filled primary button per section. Secondary is outlined or muted. Tertiary is text only.
- Button labels say what happens: "Save changes", not "OK" or "Submit". The word carries through: "Publish" becomes "Published".

## States (design all of them)

- Controls: default, hover, active, focus, disabled. Read-only must look different from disabled.
- Data: loading, empty, error, partial, success.
- Disabled: 40 to 50% opacity plus the proper attribute.
- Hover darkens 10 to 15%. Hover, focus and active always raise contrast, never lower it.
- Never hide actions behind hover only. Keep destructive actions visually separate.

## Forms

- Single column, labels above fields. Field width matches the expected input.
- Visible labels always. Placeholders show an example, never replace the label.
- Mark optional fields, not required ones.
- Validate on blur, not every keystroke. Error below the field, saying the cause and the fix.
- After a failed submit, move focus to the first error or an error summary.
- 5 options or fewer: radio buttons. 6 or more: a select.
- Correct input `type` and `autocomplete`. Inputs at 16px or more (stops phones zooming in).
- Prefer undo to "Are you sure?". High-stakes forms get a review step.

## Tokens and systems

- Three tiers: global (raw values), semantic (meaning), component. Themes change the semantic tier.
- Naming: `{category}-{property}-{variant}-{state}`. Names should evoke the brand's world where possible.
- Components never use raw values.
- Build order: native HTML element first, then an accessible headless primitive, and custom code only with full keyboard, focus and ARIA support.
- Record decisions in the project's decision record (direction, depth strategy, spacing base, type ratio, density, component specs with values). Later reviews treat recorded decisions as agreed, not as mistakes.

## Component spec template

Use, don't use, anatomy, variants, props, all states, behaviour, accessibility, motion (duration and easing), content limits and truncation, do's and don'ts.

## App screens and dashboards

- Colour on data, not on chrome. Roughly 3% coloured pixels.
- Headline numbers as type, not tiles: values around 16 to 40px, labels 12 to 16px. No icon circles.
- Deltas say good or bad, not just up or down. Zero change is grey.
- One hue per chart, four at most per screen. 3 to 5 faint gridlines. No legend for a single series.
- Tables: right-aligned tabular figures, small sentence-case headers, no zebra stripes, no heavy borders. If 3 of 10 columns do the work, cut the rest.
- Density changes row height, padding and type size together.
- Loading: skeletons at true size. Errors stay inside the block that failed.
- Every screen answers one question. The biggest block answers it.

## Polish

- One icon family, one stroke weight. No emoji as icons.
- `font-variant-numeric: tabular-nums` on numbers that change or line up.
- Nudge icons optically (about 1 to 2px) when they look off-centre.
- Consistent elevation and z-index scales.

Sources: Dammyjay93/interface-design, Owl-Listener/designer-skills, Leonxlnx/taste-skill app-screens, wondelai refactoring-ui, nextlevelbuilder quick-reference (all MIT).
