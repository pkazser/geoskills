# 4. Διπλότυπα και μοναδικά IDs

## Τι θα μάθεις

Θα εντοπίσεις επαναλαμβανόμενες εγγραφές χωρίς να διαγράψεις δεδομένα στα τυφλά.

```python
df["observation_id"].duplicated().sum()
df[df["observation_id"].duplicated(keep=False)]
```

Το `keep=False` εμφανίζει όλες τις γραμμές που συμμετέχουν σε διπλότυπο.

## Κανόνας επιλογής

Αν δύο εγγραφές έχουν το ίδιο ID, κρατάμε την πιο πρόσφατη ή την πιο πλήρη μόνο όταν αυτός ο κανόνας τεκμηριώνεται. Για το εκπαιδευτικό dataset θα κρατήσουμε την πρώτη εγγραφή:

```python
clean = clean.drop_duplicates(subset="observation_id", keep="first")
```

## QA

```python
assert clean["observation_id"].is_unique
```

## Τι σημαίνει το αποτέλεσμα

Το μοναδικό ID δεν αποδεικνύει ότι δύο διαφορετικά IDs είναι δύο πραγματικές παρατηρήσεις. Αποδεικνύει μόνο ότι ο συγκεκριμένος κανόνας uniqueness τηρείται. Στο dataset μας ο κανόνας “κρατώ την πρώτη” είναι εκπαιδευτική παραδοχή· σε πραγματικό έργο θα κρατούσαμε timestamp, source και λόγο επιλογής.

### Checkpoint

Μέτρα `before = len(clean)` πριν το `drop_duplicates()` και `after` μετά. Έλεγξε ότι η διαφορά ισούται με τα duplicate IDs που αποφάσισες να αφαιρέσεις.

## Γιατί είναι χρήσιμο

Τα διπλότυπα μπορούν να διπλασιάσουν counts, να επηρεάσουν summary statistics και να κάνουν ένα layer να φαίνεται πυκνότερο από την πραγματικότητα. Το μοναδικό ID είναι συχνά η καλύτερη άμυνα.

## Πρακτική εκτέλεση

```python
duplicates = df[df["observation_id"].duplicated(keep=False)]
print(duplicates[["observation_id", "category", "elevation_m"]])
```

Στο dataset θα δεις δύο ίδιες εγγραφές `O04`. Για το μάθημα κρατάμε την πρώτη, αλλά σε πραγματικό έργο θα ελέγχαμε timestamp, source και πληρότητα.

## Πρόσεξε

Μην χρησιμοποιείς `drop_duplicates()` χωρίς `subset`. Μπορεί να αφαιρέσει γραμμές που έχουν διαφορετικό ID αλλά τυχαία ίδιες τιμές σε άλλα πεδία.

## QA check

```python
clean = clean.drop_duplicates("observation_id", keep="first")
assert clean["observation_id"].is_unique
```

## Επόμενο βήμα

Θα ελέγξουμε αν οι συντεταγμένες βρίσκονται σε λογικά όρια.
