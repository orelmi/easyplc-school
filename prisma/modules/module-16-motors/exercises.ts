import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module16Exercises: ExerciseData[] = [
  {
    title: "Choix du type de moteur",
    description: "Sélectionnez le type de moteur adapté à chaque application",
    type: "troubleshooting",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez les besoins de chaque application",
        "Comparez: asynchrone, brushless, pas à pas",
        "Considérez: couple, vitesse, précision, coût"
      ],
      objective: "Choisir le moteur optimal pour chaque cas"
    }),
    solution: JSON.stringify({
      applications: {
        "Convoyeur": { motor: "Asynchrone", reason: "Couple constant, coût faible" },
        "Robot": { motor: "Brushless", reason: "Précision, dynamique" },
        "Imprimante 3D": { motor: "Pas à pas", reason: "Positionnement précis, coût" }
      }
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
    type: "troubleshooting",
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
    solution: JSON.stringify({
      calculation: {
        torque: 5,
        power: 1570,
        formula: "T = J × α, P = T × ω"
      }
    }),
    hints: JSON.stringify([
      "Couple d'accélération = Inertie × Accélération",
      "Ajoutez le couple de charge",
      "Prévoyez une marge de 20-30%"
    ]),
    xpReward: 175,
    order: 2
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
    }
  }
}
