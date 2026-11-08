# 3. Ανάγνωση layer

## Τι θα μάθεις

Θα διαβάσεις ένα συγκεκριμένο layer και θα πάρεις την πρώτη εικόνα του.

## Τι πρόβλημα λύνουμε

Μετά την ανακάλυψη θέλουμε να εργαστούμε σε συγκεκριμένο layer, όχι σε αόριστο αρχείο. Η επιλογή layer καθορίζει ποια schema και geometry θα αξιολογήσουμε.

```python
parks = gpd.read_file(gpkg_path, layer="parks")
water = gpd.read_file(gpkg_path, layer="water_points")
print(parks.head())
print("Rows:", len(parks))
```

Κάθε ανάγνωση επιστρέφει `GeoDataFrame`. Κρατάμε χωριστά τα `parks` και `water`, επειδή τα layers έχουν διαφορετικό geometry type και schema.

## Πρώτος έλεγχος

```python
print(parks.columns)
print(parks.crs)
print(parks.geometry.geom_type.value_counts())
print(water.columns)
print(water.crs)
print(water.geometry.geom_type.value_counts())
```

Πρόβλεψε 3 Polygon features στο `parks` και 3 Point features στο `water_points` (τη μεταβλητή `water` στον κώδικα). Αν το output διαφέρει, σταμάτησε και έλεγξε το layer και το dataset αντί να προσαρμόσεις αυθαίρετα την προσδοκία.

## Επόμενο βήμα

Θα εξετάσουμε το schema των attributes.

## Γιατί είναι χρήσιμο

Η ανάγνωση layer είναι η μετάβαση από «ένα αρχείο» σε συγκεκριμένα features. Κάθε επόμενος έλεγχος πρέπει να γίνεται στο layer που πραγματικά θα χρησιμοποιήσεις.

## Πρακτική εκτέλεση

```python
parks = gpd.read_file(gpkg_path, layer="parks")
water = gpd.read_file(gpkg_path, layer="water_points")
print(parks.shape)
print(parks.head(2))
print(water.shape)
print(water.head(2))
```

Περιμένουμε 3 rows και geometry τύπου Polygon. Αν ο αριθμός ή ο τύπος διαφέρει, δεν συνεχίζουμε με assumptions.

## QA check

```python
assert len(parks) == 3
assert parks.geometry.notna().all()
assert len(water) == 3
assert water.geometry.notna().all()
```

Το `read_file()` περιμένει path και συγκεκριμένο layer name και επιστρέφει `GeoDataFrame`. Το ότι η ανάγνωση πέτυχε δεν σημαίνει ότι επέλεξες το σωστό layer. Σύγκρινε το όνομα με το αποτέλεσμα του `list_layers()` και κράτησε χωριστά τα `parks` και `water_points`, επειδή έχουν διαφορετικές geometry και πιθανόν διαφορετικά attributes.
