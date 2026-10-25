# 1. Τι είναι clip

## Τι θα μάθεις

## Νοητικό μοντέλο

Το clip έχει input layer και mask. Αλλάζει τη geometry των input features, κρατά τα input attributes και περιορίζει το spatial extent. Δεν προσθέτει attributes από τη mask όπως ένα spatial join.

Θα περιορίσεις ένα layer σε μια περιοχή μελέτης.

## Γιατί είναι χρήσιμο

Συχνά ένα dataset καλύπτει ολόκληρη χώρα, ενώ η ανάλυση αφορά έναν δήμο ή μια ζώνη έργου. Το `clip` κρατά μόνο το γεωγραφικό τμήμα που σε ενδιαφέρει.

## Παράδειγμα

```python
clipped = gpd.clip(landuse, study_area)
```

Το `landuse` είναι input και το `study_area` mask. Οι γεωμετρίες του input κόβονται στα όρια της mask, ενώ τα attributes του landuse διατηρούνται.

## Εφαρμογή / QA

Κάνε clip σε EPSG:2100 και έλεγξε rows, geometry types, validity και bounds. Όλα τα clipped bounds πρέπει να βρίσκονται μέσα ή πάνω στα bounds της study area.

## Πρόσεξε

Το clip αλλάζει geometry. Αν θέλεις μόνο να προσθέσεις το όνομα της περιοχής, χρειάζεσαι spatial join.

Το clip απαντά «ποιο τμήμα του input βρίσκεται μέσα στη mask;». Σε Points κρατά ή απορρίπτει σημεία, σε Lines μπορεί να κόψει τη γραμμή στο boundary και σε Polygons μπορεί να κόψει το polygon. Άρα το clip μπορεί να αλλάξει geometry, σε αντίθεση με ένα απλό attribute filter.

## Επόμενο βήμα

Θα δεις πώς η intersection αποτελεί overlay operation.
