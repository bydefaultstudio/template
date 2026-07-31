# [Your Project Name]

This project uses a structured design system and layout architecture for building consistent, maintainable front-end experiences.

## Overview

This project includes:

- A complete **design system** with tokens, utility classes, components, and JS modules — shipping neutral defaults, with dark mode built in
- A **brand theme** (`assets/css/theme.css`) for per-project visual identity (fonts, colours, logo)
- Clear **layout and spacing rules** for consistent page structure
- Documented **best practices** for CSS, JavaScript, and HTML
- A **session handover** system so work resumes cleanly across sessions

## Getting Started

### With Claude Code (recommended)

Open the project in Claude Code and say:

> Set up this project

Claude follows the onboarding flow in `CLAUDE.md`: it runs `npm install` to sync the design system, interviews you to fill in `PROJECT_BRIEF.md`, propagates your project name across the template, allocates a local port, applies any known brand tokens to `assets/css/theme.css`, and regenerates the docs site.

### Manual setup

1. Run `npm install` — `bd-sync` copies the design system artefacts from the `@bydefaultstudio/design-system` package into the project
2. Review `PROJECT_BRIEF.md` for project goals and requirements
3. Allocate a local port and pin it in `.vscode/settings.json` (see [Local development](#local-development))
4. Follow the [Setup guide](docs/site/setup.html) to customize brand colors, fonts, and logo
5. Explore the [Documentation](docs/site/index.html) for template and project guides
6. Browse the canonical design system docs at [bydefault.design](https://bydefault.design/design-system/what-is-a-design-system.html)
7. Check the [Brand Book](docs/site/brand-book.html) to see the current brand identity
8. Start building pages at the repo root — edit `index.html`, copy `templates/page-template.html` for new pages, and keep css/js/images in `assets/`

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

The design system itself arrives via the `@bydefaultstudio/design-system` npm package; its canonical documentation lives at [bydefault.design](https://bydefault.design).

---

**ByDefault Studio** — [bydefault.studio](https://bydefault.studio)
