"""Check src/data/problems.js against the real LeetCode problems.

Reads the public problem index and the public GraphQL content endpoint, then
reports anything that disagrees with our data: difficulty, title, example
input/output, and the numeric bounds in the constraints.

It only reads publicly available problems. Premium problems have no public
content, so they are listed at the end for manual checking against neetcode.io.

Usage:  python tools/verify-problems.py [--out report.md]
"""

import argparse
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data" / "problems.js"

INDEX_URL = "https://leetcode.com/api/problems/all/"
GRAPHQL_URL = "https://leetcode.com/graphql"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (triage-dataset-check; personal study tool)",
    "Content-Type": "application/json",
    "Referer": "https://leetcode.com/",
}
DELAY = 0.7  # be polite; this is someone else's server

NL = chr(10)

LEVELS = {1: "Easy", 2: "Medium", 3: "Hard"}

# LeetCode writes these as an operation trace ("Input: [\"MinStack\",\"push\",...]"),
# which no amount of parsing will line up with a readable call sequence. Each of
# these was checked by hand against LeetCode's trace and matches it exactly.
TRACE_FORMAT = {155, 146, 208, 211, 295, 303, 622, 933}

# Deliberately not LeetCode's official example. Each is correct for the problem,
# and chosen because it is smaller or shows a case the official one does not.
OWN_EXAMPLES = {
    53:  "all-negative case",
    49:  "two empty strings, to show they group together",
    621: "n = 0, the no-cooldown case",
    200: "3x3 grids instead of LeetCode's 4x5",
    300: "shorter all-equal run",
    48:  "2x2 rotation",
    66:  "[9,9], to show the carry adding a digit",
    36:  "the board drawn as a grid rather than nested JSON",
}

# NeetCode hosts free equivalents of the premium problems under its own slugs.
NEETCODE = {
    253: "meeting-schedule-ii",
    269: "foreign-dictionary",
    271: "string-encode-and-decode",
    323: "count-connected-components",
}


# ── our data ────────────────────────────────────────────────────────────

def load_ours():
    """Pull the problem objects out of the ES module without a JS runtime."""
    src = DATA.read_text(encoding="utf-8")
    out = []
    for block in re.findall(r"\n  \{\n(.*?)\n  \}(?=,\n  \{|\n\];)", src, re.S):
        pid = re.search(r"id:\s*(\d+)", block)
        title = re.search(r"title:\s*'((?:[^'\\]|\\.)*)'", block)
        diff = re.search(r"difficulty:\s*'(\w+)'", block)
        if not (pid and title and diff):
            continue
        examples = []
        ex_block = re.search(r"examples:\s*\[(.*?)\n    \]", block, re.S)
        if ex_block:
            for ex in re.finditer(
                r"\{\s*input:\s*'((?:[^'\\]|\\.)*)'\s*,\s*output:\s*'((?:[^'\\]|\\.)*)'",
                ex_block.group(1),
            ):
                examples.append((unescape_js(ex.group(1)), unescape_js(ex.group(2))))
        cons = []
        c_block = re.search(r"constraints:\s*\[(.*?)\]", block, re.S)
        if c_block:
            cons = [unescape_js(c) for c in re.findall(r"'((?:[^'\\]|\\.)*)'", c_block.group(1))]
        out.append({
            "id": int(pid.group(1)),
            "title": unescape_js(title.group(1)),
            "difficulty": diff.group(1),
            "examples": examples,
            "constraints": cons,
        })
    return out


def unescape_js(s):
    return s.replace("\\'", "'").replace('\\"', '"').replace("\\\\", "\\")


# ── leetcode ────────────────────────────────────────────────────────────

def fetch_index():
    req = urllib.request.Request(INDEX_URL, headers={"User-Agent": HEADERS["User-Agent"]})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.load(r)
    index = {}
    for pair in data["stat_status_pairs"]:
        stat = pair["stat"]
        index[stat["frontend_question_id"]] = {
            "slug": stat["question__title_slug"],
            "title": stat["question__title"],
            "paid": bool(pair["paid_only"]),
            "difficulty": LEVELS.get(pair["difficulty"]["level"], "?"),
        }
    return index


QUERY = """query q($s: String!) {
  question(titleSlug: $s) {
    questionFrontendId title difficulty isPaidOnly content
  }
}"""


def fetch_question(slug, retries=3):
    payload = json.dumps({"query": QUERY, "variables": {"s": slug}}).encode()
    for attempt in range(retries):
        try:
            req = urllib.request.Request(GRAPHQL_URL, data=payload, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)["data"]["question"]
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as e:
            if attempt == retries - 1:
                return {"_error": str(e)}
            time.sleep(2 * (attempt + 1))
    return None


# ── parsing leetcode's html ─────────────────────────────────────────────

def to_text(content):
    if not content:
        return ""
    t = re.sub(r"<sup>(.*?)</sup>", r"^\1", content)
    t = re.sub(r"<br\s*/?>", "\n", t)
    t = re.sub(r"</(p|li|pre|div)>", "\n", t)
    t = re.sub(r"<li>", "\n• ", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t)
    t = t.replace(" ", " ")
    return re.sub(r"[ \t]+", " ", t)


