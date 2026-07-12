# Project Progress

Track what's been done and what still needs doing across sessions.

---

## Design System / Brand Book Separation

The core restructure: split the monolithic `src/css/design-system.css` into two independent projects that work in conjunction.

### Architecture Decisions
- **Conjunction pattern**: brand-book defines `--brand-*` tokens, design system reads them via `var(--brand-*, fallback)`. Load order doesn't matter.
- **Three projects inside master**: design-system, brand-book, docs — each with its own index.html preview
- **Master project is the template**: clone it per client, customise the brand book, build pages in `src/`
- **Brand book is tokens only**: no component overrides. Defines fonts, colours, logo, iconography.
- **Assets stay in `src/`**: brand-book only contains CSS and its index.html preview. All images, favicons, etc. remain in `src/assets/`.

### Completed
- [x] Create `design-system/` folder with `design-system.css` (conjunction pattern with `var(--brand-*, fallback)`)
- [x] Create `design-system/index.html` — full styleguide with all sections (colors, typography, buttons, forms, callouts, blocks/gaps, grid, borders, containers, max-width, section spacing)
- [x] Create `brand-book/` folder with `brand-book.css` (brand tokens using `--brand-` prefix)
- [x] Create `brand-book/index.html` — brand preview page (logo, palette, typography, icons)
- [x] Update `templates/page-template.html` to load both CSS files
- [x] Update `docs/docs.config.js` with new paths
- [x] Update `docs/generator/template.html` with new paths
- [x] Remove old `styleguide/` folder
- [x] Remove old `ds-files/` folder
- [x] Remove old `src/css/design-system.css`
- [x] Remove old `src/css/brand.css`
- [x] Add disabled button state (`:disabled` styling)
- [x] Add form elements to design system (inputs, textarea, select, checkbox, radio, fieldset)
- [x] Add callout/alert components to design system (note, tip, warning, caution, important)

### To Do
- [x] Delete orphaned doc site pages (architecture.html, components-utilities.html, design-system.html, development-standards.html, layout-primitives.html, quick-reference.html)
- [x] Update `docs/setup.md` — references `src/css/design-system.css`, needs to reference `brand-book/brand-book.css`
- [x] Update `docs/folder-structure.md` — still lists `styleguide/`, `src/css/`, old structure
- [x] Update `docs/upgrading-docs.md` — references `src/css/design-system.css` convention, stale config example
- [x] Update `CLAUDE.md` — references `src/css/design-system.css` as single source of truth
- [x] Regenerate docs after all md updates
- [x] Add smooth scroll for anchor links in docs site (already existed in docs.css)
- [ ] Commit all changes and push to GitHub
- [ ] Set up VS Code Live Server to serve from project root (`.vscode/settings.json`)

---

## Future Work (Not Started)

These items were discussed but explicitly deferred. CSS/HTML only — no JavaScript.

### Design System CSS — Elements to Add
- [ ] Code snippets (`<code>`, `<pre>`, `<kbd>`)
- [ ] Tables (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- [ ] Horizontal rules (`<hr>`)
- [ ] Details/summary (`<details>`, `<summary>`)
- [ ] Definition lists (`<dl>`, `<dt>`, `<dd>`)
- [ ] Badges / tags (small inline labels)
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Progress bars
- [ ] Tooltips (CSS-only)
- [ ] Cards (content container pattern)
- [ ] Tabs (CSS-only with radio inputs)
- [ ] Accordion (CSS-only with checkbox/details)
- [ ] Avatar / profile image circles
- [ ] Dividers (horizontal/vertical)
- [ ] Skeleton loading placeholders

### Brand Book Enhancements
- [ ] Logo usage guidelines section in brand-book/index.html
- [ ] Iconography preview section
- [ ] Brand dos/don'ts section

---

## BrandOS Alignment Restructure (2026-07-12)

Aligned the template with the evolved by-default design system ("BrandOS") — same structure and logic, brand-neutral look. Earlier `src/` and `--brand-*` references above are historical.

### Architecture Decisions
- **Inverted brand contract**: design-system.css ships neutral engine defaults on real token names; `assets/css/theme.css` overrides §1/§2 primitives (no more `var(--brand-*, fallback)` indirection). Neutral accent is generic blue `#0969da`.
- **Assets at root**: `src/` removed; `assets/{css,js,fonts,icons,images}` at the repo root. Three-layer CSS: design-system.css → theme.css → style.css.
- **Docs-hosted demos**: the standalone styleguide and brand-book pages were dissolved into the docs site (live HTML demos inside `docs/*.md`, "Brand" sidebar section with `brand-book.md`).
- **Dark mode built in**: `[data-theme="dark"]` tokens + `prefers-color-scheme` no-JS mirror + `assets/js/theme-toggle.js` (pre-paint, localStorage `dark-mode`).
- **CUBE button**: component-scoped tokens with `data-variant/size/color/icon-only/full-width` exceptions; `class="button"` required; bare `<button>` is reset-only.
- **Motion + radius + alpha tokens** added (primitives only — no semantic motion layer).

### Completed
- [x] Move assets to root, remove src/, relocate CSS to assets/css/
- [x] Rewrite design-system.css (§1 inversion, §2b/2c dark mode, §3 radius, §4 motion, §11 CUBE button)
- [x] New theme.css all-commented starter + theme-toggle.js
- [x] Brand section in docs sidebar; demo-preview styles; docs content rewritten with live demos
- [x] CLAUDE.md / README / folder docs updated to the new contract
