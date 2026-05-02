# Plan d'Intégration Backend-Frontend ElectriMada

## Résumé du Projet

Le projet consiste à intégrer un backend Node.js/Express existant avec un frontend React pour créer une application complète de gestion d'énergie solaire communautaire.

### Architecture Actuelle

#### Backend (mon-backend-node)
- **Framework**: Express.js
- **Base de données**: MySQL
- **API**: REST JSON
- **Ports disponibles**: 
  - `/api/auth` - Authentification
  - `/api/foyers` - Gestion des foyers
  - `/api/batteries` - Gestion des batteries
  - `/api/demandes` - Gestion des demandes d'énergie
  - `/api/rapports` - Rapports statistiques
  - `/api/alertes` - Système d'alertes
  - `/api/optimisation` - Algorithmes d'allocation
  - `/api/prevision` - Prévisions de production
  - `/api/communities` - Gestion communautaire (NOUVEAU)

#### Frontend Web (front_web)
- **Framework**: Next.js 14 (TypeScript)
- **UI**: Composants Radix UI + Tailwind CSS
- **Problème**: Données codées en dur (mockX arrays)

#### Frontend Mobile (ElectriMada-mobile)
- **Framework**: React Native (Expo)
- **Problème**: Constantes codées en dur pour types d'équipements

---

## Étapes d'Intégration

### Phase 1: Configuration API Backend
- [x] 1.1 Ajouter route `/api/batteries/stats` ✓
- [x] 1.2 Ajouter méthode getStats dans BatterieController ✓
- [x] 1.3 Ajouter méthode getStats dans Batterie model ✓
- [ ] 1.4 Ajouter routes pour communautés dans server.js

### Phase 2: Mise à jour lib/api.ts
- [x] 2.1 Ajouter endpoint batteries.getStats() ✓
- [x] 2.2 Ajouter endpoint community.getAll/getById/getMembers/getStats ✓

### Phase 3: Composants Frontend Web Dynamiques
- [x] 3.1 battery-status.tsx - Données batterie dynamiques ✓
- [x] 3.2 communities/[id]/page.tsx - Page communautaire ✓
- [ ] 3.3 dashboard/admin/requests/page.tsx - Page gestion demandes
- [ ] 3.4 dashboard/admin/users/page.tsx - Page gestion utilisateurs
- [ ] 3.5 dashboard/user/allocations/page.tsx - Page allocations
- [ ] 3.6 notifications/page.tsx - Page notifications

### Phase 4: Composants Mobile
- [ ] 4.1constants/index.js - Types dynamiques depuis API
- [ ] 4.2 DashboardScreen - Refresh automatique
- [ ] 4.3 DemandeScreen - CRUD complet

### Phase 5: Synchronisation Temps Réel
- [ ] 5.1 Implémenter fetch + setInterval dans les composants
- [ ] 5.2 Ajouterindicateur de statut de connexion

---

## Fichiers à Modifier

### Backend (mon-backend-node)
1. `server.js` - Ajouter route /api/communities
2. `routes/batterieRoutes.js` - Ajouter /stats
3. `controllers/batterieController.js` - Ajouter getStats
4. `models/Batterie.js` - Ajouter getStats()

### Frontend Web (front_web)
1. `lib/api.ts` - Étendre les endpoints
2. `components/battery-status.tsx` - Dynamique
3. `app/communities/[id]/page.tsx` - Créer avec API
4. `app/dashboard/admin/requests/page.tsx` - API calls
5. `app/dashboard/admin/users/page.tsx` - API calls
6. `app/dashboard/user/allocations/page.tsx` - API calls
7. `app/notifications/page.tsx` - API calls
8. `app/dashboard/user/requests/page.tsx` - API calls

### Frontend Mobile (ElectriMada-mobile)
1. `src/constants/index.js` - Charger depuis API
2. `src/screens/DashboardScreen.jsx` - Auto-refresh
3. `src/screens/DemandeScreen.jsx` - CRUD complet

---

## Détails des Modifications

### 1. API Endpoint pour Statistiques Batterie

```javascript
// Route: GET /api/batteries/stats
// Retourne:
{
  "success": true,
  "data": {
    "capacite_actuelle": 75.5,
    "capacite_totale": 100,
    "niveau": 76,
    "seuil_critique": 20
  }
}
```

### 2. Auto-refresh dans Composants

```javascript
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 60000); // 60 secondes
  return () => clearInterval(interval);
}, []);
```

### 3. Gestion des Erreurs

Chaque composant doit:
- Gérer les états loading/error/success
- Afficher un message d'erreur si API non disponible
- Utiliser les valeurs par défaut uniquement si API échoue

---

## Vérification de l'Intégration

### Tests Manuels
1. ✅ Démarrer le backend: `cd mon-backend-node && node server.js`
2. ✅ Vérifier health: `curl http://localhost:3000/health`
3. ✅ Tester les endpoints API
4. ✅ Démarrer le frontend web
5. ✅ Vérifier que les données s'affichent correctement
6. ✅ Tester le CRUD (Create, Read, Update, Delete)

### Critères de Succès
- Toutes les pages affichent des données depuis MySQL
- Aucune donnée codée en dur visible dans l'interface
- Auto-refresh fonctionnel
- Gestion d'erreurs robuste
