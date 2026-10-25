# 3. Left/right και predicates

## Τι θα μάθεις

Θα επιλέγεις ποιο dataset προστατεύεις και ποια χωρική σχέση ζητάς.

## Οι ρόλοι

## Πώς επιλέγω predicate

`within` είναι φυσικό για points μέσα σε polygons. `contains` είναι η αντίστροφη διατύπωση όταν ελέγχεις polygon προς point. `intersects` είναι ευρύτερο και περιλαμβάνει επαφή ορίων. Η επιλογή πρέπει να περιγράφει το ερώτημα.

Το left dataset είναι συνήθως τα features που θέλεις να μετρήσεις ή να κρατήσεις. Το right dataset παρέχει τα attributes. Με `within`, ένα point πρέπει να βρίσκεται μέσα σε polygon. Με `contains`, αντιστρέφεις τη λογική από την πλευρά του polygon. Με `intersects`, αρκεί να υπάρχει επαφή.

```python
gpd.sjoin(services, districts, how="left", predicate="within")
```

## Εφαρμογή

Χρησιμοποίησε services ως left και districts ως right. Δοκίμασε νοητικά τι θα συνέβαινε αν τα αντάλλασσες χωρίς να αλλάξεις predicate.

## QA / λάθος

Έλεγξε matched IDs σε map. Αν όλα είναι unmatched, έλεγξε CRS, σειρά datasets και αν τα points πέφτουν πραγματικά μέσα στα polygons.

Στη συνηθισμένη περίπτωση `points = left` και `polygons = right`: κρατάμε τη geometry των points και μεταφέρουμε από τα polygons πεδία όπως `zone_name`. Το `within` ρωτά αν κάθε left point βρίσκεται μέσα σε right polygon. Το αντίστροφο ερώτημα είναι `polygon.contains(point)`. Το `intersects` είναι πιο γενικό: περιλαμβάνει επαφή, επικάλυψη ή containment, όχι μόνο “μέσα”.

## Επόμενο βήμα

Θα συγκρίνεις `left` και `inner` join types.
