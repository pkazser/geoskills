# GP03 — CSV to GIS Dataset

**Κατάσταση:** τοπικό προσχέδιο προς αξιολόγηση
**Μαθησιακή αποστολή:** από ένα συνθετικό CSV να δημιουργήσεις, να ελέγξεις και να επαληθεύσεις ένα μικρό GIS dataset.
**Προαπαιτούμενα:** GP00 και βασική εξοικείωση με pandas/GeoPandas.
**Εκτιμώμενος χρόνος:** 45–60 λεπτά.

## Τι θα κάνουμε

Θα μετατρέψουμε έναν απλό πίνακα CSV σε GIS dataset με geometry, CRS και επαληθευμένα exports. Το `city_assets.csv` είναι συνθετικό εκπαιδευτικό dataset· δεν αποτελεί απογραφή ή επιχειρησιακή καταγραφή.

**CSV → DataFrame → GeoDataFrame → QA → GeoJSON / GeoPackage**

## Μαθησιακοί στόχοι

- να καταλαβαίνεις το schema ενός CSV,
- να ξεχωρίζεις πεδία περιγραφής από πεδία συντεταγμένων,
- να δημιουργείς `GeoDataFrame` από `longitude` και `latitude`,
- να ορίζεις και να ελέγχεις CRS,
- να κάνεις export σε GeoJSON και GeoPackage,
- να ξαναδιαβάζεις το αποτέλεσμα και να το επαληθεύεις.

Η βασική ροή είναι: **φορτώνω → κατανοώ το schema → δημιουργώ Points → δηλώνω/ελέγχω CRS → κάνω QA → εξάγω → ξαναδιαβάζω**.

## Άνοιξε τα notebooks στο Google Colab

### Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp03_csv_to_gis_dataset_starter.ipynb)

### Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.

## Το dataset

Το `city_assets.csv` περιέχει 8 συνθετικές εγγραφές αστικού εξοπλισμού στις Σέρρες. Το CSV δεν περιέχει geometry· θα τη δημιουργήσουμε εμείς. Στο notebook το αρχείο εντοπίζεται μέσω του `DATA_ROOT`, όχι με μη φορητό σχετικό path.

## Άμεσες λήψεις starter notebook και δεδομένων

Για τοπική εργασία χρησιμοποίησε τα παρακάτω πραγματικά αρχεία. Το Colab παραμένει διαθέσιμο από τον σύνδεσμο της πρακτικής άσκησης.

- {download}`Λήψη starter notebook: gp03_csv_to_gis_dataset_starter.ipynb <../../../downloads/python/notebooks/starter/gp03_csv_to_gis_dataset_starter.ipynb>`
- {download}`Λήψη dataset: city_assets.csv <../../../downloads/python/data/gp03/city_assets.csv>`
