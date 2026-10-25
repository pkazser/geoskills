# 5. Δημιουργία GeoDataFrame

## Τι θα μάθεις

Θα επιβεβαιώσεις ότι τα attributes και η geometry παραμένουν μαζί.

```python
print(gdf.shape)
print(gdf.columns)
print(gdf.crs)
print(gdf.geometry.geom_type.unique())
```

Το `GeoDataFrame` είναι DataFrame με μία ενεργή geometry column και CRS.

## Τι πρόβλημα λύνουμε

Θέλουμε ένα αντικείμενο που να μπορεί να φιλτραριστεί ως πίνακας και να χαρτογραφηθεί ως spatial layer. Κάθε row πρέπει να κρατά το `asset_id`, τα attributes και ένα Point.

## Αναμενόμενο αποτέλεσμα και QA

Έλεγξε ίδιο πλήθος rows με το αρχικό DataFrame, geometry type `Point`, μη κενές geometries, CRS και bounds. Αν λείπει geometry, επέστρεψε στις coordinates αντί να κάνεις export μισού layer.

## Επιλογή πεδίων

```python
assets = gdf[["asset_id", "asset_type", "condition", "geometry"]].copy()
```

Κρατάμε μόνο τις στήλες που έχουν νόημα για το παραγόμενο GIS dataset.

## Checkpoint

Έλεγξε ότι ο αριθμός των rows παραμένει ίδιος μετά την επιλογή στηλών.

## Γιατί είναι χρήσιμο

Το GeoDataFrame κρατά attribute table και geometry σε μία δομή. Αυτό επιτρέπει να φιλτράρεις με βάση το `condition` και ταυτόχρονα να χαρτογραφείς ακριβώς τις ίδιες γραμμές.

## Πρακτική εκτέλεση

```python
assets = gdf[["asset_id", "asset_type", "condition", "geometry"]].copy()
print(assets.shape)
print(assets.geometry.name)
```

Η geometry column δεν πρέπει να χαθεί όταν επιλέγεις στήλες. Αν την αφαιρέσεις, το αποτέλεσμα ξαναγίνεται απλό DataFrame.

## QA checkpoint

```python
assert len(assets) == len(gdf)
assert assets.geometry.name == "geometry"
assert assets.crs.to_epsg() == 4326
```

Το `DataFrame` είναι πίνακας attributes. Το `GeoDataFrame` είναι πίνακας attributes με μία ενεργή geometry column και CRS metadata. Αυτά τα metadata επιτρέπουν σε GeoPandas να κάνει map, spatial operations και export. Το `points_from_xy()` παίρνει δύο Series ίδιου μήκους και επιστρέφει μία geometry ανά row· δεν ελέγχει από μόνο του αν οι αριθμοί είναι σωστοί.
