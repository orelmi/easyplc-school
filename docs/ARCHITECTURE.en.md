# Technical Architecture

> Complete documentation of EasyPLC School technical architecture

**Languages:** [Français](ARCHITECTURE.md) | English | [Español](ARCHITECTURE.es.md)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Module Architecture](#module-architecture)
- [Database](#database)
- [REST API](#rest-api)
- [Authentication](#authentication)
- [Exercise System](#exercise-system)
- [Internationalization](#internationalization)

---

## Tech Stack

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| React | 18+ | UI Library |
| TypeScript | 5+ | Static typing |
| Vite | 5+ | Build tool and dev server |
| Tailwind CSS | 3+ | Utility-first CSS framework |
| React Router | 6+ | SPA routing |
| Zustand | 4+ | Lightweight state management |
| Three.js | - | 3D visualization (G-Code simulator) |
| i18next | - | Internationalization |

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | 18+ | JavaScript runtime |
| Express | 4+ | Web framework |
| TypeScript | 5+ | Static typing |
| Prisma | 5+ | ORM and migrations |
| SQLite | - | Database (dev/prod) |
| JWT | - | Token authentication |
| bcrypt | - | Password hashing |
| Passport | - | OAuth strategies |

---

## Project Structure

```
easyplc-school/
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Main seeding script
│   └── modules/             # Modular educational content
│       ├── index.ts         # Re-exports all modules
│       ├── types.ts         # Shared TypeScript types
│       ├── module-01-automation/
│       │   ├── index.ts     # Module data (lessons, quizzes)
│       │   └── exercises.ts # Interactive exercises
│       └── ... (17 modules)
│
├── server/
│   ├── index.ts             # Server entry point
│   ├── config/
│   │   └── passport.ts      # OAuth configuration
│   ├── middleware/
│   │   └── auth.ts          # JWT middleware
│   └── routes/
│       ├── auth.ts          # Authentication routes
│       ├── oauth.ts         # OAuth routes
│       ├── modules.ts       # Module routes
│       ├── lessons.ts       # Lesson routes
│       ├── exercises.ts     # Exercise routes
│       ├── progress.ts      # Progress routes
│       ├── rewards.ts       # Rewards routes
│       ├── leaderboard.ts   # Leaderboard routes
│       └── cursus.ts        # Learning path routes
│
├── src/
│   ├── components/
│   │   ├── exercises/       # Exercise components
│   │   │   ├── ExerciseRenderer.tsx
│   │   │   ├── FillBlankExercise.tsx
│   │   │   ├── MatchingExercise.tsx
│   │   │   └── ...
│   │   ├── LadderDiagram.tsx
│   │   └── GCodeCanvas3D.tsx
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Exercise.tsx
│   │   ├── PLCSimulator.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── api.ts           # API client
│   │   ├── plc-simulator.ts # PLC simulation engine
│   │   └── gcode-parser.ts  # G-Code parser
│   │
│   ├── types/
│   │   └── exercises.ts     # Exercise types
│   │
│   ├── i18n/
│   │   └── locales/
│   │       ├── fr.json
│   │       ├── en.json
│   │       └── es.json
│   │
│   └── store/
│       └── authStore.ts     # Zustand store
│
├── docs/                    # Documentation
└── package.json
```

---

## Module Architecture

### Module Structure

Each module in `prisma/modules/` follows a standardized structure:

```typescript
// prisma/modules/module-XX-name/index.ts
import type { ModuleData } from '../types.js'

export const moduleXXData: ModuleData = {
  // Module metadata
  moduleOrder: 1,
  moduleTitle: "Module Title (FR)",
  moduleDescription: "Description (FR)",
  moduleIcon: "icon-name",
  moduleColor: "#3B82F6",

  // Module translations
  moduleTranslations: {
    en: { title: "Module Title", description: "Description" },
    es: { title: "Título del módulo", description: "Descripción" }
  },

  // Lessons (French by default)
  lessons: [
    {
      title: "Lesson Title",
      description: "Description",
      content: JSON.stringify([
        { type: "text", content: "..." },
        { type: "diagram", content: "..." }
      ]),
      order: 1,
      duration: 15,
      xpReward: 60
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: { ... },
    es: { ... }
  },

  // Quizzes per lesson
  quizzes: [[...]],

  // Quiz translations
  quizTranslations: { ... }
}
```

### Exercise Structure

```typescript
// prisma/modules/module-XX-name/exercises.ts
import type { ExerciseData } from '../types.js'

export const moduleXXExercises: ExerciseData[] = [
  {
    title: "Exercise Title",
    description: "Description",
    type: "fill_blank",  // Exercise type
    difficulty: "beginner",  // beginner | intermediate | advanced

    instructions: JSON.stringify({
      steps: ["Step 1", "Step 2"],
      objective: "Exercise objective"
    }),

    // Type-specific configuration
    config: JSON.stringify({
      text: "Text with {{blank1}} and {{blank2}}",
      blanks: [
        { id: "blank1", placeholder: "value" },
        { id: "blank2", placeholder: "value" }
      ]
    }),

    // Solution
    solution: JSON.stringify({
      answers: {
        blank1: "answer1|alternative1",
        blank2: "answer2"
      }
    }),

    hints: JSON.stringify(["Hint 1", "Hint 2"]),
    xpReward: 100,
    order: 1
  }
]
```

---

## Database

### Prisma Schema

```prisma
// Users
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
}

// Exercises
model Exercise {
  id           String   @id @default(cuid())
  title        String
  description  String
  type         String   // fill_blank, matching, ordering, etc.
  difficulty   String   // beginner, intermediate, advanced
  instructions String   // JSON
  config       String?  // JSON - type-specific configuration
  solution     String?  // JSON
  hints        String?  // JSON
  xpReward     Int
  order        Int
  moduleId     String

  module       Module   @relation(fields: [moduleId], references: [id])
  progress     ExerciseProgress[]
  translations ExerciseTranslation[]
}
```

---

## REST API

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Email/password registration |
| POST | `/api/auth/login` | Email/password login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/auth/providers` | List OAuth providers |
| GET | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/facebook` | Facebook OAuth login |
| GET | `/api/auth/microsoft` | Microsoft OAuth login |

### Modules & Lessons

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules` | List modules |
| GET | `/api/modules/:id` | Module details |
| GET | `/api/lessons/:id` | Lesson content |
| POST | `/api/lessons/:id/submit` | Submit quiz |

### Exercises

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exercises/:id` | Exercise content |
| POST | `/api/exercises/:id/submit` | Submit answer |
| GET | `/api/exercises/:id/hint/:index` | Get hint |

### Learning Paths

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cursus` | List paths |
| GET | `/api/cursus/:id` | Path details |

### Progress & Rewards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress` | User progress |
| GET | `/api/rewards` | Rewards list |
| GET | `/api/leaderboard` | Leaderboard |

---

## Authentication

### JWT

Authentication uses JWT tokens with:
- Validity: 7 days
- Storage: localStorage on client
- Header: `Authorization: Bearer <token>`

### OAuth

Three OAuth providers are supported:
- **Google**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- **Facebook**: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
- **Microsoft**: `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`

Required environment variables:
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

## Exercise System

### Exercise Types

| Type | Description | Configuration |
|------|-------------|---------------|
| `fill_blank` | Fill in blanks | `text`, `blanks[]` |
| `matching` | Match pairs | `leftItems[]`, `rightItems[]` |
| `ordering` | Order steps | `items[]` |
| `drag_drop` | Drag and drop | `items[]`, `zones[]` |
| `wiring` | Electrical wiring | `components[]`, `wireColors[]` |
| `code_input` | Code input | `language`, `starterCode` |
| `timing` | Timing diagrams | `signals[]`, `duration` |
| `ladder_builder` | LADDER building | `availableElements[]`, `inputs[]`, `outputs[]` |
| `plc_simulator` | PLC simulation | `program`, `objectives[]` |

### Answer Validation

Each exercise type has its validation logic in `server/routes/exercises.ts`:

```typescript
switch (exercise.type) {
  case 'fill_blank':
    // Check each answer (supports alternatives with |)
    break
  case 'matching':
    // Check pairs
    break
  case 'ordering':
    // Check order
    break
  // ...
}
```

### Score Calculation

- Score = (correct answers / total) × 100
- XP earned = xpReward × (score / 100)
- Pass threshold: 80% for most types

---

## Internationalization

### Supported Languages

- **French (fr)**: Default language
- **English (en)**: Complete translation
- **Spanish (es)**: Complete translation

### Translation Files

```
src/i18n/locales/
├── fr.json
├── en.json
└── es.json
```

### Usage

```typescript
// In a React component
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

### API Language Parameter

API endpoints accept a `lang` parameter:
```
GET /api/modules?lang=en
GET /api/lessons/123?lang=es
GET /api/exercises/456?lang=fr
```

The server returns translated content if available, otherwise defaults to French.
