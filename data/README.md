# Donnees ElectriMada

Ce dossier contient les donnees du projet ElectriMada.

## Fichiers

| Fichier | Description |
|---|---|
| `init.sql` | Script SQL de creation de la base MySQL + donnees de demo |
| `seed.json` | Jeu de donnees synthetiques au format JSON |

## Utilisation

### Initialiser la base MySQL

```bash
mysql -u root -p < init.sql
```

Ou avec un client MySQL :
```sql
SOURCE init.sql;
```

### Structure des donnees

Le village de demonstration comporte :
- **6 foyers** (Hopital, Ecole, 4 foyers familiaux)
- **1 batterie communautaire** de 100 kWh
- **7 demandes** du soir du 19 avril 2026
- **3 rapports** historiques (17-19 avril 2026)
- **3 alertes** generees automatiquement

### Scenario de demonstration

- Batterie actuelle : 75% (75 kWh)
- Reserve forcee : 20% (20 kWh)
- Capacite utilisable : 55 kWh
- Demandes en attente : 7 (total demande : 19 kWh)

L'algorithme du Sac a Dos choisira les demandes les plus critiques (Hopital, Ecole) en premier.
