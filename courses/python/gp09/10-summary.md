# 10. Readiness checkpoint

## Πρέπει να μπορείς να εξηγήσεις

- Τη διαφορά attribute join και spatial join.
- Τους ρόλους left/right και των predicates `within`, `contains`, `intersects`.
- Γιατί `left` και `inner` δίνουν διαφορετική εικόνα.
- Πώς προκύπτουν one-to-many matches και unmatched features.
- Πώς κάνεις aggregation και QA πριν από export.

## Τελικός έλεγχος

Δώσε μαζί με το output ένα μικρό report: rows πριν/μετά, null matches, CRS, geometry type, bounds και map. Αυτά αποδεικνύουν ότι το join έχει γεωγραφικό νόημα.

Το GP09 περνά από “αναλύω ένα layer” σε “συσχετίζω δύο spatial datasets χωρίς να αλλάξω απαραίτητα τη geometry”. Στο GP10 θα δημιουργήσεις νέα geometries με clip, intersection και overlay.

## Μετάβαση

Στο GP10 θα αλλάξεις geometry χρησιμοποιώντας clip και overlay.
