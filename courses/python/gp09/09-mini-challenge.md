# 9. Mini Challenge — Υπηρεσίες ανά τομέα

## Στόχος

Αντιστοίχισε τις υπηρεσίες στους διοικητικούς τομείς και δημιούργησε report κάλυψης.

## Βήματα

1. Διάβασε points και polygons.
2. Έλεγξε CRS, rows, geometry types και bounds.
3. Κάνε left spatial join με `within`.
4. Κατέγραψε unmatched και κάνε aggregation.
5. Κάνε map και export.

## Αναμενόμενο αποτέλεσμα

Πέντε υπηρεσίες έχουν district και μία μένει unmatched. Το άθροισμα των counts είναι πέντε.

## Ερμηνεία

Εξήγησε γιατί το left αποτέλεσμα είναι καταλληλότερο για QA και το inner για summary matched υπηρεσιών.

Αιτιολόγησε τρεις επιλογές πριν γράψεις syntax: ποιο dataset είναι left, ποιο right και ποιο predicate/join type απαντά το ερώτημα. Έλεγξε αν τα rows αυξήθηκαν, αν υπάρχουν unmatched και αν το αποτέλεσμα έχει γεωγραφικό νόημα.

## Επόμενο βήμα

Ολοκλήρωσε το readiness checkpoint.
