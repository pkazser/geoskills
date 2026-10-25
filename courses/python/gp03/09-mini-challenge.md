# 9. Mini Challenge

## Το ζητούμενο

Δημιούργησε GIS dataset μόνο για assets σε `good` condition.

## Βήματα

1. φόρτωσε το CSV,
2. έλεγξε schema και missing values,
3. δημιούργησε Points με `EPSG:4326`,
4. φιλτράρισε `condition == "good"`,
5. εκτέλεσε QA checks,
6. δημιούργησε χάρτη,
7. εξήγαγε σε GeoJSON και GeoPackage,
8. ξαναδιάβασε τουλάχιστον το ένα αποτέλεσμα.

## Readiness checkpoint

Μπορείς να εξηγήσεις ποια είναι η διαφορά ανάμεσα στο αρχικό CSV και στο τελικό GIS dataset;

## Αναμενόμενο αποτέλεσμα

Το αποτέλεσμα `good` πρέπει να περιέχει μόνο features με `condition == "good"`, να διατηρεί τα IDs και τη geometry και να έχει το ίδιο CRS με το αρχικό GeoDataFrame.

## QA checkpoint

```python
assert good.geometry.geom_type.eq("Point").all()
assert good.crs.to_epsg() == 4326
assert (good["condition"] == "good").all()
```

Η άσκηση ολοκληρώνεται όταν μπορείς να ανοίξεις το exported αρχείο ξανά και να εξηγήσεις πόσα features κράτησες.

## Ερώτηση σκέψης

Αν το GeoJSON και το GeoPackage έχουν διαφορετικό πλήθος features μετά το export, ποιο στάδιο θα ελέγξεις πρώτο; Μην υποθέσεις ότι φταίει το format· σύγκρινε το subset πριν από το write, τα layer names και το αρχείο που ξαναδιαβάστηκε.
