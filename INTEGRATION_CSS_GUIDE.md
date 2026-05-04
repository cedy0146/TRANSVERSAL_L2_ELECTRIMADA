# 📚 GUIDE D'INTÉGRATION CSS - ÉLECTRIMADA

## Vue d'ensemble

Ce guide vous explique comment intégrer le nouveau système CSS dans votre projet ElectriMada pour un thème clair, dynamique et ergonomique.

---

## 📁 Structure des fichiers CSS

```
projet/
├── theme.css           ← Système de design (tokens, variables)
├── components.css      ← Composants réutilisables
├── utilities.css       ← Classes utilitaires et responsivité
├── main.css           ← Fichier principal (importe tous les autres)
└── CSS_THEME_GUIDE.md ← Documentation du thème (ce fichier)
```

### Hiérarchie d'importation

```
main.css
├── theme.css (Tokens, variables CSS)
├── components.css (Boutons, cartes, inputs, etc.)
└── utilities.css (Flexbox, spacing, responsive, etc.)
```

---

## 🚀 Intégration rapide

### Option 1: En tant que fichier HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ElectriMada</title>
  
  <!-- Importer le CSS principal -->
  <link rel="stylesheet" href="./main.css">
</head>
<body>
  <div class="dashboard-container">
    <!-- Votre contenu ici -->
  </div>
</body>
</html>
```

### Option 2: En tant que module JavaScript/React

```jsx
import './main.css';

export default function App() {
  return (
    <div className="dashboard-container">
      {/* Votre contenu ici */}
    </div>
  );
}
```

### Option 3: En tant que Tailwind CSS (Next.js/Vite)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(from var(--color-primary) h s l)',
        secondary: 'hsl(from var(--color-secondary) h s l)',
      },
    },
  },
};
```

---

## 🎨 Système de couleurs

### Palette primaire

| Couleur | Hex | Utilisation |
|---------|-----|------------|
| Primary | `#16a34a` | Boutons, accents, highlights |
| Secondary | `#f59e0b` | Actions secondaires, avertissements |
| Success | `#10b981` | Messages de succès, confirmations |
| Danger | `#ef4444` | Erreurs, alertes critiques |
| Warning | `#f59e0b` | Avertissements |
| Info | `#3b82f6` | Informations |

### Variables CSS des couleurs

```css
:root {
  /* Couleurs principales */
  --color-primary: #16a34a;
  --color-primary-dark: #15803d;
  --color-primary-light: #22c55e;
  --color-primary-lighter: #dcfce7;
  
  /* Couleurs de texte */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-text-tertiary: #999999;
  
  /* Couleurs de fond */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-tertiary: #eeeeee;
  
  /* Bordures */
  --color-border-light: #e0e0e0;
  --color-border-default: #d0d0d0;
  --color-border-dark: #b0b0b0;
}
```

---

## 📐 Système d'espacement

Le système d'espacement utilise une échelle de **4px** comme unité de base.

```css
--spacing-1: 4px;     /* 1 unité */
--spacing-2: 8px;     /* 2 unités */
--spacing-3: 12px;    /* 3 unités */
--spacing-4: 16px;    /* 4 unités */
--spacing-6: 24px;    /* 6 unités */
--spacing-8: 32px;    /* 8 unités */
--spacing-12: 48px;   /* 12 unités */
--spacing-16: 64px;   /* 16 unités */
```

### Utilisation

```html
<!-- Padding -->
<div class="p-4">Contenu avec padding 16px</div>

<!-- Margin -->
<div class="m-6">Contenu avec margin 24px</div>

<!-- Gap en flex -->
<div class="flex flex-gap-4">Éléments espacés de 16px</div>
```

---

## 🔤 Système typographique

### Tailles de police

```css
--font-size-xs: 12px;    /* Annotations */
--font-size-sm: 14px;    /* Texte petit */
--font-size-base: 16px;  /* Texte normal */
--font-size-lg: 18px;    /* Texte grand */
--font-size-xl: 20px;    /* Titre petit */
--font-size-2xl: 24px;   /* Titre moyen */
```

### Poids de police

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Hauteur de ligne

```css
--line-height-tight: 1.2;     /* Titres */
--line-height-normal: 1.5;    /* Texte courant */
--line-height-relaxed: 1.75;  /* Texte d'aide */
```

### Utilisation

