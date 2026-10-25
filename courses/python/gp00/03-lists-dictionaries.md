# 3. Λίστες και λεξικά

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_03_lists_dictionaries_starter.ipynb)

## Τι θα μάθεις

- λίστες,
- indexes,
- `append()`, `remove()`, `len()`,
- dictionaries,
- list of dictionaries,
- μετάβαση προς DataFrame.

## Τι πρόβλημα λύνουμε

Πριν από ένα DataFrame, συχνά κρατάμε μικρές συλλογές εγγραφών στη μνήμη. Για παράδειγμα, θέλουμε να περιγράψουμε τρία survey points, το καθένα με όνομα, coordinates και elevation. Η λίστα οργανώνει τις εγγραφές και το dictionary οργανώνει τα πεδία μιας εγγραφής.

## Νοητικό μοντέλο

Σκέψου μια λίστα σαν σειρά γραμμών και ένα dictionary σαν μία γραμμή με ονομασμένες στήλες. Το `cities[0]` ζητά την πρώτη εγγραφή, ενώ το `point["name"]` ζητά μία συγκεκριμένη τιμή. Αυτή η αντιστοίχιση θα σε βοηθήσει να καταλάβεις αργότερα το DataFrame.

## Λίστα

```python
cities = ["Serres", "Drama", "Kavala"]
print(cities)
```

Η αρίθμηση ξεκινά από `0`:

```python
print(cities[0])
```

## Προσθήκη

```python
cities.append("Thessaloniki")
```

## Αριθμητικές λίστες

```python
elevations = [82.4, 95.1, 105.3, 74.8]

print(min(elevations))
print(max(elevations))
print(sum(elevations) / len(elevations))
```

## Dictionary

```python
point = {
    "name": "Station A",
    "longitude": 23.55,
    "latitude": 41.09,
    "elevation": 125.4
}
```

Πρόσβαση:

```python
print(point["name"])
print(point["elevation"])
```

Το key είναι το όνομα του πεδίου και το value η τιμή του. Αν ζητήσεις key που δεν υπάρχει, θα πάρεις `KeyError`. Για ασφαλή διερεύνηση μπορείς να χρησιμοποιήσεις `point.get("elevation")`, αλλά σε εκπαιδευτικό workflow είναι χρήσιμο να βλέπεις το error και να ελέγχεις τη δομή.

> 💡 **GeoTip**
>
> Ένα dictionary μοιάζει με μία εγγραφή attribute table.

## List of dictionaries

```python
points = [
    {"name": "P1", "longitude": 23.55, "latitude": 41.09},
    {"name": "P2", "longitude": 23.56, "latitude": 41.10},
    {"name": "P3", "longitude": 23.57, "latitude": 41.08}
]
```

## Από list of dictionaries σε pandas

```python
import pandas as pd
df = pd.DataFrame(points)
df
```

Το `pd.DataFrame(points)` μετατρέπει κάθε dictionary σε γραμμή και τα κοινά keys σε columns. Αν ένα dictionary λείπει ένα key, το pandas θα δημιουργήσει missing value. Αυτό είναι φυσιολογικό και θα το ελέγξεις αργότερα με `isna()`.

## Mini άσκηση

Δημιούργησε τρία σημεία με `id`, `name`, `x`, `y`, `elevation` και εμφάνισε:
- το δεύτερο σημείο,
- το elevation του τρίτου,
- πόσα σημεία υπάρχουν.

### Checkpoint

Πριν εκτελέσεις, πρόβλεψε τα outputs: ο δεύτερος δείκτης είναι `1`, το πλήθος είναι `3` και το elevation του τρίτου προέρχεται από το key `elevation`, όχι από τη θέση του μέσα στο dictionary. Έλεγξε επίσης ότι τα keys έχουν συνεπή ονοματολογία (`longitude`/`latitude` και όχι άλλοτε `x`/`y`).

## Τι κρατάμε

Η λίστα απαντά “πόσες και με ποια σειρά;”, ενώ το dictionary απαντά “ποιο πεδίο αυτής της εγγραφής;”. Για πραγματικά datasets θα περάσουμε από αυτή τη δομή σε DataFrame και έπειτα σε GeoDataFrame.

## Επόμενο βήμα

**Συνθήκες και επαναλήψεις**

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
