# 6. Unmatched features και CRS

## Στόχος

Θα εντοπίζεις unmatched features και θα ξεχωρίζεις data gap από τεχνικό σφάλμα.

```python
unmatched = joined_left[joined_left["district_id"].isna()]
```

Η S06 είναι σκόπιμα εκτός των districts. Έλεγξε bounds, κοινό CRS, validity και χάρτη πριν αλλάξεις predicate. Μην χρησιμοποιείς `set_crs` για να «διορθώσεις» συντεταγμένες χωρίς τεκμηρίωση.

Ελεγχόμενη άσκηση: εξήγησε ποια από τις αιτίες —εκτός περιοχής, gap, boundary, CRS ή predicate— ταιριάζει στα δεδομένα.

## Μετάβαση

Αφού ξεχωρίσεις έγκυρο unmatched από σφάλμα, μπορείς να συγκεντρώσεις μόνο τα matched rows χωρίς να χάσεις την αρχική QA αναφορά.
