# 2. Ανάγνωση και schema

## Τι θα μάθεις

Θα φορτώσεις το CSV και θα ελέγξεις ότι τα δεδομένα έχουν τη μορφή που περιμένεις.

## Τι πρόβλημα λύνουμε

Το `read_csv()` μπορεί να διαβάσει ένα αρχείο χωρίς να καταλάβει αν το delimiter, το encoding και οι τύποι είναι αυτοί που περιμένουμε. Η πρώτη ανάγνωση πρέπει να παράγει μικρό report, όχι απλή εμφάνιση των πρώτων γραμμών.

```python
df = pd.read_csv("../../../downloads/python/data/gp03/city_assets.csv")
print("Rows:", len(df))
print("Columns:", list(df.columns))
print(df.head())
```

## Βασικοί έλεγχοι

Αν βλέπεις μία μόνο στήλη, πιθανότατα χρησιμοποιήθηκε λάθος delimiter. Αν τα ελληνικά εμφανίζονται αλλοιωμένα, έλεγξε encoding πριν καθαρίσεις τιμές. Οι coordinates πρέπει να είναι numeric ή να μετατραπούν ρητά, ενώ τα `asset_id` πρέπει να είναι unique.

```python
print(df.isna().sum())
print(df["asset_type"].value_counts())
print(df["condition"].value_counts())
```

Ένα schema check προστατεύει από λάθος filename, αλλαγμένο όνομα στήλης ή κενές απαραίτητες τιμές.

## GeoTip

Μην υποθέτεις ότι επειδή ένα CSV ανοίγει, είναι έτοιμο για GIS. Το `DataFrame` δεν έχει geometry ούτε CRS.

## Encoding και delimiter

Τα περισσότερα CSV χρησιμοποιούν comma ως delimiter, αλλά αρχεία από λογιστικά φύλλα μπορεί να χρησιμοποιούν `;`. Αν οι στήλες εμφανιστούν όλες μαζί σε μία στήλη, δοκίμασε να ελέγξεις το delimiter:

```python
df = pd.read_csv("../../../downloads/python/data/gp03/city_assets.csv", sep=",")
```

Σε ελληνικά δεδομένα μπορεί να χρειαστεί και `encoding="utf-8"`. Δεν αλλάζουμε αυτές τις παραμέτρους τυχαία· τις επιβεβαιώνουμε από την πηγή.

## QA checkpoint

```python
assert len(df) == 8
assert df.isna().sum().sum() == 0
assert {"longitude", "latitude"}.issubset(df.columns)
```

Αν οι έλεγχοι αποτύχουν, σταματάς στο CSV στάδιο και δεν προχωράς σε GIS conversion.

Το `read_csv()` περιμένει tabular input και επιστρέφει `DataFrame`, όχι geometry. Αν το delimiter είναι λάθος, μπορεί να πάρεις μία μόνο column· αν το encoding είναι λάθος, μπορεί να χαθούν ελληνικοί χαρακτήρες. Πριν από spatial conversion σύγκρινε `shape`, `columns`, `dtypes`, missing values και ένα `head()`. Αν η πρώτη γραμμή φαίνεται ως μία μεγάλη επικεφαλίδα, διόρθωσε την ανάγνωση πριν συνεχίσεις.
