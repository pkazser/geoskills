# CORE CAPSTONE — Public Services Coverage

Το capstone χρησιμοποιεί μικρά, συνθετικά και offline δεδομένα για περιοχή μελέτης στη βόρεια Ελλάδα.

## Αρχεία εισόδου

- `study_area.gpkg`: ένα polygon study area, σε EPSG:4326.
- `administrative_zones.gpkg`: τρεις polygon ζώνες με `zone_id`, `zone_name` και `population`.
- `services.csv`: σημεία δημόσιων υπηρεσιών σε longitude/latitude. Περιέχει σκόπιμα missing coordinate, duplicate id, μη αριθμητική coordinate και υπηρεσία εκτός περιοχής.
- `roads.gpkg`: τρεις γραμμές context για clip και map QA.

## Αναμενόμενη πολιτική cleaning

Μετατροπή coordinates σε numeric, αφαίρεση duplicates, αφαίρεση records χωρίς valid coordinates και αποκλεισμός features εκτός study area. Αναμένεται καθαρό layer επτά υπηρεσιών.

## Αναμενόμενα outputs

Το solution notebook δημιουργεί `output/core-capstone/capstone_results.gpkg` με τα layers `cleaned_services`, `services_with_zones`, `service_buffers`, `coverage_by_zone` και `clipped_roads`, καθώς και `summary.csv`, `final_map.png` και `short_findings.md`.

Τα δεδομένα είναι εκπαιδευτικά και δεν αντιπροσωπεύουν πραγματική απογραφή ή πραγματικό επίπεδο δημόσιων υπηρεσιών.
