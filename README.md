# [Your Project Name]

This project uses a structured design system and layout architecture for building consistent, maintainable front-end experiences.

## Overview

This project includes:

- A complete **design system** with tokens, utility classes, components, and JS modules. It comes with neutral defaults and has dark mode built in.
- A **brand theme** (`assets/css/theme.css`) for per-project visual identity (fonts, colours, logo)
- Clear **layout and spacing rules** for consistent page structure
- Documented **best practices** for CSS, JavaScript, and HTML
- A **session handover** system so work resumes cleanly across sessions — `/bd:kickoff` and `/bd:handover`, provided by the By Default Claude Code plugin
- **Optional modules**. Parts a project may not need, like the docs site, are removed during onboarding. This way, every project starts clean.

## Getting Started

### Get the template

On GitHub, select **Use this template → Create a new repository** on [bydefaultstudio/template](https://github.com/bydefaultstudio/template). This creates a fresh repo with a clean history. Then, clone it. Anything in `<brackets>` is a placeholder: replace it with your own values before running.

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

Install the By Default plugin first if this machine does not have it — once per machine, in the terminal app, not the VS Code panel. It provides `/bd:kickoff`, `/bd:handover` and the shared review agents that `CLAUDE.md` relies on, and a session hook will remind you if it is missing:

```
/plugin marketplace add bydefaultstudio/agents
/plugin install bd@bydefault
```

Then open the project folder in Claude Code and paste:

> Set up this project. Run the onboarding in CLAUDE.md §12.

You can also just say "Set up this project". A SessionStart hook will notice if `PROJECT_BRIEF.md` is unfilled and will point Claude to onboarding automatically. Claude then:

1. runs `npm install` if the design system has not been synced yet
2. interviews you in short batches and fills in `PROJECT_BRIEF.md`
3. asks which optional modules the project needs (currently the docs site) and removes what you skip
4. propagates the project name, applies known brand tokens to `assets/css/theme.css`, and allocates a local port
5. rebuilds the docs site if it was kept, and points you at the remaining checklist (logo, favicons, fonts)

### Manual setup

1. Run `npm install` (see [what it does](#what-npm-install-does-here) above)
2. Review `PROJECT_BRIEF.md` for project goals and requirements
3. Decide if the project needs the generated docs site. If not, remove it by following the removal map in `CLAUDE.md` §12 (see [Optional modules](#optional-modules) below).
4. Allocate a local port with `/bd:localhost allocate` and pin it (see [Local development](#local-development))
5. Follow the [Setup guide](docs/site/setup.html) to customise brand colours, fonts, and logo
6. Explore the [Documentation](docs/site/index.html) for template and project guides
7. Browse the canonical design system docs at [bydefault.design](https://bydefault.design/website/what-is-a-design-system.html)
8. Check the [Brand Book](docs/site/brand-book.html) to see the current brand identity
9. Start building pages at the repo root. Edit `index.html`, copy `templates/page-template.html` for new pages, and keep css, js, and images in `assets/`.

## Optional modules

The template ships complete. Every project starts from the same tree, and parts a project does not need are removed at onboarding instead of being assembled by a scaffolder.

One module is optional today: the **docs site**. It consists of the generated `docs/site/` pages, `docs/docs.config.js`, the `docs:build` / `docs:watch` scripts, and the site-only pages (`markdown-style.md`, `upgrading-docs.md`, `template.md`). Removing it does not delete the four authoritative guides: `docs/brand-book.md`, `docs/seo-best-practices.md`, `docs/folder-structure.md`, and `docs/setup.md` stay in every project as plain markdown, with their cross-links retargeted. The design system is also unaffected: `bd-sync` and the docs generator are independent tools inside the same package.

The exact removal procedure lives in `CLAUDE.md` §12 (Optional modules). Claude runs it automatically at onboarding if you skip the module; the same map works later if you kept it and change your mind. A removed module can be restored by copying its files back from the template repo and reversing the patches the map applied.

## Project Structure

The shape of the repo: everything marked *synced* is written into place by `npm install`, gitignored, and never committed or hand-edited.

<!-- structure:start -->
```text
template/
├── .claude/                   # Claude Code hooks (onboarding + plugin check)
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
├── docs/                      # markdown sources (edit these)
│   ├── site/                  # generated HTML (never hand-edit)
│   └── docs.config.js         # base path, footer, brand CSS path
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

[Open this structure in the editor →](https://folder-structure.bydefault.studio/#t=0dGVtcGxhdGUvCuKUnOKUgOKUgCAuY2xhdWRlLyAgICAgICAgICAgICAgICAgICAjIENsYXVkZSBDb2RlIGhvb2tzIGFuZCBzbGFzaCBjb21tYW5kcwrilJzilIDilIAgLmdpdGh1Yi8K4pSCICAg4pSU4pSA4pSAIGRlcGVuZGFib3QueW1sICAgICAgICAgIyB3ZWVrbHkgZGVzaWduIHN5c3RlbSB2ZXJzaW9uIGNoZWNrcwrilJzilIDilIAgLnZzY29kZS8K4pSCICAg4pSU4pSA4pSAIHNldHRpbmdzLmpzb24gICAgICAgICAgIyBMaXZlIFNlcnZlciBwb3J0IHBpbiAob25lIHBlciBwcm9qZWN0KQrilJzilIDilIAgYXNzZXRzLwrilIIgICDilJzilIDilIAgY3NzLwrilIIgICDilIIgICDilJzilIDilIAgZGVzaWduLXN5c3RlbS8gICAgICMgY29tcG9uZW50IGNvbXBhbmlvbiBDU1MgKHN5bmNlZCkK4pSCICAg4pSCICAg4pSc4pSA4pSAIGRlc2lnbi1zeXN0ZW0uY3NzICAjIHRoZSBmcmFtZXdvcmsgKHN5bmNlZCkK4pSCICAg4pSCICAg4pSc4pSA4pSAIHN0eWxlLmNzcyAgICAgICAgICAjIHByb2plY3Qtc3BlY2lmaWMgc3R5bGVzCuKUgiAgIOKUgiAgIOKUlOKUgOKUgCB0aGVtZS5jc3MgICAgICAgICAgIyBicmFuZCBvdmVycmlkZXM6IGZvbnRzLCBjb2xvdXJzCuKUgiAgIOKUnOKUgOKUgCBmb250cy8gICAgICAgICAgICAgICAgICMgc2VsZi1ob3N0ZWQgYnJhbmQgZm9udHMK4pSCICAg4pSc4pSA4pSAIGljb25zLyAgICAgICAgICAgICAgICAgIyBmYXZpY29ucyArIHN5bmNlZCBpY29uL2N1cnNvciBzcHJpdGVzCuKUgiAgIOKUnOKUgOKUgCBpbWFnZXMvICAgICAgICAgICAgICAgICMgZ2VuZXJhbCBhbmQgT3BlbiBHcmFwaCBpbWFnZXMK4pSCICAg4pSU4pSA4pSAIGpzLwrilIIgICAgICAg4pSc4pSA4pSAIGRlc2lnbi1zeXN0ZW0vICAgICAjIGNvbXBvbmVudCBKUyBtb2R1bGVzIChzeW5jZWQpCuKUgiAgICAgICDilJTilIDilIAgdGhlbWUtdG9nZ2xlLmpzICAgICMgZGFyay1tb2RlIHRvZ2dsZQrilJzilIDilIAgZG9jcy8gICAgICAgICAgICAgICAgICAgICAgIyBtYXJrZG93biBzb3VyY2VzIChlZGl0IHRoZXNlKQrilIIgICDilJzilIDilIAgc2l0ZS8gICAgICAgICAgICAgICAgICAjIGdlbmVyYXRlZCBIVE1MIChuZXZlciBoYW5kLWVkaXQpCuKUgiAgIOKUlOKUgOKUgCBkb2NzLmNvbmZpZy5qcyAgICAgICAgICMgYmFzZSBwYXRoLCBmb290ZXIsIGJyYW5kIENTUyBwYXRoCuKUnOKUgOKUgCBoYW5kb3ZlcnMvCuKUgiAgIOKUlOKUgOKUgCBIQU5ET1ZFUi5tZCAgICAgICAgICAgICMgd2hlcmUgdGhlIHdvcmsgc3RhbmRzIHJpZ2h0IG5vdwrilJzilIDilIAgdGVtcGxhdGVzLyAgICAgICAgICAgICAgICAgIyBwYWdlIGFuZCBjb21wb25lbnQgYm9pbGVycGxhdGUK4pSc4pSA4pSAIHZlbmRvci8K4pSCICAg4pSU4pSA4pSAIGRlc2lnbi1zeXN0ZW0tcmVhY3QvICAgIyBSZWFjdCBhZGFwdGVycyAoc3luY2VkLCBidW5kbGVyIGlucHV0KQrilJzilIDilIAgLmdpdGlnbm9yZSAgICAgICAgICAgICAgICAgIyBsaXN0cyBhbGwgYmQtc3luYyBhcnRlZmFjdHMK4pSc4pSA4pSAIENMQVVERS5tZCAgICAgICAgICAgICAgICAgICMgZGV2ZWxvcG1lbnQgcnVsZXMgKGF1dGhvcml0YXRpdmUpCuKUnOKUgOKUgCBERVNJR04ubWQgICAgICAgICAgICAgICAgICAjIGRlc2lnbiBydWxlcyAoc3luY2VkKQrilJzilIDilIAgUFJPSkVDVF9CUklFRi5tZCAgICAgICAgICAgIyBwcm9qZWN0IGdvYWxzIGFuZCBjb25zdHJhaW50cwrilJzilIDilIAgUFJPSkVDVF9QUk9HUkVTUy5tZCAgICAgICAgIyBkYXRlZCBsb2cgb2Ygd2hhdCBzaGlwcGVkCuKUnOKUgOKUgCBSRUFETUUubWQK4pSc4pSA4pSAIFJPQURNQVAubWQgICAgICAgICAgICAgICAgICMgaWRlYXMgbm90IHlldCBzdGFydGVkCuKUnOKUgOKUgCBpbmRleC5odG1sICAgICAgICAgICAgICAgICAjIHN0YXJ0ZXIgaG9tZXBhZ2UgKHJlcGxhY2UgdGhpcykK4pSU4pSA4pSAIHBhY2thZ2UuanNvbiAgICAgICAgICAgICAgICMgZGVzaWduIHN5c3RlbSBkZXBlbmRlbmN5IGFuZCBiZC1zeW5jIHBvc3RpbnN0YWxsCg)
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

All of it is gitignored and regenerated on every install. **Never edit these by hand.** Changes to shared code should be made upstream in the design-system repo, released, and then pulled down with a version bump.

> **Updating later:** the pin is a caret range, so `npm update @bydefaultstudio/design-system` picks up minor and patch releases automatically. Crossing a **major** version is a deliberate edit: caret ranges don't cross majors, and a major means breaking changes. Dependabot opens a PR on each release either way.

> **Note on the lockfile:** this template deliberately ignores `package-lock.json`, so a project created from it resolves the newest compatible design system version at first install. Commit your own lockfile once the project is under way. It pins the build, and some hosts detect the package manager from it (without one, Cloudflare may fall back to bun, which cannot resolve the `#semver:` git range).

## Local development

Every project uses a fixed local address. For this project, it is:

**http://localhost:2300/**

`npm run serve` serves the repo root there, and VS Code Live Server is pinned to the same number in `.vscode/settings.json` — run one at a time. With the `bd` plugin installed, `/bd:localhost` finds the address, starts the server and opens it. If you add another dev server, pin the port there too; an unpinned server does not error on a taken port, it silently starts on the next one up. The studio-wide allocation and rules live in the plugin's port registry; see `CLAUDE.md` §15.

## Session handovers

Work state lives in three files, split by tense:

- `ROADMAP.md` (ideas not yet started)
- `handovers/HANDOVER.md` (where the work stands right now, rewritten each session)
- `PROJECT_PROGRESS.md` (what has shipped, appended and dated with newest first)

Run `/bd:kickoff` at the start of a session and `/bd:handover` at the end. Both come from the By Default plugin (`bd` 0.5.0+), installed once per machine — see Getting Started. `CLAUDE.md` §14 has the detail.

## Deployment

You can use any static host, such as Cloudflare Pages, Netlify, or Vercel. Set the build command to `npm install` and the publish directory to `/`.

The install step is **not optional**. The design system CSS is synced, not committed, so if you skip this step, every page will be published unstyled even though the build reports success. See the [Setup guide](docs/site/setup.html#deployment) for details.

## Documentation

Template and project documentation is available in the [Documentation site](docs/site/index.html), including:

- **Brand**: Brand book and theming guide
- **Content**: Markdown style and SEO best practices
- **Project**: Setup, folder structure, and project overview

The site is the rendered form of the markdown guides in `docs/`. The guides are always present, but the site itself is an optional module (see [Optional modules](#optional-modules)).

The design system itself arrives via the `@bydefaultstudio/design-system` npm package; its canonical documentation lives at [bydefault.design](https://bydefault.design).

---

**ByDefault Studio** [bydefault.studio](https://bydefault.studio)
