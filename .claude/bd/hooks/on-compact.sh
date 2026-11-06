#!/usr/bin/env bash
# SessionStart (compact) — context was just summarized; capture state now.
set -uo pipefail
cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"Context was just compacted — earlier detail from this session is now summarized and will degrade further on the next compaction. If you are mid-task, run /bd:handover NOW: move shipped work into PROJECT_PROGRESS.md, prune ROADMAP.md, and write handovers/HANDOVER.md so this work can resume in a fresh session. Then continue the task."}}
JSON
exit 0
