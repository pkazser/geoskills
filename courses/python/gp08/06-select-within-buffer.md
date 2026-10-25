# 6. Επιλογή μέσα σε buffer

## Τι θα μάθεις

Θα εντοπίζεις υπηρεσίες που βρίσκονται μέσα σε ζώνη επιρροής.

## Κώδικας

## Τι αλλάζει στο αποτέλεσμα

Το spatial join διατηρεί τα points και προσθέτει buffer attributes. Αν ένα point βρίσκεται σε δύο buffers, μπορεί να εμφανιστεί δύο φορές. Για μοναδικές υπηρεσίες χρησιμοποίησε `nunique`, όχι απλό row count.

```python
near_school = gpd.sjoin(
    services_m,
    school_buffers[["service_id", "geometry"]],
    how="inner",
    predicate="within",
)
```

Τα services είναι το left dataset και οι buffers το right. Με `within` κρατάς points που βρίσκονται μέσα σε polygon buffer.

## Εφαρμογή

Εφάρμοσε το στο dataset και δες αν κάποια άλλη υπηρεσία βρίσκεται σε ακτίνα 500 m από σχολείο. Το αποτέλεσμα μπορεί να έχει περισσότερες από μία εγγραφές αν ένα service βρίσκεται σε δύο buffers.

## QA

Έλεγξε ότι όλα τα matched points είναι `Point`, ότι το CRS είναι ίδιο και ότι κάθε match έχει valid `service_id` και buffer ID. Μην εξισώνεις το πλήθος matches με το πλήθος μοναδικών υπηρεσιών χωρίς `nunique()`.

Πρώτα διατύπωσε το ερώτημα: “ποια features βρίσκονται μέσα στη ζώνη 500 m από σχολείο;”. Μετά χρησιμοποίησε spatial relationship, όχι απλό attribute filter. Το αποτέλεσμα μπορεί να έχει λιγότερα rows και να κρατά attributes από τα selected features· έλεγξε predicate, CRS και unmatched/empty αποτέλεσμα.

## Επόμενο βήμα

Θα οργανώσεις το QA και τη διάλυση buffers.
