# 8. QA, map και export

## Τι θα μάθεις

## Τελική λογική επικύρωση

Το QA πρέπει να συμφωνεί με το ερώτημα: rows πριν/μετά, null matches, μοναδικά IDs, CRS, geometry retention, bounds και map. Η απουσία exception δεν αποδεικνύει σωστό spatial relationship.

Θα ελέγχεις αν το spatial join είναι λογικά σωστό πριν το παραδώσεις.

## Checklist

Έλεγξε counts πριν/μετά, null matches, μοναδικά IDs, CRS, `Point` geometry, bounds και map. Επιβεβαίωσε ότι τα matched points εμφανίζονται μέσα στα σωστά polygons.

```python
assert joined_left.crs.to_epsg() == 4326
assert joined_left.geometry.geom_type.eq("Point").all()
assert joined_left["service_id"].nunique() == len(services)
```

## Export

```python
joined_left.to_file("gp09_services_by_district.gpkg", layer="services", driver="GPKG")
```

Το export κρατά geometry και attributes. Το summary counts μπορεί να αποθηκευτεί ως CSV.

## Πρόσεξε

“Ο κώδικας έτρεξε” δεν σημαίνει ότι το predicate, το CRS ή το πλήθος matches είναι σωστά.

Το τελικό QA πρέπει να απαντά: ποιο ήταν το before count, πόσα rows προέκυψαν, πόσα unique source IDs υπάρχουν, πόσα unmatched matches έχουμε, αν το CRS/geometry διατηρήθηκε και αν ο χάρτης δείχνει λογική αντιστοίχιση. Ο χάρτης των unmatched points είναι ιδιαίτερα χρήσιμος, γιατί αποκαλύπτει outliers ή gaps που ένας πίνακας δεν εξηγεί.

## Επόμενο βήμα

Στο Mini Challenge θα επαναλάβεις ολόκληρο το workflow.
