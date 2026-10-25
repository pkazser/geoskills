# 2. Attribute join και spatial join

## Τι θα μάθεις

## Νοητικό μοντέλο

Το attribute join βρίσκει ταίριασμα σε values. Το spatial join υπολογίζει σχέση μεταξύ geometries. Το πρώτο χρειάζεται κοινό key, το δεύτερο σωστό CRS και predicate.

Θα ξεχωρίζεις σύνδεση με κοινό key από σύνδεση με γεωμετρική σχέση.

## Έννοια

Σε attribute join υπάρχει κοινή στήλη, όπως `district_id`. Σε spatial join το key προκύπτει από `within`, `contains` ή `intersects`.

```python
result = gpd.sjoin(points, polygons, predicate="within", how="left")
```

## Πρακτική στο dataset

Οι υπηρεσίες δεν έχουν `district_id`, άρα το spatial join είναι ο κατάλληλος μηχανισμός. Μετά μπορείς να κάνεις κανονικό `groupby` στο αποτέλεσμα.

## QA

Έλεγξε ότι η geometry του service διατηρήθηκε ως `Point` και ότι τα district attributes εμφανίζονται. Μην περιμένεις να αλλάξει η geometry σε polygon: το join συνδέει πληροφορία, δεν κόβει geometry.

## Checkpoint

Ποιο join θα χρησιμοποιούσες αν το CSV είχε ήδη αξιόπιστο `district_id`; Attribute join.

| | Attribute join | Spatial join |
|---|---|---|
| Βάση σύνδεσης | κοινό key/field | χωρική σχέση |
| Geometry | συνήθως διατηρείται | συνήθως διατηρείται του left |
| Attributes | μεταφέρονται βάσει key | μεταφέρονται βάσει predicate |
| Παράδειγμα | `school_id` | point μέσα σε polygon |

Το spatial join δεν είναι παραλλαγή του `merge()`: πρώτα πρέπει να αποφασίσεις ποια geometry σχετίζεται με ποια και με ποιο predicate.

## Επόμενο βήμα

Θα εξετάσεις τις έννοιες left/right και predicate.
