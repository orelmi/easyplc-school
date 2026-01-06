# Arquitectura Técnica

> Documentación completa de la arquitectura técnica de EasyPLC School

**Idiomas:** [Français](ARCHITECTURE.md) | [English](ARCHITECTURE.en.md) | Español

## Tabla de Contenidos

- [Stack técnico](#stack-técnico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura de módulos](#arquitectura-de-módulos)
- [Base de datos](#base-de-datos)
- [API REST](#api-rest)
- [Autenticación](#autenticación)
- [Sistema de ejercicios](#sistema-de-ejercicios)
- [Internacionalización](#internacionalización)

---

## Stack técnico

### Frontend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18+ | Biblioteca UI |
| TypeScript | 5+ | Tipado estático |
| Vite | 5+ | Herramienta de build y servidor de desarrollo |
| Tailwind CSS | 3+ | Framework CSS utility-first |
| React Router | 6+ | Enrutamiento SPA |
| Zustand | 4+ | Gestión de estado ligera |
| Three.js | - | Visualización 3D (simulador G-Code) |
| i18next | - | Internacionalización |

### Backend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | 18+ | Runtime JavaScript |
| Express | 4+ | Framework web |
| TypeScript | 5+ | Tipado estático |
| Prisma | 5+ | ORM y migraciones |
| SQLite | - | Base de datos (dev/prod) |
| JWT | - | Autenticación por tokens |
| bcrypt | - | Hash de contraseñas |
| Passport | - | Estrategias OAuth |

---

## Estructura del proyecto

```
easyplc-school/
├── prisma/
│   ├── schema.prisma        # Esquema de la base de datos
│   ├── seed.ts              # Script principal de poblado
│   └── modules/             # Contenido educativo modular
│       ├── index.ts         # Re-exporta todos los módulos
│       ├── types.ts         # Tipos TypeScript compartidos
│       ├── module-01-automation/
│       │   ├── index.ts     # Datos del módulo (lecciones, quiz)
│       │   └── exercises.ts # Ejercicios interactivos
│       └── ... (17 módulos)
│
├── server/
│   ├── index.ts             # Punto de entrada del servidor
│   ├── config/
│   │   └── passport.ts      # Configuración OAuth
│   ├── middleware/
│   │   └── auth.ts          # Middleware JWT
│   └── routes/
│       ├── auth.ts          # Rutas de autenticación
│       ├── oauth.ts         # Rutas OAuth
│       ├── modules.ts       # Rutas de módulos
│       ├── lessons.ts       # Rutas de lecciones
│       ├── exercises.ts     # Rutas de ejercicios
│       ├── progress.ts      # Rutas de progreso
│       ├── rewards.ts       # Rutas de recompensas
│       ├── leaderboard.ts   # Rutas de clasificación
│       └── cursus.ts        # Rutas de rutas de aprendizaje
│
├── src/
│   ├── components/
│   │   ├── exercises/       # Componentes de ejercicios
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
│   │   ├── api.ts           # Cliente API
│   │   ├── plc-simulator.ts # Motor de simulación PLC
│   │   └── gcode-parser.ts  # Parser G-Code
│   │
│   ├── types/
│   │   └── exercises.ts     # Tipos para ejercicios
│   │
│   ├── i18n/
│   │   └── locales/
│   │       ├── fr.json
│   │       ├── en.json
│   │       └── es.json
│   │
│   └── store/
│       └── authStore.ts     # Store Zustand
│
├── docs/                    # Documentación
└── package.json
```

---

## Arquitectura de módulos

### Estructura de un módulo

Cada módulo en `prisma/modules/` sigue una estructura estandarizada:

```typescript
// prisma/modules/module-XX-name/index.ts
import type { ModuleData } from '../types.js'

export const moduleXXData: ModuleData = {
  // Metadatos del módulo
  moduleOrder: 1,
  moduleTitle: "Título del módulo (FR)",
  moduleDescription: "Descripción (FR)",
  moduleIcon: "icon-name",
  moduleColor: "#3B82F6",

  // Traducciones del módulo
  moduleTranslations: {
    en: { title: "Module Title", description: "Description" },
    es: { title: "Título del módulo", description: "Descripción" }
  },

  // Lecciones (en francés por defecto)
  lessons: [
    {
      title: "Título de la lección",
      description: "Descripción",
      content: JSON.stringify([
        { type: "text", content: "..." },
        { type: "diagram", content: "..." }
      ]),
      order: 1,
      duration: 15,
      xpReward: 60
    }
  ],

  // Traducciones de lecciones
  lessonTranslations: {
    en: { ... },
    es: { ... }
  },

  // Quiz por lección
  quizzes: [[...]],

  // Traducciones de quiz
  quizTranslations: { ... }
}
```

### Estructura de ejercicios

```typescript
// prisma/modules/module-XX-name/exercises.ts
import type { ExerciseData } from '../types.js'

export const moduleXXExercises: ExerciseData[] = [
  {
    title: "Título del ejercicio",
    description: "Descripción",
    type: "fill_blank",  // Tipo de ejercicio
    difficulty: "beginner",  // beginner | intermediate | advanced

    instructions: JSON.stringify({
      steps: ["Paso 1", "Paso 2"],
      objective: "Objetivo del ejercicio"
    }),

    // Configuración específica del tipo
    config: JSON.stringify({
      text: "Texto con {{blank1}} y {{blank2}}",
      blanks: [
        { id: "blank1", placeholder: "valor" },
        { id: "blank2", placeholder: "valor" }
      ]
    }),

    // Solución
    solution: JSON.stringify({
      answers: {
        blank1: "respuesta1|alternativa1",
        blank2: "respuesta2"
      }
    }),

    hints: JSON.stringify(["Pista 1", "Pista 2"]),
    xpReward: 100,
    order: 1
  }
]
```

---

## Base de datos

### Esquema Prisma

```prisma
// Usuarios
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

// Módulos
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

// Ejercicios
model Exercise {
  id           String   @id @default(cuid())
  title        String
  description  String
  type         String   // fill_blank, matching, ordering, etc.
  difficulty   String   // beginner, intermediate, advanced
  instructions String   // JSON
  config       String?  // JSON - configuración específica del tipo
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

## API REST

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registro email/contraseña |
| POST | `/api/auth/login` | Login email/contraseña |
| GET | `/api/auth/me` | Usuario actual |
| GET | `/api/auth/providers` | Lista proveedores OAuth |
| GET | `/api/auth/google` | Login con Google OAuth |
| GET | `/api/auth/facebook` | Login con Facebook OAuth |
| GET | `/api/auth/microsoft` | Login con Microsoft OAuth |

### Módulos y lecciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/modules` | Lista de módulos |
| GET | `/api/modules/:id` | Detalle de un módulo |
| GET | `/api/lessons/:id` | Contenido de una lección |
| POST | `/api/lessons/:id/submit` | Enviar quiz |

### Ejercicios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/exercises/:id` | Contenido del ejercicio |
| POST | `/api/exercises/:id/submit` | Enviar respuesta |
| GET | `/api/exercises/:id/hint/:index` | Obtener pista |

### Rutas de aprendizaje

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cursus` | Lista de rutas |
| GET | `/api/cursus/:id` | Detalle de una ruta |

### Progreso y recompensas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/progress` | Progreso del usuario |
| GET | `/api/rewards` | Lista de recompensas |
| GET | `/api/leaderboard` | Clasificación |

---

## Autenticación

### JWT

La autenticación usa tokens JWT con:
- Validez: 7 días
- Almacenamiento: localStorage en el cliente
- Header: `Authorization: Bearer <token>`

### OAuth

Se soportan tres proveedores OAuth:
- **Google**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- **Facebook**: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
- **Microsoft**: `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`

Variables de entorno requeridas:
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

## Sistema de ejercicios

### Tipos de ejercicios

| Tipo | Descripción | Configuración |
|------|-------------|---------------|
| `fill_blank` | Rellenar espacios | `text`, `blanks[]` |
| `matching` | Asociar pares | `leftItems[]`, `rightItems[]` |
| `ordering` | Ordenar pasos | `items[]` |
| `drag_drop` | Arrastrar y soltar | `items[]`, `zones[]` |
| `wiring` | Cableado eléctrico | `components[]`, `wireColors[]` |
| `code_input` | Entrada de código | `language`, `starterCode` |
| `timing` | Diagramas de tiempo | `signals[]`, `duration` |
| `ladder_builder` | Construcción LADDER | `availableElements[]`, `inputs[]`, `outputs[]` |
| `plc_simulator` | Simulación PLC | `program`, `objectives[]` |

### Validación de respuestas

Cada tipo de ejercicio tiene su lógica de validación en `server/routes/exercises.ts`:

```typescript
switch (exercise.type) {
  case 'fill_blank':
    // Verifica cada respuesta (soporta alternativas con |)
    break
  case 'matching':
    // Verifica los pares
    break
  case 'ordering':
    // Verifica el orden
    break
  // ...
}
```

### Cálculo de puntuación

- Puntuación = (respuestas correctas / total) × 100
- XP ganado = xpReward × (puntuación / 100)
- Umbral de aprobación: 80% para la mayoría de tipos

---

## Internacionalización

### Idiomas soportados

- **Francés (fr)**: Idioma por defecto
- **Inglés (en)**: Traducción completa
- **Español (es)**: Traducción completa

### Archivos de traducción

```
src/i18n/locales/
├── fr.json
├── en.json
└── es.json
```

### Uso

```typescript
// En un componente React
import { useTranslation } from 'react-i18next'

function Component() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('es')}>
        Español
      </button>
    </div>
  )
}
```

### Parámetro de idioma en API

Los endpoints API aceptan un parámetro `lang`:
```
GET /api/modules?lang=en
GET /api/lessons/123?lang=es
GET /api/exercises/456?lang=fr
```

El servidor devuelve el contenido traducido si está disponible, de lo contrario usa el francés por defecto.
