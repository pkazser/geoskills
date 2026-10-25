# 1. Από CSV σε GIS dataset

## Τι θα μάθεις

Το CSV είναι πίνακας τιμών. Για να γίνει GIS dataset χρειάζεται geometry και CRS.

## Τι πρόβλημα λύνουμε

Ένα CSV μπορεί να περιέχει coordinates αλλά δεν περιέχει ακόμη geometry ή CRS. Πριν το μετατρέψουμε, συμφωνούμε ποια πεδία είναι ταυτότητα, περιγραφή, longitude και latitude.

## Νοητικό μοντέλο και QA

Οι γραμμές είναι assets και οι στήλες η περιγραφή τους. Το GeoDataFrame θα προσθέσει geometry χωρίς να αφαιρέσει τα attributes. Έλεγξε `shape`, `dtypes`, missing values και μοναδικότητα `asset_id` πριν συνεχίσεις.

```python
import pandas as pd

df = pd.read_csv("../../../downloads/python/data/gp03/city_assets.csv")
print(df.columns)
print(df.dtypes)
```

Τα `asset_id`, `asset_type` και `condition` είναι περιγραφικά πεδία. Τα `longitude` και `latitude` είναι οι είσοδοι για τη geometry.

## Η νοητική μετατροπή

```text
γραμμή CSV
    ↓
attribute row + Point geometry + CRS
    ↓
GIS feature
```

## Checkpoint

Πριν συνεχίσεις, βρες ποια στήλη είναι μοναδικό ID και ποια πεδία θα χρησιμοποιήσεις για X και Y.

## Γιατί είναι χρήσιμο

Σε πραγματικό GIS workflow το schema είναι το συμβόλαιο ανάμεσα στην πηγή και στον κώδικα. Αν αλλάξει το όνομα `longitude` σε `lon`, ο κώδικας μπορεί να σταματήσει ή να χρησιμοποιήσει λάθος στήλη.

## Πρακτική εκτέλεση

```python
required = {"asset_id", "asset_type", "condition", "longitude", "latitude"}
assert required.issubset(df.columns)
assert df["asset_id"].is_unique
```

Το `required.issubset()` ελέγχει ότι υπάρχουν όλα τα απαραίτητα πεδία. Έτσι αποτυγχάνουμε νωρίς, πριν δημιουργήσουμε geometry.

## Αναμενόμενο αποτέλεσμα

Το `city_assets.csv` έχει 8 rows, 5 στήλες και καθόλου missing values. Αυτή είναι η βάση για το επόμενο βήμα.

## Τι σημαίνει schema στην πράξη;

Το schema είναι η συμφωνία για το όνομα, τον τύπο και το νόημα κάθε πεδίου. Για να γίνει ένα row Point χρειαζόμαστε τουλάχιστον ένα αναγνωριστικό και δύο συντεταγμένες. Το `longitude` είναι X και το `latitude` είναι Y· ένα πεδίο `location` με κείμενο δεν αρκεί χωρίς επιπλέον parsing.

Μικρό checkpoint: αν το CSV έχει 25 rows αλλά το τελικό GeoDataFrame έχει 24, δεν είναι απλώς “νέος αριθμός”. Πρέπει να ξέρεις ποιο row χάθηκε και αν το schema ή η ποιότητα των coordinates το δικαιολογεί.
