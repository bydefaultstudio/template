# [Your Project Name]

This project uses a structured design system and layout architecture for building consistent, maintainable front-end experiences.

## Overview

This project includes:

- A complete **design system** with tokens, utility classes, components, and JS modules — shipping neutral defaults, with dark mode built in
- A **brand theme** (`assets/css/theme.css`) for per-project visual identity (fonts, colours, logo)
- Clear **layout and spacing rules** for consistent page structure
- Documented **best practices** for CSS, JavaScript, and HTML
- A **session handover** system so work resumes cleanly across sessions
- **Optional modules** — parts a project may not need (currently the docs site) are removed at onboarding, so any type of project starts clean

## Getting Started

### With Claude Code (recommended)

Open the project in Claude Code and say:

> Set up this project

Claude follows the onboarding flow in `CLAUDE.md`: it runs `npm install` to sync the design system, interviews you to fill in `PROJECT_BRIEF.md`, asks which optional modules the project needs (currently the docs site) and removes what you skip, propagates your project name across the template, applies any known brand tokens to `assets/css/theme.css`, allocates a local port, and regenerates the docs site if it was kept.

### Manual setup

1. Run `npm install` — `bd-sync` copies the design system artefacts from the `@bydefaultstudio/design-system` package into the project
2. Review `PROJECT_BRIEF.md` for project goals and requirements
3. Decide whether the project needs the generated docs site — if not, remove it by following the removal map in `CLAUDE.md` §12 (see [Optional modules](#optional-modules) below)
4. Allocate a local port and pin it in `.vscode/settings.json` (see [Local development](#local-development))
5. Follow the [Setup guide](docs/site/setup.html) to customize brand colors, fonts, and logo
6. Explore the [Documentation](docs/site/index.html) for template and project guides
7. Browse the canonical design system docs at [bydefault.design](https://bydefault.design/website/what-is-a-design-system.html)
8. Check the [Brand Book](docs/site/brand-book.html) to see the current brand identity
9. Start building pages at the repo root — edit `index.html`, copy `templates/page-template.html` for new pages, and keep css/js/images in `assets/`

## Optional modules

The template ships complete — every project starts from the same tree — and parts a project does not need are removed at onboarding rather than assembled by a scaffolder.

One module is optional today: the **docs site**. It consists of the generated `docs/site/` pages, `docs/docs.config.js`, the `docs:build` / `docs:watch` scripts, and the site-only pages (`markdown-style.md`, `upgrading-docs.md`, `template.md`). Removing it does not delete the four authoritative guides — `docs/brand-book.md`, `docs/seo-best-practices.md`, `docs/folder-structure.md`, `docs/setup.md` stay in every project as plain markdown (their cross-links get retargeted) — and the design system is unaffected: `bd-sync` and the docs generator are independent tools inside the same package.

The exact removal procedure lives in `CLAUDE.md` §12 (Optional modules). Claude runs it automatically at onboarding if you skip the module; the same map works later if you kept it and change your mind. A removed module can be restored by copying its files back from the template repo and reversing the patches the map applied.

## Project Structure

The shape of the repo — everything marked *synced* is written into place by `npm install`, gitignored, and never committed or hand-edited.

<!-- structure:start -->
```text
template/
├── .claude/                   # Claude Code hooks and slash commands
├── .github/
│   └── dependabot.yml         # weekly design system version checks
├── .vscode/
│   └── settings.json          # Live Server port pin — one per project
├── assets/
│   ├── css/
│   │   ├── design-system/     # component companion CSS — synced
│   │   ├── design-system.css  # the framework — synced
│   │   ├── style.css          # project-specific styles
│   │   └── theme.css          # brand overrides: fonts, colours
│   ├── fonts/                 # self-hosted brand fonts
│   ├── icons/                 # favicons + synced icon/cursor sprites
│   ├── images/                # general and Open Graph images
│   └── js/
│       ├── design-system/     # component JS modules — synced
│       └── theme-toggle.js    # dark-mode toggle
├── docs/                      # markdown sources — edit these
│   ├── site/                  # generated HTML — never hand-edit
│   └── docs.config.js         # base path, footer, brand CSS path
├── handovers/
│   └── HANDOVER.md            # where the work stands right now
├── templates/                 # page and component boilerplate
├── .gitignore                 # lists every bd-sync artefact
├── CLAUDE.md                  # development rules — authoritative
├── DESIGN.md                  # design rules — synced
├── PROJECT_BRIEF.md           # project intent and constraints
├── PROJECT_PROGRESS.md        # dated log of what shipped
├── README.md
├── ROADMAP.md                 # ideas not yet started
├── index.html                 # starter homepage — replace this
└── package.json               # design system dep + bd-sync postinstall
```

[Open this structure in the editor →](https://folder-structure.bydefault.studio/#t=0dGVtcGxhdGUvCuKUnOKUgOKUgCAuY2xhdWRlLyAgICAgICAgICAgICAgICAgICAjIENsYXVkZSBDb2RlIGhvb2tzIGFuZCBzbGFzaCBjb21tYW5kcwrilJzilIDilIAgLmdpdGh1Yi8K4pSCICAg4pSU4pSA4pSAIGRlcGVuZGFib3QueW1sICAgICAgICAgIyB3ZWVrbHkgZGVzaWduIHN5c3RlbSB2ZXJzaW9uIGNoZWNrcwrilJzilIDilIAgLnZzY29kZS8K4pSCICAg4pSU4pSA4pSAIHNldHRpbmdzLmpzb24gICAgICAgICAgIyBMaXZlIFNlcnZlciBwb3J0IHBpbiDigJQgb25lIHBlciBwcm9qZWN0CuKUnOKUgOKUgCBhc3NldHMvCuKUgiAgIOKUnOKUgOKUgCBjc3MvCuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBkZXNpZ24tc3lzdGVtLyAgICAgIyBjb21wb25lbnQgY29tcGFuaW9uIENTUyDigJQgc3luY2VkCuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBkZXNpZ24tc3lzdGVtLmNzcyAgIyB0aGUgZnJhbWV3b3JrIOKAlCBzeW5jZWQK4pSCICAg4pSCICAg4pSc4pSA4pSAIHN0eWxlLmNzcyAgICAgICAgICAjIHByb2plY3Qtc3BlY2lmaWMgc3R5bGVzCuKUgiAgIOKUgiAgIOKUlOKUgOKUgCB0aGVtZS5jc3MgICAgICAgICAgIyBicmFuZCBvdmVycmlkZXM6IGZvbnRzLCBjb2xvdXJzCuKUgiAgIOKUnOKUgOKUgCBmb250cy8gICAgICAgICAgICAgICAgICMgc2VsZi1ob3N0ZWQgYnJhbmQgZm9udHMK4pSCICAg4pSc4pSA4pSAIGljb25zLyAgICAgICAgICAgICAgICAgIyBmYXZpY29ucyArIHN5bmNlZCBpY29uL2N1cnNvciBzcHJpdGVzCuKUgiAgIOKUnOKUgOKUgCBpbWFnZXMvICAgICAgICAgICAgICAgICMgZ2VuZXJhbCBhbmQgT3BlbiBHcmFwaCBpbWFnZXMK4pSCICAg4pSU4pSA4pSAIGpzLwrilIIgICAgICAg4pSc4pSA4pSAIGRlc2lnbi1zeXN0ZW0vICAgICAjIGNvbXBvbmVudCBKUyBtb2R1bGVzIOKAlCBzeW5jZWQK4pSCICAgICAgIOKUlOKUgOKUgCB0aGVtZS10b2dnbGUuanMgICAgIyBkYXJrLW1vZGUgdG9nZ2xlCuKUnOKUgOKUgCBkb2NzLyAgICAgICAgICAgICAgICAgICAgICAjIG1hcmtkb3duIHNvdXJjZXMg4oCUIGVkaXQgdGhlc2UK4pSCICAg4pSc4pSA4pSAIHNpdGUvICAgICAgICAgICAgICAgICAgIyBnZW5lcmF0ZWQgSFRNTCDigJQgbmV2ZXIgaGFuZC1lZGl0CuKUgiAgIOKUlOKUgOKUgCBkb2NzLmNvbmZpZy5qcyAgICAgICAgICMgYmFzZSBwYXRoLCBmb290ZXIsIGJyYW5kIENTUyBwYXRoCuKUnOKUgOKUgCBoYW5kb3ZlcnMvCuKUgiAgIOKUlOKUgOKUgCBIQU5ET1ZFUi5tZCAgICAgICAgICAgICMgd2hlcmUgdGhlIHdvcmsgc3RhbmRzIHJpZ2h0IG5vdwrilJzilIDilIAgdGVtcGxhdGVzLyAgICAgICAgICAgICAgICAgIyBwYWdlIGFuZCBjb21wb25lbnQgYm9pbGVycGxhdGUK4pSc4pSA4pSAIC5naXRpZ25vcmUgICAgICAgICAgICAgICAgICMgbGlzdHMgZXZlcnkgYmQtc3luYyBhcnRlZmFjdArilJzilIDilIAgQ0xBVURFLm1kICAgICAgICAgICAgICAgICAgIyBkZXZlbG9wbWVudCBydWxlcyDigJQgYXV0aG9yaXRhdGl2ZQrilJzilIDilIAgREVTSUdOLm1kICAgICAgICAgICAgICAgICAgIyBkZXNpZ24gcnVsZXMg4oCUIHN5bmNlZArilJzilIDilIAgUFJPSkVDVF9CUklFRi5tZCAgICAgICAgICAgIyBwcm9qZWN0IGludGVudCBhbmQgY29uc3RyYWludHMK4pSc4pSA4pSAIFBST0pFQ1RfUFJPR1JFU1MubWQgICAgICAgICMgZGF0ZWQgbG9nIG9mIHdoYXQgc2hpcHBlZArilJzilIDilIAgUkVBRE1FLm1kCuKUnOKUgOKUgCBST0FETUFQLm1kICAgICAgICAgICAgICAgICAjIGlkZWFzIG5vdCB5ZXQgc3RhcnRlZArilJzilIDilIAgaW5kZXguaHRtbCAgICAgICAgICAgICAgICAgIyBzdGFydGVyIGhvbWVwYWdlIOKAlCByZXBsYWNlIHRoaXMK4pSU4pSA4pSAIHBhY2thZ2UuanNvbiAgICAgICAgICAgICAgICMgZGVzaWduIHN5c3RlbSBkZXAgKyBiZC1zeW5jIHBvc3RpbnN0YWxsCg)
<!-- structure:end -->

Full explanations of every folder — and the synced-vs-authored rule — are in [docs/folder-structure.md](docs/folder-structure.md).

## The design system

The design system arrives as a versioned package and is **vendored, not committed**. `npx bd-sync` runs on every `npm install` and writes:

| Path | Contents |
| --- | --- |
| `assets/css/design-system.css` | The framework |
| `assets/css/design-system/` | Component companion CSS |
| `assets/js/design-system/` | Component JS modules |
| `assets/icons/icons.svg` | Icon sprite |
| `assets/icons/cursors.svg` | Cursor sprite |
| `DESIGN.md` | Design rules |

All of it is gitignored and regenerated on every install — **never edit these by hand**. Changes to shared code belong upstream in the design-system repo, released, then pulled down with a version bump.

> **Updating later:** the pin is a caret range, so `npm update @bydefaultstudio/design-system` picks up minor and patch releases automatically. Crossing a **major** version is a deliberate edit — caret ranges don't cross majors, and a major means breaking changes. Dependabot opens a PR on each release either way.

> **Note on the lockfile:** this template deliberately ignores `package-lock.json`, so a project created from it resolves the newest compatible design system version at first install. Commit your own lockfile once the project is under way — it pins the build, and some hosts detect the package manager from it (without one, Cloudflare may fall back to bun, which cannot resolve the `#semver:` git range).

## Local development

Every project has one fixed local address. This one is:

**http://localhost:2300/**

The port is pinned in `.vscode/settings.json` for Live Server. If you run any other dev server, pin it there too — an unpinned port silently drifts to the next free number and collides with another project. The full band allocation and rules are in `CLAUDE.md` §15.

## Session handovers

Work state lives in three files, split by tense:

- `ROADMAP.md` — ideas not yet started
- `handovers/HANDOVER.md` — where the work stands right now (rewritten each session)
- `PROJECT_PROGRESS.md` — what has shipped (appended, dated, newest first)

Read the handover at the start of a session; run `/handover` at the end. See `CLAUDE.md` §14.

## Deployment

Any static host works (Cloudflare Pages, Netlify, Vercel…). Configure the host with build command `npm install` and publish directory `/`.

The install step is **not optional**: the design system CSS is synced, not committed, so a deploy that skips it publishes every page unstyled while still reporting a successful build. See the [Setup guide](docs/site/setup.html#deployment) for details.

## Documentation

Template and project documentation is available in the [Documentation site](docs/site/index.html), including:

- **Brand** — Brand book and theming guide
- **Content** — Markdown style and SEO best practices
- **Project** — Setup, folder structure, and project overview

The site is the rendered form of the markdown guides in `docs/` — the guides are always present; the site itself is an optional module (see [Optional modules](#optional-modules)).

The design system itself arrives via the `@bydefaultstudio/design-system` npm package; its canonical documentation lives at [bydefault.design](https://bydefault.design).

---

**ByDefault Studio** — [bydefault.studio](https://bydefault.studio)
