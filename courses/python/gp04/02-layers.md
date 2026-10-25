# 2. Layers και περιεχόμενο

## Τι θα μάθεις

Θα εντοπίσεις τα διαθέσιμα layers του GeoPackage.

## Τι πρόβλημα λύνουμε

Πριν από `read_file` χρειάζεται κατάλογος περιεχομένων. Η ανακάλυψη layers αποφεύγει λάθος assumptions και επιτρέπει να σχεδιάσεις το επόμενο inspection workflow.

```python
layers = gpd.list_layers(gpkg_path)
print(layers)
```

Η ακριβής εμφάνιση εξαρτάται από την έκδοση των βιβλιοθηκών, αλλά πρέπει να μπορείς να δεις τα ονόματα και τους βασικούς τύπους γεωμετρίας.

## Εναλλακτικός έλεγχος

Αν το `list_layers()` δεν είναι διαθέσιμο στο περιβάλλον, μπορείς να δοκιμάσεις τα γνωστά layer names με `gpd.read_file()` και να ελέγξεις το αποτέλεσμα.

## GeoTip

Το όνομα `parks` ή `water_points` είναι metadata του αρχείου. Δεν είναι όνομα στήλης.

## Γιατί είναι χρήσιμο

Η λίστα layers είναι ο κατάλογος περιεχομένων του GeoPackage. Χωρίς αυτήν κινδυνεύεις να διαβάσεις λάθος layer ή να υποθέσεις ότι το αρχείο περιέχει θεματικά δεδομένα που δεν υπάρχουν.

## Αναμενόμενο αποτέλεσμα

```python
layers = gpd.list_layers(gpkg_path)
print(layers["name"].tolist())
```

Πρέπει να δεις `parks` και `water_points`. Παρατήρησε ότι τα layers έχουν διαφορετικό geometry type: Polygon και Point.

## Πρόσεξε

Το `list_layers()` χρειάζεται σύγχρονο GeoPandas/pyogrio περιβάλλον. Αν αποτύχει, το πρόβλημα είναι δυνατότητα του περιβάλλοντος και όχι απαραίτητα του GeoPackage. Συνέχισε με γνωστά layer names και έλεγξε το αποτέλεσμα.

## QA checkpoint

```python
assert {"parks", "water_points"}.issubset(set(layers["name"]))
```

## Αναμενόμενο αποτέλεσμα και ερμηνεία

Το `parks` είναι Polygon layer και το `water_points` Point layer. Δεν αρκεί να δεις τα ονόματα· ο geometry type είναι ήδη χρήσιμη πληροφορία για τα επόμενα QA checks.

Η ανακάλυψη προηγείται του `read_file(..., layer=...)` επειδή τα layer names ανήκουν στο συγκεκριμένο container. Αν γράψεις όνομα που δεν υπάρχει, θα πάρεις error· αν διαβάσεις άλλο layer, μπορεί να πάρεις έγκυρο αλλά άσχετο αποτέλεσμα. Τα πολλά shapefiles απαιτούν πολλά αρχεία και sidecar files, ενώ το GeoPackage τα οργανώνει σε ένα container.
