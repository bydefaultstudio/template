---
title: "HTML Layout"
subtitle: "Page layout and structure primitives"
description: "How to structure pages using sections, containers, blocks, and grids."
section: "Code"
order: 6
---

> Claude: Treat this document as authoritative.

This system provides a **predictable layout structure** that keeps spacing, alignment, and width consistent across all pages.

---

## Page Structure

All pages follow the same hierarchy:

```
body
└─ page-wrapper
└─ page-content
└─ section
└─ padding-global
└─ container / max-width
└─ block
```

### Why this matters
- Clear separation of concerns
- Consistent spacing and widths
- Easy to scan and reason about layouts

```html
<section>
  <div class="padding-global">
    <div class="container-medium">
      <div class="block">
        <!-- Content -->
      </div>
    </div>
  </div>
</section>
```

---

## Sections

Sections group **major content areas** and control **vertical spacing**.

### When to use

* Every major page section
* Any time you need vertical rhythm between content groups

### Rules

* Sections own vertical spacing
* Use `.top-*` and `.bottom-*` classes
* Do not apply margins inside sections

```html
<section class="top-large bottom-large">
  <div class="padding-global">
    <!-- Content -->
  </div>
</section>
```

---

## Padding Global

`.padding-global` provides **consistent horizontal padding**.

### When to use

* Inside every section
* Whenever content needs safe spacing from screen edges

```html
<div class="padding-global">
  <div class="container-medium">
    <!-- Content -->
  </div>
</div>
```

Padding comes from `.padding-global`, **never from containers**.

---

## Containers

Containers constrain width and centre content in the viewport.

### When to use

* Most page content
* Any readable text or structured layout

### Key rules

* Containers centre content
* Containers do **not** add padding
* Use one container per section (in most cases)

```html
<div class="container-medium">
  <div class="block">
    <h2>Heading</h2>
    <p>Content</p>
  </div>
</div>
```

### Variants

| Class              | Use                    |
| ------------------ | ---------------------- |
| `container-small`  | Narrow layouts         |
| `container-medium` | Default readable width |
| `container-large`  | Wider layouts          |

Dashed borders below are visualization aids only — containers render no visible box of their own. Each container centres itself and stops at its max width.

<div class="demo-preview">
  <div class="block gap-m">
    <div class="container-small border border-dashed border-secondary padding-m">
      <code>container-small</code>
    </div>
    <div class="container-medium border border-dashed border-secondary padding-m">
      <code>container-medium</code>
    </div>
    <div class="container-large border border-dashed border-secondary padding-m">
      <code>container-large</code>
    </div>
  </div>
</div>

---

## Max-Width

Max-width utilities apply **width limits only**.

### When to use

* Special cases
* Content that should not be centred
* Breaking out of container behaviour

| Class              | Use               |
| ------------------ | ----------------- |
| `max-width-small`  | Narrow constraint |
| `max-width-medium` | Default readable  |
| `max-width-large`  | Wide constraint   |
| `max-width-full`   | No constraint     |

Unlike containers, max-width utilities do **not** centre — note how each box stays left-aligned:

<div class="demo-preview">
  <div class="block gap-m">
    <div class="max-width-small border border-dashed border-secondary padding-m">
      <code>max-width-small</code>
    </div>
    <div class="max-width-medium border border-dashed border-secondary padding-m">
      <code>max-width-medium</code>
    </div>
    <div class="max-width-full border border-dashed border-secondary padding-m">
      <code>max-width-full</code>
    </div>
  </div>
</div>

**Rule of thumb**

* Centre content → use a container
* Only limit width → use max-width (exception, not default)

---

## Blocks

Blocks group **related content** and manage internal spacing.

### When to use

* Heading + text
* Text + buttons
* Image + caption
* Any content that belongs together

### Default behaviour

* Vertical flex layout
* Uses `gap` for spacing
* No margins on children

```html
<div class="block">
  <h2>Heading</h2>
  <p>Body text</p>
</div>
```

### Gap modifiers