```html
<!-- Titres -->
<h1 class="text-2xl text-bold">Titre principal</h1>

<!-- Texte courant -->
<p class="text-base text-normal">Paragraphe normal</p>

<!-- Texte petit -->
<span class="text-sm text-light">Annotation</span>
```

---

## 🎭 Composants principaux

### Cartes élaborées

```html
<div class="card-elevated">
  <h2 class="text-lg text-bold mb-2">Titre de la carte</h2>
  <p class="text-sm text-secondary">Contenu de la carte</p>
</div>
```

### Boutons modernes

```html
<!-- Bouton primaire -->
<button class="btn-primary-modern">Cliquez-moi</button>

<!-- Bouton fantôme -->
<button class="btn-ghost">Lien en bouton</button>

<!-- Bouton désactivé -->
<button class="btn-primary-modern" disabled>Désactivé</button>
```

### Inputs modernes

```html
<div class="form-group">
  <label class="form-label required">Nom:</label>
  <input type="text" class="input-modern" placeholder="Votre nom">
  <span class="form-hint">Veuillez entrer votre nom complet</span>
</div>
```

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
```

### Alertes

```html
<div class="alert alert-success">
  <span>Opération réussie!</span>
  <button class="alert-close">×</button>
</div>

<div class="alert alert-danger">
  <span>Une erreur s'est produite</span>
  <button class="alert-close">×</button>
</div>
```

### Tableau responsive

```html
<table class="table-modern">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jean Dupont</td>
      <td>jean@example.com</td>
      <td><span class="badge badge-success">Actif</span></td>
    </tr>
  </tbody>
</table>
```

### Modal

```html
<div class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title">Titre du modal</h2>
      <button class="modal-close">×</button>
    </div>
    <div>
      <p>Contenu du modal</p>
    </div>
  </div>
</div>
```

---

## 🎬 Animations

### Animations disponibles

```css
/* Animations d'entrée */
.animate-fade-in      /* Apparition en fondu */
.animate-slide-up     /* Glisse vers le haut */
.animate-slide-down   /* Glisse vers le bas */
.animate-slide-left   /* Glisse vers la gauche */
.animate-slide-right  /* Glisse vers la droite */
.animate-scale        /* Apparition avec agrandissement */

/* Animations en boucle */
.animate-pulse        /* Pulsation douce */
.animate-bounce       /* Rebond */
.animate-spin         /* Rotation */
.animate-ping         /* Ping (disparition progressive) */
```

### Utilisation

```html
<!-- Carte qui apparaît en glissant -->
<div class="card-elevated animate-slide-up">
  Contenu
</div>

<!-- Bouton qui pulse -->
<button class="btn-primary-modern">
  <span class="animate-pulse">Chargement...</span>
</button>

<!-- Spinner -->
<div class="spinner"></div>
```

---

## 📱 Responsivité

### Points de rupture

```
Mobile:       < 480px
Tablette:     480px - 768px
Desktop:      768px - 1024px
Grand écran:  > 1024px
```

### Classes responsives

```html
<!-- Masquer sur mobile -->
<div class="hidden-mobile">Visible uniquement sur desktop</div>

<!-- Grille responsive -->
<div class="grid-auto">
  <div>Colonne 1</div>
  <div>Colonne 2</div>
  <div>Colonne 3</div>
</div>
```

### Exemple complet

```html
<div class="grid-3 max-w-6xl mx-auto px-6">
  <div class="card-elevated">
    <h3 class="text-lg text-bold mb-2">Card 1</h3>
    <p class="text-sm text-secondary">Description</p>
  </div>
  <!-- Plus de cartes... -->
</div>

<!-- Sur mobile: 1 colonne, padding réduit -->
<!-- Sur tablette: 2 colonnes, padding normal -->
<!-- Sur desktop: 3 colonnes, padding normal -->
```

---

## 🌙 Mode sombre

Le système supporte automatiquement le mode sombre via `prefers-color-scheme`.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #f5f5f5;
    --color-bg-primary: #1a1a1a;
    /* ... autres couleurs inversées */
  }
}
```

### Activation manuelle

```javascript
// Activer le mode sombre
document.documentElement.setAttribute('data-theme', 'dark');

// Désactiver le mode sombre
document.documentElement.removeAttribute('data-theme');
```

---

## ♿ Accessibilité

### Contraste WCAG AA+

