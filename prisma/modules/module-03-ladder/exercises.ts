import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module03Exercises: ExerciseData[] = [
  {
    title: "Circuit Marche/Arrêt",
    description: "Créez un circuit LADDER pour un bouton marche/arrêt avec auto-maintien",
    type: "ladder",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Utilisez I0.0 comme bouton Marche (NO)",
        "Utilisez I0.1 comme bouton Arrêt (NC)",
        "La sortie Q0.0 doit rester activée après relâchement du bouton Marche",
        "Le bouton Arrêt doit couper la sortie"
      ],
      objective: "Créer un circuit d'auto-maintien fonctionnel"
    }),
    initialCode: JSON.stringify({
      rungs: [
        { contacts: [], coil: null }
      ]
    }),
    solution: JSON.stringify({
      rungs: [
        {
          contacts: [
            { type: "NO", address: "I0.0", parallel: [{ type: "NO", address: "Q0.0" }] },
            { type: "NC", address: "I0.1" }
          ],
          coil: { type: "OUT", address: "Q0.0" }
        }
      ]
    }),
    hints: JSON.stringify([
      "L'auto-maintien utilise un contact NO de la sortie en parallèle avec le bouton Marche",
      "Le bouton Arrêt doit être en série et normalement fermé (NC)"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "Temporisation TON",
    description: "Créez un circuit avec une temporisation à l'enclenchement",
    type: "ladder",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Quand I0.0 est activé, Q0.0 doit s'allumer après 5 secondes",
        "Utilisez un temporisateur TON (Timer ON Delay)",
        "La sortie doit s'éteindre immédiatement quand I0.0 est désactivé"
      ],
      objective: "Implémenter une temporisation à l'enclenchement de 5 secondes"
    }),
    initialCode: JSON.stringify({
      rungs: [],
      timers: []
    }),
    solution: JSON.stringify({
      rungs: [
        {
          contacts: [{ type: "NO", address: "I0.0" }],
          coil: { type: "TON", address: "T1", preset: 5000 }
        },
        {
          contacts: [{ type: "NO", address: "T1.Q" }],
          coil: { type: "OUT", address: "Q0.0" }
        }
      ]
    }),
    hints: JSON.stringify([
      "Le temporisateur TON active sa sortie après le délai configuré",
      "La sortie du timer reste active tant que l'entrée est maintenue",
      "Utilisez le bit de sortie du timer (T1.Q) pour piloter Q0.0"
    ]),
    xpReward: 150,
    order: 2
  },
  {
    title: "Compteur de pièces",
    description: "Créez un programme pour compter des pièces et activer une sortie tous les 10 pièces",
    type: "ladder",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Le capteur sur I0.0 détecte chaque pièce",
        "Comptez les pièces avec un compteur CTU",
        "Quand 10 pièces sont comptées, activez Q0.0",
        "I0.1 remet le compteur à zéro"
      ],
      objective: "Implémenter un compteur de lots de 10 pièces"
    }),
    solution: JSON.stringify({
      rungs: [
        {
          contacts: [{ type: "NO", address: "I0.0" }],
          coil: { type: "CTU", address: "C1", preset: 10 }
        },
        {
          contacts: [{ type: "NO", address: "I0.1" }],
          coil: { type: "RES", address: "C1" }
        },
        {
          contacts: [{ type: "NO", address: "C1.Q" }],
          coil: { type: "OUT", address: "Q0.0" }
        }
      ]
    }),
    hints: JSON.stringify([
      "CTU = Counter Up (comptage croissant)",
      "Le bit C1.Q devient 1 quand la valeur atteint le preset",
      "RES réinitialise le compteur à 0"
    ]),
    xpReward: 200,
    order: 3
  },
  {
    title: "Clignotant",
    description: "Créez un circuit pour faire clignoter une sortie à 1Hz",
    type: "ladder",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "La sortie Q0.0 doit s'allumer pendant 500ms puis s'éteindre pendant 500ms",
        "Utilisez deux temporisateurs TON",
        "Le clignotement doit être continu"
      ],
      objective: "Créer un oscillateur 1Hz avec des temporisateurs"
    }),
    solution: JSON.stringify({
      rungs: [
        {
          contacts: [{ type: "NC", address: "T2.Q" }],
          coil: { type: "TON", address: "T1", preset: 500 }
        },
        {
          contacts: [{ type: "NO", address: "T1.Q" }],
          coil: { type: "TON", address: "T2", preset: 500 }
        },
        {
          contacts: [{ type: "NO", address: "T1.Q" }, { type: "NC", address: "T2.Q" }],
          coil: { type: "OUT", address: "Q0.0" }
        }
      ]
    }),
    hints: JSON.stringify([
      "Un timer démarre l'autre quand il est terminé",
      "Utilisez les bits Q des timers pour créer l'oscillation",
      "La sortie est active quand T1 est terminé mais pas T2"
    ]),
    xpReward: 175,
    order: 4
  }
]

