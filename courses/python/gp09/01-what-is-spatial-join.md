# 1. Τι είναι spatial join

## Στόχος

Θα προσθέσεις σε κάθε σημείο υπηρεσίας τα γνωρίσματα του polygon που το περιέχει, χωρίς να αλλάξεις τη geometry του σημείου.

## Πρόβλεψε → Εκτέλεσε → Έλεγξε

Πριν τον κώδικα γράψε: «σε ποιον διοικητικό τομέα βρίσκεται κάθε υπηρεσία;». Το spatial join μεταφέρει attributes λόγω θέσης· δεν δημιουργεί κομμένη geometry.

```python
joined = gpd.sjoin(services, districts, how="left", predicate="within")
```

Έλεγξε πριν και μετά rows, CRS, τύπους geometry και null `district_id`. Το καθοδηγούμενο αποτέλεσμα είναι 6 left rows, 5 matched services και η S06 unmatched.

## Συνηθισμένο λάθος

Η απουσία exception δεν αποδεικνύει σωστό predicate. Έλεγξε και τον χάρτη.

## Checkpoint και μετάβαση

Κατέγραψε πριν/μετά rows και εξήγησε γιατί η geometry παραμένει Point. Αν όλα είναι null, έλεγξε πρώτα CRS, bounds και τη σειρά left/right. Στο επόμενο κεφάλαιο θα συγκρίνεις spatial και attribute join.
