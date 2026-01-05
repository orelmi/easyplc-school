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
            type: "image",
            url: "/images/plc-structure.svg",
            caption: "Structure of a programmable logic controller"
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
            type: "image",
            url: "/images/plc-structure.svg",
            caption: "Estructura de un controlador lógico programable"
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
