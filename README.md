# GeoSkills — Ελληνόφωνη πλατφόρμα Γεωπληροφορικής

## Τι περιέχει

Το GeoSkills είναι ένα στατικό εκπαιδευτικό site MyST Markdown με τέσσερις διαδρομές: GIS / QGIS Core, GeoPython Core, Field Surveying Core και Remote Sensing Core. Στην πρώτη φάση είναι διαθέσιμα τα επτά κεφάλαια του GQ-START και το πρακτικό μάθημα GQ00. Οι υπόλοιπες διαδρομές δηλώνουν ότι βρίσκονται σε ανάπτυξη.

## Εγκατάσταση και τοπική χρήση

**Απαραίτητα:** Node.js, Python 3.12 και το MyST Markdown CLI (επίσημη τεκμηρίωση: https://mystmd.org/guide/).

```powershell
npm install -g mystmd@1.11.0
python scripts/prepare_myst_theme.py
myst start
```

Για στατική παραγωγή ιστοτόπου:

```bash
myst build --html
```

Σε Windows/Codex, όταν απαιτείται η έμπιστη αλυσίδα πιστοποιητικών του συστήματος, εκτέλεσε:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npx --no-install myst build --html
```

Η ρύθμιση ισχύει μόνο για την τρέχουσα διεργασία PowerShell και δεν απενεργοποιεί την επαλήθευση TLS. Η επιτυχής φάση παραγωγής ολοκληρώνεται πριν από τυχόν εκκίνηση preview server. Αν το `myst build` εμφανίσει μήνυμα ότι ξεκινά preview server, η χειροκίνητη διακοπή του server μετά την παραγωγή δεν αποτελεί από μόνη της αποτυχία του build.

Τα παραγόμενα αρχεία βρίσκονται στο `_build/html`.

Η πλατφόρμα προετοιμάζει αυτόματα το pinned MyST Book Theme πριν από το build:

```powershell
python scripts/prepare_myst_theme.py
$env:BASE_URL="/geoskills"
$env:CI="true"
myst build --html --ci
```

Το script χρησιμοποιεί μόνο τη standard library της Python, επαληθεύει SHA256 και αποθηκεύει το theme στο `.geoskills-cache/book-theme/`. Σε δεύτερη εκτέλεση επαναχρησιμοποιεί το έγκυρο cache χωρίς νέα λήψη.

## GitHub Pages

Το repository είναι project site (`pkazser.github.io/geoskills/`). Το workflow προετοιμάζει το pinned theme με `python scripts/prepare_myst_theme.py`, χρησιμοποιεί `BASE_URL=/geoskills`, εκτελεί `myst build --html --ci`, ανεβάζει το `_build/html` ως Pages artifact και κάνει deployment με `pages: write` και `id-token: write`.

Πριν από το πρώτο deployment χρειάζεται η χειροκίνητη ρύθμιση:

`Settings → Pages → Build and deployment → Source: GitHub Actions`

Μετά από push στον `main` ή χειροκίνητη εκτέλεση του `Deploy GeoSkills`, το site θα είναι διαθέσιμο στη διεύθυνση <https://pkazser.github.io/geoskills/>.

Μην ανεβάζεις σε δημόσιο repo ιδιωτικά αρχεία διδασκόντων, λύσεις που θέλεις να παραμείνουν κρυφές ή δεδομένα χωρίς άδεια δημόσιας διάθεσης.

## Δομή

- `myst.yml`: πλοήγηση, σελίδες, θέμα, δομή.
- `index.md`: αρχική σελίδα με επιλογή διαδρομής.
- `courses/qgis/intro/`: επτά πλήρη εισαγωγικά κεφάλαια και αυτοαξιολόγηση.
- `courses/qgis/gq00/index.md`: πιλοτικό πρακτικό μάθημα με δύο συνδέσμους λήψης.
- `downloads/qgis/GQ00_student_v1.1.zip`: μικρό εκπαιδευτικό σύνολο, χωρίς λύση διδάσκοντα.
- `ARCHITECTURE.md`, `DATA_POLICY.md`: κανόνες ανάπτυξης και διανομής.

Τα μαθήματα GeoPython GP00–GP10 δεν έχουν μεταφερθεί σε αυτή τη φάση.

## Δεδομένα και άδειες

Το `downloads/qgis/GQ00_student_v1.1.zip` είναι το φοιτητικό πακέτο της άσκησης GQ00 και περιέχει δεδομένα, τεκμηρίωση προέλευσης και φάκελο εργασίας· δεν περιέχει λύσεις διδάσκοντα ή προσωπικά αρχεία. Η πολιτική ελέγχου και διάθεσης βρίσκεται στο `DATA_POLICY.md`.

Δεν προστίθενται στο δημόσιο site αρχεία με ασαφή άδεια ή ιδιωτικό εκπαιδευτικό υλικό.

## Έλεγχοι πρώτης φάσης

Ελέγχονται η σύνδεση του repository, η πλοήγηση προς GQ-START και GQ00, η παρουσία των επτά κεφαλαίων, οι σύνδεσμοι λήψης, η ακεραιότητα του φοιτητικού ZIP και η ρύθμιση του GitHub Actions workflow. Τα αποτελέσματα του `myst build --html` καταγράφονται στην αναφορά της Task 001.

Αν η ρύθμιση URL ή μια οδηγία του MyST εμφανίσει προειδοποίηση, συμβουλεύσου την επίσημη τεκμηρίωση της εγκατεστημένης έκδοσης.

## Πηγή αρχικού GQ00

Το σύνολο δεδομένων βασίζεται στο αναθεωρημένο πακέτο GQ00 v1.1 που δημιουργήθηκε στην προηγούμενη φάση. Η άδεια πρωτογενών δεδομένων Natural Earth είναι public domain· ωστόσο πρόκειται για **ιστορικό εκπαιδευτικό υποσύνολο**, όχι το πιο πρόσφατο προϊόν Natural Earth.
