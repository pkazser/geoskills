# GeoSkills Course QA Checklist v1.1

Χρήση: αντιγραφή ή προσαρμογή σε ένα υπάρχον release record. Δεν απαιτείται νέο report για κάθε γραμμή. Κάθε έλεγχος παίρνει `PASS`, `FAIL`, `NOT TESTED` ή `N/A`, με evidence και QA severity μόνο όταν υπάρχει εύρημα.

## Status policy

- **PASS:** εκτελέστηκε και πέρασε.
- **FAIL:** εκτελέστηκε και απέτυχε.
- **NOT TESTED:** δεν εκτελέστηκε· δεν είναι PASS.
- **CONDITIONAL GO:** release decision με ρητή αποδοχή συγκεκριμένου `NOT TESTED`, υπεύθυνο, αιτιολόγηση και ημερομηνία επανελέγχου.

Οι φωτογραφικές προτεραιότητες είναι **Α/Β/Γ**. Τα QA findings είναι **P0/P1/P2/P3**. Δεν συγχέονται.

## A. Scope και προστασία

| ID | Έλεγχος | Status | Evidence / παρατήρηση | Severity |
|---|---|---|---|---|
| A1 | Ορίζονται μάθημα, έκδοση, branch/worktree και εγκεκριμένο commit |  |  |  |
| A2 | Το working tree ελέγχθηκε και οι προϋπάρχουσες αλλαγές προστατεύτηκαν |  |  | P1 |
| A3 | Δεν περιλαμβάνονται άσχετα μαθήματα, reports, outputs ή προσωπικά δεδομένα |  |  | P0/P1 |
| A4 | Δεν τροποποιήθηκαν theme, CSS, dependencies ή `deploy.yml` χωρίς έγκριση |  |  | P0/P1 |

## B. Content Approval

| ID | Έλεγχος | Status | Evidence / παρατήρηση | Severity |
|---|---|---|---|---|
| B1 | Υπάρχουν αποστολή, στόχοι, χρόνος και προαπαιτούμενα |  |  | P2 |
| B2 | Ο βασικός στόχος επιτυγχάνεται από το ίδιο το μάθημα |  |  | P1/P2 |
| B3 | Οι εξωτερικές πηγές είναι συμπληρωματικές και στοχευμένες |  |  | P2 |
| B4 | Παραδείγματα δηλώνουν πραγματικό/συνθετικό/ενδεικτικό χαρακτήρα |  |  | P2 |
| B5 | Activities και self-assessment συνδέονται με τους στόχους |  |  | P2 |
| B6 | Hidden answers λειτουργούν και είναι αρχικά κλειστές όπου χρησιμοποιούνται |  |  | P1/P2 |
| B7 | Η ενοποίηση διατήρησε ενότητες, περιεχόμενο, λεζάντες, alt text και links |  |  | P1 |
| B8 | Επιστημονικές διατυπώσεις ελέγχθηκαν από υπεύθυνο/κατάλληλη πηγή |  |  | P1/P2 |
| B9 | Η ελληνική γλώσσα και ορολογία είναι φυσικές και συνεπείς |  |  | P2/P3 |

## C. Media και άδειες

| ID | Έλεγχος | Status | Evidence / παρατήρηση | Severity |
|---|---|---|---|---|
| C1 | Significant SVG είναι block-level figures, responsive και με ουσιαστικό alt |  |  | P2 |
| C2 | Δεν εφαρμόζεται ανεπιθύμητο inline `max-height: 1.2em` |  |  | P2 |
| C3 | Τοπικές εικόνες φορτώνουν στο CI artifact |  |  | P1 |
| C4 | Πηγή, δημιουργός και άδεια είναι τεκμηριωμένα |  |  | P1/P2 |
| C5 | Placeholders είναι εμφανή και παιδαγωγικά ασφαλή |  |  | P2 |
| C6 | Κάθε pending photo έχει προτεραιότητα Α/Β/Γ στο register |  |  | P3 |
| C7 | Η φωτογραφική προτεραιότητα δεν χρησιμοποιήθηκε ως QA severity |  |  | P3 |

