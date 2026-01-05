// Lesson translations for English and Spanish
export const lessonTranslations = {
  en: {
    // Module 1 - Introduction to Automation
    "Qu'est-ce qu'un automate programmable ?": {
      title: "What is a Programmable Logic Controller?",
      description: "Discover what a PLC is and its role in industry",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Welcome to the world of automation!\n\nA **Programmable Logic Controller** (PLC) is a programmable electronic device designed to control industrial processes."
          },
          {
            type: "info",
            content: "The first programmable logic controller was invented in 1968 by Dick Morley for General Motors."
          },
          {
            type: "text",
            content: "## Why use a PLC?\n\n- **Flexibility**: The program can be modified without changing the wiring\n- **Reliability**: Designed to operate 24/7 in industrial environments\n- **Diagnostics**: Detection and reporting of faults\n- **Communication**: Data exchange with other systems"
          },
          {
            type: "diagram",
            title: "Structure of a programmable logic controller",
            content: `┌─────────────────────────────────────────────────────────────┐
│                  PROGRAMMABLE LOGIC CONTROLLER              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ ││
│  │  │         │    │             │    │                 │ ││
│  │  │ INPUTS  │───▶│     CPU     │───▶│    OUTPUTS      │ ││
│  │  │  (I)    │    │  (Program)  │    │      (Q)        │ ││
│  │  │         │    │             │    │                 │ ││
│  │  └─────────┘    └─────────────┘    └─────────────────┘ ││
│  │       ▲               │                    │           ││
│  │       │          ┌────┴────┐               ▼           ││
│  │       │          │ MEMORY  │         ┌─────────┐       ││
│  │       │          └─────────┘         │  POWER  │       ││
│  │       │                              └─────────┘       ││
│  └───────┼──────────────────────────────────────────────┘ │
│          │                                      │          │
└──────────┼──────────────────────────────────────┼──────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  SENSORS    │                      │  ACTUATORS    │
    │ - Buttons   │                      │ - Motors      │
    │ - Detectors │                      │ - Valves      │
    │ - Probes    │                      │ - Indicators  │
    └─────────────┘                      └───────────────┘`
          },
          {
            type: "text",
            content: "## Main components\n\n1. **Central Processing Unit (CPU)**: The brain that executes the program\n2. **Memory**: Stores the program and data\n3. **Inputs**: Receives information from sensors\n4. **Outputs**: Controls actuators\n5. **Power Supply**: Provides electrical energy"
          }
        ]
      })
    },
    "Les entrées et sorties (E/S)": {
      title: "Inputs and Outputs (I/O)",
      description: "Understand the role of inputs and outputs in a PLC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Inputs and Outputs\n\nInputs and outputs (I/O) are the interface between the PLC and the physical world."
          },
          {
            type: "text",
            content: "## Inputs\n\nInputs receive information from **sensors**:\n\n- Push buttons\n- Presence detectors\n- Temperature sensors\n- Limit switches\n- Etc."
          },
          {
            type: "warning",
            content: "Digital inputs (discrete) only know two states: 0 (false) or 1 (true)."
          },
          {
            type: "text",
            content: "## Outputs\n\nOutputs control **actuators**:\n\n- Indicator lights\n- Contactors\n- Solenoid valves\n- Variable speed drives\n- Etc."
          },
          {
            type: "text",
            content: "## Types of I/O\n\n| Type | Description | Example |\n|------|-------------|----------|\n| Digital | On or Off (0 or 1) | Button, indicator |\n| Analog | Continuous value | Temperature, pressure |\n| Communication | Serial data | Encoder, display |"
          }
        ]
      })
    },
    "Le cycle automate": {
      title: "The PLC Scan Cycle",
      description: "Discover how the PLC cycle works",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# The PLC Scan Cycle\n\nThe PLC operates by executing a **repetitive cycle** composed of several phases."
          },
          {
            type: "text",
            content: "## Cycle phases\n\n### 1. Read Inputs\nThe PLC reads the state of all inputs and stores these values in memory.\n\n### 2. Execute Program\nThe CPU executes the user program line by line, from top to bottom.\n\n### 3. Update Outputs\nNew output values are sent to the output modules.\n\n### 4. System Management\nCommunications, diagnostics, etc."
          },
          {
            type: "info",
            content: "The typical scan time is a few milliseconds (5-20 ms). The longer the program, the longer the cycle."
          },
          {
            type: "text",
            content: "## Importance of the cycle\n\n- A fast cycle allows quick reaction to events\n- The program must be optimized to avoid cycles that are too long\n- Some PLCs allow fast tasks for critical events"
          }
        ]
      })
    },
    // Module 2 - Combinational Logic
    "La porte ET (AND)": {
      title: "The AND Gate",
      description: "Learn the AND logic function and its applications",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# The AND Logic Gate\n\nThe AND gate is a fundamental logic function. The output is true (1) **only** if all inputs are true (1)."
          },
          {
            type: "text",
            content: "## Truth Table\n\n| A | B | A AND B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symbols\n\n- Logic symbol: A · B or A ∧ B\n- In programming: A AND B\n- In LADDER: Contacts in series"
          },
          {
            type: "text",
            content: "## Practical Example\n\nA machine only starts if:\n- The START button is pressed **AND**\n- The safety cover is closed **AND**\n- The emergency stop is not engaged\n\n➡️ This is a 3-input AND function!"
          }
        ]
      })
    },
    "La porte OU (OR)": {
      title: "The OR Gate",
      description: "Learn the OR logic function and its applications",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# The OR Logic Gate\n\nThe OR gate gives a true output (1) if **at least one** of the inputs is true (1)."
          },
          {
            type: "text",
            content: "## Truth Table\n\n| A | B | A OR B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symbols\n\n- Logic symbol: A + B or A ∨ B\n- In programming: A OR B\n- In LADDER: Contacts in parallel"
          },
          {
            type: "text",
            content: "## Practical Example\n\nAn alarm light turns on if:\n- Temperature is too high **OR**\n- Pressure is too high **OR**\n- Level is too low\n\n➡️ This is a 3-input OR function!"
          }
        ]
      })
    },
    "La porte NON (NOT)": {
      title: "The NOT Gate",
      description: "Learn the NOT logic function (inversion)",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# The NOT Logic Gate\n\nThe NOT gate **inverts** the input state. If the input is 0, the output is 1 and vice versa."
          },
          {
            type: "text",
            content: "## Truth Table\n\n| A | NOT A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
          },
          {
            type: "text",
            content: "## Symbols\n\n- Logic symbol: Ā or ¬A\n- In programming: NOT A\n- In LADDER: Normally closed contact (NC)"
          },
          {
            type: "info",
            content: "A normally closed contact (NC) is a contact that allows current to flow when it is NOT activated."
          },
          {
            type: "text",
            content: "## Practical Example\n\nThe \"MACHINE STOPPED\" indicator is on when the motor is NOT running.\n\n➡️ Indicator = NOT(Motor_running)"
          }
        ]
      })
    },
    // Module 3 - LADDER Language
    "Introduction au langage LADDER": {
      title: "Introduction to LADDER Language",
      description: "Discover the LADDER graphical programming language",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# The LADDER Language\n\n**LADDER** (ladder in English) is a graphical language that resembles relay electrical diagrams."
          },
          {
            type: "text",
            content: "## Why LADDER?\n\n- Easy to understand for electricians\n- Intuitive visual representation\n- Industrial standard (IEC 61131-3)\n- Ideal for combinational logic"
          },
          {
            type: "text",
            content: "## Structure of a LADDER program\n\n```\n   |     Contact     Contact      Coil      |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- Current \"flows\" from left to right\n- Contacts allow or block current flow\n- Coils are activated if current reaches them"
          },
          {
            type: "text",
            content: "## Basic Elements\n\n| Symbol | Name | Description |\n|---------|-----|-------------|\n| --[ ]-- | NO Contact | Passes if input = 1 |\n| --[/]-- | NC Contact | Passes if input = 0 |\n| --( )-- | Coil | Activated if current arrives |\n| --(/)-- | Inverted Coil | Activated if no current |"
          }
        ]
      })
    },
    "Contacts et bobines": {
      title: "Contacts and Coils",
      description: "Master NO, NC contacts and different types of coils",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Contacts and Coils in LADDER\n\nContacts and coils are the fundamental elements of LADDER programming."
          },
          {
            type: "text",
            content: "## Types of Contacts\n\n### Normally Open Contact (NO)\n```\n--[ ]--\n```\nAllows current to pass when the associated variable is 1.\n\n### Normally Closed Contact (NC)\n```\n--[/]--\n```\nAllows current to pass when the associated variable is 0."
          },
          {
            type: "text",
            content: "## Types of Coils\n\n### Simple Coil\n```\n--( )--\n```\nActivates when current arrives, deactivates otherwise.\n\n### SET Coil (latch)\n```\n--(S)--\n```\nActivates when current arrives and **stays active**.\n\n### RESET Coil\n```\n--(R)--\n```\nDeactivates a SET coil."
          },
          {
            type: "warning",
            content: "Warning: A SET coil remains active even if the condition is no longer true. You must use RESET to deactivate it!"
          }
        ]
      })
    },
    // Module 4 - Sensors and Actuators
    "Les capteurs TOR": {
      title: "Digital Sensors",
      description: "Discover the different types of discrete sensors",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Digital Sensors\n\n**Digital** sensors (discrete) deliver a binary signal: 0 or 1."
          },
          {
            type: "text",
            content: "## Types of Digital Sensors\n\n### Mechanical Sensors\n- **Limit switch**: Detects an extreme position\n- **Push button**: Manually operated\n- **Position switch**: Detects a passage\n\n### Proximity Sensors\n- **Inductive**: Detects metals (non-contact)\n- **Capacitive**: Detects any material\n- **Optical**: Uses a light beam"
          },
          {
            type: "text",
            content: "## Important Characteristics\n\n- **Range**: Detection distance\n- **Switching frequency**: Number of detections per second\n- **Output type**: PNP or NPN\n- **Protection rating**: IP67, IP69K, etc."
          }
        ]
      })
    },
    // Module 1 - Additional lessons
    "Les marques et les fabricants d'automates": {
      title: "PLC Brands and Manufacturers",
      description: "Discover the main PLC manufacturers"
    },
    "L'adressage des E/S": {
      title: "I/O Addressing",
      description: "Understand input/output addressing in PLCs"
    },
    "Sécurité et normes industrielles": {
      title: "Safety and Industrial Standards",
      description: "Learn safety standards in industrial automation"
    },
    "Communication et réseaux industriels": {
      title: "Communication and Industrial Networks",
      description: "Discover industrial communication protocols"
    },
    // Module 2 - Additional lessons
    "Les portes NAND et NOR": {
      title: "NAND and NOR Gates",
      description: "Learn universal logic gates"
    },
    "La porte XOR (OU exclusif)": {
      title: "The XOR Gate (Exclusive OR)",
      description: "Learn the exclusive OR function"
    },
    "Simplification des équations logiques": {
      title: "Simplifying Logic Equations",
      description: "Learn Boolean algebra techniques"
    },
    "Tableaux de Karnaugh": {
      title: "Karnaugh Maps",
      description: "Graphical method for simplifying logic"
    },
    // Module 3 - Additional lessons
    "Circuit marche/arrêt avec auto-maintien": {
      title: "Start/Stop Circuit with Self-Holding",
      description: "Learn how to create latching circuits"
    },
    "Les temporisateurs": {
      title: "Timers",
      description: "Master different timer types in PLCs"
    },
    "Les compteurs": {
      title: "Counters",
      description: "Learn to use up/down counters"
    },
    "Détection de fronts": {
      title: "Edge Detection",
      description: "Detect rising and falling edges"
    },
    "Blocs fonctionnels et réutilisation": {
      title: "Function Blocks and Reuse",
      description: "Create reusable function blocks"
    },
    // Module 4 - Additional lessons
    "Les capteurs analogiques": {
      title: "Analog Sensors",
      description: "Understand analog sensors and signals"
    },
    "PNP vs NPN : comprendre les sorties": {
      title: "PNP vs NPN: Understanding Outputs",
      description: "Learn the difference between PNP and NPN"
    },
    "Les actionneurs électriques": {
      title: "Electrical Actuators",
      description: "Discover motors, contactors, and drives"
    },
    "Les actionneurs pneumatiques": {
      title: "Pneumatic Actuators",
      description: "Learn about pneumatic cylinders and valves"
    },
    "Câblage et mise en service": {
      title: "Wiring and Commissioning",
      description: "Wire and commission an automated system"
    },
    // Module 5 - GRAFCET
    "Introduction au GRAFCET": {
      title: "Introduction to GRAFCET",
      description: "Discover GRAFCET for modeling sequential systems",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# GRAFCET\n\n**GRAFCET** (Sequential Function Chart) is a modeling tool for sequential automated systems."
          },
          {
            type: "text",
            content: "## Basic Elements\n\n### Steps\nRepresented by numbered squares. Each step corresponds to a state of the system.\n\n### Transitions\nLogical conditions between steps. When the condition is true, we move to the next step.\n\n### Actions\nWhat the system does in each step (activate a motor, open a valve, etc.)."
          },
          {
            type: "text",
            content: "## Evolution Rules\n\n1. The initial step is active at startup\n2. A transition is crossable if the previous step is active AND the condition is true\n3. Crossing deactivates the previous step and activates the next one\n4. Multiple simultaneous transitions are possible (divergence/convergence)"
          },
          {
            type: "info",
            content: "GRAFCET is standardized (IEC 60848) and widely used in industry."
          }
        ]
      })
    },
    // Module 5 - Additional lessons
    "Étapes et transitions": {
      title: "Steps and Transitions",
      description: "Master GRAFCET steps and transitions"
    },
    "Les différents types d'actions": {
      title: "Different Types of Actions",
      description: "Learn about continuous, conditional and stored actions"
    },
    "Divergences et convergences": {
      title: "Divergences and Convergences",
      description: "Create parallel and alternative branches"
    },
    "Macro-étapes et sous-programmes": {
      title: "Macro-steps and Subroutines",
      description: "Structure complex sequences"
    },
    "Traduction GRAFCET vers LADDER": {
      title: "GRAFCET to LADDER Translation",
      description: "Convert GRAFCET to LADDER code"
    },
    "Exemple complet : système de remplissage": {
      title: "Complete Example: Filling System",
      description: "Apply GRAFCET to a real system"
    }
  },
  es: {
    // Module 1 - Introduction to Automation
    "Qu'est-ce qu'un automate programmable ?": {
      title: "¿Qué es un controlador lógico programable?",
      description: "Descubra qué es un PLC y su papel en la industria",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# ¡Bienvenido al mundo de la automatización!\n\nUn **Controlador Lógico Programable** (PLC) es un dispositivo electrónico programable diseñado para controlar procesos industriales."
          },
          {
            type: "info",
            content: "El primer controlador lógico programable fue inventado en 1968 por Dick Morley para General Motors."
          },
          {
            type: "text",
            content: "## ¿Por qué usar un PLC?\n\n- **Flexibilidad**: El programa puede modificarse sin cambiar el cableado\n- **Fiabilidad**: Diseñado para funcionar 24/7 en entornos industriales\n- **Diagnósticos**: Detección y reporte de fallos\n- **Comunicación**: Intercambio de datos con otros sistemas"
          },
          {
            type: "diagram",
            title: "Estructura de un controlador lógico programable",
            content: `┌─────────────────────────────────────────────────────────────┐
│                CONTROLADOR LÓGICO PROGRAMABLE               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ ││
│  │  │         │    │             │    │                 │ ││
│  │  │ENTRADAS │───▶│     CPU     │───▶│    SALIDAS      │ ││
│  │  │  (I)    │    │ (Programa)  │    │      (Q)        │ ││
│  │  │         │    │             │    │                 │ ││
│  │  └─────────┘    └─────────────┘    └─────────────────┘ ││
│  │       ▲               │                    │           ││
│  │       │          ┌────┴────┐               ▼           ││
│  │       │          │ MEMORIA │         ┌─────────┐       ││
│  │       │          └─────────┘         │ ALIMENT.│       ││
│  │       │                              └─────────┘       ││
│  └───────┼──────────────────────────────────────────────┘ │
│          │                                      │          │
└──────────┼──────────────────────────────────────┼──────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  SENSORES   │                      │  ACTUADORES   │
    │ - Botones   │                      │ - Motores     │
    │ - Detectores│                      │ - Válvulas    │
    │ - Sondas    │                      │ - Indicadores │
    └─────────────┘                      └───────────────┘`
          },
          {
            type: "text",
            content: "## Componentes principales\n\n1. **Unidad Central de Procesamiento (CPU)**: El cerebro que ejecuta el programa\n2. **Memoria**: Almacena el programa y los datos\n3. **Entradas**: Recibe información de los sensores\n4. **Salidas**: Controla los actuadores\n5. **Fuente de alimentación**: Proporciona energía eléctrica"
          }
        ]
      })
    },
    "Les entrées et sorties (E/S)": {
      title: "Entradas y Salidas (E/S)",
      description: "Comprenda el papel de las entradas y salidas en un PLC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Entradas y Salidas\n\nLas entradas y salidas (E/S) son la interfaz entre el PLC y el mundo físico."
          },
          {
            type: "text",
            content: "## Entradas\n\nLas entradas reciben información de los **sensores**:\n\n- Pulsadores\n- Detectores de presencia\n- Sensores de temperatura\n- Finales de carrera\n- Etc."
          },
          {
            type: "warning",
            content: "Las entradas digitales (discretas) solo conocen dos estados: 0 (falso) o 1 (verdadero)."
          },
          {
            type: "text",
            content: "## Salidas\n\nLas salidas controlan los **actuadores**:\n\n- Luces indicadoras\n- Contactores\n- Electroválvulas\n- Variadores de velocidad\n- Etc."
          },
          {
            type: "text",
            content: "## Tipos de E/S\n\n| Tipo | Descripción | Ejemplo |\n|------|-------------|----------|\n| Digital | Encendido o Apagado (0 o 1) | Botón, indicador |\n| Analógica | Valor continuo | Temperatura, presión |\n| Comunicación | Datos serie | Encoder, display |"
          }
        ]
      })
    },
    "Le cycle automate": {
      title: "El ciclo de escaneo del PLC",
      description: "Descubra cómo funciona el ciclo del PLC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# El ciclo de escaneo del PLC\n\nEl PLC opera ejecutando un **ciclo repetitivo** compuesto por varias fases."
          },
          {
            type: "text",
            content: "## Fases del ciclo\n\n### 1. Lectura de entradas\nEl PLC lee el estado de todas las entradas y almacena estos valores en memoria.\n\n### 2. Ejecución del programa\nLa CPU ejecuta el programa de usuario línea por línea, de arriba a abajo.\n\n### 3. Actualización de salidas\nLos nuevos valores de salida se envían a los módulos de salida.\n\n### 4. Gestión del sistema\nComunicaciones, diagnósticos, etc."
          },
          {
            type: "info",
            content: "El tiempo de ciclo típico es de unos pocos milisegundos (5-20 ms). Cuanto más largo es el programa, más largo es el ciclo."
          },
          {
            type: "text",
            content: "## Importancia del ciclo\n\n- Un ciclo rápido permite reaccionar rápidamente a los eventos\n- El programa debe optimizarse para evitar ciclos demasiado largos\n- Algunos PLCs permiten tareas rápidas para eventos críticos"
          }
        ]
      })
    },
    // Module 2 - Combinational Logic
    "La porte ET (AND)": {
      title: "La puerta AND",
      description: "Aprenda la función lógica AND y sus aplicaciones",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La puerta lógica AND\n\nLa puerta AND es una función lógica fundamental. La salida es verdadera (1) **solo** si todas las entradas son verdaderas (1)."
          },
          {
            type: "text",
            content: "## Tabla de verdad\n\n| A | B | A AND B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Símbolos\n\n- Símbolo lógico: A · B o A ∧ B\n- En programación: A AND B\n- En LADDER: Contactos en serie"
          },
          {
            type: "text",
            content: "## Ejemplo práctico\n\nUna máquina solo arranca si:\n- El botón START está presionado **Y**\n- La cubierta de seguridad está cerrada **Y**\n- La parada de emergencia no está activada\n\n➡️ ¡Es una función AND de 3 entradas!"
          }
        ]
      })
    },
    "La porte OU (OR)": {
      title: "La puerta OR",
      description: "Aprenda la función lógica OR y sus aplicaciones",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La puerta lógica OR\n\nLa puerta OR da una salida verdadera (1) si **al menos una** de las entradas es verdadera (1)."
          },
          {
            type: "text",
            content: "## Tabla de verdad\n\n| A | B | A OR B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Símbolos\n\n- Símbolo lógico: A + B o A ∨ B\n- En programación: A OR B\n- En LADDER: Contactos en paralelo"
          },
          {
            type: "text",
            content: "## Ejemplo práctico\n\nUna luz de alarma se enciende si:\n- La temperatura es muy alta **O**\n- La presión es muy alta **O**\n- El nivel es muy bajo\n\n➡️ ¡Es una función OR de 3 entradas!"
          }
        ]
      })
    },
    "La porte NON (NOT)": {
      title: "La puerta NOT",
      description: "Aprenda la función lógica NOT (inversión)",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La puerta lógica NOT\n\nLa puerta NOT **invierte** el estado de la entrada. Si la entrada es 0, la salida es 1 y viceversa."
          },
          {
            type: "text",
            content: "## Tabla de verdad\n\n| A | NOT A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
          },
          {
            type: "text",
            content: "## Símbolos\n\n- Símbolo lógico: Ā o ¬A\n- En programación: NOT A\n- En LADDER: Contacto normalmente cerrado (NC)"
          },
          {
            type: "info",
            content: "Un contacto normalmente cerrado (NC) es un contacto que permite el paso de corriente cuando NO está activado."
          },
          {
            type: "text",
            content: "## Ejemplo práctico\n\nEl indicador \"MÁQUINA DETENIDA\" está encendido cuando el motor NO está funcionando.\n\n➡️ Indicador = NOT(Motor_funcionando)"
          }
        ]
      })
    },
    // Module 3 - LADDER Language
    "Introduction au langage LADDER": {
      title: "Introducción al lenguaje LADDER",
      description: "Descubra el lenguaje de programación gráfico LADDER",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# El lenguaje LADDER\n\n**LADDER** (escalera en inglés) es un lenguaje gráfico que se asemeja a los diagramas eléctricos de relés."
          },
          {
            type: "text",
            content: "## ¿Por qué LADDER?\n\n- Fácil de entender para electricistas\n- Representación visual intuitiva\n- Estándar industrial (IEC 61131-3)\n- Ideal para lógica combinacional"
          },
          {
            type: "text",
            content: "## Estructura de un programa LADDER\n\n```\n   |     Contacto   Contacto      Bobina    |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- La corriente \"fluye\" de izquierda a derecha\n- Los contactos permiten o bloquean el flujo de corriente\n- Las bobinas se activan si la corriente llega a ellas"
          },
          {
            type: "text",
            content: "## Elementos básicos\n\n| Símbolo | Nombre | Descripción |\n|---------|-----|-------------|\n| --[ ]-- | Contacto NA | Pasa si entrada = 1 |\n| --[/]-- | Contacto NC | Pasa si entrada = 0 |\n| --( )-- | Bobina | Activada si llega corriente |\n| --(/)-- | Bobina invertida | Activada si no hay corriente |"
          }
        ]
      })
    },
    "Contacts et bobines": {
      title: "Contactos y bobinas",
      description: "Domine los contactos NA, NC y los diferentes tipos de bobinas",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Contactos y bobinas en LADDER\n\nLos contactos y las bobinas son los elementos fundamentales de la programación LADDER."
          },
          {
            type: "text",
            content: "## Tipos de contactos\n\n### Contacto Normalmente Abierto (NA)\n```\n--[ ]--\n```\nPermite el paso de corriente cuando la variable asociada es 1.\n\n### Contacto Normalmente Cerrado (NC)\n```\n--[/]--\n```\nPermite el paso de corriente cuando la variable asociada es 0."
          },
          {
            type: "text",
            content: "## Tipos de bobinas\n\n### Bobina simple\n```\n--( )--\n```\nSe activa cuando llega corriente, se desactiva en caso contrario.\n\n### Bobina SET (enclavamiento)\n```\n--(S)--\n```\nSe activa cuando llega corriente y **permanece activa**.\n\n### Bobina RESET\n```\n--(R)--\n```\nDesactiva una bobina SET."
          },
          {
            type: "warning",
            content: "¡Atención: Una bobina SET permanece activa incluso si la condición ya no es verdadera. ¡Debe usar RESET para desactivarla!"
          }
        ]
      })
    },
    // Module 4 - Sensors and Actuators
    "Les capteurs TOR": {
      title: "Sensores digitales",
      description: "Descubra los diferentes tipos de sensores discretos",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sensores digitales\n\nLos sensores **digitales** (discretos) entregan una señal binaria: 0 o 1."
          },
          {
            type: "text",
            content: "## Tipos de sensores digitales\n\n### Sensores mecánicos\n- **Final de carrera**: Detecta una posición extrema\n- **Pulsador**: Operado manualmente\n- **Interruptor de posición**: Detecta un paso\n\n### Sensores de proximidad\n- **Inductivo**: Detecta metales (sin contacto)\n- **Capacitivo**: Detecta cualquier material\n- **Óptico**: Usa un haz de luz"
          },
          {
            type: "text",
            content: "## Características importantes\n\n- **Alcance**: Distancia de detección\n- **Frecuencia de conmutación**: Número de detecciones por segundo\n- **Tipo de salida**: PNP o NPN\n- **Grado de protección**: IP67, IP69K, etc."
          }
        ]
      })
    },
    // Module 5 - GRAFCET
    "Introduction au GRAFCET": {
      title: "Introducción al GRAFCET",
      description: "Descubra el GRAFCET para modelar sistemas secuenciales",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# GRAFCET\n\n**GRAFCET** (Gráfico Funcional de Control Etapa-Transición) es una herramienta de modelado para sistemas automatizados secuenciales."
          },
          {
            type: "text",
            content: "## Elementos básicos\n\n### Etapas\nRepresentadas por cuadrados numerados. Cada etapa corresponde a un estado del sistema.\n\n### Transiciones\nCondiciones lógicas entre etapas. Cuando la condición es verdadera, pasamos a la siguiente etapa.\n\n### Acciones\nLo que hace el sistema en cada etapa (activar un motor, abrir una válvula, etc.)."
          },
          {
            type: "text",
            content: "## Reglas de evolución\n\n1. La etapa inicial está activa al inicio\n2. Una transición es franqueable si la etapa anterior está activa Y la condición es verdadera\n3. El franqueo desactiva la etapa anterior y activa la siguiente\n4. Son posibles múltiples transiciones simultáneas (divergencia/convergencia)"
          },
          {
            type: "info",
            content: "El GRAFCET está normalizado (IEC 60848) y es ampliamente utilizado en la industria."
          }
        ]
      })
    },
    // Module 1 - Additional lessons
    "Les marques et les fabricants d'automates": {
      title: "Marcas y fabricantes de PLCs",
      description: "Descubra los principales fabricantes de PLCs"
    },
    "L'adressage des E/S": {
      title: "Direccionamiento de E/S",
      description: "Comprenda el direccionamiento de entradas/salidas"
    },
    "Sécurité et normes industrielles": {
      title: "Seguridad y normas industriales",
      description: "Aprenda las normas de seguridad en automatización"
    },
    "Communication et réseaux industriels": {
      title: "Comunicación y redes industriales",
      description: "Descubra los protocolos de comunicación industrial"
    },
    // Module 2 - Additional lessons
    "Les portes NAND et NOR": {
      title: "Puertas NAND y NOR",
      description: "Aprenda las puertas lógicas universales"
    },
    "La porte XOR (OU exclusif)": {
      title: "La puerta XOR (O exclusivo)",
      description: "Aprenda la función O exclusivo"
    },
    "Simplification des équations logiques": {
      title: "Simplificación de ecuaciones lógicas",
      description: "Aprenda técnicas de álgebra booleana"
    },
    "Tableaux de Karnaugh": {
      title: "Mapas de Karnaugh",
      description: "Método gráfico para simplificar lógica"
    },
    // Module 3 - Additional lessons
    "Circuit marche/arrêt avec auto-maintien": {
      title: "Circuito marcha/paro con autoenclavamiento",
      description: "Aprenda a crear circuitos enclavados"
    },
    "Les temporisateurs": {
      title: "Temporizadores",
      description: "Domine los diferentes tipos de temporizadores"
    },
    "Les compteurs": {
      title: "Contadores",
      description: "Aprenda a usar contadores ascendentes/descendentes"
    },
    "Détection de fronts": {
      title: "Detección de flancos",
      description: "Detecte flancos ascendentes y descendentes"
    },
    "Blocs fonctionnels et réutilisation": {
      title: "Bloques funcionales y reutilización",
      description: "Cree bloques de función reutilizables"
    },
    // Module 4 - Additional lessons
    "Les capteurs analogiques": {
      title: "Sensores analógicos",
      description: "Comprenda los sensores y señales analógicas"
    },
    "PNP vs NPN : comprendre les sorties": {
      title: "PNP vs NPN: Entender las salidas",
      description: "Aprenda la diferencia entre PNP y NPN"
    },
    "Les actionneurs électriques": {
      title: "Actuadores eléctricos",
      description: "Descubra motores, contactores y variadores"
    },
    "Les actionneurs pneumatiques": {
      title: "Actuadores neumáticos",
      description: "Aprenda sobre cilindros y válvulas neumáticas"
    },
    "Câblage et mise en service": {
      title: "Cableado y puesta en marcha",
      description: "Cablee y ponga en marcha un sistema automatizado"
    },
    // Module 5 - Additional lessons
    "Étapes et transitions": {
      title: "Etapas y transiciones",
      description: "Domine las etapas y transiciones del GRAFCET"
    },
    "Les différents types d'actions": {
      title: "Los diferentes tipos de acciones",
      description: "Aprenda acciones continuas, condicionales y memorizadas"
    },
    "Divergences et convergences": {
      title: "Divergencias y convergencias",
      description: "Cree ramas paralelas y alternativas"
    },
    "Macro-étapes et sous-programmes": {
      title: "Macro-etapas y subprogramas",
      description: "Estructure secuencias complejas"
    },
    "Traduction GRAFCET vers LADDER": {
      title: "Traducción GRAFCET a LADDER",
      description: "Convierta GRAFCET a código LADDER"
    },
    "Exemple complet : système de remplissage": {
      title: "Ejemplo completo: sistema de llenado",
      description: "Aplique GRAFCET a un sistema real"
    }
  }
}

