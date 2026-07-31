---
description: Write or refresh the session handover so this work can resume in a fresh session
---

Write or refresh the session handover for this project.

## Which file

Default to `handovers/HANDOVER.md` — one handover per project is the standard.

Use `handovers/HANDOVER-<topic>.md` only when genuinely separate tracks of work
are in flight at once and merging them into one file would confuse rather than
help (e.g. a design system migration running alongside a content rebuild).
`<topic>` is kebab-case and describes the work, not the date: `HANDOVER-nav-rebuild.md`,
not `HANDOVER-july.md`. When you create a topic handover, say so in
`handovers/HANDOVER.md` so the default file stays the index.

If `$ARGUMENTS` names a topic, write `handovers/HANDOVER-<topic>.md`.

## Rewrite, don't append

The handover is a baton, not a log. It describes **where the work stands right
now** — replace stale content outright. Anything worth keeping permanently
belongs in `PROJECT_PROGRESS.md` instead.

Before writing, move newly-completed work into `PROJECT_PROGRESS.md` (dated
section, newest first) and move any new ideas that aren't started into
`ROADMAP.md`. The handover keeps only what's live.

## Gather the real state

Do not write this from memory of the conversation. Check:

- `git status` and `git log --oneline` since the last handover — what actually
  landed, and whether it's pushed
- the current branch, and whether it's merged
- any failing build, unfinished edit, or uncommitted file
- `PROJECT_PROGRESS.md` and `ROADMAP.md` for what's already recorded

## Format

```markdown
# Handover — <short headline of where things stand>

## Status (read first)

Branch, what's pushed, what's merged, and the single most important thing the
next session needs to know. Two to five sentences. Be specific: commit SHAs,
file paths, version numbers. "Mostly done" tells the next session nothing.

## What shipped this session

Bullets or a commit list. Only what is actually committed — work in progress
goes in the next section.

## In flight / next tasks

Numbered, most important first. Each item says what to do and what "done"
looks like. Include anything half-finished, with the exact file and line if
an edit was left open.

## Key files

The handful of paths the next session needs, one line each on why.

## Gotchas

Traps discovered this session — things that would cost the next session an
hour if rediscovered. Failure modes, host quirks, non-obvious coupling. Omit
the heading if there genuinely are none.
```

## Rules

- Write for a session with **no memory of this conversation**. Assume nothing.
- Prefer concrete detail over summary. A SHA, a path, a version, an exact error.
- Say what is *not* done as clearly as what is. Silent gaps are the failure mode.
- If work is blocked on the owner (a review, a decision, an asset), say so and
  name the decision.
- Never claim something is verified that you did not verify. If a change is
  untested, write that.
- Keep it scannable — the point is to rebuild context fast.

After writing, tell the user which file you wrote and give a two-line summary.
