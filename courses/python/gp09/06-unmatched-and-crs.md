# 6. Unmatched features και CRS

## Τι θα μάθεις

Θα εντοπίζεις features χωρίς χωρικό match και θα προετοιμάζεις συμβατά CRS.

## Έλεγχος

## Ερμηνεία unmatched

Unmatched feature μπορεί να είναι εκτός περιοχής, λάθος coordinate ή feature που δεν καλύπτεται από το right layer. Το map και τα bounds βοηθούν να ξεχωρίσεις data gap από λάθος predicate.

```python
unmatched = joined[joined["district_id"].isna()]
```

Τα unmatched μπορεί να είναι εκτός study area, να έχουν λάθος coordinates ή να χρησιμοποιούν ασύμβατο CRS.

## Πρακτική

Το S06 είναι εσκεμμένα εκτός των districts. Μέτρησέ το και έλεγξε τα bounds του σε σχέση με τα bounds των polygons.

## CRS

Πριν το `sjoin`, τα δύο GeoDataFrames πρέπει να έχουν ίδιο CRS. Αν όχι, χρησιμοποίησε `districts = districts.to_crs(services.crs)` αφού επιβεβαιώσεις ότι το αρχικό CRS κάθε layer είναι σωστό.

## QA

Έλεγξε CRS, rows, null matches, geometry retention και map. Μην “διορθώνεις” το πρόβλημα με `set_crs` χωρίς τεκμηρίωση.

Ένα `NaN` στο transferred attribute μπορεί να σημαίνει feature εκτός περιοχών, gap μεταξύ polygons, boundary issue, λάθος CRS, λάθος predicate ή προβληματική geometry. Δεν είναι κάθε unmatched row σφάλμα. Έλεγξε πρώτα κοινό CRS, bounds, validity και χάρτη και μετά αποφάσισε αν χρειάζεται αλλαγή predicate ή διόρθωση δεδομένων.

## Επόμενο βήμα

Θα συγκεντρώσεις τα joined points ανά district.
