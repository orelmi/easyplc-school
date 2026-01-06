# Contenido Pedagógico

> Documentación completa del contenido educativo de EasyPLC School

**Idiomas:** [Français](PEDAGOGY.md) | [English](PEDAGOGY.en.md) | Español

## Tabla de Contenidos

- [Público objetivo](#público-objetivo)
- [Rutas de aprendizaje](#rutas-de-aprendizaje)
- [Tipos de ejercicios](#tipos-de-ejercicios)
- [Módulos fundamentales](#módulos-fundamentales)
- [Módulos de Automatización](#módulos-de-automatización)
- [Módulos CNC](#módulos-cnc)
- [Módulos Siemens](#módulos-siemens)
- [Módulos VFD y Posicionamiento](#módulos-vfd-y-posicionamiento)
- [Simuladores interactivos](#simuladores-interactivos)
- [Sistema de gamificación](#sistema-de-gamificación)

---

## Público objetivo

EasyPLC School está diseñado para:

- **Estudiantes** de ingeniería eléctrica, mantenimiento industrial o automatización
- **Técnicos** que desean reconvertirse hacia la automatización
- **Profesionales** que buscan consolidar sus bases
- **Formadores** que buscan una plataforma educativa completa

---

## Rutas de aprendizaje

EasyPLC School ofrece cuatro rutas de especialización con una base común de módulos fundamentales:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                           RUTAS DE APRENDIZAJE                                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                                      │
│  🏭 AUTOMATIZACIÓN INDUSTRIAL   🔧 MECANIZADO CNC          🔷 AUTOMATIZACIÓN SIEMENS   ⚡ VFD Y POSICIONAMIENTO      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━     ━━━━━━━━━━━━━━            ━━━━━━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━━━━━         │
│                                                                                                                      │
│  ├── Introducción *             ├── Introducción *        ├── Introducción *        ├── Introducción *              │
│  ├── Lógica combinatoria *      ├── Lógica combinatoria * ├── Lógica combinatoria * ├── Lógica combinatoria *       │
│  ├── Sensores/actuadores *      ├── Sensores/actuadores * ├── Lenguaje LADDER       ├── Sensores/actuadores *       │
│  ├── Lenguaje LADDER            ├── Introducción CNC      ├── Introducción S7-1500  ├── Introducción a VFD          │
│  └── GRAFCET                    ├── Programación G-Code   ├── TIA Portal            ├── Configuración VFD           │
│                                 └── Ejes e interpolación  └── Bloques de datos S7   ├── Comunicación VFD            │
│                                                                                     ├── Intro Posicionamiento       │
│                                                                                     ├── Motores paso a paso/servo   │
│                                                                                     └── Programación de movimiento  │
│                                                                                                                      │
│  * Módulos fundamentales compartidos entre las rutas                                                                │
│                                                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Ruta de Automatización Industrial 🏭

Esta ruta cubre los fundamentos de la automatización industrial con controladores lógicos programables (PLC):
- 5 módulos progresivos (35 lecciones)
- Enfoque en LADDER y GRAFCET
- Quiz de validación para cada lección

### Ruta de Mecanizado CNC 🔧

Esta ruta se especializa en la programación de máquinas de control numérico:
- 6 módulos (3 fundamentales + 3 especializados)
- Aprendizaje de G-Code
- Dominio de sistemas de ejes

### Ruta de Automatización Siemens 🔷

Esta ruta está dedicada a los PLCs Siemens S7-1500 y el entorno TIA Portal:
- 6 módulos (3 fundamentales + 3 especializados Siemens)
- Programación LAD, FBD, SCL
- Dominio de bloques de datos (DB)

### Ruta VFD y Posicionamiento ⚡

Esta ruta se especializa en variadores de frecuencia y control de movimiento:
- 9 módulos (3 fundamentales + 6 especializados)
- 36 lecciones con 180 quiz
- Variadores de frecuencia (VFD): principios, configuración, comunicación
- Posicionamiento: motores paso a paso, servomotores, programación PLCopen

---

## Tipos de ejercicios

EasyPLC School ofrece **10 tipos de ejercicios interactivos** para reforzar el aprendizaje:

| Tipo | Descripción | Uso |
|------|-------------|-----|
| `fill_blank` | Rellenar espacios en texto técnico | Parámetros, cálculos, fórmulas |
| `matching` | Asociar elementos en pares | Símbolos/funciones, términos/definiciones |
| `ordering` | Ordenar pasos correctamente | Procedimientos, secuencias de operación |
| `drag_drop` | Arrastrar y soltar en zonas | Clasificación, completar diagramas |
| `wiring` | Realizar cableado eléctrico | Conexiones de sensores, VFD, motores |
| `code_input` | Introducir código (G-Code, SCL) | Programación CNC, autómatas |
| `timing` | Crear cronogramas | Secuencias temporales, señales |
| `ladder_builder` | Construir programas LADDER | Circuitos lógicos, automatismos |
| `plc_simulator` | Simular programa PLC completo | Validación de programas |

---

## Módulos fundamentales

Estos módulos constituyen la base común de las rutas de aprendizaje.

### Módulo 1: Introducción a la automatización 🔌

> **Objetivo**: Comprender qué es un controlador lógico programable y su papel en la industria

#### Arquitectura de un PLC

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLADOR PROGRAMABLE                    │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  │ ENTRADAS│───▶│     CPU     │───▶│    SALIDAS      │ │  │
│  │  │   (I)   │    │  (Programa) │    │      (Q)        │ │  │
│  │  │         │    │             │    │                 │ │  │
│  │  └─────────┘    └─────────────┘    └─────────────────┘ │  │
│  │       ▲               │                    │           │  │
│  │       │          ┌────┴────┐               ▼           │  │
│  │       │          │ MEMORIA │         ┌─────────┐       │  │
│  │       │          └─────────┘         │ALIMENT. │       │  │
│  │       │                              └─────────┘       │  │
│  └───────┼──────────────────────────────────────────────┘  │
│          │                                      │           │
└──────────┼──────────────────────────────────────┼───────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  SENSORES   │                      │  ACTUADORES   │
    │ - Botones   │                      │ - Motores     │
    │ - Detectores│                      │ - Válvulas    │
    │ - Sondas    │                      │ - Indicadores │
    └─────────────┘                      └───────────────┘
```

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | ¿Qué es un controlador programable? | 10 min | 50 |
| 2 | Las entradas y salidas (E/S) | 12 min | 60 |
| 3 | El ciclo del autómata | 15 min | 70 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Introducción a los PLCs | `fill_blank` | Principiante |
| Componentes de un autómata | `matching` | Principiante |
| Ciclo del autómata | `ordering` | Intermedio |

---

### Módulo 2: Lógica combinatoria 🔀

> **Objetivo**: Dominar las puertas lógicas fundamentales AND, OR, NOT

#### Tablas de verdad

| A | B | A AND B | A OR B |
|:-:|:-:|:-------:|:------:|
| 0 | 0 | **0**   | **0**  |
| 0 | 1 | **0**   | **1**  |
| 1 | 0 | **0**   | **1**  |
| 1 | 1 | **1**   | **1**  |

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | La puerta AND | 12 min | 60 |
| 2 | La puerta OR | 12 min | 60 |
| 3 | La puerta NOT | 10 min | 50 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Tablas de verdad | `fill_blank` | Principiante |
| Símbolos lógicos | `matching` | Principiante |

---

### Módulo 3: El lenguaje LADDER 🪜

> **Objetivo**: Leer y escribir programas en lenguaje LADDER

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Introducción al lenguaje LADDER | 15 min | 70 |
| 2 | Contactos y bobinas | 18 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Circuito marcha/paro | `ladder_builder` | Principiante |
| Símbolos LADDER | `matching` | Principiante |
| Ecuaciones lógicas | `fill_blank` | Intermedio |
| Secuencia de arranque | `ordering` | Intermedio |

---

### Módulo 4: Sensores y actuadores 📡

> **Objetivo**: Conectar un autómata al mundo físico

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Los sensores TODO-NADA | 15 min | 70 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Tipos de sensores | `matching` | Principiante |
| Cableado sensor 3 hilos | `wiring` | Intermedio |
| Características de sensores | `fill_blank` | Intermedio |

---

## Módulos de Automatización

### Módulo 5: GRAFCET 📊

> **Objetivo**: Modelar y programar sistemas secuenciales

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Introducción al GRAFCET | 20 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Elementos del GRAFCET | `matching` | Principiante |
| Ecuaciones GRAFCET | `fill_blank` | Intermedio |
| Acciones y receptividades | `drag_drop` | Intermedio |
| Secuencia GRAFCET | `ordering` | Avanzado |

---

## Módulos CNC

### Módulo 6: Introducción al CNC 🔧

> **Objetivo**: Descubrir las máquinas de control numérico

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | ¿Qué es una máquina CNC? | 12 min | 60 |
| 2 | Tipos de máquinas CNC | 15 min | 70 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Componentes CNC | `matching` | Principiante |
| Tipos de máquinas | `drag_drop` | Principiante |
| Características CNC | `fill_blank` | Intermedio |

---

### Módulo 7: Programación G-Code 📝

> **Objetivo**: Dominar el lenguaje de programación de máquinas CNC

#### Códigos G esenciales

| Código | Función | Ejemplo |
|--------|---------|---------|
| G00 | Posicionamiento rápido | `G00 X50 Y30` |
| G01 | Interpolación lineal | `G01 X100 F200` |
| G02 | Arco horario | `G02 X50 Y50 R25` |
| G03 | Arco antihorario | `G03 X50 Y50 R25` |
| G90 | Modo absoluto | Coordenadas desde el origen |
| G91 | Modo relativo | Coordenadas desde posición actual |

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Estructura de un programa G-Code | 15 min | 70 |
| 2 | Códigos G y M esenciales | 18 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Programa cuadrado | `code_input` | Principiante |
| Códigos G y M | `matching` | Principiante |
| Coordenadas | `fill_blank` | Intermedio |

---

### Módulo 8: Ejes e interpolación 📐

> **Objetivo**: Comprender los sistemas de coordenadas y los movimientos

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Sistema de coordenadas | 12 min | 60 |
| 2 | Interpolación lineal y circular | 18 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Programa arco de círculo | `code_input` | Intermedio |
| Tipos de interpolación | `matching` | Principiante |
| Cálculo de coordenadas | `fill_blank` | Avanzado |

---

## Módulos Siemens

### Módulo 9: Introducción al Siemens S7-1500 🔷

> **Objetivo**: Descubrir el PLC Siemens S7-1500 y TIA Portal

#### Gama de CPUs S7-1500

| CPU | Memoria | Rendimiento |
|-----|---------|-------------|
| 1511 | 150 KB | Nivel de entrada |
| 1513 | 300 KB | Estándar |
| 1515 | 500 KB | Avanzado |
| 1517 | 2 MB | Alto rendimiento |
| 1518 | 4 MB | Máximo |

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Presentación del S7-1500 | 15 min | 70 |
| 2 | El entorno TIA Portal | 18 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Gama S7-1500 | `matching` | Principiante |
| Direccionamiento E/S | `fill_blank` | Intermedio |
| Tipos de módulos | `drag_drop` | Intermedio |

---

### Módulo 10: Programación TIA Portal 💻

> **Objetivo**: Crear proyectos y programar con TIA Portal

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Crear un proyecto TIA Portal | 15 min | 70 |
| 2 | Lenguajes de programación S7 | 18 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Creación de proyecto | `ordering` | Principiante |
| Tipos de bloques | `matching` | Principiante |
| Programa LADDER TIA | `ladder_builder` | Intermedio |

---

### Módulo 11: Bloques de datos S7-1500 📦

> **Objetivo**: Dominar los bloques de datos y la programación estructurada

#### Tipos de bloques S7

| Bloque | Descripción | Memoria |
|--------|-------------|---------|
| OB | Punto de entrada del programa | No |
| FB | Bloque con memoria | DB de instancia |
| FC | Bloque sin memoria | No |
| DB | Almacenamiento de datos | Sí |

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Los bloques de datos (DB) | 15 min | 70 |
| 2 | Programación estructurada | 18 min | 80 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Tipos de DB | `matching` | Principiante |
| Creación de DB global | `fill_blank` | Intermedio |
| DB de instancia FB | `drag_drop` | Avanzado |

---

## Módulos VFD y Posicionamiento

### Módulo 12: Introducción a los variadores ⚡

> **Objetivo**: Comprender los principios de los variadores de frecuencia

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | ¿Qué es un variador de velocidad? | 12 min | 60 |
| 2 | Tipos de motores y variadores | 15 min | 70 |
| 3 | Esquemas de cableado | 15 min | 70 |
| 4 | Protecciones y seguridad | 12 min | 60 |
| 5 | Ahorro de energía | 12 min | 60 |
| 6 | Marcas y modelos comunes | 10 min | 50 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Configuración básica VFD | `fill_blank` | Principiante |
| Lectura de placa de motor | `matching` | Principiante |
| Esquema de cableado VFD | `wiring` | Intermedio |

---

### Módulo 13: Configuración de variadores 🔧

> **Objetivo**: Dominar el parametrizado de variadores

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Parámetros motor | 15 min | 70 |
| 2 | Rampas y límites | 15 min | 70 |
| 3 | Modos de control | 18 min | 80 |
| 4 | Regulación PID integrada | 18 min | 80 |
| 5 | Gestión de fallos | 15 min | 70 |
| 6 | Copia de seguridad y restauración | 12 min | 60 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Parámetros motor | `fill_blank` | Intermedio |
| Configuración de rampas | `matching` | Principiante |
| Modos de control VFD | `drag_drop` | Intermedio |

---

### Módulo 14: Comunicación de variadores 🌐

> **Objetivo**: Integrar los variadores en un sistema automatizado

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Protocolos de comunicación | 15 min | 70 |
| 2 | Comunicación Modbus | 18 min | 80 |
| 3 | Integración con autómata | 18 min | 80 |
| 4 | Diagnóstico y monitorización | 15 min | 70 |
| 5 | Resolución de problemas | 15 min | 70 |
| 6 | Mantenimiento preventivo | 12 min | 60 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Configuración Modbus RTU | `fill_blank` | Intermedio |
| Registros Modbus | `matching` | Avanzado |
| Trama Modbus RTU | `drag_drop` | Avanzado |

---

### Módulo 15: Introducción al posicionamiento 📐

> **Objetivo**: Descubrir los fundamentos del control de movimiento

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Principios del control de movimiento | 15 min | 70 |
| 2 | Conceptos de mecánica | 15 min | 70 |
| 3 | Encoders y sensores de posición | 18 min | 80 |
| 4 | Lazos de regulación | 18 min | 80 |
| 5 | Toma de origen (homing) | 15 min | 70 |
| 6 | Límites y seguridades | 15 min | 70 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Cálculo resolución encoder | `fill_blank` | Intermedio |
| Perfil trapezoidal | `fill_blank` | Avanzado |
| Tipos de lazos de control | `matching` | Intermedio |

---

### Módulo 16: Motores paso a paso y servomotores ⚙️

> **Objetivo**: Elegir y dimensionar un sistema de accionamiento

#### Comparación de tecnologías

| Característica | Motor paso a paso | Servomotor |
|----------------|-------------------|------------|
| Lazo de control | Abierto | Cerrado |
| Par a baja velocidad | Alto | Constante |
| Dinámica | Media | Alta |
| Costo | Económico | Más alto |
| Aplicación típica | Posicionamiento simple | Alto rendimiento |

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Motores paso a paso | 18 min | 80 |
| 2 | Servomotores síncronos | 18 min | 80 |
| 3 | Comparación y elección | 15 min | 70 |
| 4 | Dimensionamiento de motor | 20 min | 90 |
| 5 | Drivers y servo variadores | 18 min | 80 |
| 6 | Motores lineales | 15 min | 70 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Selección tipo de motor | `matching` | Principiante |
| Dimensionamiento motor | `fill_blank` | Avanzado |
| Características de motores | `drag_drop` | Intermedio |

---

### Módulo 17: Programación de movimiento 🎯

> **Objetivo**: Programar movimientos con bloques PLCopen

#### Bloques función PLCopen Motion

| Bloque | Función |
|--------|---------|
| MC_Power | Activa/desactiva el eje |
| MC_Home | Toma de origen |
| MC_MoveAbsolute | Desplazamiento a posición absoluta |
| MC_MoveRelative | Desplazamiento por distancia relativa |
| MC_MoveVelocity | Movimiento a velocidad constante |
| MC_Stop | Detener movimiento |
| MC_GearIn | Acoplamiento electrónico |

#### Contenido del módulo

| # | Lección | Duración | XP |
|---|---------|----------|-----|
| 1 | Perfiles de movimiento | 18 min | 80 |
| 2 | Movimientos absolutos y relativos | 15 min | 70 |
| 3 | Sincronización de ejes | 20 min | 90 |
| 4 | Interpolación multi-eje | 20 min | 90 |
| 5 | Bloques función PLCopen | 18 min | 80 |
| 6 | Diagnóstico y optimización | 15 min | 70 |

#### Ejercicios

| Ejercicio | Tipo | Dificultad |
|-----------|------|------------|
| Sincronización de ejes | `fill_blank` | Avanzado |
| Leva electrónica | `ordering` | Avanzado |
| Perfil de leva | `fill_blank` | Avanzado |
| Bloques motion PLCopen | `matching` | Intermedio |

---

## Simuladores interactivos

### Simulador PLC / LADDER ⚡

Un simulador de autómata programable completo con visualización LADDER en tiempo real.

**Funcionalidades:**
- Programas de ejemplo: Marcha/Paro, Semáforo, Secuenciador
- Modo impulsional/interruptor para cada entrada
- Visualización del flujo de potencia en tiempo real
- Temporizadores con barra de progreso
- Diferentes tipos de salidas: lámparas, motores, válvulas

### Editor GRAFCET 📐

Un editor visual para crear y simular diagramas GRAFCET.

**Funcionalidades:**
- Crear etapas y transiciones con arrastrar y soltar
- Enlazar elementos (etapa → transición → etapa)
- Simulación en tiempo real con visualización de etapas activas
- Editar condiciones de transición
- Ejemplos precargados

### Simulador G-Code / CNC 🔧

Un simulador de programación CNC con visualización 2D y 3D.

**Funcionalidades:**
- Editor de código con resaltado de sintaxis
- Visualización 2D (superior, frontal, lateral) y vista 3D isométrica
- Animación de trayectoria de herramienta
- Estadísticas: distancia total, tiempo estimado
- Control de velocidad de animación

---

## Sistema de gamificación

### Puntos XP

| Acción | XP ganado |
|--------|-----------|
| Completar una lección | 50-80 XP (según puntuación) |
| Completar un ejercicio | 75-250 XP (según dificultad) |
| Insignia desbloqueada | 25-100 XP bonus |
| Trofeo obtenido | 150-200 XP bonus |

### Niveles

El nivel se calcula según: XP total = 50 × nivel × (nivel + 1)

| Nivel | XP requerido |
|-------|--------------|
| 1 | 0 |
| 2 | 100 |
| 3 | 300 |
| 4 | 600 |
| 5 | 1000 |
| 10 | 5500 |

### Recompensas

- **Insignias**: Desbloqueadas al completar módulos
- **Trofeos**: Desbloqueados por logros especiales
- **Racha diaria**: Bonus por conexiones consecutivas
