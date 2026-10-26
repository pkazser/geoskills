# 6. Workflow με overlay

## Στόχος

Να υπολογίσεις και να ελέγξεις τη νέα κοινή γεωμετρία των δύο layers.

## Καθοδηγούμενο παράδειγμα

Χρησιμοποίησε το `clipped` ως πρώτο input και το `protected` ως δεύτερο.

```python
overlay = gpd.overlay(clipped, protected, how="intersection")
overlay["area_m2"] = overlay.geometry.area
```

Έλεγξε ότι το output περιέχει `landuse` και `zone_name`, ότι έχει θετικές valid geometries και ότι το area δεν υπερβαίνει το αντίστοιχο clipped input. Η πράξη αλλάζει geometry και μπορεί να δημιουργήσει περισσότερες output rows.

Ελεγχόμενη άσκηση: εξήγησε γιατί το spatial join δεν θα έδινε την ίδια geometry.

## Checkpoint

Έλεγξε τα IDs και από τις δύο πλευρές, τα geometry types και το συνολικό area. Η intersection απαντά κοινή έκταση, όχι απλώς «σε ποια ζώνη ανήκει».
