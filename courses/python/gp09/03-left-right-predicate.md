# 3. Left/right και predicates

## Στόχος

Θα επιλέγεις ποιο dataset προστατεύεις και ποια σχέση περιγράφει το ερώτημα.

Με `services` ως left και `districts` ως right, το `within` ρωτά αν κάθε point βρίσκεται μέσα σε polygon. Το `contains` είναι η αντίστροφη διατύπωση από την πλευρά του polygon. Το `intersects` είναι ευρύτερο και περιλαμβάνει επαφή ορίων.

```python
joined = gpd.sjoin(services, districts, how="left", predicate="within")
```

Ελεγχόμενη άσκηση: άλλαξε μόνο νοητικά left/right και πρόβλεψε ποια geometry θα διατηρηθεί. Έλεγξε bounds και CRS πριν δοκιμάσεις άλλη πράξη.

## Συνηθισμένα λάθη

Το `contains` δεν είναι απλώς εναλλακτικό όνομα του `within`: εξαρτάται από το ποιο layer είναι αριστερά. Checkpoint: γράψε με μία πρόταση ποιο layer προστατεύεις και ποιο attribute μεταφέρεις.