// CNC Module translations for English and Spanish
export const cncLessonTranslations = {
  en: {
    // Module 6 - Introduction to CNC
    "Qu'est-ce qu'une machine CNC ?": {
      title: "What is a CNC Machine?",
      description: "Discover the basics of Computer Numerical Control machines",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# CNC Machines\n\nA **CNC machine** (Computer Numerical Control) is a manufacturing tool controlled by a computer program. It automates the machining of parts with high precision."
          },
          {
            type: "info",
            content: "The first CNC machines appeared in the 1950s, revolutionizing the manufacturing industry."
          },
          {
            type: "text",
            content: "## How does it work?\n\nThe CNC machine follows instructions written in **G-code**, a standardized programming language. These instructions control:\n\n- Tool movements along different axes\n- Spindle rotation speed\n- Feed rate\n- Tool changes"
          },
          {
            type: "text",
            content: "## Advantages of CNC\n\n- **Precision**: Tolerances of a few hundredths of a millimeter\n- **Repeatability**: Identical parts every time\n- **Productivity**: Continuous operation 24/7\n- **Complexity**: Possible machining of complex shapes"
          }
        ]
      })
    },
    "Types de machines CNC": {
      title: "Types of CNC Machines",
      description: "Discover the different types of CNC machines and their applications",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Types of CNC Machines\n\nThere are many types of CNC machines, each designed for specific applications."
          },
          {
            type: "text",
            content: "## CNC Milling Machine\n\nThe milling machine uses a rotating tool that removes material. It can:\n- Machine flat surfaces\n- Create grooves and pockets\n- Drill holes\n- Make complex 3D shapes"
          },
          {
            type: "text",
            content: "## CNC Lathe\n\nThe lathe rotates the part while the tool removes material. Ideal for:\n- Cylindrical parts\n- Threads\n- Cones and spheres\n- Interior and exterior machining"
          },
          {
            type: "text",
            content: "## Other Types\n\n| Machine | Application |\n|---------|-------------|\n| Laser cutter | Precision cutting of sheets |\n| Plasma cutter | Cutting thick metal |\n| EDM | Hard material machining |\n| 3D printer | Additive manufacturing |"
          }
        ]
      })
    },
    // Module 7 - G-Code Programming
    "Structure d'un programme G-Code": {
      title: "Structure of a G-Code Program",
      description: "Learn how a CNC program is organized",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# G-Code Program Structure\n\nA G-code program is a series of instructions that tell the CNC machine what to do."
          },
          {
            type: "text",
            content: "## Lines and Blocks\n\nEach line of a program is called a **block**. A block can contain:\n\n- A line number (N)\n- Preparatory codes (G)\n- Coordinates (X, Y, Z)\n- Feed rate (F)\n- Spindle speed (S)\n- Tool (T)\n- Miscellaneous function (M)"
          },
          {
            type: "text",
            content: "## Example Program\n\n```gcode\nN10 G21 G90       ; Metric mode, absolute\nN20 G0 X0 Y0 Z10  ; Rapid positioning\nN30 M3 S1500      ; Spindle ON, 1500 RPM\nN40 G1 Z-5 F100   ; Plunge at 100 mm/min\nN50 G1 X50 F200   ; Linear move\nN60 G0 Z10        ; Retract\nN70 M5            ; Spindle OFF\nN80 M30           ; End of program\n```"
          },
          {
            type: "info",
            content: "Comments are usually indicated by a semicolon (;) or parentheses."
          }
        ]
      })
    },
    "Codes G et M essentiels": {
      title: "Essential G and M Codes",
      description: "Master the fundamental codes for CNC programming",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Essential G and M Codes\n\nG codes (Preparatory) and M codes (Miscellaneous) are the basis of CNC programming."
          },
          {
            type: "text",
            content: "## Main G Codes\n\n| Code | Function |\n|------|----------|\n| G0 | Rapid positioning |\n| G1 | Linear interpolation |\n| G2 | Circular interpolation CW |\n| G3 | Circular interpolation CCW |\n| G17 | XY plane selection |\n| G20 | Inch mode |\n| G21 | Metric mode |\n| G28 | Return to home |\n| G90 | Absolute mode |\n| G91 | Incremental mode |"
          },
          {
            type: "text",
            content: "## Main M Codes\n\n| Code | Function |\n|------|----------|\n| M0 | Program stop |\n| M3 | Spindle ON (CW) |\n| M4 | Spindle ON (CCW) |\n| M5 | Spindle OFF |\n| M6 | Tool change |\n| M8 | Coolant ON |\n| M9 | Coolant OFF |\n| M30 | End of program |"
          },
          {
            type: "warning",
            content: "Codes may vary slightly between machine manufacturers. Always check the specific documentation."
          }
        ]
      })
    },
    // Module 8 - Axes and Interpolation
    "Système de coordonnées": {
      title: "Coordinate System",
      description: "Understand the coordinate system used in CNC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# CNC Coordinate System\n\nCNC machines use a **Cartesian** coordinate system to position the tool relative to the part."
          },
          {
            type: "text",
            content: "## The Three Main Axes\n\n- **X axis**: Horizontal movement (left/right)\n- **Y axis**: Horizontal movement (forward/backward)\n- **Z axis**: Vertical movement (up/down)\n\nThe positive direction of Z is generally toward the spindle."
          },
          {
            type: "text",
            content: "## Reference Points\n\n### Machine Origin (M)\nFixed physical point on the machine.\n\n### Work Origin (W)\nReference point for the part, defined by the programmer.\n\n### Tool Position (T)\nPoint controlled by the program, usually the tool tip."
          },
          {
            type: "info",
            content: "On 5-axis machines, rotational axes A, B, and C are added to the linear axes X, Y, Z."
          }
        ]
      })
    },
    "Interpolation linéaire et circulaire": {
      title: "Linear and Circular Interpolation",
      description: "Master G0, G1, G2, G3 tool movements",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Tool Interpolation\n\nInterpolation is the calculated movement between two points. The CNC controller calculates all intermediate positions."
          },
          {
            type: "text",
            content: "## Rapid Positioning (G0)\n\n```gcode\nG0 X100 Y50 Z10\n```\n\nThe machine moves as fast as possible in a straight line. **No material removal** during G0!"
          },
          {
            type: "text",
            content: "## Linear Interpolation (G1)\n\n```gcode\nG1 X100 Y50 F200\n```\n\nControlled movement in a straight line at the specified feed rate (F). Used for machining."
          },
          {
            type: "text",
            content: "## Circular Interpolation\n\n```gcode\nG2 X50 Y50 I25 J0  ; Clockwise arc\nG3 X50 Y50 I25 J0  ; Counter-clockwise arc\n```\n\n- **G2**: Clockwise\n- **G3**: Counter-clockwise\n- **I, J, K**: Arc center offset (relative to start point)"
          },
          {
            type: "warning",
            content: "Always verify the feed rate before machining. A rate that is too high can damage the tool or the part!"
          }
        ]
      })
    }
  },
  es: {
    // Module 6 - Introduction to CNC
    "Qu'est-ce qu'une machine CNC ?": {
      title: "¿Qué es una máquina CNC?",
      description: "Descubra los fundamentos de las máquinas de Control Numérico Computarizado",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Máquinas CNC\n\nUna **máquina CNC** (Control Numérico Computarizado) es una herramienta de fabricación controlada por un programa de computadora. Automatiza el mecanizado de piezas con alta precisión."
          },
          {
            type: "info",
            content: "Las primeras máquinas CNC aparecieron en la década de 1950, revolucionando la industria manufacturera."
          },
          {
            type: "text",
            content: "## ¿Cómo funciona?\n\nLa máquina CNC sigue instrucciones escritas en **código G**, un lenguaje de programación estandarizado. Estas instrucciones controlan:\n\n- Movimientos de la herramienta en diferentes ejes\n- Velocidad de rotación del husillo\n- Velocidad de avance\n- Cambios de herramienta"
          },
          {
            type: "text",
            content: "## Ventajas del CNC\n\n- **Precisión**: Tolerancias de unas centésimas de milímetro\n- **Repetibilidad**: Piezas idénticas cada vez\n- **Productividad**: Funcionamiento continuo 24/7\n- **Complejidad**: Mecanizado posible de formas complejas"
          }
        ]
      })
    },
    "Types de machines CNC": {
      title: "Tipos de máquinas CNC",
      description: "Descubra los diferentes tipos de máquinas CNC y sus aplicaciones",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Tipos de máquinas CNC\n\nExisten muchos tipos de máquinas CNC, cada una diseñada para aplicaciones específicas."
          },
          {
            type: "text",
            content: "## Fresadora CNC\n\nLa fresadora utiliza una herramienta giratoria que elimina material. Puede:\n- Mecanizar superficies planas\n- Crear ranuras y cavidades\n- Taladrar agujeros\n- Hacer formas 3D complejas"
          },
          {
            type: "text",
            content: "## Torno CNC\n\nEl torno hace girar la pieza mientras la herramienta elimina material. Ideal para:\n- Piezas cilíndricas\n- Roscas\n- Conos y esferas\n- Mecanizado interior y exterior"
          },
          {
            type: "text",
            content: "## Otros tipos\n\n| Máquina | Aplicación |\n|---------|-------------|\n| Corte láser | Corte de precisión de chapas |\n| Corte plasma | Corte de metal grueso |\n| Electroerosión | Mecanizado de material duro |\n| Impresora 3D | Fabricación aditiva |"
          }
        ]
      })
    },
    // Module 7 - G-Code Programming
    "Structure d'un programme G-Code": {
      title: "Estructura de un programa G-Code",
      description: "Aprenda cómo se organiza un programa CNC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Estructura de un programa G-Code\n\nUn programa G-code es una serie de instrucciones que le dicen a la máquina CNC qué hacer."
          },
          {
            type: "text",
            content: "## Líneas y bloques\n\nCada línea de un programa se llama **bloque**. Un bloque puede contener:\n\n- Un número de línea (N)\n- Códigos preparatorios (G)\n- Coordenadas (X, Y, Z)\n- Velocidad de avance (F)\n- Velocidad del husillo (S)\n- Herramienta (T)\n- Función auxiliar (M)"
          },
          {
            type: "text",
            content: "## Programa de ejemplo\n\n```gcode\nN10 G21 G90       ; Modo métrico, absoluto\nN20 G0 X0 Y0 Z10  ; Posicionamiento rápido\nN30 M3 S1500      ; Husillo ON, 1500 RPM\nN40 G1 Z-5 F100   ; Penetración a 100 mm/min\nN50 G1 X50 F200   ; Movimiento lineal\nN60 G0 Z10        ; Retracción\nN70 M5            ; Husillo OFF\nN80 M30           ; Fin del programa\n```"
          },
          {
            type: "info",
            content: "Los comentarios generalmente se indican con un punto y coma (;) o paréntesis."
          }
        ]
      })
    },
    "Codes G et M essentiels": {
      title: "Códigos G y M esenciales",
      description: "Domine los códigos fundamentales para la programación CNC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Códigos G y M esenciales\n\nLos códigos G (Preparatorios) y códigos M (Auxiliares) son la base de la programación CNC."
          },
          {
            type: "text",
            content: "## Principales códigos G\n\n| Código | Función |\n|------|----------|\n| G0 | Posicionamiento rápido |\n| G1 | Interpolación lineal |\n| G2 | Interpolación circular horaria |\n| G3 | Interpolación circular antihoraria |\n| G17 | Selección plano XY |\n| G20 | Modo pulgadas |\n| G21 | Modo métrico |\n| G28 | Retorno a origen |\n| G90 | Modo absoluto |\n| G91 | Modo incremental |"
          },
          {
            type: "text",
            content: "## Principales códigos M\n\n| Código | Función |\n|------|----------|\n| M0 | Parada del programa |\n| M3 | Husillo ON (horario) |\n| M4 | Husillo ON (antihorario) |\n| M5 | Husillo OFF |\n| M6 | Cambio de herramienta |\n| M8 | Refrigerante ON |\n| M9 | Refrigerante OFF |\n| M30 | Fin del programa |"
          },
          {
            type: "warning",
            content: "Los códigos pueden variar ligeramente entre fabricantes de máquinas. Siempre verifique la documentación específica."
          }
        ]
      })
    },
    // Module 8 - Axes and Interpolation
    "Système de coordonnées": {
      title: "Sistema de coordenadas",
      description: "Comprenda el sistema de coordenadas utilizado en CNC",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sistema de coordenadas CNC\n\nLas máquinas CNC utilizan un sistema de coordenadas **cartesiano** para posicionar la herramienta respecto a la pieza."
          },
          {
            type: "text",
            content: "## Los tres ejes principales\n\n- **Eje X**: Movimiento horizontal (izquierda/derecha)\n- **Eje Y**: Movimiento horizontal (adelante/atrás)\n- **Eje Z**: Movimiento vertical (arriba/abajo)\n\nLa dirección positiva de Z generalmente es hacia el husillo."
          },
          {
            type: "text",
            content: "## Puntos de referencia\n\n### Origen máquina (M)\nPunto físico fijo en la máquina.\n\n### Origen pieza (W)\nPunto de referencia para la pieza, definido por el programador.\n\n### Posición herramienta (T)\nPunto controlado por el programa, generalmente la punta de la herramienta."
          },
          {
            type: "info",
            content: "En máquinas de 5 ejes, los ejes de rotación A, B y C se añaden a los ejes lineales X, Y, Z."
          }
        ]
      })
    },
    "Interpolation linéaire et circulaire": {
      title: "Interpolación lineal y circular",
      description: "Domine los movimientos de herramienta G0, G1, G2, G3",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Interpolación de herramienta\n\nLa interpolación es el movimiento calculado entre dos puntos. El controlador CNC calcula todas las posiciones intermedias."
          },
          {
            type: "text",
            content: "## Posicionamiento rápido (G0)\n\n```gcode\nG0 X100 Y50 Z10\n```\n\nLa máquina se mueve lo más rápido posible en línea recta. ¡**Sin arranque de material** durante G0!"
          },
          {
            type: "text",
            content: "## Interpolación lineal (G1)\n\n```gcode\nG1 X100 Y50 F200\n```\n\nMovimiento controlado en línea recta a la velocidad de avance especificada (F). Utilizado para mecanizado."
          },
          {
            type: "text",
            content: "## Interpolación circular\n\n```gcode\nG2 X50 Y50 I25 J0  ; Arco horario\nG3 X50 Y50 I25 J0  ; Arco antihorario\n```\n\n- **G2**: Sentido horario\n- **G3**: Sentido antihorario\n- **I, J, K**: Desplazamiento del centro del arco (relativo al punto inicial)"
          },
          {
            type: "warning",
            content: "¡Siempre verifique la velocidad de avance antes de mecanizar. Una velocidad demasiado alta puede dañar la herramienta o la pieza!"
          }
        ]
      })
    }
  }
}

