---
name: localhost
description: >
  Launch the current project's local dev server on its pinned port and hand
  back the URL — find the project's fixed local address, check nothing else is
  listening there, start the documented server in the background, prove it
  answers on that port, open it. Also allocates a port for a new project from
  the studio-wide registry. Use when the user says "launch localhost", "start
  the local server", "run it locally", "open localhost", "spin it up", "is the
  server running", "what port is this on", "stop localhost", "allocate a
  port", or "what port should this project use".
user_invocable: true
---

# /bd:localhost — launch the project's local server

Every By Default project has **one fixed local address**, written
`http://localhost:<port>/`, allocated from the studio-wide registry in
`references/port-registry.md` beside this file — 2xxx foundation and owned
sites, 3xxx products, 4xxx tools. Each project's own `CLAUDE.md` names its
number in one line. This skill finds that line, starts the server that serves
it, and proves the URL answers. **It never picks a port on its own**; a
missing allocation goes through `allocate` below, with the owner.

Arguments: none, a path (`/bd:localhost /docs/site/` opens that route),
`stop`, or `allocate`.

## 1. Find the address

The address is the one sentence a project's `CLAUDE.md` writes about itself.
Match the **sentence**, never a bare URL — template-derived files carry an
example URL (`written as: http://localhost:3100/`) two lines above the real
one, and a URL grep returns the example first.

```bash
grep -n -E "This project runs on|local address for this project is" CLAUDE.md
grep -o '"liveServer.settings.port": *[0-9]*' .vscode/settings.json 2>/dev/null
grep -n -E '"(dev|serve|preview|demo:serve)":' package.json 2>/dev/null
```

Take the port from the first grep. Then **cross-check it against the Live
Server pin** — that pin is the only number that binds anything, so when the
two disagree the pin is what the user's editor actually serves. Report the
mismatch in one line and use the pin. Fix the docs only if asked.

If `CLAUDE.md` has no such sentence, fall back in order: a *Local
development* / *Local preview* section in `CLAUDE.md`; the Live Server pin;
a pinning flag (`-l`, `--port`, `-p`) in a `package.json` script;
`netlify.toml` `[dev] port`; a root `serve.py` default. Say which one it came
from.

If **no source names a port, stop.** Do not choose one — a port picked here
is exactly the silent collision the registry exists to prevent. Say the
project is unallocated and offer `/bd:localhost allocate`.

## 2. Pick the command

In order. The project's own documented command beats every generic fallback:

1. The command written beside the address in `CLAUDE.md` or `README.md` —
   `npm run dev`, `npm run serve`, `npm run preview`, `pnpm dev`,
   `python3 serve.py`
2. `package.json`: `dev`, then `serve`, then `preview` — but only a script
   that pins the port (`-l`, `--port`, `-p`). A script that does not pin it is
   not this project's launcher: `wrangler dev`, `next dev` and `netlify dev`
   default to 8787, 3000 and 8888
3. `serve.py` at the repo root
4. `python3 -m http.server <port> --bind 127.0.0.1`, run from the documented
   root — the repo root unless `CLAUDE.md` says otherwise (Assets serves
   `/public`)

Never launch VS Code Live Server. That is the editor's server and the user
starts it. If the only pinned server is Live Server, use fallback 4 on the
same port and the same root.

Some projects run two servers on the one port that serve different things —
Design System and BlackDoctor: Live Server serves the repo root, `wrangler dev`
serves the built `_site/`. Run one. When the docs give both, take `npm run
dev` / `npm run preview`: it is the one that exercises the Worker, and it
rebuilds first.

## 3. Check the port before starting anything

```bash
lsof -nP -iTCP:<port> -sTCP:LISTEN 2>/dev/null
```

- **Nothing listening** → step 4.
- **Something listening** → whose is it? `lsof -p <pid> 2>/dev/null | grep cwd`
  - This project's own directory: do not start a second server. Report it
    already running and go to step 5.
  - Another directory: **stop.** Report the collision — command, pid, cwd —
    and ask whether to stop it. The other project may be mid-use.
- **`stop` argument** → this is the whole job. Kill the pid whose cwd is this
  project, confirm the port is free, report. Never kill a server owned by
  another directory without asking.

