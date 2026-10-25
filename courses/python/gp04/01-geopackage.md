# 1. Τι είναι GeoPackage

## Τι θα μάθεις

Το GeoPackage είναι ένα ενιαίο αρχείο που μπορεί να περιέχει πολλά γεωχωρικά layers και attributes.

## Τι πρόβλημα λύνουμε

Ένα GIS project συχνά έχει πολλά θεματικά layers. Θέλουμε να εξερευνήσουμε το container χωρίς να μαντέψουμε το layer name ή τη δομή του.

## Νοητικό μοντέλο

Το αρχείο είναι container, ενώ το layer είναι συγκεκριμένο σύνολο features. Το path ελέγχει ότι υπάρχει το container· το `list_layers()` θα αποκαλύψει το περιεχόμενο.

Σε αντίθεση με ένα απλό GeoJSON, δεν χρειάζεται ξεχωριστό αρχείο για κάθε layer.

```python
import geopandas as gpd

gpkg_path = "../../../downloads/python/data/gp04/serres_assets.gpkg"
```

## Η σωστή ερώτηση

Δεν ξεκινάμε με `read_file()` σε layer που μαντέψαμε. Πρώτα ρωτάμε ποια layers υπάρχουν.

## Checkpoint

Ποια είναι η διαφορά ανάμεσα στο αρχείο GeoPackage και στο layer που θα διαβάσουμε από αυτό;

Η απάντηση πρέπει να περιλαμβάνει και το geometry type/CRS: κάθε layer μπορεί να έχει διαφορετικά attributes και geometry, παρότι μοιράζεται το ίδιο αρχείο.

## Γιατί είναι χρήσιμο

Σε ένα πραγματικό GIS project μπορεί να έχεις πάρκα, δρόμους, υδάτινα σημεία και όρια στο ίδιο αρχείο. Το GeoPackage τα κρατά οργανωμένα ως layers, χωρίς να χρειάζεται να διαχειρίζεσαι πολλά shapefiles και βοηθητικά αρχεία.

## Πρακτική εκτέλεση

```python
from pathlib import Path

gpkg_path = Path("../../../downloads/python/data/gp04/serres_assets.gpkg")
assert gpkg_path.exists()
```

Το path είναι αρχείο, όχι φάκελος. Το πρώτο QA check είναι να επιβεβαιώσουμε ότι υπάρχει πριν ζητήσουμε layer.

## Επόμενο βήμα

Θα ζητήσουμε από το αρχείο να μας δείξει τα διαθέσιμα layers.

Το GeoPackage είναι SQLite-based container σε πρακτικό επίπεδο: ένα αρχείο μπορεί να κρατά πολλά vector layers, attributes και CRS metadata. Δεν χρειάζεται database theory για να το χρησιμοποιήσεις· χρειάζεται να αντιμετωπίζεις το αρχείο ως “δοχείο” και να ανακαλύπτεις πρώτα το περιεχόμενό του.
