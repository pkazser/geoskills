# 9. Mini Challenge — Από απλά δεδομένα σε GeoDataFrame

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_09_mini_challenge_starter.ipynb)

## Στόχος

Συνδύασε Python basics, pandas, GeoPandas, geometry, CRS, filtering, QA και export.

## Δεδομένα

```python
data = {
    "name": ["P1","P2","P3","P4","P5","P6"],
    "category": ["school","hospital","school","clinic","library","hospital"],
    "longitude": [23.550,23.556,23.562,23.568,23.574,23.580],
    "latitude": [41.090,41.094,41.087,41.101,41.096,41.084],
    "elevation": [82,125,95,160,110,72],
    "active": [True,True,False,True,True,True]
}
```

## Βήματα

1. DataFrame
2. `head()`, `shape`, `columns`, `dtypes`
3. GeoDataFrame EPSG:4326
4. CRS, rows, geometry types, bounds, missing geometries
5. plot
6. filter active & elevation > 100
7. filter active hospitals
8. νέα στήλη `elevation_class`
9. export GPKG και GeoJSON

## Αναμενόμενα

Για active & elevation > 100:

```text
P2
P4
P5
```

Για active hospitals:

```text
P2
P6
```

## elevation_class

```python
def elevation_class(elevation):
    if elevation < 100:
        return "Low"
    elif elevation < 150:
        return "Medium"
    else:
        return "High"
```

## Export

```python
gdf.to_file("gp00_points.gpkg", layer="points", driver="GPKG")
selected.to_file("gp00_selected.geojson", driver="GeoJSON")
```

## Bonus

Κράτησε ενεργά school ή hospital με elevation >= 90.

## Βασική νοοτροπία

```text
Τι δεδομένα είχα;
↓
Τι έκανα;
↓
Τι αποτέλεσμα πήρα;
↓
Πώς ξέρω ότι είναι σωστό;
```

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
