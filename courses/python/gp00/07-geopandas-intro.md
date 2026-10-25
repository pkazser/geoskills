# 7. Πρώτη επαφή με GeoPandas

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_07_geopandas_intro_starter.ipynb)

## Τι θα μάθεις

- `GeoDataFrame`,
- geometry,
- CRS,
- `gpd.points_from_xy()`,
- geometry types,
- bounds,
- γρήγορη χαρτογράφηση,
- GeoJSON και GeoPackage.

## Τι πρόβλημα λύνουμε

Ένα table με longitude και latitude δεν αρκεί για spatial analysis. Χρειαζόμαστε geometry column και CRS, ώστε οι γραμμές του πίνακα να συνδεθούν με θέσεις στον χώρο.

## Νοητικό μοντέλο

Ένα GeoDataFrame είναι DataFrame με ειδική geometry column. Το CRS εξηγεί τι σημαίνουν οι αριθμοί και οι spatial μέθοδοι χρησιμοποιούν τη geometry, όχι απλώς τις columns `longitude` και `latitude`.

## DataFrame → GeoDataFrame

```python
import pandas as pd

data = {
    "name": ["P1", "P2", "P3"],
    "longitude": [23.55, 23.56, 23.57],
    "latitude": [41.09, 41.10, 41.08]
}

df = pd.DataFrame(data)
```

Δημιουργία:

```python
import geopandas as gpd

gdf = gpd.GeoDataFrame(
    df,
    geometry=gpd.points_from_xy(
        df["longitude"],
        df["latitude"]
    ),
    crs="EPSG:4326"
)
```

## Έλεγχος

```python
print(gdf.crs)
print(len(gdf))
print(gdf.geometry.geom_type.value_counts())
print(gdf.total_bounds)
```

Το `len(gdf)` ελέγχει rows, το `geom_type` ελέγχει είδος geometry και το `total_bounds` δίνει `[minx, miny, maxx, maxy]`. Για το παράδειγμα, περίμενε τρία `Point` και bounds περίπου 23.55–23.57 / 41.08–41.10.

## QA γεωμετρίας

```python
print(gdf.geometry.isna().sum())
print(gdf.geometry.is_empty.sum())
```

Το `isna()` ελέγχει αν λείπει geometry, ενώ το `is_empty` αν υπάρχει geometry χωρίς περιεχόμενο. Δεν είναι το ίδιο. Έλεγξε και `gdf.crs is not None` πριν χρησιμοποιήσεις το layer.

## Γρήγορος χάρτης

```python
gdf.plot(figsize=(6, 6))
```

Ο χάρτης είναι οπτικό QA: αν τα σημεία εμφανίζονται σε λάθος ήπειρο, πιθανότατα έχεις αντιστρέψει longitude/latitude ή έχεις δηλώσει λάθος CRS. Δεν αντικαθιστά τους αριθμητικούς ελέγχους.

## Εξαγωγή

```python
gdf.to_file("points.geojson", driver="GeoJSON")
```

```python
gdf.to_file("points.gpkg", layer="points", driver="GPKG")
```

Το GeoJSON είναι βολικό για απλή ανταλλαγή ενός layer. Το GeoPackage είναι καταλληλότερο όταν θέλεις ένα GIS container με layers και metadata. Μετά το export, έλεγξε ότι το αρχείο δημιουργήθηκε και ότι το CRS παραμένει σωστό.

> 💡 **GeoTip**
>
> GeoDataFrame = DataFrame + geometry + CRS.

## Mini Challenge

Δημιούργησε 4 σημεία σε EPSG:4326, εμφάνισε CRS, rows, geometry types, bounds και plot.

### Checkpoint

Πριν κάνεις plot, πρόβλεψε περίπου πού θα βρίσκεται ο χάρτης. Μετά δημιούργησε ένα σκόπιμα λάθος `Point(latitude, longitude)` και εξήγησε γιατί ο κώδικας εκτελείται αλλά το QA αποτυγχάνει.

## Τι κρατάμε

GeoDataFrame σημαίνει table + geometry + CRS. Κάθε workflow πρέπει να ελέγχει και τα τρία πριν προχωρήσει σε spatial operation.

## Επόμενο βήμα

**Errors, debugging και AI**

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
