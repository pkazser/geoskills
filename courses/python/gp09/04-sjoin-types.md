# 4. `gpd.sjoin()` και join types

## Στόχος

Θα επιλέγεις `left` όταν πρέπει να κρατήσεις όλο το inventory και `inner` όταν χρειάζεσαι μόνο matched σχέσεις.

```python
joined_left = gpd.sjoin(services, districts, how="left", predicate="within")
joined_inner = gpd.sjoin(services, districts, how="inner", predicate="within")
```

Πρόβλεψε: το left διατηρεί τη S06 με null district, ενώ το inner κρατά 5 rows για το συγκεκριμένο dataset. Σύγκρινε `len`, `isna()` και unique `service_id`. Το `how` είναι απόφαση ανάλυσης.

## Γιατί έχει σημασία

Το `left` είναι κατάλληλο για έλεγχο πληρότητας, ενώ το `inner` για καθαρό matched subset. Αν χρησιμοποιήσεις μόνο inner, μπορεί να μη δεις ότι έχασες υπηρεσία. Επόμενο βήμα: θα εξετάσεις αν μια σχέση μπορεί να δώσει περισσότερες γραμμές.
