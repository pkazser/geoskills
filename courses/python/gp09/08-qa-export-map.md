# 8. QA, map και export

## Στόχος

Θα ελέγξεις ότι το αποτέλεσμα απαντά στο ερώτημα πριν το εξαγάγεις.

```python
assert joined_left.geometry.geom_type.eq("Point").all()
assert joined_left.crs.to_epsg() == 4326
assert joined_left["service_id"].nunique() == len(services)
```

Κατέγραψε before/after rows, null matches, unique IDs, CRS, geometry type και bounds. Κάνε plot services, districts και unmatched S06. Μετά κάνε export σε GeoPackage και επαναφόρτωσε το layer, ελέγχοντας rows, columns και geometry.

Ο χάρτης είναι QA βοήθημα, όχι απόδειξη μόνος του.

## Checkpoint και μετάβαση

Μετά το reload σύγκρινε source IDs, CRS, geometry types, bounds και τα βασικά attributes. Το `len` μόνο του δεν πιστοποιεί export. Στο Mini Challenge θα επιλέξεις εσύ τη λεπτομερή οργάνωση της αναφοράς.
