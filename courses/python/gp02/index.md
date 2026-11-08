# GP02 — Clean Geospatial Data

## Τι θα κάνουμε

Στο GP01 έμαθες να ακολουθείς ένα GeoPython workflow. Τώρα θα μάθεις να αντιμετωπίζεις τα προβλήματα που συναντάμε πριν εμπιστευτούμε ένα dataset.

Θα δουλέψουμε με ένα μικρό CSV που περιέχει κενές τιμές, διπλότυπα, λάθος τύπους και προβληματικές συντεταγμένες.

**Εντοπίζω → Κατανοώ → Αποφασίζω → Τεκμηριώνω → Ελέγχω ξανά**

## Μαθησιακοί στόχοι

- να εντοπίζεις missing values και διπλότυπα,
- να ελέγχεις και να διορθώνεις τύπους δεδομένων,
- να αναγνωρίζεις μη έγκυρες συντεταγμένες,
- να ελέγχεις κενές και invalid γεωμετρίες,
- να κρατάς τεκμηριωμένα μόνο τις διορθώσεις που χρειάζονται,
- να εκτελείς επαναλήψιμα GeoPython QA checks.

Η εξαγωγή αρχείων είναι αντικείμενο του GP03. Στο GP02 παραδίδεις ένα ελεγμένο
`GeoDataFrame` και τεκμηριώνεις τις αποφάσεις καθαρισμού.

## Άνοιξε τα notebooks στο Google Colab

### Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp02_clean_geospatial_data_starter.ipynb)

### Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.

## Το dataset

Το `observations_dirty.csv` είναι σκόπιμα ατελές, συνθετικό εκπαιδευτικό αρχείο.
Στο notebook το βρίσκεις μέσω του `DATA_ROOT`. Δεν διορθώνουμε σιωπηλά τα πάντα:
πρώτα μετράμε το πρόβλημα, μετά επιλέγουμε κανόνα και στο τέλος ελέγχουμε το
αποτέλεσμα.

## Άμεσες λήψεις starter notebook και δεδομένων

Για τοπική εργασία χρησιμοποίησε τα παρακάτω πραγματικά αρχεία. Το Colab παραμένει διαθέσιμο από τον σύνδεσμο της πρακτικής άσκησης.

- {download}`Λήψη starter notebook: gp02_clean_geospatial_data_starter.ipynb <../../../downloads/python/notebooks/starter/gp02_clean_geospatial_data_starter.ipynb>`
- {download}`Λήψη dataset: observations_dirty.csv <../../../downloads/python/data/gp02/observations_dirty.csv>`
