# 6. Γεωμετρίες και invalid features

## Τι θα μάθεις

Θα δημιουργήσεις Points και θα ελέγξεις αν υπάρχουν κενές ή μη έγκυρες γεωμετρίες.

```python
import geopandas as gpd

gdf = gpd.GeoDataFrame(
    clean,
    geometry=gpd.points_from_xy(clean["longitude"], clean["latitude"]),
    crs="EPSG:4326"
)
```

Το `X` είναι longitude και το `Y` latitude. Το `crs="EPSG:4326"` δηλώνει το
σύστημα αναφοράς που χρησιμοποιούμε· δεν μετασχηματίζει ούτε επαληθεύει μόνο
του τις αρχικές συντεταγμένες.

Για Point geometries το `is_valid` είναι βασικός έλεγχος. Ελέγχουμε επίσης `isna()` και `is_empty`.

```python
print(gdf.geometry.isna().sum())
print(gdf.geometry.is_empty.sum())
print(gdf.geometry.is_valid.all())
print(len(clean), len(gdf))
```

Δεν «διορθώνουμε» invalid geometries χωρίς να ξέρουμε την αιτία. Στα σημεία, συνήθως επιστρέφουμε στις συντεταγμένες και διορθώνουμε την πηγή.

## Γιατί είναι χρήσιμο

Το `GeoDataFrame` είναι το σημείο όπου οι attribute τιμές συνδέονται με θέση. Ένα κενό ή invalid geometry σημαίνει ότι το feature δεν μπορεί να συμμετέχει αξιόπιστα σε χάρτη ή spatial operation.

## Τι πρέπει να παρατηρήσεις

```python
print(gdf.geometry.geom_type.value_counts())
print(gdf.total_bounds)
```

Περιμένουμε μόνο `Point` geometries και ένα μικρό χωρικό περίβλημα γύρω από τις Σέρρες. Αν δεις πολύ μακρινό bounds, επέστρεψε στον έλεγχο συντεταγμένων.

## Πρόσεξε

Το `isna()` εντοπίζει geometry που λείπει, το `is_empty` geometry χωρίς συντεταγμένες και το `is_valid` τεχνικά μη έγκυρη geometry. Το `is_valid` δεν ελέγχει αν το σημείο βρίσκεται στη σωστή χώρα. Για τη λογική ορθότητα χρειαζόμαστε bounds, χάρτη και γνώση της περιοχής.

## Αναμενόμενο αποτέλεσμα

Μετά τη δημιουργία geometry πρέπει να έχεις ένα Point ανά καθαρό row, ίδιο πλήθος rows και CRS `EPSG:4326`. Αν λείπει geometry, η αιτία βρίσκεται συνήθως στις coordinates ή στα missing values και όχι σε “μαγικό” repair.

### Checkpoint

Σύγκρινε `len(clean)` με `len(gdf)` και εμφάνισε τα bounds. Έπειτα κάνε plot. Ο συνδυασμός αριθμητικών και οπτικών ελέγχων δίνει ισχυρότερη ένδειξη· αν διαφωνούν, χρειάζεται επανέλεγχος των δεδομένων και του κανόνα.

## QA check

```python
assert gdf.geometry.notna().all()
assert not gdf.geometry.is_empty.any()
assert gdf.geometry.is_valid.all()
assert gdf.geometry.geom_type.eq("Point").all()
assert len(gdf) == len(clean) == 7
```

## Επόμενο βήμα

Θα ενώσουμε τα βήματα σε ένα καθαρό, επαναλήψιμο workflow.
