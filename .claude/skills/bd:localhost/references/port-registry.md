# Studio-wide local port registry

The single master. Every By Default project has one fixed local address,
`http://localhost:<port>/`, taken from here and written into that project's
`CLAUDE.md` as one sentence: **This project runs on `http://localhost:<port>/`**.
Projects do not carry a copy of this table — copies freeze on the day they are
made, and a stale copy is how narrator came to share Glossary's port.

The thousands digit is the category. Projects are allocated in hundreds.

## Allocations

| Port | Project | Launcher |
| --- | --- | --- |
| 2000 | Design System | `npm run dev` (build, then `wrangler dev`) · Live Server |
| 2100 | Studio | `npm run serve` · `netlify dev` · Live Server |
| 2200 | erlenmasson | `npm run serve` · Live Server |
| 2300 | template | `npm run serve` · Live Server |
| 2400 | erlen-writing | `python3 serve.py` · Live Server |
| 2500 | Assets | Live Server, root `/public` |
| 2600 | design-system-cms | `npm run dev` (Next; `/admin`) |
| 3100 | Folder Structure | Live Server, or `python3 -m http.server 3100 --bind 127.0.0.1` |
| 3200 | Quiz | Live Server, or `python3 -m http.server 3200 --bind 127.0.0.1` |
| 3300 | Glossary | Live Server |
| 3400 | Glossary CMS (`glossary-cms`) | `pnpm dev` (Next; `/admin`) |
| 3500 | Glossary MCP (`glossary-mcp`) | `npm run dev` (`wrangler dev --port 3500`) |
| 3600 | BlackDoctor | `npm run preview` (build, then `wrangler dev`) · Live Server |
| 4000 | svg-cleaner | Live Server |
| 4100 | CPM Calculator | — |

**Next free:** 2xxx → **2700** · 3xxx → **3700** · 4xxx → **4200**

Bands: **2xxx** foundation and owned sites · **3xxx** products (every project
created from `template` is a product unless the owner says otherwise) ·
**4xxx** tools and utilities.

## Not yet allocated

Known projects with no row. Each one is a collision waiting to happen;
allocate with `/bd:localhost allocate` when next in the repo.

- **narrator** — its `CLAUDE.md` claims 3300 (copied from a stale template table); collides with Glossary
- **whatuwatchin** — `next dev -p 3300` for the web app, API on wrangler's default 8787; collides with Glossary
- **bd-media-kit** — Live Server pinned to 3300; collides with Glossary
- **vimeo-migration** — Live Server still on the old shared 5501; `demo:serve` takes 2100, which is Studio's
- **Celtra API**, **Dianomi Dashboard** — still on 5501; Dianomi is Next.js, so `next dev` takes 3000 until pinned

Not projects: `social media 2` is a stale local clone of erlen-writing (same
remote) and gets no number; `~/Developer/design-system-search` is a working
copy of Design System on 2000. Allocate against the *remote*, never the folder
name, or one repo gets two numbers.

## Rules

1. **Never assign 3000** — Next.js claims it by default, so products start at 3100.
2. **Bands 5, 7, 8 and 9 are off-limits** — Vite (5173), Live Server (5500/5501), macOS AirPlay Receiver (5000, 7000), `wrangler dev` (8787), `netlify dev` (8888), Python (8000), generic (8080).
3. **Pin the port at every server the project runs**, or the number is decorative: `.vscode/settings.json` → `liveServer.settings.port`, `npx serve . -l <port>`, `netlify.toml` `[dev] port`, `wrangler dev --port <port>`, `next dev -p <port>`, any project-local `serve.py` default.
4. **Write the URL as `http://localhost:<port>/`** — localhost over 127.0.0.1, with the trailing slash. (`--bind 127.0.0.1` on a python server is an address flag, not the URL.)
5. **Record every allocation here** — the row, and the band's next free — and release the plugin. A project's `CLAUDE.md` carries only its own sentence.

**Why this exists:** seven repos once shared 5501, so opening two at once
silently bumped the second to 5502, which then collided with the Design
System. Note the failure mode — nothing errors. The server reports success on
a port you did not choose, and you only find out when the wrong project loads.
