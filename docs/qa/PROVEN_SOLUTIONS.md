# GeoSkills — Proven Solutions

Καταχωρίσεις που τεκμηριώθηκαν σε προηγούμενα QA reports. Δεν αποτελούν καθολική εγγύηση εκτός των αναφερόμενων προϋποθέσεων.

## PS-001 — MyST static export πριν από artifact inspection

- **Στόχος:** παραγωγή συγκρίσιμου static artifact για GitHub Pages.
- **Περιβάλλον:** GeoSkills repository, pinned production workflow, `BASE_URL=/geoskills`, `CI=true`, Node 24.22.1, Python 3.12, mystmd 1.11.0.
- **Διαδικασία:** `python scripts/prepare_myst_theme.py` και έπειτα `myst build --html --ci`. Αναμονή μέχρι την ολοκλήρωση της static export/route crawl phase. Έλεγχος του τελικού `_build/html`, όχι ενδιάμεσου preview output.
- **Αποτέλεσμα:** επιτυχές σε προηγούμενο Gate G4.1 και QA-001B.1 publish· τεκμηριώθηκε ότι πρόωρη συσκευασία έδινε ελλιπή assets.
- **Περιορισμοί:** τοπικό build ή απλός αριθμός logical pages δεν αποδεικνύει production equivalence. Οποιαδήποτε proxy/TLS αποτυχία καταγράφεται χωριστά.
- **Πηγή:** `GeoSkills_MASTER_HANDOFF_2026-11-05.md`, ενότητες Ε1/Ε7 και G2.

## PS-002 — Targeted Playwright Chromium QA

- **Στόχος:** πραγματικός browser έλεγχος χωρίς computer-use ή εξάρτηση από τον εγκατεστημένο Chrome.
- **Περιβάλλον:** standalone Playwright Chromium, verified browser installation, desktop 1440 px και mobile 390 px.
- **Διαδικασία:** προσωρινός HTTP server του τελικού artifact κάτω από `/geoskills/`; έλεγχος HTTP, εικόνων, downloads, console/network failures, hidden details και overflow.
- **Αποτέλεσμα:** επιτυχές σε Gate F3/G4.1 και QA-001B.1 R2/R3/publish.
- **Περιορισμοί:** δεν μετατρέπει στατικούς ελέγχους σε QGIS Desktop runtime execution.
- **Πηγή:** `GeoSkills_MASTER_HANDOFF_2026-11-05.md`, ενότητες Ε2 και Γ2.

## PS-003 — Binary download verification

- **Στόχος:** επιβεβαίωση ότι τα downloads είναι πραγματικά DOCX/ZIP και όχι HTML error pages.
- **Διαδικασία:** έλεγχος τελικού `/geoskills/build/...` URL, HTTP 200, αναμενόμενο MIME type, μη μηδενικό μέγεθος και `PK` signature όπου εφαρμόζεται.
- **Αποτέλεσμα:** επιτυχές στο QA-001B.1 R3 και published verification.
- **Πηγή:** `GeoSkills_MASTER_HANDOFF_2026-11-05.md`, ενότητα Ε4.

## PS-004 — Selective version correction integration

- **Στόχος:** διόρθωση μόνο των τεσσάρων verified v1.0/v1.1 labels GQ01–GQ03.
- **Διαδικασία:** νέο worktree από `origin/main`, εφαρμογή μόνο των τεσσάρων line replacements, `git diff --check`, targeted MyST/Playwright QA και scope diff.
- **Αποτέλεσμα:** QA-001B.2-FIX `READY FOR INTEGRATION`; οι τέσσερις αλλαγές ενσωματώνονται εδώ στο branch `codex/qa001b2-integrate`.
- **Περιορισμοί:** QGIS Desktop execution παραμένει `NOT TESTED`.
- **Πηγή:** `QA001B2_MASTER_REPORT_GR.md`, `VERSION_CORRECTIONS.csv`, `QA001B2_FIX_REPORT_GR.md`.

