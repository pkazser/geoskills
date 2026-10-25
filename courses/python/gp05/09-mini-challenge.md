# 9. Mini Challenge — CRS QA

## Στόχος

Φτιάξε ένα μικρό report για τις πέντε πόλεις: αρχικό CRS, projected CRS, πλήθος, geometry types, αρχικά και projected bounds.

## Βήματα

1. Διάβασε το CSV και δημιούργησε points σε EPSG:4326.
2. Έλεγξε missing coordinates και duplicate `site_id`.
3. Μετέτρεψε σε EPSG:2100.
4. Υπολόγισε απόσταση Αθήνας–Θεσσαλονίκης.
5. Κάνε export ένα GeoPackage layer `greek_sites_2100`.

## Αναμενόμενο αποτέλεσμα

Οι δύο εκδοχές έχουν ίδιο πλήθος και `Point` geometry. Η απόσταση είναι μερικές εκατοντάδες km, όχι 0.4 “μοίρες”. Το exported layer δηλώνει EPSG:2100.

## QA

Χρησιμοποίησε assertions για CRS, rows, geometry και θετική απόσταση. Αν το αποτέλεσμα είναι εκτός λογικής τάξης μεγέθους, γύρνα στα bounds και στον έλεγχο `set_crs`/`to_crs`.

## Ερώτηση σκέψης

Το `gdf.crs` εμφανίζει `EPSG:4326`. Αυτό αρκεί για να αποδείξει ότι το CRS είναι πράγματι σωστό; Όχι. Χρειάζεται συμφωνία με το source metadata, λογικά bounds, σωστό geometry construction και visual/λογικό έλεγχο.

## Επόμενο βήμα

Με ασφαλές CRS μπορείς πλέον να φιλτράρεις δεδομένα με σαφή γεωγραφική ερμηνεία.
