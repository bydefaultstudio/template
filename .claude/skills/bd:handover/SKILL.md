---
name: handover
description: >
  Close a session: move shipped work into PROJECT_PROGRESS.md, prune ROADMAP.md,
  then rewrite handovers/HANDOVER.md so a fresh session can resume cold —
  ending with a paste-ready prompt for the next session. Use whenever work
  pauses, at the end of a session, and immediately after context compaction.
  Trigger phrases: "handover", "write the handover", "wrap up", "end of
  session", "I'm stopping here", "save state", "pausing here".
user_invocable: true
---

# /bd:handover — close the session

The closing half of the session pair. `/bd:kickoff` opens it.

Works in any repo. Where the tracking documents do not exist, see *When the
repo has none of this*.

Three documents carry state between sessions, and they differ by **tense**.
Keeping that boundary is what stops any one of them becoming a dumping ground.

| File | Tense | Answers | Lifecycle |
| --- | --- | --- | --- |
| `ROADMAP.md` | Future | What we might do | Edited freely; items leave when started |
| `handovers/HANDOVER.md` | Present | Where the work stands right now | **Rewritten** each session |
| `PROJECT_PROGRESS.md` | Past | What actually shipped | **Appended**, dated, newest first |

---

## 1. Gather the real state first

Do not write any of this from memory of the conversation. Memory of a long
session is exactly what is about to be lost, and it is already the least
reliable source in the room. Check:

```bash
git status
git log --oneline -20
git branch --show-current
git log --oneline @{u}.. 2>/dev/null   # committed but unpushed
```

Plus: any failing build, any unfinished edit, any file left open mid-change,
and what `PROJECT_PROGRESS.md` and `ROADMAP.md` already record.

## 2. Move completed work into `PROJECT_PROGRESS.md`

Done every time, so it happens before anything else is written.

Add or extend a `## YYYY-MM-DD` heading, newest first. Append; never rewrite
history.

Write **what changed and why** — the reasoning, the reversal, the thing that
turned out not to be true. The commit subject is already in the git log and
repeating it here wastes the entry. Only record what actually landed;
in-progress work belongs in the handover.

## 3. Prune `ROADMAP.md`

- **Delete** anything this session completed or made obsolete. A roadmap that
  only grows is a list nobody reads.
- **Add** any debt or idea the session surfaced. Record the *cost* of the debt,
  not just the wish — "every correction to a live entry is an ad-hoc script
  written against production" beats "improve the script".
- Move anything now actively in progress out of the roadmap and into the
  handover.

## 4. Rewrite the handover

**Which file.** Default to `handovers/HANDOVER.md` — one per project is the
standard.

Use `handovers/HANDOVER-<topic>.md` only when genuinely separate tracks are in
flight at once and merging them would confuse rather than help. `<topic>` is
kebab-case and describes the work, never the date: `HANDOVER-nav-rebuild.md`,
not `HANDOVER-july.md`. When you create one, note it in
`handovers/HANDOVER.md` so the default file stays the index. If `$ARGUMENTS`
names a topic, write `handovers/HANDOVER-<topic>.md`.

**Rewrite, don't append.** The handover is a baton, not a log. It describes
where the work stands *right now* — replace stale content outright. Anything
worth keeping permanently went into `PROJECT_PROGRESS.md` in step 2.

**The format:**

````markdown
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
looks like. Include anything half-finished, with the exact file and line if an
edit was left open.

## Key files

The handful of paths the next session needs, one line each on why. Include any
`<topic>-plan.md` — a plan file the next session cannot find may as well not
exist.

## Gotchas

Traps discovered this session — things that would cost the next session an
hour if rediscovered. Failure modes, host quirks, non-obvious coupling,
verified dead ends. Omit the heading if there genuinely are none.

## Next session — paste this

```text
<the paste-ready prompt — see below>
```
````

## 5. Write the paste-ready prompt

The last section is a **fenced `text` code block**, not a blockquote — the
fence is what gives the terminal a copy button, which is the whole point.

It is not a summary of the handover. It is the message that starts the next
session cold, written in the second person, and it contains:

1. **Which file to read first** — the handover, and any plan file or warning
   inside it that must be read before acting
2. **The single most important fact** — usually what is *not* done, or what
   looks done but is not
3. **The named next task**, concretely enough to start on without asking
4. **The traps** that would otherwise cost an hour — including anything that
   looks wrong but is right
5. **The working rules in force** for this repo — the commit style, whether to
   ask before pushing, anything destructive to avoid

Keep it to a screenful. If it needs more, the handover body is doing its job
badly.

## 6. When the repo has none of this

No `handovers/`, no `PROJECT_PROGRESS.md`, no `ROADMAP.md` is a normal state
for most repos.

Write the handover anyway — create `handovers/HANDOVER.md`, since that is what
was asked for and it is the one file that carries the session. For the other
two, say in one line that they are absent and offer once to create them.
Never create them unasked; a repo that does not want them is not broken.

---

## Rules

- Write for a session with **no memory of this conversation**. Assume nothing,
  and never write "as discussed above".
- Prefer concrete detail over summary. A SHA, a path, a version, an exact
  error message.
- **Say what is not done as clearly as what is.** Silent gaps are the failure
  mode.
- If work is blocked on the owner — a review, a decision, an asset — say so
  and name the decision.
- **Never claim something is verified that you did not verify.** If a change is
  untested, write that it is untested.
- When the work a topic handover describes ships completely, delete the file
  and say so. A stale handover is worse than none.
- Keep it scannable. The point is to rebuild context fast.
- Report the file path you wrote and give a two-line summary. Don't commit
  unless asked.
