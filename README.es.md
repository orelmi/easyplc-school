# EasyPLC School

Plataforma de aprendizaje de código abierto para automatización industrial y controladores lógicos programables (PLC).

> **Proyecto de código abierto**: ¡Este proyecto está abierto a contribuciones! Ya sea que seas desarrollador, profesor de automatización o profesional de la industria, tus contribuciones son bienvenidas para enriquecer el contenido educativo y mejorar la plataforma.

**Idiomas:** [English](README.md) | [Français](README.fr.md) | Español

## Tabla de Contenidos

- [Capturas de pantalla](#capturas-de-pantalla)
- [Rutas de aprendizaje](#rutas-de-aprendizaje)
- [Contenido educativo](#contenido-educativo)
  - [Módulos fundamentales](#módulos-fundamentales-compartidos)
  - [Módulos de Automatización](#módulos-de-automatización)
  - [Módulos CNC](#módulos-cnc)
  - [Módulos Siemens](#módulos-siemens)
  - [Módulos VFD y Posicionamiento](#módulos-vfd-y-posicionamiento)
- [Funcionalidades](#funcionalidades)
- [Instalación](#instalación)
- [Cuenta demo](#cuenta-demo)
- [Stack técnico](#stack-técnico)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Capturas de pantalla

### Vista general
![Vista general de la aplicación](public/overview.png)

### Módulo de aprendizaje
![Ejemplo de un módulo](public/module1.png)

### Rutas de aprendizaje
![Rutas de aprendizaje](public/learning-path.png)

### Simulador G-Code interactivo
![Simulador G-Code](public/gcode-simulator.png)

### Simulador PLC / LADDER
![Simulador PLC](public/plc-simulator.png)

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
- 6 lecciones especializadas con diagramas ASCII
- Programación LAD, FBD, SCL
- Dominio de bloques de datos (DB)

### Ruta VFD y Posicionamiento ⚡

Esta ruta se especializa en variadores de frecuencia y control de movimiento:
- 9 módulos (3 fundamentales + 6 especializados)
- 36 lecciones con 180 quiz
- Variadores de frecuencia (VFD): principios, configuración, comunicación
- Posicionamiento: motores paso a paso, servomotores, programación PLCopen

---

## Contenido educativo

EasyPLC School ofrece un recorrido completo para dominar los fundamentos de la automatización industrial. Cada módulo está diseñado para ser progresivo, con lecciones teóricas, esquemas explicativos y quiz de validación.

### Público objetivo

- Estudiantes de ingeniería eléctrica, mantenimiento industrial o automatización
- Técnicos que desean reconvertirse hacia la automatización
- Profesionales que buscan consolidar sus bases

---

## Módulos fundamentales (compartidos)

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

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | ¿Qué es un controlador programable? | 10 min | 50 | Descubrimiento del PLC y su papel industrial |
| 2 | Las entradas y salidas (E/S) | 12 min | 60 | Comprender la interfaz con el mundo físico |
| 3 | El ciclo del autómata | 15 min | 70 | Funcionamiento cíclico: lectura → ejecución → escritura |

---

### Módulo 2: Lógica combinatoria 🔀

> **Objetivo**: Dominar las puertas lógicas fundamentales AND, OR, NOT

#### Las tres puertas lógicas básicas

```
    PUERTA AND               PUERTA OR                PUERTA NOT
    ──────────               ─────────                ──────────

    A ──┐                    A ──┐                         ┌──o── S
        │ ┌───┐                  │ ┌───┐               A ──┤
    B ──┴─┤ & ├── S          B ──┴─┤≥1 ├── S               └─────
          └───┘                    └───┘
                                                       S = NOT A
    S = A AND B              S = A OR B                (inversión)
    (todos en 1)             (al menos 1)
```

#### Tablas de verdad

**Puerta AND**
| A | B | A AND B |
|:-:|:-:|:-------:|
| 0 | 0 | **0**   |
| 0 | 1 | **0**   |
| 1 | 0 | **0**   |
| 1 | 1 | **1**   |

**Puerta OR**
| A | B | A OR B |
|:-:|:-:|:------:|
| 0 | 0 | **0**  |
| 0 | 1 | **1**  |
| 1 | 0 | **1**  |
| 1 | 1 | **1**  |

**Puerta NOT**
| A | NOT A |
|:-:|:-----:|
| 0 | **1** |
| 1 | **0** |

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | La puerta AND | 12 min | 60 | Función AND y contactos en serie |
| 2 | La puerta OR | 12 min | 60 | Función OR y contactos en paralelo |
| 3 | La puerta NOT | 10 min | 50 | Inversión y contactos normalmente cerrados |

---

### Módulo 3: El lenguaje LADDER 🪜

> **Objetivo**: Leer y escribir programas en lenguaje LADDER (diagrama de contactos)

#### Principio del LADDER

El LADDER (escalera) es un lenguaje gráfico que se asemeja a los esquemas eléctricos. La "corriente" fluye de izquierda a derecha.

```
    Barra         Contactos              Bobina         Barra
    izquierda                                          derecha
      │                                                 │
      │     ┌─────┐          ┌─────┐         ┌───┐     │
      ├─────┤ I0.0├──────────┤ I0.1├─────────┤Q0.0├────┤
      │     └──┬──┘          └──┬──┘         └─┬─┘     │
      │        │                │              │       │
      │     Contacto         Contacto       Bobina     │
      │       NA               NA                      │
      │                                                │
```

#### Elementos básicos

```
CONTACTOS                              BOBINAS

  ──┤ ├──   Contacto NA               ──( )──   Bobina simple
            (Normalmente Abierto)               (activada si hay corriente)

  ──┤/├──   Contacto NC               ──(S)──   Bobina SET
            (Normalmente Cerrado)               (memorización)

                                      ──(R)──   Bobina RESET
                                                (puesta a cero)
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Introducción al lenguaje LADDER | 15 min | 70 | Estructura y símbolos básicos |
| 2 | Contactos y bobinas | 18 min | 80 | Contactos NA/NC, bobinas SET/RESET |

---

### Módulo 4: Sensores y actuadores 📡

> **Objetivo**: Conectar un autómata al mundo físico

#### Tipos de sensores TODO-NADA

```
SENSORES MECÁNICOS                     SENSORES DE PROXIMIDAD
━━━━━━━━━━━━━━━━━                     ━━━━━━━━━━━━━━━━━━━━━

┌─────────────────┐                    ┌─────────────────┐
│ FIN DE CARRERA  │                    │    INDUCTIVO    │
│                 │                    │   ┌───────┐     │
│    ┌────┐       │                    │   │ ~~~   │     │  Detecta
│  ──┤    ├──     │                    │   │  ○    │◀────│  METALES
│    └────┘       │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘

┌─────────────────┐                    ┌─────────────────┐
│ PULSADOR        │                    │   CAPACITIVO    │
│                 │                    │   ┌───────┐     │
│      ┌─┐        │                    │   │  ≋≋   │     │  Detecta
│    ──┤ ├──      │                    │   │  ○    │◀────│  TODO material
│      └─┘        │                    │   └───────┘     │
└─────────────────┘                    └─────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Los sensores TODO-NADA | 15 min | 70 | Sensores mecánicos y de proximidad |

---

## Módulos de Automatización

Estos módulos son específicos de la ruta de Automatización Industrial.

### Módulo 5: GRAFCET 📊

> **Objetivo**: Modelar y programar sistemas secuenciales

#### Estructura del GRAFCET

```
    ╔═══════════════════════════════════════════════════════╗
    ║                    GRAFCET                             ║
    ║   Gráfico Funcional de Control Etapa-Transición       ║
    ╚═══════════════════════════════════════════════════════╝

         ┌─────┐
         │  0  │◀──── Etapa inicial (doble cuadrado)
         └──┬──┘
            │
         ───┴───  ◀── Transición (condición)
         inicio
            │
         ┌──┴──┐
         │  1  │───── Acción: Avanzar cilindro
         └──┬──┘
            │
         ───┴───
         fin av.
            │
         ┌──┴──┐
         │  2  │───── Acción: Retroceder cilindro
         └──┬──┘
            │
         ───┴───
         fin ret.
            │
            └────────▶ Retorno a la etapa 0
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Introducción al GRAFCET | 20 min | 80 | Etapas, transiciones, acciones |

---

## Módulos CNC

Estos módulos son específicos de la ruta de Mecanizado CNC.

### Módulo 6: Introducción al CNC 🔧

> **Objetivo**: Descubrir las máquinas de control numérico y su funcionamiento

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | ¿Qué es una máquina CNC? | 12 min | 60 | Descubrimiento de las máquinas de control numérico |
| 2 | Tipos de máquinas CNC | 15 min | 70 | Fresadoras, tornos, corte láser y más |

---

### Módulo 7: Programación G-Code 📝

> **Objetivo**: Dominar el lenguaje de programación de máquinas CNC

#### Códigos G esenciales

| Código | Función | Ejemplo |
|--------|---------|---------|
| G00 | Desplazamiento rápido | `G00 X50 Y30` |
| G01 | Interpolación lineal | `G01 X100 F200` |
| G02 | Arco horario | `G02 X50 Y50 R25` |
| G03 | Arco antihorario | `G03 X50 Y50 R25` |
| G90 | Modo absoluto | Coordenadas desde el origen |
| G91 | Modo relativo | Coordenadas desde posición actual |

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Estructura de un programa G-Code | 15 min | 70 | Organización y sintaxis básica |
| 2 | Códigos G y M esenciales | 18 min | 80 | Los comandos fundamentales |

---

### Módulo 8: Ejes e interpolación 📐

> **Objetivo**: Comprender los sistemas de coordenadas y los movimientos en CNC

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Sistema de coordenadas | 12 min | 60 | Referencias y orígenes máquina/pieza |
| 2 | Interpolación lineal y circular | 18 min | 80 | G01, G02, G03 en detalle |

---

## Módulos Siemens

Estos módulos son específicos de la ruta de Automatización Siemens S7-1500.

### Módulo 9: Introducción al Siemens S7-1500 🔷

> **Objetivo**: Descubrir el PLC Siemens S7-1500 y el entorno TIA Portal

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Presentación del S7-1500 | 15 min | 70 | Arquitectura y características |
| 2 | El entorno TIA Portal | 18 min | 80 | Interfaz y funcionalidades |

---

### Módulo 10: Programación TIA Portal 💻

> **Objetivo**: Crear proyectos y programar con TIA Portal

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Crear un proyecto TIA Portal | 15 min | 70 | Configuración de hardware y proyecto |
| 2 | Lenguajes de programación S7 | 18 min | 80 | LAD, FBD, SCL y GRAPH |

---

### Módulo 11: Bloques de datos S7-1500 📦

> **Objetivo**: Dominar los bloques de datos y la programación estructurada

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Los bloques de datos (DB) | 15 min | 70 | DB globales y de instancia |
| 2 | Programación estructurada | 18 min | 80 | Organización con OB, FB, FC |

---

## Módulos VFD y Posicionamiento

Estos módulos son específicos de la ruta de Variadores de velocidad y Posicionamiento.

### Módulo 12: Introducción a los variadores de velocidad ⚡

> **Objetivo**: Comprender los principios fundamentales de los variadores de frecuencia (VFD)

#### Principio de funcionamiento

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    VARIADOR DE VELOCIDAD (VFD)                           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌─────────┐  │  │
│  │  │           │    │           │    │           │    │         │  │  │
│  │  │RECTIFICADOR───▶│ BUS DC    │───▶│ INVERSOR  │───▶│ MOTOR   │  │  │
│  │  │   (AC→DC) │    │ (Filtrado)│    │  (DC→AC)  │    │   AC    │  │  │
│  │  │           │    │           │    │           │    │         │  │  │
│  │  └───────────┘    └───────────┘    └───────────┘    └─────────┘  │  │
│  │       ▲                                   │                       │  │
│  │       │                              ┌────┴────┐                  │  │
│  │  Red AC                              │ Control │                  │  │
│  │  (50/60 Hz)                          │   PWM   │                  │  │
│  │                                      └─────────┘                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Frecuencia de salida variable: 0-400 Hz                                │
│  Tensión de salida variable: 0-Unom                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | ¿Qué es un variador de velocidad? | 12 min | 60 | Principio y aplicaciones de los VFD |
| 2 | Tipos de motores y variadores | 15 min | 70 | Motores compatibles con VFD |
| 3 | Esquemas de cableado | 15 min | 70 | Cableado eléctrico de un VFD |
| 4 | Protecciones y seguridad | 12 min | 60 | Dispositivos de protección |
| 5 | Ahorro de energía | 12 min | 60 | Optimizar el consumo |
| 6 | Marcas y modelos comunes | 10 min | 50 | Principales fabricantes |

---

### Módulo 13: Configuración de variadores 🔧

> **Objetivo**: Dominar el parametrizado de variadores de velocidad

#### Parámetros esenciales

```
┌─────────────────────────────────────────────────────────────┐
│              PARÁMETROS DE CONFIGURACIÓN VFD                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  PARÁMETROS MOTOR           RAMPAS Y LÍMITES                 │
│  ──────────────────         ─────────────────                │
│  • Tensión nominal          • Tiempo de aceleración          │
│  • Corriente nominal        • Tiempo de deceleración         │
│  • Frecuencia nominal       • Frecuencia min/max             │
│  • Velocidad nominal        • Limitación de corriente        │
│  • Cos phi                                                    │
│                                                               │
│  MODOS DE CONTROL           REGULACIÓN                       │
│  ─────────────────          ──────────                       │
│  • V/f constante            • PID integrado                  │
│  • Control vectorial        • Referencia analógica           │
│  • Control DTC              • Comunicación bus               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Parámetros motor | 15 min | 70 | Configuración de datos del motor |
| 2 | Rampas y límites | 15 min | 70 | Aceleración y límites de velocidad |
| 3 | Modos de control | 18 min | 80 | V/f, vectorial, DTC |
| 4 | Regulación PID integrada | 18 min | 80 | Usar el PID del variador |
| 5 | Gestión de fallos | 15 min | 70 | Comportamiento en fallo |
| 6 | Copia de seguridad y restauración | 12 min | 60 | Backup de parámetros |

---

### Módulo 14: Comunicación de variadores 🌐

> **Objetivo**: Integrar los variadores en un sistema automatizado

#### Protocolos de comunicación

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    COMUNICACIÓN INDUSTRIAL                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────┐       ┌──────────┐       ┌─────────┐       ┌─────────┐     │
│  │   PLC   │◀─────▶│ PROFINET │◀─────▶│   VFD   │◀─────▶│ MOTOR   │     │
│  │         │       │ MODBUS   │       │         │       │         │     │
│  │         │       │ Ethernet │       │         │       │         │     │
│  └─────────┘       └──────────┘       └─────────┘       └─────────┘     │
│       │                                                                  │
│       │            DATOS INTERCAMBIADOS                                  │
│       │            ────────────────────                                  │
│       │            • Palabra de control (Run/Stop)                       │
│       │            • Consigna de velocidad                               │
│       │            • Palabra de estado                                   │
│       │            • Velocidad actual                                    │
│       │            • Corriente, potencia                                 │
│       │            • Códigos de fallo                                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Protocolos de comunicación | 15 min | 70 | Modbus, PROFINET, Ethernet/IP |
| 2 | Comunicación Modbus | 18 min | 80 | Dominar Modbus RTU/TCP |
| 3 | Integración con autómata | 18 min | 80 | Conexión PLC-VFD |
| 4 | Diagnóstico y monitorización | 15 min | 70 | Supervisar el estado del variador |
| 5 | Resolución de problemas | 15 min | 70 | Resolver problemas comunes |
| 6 | Mantenimiento preventivo | 12 min | 60 | Planificar el mantenimiento |

---

### Módulo 15: Introducción al posicionamiento 📐

> **Objetivo**: Descubrir los fundamentos del control de movimiento

#### Lazos de regulación

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 LAZOS DE REGULACIÓN EN CASCADA                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Consigna    ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐         │
│   Posición ──▶│Posición│──▶│Velocidad──▶│Corriente──▶│ MOTOR  │         │
│               │  PID   │   │  PID   │   │  PID   │   │        │         │
│               └────────┘   └────────┘   └────────┘   └───┬────┘         │
│                    ▲            ▲            ▲           │              │
│                    │            │            │           │              │
│               ┌────┴────┐  ┌────┴────┐  ┌───┴────┐     │              │
│               │ Encoder │  │ Encoder │  │Sensor  │◀────┘              │
│               │Posición │  │Velocidad│  │Corriente                     │
│               └─────────┘  └─────────┘  └────────┘                     │
│                                                                          │
│   Lazo externo ────────────────────────────────▶ Lazo interno           │
│   (el más lento)                                  (el más rápido)       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Principios del control de movimiento | 15 min | 70 | Fundamentos del motion control |
| 2 | Conceptos de mecánica | 15 min | 70 | Conceptos mecánicos esenciales |
| 3 | Encoders y sensores de posición | 18 min | 80 | Encoders, reglas, resolvers |
| 4 | Lazos de regulación | 18 min | 80 | Posición, velocidad, corriente |
| 5 | Toma de origen (homing) | 15 min | 70 | Configuración del homing |
| 6 | Límites y seguridades | 15 min | 70 | Finales de carrera y límites software |

---

### Módulo 16: Motores paso a paso y servomotores ⚙️

> **Objetivo**: Elegir y dimensionar un sistema de accionamiento

#### Comparación de tecnologías

```
┌─────────────────────────────────────────────────────────────────────────┐
│              MOTOR PASO A PASO vs SERVOMOTOR                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  MOTOR PASO A PASO                   SERVOMOTOR                         │
│  ──────────────────                  ───────────                        │
│                                                                          │
│  ┌─────────────────┐                 ┌─────────────────┐                │
│  │    ┌─────┐      │                 │    ┌─────┐      │                │
│  │   /│░░░░░│\     │                 │   /│▓▓▓▓▓│\     │                │
│  │  │ │░░░░░│ │    │                 │  │ │▓▓▓▓▓│ │    │                │
│  │  │ │░░░░░│ │    │                 │  │ │▓▓▓▓▓│ │    │                │
│  │   \│░░░░░│/     │                 │   \│▓▓▓▓▓│/     │                │
│  │    └─────┘      │                 │    └──┬──┘      │                │
│  └─────────────────┘                 └───────┼─────────┘                │
│                                              │                           │
│  • Lazo abierto                      • Lazo cerrado (encoder)           │
│  • Sin pérdida de pasos              • Alta dinámica                    │
│  • Económico                         • Par constante                    │
│  • Par decrece con velocidad         • Precio más alto                  │
│  • Ideal: posicionamiento simple     • Ideal: alto rendimiento          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Motores paso a paso | 18 min | 80 | Funcionamiento y tipos |
| 2 | Servomotores síncronos | 18 min | 80 | Servos de imanes permanentes |
| 3 | Comparación y elección | 15 min | 70 | Criterios de selección |
| 4 | Dimensionamiento de motor | 20 min | 90 | Cálculos de inercia y par |
| 5 | Drivers y servo variadores | 18 min | 80 | Electrónica de control |
| 6 | Motores lineales | 15 min | 70 | Accionamientos directos |

---

### Módulo 17: Programación de movimiento 🎯

> **Objetivo**: Programar movimientos con los bloques PLCopen

#### Bloques función PLCopen Motion

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    BLOQUES FUNCIÓN PLCopen                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  MC_Power          MC_MoveAbsolute      MC_Stop                         │
│  ┌─────────┐       ┌─────────────┐      ┌─────────┐                     │
│  │ Enable  │       │ Execute     │      │ Execute │                     │
│  │ Axis    │       │ Axis        │      │ Axis    │                     │
│  │         │       │ Position    │      │         │                     │
│  │  Status │       │ Velocity    │      │  Done   │                     │
│  │  Error  │       │ Done/Busy   │      │  Error  │                     │
│  └─────────┘       └─────────────┘      └─────────┘                     │
│                                                                          │
│  MC_MoveRelative   MC_MoveVelocity      MC_Home                         │
│  ┌─────────────┐   ┌─────────────┐      ┌─────────┐                     │
│  │ Execute     │   │ Execute     │      │ Execute │                     │
│  │ Axis        │   │ Axis        │      │ Axis    │                     │
│  │ Distance    │   │ Velocity    │      │ Position│                     │
│  │ Velocity    │   │ Direction   │      │ Done    │                     │
│  │ Done/Busy   │   │ InVelocity  │      │ Error   │                     │
│  └─────────────┘   └─────────────┘      └─────────┘                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Lecciones del módulo

| # | Lección | Duración | XP | Descripción |
|---|---------|----------|-----|-------------|
| 1 | Perfiles de movimiento | 18 min | 80 | Trapecio, S-curve, jerk |
| 2 | Movimientos absolutos y relativos | 15 min | 70 | MC_MoveAbsolute/Relative |
| 3 | Sincronización de ejes | 20 min | 90 | Ejes maestro/esclavo |
| 4 | Interpolación multi-eje | 20 min | 90 | Trayectorias coordinadas |
| 5 | Bloques función PLCopen | 18 min | 80 | Estándar PLCopen Motion |
| 6 | Diagnóstico y optimización | 15 min | 70 | Tuning y rendimiento |

---

## Simuladores interactivos

EasyPLC School incluye tres simuladores interactivos para poner en práctica los conceptos aprendidos.

### Simulador PLC / LADDER ⚡

Un simulador de autómata programable completo con visualización LADDER en tiempo real.

```
┌─────────────────────────────────────────────────────────────────┐
│  SIMULADOR PLC                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PANEL E/S              │  DIAGRAMA LADDER                      │
│  ┌────────────────────┐ │  ┌────────────────────────────────┐   │
│  │ ENTRADAS           │ │  │                                │   │
│  │ [I0.0] [I0.1] ...  │ │  │  ──┤START├──┤STOP├──(MOTOR)── │   │
│  │  ⚡/🔒  ⚡/🔒       │ │  │        │      /│               │   │
│  │                    │ │  │  ──────┴MOTOR─┴────────────── │   │
│  │ SALIDAS            │ │  │                                │   │
│  │ [Q0.0] [Q0.1] ...  │ │  │  Rieles verdes = flujo activo │   │
│  │   💡     ⚙️         │ │  │                                │   │
│  │                    │ │  └────────────────────────────────┘   │
│  │ TEMPORIZADORES     │ │                                       │
│  │ [T0] ████░░ 3.2s   │ │                                       │
│  └────────────────────┘ │                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- Programas de ejemplo: Marcha/Paro, Semáforo, Secuenciador
- **Modo impulsional/interruptor**: Clic en ⚡/🔒 sobre cada entrada para cambiar
- Visualización del flujo de potencia en tiempo real (rieles verdes)
- Temporizadores con barra de progreso
- Diferentes tipos de salidas: lámparas, motores, válvulas

**Programas disponibles:**
| Programa | Descripción |
|----------|-------------|
| Marcha/Paro | Circuito auto-mantenido con botones START/STOP |
| Semáforo | Secuencia con temporizadores |
| Secuenciador | Etapas secuenciales activadas por botones |

---

### Editor GRAFCET 📐

Un editor visual para crear y simular diagramas GRAFCET (Gráficos Funcionales de Control Etapa-Transición).

![Editor GRAFCET](public/g7-simulator.png)

**Funcionalidades:**
- Crear etapas y transiciones con arrastrar y soltar
- Enlazar elementos (etapa → transición → etapa)
- Simulación en tiempo real con visualización de etapas activas
- Editar condiciones de transición (booleano, temporización)
- Agregar acciones a las etapas
- Ejemplos precargados: Ciclo simple, Secuencia temporizada, Ramas paralelas, Semáforo

**Atajos de teclado:**
| Tecla | Acción |
|-------|--------|
| V | Herramienta de selección |
| S | Agregar etapa |
| T | Agregar transición |
| L | Enlazar elementos |
| Del | Eliminar selección |
| Esc | Cancelar |

---

### Simulador G-Code / CNC 🔧

Un simulador de programación CNC con visualización 2D y 3D.

**Funcionalidades:**
- Editor de código con resaltado de sintaxis
- Visualización 2D (superior, frontal, lateral) y vista 3D isométrica
- Animación de trayectoria de herramienta
- Estadísticas: distancia total, tiempo estimado, número de comandos
- Control de velocidad de animación
- Programas de ejemplo: cuadrado, círculo, mecanizado complejo

**Códigos G soportados:**
| Código | Descripción |
|--------|-------------|
| G00 | Posicionamiento rápido |
| G01 | Interpolación lineal |
| G02 | Arco horario |
| G03 | Arco antihorario |
| G90/G91 | Modo absoluto/relativo |
| G20/G21 | Pulgadas/milímetros |

---

## Funcionalidades

### Sistema de usuarios
- Registro e inicio de sesión seguros (JWT)
- Perfil de usuario personalizable
- Seguimiento de progreso individual

### Sistema de gamificación
- **Puntos XP**: Gana puntos al completar lecciones
- **Niveles**: Progresa y desbloquea nuevos módulos
- **Racha diaria**: Mantén tu racha de conexión
- **Recompensas**: Insignias y trofeos para coleccionar

### Clasificación
- Clasificación global de usuarios
- Filtros por período (semana, mes, todo el tiempo)
- Visualización de tu rango

### Sistema de puntos XP

| Acción | XP ganado |
|--------|-----------|
| Completar una lección | 50-80 XP (según puntuación) |
| Insignia desbloqueada | 25-100 XP bonus |
| Trofeo obtenido | 150-200 XP bonus |

El nivel se calcula según la fórmula: XP total = 50 × nivel × (nivel + 1)

---

## Instalación

### Requisitos previos
- Node.js 18+
- npm o yarn

### Pasos

1. **Clonar el proyecto**
```bash
git clone https://github.com/orelmi/easyplc-school.git
cd easyplc-school
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la base de datos**
```bash
npx prisma generate
npx prisma db push
```

4. **Poblar la base de datos** (opcional)
```bash
npm run db:seed
```

5. **Iniciar la aplicación**
```bash
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Cuenta demo

Una cuenta demo se crea automáticamente durante el seed:

| Campo | Valor |
|-------|-------|
| Email | `demo@easyplc.fr` |
| Contraseña | `demo123` |

Esta cuenta ya tiene:
- 255 XP y nivel 2
- 3 lecciones completadas
- 3 recompensas desbloqueadas
- Una racha de 3 días

## Stack técnico

### Frontend
- React 18 + TypeScript
- Vite (herramienta de build)
- Tailwind CSS
- React Router v6
- Zustand (gestión de estado)
- Three.js (visualización 3D)

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- JWT (autenticación)
- bcrypt (hash de contraseñas)

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia frontend y backend en modo desarrollo |
| `npm run dev:client` | Inicia solo el frontend |
| `npm run dev:server` | Inicia solo el backend |
| `npm run build` | Build de producción |
| `npm run db:push` | Aplica el esquema Prisma a la DB |
| `npm run db:seed` | Puebla la DB con datos iniciales |
| `npm run db:studio` | Abre Prisma Studio (GUI DB) |

## Estructura del proyecto

```
easyplc-school/
├── prisma/
│   ├── schema.prisma    # Esquema de la base de datos
│   ├── seed.ts          # Script de poblado + contenido educativo
│   └── translations.ts  # Traducciones de lecciones y quiz (EN/ES)
├── server/
│   ├── index.ts         # Punto de entrada del servidor
│   ├── middleware/
│   │   └── auth.ts      # Middleware de autenticación
│   └── routes/
│       ├── auth.ts      # Rutas de autenticación
│       ├── users.ts     # Rutas de usuarios
│       ├── modules.ts   # Rutas de módulos
│       ├── lessons.ts   # Rutas de lecciones
│       ├── progress.ts  # Rutas de progreso
│       ├── rewards.ts   # Rutas de recompensas
│       ├── leaderboard.ts # Rutas de clasificación
│       └── cursus.ts    # Rutas de rutas de aprendizaje
├── src/
│   ├── components/
│   │   ├── Layout.tsx   # Layout principal
│   │   └── LanguageSelector.tsx # Selector de idioma
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CursusSelect.tsx  # Selección de ruta
│   │   ├── CursusDetail.tsx  # Detalle de una ruta
│   │   ├── Modules.tsx
│   │   ├── ModuleDetail.tsx
│   │   ├── Lesson.tsx
│   │   ├── Rewards.tsx
│   │   ├── Leaderboard.tsx
│   │   └── Profile.tsx
│   ├── store/
│   │   └── authStore.ts # Store Zustand
│   ├── lib/
│   │   └── api.ts       # Cliente API
│   ├── i18n/
│   │   ├── index.ts     # Configuración i18n
│   │   └── locales/     # Archivos de traducción (fr, en, es)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registro |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/auth/me` | Usuario actual |

### Módulos y lecciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/modules` | Lista de módulos |
| GET | `/api/modules/:id` | Detalle de un módulo |
| GET | `/api/lessons/:id` | Contenido de una lección |
| POST | `/api/lessons/:id/submit` | Enviar un quiz |

### Rutas de aprendizaje (Cursus)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cursus` | Lista de rutas con progreso |
| GET | `/api/cursus/:id` | Detalle de una ruta con módulos |

### Progreso y recompensas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/progress` | Progreso del usuario |
| GET | `/api/rewards` | Lista de recompensas |
| GET | `/api/leaderboard` | Clasificación de usuarios |

## Contribuir

¡Este proyecto es de código abierto y da la bienvenida a las contribuciones de la comunidad!

### Cómo contribuir

1. **Fork** el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Sube a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Tipos de contribuciones buscadas

- **Contenido educativo**: Nuevos módulos, lecciones, ejercicios
- **Funcionalidades**: Simulador LADDER, editor GRAFCET, modo offline
- **Mejoras UI/UX**: Accesibilidad, diseño responsive, animaciones
- **Documentación**: Tutoriales, guías de uso, traducciones
- **Tests**: Tests unitarios, tests de integración
- **Correcciones**: Bugs, errores de ortografía, optimizaciones

### Ideas de contribución

- [x] ~~Agregar un simulador de autómata interactivo~~ ✅ Simulador PLC con visualización LADDER en tiempo real
- [x] ~~Crear un editor GRAFCET visual~~ ✅ Editor con simulación en tiempo real
- [x] ~~Agregar animaciones para los diagramas LADDER~~ ✅ Flujo de potencia animado en el simulador PLC
- [ ] Implementar un modo examen
- [x] ~~Agregar soporte multi-idioma (EN, ES, DE)~~ ✅ FR, EN, ES disponibles
- [x] ~~Agregar rutas de aprendizaje~~ ✅ 4 rutas: Automatización, CNC, Siemens, VFD/Posicionamiento
- [ ] Crear ejercicios de programación prácticos
- [x] ~~Agregar un simulador G-Code interactivo~~ ✅ Visualización 2D/3D con Three.js

### Enriquecer el contenido educativo

El contenido de las lecciones está definido en `prisma/seed.ts`. Para agregar contenido:

1. Abre el archivo `prisma/seed.ts`
2. Agrega tus lecciones siguiendo la estructura existente
3. Ejecuta `npm run db:seed` para aplicar los cambios

## Licencia

MIT - Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con pasión para la formación en automatización industrial.