export const module03ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Circuit Marche/Arrêt": {
      title: "Start/Stop Circuit",
      description: "Create a LADDER circuit for a start/stop button with self-holding",
      instructions: JSON.stringify({
        steps: [
          "Use I0.0 as Start button (NO)",
          "Use I0.1 as Stop button (NC)",
          "Output Q0.0 must stay activated after releasing Start button",
          "Stop button must turn off the output"
        ],
        objective: "Create a working self-holding circuit"
      }),
      hints: JSON.stringify([
        "Self-holding uses a NO contact of the output in parallel with the Start button",
        "The Stop button must be in series and normally closed (NC)"
      ])
    },
    "Temporisation TON": {
      title: "TON Timer",
      description: "Create a circuit with an on-delay timer",
      instructions: JSON.stringify({
        steps: [
          "When I0.0 is activated, Q0.0 must turn on after 5 seconds",
          "Use a TON timer (Timer ON Delay)",
          "The output must turn off immediately when I0.0 is deactivated"
        ],
        objective: "Implement a 5-second on-delay timer"
      }),
      hints: JSON.stringify([
        "The TON timer activates its output after the configured delay",
        "The timer output stays active as long as the input is maintained",
        "Use the timer output bit (T1.Q) to drive Q0.0"
      ])
    },
    "Compteur de pièces": {
      title: "Part Counter",
      description: "Create a program to count parts and activate an output every 10 parts",
      instructions: JSON.stringify({
        steps: [
          "The sensor on I0.0 detects each part",
          "Count parts with a CTU counter",
          "When 10 parts are counted, activate Q0.0",
          "I0.1 resets the counter to zero"
        ],
        objective: "Implement a batch counter for 10 parts"
      }),
      hints: JSON.stringify([
        "CTU = Counter Up (counting up)",
        "The C1.Q bit becomes 1 when the value reaches the preset",
        "RES resets the counter to 0"
      ])
    },
    "Clignotant": {
      title: "Flasher",
      description: "Create a circuit to flash an output at 1Hz",
      instructions: JSON.stringify({
        steps: [
          "Output Q0.0 must turn on for 500ms then off for 500ms",
          "Use two TON timers",
          "The flashing must be continuous"
        ],
        objective: "Create a 1Hz oscillator with timers"
      }),
      hints: JSON.stringify([
        "One timer starts the other when it finishes",
        "Use timer Q bits to create the oscillation",
        "Output is active when T1 is done but not T2"
      ])
    }
  },
  es: {
    "Circuit Marche/Arrêt": {
      title: "Circuito Marcha/Paro",
      description: "Cree un circuito LADDER para un botón marcha/paro con auto-retención",
      instructions: JSON.stringify({
        steps: [
          "Use I0.0 como botón de Marcha (NO)",
          "Use I0.1 como botón de Paro (NC)",
          "La salida Q0.0 debe permanecer activada después de soltar el botón Marcha",
          "El botón de Paro debe apagar la salida"
        ],
        objective: "Crear un circuito de auto-retención funcional"
      }),
      hints: JSON.stringify([
        "La auto-retención usa un contacto NO de la salida en paralelo con el botón Marcha",
        "El botón de Paro debe estar en serie y normalmente cerrado (NC)"
      ])
    },
    "Temporisation TON": {
      title: "Temporizador TON",
      description: "Cree un circuito con un temporizador de retardo a la conexión",
      instructions: JSON.stringify({
        steps: [
          "Cuando I0.0 esté activado, Q0.0 debe encenderse después de 5 segundos",
          "Use un temporizador TON (Timer ON Delay)",
          "La salida debe apagarse inmediatamente cuando I0.0 se desactive"
        ],
        objective: "Implementar un temporizador de retardo de 5 segundos"
      }),
      hints: JSON.stringify([
        "El temporizador TON activa su salida después del retardo configurado",
        "La salida del temporizador permanece activa mientras la entrada se mantenga",
        "Use el bit de salida del temporizador (T1.Q) para controlar Q0.0"
      ])
    },
    "Compteur de pièces": {
      title: "Contador de piezas",
      description: "Cree un programa para contar piezas y activar una salida cada 10 piezas",
      instructions: JSON.stringify({
        steps: [
          "El sensor en I0.0 detecta cada pieza",
          "Cuente las piezas con un contador CTU",
          "Cuando se cuenten 10 piezas, active Q0.0",
          "I0.1 reinicia el contador a cero"
        ],
        objective: "Implementar un contador de lotes de 10 piezas"
      }),
      hints: JSON.stringify([
        "CTU = Counter Up (conteo ascendente)",
        "El bit C1.Q se pone en 1 cuando el valor alcanza el preset",
        "RES reinicia el contador a 0"
      ])
    },
    "Clignotant": {
      title: "Intermitente",
      description: "Cree un circuito para hacer parpadear una salida a 1Hz",
      instructions: JSON.stringify({
        steps: [
          "La salida Q0.0 debe encenderse 500ms y apagarse 500ms",
          "Use dos temporizadores TON",
          "El parpadeo debe ser continuo"
        ],
        objective: "Crear un oscilador de 1Hz con temporizadores"
      }),
      hints: JSON.stringify([
        "Un temporizador inicia al otro cuando termina",
        "Use los bits Q de los temporizadores para crear la oscilación",
        "La salida está activa cuando T1 termina pero no T2"
      ])
    }
  }
}
