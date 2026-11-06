#!/usr/bin/env bash
# SessionStart (startup|resume) — point a fresh session at the baton.
# Silent in any directory this does not apply to. Never exits non-zero.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0

if ls handovers/HANDOVER*.md >/dev/null 2>&1; then
  cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"This project keeps session handovers in handovers/. Read handovers/HANDOVER.md (and any HANDOVER-<topic>.md) BEFORE starting work — it records where the last session left off, what is half-finished, and known traps. Then check PROJECT_PROGRESS.md for history and ROADMAP.md for direction. Run /bd:kickoff to do this properly: it also verifies the handover against git, because the handover is a claim and git is the fact. Close the session with /bd:handover."}}
JSON
  exit 0
fi

if git rev-parse --git-dir >/dev/null 2>&1; then
  cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"No handovers/ in this repo. /bd:kickoff still applies — it verifies git state and plans before acting — and /bd:handover will write a handover at the end if this session produces work worth carrying. Neither creates tracking files without asking."}}
JSON
fi

exit 0