- **Normal**: Ratio 7:1 ou plus
- **Grand texte**: Ratio 4.5:1 ou plus
- Le thème clair assure ces ratios par défaut

### Focus visible

Tous les éléments interactifs ont un `outline` ou `box-shadow` visible au focus:

```css
.btn-modern:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1),
              0 0 0 6px rgba(22, 163, 74, 0.3);
}
```

### Navigation au clavier

- **Tab**: Naviguer entre les éléments
- **Entrée**: Activer les boutons
- **Espace**: Cocher les cases
- **Flèches**: Naviguer dans les menus

### Texte alternatif

```html
<button aria-label="Fermer">×</button>
<img src="batterie.png" alt="Indicateur de batterie">
```

---

## 🔧 Utilitaires courants

### Display

```html
<div class="flex flex-center">Centré horizontalement et verticalement</div>
<div class="flex flex-between">Espaces autour</div>
<div class="flex-col flex-col-center">Colonne centrée</div>
```

### Texte

```html
<p class="text-center">Texte centré</p>
<p class="text-primary text-bold">Texte en gras et couleur primaire</p>
<p class="truncate">Texte coupé avec ellipsis...</p>
<p class="line-clamp-2">Limité à 2 lignes</p>
```

### Dimensions

```html
<div class="w-full">Largeur 100%</div>
<div class="w-1/2">Largeur 50%</div>
<div class="max-w-lg mx-auto">Largeur max avec centrage</div>
```

### Visibility

```html
<div class="sr-only">Texte visible uniquement pour lecteurs d'écran</div>
<div class="hidden">Toujours caché</div>
<div class="hidden-mobile">Caché sur mobile</div>
```

---

## 📝 Exemples complets

### Dashboard ElectriMada

```html
<div class="dashboard-container">
  <!-- Sidebar -->
  <aside class="dashboard-sidebar">
    <nav class="flex-col flex-gap-2">
      <a href="#" class="nav-link active">
        <span>📊</span> Dashboard
      </a>
      <a href="#" class="nav-link">
        <span>🔋</span> Batteries
      </a>
      <a href="#" class="nav-link">
        <span>⚡</span> Demandes
      </a>
    </nav>
  </aside>

  <!-- Main content -->
  <main>
    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Bienvenue!</h1>
        <p class="text-secondary">Dashboard énergétique</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-label">Énergie restante</div>
        <div class="stat-value">45.2 kWh</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Consommation</div>
        <div class="stat-value">2.1 kW</div>
      </div>
    </div>

    <!-- Batteries -->
    <section class="mt-6">
      <h2 class="text-lg text-bold mb-4">Batteries</h2>
      <div class="foyer-grid">
        <div class="batterie-card">
          <div class="flex flex-between">
            <span class="text-base text-bold">Batterie 1</span>
            <span class="badge badge-success">Chargement</span>
          </div>
          <div class="batterie-progress">
            <div class="batterie-progress-bar" style="width: 75%"></div>
          </div>
          <div class="text-sm text-secondary">75% - 50 kWh</div>
        </div>
      </div>
    </section>
  </main>
</div>
```

---

## 🚨 Dépannage

### Les couleurs ne s'affichent pas

**Solution**: Vérifiez que `theme.css` est bien importé en premier:

```css
@import url('./theme.css');
```

### Les animations sont saccadées

**Solution**: Vérifiez la performance du navigateur:

```css
/* Réduire les animations sur mobile */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Le layout est cassé sur mobile

**Solution**: Vérifiez le viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📚 Ressources

- [WCAG 2.1 - Accessibilité web](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN - CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Material Design - Easing](https://material.io/design/motion/easing.html)
- [Web.dev - Responsive Design](https://web.dev/responsive-web-design-basics/)

---

## ✅ Checklist d'intégration

- [ ] Copier les fichiers CSS dans le projet
- [ ] Importer `main.css` dans le HTML/React
- [ ] Tester le rendu dans les navigateurs modernes
- [ ] Vérifier la responsivité (Chrome DevTools)
- [ ] Tester le mode sombre (`prefers-color-scheme`)
- [ ] Vérifier l'accessibilité (Lighthouse, WAVE)
- [ ] Tester la navigation au clavier
- [ ] Vérifier les performances (animations fluides)
- [ ] Consulter la documentation lors du développement

---

**Version**: 1.0  
**Date**: 2024  
**Auteur**: ElectriMada Team  
**Licence**: MIT
