# GeoSkills — QA Standard Procedures

## 1. Scope and protection

1. Inspect production status before work; treat all existing changes as user-owned.
2. Use a new isolated worktree from the current `origin/main`.
3. Apply only explicitly approved files.
4. Never use `git add .`, force-push, reset or cleanup of unrelated work.

## 2. Content vs Platform QA

- Content QA covers scientific accuracy, pedagogy, language, activities and source fidelity.
- Platform QA covers MyST export, artifact paths, HTML/assets, browser runtime and deployment.
- A static data check is not QGIS Desktop execution. Record that status as `NOT TESTED` unless actually run.
- Known unrelated theme issues remain separate from course-specific decisions.

## 3. MyST production-equivalent check

Use the pinned workflow values where available:

```powershell
$env:BASE_URL='/geoskills'
$env:CI='true'
python scripts/prepare_myst_theme.py
myst build --html --ci
```

Wait for the static export to finish before inspecting or packaging `_build/html`. Verify final HTML, runtime assets, `/geoskills/` paths, downloads and relevant HTML routes.

If a fresh isolated worktree has no `.geoskills-cache/book-theme`, first check for a validated cache from a previously successful isolated build. Reuse it only when `.geoskills-theme.json`, release and SHA256 match the pinned release. Do not replace the template URL, disable TLS verification or copy unvalidated runtime files.

## 4. Browser regression

Use the verified standalone Playwright Chromium runner. Test at least desktop 1440 px and mobile 390 px. Record HTTP status, console errors, failed requests, broken images, overflow, links/downloads and hidden-answer state. `NOT TESTED` is never `PASS`.

## 5. Download verification

Test the final rendered URL, not merely source existence. Require HTTP 200, expected MIME type, non-zero bytes and a valid binary signature (`PK` for DOCX/ZIP where applicable).

## 6. Integration and release gates

Before commit: `git diff --check`, exact changed-file scope, source preservation and targeted regression. Before push: verify `origin/main` has not advanced. After push: record commit SHA, Actions result and public verification. No release without explicit approval.

## 7. Evidence and provenance

Every result records command/environment, exact scope, status (`PASS`, `FAIL`, `NOT TESTED`, `CONDITIONAL GO`), evidence path and limitations. Reports must distinguish verified facts from proposals.

## Primary references

- `docs/standards/GEOSKILLS_COURSE_DEVELOPMENT_STANDARD_v1.1.md`
- `docs/standards/GEOSKILLS_COURSE_QA_CHECKLIST_v1.1.md`
- `QA001B2_MASTER_REPORT_GR.md`
- `QA001B2_FIX_REPORT_GR.md`
- `GeoSkills_MASTER_HANDOFF_2026-11-05.md`
- `QA001B2_BUILD_RECOVERY_REPORT.md`
