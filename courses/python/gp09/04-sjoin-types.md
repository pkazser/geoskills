# 4. `gpd.sjoin()` και join types

## Τι θα μάθεις

## Αναμενόμενο αποτέλεσμα

Με `left` κρατάς το πλήρες inventory και βλέπεις unmatched ως null. Με `inner` παίρνεις μόνο τις επιβεβαιωμένες σχέσεις. Πριν το join κατέγραψε rows και μετά εξήγησε κάθε διαφορά.

Θα χρησιμοποιείς `left` και `inner` ανάλογα με το αν θέλεις να κρατήσεις unmatched features.

## Παράδειγμα

```python
left = gpd.sjoin(services, districts, how="left", predicate="within")
inner = gpd.sjoin(services, districts, how="inner", predicate="within")
```

Το `left` κρατά και το S06 με null district. Το `inner` κρατά μόνο matches. Το `how` είναι απόφαση ανάλυσης, όχι διακοσμητική παράμετρος.

## Αναμενόμενο αποτέλεσμα

Το left αποτέλεσμα έχει τουλάχιστον έξι rows και ένα null match. Το inner έχει πέντε rows για το συγκεκριμένο dataset.

## QA

Σύγκρινε counts πριν/μετά, `isna().sum()` στα district fields και `geometry.geom_type`. Αν το inner έχει περισσότερα rows από τα services, ψάξε one-to-many σχέση.

Η σύνταξη `gpd.sjoin(left, right, how=..., predicate=...)` έχει τρεις αποφάσεις: ποιο dataset είναι αριστερό, αν κρατάς όλα τα left features ή μόνο matches, και ποια χωρική σχέση ελέγχεις. Με `how="left"` βλέπεις και unmatched features, άρα είναι συχνά καλύτερο για QA. Με `how="inner"` κρατάς μόνο matches, άρα είναι χρήσιμο όταν θέλεις καθαρό analysis subset.

## Επόμενο βήμα

Θα δεις γιατί ένα join μπορεί να αυξήσει τις γραμμές.
