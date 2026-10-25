# 7. Export σε GeoJSON

## Τι θα μάθεις

Θα αποθηκεύσεις το GeoDataFrame σε ένα φορητό γεωχωρικό format.

## Τι πρόβλημα λύνουμε

Το GeoJSON είναι χρήσιμο για ανταλλαγή ενός layer, αλλά το export μπορεί να αλλάξει types ή CRS representation. Για αυτό γράφουμε, ξαναδιαβάζουμε και συγκρίνουμε.

## QA

Σύγκρινε rows, βασικά columns, geometry types, CRS και bounds του `check` με το αρχικό `gdf`. Η απουσία exception δεν αρκεί για επιτυχημένο export.

```python
from pathlib import Path

output_dir = Path("outputs/gp03")
output_dir.mkdir(parents=True, exist_ok=True)
geojson_path = output_dir / "city_assets.geojson"
gdf.to_file(geojson_path, driver="GeoJSON")
```

## Επαλήθευση

```python
check = gpd.read_file(geojson_path)
assert len(check) == len(gdf)
assert check.crs is not None
print(check.head())
```

Το export δεν ολοκληρώνεται παιδαγωγικά αν δεν ξαναδιαβάσουμε το αρχείο.

## Γιατί είναι χρήσιμο

Το GeoJSON είναι εύκολο να μοιραστείς και να ανοίξεις σε πολλές εφαρμογές. Είναι κατάλληλο για μικρά datasets και ανταλλαγή, όχι πάντα για μεγάλα ή πολυεπίπεδα έργα.

## Αναμενόμενο αποτέλεσμα

Το `check` πρέπει να έχει 8 features, Points και CRS. Αν το αρχείο ανοίγει αλλά έχει 0 rows ή λείπει το CRS, το export δεν είναι επιτυχές.

## Checkpoint

Πρόσθεσε έλεγχο ότι `check["asset_id"]` είναι μοναδικό και ότι τα bounds του `check` είναι ίδια με του `gdf`.

Το GeoJSON είναι πρακτικό για ελαφρύ, portable exchange ενός ή λίγων layers, αλλά μπορεί να γίνει μεγάλο και δεν είναι container πολλών θεματικών layers. Για ένα οργανωμένο GIS workflow, το GeoPackage συνήθως κρατά πολλά layers σε ένα αρχείο και αποφεύγει τη διάσπαση σε πολλά παράλληλα αρχεία.
