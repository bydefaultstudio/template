#!/usr/bin/env python3
"""Create a glossary entry in the live CMS from a draft JSON file.

Usage: python3 create-entry.py /path/to/draft.json

Draft shape (slugs, not ids):
  { name, slug, shortDescription, longDescription,
    sourceLink: null|url, status: "reviewed",
    tags: [slug, ...], relatedEntries: [slug, ...] }

Reads the capture password from the macOS Keychain (service glossary-cms,
account dev@bydefault.studio); the password is never printed and never
appears in a command line. Mirrors the guardrails the CMS repo's loader
scripts enforce, because a direct REST write bypasses them.
"""

import json
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

API = "https://glossary-cms.bydefault.workers.dev"
EMAIL = "dev@bydefault.studio"
# Cloudflare 403s Python's default User-Agent on this route; curl's passes.
# Verified 2026-08-07: same URL, curl 200, "Python-urllib/3.9" 403.
USER_AGENT = "glossary-capture/1.0"
KEYCHAIN_SERVICE = "glossary-cms"
REQUIRED_TAG = "erlens-words"
DASHES = re.compile(r"[—–]")  # em dash, en dash
SLUG_SHAPE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")


def fail(message):
    print("REFUSED: " + message)
    sys.exit(1)


def get_json(url, token=None):
    request = urllib.request.Request(
        url, headers={"Accept": "application/json", "User-Agent": USER_AGENT}
    )
    if token:
        request.add_header("Authorization", "JWT " + token)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def post_json(url, payload, token=None):
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url, data=body,
        headers={"Accept": "application/json", "Content-Type": "application/json",
                 "User-Agent": USER_AGENT},
    )
    if token:
        request.add_header("Authorization", "JWT " + token)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def where_slug(collection, slug):
    return (
        API + "/api/" + collection
        + "?limit=1&depth=0&where" + urllib.parse.quote("[slug][equals]")
        + "=" + urllib.parse.quote(slug)
    )


def main():
    if len(sys.argv) != 2:
        fail("expected exactly one argument, the draft JSON path")

    with open(sys.argv[1]) as handle:
        draft = json.load(handle)

    for key in ("name", "slug", "shortDescription", "longDescription", "tags"):
        if key not in draft:
            fail("draft is missing " + key)

    slug = draft["slug"]
    short = draft["shortDescription"].strip()
    long_description = draft["longDescription"]

    if not SLUG_SHAPE.match(slug):
        fail("slug %r is not lowercase-hyphenated" % slug)

    searchable = "\n".join([draft["name"], short, long_description])
    if DASHES.search(searchable):
        fail("an em or en dash is present; rewrite with a comma, full stop or brackets")

    if not short:
        fail("shortDescription is empty")
    if short.endswith("."):
        fail("shortDescription carries a trailing full stop")
    if len(short) > 200:
        fail("shortDescription is over 200 characters, too long for a list card")
    if re.search(r"^#\s", long_description, re.M):
        fail("longDescription uses an h1; ## is the top level (the page renders the name as h1)")

    words = len(short.split())
    if words < 8 or words > 27:
        print("warning: shortDescription is %d words, outside the corpus band of 8-27" % words)

    tags = list(draft.get("tags") or [])
    if REQUIRED_TAG not in tags:
        fail("tags must include " + REQUIRED_TAG)

    status = draft.get("status", "reviewed")
    if status != "reviewed":
        fail("status must be reviewed, got %r" % status)

    source_link = draft.get("sourceLink") or None
    if source_link is not None:
        if not re.match(r"^https?://", source_link):
            fail("sourceLink must be http(s) or null")
        if "uxcel.com" in source_link:
            fail("sourceLink must not point at uxcel.com")

    existing = get_json(where_slug("entries", slug))
    if existing.get("docs"):
        fail("an entry with slug %r already exists" % slug)

    live_tags = get_json(API + "/api/tags?limit=200&depth=0")["docs"]
    id_by_slug = {t["slug"]: t["id"] for t in live_tags}
    tag_ids = []
    for tag_slug in tags:
        if tag_slug not in id_by_slug:
            fail("tag %r is not in the live vocabulary; live slugs: %s"
                 % (tag_slug, ", ".join(sorted(id_by_slug))))
        tag_ids.append(id_by_slug[tag_slug])

    related_ids = []
    for related_slug in draft.get("relatedEntries") or []:
        found = get_json(where_slug("entries", related_slug)).get("docs")
        if not found:
            fail("relatedEntries slug %r matches no live entry" % related_slug)
        related_ids.append(found[0]["id"])

    keychain = subprocess.run(
        ["security", "find-generic-password", "-s", KEYCHAIN_SERVICE, "-w"],
        capture_output=True, text=True,
    )
    if keychain.returncode != 0:
        fail("no Keychain item for service %r; see the skill's setup notes" % KEYCHAIN_SERVICE)
    password = keychain.stdout.strip()

    try:
        login = post_json(API + "/api/users/login", {"email": EMAIL, "password": password})
    except urllib.error.HTTPError as error:
        if error.code == 401:
            fail("login rejected (401): the capture user's password has changed or the user is missing")
        fail("login failed with HTTP %d" % error.code)
    token = login.get("token")
    if not token:
        fail("login response carried no token")

    payload = {
        "name": draft["name"],
        "slug": slug,
        "shortDescription": short,
        "longDescription": long_description,
        "sourceLink": source_link,
        "status": "reviewed",
        "tags": tag_ids,
        "relatedEntries": related_ids,
    }

    try:
        created = post_json(API + "/api/entries", payload, token=token)
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", "replace")[:500]
        fail("create failed with HTTP %d: %s" % (error.code, detail))

    doc = created.get("doc") or created
    print("created id %s slug %s" % (doc.get("id"), doc.get("slug")))

    check = get_json(where_slug("entries", slug)).get("docs")
    if not check:
        fail("VERIFY FAILED: the public API does not return the new slug")
    print("verified public: status=%s" % check[0].get("status"))
    print("entry: https://glossary.bydefault.studio/entry.html?term=" + slug)
    print("collection: https://glossary.bydefault.studio/?tag=erlens-words")


if __name__ == "__main__":
    main()
