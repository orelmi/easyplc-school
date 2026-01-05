# EasyPLC School

Plateforme d'apprentissage de l'automatisme industriel et des automates programmables (PLC).

## Captures d'écran

### Vue d'ensemble
![Vue d'ensemble de l'application](public/overview.png)

### Module d'apprentissage
![Exemple d'un module](public/module1.png)

## Fonctionnalités

### Système d'utilisateurs
- Inscription et connexion sécurisées (JWT)
- Profil utilisateur personnalisable
- Suivi de progression individuel

### Apprentissage progressif
5 modules d'apprentissage couvrant les fondamentaux de l'automatisme :

1. **Introduction à l'automatisme** - Découverte des automates programmables (PLC)
2. **Logique combinatoire** - Portes logiques ET, OU, NON
3. **Langage LADDER** - Programmation en schéma à contacts
4. **Capteurs et actionneurs** - Interfaçage avec le monde physique
5. **GRAFCET** - Modélisation des systèmes séquentiels

### Système de gamification
- **Points XP** : Gagnez des points en complétant les leçons
- **Niveaux** : Progressez et débloquez de nouveaux modules
- **Série quotidienne** : Maintenez votre streak de connexion
- **Récompenses** : Badges et trophées à collectionner

### Classement
- Classement global des utilisateurs
- Filtres par période (semaine, mois, tout temps)
- Visualisation de votre rang

## Stack technique

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router v6
- Zustand (state management)

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- JWT (authentification)
- bcrypt (hachage des mots de passe)

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone <repo-url>
cd easyplc-school
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**
```bash
npx prisma generate
npx prisma db push
```

4. **Peupler la base de données** (optionnel)
```bash
npm run db:seed
```

5. **Lancer l'application**
```bash
npm run dev
```

## Compte démo

Un compte démo est créé automatiquement lors du seed :

| Champ | Valeur |
|-------|--------|
| Email | `demo@easyplc.fr` |
| Mot de passe | `demo123` |

Ce compte a déjà :
- 255 XP et niveau 2
- 3 leçons complétées
- 3 récompenses débloquées
- Une série de 3 jours

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend API : http://localhost:3001

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le frontend et le backend en mode développement |
| `npm run dev:client` | Lance uniquement le frontend |
| `npm run dev:server` | Lance uniquement le backend |
| `npm run build` | Build de production |
| `npm run db:push` | Applique le schéma Prisma à la DB |
| `npm run db:seed` | Peuple la DB avec les données initiales |
| `npm run db:studio` | Ouvre Prisma Studio (GUI DB) |

## Structure du projet

```
easyplc-school/
├── prisma/
│   ├── schema.prisma    # Schéma de la base de données
│   └── seed.ts          # Script de peuplement
├── server/
│   ├── index.ts         # Point d'entrée du serveur
│   ├── middleware/
│   │   └── auth.ts      # Middleware d'authentification
│   └── routes/
│       ├── auth.ts      # Routes d'authentification
│       ├── users.ts     # Routes utilisateurs
│       ├── modules.ts   # Routes des modules
│       ├── lessons.ts   # Routes des leçons
│       ├── progress.ts  # Routes de progression
│       ├── rewards.ts   # Routes des récompenses
│       └── leaderboard.ts # Routes du classement
├── src/
│   ├── components/
│   │   └── Layout.tsx   # Layout principal
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Modules.tsx
│   │   ├── ModuleDetail.tsx
│   │   ├── Lesson.tsx
│   │   ├── Rewards.tsx
│   │   ├── Leaderboard.tsx
│   │   └── Profile.tsx
│   ├── store/
│   │   └── authStore.ts # Store Zustand
│   ├── lib/
│   │   └── api.ts       # Client API
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| GET | `/api/auth/me` | Utilisateur courant |

### Modules & Leçons
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/modules` | Liste des modules |
| GET | `/api/modules/:id` | Détail d'un module |
| GET | `/api/lessons/:id` | Contenu d'une leçon |
| POST | `/api/lessons/:id/submit` | Soumettre un quiz |

### Progression & Récompenses
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/progress` | Progression de l'utilisateur |
| GET | `/api/rewards` | Liste des récompenses |
| GET | `/api/leaderboard` | Classement des utilisateurs |

## Système de points XP

| Action | XP gagné |
|--------|----------|
| Compléter une leçon | 50-80 XP (selon score) |
| Badge débloqué | 25-100 XP bonus |
| Trophée obtenu | 150-200 XP bonus |

### Formule de niveau
Le niveau est calculé selon la formule : XP total = 50 × niveau × (niveau + 1)

## Contenu pédagogique

Le contenu des leçons couvre :
- Définitions et concepts de base
- Tableaux de vérité
- Exemples pratiques industriels
- Quiz de validation des acquis

Chaque leçon inclut :
- Sections de texte formaté
- Encarts d'information (💡)
- Alertes et avertissements (⚠️)
- Questions à choix multiples avec explications

## Licence

MIT
