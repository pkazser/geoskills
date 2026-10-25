# GP10 — Clip / Intersection / Overlay

Το GP10 είναι το πρώτο module όπου η χωρική πράξη αλλάζει ουσιαστικά τις geometries. Θα περιορίσεις δεδομένα σε περιοχή μελέτης και θα συνδυάσεις polygon layers. Η ροή είναι **Κατανοώ → Ελέγχω → Επεξεργάζομαι → Επαληθεύω → Εξάγω**.

## Τι θα μάθεις

Θα ξεχωρίζεις `clip`, spatial join και overlay/intersection, θα δουλεύεις με mask, θα ελέγχεις validity και empty geometries και θα συγκρίνεις area πριν/μετά. Το `../../../downloads/python/data/gp10/` περιέχει study area, land-use polygons και protected zone.

| Εργαλείο | Τι αλλάζει στη geometry | Τι γίνεται στα attributes | Πότε το χρησιμοποιούμε |
|---|---|---|---|
| Clip | Κόβει το input στη mask | Κρατά κυρίως attributes του input | Περιοχή μελέτης |
| Spatial join | Δεν κόβει geometry | Προσθέτει attributes βάσει σχέσης | Αντιστοίχιση features |
| Overlay / intersection | Δημιουργεί γεωμετρία τομής | Συνδυάζει attributes και των δύο layers | Ανάλυση κοινής έκτασης |

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp10_clip_intersection_overlay_starter.ipynb)

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.

## Mini Challenge και readiness checkpoint

Κόψε το land-use στη study area και βρες την τομή του με την protected zone. Είσαι έτοιμος όταν μπορείς να εξηγήσεις γιατί αλλάζουν rows, geometries, attributes και areas.
