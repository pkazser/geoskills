# 5. One-to-many και duplicates

## Στόχος

Θα διακρίνεις πραγματικές πολλαπλές αντιστοιχίσεις από λάθη δεδομένων.

```python
matched = joined_left.dropna(subset=["district_id"])
matches_per_service = matched.groupby("service_id").size()
all_match_counts = matches_per_service.reindex(services["service_id"], fill_value=0)
```

Στα τρέχοντα districts τα polygons δεν επικαλύπτονται, άρα αναμένεις το πολύ μία πραγματική αντιστοίχιση ανά matched service. Η S06 διατηρεί μία left row στο `joined_left`, αλλά έχει μηδέν spatial matches. Ξεχώρισε: rows του left join, matched rows, μοναδικές υπηρεσίες και πραγματικό πλήθος αντιστοιχίσεων. Αυτό δεν σημαίνει ότι το spatial join είναι πάντα one-to-one. Δείξε την έννοια με μικρό in-memory παράδειγμα δύο overlapping polygons, χωρίς αλλαγή του dataset.

Μην χρησιμοποιήσεις `drop_duplicates()` χωρίς να εξηγήσεις ποια πληροφορία χάνεται και ποιος κανόνας το δικαιολογεί.

## Checkpoint

Σύγκρινε `len(joined_left)`, `len(matched)`, `matched["service_id"].nunique()` και τα `all_match_counts`. Η αύξηση rows είναι αποτέλεσμα σχέσης μόνο όταν μπορείς να δείξεις τις αντίστοιχες geometries και attributes.