## D. Technical QA

| ID | Έλεγχος | Status | Evidence / παρατήρηση | Severity |
|---|---|---|---|---|
| D1 | Folder structure και relative paths είναι σωστά |  |  | P1 |
| D2 | `myst.yml` έχει μόνο την απαραίτητη navigation change |  |  | P1 |
| D3 | `BASE_URL=/geoskills` επαληθεύτηκε |  |  | P1 |
| D4 | Node/MyST/theme versions είναι pinned σύμφωνα με workflow |  |  | P2 |
| D5 | Theme preparation step ολοκληρώνεται |  |  | P1 |
| D6 | MyST build και preview artifact ολοκληρώνονται |  |  | P1 |
| D7 | Rendered HTML/CSS/JS/SVG/JPEG και MIME types ελέγχθηκαν |  |  | P1/P2 |
| D8 | TLS/DNS failure καταγράφηκε χωριστά και δεν παρακάμφθηκε |  |  | P0/P1 |

## E. Browser QA

| ID | Έλεγχος | Status | Evidence / παρατήρηση | Severity |
|---|---|---|---|---|
| E1 | Desktop περίπου 1440×900 σε πραγματικό browser |  |  | P1/P2 |
| E2 | Mobile περίπου 390×844 σε πραγματικό browser |  |  | P1/P2 |
| E3 | Figures, JPEGs και placeholders εμφανίζονται με σωστές αναλογίες |  |  | P1/P2 |
| E4 | Ελληνικά, λεζάντες, links και typography είναι αναγνώσιμα |  |  | P2 |
| E5 | Hidden answers ανοίγουν/κλείνουν |  |  | P1/P2 |
| E6 | Tables, navigation και anchors λειτουργούν |  |  | P1/P2 |
| E7 | Δεν υπάρχει οριζόντια υπερχείλιση στις ζητούμενες διαστάσεις |  |  | P2 |
| E8 | Screenshots ή σαφής λόγος μη διαθεσιμότητας καταγράφηκαν |  |  | P3 |

## F. Release gates

| Gate | Κριτήριο | Status | Owner / evidence |
|---|---|---|---|
| Content Approval | Περιεχόμενο, επιστήμη, γλώσσα, αυτοτέλεια και media reviewed |  |  |
| Technical QA | Static checks, MyST, artifact, assets, links και browser checks |  |  |
| Release Approval | Ρητή απόφαση για candidate, exceptions και publication |  |  |
| Published Verification | Actions success, public URL, navigation και deployed content |  |  |

### Exception record

Συμπλήρωσε μόνο αν χρειάζεται `CONDITIONAL GO`:

```text
Ελλιπής έλεγχος:
Υπεύθυνος αποδοχής:
Αιτιολόγηση:
Τι ακριβώς δεν ελέγχθηκε:
Ανοιχτό εύρημα / severity:
Ημερομηνία επανελέγχου:
```

Δεν επιτρέπεται exception για P0, P1, μη εγκεκριμένο περιεχόμενο ή άγνωστο production scope.

## QA severity policy

- **P0:** security/data loss/unauthorized deployment/critical scientific error — STOP.
- **P1:** build/deployment/core navigation/critical asset failure — NO-GO.
- **P2:** substantial educational, scientific, accessibility or responsive issue — fix or explicit acceptance.
- **P3:** minor language, visual or tooling issue — record and schedule.

## Gate decision

```text
Content Approval: PASS / FAIL / NOT TESTED
Technical QA: PASS / FAIL / NOT TESTED
Release Approval: GO / CONDITIONAL GO / NO-GO
Published Verification: PASS / FAIL / NOT TESTED
Open findings: P0 __  P1 __  P2 __  P3 __
```