| Class    | Effect      |
| -------- | ----------- |
| `gap-xs` | Very tight  |
| `gap-s`  | Small       |
| `gap-m`  | Default     |
| `gap-l`  | Large       |
| `gap-xl` | Extra large |

<div class="demo-preview">
  <div class="block gap-l">
    <p><code>block gap-xs</code></p>
    <div class="block gap-xs">
      <div class="bg-faded padding-s">First item</div>
      <div class="bg-faded padding-s">Second item</div>
      <div class="bg-faded padding-s">Third item</div>
    </div>
    <p><code>block gap-m</code></p>
    <div class="block gap-m">
      <div class="bg-faded padding-s">First item</div>
      <div class="bg-faded padding-s">Second item</div>
      <div class="bg-faded padding-s">Third item</div>
    </div>
    <p><code>block gap-xl</code></p>
    <div class="block gap-xl">
      <div class="bg-faded padding-s">First item</div>
      <div class="bg-faded padding-s">Second item</div>
      <div class="bg-faded padding-s">Third item</div>
    </div>
  </div>
</div>

```html
<div class="block gap-l">
  <h2>Heading</h2>
  <p>More space between elements</p>
</div>
```

---

## Block Layout Modifiers

Blocks can change layout or alignment.

| Class          | Effect              |
| -------------- | ------------------- |
| `row`          | Horizontal layout   |
| `row-reverse`  | Reversed horizontal |
| `align-start`  | Align items start   |
| `align-center` | Centre items        |
| `align-end`    | Align items end     |

<div class="demo-preview is-joined">
  <div class="block row gap-m align-center">
    <p>Text</p>
    <button class="button">Action</button>
  </div>
</div>

```html
<div class="block row gap-m align-center">
  <p>Text</p>
  <button class="button">Action</button>
</div>
```

---

## Grid

Grids create **column-based layouts**.
They are not spacing utilities.

### Base grid

* Two equal columns
* Default gap applied

<div class="demo-preview">
  <div class="grid">
    <div class="bg-faded padding-m">Item 1</div>
    <div class="bg-faded padding-m">Item 2</div>
    <div class="bg-faded padding-m">Item 3</div>
    <div class="bg-faded padding-m">Item 4</div>
  </div>
</div>

```html
<div class="grid">
  <div>Item</div>
  <div>Item</div>
</div>
```

### Column modifiers

| Class       | Columns       |
| ----------- | ------------- |
| `cols-3`    | Three columns |
| `cols-4`    | Four columns  |

<div class="demo-preview">
  <div class="block gap-l">
    <p><code>grid cols-3</code></p>
    <div class="grid cols-3">
      <div class="bg-faded padding-m">Item 1</div>
      <div class="bg-faded padding-m">Item 2</div>
      <div class="bg-faded padding-m">Item 3</div>
      <div class="bg-faded padding-m">Item 4</div>
      <div class="bg-faded padding-m">Item 5</div>
      <div class="bg-faded padding-m">Item 6</div>
    </div>
    <p><code>grid cols-4 gap-s</code></p>
    <div class="grid cols-4 gap-s">
      <div class="bg-faded padding-m">Item 1</div>
      <div class="bg-faded padding-m">Item 2</div>
      <div class="bg-faded padding-m">Item 3</div>
      <div class="bg-faded padding-m">Item 4</div>
      <div class="bg-faded padding-m">Item 5</div>
      <div class="bg-faded padding-m">Item 6</div>
      <div class="bg-faded padding-m">Item 7</div>
      <div class="bg-faded padding-m">Item 8</div>
    </div>
  </div>
</div>

```html
<div class="grid cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Item width

| Class         | Effect                |
| ------------- | --------------------- |
| `fit-content` | Item sizes to content |

<div class="demo-preview is-joined">
  <div class="grid">
    <div class="bg-faded padding-m">Flexible column</div>
    <div class="bg-faded padding-m fit-content">Fixed</div>
  </div>
</div>

```html
<div class="grid">
  <div>Flexible column</div>
  <div class="fit-content">Fixed</div>
</div>
```

### Rules

* Use grids for layout, not spacing
* Use `gap-*` to adjust spacing
* Combine column + gap modifiers as needed
