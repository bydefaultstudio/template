#!/usr/bin/env bash
# PostToolUse (Bash) — after a git commit that touched real work, bring the
# tracking documents up to date while the reasoning is still in context.
# Exits silently unless every condition applies.
set -uo pipefail

command -v jq >/dev/null 2>&1 || exit 0

cmd=$(cat | jq -r '.tool_input.command // empty' 2>/dev/null) || exit 0
[ -n "$cmd" ] || exit 0
printf '%s' "$cmd" | grep -qE '(^|[;&|(])[[:space:]]*git[[:space:]]+commit([[:space:]]|$)' || exit 0

cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# Only in repos that actually keep the tracking documents.
[ -f PROJECT_PROGRESS.md ] || [ -f ROADMAP.md ] || [ -d handovers ] || exit 0

# Only if the commit touched something other than the tracking documents
# themselves — otherwise this hook would re-trigger on its own output.
changed=$(git diff-tree --no-commit-id --name-only -r --root HEAD 2>/dev/null) || exit 0
[ -n "$(printf '%s\n' "$changed" | grep -vE '^(PROJECT_PROGRESS\.md|ROADMAP\.md|handovers/)')" ] || exit 0

cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"A git commit just landed real work. Bring the tracking documents up to date now, while the reasoning is still in context — steps 2 and 3 of /bd:handover: (1) PROJECT_PROGRESS.md — record what shipped under a YYYY-MM-DD heading, newest first; create today's section if absent, extend it if present. Write what changed and why, not the commit subject verbatim. (2) ROADMAP.md — delete anything this commit completed or made obsolete, add any debt or idea it surfaced. (3) handovers/HANDOVER.md — refresh Status and In flight if this commit moved them; a full rewrite is only needed at session end. Then commit those files. A commit touching only these files does not re-trigger this hook, so there is no loop to avoid. Skip entirely for commits a future session would not care about, such as typo or formatting fixes."}}
JSON
exit 0
