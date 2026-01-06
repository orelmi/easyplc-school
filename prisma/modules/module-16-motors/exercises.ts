import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module16Exercises: ExerciseData[] = [
  {
    title: "Choix du type de moteur",
    description: "Sélectionnez le type de moteur adapté à chaque application",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez les besoins de chaque application",
        "Comparez: asynchrone, brushless, pas à pas",
        "Considérez: couple, vitesse, précision, coût"
      ],
      objective: "Choisir le moteur optimal pour chaque cas"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "conveyor", text: "Convoyeur industriel" },
        { id: "robot", text: "Robot articulé 6 axes" },
        { id: "printer", text: "Imprimante 3D" },
        { id: "pump", text: "Pompe centrifuge" },
        { id: "cnc", text: "Axe de machine CNC" }
      ],
      rightItems: [
        { id: "async", text: "Moteur asynchrone - Couple constant, coût faible" },
        { id: "brushless", text: "Servomoteur brushless - Haute dynamique, précision" },
        { id: "stepper", text: "Moteur pas à pas - Positionnement simple, boucle ouverte" },
        { id: "async2", text: "Asynchrone avec VFD - Variation de vitesse économique" },
        { id: "servo", text: "Servomoteur avec encodeur - Positionnement précis haute vitesse" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["conveyor", "async"],
        ["robot", "brushless"],
        ["printer", "stepper"],
        ["pump", "async2"],
        ["cnc", "servo"]
      ]
    }),
    hints: JSON.stringify([
      "Asynchrone: applications de puissance",
      "Brushless: haute dynamique et précision",
      "Pas à pas: positionnement simple sans boucle"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "Dimensionnement moteur",
    description: "Calculez les besoins en couple et puissance",
    type: "fill_blank",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Charge: 50 kg, inertie 0.5 kg.m²",
        "Accélération requise: 10 rad/s²",
        "Vitesse max: 3000 tr/min",
        "Calculez le couple et la puissance"
      ],
      objective: "Dimensionner correctement un moteur"
    }),
    config: JSON.stringify({
      text: "Dimensionnement d'un servomoteur:\n\nDonnées:\n- Inertie totale (charge + moteur): J = {{blank1}} kg.m²\n- Accélération angulaire requise: α = {{blank2}} rad/s²\n- Vitesse maximale: N = {{blank3}} tr/min\n\nCalcul du couple d'accélération:\nT_acc = J × α = {{blank1}} × {{blank2}} = {{blank4}} N.m\n\nConversion vitesse en rad/s:\nω = (2 × π × N) / 60 = (2 × π × {{blank3}}) / 60 = {{blank5}} rad/s\n\nCalcul de la puissance:\nP = T × ω = {{blank4}} × {{blank5}} = {{blank6}} W\n\nAvec marge de sécurité (25%):\nP_moteur ≥ {{blank6}} × 1.25 = {{blank7}} W = {{blank8}} kW",
      blanks: [
        { id: "blank1", placeholder: "inertie" },
        { id: "blank2", placeholder: "accélération" },
        { id: "blank3", placeholder: "vitesse" },
        { id: "blank4", placeholder: "couple" },
        { id: "blank5", placeholder: "rad/s" },
        { id: "blank6", placeholder: "puissance W" },
        { id: "blank7", placeholder: "P avec marge" },
        { id: "blank8", placeholder: "P kW" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "0.5",
        blank2: "10",
        blank3: "3000",
        blank4: "5",
        blank5: "314|314.16",
        blank6: "1570|1571",
        blank7: "1962|1963|1964",
        blank8: "1.96|2|1.97"
      }
    }),
    hints: JSON.stringify([
      "Couple d'accélération = Inertie × Accélération",
      "Ajoutez le couple de charge",
      "Prévoyez une marge de 20-30%"
    ]),
    xpReward: 175,
    order: 2
  },
  {
    title: "Caractéristiques des moteurs",
    description: "Identifiez les caractéristiques de chaque type de moteur",
    type: "drag_drop",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Classez les caractéristiques par type de moteur",
        "Identifiez les avantages et inconvénients",
        "Comprenez les domaines d'application"
      ],
      objective: "Comprendre les spécificités de chaque moteur"
    }),
    config: JSON.stringify({
      items: [
        { id: "simple", text: "Construction simple, robuste" },
        { id: "maintenance", text: "Pas de balais, faible maintenance" },
        { id: "steps", text: "Rotation par pas discrets" },
        { id: "induction", text: "Fonctionne par induction" },
        { id: "magnets", text: "Aimants permanents au rotor" },
        { id: "openloop", text: "Fonctionne sans capteur de position" },
        { id: "lowspeed", text: "Fort couple à basse vitesse" },
        { id: "efficient", text: "Rendement élevé (>90%)" }
      ],
      zones: [
        { id: "async", label: "Moteur asynchrone" },
        { id: "brushless", label: "Servomoteur brushless" },
        { id: "stepper", label: "Moteur pas à pas" }
      ]
    }),
    solution: JSON.stringify({
      placements: {
        async: ["simple", "induction"],
        brushless: ["maintenance", "magnets", "efficient"],
        stepper: ["steps", "openloop", "lowspeed"]
      }
    }),
    hints: JSON.stringify([
      "Le moteur asynchrone est le plus simple et robuste",
      "Le brushless utilise des aimants permanents",
      "Le pas à pas avance par incréments fixes"
    ]),
    xpReward: 150,
    order: 3
  }
]

