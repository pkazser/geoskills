# 5. Αριθμητικά ranges

## Τι θα μάθεις

Θα επιλέγεις τιμές μέσα σε διάστημα χωρίς δύσκολες διπλές συνθήκες.

## Παράδειγμα

## Checkpoint ερμηνείας

Το `between(75, 100)` περιλαμβάνει τα άκρα. Πριν συνδυάσεις το range με status ή geometry, έλεγξε min/max του source και count μετά από κάθε predicate. Ένα μηδενικό αποτέλεσμα μπορεί να είναι σωστό ή να δείχνει λάθος threshold.

```python
good_scores = gdf[gdf["score"].between(75, 95)]
```

Το `between` περιλαμβάνει τα άκρα από προεπιλογή. Για σύνθετο φίλτρο το συνδυάζεις με `&`.

## Εφαρμογή

Βρες ενεργά parks ή schools με score 75–100:

```python
target = gdf[gdf.status.eq("active") &
             gdf.asset_type.isin(["park", "school"]) &
             gdf.score.between(75, 100)]
```

## Αναμενόμενο αποτέλεσμα / QA

Το target περιέχει F01, F02 και F06. Έλεγξε τα IDs, το min/max score και ότι όλα είναι active. Αν πάρεις διαφορετικό αποτέλεσμα, έλεγξε τα όρια και τις τιμές του CSV.

Για range χρησιμοποίησε pandas σύνταξη όπως `(gdf["population"] >= 100) & (gdf["population"] <= 1000)`, όχι Python chained comparison πάνω σε Series. Το αποτέλεσμα πρέπει να ερμηνεύεται μαζί με units και missing values. Αν το range επιστρέψει μηδέν rows, έλεγξε πρώτα τα `min()` και `max()`.

## Επόμενο βήμα

Θα δεις τι γίνεται όταν οι τιμές λείπουν.
