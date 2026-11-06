---
name: kickoff
description: >
  Rebuild context at the start of a session and produce an approved plan —
  read the handover, verify it against git, check assumptions against source,
  then plan. Use at the start of any session, and whenever picking work back
  up. Trigger phrases: "kickoff", "let's plan", "make a plan", "what were we
  doing", "pick this up", "where did we leave off", "start a session",
  "catch up".
user_invocable: true
---

# /bd:kickoff — rebuild context, then plan

The opening half of the session pair. `/bd:handover` closes it.

Works in any repo. Nothing here assumes a particular project, stack, or set of
tracking documents — every step degrades to something useful when its inputs
are missing.

Do the steps in order. Steps 1–2 are never skipped; a plan built on an
unverified handover is the failure this skill exists to prevent.

---

## 1. Read the baton

Read what the last session left, in this order:

- `handovers/HANDOVER.md`, plus **every** `handovers/HANDOVER-<topic>.md`
- the top of `PROJECT_PROGRESS.md` — the most recent dated sections only, not
  the whole history
- `ROADMAP.md`
- `CLAUDE.md` and any `.claude/rules/`

Note which of these exist. Their absence is information, not an error — see
step 7.

If a handover names a plan file (`<topic>-plan.md`, `PLAN-<topic>.md`), read
that too. It holds the decision log the handover only summarises.

## 2. Verify it against git

**The handover is a claim, not a fact.** It was written at a point in time,
usually before the last commits landed. Check the ground truth:

```bash
git status
git log --oneline -20
git branch --show-current
git log --oneline @{u}.. 2>/dev/null   # committed but unpushed
```

Then reconcile:

- **Where the handover and git disagree, git wins.** Say so out loud, naming
  both — "the handover says X is uncommitted; it landed in `a0a4448`." Do not
  silently correct it.
- Uncommitted or unpushed work is the first thing to report, before any plan.
- A handover describing work that is fully shipped is stale. Say that too.

Report what you found in a few lines before going further. The user should be
able to stop you here and redirect.

## 3. Confirm the track

If more than one thing is open — several numbered items in *In flight*, or
several topic handovers — **ask which one**, once, with `AskUserQuestion`.

Ask once and move on. Do not survey the options or list everything you could
do; the handover already did that.

If exactly one thing is open, name it and proceed. If the user opened the
session with a specific request, that is the track — this step is skipped.

## 4. Verify before planning

The step that makes the difference between a plan and a guess.

Every load-bearing assumption gets checked against its source **before** it
reaches the plan — not the docs' summary of the source, the source:

- read the library's actual `dist`/source for the version installed here
- query the live API or CMS for the real shape of the data
- read the real markup or the real config, not what a doc says it contains
- run `--help` against the real binary

Use `Explore` subagents in parallel for this — it is read-heavy work that
would otherwise flood the main context.

Carry the results into the plan under a **`Verified`** heading, each item
stating *how* it was checked. Anything that could not be verified is written
down as an assumption, labelled as one. An assumption stated plainly is
useful; an assumption dressed as a fact is a trap for the next session.

This is also where dead ends get recorded — "considered X, rejected because Y"
saves the next session from re-walking it.

## 5. Plan, don't act

Plan mode is **read-only except the plan file**. No `Edit`, no `Write` to
anything else, no non-readonly `Bash`, no commits — not even changes that seem
obviously correct.

Present the plan with `ExitPlanMode` and wait for approval. Approval of the
plan is not approval to push, deploy, or delete; those still get asked for
when they arrive.

A good plan says what is being changed, in what order, and how it will be
proven to work. If something goes sideways mid-implementation, stop and
re-plan rather than improvising past it.

## 6. Persist a plan file only if the work outlives the session

Most work does not need one — built-in plan mode is enough, and a plan file
for work that finishes today is just a stale file tomorrow.

Write `<topic>-plan.md` when the work will span sessions. Ask if unsure; it is
a one-line question. The house shape:

```markdown
# Plan — <topic>

Source of truth for the feature: <the handover, if there is one>.
This file is the build plan: phases, deviations, review checkpoints.

Status: **<what is done, what is next, what is blocked>**

## Verified before planning (<date>)

Numbered. Each item: the claim, how it was checked, what it means for the plan.

## Phases

Numbered, each with what "done" looks like.

## Deviations from the original sketch

A table: what was planned | what it does instead | why. Cheaper or safer, never
bigger.

## Decision log

Append-only. Never rewrite an entry — supersede it with a dated new one.
```

Then **name the file in `handovers/HANDOVER.md`** under *Key files*. A plan
file the next session cannot find may as well not exist.

## 7. When the repo has none of this

Many repos have no `handovers/`, no `ROADMAP.md`, no `PROJECT_PROGRESS.md`.

Say so in one line, then **do the useful work anyway** — steps 2 through 5
need none of those files. Git state, verification, and a plan are the
substance; the documents are just where it gets written down.

Offer to scaffold the trio **once**, and only if the session is producing work
worth carrying:

- `handovers/HANDOVER.md` — present tense, where the work stands, rewritten
  each session
- `PROJECT_PROGRESS.md` — past tense, what shipped, appended, dated, newest
  first
- `ROADMAP.md` — future tense, not yet started

Never create them unasked. A repo that does not want them is not broken.

---

## Rules

- **Verify, don't trust.** The handover, the docs, and the previous session's
  summary are all claims. Git and source are facts.
- **Report the real state before planning.** The user needs a chance to
  redirect before effort is spent.
- **One track at a time.** A plan covering three tracks gets none of them done.
- **Never claim something is verified that you did not verify.** If a check was
  skipped, the plan says it was skipped.
- **State what you could not find out.** Silent gaps are the failure mode at
  both ends of the session.