def parse_examples(text):
    pairs = []
    for m in re.finditer(
        r"Input:\s*(.+?)\s*Output:\s*(.+?)(?=\n\s*(?:Explanation|Example|Constraints|Follow)|\Z)",
        text, re.S,
    ):
        pairs.append((norm(m.group(1)), norm(m.group(2))))
    return pairs


def parse_constraints(text):
    m = re.search(r"Constraints:\s*(.*?)(?=\n\s*Follow[- ]up|\Z)", text, re.S)
    if not m:
        return []
    lines = [l.strip(" •\t") for l in m.group(1).split("\n")]
    return [l for l in lines if l]


def norm(s):
    return re.sub(r"\s+", "", s).lower()


BOUND = re.compile(r"\d+\s*\^\s*\d+|\d+")


def bounds(strings):
    """The numeric bounds a player actually reads, normalised for comparison."""
    found = set()
    for s in strings:
        for tok in BOUND.findall(s.replace(" ", "")):
            found.add(tok.replace(" ", ""))
    return found


# ── main ────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=None, help="write a markdown report here")
    ap.add_argument("--limit", type=int, default=0, help="only check the first N (for testing)")
    args = ap.parse_args()

    ours = load_ours()
    if args.limit:
        ours = ours[: args.limit]
    print(f"loaded {len(ours)} problems from {DATA.name}", file=sys.stderr)

    print("fetching problem index...", file=sys.stderr)
    index = fetch_index()

    issues = []   # (problem, kind, detail)
    premium = []
    skipped_examples = []
    checked = 0

    for i, p in enumerate(ours, 1):
        meta = index.get(p["id"])
        if not meta:
            issues.append((p, "unknown-id", f"id {p['id']} is not in the LeetCode index"))
            continue

        if norm(meta["title"]) != norm(p["title"]):
            issues.append((p, "title", f"ours {p['title']!r} / leetcode {meta['title']!r}"))

        if meta["difficulty"] != p["difficulty"]:
            issues.append((p, "difficulty", f"ours {p['difficulty']} / leetcode {meta['difficulty']}"))

        if meta["paid"]:
            premium.append((p, meta))
            print(f"[{i}/{len(ours)}] {p['title']} - premium, skipped", file=sys.stderr)
            continue

        q = fetch_question(meta["slug"])
        time.sleep(DELAY)
        if not q or "_error" in (q or {}):
            issues.append((p, "fetch", (q or {}).get("_error", "no data")))
            continue
        checked += 1

        text = to_text(q.get("content"))
        their_ex = parse_examples(text)
        their_cons = parse_constraints(text)

        if p["id"] in TRACE_FORMAT or p["id"] in OWN_EXAMPLES:
            # Checked by hand instead; see the notes beside those sets.
            skipped_examples.append((p, p["id"] in TRACE_FORMAT))
            to_check = []
        else:
            to_check = p["examples"]

        for n, (inp, out) in enumerate(to_check, 1):
            hit = any(norm(inp) == ti and norm(out) == to for ti, to in their_ex)
            if not hit:
                loose = any(norm(inp) == ti for ti, _ in their_ex)
                issues.append((
                    p,
                    "example-output" if loose else "example",
                    f"ex{n} ours: {inp} -> {out}\n      leetcode has: "
                    + (" ; ".join(f"{a} -> {b}" for a, b in their_ex[:3]) or "(none parsed)"),
                ))

        ours_b, theirs_b = bounds(p["constraints"]), bounds(their_cons)
        extra = ours_b - theirs_b
        if extra:
            issues.append((
                p, "constraints",
                f"bounds in ours not found on leetcode: {sorted(extra)}\n"
                f"      ours:     {p['constraints']}\n"
                f"      leetcode: {their_cons}",
            ))

        print(f"[{i}/{len(ours)}] {p['title']}", file=sys.stderr)

    # ── report ──
    lines = []
    lines.append(f"# Dataset check\n")
    lines.append(f"- checked against leetcode.com: **{checked}**")
    lines.append(f"- premium, needs manual check: **{len(premium)}**")
    lines.append(f"- findings: **{len(issues)}**\n")

    by_kind = {}
    for p, kind, detail in issues:
        by_kind.setdefault(kind, []).append((p, detail))

    for kind in ("unknown-id", "title", "difficulty", "example", "example-output", "constraints", "fetch"):
        rows = by_kind.get(kind)
        if not rows:
            continue
        lines.append(f"\n## {kind}  ({len(rows)})\n")
        for p, detail in rows:
            lines.append(f"- **{p['id']} {p['title']}** - {detail}")

    if skipped_examples:
        lines.append(NL + "## examples verified by hand  (%d)" % len(skipped_examples) + NL)
        for p, is_trace in skipped_examples:
            why = "LeetCode uses an operation trace" if is_trace else OWN_EXAMPLES[p["id"]]
            lines.append(f"- **{p['id']} {p['title']}** - {why}")

    if premium:
        lines.append(f"\n## premium - check on neetcode.io  ({len(premium)})\n")
        for p, meta in premium:
            slug = NEETCODE.get(p["id"])
            url = f"https://neetcode.io/problems/{slug}" if slug else "(no known neetcode page)"
            lines.append(f"- **{p['id']} {p['title']}** - {url}")

    report = "\n".join(lines)
    print("\n" + report)
    if args.out:
        Path(args.out).write_text(report, encoding="utf-8")
        print(f"\nwritten to {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
