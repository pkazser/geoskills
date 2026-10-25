# 3. Συντεταγμένες και geometry

## Τι θα μάθεις

Θα μετατρέψεις τα δύο πεδία συντεταγμένων σε Points.

## Τι πρόβλημα λύνουμε

Μία αντιστροφή longitude/latitude δημιουργεί έγκυρη Python τιμή αλλά λάθος τοποθεσία. Το `points_from_xy(x, y)` δεν μαντεύει: longitude είναι X και latitude είναι Y.

## QA checkpoint

Έλεγξε numeric types, missing coordinates και γενικά όρια `-180..180` / `-90..90`. Για τοπικό dataset πρόσθεσε bounds και plot, επειδή τα γενικά όρια δεν επιβεβαιώνουν τη σωστή περιοχή.

```python
import geopandas as gpd

gdf = gpd.GeoDataFrame(
    df,
    geometry=gpd.points_from_xy(df["longitude"], df["latitude"]),
    crs="EPSG:4326"
)
```

Η σειρά είναι πάντα `longitude` ως X και `latitude` ως Y.

## Πρώτος έλεγχος

```python
print(gdf.geometry.head())
print(gdf.geometry.geom_type.value_counts())
```

## Συνηθισμένο λάθος

Η αντίστροφη σειρά μπορεί να δημιουργήσει σημεία σε λάθος περιοχή χωρίς να εμφανιστεί error. Ο οπτικός έλεγχος είναι απαραίτητος.

## Γιατί είναι χρήσιμο

Τα X/Y είναι ο πυρήνας της μετατροπής. Αν αντιστρέψεις longitude και latitude, μπορεί να πάρεις τεχνικά valid Points αλλά σε λάθος θέση.

## Πρακτική εκτέλεση

```python
print(gdf[["asset_id", "longitude", "latitude", "geometry"]].head())
print(gdf.total_bounds)
```

Για το dataset των Σερρών περιμένουμε bounds κοντά στα `23.55–23.60` longitude και `41.08–41.12` latitude. Τα bounds δεν αποδεικνύουν τα πάντα, αλλά αποκαλύπτουν προφανείς αναστροφές ή outliers.

## Checkpoint

Ποια τιμή περνά ως X στο `points_from_xy()` και ποια ως Y; Απάντησε πριν συνεχίσεις.

## Πώς εντοπίζουμε πιθανή αντιστροφή;

Το γενικό range δεν αρκεί πάντα: και οι δύο αριθμοί μπορεί να βρίσκονται στο `-90..90`. Συγκρίνουμε τα fields με metadata, αναμενόμενα bounds και έναν γρήγορο χάρτη. Για ελληνικό dataset, longitude περίπου 21–26 και latitude περίπου 35–42 είναι πιο λογικά από το αντίστροφο. Δεν αλλάζουμε τις στήλες επειδή “φαίνονται περίεργες” χωρίς πηγή ή τεκμηριωμένη υπόθεση.

## Επόμενο βήμα

Αφού ελέγξαμε X/Y, θα δημιουργήσουμε τη geometry column με `points_from_xy()`.
