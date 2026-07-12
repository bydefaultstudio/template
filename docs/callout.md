---
title: "Callout"
subtitle: "Callout and alert component guidelines"
description: "How to use callout styles and semantic variants in the design system."
section: "Design System"
order: 9
---

> Claude: Treat this document as authoritative.

Callouts are used to **highlight important information** within content. They draw attention to notes, tips, warnings, and other contextual messages.

---

## Core Principles

- Callouts use a **base + variant** pattern (like buttons and borders)
- The base `.callout` class provides structure and neutral styling
- Variant classes add semantic color via left border and background tint
- All colors are controlled by semantic tokens that can be customized per project

---

## Status Color Tokens

Callout variants are powered by status color tokens defined in `:root`. These are project-customizable primitives:

| Token | Default | Purpose |
|---|---|---|
| `--status-info` | `#0969da` | Informational, notes |
| `--status-success` | `#1a7f37` | Tips, positive feedback |
| `--status-warning` | `#9a6700` | Warnings, attention needed |
| `--status-danger` | `#cf222e` | Caution, destructive actions |
| `--status-accent` | `#8250df` | Important, emphasis |

Each status color generates two semantic tokens:
- `--callout-{type}` — the border/title color
- `--callout-{type}-bg` — a 10% tint for the background (via `color-mix`)

Status colors are plain hex values. In dark mode (§2b of `design-system.css`, mirrored in the §2c system-preference fallback), each `--status-*` token is overridden with a lighter hex — the `--callout-*` tokens cascade from them automatically, so callouts need no dark-mode overrides of their own.

---

## Base Callout

The `.callout` class provides the structural foundation:

<div class="demo-preview is-joined">
  <div class="callout">
    <p>General-purpose highlighted content.</p>
  </div>
</div>

```html
<div class="callout">
  <p>General-purpose highlighted content.</p>
</div>
```

**Structural properties:**
- Left border using `--border-l` width (4px)
- Padding using spacing tokens
- Neutral background (`--background-faded`)
- First/last child margin normalization

---

## Callout Title

Use `.callout-title` inside any callout for a styled heading:

```html
<div class="callout callout-note">
  <div class="callout-title">Note</div>
  <p>Content here.</p>
</div>
```

The title inherits the variant's accent color automatically.

---

## Variants

### Note (`.callout-note`)

For useful information users should know, even when skimming.

<div class="demo-preview is-joined">
  <div class="callout callout-note">
    <div class="callout-title">Note</div>
    <p>Useful information that users should know.</p>
  </div>
</div>

```html
<div class="callout callout-note">
  <div class="callout-title">Note</div>
  <p>Useful information that users should know.</p>
</div>
```

### Tip (`.callout-tip`)

For helpful advice on doing things better or more easily.

<div class="demo-preview is-joined">
  <div class="callout callout-tip">
    <div class="callout-title">Tip</div>
    <p>Helpful advice for doing things better.</p>
  </div>
</div>

```html
<div class="callout callout-tip">
  <div class="callout-title">Tip</div>
  <p>Helpful advice for doing things better.</p>
</div>
```

### Warning (`.callout-warning`)

For urgent information that needs immediate attention.

<div class="demo-preview is-joined">
  <div class="callout callout-warning">
    <div class="callout-title">Warning</div>
    <p>Urgent information to avoid problems.</p>
  </div>
</div>

```html
<div class="callout callout-warning">
  <div class="callout-title">Warning</div>
  <p>Urgent information to avoid problems.</p>
</div>
```

### Caution (`.callout-caution`)

For advising about risks or negative outcomes.

<div class="demo-preview is-joined">
  <div class="callout callout-caution">
    <div class="callout-title">Caution</div>
    <p>Risks or negative outcomes of certain actions.</p>
  </div>
</div>

```html
<div class="callout callout-caution">
  <div class="callout-title">Caution</div>
  <p>Risks or negative outcomes of certain actions.</p>
</div>
```

### Important (`.callout-important`)

For key information users need to achieve their goal.

<div class="demo-preview is-joined">
  <div class="callout callout-important">
    <div class="callout-title">Important</div>
    <p>Key information users need to know.</p>
  </div>
</div>

```html
<div class="callout callout-important">
  <div class="callout-title">Important</div>
  <p>Key information users need to know.</p>
</div>
```

---

## Rules

| Do | Don't |
|---|---|
| Use semantic variants for meaning | Use color to decorate without purpose |
| Keep callout content concise | Put entire sections inside callouts |
| Use `.callout-title` for labeling | Use headings (h1–h6) inside callouts |
| Customize `--status-*` tokens per project | Hardcode colors on individual callouts |

---

## Relationship to Markdown Alerts

The `.markdown-body` CSS includes GitHub-style alerts (`.markdown-alert-note`, etc.) with their own color tokens. These are scoped to rendered markdown content only.

The design system callouts (`.callout`) are the **global, project-wide** equivalent. When building pages, always use `.callout` — not the markdown alert classes.
