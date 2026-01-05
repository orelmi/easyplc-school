# Guide de Déploiement - EasyPLC School

Ce guide explique comment déployer l'application EasyPLC School en production.

## Prérequis

- Node.js 20+
- PostgreSQL 15+ (pour la production)
- Docker et Docker Compose (optionnel)

## Configuration

### Variables d'environnement

Copiez `.env.example` vers `.env` et configurez les variables :

```bash
cp .env.example .env
```

Variables importantes :
- `DATABASE_URL` : URL de connexion PostgreSQL
- `JWT_SECRET` : Clé secrète pour les tokens JWT (générez avec `openssl rand -base64 32`)
- `CORS_ORIGINS` : Domaines autorisés (séparés par des virgules)
- `NODE_ENV` : `production` pour la production

### Base de données

Pour la production, utilisez le schéma PostgreSQL :

```bash
# Copier le schéma de production
cp prisma/schema.production.prisma prisma/schema.prisma

# Créer une migration
npm run db:migrate:dev -- --name init

# Appliquer en production
npm run db:migrate
```

## Options de Déploiement

### 1. Docker Compose (Recommandé pour auto-hébergement)

```bash
# Créer un fichier .env avec vos variables
cp .env.example .env
# Éditer .env avec vos valeurs

# Lancer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Seeder la base de données (première fois)
docker-compose exec app npm run db:seed
```

### 2. Railway

1. Créez un compte sur [Railway](https://railway.app)
2. Créez un nouveau projet depuis GitHub
3. Ajoutez un service PostgreSQL
4. Configurez les variables d'environnement :
   - `DATABASE_URL` : (fournie par Railway)
   - `JWT_SECRET` : Votre clé secrète
   - `CORS_ORIGINS` : `https://votre-app.railway.app`
5. Railway détectera automatiquement `railway.json`

### 3. Render

1. Créez un compte sur [Render](https://render.com)
2. Utilisez "Blueprint" et sélectionnez votre repo
3. Render utilisera `render.yaml` pour configurer automatiquement :
   - Service web Node.js
   - Base de données PostgreSQL
4. Configurez `CORS_ORIGINS` dans les variables d'environnement

### 4. VPS / Serveur dédié

```bash
# Sur le serveur
git clone https://github.com/votre-repo/easyplc-school.git
cd easyplc-school

# Installer les dépendances
npm ci --only=production

# Configurer l'environnement
cp .env.example .env
nano .env  # Éditer avec vos valeurs

# Utiliser le schéma PostgreSQL
cp prisma/schema.production.prisma prisma/schema.prisma

# Build et migration
npm run prod:build
npm run db:migrate

# Seeder (première fois seulement)
npm run db:seed

# Lancer avec PM2
npm install -g pm2
pm2 start npm --name "easyplc" -- run start:prod
pm2 save
pm2 startup
```

### 5. Vercel (Frontend) + Railway/Render (Backend)

Pour séparer frontend et backend :

**Frontend (Vercel) :**
```bash
# vercel.json
{
  "buildCommand": "npm run build:client",
  "outputDirectory": "dist/client",
  "framework": "vite"
}
```

**Backend (Railway/Render) :**
Déployez normalement avec les instructions ci-dessus.

## Scripts de Production

| Script | Description |
|--------|-------------|
| `npm run prod:build` | Build complet (client + serveur + Prisma) |
| `npm run prod:start` | Démarre en production avec migrations |
| `npm run start:prod` | Démarre le serveur en mode production |
| `npm run db:migrate` | Applique les migrations Prisma |
| `npm run db:seed` | Seed la base de données |

## Vérification du Déploiement

Après le déploiement, vérifiez :

1. **Health check** : `GET /api/health`
   ```bash
   curl https://votre-domaine.com/api/health
   # Devrait retourner : {"status":"ok","timestamp":"..."}
   ```

2. **Connexion à la base** : Testez la création d'un utilisateur

3. **Frontend** : Accédez à la page d'accueil

## Sécurité en Production

- [ ] JWT_SECRET est une clé forte et unique
- [ ] CORS_ORIGINS contient uniquement vos domaines
- [ ] Base de données PostgreSQL avec mot de passe fort
- [ ] HTTPS activé (généralement automatique sur Railway/Render)
- [ ] Variables sensibles jamais dans le code

## Mise à Jour

```bash
# Tirer les derniers changements
git pull

# Rebuild et redéployer
npm run prod:build
npm run db:migrate
pm2 restart easyplc
```

## Dépannage

### Erreur de connexion à la base de données
- Vérifiez `DATABASE_URL`
- Vérifiez que PostgreSQL est accessible
- Pour Docker : vérifiez que le service `db` est en bonne santé

### Erreur CORS
- Vérifiez `CORS_ORIGINS` inclut votre domaine frontend
- Format : `https://example.com,https://www.example.com`

### Erreur 500 sur les routes API
- Vérifiez les logs : `docker-compose logs app` ou `pm2 logs`
- Vérifiez que les migrations sont appliquées

## Support

Pour toute question, ouvrez une issue sur le repository GitHub.
