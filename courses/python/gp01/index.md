# GP01 — First GeoPython Workflow

## Τι θα κάνουμε

Στο GP00 γνώρισες τις βασικές έννοιες της Python, του `pandas` και του `GeoPandas`.
Τώρα θα συνδέσουμε αυτές τις γνώσεις σε ένα μικρό, ολοκληρωμένο GeoPython workflow.

Θα ξεκινήσουμε από ένα CSV με σημεία παρατήρησης και θα φτάσουμε σε ένα νέο γεωχωρικό αρχείο.

**Load → Inspect → Understand → Filter → Map → Validate → Export**

## Μαθησιακοί στόχοι

Μετά την ολοκλήρωση θα μπορείς να:

- φορτώνεις ένα CSV σε `pandas`,
- εξετάζεις στήλες, τύπους και πλήθος εγγραφών,
- κατανοείς τι σημαίνει κάθε πεδίο,
- δημιουργείς `GeoDataFrame` από συντεταγμένες,
- φιλτράρεις εγγραφές,
- δημιουργείς έναν απλό χάρτη,
- εκτελείς GeoPython QA checks,
- εξάγεις το αποτέλεσμα σε GeoJSON.

## Το dataset μας

Το `../../../downloads/python/data/gp01/survey_points.csv` περιέχει σημεία επιτόπιας παρατήρησης στην περιοχή των Σερρών, με όνομα, κατηγορία, συντεταγμένες, υψόμετρο και κατάσταση ελέγχου.
Οι συντεταγμένες είναι σε **EPSG:4326**.

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp01_first_geopython_workflow_starter.ipynb)

Το starter notebook περιέχει οδηγίες και σκόπιμα κενά σημεία που πρέπει να συμπληρώσεις. Δεν δημοσιεύεται solution notebook· χρησιμοποίησε τα checkpoints και τους ελέγχους του μαθήματος για να αξιολογήσεις τη δική σου προσπάθεια.

## Η βασική ιδέα

Ένα καλό workflow δεν αρχίζει με ανάλυση. Αρχίζει με ερωτήσεις:

- Τι δεδομένα έχω;
- Τι σημαίνει κάθε στήλη;
- Είναι οι τιμές λογικές;
- Ποια εγγραφή θέλω να κρατήσω;
- Πώς θα ελέγξω και θα αποθηκεύσω το αποτέλεσμα;

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.

## Άμεσες λήψεις starter notebook και δεδομένων

Για τοπική εργασία χρησιμοποίησε τα παρακάτω πραγματικά αρχεία. Το Colab παραμένει διαθέσιμο από τον σύνδεσμο της πρακτικής άσκησης.

- {download}`Λήψη starter notebook: gp01_first_geopython_workflow_starter.ipynb <../../../downloads/python/notebooks/starter/gp01_first_geopython_workflow_starter.ipynb>`
- {download}`Λήψη dataset: survey_points.csv <../../../downloads/python/data/gp01/survey_points.csv>`
