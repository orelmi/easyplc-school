# Installation et Déploiement

> Guide complet d'installation et de déploiement d'EasyPLC School

**Langues:** Français | [English](INSTALLATION.en.md) | [Español](INSTALLATION.es.md)

## Table des matières

- [Prérequis](#prérequis)
- [Installation locale](#installation-locale)
- [Configuration](#configuration)
- [Base de données](#base-de-données)
- [Déploiement en production](#déploiement-en-production)
- [Docker](#docker)
- [Dépannage](#dépannage)

---

## Prérequis

### Logiciels requis

| Logiciel | Version | Téléchargement |
|----------|---------|----------------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | Inclus avec Node.js |
| Git | 2+ | [git-scm.com](https://git-scm.com/) |

### Vérification des prérequis

```bash
# Vérifier Node.js
node --version
# Doit afficher v18.x.x ou supérieur

# Vérifier npm
npm --version
# Doit afficher 9.x.x ou supérieur

# Vérifier Git
git --version
```

---

## Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/easyplc-school.git
cd easyplc-school
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos valeurs
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# Peupler avec les données de test
npm run db:seed
```

### 5. Démarrer l'application

```bash
# Mode développement (frontend + backend)
npm run dev
```

L'application sera accessible sur:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet:

```env
# Base de données
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="votre-clé-secrète-très-longue-et-sécurisée"

# OAuth Google (optionnel)
GOOGLE_CLIENT_ID="votre-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="votre-client-secret"

# OAuth Facebook (optionnel)
FACEBOOK_APP_ID="votre-app-id"
FACEBOOK_APP_SECRET="votre-app-secret"

# OAuth Microsoft (optionnel)
MICROSOFT_CLIENT_ID="votre-client-id"
MICROSOFT_CLIENT_SECRET="votre-client-secret"

# Serveur
PORT=3000
NODE_ENV="development"

# URLs de callback OAuth
OAUTH_CALLBACK_URL="http://localhost:5173/auth/callback"
```

### Configuration OAuth

#### Google OAuth

1. Accédez à [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un existant
3. Allez dans "APIs & Services" > "Credentials"
4. Cliquez sur "Create Credentials" > "OAuth client ID"
5. Configurez l'écran de consentement
6. Ajoutez les URIs de redirection:
   - `http://localhost:3000/api/auth/google/callback` (dev)
   - `https://votre-domaine.com/api/auth/google/callback` (prod)

#### Facebook OAuth

1. Accédez à [Facebook Developers](https://developers.facebook.com/)
2. Créez une nouvelle application
3. Ajoutez le produit "Facebook Login"
4. Configurez les URIs de redirection OAuth valides

#### Microsoft OAuth

1. Accédez à [Azure Portal](https://portal.azure.com/)
2. Allez dans "Azure Active Directory" > "App registrations"
3. Créez une nouvelle inscription
4. Configurez les URIs de redirection

---

## Base de données

### SQLite (développement)

Par défaut, l'application utilise SQLite pour le développement:

```env
DATABASE_URL="file:./dev.db"
```

### Commandes Prisma utiles

```bash
# Voir le studio Prisma (interface graphique)
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Créer une nouvelle migration
npx prisma migrate dev --name nom_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Régénérer le client après modification du schéma
npx prisma generate
```

### Sauvegarde et restauration

```bash
# Sauvegarde SQLite
cp prisma/dev.db prisma/backup.db

# Restauration
cp prisma/backup.db prisma/dev.db
```

---

## Déploiement en production

### Préparation

1. **Build de l'application**

```bash
# Build frontend et backend
npm run build
```

2. **Variables d'environnement production**

```env
NODE_ENV="production"
DATABASE_URL="file:./prod.db"
JWT_SECRET="clé-très-sécurisée-générée-aléatoirement"
```

### Déploiement sur un serveur

#### Avec PM2

```bash
# Installation globale de PM2
npm install -g pm2

# Démarrer l'application
pm2 start npm --name "easyplc-school" -- run start

# Configurer le démarrage automatique
pm2 startup
pm2 save

# Voir les logs
pm2 logs easyplc-school

# Redémarrer
pm2 restart easyplc-school
```

#### Configuration Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### SSL avec Certbot

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir un certificat
sudo certbot --nginx -d votre-domaine.com

# Renouvellement automatique
sudo certbot renew --dry-run
```

### Déploiement sur plateformes cloud

#### Railway

1. Connectez votre dépôt GitHub
2. Configurez les variables d'environnement
3. Railway détecte automatiquement Node.js

#### Render

1. Créez un nouveau "Web Service"
2. Connectez le dépôt
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`

#### Vercel

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel
```

---

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci --only=production

# Générer Prisma Client
RUN npx prisma generate

# Copier le reste du code
COPY . .

# Build
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer
CMD ["npm", "run", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:/app/prisma/prod.db
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./prisma/prod.db:/app/prisma/prod.db
    restart: unless-stopped
```

### Commandes Docker

```bash
# Build l'image
docker build -t easyplc-school .

# Démarrer avec docker-compose
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

---

## Dépannage

### Erreurs courantes

#### "Cannot find module '@prisma/client'"

```bash
# Régénérer le client Prisma
npx prisma generate
```

#### "Database does not exist"

```bash
# Créer et migrer la base de données
npx prisma migrate dev
```

#### "Port 3000 already in use"

```bash
# Trouver le processus
lsof -i :3000

# Ou changer le port dans .env
PORT=3001
```

#### "OAuth callback error"

Vérifiez que:
1. Les URIs de callback sont correctement configurées chez le provider
2. Les variables d'environnement CLIENT_ID et CLIENT_SECRET sont correctes
3. L'URL de callback correspond exactement

### Logs et debugging

```bash
# Mode debug
DEBUG=* npm run dev

# Voir les requêtes Prisma
# Ajoutez dans schema.prisma:
# generator client {
#   provider = "prisma-client-js"
#   previewFeatures = ["tracing"]
# }
```

### Support

- **Documentation**: [docs/](.)
- **Issues GitHub**: [github.com/issues](https://github.com/votre-username/easyplc-school/issues)
- **Discussions**: [github.com/discussions](https://github.com/votre-username/easyplc-school/discussions)
