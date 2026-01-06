# Educational Content

> Complete documentation of EasyPLC School educational content

**Languages:** [Français](PEDAGOGY.md) | English | [Español](PEDAGOGY.es.md)

## Table of Contents

- [Target Audience](#target-audience)
- [Learning Paths](#learning-paths)
- [Exercise Types](#exercise-types)
- [Core Modules](#core-modules)
- [Automation Modules](#automation-modules)
- [CNC Modules](#cnc-modules)
- [Siemens Modules](#siemens-modules)
- [VFD and Positioning Modules](#vfd-and-positioning-modules)
- [Interactive Simulators](#interactive-simulators)
- [Gamification System](#gamification-system)

---

## Target Audience

EasyPLC School is designed for:

- **Students** in electrical engineering, industrial maintenance, or automation
- **Technicians** looking to transition into automation
- **Professionals** seeking to consolidate their foundations
- **Trainers** looking for a comprehensive educational platform

---

## Learning Paths

EasyPLC School offers four specialization paths with a common foundation of core modules:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              LEARNING PATHS                                                          │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                                      │
│  🏭 INDUSTRIAL AUTOMATION     🔧 CNC MACHINING          🔷 SIEMENS AUTOMATION     ⚡ VFD AND POSITIONING             │
│  ━━━━━━━━━━━━━━━━━━━━━━━     ━━━━━━━━━━━━━━            ━━━━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━━━━━             │
│                                                                                                                      │
│  ├── Introduction *           ├── Introduction *        ├── Introduction *        ├── Introduction *                │
│  ├── Combinational logic *    ├── Combinational logic * ├── Combinational logic * ├── Combinational logic *         │
│  ├── Sensors/actuators *      ├── Sensors/actuators *   ├── LADDER language       ├── Sensors/actuators *           │
│  ├── LADDER language          ├── CNC Introduction      ├── S7-1500 Introduction  ├── VFD Introduction              │
│  └── GRAFCET                  ├── G-Code Programming    ├── TIA Portal            ├── VFD Configuration             │
│                               └── Axes & interpolation  └── S7 Data Blocks        ├── VFD Communication             │
│                                                                                   ├── Positioning Intro             │
│                                                                                   ├── Stepper/Servo motors          │
│                                                                                   └── Motion Programming            │
│                                                                                                                      │
│  * Core modules shared across paths                                                                                 │
│                                                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Industrial Automation Path 🏭

This path covers the basics of industrial automation with programmable logic controllers (PLC):
- 5 progressive modules (35 lessons)
- Focus on LADDER and GRAFCET
- Validation quizzes for each lesson

### CNC Machining Path 🔧

This path specializes in CNC machine programming:
- 6 modules (3 core + 3 specialized)
- G-Code learning
- Mastering axis systems

### Siemens Automation Path 🔷

This path is dedicated to Siemens S7-1500 PLCs and the TIA Portal environment:
- 6 modules (3 core + 3 Siemens specialized)
- LAD, FBD, SCL programming
- Mastering data blocks (DB)

### VFD and Positioning Path ⚡

This path specializes in variable frequency drives and motion control:
- 9 modules (3 core + 6 specialized)
- 36 lessons with 180 quizzes
- Variable Frequency Drives (VFD): principles, configuration, communication
- Positioning: stepper motors, servomotors, PLCopen programming

---

## Exercise Types

EasyPLC School offers **10 interactive exercise types** to reinforce learning:

| Type | Description | Usage |
|------|-------------|-------|
| `fill_blank` | Fill in blanks in technical text | Parameters, calculations, formulas |
| `matching` | Match elements in pairs | Symbols/functions, terms/definitions |
| `ordering` | Put steps in correct order | Procedures, operation sequences |
| `drag_drop` | Drag and drop into zones | Classification, complete diagrams |
| `wiring` | Create electrical wiring | Sensor connections, VFD, motors |
| `code_input` | Enter code (G-Code, SCL) | CNC programming, PLCs |
| `timing` | Create timing diagrams | Temporal sequences, signals |
| `ladder_builder` | Build LADDER programs | Logic circuits, automation |
| `plc_simulator` | Simulate complete PLC program | Program validation |

---

## Core Modules

These modules form the common foundation of the learning paths.

### Module 1: Introduction to Automation 🔌

> **Objective**: Understand what a programmable logic controller is and its role in industry

#### PLC Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PROGRAMMABLE CONTROLLER                    │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  │ INPUTS  │───▶│     CPU     │───▶│    OUTPUTS      │ │  │
│  │  │  (I)    │    │  (Program)  │    │      (Q)        │ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  └─────────┘    └─────────────┘    └─────────────────┘ │  │
│  │       ▲               │                    │           │  │
│  │       │          ┌────┴────┐               ▼           │  │
│  │       │          │ MEMORY  │         ┌─────────┐       │  │
│  │       │          └─────────┘         │ POWER   │       │  │
│  │       │                              └─────────┘       │  │
│  └───────┼──────────────────────────────────────────────┘  │
│          │                                      │           │
└──────────┼──────────────────────────────────────┼───────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  SENSORS    │                      │  ACTUATORS    │
    │ - Buttons   │                      │ - Motors      │
    │ - Detectors │                      │ - Valves      │
    │ - Probes    │                      │ - Indicators  │
    └─────────────┘                      └───────────────┘
```

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | What is a programmable controller? | 10 min | 50 |
| 2 | Inputs and outputs (I/O) | 12 min | 60 |
| 3 | The PLC cycle | 15 min | 70 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Introduction to PLCs | `fill_blank` | Beginner |
| PLC Components | `matching` | Beginner |
| PLC Cycle | `ordering` | Intermediate |

---

### Module 2: Combinational Logic 🔀

> **Objective**: Master fundamental AND, OR, NOT logic gates

#### Truth Tables

| A | B | A AND B | A OR B |
|:-:|:-:|:-------:|:------:|
| 0 | 0 | **0**   | **0**  |
| 0 | 1 | **0**   | **1**  |
| 1 | 0 | **0**   | **1**  |
| 1 | 1 | **1**   | **1**  |

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | The AND gate | 12 min | 60 |
| 2 | The OR gate | 12 min | 60 |
| 3 | The NOT gate | 10 min | 50 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Truth tables | `fill_blank` | Beginner |
| Logic symbols | `matching` | Beginner |

---

### Module 3: LADDER Language 🪜

> **Objective**: Read and write LADDER programs

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Introduction to LADDER language | 15 min | 70 |
| 2 | Contacts and coils | 18 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Start/Stop circuit | `ladder_builder` | Beginner |
| LADDER symbols | `matching` | Beginner |
| Logic equations | `fill_blank` | Intermediate |
| Startup sequence | `ordering` | Intermediate |

---

### Module 4: Sensors and Actuators 📡

> **Objective**: Connect a PLC to the physical world

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Discrete sensors | 15 min | 70 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Sensor types | `matching` | Beginner |
| 3-wire sensor wiring | `wiring` | Intermediate |
| Sensor characteristics | `fill_blank` | Intermediate |

---

## Automation Modules

### Module 5: GRAFCET 📊

> **Objective**: Model and program sequential systems

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Introduction to GRAFCET | 20 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| GRAFCET elements | `matching` | Beginner |
| GRAFCET equations | `fill_blank` | Intermediate |
| Actions and receptivities | `drag_drop` | Intermediate |
| GRAFCET sequence | `ordering` | Advanced |

---

## CNC Modules

### Module 6: CNC Introduction 🔧

> **Objective**: Discover CNC machines

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | What is a CNC machine? | 12 min | 60 |
| 2 | Types of CNC machines | 15 min | 70 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| CNC components | `matching` | Beginner |
| Machine types | `drag_drop` | Beginner |
| CNC characteristics | `fill_blank` | Intermediate |

---

### Module 7: G-Code Programming 📝

> **Objective**: Master CNC machine programming language

#### Essential G-Codes

| Code | Function | Example |
|------|----------|---------|
| G00 | Rapid positioning | `G00 X50 Y30` |
| G01 | Linear interpolation | `G01 X100 F200` |
| G02 | Clockwise arc | `G02 X50 Y50 R25` |
| G03 | Counter-clockwise arc | `G03 X50 Y50 R25` |
| G90 | Absolute mode | Coordinates from origin |
| G91 | Relative mode | Coordinates from current position |

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | G-Code program structure | 15 min | 70 |
| 2 | Essential G and M codes | 18 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Square program | `code_input` | Beginner |
| G and M codes | `matching` | Beginner |
| Coordinates | `fill_blank` | Intermediate |

---

### Module 8: Axes and Interpolation 📐

> **Objective**: Understand coordinate systems and movements

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Coordinate system | 12 min | 60 |
| 2 | Linear and circular interpolation | 18 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Arc program | `code_input` | Intermediate |
| Interpolation types | `matching` | Beginner |
| Coordinate calculation | `fill_blank` | Advanced |

---

## Siemens Modules

### Module 9: Siemens S7-1500 Introduction 🔷

> **Objective**: Discover the Siemens S7-1500 PLC and TIA Portal

#### S7-1500 CPU Range

| CPU | Memory | Performance |
|-----|--------|-------------|
| 1511 | 150 KB | Entry level |
| 1513 | 300 KB | Standard |
| 1515 | 500 KB | Advanced |
| 1517 | 2 MB | High performance |
| 1518 | 4 MB | Maximum |

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | S7-1500 overview | 15 min | 70 |
| 2 | TIA Portal environment | 18 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| S7-1500 range | `matching` | Beginner |
| I/O addressing | `fill_blank` | Intermediate |
| Module types | `drag_drop` | Intermediate |

---

### Module 10: TIA Portal Programming 💻

> **Objective**: Create projects and program with TIA Portal

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Create a TIA Portal project | 15 min | 70 |
| 2 | S7 programming languages | 18 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Project creation | `ordering` | Beginner |
| Block types | `matching` | Beginner |
| TIA LADDER program | `ladder_builder` | Intermediate |

---

### Module 11: S7-1500 Data Blocks 📦

> **Objective**: Master data blocks and structured programming

#### S7 Block Types

| Block | Description | Memory |
|-------|-------------|--------|
| OB | Program entry point | No |
| FB | Block with memory | Instance DB |
| FC | Block without memory | No |
| DB | Data storage | Yes |

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Data blocks (DB) | 15 min | 70 |
| 2 | Structured programming | 18 min | 80 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| DB types | `matching` | Beginner |
| Global DB creation | `fill_blank` | Intermediate |
| FB instance DB | `drag_drop` | Advanced |

---

## VFD and Positioning Modules

### Module 12: VFD Introduction ⚡

> **Objective**: Understand variable frequency drive principles

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | What is a variable frequency drive? | 12 min | 60 |
| 2 | Motor and drive types | 15 min | 70 |
| 3 | Wiring diagrams | 15 min | 70 |
| 4 | Protection and safety | 12 min | 60 |
| 5 | Energy savings | 12 min | 60 |
| 6 | Common brands and models | 10 min | 50 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Basic VFD configuration | `fill_blank` | Beginner |
| Reading motor nameplate | `matching` | Beginner |
| VFD wiring diagram | `wiring` | Intermediate |

---

### Module 13: VFD Configuration 🔧

> **Objective**: Master VFD parameter settings

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Motor parameters | 15 min | 70 |
| 2 | Ramps and limits | 15 min | 70 |
| 3 | Control modes | 18 min | 80 |
| 4 | Integrated PID control | 18 min | 80 |
| 5 | Fault management | 15 min | 70 |
| 6 | Backup and restore | 12 min | 60 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Motor parameters | `fill_blank` | Intermediate |
| Ramp configuration | `matching` | Beginner |
| VFD control modes | `drag_drop` | Intermediate |

---

### Module 14: VFD Communication 🌐

> **Objective**: Integrate drives into an automated system

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Communication protocols | 15 min | 70 |
| 2 | Modbus communication | 18 min | 80 |
| 3 | PLC integration | 18 min | 80 |
| 4 | Diagnostics and monitoring | 15 min | 70 |
| 5 | Troubleshooting | 15 min | 70 |
| 6 | Preventive maintenance | 12 min | 60 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Modbus RTU configuration | `fill_blank` | Intermediate |
| Modbus registers | `matching` | Advanced |
| Modbus RTU frame | `drag_drop` | Advanced |

---

### Module 15: Positioning Introduction 📐

> **Objective**: Discover motion control fundamentals

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Motion control principles | 15 min | 70 |
| 2 | Mechanical concepts | 15 min | 70 |
| 3 | Encoders and position sensors | 18 min | 80 |
| 4 | Control loops | 18 min | 80 |
| 5 | Homing | 15 min | 70 |
| 6 | Limits and safety | 15 min | 70 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Encoder resolution calculation | `fill_blank` | Intermediate |
| Trapezoidal profile | `fill_blank` | Advanced |
| Control loop types | `matching` | Intermediate |

---

### Module 16: Stepper and Servo Motors ⚙️

> **Objective**: Select and size a drive system

#### Technology Comparison

| Characteristic | Stepper Motor | Servomotor |
|----------------|---------------|------------|
| Control loop | Open | Closed |
| Low-speed torque | High | Constant |
| Dynamics | Medium | High |
| Cost | Economical | Higher |
| Typical application | Simple positioning | High performance |

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Stepper motors | 18 min | 80 |
| 2 | Synchronous servomotors | 18 min | 80 |
| 3 | Comparison and selection | 15 min | 70 |
| 4 | Motor sizing | 20 min | 90 |
| 5 | Drivers and servo drives | 18 min | 80 |
| 6 | Linear motors | 15 min | 70 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Motor type selection | `matching` | Beginner |
| Motor sizing | `fill_blank` | Advanced |
| Motor characteristics | `drag_drop` | Intermediate |

---

### Module 17: Motion Programming 🎯

> **Objective**: Program motion with PLCopen blocks

#### PLCopen Motion Function Blocks

| Block | Function |
|-------|----------|
| MC_Power | Enable/disable axis |
| MC_Home | Homing |
| MC_MoveAbsolute | Move to absolute position |
| MC_MoveRelative | Move by relative distance |
| MC_MoveVelocity | Constant velocity motion |
| MC_Stop | Stop motion |
| MC_GearIn | Electronic gearing |

#### Module Content

| # | Lesson | Duration | XP |
|---|--------|----------|-----|
| 1 | Motion profiles | 18 min | 80 |
| 2 | Absolute and relative moves | 15 min | 70 |
| 3 | Axis synchronization | 20 min | 90 |
| 4 | Multi-axis interpolation | 20 min | 90 |
| 5 | PLCopen function blocks | 18 min | 80 |
| 6 | Diagnostics and optimization | 15 min | 70 |

#### Exercises

| Exercise | Type | Difficulty |
|----------|------|------------|
| Axis synchronization | `fill_blank` | Advanced |
| Electronic cam | `ordering` | Advanced |
| Cam profile | `fill_blank` | Advanced |
| PLCopen motion blocks | `matching` | Intermediate |

---

## Interactive Simulators

### PLC / LADDER Simulator ⚡

A complete PLC simulator with real-time LADDER visualization.

**Features:**
- Sample programs: Start/Stop, Traffic Light, Sequencer
- Momentary/toggle mode for each input
- Real-time power flow visualization
- Timers with progress bar
- Different output types: lamps, motors, valves

### GRAFCET Editor 📐

A visual editor for creating and simulating GRAFCET diagrams.

**Features:**
- Create steps and transitions by drag-and-drop
- Link elements (step → transition → step)
- Real-time simulation with active step visualization
- Edit transition conditions
- Pre-loaded examples

### G-Code / CNC Simulator 🔧

A CNC programming simulator with 2D and 3D visualization.

**Features:**
- Code editor with syntax highlighting
- 2D (top, front, side) and 3D isometric visualization
- Tool path animation
- Statistics: total distance, estimated time
- Animation speed control

---

## Gamification System

### XP Points

| Action | XP Earned |
|--------|-----------|
| Complete a lesson | 50-80 XP (based on score) |
| Complete an exercise | 75-250 XP (based on difficulty) |
| Badge unlocked | 25-100 XP bonus |
| Trophy earned | 150-200 XP bonus |

### Levels

Level is calculated using: Total XP = 50 × level × (level + 1)

| Level | XP Required |
|-------|-------------|
| 1 | 0 |
| 2 | 100 |
| 3 | 300 |
| 4 | 600 |
| 5 | 1000 |
| 10 | 5500 |

### Rewards

- **Badges**: Unlocked by completing modules
- **Trophies**: Unlocked for special achievements
- **Daily streak**: Bonus for consecutive logins
