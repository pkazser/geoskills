# 2. Attribute join και spatial join

## Στόχος

Θα ξεχωρίζεις σύνδεση με κοινό key από σύνδεση με χωρική σχέση.

Το attribute join χρειάζεται κοινό πεδίο, όπως `district_id`. Το spatial join χρειάζεται συμβατό CRS και predicate όπως `within`, `contains` ή `intersects`. Οι υπηρεσίες δεν έχουν `district_id`, άρα εδώ χρησιμοποιούμε spatial join.

| Ερώτηση | Κατάλληλη πράξη |
|---|---|
| Κοινό αξιόπιστο key | attribute join |
| Point μέσα σε polygon | spatial join με `within` |

Έλεγξε ότι η geometry παραμένει `Point`. Checkpoint: εξήγησε γιατί το `merge()` δεν απαντά το ερώτημα θέσης.

## Ερμηνεία

Το key απαντά «ποια εγγραφή ταιριάζει», ενώ το predicate απαντά «ποια geometry σχετίζεται». Μην προσθέσεις τεχνητό key μόνο για να αποφύγεις τον χωρικό έλεγχο. Επόμενο βήμα: θα αποφασίσεις left/right και predicate.
