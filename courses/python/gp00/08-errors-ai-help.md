# 8. Λάθη, debugging και βοήθεια από ΤΝ

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_08_errors_ai_help_starter.ipynb)

## Τι θα μάθεις

- βασικά errors,
- debugging,
- QA,
- υπεύθυνη χρήση ΤΝ.

## Τι πρόβλημα λύνουμε

Στο GeoPython ένα error μπορεί να σημαίνει απλό typo, λάθος τύπο, λάθος path ή βαθύτερο GIS λάθος. Επιπλέον, κώδικας που εκτελείται χωρίς error μπορεί να έχει λάθος coordinates ή CRS. Χρειαζόμαστε διαδικασία debugging και QA.

## Τα errors είναι φυσιολογικά

Σημαντικό δεν είναι να μην κάνεις ποτέ λάθος, αλλά να μπορείς να εντοπίζεις και να διορθώνεις προβλήματα.

## Συνηθισμένα errors

### SyntaxError

```python
if elevation > 100
    print(elevation)
```

### NameError

```python
city = "Serres"
print(City)
```

### TypeError

```python
distance = "100"
result = distance + 50
```

### KeyError

```python
point = {"name": "P1", "elevation": 82}
print(point["height"])
```

### IndexError

```python
cities = ["Serres", "Drama", "Kavala"]
print(cities[3])
```

## Debugging

```text
1. Διαβάζω το error
2. Βρίσκω τη γραμμή
3. Ελέγχω μεταβλητές και τύπους
4. Δοκιμάζω μικρότερο παράδειγμα
5. Διορθώνω
6. Εκτελώ ξανά
7. Ελέγχω το αποτέλεσμα
```

Η σειρά είναι σημαντική: πρώτα διαβάζεις ολόκληρο το μήνυμα και τη γραμμή, μετά ελέγχεις μικρό δείγμα και μόνο στο τέλος ζητάς πιο σύνθετη λύση. Αν αλλάξεις πολλές γραμμές μαζί, δεν θα ξέρεις ποια αλλαγή έλυσε ή δημιούργησε το πρόβλημα.

## Ο κώδικας μπορεί να τρέχει και να είναι λάθος

```python
Point(latitude, longitude)
```

μπορεί να εκτελεστεί αλλά να αντιστρέφει X/Y.

## GeoPython QA

```python
print("Rows:", len(gdf))
print("CRS:", gdf.crs)
print(gdf.geometry.geom_type.value_counts())
print(gdf.total_bounds)
```

Κάθε check απαντά διαφορετική ερώτηση: rows για πληρότητα, CRS για μονάδες/συμβατότητα, geometry types για το είδος του output και bounds για γεωγραφική λογική. Πρόσθεσε `isna`, `is_empty` και `is_valid` όταν η πράξη δημιουργεί geometry.

## ΤΝ ως βοηθός

Δεν κάνουμε:

```text
Copy → Paste → Run → Τέλος
```

Αλλά:

```text
Ρωτάω → Κατανοώ → Εκτελώ → Ελέγχω → Διορθώνω
```

Όταν ζητάς βοήθεια από ΤΝ, δώσε μικρό reproducible παράδειγμα, το ακριβές error και τι περίμενες να συμβεί. Διάβασε τη λύση γραμμή-γραμμή, εκτέλεσέ την σε αντίγραφο και επιβεβαίωσε το αποτέλεσμα με QA. Η ΤΝ μπορεί να προτείνει `to_crs` ενώ το πρόβλημα είναι λάθος αρχικό CRS· η απόφαση παραμένει δική σου.

## Mini Challenge

Διόρθωσε:
- αντιστροφή longitude/latitude,
- `GDF` αντί `gdf`.

### Checkpoint

Για κάθε διόρθωση γράψε: ποιο error ή λάθος αποτέλεσμα είδες, ποια υπόθεση έλεγξες και ποιο QA επιβεβαίωσε τη λύση. Αν ένα snippet “δουλεύει” αλλά τα bounds είναι εκτός περιοχής, μην το θεωρήσεις επιτυχία.

## Τι κρατάμε

Η σωστή διαδικασία είναι **Ask → Understand → Execute → Validate → Correct**. Η επίλυση error και η επικύρωση γεωχωρικού αποτελέσματος είναι ξεχωριστά βήματα.

## Επόμενο βήμα

**Mini Challenge**

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
