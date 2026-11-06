"""Install the standalone GeoSkills homepage into a completed MyST artifact."""

from pathlib import Path
import shutil
import sys


ROOT = Path(__file__).resolve().parents[1]
HOMEPAGE = ROOT / "homepage"
BUILD_HTML = ROOT / "_build" / "html"
SOURCE_INDEX = HOMEPAGE / "index.html"
SOURCE_ASSETS = HOMEPAGE / "assets"
ASSET_NAMES = ("homepage.css", "geo-art.svg")


def fail(message: str) -> None:
    print(f"install_homepage.py: ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def require_file(path: Path, label: str) -> None:
    if not path.is_file():
        fail(f"missing {label}: {path}")


def main() -> int:
    require_file(SOURCE_INDEX, "homepage index")
    for name in ASSET_NAMES:
        require_file(SOURCE_ASSETS / name, f"homepage asset {name}")
    require_file(BUILD_HTML / "index.html", "MyST build index")

    destination_assets = BUILD_HTML / "home-assets"
    destination_assets.mkdir(exist_ok=True)

    shutil.copy2(SOURCE_INDEX, BUILD_HTML / "index.html")
    for name in ASSET_NAMES:
        shutil.copy2(SOURCE_ASSETS / name, destination_assets / name)

    require_file(BUILD_HTML / "index.html", "installed homepage index")
    for name in ASSET_NAMES:
        require_file(destination_assets / name, f"installed homepage asset {name}")

    print("install_homepage.py: installed homepage index and assets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
