# 5. Συναρτήσεις και βιβλιοθήκες

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_05_functions_imports_starter.ipynb)

## Τι θα μάθεις

- `def`,
- παραμέτρους,
- `return`,
- `import`,
- aliases,
- `from ... import ...`,
- πρώτη χρήση Shapely.

## Τι πρόβλημα λύνουμε

Όταν επαναλαμβάνεις τον ίδιο υπολογισμό σε πολλά layers ή records, η αντιγραφή κώδικα αυξάνει τα λάθη. Μια συνάρτηση δίνει όνομα σε έναν κανόνα και τον κάνει επαναχρησιμοποιήσιμο.

## Νοητικό μοντέλο

Οι παράμετροι είναι είσοδοι, το `return` είναι έξοδος και το σώμα περιγράφει τη διαδικασία. Η κλήση της συνάρτησης δεν εμφανίζει αυτόματα το αποτέλεσμα· χρειάζεται `print()` ή ανάθεση σε μεταβλητή.

## Πρώτη συνάρτηση

```python
def m2_to_ha(area_m2):
    return area_m2 / 10000
```

Η συνάρτηση δεν υποθέτει μονάδες από μόνη της. Η ευθύνη να δώσεις m² είναι δική σου. Για αυτό καλά ονόματα όπως `area_m2` μειώνουν τον κίνδυνο λανθασμένης μετατροπής.

## Δύο παράμετροι

```python
def rectangle_area(width, height):
    return width * height
```

## Συνάρτηση με `if`

```python
def elevation_class(elevation):
    if elevation < 100:
        return "Low"
    elif elevation < 500:
        return "Medium"
    else:
        return "High"
```

## Βιβλιοθήκες

```python
import math
print(math.sqrt(25))
```

Το `import` φορτώνει κώδικα που έχει ήδη γραφτεί και δοκιμαστεί. Το alias `pd` ή `gpd` είναι σύμβαση, όχι νέα βιβλιοθήκη. Αν δεις `ModuleNotFoundError`, πρώτα έλεγξε ότι βρίσκεσαι στο σωστό περιβάλλον ή Colab runtime.

Alias:

```python
import pandas as pd
import geopandas as gpd
```

## Shapely Point

```python
from shapely.geometry import Point

point = Point(23.55, 41.09)
print(point)
```

> 💡 **GeoTip**
>
> `Point(x, y)` σημαίνει πρώτα X και μετά Y. Για geographic coordinates: `Point(longitude, latitude)`.

## Συνάρτηση που δημιουργεί Point

```python
from shapely.geometry import Point

def create_point(longitude, latitude):
    return Point(longitude, latitude)
```

Η συνάρτηση επιστρέφει geometry, αλλά δεν περιλαμβάνει CRS. Ένα `Point` μόνο του είναι αριθμητική γεωμετρία· το CRS θα προστεθεί όταν δημιουργήσεις GeoDataFrame.

## Mini Challenge

Δημιούργησε γεωμετρίες για πολλά stations με `for` και μία συνάρτηση `make_point(x, y)`.

### Checkpoint

Έλεγξε ότι δημιουργούνται τόσα points όσα stations, ότι το πρώτο είναι `Point` και ότι η σειρά είναι `Point(longitude, latitude)`. Αν αντιστρέψεις x/y, ο κώδικας μπορεί να τρέξει κανονικά αλλά το σημείο να βρεθεί εκτός Ελλάδας.

## Τι κρατάμε

Οι συναρτήσεις οργανώνουν λογική, τα imports φέρνουν εργαλεία και το Shapely παρέχει geometry. Η κατανόηση του input/output θα κάνει τα επόμενα notebooks λιγότερο “μαγικά”.

## Επόμενο βήμα

**pandas**

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
