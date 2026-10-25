# 8. QA μετά το filter

## Τι θα μάθεις

Θα αποδεικνύεις ότι ένα subset είναι αυτό που νομίζεις.

## Checklist

## Τι αποδεικνύει το QA

Οι assertions στις predicates ελέγχουν τη λογική, το CRS και οι geometry types τη δομή, τα rows την έκταση του subset και τα bounds τη χωρική λογική. Ένα count μόνο του δεν αποδεικνύει ότι επιλέχθηκαν τα σωστά features.

Για το `selected` έλεγξε rows, CRS, geometry types, missing values και κάθε predicate:

```python
assert selected["status"].eq("active").all()
assert selected["asset_type"].isin(["park", "school"]).all()
assert selected["score"].between(75, 100).all()
assert selected.geometry.notna().all()
```

## Γιατί έχει σημασία

Το πλήθος μόνο δεν αρκεί: δύο διαφορετικά φίλτρα μπορεί να επιστρέψουν ίδιο αριθμό features. Οι assertions ελέγχουν τη λογική και προστατεύουν το export.

## Άσκηση

Κατέγραψε counts πριν και μετά από κάθε συνθήκη. Αν το αποτέλεσμα γίνει μηδενικό, έλεγξε τιμές, τύπους και missing values πριν χαλαρώσεις το φίλτρο.

Το QA μετά το filter αποδεικνύει διαφορετικά πράγματα: οι counts δείχνουν πόσα features κρατήθηκαν, οι assertions ότι οι τιμές ικανοποιούν τον κανόνα, το CRS/geometry ότι δεν άλλαξε η spatial δομή και τα bounds ότι το subset βρίσκεται στη σωστή περιοχή. Empty result δεν είναι αυτόματα error, αλλά απαιτεί ερμηνεία.

## Επόμενο βήμα

Στο Mini Challenge θα συνδυάσεις όλα τα είδη φίλτρων.
