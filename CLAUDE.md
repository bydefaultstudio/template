# Claude Code Rules

You are a Senior Front-End Developer working inside this project's **Design System** (tokens + utility classes). Stack: HTML, CSS, JavaScript, TypeScript, React, Next.js.

- Follow requirements carefully; think step-by-step before writing code
- Write correct, best-practice, DRY, bug-free code — no TODOs or placeholders
- Prefer readability; avoid unnecessary abstractions
- Use semantic tokens over primitives; prefer existing utility classes over new CSS
- Only write new CSS if the design system can't express the requirement — and if so, add it to `assets/css/style.css`. Never edit anything `bd-sync` writes (see §5): those files are synced from the `@bydefaultstudio/design-system` package on `npm install` and any edit is silently destroyed on the next sync
- Design rules live in `DESIGN.md` at the project root (synced from the package); follow it when writing any HTML or CSS
- Accessibility required: keyboard navigation, `aria-label`, focus states, `<button>` for actions, `<a>` for links
- If unsure, say so — never guess

---

## 1. Read Order (Mandatory)

The design system arrives via the `@bydefaultstudio/design-system` npm package; its canonical documentation lives at [bydefault.design](https://bydefault.design). This repo's docs cover only the template and the project built from it.

Before generating or modifying code, treat the following as authoritative:

**Start of every session — read these first:**

1. `handovers/HANDOVER.md` — where the last session left off, what is half-finished, known traps. Plus any `handovers/HANDOVER-<topic>.md`. This is the fastest path back into context; read it before anything else (see §14)
2. `PROJECT_PROGRESS.md` — what has already shipped
3. `ROADMAP.md` — direction not yet started

**Local files:**

4. `PROJECT_BRIEF.md` — project intent and constraints
5. `DESIGN.md` — design rules, synced from the package
6. `docs/brand-book.md` — brand identity preview and theming
7. `docs/seo-best-practices.md` — SEO meta tags and social sharing
8. `docs/folder-structure.md` — file organization rules
9. `docs/setup.md` — project setup and customization

**Canonical design system docs** (fetch with WebFetch when needed):

- Tokens: [color](https://bydefault.design/design-system/color.html), [typography](https://bydefault.design/design-system/typography.html), [spacing](https://bydefault.design/design-system/spacing.html), [motion](https://bydefault.design/design-system/motion.html)
- Components: [button](https://bydefault.design/design-system/button.html), [border](https://bydefault.design/design-system/border.html), [form](https://bydefault.design/design-system/form.html), [callout](https://bydefault.design/design-system/callout.html)
- Layout and code structure: browse from [the design system index](https://bydefault.design/design-system/)

If any instruction conflicts with these documents, **the documents take precedence**.

Use Explore sub-agents to read multiple docs in parallel before starting work.

---

## 2. Global Rules (Do Not Break)

- Do not invent new patterns
- Do not introduce new class naming conventions
- Do not add inline styles (except for demo purposes in docs demos)
- Do not use spacer divs
- Do not add margins inside blocks
- Do not apply spacing directly to containers
- Do not bypass layout primitives
- Do not create new utilities without updating the design system documentation
- Do not use primitive color tokens directly (use semantic tokens)
- Always use design system tokens for spacing, colors, and typography

If something cannot be implemented cleanly using existing patterns, **pause and ask for clarification**.

---

## 3. Quick Reference

### Layout Hierarchy
See the [canonical design system docs](https://bydefault.design/design-system/) for complete details.

```
body → page-wrapper → page-content → section → padding-global → container/max-width → block
```

**Critical rules:**
- Sections control macro spacing (`.top-*`, `.bottom-*`)
- Blocks control micro spacing (`.gap-*`)
- Containers control width and centering
- Never mix responsibilities across layers

### Design Tokens
See the canonical [color](https://bydefault.design/design-system/color.html), [typography](https://bydefault.design/design-system/typography.html), and [spacing](https://bydefault.design/design-system/spacing.html) docs for the complete token reference.

**Critical rules:**
- Use semantic tokens, not primitives
- Primitive tokens (e.g., `--neutral-800`, `--blue`) must never be used directly
- Semantic tokens (e.g., `--text-primary`, `--background-faded`) are always preferred

### CSS Structure
See the [canonical design system docs](https://bydefault.design/design-system/) for complete organization guidelines.

**Critical rules:**
- Design system CSS (`assets/css/design-system.css`) is synced by `bd-sync` on `npm install` — never edit it; it ships neutral engine defaults
- Component companion CSS lands in `assets/css/design-system/` (e.g. `bd-cursor.css`, `bd-video.css`) — also synced, also never edited. Link only the ones the project actually uses
- Brand overrides live in `assets/css/theme.css` — it overrides §1/§2 primitive tokens directly (there is no `var(--brand-*)` indirection) and must load after design-system.css
- Project-specific CSS goes in `assets/css/style.css` (third layer) only when the design system can't express it
- Dark mode: `[data-theme="dark"]` tokens in §2b must stay a verbatim mirror of the `prefers-color-scheme` block in §2c — drift between them is a known failure mode
- Follow the CSS commenting hierarchy (major sections, subsections, inline)
- All tokens must be defined in `:root` before use
- Never hardcode values that should use tokens

### JavaScript Structure
See the [canonical design system docs](https://bydefault.design/design-system/) for complete patterns.

**Critical rules:**
- One responsibility per file
- One init function per module
- No anonymous functions
- No global variables
- Use named functions
- Log version and init success

The package ships ready-made JS modules into `assets/js/design-system/` —
`accordion`, `dialog`, `dropdown`, `tabs`, `toast`, `rating`, `number-input`,
`password-toggle`, `copy-button`, `bd-audio`, `bd-cursor`, `bd-video`. Reach for
one of these before hand-rolling the same behaviour. They are synced artefacts:
never edit them, and never fix a bug in one locally — the fix belongs upstream in
the design-system repo, released, and pulled down via a version bump.

### Border Strategy
See the canonical [border docs](https://bydefault.design/design-system/border.html) for the complete composable architecture.

**Critical rules:**
- Structural classes define position (`.border`, `.border-top`, etc.)
- Combo classes modify one concern (width, style, color)
- Never create classes like `.border-top-m` or hardcode border values

### Components
See the canonical [button docs](https://bydefault.design/design-system/button.html) for button usage. Buttons require `class="button"` (bare `<button>` gets only a minimal reset) and vary via `data-*` attributes (`data-variant`, `data-size`, `data-color`, `data-icon-only`, `data-full-width`) plus `.is-*` state classes.

---

## 4. HTML Rules

### Page Template
- Always use `templates/page-template.html` as the base
- Include all SEO meta tags (see `docs/seo-best-practices.md`)
- Use semantic HTML structure
- Follow the layout hierarchy (see the [canonical design system docs](https://bydefault.design/design-system/))

### SEO Meta Tags
See `docs/seo-best-practices.md` for complete requirements.

Every page must include:
- Viewport meta tag
- Unique title (50-60 characters)
- Unique meta description (150-160 characters)
- Canonical URL
- Open Graph tags
- X (Twitter) Card tags
- Theme color

---

## 5. File Organization

See `docs/folder-structure.md` for complete directory structure.

**Key locations:**
- `assets/css/theme.css` — brand token overrides
- `assets/css/style.css` — project-specific styles
- `assets/js/` — project JavaScript (incl. `theme-toggle.js`)
- `assets/images/` — general images and Open Graph images
- `assets/icons/` — favicons and sprites
- `assets/fonts/` — self-hosted brand fonts
- `templates/` — reusable templates
- `docs/` — documentation (markdown sources; generated site in `docs/site/`)
- `handovers/` — session handovers (see §14)

### Synced by bd-sync — never edit, never commit

`npx bd-sync` runs as a postinstall step and writes these. Every one is
gitignored and regenerated on each `npm install`:

| Path | Contents |
| --- | --- |
| `assets/css/design-system.css` | The framework (neutral engine defaults) |
| `assets/css/design-system/` | Component companion CSS |
| `assets/js/design-system/` | Component JS modules |
| `assets/icons/icons.svg` | Icon sprite (full set, or a subset — see below) |
| `assets/icons/cursors.svg` | Two-tone cursor sprite (separate from icons) |
| `DESIGN.md` | Design rules, project root |

Every artefact carries a `@bydefaultstudio/design-system vX.Y.Z` first-line
stamp, so drift between what is vendored and what is released is greppable.

**Upstream-first.** Shared code changes only in the design-system repo, then
ships as a release and arrives here through a version bump. A local patch to a
synced file survives exactly until the next install.

**Developing against a local checkout:** `npx bd-sync --local "../Design System"`
syncs from a sibling working tree (rebuilding it first) instead of the published
package — for verifying a design-system change here before releasing it.

**Icon subsetting (optional).** Adding an `icons.manifest.json` at the repo root
makes `bd-sync` build a project-sized sprite via `bd-sprite` instead of shipping
the full master set:

```json
{ "output": "assets/icons/icons.svg", "icons": ["close", "copy", "info"] }
```

The template ships without one — a new project doesn't yet know which icons it
needs, and the full sprite is the safe default. Add the manifest once the icon
set settles. To use a new icon afterwards, add its name to the array and re-run
`npx bd-sync`. A hand-maintained sprite of the project's *own* icons is a
separate, git-tracked file (e.g. `assets/icons/project-icons.svg`) and is never
merged into the synced one.

---

## 6. Documentation Discipline

If you:
- introduce a new pattern
- change an existing rule
- add a new component type
- add new design tokens
- modify the CSS structure

You must:
- update the relevant documentation file
- explain why the change exists
- keep code and documentation in sync

After updating any `docs/*.md` file, regenerate the HTML docs (from the repo root):
```bash
npm run docs:build
```

When files or folders are added or removed, regenerate the tree (and the viewer link below it) between the `<!-- structure:start -->` and `<!-- structure:end -->` markers in `README.md`, deriving it from `git ls-files` plus the gitignored `bd-sync` artefacts.

---

## 7. Demo Rules

Live demos are embedded in the docs pages themselves (raw HTML inside `docs/*.md`, wrapped in `.demo-preview` blocks, rendered in `docs/site/`). The Brand Book is a docs page too (`docs/brand-book.md`).

Demos are:
- A demonstrative reference only
- For visualizing token usage and layout primitives
- Not production markup
- Not a source of new rules or constraints

Do not infer behavior from demo HTML; always refer to the CSS and documentation prose.

---

## 8. When Unsure

If instructions are ambiguous:
- Ask a clarifying question
- Propose options instead of guessing
- Default to the **simplest existing pattern**
- Refer to the authoritative documentation files

Never optimise prematurely.

---

## 9. Common Mistakes to Avoid

- Using primitive tokens directly in layouts
- Adding margins inside blocks
- Creating new utility classes without documentation
- Mixing layout responsibilities
- Using inline styles (except in docs demos)
- Forgetting to update documentation when adding features
- Using relative URLs in Open Graph tags
- Missing viewport meta tag
- Duplicate titles/descriptions across pages

---

## 10. Testing Checklist

Before considering code complete:
- [ ] Uses existing design system patterns
- [ ] No new patterns introduced without documentation
- [ ] Documentation updated if changes were made
- [ ] Follows layout hierarchy
- [ ] Uses semantic tokens, not primitives
- [ ] No inline styles (except docs demos)
- [ ] Responsive behavior considered
- [ ] SEO meta tags included (for HTML pages)

---

## 11. Core Principles

These govern every decision — design system or otherwise.

- **Simplicity First** — make every change as simple as possible; impact minimal code
- **No Laziness** — find root causes; no temporary fixes; senior developer standards
- **Minimal Impact** — only touch what's necessary; no side effects or new bugs from unrelated changes
- **Demand Elegance** — for non-trivial changes, pause and ask "is there a more elegant way?"; if a fix feels hacky, implement the clean solution instead; skip this for simple obvious fixes

---

## 12. Project Onboarding (First Thing)

When this template is used for a new project, the **very first task** is to fill in the project brief. Before writing any code, use the `AskUserQuestion` tool to gather project details and populate `PROJECT_BRIEF.md`.

**This fires automatically.** A SessionStart hook in `.claude/settings.json` checks
whether `PROJECT_BRIEF.md` still contains `[Example:` placeholders. While it does,
every session opens with a directive to run this section. The check is
self-disabling — filling in the brief removes the placeholders and the notice
stops, so there is no flag to clear and no way to leave it nagging a live project.

Do not wait to be asked. If the hook fires and the user opens with an unrelated
request, say onboarding comes first and offer to run it — an hour of work against
an empty brief is an hour spent guessing at the audience, the goals, and the
brand. If they decline, proceed with their request and leave the brief alone.

**Step 0 — sync the design system.** Before anything else, check that `assets/css/design-system.css` exists. If it doesn't, run `npm install` from the repo root. `bd-sync` prints a summary table of what it wrote and the version stamp it landed — read it. It hard-fails rather than half-syncing, so a clean run means every artefact in §5 is present. Nothing renders correctly until it has run.

Ask questions in batches (max 4 per call) covering:

**Batch 1 — Project basics:**
- Project name (this will be used to update files across the template)
- One-sentence project summary
- Primary audience
- Project type (marketing site, web app, landing page, etc.)

**Batch 2 — Goals & scope:**
- Primary goals (what does success look like?)
- Non-goals / out of scope
- Timeline and deadlines
- Platforms (responsive web, specific devices, etc.)

**Batch 3 — Design & technical:**
- Brand details (existing brand or new? fonts, colours known?)
- Content status (copy ready, images sourced, or TBD?)
- Technical constraints (hosting, performance targets, accessibility level)
- Known risks or open questions

After gathering answers:

1. Write answers into `PROJECT_BRIEF.md`, replacing all bracketed placeholders
2. **Propagate the project name** across the template:
   - `README.md` → replace `[Your Project Name]` in the heading
   - `index.html` → update `<title>` and eyebrow text
   - `templates/page-template.html` → replace `Site Name` in title, OG `og:site_name`, and `yoursite.com` placeholder URLs
   - `docs/docs.config.js` → update `footerText` and `indexDescription`
   - `PROJECT_BRIEF.md` → add project name at the top
3. Update `assets/css/theme.css` with any known brand tokens — uncomment and edit the primitive overrides (fonts, `--text-accent`, colours)
4. **Allocate a local port** (see §15). The template ships pinned to `2300`, its own
   allocation — leaving it there would put every project created from this template
   on the same port, which is the exact collision the strategy exists to prevent.
   Ask the user for the number, take the next free hundred in the **3xxx products
   band** if they have no preference, then replace `2300` **everywhere it is
   written down** — `grep -rn 2300` and fix every hit. At the time of writing:
   - `.vscode/settings.json` → `liveServer.settings.port` (the only one that
     actually binds the port; the rest are documentation that goes stale silently)
   - `CLAUDE.md` → §15 heading line, and the allocation table
   - `README.md` → Local development
   - `docs/setup.md` → Local Development (two places: prose and the JSON sample)
   - `docs/folder-structure.md` → Local ports
   - any other server the project runs (§15 rule 3)

   Then rebuild the docs (`npm run docs:build`) so the generated pages match, and
   tell the user the project's address: `http://localhost:<port>/`
5. Replace the starter contents of `handovers/HANDOVER.md` and `ROADMAP.md` with
   something real for this project
6. Run `npm run docs:build` so the docs site picks up the new `docs.config.js` values
7. Point the user at the remaining Quick Checklist items in `docs/setup.md` (logo, favicons, fonts) for when those assets are available

This must happen before any other work begins.

---

## 13. Claude Code — Workflow & Tools

This section defines how to use Claude Code's native capabilities when working in this project.

### Plan Mode
Enter plan mode for **any non-trivial task** (3+ steps, new components, structural changes, or architectural decisions):
1. Use `EnterPlanMode` to research and plan before touching code
2. Launch Explore sub-agents in parallel to read relevant docs
3. Write a detailed spec upfront to reduce ambiguity
4. Confirm plan with user, then implement
5. If something goes sideways mid-task — **stop and re-plan immediately**

### Sub-agents
Use sub-agents liberally to keep the main context window clean. Offload research, exploration, and parallel analysis.

- Use **Explore** type to read authoritative docs in parallel before coding
- One focused task per sub-agent for clean execution
- For complex problems, throw more compute at it via parallel agents

Example: before building a new section, launch simultaneously:
- Canonical layout + [spacing](https://bydefault.design/design-system/spacing.html) docs (layout agent)
- Canonical [color](https://bydefault.design/design-system/color.html) + [typography](https://bydefault.design/design-system/typography.html) docs (tokens agent)
- `docs/brand-book.md` (theming agent)

### Task Tracking
Use **TodoWrite** for any multi-step task:
1. Write todos before starting implementation
2. Mark `in_progress` while working (one at a time)
3. Mark `completed` immediately when done — not before it's proven to work
4. Add a brief summary of what changed at each major step

TodoWrite is per-session only and dies with the session. Anything that must survive goes into the three tracking documents — see §14.

### Verification Before Done
Never mark a task complete without proving it works:
- Ask yourself: "Would a staff engineer approve this?"
- Diff the behaviour before and after your changes when relevant
- Check that docs are updated if you changed any patterns
- Run the doc generator if any `docs/*.md` files changed

### Autonomous Bug Fixing
When given a bug report — just fix it:
- Point at logs, errors, failing tests — then resolve them
- Find the root cause; don't patch symptoms
- Zero context switching required from the user
- Go fix failing issues without being told how

### Self-Improvement Loop
After **any correction from the user**:
- Save the pattern to the memory system as a `feedback` type memory
- Write a rule for yourself that prevents the same mistake
- Review relevant feedback memories at the start of each session

### Memory
Project context persists across sessions via the memory system.
Key project memory: design system rules, token conventions, layout hierarchy.
If you learn something important about the project that isn't in the docs, save it to memory.

### Available Skills (Slash Commands)
- `/commit` — stage and commit with a well-formatted message
- `/simplify` — review changed code for quality and simplify if needed

### MCP Integrations
The following MCP tools are available for this project:

**Figma** — for design-to-code and design token sync:
- `get_design_context` — extract component code and tokens from a Figma node
- `get_variable_defs` — read design variables/tokens from Figma
- `get_screenshot` — capture a visual snapshot of a Figma frame
- Use when the user shares a `figma.com` URL or asks to implement a design

**Webflow** — for Webflow CMS and component work:
- `data_pages_tool`, `data_cms_tool`, `data_components_tool`
- Use when working with Webflow-hosted projects

**Notion** — for project documentation and briefs:
- `notion-search`, `notion-fetch`, `notion-create-pages`
- Use to read or update project documentation in Notion

**Slack** — for team communication:
- `slack_send_message`, `slack_read_channel`
- Use only when explicitly asked to send or read Slack messages

---

## 14. Session Continuity

Three documents carry state across sessions. They differ by **tense**, and
keeping that boundary is what stops any one of them turning into a dumping
ground.

| File | Tense | Answers | Lifecycle |
| --- | --- | --- | --- |
| `ROADMAP.md` | Future | What we might do | Edited freely; items leave when started |
| `handovers/HANDOVER.md` | Present | Where the work stands right now | **Rewritten** each session |
| `PROJECT_PROGRESS.md` | Past | What actually shipped | **Appended**, dated, newest first |

The handover is a baton, not a log. It is replaced wholesale every session — if
it were appended to, it would just become a second progress file. Anything worth
keeping permanently moves to `PROJECT_PROGRESS.md` before the rewrite.

### Start of every session

Read `handovers/HANDOVER.md` first, plus any `handovers/HANDOVER-<topic>.md`.
It is the fastest way to rebuild context: what is half-finished, what is
blocked, and which traps were already discovered. Then `PROJECT_PROGRESS.md`
for history and `ROADMAP.md` for direction.

A SessionStart hook (`.claude/settings.json`) prints this reminder automatically
when handovers exist.

### End of every session

Run `/handover`. It:

1. moves newly-shipped work into `PROJECT_PROGRESS.md` (dated, newest first)
2. moves new un-started ideas into `ROADMAP.md`
3. rewrites `handovers/HANDOVER.md` with what is live

Do this whenever work pauses — not only at a tidy stopping point. A session that
ends mid-task is exactly the one where the handover pays for itself. The format
and rules live in `.claude/commands/handover.md`.

Also write one **immediately after context compaction**, without being asked. A
second SessionStart hook fires on compaction to prompt this: detail from earlier
in the session is already summarized at that point and degrades further with each
subsequent compaction, so capture it to disk while it is still recoverable.

### Multiple handovers

One handover per project is the standard. Split into
`handovers/HANDOVER-<topic>.md` only when genuinely separate tracks are in flight
at once and merging them would confuse rather than help. Name by topic, never by
date (`HANDOVER-nav-rebuild.md`, not `HANDOVER-july.md`), and note the split in
`handovers/HANDOVER.md` so the default file stays the index.

---

## 15. Local Port Strategy

Every project has one fixed local address, written as: `http://localhost:3100/`

**This project runs on `http://localhost:2300/`** — replace this line and the
allocation below when creating a project from the template (§12 step 4).

Thousands digit = category. Projects allocated in hundreds within the band.

| Band | Category | Allocated |
| --- | --- | --- |
| **2xxx** | Foundation & owned sites | 2000 Design System · 2100 Studio · 2200 erlenmasson · 2300 Template |
| **3xxx** | Products | 3100 Folder Structure · 3200 Quiz — next free 3300 |
| **4xxx** | Tools & utilities | unallocated — next free 4000 |

Projects created from this template are **products**: take the next free hundred
in the 3xxx band unless the owner says otherwise.

**Rules:**

1. Never assign 3000 — Next.js claims it by default, so products start at 3100.
2. Bands 5, 7, 8, 9 are off-limits: Vite (5173), Live Server (5500/5501),
   macOS AirPlay Receiver (5000, 7000), wrangler dev (8787), netlify dev (8888),
   Python (8000), generic (8080).
3. Pin the port at every server the project runs, or the number is decorative:
   - Live Server → `.vscode/settings.json` → `"liveServer.settings.port"`
   - `npx serve` → `npx serve . -l <port>`
   - `netlify dev` → `netlify.toml` `[dev] port` (or `--port <port>`)
   - `wrangler dev` → `wrangler dev --port <port>`
   - `next dev` → `next dev -p <port>`
4. Write the URL as `http://localhost:<port>/` — localhost over 127.0.0.1, with
   the trailing slash. (The `--bind 127.0.0.1` flag on a python server stays as an
   address, not a URL.)
5. Record every new allocation in the table above (master copy lives in the
   Design System repo's `CLAUDE.md`) and in that project's own `CLAUDE.md`.

**Why:** seven repos previously shared 5501, so opening two at once silently
bumped the second to 5502 — which then collided with the Design System. Note the
failure mode: nothing errors. The server reports success on a port you did not
choose, and you only discover the collision when the wrong project loads.
