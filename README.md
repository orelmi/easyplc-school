# EasyPLC School

Open source learning platform for industrial automation and programmable logic controllers (PLC).

> **Open source project**: This project welcomes contributions! Whether you're a developer, automation instructor, or industry professional, your contributions are welcome to enrich the educational content and improve the platform.

**Languages:** English | [Français](README.fr.md)

## Screenshots

### Overview
![Application overview](public/overview.png)

### Learning Module
![Module example](public/module1.png)

### Learning Paths
![Learning paths](public/learning-path.png)

### Interactive G-Code Simulator
![G-Code Simulator](public/gcode-simulator.png)

### PLC / LADDER Simulator
![PLC Simulator](public/plc-simulator.png)

---

## Learning Paths

EasyPLC School offers three specialization paths with a common foundation of core modules:

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    LEARNING PATHS                                               │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                │
│   🏭 INDUSTRIAL AUTOMATION       🔧 CNC MACHINING                🔷 SIEMENS AUTOMATION        │
│   ━━━━━━━━━━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━━━                 ━━━━━━━━━━━━━━━━━━━━━        │
│                                                                                                │
│   ├── Introduction *             ├── Introduction *             ├── Introduction *            │
│   ├── Combinational logic *      ├── Combinational logic *      ├── Combinational logic *     │
│   ├── Sensors/actuators *        ├── Sensors/actuators *        ├── LADDER language           │
│   ├── LADDER language            ├── CNC Introduction           ├── S7-1500 Introduction      │
│   └── GRAFCET                    ├── G-Code Programming         ├── TIA Portal Programming    │
│                                  └── Axes and interpolation     └── S7 Data Blocks            │
│                                                                                                │
│   * Core modules shared across paths                                                          │
│                                                                                                │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Industrial Automation Path 🏭

This path covers the basics of industrial automation with programmable logic controllers (PLC):
- 5 progressive modules
- 10 lessons total
- Focus on LADDER and GRAFCET

### CNC Machining Path 🔧

This path specializes in CNC machine programming:
- 6 modules (3 core + 3 specialized)
- G-Code learning
- Mastering axis systems

### Siemens Automation Path 🔷

This path is dedicated to Siemens S7-1500 PLCs and the TIA Portal environment:
- 6 modules (3 core + 3 Siemens specialized)
- 6 specialized lessons with ASCII diagrams
- LAD, FBD, SCL programming
- Mastering data blocks (DB)

---

## Features

### User System
- Secure registration and login (JWT)
- Customizable user profile
- Individual progress tracking

### Gamification System
- **XP Points**: Earn points by completing lessons
- **Levels**: Progress and unlock new modules
- **Daily Streak**: Maintain your login streak
- **Rewards**: Badges and trophies to collect

### Leaderboard
- Global user ranking
- Period filters (week, month, all time)
- View your rank

### Interactive Simulators
- **PLC Simulator**: Real-time LADDER visualization with power flow animation
- **G-Code Simulator**: 2D and 3D visualization with Three.js

### XP Point System

| Action | XP Earned |
|--------|-----------|
| Complete a lesson | 50-80 XP (based on score) |
| Badge unlocked | 25-100 XP bonus |
| Trophy earned | 150-200 XP bonus |

Level is calculated using: Total XP = 50 × level × (level + 1)

