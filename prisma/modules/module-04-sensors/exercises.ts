import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module04Exercises: ExerciseData[] = [
  {
    title: "Choix du capteur approprié",
    description: "Sélectionnez le type de capteur adapté à chaque application",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez chaque situation de détection",
        "Identifiez le matériau à détecter (métal, plastique, verre, etc.)",
        "Choisissez le capteur le plus adapté parmi les options"
      ],
      objective: "Associer correctement 5 applications à leur type de capteur"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "metal", text: "Détection de pièces métalliques" },
        { id: "plastic", text: "Détection de bouteilles en plastique" },
        { id: "counting", text: "Comptage de personnes" },
        { id: "level", text: "Mesure de niveau de liquide" },
        { id: "color", text: "Détection de couleur" }
      ],
      rightItems: [
        { id: "inductif", text: "Capteur inductif" },
        { id: "capacitif", text: "Capteur capacitif" },
        { id: "photo", text: "Capteur photoélectrique" },
        { id: "ultra", text: "Capteur ultrasonique" },
        { id: "optique", text: "Capteur optique couleur" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["metal", "inductif"],
        ["plastic", "capacitif"],
        ["counting", "photo"],
        ["level", "ultra"],
        ["color", "optique"]
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
    config: JSON.stringify({
      components: [
        {
          id: "sensor",
          type: "sensor_3wire",
          label: "Capteur PNP",
          terminals: [
            { id: "BN", label: "BN (Brun)", color: "#8B4513" },
            { id: "BU", label: "BU (Bleu)", color: "#0000FF" },
            { id: "BK", label: "BK (Noir)", color: "#000000" }
          ]
        },
        {
          id: "power",
          type: "power_supply",
          label: "Alimentation",
          terminals: [
            { id: "24V", label: "+24V", color: "#FF0000" },
            { id: "0V", label: "0V", color: "#0000FF" }
          ]
        },
        {
          id: "plc",
          type: "plc_input",
          label: "Automate",
          terminals: [
            { id: "I0.0", label: "I0.0", color: "#00FF00" },
            { id: "COM", label: "COM", color: "#808080" }
          ]
        }
      ],
      wireColors: ["#FF0000", "#0000FF", "#000000", "#00FF00"]
    }),
    solution: JSON.stringify({
      connections: [
        ["sensor.BN", "power.24V"],
        ["sensor.BU", "power.0V"],
        ["sensor.BK", "plc.I0.0"]
      ]
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
    config: JSON.stringify({
      components: [
        {
          id: "sensor",
          type: "sensor_4wire",
          label: "Capteur photoélectrique",
          terminals: [
            { id: "BN", label: "BN (+24V)", color: "#8B4513" },
            { id: "BU", label: "BU (0V)", color: "#0000FF" },
            { id: "BK", label: "BK (NO)", color: "#000000" },
            { id: "WH", label: "WH (NC)", color: "#FFFFFF" }
          ]
        },
        {
          id: "power",
          type: "power_supply",
          label: "Alimentation",
          terminals: [
            { id: "24V", label: "+24V", color: "#FF0000" },
            { id: "0V", label: "0V", color: "#0000FF" }
          ]
        },
        {
          id: "plc",
          type: "plc_input",
          label: "Automate",
          terminals: [
            { id: "I0.0", label: "I0.0 (Présence)", color: "#00FF00" },
            { id: "I0.1", label: "I0.1 (Absence)", color: "#00FF00" },
            { id: "COM", label: "COM", color: "#808080" }
          ]
        }
      ],
      wireColors: ["#FF0000", "#0000FF", "#000000", "#FFFFFF"]
    }),
    solution: JSON.stringify({
      connections: [
        ["sensor.BN", "power.24V"],
        ["sensor.BU", "power.0V"],
        ["sensor.BK", "plc.I0.0"],
        ["sensor.WH", "plc.I0.1"]
      ]
    }),
    hints: JSON.stringify([
      "BK (Noir) = Normalement Ouvert (NO)",
      "WH (Blanc) = Normalement Fermé (NC)",
      "NO s'active quand l'objet est détecté"
    ]),
    xpReward: 125,
    order: 3
  },
  {
    title: "Caractéristiques des capteurs",
    description: "Complétez les caractéristiques des différents types de capteurs",
    type: "fill_blank",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Analysez chaque type de capteur",
        "Complétez les caractéristiques manquantes",
        "Vérifiez vos réponses"
      ],
      objective: "Compléter les caractéristiques des capteurs industriels"
    }),
    config: JSON.stringify({
      text: "Caractéristiques des capteurs:\n\n1. Capteur INDUCTIF:\n   - Détecte les matériaux: {{blank1}}\n   - Portée typique: {{blank2}} mm\n\n2. Capteur CAPACITIF:\n   - Détecte: {{blank3}} types de matériaux\n   - Sensible à: l'humidité et la {{blank4}}\n\n3. Capteur PHOTOÉLECTRIQUE:\n   - Utilise la {{blank5}} pour détecter\n   - Types: barrage, reflex, {{blank6}}",
      blanks: [
        { id: "blank1", placeholder: "type" },
        { id: "blank2", placeholder: "distance" },
        { id: "blank3", placeholder: "quantité" },
        { id: "blank4", placeholder: "facteur" },
        { id: "blank5", placeholder: "source" },
        { id: "blank6", placeholder: "type" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "métalliques|métal|métaux",
        blank2: "1-30|1 à 30|5-10",
        blank3: "tous|plusieurs|différents",
        blank4: "température|poussière",
        blank5: "lumière|LED|infrarouge",
        blank6: "proximité|diffus"
      }
    }),
    hints: JSON.stringify([
      "Les capteurs inductifs ne détectent que le métal",
      "Les capteurs capacitifs sont plus polyvalents",
      "Les photoélectriques ont plusieurs modes de fonctionnement"
    ]),
    xpReward: 100,
    order: 4
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
    },
    "Caractéristiques des capteurs": {
      title: "Sensor Characteristics",
      description: "Complete the characteristics of different sensor types",
      instructions: JSON.stringify({
        steps: [
          "Analyze each sensor type",
          "Complete the missing characteristics",
          "Verify your answers"
        ],
        objective: "Complete the characteristics of industrial sensors"
      }),
      hints: JSON.stringify([
        "Inductive sensors only detect metal",
        "Capacitive sensors are more versatile",
        "Photoelectric sensors have multiple operating modes"
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
    },
    "Caractéristiques des capteurs": {
      title: "Características de los sensores",
      description: "Complete las características de los diferentes tipos de sensores",
      instructions: JSON.stringify({
        steps: [
          "Analice cada tipo de sensor",
          "Complete las características faltantes",
          "Verifique sus respuestas"
        ],
        objective: "Completar las características de los sensores industriales"
      }),
      hints: JSON.stringify([
        "Los sensores inductivos solo detectan metal",
        "Los sensores capacitivos son más versátiles",
        "Los fotoeléctricos tienen varios modos de funcionamiento"
      ])
    }
  }
}
