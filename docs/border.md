---
title: "Border"
subtitle: "Composable border system"
description: "Guide to using the composable border architecture for flexible border styling."
section: "Design System"
order: 5
---

> Claude: Treat this document as authoritative.

Borders use a **composable architecture** that separates structural positioning from styling concerns. This approach keeps the system extensible without class explosion.

## Core Principles


- All border styling resolves through CSS variables

- **Structural** where the border appears (.border, .border-top, .border-bottom)
- **Width** how thick the border is (`.border-s`, `.border-m`, `.border-l`)
- **Style** how the line is drawn (`.border-solid`, `.border-dashed`, `.border-dotted`)
- **Color** what the border represents (`.border-primary`, `.border-secondary`, `.border-faded`)

All border styles resolve through CSS variables to keep behaviour consistent across the system.
Do not create combined classes like `.border-top-m` or hardcode border values inside structural classes.

---

## Border Structure

Structural classes define **where** the border appears, not how it looks.

| Class | Effect |
| --- | --- |
| `.border` | Border on all sides |
| `.border-top` | Border on top only |
| `.border-bottom` | Border on bottom only |
| `.border-left` | Border on left only |
| `.border-right` | Border on right only |

#### Example

```html
<section class="border-bottom">
  <!-- Content with bottom border -->
</section>
```

---

## Border Width

Width combo classes modify the border thickness.

| Class | Width | Description |
| --- | --- | --- |
| `.border-s` | 1px | Small border (default) |
| `.border-m` | 2px | Medium border |
| `.border-l` | 4px | Large border |

#### Example

```html
<div class="border border-m">
  <!-- Content with medium border on all sides -->
</div>
```

---

## Border Style

Style combo classes modify the border appearance.

| Class | Style | Description |
| --- | --- | --- |
| `.border-solid` | solid | Solid border (default) |
| `.border-dashed` | dashed | Dashed border |
| `.border-dotted` | dotted | Dotted border |

#### Example

```html
<div class="border border-dashed">
  <!-- Content with dashed border -->
</div>
```

---

## Border Color

Color combo classes modify the border color using semantic tokens.

| Class | Color | Description |
| --- | --- | --- |
| `.border-primary` | `var(--border-primary)` | Strong border (default) |
| `.border-secondary` | `var(--border-secondary)` | Secondary color border |
| `.border-faded` | `var(--border-faded)` | Faded border |

#### Example

```html
<div class="border border-secondary">
  <!-- Content with subtle border -->
</div>
```

---

## Examples

Compose position, width, style, and colour freely — one class per concern:

<div class="demo-preview is-joined">
  <div class="block gap-m">
    <div class="border border-primary padding-l">Primary border</div>
    <div class="border border-secondary padding-l">Secondary border</div>
    <div class="border border-faded padding-l">Faded border</div>
    <div class="border-top border-m border-dashed padding-l">Dashed top, medium width</div>
    <div class="border border-l border-dotted padding-l">Dotted, large width</div>
  </div>
</div>

```html
<div class="border border-primary">Primary border</div>
<div class="border border-secondary">Secondary border</div>
<div class="border border-faded">Faded border</div>
<div class="border-top border-m border-dashed">Dashed top, medium width</div>
<div class="border border-l border-dotted">Dotted, large width</div>
```

---

## Border Radius

Radius tokens define the corner rounding scale. There are **no `.radius-*` utility classes** — the tokens are consumed by component CSS (the button's corners come from `--radius-s`, for example) or applied directly where a component doesn't exist yet.

| Token | Value |
| --- | --- |
| `--radius-2xs` | 2px |
| `--radius-xs` | 4px |
| `--radius-s` | 6px |
| `--radius-m` | 10px |
| `--radius-l` | 16px |
| `--radius-xl` | 24px |
| `--radius-pill` | 999px (fully rounded) |

<div class="demo-preview is-joined is-centered">
  <div class="border padding-l" style="border-radius: var(--radius-xs);">xs</div>
  <div class="border padding-l" style="border-radius: var(--radius-m);">m</div>
  <div class="border padding-l" style="border-radius: var(--radius-xl);">xl</div>
  <div class="border padding-l" style="border-radius: var(--radius-pill);">pill</div>
</div>

```html
<div class="border" style="border-radius: var(--radius-m);">Rounded box</div>
```

```css
.card {
  border-radius: var(--radius-m);
}
```

---

## Limitations

Native CSS dashed/dotted borders do not support adjustable dash spacing. This system intentionally avoids SVG or background-based borders to maintain simplicity and performance.

---

## Rules

- Use the smallest possible number of classes
- Prefer semantic color tokens
- Keep the system extensible without class explosion
- Structural classes define position only
- Combo classes modify one concern each
- All styling resolves through CSS variables


