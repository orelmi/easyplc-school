# EasyPLC School

Open source learning platform for industrial automation and programmable logic controllers (PLC).

> **Open source project**: This project welcomes contributions! Whether you're a developer, automation instructor, or industry professional, your contributions are welcome to enrich the educational content and improve the platform.

**Languages:** English | [Français](README.fr.md) | [Español](README.es.md)

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Demo Account](#demo-account)
- [Contributing](#contributing)
- [License](#license)

## Screenshots

### Overview
![Application overview](public/overview.png)

### Learning Module
![Module example](public/module1.png)

### Learning Paths
![Learning paths](public/learning-path-en.png)

### Interactive G-Code Simulator
![G-Code Simulator](public/gcode-simulator.png)

### PLC / LADDER Simulator
![PLC Simulator](public/plc-simulator.png)

---

## Features

### Learning Paths

EasyPLC School offers four specialization paths:

| Path | Modules | Description |
|------|---------|-------------|
| 🏭 Industrial Automation | 5 | PLC basics, LADDER, GRAFCET |
| 🔧 CNC Machining | 6 | G-Code programming, axis systems |
| 🔷 Siemens Automation | 6 | S7-1500, TIA Portal, data blocks |
| ⚡ VFD & Positioning | 9 | Variable frequency drives, motion control |

### Interactive Simulators

- **PLC / LADDER Simulator**: Real-time LADDER visualization with I/O panel
- **GRAFCET Editor**: Visual creation and simulation of sequential diagrams
- **G-Code / CNC Simulator**: 2D/3D visualization of tool paths

### Gamification

- XP points and leveling system
- Badges and trophies
- Global leaderboard
- Daily streak tracking

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
git clone https://github.com/orelmi/easyplc-school.git
cd easyplc-school

# Install dependencies
npm install

# Configure the database
npx prisma generate
npx prisma db push

# Seed the database (optional)
npm run db:seed

# Start the application
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## Documentation

| Document | Description |
|----------|-------------|
| 📚 [Pedagogy](docs/PEDAGOGY.en.md) | Learning paths, modules, exercises, gamification |
| 🏗️ [Architecture](docs/ARCHITECTURE.en.md) | Tech stack, project structure, database, API |
| 🚀 [Installation](docs/INSTALLATION.en.md) | Complete setup, configuration, deployment |

---

## Demo Account

A demo account is automatically created during seeding:

| Field | Value |
|-------|-------|
| Email | `demo@easyplc.fr` |
| Password | `demo123` |

This account has:
- 255 XP and level 2
- 3 completed lessons
- 3 unlocked rewards
- A 3-day streak

---

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite, Tailwind CSS, React Router v6
- Zustand (state management)
- Three.js (3D visualization)

### Backend
- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- JWT authentication + bcrypt
- Passport (OAuth strategies)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend and backend in development mode |
| `npm run dev:client` | Start frontend only |
| `npm run dev:server` | Start backend only |
| `npm run build` | Production build |
| `npm run db:seed` | Seed DB with initial data |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |

---

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
- **Features**: Exam mode, offline mode
- **UI/UX improvements**: Accessibility, responsive design, animations
- **Documentation**: Tutorials, user guides, translations
- **Tests**: Unit tests, integration tests
- **Fixes**: Bugs, typos, optimizations

### Enriching Educational Content

Educational content is organized in modular files under `prisma/modules/`. See the [Pedagogy documentation](docs/PEDAGOGY.en.md) for details on the module structure and how to add content.

---

## License

MIT - See the [LICENSE](LICENSE) file for details.

---

Developed with passion for industrial automation training.
