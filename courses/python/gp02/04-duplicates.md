# 4. Διπλότυπα και μοναδικά IDs

## Τι θα μάθεις

Θα εντοπίσεις επαναλαμβανόμενες εγγραφές χωρίς να διαγράψεις δεδομένα στα τυφλά.

```python
df["observation_id"].duplicated().sum()
df[df["observation_id"].duplicated(keep=False)]
```

Το `keep=False` εμφανίζει όλες τις γραμμές που συμμετέχουν σε διπλότυπο.

## Κανόνας επιλογής

Αν δύο εγγραφές έχουν το ίδιο ID, πρώτα ελέγχουμε αν είναι πλήρως ίδιες. Για το εκπαιδευτικό dataset οι δύο `O04` είναι ίδιες σε όλα τα πεδία, οπότε επιτρέπεται να κρατήσουμε την πρώτη. Αν οι τιμές διέφεραν, θα σταματούσαμε πριν από τη διαγραφή και θα τεκμηριώναμε σύγκριση πηγής, timestamp ή πληρότητας.

```python
duplicate_ids = clean.loc[clean["observation_id"].duplicated(keep=False), "observation_id"].unique()
for observation_id in duplicate_ids:
    group = clean[clean["observation_id"] == observation_id]
    if len(group.drop_duplicates()) != 1:
        raise ValueError(f"Σύγκρουση δεδομένων για ID {observation_id}")
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

Μην χρησιμοποιείς `drop_duplicates()` χωρίς `subset` ως υποκατάστατο του ελέγχου IDs: αυτό ελέγχει πλήρως ίδιες γραμμές και όχι το αν κάθε ID είναι μοναδικό. Εδώ, μετά τον έλεγχο σύγκρουσης, ο κανόνας `keep="first"` είναι τεκμηριωμένη παραδοχή του συγκεκριμένου συνθετικού dataset.

## QA check

```python
clean = clean.drop_duplicates("observation_id", keep="first")
assert clean["observation_id"].is_unique
assert len(clean) == 8
```

## Επόμενο βήμα

Θα ελέγξουμε αν οι συντεταγμένες βρίσκονται σε λογικά όρια.
