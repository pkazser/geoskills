# GP09 — Χωρική σύζευξη (Spatial Join)

> Κατάσταση: πιλοτική έκδοση v2.0.

Στο GP09 συνδέεις τις έξι υπηρεσίες με τους τρεις διοικητικούς τομείς χωρίς να κόψεις τα σημεία. Η ροή είναι **Πρόβλεψε → Εκτέλεσε → Έλεγξε → Ερμήνευσε**.

## Τι θα μάθεις

Θα μετατρέψεις το `services.csv` σε GeoDataFrame, θα ελέγξεις CRS και bounds, θα επιλέξεις left/right και predicate, θα συγκρίνεις `left` με `inner`, θα εντοπίσεις την unmatched S06, θα κάνεις aggregation και export.

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp09_spatial_join_starter.ipynb)

Το notebook περιέχει πλήρες καθοδηγούμενο παράδειγμα, ελεγχόμενες ασκήσεις και ανεξάρτητο mini challenge. Δεν δημοσιεύεται solution notebook.

## Κριτήρια επιτυχίας

Στο αρχικό dataset αναμένονται 6 services, 3 districts, 5 matched υπηρεσίες και 1 unmatched υπηρεσία (S06). Η unmatched εγγραφή δεν είναι από μόνη της σφάλμα.

## Mini Challenge

Παρήγαγε αναφορά ανά `district_id` και `service_type`, μαζί με ξεχωριστή αναφορά unmatched υπηρεσιών. Διάλεξε μόνος σου join type, aggregation και QA ελέγχους.

## Άμεσες λήψεις starter notebook και δεδομένων

Για τοπική εργασία χρησιμοποίησε τα παρακάτω πραγματικά αρχεία. Το Colab παραμένει διαθέσιμο από τον σύνδεσμο της πρακτικής άσκησης.

- {download}`Λήψη starter notebook: gp09_spatial_join_starter.ipynb <../../../downloads/python/notebooks/starter/gp09_spatial_join_starter.ipynb>`
- {download}`Λήψη dataset: districts.geojson <../../../downloads/python/data/gp09/districts.geojson>`
- {download}`Λήψη dataset: services.csv <../../../downloads/python/data/gp09/services.csv>`