## PS-005 — Recovery when the isolated worktree lacks the pinned local theme

- **Στόχος:** αποκατάσταση build χωρίς αλλαγή του production `myst.yml` ή του pinned MyST version.
- **Root cause:** το repository configuration intentionally uses `site.template: .geoskills-cache/book-theme`. In a fresh worktree the generated cache was absent, so MyST treated the value as an unresolved template and queried `https://api.mystmd.org/templates/.geoskills-cache/book-theme` instead of the normal `site/myst/book-theme` template endpoint.
- **Προϋποθέσεις:** an existing, validated GeoSkills theme cache with `.geoskills-theme.json`, release `myst-to-react@1.4.1`, expected SHA256 `f6b6c7822821539e80dde120f6632ad77e7b6c20f5e773b5ca5d818ea529bd78`.
- **Διαδικασία:** verify the marker and required theme files in the previously successful isolated worktree; copy only the generated `.geoskills-cache/book-theme` into the new isolated worktree; run the unchanged `scripts/prepare_myst_theme.py`, then `BASE_URL=/geoskills CI=true myst build --html --ci`; wait for the route crawl before inspecting `_build/html`.
- **Αποτέλεσμα:** verified in `qa001b2-integrate-worktree`: `Built 182 pages`, 230 final HTML files after route crawl, GQ01–GQ03 artifact checks PASS, Playwright desktop/mobile PASS.
- **Περιορισμοί:** this is a local recovery using a validated generated cache; it does not change the CI workflow or prove a fresh Windows download. GitHub Actions remains the production-equivalent validation path.
- **Πηγή:** `QA001B2_BUILD_RECOVERY_REPORT.md`; `myst.yml`; `scripts/prepare_myst_theme.py`; MyST official template guidance: https://mystmd.org/guide/quickstart and https://mystmd.org/guide/website-templates.

## PS-006 — Static artifact preflight before browser QA

- **Στόχος:** επιβεβαίωση ότι το artifact που θα ανέβει είναι αυτοτελές.
- **Διαδικασία:** μετά το `myst build --html --ci`, ελέγξτε στο ίδιο `_build/html` κάθε `src`, `href`, `srcset` και download URL με filesystem resolution και HTTP request. Ελέγξτε επίσης ότι `myst_assets_folder` και όλα τα κοινά JS/CSS assets υπάρχουν πριν από Playwright.
- **Αποτέλεσμα:** η διαδικασία QA-001B.3A εντόπισε ότι τα GQ04/GQ05 binaries υπάρχουν κάτω από `_build/html/build`, αλλά τα runtime-resolved URLs `/myst_assets_folder/...` δεν έχουν αντίστοιχο φάκελο στο artifact και αποτυγχάνουν με 404.
- **Περιορισμοί:** δεν αποτελεί λύση η αντιγραφή assets από το preview cache· απαιτείται CI-compatible packaging από την πραγματική διαδικασία build.
- **Πηγή:** `QA001B3A_RUNTIME_ROOT_CAUSE.md`, `QA001B3A_ASSET_VALIDATION.csv`.

## PS-007 — Explicit BASE_URL invocation and final artifact validation

- **Στόχος:** αποφυγή false 404 diagnosis από local MyST invocation.
- **Διαδικασία:** set `BASE_URL=/geoskills`, `CI=true`, `NODE_USE_SYSTEM_CA=1` in the same process; run pinned theme preparation and `myst build --html --ci`; wait for completion; validate the exact `_build/html`; then run Playwright with `/geoskills/` server mapping.
- **Αποτέλεσμα:** with the explicit environment, generated HTML used `/geoskills/build/...`, the validator found 11,885 references and 0 missing, and GQ04/GQ05 runtime/download checks passed.
- **Πηγή:** `STATIC_EXPORT_ROOT_CAUSE.md`, `STATIC_EXPORT_FIX_REPORT.md`, `STATIC_ARTIFACT_VALIDATION.csv`.
