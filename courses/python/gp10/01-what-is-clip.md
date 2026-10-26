# 1. Τι είναι clip

## Στόχος

Θα περιορίσεις το land-use layer στη study area, δημιουργώντας νέα κομμένα geometries.

Πρόβλεψε ότι τα attributes του land-use θα διατηρηθούν, ενώ οι geometries που τέμνονται με τη mask μπορεί να αλλάξουν. Το clip δεν είναι spatial join: εδώ αλλάζει geometry.

```python
clipped = gpd.clip(landuse, study)
```

Έλεγξε rows, CRS, valid/non-empty geometries, bounds και `area_m2`. Η απουσία exception δεν αρκεί.

## Συνηθισμένο λάθος και μετάβαση

Μην υπολογίζεις area σε μοίρες και μην θεωρείς ότι ίδιο πλήθος rows σημαίνει ίδια geometry. Στο επόμενο κεφάλαιο θα δημιουργήσεις τη νέα κοινή geometry με intersection.
