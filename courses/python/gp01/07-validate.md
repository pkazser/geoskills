# 7. Validate — GeoPython QA checks

## Τι θα μάθεις

Το QA σημαίνει Quality Assurance. Δεν αρκεί ο κώδικας να εκτελείται· πρέπει και το αποτέλεσμα να είναι λογικό.

## Τι πρόβλημα λύνουμε

Πριν από export θέλουμε αποδείξεις ότι το input και το subset έχουν τη μορφή που περιμένουμε. Κάθε assertion σταματά το workflow όταν μια υπόθεση παραβιάζεται.

```python
assert len(gdf) > 0, "Δεν υπάρχουν εγγραφές"
assert gdf.geometry.notna().all(), "Υπάρχουν κενές γεωμετρίες"
assert gdf.geometry.geom_type.eq("Point").all(), "Δεν είναι όλα Points"
assert gdf.crs is not None, "Λείπει το CRS"
assert gdf["longitude"].between(-180, 180).all()
assert gdf["latitude"].between(-90, 90).all()
assert len(selected) > 0, "Το φίλτρο δεν επέστρεψε σημεία"
assert (selected["elevation_m"] > 70).all()
assert (selected["status"] == "checked").all()
```

Οι έλεγχοι δεν αποδεικνύουν ότι κάθε σημείο είναι σωστό, αλλά εντοπίζουν προφανή προβλήματα.
Αν ένα `assert` αποτύχει, σταματάμε και διορθώνουμε το πρόβλημα πριν το export.

### Τι αποδεικνύει κάθε check

Το `len` ελέγχει ότι υπάρχει data, το `notna` ότι υπάρχει geometry, το `geom_type` ότι είναι Point, το CRS ότι υπάρχει spatial reference και τα ranges ότι οι coordinates είναι δυνατές. Οι έλεγχοι του selected επιβεβαιώνουν ότι η λογική του φίλτρου εφαρμόστηκε πράγματι.

Πρόσθεσε και `gdf.geometry.is_empty.sum()` όταν το input μπορεί να περιέχει empty geometries.

## Checkpoint

Πρόσθεσε έναν έλεγχο που να επιβεβαιώνει ότι το `selected` δεν είναι κενό.

## Γιατί δεν αρκεί ένα `assert`;

Το `assert len(gdf) > 0` αποδεικνύει ότι υπάρχει data, όχι ότι είναι το σωστό data. Το `geom_type` ελέγχει δομή, όχι θέση. Τα coordinate ranges αποκλείουν αδύνατες τιμές, όχι λάθος χώρα. Γι’ αυτό συνδυάζουμε counts, metadata, attribute rules, bounds και visual QA. Αν αποτύχει check, διάβασε το μήνυμα, εντόπισε ποια υπόθεση παραβιάστηκε και διόρθωσε την αιτία πριν συνεχίσεις.

## Επόμενο βήμα

Μόνο αφού περάσουν οι έλεγχοι θα αποθηκεύσουμε το αποτέλεσμα.