## 4. Launch in the background, then prove it

Run the command with `run_in_background`, from the project root, logging to a
file in the scratchpad. Then poll the address:

```bash
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 2 http://localhost:<port>/)
  [ "$code" != "000" ] && break
  sleep 1
done; echo "http $code after ${i}s"
```

Any response — `200`, `301`, `404` — means the server is up. Wrangler and
Next take longer than a static server; give them the full thirty seconds.

Then **check it bound the port you asked for**:

```bash
lsof -nP -iTCP:<port> -sTCP:LISTEN 2>/dev/null
```

`serve`, `next dev` and Live Server all move to a neighbouring port when
theirs is taken, and the log still says success. If the port is empty after
the server reported starting, read the log for the port it actually took, kill
it, and report the collision as in step 3. Never hand back the wrong URL.

If it never answers, tail the log and report the real error. The usual causes:
`.dev.vars` or `.env` missing (wrangler, Next), `node_modules` absent — ask
before running `npm install` — or a build step that failed before the server
started.

## 5. Report and open

Report, and nothing more:

- the URL as `http://localhost:<port>/` — localhost, not 127.0.0.1, with the
  trailing slash — plus the path argument if one was given
- the command and the pid, and that `/bd:localhost stop` ends it
- any route the docs single out: `/admin` for a Payload CMS, `/docs/site/`
  for a docs-kit site

Then open it: `open http://localhost:<port>/<path>`. Skip the `open` when the
user only asked whether it is running.

## `allocate` — give a new project its port

For a project with no address yet, usually at onboarding from `template`.
The registry is `references/port-registry.md`, beside this file; read it
first, and read its rules.

1. **Decide the band** from what the project is: 2xxx foundation and owned
   sites, 3xxx products (anything from `template`), 4xxx tools. Propose the
   band's *next free* number from the registry and **ask the owner to
   confirm it** with `AskUserQuestion` — one question, the number and the
   band, with the alternative of naming another. The owner decides; the
   registry only proposes.
2. **Check the machine** — `lsof -nP -iTCP:<port> -sTCP:LISTEN 2>/dev/null`
   — and check the number is not already claimed by a repo the registry has
   not caught up with: `grep -rl "localhost:<port>" --include=CLAUDE.md
   --include=settings.json` across the sibling project folders. A hit means
   the registry is stale; report it and pick the next number.
3. **Write it into the project, everywhere it binds or is read:**
   - `CLAUDE.md` — the one sentence, exactly:
     **This project runs on `http://localhost:<port>/`**
   - `.vscode/settings.json` → `"liveServer.settings.port": <port>`
   - every server script the project runs, pinned (`npx serve . -l <port>`,
     `wrangler dev --port <port>`, `next dev -p <port>`, `serve.py` default)
   - `README.md` and any `docs/` page that states the address — `grep -rn`
     the template's placeholder number and fix every hit
4. **Record the allocation** — append the row to
   `skills/localhost/references/port-registry.md` in the `bd-plugin` repo
   checkout if it is on this machine (the plugin's source,
   `bydefaultstudio/bd-plugin`, which older checkouts may still call `agents`), and bump its *next free*. If the checkout is
   not here, hand the owner the row to add. Either way say that the change
   reaches other machines with the next plugin release; until then the
   installed copy is behind by one row.
5. Report the address and that `/bd:localhost` now launches it.

## Rules

- **Never choose a port alone.** The address belongs to the project and is
  written in its `CLAUDE.md`; a new one comes from the registry, confirmed
  by the owner, and goes back into the registry.
- **Match the sentence, not the URL.** The example line in template-derived
  files is the trap; the Live Server pin is the tie-breaker.
- **One server per port, and prove the port is yours** before reporting the
  URL. The failure this exists to prevent makes no noise: the server reports
  success on a port you did not choose.
- **Documented command over generic fallback.** `npm run dev` may build first,
  load secrets, and run a Worker; `http.server` does none of that.
- **Do not fix the project from here.** Drifted docs, a missing pin, a stale
  registry row: report in one line, offer, stop — unless `allocate` is the
  job, where writing the pins *is* the job.
