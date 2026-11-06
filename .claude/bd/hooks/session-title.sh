#!/usr/bin/env bash
# SessionStart (startup) — ask the session to name itself `<repo> · <task>`.
# Silent unless the session's folder, or a folder directly inside it, is a git repo with a remote. Never exits non-zero.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0
name_of() { local u; u=$(git -C "$1" remote get-url origin 2>/dev/null) || return 1; basename "${u%.git}" | tr '[:upper:]' '[:lower:]'; }
repo=$(name_of .)
if [ -z "$repo" ]; then
  # Cloud sessions with several repos start in the folder above them: use the first.
  for d in */; do r=$(name_of "$d") && { repo=$r; break; }; done
fi
[ -n "$repo" ] || exit 0

cat <<JSON
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"Session names follow By Default's convention: \`<repo> · <task>\`, for example \`$repo · push hook\`. The repo is the GitHub name in lower case (here \`$repo\`; in a session spanning several repos, the one the work mostly changes). The task is 2 to 4 words in sentence case, naming the thing being worked on rather than the action. In agency, client work starts the task with the client: \`agency · BlackDoctor Wellbot ads\`. Manny's daily Stand-up is the one exception (\`Stand-up, Monday 26 October\`), and the session-name hook sets that one itself. Do this in your first reply, as soon as the first message makes the task clear: set the title with the set_session_title tool (claude-code-remote) if you have it, leaving any title that already follows this convention alone. If you don't have the tool, suggest the title in one line so the user can rename the session."}}
JSON
exit 0
