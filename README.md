<p>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/images/readme-header_dark.svg">
  <img alt="template" src="assets/images/readme-header_light.svg" height="48">
</picture>
</p>

# [Your Project Name]

A starter for static websites built on the By Default design system: tokens, utility classes, components and JS modules, with a clear layout architecture and rules that Claude Code follows.

## Overview

This project includes:

- A complete **design system** with tokens, utility classes, components, and JS modules. It comes with neutral defaults and has dark mode built in.
- A **brand theme** (`assets/css/theme.css`) for per-project visual identity (fonts, colours, logo)
- Clear **layout and spacing rules** for consistent page structure
- Documented **best practices** for CSS, JavaScript, and HTML
- **Session handovers**: three plain markdown files that let work resume cleanly across sessions

## Getting Started

### Get the template

On GitHub, select **Use this template → Create a new repository** on [bydefaultstudio/template](https://github.com/bydefaultstudio/template). This creates a fresh repo with a clean history. Then clone it. Anything in `<brackets>` is a placeholder: replace it with your own values before running.

```bash
git clone https://github.com/<your-account>/<your-project>.git
cd <your-project>
npm install
```

Or copy the template directly without GitHub:

```bash
git clone https://github.com/bydefaultstudio/template.git <your-project>
cd <your-project>
rm -rf .git && git init -b main
npm install
```

### What `npm install` does here

It does more than fetch dependencies. The postinstall step runs `npx bd-sync`, which writes the design system into the project: `assets/css/design-system.css`, the component CSS and JS modules, the icon and cursor sprites, and `DESIGN.md`. All of these are gitignored. **A fresh clone does not contain them, and every page renders unstyled until the install has run.** The same applies to any new checkout, which is why the deploy build command is `npm install` (see [Deployment](#deployment)). `bd-sync` prints a table of what it wrote. A clean run means every artefact landed.

### With Claude Code (recommended)

Open the project folder in Claude Code and paste:

> Set up this project. Run the onboarding in CLAUDE.md §12.

You can also just say "Set up this project". A SessionStart hook notices if `PROJECT_BRIEF.md` is unfilled and points Claude to onboarding automatically. Claude then:

1. runs `npm install` if the design system has not been synced yet
2. interviews you in short batches and fills in `PROJECT_BRIEF.md`
3. propagates the project name, applies known brand tokens to `assets/css/theme.css`, and sets a local port
4. points you at the remaining checklist (logo, favicons, fonts)

### Manual setup

1. Run `npm install` (see [what it does](#what-npm-install-does-here) above)
2. Fill in `PROJECT_BRIEF.md` with your project goals and requirements
3. Choose a local port and pin it (see [Local development](#local-development))
4. Follow the [Setup guide](docs/setup.md) to customise brand colours, fonts, and logo
5. Check the [Brand Book](docs/brand-book.md) to see the current brand identity
6. Browse the canonical design system docs at [bydefault.design](https://bydefault.design/website/what-is-a-design-system.html)
7. Start building pages at the repo root. Edit `index.html`, copy `templates/page-template.html` for new pages, and keep CSS, JS, and images in `assets/`.

## Project Structure

The shape of the repo: everything marked *synced* is written into place by `npm install`, gitignored, and never committed or hand-edited.

<!-- structure:start -->
```text
template/
├── .claude/                   # Claude Code hook (onboarding check)
├── .github/
│   └── dependabot.yml         # weekly design system version checks
├── .vscode/
│   └── settings.json          # Live Server port pin (one per project)
├── assets/
│   ├── css/
│   │   ├── design-system/     # component companion CSS (synced)
│   │   ├── design-system.css  # the framework (synced)
│   │   ├── style.css          # project-specific styles
│   │   └── theme.css          # brand overrides: fonts, colours
│   ├── fonts/                 # self-hosted brand fonts
│   ├── icons/                 # favicons + synced icon/cursor sprites
│   ├── images/                # general and Open Graph images
│   └── js/
│       ├── design-system/     # component JS modules (synced)
│       └── theme-toggle.js    # dark-mode toggle
├── docs/                      # markdown guides
├── handovers/
│   └── HANDOVER.md            # where the work stands right now
├── templates/                 # page and component boilerplate
├── vendor/
│   └── design-system-react/   # React adapters (synced, bundler input)
├── .gitignore                 # lists all bd-sync artefacts
├── CLAUDE.md                  # development rules (authoritative)
├── DESIGN.md                  # design rules (synced)
├── PROJECT_BRIEF.md           # project goals and constraints
├── PROJECT_PROGRESS.md        # dated log of what shipped
├── README.md
├── ROADMAP.md                 # ideas not yet started
├── index.html                 # starter homepage (replace this)
└── package.json               # design system dependency and bd-sync postinstall
```
<!-- structure:end -->

Full explanations of every folder, including the synced-vs-authored rule, are in [docs/folder-structure.md](docs/folder-structure.md).

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

All of it is gitignored and regenerated on every install. **Never edit these by hand**: the next install overwrites them. Put project-specific styles in `assets/css/style.css` and brand overrides in `assets/css/theme.css`.

Canonical documentation for the design system lives at [bydefault.design](https://bydefault.design).

> **Updating later:** the pin is a caret range, so `npm update @bydefaultstudio/design-system` picks up minor and patch releases automatically. Crossing a **major** version is a deliberate edit: caret ranges don't cross majors, and a major means breaking changes. Dependabot opens a PR on each release either way.

> **Note on the lockfile:** this template deliberately ignores `package-lock.json`, so a project created from it resolves the newest compatible design system version at first install. Commit your own lockfile once the project is under way. It pins the build, and some hosts detect the package manager from it (without one, Cloudflare may fall back to bun, which cannot resolve the `#semver:` git range).

## Local development

Every project uses a fixed local address. For this project, it is:

**http://localhost:2700/**

`npm run serve` serves the repo root there, and VS Code Live Server is pinned to the same number in `.vscode/settings.json`: run one at a time. Change the number when you create a project from this template, so two projects never share a port. If you add another dev server, pin the port there too; an unpinned server does not error on a taken port, it silently starts on the next one up. See `CLAUDE.md` §15.

## Session handovers

Work state lives in three files, split by tense:

- `ROADMAP.md` (ideas not yet started)
- `handovers/HANDOVER.md` (where the work stands right now, rewritten each session)
- `PROJECT_PROGRESS.md` (what has shipped, appended and dated with newest first)

Read the handover at the start of a session and rewrite it at the end. `CLAUDE.md` §14 has the detail.

## Deployment

You can use any static host, such as Cloudflare Pages, Netlify, or Vercel. Set the build command to `npm install` and the publish directory to `/`.

The install step is **not optional**. The design system CSS is synced, not committed, so if you skip this step, every page will be published unstyled even though the build reports success. See the [Setup guide](docs/setup.md#deployment) for details.

---

**By Default Studio** [bydefault.studio](https://bydefault.studio)
