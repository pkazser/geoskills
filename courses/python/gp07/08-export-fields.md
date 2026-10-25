# 8. Export με measurement fields

## Τι θα μάθεις

Θα εξάγεις τα αρχικά features μαζί με τις νέες μετρήσεις.

## Κώδικας

## Τι παραδίδουμε

Το export πρέπει να κρατά IDs, αρχικά attributes, geometry, CRS και νέα fields. Μετά το write ξαναδιάβασε το layer και έλεγξε rows, columns, units και positive values.

```python
areas_m.to_file("gp07_measurements.gpkg", layer="areas", driver="GPKG")
routes_m.to_file("gp07_measurements.gpkg", layer="routes", driver="GPKG")
```

Το GeoPackage κρατά CRS και πολλαπλά layers. Για απλή διανομή μπορείς να εξάγεις και GeoJSON, αλλά το GeoPackage είναι καταλληλότερο για ενιαίο αρχείο εργασίας.

## QA πριν από export

Έλεγξε ότι υπάρχουν τα fields `area_m2`, `area_ha`, `length_m`, `length_km` στους σωστούς πίνακες, ότι τα rows δεν άλλαξαν και ότι τα νέα fields δεν έχουν missing τιμές.

## Συνηθισμένο λάθος

Μην κάνεις export μόνο της στήλης μέτρησης και χάσεις τα IDs/attributes που επιτρέπουν να συνδεθεί η μέτρηση με το feature.

Με το export των νέων fields η μέτρηση γίνεται μέρος του dataset και μπορεί να χρησιμοποιηθεί από άλλο GIS workflow. Μην αντικαθιστάς το source layer χωρίς λόγο: κράτησε source και measured output χωριστά ή χρησιμοποίησε σαφές νέο layer name.

## Επόμενο βήμα

Στο Mini Challenge θα ολοκληρώσεις το measurement workflow.
