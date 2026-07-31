# Handover — new project, not yet started

## Status (read first)

This is the template's starter handover. No project work has happened yet.

The first session's job is onboarding: fill in `PROJECT_BRIEF.md`, propagate the
project name, allocate a local port, and apply brand tokens. `CLAUDE.md` §12 has
the full sequence. Replace this file's contents once real work begins — it is
rewritten each session, not appended to.

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
