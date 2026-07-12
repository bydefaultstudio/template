---
title: "Folders"
subtitle: "File organization and directory structure"
description: "Guide defining where files live and why in the project structure."
section: "Project"
order: 4
---

> Claude: Treat this document as authoritative.

This document defines where files live and why.

Do not add new top-level folders without updating this file.

## Structure

```
index.html              → Starter page (replace with project homepage)
CLAUDE.md               → Claude Code development rules (authoritative)
README.md               → Project overview and getting started
PROJECT_BRIEF.md        → Project brief and requirements
PROJECT_PROGRESS.md     → Progress tracker for ongoing work
assets/
  css/
    design-system.css   → Design system framework (never edited per project)
    theme.css           → Brand overrides (primitives, fonts)
    style.css           → Project-specific styles
  js/
    theme-toggle.js     → Dark-mode toggle
  fonts/                → Self-hosted web fonts
  icons/                → Favicons and app icons
  images/               → General images and Open Graph images
templates/              → Page and component boilerplate
docs/                   → Documentation (markdown sources + generated site)
```

## assets/css/

The three-layer CSS contract. Load order matters — every page links them in this sequence:

1. `design-system.css` — the framework: tokens, base styles, layout primitives, utilities, components. Ships neutral working defaults and is never edited per project.
2. `theme.css` — your brand: overrides §1/§2 primitives (fonts, `--accent`, neutrals) and loads brand fonts via `@font-face` or `@import`. Semantics cascade through the primitives.
3. `style.css` — project-specific styles built on top of the system.

## assets/js/

- `theme-toggle.js` — dark-mode toggle: sets `data-theme` on `<html>`, persists to localStorage, defaults to the OS preference, and injects icons into `.dark-mode-toggle` buttons.

## assets/fonts/

Self-hosted web font files, referenced by `@font-face` declarations in `theme.css`.

## assets/icons/

Favicons and app icons (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, …). Referenced directly in each page's `<head>`; treated as brand assets, not part of the design system.

## assets/images/

General image assets and Open Graph images.

## templates/

Boilerplate for new files:

- `page-template.html` → HTML page template (correct stylesheet order, SEO meta tags)
- `component-template.css` → CSS component template
- `component-template.js` → JavaScript component template

## docs/

- Markdown documentation files (the sources — edit these)
- `docs.config.js` → Project-specific doc settings (CSS paths, footer, description) — stays when the generator is upgraded
- `generator/` → Documentation site engine (replaceable — drop in a new version to upgrade)
  - `VERSION` → Current engine version
  - `assets/` → Engine CSS (`docs.css`, `markdown.css`) — copied to `site/assets/` on generation
- `site/` → Generated HTML documentation — **never hand-edit**; regenerate from the markdown sources
  - `assets/images/` → The docs site's own logo and favicon copies — independent of `assets/images/` and not overwritten by the generator

The docs site links the project's real stylesheets (`../../assets/css/design-system.css`, then `theme.css`), so token and component pages render live values. The old `design-system/` and `brand-book/` folders are gone — the styleguide and brand reference now live in the docs site.

## Notes

Empty folders are tracked using `.gitkeep` to preserve structure in the template.
