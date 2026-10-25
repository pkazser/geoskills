# 5. One-to-many και duplicates

## Τι θα μάθεις

Θα καταλάβεις γιατί ένα spatial join μπορεί να επιστρέψει περισσότερες γραμμές από το left dataset.

## Η αιτία

## QA για duplicates

Σύγκρινε `len(joined)`, `nunique` του left ID και πλήθος matches ανά ID. Αν το row count αυξηθεί, αυτό μπορεί να είναι σωστό one-to-many αποτέλεσμα· μην το κρύψεις με `drop_duplicates` χωρίς κανόνα.

Αν ένα point βρίσκεται σε δύο overlapping polygons, έχει δύο matches. Αν ένα polygon περιέχει πολλά points, το ίδιο polygon attribute επαναλαμβάνεται πολλές φορές. Αυτό δεν είναι απαραίτητα duplicate λάθος· είναι η σχέση.

```python
joined.groupby("service_id").size()
```

## Πρακτική

Μέτρα μοναδικά `service_id` και σύγκρινε με `len(joined)`. Στο τρέχον dataset αναμένεις ένα match ανά matched service, επειδή οι districts δεν επικαλύπτονται.

## QA / λάθος

Μην κάνεις `drop_duplicates()` πριν καταλάβεις γιατί υπάρχουν πολλαπλά matches. Μπορεί να χάσεις πραγματική πληροφορία.

## Checkpoint

Πότε θα κρατούσες one-to-many; Όταν θέλεις να καταγράψεις όλες τις περιοχές που τέμνει ένα feature.

Ένα point μέσα σε ένα polygon συνήθως δίνει μία αντιστοίχιση. Ένα line ή polygon που intersects πολλά polygons μπορεί να εμφανιστεί πολλές φορές. Άρα αύξηση rows μετά το join δεν σημαίνει αυτόματα duplicate error: μέτρα `len(joined)`, `joined[source_id].nunique()` και matches ανά source feature πριν αποφασίσεις.

## Επόμενο βήμα

Θα χειριστείς unmatched features και CRS compatibility.