// CNC Quiz translations
export const cncQuizTranslations = {
  en: {
    "Que signifie CNC ?": {
      question: "What does CNC stand for?",
      options: ["Computer Numerical Control", "Central Numeric Computer", "Controlled Numeric Cutting", "Computer Network Control"],
      explanation: "CNC stands for Computer Numerical Control."
    },
    "Quel est l'avantage principal d'une machine CNC ?": {
      question: "What is the main advantage of a CNC machine?",
      options: ["It's cheaper", "High precision and repeatability", "It doesn't need electricity", "It's smaller"],
      explanation: "CNC machines offer high precision (hundredths of a millimeter) and can produce identical parts repeatedly."
    },
    "Quelle machine est idéale pour les pièces cylindriques ?": {
      question: "Which machine is ideal for cylindrical parts?",
      options: ["Milling machine", "CNC Lathe", "Laser cutter", "3D printer"],
      explanation: "The lathe rotates the part and is ideal for machining cylindrical shapes."
    },
    "Quel code est utilisé pour le positionnement rapide ?": {
      question: "Which code is used for rapid positioning?",
      options: ["G1", "G0", "M3", "G2"],
      explanation: "G0 is the rapid positioning code. It moves the tool as fast as possible without machining."
    },
    "Que fait le code M3 ?": {
      question: "What does the M3 code do?",
      options: ["Stops the program", "Turns the spindle ON clockwise", "Activates coolant", "Moves the Z axis"],
      explanation: "M3 turns the spindle ON in the clockwise direction."
    },
    "Quel est l'axe vertical sur une fraiseuse CNC ?": {
      question: "What is the vertical axis on a CNC milling machine?",
      options: ["X axis", "Y axis", "Z axis", "A axis"],
      explanation: "The Z axis is the vertical axis (up/down movement)."
    },
    "Que fait le code G1 ?": {
      question: "What does the G1 code do?",
      options: ["Rapid move", "Linear interpolation at controlled speed", "Circular move", "Program stop"],
      explanation: "G1 performs linear interpolation at a controlled feed rate, used for machining."
    },
    "G2 effectue une interpolation circulaire dans quel sens ?": {
      question: "G2 performs circular interpolation in which direction?",
      options: ["Counter-clockwise", "Clockwise", "Vertical", "Depends on the machine"],
      explanation: "G2 performs clockwise circular interpolation. G3 is for counter-clockwise."
    }
  },
  es: {
    "Que signifie CNC ?": {
      question: "¿Qué significa CNC?",
      options: ["Control Numérico Computarizado", "Computadora Numérica Central", "Corte Numérico Controlado", "Control de Red de Computadoras"],
      explanation: "CNC significa Control Numérico Computarizado."
    },
    "Quel est l'avantage principal d'une machine CNC ?": {
      question: "¿Cuál es la principal ventaja de una máquina CNC?",
      options: ["Es más barata", "Alta precisión y repetibilidad", "No necesita electricidad", "Es más pequeña"],
      explanation: "Las máquinas CNC ofrecen alta precisión (centésimas de milímetro) y pueden producir piezas idénticas repetidamente."
    },
    "Quelle machine est idéale pour les pièces cylindriques ?": {
      question: "¿Qué máquina es ideal para piezas cilíndricas?",
      options: ["Fresadora", "Torno CNC", "Cortadora láser", "Impresora 3D"],
      explanation: "El torno hace girar la pieza y es ideal para mecanizar formas cilíndricas."
    },
    "Quel code est utilisé pour le positionnement rapide ?": {
      question: "¿Qué código se usa para el posicionamiento rápido?",
      options: ["G1", "G0", "M3", "G2"],
      explanation: "G0 es el código de posicionamiento rápido. Mueve la herramienta lo más rápido posible sin mecanizar."
    },
    "Que fait le code M3 ?": {
      question: "¿Qué hace el código M3?",
      options: ["Detiene el programa", "Enciende el husillo en sentido horario", "Activa el refrigerante", "Mueve el eje Z"],
      explanation: "M3 enciende el husillo en sentido horario."
    },
    "Quel est l'axe vertical sur une fraiseuse CNC ?": {
      question: "¿Cuál es el eje vertical en una fresadora CNC?",
      options: ["Eje X", "Eje Y", "Eje Z", "Eje A"],
      explanation: "El eje Z es el eje vertical (movimiento arriba/abajo)."
    },
    "Que fait le code G1 ?": {
      question: "¿Qué hace el código G1?",
      options: ["Movimiento rápido", "Interpolación lineal a velocidad controlada", "Movimiento circular", "Parada del programa"],
      explanation: "G1 realiza interpolación lineal a una velocidad de avance controlada, utilizado para mecanizado."
    },
    "G2 effectue une interpolation circulaire dans quel sens ?": {
      question: "¿G2 realiza interpolación circular en qué sentido?",
      options: ["Antihorario", "Horario", "Vertical", "Depende de la máquina"],
      explanation: "G2 realiza interpolación circular en sentido horario. G3 es para antihorario."
    }
  }
}

