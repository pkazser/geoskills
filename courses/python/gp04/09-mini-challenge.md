# 9. Mini Challenge

## Το ζητούμενο

Εξερεύνησε το layer `water_points` και κράτησε μόνο τα σημεία με `status == "active"`.

## Βήματα

1. εντόπισε τα layers,
2. διάβασε το `water_points`,
3. έλεγξε rows, columns, CRS και geometry type,
4. μέτρησε missing και invalid geometries,
5. εφάρμοσε το φίλτρο,
6. δημιούργησε χάρτη,
7. εκτέλεσε QA checks,
8. εξήγαγε το αποτέλεσμα σε GeoJSON.

## Ερώτηση

Γιατί οι QA checks για το `water_points` πρέπει να είναι διαφορετικοί από τους checks για το `parks`;

## Αναμενόμενο αποτέλεσμα

Το `water_points` έχει Point geometries και τρία features. Με το φίλτρο `active` πρέπει να παραμείνουν δύο σημεία. Ο χάρτης πρέπει να δείχνει τα ενεργά σημεία στην περιοχή των πάρκων.

## QA checkpoint

```python
assert active_water.geometry.geom_type.eq("Point").all()
assert active_water.crs.to_epsg() == 4326
assert (active_water["status"] == "active").all()
```

Η άσκηση ολοκληρώνεται όταν μπορείς να εξηγήσεις γιατί χρησιμοποίησες Point checks και όχι Polygon checks.

Πρόσθεσε μία πρόταση readiness: ποιο layer θα επέλεγες για επόμενη ανάλυση και ποιο check σε κάνει να το εμπιστεύεσαι; Αν δεν μπορείς να αναφέρεις schema, CRS, geometry και bounds, το challenge δεν έχει ολοκληρωθεί.