export const module16ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Choix du type de moteur": {
      title: "Motor Type Selection",
      description: "Select the appropriate motor type for each application",
      instructions: JSON.stringify({
        steps: [
          "Analyze each application's needs",
          "Compare: induction, brushless, stepper",
          "Consider: torque, speed, precision, cost"
        ],
        objective: "Choose the optimal motor for each case"
      }),
      hints: JSON.stringify([
        "Induction: power applications",
        "Brushless: high dynamics and precision",
        "Stepper: simple positioning without feedback"
      ])
    },
    "Dimensionnement moteur": {
      title: "Motor Sizing",
      description: "Calculate torque and power requirements",
      instructions: JSON.stringify({
        steps: [
          "Load: 50 kg, inertia 0.5 kg.m²",
          "Required acceleration: 10 rad/s²",
          "Max speed: 3000 rpm",
          "Calculate torque and power"
        ],
        objective: "Correctly size a motor"
      }),
      hints: JSON.stringify([
        "Acceleration torque = Inertia × Acceleration",
        "Add load torque",
        "Plan for 20-30% margin"
      ])
    },
    "Caractéristiques des moteurs": {
      title: "Motor Characteristics",
      description: "Identify characteristics of each motor type",
      instructions: JSON.stringify({
        steps: [
          "Classify characteristics by motor type",
          "Identify advantages and disadvantages",
          "Understand application domains"
        ],
        objective: "Understand specifics of each motor"
      }),
      hints: JSON.stringify([
        "Induction motor is simplest and most robust",
        "Brushless uses permanent magnets",
        "Stepper moves in fixed increments"
      ])
    }
  },
  es: {
    "Choix du type de moteur": {
      title: "Selección del tipo de motor",
      description: "Seleccione el tipo de motor adecuado para cada aplicación",
      instructions: JSON.stringify({
        steps: [
          "Analice las necesidades de cada aplicación",
          "Compare: asíncrono, brushless, paso a paso",
          "Considere: par, velocidad, precisión, costo"
        ],
        objective: "Elegir el motor óptimo para cada caso"
      }),
      hints: JSON.stringify([
        "Asíncrono: aplicaciones de potencia",
        "Brushless: alta dinámica y precisión",
        "Paso a paso: posicionamiento simple sin lazo"
      ])
    },
    "Dimensionnement moteur": {
      title: "Dimensionamiento de motor",
      description: "Calcule los requisitos de par y potencia",
      instructions: JSON.stringify({
        steps: [
          "Carga: 50 kg, inercia 0.5 kg.m²",
          "Aceleración requerida: 10 rad/s²",
          "Velocidad máx: 3000 rpm",
          "Calcule el par y la potencia"
        ],
        objective: "Dimensionar correctamente un motor"
      }),
      hints: JSON.stringify([
        "Par de aceleración = Inercia × Aceleración",
        "Añada el par de carga",
        "Prevea un margen del 20-30%"
      ])
    },
    "Caractéristiques des moteurs": {
      title: "Características de los motores",
      description: "Identifique las características de cada tipo de motor",
      instructions: JSON.stringify({
        steps: [
          "Clasifique las características por tipo de motor",
          "Identifique ventajas e inconvenientes",
          "Comprenda los dominios de aplicación"
        ],
        objective: "Comprender las especificidades de cada motor"
      }),
      hints: JSON.stringify([
        "El motor asíncrono es el más simple y robusto",
        "El brushless usa imanes permanentes",
        "El paso a paso avanza por incrementos fijos"
      ])
    }
  }
}
