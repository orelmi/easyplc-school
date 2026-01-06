import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module04Exercises: ExerciseData[] = [
  {
    title: "Choix du capteur approprié",
    description: "Sélectionnez le type de capteur adapté à chaque application",
    type: "troubleshooting",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez chaque situation de détection",
        "Identifiez le matériau à détecter (métal, plastique, verre, etc.)",
        "Choisissez le capteur le plus adapté parmi les options"
      ],
      objective: "Associer correctement 5 applications à leur type de capteur"
    }),
    solution: JSON.stringify({
      associations: [
        { application: "Détection de pièces métalliques", sensor: "inductif" },
        { application: "Détection de bouteilles en plastique", sensor: "capacitif" },
        { application: "Comptage de personnes", sensor: "photoélectrique" },
        { application: "Mesure de niveau de liquide", sensor: "ultrasonique" },
        { application: "Détection de couleur", sensor: "optique couleur" }
      ]
    }),
    hints: JSON.stringify([
      "Les capteurs inductifs détectent uniquement les métaux",
      "Les capteurs capacitifs détectent tous les matériaux",
      "Les capteurs photoélectriques utilisent la lumière"
    ]),
    xpReward: 75,
    order: 1
  },
  {
    title: "Câblage capteur 3 fils PNP",
    description: "Câblez un capteur inductif PNP à un automate",
    type: "wiring",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les 3 fils du capteur (BN, BU, BK)",
        "Connectez l'alimentation (+24V et 0V)",
        "Connectez le signal de sortie à l'entrée automate",
        "Vérifiez la polarité"
      ],
      objective: "Câbler correctement un capteur 3 fils PNP"
    }),
    initialCode: JSON.stringify({
      connections: []
    }),
    solution: JSON.stringify({
      connections: [
        { from: "sensor.BN", to: "power.24V" },
        { from: "sensor.BU", to: "power.0V" },
        { from: "sensor.BK", to: "plc.I0.0" }
      ],
      type: "PNP"
    }),
    hints: JSON.stringify([
      "PNP = le capteur fournit du +24V quand activé",
      "BN (Brun) = +24V, BU (Bleu) = 0V",
      "BK (Noir) = Signal de sortie"
    ]),
    xpReward: 100,
    order: 2
  },
  {
    title: "Câblage capteur 4 fils",
    description: "Câblez un capteur photoélectrique 4 fils avec sortie NO et NC",
    type: "wiring",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Le capteur a 4 fils: BN (+24V), BU (0V), BK (NO), WH (NC)",
        "Utilisez la sortie NO pour détecter la présence",
        "Utilisez la sortie NC pour détecter l'absence",
        "Connectez les deux sorties à l'automate"
      ],
      objective: "Câbler un capteur 4 fils avec ses deux sorties"
    }),
    solution: JSON.stringify({
      connections: [
        { from: "sensor.BN", to: "power.24V" },
        { from: "sensor.BU", to: "power.0V" },
        { from: "sensor.BK", to: "plc.I0.0" },
        { from: "sensor.WH", to: "plc.I0.1" }
      ]
    }),
    hints: JSON.stringify([
      "BK (Noir) = Normalement Ouvert (NO)",
      "WH (Blanc) = Normalement Fermé (NC)",
      "NO s'active quand l'objet est détecté"
    ]),
    xpReward: 125,
    order: 3
  }
]

export const module04ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Choix du capteur approprié": {
      title: "Choosing the Right Sensor",
      description: "Select the appropriate sensor type for each application",
      instructions: JSON.stringify({
        steps: [
          "Analyze each detection situation",
          "Identify the material to detect (metal, plastic, glass, etc.)",
          "Choose the most suitable sensor from the options"
        ],
        objective: "Correctly match 5 applications to their sensor type"
      }),
      hints: JSON.stringify([
        "Inductive sensors detect only metals",
        "Capacitive sensors detect all materials",
        "Photoelectric sensors use light"
      ])
    },
    "Câblage capteur 3 fils PNP": {
      title: "3-Wire PNP Sensor Wiring",
      description: "Wire a PNP inductive sensor to a PLC",
      instructions: JSON.stringify({
        steps: [
          "Identify the 3 sensor wires (BN, BU, BK)",
          "Connect the power supply (+24V and 0V)",
          "Connect the output signal to the PLC input",
          "Check the polarity"
        ],
        objective: "Correctly wire a 3-wire PNP sensor"
      }),
      hints: JSON.stringify([
        "PNP = sensor provides +24V when activated",
        "BN (Brown) = +24V, BU (Blue) = 0V",
        "BK (Black) = Output signal"
      ])
    },
    "Câblage capteur 4 fils": {
      title: "4-Wire Sensor Wiring",
      description: "Wire a 4-wire photoelectric sensor with NO and NC outputs",
      instructions: JSON.stringify({
        steps: [
          "The sensor has 4 wires: BN (+24V), BU (0V), BK (NO), WH (NC)",
          "Use the NO output to detect presence",
          "Use the NC output to detect absence",
          "Connect both outputs to the PLC"
        ],
        objective: "Wire a 4-wire sensor with both outputs"
      }),
      hints: JSON.stringify([
        "BK (Black) = Normally Open (NO)",
        "WH (White) = Normally Closed (NC)",
        "NO activates when object is detected"
      ])
    }
  },
  es: {
    "Choix du capteur approprié": {
      title: "Elección del sensor apropiado",
      description: "Seleccione el tipo de sensor adecuado para cada aplicación",
      instructions: JSON.stringify({
        steps: [
          "Analice cada situación de detección",
          "Identifique el material a detectar (metal, plástico, vidrio, etc.)",
          "Elija el sensor más adecuado entre las opciones"
        ],
        objective: "Asociar correctamente 5 aplicaciones a su tipo de sensor"
      }),
      hints: JSON.stringify([
        "Los sensores inductivos detectan solo metales",
        "Los sensores capacitivos detectan todos los materiales",
        "Los sensores fotoeléctricos usan luz"
      ])
    },
    "Câblage capteur 3 fils PNP": {
      title: "Cableado sensor 3 hilos PNP",
      description: "Cablee un sensor inductivo PNP a un PLC",
      instructions: JSON.stringify({
        steps: [
          "Identifique los 3 cables del sensor (BN, BU, BK)",
          "Conecte la alimentación (+24V y 0V)",
          "Conecte la señal de salida a la entrada del PLC",
          "Verifique la polaridad"
        ],
        objective: "Cablear correctamente un sensor 3 hilos PNP"
      }),
      hints: JSON.stringify([
        "PNP = el sensor proporciona +24V cuando está activado",
        "BN (Marrón) = +24V, BU (Azul) = 0V",
        "BK (Negro) = Señal de salida"
      ])
    },
    "Câblage capteur 4 fils": {
      title: "Cableado sensor 4 hilos",
      description: "Cablee un sensor fotoeléctrico 4 hilos con salida NO y NC",
      instructions: JSON.stringify({
        steps: [
          "El sensor tiene 4 cables: BN (+24V), BU (0V), BK (NO), WH (NC)",
          "Use la salida NO para detectar presencia",
          "Use la salida NC para detectar ausencia",
          "Conecte ambas salidas al PLC"
        ],
        objective: "Cablear un sensor 4 hilos con sus dos salidas"
      }),
      hints: JSON.stringify([
        "BK (Negro) = Normalmente Abierto (NO)",
        "WH (Blanco) = Normalmente Cerrado (NC)",
        "NO se activa cuando se detecta el objeto"
      ])
    }
  }
}
