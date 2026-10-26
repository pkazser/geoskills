# 2. Intersection και overlay

## Στόχος

Θα υπολογίσεις την κοινή geometry land-use και protected zone.

```python
overlay = gpd.overlay(clipped, protected, how="intersection")
overlay["area_m2"] = overlay.geometry.area
```

Το output παίρνει attributes και από τα δύο layers και περιέχει μόνο την κοινή έκταση. Μπορεί να έχει Polygon ή MultiPolygon. Έλεγξε bounds, validity, empties και θετικό area.

Μην το παρουσιάζεις ως απλό attribute transfer.

## Checkpoint

Έλεγξε ότι υπάρχει τουλάχιστον ένα θετικό area και ότι τα bounds του output βρίσκονται στα inputs, με μικρή ανοχή όπου χρειάζεται. Επόμενο βήμα: θα επιλέξεις εργαλείο από το ερώτημα και όχι από συνήθεια.
