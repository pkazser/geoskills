# 5. Workflow με clip

## Καθοδηγούμενο παράδειγμα

Φόρτωσε `landuse`, `protected` και `study_area`, επιβεβαίωσε CRS/geometry και μετέτρεψέ τα σε EPSG:2100.

```python
clipped = gpd.clip(landuse, study)
clipped["area_m2"] = clipped.geometry.area
```

Πρόβλεψε before/after rows και area. Μετά έλεγξε ότι οι geometries είναι valid/non-empty, ότι βρίσκονται στη mask και ότι τα land-use attributes διατηρήθηκαν.

Το clipped output είναι ενδιάμεσο αποτέλεσμα· κράτησέ το χωριστά από το source.

## Ερμηνεία

Το μικρότερο area δεν αρκεί: έλεγξε ποια features κόπηκαν, ποια attributes διατηρήθηκαν και αν υπάρχει κενή ή invalid geometry. Στο επόμενο κεφάλαιο θα τομήσεις το clipped αποτέλεσμα με την protected zone.
