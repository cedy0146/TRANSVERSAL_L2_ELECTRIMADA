# ElectriMada - Backend API

Gestion intelligente de l'energie solaire communautaire pour villages malgaches.

## Architecture

```
mon-backend-node/
├── algorithms/          # Algorithmes avances (from scratch)
│   ├── BinaryHeap.js    # Tas binaire - file de priorite O(log n)
│   ├── HashTable.js     # Table de hachage - acces O(1)
│   ├── SegmentTree.js   # Arbre de segment - requetes O(log n)
│   ├── Knapsack.js      # Sac a dos DP - optimisation allocation
│   ├── MovingAverage.js # Moyenne glissante - prevision solaire
│   └── Dijkstra.js      # Graphes - chemin optimal reseau
├── config/
│   └── db.js            # Connexion MySQL
├── controllers/         # Logique metier
├── models/              # Modeles de donnees (MySQL)
├── routes/              # Routes API Express
├── tests/
│   └── algoTests.js     # Tests unitaires algorithmes
├── server.js            # Point d'entree
└── .env                 # Configuration
```

## Installation

```bash
cd mon-backend-node
npm install
```

## Configuration MySQL

Executer le script SQL pour creer la base de donnees et inserer les donnees de test.

## Lancer le serveur

```bash
npm run dev    # Mode developpement (nodemon)
npm start      # Mode production
```

## Tests

```bash
npm test       # Lance les tests algorithmiques
```

## API Endpoints

### Foyers
- `GET /api/foyers` - Liste des foyers
- `GET /api/foyers/:id` - Detail foyer
- `POST /api/foyers` - Creer foyer
- `PUT /api/foyers/:id` - Modifier foyer
- `DELETE /api/foyers/:id` - Supprimer foyer

### Batteries
- `GET /api/batteries` - Liste batteries
- `GET /api/batteries/active` - Batterie active avec alertes
- `PUT /api/batteries/:id/niveau` - Mettre a jour le niveau

### Demandes
- `GET /api/demandes` - Toutes les demandes
- `GET /api/demandes/pending` - Demandes en attente
- `GET /api/demandes/priorisees` - **Tas Binaire** - priorisation O(n log n)
- `POST /api/demandes` - Creer demande
- `PUT /api/demandes/:id/accepter` - Accepter demande

### Optimisation
- `POST /api/optimisation/allocation` - **Sac a Dos DP** - allocation optimisee
- `GET /api/optimisation/mode-eco` - Activation mode economie

### Prevision
- `GET /api/prevision/solaire` - **Moyenne Glissante** - prediction production
- `GET /api/prevision/consommation-intervalle` - **Segment Tree** - somme rapide

## Contraintes 2035 respectees

1. **Connectivite intermittente** : Cache local avec HashTable, calculs 100% offline
2. **Energie limitee** : Algorithmes legeres (O(n*W) knapsack, O(log n) heap/tree)
3. **Donnees bruitees** : Fallback moving average, validation des entrees

