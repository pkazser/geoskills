# 3. Ποιο εργαλείο επιλέγω

## Τι θα μάθεις

Θα επιλέγεις το σωστό εργαλείο ανάλογα με το αν θέλεις να κόψεις geometry, να προσθέσεις attributes ή να δημιουργήσεις κοινή έκταση.

## Συγκριτική σκέψη

## Πρακτικό κριτήριο

Αν η ερώτηση περιέχει “μόνο μέσα σε περιοχή”, σκέψου clip. Αν περιέχει “σε ποια περιοχή ανήκει”, σκέψου spatial join. Αν περιέχει “πόση κοινή έκταση”, σκέψου overlay/intersection. Αυτή η διατύπωση προηγείται του κώδικα.

| Ερώτηση | Κατάλληλο εργαλείο |
|---|---|
| Θέλω μόνο ό,τι πέφτει σε mask | `gpd.clip()` |
| Θέλω attributes άλλου layer χωρίς να κόψω geometry | `gpd.sjoin()` |
| Θέλω τη νέα κοινή geometry και attributes και των δύο | `gpd.overlay(..., how="intersection")` |

## Μικρό παράδειγμα

Για “ποια land-use features βρίσκονται στην περιοχή μελέτης;” χρησιμοποίησε clip. Για “σε ποια ζώνη ανήκει κάθε point;” spatial join. Για “πόσα m² green land είναι protected;” overlay intersection.

## QA / συνηθισμένο λάθος

Μην χρησιμοποιείς spatial join όταν χρειάζεσαι area τομής: το join δεν κόβει geometry. Μην χρησιμοποιείς overlay όταν θέλεις απλώς να προσθέσεις μία κατηγορία σε points.

## Checkpoint

Γράψε για κάθε ερώτημα ποιο εργαλείο επιλέγεις και τι περιμένεις να αλλάξει σε rows, geometry και attributes.

| Operation | Βασικό ερώτημα | Rows | Attributes | Geometry |
|---|---|---|---|---|
| Attribute filter | ποια rows ικανοποιούν criterion; | συνήθως μειώνονται | του input | δεν αλλάζει |
| Spatial join | ποια features σχετίζονται χωρικά; | μπορεί να αυξηθούν | μεταφέρονται | συνήθως του left |
| Clip | ποιο τμήμα είναι μέσα στη mask; | μπορεί να μειωθούν | κυρίως του input | μπορεί να κοπεί |
| Intersection/overlay | ποια κοινή geometry προκύπτει; | μπορεί να αυξηθούν | και από τα δύο | νέα geometry |

Decision thinking: «σε ποιον δήμο βρίσκεται κάθε νοσοκομείο;» → spatial join. «Θέλω μόνο δρόμους μέσα στον δήμο» → clip. «Πόσα hectares land-use τέμνουν flood zone;» → intersection/overlay.

## Επόμενο βήμα

Θα προετοιμάσεις σωστά τη mask study area.
