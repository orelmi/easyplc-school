import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module01Exercises: ExerciseData[] = [
  {
    title: "Identifier les composants d'un automate",
    description: "Identifiez les différentes parties d'un automate programmable industriel",
    type: "plc_config",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Observez le schéma de l'automate présenté",
        "Identifiez le CPU, les modules d'entrées et les modules de sorties",
        "Cliquez sur chaque composant pour le labéliser correctement"
      ],
      objective: "Identifier correctement tous les composants de l'automate"
    }),
    solution: JSON.stringify({
      components: ["CPU", "Power Supply", "Input Module", "Output Module", "Communication Module"]
    }),
    hints: JSON.stringify([
      "Le CPU est généralement au centre du rack",
      "Les modules d'entrées ont des bornes pour connecter les capteurs",
      "Les modules de sorties contrôlent les actionneurs"
    ]),
    xpReward: 75,
    order: 1
  },
  {
    title: "Câblage d'un capteur",
    description: "Connectez un capteur inductif à un module d'entrée de l'automate",
    type: "wiring",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les bornes du capteur (BN, BU, BK)",
        "Connectez le fil brun (BN) à l'alimentation +24V",
        "Connectez le fil bleu (BU) au 0V",
        "Connectez le fil noir (BK) à l'entrée I0.0"
      ],
      objective: "Câbler correctement le capteur à l'automate"
    }),
    initialCode: JSON.stringify({
      connections: []
    }),
    solution: JSON.stringify({
      connections: [
        { from: "sensor.BN", to: "power.24V" },
        { from: "sensor.BU", to: "power.0V" },
        { from: "sensor.BK", to: "plc.I0.0" }
      ]
    }),
    hints: JSON.stringify([
      "BN = Brun = +24V (alimentation)",
      "BU = Bleu = 0V (masse)",
      "BK = Noir = Signal de sortie"
    ]),
    xpReward: 100,
    order: 2
  }
]

export const module01ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Identifier les composants d'un automate": {
      title: "Identify PLC Components",
      description: "Identify the different parts of a programmable logic controller",
      instructions: JSON.stringify({
        steps: [
          "Observe the PLC diagram presented",
          "Identify the CPU, input modules and output modules",
          "Click on each component to label it correctly"
        ],
        objective: "Correctly identify all PLC components"
      }),
      hints: JSON.stringify([
        "The CPU is usually in the center of the rack",
        "Input modules have terminals for connecting sensors",
        "Output modules control actuators"
      ])
    },
    "Câblage d'un capteur": {
      title: "Sensor Wiring",
      description: "Connect an inductive sensor to a PLC input module",
      instructions: JSON.stringify({
        steps: [
          "Identify the sensor terminals (BN, BU, BK)",
          "Connect the brown wire (BN) to +24V power",
          "Connect the blue wire (BU) to 0V",
          "Connect the black wire (BK) to input I0.0"
        ],
        objective: "Correctly wire the sensor to the PLC"
      }),
      hints: JSON.stringify([
        "BN = Brown = +24V (power)",
        "BU = Blue = 0V (ground)",
        "BK = Black = Output signal"
      ])
    }
  },
  es: {
    "Identifier les composants d'un automate": {
      title: "Identificar componentes del PLC",
      description: "Identifique las diferentes partes de un controlador lógico programable",
      instructions: JSON.stringify({
        steps: [
          "Observe el diagrama del PLC presentado",
          "Identifique la CPU, los módulos de entrada y los módulos de salida",
          "Haga clic en cada componente para etiquetarlo correctamente"
        ],
        objective: "Identificar correctamente todos los componentes del PLC"
      }),
      hints: JSON.stringify([
        "La CPU suele estar en el centro del rack",
        "Los módulos de entrada tienen terminales para conectar sensores",
        "Los módulos de salida controlan los actuadores"
      ])
    },
    "Câblage d'un capteur": {
      title: "Cableado de sensor",
      description: "Conecte un sensor inductivo a un módulo de entrada del PLC",
      instructions: JSON.stringify({
        steps: [
          "Identifique los terminales del sensor (BN, BU, BK)",
          "Conecte el cable marrón (BN) a la alimentación +24V",
          "Conecte el cable azul (BU) a 0V",
          "Conecte el cable negro (BK) a la entrada I0.0"
        ],
        objective: "Cablear correctamente el sensor al PLC"
      }),
      hints: JSON.stringify([
        "BN = Marrón = +24V (alimentación)",
        "BU = Azul = 0V (tierra)",
        "BK = Negro = Señal de salida"
      ])
    }
  }
}
