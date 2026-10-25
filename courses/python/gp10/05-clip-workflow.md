# 5. Workflow με clip

## Τι θα μάθεις

Θα περιορίσεις το land-use layer και θα ελέγξεις τι χάθηκε ή κόπηκε.

## Κώδικας

## QA πριν και μετά

Κατέγραψε rows και area πριν/μετά. Το clipped geometry πρέπει να βρίσκεται στη mask, να είναι valid/non-empty και να κρατά τα landuse attributes. Αν εξαφανιστούν όλα τα features, έλεγξε bounds και CRS.

```python
clipped = gpd.clip(landuse, study)
clipped["area_m2"] = clipped.geometry.area
```

Το `clip` μπορεί να δημιουργήσει περισσότερα τμήματα ή multipart geometry, ανάλογα με την επαφή των features με τη mask. Τα attributes του landuse παραμένουν.

## Εφαρμογή

Κάνε clip και εμφάνισε `landuse_id`, `landuse`, `geometry`. Μέτρα rows πριν/μετά και σύγκρινε το συνολικό area.

## QA

Έλεγξε CRS, feature count, geometry type, validity, empties, bounds και `area_m2 > 0`. Το clipped area πρέπει να είναι μικρότερο ή ίσο με το αρχικό area για κάθε αντίστοιχο feature.

Το before/after count δείχνει πόσα features συμμετείχαν, αλλά δεν αρκεί: σε Lines και Polygons πρέπει να ελέγξεις geometry type, validity, empty geometries, bounds και area/length όπου έχει νόημα. Το clipped dataset πρέπει να βρίσκεται μέσα ή πάνω στα bounds της study area και να διατηρεί τα attributes του input.

## Επόμενο βήμα

Θα χρησιμοποιήσεις το clipped αποτέλεσμα στο overlay.
