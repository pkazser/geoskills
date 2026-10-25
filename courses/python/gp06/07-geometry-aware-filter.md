# 7. Geometry-aware filtering

## Τι θα μάθεις

Θα περιορίζεις features και με βάση τη θέση τους, όχι μόνο τα attributes.

## Παράδειγμα

## Attribute και θέση

Το attribute filter απαντά “τι είναι;”, ενώ το bbox απαντά “πού βρίσκεται;”. Για σύνθετο ερώτημα χρησιμοποίησε και τα δύο και έλεγξε ότι το CRS του bbox και του layer έχει ίδιες μονάδες.

```python
inside_box = gdf.cx[23.55:23.60, 41.08:41.11]
```

Το `.cx` χρησιμοποιεί χωρικό index με σειρά x/y, δηλαδή longitude/latitude εδώ. Είναι απλό bbox φίλτρο, όχι πλήρης έλεγχος αν ένα feature βρίσκεται μέσα σε πολύπλοκο polygon.

## Εφαρμογή

Συνδύασέ το με `status == "active"` και δες ποια υποδομή βρίσκεται στο μικρό παράθυρο γύρω από το Serres.

## QA

Έλεγξε `total_bounds` του subset και ότι όλες οι x/y είναι εντός των ορίων. Έλεγξε επίσης το CRS: το bbox πρέπει να έχει τις ίδιες μονάδες με το dataset.

## GeoTip

Για πραγματικό polygon-of-interest θα χρειαστείς spatial predicate όπως `within` ή `intersects`, αφού πρώτα ευθυγραμμίσεις CRS.

Το attribute filter εξετάζει πεδία, ενώ η spatial επιλογή εξετάζει σχέση θέσης. Το `gdf.cx[...]` είναι ένας απλός χωρικός περιορισμός με bounding box· δεν σημαίνει ότι το feature τέμνει κάποιο συγκεκριμένο polygon. Κράτησε τη διάκριση: filtering rows με attributes δεν αλλάζει geometry ή CRS των features.

## Επόμενο βήμα

Θα οργανώσεις ένα πλήρες QA μετά το filtering.
