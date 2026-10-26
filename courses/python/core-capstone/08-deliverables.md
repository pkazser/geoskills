# 8. Deliverables — καθαρό export και σύντομη αναφορά

## Τι θα μάθεις

Θα εξάγεις τα αποτελέσματα ως ένα αναγνώσιμο GeoPackage και ως απλά deliverables που μπορεί να χρησιμοποιήσει άλλος αναλυτής.

## Γιατί είναι χρήσιμο

Το σωστό export είναι μέρος της ανάλυσης. Ένα layer χωρίς CRS, ονόματα ή περιγραφή δεν είναι επαναχρησιμοποιήσιμο ακόμη κι αν ο υπολογισμός ήταν σωστός.

## Υποχρεωτικό output contract

Ο φοιτητής παραδίδει τον φάκελο `output/core-capstone/` με τα παρακάτω.

### `capstone_results.gpkg`

Το GeoPackage πρέπει να περιέχει τα layers `cleaned_services`, `services_with_zones`, `service_buffers`, `coverage_by_zone` και `clipped_roads`.

- `cleaned_services`: `Point`, `EPSG:2100`, 7 features, μοναδικά `service_id` και χωρίς κενές ή μη έγκυρες geometries.
- `services_with_zones`: `Point`, `EPSG:2100`, τα cleaned services με `zone_id`, χωρίς missing zone assignment.
- `service_buffers`: `Polygon` ή `MultiPolygon`, `EPSG:2100`, τα τρία active Health/Emergency services και buffer distance 500 m.
- `coverage_by_zone`: αποτέλεσμα intersection/coverage με `zone_id`, geometry και θετικό `covered_m2` όπου υπάρχει κάλυψη.
- `clipped_roads`: γραμμικά features σε `EPSG:2100`, περιορισμένα στη study area.

Για κάθε layer έλεγξε όνομα, CRS, πλήθος, geometry type, validity, required fields και λογικά bounds. Τα counts πρέπει να δηλώνουν αν αφορούν features, matches ή μοναδικές υπηρεσίες.

### `summary.csv`

Το `summary.csv` είναι πίνακας αναφοράς με **και τις τρεις διοικητικές ζώνες**, ακόμη και όταν μία έχει μηδενική κάλυψη. Πρέπει να περιέχει τουλάχιστον `zone_id`, `zone_name`, `zone_area_m2`, `covered_m2` και, εφόσον χρησιμοποιείται, `coverage_pct`. Η μηδενική κάλυψη εμφανίζεται ως αριθμητικό 0 και όχι ως απουσία γραμμής.

Το `coverage_by_zone` είναι αποτέλεσμα χωρικής πράξης και μπορεί να περιέχει μόνο καλυπτόμενες γεωμετρίες. Το `summary.csv` είναι τελικός πίνακας αναφοράς και δημιουργείται με βάση όλες τις ζώνες.

### `final_map.png`

Ο χάρτης πρέπει να έχει τίτλο, legend, σαφή διάκριση zones/services/buffers/roads και αρκετό context για οπτικό QA. Δεν αποτελεί μόνος του απόδειξη ορθότητας.

### `short_findings.md`

Η αναφορά καταγράφει μέθοδο, counts 11→10→8→7, target CRS, buffer distance, κανόνα δημιουργίας summary, βασικά ευρήματα και τουλάχιστον δύο περιορισμούς. Δηλώνει ότι το buffer των 500 m είναι απλοποίηση ευθύγραμμης απόστασης και όχι routing, χρόνος διαδρομής ή πληθυσμιακή κάλυψη. Το `short_findings.md` πρέπει επιπλέον να αναφέρει αν εντοπίστηκαν σημεία σε κοινά διοικητικά όρια, ποιες υποψήφιες zones καταγράφηκαν, πώς αντιμετωπίστηκε το `S06` και ότι η επιλογή `D01` είναι κανόνας επίλυσης αμφισημίας του συνθετικού παραδείγματος. Σε πραγματικά δεδομένα θα εξετάζονταν επίσημα διοικητικά δεδομένα, επιχειρησιακοί κανόνες ή ανεξάρτητος έλεγχος.

### Κριτήρια αποδοχής

Το output γίνεται αποδεκτό μόνο όταν τα layers ξαναδιαβάζονται επιτυχώς, τα CRS και geometry types συμφωνούν, οι 7 cleaned services έχουν μοναδικά IDs, το summary έχει 3 zones, το `covered_m2` δεν υπερβαίνει το `zone_area_m2` και τα ευρήματα εξηγούν τις αποφάσεις. Η επιτυχής εκτέλεση κώδικα ή η ύπαρξη αρχείων δεν αρκεί.

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