// Quiz translations for English and Spanish
export const quizTranslations = {
  en: {
    "Que signifie l'acronyme PLC ?": {
      question: "What does the acronym PLC stand for?",
      options: ["Programmable Logic Controller", "Power Line Carrier", "Programmable Linear Computer", "Process Logic Control"],
      explanation: "PLC stands for Programmable Logic Controller."
    },
    "Quel composant de l'automate exécute le programme ?": {
      question: "Which component of the PLC executes the program?",
      options: ["The inputs", "The power supply", "The Central Processing Unit (CPU)", "The outputs"],
      explanation: "The Central Processing Unit (CPU) is the brain of the PLC that executes the user program."
    },
    "Qu'est-ce qu'une entrée TOR ?": {
      question: "What is a digital input?",
      options: ["An input that measures temperature", "A binary input (0 or 1)", "A communication input", "A high frequency input"],
      explanation: "Digital (discrete) means the input can only have two states, 0 (false) or 1 (true)."
    },
    "Les sorties de l'automate commandent :": {
      question: "The PLC outputs control:",
      options: ["Sensors", "Actuators", "Power supply", "Memory"],
      explanation: "Outputs control actuators (motors, valves, indicators, etc.) that act on the process."
    },
    "Quelle est la sortie de A ET B si A=1 et B=0 ?": {
      question: "What is the output of A AND B if A=1 and B=0?",
      options: ["0", "1", "Undefined", "Error"],
      explanation: "The AND gate requires ALL inputs to be 1 to have an output of 1. Here B=0, so the output is 0."
    },
    "En LADDER, comment représente-t-on une fonction ET ?": {
      question: "In LADDER, how is an AND function represented?",
      options: ["Contacts in parallel", "Contacts in series", "A single coil", "A timer"],
      explanation: "In LADDER, contacts in series represent an AND function: current only passes if all contacts are closed."
    },
    "Quelle est la sortie de A OU B si A=0 et B=1 ?": {
      question: "What is the output of A OR B if A=0 and B=1?",
      options: ["0", "1", "Undefined", "Error"],
      explanation: "The OR gate gives 1 if AT LEAST one input is 1. Here B=1, so the output is 1."
    },
    "Pourquoi le langage LADDER est-il populaire ?": {
      question: "Why is the LADDER language popular?",
      options: ["It's the most recent", "It resembles electrical diagrams", "It's the fastest", "It's free"],
      explanation: "LADDER resembles relay electrical diagrams, making it intuitive for electricians."
    }
  },
  es: {
    "Que signifie l'acronyme PLC ?": {
      question: "¿Qué significa el acrónimo PLC?",
      options: ["Controlador Lógico Programable", "Portador de Línea de Potencia", "Computadora Lineal Programable", "Control Lógico de Proceso"],
      explanation: "PLC significa Controlador Lógico Programable (Programmable Logic Controller)."
    },
    "Quel composant de l'automate exécute le programme ?": {
      question: "¿Qué componente del PLC ejecuta el programa?",
      options: ["Las entradas", "La fuente de alimentación", "La Unidad Central de Procesamiento (CPU)", "Las salidas"],
      explanation: "La Unidad Central de Procesamiento (CPU) es el cerebro del PLC que ejecuta el programa de usuario."
    },
    "Qu'est-ce qu'une entrée TOR ?": {
      question: "¿Qué es una entrada digital?",
      options: ["Una entrada que mide temperatura", "Una entrada binaria (0 o 1)", "Una entrada de comunicación", "Una entrada de alta frecuencia"],
      explanation: "Digital (discreto) significa que la entrada solo puede tener dos estados, 0 (falso) o 1 (verdadero)."
    },
    "Les sorties de l'automate commandent :": {
      question: "Las salidas del PLC controlan:",
      options: ["Sensores", "Actuadores", "Fuente de alimentación", "Memoria"],
      explanation: "Las salidas controlan actuadores (motores, válvulas, indicadores, etc.) que actúan sobre el proceso."
    },
    "Quelle est la sortie de A ET B si A=1 et B=0 ?": {
      question: "¿Cuál es la salida de A AND B si A=1 y B=0?",
      options: ["0", "1", "Indefinido", "Error"],
      explanation: "La puerta AND requiere que TODAS las entradas sean 1 para tener una salida de 1. Aquí B=0, entonces la salida es 0."
    },
    "En LADDER, comment représente-t-on une fonction ET ?": {
      question: "En LADDER, ¿cómo se representa una función AND?",
      options: ["Contactos en paralelo", "Contactos en serie", "Una sola bobina", "Un temporizador"],
      explanation: "En LADDER, los contactos en serie representan una función AND: la corriente solo pasa si todos los contactos están cerrados."
    },
    "Quelle est la sortie de A OU B si A=0 et B=1 ?": {
      question: "¿Cuál es la salida de A OR B si A=0 y B=1?",
      options: ["0", "1", "Indefinido", "Error"],
      explanation: "La puerta OR da 1 si AL MENOS una entrada es 1. Aquí B=1, entonces la salida es 1."
    },
    "Pourquoi le langage LADDER est-il populaire ?": {
      question: "¿Por qué es popular el lenguaje LADDER?",
      options: ["Es el más reciente", "Se parece a los diagramas eléctricos", "Es el más rápido", "Es gratis"],
      explanation: "LADDER se parece a los diagramas eléctricos de relés, lo que lo hace intuitivo para electricistas."
    }
  }
}

