# 3. Τύποι δεδομένων

## Τι θα μάθεις

Οι αριθμητικές στήλες πρέπει να είναι αριθμοί. Αν μια longitude είναι κείμενο, οι συγκρίσεις και οι γεωμετρίες μπορεί να αποτύχουν.

```python
df.dtypes
```

## Μετατροπή με έλεγχο

```python
before_missing = clean[["longitude", "latitude", "elevation_m"]].isna().sum()
for column in ["longitude", "latitude", "elevation_m"]:
    clean[column] = pd.to_numeric(clean[column], errors="coerce")
after_missing = clean[["longitude", "latitude", "elevation_m"]].isna().sum()
print("Νέα missing μετά τη μετατροπή:", after_missing - before_missing)
```

Το `errors="coerce"` μετατρέπει μη αναγνώσιμες τιμές σε `NaN`. Αυτό είναι χρήσιμο μόνο αν στη συνέχεια μετρήσουμε και χειριστούμε τα νέα κενά.

```python
clean.isna().sum()
```

## Συνηθισμένο λάθος

Το `"100"` δεν είναι ίδιο με το `100`. Το πρώτο είναι `str`, το δεύτερο `int`.

## Νοητικό μοντέλο και εφαρμογή

Η μετατροπή αλλάζει τον τρόπο με τον οποίο η pandas ερμηνεύει τη στήλη, όχι το νόημα της αρχικής τιμής. Το `not_available` δεν είναι elevation μηδέν. Γι’ αυτό μετράμε τα `NaN` μετά το `coerce` και αποφασίζουμε αν θα αποκλείσουμε τη γραμμή ή θα ζητήσουμε διόρθωση από την πηγή.

## Αναμενόμενο αποτέλεσμα

Οι `longitude` και `latitude` πρέπει να είναι numeric πριν από το `points_from_xy`. Η τιμή `not_available` του `O07` γίνεται ένα νέο `NaN` στο `elevation_m`, όχι έγκυρη μέτρηση. Το `999` παραμένει αριθμητική τιμή, αλλά δεν είναι έγκυρο γεωγραφικό μήκος· αυτό θα το ελέγξεις με bounds.

## Checkpoint

Έλεγξε ότι `longitude`, `latitude` και `elevation_m` είναι αριθμητικές στήλες πριν συνεχίσεις.

## Γιατί είναι χρήσιμο

Οι τύποι επηρεάζουν άμεσα τις συγκρίσεις. Η σύγκριση κειμένου με αριθμό μπορεί να αποτύχει ή να δώσει λάθος λογική. Το ίδιο πρόβλημα θα μεταφερθεί στη δημιουργία geometry και στο filtering.

## Πρακτική εκτέλεση και QA

```python
source_dtype = df["elevation_m"].dtype
converted_dtype = clean["elevation_m"].dtype
new_missing = after_missing - before_missing
print("Πηγή df:", source_dtype, "clean μετά τη μετατροπή:", converted_dtype)
print("Νέα missing:", int(new_missing["elevation_m"]))
```

Η τιμή `not_available` γίνεται `NaN`. Δεν τη μετατρέψαμε αυθαίρετα σε μηδέν· την κάναμε ορατό πρόβλημα. Ο έλεγχος τύπου αποδεικνύει ότι οι επόμενες αριθμητικές πράξεις είναι τεχνικά δυνατές, όχι ότι οι αριθμοί είναι σωστοί.

Στο συγκεκριμένο dataset η διαφορά `after_missing - before_missing` πρέπει να δείχνει ένα νέο `NaN` στο `elevation_m`. Μετράμε τα νέα κενά, όχι μόνο το συνολικό πλήθος μετά τη μετατροπή. Το `df` παραμένει η αμετάβλητη πηγή, ενώ το `clean` είναι το αντίγραφο εργασίας.

```python
for column in ["longitude", "latitude", "elevation_m"]:
    assert pd.api.types.is_numeric_dtype(clean[column])
```

## GeoTip

Το `errors="coerce"` είναι χρήσιμο σε exploratory cleaning, αλλά σε παραγωγικό workflow πρέπει να καταγράφεις πόσες τιμές μετατράπηκαν σε `NaN`.
