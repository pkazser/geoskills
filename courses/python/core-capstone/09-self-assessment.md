# 9. Self-assessment — είμαι έτοιμος για το επόμενο project;

Χρησιμοποίησε το παρακάτω checklist χωρίς να κοιτάς πρώτα τη λύση.

## Data audit

- [ ] Μπορώ να εξηγήσω τι σημαίνουν study area, zones, services και roads.
- [ ] Εντόπισα missing values, duplicate και μη αριθμητικές coordinates πριν από cleaning.
- [ ] Κατέγραψα rows, schema, CRS, geometry types και bounds.

## Cleaning

- [ ] Μετέτρεψα coordinates με `pd.to_numeric(..., errors="coerce")` και αιτιολόγησα τις απορρίψεις.
- [ ] Δημιούργησα points με σωστό source CRS.
- [ ] Έλεγξα longitude/latitude ranges και features εκτός study area.

## Spatial framework

- [ ] Ξεχωρίζω `set_crs` από `to_crs`.
- [ ] Μπορώ να εξηγήσω γιατί το `EPSG:2100` χρησιμοποιείται για μέτρα στο project.
- [ ] Όλα τα analytical layers έχουν κοινό CRS πριν από spatial operations.

## Analysis

- [ ] Χρησιμοποίησα spatial join για zone assignment και έλεγξα unmatched rows.
- [ ] Ξέρω γιατί το buffer δεν είναι routing.
- [ ] Ξέρω πότε χρησιμοποίησα clip, dissolve και overlay και τι αλλάζει το καθένα.
- [ ] Έλεγξα ότι coverage area δεν ξεπερνά το area της zone.

## Export και επικοινωνία

- [ ] Το GeoPackage έχει λογικά layers και διατηρεί CRS/attributes.
- [ ] Το `summary.csv`, ο χάρτης και τα findings συμφωνούν.
- [ ] Μπορώ να περιγράψω τουλάχιστον δύο περιορισμούς του μοντέλου κάλυψης.

## Τελικό checkpoint

Αν έχεις περισσότερα από δύο κενά, ξαναδούλεψε τα αντίστοιχα lessons και μετά ξανατρέξε το starter. Αν όλα είναι τσεκαρισμένα, μπορείς να περάσεις σε project όπου θα συνδυάσεις δεδομένα από πραγματικές πηγές και θα υπερασπιστείς τις παραδοχές σου.
