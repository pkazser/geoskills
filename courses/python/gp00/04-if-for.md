# 4. Συνθήκες και επαναλήψεις

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_04_if_for_starter.ipynb)

## Τι θα μάθεις

- `if`, `elif`, `else`,
- συγκρίσεις,
- `and`, `or`,
- `for`,
- συνδυασμό `for` + `if`,
- βασική λογική filtering.

## Τι πρόβλημα λύνουμε

Σε μια απογραφή θέλουμε να ξεχωρίσουμε σημεία που πληρούν κριτήριο: ενεργές εγκαταστάσεις, υψόμετρο πάνω από όριο ή απόσταση μικρότερη από 500 m. Η `if` παίρνει μία απόφαση για μία τιμή, ενώ η `for` επαναλαμβάνει την ίδια λογική για πολλές τιμές.

## Νοητικό μοντέλο

Η συνθήκη επιστρέφει `True` ή `False`. Η Python εκτελεί το indented block μόνο όταν ισχύει. Η `for` δεν “καταλαβαίνει” GIS· περνά μία-μία τις εγγραφές και εσύ αποφασίζεις τι θα εμφανίσεις ή θα κρατήσεις.

## `if`

```python
elevation = 125

if elevation > 100:
    print("Το σημείο βρίσκεται πάνω από 100 m")
```

## `if / else`

```python
elevation = 80

if elevation > 100:
    print("Υψηλό σημείο")
else:
    print("Χαμηλότερο σημείο")
```

## `elif`

```python
elevation = 350

if elevation < 100:
    print("Low")
elif elevation < 500:
    print("Medium")
else:
    print("High")
```

## `for`

```python
cities = ["Serres", "Drama", "Kavala"]

for city in cities:
    print(city)
```

## `for` + `if`

```python
elevations = [82.4, 95.1, 105.3, 174.8]

for elevation in elevations:
    if elevation > 100:
        print(elevation)
```

Η μεταβλητή `elevation` αλλάζει σε κάθε επανάληψη. Δεν αλλάζει η αρχική λίστα. Αν θέλεις νέο subset, χρειάζεσαι νέα λίστα και `append()`, όπως στο παράδειγμα με τις αποστάσεις.

## Φιλτραρισμένη λίστα

```python
distances = [120, 350, 620, 180, 900]
nearby = []

for distance in distances:
    if distance <= 500:
        nearby.append(distance)

print(nearby)
```

## Πολλαπλές συνθήκες

```python
for poi in pois:
    if poi["category"] == "school" and poi["distance_m"] <= 500:
        print(poi["name"])
```

Το `and` απαιτεί να ισχύουν και τα δύο κριτήρια. Το `or` αρκεί να ισχύει ένα. Σε GeoPandas/Pandas θα συναντήσεις αργότερα `&` και `|`, επειδή εκεί οι συνθήκες είναι Series και όχι μία απλή τιμή.

## Mini Challenge

Κράτησε μόνο ενεργά σημεία με elevation > 100.

### Αναμενόμενο αποτέλεσμα και QA

Πρόβλεψε πρώτα ποια records θα μείνουν. Μετά έλεγξε ότι κάθε αποτέλεσμα έχει `active == True` και `elevation > 100`. Αν δεν πάρεις τα αναμενόμενα σημεία, εμφάνισε προσωρινά τις τιμές των πεδίων· μην χαλαρώσεις τη συνθήκη χωρίς να καταλάβεις το γιατί.

## Τι κρατάμε

Οι συνθήκες είναι ο μηχανισμός λογικής του workflow. Το filtering ενός πραγματικού GeoDataFrame θα χρησιμοποιήσει την ίδια σκέψη, αλλά με vectorized σύνταξη.

## Επόμενο βήμα

**Συναρτήσεις και βιβλιοθήκες**

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
