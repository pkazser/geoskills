#!/usr/bin/env python3
"""Prepare the pinned MyST Book Theme for local and CI builds."""

from __future__ import annotations

import hashlib
import json
import os
import posixpath
import shutil
import stat
import sys
import tempfile
import urllib.request
import uuid
import zipfile
from pathlib import Path


THEME_URL = (
    "https://github.com/jupyter-book/myst-theme/releases/download/"
    "myst-to-react%401.4.1/book-theme.zip"
)
EXPECTED_SHA256 = "f6b6c7822821539e80dde120f6632ad77e7b6c20f5e773b5ca5d818ea529bd78"
THEME_RELEASE = "myst-to-react@1.4.1"
REQUIRED_FILES = (
    "template.yml",
    "server.js",
    "package.json",
    "package-lock.json",
)
REQUIRED_DIRECTORIES = ("public", "build")
MARKER_NAME = ".geoskills-theme.json"


def fail(message: str) -> "NoReturn":
    raise RuntimeError(message)


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def validate_theme(root: Path) -> None:
    missing = [name for name in REQUIRED_FILES if not (root / name).is_file()]
    if missing:
        fail(f"Το theme είναι ελλιπές· λείπουν αρχεία στη ρίζα: {', '.join(missing)}")

    missing_dirs = [name for name in REQUIRED_DIRECTORIES if not (root / name).is_dir()]
    if missing_dirs:
        fail(f"Το theme είναι ελλιπές· λείπουν φάκελοι assets: {', '.join(missing_dirs)}")

    if not any((root / "public").rglob("*")):
        fail("Ο φάκελος public του theme είναι κενός")
    if not any((root / "build").rglob("*")):
        fail("Ο φάκελος build του theme είναι κενός")


def marker_matches(root: Path) -> bool:
    marker = root / MARKER_NAME
    if not marker.is_file():
        return False
    try:
        metadata = json.loads(marker.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return False
    if metadata.get("url") != THEME_URL or metadata.get("sha256") != EXPECTED_SHA256:
        return False
    try:
        validate_theme(root)
    except RuntimeError:
        return False
    return True


def safe_extract_dist_book(archive: Path, destination: Path) -> None:
    prefix = "dist-book/"
    seen: set[str] = set()
    destination_resolved = destination.resolve()

    with zipfile.ZipFile(archive) as bundle:
        for info in bundle.infolist():
            name = info.filename
            if not name.startswith(prefix):
                continue
            relative = name[len(prefix) :]
            if not relative or relative.endswith("/"):
                continue
            if "\\" in relative:
                fail(f"Μη ασφαλής διαδρομή ZIP: {name}")
            normalized = posixpath.normpath(relative)
            if normalized in (".", "") or normalized.startswith("../") or normalized.startswith("/"):
                fail(f"Μη ασφαλής διαδρομή ZIP: {name}")
            if normalized in seen:
                fail(f"Διπλό αρχείο στο ZIP: {name}")
            seen.add(normalized)
            mode = (info.external_attr >> 16) & 0xFFFF
            if stat.S_ISLNK(mode):
                fail(f"Το ZIP περιέχει μη επιτρεπτό symbolic link: {name}")

            output = destination / Path(*normalized.split("/"))
            output_parent = output.parent.resolve()
            if os.path.commonpath((str(destination_resolved), str(output_parent))) != str(destination_resolved):
                fail(f"Η διαδρομή ZIP դուրսφεύγει από τον προορισμό: {name}")
            output.parent.mkdir(parents=True, exist_ok=True)
            with bundle.open(info, "r") as source, output.open("wb") as target:
                shutil.copyfileobj(source, target)

    if not seen:
        fail("Το ZIP δεν περιέχει περιεχόμενα dist-book/")


def download_archive(target: Path) -> None:
    request = urllib.request.Request(
        THEME_URL,
        headers={"User-Agent": "GeoSkills-MyST-theme-preparer/1.0"},
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response, target.open("wb") as output:
            shutil.copyfileobj(response, output)
    except Exception as error:  # pragma: no cover - platform/network-specific
        fail(f"Αποτυχία λήψης του επίσημου theme release: {error}")

    actual = sha256_file(target)
    if actual != EXPECTED_SHA256:
        fail(
            "Αποτυχία επαλήθευσης SHA256 του theme release: "
            f"αναμενόμενο {EXPECTED_SHA256}, βρέθηκε {actual}"
        )


def prepare(repo_root: Path) -> Path:
    cache_root = repo_root / ".geoskills-cache"
    theme_root = cache_root / "book-theme"
    cache_root.mkdir(parents=True, exist_ok=True)

    if marker_matches(theme_root):
        print(f"Έγκυρο cached theme ήδη διαθέσιμο: {theme_root}")
        return theme_root

    staging = cache_root / f".book-theme-staging-{uuid.uuid4().hex}"
    archive = cache_root / f".book-theme-{uuid.uuid4().hex}.zip"
    try:
        staging.mkdir(parents=True)
        print(f"Λήψη pinned MyST theme release: {THEME_RELEASE}")
        download_archive(archive)
        safe_extract_dist_book(archive, staging)
        validate_theme(staging)
        (staging / MARKER_NAME).write_text(
            json.dumps(
                {
                    "release": THEME_RELEASE,
                    "url": THEME_URL,
                    "sha256": EXPECTED_SHA256,
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        if theme_root.exists():
            shutil.rmtree(theme_root)
        os.replace(staging, theme_root)
        print(f"Τοπικό MyST theme προετοιμάστηκε: {theme_root}")
        return theme_root
    finally:
        if staging.exists():
            shutil.rmtree(staging)
        if archive.exists():
            archive.unlink()


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    try:
        prepare(repo_root)
    except (OSError, RuntimeError, zipfile.BadZipFile) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
