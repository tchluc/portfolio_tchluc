# Portfolio Professionnel - Luc Tchamdja

Portfolio moderne et professionnel d'un Ingénieur en Intelligence Artificielle et Data Science, construit avec Next.js 14, TypeScript, Tailwind CSS et GSAP.

## ✨ Fonctionnalités

### 🎨 UI/UX Moderne
- **Design Glassmorphisme** - Effets de verre moderne avec blur et saturation améliorés
- **Animations GSAP** - Animations fluides et professionnelles sur scroll
- **Scroll Progress Indicator** - Barre de progression de défilement en temps réel
- **Theme Toggle** - Basculement entre mode clair et sombre avec animations
- **Effets Shimmer** - Effets de brillance sur les cartes au survol
- **Micro-interactions** - Animations subtiles pour une expérience engageante

### 📱 Responsive Design
- Optimisé pour tous les appareils (mobile, tablette, desktop)
- Typography responsive avec système de taille fluide
- Navigation intuitive sur mobile
- Images optimisées avec Next.js Image

### 🚀 Performance
- **SWC Minification** - Compilation ultra-rapide
- **Image Optimization** - Formats AVIF et WebP automatiques
- **CSS Optimization** - CSS optimisé en production
- **GPU Acceleration** - Animations utilisant will-change et transform
- **Code Splitting** - Chargement optimal des composants
- **Console Removal** - Logs retirés en production

### 🎯 Sections Professionnelles
- **Hero Section** - Présentation avec stats et CTA "Télécharger CV"
- **Projects** - Galerie horizontale avec défilement parallaxe
- **Education** - Timeline horizontale immersive
- **Skills Roadmap** - Visualisation interactive des compétences avec pourcentages
- **Certifications** - Cartes 3D flip révélant les compétences
- **Contact** - Section contact avec liens sociaux et formulaire

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **State**: Zustand
- **Font**: Inter & Outfit (Google Fonts)

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📋 Scripts

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build de production
npm run start    # Démarrer le serveur de production
npm run lint     # Vérifier le code avec ESLint
```

## 🎨 Personnalisation

### Modifier les Couleurs
Éditez `tailwind.config.ts` pour changer le thème de couleurs:

```typescript
colors: {
  primary: {
    DEFAULT: "#40E0D0", // Turquoise
    light: "#6FFAEB",
    dark: "#2DB3A6",
  },
}
```

### Ajouter du Contenu
Les données du portfolio sont centralisées dans `src/data/portfolio.ts`:
- Projects
- Education
- Skills
- Certifications

## 📦 Structure du Projet

```
src/
├── app/              # Pages Next.js (App Router)
├── components/       # Composants React
│   └── sections/     # Sections du portfolio
├── data/            # Données du portfolio
├── hooks/           # Custom React hooks
├── lib/             # Utilitaires
├── store/           # State management (Zustand)
└── types/           # Types TypeScript
```

## 🌟 Améliorations Récentes

### Performance
- ✅ Optimisation Next.js (SWC, Image, CSS)
- ✅ GPU acceleration pour les animations
- ✅ Lazy loading des composants
- ✅ Préchargement des ressources critiques

### Design
- ✅ Glassmorphisme avancé
- ✅ Gradients modernes
- ✅ Effets shimmer et glow
- ✅ Animations fluides avec GSAP
- ✅ 3D flip cards pour certifications

### UX
- ✅ Scroll progress indicator
- ✅ Loading states
- ✅ Micro-interactions
- ✅ Responsive design perfectionné
- ✅ Accessibilité améliorée

### Contenu
- ✅ Traduction complète en français
- ✅ Métadonnées SEO optimisées
- ✅ Liens sociaux mis à jour
- ✅ Section CV téléchargeable

## 📧 Contact

- **Email**: tchamdjaluc@gmail.com
- **GitHub**: [@tchluc](https://github.com/tchluc)
- **LinkedIn**: [luc-tchamdja](https://linkedin.com/in/luc-tchamdja)

## 📄 License

© 2024 Luc Tchamdja. Tous droits réservés.

---

Créé avec ❤️ et Next.js
