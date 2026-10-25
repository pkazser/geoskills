# 10. Readiness checkpoint

## Πρέπει να μπορείς να εξηγήσεις

- Τη διαφορά clip, spatial join και overlay/intersection.
- Τι είναι η mask και γιατί χρειάζεται έλεγχο.
- Πώς αλλάζουν geometry, attributes και feature counts.
- Πώς αντιμετωπίζεις multipart, invalid και empty geometries.
- Πώς χρησιμοποιείς bounds, validity, area και map ως QA.

## Τελικός έλεγχος

Παράδωσε μαζί με το GeoPackage ένα σύντομο report με CRS, rows πριν/μετά, geometry types, validity, empties, bounds και area before/after. Έτσι το output είναι ελέγξιμο και όχι απλώς αποτέλεσμα μιας εντολής.

Το GP09 συσχέτισε spatial objects και κράτησε συνήθως τη geometry του left. Το GP10 δημιουργεί νέα geometries από χωρικές σχέσεις. Αυτή είναι η μετάβαση από attribute transfer σε geometry transformation και η βάση για το CORE CAPSTONE.

## Μετάβαση

Με το GP10 ολοκληρώνεις τον βασικό κύκλο vector analysis: CRS, filtering, measurements, buffers, joins και geometry operations.
