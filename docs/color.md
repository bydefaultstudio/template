---
title: "Color"
subtitle: "Color tokens and semantic colors"
description: "Complete reference for all color tokens including primitive colors and semantic color mappings."
section: "Design System"
order: 2
---

> Claude: Treat this document as authoritative.

Color tokens are the foundation of the design system's color system. They define the shared, reusable color values that power both design and code. By standardising these decisions in one place, tokens keep the experience consistent, reduce duplication, and make global updates safe and fast.

## How Theming Works

The design system is a **neutral engine**: `assets/css/design-system.css` ships working defaults on real token names — a grayscale neutral ramp and a blue `--accent`. There are no brand-specific tokens. A brand expresses itself by overriding primitives in `assets/css/theme.css`, which loads **after** the design system:

```html
<link rel="stylesheet" href="assets/css/design-system.css">
<link rel="stylesheet" href="assets/css/theme.css">
```

The semantic layer resolves through the primitives, so one primitive override cascades everywhere:

```css
/* assets/css/theme.css */
:root {
  --accent: #7c3aed;      /* --text-accent, --text-link, --input-focus all follow */
  --neutral-800: #2b2622; /* --text-primary follows */
}
```

Never restate a semantic token in `theme.css` when overriding a primitive achieves the same result.

---

## Primitive Colors

Primitive colors are the raw values that all other color tokens build on. Prefer **semantic tokens** in layouts and components; reach for primitives only when composing new semantics or writing `theme.css` overrides.

### Neutral Colors

A grayscale ramp from light to dark for backgrounds, borders, and text.

| Token | Value |
| --- | --- |
| `--neutral-50` | #F7F7F7 |
| `--neutral-100` | #EFEFEF |
| `--neutral-150` | #E7E7E7 |
| `--neutral-200` | #DEDEDE |
| `--neutral-300` | #CCCCCC |
| `--neutral-400` | #AAAAAA |
| `--neutral-500` | #8C8C8C |
| `--neutral-600` | #666666 |
| `--neutral-700` | #4D4D4D |
| `--neutral-800` | #333333 |
| `--neutral-900` | #111111 |
| `--neutral-950` | #0A0A0A |

<div class="demo-preview">
  <div class="grid token-col border border-faded">
    <div class="token-block"><span class="token-tag">neutral-50</span></div>
    <div class="color-block" style="background-color: var(--neutral-50);"></div>
    <div class="token-block"><span class="token-tag">neutral-100</span></div>
    <div class="color-block" style="background-color: var(--neutral-100);"></div>
    <div class="token-block"><span class="token-tag">neutral-150</span></div>
    <div class="color-block" style="background-color: var(--neutral-150);"></div>
    <div class="token-block"><span class="token-tag">neutral-200</span></div>
    <div class="color-block" style="background-color: var(--neutral-200);"></div>
    <div class="token-block"><span class="token-tag">neutral-300</span></div>
    <div class="color-block" style="background-color: var(--neutral-300);"></div>
    <div class="token-block"><span class="token-tag">neutral-400</span></div>
    <div class="color-block" style="background-color: var(--neutral-400);"></div>
    <div class="token-block"><span class="token-tag">neutral-500</span></div>
    <div class="color-block" style="background-color: var(--neutral-500);"></div>
    <div class="token-block"><span class="token-tag">neutral-600</span></div>
    <div class="color-block" style="background-color: var(--neutral-600);"></div>
    <div class="token-block"><span class="token-tag">neutral-700</span></div>
    <div class="color-block" style="background-color: var(--neutral-700);"></div>
    <div class="token-block"><span class="token-tag">neutral-800</span></div>
    <div class="color-block" style="background-color: var(--neutral-800);"></div>
    <div class="token-block"><span class="token-tag">neutral-900</span></div>
    <div class="color-block" style="background-color: var(--neutral-900);"></div>
    <div class="token-block"><span class="token-tag">neutral-950</span></div>
    <div class="color-block" style="background-color: var(--neutral-950);"></div>
  </div>
</div>

### Accent

The single brand-color primitive. It ships with a neutral blue default and is the first token a project overrides in `theme.css`.

| Token | Value | Description |
| --- | --- | --- |
| `--accent` | #0969DA | Accent color; feeds `--text-accent`, `--text-link`, and `--input-focus` |

### Black & White Alpha Tokens

Fixed-hex black and white with preset opacity levels, for overlays, shadows, and faded text.

| Token | Value | | Token | Value |
| --- | --- | --- | --- | --- |
| `--black` | #000000 | | `--white` | #FFFFFF |
| `--black-alpha-5` | #0000000D | | `--white-alpha-5` | #FFFFFF0D |
| `--black-alpha-10` | #0000001A | | `--white-alpha-10` | #FFFFFF1A |
| `--black-alpha-15` | #00000026 | | `--white-alpha-15` | #FFFFFF26 |
| `--black-alpha-20` | #00000033 | | `--white-alpha-20` | #FFFFFF33 |
| `--black-alpha-30` | #0000004D | | `--white-alpha-30` | #FFFFFF4D |
| `--black-alpha-40` | #00000066 | | `--white-alpha-40` | #FFFFFF66 |
| `--black-alpha-50` | #00000080 | | `--white-alpha-50` | #FFFFFF80 |

