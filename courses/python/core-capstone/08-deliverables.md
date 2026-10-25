# 8. Deliverables — καθαρό export και σύντομη αναφορά

## Τι θα μάθεις

Θα εξάγεις τα αποτελέσματα ως ένα αναγνώσιμο GeoPackage και ως απλά deliverables που μπορεί να χρησιμοποιήσει άλλος αναλυτής.

## Γιατί είναι χρήσιμο

Το σωστό export είναι μέρος της ανάλυσης. Ένα layer χωρίς CRS, ονόματα ή περιγραφή δεν είναι επαναχρησιμοποιήσιμο ακόμη κι αν ο υπολογισμός ήταν σωστός.

## Προτεινόμενη δομή

```python
from pathlib import Path

out = Path("output/core-capstone")
out.mkdir(parents=True, exist_ok=True)
gpkg = out / "capstone_results.gpkg"
cleaned.to_file(gpkg, layer="cleaned_services", driver="GPKG")
services_with_zones.to_file(gpkg, layer="services_with_zones", driver="GPKG")
service_buffers.to_file(gpkg, layer="service_buffers", driver="GPKG")
coverage_by_zone.to_file(gpkg, layer="coverage_by_zone", driver="GPKG")
clipped_roads.to_file(gpkg, layer="clipped_roads", driver="GPKG")
```

Εξήγησε τα layer names και κράτησε `summary.csv` με μία γραμμή ανά zone. Το `final_map.png` πρέπει να έχει title, legend και scale/context αρκετό για έλεγχο. Το `short_findings.md` πρέπει να λέει μέθοδο, περιορισμούς και ευρήματα χωρίς να υπερ-ερμηνεύει.

## QA μετά το export

Ξαναδιάβασε το GeoPackage με `gpd.read_file(..., layer=...)`, έλεγξε ότι τα layers υπάρχουν, ότι τα CRS και rows διατηρήθηκαν και ότι το CSV συμφωνεί με το GeoPackage. Το export δεν θεωρείται επιτυχές επειδή απλώς δημιουργήθηκε αρχείο.

## Checkpoint

Μικρή άσκηση: πρόσθεσε ένα `README` στο output με ημερομηνία, source paths, target CRS, buffer distance και γνωστούς περιορισμούς. Αν άλλος αναλυτής δεν μπορεί να αναπαράγει τη λογική, λείπει τεκμηρίωση.

## Επόμενο lesson

Στο τελευταίο lesson αξιολογείς αν μπορείς να επαναλάβεις το project χωρίς οδηγό.
