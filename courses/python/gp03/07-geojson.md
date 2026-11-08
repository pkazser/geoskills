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

Η κύρια ροή εξάγει το πλήρες `gdf`. Το `assets` από την GP03.5 είναι προαιρετικό υποσύνολο για επίδειξη επιλογής πεδίων και δεν αντικαθιστά το βασικό export.

## Επαλήθευση

```python
geojson_readback = gpd.read_file(geojson_path)
assert len(geojson_readback) == 8
assert geojson_readback["asset_id"].tolist() == gdf["asset_id"].tolist()
assert geojson_readback.geometry.geom_type.eq("Point").all()
assert geojson_readback.crs.to_epsg() == 4326
assert geojson_readback.total_bounds.tolist() == gdf.total_bounds.tolist()
print(geojson_readback.head())
```

Το export δεν ολοκληρώνεται παιδαγωγικά αν δεν ξαναδιαβάσουμε το αρχείο.

## Γιατί είναι χρήσιμο

Το GeoJSON είναι εύκολο να μοιραστείς και να ανοίξεις σε πολλές εφαρμογές. Είναι κατάλληλο για μικρά datasets και ανταλλαγή, όχι πάντα για μεγάλα ή πολυεπίπεδα έργα.

## Αναμενόμενο αποτέλεσμα

Το `geojson_readback` πρέπει να έχει 8 features, Points, τα ίδια IDs και CRS. Αν το αρχείο ανοίγει αλλά έχει 0 rows, διαφορετικά IDs ή λείπει το CRS, το export δεν είναι επιτυχές.

## Checkpoint

Οι έλεγχοι `asset_id`, geometry type, CRS και bounds συγκρίνουν το `geojson_readback` με το αρχικό `gdf`.

Το GeoJSON είναι πρακτικό για ελαφρύ, portable exchange ενός ή λίγων layers, αλλά μπορεί να γίνει μεγάλο και δεν είναι container πολλών θεματικών layers. Για ένα οργανωμένο GIS workflow, το GeoPackage συνήθως κρατά πολλά layers σε ένα αρχείο και αποφεύγει τη διάσπαση σε πολλά παράλληλα αρχεία.