`--transparent` is also available.

**Usage:**

```css
.shadow {
  box-shadow: 0 4px 6px var(--black-alpha-30);
}
```

### Color-Mix Alpha Scale

For transparency on **any** color (not just black/white), the system provides `--alpha-5` through `--alpha-95` in steps of 5. Each token is the **second argument** to `color-mix()` — `--alpha-10` is `transparent 90%`, so the mix keeps 10% of your color:

```css
.badge {
  /* accent at 10% opacity */
  background-color: color-mix(in srgb, var(--accent), var(--alpha-10));
}
```

<div class="demo-preview is-centered">
  <div class="color-block" style="background-color: color-mix(in srgb, var(--accent), var(--alpha-10));"></div>
  <div class="color-block" style="background-color: color-mix(in srgb, var(--accent), var(--alpha-25));"></div>
  <div class="color-block" style="background-color: color-mix(in srgb, var(--accent), var(--alpha-50));"></div>
  <div class="color-block" style="background-color: color-mix(in srgb, var(--accent), var(--alpha-75));"></div>
  <div class="color-block" style="background-color: var(--accent);"></div>
</div>

The callout background tokens (`--callout-*-bg`) are built with this technique — a 10% tint of each status color.

---

## Semantic Colors

Semantic colors map primitive tokens to **meaning and intent**, giving context and purpose to how colors are used. This makes it easier to implement consistent styling across components and ensures colors are used appropriately throughout the interface. They are also the layer dark mode overrides, so components that use semantic tokens adapt automatically.

### Text Colors

| **Name** | Value | Description |
| --- | --- | --- |
| `--text-primary` | ↳`--neutral-800` | Primary text color |
| `--text-secondary` | ↳`--neutral-600` | Secondary text color |
| `--text-plain` | ↳`--black` | True black text |
| `--text-faded` | ↳`--black-alpha-50` | Faded text |
| `--text-accent` | ↳`--accent` | Accent text |
| `--text-link` | ↳`--text-accent` | Link text color |
| `--text-inverted` | ↳`--neutral-50` | Text on inverted surfaces (e.g. solid buttons) |

<div class="demo-preview">
  <div class="grid token-col border border-faded">
    <div class="token-block"><span class="token-tag">text-primary</span></div>
    <div class="color-block" style="background-color: var(--text-primary);"></div>
    <div class="token-block"><span class="token-tag">text-secondary</span></div>
    <div class="color-block" style="background-color: var(--text-secondary);"></div>
    <div class="token-block"><span class="token-tag">text-faded</span></div>
    <div class="color-block" style="background-color: var(--text-faded);"></div>
    <div class="token-block"><span class="token-tag">text-accent</span></div>
    <div class="color-block" style="background-color: var(--text-accent);"></div>
    <div class="token-block"><span class="token-tag">text-inverted</span></div>
    <div class="color-block" style="background-color: var(--text-inverted);"></div>
  </div>
</div>

**Usage:**

```css
h1 {
  color: var(--text-primary);
}
```

### Background Colors

| **Name** | **Value** | **Description** |
| --- | --- | --- |
| `--background-primary` | ↳`--white` | Default background |
| `--background-secondary` | ↳`--neutral-50` | Secondary background |
| `--background-plain` | ↳`--white` | Plain background |
| `--background-faded` | ↳`--black-alpha-5` | Faded background overlay |

<div class="demo-preview">
  <div class="grid token-col border border-faded">
    <div class="token-block"><span class="token-tag">background-primary</span></div>
    <div class="color-block" style="background-color: var(--background-primary);"></div>
    <div class="token-block"><span class="token-tag">background-secondary</span></div>
    <div class="color-block" style="background-color: var(--background-secondary);"></div>
    <div class="token-block"><span class="token-tag">background-faded</span></div>
    <div class="color-block" style="background-color: var(--background-faded);"></div>
  </div>
</div>

**Usage:**

```css
.card {
  background-color: var(--background-plain);
}
```

### Border Colors

| **Name** | **Value** | **Description** |
| --- | --- | --- |
| `--border-primary` | ↳`--black` | Default border |
| `--border-secondary` | ↳`--neutral-300` | Secondary border |
| `--border-faded` | ↳`--black-alpha-15` | Faded border |

<div class="demo-preview">
  <div class="grid token-col border border-faded">
    <div class="token-block"><span class="token-tag">border-primary</span></div>
    <div class="color-block" style="background-color: var(--border-primary);"></div>
    <div class="token-block"><span class="token-tag">border-secondary</span></div>
    <div class="color-block" style="background-color: var(--border-secondary);"></div>
    <div class="token-block"><span class="token-tag">border-faded</span></div>
    <div class="color-block" style="background-color: var(--border-faded);"></div>
  </div>
</div>

**Usage:**

```css
.card {
  border-color: var(--border-primary);
}
```

