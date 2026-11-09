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
ROADMAP.md              → Ideas and debt not yet started
PROJECT_PROGRESS.md     → Dated log of what has shipped
DESIGN.md               → Design rules: synced, gitignored, never hand-edited
package.json            → npm manifest: design system dependency + bd-sync postinstall
handovers/
  HANDOVER.md           → Where the work stands right now (rewritten each session)
.claude/
  settings.json         → Session hook: onboarding check
.vscode/
  settings.json         → Live Server port pin (see Local ports below)
.github/
  dependabot.yml        → Weekly checks for new design system versions
assets/
  css/
    design-system.css   → Design system framework: synced, gitignored
    design-system/      → Component companion CSS: synced, gitignored
    theme.css           → Brand overrides (primitives, fonts)
    style.css           → Project-specific styles
  js/
    design-system/      → Component JS modules: synced, gitignored
    theme-toggle.js     → Dark-mode toggle
  fonts/                → Self-hosted web fonts
  icons/                → Favicons, app icons, and synced sprites
  images/               → General images and Open Graph images
templates/              → Page and component boilerplate
docs/                   → Documentation (markdown guides)
vendor/
  design-system-react/  → React adapters: synced, gitignored, bundler input only
```

`node_modules/` and `package-lock.json` are gitignored. The lockfile is deliberately not committed in the template so new projects resolve the newest compatible design system at first install; commit your own lockfile once the project is under way: it pins the build, and some hosts detect the package manager from it.

## Synced vs. authored

The single most important distinction in this tree. Everything `bd-sync` writes on `npm install` is gitignored and regenerated:

- `assets/css/design-system.css`
- `assets/css/design-system/`
- `assets/js/design-system/`
- `assets/icons/icons.svg`, `assets/icons/cursors.svg`
- `DESIGN.md`
- `vendor/design-system-react/` (only on releases that ship React adapters)

Editing any of these appears to work and is destroyed by the next install, with no warning. Shared code changes upstream in the design-system repo, then arrives here via a version bump. Everything else in the tree is yours to author.

## Local ports

Each project pins one fixed local address: this one is `http://localhost:2700/`, set in `.vscode/settings.json` and in the `serve` script. Any other dev server the project runs must pin the same number, or it silently drifts onto a neighbouring project's port. See `CLAUDE.md` §15.

## Session continuity

`ROADMAP.md` (future) → `handovers/HANDOVER.md` (present) → `PROJECT_PROGRESS.md` (past). Split by tense so none of them becomes a dumping ground; the handover is rewritten each session while progress is appended. Read the handover at the start of a session and rewrite it at the end. See `CLAUDE.md` §14.

## assets/css/

The three-layer CSS contract. Load order matters: every page links them in this sequence:

1. `design-system.css`: the framework: tokens, base styles, layout primitives, utilities, components. Synced from the `@bydefaultstudio/design-system` npm package on `npm install`: never edit it; changes belong upstream in the design-system repo. Ships neutral working defaults.
2. `theme.css`: your brand: overrides §1/§2 primitives (fonts, `--text-accent`, neutrals) and loads brand fonts via `@font-face` or `@import`. Semantics cascade through the primitives.
3. `style.css`: project-specific styles built on top of the system.

## assets/js/

- `theme-toggle.js`: dark-mode toggle: sets `data-theme` on `<html>`, persists to localStorage, defaults to the OS preference, and injects icons into `.dark-mode-toggle` buttons.

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

- Markdown guides: brand book, SEO best practices, folder structure, and setup. Edit these directly; they are the documentation.

Canonical design system documentation lives at [bydefault.design](https://bydefault.design).

## Notes

Empty folders are tracked using `.gitkeep` to preserve structure in the template.
