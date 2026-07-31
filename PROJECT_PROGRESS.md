# Project Progress

The durable record of what has **actually shipped**. Add a dated section per
meaningful chunk of work, newest first. Append here; never rewrite history.

This is one of three tracking documents — see `CLAUDE.md` §14:

| File | Tense | Lifecycle |
| --- | --- | --- |
| `ROADMAP.md` | Future — what we might do | Edited freely |
| `handovers/HANDOVER.md` | Present — where we are right now | Rewritten each session |
| `PROJECT_PROGRESS.md` | Past — what shipped | Appended, dated, newest first |

Claude: keep this updated as you complete work. Write the date as `YYYY-MM-DD`.

---

## Onboarding

- [ ] Run `npm install` (syncs the design system via `bd-sync`)
- [ ] Fill in `PROJECT_BRIEF.md`
- [ ] Propagate the project name across the template (see `CLAUDE.md` §12)
- [ ] Allocate a local port and pin it (see `CLAUDE.md` §15)
- [ ] Apply brand tokens in `assets/css/theme.css`
- [ ] Replace logo (`assets/images/logo.svg`) and favicons (`assets/icons/`)
- [ ] Regenerate the docs site (`npm run docs:build`)
- [ ] Configure hosting (build command `npm install`, publish directory `/`)
- [ ] Replace the starter `handovers/HANDOVER.md` and `ROADMAP.md` contents
