---
title: "Button"
subtitle: "CUBE button component: variants, sizes, colours, and states"
description: "How to use the button component's data-attribute API and state classes in the design system."
section: "Design System"
order: 8
---

> Claude: Treat this document as authoritative.

Buttons are interactive elements used to trigger actions. They size to their content by default and should communicate **clear intent and hierarchy**.

The `.button` class is **required**. The bare `<button>` element only gets a minimal reset (inherited font, no border, no background). Always add `class="button"` to get the full component appearance.

---

## Anatomy

The button uses a CSS pattern called **CUBE**: *Composition, Utility, Block, Exception*. The practical consequence for anyone writing HTML or CSS:

- **Attributes (`data-*`) change what the button looks like**: variant, size, colour, plus booleans for icon-only and full-width. In CUBE terms, these are *Exceptions*.
- **State classes (`.is-*`) change what the button is doing right now**: loading, disabled.
- **The base CSS is written once.** Every `data-*` attribute is a set of token overrides, so stacking multiple attributes composes without conflict. Each one rewrites its own tokens.

Each axis of variation has its own mechanism:

| Axis | Mechanism | Example |
|---|---|---|
| Variant (hierarchy) | `data-variant` | `data-variant="outline"` |
| Size | `data-size` | `data-size="small"` |
| Colour | `data-color` | `data-color="danger"` |
| Icon-only | `data-icon-only` (boolean) | `data-icon-only` |
| Full width | `data-full-width` (boolean) | `data-full-width` |
| State (transient) | `.is-*` class | `.is-loading` |

---

## Primary

The default `.button` is the most prominent action on the page: filled, high contrast, using `--text-primary` as its identity colour.

<div class="demo-preview is-joined is-centered">
  <button class="button">Primary Action</button>
  <button class="button" disabled>Primary Disabled</button>
</div>

```html
<button class="button">Primary Action</button>
<button class="button" disabled>Primary Disabled</button>
```

---

## Variants

Variants change shape and visual hierarchy. Use them to reduce visual competition between buttons on the same surface.

### Outline

Transparent background with a primary border. Use `data-variant="outline"` for secondary actions.

<div class="demo-preview is-joined is-centered">
  <button class="button" data-variant="outline">Secondary Action</button>
</div>

```html
<button class="button" data-variant="outline">Secondary Action</button>
```

### Faded

Subtle filled background (10% alpha of the button colour). Use `data-variant="faded"` for low-priority or passive actions.

<div class="demo-preview is-joined is-centered">
  <button class="button" data-variant="faded">Optional Action</button>
</div>

```html
<button class="button" data-variant="faded">Optional Action</button>
```

### Outline faded

Transparent background with a faded border. Use `data-variant="outline-faded"` for tertiary or utility actions.

<div class="demo-preview is-joined is-centered">
  <button class="button" data-variant="outline-faded">Tertiary Action</button>
</div>

```html
<button class="button" data-variant="outline-faded">Tertiary Action</button>
```

### Transparent

No background, no border. The button is invisible until hovered. Use `data-variant="transparent"` for icon buttons in toolbars, overlays, or minimal UI where the button chrome should disappear.

<div class="demo-preview is-joined is-centered">
  <button class="button" data-variant="transparent">Transparent</button>
</div>

```html
<button class="button" data-variant="transparent">Transparent</button>
```

### Text

Text-only button with no padding, background, or border. Adds an underline on hover. Use `data-variant="text"` for inline actions that should look like a text link but semantically remain a button.

<div class="demo-preview is-joined is-centered">
  <button class="button" data-variant="text">Learn more</button>
</div>

```html
<button class="button" data-variant="text">Learn more</button>
```

### All variants side by side

<div class="demo-preview is-centered">
  <button class="button">Primary</button>
  <button class="button" data-variant="outline">Outline</button>
  <button class="button" data-variant="faded">Faded</button>
  <button class="button" data-variant="outline-faded">Outline faded</button>
  <button class="button" data-variant="transparent">Transparent</button>
  <button class="button" data-variant="text">Text</button>
</div>

---

## Sizes

`data-size` reduces padding and font size. Use for dense UI, sidebar actions, or compact contexts.

<div class="demo-preview is-joined is-centered">
  <button class="button">Default</button>
  <button class="button" data-size="small">Small</button>
  <button class="button" data-size="xsmall">Extra small</button>
</div>

```html
<button class="button">Default</button>
<button class="button" data-size="small">Small</button>
<button class="button" data-size="xsmall">Extra small</button>
```

Sizes compose with variants:

<div class="demo-preview is-centered">
  <button class="button" data-variant="outline" data-size="small">Small outline</button>
  <button class="button" data-variant="faded" data-size="xsmall">Xsmall faded</button>
</div>

---

## Icon-only

A boolean attribute. Add `data-icon-only` to give the button equal padding on all sides, designed for buttons whose content is a single icon. Icons sit inside a `.svg-icn` wrapper, sized by `--icon-size`. Always include `aria-label` for accessibility.

