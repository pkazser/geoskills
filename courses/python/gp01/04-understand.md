# 4. Understand — Κατανόηση του dataset

## Τι θα μάθεις

Οι στήλες δεν είναι απλώς ονόματα. Πρέπει να γνωρίζουμε τι σημαίνει κάθε τιμή και σε ποιες μονάδες μετριέται.

## Τι πρόβλημα λύνουμε

Το ίδιο όνομα μπορεί να χρησιμοποιείται διαφορετικά σε διαφορετικά datasets. Πριν δημιουργήσουμε geometry, πρέπει να γνωρίζουμε ότι το `longitude` είναι X, το `latitude` είναι Y και ότι οι τιμές είναι μοίρες WGS84.

| Στήλη | Σημασία |
|---|---|
| `name` | όνομα σημείου |
| `category` | τύπος παρατήρησης |
| `longitude` | γεωγραφικό μήκος |
| `latitude` | γεωγραφικό πλάτος |
| `elevation_m` | υψόμετρο σε μέτρα |
| `status` | αποτέλεσμα ελέγχου |

Τα `longitude` και `latitude` είναι συντεταγμένες σε μοίρες. Δεν είναι μέτρα.

## Από DataFrame σε GeoDataFrame

```python
import geopandas as gpd
from shapely.geometry import Point

geometry = [Point(xy) for xy in zip(points["longitude"], points["latitude"])]
gdf = gpd.GeoDataFrame(points, geometry=geometry, crs="EPSG:4326")
print(gdf.crs)
print(gdf.geometry.geom_type.unique())
```

Το `GeoDataFrame` κρατά τις αρχικές columns και προσθέτει geometry. Το `crs="EPSG:4326"` δηλώνει την ερμηνεία των υπαρχουσών coordinates· δεν μετατρέπει ακόμη τις θέσεις. Η αναμενόμενη geometry type είναι `Point`.

## QA και ερμηνεία

Έλεγξε rows πριν/μετά, μη κενές geometry, τύπους `Point`, bounds και CRS. Αν τα bounds είναι περίπου longitude 23–24 και latitude 41, το dataset βρίσκεται στην αναμενόμενη περιοχή. Αν τα x/y είναι ανάποδα, το GeoDataFrame μπορεί να δημιουργηθεί χωρίς error αλλά ο χάρτης θα το αποκαλύψει.

Τώρα ο πίνακας έχει στήλη `geometry` και CRS.

## GeoTip

Η σειρά των συντεταγμένων είναι `Point(longitude, latitude)`, δηλαδή `Point(X, Y)`. Δεν αντιστρέφουμε τις δύο τιμές.

## Τι άλλαξε στα δεδομένα;

Το `points` είχε rows και attributes. Το `gdf` έχει τα ίδια rows και attributes, αλλά τώρα κάθε row συνδέεται με μία spatial θέση και υπάρχει CRS metadata. Δεν έγινε ακόμη μετασχηματισμός σε μέτρα ούτε spatial analysis. Πρώτα δηλώνουμε τι είναι οι coordinates και μετά αποφασίζουμε πώς θα τις χρησιμοποιήσουμε.

Μικρό checkpoint: αν το `len(points)` και το `len(gdf)` διαφέρουν, σταμάτησε και έλεγξε τη δημιουργία geometry. Αν τα bounds είναι απρόσμενα, έλεγξε τη σειρά longitude/latitude πριν από οποιοδήποτε filter.

## Επόμενο βήμα

Τώρα που γνωρίζουμε τις στήλες και έχουμε γεωμετρία, μπορούμε να επιλέξουμε εγγραφές.
