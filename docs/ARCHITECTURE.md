# Architecture Technique

> Documentation complète de l'architecture technique d'EasyPLC School

**Langues :** Français | [English](ARCHITECTURE.en.md) | [Español](ARCHITECTURE.es.md)

## Table des matières

- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Architecture des modules](#architecture-des-modules)
- [Base de données](#base-de-données)
- [API REST](#api-rest)
- [Authentification](#authentification)
- [Système d'exercices](#système-dexercices)
- [Internationalisation](#internationalisation)

---

## Stack technique

### Frontend

| Technologie | Version | Description |
|-------------|---------|-------------|
| React | 18+ | Bibliothèque UI |
| TypeScript | 5+ | Typage statique |
| Vite | 5+ | Build tool et serveur de développement |
| Tailwind CSS | 3+ | Framework CSS utility-first |
| React Router | 6+ | Routage SPA |
| Zustand | 4+ | Gestion d'état légère |
| Three.js | - | Visualisation 3D (simulateur G-Code) |
| i18next | - | Internationalisation |

### Backend

| Technologie | Version | Description |
|-------------|---------|-------------|
| Node.js | 18+ | Runtime JavaScript |
| Express | 4+ | Framework web |
| TypeScript | 5+ | Typage statique |
| Prisma | 5+ | ORM et migrations |
| SQLite | - | Base de données (dev/prod) |
| JWT | - | Authentification par tokens |
| bcrypt | - | Hachage des mots de passe |
| Passport | - | Stratégies OAuth |

---

## Structure du projet

```
easyplc-school/
├── prisma/
│   ├── schema.prisma        # Schéma de la base de données
│   ├── seed.ts              # Script principal de peuplement
│   └── modules/             # Contenu pédagogique modulaire
│       ├── index.ts         # Ré-exporte tous les modules
│       ├── types.ts         # Types TypeScript partagés
│       ├── module-01-automation/
│       │   ├── index.ts     # Données du module (leçons, quiz)
│       │   └── exercises.ts # Exercices interactifs
│       ├── module-02-combinational/
│       │   ├── index.ts
│       │   └── exercises.ts
│       └── ... (17 modules)
│
├── server/
│   ├── index.ts             # Point d'entrée du serveur
│   ├── config/
│   │   └── passport.ts      # Configuration OAuth
│   ├── middleware/
│   │   └── auth.ts          # Middleware JWT
│   └── routes/
│       ├── auth.ts          # Routes d'authentification
│       ├── oauth.ts         # Routes OAuth
│       ├── modules.ts       # Routes des modules
│       ├── lessons.ts       # Routes des leçons
│       ├── exercises.ts     # Routes des exercices
│       ├── progress.ts      # Routes de progression
│       ├── rewards.ts       # Routes des récompenses
│       ├── leaderboard.ts   # Routes du classement
│       └── cursus.ts        # Routes des parcours
│
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── exercises/       # Composants d'exercices
│   │   │   ├── ExerciseRenderer.tsx
│   │   │   ├── FillBlankExercise.tsx
│   │   │   ├── MatchingExercise.tsx
│   │   │   ├── OrderingExercise.tsx
│   │   │   ├── DragDropExercise.tsx
│   │   │   ├── WiringExercise.tsx
│   │   │   ├── CodeInputExercise.tsx
│   │   │   ├── TimingExercise.tsx
│   │   │   ├── LadderBuilderExercise.tsx
│   │   │   └── PLCSimulatorExercise.tsx
│   │   ├── LadderDiagram.tsx
│   │   ├── PLCIOPanel.tsx
│   │   ├── GCodeCanvas.tsx
│   │   └── GCodeCanvas3D.tsx
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Modules.tsx
│   │   ├── ModuleDetail.tsx
│   │   ├── Lesson.tsx
│   │   ├── Exercise.tsx
│   │   ├── CursusSelect.tsx
│   │   ├── CursusDetail.tsx
│   │   ├── PLCSimulator.tsx
│   │   ├── GCodeSimulator.tsx
│   │   └── GRAFCETEditor.tsx
│   │
│   ├── lib/
│   │   ├── api.ts           # Client API
│   │   ├── plc-simulator.ts # Moteur de simulation PLC
│   │   └── gcode-parser.ts  # Parseur G-Code
│   │
│   ├── types/
│   │   └── exercises.ts     # Types pour les exercices
│   │
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── fr.json
│   │       ├── en.json
│   │       └── es.json
│   │
│   ├── store/
│   │   └── authStore.ts     # Store Zustand
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── docs/                    # Documentation
│   ├── PEDAGOGY.md
│   ├── ARCHITECTURE.md
│   └── INSTALLATION.md
│
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Architecture des modules

### Structure d'un module

Chaque module dans `prisma/modules/` suit une structure standardisée :

```typescript
// prisma/modules/module-XX-name/index.ts
import type { ModuleData } from '../types.js'

export const moduleXXData: ModuleData = {
  // Métadonnées du module
  moduleOrder: 1,
  moduleTitle: "Titre du module (FR)",
  moduleDescription: "Description (FR)",
  moduleIcon: "icon-name",
  moduleColor: "#3B82F6",

  // Traductions du module
  moduleTranslations: {
    en: { title: "Module Title", description: "Description" },
    es: { title: "Título del módulo", description: "Descripción" }
  },

  // Leçons (en français par défaut)
  lessons: [
    {
      title: "Titre de la leçon",
      description: "Description",
      content: JSON.stringify([
        { type: "text", content: "..." },
        { type: "diagram", content: "..." },
        { type: "note", content: "..." }
      ]),
      order: 1,
      duration: 15,
      xpReward: 60
    }
  ],

  // Traductions des leçons
  lessonTranslations: {
    en: {
      "Titre de la leçon": {
        title: "Lesson Title",
        description: "Description",
        content: JSON.stringify([...])
      }
    },
    es: { ... }
  },

  // Quiz par leçon
  quizzes: [
    [
      {
        question: "Question ?",
        options: ["A", "B", "C", "D"],
        correctAnswer: 0,
        explanation: "Explication"
      }
    ]
  ],

  // Traductions des quiz
  quizTranslations: {
    en: { ... },
    es: { ... }
  }
}
```

### Structure des exercices

```typescript
// prisma/modules/module-XX-name/exercises.ts
import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const moduleXXExercises: ExerciseData[] = [
  {
    title: "Titre de l'exercice",
    description: "Description",
    type: "fill_blank",  // Type d'exercice
    difficulty: "beginner",  // beginner | intermediate | advanced

    instructions: JSON.stringify({
      steps: ["Étape 1", "Étape 2"],
      objective: "Objectif de l'exercice"
    }),

    // Configuration spécifique au type
    config: JSON.stringify({
      text: "Texte avec {{blank1}} et {{blank2}}",
      blanks: [
        { id: "blank1", placeholder: "valeur" },
        { id: "blank2", placeholder: "valeur" }
      ]
    }),

    // Solution
    solution: JSON.stringify({
      answers: {
        blank1: "réponse1|alternative1",
        blank2: "réponse2"
      }
    }),

    hints: JSON.stringify(["Indice 1", "Indice 2"]),
    xpReward: 100,
    order: 1
  }
]

export const moduleXXExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Titre de l'exercice": {
      title: "Exercise Title",
      description: "Description",
      instructions: JSON.stringify({ ... }),
      hints: JSON.stringify([ ... ])
    }
  },
  es: { ... }
}
```

---

## Base de données

### Schéma Prisma

```prisma
// Utilisateurs
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String?
  name          String
  avatar        String?
  provider      String   @default("local")
  providerId    String?
  totalXp       Int      @default(0)
  level         Int      @default(1)
  streak        Int      @default(0)
  lastLoginDate DateTime?
  createdAt     DateTime @default(now())

  progress      LessonProgress[]
  exerciseProgress ExerciseProgress[]
  rewards       UserReward[]
}

// Modules
model Module {
  id          String   @id @default(cuid())
  title       String
  description String
  icon        String?
  color       String?
  order       Int
  isLocked    Boolean  @default(false)
  requiredXp  Int      @default(0)

  lessons     Lesson[]
  exercises   Exercise[]
  translations ModuleTranslation[]
  cursusMembership CursusModule[]
}

// Leçons
model Lesson {
  id          String   @id @default(cuid())
  title       String
  description String
  content     String   // JSON
  duration    Int
  xpReward    Int
  order       Int
  moduleId    String

  module      Module   @relation(fields: [moduleId], references: [id])
  quizzes     Quiz[]
  progress    LessonProgress[]
  translations LessonTranslation[]
}

// Exercices
model Exercise {
  id           String   @id @default(cuid())
  title        String
  description  String
  type         String   // fill_blank, matching, ordering, etc.
  difficulty   String   // beginner, intermediate, advanced
  instructions String   // JSON
  config       String?  // JSON - configuration spécifique au type
  solution     String?  // JSON
  initialCode  String?
  hints        String?  // JSON
  xpReward     Int
  order        Int
  moduleId     String

  module       Module   @relation(fields: [moduleId], references: [id])
  progress     ExerciseProgress[]
  translations ExerciseTranslation[]
}

// Quiz
model Quiz {
  id            String   @id @default(cuid())
  question      String
  options       String   // JSON array
  correctAnswer Int
  explanation   String?
  order         Int
  lessonId      String

  lesson        Lesson   @relation(fields: [lessonId], references: [id])
  translations  QuizTranslation[]
}

// Parcours d'apprentissage
model Cursus {
  id          String   @id @default(cuid())
  name        String
  description String
  icon        String?
  color       String?
  order       Int

  modules     CursusModule[]
  translations CursusTranslation[]
}

// Progression utilisateur
model LessonProgress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  completed   Boolean  @default(false)
  bestScore   Int?
  attempts    Int      @default(0)
  completedAt DateTime?

  user        User     @relation(fields: [userId], references: [id])
  lesson      Lesson   @relation(fields: [lessonId], references: [id])

  @@unique([userId, lessonId])
}

model ExerciseProgress {
  id          String   @id @default(cuid())
  userId      String
  exerciseId  String
  completed   Boolean  @default(false)
  bestScore   Int?
  attempts    Int      @default(0)
  userCode    String?  // JSON - dernière réponse
  completedAt DateTime?

  user        User     @relation(fields: [userId], references: [id])
  exercise    Exercise @relation(fields: [exerciseId], references: [id])

  @@unique([userId, exerciseId])
}
```

---

## API REST

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription email/mot de passe |
| POST | `/api/auth/login` | Connexion email/mot de passe |
| GET | `/api/auth/me` | Utilisateur courant |
| GET | `/api/auth/providers` | Liste des fournisseurs OAuth |
| GET | `/api/auth/google` | Connexion Google OAuth |
| GET | `/api/auth/facebook` | Connexion Facebook OAuth |
| GET | `/api/auth/microsoft` | Connexion Microsoft OAuth |
| GET | `/api/auth/google/callback` | Callback Google |
| GET | `/api/auth/facebook/callback` | Callback Facebook |
| GET | `/api/auth/microsoft/callback` | Callback Microsoft |

### Modules & Leçons

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/modules` | Liste des modules |
| GET | `/api/modules/:id` | Détail d'un module |
| GET | `/api/lessons/:id` | Contenu d'une leçon |
| POST | `/api/lessons/:id/submit` | Soumettre un quiz |

### Exercices

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/exercises/:id` | Contenu d'un exercice |
| POST | `/api/exercises/:id/submit` | Soumettre une réponse |
| GET | `/api/exercises/:id/hint/:index` | Obtenir un indice |

### Parcours

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/cursus` | Liste des parcours |
| GET | `/api/cursus/:id` | Détail d'un parcours |

### Progression & Récompenses

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/progress` | Progression utilisateur |
| GET | `/api/rewards` | Liste des récompenses |
| GET | `/api/leaderboard` | Classement |

---

## Authentification

### JWT

L'authentification utilise des tokens JWT avec :
- Durée de validité : 7 jours
- Stockage : localStorage côté client
- Header : `Authorization: Bearer <token>`

### OAuth

Trois fournisseurs OAuth sont supportés :
- **Google** : `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- **Facebook** : `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
- **Microsoft** : `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`

Variables d'environnement requises :
```env
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
```

---

## Système d'exercices

### Types d'exercices

| Type | Description | Configuration |
|------|-------------|---------------|
| `fill_blank` | Remplir les blancs | `text`, `blanks[]` |
| `matching` | Associer des paires | `leftItems[]`, `rightItems[]` |
| `ordering` | Ordonner des étapes | `items[]` |
| `drag_drop` | Glisser-déposer | `items[]`, `zones[]` |
| `wiring` | Câblage électrique | `components[]`, `wireColors[]` |
| `code_input` | Saisie de code | `language`, `starterCode` |
| `timing` | Chronogrammes | `signals[]`, `duration` |
| `ladder_builder` | Construction LADDER | `availableElements[]`, `inputs[]`, `outputs[]` |
| `plc_simulator` | Simulation PLC | `program`, `objectives[]` |

### Validation des réponses

Chaque type d'exercice a sa logique de validation dans `server/routes/exercises.ts` :

```typescript
switch (exercise.type) {
  case 'fill_blank':
    // Vérifie chaque réponse (supporte alternatives avec |)
    break
  case 'matching':
    // Vérifie les paires
    break
  case 'ordering':
    // Vérifie l'ordre
    break
  // ...
}
```

### Calcul du score

- Score = (réponses correctes / total) × 100
- XP gagné = xpReward × (score / 100)
- Seuil de réussite : 80% pour la plupart des types

---

## Internationalisation

### Langues supportées

- **Français (fr)** : Langue par défaut
- **English (en)** : Traduction complète
- **Español (es)** : Traduction complète

### Fichiers de traduction

```
src/i18n/locales/
├── fr.json
├── en.json
└── es.json
```

### Utilisation

```typescript
// Dans un composant React
import { useTranslation } from 'react-i18next'

function Component() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  )
}
```

### Paramètre de langue API

Les endpoints API acceptent un paramètre `lang` :
```
GET /api/modules?lang=en
GET /api/lessons/123?lang=es
GET /api/exercises/456?lang=fr
```

Le serveur retourne le contenu traduit si disponible, sinon le français par défaut.
