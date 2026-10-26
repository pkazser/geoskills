# 7. Geometry QA και οπτικός έλεγχος

## Στόχος

Θα ελέγξεις τεχνική εγκυρότητα, έκταση και γεωμετρικό νόημα.

```python
for frame in (study, clipped, overlay):
    assert frame.geometry.notna().all()
    assert frame.geometry.is_valid.all()
    assert (~frame.geometry.is_empty).all()
    assert frame.crs.to_epsg() == 2100
```

Έλεγξε `geom_type`, bounds και positive areas. Polygon/MultiPolygon είναι αναμενόμενα. Αν βρεις invalid geometry, σταμάτησε, τεκμηρίωσε και μην εφαρμόσεις μηχανικά `make_valid()`.

Κάνε plot των input και output layers με διαφορετικά χρώματα.

## Συνηθισμένο λάθος και μετάβαση

Μην θεωρείς το `is_valid` απόδειξη σωστής ερμηνείας. Συνδύασέ το με bounds, area και οπτικό έλεγχο. Μετά θα κάνεις export και αριθμητική σύγκριση.