<div class="demo-preview is-joined is-centered">
  <button class="button" data-icon-only aria-label="Close"><span class="svg-icn"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span></button>
  <button class="button" data-icon-only data-variant="faded" aria-label="Add"><span class="svg-icn"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>
  <button class="button" data-icon-only data-variant="outline" aria-label="Add"><span class="svg-icn"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>
  <button class="button" data-icon-only data-color="danger" aria-label="Delete"><span class="svg-icn"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span></button>
</div>

```html
<button class="button" data-icon-only aria-label="Close">
  <span class="svg-icn"><!-- inline SVG --></span>
</button>

<button class="button" data-icon-only data-variant="faded" aria-label="Add">
  <span class="svg-icn"><!-- inline SVG --></span>
</button>
```

Icons also work alongside text; the gap between icon and label is controlled by `--button-gap`.

---

## Full width

A boolean attribute. Add `data-full-width` to make the button span its container. Use for form submits, stacked CTAs on narrow viewports, and modal primary actions.

<div class="demo-preview is-joined">
  <button class="button" data-full-width>Submit</button>
</div>

```html
<button class="button" data-full-width>Submit</button>
```

---

## Colour

`data-color` applies a status colour. It only overrides `--button-color` — the colour cascades through the component's tokens, so every variant picks it up automatically. Each semantic name has a plain-colour alias that produces identical output.

| Semantic | Alias | Use for |
|---|---|---|
| `data-color="danger"` | `data-color="red"` | Destructive actions, errors |
| `data-color="success"` | `data-color="green"` | Confirmations, positive outcomes |

<div class="demo-preview is-joined is-centered">
  <button class="button" data-color="danger">Danger</button>
  <button class="button" data-color="success">Success</button>
  <button class="button" data-variant="outline" data-color="danger">Danger</button>
  <button class="button" data-variant="faded" data-color="success">Success</button>
</div>

```html
<button class="button" data-color="danger">Danger</button>
<button class="button" data-color="success">Success</button>
<button class="button" data-variant="outline" data-color="danger">Danger</button>
<button class="button" data-variant="faded" data-color="success">Success</button>
```

Use `data-color` for meaning, not decoration. If hierarchy already communicates the intent, a variant alone is enough.

---

## Hover & press behaviour

All buttons transition on hover.

**Filled buttons**: the identity colour shifts via `color-mix`, blending 10% of the background into it. Coloured buttons (`data-color`) instead blend 15% of `--text-primary` into their status colour.

**Unfilled variants** (outline, faded, outline-faded, transparent): gain a subtle fill at 5% alpha of the button's identity colour.

```css
/* Filled hover */
.button:hover {
  --button-color: color-mix(in srgb, var(--text-primary), var(--background-primary) 10%);
}

/* Unfilled hover */
.button[data-variant="outline"]:hover,
.button[data-variant="faded"]:hover,
.button[data-variant="outline-faded"]:hover,
.button[data-variant="transparent"]:hover {
  background-color: color-mix(in srgb, var(--button-color), var(--alpha-5));
}
```

The **text** variant adds an underline on hover instead of a background fill.

When pressed (`:active`), the button scales down to 98% to simulate a physical press:

```css
.button:active {
  transform: scale(0.98);
}
```

The text variant is excluded from the press effect (it has no visible container to scale), and users who prefer reduced motion see no transform.

---

## States

States are transient — runtime-toggled, not permanent properties. They use `.is-*` classes.

| Class | Purpose |
|---|---|
| `disabled` attribute or `.is-disabled` | Opacity 0.4, pointer events disabled |
| `.is-loading` | Opacity 0.6, pointer events disabled |

<div class="demo-preview is-joined is-centered">
  <button class="button">Default</button>
  <button class="button" disabled>Disabled</button>
  <button class="button is-loading">Saving...</button>
</div>

```html
<button class="button" disabled>Disabled</button>
<button class="button is-loading">Saving...</button>
```

Prefer the native `disabled` attribute on `<button>`; use `.is-disabled` for elements that don't support it (see disabled links below). Loading buttons should also set `aria-busy="true"` for screen readers.

---

## Buttons vs links

All attributes and state classes work identically on `<button>` and `<a class="button">` — the CSS targets `.button` and doesn't care about the element.

Choose the element by semantics: use `<button>` when clicking **does something on this page**; use `<a href>` when clicking **goes somewhere else**.

<div class="demo-preview is-joined is-centered">
  <button class="button" type="submit">Submit (button)</button>
  <a class="button" href="#" data-variant="outline">Navigate (link)</a>
</div>

```html
<button class="button" type="submit">Submit (button)</button>
<a class="button" href="/work" data-variant="outline">Navigate (link)</a>
```

### Disabled links

HTML has no native `disabled` on `<a>`. Use this three-part pattern so the link is visually, functionally, and programmatically disabled:

<div class="demo-preview is-joined is-centered">
  <a class="button is-disabled" aria-disabled="true" tabindex="-1">Can't click</a>
</div>

```html
<a class="button is-disabled"
   aria-disabled="true"
   tabindex="-1">
  Can't click
</a>
```

### Accessibility checklist

