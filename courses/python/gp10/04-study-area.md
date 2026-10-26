# 4. Έλεγχος study area

## Στόχος

Θα ελέγξεις τη mask πριν από κάθε spatial operation.

Η study area πρέπει να έχει μία Polygon geometry, σωστό αρχικό CRS, valid/non-empty geometry και bounds που τέμνουν landuse και protected. Μετέτρεψε όλα τα layers στο EPSG:2100 πριν υπολογίσεις εμβαδά.

```python
study = gpd.read_file(root / "study_area.geojson")
study = study.to_crs("EPSG:2100")
```

Αν το clip δώσει κενό output, έλεγξε πρώτα bounds και CRS, όχι μόνο τον κώδικα.

## Checkpoint και μετάβαση

Κατέγραψε rows, bounds και geometry validity της mask. Η σωστή mask είναι προϋπόθεση για κάθε downstream συμπέρασμα. Επόμενο βήμα: guided clip και σύγκριση πριν/μετά.
