# 9. Mini Challenge

## Το ζητούμενο

Δημιούργησε GIS dataset μόνο για assets σε `good` condition. Η άσκηση αξιοποιεί το ήδη ελεγμένο `gdf`, χωρίς να ξαναγράφει όλο το CSV-to-geometry workflow.

## Βήματα

1. ξεκίνα από το ελεγμένο `gdf`,
2. φιλτράρισε `condition == "good"`,
3. εκτέλεσε QA checks στο subset,
4. δημιούργησε χάρτη,
5. εξήγαγε το ίδιο subset σε GeoJSON και GeoPackage,
6. ξαναδιάβασε και σύγκρινε και τα δύο αποτελέσματα.

## Readiness checkpoint

Μπορείς να εξηγήσεις ποια είναι η διαφορά ανάμεσα στο αρχικό CSV και στο τελικό GIS dataset;

## Αναμενόμενο αποτέλεσμα

Το αποτέλεσμα `good` πρέπει να περιέχει 5 features με `condition == "good"`, να διατηρεί τα IDs και τη geometry και να έχει το ίδιο CRS με το αρχικό GeoDataFrame. Τα δύο formats πρέπει να περιέχουν τα ίδια selected features.

## QA checkpoint

Εκτέλεσε τα παρακάτω assertions αφού ολοκληρώσεις το Mini Challenge και δημιουργήσεις τη μεταβλητή `good` με τη δική σου λύση. Δεν αποτελούν έτοιμη λύση του φιλτραρίσματος.

```python
assert good.geometry.geom_type.eq("Point").all()
assert good.crs.to_epsg() == 4326
assert (good["condition"] == "good").all()
```

Η άσκηση ολοκληρώνεται όταν μπορείς να ανοίξεις και τα δύο exported αρχεία ξανά και να εξηγήσεις ότι κράτησες τα ίδια 5 features.

## Ερώτηση σκέψης

Αν το GeoJSON και το GeoPackage έχουν διαφορετικό πλήθος features μετά το export, ποιο στάδιο θα ελέγξεις πρώτο; Μην υποθέσεις ότι φταίει το format· σύγκρινε το subset πριν από το write, τα layer names και το αρχείο που ξαναδιαβάστηκε.
