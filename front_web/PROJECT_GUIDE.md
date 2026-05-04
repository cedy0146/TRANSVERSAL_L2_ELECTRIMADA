# EléctriMada - Frontend Guide

Bienvenue sur **EléctriMada**, une plateforme moderne de gestion de la consommation d'électricité à Madagascar.

## 🎯 Accès au Projet

Votre application est disponible à: **http://localhost:3000**

## 📋 Pages Disponibles

### 🏠 Pages Publiques

1. **Accueil** → `http://localhost:3000`
   - Page d'accueil avec présentation de la plateforme
   - Bouton "Voir la démo" pour accéder directement au dashboard
   - Sections des fonctionnalités principales

2. **Connexion** → `http://localhost:3000/login`
   - Formulaire de connexion
   - **Démo**: Entrez n'importe quel email valide + n'importe quel mot de passe
   - Exemple: `test@example.com` + `password123`

3. **Inscription** → `http://localhost:3000/register`
   - Formulaire d'inscription complet
   - Validation des champs
   - Redirection vers le dashboard après inscription

4. **Mot de Passe Oublié** → `http://localhost:3000/forgot-password`
   - Formulaire de récupération de mot de passe
   - Validation de l'email
   - Envoi de lien de réinitialisation

### 📊 Pages Dashboard

Accédez au dashboard soit par:
- Bouton "Voir la démo" sur la page d'accueil
- URL directe: `http://localhost:3000/dashboard`
- Connexion avec email valide + n'importe quel mot de passe

#### Dashboard Principal
**URL**: `http://localhost:3000/dashboard`
- Vue d'ensemble avec métriques clés
- Consommation actuelle en temps réel
- Consommation mensuelle
- Coût estimé
- Appareils actifs
- Graphique de consommation par heure
- Alertes récentes

#### Navigation Latérale (dans le dashboard)
- 🏠 **Accueil** → Dashboard principal
- 📊 **Consommation** → Détails consommation
- 📈 **Rapports** → Rapports et statistiques
- ⚡ **Appareils** → Gestion des appareils électriques
- 👥 **Utilisateurs** → Gestion des utilisateurs
- 🚨 **Alertes** → Alertes et notifications
- ⚙️ **Paramètres** → Paramètres du compte

### 1️⃣ Consommation
**URL**: `http://localhost:3000/dashboard/consumption`
- Analyse détaillée de la consommation
- Données horaires, journalières, mensuelles
- Graphiques interactifs
- Comparaisons avec période précédente

### 2️⃣ Rapports
**URL**: `http://localhost:3000/dashboard/reports`
- Rapports complets d'utilisation
- Statistiques détaillées
- Exportation en PDF
- Tendances et analyses

### 3️⃣ Appareils Électriques
**URL**: `http://localhost:3000/dashboard/devices`
- Liste de tous les appareils
- Puissance de chaque appareil
- Consommation journalière et mensuelle
- Bouton pour ajouter un nouvel appareil
- Actions: Modifier, Supprimer

Appareils de démo:
- Climatiseur salon (2000W)
- Réfrigérateur cuisine (150W)
- Chauffe-eau (3000W)
- Lave-linge (1500W)

### 4️⃣ Utilisateurs
**URL**: `http://localhost:3000/dashboard/users`
- Liste des utilisateurs du compte
- Rôles et permissions
- Date de création
- Statut actif/inactif
- Gestion des accès

### 5️⃣ Alertes
**URL**: `http://localhost:3000/dashboard/alerts`
- Alertes de consommation anormale
- Notifications importantes
- Historique des alertes
- Options de notification

### 6️⃣ Paramètres
**URL**: `http://localhost:3000/dashboard/settings`
- Paramètres du compte
- Profil utilisateur
- Préférences de notification
- Paramètres de facturation
- Paramètres de sécurité

## 🎨 Design & Thème

- **Thème**: Clair (Light Mode)
- **Couleurs principales**:
  - Vert émeraude (#10b981) - Énergie
  - Ambre (#f59e0b) - Accent
  - Gris neutres - Arrière-plan

- **Typographie**:
  - Font: Geist (Google Fonts)
  - Responsive design (mobile-first)
  - Accessible (WCAG AA)

## 📱 Fonctionnalités Principales

✅ **Multilingue** (Français par défaut)
✅ **Navigation fluide** entre toutes les pages
✅ **Formulaires validés** avec messages d'erreur
✅ **Dashboard interactif** avec données de démo
✅ **Design responsive** (mobile, tablet, desktop)
✅ **Ergonomie appliquée** (Bastien & Scapin)
  - Compatibilité utilisateurs malgaches
  - Interfaces homogènes
  - Concision du contenu
  - Pilotage et rétroaction clairs

## 🔗 Liens de Navigation

Tous les liens de navigation fonctionnent parfaitement:
- Barre de navigation (header)
- Menu latéral du dashboard
- Boutons d'action
- Liens de pagination

## 🧪 Test des Pages

Pour tester rapidement:
```bash
# Page d'accueil
http://localhost:3000

# Test connexion (accepte tout email valide)
http://localhost:3000/login
# Exemple: test@gmail.com / password

# Dashboard
http://localhost:3000/dashboard

# Toutes les sous-pages du dashboard
http://localhost:3000/dashboard/consumption
http://localhost:3000/dashboard/reports
http://localhost:3000/dashboard/devices
http://localhost:3000/dashboard/users
http://localhost:3000/dashboard/alerts
http://localhost:3000/dashboard/settings
```

## 📦 Stack Technique

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## ✨ Points Clés

1. **Pas d'authentification requise**: Frontend uniquement
2. **Données de démo**: Tous les formulaires sont fonctionnels
3. **Responsive design**: Fonctionne sur tous les appareils
4. **Performance**: Build optimisée avec Next.js 16
5. **Accessibilité**: Conforme WCAG 2.1

---

**Prêt à explorer?** Cliquez sur le bouton "Voir la démo" sur la page d'accueil!
