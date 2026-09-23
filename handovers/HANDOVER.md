# Handover — new project, not yet started

## Status (read first)

This is the template's starter handover. No project work has happened yet.

The first session's job is onboarding: fill in `PROJECT_BRIEF.md`, propagate the
project name, allocate a local port, and apply brand tokens. `CLAUDE.md` §12 has
the full sequence. This file is rewritten each session by `/bd:handover`, never
appended to — the first real `/bd:handover` replaces all of this.

## What shipped this session

Nothing yet.

## In flight / next tasks

1. Run `npm install` — syncs the design system via `bd-sync`. Nothing renders
   until this has run; `assets/css/design-system.css` is gitignored and does not
   exist in a fresh clone.
2. Complete onboarding per `CLAUDE.md` §12 — brief, project name, port
   allocation, brand tokens, docs rebuild.
3. Work the remaining checklist in `PROJECT_PROGRESS.md`.

## Key files

- `PROJECT_BRIEF.md` — project intent and constraints; fill this first
- `PROJECT_PROGRESS.md` — dated log of what has shipped
- `ROADMAP.md` — ideas not yet committed to
- `CLAUDE.md` — the authoritative development rules
- `assets/css/theme.css` — brand tokens go here, never in `design-system.css`

## Gotchas

- The design system is vendored, not committed. Every artefact `bd-sync` writes
  is gitignored and regenerated on install — hand-edits are silently destroyed
  on the next `npm install`.
- A host that skips `npm install` publishes the site completely unstyled while
  reporting a successful build. See `docs/setup.md` → Deployment.
- `/bd:kickoff` and `/bd:handover` come from the By Default plugin, installed once per
  machine. If neither is in the skill list, the plugin is missing — `CLAUDE.md`
  §14 has the two install commands.

## Next session — paste this

```text
Set up this project. Run the onboarding in CLAUDE.md §12.

This is a fresh clone of the By Default template: PROJECT_BRIEF.md still has
placeholders, the design system has not been synced, and no port is allocated.
Onboarding comes before any other work.

Run npm install first if assets/css/design-system.css is missing. Then
interview me in batches, fill the brief, choose the optional modules, propagate
the project name, allocate a port, and finish by running /handover so the next
session starts from a real handover, not this starter.

Working rules: commit only the files you touched, ask before pushing.
```
