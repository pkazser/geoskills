# 4. Schema και attributes

## Τι θα μάθεις

Θα καταλάβεις ποιες στήλες περιγράφουν κάθε feature.

```python
print(parks.dtypes)
print(parks.isna().sum())
print(parks["name"].unique())
print(water.dtypes)
print(water.isna().sum())
print(water["status"].unique())
```

Τα attributes απαντούν στο «τι είναι» κάθε γεωμετρία. Η geometry απαντά στο «πού είναι».

## Νοητικό μοντέλο

Το schema είναι το λεξιλόγιο κάθε layer. Στα `parks`, το `name` αναγνωρίζει και το `area_ha` μετρά· στα `water_points`, το `status` περιγράφει την κατάσταση. Πριν από filtering πρέπει να γνωρίζεις units, missing values και types.

## Missing values

Μια κενή περιγραφή δεν σημαίνει απαραίτητα άκυρη geometry. Καταγράφουμε τα κενά και αποφασίζουμε ανάλογα με το ερώτημα.

## Checkpoint

Βρες ποια στήλη μπορεί να χρησιμοποιηθεί για φιλτράρισμα των πάρκων.

## Γιατί είναι χρήσιμο

Το schema απαντά τι μπορείς να ρωτήσεις. Στο `parks`, το `area_ha` επιτρέπει φίλτρο μεγέθους και το `name` βοηθά στην ερμηνεία του αποτελέσματος.

## Πρακτική εκτέλεση

```python
print(parks[["name", "area_ha"]])
print(parks["area_ha"].describe())
```

Θα δεις τρία πάρκα με διαφορετικό εμβαδόν. Δεν αρκεί να ξέρεις ότι υπάρχει στήλη· πρέπει να γνωρίζεις και τις μονάδες της.

## QA checkpoint

```python
assert parks["name"].notna().all()
assert parks["area_ha"].notna().all()
assert (parks["area_ha"] > 0).all()
```

Αυτά τα checks αποδεικνύουν ότι το attribute είναι διαθέσιμο και θετικό, όχι ότι το polygon είναι χωρικά σωστό. Για αυτό χρειάζονται CRS, bounds, validity και map.

Το schema είναι πρακτική περιγραφή του layer: field names, dtypes, ενεργή geometry column και CRS. Η geometry πληροφορία απαντά “πού και με ποιο σχήμα βρίσκεται το feature”, ενώ τα attributes απαντούν “τι γνωρίζουμε γι’ αυτό”. Ένα polygon park χωρίς αξιόπιστο `area_ha` δεν είναι έτοιμο για summary μόνο και μόνο επειδή η geometry είναι valid.
