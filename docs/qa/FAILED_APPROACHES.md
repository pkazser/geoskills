# GeoSkills — Failed / Unsafe Approaches

## FA-001 — Packaging before MyST static export completed

- **Συμπτώματα:** ελλιπή runtime assets και `/myst_assets_folder/` 404s σε packaged output.
- **Τι δοκιμάστηκε:** συσκευασία ενδιάμεσου `_build/html` ενώ ο MyST/theme server συνέχιζε να υλοποιεί routes/assets.
- **Αποτέλεσμα:** μη αξιόπιστο artifact. Δεν χρησιμοποιείται για acceptance.
- **Διορθωμένη πρακτική:** αναμονή πραγματικής ολοκλήρωσης export/route crawl και έλεγχος των ίδιων αρχείων που θα συσκευαστούν.
- **Πηγή:** `GeoSkills_MASTER_HANDOFF_2026-11-05.md`, Ε1 και Ε7.

## FA-002 — Υπόθεση ότι το `BASE_URL=/geoskills` διορθώνει όλες τις asset paths

- **Συμπτώματα:** root-absolute runtime references παρέμειναν προβληματικές σε isolated previews.
- **Αποτέλεσμα:** το `BASE_URL` μόνο του δεν αποτελεί απόδειξη σωστού artifact.
- **Πηγή:** `GeoSkills_MASTER_HANDOFF_2026-11-05.md`, Ε1 και Ε7.

## FA-003 — Computer-use/Chrome ως υποκατάστατο verified Playwright

- **Συμπτώματα:** προηγούμενη προσπάθεια δεν εντόπισε αξιόπιστα Chrome και ο localhost server δεν παρέμεινε διαθέσιμος.
- **Αποτέλεσμα:** όχι αποδεκτό browser evidence.
- **Διορθωμένη πρακτική:** verified standalone Playwright Chromium runner.
- **Πηγή:** `GeoSkills_MASTER_HANDOFF_2026-11-05.md`, Ε2 και Ε7.

## FA-004 — Τυφλή ομογενοποίηση όλων των `v1.0` labels

- **Συμπτώματα:** κίνδυνος αλλαγής τεκμηριωμένων ιστορικών ή dataset versions.
- **Αποτέλεσμα:** μη αποδεκτό χωρίς manifest evidence.
- **Διορθωμένη πρακτική:** αλλαγή μόνο των τεσσάρων entries του QA-001B.2.
- **Πηγή:** `QA001B2_MASTER_REPORT_GR.md`, `LANGUAGE_EDITORIAL_FINDINGS.csv`, `PRIORITIZED_CORRECTION_PLAN_GR.md`.

## FA-005 — Fresh Windows theme download as the only build prerequisite

- **Συμπτώματα:** `prepare_myst_theme.py` encountered a Windows proxy-filter permission error; MyST then failed with certificate verification, and with system CA enabled the API lookup returned 404 for `.geoskills-cache/book-theme` because the local cache was absent.
- **Αποτέλεσμα:** no valid build artifact was produced in the fresh worktree.
- **Ασφαλής recovery:** reuse only an existing theme cache whose repository marker and SHA match the pinned release, then run the unchanged preparation/build commands. Do not disable SSL verification, change the theme, or rewrite `myst.yml` without approval.
- **Πηγή:** `QA001B2_BUILD_RECOVERY_REPORT.md`; captured build output from the integration worktree.
