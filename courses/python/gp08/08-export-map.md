# 8. Export και οπτικός έλεγχος

## Τι θα μάθεις

Θα αποθηκεύεις το buffer αποτέλεσμα και θα επιβεβαιώνεις ότι έχει γεωγραφικό νόημα.

## Τι παραδίδουμε

Το export πρέπει να περιλαμβάνει `buffer_m`, source ID, CRS και geometry. Μετά το write ξαναδιάβασε το layer, έλεγξε rows/geometry/CRS/IDs/bounds και κάνε plot για να επιβεβαιώσεις ότι η ζώνη βρίσκεται στη σωστή θέση. Η εικόνα συμπληρώνει τους αριθμητικούς ελέγχους· δεν τους αντικαθιστά.

```python
school_buffers["buffer_m"] = 500
school_buffers.to_file(
    "gp08_buffers.gpkg", layer="school_buffers", driver="GPKG"
)
```

Το GeoPackage κρατά CRS, attributes και geometry. Κράτησε τα IDs των αρχικών υπηρεσιών για να ξέρεις ποιο buffer αντιστοιχεί σε ποιο feature.

## Πρόβλεψε → Εκτέλεσε → Έλεγξε

Πριν γράψεις το αρχείο, πρόβλεψε ποια layers και fields θα περιέχει. Μετά το `to_file` διάβασε ξανά το layer με `gpd.read_file(..., layer=...)` και σύγκρινε rows, CRS, geometry type, IDs και bounds. Η ύπαρξη αρχείου στον δίσκο δεν αρκεί ως έλεγχος.

## Πριν το export

Έλεγξε rows, CRS EPSG:2100, Polygon/MultiPolygon geometry, μη κενές και valid geometries, bounds και θετικά areas. Έπειτα κάνε plot ή άνοιξε το layer σε GIS.

## Αναμενόμενο αποτέλεσμα

Τα buffers πρέπει να περιβάλλουν τις δύο σχολικές θέσεις και να έχουν ακτίνα 500 m στη σωστή κλίμακα. Αν καλύπτουν ολόκληρη την περιοχή, κάτι πήγε λάθος σε CRS ή units.

Στο export κράτησε τη νέα geometry ως ξεχωριστό layer, ώστε να μην αντικαταστήσεις το αρχικό services/roads layer. Μετά το write ξαναδιάβασε το layer και έλεγξε rows, CRS, Polygon geometry, `buffer_m`, source IDs και bounds με κατάλληλη αριθμητική ανοχή. Ο χάρτης πρέπει να δείχνει buffer γύρω από το σωστό feature και λογικό μέγεθος. Η οπτική συμφωνία από μόνη της δεν αποδεικνύει πλήρη χωρική ορθότητα.

## Επόμενο βήμα

Στο Mini Challenge θα ολοκληρώσεις το workflow.