// Siemens Module translations for English and Spanish
export const siemensLessonTranslations = {
  en: {
    // Module 9 - Introduction to S7-1500
    "Présentation du S7-1500": {
      title: "Introduction to the S7-1500",
      description: "Discover the Siemens S7-1500 PLC and its features",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# The Siemens S7-1500\n\nThe **S7-1500** is Siemens' high-end programmable logic controller, designed for maximum performance."
          },
          {
            type: "info",
            content: "The S7-1500 replaces the S7-300/400 series and offers increased performance, better diagnostics, and a modern design."
          },
          {
            type: "text",
            content: "## Key Features\n\n- **Integrated display**: Diagnostics and configuration without PC\n- **Enhanced security**: Protection against unauthorized access\n- **High performance**: Very fast cycle times\n- **Technology functions**: Motion control, PID built-in"
          },
          {
            type: "diagram",
            title: "S7-1500 Architecture",
            content: `┌─────────────────────────────────────────────────────────────────────┐
│                           S7-1500                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ││
│  │   │ DISPLAY │ │   CPU   │ │   DI    │ │   DQ    │ │   AI    │  ││
│  │   │         │ │ 1511-1  │ │  16x24V │ │  16x24V │ │   8x    │  ││
│  │   │  [===]  │ │  PN     │ │         │ │         │ │  0-10V  │  ││
│  │   │  [===]  │ │         │ │  ○ ○ ○  │ │  ○ ○ ○  │ │         │  ││
│  │   │  [===]  │ │  RUN    │ │  ○ ○ ○  │ │  ○ ○ ○  │ │  CH0-7  │  ││
│  │   │         │ │  STOP   │ │         │ │         │ │         │  ││
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  ││
│  │                                                                 ││
│  │   ════════════════════════════════════════════════════════════ ││
│  │                        PROFINET / PROFIBUS                      ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## CPU Range\n\n| CPU | Memory | Performance |\n|-----|--------|-------------|\n| 1511 | 150 KB | Entry-level |\n| 1513 | 300 KB | Standard |\n| 1515 | 500 KB | Advanced |\n| 1517 | 2 MB | High performance |\n| 1518 | 4 MB | Maximum |"
          }
        ]
      })
    },
    "L'environnement TIA Portal": {
      title: "The TIA Portal Environment",
      description: "Discover the TIA Portal development environment",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# TIA Portal\n\n**TIA Portal** (Totally Integrated Automation) is Siemens' unified engineering platform."
          },
          {
            type: "text",
            content: "## What is TIA Portal?\n\nTIA Portal brings together all automation tools in a single environment:\n\n- **Step 7**: PLC programming\n- **WinCC**: HMI visualization\n- **Startdrive**: Drive configuration\n- **Safety**: Safety programming"
          },
          {
            type: "diagram",
            title: "TIA Portal Interface",
            content: `┌───────────────────────────────────────────────────────────────┐
│  TIA Portal V17                                    [─][□][X]  │
├─────────────┬─────────────────────────────────────────────────┤
│ Project     │  Program blocks                                 │
│ ├─ PLC_1    │  ┌───────────────────────────────────────────┐  │
│ │  ├─ Prog  │  │  Main [OB1]                               │  │
│ │  │  ├─OB1 │  │                                           │  │
│ │  │  ├─FB1 │  │  --| |--| |------------------( )--        │  │
│ │  │  └─DB1 │  │   I0.0  I0.1                 Q0.0         │  │
│ │  ├─ Tech  │  │                                           │  │
│ │  └─ HMI   │  │  --| |------------------------( )--       │  │
│ └─ HMI_1    │  │   I0.2                        Q0.1         │  │
│                │  │                                           │  │
├─────────────┴─┴───────────────────────────────────────────────┤
│ Properties │ Info │ Diagnostics │ Cross-references            │
└───────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "TIA Portal uses a \"Portal view\" for intuitive navigation and a \"Project view\" for detailed editing."
          },
          {
            type: "text",
            content: "## Key Features\n\n- **Unified interface**: Everything in one software\n- **Drag & drop**: Simplified configuration\n- **Integrated simulation**: PLCSIM for testing\n- **Libraries**: Reusable code blocks"
          }
        ]
      })
    },
    // Module 10 - TIA Portal Programming
    "Créer un projet TIA Portal": {
      title: "Creating a TIA Portal Project",
      description: "Learn to create and configure a TIA Portal project",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Creating a TIA Portal Project\n\nA structured project is the foundation of any automation application."
          },
          {
            type: "text",
            content: "## Creation Steps\n\n1. **New Project**: File > New > Project\n2. **Device selection**: Choose CPU (e.g., CPU 1511-1 PN)\n3. **Hardware configuration**: Add I/O modules\n4. **Network**: Configure PROFINET addresses\n5. **Programming**: Create program blocks"
          },
          {
            type: "diagram",
            title: "Hardware Configuration (HW Config)",
            content: `┌─────────────────────────────────────────────────────────────┐
│  Device Configuration - PLC_1                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Rail 0                                                  ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          ││
│  │  │  PS  │ │ CPU  │ │ DI16 │ │ DQ16 │ │ AI8  │          ││
│  │  │ 25W  │ │1511-1│ │      │ │      │ │      │          ││
│  │  │      │ │  PN  │ │      │ │      │ │      │          ││
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          ││
│  │   Slot 0   Slot 1   Slot 2   Slot 3   Slot 4           ││
│  │                                                          ││
│  │  Addresses:        I0.0-I1.7  Q0.0-Q1.7  IW64-IW78     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "Compile and download your project to the PLC regularly to verify that everything works."
          }
        ]
      })
    },
    "Langages de programmation S7": {
      title: "S7 Programming Languages",
      description: "Discover LAD, FBD, SCL and GRAPH",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# S7 Programming Languages\n\nSiemens offers several programming languages for different needs."
          },
          {
            type: "text",
            content: "## Available Languages\n\n### LAD (Ladder Diagram)\nGraphical language resembling electrical diagrams. Ideal for discrete logic.\n\n### FBD (Function Block Diagram)\nGraphical language using logic blocks. Good for process control.\n\n### SCL (Structured Control Language)\nHigh-level textual language similar to Pascal. Powerful for algorithms.\n\n### GRAPH\nSequential programming language for step-by-step processes."
          },
          {
            type: "diagram",
            title: "Language Comparison",
            content: `┌─────────────────────────────────────────────────────────────────┐
│  Example: Q0.0 = I0.0 AND I0.1                                  │
│                                                                  │
│  LAD:     ──| |────| |────────────────────────( )──             │
│             I0.0    I0.1                        Q0.0             │
│                                                                  │
│  FBD:     ┌─────┐                                               │
│           │ AND │                                               │
│     I0.0──┤     ├───Q0.0                                        │
│     I0.1──┤     │                                               │
│           └─────┘                                               │
│                                                                  │
│  SCL:     IF I0.0 AND I0.1 THEN                                 │
│              Q0.0 := TRUE;                                      │
│           END_IF;                                               │
└─────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "warning",
            content: "Choose the language based on the task: LAD for logic, SCL for math, GRAPH for sequences."
          }
        ]
      })
    },
    // Module 11 - Data Blocks
    "Les blocs de données (DB)": {
      title: "Data Blocks (DB)",
      description: "Understand and use data blocks",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Data Blocks (DB)\n\n**Data blocks** store data used by the program."
          },
          {
            type: "text",
            content: "## Types of DB\n\n### Global DB\nAccessible from anywhere in the program. Ideal for shared data.\n\n### Instance DB\nAssociated with a Function Block (FB). Stores the FB's internal data."
          },
          {
            type: "diagram",
            title: "DB Structure",
            content: `┌─────────────────────────────────────────────────────────────┐
│  DB10 "Motor_Data"                                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Name          │ Type    │ Value    │ Comment           ││
│  │────────────────┼─────────┼──────────┼───────────────────││
│  │  Speed         │ REAL    │ 1500.0   │ Speed in RPM      ││
│  │  Running       │ BOOL    │ FALSE    │ Running status    ││
│  │  Fault         │ BOOL    │ FALSE    │ Fault present     ││
│  │  RunTime       │ TIME    │ T#0s     │ Cumulative time   ││
│  │  Parameters    │ STRUCT  │          │ Motor parameters  ││
│  │   ├─ MaxSpeed  │ REAL    │ 3000.0   │ Maximum speed     ││
│  │   └─ Accel     │ REAL    │ 10.0     │ Acceleration      ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Syntax for Accessing\n\n- **Global DB**: DB10.Speed or \"Motor_Data\".Speed\n- **Instance DB**: Automatic with FB call"
          },
          {
            type: "info",
            content: "Prefer global DBs for shared data and instance DBs for encapsulated data."
          }
        ]
      })
    },
    "Programmation structurée": {
      title: "Structured Programming",
      description: "Organize your code with FB, FC and DB",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Structured Programming\n\nStructured programming organizes code into reusable blocks."
          },
          {
            type: "text",
            content: "## Block Types\n\n| Block | Description |\n|-------|-------------|\n| OB (Organisation Block) | Program entry point |\n| FB (Function Block) | Block with memory (instance DB) |\n| FC (Function) | Block without memory |\n| DB (Data Block) | Data storage |"
          },
          {
            type: "diagram",
            title: "Block Calls",
            content: `┌───────────────────────────────────────────────────────────┐
│                        OB1 (Main)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │   CALL "FC_Read_Inputs"                             │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor1"                      │  │
│  │        En := I0.0                                   │  │
│  │        Speed := 1500                                │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor2"                      │  │
│  │        En := I0.1                                   │  │
│  │        Speed := 1200                                │  │
│  │                                                     │  │
│  │   CALL "FC_Write_Outputs"                           │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Advantages\n\n- **Reuse**: An FB can be called multiple times with different DBs\n- **Readability**: Organized and documented code\n- **Maintenance**: Localized modifications\n- **Testing**: Individually testable blocks"
          },
          {
            type: "warning",
            content: "Avoid programming everything in OB1! Use FB and FC to structure your code."
          }
        ]
      })
    }
  },
  es: {
    // Module 9 - Introduction to S7-1500
    "Présentation du S7-1500": {
      title: "Presentación del S7-1500",
      description: "Descubre el PLC Siemens S7-1500 y sus características",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# El Siemens S7-1500\n\nEl **S7-1500** es el controlador lógico programable de gama alta de Siemens, diseñado para el máximo rendimiento."
          },
          {
            type: "info",
            content: "El S7-1500 reemplaza la serie S7-300/400 y ofrece mayor rendimiento, mejor diagnóstico y un diseño moderno."
          },
          {
            type: "text",
            content: "## Características principales\n\n- **Pantalla integrada**: Diagnóstico y configuración sin PC\n- **Seguridad mejorada**: Protección contra acceso no autorizado\n- **Alto rendimiento**: Tiempos de ciclo muy rápidos\n- **Funciones tecnológicas**: Control de movimiento, PID integrado"
          },
          {
            type: "diagram",
            title: "Arquitectura S7-1500",
            content: `┌─────────────────────────────────────────────────────────────────────┐
│                           S7-1500                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ││
│  │   │ DISPLAY │ │   CPU   │ │   DI    │ │   DQ    │ │   AI    │  ││
│  │   │         │ │ 1511-1  │ │  16x24V │ │  16x24V │ │   8x    │  ││
│  │   │  [===]  │ │  PN     │ │         │ │         │ │  0-10V  │  ││
│  │   │  [===]  │ │         │ │  ○ ○ ○  │ │  ○ ○ ○  │ │         │  ││
│  │   │  [===]  │ │  RUN    │ │  ○ ○ ○  │ │  ○ ○ ○  │ │  CH0-7  │  ││
│  │   │         │ │  STOP   │ │         │ │         │ │         │  ││
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  ││
│  │                                                                 ││
│  │   ════════════════════════════════════════════════════════════ ││
│  │                        PROFINET / PROFIBUS                      ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Gama de CPUs\n\n| CPU | Memoria | Rendimiento |\n|-----|---------|-------------|\n| 1511 | 150 KB | Entrada |\n| 1513 | 300 KB | Estándar |\n| 1515 | 500 KB | Avanzado |\n| 1517 | 2 MB | Alto rendimiento |\n| 1518 | 4 MB | Máximo |"
          }
        ]
      })
    },
    "L'environnement TIA Portal": {
      title: "El entorno TIA Portal",
      description: "Descubre el entorno de desarrollo TIA Portal",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# TIA Portal\n\n**TIA Portal** (Totally Integrated Automation) es la plataforma de ingeniería unificada de Siemens."
          },
          {
            type: "text",
            content: "## ¿Qué es TIA Portal?\n\nTIA Portal reúne todas las herramientas de automatización en un solo entorno:\n\n- **Step 7**: Programación de PLC\n- **WinCC**: Visualización HMI\n- **Startdrive**: Configuración de variadores\n- **Safety**: Programación de seguridad"
          },
          {
            type: "diagram",
            title: "Interfaz TIA Portal",
            content: `┌───────────────────────────────────────────────────────────────┐
│  TIA Portal V17                                    [─][□][X]  │
├─────────────┬─────────────────────────────────────────────────┤
│ Proyecto    │  Bloques de programa                            │
│ ├─ PLC_1    │  ┌───────────────────────────────────────────┐  │
│ │  ├─ Prog  │  │  Main [OB1]                               │  │
│ │  │  ├─OB1 │  │                                           │  │
│ │  │  ├─FB1 │  │  --| |--| |------------------( )--        │  │
│ │  │  └─DB1 │  │   I0.0  I0.1                 Q0.0         │  │
│ │  ├─ Tech  │  │                                           │  │
│ │  └─ HMI   │  │  --| |------------------------( )--       │  │
│ └─ HMI_1    │  │   I0.2                        Q0.1         │  │
│             │  │                                           │  │
├─────────────┴─┴───────────────────────────────────────────────┤
│ Propiedades │ Info │ Diagnóstico │ Referencias cruzadas       │
└───────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "TIA Portal utiliza una \"Vista de portal\" para navegación intuitiva y una \"Vista de proyecto\" para edición detallada."
          },
          {
            type: "text",
            content: "## Características clave\n\n- **Interfaz unificada**: Todo en un solo software\n- **Arrastrar y soltar**: Configuración simplificada\n- **Simulación integrada**: PLCSIM para pruebas\n- **Bibliotecas**: Bloques de código reutilizables"
          }
        ]
      })
    },
    // Module 10 - TIA Portal Programming
    "Créer un projet TIA Portal": {
      title: "Crear un proyecto TIA Portal",
      description: "Aprende a crear y configurar un proyecto TIA Portal",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Crear un proyecto TIA Portal\n\nUn proyecto estructurado es la base de cualquier aplicación de automatización."
          },
          {
            type: "text",
            content: "## Pasos de creación\n\n1. **Nuevo proyecto**: Archivo > Nuevo > Proyecto\n2. **Selección del dispositivo**: Elegir CPU (ej. CPU 1511-1 PN)\n3. **Configuración de hardware**: Agregar módulos E/S\n4. **Red**: Configurar direcciones PROFINET\n5. **Programación**: Crear bloques de programa"
          },
          {
            type: "diagram",
            title: "Configuración de Hardware (HW Config)",
            content: `┌─────────────────────────────────────────────────────────────┐
│  Configuración del dispositivo - PLC_1                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Rack 0                                                  ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          ││
│  │  │  PS  │ │ CPU  │ │ DI16 │ │ DQ16 │ │ AI8  │          ││
│  │  │ 25W  │ │1511-1│ │      │ │      │ │      │          ││
│  │  │      │ │  PN  │ │      │ │      │ │      │          ││
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          ││
│  │   Slot 0   Slot 1   Slot 2   Slot 3   Slot 4           ││
│  │                                                          ││
│  │  Direcciones:      I0.0-I1.7  Q0.0-Q1.7  IW64-IW78     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "Compile y descargue su proyecto al PLC regularmente para verificar que todo funcione."
          }
        ]
      })
    },
    "Langages de programmation S7": {
      title: "Lenguajes de programación S7",
      description: "Descubre LAD, FBD, SCL y GRAPH",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Lenguajes de programación S7\n\nSiemens ofrece varios lenguajes de programación para diferentes necesidades."
          },
          {
            type: "text",
            content: "## Lenguajes disponibles\n\n### LAD (Diagrama de Escalera)\nLenguaje gráfico que se asemeja a diagramas eléctricos. Ideal para lógica discreta.\n\n### FBD (Diagrama de Bloques de Función)\nLenguaje gráfico usando bloques lógicos. Bueno para control de procesos.\n\n### SCL (Lenguaje de Control Estructurado)\nLenguaje textual de alto nivel similar a Pascal. Potente para algoritmos.\n\n### GRAPH\nLenguaje de programación secuencial para procesos paso a paso."
          },
          {
            type: "diagram",
            title: "Comparación de lenguajes",
            content: `┌─────────────────────────────────────────────────────────────────┐
│  Ejemplo: Q0.0 = I0.0 AND I0.1                                  │
│                                                                  │
│  LAD:     ──| |────| |────────────────────────( )──             │
│             I0.0    I0.1                        Q0.0             │
│                                                                  │
│  FBD:     ┌─────┐                                               │
│           │ AND │                                               │
│     I0.0──┤     ├───Q0.0                                        │
│     I0.1──┤     │                                               │
│           └─────┘                                               │
│                                                                  │
│  SCL:     IF I0.0 AND I0.1 THEN                                 │
│              Q0.0 := TRUE;                                      │
│           END_IF;                                               │
└─────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "warning",
            content: "Elija el lenguaje según la tarea: LAD para lógica, SCL para matemáticas, GRAPH para secuencias."
          }
        ]
      })
    },
    // Module 11 - Data Blocks
    "Les blocs de données (DB)": {
      title: "Bloques de datos (DB)",
      description: "Comprende y utiliza los bloques de datos",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Bloques de datos (DB)\n\nLos **bloques de datos** almacenan datos utilizados por el programa."
          },
          {
            type: "text",
            content: "## Tipos de DB\n\n### DB Global\nAccesible desde cualquier parte del programa. Ideal para datos compartidos.\n\n### DB de Instancia\nAsociado a un Bloque de Función (FB). Almacena los datos internos del FB."
          },
          {
            type: "diagram",
            title: "Estructura de DB",
            content: `┌─────────────────────────────────────────────────────────────┐
│  DB10 "Datos_Motor"                                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Nombre        │ Tipo    │ Valor    │ Comentario        ││
│  │────────────────┼─────────┼──────────┼───────────────────││
│  │  Velocidad     │ REAL    │ 1500.0   │ Velocidad en RPM  ││
│  │  EnMarcha      │ BOOL    │ FALSE    │ Estado de marcha  ││
│  │  Fallo         │ BOOL    │ FALSE    │ Fallo presente    ││
│  │  TiempoMarcha  │ TIME    │ T#0s     │ Tiempo acumulado  ││
│  │  Parametros    │ STRUCT  │          │ Parámetros motor  ││
│  │   ├─ VelMax    │ REAL    │ 3000.0   │ Velocidad máxima  ││
│  │   └─ Acel      │ REAL    │ 10.0     │ Aceleración       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Sintaxis de acceso\n\n- **DB Global**: DB10.Velocidad o \"Datos_Motor\".Velocidad\n- **DB de Instancia**: Automático con llamada FB"
          },
          {
            type: "info",
            content: "Prefiera DBs globales para datos compartidos y DBs de instancia para datos encapsulados."
          }
        ]
      })
    },
    "Programmation structurée": {
      title: "Programación estructurada",
      description: "Organiza tu código con FB, FC y DB",
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Programación estructurada\n\nLa programación estructurada organiza el código en bloques reutilizables."
          },
          {
            type: "text",
            content: "## Tipos de bloques\n\n| Bloque | Descripción |\n|--------|-------------|\n| OB (Bloque de Organización) | Punto de entrada del programa |\n| FB (Bloque de Función) | Bloque con memoria (DB de instancia) |\n| FC (Función) | Bloque sin memoria |\n| DB (Bloque de Datos) | Almacenamiento de datos |"
          },
          {
            type: "diagram",
            title: "Llamadas de bloques",
            content: `┌───────────────────────────────────────────────────────────┐
│                        OB1 (Main)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │   CALL "FC_Lectura_Entradas"                        │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor1"                      │  │
│  │        En := I0.0                                   │  │
│  │        Velocidad := 1500                            │  │
│  │                                                     │  │
│  │   CALL "FB_Motor", "DB_Motor2"                      │  │
│  │        En := I0.1                                   │  │
│  │        Velocidad := 1200                            │  │
│  │                                                     │  │
│  │   CALL "FC_Escritura_Salidas"                       │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Ventajas\n\n- **Reutilización**: Un FB puede llamarse varias veces con diferentes DBs\n- **Legibilidad**: Código organizado y documentado\n- **Mantenimiento**: Modificaciones localizadas\n- **Pruebas**: Bloques probables individualmente"
          },
          {
            type: "warning",
            content: "¡Evite programar todo en OB1! Use FB y FC para estructurar su código."
          }
        ]
      })
    }
  }
}

