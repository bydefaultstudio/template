#!/usr/bin/env bash
# UserPromptSubmit — name sessions whose title can be worked out from the
# prompt alone, without relying on Claude. Today that is Manny's daily
# Stand-up: `Stand-up, <weekday> <day> <month>` in UK time.
# Leaves any session that already has a custom title alone. Never exits non-zero.
set -uo pipefail

input=$(cat)

# Already named (by --name, /rename, set_session_title or this hook): do nothing.
printf '%s' "$input" | grep -q '"session_title"' && exit 0

# Manny's Stand-up prompt (agency docs/scheduled-tasks.md, task 1).
if printf '%s' "$input" | grep -q 'This is the 08:30 Stand-up'; then
  weekday=$(TZ=Europe/London date '+%A')
  day=$(TZ=Europe/London date '+%d' | sed 's/^0//')
  month=$(TZ=Europe/London date '+%B')
  printf '{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","sessionTitle":"Stand-up, %s %s %s"}}\n' "$weekday" "$day" "$month"
fi
exit 0