### Selection Colors

Text selection (`::selection`) is styled by the base layer using two tokens that derive from text and background:

| **Name** | **Value** | **Description** |
| --- | --- | --- |
| `--selection-background` | ↳`--text-primary` | Selection highlight |
| `--selection-text` | ↳`--background-primary` | Selected text color |

Because they resolve through `--text-primary` and `--background-primary`, they flip automatically in dark mode — no dark override needed.

### Status Colors

Feedback and state colors. Dark mode swaps them for lightened variants (see below). They also feed the callout tokens (`--callout-*` / `--callout-*-bg`) — see the Callout doc.

| Token | Value (light) | Purpose |
| --- | --- | --- |
| `--status-info` | #0969DA | Informational, notes |
| `--status-success` | #1A7F37 | Success, positive feedback |
| `--status-warning` | #9A6700 | Warnings, attention needed |
| `--status-danger` | #CF222E | Errors, destructive actions |
| `--status-accent` | #8250DF | Emphasis, highlights |

<div class="demo-preview is-centered">
  <div class="block gap-xs align-center">
    <div class="color-block" style="background-color: var(--status-info);"></div>
    <span class="token-tag">status-info</span>
  </div>
  <div class="block gap-xs align-center">
    <div class="color-block" style="background-color: var(--status-success);"></div>
    <span class="token-tag">status-success</span>
  </div>
  <div class="block gap-xs align-center">
    <div class="color-block" style="background-color: var(--status-warning);"></div>
    <span class="token-tag">status-warning</span>
  </div>
  <div class="block gap-xs align-center">
    <div class="color-block" style="background-color: var(--status-danger);"></div>
    <span class="token-tag">status-danger</span>
  </div>
  <div class="block gap-xs align-center">
    <div class="color-block" style="background-color: var(--status-accent);"></div>
    <span class="token-tag">status-accent</span>
  </div>
</div>

---

## Dark Mode

The design system switches themes with a `data-theme` attribute. **Light mode is the default**; dark mode is an opt-in override. Set `data-theme="dark"` on `<html>` for page-level dark mode, or on any element for scoped theming — tokens inherit through the cascade.

Dark values (e.g. `#1a1a1a`, `#e8e6e3`) are **overrides applied via `[data-theme="dark"]`** (design-system.css §2b). Never hardcode them as primary values. If you're working from a dark-looking screenshot, confirm the intended theme before writing code.

### How It Works

- **`:root`** — light mode tokens (always present)
- **`[data-theme="dark"]`** (§2b) — overrides semantic, status, and form tokens with dark values, and sets `color-scheme: dark`
- **`@media (prefers-color-scheme: dark)`** (§2c) — no-JS fallback: a verbatim mirror of §2b, guarded by `:root:not([data-theme])` so it only applies when no explicit choice has set the attribute

`--callout-*` and `--selection-*` are deliberately absent from the dark blocks: they cascade from `--status-*` and text/background tokens automatically.

### The Toggle

`assets/js/theme-toggle.js` drives the switch. Load it in `<head>` **without `defer`** so the attribute is set before first paint (no theme flash). It persists the choice to `localStorage` under the key `dark-mode`; with no stored choice, the OS preference wins. It injects sun/moon icons into every empty `.dark-mode-toggle` button:

```html
<button class="button dark-mode-toggle" type="button" data-variant="transparent" data-icon-only aria-label="Toggle dark mode"></button>
```

### Scoped Usage

Apply dark mode to any element, not just the page:

<div class="demo-preview is-joined">
  <div class="grid">
    <div class="block gap-xs" style="background: var(--background-secondary); color: var(--text-primary); padding: var(--space-l); border: var(--border-s) solid var(--border-secondary);">
      <strong>Light mode</strong>
      <span>Primary text</span>
      <span style="color: var(--text-faded);">Faded text</span>
      <span style="color: var(--text-accent);">Accent text</span>
    </div>
    <div data-theme="dark" class="block gap-xs" style="background: var(--background-primary); color: var(--text-primary); padding: var(--space-l); border: var(--border-s) solid var(--border-secondary);">
      <strong>Dark mode</strong>
      <span>Primary text</span>
      <span style="color: var(--text-faded);">Faded text</span>
      <span style="color: var(--text-accent);">Accent text</span>
    </div>
  </div>
</div>

```html
<!-- Dark card on a light page -->
<div data-theme="dark" class="card">
  <p>This section uses dark mode tokens</p>
</div>
```

All semantic tokens inside that element resolve to their dark values via CSS custom property inheritance.

### Customizing Dark Mode

Add dark overrides in `theme.css` — do not edit design-system.css. Every override needs **two blocks**: the `[data-theme="dark"]` rule and its `@media` mirror. Drift between the two is a known failure mode — a value changed in one but not the other shows different colors to toggled users versus no-JS/OS-preference users.

```css
/* assets/css/theme.css */
[data-theme="dark"] {
  --text-accent: #9ecbff;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --text-accent: #9ecbff; /* keep in sync with the block above */
  }
}
```