---

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Clone the project**
```bash
git clone https://github.com/orelmi/easyplc-school.git
cd easyplc-school
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Seed the database** (optional)
```bash
npm run db:seed
```

5. **Start the application**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Demo Account

A demo account is automatically created during seeding:

| Field | Value |
|-------|-------|
| Email | `demo@easyplc.fr` |
| Password | `demo123` |

This account already has:
- 255 XP and level 2
- 3 completed lessons
- 3 unlocked rewards
- A 3-day streak

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router v6
- Zustand (state management)
- Three.js (3D visualization)

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- JWT (authentication)
- bcrypt (password hashing)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend and backend in development mode |
| `npm run dev:client` | Start frontend only |
| `npm run dev:server` | Start backend only |
| `npm run build` | Production build |
| `npm run db:push` | Apply Prisma schema to DB |
| `npm run db:seed` | Seed DB with initial data |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |

## Project Structure

```
easyplc-school/
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Seeding script + educational content
│   └── translations.ts  # Lesson and quiz translations (EN/ES)
├── server/
│   ├── index.ts         # Server entry point
│   ├── middleware/
│   │   └── auth.ts      # Authentication middleware
│   └── routes/
│       ├── auth.ts      # Authentication routes
│       ├── users.ts     # User routes
│       ├── modules.ts   # Module routes
│       ├── lessons.ts   # Lesson routes
│       ├── progress.ts  # Progress routes
│       ├── rewards.ts   # Rewards routes
│       ├── leaderboard.ts # Leaderboard routes
│       └── cursus.ts    # Learning path routes
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── LadderDiagram.tsx    # LADDER visualization
│   │   ├── PLCIOPanel.tsx       # PLC I/O panel
│   │   ├── GCodeCanvas.tsx      # 2D G-Code visualization
│   │   └── GCodeCanvas3D.tsx    # 3D G-Code visualization
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CursusSelect.tsx
│   │   ├── CursusDetail.tsx
│   │   ├── Modules.tsx
│   │   ├── ModuleDetail.tsx
│   │   ├── Lesson.tsx
│   │   ├── Rewards.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Profile.tsx
│   │   ├── PLCSimulator.tsx     # PLC simulator page
│   │   └── GCodeSimulator.tsx   # G-Code simulator page
│   ├── lib/
│   │   ├── api.ts               # API client
│   │   ├── plc-simulator.ts     # PLC simulation engine
│   │   └── gcode-parser.ts      # G-Code parser
│   ├── i18n/
│   │   ├── index.ts             # i18n configuration
│   │   └── locales/             # Translation files (fr, en, es)
│   ├── store/
│   │   └── authStore.ts         # Zustand store
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |

### Modules & Lessons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules` | List modules |
| GET | `/api/modules/:id` | Module details |
| GET | `/api/lessons/:id` | Lesson content |
| POST | `/api/lessons/:id/submit` | Submit quiz |

### Learning Paths (Cursus)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cursus` | List paths with progress |
| GET | `/api/cursus/:id` | Path details with modules |

### Progress & Rewards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress` | User progress |
| GET | `/api/rewards` | Rewards list |
| GET | `/api/leaderboard` | User rankings |

## Contributing

This project is open source and welcomes community contributions!

### How to Contribute

1. **Fork** the project
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a **Pull Request**

### Types of Contributions Sought

- **Educational content**: New modules, lessons, exercises
- **Features**: GRAFCET editor, offline mode
- **UI/UX improvements**: Accessibility, responsive design, animations
- **Documentation**: Tutorials, user guides, translations
- **Tests**: Unit tests, integration tests
- **Fixes**: Bugs, typos, optimizations

### Contribution Ideas

- [x] ~~Add interactive PLC simulator~~ ✅ PLC simulator with real-time LADDER visualization
- [ ] Create visual GRAFCET editor
- [x] ~~Add animations for LADDER diagrams~~ ✅ Animated power flow in PLC simulator
- [ ] Implement exam mode
- [x] ~~Add multi-language support (EN, ES, DE)~~ ✅ FR, EN, ES available
- [x] ~~Add learning paths~~ ✅ Automation and CNC
- [ ] Create practical programming exercises
- [x] ~~Add interactive G-Code simulator~~ ✅ 2D/3D visualization with Three.js

### Enriching Educational Content

Lesson content is defined in `prisma/seed.ts`. To add content:

1. Open the `prisma/seed.ts` file
2. Add your lessons following the existing structure
3. Run `npm run db:seed` to apply changes

## License

MIT - See the [LICENSE](LICENSE) file for details.

---

Developed with passion for industrial automation training.
