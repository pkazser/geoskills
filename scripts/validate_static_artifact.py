"""Validate references in a MyST HTML artifact without starting a theme server."""
from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = dict(attrs)
        for name in ("href", "src", "poster"):
            value = attrs_map.get(name)
            if value:
                self.refs.append((name, value))
        srcset = attrs_map.get("srcset")
        if srcset:
            for item in srcset.split(","):
                value = item.strip().split()[0]
                if value:
                    self.refs.append(("srcset", value))


def resolve(root: Path, page: Path, raw: str) -> Path | None:
    parsed = urlsplit(raw)
    if parsed.scheme or parsed.netloc or raw.startswith(("#", "data:", "mailto:", "javascript:")):
        return None
    value = parsed.path
    if value.startswith("/geoskills/"):
        return root / value[len("/geoskills/") :]
    if value.startswith("/"):
        return root / value[1:]
    return (page.parent / value).resolve()


def exists_as_site_resource(root: Path, page: Path, raw: str, target: Path) -> bool:
    """Accept files and extensionless MyST routes, including build-root links."""
    candidates = [target]
    parsed_path = urlsplit(raw).path
    if parsed_path in ("", "/", "/geoskills"):
        candidates.append(root / "index.html")
    if target.suffix == "":
        candidates.extend([target.with_suffix(".html"), target / "index.html"])
    if page.is_relative_to(root / "build") and not urlsplit(raw).path.startswith("/"):
        relative = Path(urlsplit(raw).path)
        candidates.extend([root / relative, root / relative / "index.html", (root / relative).with_suffix(".html")])
    if parsed_path.startswith("/geoskills/") and not parsed_path.startswith("/geoskills/build/"):
        relative = Path(parsed_path[len("/geoskills/") :])
        candidates.extend([root / "build" / relative, root / "build" / relative / "index.html", (root / "build" / relative).with_suffix(".html")])
    return any(candidate.is_file() or (candidate.is_dir() and (candidate / "index.html").is_file()) for candidate in candidates)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    parser.add_argument("--csv", type=Path)
    args = parser.parse_args()
    root = args.root.resolve()
    rows = []
    missing = []
    for page in root.rglob("*.html"):
        parser_obj = ReferenceParser()
        parser_obj.feed(page.read_text(encoding="utf-8", errors="replace"))
        for kind, raw in parser_obj.refs:
            target = resolve(root, page, raw)
            if target is None:
                continue
            exists = exists_as_site_resource(root, page, raw, target)
            row = {"page": str(page.relative_to(root)), "kind": kind, "reference": raw, "target": str(target), "exists": exists}
            rows.append(row)
            if not exists:
                missing.append(row)
    if args.csv:
        args.csv.parent.mkdir(parents=True, exist_ok=True)
        with args.csv.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=["page", "kind", "reference", "target", "exists"])
            writer.writeheader()
            writer.writerows(rows)
    summary = {"root": str(root), "references_checked": len(rows), "missing": len(missing), "missing_examples": missing[:20]}
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
