# 7. Καθαρισμός με GeoPandas

## Τι θα μάθεις

Θα οργανώσεις τον καθαρισμό σε διαδοχικά, επαναλήψιμα βήματα.

```python
import geopandas as gpd
import pandas as pd

# Τρέξε πρώτα το κελί προετοιμασίας του starter notebook.
df = pd.read_csv(DATA_ROOT / "gp02" / "observations_dirty.csv")
print("Αρχικές γραμμές:", len(df))

clean = df.copy()
for column in ["longitude", "latitude", "elevation_m"]:
    clean[column] = pd.to_numeric(clean[column], errors="coerce")
print("Μετά τους numeric τύπους:", len(clean))

missing_ids = clean.loc[
    clean[["observation_id", "longitude", "latitude"]].isna().any(axis=1),
    "observation_id",
].tolist()
clean = clean.dropna(subset=["observation_id", "longitude", "latitude"]).copy()
print("Μετά τα essential missing:", len(clean), "Αποκλείστηκαν:", missing_ids)

duplicate_ids = clean.loc[clean["observation_id"].duplicated(keep=False), "observation_id"].unique()
for observation_id in duplicate_ids:
    group = clean[clean["observation_id"] == observation_id]
    if len(group.drop_duplicates()) != 1:
        raise ValueError(f"Σύγκρουση δεδομένων για ID {observation_id}")
before_duplicates = len(clean)
clean = clean.drop_duplicates(subset="observation_id", keep="first").copy()
print("Μετά τα identical duplicates:", len(clean), "Αφαιρέθηκαν:", before_duplicates - len(clean), "IDs:", duplicate_ids.tolist())

valid_coordinates = (
    clean["longitude"].between(-180, 180)
    & clean["latitude"].between(-90, 90)
)
excluded_coordinate_ids = clean.loc[~valid_coordinates, "observation_id"].tolist()
clean = clean[valid_coordinates].copy()
print("Μετά τα coordinate bounds:", len(clean), "Αποκλείστηκαν:", excluded_coordinate_ids)

gdf = gpd.GeoDataFrame(
    clean,
    geometry=gpd.points_from_xy(clean["longitude"], clean["latitude"]),
    crs="EPSG:4326",
)
print("Τελικές γραμμές:", len(gdf))
print("CRS:", gdf.crs)
print("Types:", gdf.geometry.geom_type.value_counts().to_dict())
print("Bounds:", gdf.total_bounds)
```

Η ροή κρατά το αρχικό `df` αμετάβλητο, μετατρέπει τους αριθμητικούς τύπους
στο `clean`, ελέγχει συγκρούσεις πριν από τη διαγραφή και δημιουργεί το
`gdf` μόνο αφού περάσουν τα βασικά checks. Για το συγκεκριμένο dataset
αναμένουμε 10 → 9 → 8 → 7 γραμμές: O06, μία ίδια O04 και O05 αποκλείονται.

Η σειρά είναι σημαντική: πρώτα καθαρίζουμε τις τιμές, μετά δημιουργούμε geometry.

## Checkpoint

Κατέγραψε πόσες γραμμές είχες αρχικά και πόσες έμειναν μετά από κάθε κανόνα.

## Γιατί είναι χρήσιμο

Η διαδοχική ροή κάνει τον καθαρισμό επαναλήψιμο. Αν αύριο λάβεις νέο CSV, μπορείς να εκτελέσεις τους ίδιους κανόνες και να συγκρίνεις τα counts.

## Before / after QA

```python
assert len(df) == 10
assert len(gdf) == 7
assert gdf.crs.to_epsg() == 4326
assert gdf.geometry.geom_type.eq("Point").all()
assert gdf.geometry.notna().all()
assert not gdf.geometry.is_empty.any()
assert gdf.geometry.is_valid.all()
assert gdf["observation_id"].is_unique
```

Το ζητούμενο δεν είναι να κρατήσεις όσο το δυνατόν περισσότερες γραμμές. Είναι να ξέρεις ποιες αφαιρέθηκαν και γιατί.

## Γιατί η σειρά έχει σημασία

Αν δημιουργήσεις geometry πριν μετατρέψεις types και αφαιρέσεις missing coordinates, θα μεταφέρεις προβλήματα στο GeoDataFrame. Αν αφαιρέσεις duplicates πριν ελέγξεις αν είναι ίδιες, χάνεις την ευκαιρία να εντοπίσεις σύγκρουση. Κράτησε counts και IDs μετά από κάθε κανόνα, όχι μόνο ένα τελικό “Before/After”.

### Μικρή άσκηση

Φτιάξε dictionary με `rows_after_numeric`, `rows_after_missing`, `rows_after_duplicates` και `rows_after_bounds`. Εξήγησε σε μία πρόταση κάθε διαφορά.

## Πρόσεξε

Μην τροποποιείς το αρχικό `df` χωρίς αντίγραφο. Το `clean = ... .copy()` κρατά χωριστό το αποτέλεσμα και επιτρέπει σύγκριση με την πηγή.

## Επόμενο βήμα

Στο επόμενο lesson θα μετατρέψουμε τους ελέγχους σε σαφή QA checklist και θα εξηγήσουμε τι αποδεικνύει κάθε assertion.
