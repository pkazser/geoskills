# 6. Εισαγωγή στο pandas

## Πρακτική άσκηση στο Colab

[Άνοιγμα στο Google Colab](https://colab.research.google.com/github/pkazser/geoskills/blob/main/downloads/python/notebooks/starter/gp00_06_pandas_starter.ipynb)

## Τι θα μάθεις

- `DataFrame`,
- `head()`, `tail()`,
- `shape`, `columns`, `dtypes`,
- επιλογή στηλών,
- νέες στήλες,
- filtering,
- missing values,
- `read_csv()` και `to_csv()`.

## Τι πρόβλημα λύνουμε

Ένα CSV είναι αρχείο, όχι ακόμη ανάλυση. Χρειαζόμαστε πίνακα με γραμμές, στήλες και τύπους ώστε να απαντήσουμε “πόσα records έχω;”, “ποιες τιμές λείπουν;” και “ποια σημεία περνούν το κριτήριο;”.

## Νοητικό μοντέλο

Το DataFrame είναι attribute table χωρίς geometry. Οι γραμμές είναι records, οι στήλες μεταβλητές και το `shape` επιστρέφει `(rows, columns)`. Το `dtypes` είναι QA για το αν οι στήλες μπορούν να χρησιμοποιηθούν όπως περιμένεις.

## Δημιουργία DataFrame

```python
import pandas as pd

data = {
    "city": ["Serres", "Drama", "Kavala"],
    "population": [60000, 45000, 70000]
}

df = pd.DataFrame(data)
df
```

## Βασικός έλεγχος

```python
df.head()
df.shape
df.columns
df.dtypes
```

Το `head()` είναι δείγμα, όχι απόδειξη ότι όλο το αρχείο είναι σωστό. Συνδύασέ το με `shape`, `columns`, `dtypes`, `isna().sum()` και μοναδικές τιμές σε κατηγορικές στήλες.

> 💡 **GeoTip**
>
> Αν έχεις δουλέψει με attribute table στο QGIS, έχεις ήδη τη βασική νοητική εικόνα ενός DataFrame.

## Νέα στήλη

```python
df["country"] = "Greece"
```

Υπολογισμός σε ολόκληρη στήλη:

```python
df["area_ha"] = df["area_m2"] / 10000
```

## Filtering

```python
df[df["population"] > 50000]
```

Πολλαπλές συνθήκες:

```python
df[
    df["active"] &
    (df["elevation"] > 100)
]
```

Οι παρενθέσεις και οι τελεστές `&` είναι σημαντικοί όταν συνδυάζεις Series. Το αποτέλεσμα είναι νέο DataFrame· το αρχικό παραμένει διαθέσιμο για σύγκριση πριν/μετά.

## Missing values

```python
df.isna().sum()
```

## CSV

```python
df = pd.read_csv("cities.csv")
```

και:

```python
df.to_csv("output.csv", index=False)
```

## DataFrame δεν σημαίνει GeoDataFrame

Αν υπάρχουν longitude/latitude δεν σημαίνει ότι υπάρχει geometry ή CRS.

Αυτό είναι κρίσιμο σημείο μετάβασης: το pandas μπορεί να ελέγξει columns και values, αλλά δεν μπορεί μόνο του να σχεδιάσει spatial relationships. Για αυτό το επόμενο lesson προσθέτει geometry και CRS με GeoPandas.

## Mini Challenge

Δημιούργησε DataFrame 5 σημείων και κράτησε μόνο active σημεία με elevation > 100.

### Αναμενόμενο αποτέλεσμα και QA

Πριν από το filter κράτησε `len(df)`. Μετά έλεγξε ότι `len(filtered) <= len(df)`, ότι όλες οι γραμμές έχουν `active == True` και ότι καμία επιλεγμένη elevation δεν είναι μικρότερη ή ίση του ορίου. Κάνε export με `index=False`, ώστε ο pandas index να μην γίνει ακούσια νέα στήλη.

## Τι κρατάμε

Το DataFrame είναι ο χώρος όπου κατανοούμε και καθαρίζουμε τον πίνακα. Το GeoDataFrame είναι το επόμενο βήμα όταν θέλουμε γεωμετρική ανάλυση.

## Επόμενο βήμα

**GeoPandas**

## Ενδεικτική λύση

> Ενδεικτική λύση: δεν δημοσιεύεται σύνδεσμος έτοιμης λύσης.
