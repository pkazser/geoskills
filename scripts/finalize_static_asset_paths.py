#!/usr/bin/env python3
"""Fail-closed repair of MyST's runtime asset URLs in a finished static artifact.

Use only after `myst build --html --ci` and before static artifact validation.
This mirrors MyST 1.11.0's `rewriteAssetsFolder` URL mapping when that mapping
is absent from a completed artifact. It does not copy or invent asset files.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

SOURCE = "/myst_assets_folder/"
TEXT_SUFFIXES = {".html", ".js", ".mjs", ".json", ".css", ".webmanifest"}
# Static MyST/Vite asset filenames in the observed failing artifact.
ASSET_PATH = re.compile(r"/myst_assets_folder/([A-Za-z0-9_.$@%+~=/\-]+)")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("artifact", type=Path, help="Path to _build/html")
    parser.add_argument("--base-url", default="/geoskills")
    args = parser.parse_args()

    root = args.artifact.resolve()
    base = args.base_url.rstrip("/")
    if not root.is_dir() or not (root / "build").is_dir():
        print(f"FAIL: expected artifact and build/ directory under {root}", file=sys.stderr)
        return 2
    if not base.startswith("/") or "//" in base or ".." in base:
        print("FAIL: base URL must be a clean root-relative path", file=sys.stderr)
        return 2
    target_prefix = f"{base}/build/"
    asset_root = (root / "build").resolve()

    to_patch: list[tuple[Path, str]] = []
    asset_names: set[str] = set()
    occurrences = 0
    for file in root.rglob("*"):
        if not file.is_file() or file.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            data = file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            print(f"FAIL: non-UTF-8 static text: {file}", file=sys.stderr)
            return 2
        if SOURCE not in data:
            continue
        to_patch.append((file, data))
        occurrences += data.count(SOURCE)
        asset_names.update(ASSET_PATH.findall(data))

    # Validate the destination before modifying a single file.
    missing = []
    for asset in sorted(asset_names):
        dest = (asset_root / asset).resolve()
        if not dest.is_relative_to(asset_root) or not dest.is_file():
            missing.append(asset)
    if missing:
        print(f"FAIL: {len(missing)} destination asset(s) do not exist under {asset_root}", file=sys.stderr)
        for name in missing[:25]:
            print(f"  {name}", file=sys.stderr)
        return 1

    for file, data in to_patch:
        file.write_text(data.replace(SOURCE, target_prefix), encoding="utf-8")
    print(f"PASS: validated {len(asset_names)} distinct assets; rewritten {occurrences} references in {len(to_patch)} text files")
    if to_patch:
        print(f"Mapping: {SOURCE} -> {target_prefix}")
    else:
        print("No obsolete MyST asset prefixes were present: no changes required")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
