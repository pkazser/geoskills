# 7. Filtering layer

## Τι θα μάθεις

Θα κρατήσεις μόνο τα features που απαντούν σε ένα συγκεκριμένο ερώτημα.

## Τι πρόβλημα λύνουμε

Δεν χρειάζεται πάντα ολόκληρο το layer. Το ερώτημα “ποια πάρκα έχουν τουλάχιστον 5 ha;” είναι attribute filter και δεν αλλάζει τη geometry.

```python
large_parks = parks[parks["area_ha"] >= 5].copy()
```

Με το `.copy()` δημιουργούμε ανεξάρτητο αποτέλεσμα για επόμενες αλλαγές ή export.

Το filtering επιστρέφει νέο subset. Έλεγξε counts πριν/μετά, values του `area_ha`, CRS και geometry retention. Αν το subset είναι κενό, έλεγξε πρώτα μονάδες και όριο.

## Έλεγχος φίλτρου

```python
print("Αρχικά:", len(parks))
print("Επιλεγμένα:", len(large_parks))
assert (large_parks["area_ha"] >= 5).all()
```

Πάντα ελέγχουμε ότι το φίλτρο δεν επέστρεψε απροσδόκητα μηδέν features.

## Γιατί είναι χρήσιμο

Το filtering μετατρέπει ένα γενικό layer σε dataset που απαντά συγκεκριμένο ερώτημα. Η geometry παραμένει μαζί με τα attributes, άρα το αποτέλεσμα μπορεί να χαρτογραφηθεί ή να εξαχθεί.

## Πρακτική εκτέλεση

```python
print(large_parks[["name", "area_ha"]])
large_parks.plot(figsize=(7, 6), color="darkgreen")
```

Στο dataset θα κρατηθούν τα πάρκα με εμβαδόν τουλάχιστον 5 ha. Παρατήρησε ότι το φίλτρο γίνεται πάνω σε attribute και όχι πάνω στη geometry.

## Πρόσεξε

Μετά από φίλτρο χρησιμοποίησε `.copy()` όταν πρόκειται να αλλάξεις ή να εξάγεις το αποτέλεσμα. Έτσι αποφεύγεις ασαφείς chained assignments.

Το filtering εδώ είναι attribute filtering και συνδέεται με το GP06. Πριν γράψεις σύνθετες συνθήκες, επιθεώρησε τα πραγματικά values με `unique()` ή `value_counts()`. Μετά το filter σύγκρινε rows πριν/μετά και έλεγξε ότι κάθε result ικανοποιεί τον κανόνα. Δεν φιλτράρουμε geometry “επειδή φαίνεται κοντά” χωρίς spatial predicate.
