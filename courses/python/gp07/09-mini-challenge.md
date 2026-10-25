# 9. Mini Challenge — Measurement report

## Στόχος

Δημιούργησε report με τη μεγαλύτερη περιοχή, τη μακρύτερη route και την απόσταση P01–P02.

## Διαδικασία

1. Διάβασε και έλεγξε τα τρία inputs.
2. Μετέτρεψέ τα σε EPSG:2100.
3. Υπολόγισε νέα fields και distance.
4. Κάνε assertions για CRS, geometry, rows, θετικές τιμές και λογικά όρια.
5. Εξήγαγε GeoPackage με τα measured layers.

## Αναμενόμενο αποτέλεσμα

Έχεις 2 measured polygons και 2 measured routes, με μονάδες δηλωμένες στα ονόματα. Η απόσταση P01–P02 είναι λίγα km.

## Οπτικός έλεγχος

Κάνε plot τις layers ή άνοιξε το GeoPackage σε GIS. Τα measurements πρέπει να αντιστοιχούν στα features που βλέπεις.

Επίλεξε τη σωστή measurement για κάθε geometry, δήλωσε CRS και μονάδες, υπολόγισε το αποτέλεσμα και γράψε έναν sanity check. Αν η τιμή φαίνεται περίεργη, πρώτα έλεγξε CRS και bounds, όχι μόνο τον τύπο της Python.

## Επόμενο βήμα

Ολοκλήρωσε το readiness checkpoint.
