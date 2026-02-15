# 🐳 Docker Build Guide - Portfolio Next.js

## Configuration Docker Créée

J'ai créé la configuration Docker complète pour votre portfolio :

### Fichiers créés :
- ✅ [`Dockerfile`](file:///c:/Users/tcham/portfolio/portfolio_tchluc/Dockerfile) - Build multi-stage optimisé
- ✅ [`.dockerignore`](file:///c:/Users/tcham/portfolio/portfolio_tchluc/.dockerignore) - Exclusion de fichiers inutiles
- ✅ [`docker-compose.yml`](file:///c:/Users/tcham/portfolio/portfolio_tchluc/docker-compose.yml) - Orchestration du conteneur

---

## 🚀 Commandes Docker

### Option 1 : Docker Compose (Recommandé)

```bash
# Build et démarrer le conteneur
docker-compose up --build

# En mode détaché (background)
docker-compose up -d --build

# Arrêter le conteneur
docker-compose down
```

### Option 2 : Docker classique

```bash
# Build l'image
docker build -t portfolio-tchluc .

# Lancer le conteneur
docker run -p 3000:3000 portfolio-tchluc

# En mode détaché
docker run -d -p 3000:3000 --name portfolio portfolio-tchluc
```

---

## ⚙️ Configuration Requise

**IMPORTANT** : Pour que le Dockerfile fonctionne, vous devez activer le mode `standalone` dans Next.js.

Modifiez `next.config.mjs` et ajoutez :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // ← Ajouter cette ligne
  // ... autres configurations
};

export default nextConfig;
```

---

## 📦 Caractéristiques du Dockerfile

- **Multi-stage build** : Réduit la taille de l'image finale
- **Alpine Linux** : Image légère (~100MB vs ~1GB)
- **Utilisateur non-root** : Sécurité renforcée
- **Optimisations** :
  - Cache des dépendances npm
  - Télémétrie Next.js désactivée
  - Production-ready

---

## 🔍 Vérification

Une fois le conteneur lancé :

```bash
# Vérifier les logs
docker-compose logs -f

# Ou avec Docker classique
docker logs -f portfolio
```

Le portfolio sera accessible sur **http://localhost:3000**

---

## 🛠️ Commandes Utiles

```bash
# Lister les conteneurs actifs
docker ps

# Arrêter un conteneur
docker stop portfolio

# Supprimer un conteneur
docker rm portfolio

# Supprimer l'image
docker rmi portfolio-tchluc

# Rebuild sans cache
docker-compose build --no-cache
```

---

## ⚡ Prochaines Étapes

1. **Modifier `next.config.mjs`** pour ajouter `output: 'standalone'`
2. **Builder l'image** : `docker-compose build`
3. **Lancer le conteneur** : `docker-compose up`
4. **Tester** sur http://localhost:3000

Le portfolio est prêt pour le déploiement Docker! 🚀
