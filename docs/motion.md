---
title: "Motion"
subtitle: "Motion tokens for transitions and animation"
description: "Complete reference for motion primitives including easing curves, duration scale, CSS and JavaScript usage, and reduced-motion support."
section: "Design System"
order: 6
---

> Claude: Treat this document as authoritative.

Motion tokens define **timing and rhythm**, not intent. The same primitives are reused for hovers, transitions, and animations depending on context.

Durations follow the same t-shirt scale as `--space-*` and `--font-*`; easings use the standard CSS keyword names (`in`, `out`, `in-out`) with refined cubic-bezier values replacing the browser defaults. There is deliberately **no semantic motion layer** — components reference the primitives directly.

## Easing Primitives

Three curves, defined in `design-system.css` §4:

| Token | Value | Use for |
| --- | --- | --- |
| `var(--ease-in)` | `cubic-bezier(0.4, 0, 1, 1)` | Exits. Fast start, slow end — the element accelerates away. |
| `var(--ease-out)` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances. Slow start with a long graceful tail — the element settles into place. |
| `var(--ease-in-out)` | `cubic-bezier(0.65, 0, 0.35, 1)` | Swaps and continuous motion. Symmetric — reads as a single sweep. |

Most UI feedback (hovers, state changes) uses `--ease-out`.

## Duration Primitives

Six steps on the shared t-shirt scale:

| Token | Value | Use for |
| --- | --- | --- |
| `var(--duration-2xs)` | `100ms` | Hovers, presses, instant feedback |
| `var(--duration-xs)` | `200ms` | Small UI feedback (focus rings, tooltips, toasts) |
| `var(--duration-s)` | `400ms` | Element-level transitions (dropdowns, link hovers, fade swaps) |
| `var(--duration-m)` | `600ms` | Surface-level transitions (drawers, modals, background shifts) |
| `var(--duration-l)` | `800ms` | Page-level entrances |
| `var(--duration-xl)` | `1200ms` | Hero motion, deliberate reveals |

## Usage in CSS

Always reference the tokens — never hardcode `cubic-bezier()` or millisecond values:

```css
.card {
  transition: transform var(--duration-xs) var(--ease-out);
}
```

The design system itself composes them this way. Links transition colour and underline offset at element pace:

```css
a {
  transition:
    color var(--duration-s) var(--ease-out),
    text-underline-offset var(--duration-s) var(--ease-out);
}
```

The button mixes durations per property — a slow background fade with instant feedback on everything else:

```css
.button {
  transition:
    background-color var(--duration-m) var(--ease-out),
    color var(--duration-2xs) var(--ease-out),
    border-color var(--duration-2xs) var(--ease-out),
    opacity var(--duration-2xs) var(--ease-out),
    transform var(--duration-2xs) var(--ease-out);
}
```

<div class="demo-preview is-centered">
  <button class="button" type="button">Hover me</button>
  <button class="button" data-variant="outline" type="button">And me</button>
</div>

## Usage in JavaScript

Read the tokens via `getComputedStyle` so JS animations stay in sync with CSS:

```js
function readToken(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

const duration = parseInt(readToken("--duration-s"), 10); // 400
const easing = readToken("--ease-out");

element.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing });
```

## Reduced Motion

Respect `prefers-reduced-motion` for any non-essential movement — especially transforms and large entrances:

```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

The button already handles this: its `:active` press scale is disabled for reduced-motion users, while colour transitions (which don't move anything) remain.

In JavaScript, check the preference before animating:

```js
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion) {
  element.animate(keyframes, { duration, easing });
}
```
