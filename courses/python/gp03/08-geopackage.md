# 8. Export σε GeoPackage

## Τι θα μάθεις

Το GeoPackage μπορεί να φιλοξενήσει πολλά layers σε ένα αρχείο.

## Τι πρόβλημα λύνουμε

Το GeoPackage είναι κατάλληλο για οργανωμένη GIS εργασία, επειδή κρατά layers, attributes και spatial metadata σε ένα container. Το `layer` ονομάζει ρητά το αποτέλεσμα.

## QA και επιλογή format

Ξαναδιάβασε το layer και έλεγξε rows, columns, geometry, CRS και bounds. GeoJSON προτιμάται για απλή ανταλλαγή ενός layer· GeoPackage όταν αναμένεις πολλαπλά layers ή επαναχρησιμοποίηση σε GIS project.

```python
gpkg_path = output_dir / "city_assets.gpkg"
gdf.to_file(gpkg_path, layer="assets", driver="GPKG")
```

## Έλεγχος layer

```python
check = gpd.read_file(gpkg_path, layer="assets")
print(check.crs)
print(check.geometry.geom_type.value_counts())
```

Το όνομα του layer είναι μέρος του workflow και πρέπει να είναι σαφές.

## GeoTip

Το GeoJSON είναι απλό για ανταλλαγή. Το GeoPackage είναι πρακτικό όταν θέλεις ένα αρχείο με περισσότερα layers και GIS metadata.

## Γιατί είναι χρήσιμο

Το GeoPackage είναι χρήσιμο όταν ένα project έχει πολλά θεματικά layers, κοινό CRS και ανάγκη για ένα ενιαίο αρχείο. Το layer name `assets` επιτρέπει σε άλλο χρήστη να καταλάβει τι διαβάζει.

## Πρακτική επαλήθευση

```python
print(gpd.list_layers(gpkg_path))
assert "assets" in gpd.list_layers(gpkg_path)["name"].tolist()
```

Αν το περιβάλλον δεν υποστηρίζει `list_layers()`, διάβασε το layer με το γνωστό όνομα και έλεγξε rows, CRS και geometry type.

## Πρόσεξε

Μην αντικαθιστάς ένα GeoPackage χωρίς να ελέγξεις αν περιέχει άλλα layers. Το όνομα του αρχείου δεν αρκεί για να γνωρίζεις το περιεχόμενό του.

Ο `driver="GPKG"` λέει στον GeoPandas ποιο format να γράψει, ενώ το `layer=` ονομάζει το layer μέσα στο container. Μετά το export χρησιμοποίησε `gpd.list_layers()` ή `gpd.read_file(..., layer="assets")` για να ελέγξεις ότι το layer υπάρχει, έχει το αναμενόμενο πλήθος, CRS, geometry type και attributes. Ένα αρχείο που δημιουργήθηκε χωρίς exception δεν είναι ακόμη επαληθευμένο output.
