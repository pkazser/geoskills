# 6. Spatial analysis — buffer, clip και overlay με νόημα

## Τι θα μάθεις

Θα δημιουργήσεις service buffers, θα κόψεις roads στη study area και θα υπολογίσεις κάλυψη ανά ζώνη χωρίς να μπερδέψεις τις διαφορετικές πράξεις.

## Γιατί είναι χρήσιμο

Το buffer μοντελοποιεί μια απλή απόσταση γύρω από feature, το clip περιορίζει δεδομένα σε mask και το overlay συνδυάζει γεωμετρίες/attributes. Η επιλογή εργαλείου πρέπει να ακολουθεί το ερώτημα.

## Workflow

```python
active_essential = services_p[
    (services_p["status"] == "active") &
    (services_p["category"].isin(["Health", "Emergency"]))
].copy()
service_buffers = active_essential.copy()
service_buffers["geometry"] = service_buffers.geometry.buffer(500)
clipped_roads = gpd.clip(roads_p, study_p)
coverage_union = service_buffers[["geometry"]].dissolve()
coverage_by_zone = gpd.overlay(zones_p, coverage_union, how="intersection")
coverage_by_zone["covered_m2"] = coverage_by_zone.geometry.area
```

Το dissolve πριν από το overlay αποφεύγει διπλή καταμέτρηση στις επικαλυπτόμενες buffers. Για πλήρη πίνακα όλων των ζωνών, κάνε `zones_p.overlay(..., how="difference")` ή spatially combine με τρόπο που κρατά και μη καλυμμένες ζώνες.

## Εφαρμογή στο dataset

Οι ενεργές Health/Emergency υπηρεσίες είναι τρία σημεία. Το `service_buffers` πρέπει να έχει τρία polygons, τα `clipped_roads` τρεις γραμμές ή λιγότερα τμήματα και το τελικό coverage να μπορεί να συγκριθεί ανά `zone_id`. Για ποσοστό κάλυψης χρησιμοποίησε `zone_area_m2 = zones_p.geometry.area` και όχι degrees.

## QA και λογικός έλεγχος

Όλα τα area values πρέπει να είναι θετικά. `covered_m2` δεν μπορεί να ξεπερνά το area της αντίστοιχης ζώνης. Ο χάρτης πρέπει να δείχνει buffers μέσα/γύρω από τα σημεία και roads κομμένους στο study area.

## Πρόσεξε

Το buffer των 500 m είναι απλοποίηση απόστασης, όχι network service area. Μην το παρουσιάσεις ως χρόνο πρόσβασης ή ως κάλυψη πληθυσμού.

## Checkpoint και μετάβαση

Μικρή άσκηση: άλλαξε το threshold σε 750 m και σύγκρινε μόνο `covered_m2` και όχι αυθαίρετα τη “δικαιοσύνη”. Στο επόμενο lesson θα κάνεις πλήρες QA πριν επιτρέψεις export.
