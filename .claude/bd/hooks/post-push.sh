#!/usr/bin/env bash
# PostToolUse (Bash) — after a git push, open the pull request, hand the user
# its link, and ask before merging. Exits silently unless it was a push.
set -uo pipefail

command -v jq >/dev/null 2>&1 || exit 0

cmd=$(cat | jq -r '.tool_input.command // empty' 2>/dev/null) || exit 0
[ -n "$cmd" ] || exit 0
printf '%s' "$cmd" | grep -qE '(^|[;&|(])[[:space:]]*git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+push([[:space:]]|$)' || exit 0

cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"A branch was just pushed. Unless it went to the default branch, open a pull request for it if none exists yet, and give the user its link (https://github.com/<owner>/<repo>/pull/<number>): pull request links open in the GitHub app on a phone, whereas compare links show a 404 for private repos. If you cannot open one, give the compare link (https://github.com/<owner>/<repo>/compare/<default-branch>...<branch>?expand=1) and say it needs a signed-in browser. Merging is the user's call: ask first and wait for a yes. Never merge without it."}}
JSON
exit 0
