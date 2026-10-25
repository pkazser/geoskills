# 6. Workflow με overlay

## Τι θα μάθεις

Θα υπολογίσεις την κοινή έκταση land-use και protected zone.

## Κώδικας

## Ερμηνεία output

Το αποτέλεσμα περιγράφει μόνο κοινή έκταση. Τα landuse και protected fields επιτρέπουν να απαντήσεις ποια χρήση τέμνει ποια ζώνη. Δεν πρέπει να το διαβάσεις ως πλήρες landuse layer.

```python
overlay = gpd.overlay(clipped, protected, how="intersection")
overlay["area_m2"] = overlay.geometry.area
```

Το output geometry είναι η πραγματική τομή. Τα attributes `landuse` και `zone_name` συνδυάζονται, ώστε να μπορείς να ομαδοποιήσεις την προστατευόμενη έκταση ανά χρήση γης.

## Πρακτική / αναμενόμενο αποτέλεσμα

Περίμενε τουλάχιστον ένα overlap με θετικό area. Οι γεωμετρίες μπορεί να είναι Polygon ή MultiPolygon.

## QA

Έλεγξε ότι overlay bounds περιέχονται στη study area, ότι όλα τα geometries είναι valid και ότι το συνολικό overlay area δεν ξεπερνά το clipped area.

## Πρόσεξε

Το `how="intersection"` δεν είναι ίδιο με ένα spatial join. Εδώ οι geometries κόβονται και τα attributes συνδυάζονται.

Σε overlay ένα input feature μπορεί να τέμνεται από πολλά features του άλλου layer και να δώσει πολλές output rows. Τα attributes και από τις δύο πλευρές μπορεί να έχουν παρόμοια names και να εμφανιστούν με suffixes. Μην υποθέσεις ότι το geometry type έμεινε ίδιο: έλεγξε `geom_type`, empty/invalid geometries και το νόημα κάθε output row.

## Επόμενο βήμα

Θα εξετάσεις geometry προβλήματα που μπορεί να εμφανιστούν.
