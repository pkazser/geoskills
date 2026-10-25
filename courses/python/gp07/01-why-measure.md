# 1. Γιατί μετράμε

## Τι θα μάθεις

## Τι πρόβλημα λύνουμε

Θέλουμε να μετατρέψουμε geometries σε μετρήσεις που στηρίζουν αποφάσεις. Πριν από κάθε αριθμό ελέγχουμε CRS, units και geometry type.

Θα συνδέσεις τη geometry με ερωτήματα όπως “πόσο μεγάλο;”, “πόσο μακρύ;” και “πόσο μακριά;”.

## Γιατί είναι χρήσιμο

Οι μετρήσεις οδηγούν σε αποφάσεις: μήκος δρόμου, έκταση πάρκου ή απόσταση σημείων. Είναι όμως αριθμοί μόνο αν οι μονάδες και το CRS είναι σωστά.

## Dataset και παράδειγμα

Τα polygons του `measurement_areas.geojson` δίνουν εμβαδά, οι γραμμές του `measurement_routes.geojson` μήκη και τα σημεία του CSV αποστάσεις.

```python
areas_m = areas.to_crs("EPSG:2100")
```

## QA

Πριν τη μέτρηση έλεγξε CRS, rows, geometry types και missing geometry. Περίμενε 2 Polygon, 2 LineString και 3 Point.

## Checkpoint

Ποια μέτρηση θα έκανες σε EPSG:4326; Καμία από τις τρεις χωρίς ειδική γεωδαιτική μέθοδο.

Point features συνήθως δεν έχουν meaningful area/length· LineString features έχουν length, ενώ Polygon features έχουν area και perimeter. Το αποτέλεσμα εξαρτάται από το CRS: correct code + wrong CRS = wrong measurement. Πριν μετρήσεις, έλεγξε type, CRS και μονάδες.

## Επόμενο βήμα

Θα υπολογίσεις μήκη γραμμών.
