# 5. Explore — τι δείχνουν τα δεδομένα πριν από την ανάλυση;

## Τι θα μάθεις

Θα χρησιμοποιήσεις counts, summaries, bounds και έναν πρώτο χάρτη για να καταλάβεις το dataset πριν εφαρμόσεις spatial operations.

## Γιατί είναι χρήσιμο

Η εξερεύνηση βρίσκει ασυνέπειες που δεν φαίνονται σε έναν πίνακα και προστατεύει από άσκοπη ανάλυση. Ένας χάρτης είναι QA, όχι διακόσμηση.

## Παραδείγματα

```python
print(services_p.groupby(["category", "status"]).size())
print(services_p["zone_id"].value_counts(dropna=False))
ax = zones_p.plot(facecolor="none", edgecolor="black")
services_p.plot(ax=ax, column="category", legend=True)
```

Το πρώτο summary δείχνει αν οι κατηγορίες και τα status έχουν λογικές τιμές. Η δεύτερη καταμέτρηση θα γίνει αφού προηγηθεί spatial join. Ο χάρτης πρέπει να δείχνει σημεία μέσα στη study area και όχι απρόσμενα μακριά.

## Εφαρμογή στο dataset

Οι καθαρές υπηρεσίες είναι 7. Με `gpd.sjoin(services_p, zones_p[["zone_id", "geometry"]], predicate="within", how="left")` κάθε σημείο πρέπει να πάρει μία ζώνη. Κράτησε το αποτέλεσμα ως `services_with_zones` και έλεγξε unmatched rows.

## QA

Έλεγξε rows πριν/μετά το join, duplicate `service_id`, missing `zone_id`, geometry types και map bounds. Αν ένα σημείο έχει δύο ζώνες, έλεγξε boundary και predicate· αν κανένα δεν έχει ζώνη, έλεγξε CRS και study area.

## Πρόσεξε / checkpoint

Το `sjoin` προσθέτει attributes, δεν κόβει σημεία ούτε αποδεικνύει ότι μια υπηρεσία είναι “προσβάσιμη”. Μικρή άσκηση: βρες ποια ζώνη έχει τις περισσότερες ενεργές υπηρεσίες και γράψε αν αυτό αρκεί για συμπέρασμα δικαιοσύνης.

## Επόμενο lesson

Στο επόμενο lesson μετατρέπεις την εξερεύνηση σε χωρική ανάλυση με buffer, clip και overlay.
