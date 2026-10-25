# 10. Readiness checkpoint

## Πρέπει να μπορείς να εξηγήσεις

- Τι ερώτημα απαντά ένα buffer.
- Γιατί το `buffer(500)` χρειάζεται μονάδες και σωστό projected CRS.
- Τι αλλάζει για point, line και polygon buffers.
- Πώς ελέγχεις overlap και features μέσα σε buffer.
- Πότε το dissolve βοηθά και πότε αλλάζει το ερώτημα.

## Τελικός έλεγχος

Γράψε report με source CRS, working CRS, distance, units, rows, geometry types, bounds και export path. Πρόσθεσε μία εικόνα ή plot για οπτικό QA.

Η κοινή ακολουθία ολοκληρώνεται: GP06 επιλέγει features, GP07 μετρά geometry characteristics και GP08 μοντελοποιεί proximity με νέα Polygon zones. Το buffer είναι υπόθεση απόστασης, όχι αυτόματη απόδειξη πρόσβασης ή χρόνος διαδρομής.

## Μετάβαση

Στο GP09 θα συνδέσεις διαφορετικά layers με βάση τη χωρική τους σχέση.
