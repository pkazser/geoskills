# 4. Mask και περιοχή μελέτης

## Τι θα μάθεις

Θα ελέγξεις τη mask πριν την εφαρμόσεις.

## Προετοιμασία

## Τι πρόβλημα λύνουμε

Η mask είναι επιχειρησιακή απόφαση: ορίζει ποια έκταση ανήκει στη μελέτη και ποια όχι. Αν είναι λάθος ή άδεια, κάθε downstream αποτέλεσμα θα είναι λάθος ακόμη κι αν το `clip` τρέξει.

```python
study = gpd.read_file("../../../downloads/python/data/gp10/study_area.geojson")
study = study.to_crs("EPSG:2100")
```

Η mask είναι polygon που ορίζει την έκταση ανάλυσης. Πρέπει να έχει σωστό CRS, valid geometry και λογικά bounds.

## Πρακτική / αναμενόμενο αποτέλεσμα

Η study area έχει ένα polygon. Σύγκρινέ το οπτικά με landuse και protected zone: πρέπει να τέμνει και τα δύο.

## QA

Έλεγξε rows, `Polygon` geometry, `notna`, `not is_empty`, `is_valid`, bounds και EPSG:2100. Αν η mask είναι άδεια ή βρίσκεται αλλού, το clip θα δώσει παραπλανητικό κενό αποτέλεσμα.

## Πρόσεξε

Όλα τα layers που συμμετέχουν σε clip/overlay πρέπει να έχουν συμβατό CRS. Το `to_crs` απαιτεί σωστό αρχικό CRS.

Η study area είναι mask που περιορίζει το spatial extent και συχνά μειώνει το dataset πριν από ακριβότερη ανάλυση. Πριν από clip έλεγξε ότι input και mask έχουν συμβατό CRS, valid/non-empty geometry και bounds που επικαλύπτονται. Αν δεν υπάρχει overlap, το αποτέλεσμα μπορεί να είναι κενό χωρίς να υπάρχει Python error.

## Επόμενο βήμα

Θα εφαρμόσεις clip στο land-use layer.
