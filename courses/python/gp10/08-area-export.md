# 8. Area, επικάλυψη και round-trip export

## Στόχος

Θα μετρήσεις σωστά την κοινή έκταση και θα παραδώσεις επαναχρησιμοποιήσιμο output.

Τα L01 και L02 επικαλύπτονται. Υπολόγισε χωριστά: (α) άθροισμα των επιμέρους areas, (β) area της γεωμετρικής ένωσης, (γ) διαφορά τους ως πιθανή διπλομέτρηση. Μην αφαιρέσεις σιωπηλά την επικάλυψη.

```python
landuse_union_area = clipped.geometry.union_all().area
overlay.to_file("gp10_results.gpkg", layer="landuse_protected", driver="GPKG")
```

Μετά το export επαναφόρτωσε το layer και σύγκρινε rows, columns, CRS, geometry types, bounds και area totals.

## Checkpoint

Το περίπου αναμενόμενο clipped component sum είναι 32.625.191 m² και το union περίπου 30.760.987 m². Για το protected overlay τα αντίστοιχα μεγέθη είναι περίπου 13.048.923 m² και 11.184.729 m². Χρησιμοποίησέ τα ως έλεγχο τάξης μεγέθους, όχι ως άκαμπτη ισότητα.
