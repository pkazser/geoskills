# GP04 — Explore GeoPackage

**Μαθησιακή αποστολή:** από ένα GeoPackage να ανακαλύπτεις layers, να ελέγχεις τα χαρακτηριστικά τους και να παράγεις επαληθευμένο αποτέλεσμα.\
**Προαπαιτούμενα:** GP03 και βασική εξοικείωση με pandas/GeoPandas.\
**Εκτιμώμενος χρόνος:** 45–60 λεπτά.

## Τι θα κάνουμε

Θα ανοίξουμε ένα GeoPackage, θα εξερευνήσουμε τα layers και θα ελέγξουμε τα γεωχωρικά δεδομένα πριν τα χρησιμοποιήσουμε.

**Ανοίγω → Εξερευνώ → Κατανοώ → Φιλτράρω → Επαληθεύω → Εξάγω**

Το `serres_assets.gpkg` είναι συνθετικό εκπαιδευτικό dataset· οι τιμές του δεν αποτελούν επίσημη απογραφή ή επιχειρησιακή καταγραφή.

## Μαθησιακοί στόχοι

- να καταλαβαίνεις τη δομή ενός GeoPackage,
- να εντοπίζεις τα διαθέσιμα layers,
- να διαβάζεις layer και attribute schema,
- να ελέγχεις CRS, geometry types και bounds,
- να εφαρμόζεις φίλτρα σε attributes,
- να εκτελείς GeoPython QA πριν από νέο export.

## Άνοιξε τα notebooks στο Google Colab

### Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp04_explore_geopackage_starter.ipynb)

### Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.

## Το dataset

Το αρχικό κελί προετοιμασίας του starter notebook ορίζει το `DATA_ROOT`· εκτέλεσέ το πριν από τα παραδείγματα ώστε το GeoPackage να εντοπίζεται φορητά. Το `serres_assets.gpkg` περιέχει τα layers `parks` και `water_points`. Θα τα ανακαλύψουμε και θα τα ελέγξουμε χωρίς να θεωρήσουμε ότι τα ονόματα αρκούν από μόνα τους.

## Άμεσες λήψεις starter notebook και δεδομένων

Για τοπική εργασία χρησιμοποίησε τα παρακάτω πραγματικά αρχεία. Το Colab παραμένει διαθέσιμο από τον σύνδεσμο της πρακτικής άσκησης.

- {download}`Λήψη starter notebook: gp04_explore_geopackage_starter.ipynb <../../../downloads/python/notebooks/starter/gp04_explore_geopackage_starter.ipynb>`
- {download}`Λήψη dataset: serres_assets.gpkg <../../../downloads/python/data/gp04/serres_assets.gpkg>`
