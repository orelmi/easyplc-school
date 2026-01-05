# EasyPLC School

Plateforme open source d'apprentissage de l'automatisme industriel et des automates programmables (PLC).

> **Projet open source** : Ce projet est ouvert aux contributions ! Que vous soyez développeur, enseignant en automatisme ou professionnel de l'industrie, vos contributions sont les bienvenues pour enrichir le contenu pédagogique et améliorer la plateforme.

## Table des matières

- [Captures d'écran](#captures-décran)
- [Contenu pédagogique](#contenu-pédagogique)
  - [Module 1 : Introduction à l'automatisme](#module-1--introduction-à-lautomatisme-)
  - [Module 2 : Logique combinatoire](#module-2--logique-combinatoire-)
  - [Module 3 : Le langage LADDER](#module-3--le-langage-ladder-)
  - [Module 4 : Capteurs et actionneurs](#module-4--capteurs-et-actionneurs-)
  - [Module 5 : GRAFCET](#module-5--grafcet-)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Compte démo](#compte-démo)
- [Stack technique](#stack-technique)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Captures d'écran

### Vue d'ensemble
![Vue d'ensemble de l'application](public/overview.png)

### Module d'apprentissage
![Exemple d'un module](public/module1.png)

---

## Contenu pédagogique

EasyPLC School propose un parcours complet pour maîtriser les fondamentaux de l'automatisme industriel. Chaque module est conçu pour être progressif, avec des leçons théoriques, des schémas explicatifs et des quiz de validation.

### Public cible

- Étudiants en génie électrique, maintenance industrielle ou automatisme
- Techniciens souhaitant se reconvertir vers l'automatisme
- Professionnels cherchant à consolider leurs bases

---

### Module 1 : Introduction à l'automatisme 🔌

> **Objectif** : Comprendre ce qu'est un automate programmable et son rôle dans l'industrie

#### Architecture d'un automate (PLC)

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATE PROGRAMMABLE                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  │ ENTRÉES │───▶│     CPU     │───▶│    SORTIES      │ │  │
│  │  │  (I)    │    │  (Programme)│    │      (Q)        │ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  └─────────┘    └─────────────┘    └─────────────────┘ │  │
│  │       ▲               │                    │           │  │
│  │       │          ┌────┴────┐               ▼           │  │
│  │       │          │ MÉMOIRE │         ┌─────────┐       │  │
│  │       │          └─────────┘         │ALIMENT. │       │  │
│  │       │                              └─────────┘       │  │
│  └───────┼──────────────────────────────────────────────┘  │
│          │                                      │           │
└──────────┼──────────────────────────────────────┼───────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  CAPTEURS   │                      │  ACTIONNEURS  │
    │ - Boutons   │                      │ - Moteurs     │
    │ - Détecteurs│                      │ - Vannes      │
    │ - Sondes    │                      │ - Voyants     │
    └─────────────┘                      └───────────────┘
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Qu'est-ce qu'un automate programmable ? | 10 min | 50 | Découverte du PLC et son rôle industriel |
| 2 | Les entrées et sorties (E/S) | 12 min | 60 | Comprendre l'interface avec le monde physique |
| 3 | Le cycle automate | 15 min | 70 | Fonctionnement cyclique : lecture → exécution → écriture |

#### Le cycle automate

```
        ┌────────────────────────────────────────┐
        │                                        │
        ▼                                        │
┌───────────────┐                                │
│   LECTURE     │  Lire l'état de toutes        │
│   ENTRÉES     │  les entrées (capteurs)       │
└───────┬───────┘                                │
        │                                        │
        ▼                                        │
┌───────────────┐                                │
│  EXÉCUTION    │  Exécuter le programme        │
│  PROGRAMME    │  ligne par ligne              │
└───────┬───────┘                                │
        │                                        │
        ▼                                        │
┌───────────────┐                                │
│   ÉCRITURE    │  Mettre à jour les            │
│   SORTIES     │  sorties (actionneurs)        │
└───────┬───────┘                                │
        │                                        │
        └────────────────────────────────────────┘
                  Temps de cycle : 5-20 ms
```

---

### Module 2 : Logique combinatoire 🔀

> **Objectif** : Maîtriser les portes logiques fondamentales ET, OU, NON

#### Les trois portes logiques de base

```
    PORTE ET (AND)              PORTE OU (OR)              PORTE NON (NOT)
    ─────────────               ─────────────               ──────────────

    A ──┐                       A ──┐                            ┌──o── S
        │ ┌───┐                     │ ┌───┐                  A ──┤
    B ──┴─┤ & ├── S             B ──┴─┤≥1 ├── S                  └─────
          └───┘                       └───┘
                                                            S = NON A
    S = A ET B                  S = A OU B                  (inversion)
    (tous à 1)                  (au moins 1)
```

#### Tables de vérité

**Porte ET (AND)**
| A | B | A ET B |
|:-:|:-:|:------:|
| 0 | 0 | **0**  |
| 0 | 1 | **0**  |
| 1 | 0 | **0**  |
| 1 | 1 | **1**  |

**Porte OU (OR)**
| A | B | A OU B |
|:-:|:-:|:------:|
| 0 | 0 | **0**  |
| 0 | 1 | **1**  |
| 1 | 0 | **1**  |
| 1 | 1 | **1**  |

**Porte NON (NOT)**
| A | NON A |
|:-:|:-----:|
| 0 | **1** |
| 1 | **0** |

#### Exemple industriel : Démarrage sécurisé d'un moteur

```
Conditions de démarrage :
━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────┐
    │  Bouton START   │──┐
    │    (appuyé)     │  │
    └─────────────────┘  │
                         │    ┌─────┐
    ┌─────────────────┐  ├────┤     │
    │ Capot sécurité  │──┤    │ ET  ├───▶ MOTEUR DÉMARRE
    │    (fermé)      │  ├────┤     │
    └─────────────────┘  │    └─────┘
                         │
    ┌─────────────────┐  │
    │  Arrêt urgence  │──┘
    │ (NON enclenché) │
    └─────────────────┘

Le moteur démarre UNIQUEMENT si les 3 conditions sont réunies !
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | La porte ET (AND) | 12 min | 60 | Fonction ET et contacts en série |
| 2 | La porte OU (OR) | 12 min | 60 | Fonction OU et contacts en parallèle |
| 3 | La porte NON (NOT) | 10 min | 50 | Inversion et contacts normalement fermés |

---

### Module 3 : Le langage LADDER 🪜

> **Objectif** : Lire et écrire des programmes en langage LADDER (schéma à contacts)

#### Principe du LADDER

Le LADDER (échelle) est un langage graphique qui ressemble aux schémas électriques. Le "courant" circule de gauche à droite.

```
    Barre         Contacts              Bobine         Barre
    gauche                                            droite
      │                                                 │
      │     ┌─────┐          ┌─────┐         ┌───┐     │
      ├─────┤ I0.0├──────────┤ I0.1├─────────┤Q0.0├────┤
      │     └──┬──┘          └──┬──┘         └─┬─┘     │
      │        │                │              │       │
      │     Contact          Contact        Bobine     │
      │       NO               NO                      │
      │                                                │
```

#### Éléments de base

```
CONTACTS                              BOBINES

  ──┤ ├──   Contact NO               ──( )──   Bobine simple
            (Normalement Ouvert)               (activée si courant)

  ──┤/├──   Contact NF               ──(S)──   Bobine SET
            (Normalement Fermé)                (mémorisation)

                                     ──(R)──   Bobine RESET
                                               (remise à zéro)
```

#### Exemple : Fonction ET en LADDER

```
Équation logique : Q0.0 = I0.0 ET I0.1

      │                                         │
      │     ┌─────┐          ┌─────┐   ┌─────┐  │
      ├─────┤ I0.0├──────────┤ I0.1├───┤ Q0.0├──┤
      │     └─────┘          └─────┘   └─────┘  │
      │    (Bouton 1)       (Bouton 2) (Voyant) │
      │                                         │

Le voyant s'allume si Bouton 1 ET Bouton 2 sont appuyés
```

#### Exemple : Fonction OU en LADDER

```
Équation logique : Q0.0 = I0.0 OU I0.1

      │     ┌─────┐                    ┌─────┐  │
      ├─────┤ I0.0├────────────────────┤ Q0.0├──┤
      │     └─────┘                    └──┬──┘  │
      │         │                         │     │
      │     ┌───┴───┐                     │     │
      ├─────┤  I0.1 ├─────────────────────┘     │
      │     └───────┘                           │
      │                                         │

Le voyant s'allume si Bouton 1 OU Bouton 2 est appuyé
```

#### Exemple : Auto-maintien (mémorisation)

```
Marche/Arrêt d'un moteur avec mémorisation :

      │     ┌─────┐   ┌─────┐          ┌─────┐  │
      ├─────┤START├───┤STOP ├──────────┤MOTOR├──┤
      │     └─────┘   └──/──┘          └──┬──┘  │
      │         │        NF               │     │
      │     ┌───┴────────────────────┐    │     │
      ├─────┤        MOTOR           ├────┘     │
      │     └────────────────────────┘          │
      │          (auto-maintien)                │

1. Appui sur START → MOTOR s'active
2. MOTOR reste actif (auto-maintien)
3. Appui sur STOP → MOTOR se désactive
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Introduction au langage LADDER | 15 min | 70 | Structure et symboles de base |
| 2 | Contacts et bobines | 18 min | 80 | Contacts NO/NF, bobines SET/RESET |

---

### Module 4 : Capteurs et actionneurs 📡

> **Objectif** : Connecter un automate au monde physique

#### Types de capteurs TOR (Tout Ou Rien)

```
CAPTEURS MÉCANIQUES                    CAPTEURS DE PROXIMITÉ
━━━━━━━━━━━━━━━━━━━                    ━━━━━━━━━━━━━━━━━━━━━

┌─────────────────┐                    ┌─────────────────┐
│  FIN DE COURSE  │                    │    INDUCTIF     │
│                 │                    │   ┌───────┐     │
│    ┌────┐       │                    │   │ ~~~   │     │  Détecte
│  ──┤    ├──     │                    │   │  ○    │◀────│  les MÉTAUX
│    └────┘       │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘

┌─────────────────┐                    ┌─────────────────┐
│ BOUTON POUSSOIR │                    │   CAPACITIF     │
│                 │                    │   ┌───────┐     │
│      ┌─┐        │                    │   │  ≋≋   │     │  Détecte
│    ──┤ ├──      │                    │   │  ○    │◀────│  TOUT matériau
│      └─┘        │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘

                                       ┌─────────────────┐
                                       │    OPTIQUE      │
                                       │                 │
                                       │  ▶━━━━━━━◀      │  Faisceau
                                       │  Émetteur Récep.│  lumineux
                                       └─────────────────┘
```

#### Câblage type d'un capteur

```
           ┌────────────────────────────────────┐
           │           AUTOMATE                 │
           │                                    │
           │  ┌─────┐  ┌─────┐  ┌─────┐        │
           │  │ I0.0│  │ I0.1│  │ I0.2│  ...   │
           │  └──┬──┘  └──┬──┘  └──┬──┘        │
           │     │        │        │           │
           └─────┼────────┼────────┼───────────┘
                 │        │        │
            ┌────┴───┐ ┌──┴────┐ ┌─┴─────┐
            │Capteur │ │Capteur│ │Capteur│
            │   1    │ │   2   │ │   3   │
            └────────┘ └───────┘ └───────┘

       💡 Chaque capteur est connecté à une entrée de l'automate
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Les capteurs TOR | 15 min | 70 | Capteurs mécaniques et de proximité |

---

### Module 5 : GRAFCET 📊

> **Objectif** : Modéliser et programmer des systèmes séquentiels

#### Structure du GRAFCET

```
    ╔═══════════════════════════════════════════════════════╗
    ║                    GRAFCET                             ║
    ║   Graphe Fonctionnel de Commande Étape-Transition     ║
    ╚═══════════════════════════════════════════════════════╝

         ┌─────┐
         │  0  │◀──── Étape initiale (double carré)
         └──┬──┘
            │
         ───┴───  ◀── Transition (condition)
         départ
            │
         ┌──┴──┐
         │  1  │───── Action : Avancer vérin
         └──┬──┘
            │
         ───┴───
         fin av.
            │
         ┌──┴──┐
         │  2  │───── Action : Reculer vérin
         └──┬──┘
            │
         ───┴───
         fin rec.
            │
            └────────▶ Retour à l'étape 0
```

#### Éléments du GRAFCET

```
ÉTAPE                           TRANSITION                 ACTION
━━━━━                           ━━━━━━━━━━                 ━━━━━━

┌─────┐
│  n  │  Étape normale           ────┬────                │  n  │── Action
└─────┘                         condition                 └─────┘
                                     │
╔═════╗
║  0  ║  Étape initiale         Exemples :
╚═════╝  (active au départ)     - "bouton appuyé"
                                - "capteur = 1"
                                - "tempo écoulée"
```

#### Exemple : Cycle d'un vérin

```
    Vérin simple effet avec 2 capteurs de position

    ┌──────────────────────────────────────────┐
    │  [a]                               [b]   │
    │   ○━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○    │
    │        ◀══════════════════════▶          │
    │              Piston mobile               │
    └──────────────────────────────────────────┘
        a = capteur rentré       b = capteur sorti


                    GRAFCET

                    ╔═════╗
                    ║  0  ║──── Attente
                    ╚══╤══╝
                       │
                    ───┴─── dcy (départ cycle)
                       │
                    ┌──┴──┐
                    │  1  │──── Sortir vérin (V+)
                    └──┬──┘
                       │
                    ───┴─── b (vérin sorti)
                       │
                    ┌──┴──┐
                    │  2  │──── Rentrer vérin (V-)
                    └──┬──┘
                       │
                    ───┴─── a (vérin rentré)
                       │
                       └────▶ Retour étape 0
```

#### Leçons du module

| # | Leçon | Durée | XP | Description |
|---|-------|-------|-----|-------------|
| 1 | Introduction au GRAFCET | 20 min | 80 | Étapes, transitions, actions |

---

## Fonctionnalités

### Système d'utilisateurs
- Inscription et connexion sécurisées (JWT)
- Profil utilisateur personnalisable
- Suivi de progression individuel

### Système de gamification
- **Points XP** : Gagnez des points en complétant les leçons
- **Niveaux** : Progressez et débloquez de nouveaux modules
- **Série quotidienne** : Maintenez votre streak de connexion
- **Récompenses** : Badges et trophées à collectionner

### Classement
- Classement global des utilisateurs
- Filtres par période (semaine, mois, tout temps)
- Visualisation de votre rang

### Système de points XP

| Action | XP gagné |
|--------|----------|
| Compléter une leçon | 50-80 XP (selon score) |
| Badge débloqué | 25-100 XP bonus |
| Trophée obtenu | 150-200 XP bonus |

Le niveau est calculé selon la formule : XP total = 50 × niveau × (niveau + 1)

---

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone https://github.com/orelmi/easyplc-school.git
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

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend API : http://localhost:3001

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
│   └── seed.ts          # Script de peuplement + contenu pédagogique
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
- **Fonctionnalités** : Simulateur LADDER, éditeur GRAFCET, mode hors-ligne
- **Améliorations UI/UX** : Accessibilité, responsive design, animations
- **Documentation** : Tutoriels, guides d'utilisation, traductions
- **Tests** : Tests unitaires, tests d'intégration
- **Corrections** : Bugs, fautes d'orthographe, optimisations

### Idées de contributions

- [ ] Ajouter un simulateur d'automate interactif
- [ ] Créer un éditeur GRAFCET visuel
- [ ] Ajouter des animations pour les schémas LADDER
- [ ] Implémenter un mode examen
- [ ] Ajouter le support multi-langues (EN, ES, DE)
- [ ] Créer des exercices de programmation pratiques

### Enrichir le contenu pédagogique

Le contenu des leçons est défini dans `prisma/seed.ts`. Pour ajouter du contenu :

1. Ouvrez le fichier `prisma/seed.ts`
2. Ajoutez vos leçons en suivant la structure existante
3. Relancez `npm run db:seed` pour appliquer les changements

## Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Développé avec passion pour la formation en automatisme industriel.
