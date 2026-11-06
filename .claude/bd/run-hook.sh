#!/usr/bin/env bash
# Runs one of the copied bd plugin hooks, unless the real plugin is loaded (then it already runs its own).
p="$HOME/.claude/plugins"
ls -d "$p"/synced/*/bd >/dev/null 2>&1 && exit 0
jq -e '(.plugins["bd@bydefault"] // []) | length > 0' "$p/installed_plugins.json" >/dev/null 2>&1 && exit 0
exec bash "$(dirname "$0")/hooks/$1"
