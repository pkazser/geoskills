# GP10 — Αποκοπή και χωρική επικάλυψη

> Κατάσταση: πιλοτική έκδοση v2.0.

Στο GP10 δημιουργείς νέες geometries με `clip` και `overlay`. Η ροή είναι **Πρόβλεψε → Εκτέλεσε → Έλεγξε → Ερμήνευσε**.

## Τι θα μάθεις

Θα ελέγξεις τρία polygon layers, θα τα μετατρέψεις σε EPSG:2100, θα επιλέξεις πράξη, θα συγκρίνεις rows/areas/attributes και θα κάνεις round-trip export.

| Ερώτηση | Πράξη |
|---|---|
| Περιορισμός σε mask | `gpd.clip()` |
| Μεταφορά attributes χωρίς κόψιμο | `gpd.sjoin()` |
| Νέα κοινή geometry και attributes | `gpd.overlay(..., how="intersection")` |

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp10_clip_intersection_overlay_starter.ipynb)

Το notebook περιέχει guided example, ελεγχόμενη σύγκριση και ανεξάρτητο Mini Challenge. Δεν δημοσιεύεται solution notebook.

## Κρίσιμο κριτήριο ερμηνείας

Τα L01 και L02 επικαλύπτονται. Σύγκρινε άθροισμα επιμέρους εμβαδών, εμβαδόν γεωμετρικής ένωσης και τυχόν διπλομετρούμενη επιφάνεια. Το απλό άθροισμα δεν είναι πάντοτε μοναδικό coverage area.

## Άμεσες λήψεις starter notebook και δεδομένων

Για τοπική εργασία χρησιμοποίησε τα παρακάτω πραγματικά αρχεία. Το Colab παραμένει διαθέσιμο από τον σύνδεσμο της πρακτικής άσκησης.

- {download}`Λήψη starter notebook: gp10_clip_intersection_overlay_starter.ipynb <../../../downloads/python/notebooks/starter/gp10_clip_intersection_overlay_starter.ipynb>`
- {download}`Λήψη dataset: landuse.geojson <../../../downloads/python/data/gp10/landuse.geojson>`
- {download}`Λήψη dataset: protected_zones.geojson <../../../downloads/python/data/gp10/protected_zones.geojson>`
- {download}`Λήψη dataset: study_area.geojson <../../../downloads/python/data/gp10/study_area.geojson>`
