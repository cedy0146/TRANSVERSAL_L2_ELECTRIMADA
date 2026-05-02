# EléctriMada - Gestion Intelligente d'Énergie Solaire Communautaire

Une plateforme web complète pour la gestion décentralisée et intelligente de l'énergie solaire dans les communautés malgaches.

## Fonctionnalités Principales

### 1. Pages Publiques
- **Landing Page** (`/landing`) - Présentation de la plateforme avec avantages et fonctionnalités
- **Aide et FAQ** (`/help`) - Centre d'aide avec questions fréquemment posées
- **Notifications** (`/notifications`) - Gestion centralisée des alertes
- **Paramètres** (`/settings`) - Configuration des préférences utilisateur

### 2. Authentification
- **Connexion** (`/login`) - Formulaire d'authentification avec 3 rôles (Admin, User, Technician)
- **Inscription** (`/signup`) - Création de compte avec sélection de communauté
- **Récupération Mot de Passe** (`/forgot-password`) - Réinitialisation sécurisée

### 3. Dashboards Utilisateur
#### Admin Dashboard (`/dashboard/admin`)
- Vue d'ensemble globale du système
- Gestion des utilisateurs (`/dashboard/admin/users`)
- Gestion des demandes (`/dashboard/admin/requests`)
- Paramètres système (`/dashboard/admin/settings`)

#### User Dashboard (`/dashboard/user`)
- Vue d'ensemble personnelle
- Soumission de demandes (`/dashboard/user/requests`)
- Visualisation des allocations (`/dashboard/user/allocations`)
- Suivi de la consommation

#### Technician Dashboard (`/dashboard/technician`)
- Surveillance du système (`/dashboard/technician/monitoring`)
- Gestion de la maintenance (`/dashboard/technician/maintenance`)
- Alertes techniques en temps réel

### 4. Gestion Communautaire
- **Communautés** (`/communities`) - Liste et gestion des communautés
- **Détails Communauté** (`/communities/[id]`) - Statistiques et membres
- **Profil Utilisateur** (`/profile`) - Gestion du compte personnel

### 5. Rapports et Analytiques
- **Rapports** (`/reports`) - Synthèse générale des allocations
- **Rapports Détaillés** (`/reports/detailed`) - Analyse complète avec graphiques
- **Facturation** (`/billing`) - Gestion des paiements et factures

## Architecture Technique

### Structure du Projet
```
/app
  /dashboard
    /admin
      - page.tsx (overview)
      /users - page.tsx
      /requests - page.tsx
      /settings - page.tsx
    /user
      - page.tsx (overview)
      /requests - page.tsx
      /allocations - page.tsx
    /technician
      - page.tsx (overview)
      /monitoring - page.tsx
      /maintenance - page.tsx
  /communities
    - page.tsx
    /[id] - page.tsx
  /reports
    - page.tsx
    /detailed - page.tsx
  /login - page.tsx
  /signup - page.tsx
  /forgot-password - page.tsx
  /landing - page.tsx
  /profile - page.tsx
  /notifications - page.tsx
  /billing - page.tsx
  /help - page.tsx
  /settings - page.tsx

/components
  - navigation.tsx (Navigation bar)
  - sidebar.tsx (Sidebar pour les dashboards)
  - footer.tsx (Footer)
  - language-switcher.tsx (Changement de langue)
  - header.tsx (En-têtes personnalisés)
  - battery-status.tsx (Affichage batterie)
  - demand-form.tsx (Formulaire de demande)
  - allocation-table.tsx (Tableau d'allocation)
  /ui (composants shadcn/ui)
```

### Stack Technologique
- **Framework**: Next.js 16
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## Langues Supportées
- Français (fr)
- Malagasy (mg)
- English (en)

## Comptes de Démonstration

Pour tester l'application avec différents rôles:

### Admin
- Email: admin@electrimada.mg
- Rôle: Administrateur système

### User
- Email: user@electrimada.mg
- Rôle: Utilisateur ménage

### Technician
- Email: tech@electrimada.mg
- Rôle: Technicien système

## Fonctionnalités Clés

### 1. Gestion des Demandes d'Énergie
- Soumission de demandes par les utilisateurs
- Approbation par les administrateurs
- Historique complet des demandes

### 2. Allocation Intelligente
- Algorithme d'optimisation Knapsack
- Distribution équitable de l'énergie
- Priorisation automatique
- Suivi en temps réel

### 3. Surveillance du Système
- Production solaire en temps réel
- État des batteries
- Performance des onduleurs
- Alertes automatiques

### 4. Rapports et Analytics
- Production journalière/mensuelle
- Consommation par appareil
- Efficacité du système
- Export en PDF/CSV

### 5. Gestion Administrative
- Gestion des utilisateurs
- Configuration du système
- Logs d'activité
- Sauvegarde des données

## Interface Utilisateur

### Design System
- **Couleurs Primaires**: Émeraude (#10b981), Bleu (#3b82f6)
- **Couleurs Neutres**: Slate, Gray, White
- **Gradients**: Emerald to Blue

### Composants Réutilisables
- Navigation bar multilingue
- Sidebar avec menu contextuel
- Tables de données interactives
- Graphiques Recharts
- Formulaires validés
- Dialogs et modals
- Cartes (Cards)

## Routes API (À implémenter)

### Authentification
- POST /api/auth/login
- POST /api/auth/signup
- POST /api/auth/logout
- POST /api/auth/reset-password

### Utilisateurs
- GET /api/users
- GET /api/users/[id]
- PUT /api/users/[id]
- DELETE /api/users/[id]

### Demandes d'Énergie
- GET /api/requests
- POST /api/requests
- PUT /api/requests/[id]
- DELETE /api/requests/[id]

### Allocations
- GET /api/allocations
- POST /api/allocations
- PUT /api/allocations/[id]

### Communautés
- GET /api/communities
- GET /api/communities/[id]
- POST /api/communities
- PUT /api/communities/[id]

### Rapports
- GET /api/reports
- GET /api/reports/detailed
- GET /api/reports/export

## Installation et Démarrage

```bash
# Installation des dépendances
pnpm install

# Démarrage du serveur de développement
pnpm dev

# Build pour production
pnpm build

# Démarrage du serveur production
pnpm start
```

L'application est accessible sur http://localhost:3000

## Prochaines Étapes

1. Implémenter les routes API backend
2. Intégrer une base de données (Supabase/Neon)
3. Implémenter l'authentification réelle (JWT/Sessions)
4. Ajouter les algorithmes d'optimisation Knapsack
5. Implémenter les notifications en temps réel
6. Ajouter les fonctionnalités de paiement
7. Tests unitaires et intégration
8. Déploiement sur Vercel

## Support

Pour toute question ou problème:
- Email: support@electrimada.mg
- Page d'aide: /help
- FAQ: /help#faq

## Licence

Tous droits réservés © 2024 EléctriMada
