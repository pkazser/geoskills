# 7. Geometry QA

## Τι θα μάθεις

Θα προστατεύσεις το workflow από invalid και empty geometries.

## Checklist

## Γιατί χρειάζονται πολλοί έλεγχοι

Το `is_valid` ελέγχει τεχνική εγκυρότητα, το `is_empty` αν υπάρχει πραγματική έκταση, το CRS τις μονάδες και το bounds τη θέση. Multipart geometry μπορεί να είναι απολύτως σωστή, αν ταιριάζει στο αποτέλεσμα της τομής.

```python
assert frame.geometry.notna().all()
assert frame.geometry.is_empty.sum() == 0
assert frame.geometry.is_valid.all()
assert frame.crs.to_epsg() == 2100
```

Μετά από overlay έλεγξε επίσης geometry types, rows και bounds. Multipart geometries δεν είναι απαραίτητα σφάλμα· σημασία έχει να συμφωνούν με το ερώτημα.

## Πρακτική

Εφάρμοσε τους ελέγχους σε `study`, `clipped` και `overlay`. Αν εμφανιστεί invalid geometry, σταμάτησε και τεκμηρίωσε τη διόρθωση πριν συνεχίσεις.

## Οπτικός έλεγχος

Κάνε plot τα τρία layers με διαφορετικά χρώματα. Η overlay geometry πρέπει να βρίσκεται ακριβώς στην κοινή περιοχή, όχι απλώς κοντά στα inputs.

Invalid polygons μπορεί να έχουν self-intersections ή προβληματικά boundaries και να επηρεάσουν overlay. Πολύ μικρά sliver polygons μπορεί να δημιουργηθούν από μικρές ασυμφωνίες boundaries. Το `make_valid()` δεν είναι μηχανικό κουμπί: πρώτα εντόπισε το πρόβλημα, κατέγραψε τι άλλαξε και ξαναέλεγξε geometry type, rows και area.

## Επόμενο βήμα

Θα προσθέσεις area fields και θα κάνεις export.