// Siemens Quiz translations for English and Spanish
export const siemensQuizTranslations = {
  en: {
    "Quelle est la particularité du S7-1500 par rapport aux anciens automates Siemens ?": {
      question: "What is special about the S7-1500 compared to older Siemens PLCs?",
      options: ["It is cheaper", "It has an integrated display and increased performance", "It doesn't require programming", "It works without power"],
      explanation: "The S7-1500 features an integrated front display, better performance, and improved diagnostics compared to the S7-300/400."
    },
    "Quel logiciel est utilisé pour programmer les S7-1500 ?": {
      question: "What software is used to program S7-1500?",
      options: ["Step 7 Classic", "WinCC", "TIA Portal", "Logo! Soft Comfort"],
      explanation: "TIA Portal (Totally Integrated Automation) is the unified programming environment for S7-1500."
    },
    "Que signifie TIA dans TIA Portal ?": {
      question: "What does TIA stand for in TIA Portal?",
      options: ["Total Industrial Automation", "Totally Integrated Automation", "Technical Integration Application", "Tool for Industrial Applications"],
      explanation: "TIA stands for Totally Integrated Automation, reflecting the integration of all design tools in a single environment."
    },
    "Quelle vue de TIA Portal permet de voir tous les appareils du projet ?": {
      question: "Which TIA Portal view shows all project devices?",
      options: ["Program view", "Portal view", "Project view", "Network view"],
      explanation: "The Project view displays the complete tree with all devices, programs, and configurations."
    },
    "Quelle est la première étape pour créer un projet TIA Portal ?": {
      question: "What is the first step to create a TIA Portal project?",
      options: ["Write the program", "Create a new project and configure hardware", "Connect the PLC", "Compile the program"],
      explanation: "You always start by creating a project then configuring hardware (CPU, I/O modules) before programming."
    },
    "Qu'est-ce que le HW Config dans TIA Portal ?": {
      question: "What is HW Config in TIA Portal?",
      options: ["The program editor", "Hardware configuration", "The simulator", "Online diagnostics"],
      explanation: "HW Config (Hardware Configuration) allows you to define the hardware configuration: CPU, modules, addresses."
    },
    "Quel langage utilise des contacts et bobines comme un schéma électrique ?": {
      question: "Which language uses contacts and coils like an electrical diagram?",
      options: ["SCL", "FBD", "LAD (LADDER)", "GRAPH"],
      explanation: "LAD (Ladder Diagram) represents logic with contacts and coils like a relay diagram."
    },
    "Quel langage est similaire au Pascal et permet des calculs complexes ?": {
      question: "Which language is similar to Pascal and allows complex calculations?",
      options: ["LAD", "FBD", "SCL", "GRAPH"],
      explanation: "SCL (Structured Control Language) is a high-level textual language similar to Pascal, ideal for algorithms."
    },
    "Quelle est la différence entre un DB global et un DB d'instance ?": {
      question: "What is the difference between a global DB and an instance DB?",
      options: ["There is no difference", "Global DB is accessible everywhere, instance DB is linked to an FB", "Instance DB is larger", "Global DB is automatic"],
      explanation: "A global DB stores data accessible throughout the program. An instance DB stores a specific FB's internal data."
    },
    "Comment accède-t-on à une variable 'Vitesse' dans le DB10 ?": {
      question: "How do you access a 'Speed' variable in DB10?",
      options: ["Speed", "DB10.Speed", "%DB10.Speed", "#Speed"],
      explanation: "You access DB variables with the syntax DB<number>.<variable>, for example DB10.Speed."
    },
    "Quel bloc possède une mémoire (DB d'instance) ?": {
      question: "Which block has memory (instance DB)?",
      options: ["FC (Function)", "FB (Function Block)", "OB (Organisation Block)", "No block"],
      explanation: "FB (Function Block) has an instance DB that retains data between calls, unlike FC."
    },
    "Quel bloc est le point d'entrée principal du programme cyclique ?": {
      question: "Which block is the main entry point for the cyclic program?",
      options: ["FB1", "FC1", "OB1", "DB1"],
      explanation: "OB1 (Main) is the main cyclic Organisation Block, executed in a loop by the CPU."
    }
  },
  es: {
    "Quelle est la particularité du S7-1500 par rapport aux anciens automates Siemens ?": {
      question: "¿Qué característica especial tiene el S7-1500 comparado con los PLCs Siemens antiguos?",
      options: ["Es más barato", "Tiene pantalla integrada y mayor rendimiento", "No requiere programación", "Funciona sin alimentación"],
      explanation: "El S7-1500 tiene una pantalla frontal integrada, mejor rendimiento y diagnóstico mejorado comparado con el S7-300/400."
    },
    "Quel logiciel est utilisé pour programmer les S7-1500 ?": {
      question: "¿Qué software se usa para programar el S7-1500?",
      options: ["Step 7 Classic", "WinCC", "TIA Portal", "Logo! Soft Comfort"],
      explanation: "TIA Portal (Totally Integrated Automation) es el entorno de programación unificado para S7-1500."
    },
    "Que signifie TIA dans TIA Portal ?": {
      question: "¿Qué significa TIA en TIA Portal?",
      options: ["Total Industrial Automation", "Totally Integrated Automation", "Technical Integration Application", "Tool for Industrial Applications"],
      explanation: "TIA significa Totally Integrated Automation, reflejando la integración de todas las herramientas de diseño en un solo entorno."
    },
    "Quelle vue de TIA Portal permet de voir tous les appareils du projet ?": {
      question: "¿Qué vista de TIA Portal muestra todos los dispositivos del proyecto?",
      options: ["Vista del programa", "Vista del portal", "Vista del proyecto", "Vista de red"],
      explanation: "La Vista del proyecto muestra el árbol completo con todos los dispositivos, programas y configuraciones."
    },
    "Quelle est la première étape pour créer un projet TIA Portal ?": {
      question: "¿Cuál es el primer paso para crear un proyecto TIA Portal?",
      options: ["Escribir el programa", "Crear un nuevo proyecto y configurar el hardware", "Conectar el PLC", "Compilar el programa"],
      explanation: "Siempre se comienza creando un proyecto y configurando el hardware (CPU, módulos E/S) antes de programar."
    },
    "Qu'est-ce que le HW Config dans TIA Portal ?": {
      question: "¿Qué es HW Config en TIA Portal?",
      options: ["El editor de programa", "Configuración de hardware", "El simulador", "Diagnóstico en línea"],
      explanation: "HW Config (Hardware Configuration) permite definir la configuración de hardware: CPU, módulos, direcciones."
    },
    "Quel langage utilise des contacts et bobines comme un schéma électrique ?": {
      question: "¿Qué lenguaje usa contactos y bobinas como un diagrama eléctrico?",
      options: ["SCL", "FBD", "LAD (LADDER)", "GRAPH"],
      explanation: "LAD (Diagrama de Escalera) representa la lógica con contactos y bobinas como un diagrama de relés."
    },
    "Quel langage est similaire au Pascal et permet des calculs complexes ?": {
      question: "¿Qué lenguaje es similar a Pascal y permite cálculos complejos?",
      options: ["LAD", "FBD", "SCL", "GRAPH"],
      explanation: "SCL (Lenguaje de Control Estructurado) es un lenguaje textual de alto nivel similar a Pascal, ideal para algoritmos."
    },
    "Quelle est la différence entre un DB global et un DB d'instance ?": {
      question: "¿Cuál es la diferencia entre un DB global y un DB de instancia?",
      options: ["No hay diferencia", "El DB global es accesible en todas partes, el DB de instancia está vinculado a un FB", "El DB de instancia es más grande", "El DB global es automático"],
      explanation: "Un DB global almacena datos accesibles en todo el programa. Un DB de instancia almacena los datos internos de un FB específico."
    },
    "Comment accède-t-on à une variable 'Vitesse' dans le DB10 ?": {
      question: "¿Cómo se accede a una variable 'Velocidad' en DB10?",
      options: ["Velocidad", "DB10.Velocidad", "%DB10.Velocidad", "#Velocidad"],
      explanation: "Se accede a las variables de un DB con la sintaxis DB<número>.<variable>, por ejemplo DB10.Velocidad."
    },
    "Quel bloc possède une mémoire (DB d'instance) ?": {
      question: "¿Qué bloque tiene memoria (DB de instancia)?",
      options: ["FC (Función)", "FB (Bloque de Función)", "OB (Bloque de Organización)", "Ningún bloque"],
      explanation: "Los FB (Bloque de Función) tienen un DB de instancia que conserva los datos entre llamadas, a diferencia de los FC."
    },
    "Quel bloc est le point d'entrée principal du programme cyclique ?": {
      question: "¿Qué bloque es el punto de entrada principal del programa cíclico?",
      options: ["FB1", "FC1", "OB1", "DB1"],
      explanation: "OB1 (Main) es el Bloque de Organización cíclico principal, ejecutado en bucle por la CPU."
    }
  }
}
