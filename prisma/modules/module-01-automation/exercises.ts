import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module01Exercises: ExerciseData[] = [
  {
    title: "Identifier les composants d'un automate",
    description: "Identifiez les différentes parties d'un automate programmable industriel",
    type: "drag_drop",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Observez le schéma de l'automate présenté",
        "Faites glisser chaque étiquette vers le composant correspondant",
        "Vérifiez que tous les composants sont correctement identifiés"
      ],
      objective: "Identifier correctement tous les composants de l'automate"
    }),
    config: JSON.stringify({
      dropZones: [
        { id: "zone-cpu", label: "CPU", x: 40, y: 30, width: 100, height: 60 },
        { id: "zone-power", label: "Alimentation", x: 10, y: 30, width: 80, height: 60 },
        { id: "zone-input", label: "Entrées", x: 70, y: 30, width: 80, height: 60 },
        { id: "zone-output", label: "Sorties", x: 100, y: 30, width: 80, height: 60 },
        { id: "zone-comm", label: "Communication", x: 130, y: 30, width: 80, height: 60 }
      ],
      draggables: [
        { id: "item-cpu", content: "CPU", type: "component" },
        { id: "item-power", content: "Alimentation", type: "component" },
        { id: "item-input", content: "Module d'entrées", type: "component" },
        { id: "item-output", content: "Module de sorties", type: "component" },
        { id: "item-comm", content: "Module de communication", type: "component" }
      ],
      instruction: "Faites glisser chaque composant vers son emplacement sur le rack de l'automate"
    }),
    solution: JSON.stringify({
      placements: {
        "zone-cpu": ["item-cpu"],
        "zone-power": ["item-power"],
        "zone-input": ["item-input"],
        "zone-output": ["item-output"],
        "zone-comm": ["item-comm"]
      }
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
    config: JSON.stringify({
      components: [
        {
          id: "sensor",
          type: "sensor",
          label: "Capteur inductif",
          x: 50,
          y: 100,
          terminals: [
            { id: "sensor-bn", label: "BN (+)", type: "power", position: "right", offset: 25 },
            { id: "sensor-bu", label: "BU (0V)", type: "ground", position: "right", offset: 50 },
            { id: "sensor-bk", label: "BK (signal)", type: "output", position: "right", offset: 75 }
          ]
        },
        {
          id: "power",
          type: "power",
          label: "Alimentation 24V",
          x: 300,
          y: 50,
          terminals: [
            { id: "power-24v", label: "+24V", type: "power", position: "left", offset: 33 },
            { id: "power-0v", label: "0V", type: "ground", position: "left", offset: 66 }
          ]
        },
        {
          id: "plc",
          type: "plc",
          label: "Automate PLC",
          x: 300,
          y: 200,
          terminals: [
            { id: "plc-i00", label: "I0.0", type: "input", position: "left", offset: 25 },
            { id: "plc-i01", label: "I0.1", type: "input", position: "left", offset: 50 },
            { id: "plc-i02", label: "I0.2", type: "input", position: "left", offset: 75 }
          ]
        }
      ],
      instruction: "Connectez le capteur inductif à l'alimentation et à l'entrée I0.0 de l'automate"
    }),
    solution: JSON.stringify({
      connections: [
        ["sensor-bn", "power-24v"],
        ["sensor-bu", "power-0v"],
        ["sensor-bk", "plc-i00"]
      ]
    }),
    hints: JSON.stringify([
      "BN = Brun = +24V (alimentation)",
      "BU = Bleu = 0V (masse)",
      "BK = Noir = Signal de sortie"
    ]),
    xpReward: 100,
    order: 2
  },
  {
    title: "Vocabulaire de l'automatisation",
    description: "Testez vos connaissances sur le vocabulaire de base de l'automatisation",
    type: "fill_blank",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Lisez chaque phrase attentivement",
        "Complétez les espaces avec le terme approprié",
        "Validez vos réponses"
      ],
      objective: "Compléter correctement tous les termes techniques"
    }),
    config: JSON.stringify({
      template: "Un ___ est un contrôleur logique programmable utilisé pour automatiser les processus industriels. Les ___ captent les informations de l'environnement tandis que les ___ agissent sur le processus. Le programme s'exécute de manière ___.",
      blanks: [
        { id: "blank-1", position: 0, expectedAnswers: ["automate", "plc", "api"], hint: "Sigle anglais: PLC" },
        { id: "blank-2", position: 1, expectedAnswers: ["capteurs", "sensors"], hint: "Ils détectent les états" },
        { id: "blank-3", position: 2, expectedAnswers: ["actionneurs", "actuators"], hint: "Ils font l'action" },
        { id: "blank-4", position: 3, expectedAnswers: ["cyclique", "cyclic"], hint: "En boucle continue" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        "blank-1": "automate|plc|api",
        "blank-2": "capteurs|sensors",
        "blank-3": "actionneurs|actuators",
        "blank-4": "cyclique|cyclic"
      }
    }),
    hints: JSON.stringify([
      "Le premier terme est le nom français d'un PLC",
      "Les capteurs sont aussi appelés sensors en anglais",
      "Le contraire des capteurs"
    ]),
    xpReward: 50,
    order: 3
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
          "Drag each label to the corresponding component",
          "Verify that all components are correctly identified"
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
    },
    "Vocabulaire de l'automatisation": {
      title: "Automation Vocabulary",
      description: "Test your knowledge of basic automation vocabulary",
      instructions: JSON.stringify({
        steps: [
          "Read each sentence carefully",
          "Fill in the blanks with the appropriate term",
          "Validate your answers"
        ],
        objective: "Correctly complete all technical terms"
      }),
      hints: JSON.stringify([
        "The first term is the name for a PLC",
        "Sensors detect states",
        "The opposite of sensors"
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
          "Arrastre cada etiqueta al componente correspondiente",
          "Verifique que todos los componentes estén correctamente identificados"
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
    },
    "Vocabulaire de l'automatisation": {
      title: "Vocabulario de automatización",
      description: "Pruebe sus conocimientos sobre el vocabulario básico de automatización",
      instructions: JSON.stringify({
        steps: [
          "Lea cada frase cuidadosamente",
          "Complete los espacios con el término apropiado",
          "Valide sus respuestas"
        ],
        objective: "Completar correctamente todos los términos técnicos"
      }),
      hints: JSON.stringify([
        "El primer término es el nombre de un PLC",
        "Los sensores detectan estados",
        "Lo opuesto a los sensores"
      ])
    }
  }
}