- Icon-only buttons (`data-icon-only`) **must** include `aria-label` describing the action
- Loading buttons (`.is-loading`) should set `aria-busy="true"`
- The focus ring appears automatically on `:focus-visible` via the global reset — no extra markup needed
- Disabled links require `aria-disabled="true"` and `tabindex="-1"` alongside `.is-disabled`

---

## Button group

`.button-group` is a wrapping flex container for grouping multiple buttons with consistent spacing (`--space-m` gap).

<div class="demo-preview is-joined">
  <div class="button-group">
    <button class="button">Confirm</button>
    <button class="button" data-variant="outline">Cancel</button>
  </div>
</div>

```html
<div class="button-group">
  <button class="button">Confirm</button>
  <button class="button" data-variant="outline">Cancel</button>
</div>
```

---

## CSS reference

This section documents how the component is built (`assets/css/design-system.css`, section 11). For usage, see the sections above.

### Component tokens

All tokens live on `.button` and are overridden by the `data-*` exceptions.

| Token | Default | What it controls |
|---|---|---|
| `--button-color` | `var(--text-primary)` | The button's identity colour: feeds bg, border, and variant text |
| `--button-faded` | `color-mix(in srgb, var(--button-color), var(--alpha-10))` | 10% alpha of the button colour, used by faded variants |
| `--button-bg` | `var(--button-color)` | Background fill |
| `--button-border` | `var(--button-color)` | Border stroke |
| `--button-text-color` | `var(--text-inverted)` | Text colour |
| `--button-font` | `var(--font-primary)` | Font family |
| `--button-text-size` | `var(--font-m)` | Text size |
| `--button-padding-y` | `var(--space-l)` | Vertical padding |
| `--button-padding-x` | `var(--space-xl)` | Horizontal padding |
| `--button-gap` | `var(--space-m)` | Icon-to-text gap |
| `--icon-size` | `0.9em` (`1.3rem` when icon-only) | Size of the `.svg-icn` wrapper |

The corner radius is `var(--radius-s)` and the border width is `var(--border-s)`, applied directly on the base rule.

### Selectors

| Selector | Purpose |
|---|---|
| `button` | Minimal reset only — inherited font, no border/background/padding |
| `.button` | Full component: all tokens, layout, typography, transitions |
| `.button:hover` | Filled hover, `color-mix` tint shift |
| `.button:active` | Press effect, `transform: scale(0.98)` |
| `.button[data-variant="outline"]` | Transparent bg, primary border, text inherits `--button-color` |
| `.button[data-variant="faded"]` | 10% alpha bg, transparent border, text inherits `--button-color` |
| `.button[data-variant="outline-faded"]` | Transparent bg, faded border, text inherits `--button-color` |
| `.button[data-variant="transparent"]` | No bg, no border, text inherits `--button-color` |
| `.button[data-variant="text"]` | No bg, no border, zero padding, underline on hover, no press effect |
| `.button[data-variant="..."]:hover` (unfilled) | Fill at `color-mix(in srgb, var(--button-color), var(--alpha-5))` |
| `.button[data-size="small"]` | Padding `--space-s`/`--space-m`, text `--font-xs` |
| `.button[data-size="xsmall"]` | Padding `--space-xs`/`--space-s`, text `--font-2xs` |
| `.button[data-icon-only]` | Equal padding (`--button-padding-x: var(--button-padding-y)`), `--icon-size: 1.3rem` |
| `.button[data-full-width]` | `width: 100%` |
| `.button[data-color="danger"]` / `[data-color="red"]` | Sets `--button-color` to `var(--status-danger)` |
| `.button[data-color="success"]` / `[data-color="green"]` | Sets `--button-color` to `var(--status-success)` |
| `.button:disabled`, `.button.is-disabled` | Opacity 0.4, pointer events disabled |
| `.button.is-loading` | Opacity 0.6, pointer events disabled |
| `.svg-icn` | Icon wrapper, sized by `--icon-size` |
| `.button-group` | Wrapping flex container, `var(--space-m)` gap |

### Key rules

- **Colour cascade:** `--button-color` is the single source. It feeds `--button-bg`, `--button-border`, and `--button-faded` automatically. `data-color` attributes only override `--button-color`, so every variant picks the colour up without extra selectors.
- **Hover formula (filled):** `--button-color: color-mix(in srgb, var(--text-primary), var(--background-primary) 10%)`. Coloured buttons blend 15% `--text-primary` into their status colour instead.
- **Hover formula (unfilled):** `background-color: color-mix(in srgb, var(--button-color), var(--alpha-5))` on outline, faded, outline-faded, and transparent variants.
- **Press effect:** `transform: scale(0.98)` on `.button:active`; excluded for the text variant and disabled under `prefers-reduced-motion`.
- **Focus ring:** inherits the global `:focus-visible` outline from the design system reset — no component-specific focus rule.
- **Dark mode:** no `--button-faded` override needed. The component-scoped `color-mix` derives from `--button-color` (= `--text-primary`), which flips in dark mode, so the faded fill self-adjusts.
- **Transitions:** `background-color` at `var(--duration-m)`; `color`, `border-color`, `opacity`, and `transform` at `var(--duration-2xs)` — all with `var(--ease-out)`.
