# 4. Spatial framework — ένα κοινό CRS και κοινή γεωμετρική βάση

## Τι θα μάθεις

Θα εναρμονίσεις study area, zones, roads και services σε projected CRS κατάλληλο για Ελλάδα και μέτρα.

## Γιατί είναι χρήσιμο

Το `EPSG:4326` αποθηκεύει μοίρες. Για buffer 500 m, μήκη και areas θέλουμε μονάδες μέτρων. Για το συνθετικό project χρησιμοποιούμε το ελληνικό projected `EPSG:2100`, με την προϋπόθεση ότι ελέγχουμε τα bounds μετά τη μετατροπή.

```python
target_crs = "EPSG:2100"
study_p = study.to_crs(target_crs)
zones_p = zones.to_crs(target_crs)
roads_p = roads.to_crs(target_crs)
services_p = cleaned.to_crs(target_crs)
```

Το `to_crs` αλλάζει τις συντεταγμένες, όχι το νόημα των δεδομένων. Αν τα raw coordinates δεν είχαν δηλωθεί ως 4326, πρώτα θα χρειαζόταν `set_crs` με τεκμηρίωση.

## QA

Όλα τα layers πρέπει να έχουν ίδιο CRS, αναμενόμενα geometry types (`Polygon`, `LineString`, `Point`) και bounds σε μέτρα. Το study area πρέπει να περιέχει τα cleaned points και τα zone polygons να καλύπτουν τη study area χωρίς κενά στο συνθετικό παράδειγμα.

```python
for frame in (study_p, zones_p, roads_p, services_p):
    assert frame.crs.to_epsg() == 2100
    assert frame.geometry.notna().all()
    assert frame.geometry.is_valid.all()
```

## Αναμενόμενο αποτέλεσμα

Οι αρχικές τιμές bounds αλλάζουν από degrees σε meters και οι μεταγενέστερες αποστάσεις έχουν νόημα. Αν τα bounds παραμείνουν περίπου 23–24 και 41–42, κάτι δεν έγινε σωστά.

## GeoTip και checkpoint

Το “κατάλληλο CRS” εξαρτάται από περιοχή και εργασία. Μικρή άσκηση: σύγκρινε το ίδιο 500-unit buffer σε 4326 και 2100 και εξήγησε γιατί μόνο το δεύτερο αντιστοιχεί σε 500 m.

## Επόμενο lesson

Τώρα που υπάρχει κοινό spatial framework, μπορείς να εξερευνήσεις τη χωρική και θεματική κατανομή των υπηρεσιών.
