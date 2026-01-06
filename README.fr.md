# EasyPLC School

Plateforme open source d'apprentissage de l'automatisme industriel et des automates programmables (PLC).

> **Projet open source** : Ce projet est ouvert aux contributions ! Que vous soyez développeur, enseignant en automatisme ou professionnel de l'industrie, vos contributions sont les bienvenues pour enrichir le contenu pédagogique et améliorer la plateforme.

**Langues :** [English](README.md) | Français | [Español](README.es.md)

## Table des matières

- [Captures d'écran](#captures-décran)
- [Fonctionnalités](#fonctionnalités)
- [Démarrage rapide](#démarrage-rapide)
- [Documentation](#documentation)
- [Compte démo](#compte-démo)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Captures d'écran

### Vue d'ensemble
![Vue d'ensemble de l'application](public/overview.png)

### Module d'apprentissage
![Exemple d'un module](public/module1.png)

### Parcours d'apprentissage
![Parcours d'apprentissage](public/learning-path.png)

### Simulateur G-Code interactif
![Simulateur G-Code](public/gcode-simulator.png)

### Simulateur PLC / LADDER
![Simulateur PLC](public/plc-simulator.png)

---

## Fonctionnalités

### Parcours d'apprentissage

EasyPLC School propose quatre parcours de spécialisation :

| Parcours | Modules | Description |
|----------|---------|-------------|
| 🏭 Automatisme industriel | 5 | Bases PLC, LADDER, GRAFCET |
| 🔧 Commande numérique | 6 | Programmation G-Code, systèmes d'axes |
| 🔷 Automatisme Siemens | 6 | S7-1500, TIA Portal, blocs de données |
| ⚡ VFD et Positionnement | 9 | Variateurs de vitesse, contrôle de mouvement |

### Simulateurs interactifs

- **Simulateur PLC / LADDER** : Visualisation LADDER en temps réel avec panneau E/S
- **Éditeur GRAFCET** : Création visuelle et simulation de diagrammes séquentiels
- **Simulateur G-Code / CNC** : Visualisation 2D/3D des trajectoires d'outils

### Gamification

- Points XP et système de niveaux
- Badges et trophées
- Classement global
- Suivi des séries quotidiennes

---

## Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone https://github.com/orelmi/easyplc-school.git
cd easyplc-school

# Installer les dépendances
npm install

# Configurer la base de données
npx prisma generate
npx prisma db push

# Peupler la base de données (optionnel)
npm run db:seed

# Lancer l'application
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend API : http://localhost:3001

---

## Documentation

| Document | Description |
|----------|-------------|
| 📚 [Pédagogie](docs/PEDAGOGY.md) | Parcours, modules, exercices, gamification |
| 🏗️ [Architecture](docs/ARCHITECTURE.md) | Stack technique, structure du projet, BDD, API |
| 🚀 [Installation](docs/INSTALLATION.md) | Configuration complète, déploiement |

---

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

---

## Stack technique

### Frontend
- React 18 + TypeScript
- Vite, Tailwind CSS, React Router v6
- Zustand (gestion d'état)
- Three.js (visualisation 3D)

### Backend
- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- Authentification JWT + bcrypt
- Passport (stratégies OAuth)

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le frontend et le backend en mode développement |
| `npm run dev:client` | Lance uniquement le frontend |
| `npm run dev:server` | Lance uniquement le backend |
| `npm run build` | Build de production |
| `npm run db:seed` | Peuple la DB avec les données initiales |
| `npm run db:studio` | Ouvre Prisma Studio (GUI DB) |

---

## Contribuer

Ce projet est open source et accueille les contributions de la communauté !

### Comment contribuer

1. **Fork** le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une **Pull Request**

### Types de contributions recherchées

- **Contenu pédagogique** : Nouveaux modules, leçons, exercices
- **Fonctionnalités** : Mode examen, mode hors-ligne
- **Améliorations UI/UX** : Accessibilité, responsive design, animations
- **Documentation** : Tutoriels, guides d'utilisation, traductions
- **Tests** : Tests unitaires, tests d'intégration
- **Corrections** : Bugs, fautes d'orthographe, optimisations

### Enrichir le contenu pédagogique

Le contenu pédagogique est organisé en fichiers modulaires dans `prisma/modules/`. Consultez la [documentation pédagogique](docs/PEDAGOGY.md) pour les détails sur la structure des modules et comment ajouter du contenu.

---

## Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Développé avec passion pour la formation en automatisme industriel.
