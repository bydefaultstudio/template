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
- [x] Commit all changes and push to GitHub
- [ ] Set up VS Code Live Server to serve from project root (`.vscode/settings.json`)

---

## Future Work (Superseded)

These items were discussed but explicitly deferred. **Superseded 2026-07-12:** the design system now arrives via the `@bydefaultstudio/design-system` npm package, and most of the elements below (tables, details/summary, tags, breadcrumbs, pagination, progress, tabs and more) ship in the current framework. New component requests belong in the design-system repo, not this template.

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

---

## npm Design System Dependency (2026-07-12)

The design system is no longer a tracked copy — it arrives via the `@bydefaultstudio/design-system` npm package. Canonical documentation lives at [bydefault.design](https://bydefault.design).

### Architecture Decisions
- **Synced, not vendored**: `scripts/sync-design-system.js` copies the package's CSS into `assets/css/design-system.css` on `npm install` (postinstall hook). The file is gitignored and never hand-edited — changes belong upstream in the design-system repo.
- **No lockfile in the template**: `package-lock.json` is ignored so new projects resolve the newest compatible version at first install; projects may commit their own lockfile afterwards.
- **Dependabot + Netlify**: `.github/dependabot.yml` opens PRs on new package versions; `netlify.toml` runs `npm install` on deploy so the sync happens in CI.
- **Docs are project-scoped**: the twelve design system docs were deleted from `docs/`; cross-links point at the canonical live docs.

### Completed
- [x] Root `package.json` + postinstall sync script; design-system.css untracked and gitignored
- [x] Compatibility pass for the 1,510 → 3,775-line version gap: `.container-small/-medium` → `.container-s/-m`; `--accent` → `--text-accent`; dark-mode-toggle icon rules re-homed to `style.css` + docs `docs.css`; framework summary chevron suppressed in docs sidebar; `.token-tag` re-homed to docs chrome
- [x] Dependabot, netlify.toml, README install/lockfile notes
- [x] Design system docs culled; docs site regenerated with template/project pages only
- [x] CLAUDE.md, README, setup/template/upgrading/folder-structure docs updated to the package workflow
- [x] Repo-wide audit: stale token/class/path references fixed across docs, generator, and templates
