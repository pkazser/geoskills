# 7. Aggregation μετά το join

## Στόχος

Θα μετατρέπεις τα matched point rows σε συνοπτικό πίνακα ανά τομέα, κρατώντας το joined layer χωριστά.

```python
counts = (joined_inner.groupby(["district_id", "district_name"])
          .size().reset_index(name="service_count"))
```

Το άθροισμα `service_count` πρέπει να συμφωνεί με τα 5 inner matches. Η S06 δεν είναι μηδενική υπηρεσία σε κάποιο district· είναι ξεχωριστή unmatched περίπτωση.

Mini check: πρόσθεσε και `service_type` στην αναφορά και εξήγησε τι αλλάζει στη γραμμή του πίνακα.

## Συνηθισμένο λάθος

Μην κάνεις aggregation πάνω στο `joined_left` χωρίς να αποφασίσεις πώς θα χειριστείς το null district. Κράτησε χωριστό unmatched report και δήλωσε αν μετράς rows ή μοναδικές υπηρεσίες.
