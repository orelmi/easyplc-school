import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module13Exercises: ExerciseData[] = [
  {
    title: "Paramétrage moteur",
    description: "Configurez les paramètres moteur dans le variateur",
    type: "vfd_config",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Entrez les données de la plaque moteur",
        "Puissance: 5.5 kW, Tension: 400V, Courant: 11A",
        "Fréquence: 50Hz, Vitesse: 1460 tr/min, cos φ: 0.85",
        "Lancez l'auto-tuning"
      ],
      objective: "Configurer correctement les paramètres moteur"
    }),
    solution: JSON.stringify({
      parameters: {
        P100: 5.5,
        P101: 400,
        P102: 11,
        P103: 50,
        P104: 1460,
        P105: 0.85
      }
    }),
    hints: JSON.stringify([
      "Toutes les valeurs sont sur la plaque moteur",
      "L'auto-tuning optimise les paramètres de régulation",
      "Faites tourner le moteur à vide pour l'auto-tuning"
    ]),
    xpReward: 150,
    order: 1
  },
  {
    title: "Configuration des rampes",
    description: "Configurez les rampes d'accélération et décélération",
    type: "vfd_config",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Rampe d'accélération: 10 secondes",
        "Rampe de décélération: 5 secondes",
        "Activez le lissage S-curve",
        "Testez avec différentes consignes"
      ],
      objective: "Optimiser les rampes pour un démarrage doux"
    }),
    solution: JSON.stringify({
      parameters: {
        P200: 10.0,
        P201: 5.0,
        P202: 1
      }
    }),
    hints: JSON.stringify([
      "Une rampe trop courte peut provoquer un défaut de surintensité",
      "Le S-curve réduit les à-coups mécaniques",
      "Adaptez les rampes à l'inertie de la charge"
    ]),
    xpReward: 100,
    order: 2
  }
]

export const module13ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Paramétrage moteur": {
      title: "Motor Parameters",
      description: "Configure motor parameters in the drive",
      instructions: JSON.stringify({
        steps: [
          "Enter motor nameplate data",
          "Power: 5.5 kW, Voltage: 400V, Current: 11A",
          "Frequency: 50Hz, Speed: 1460 rpm, cos φ: 0.85",
          "Run auto-tuning"
        ],
        objective: "Correctly configure motor parameters"
      }),
      hints: JSON.stringify([
        "All values are on the motor nameplate",
        "Auto-tuning optimizes control parameters",
        "Run motor unloaded for auto-tuning"
      ])
    },
    "Configuration des rampes": {
      title: "Ramp Configuration",
      description: "Configure acceleration and deceleration ramps",
      instructions: JSON.stringify({
        steps: [
          "Acceleration ramp: 10 seconds",
          "Deceleration ramp: 5 seconds",
          "Enable S-curve smoothing",
          "Test with different setpoints"
        ],
        objective: "Optimize ramps for smooth starting"
      }),
      hints: JSON.stringify([
        "A ramp too short can cause overcurrent fault",
        "S-curve reduces mechanical jolts",
        "Adapt ramps to load inertia"
      ])
    }
  },
  es: {
    "Paramétrage moteur": {
      title: "Parámetros del motor",
      description: "Configure los parámetros del motor en el variador",
      instructions: JSON.stringify({
        steps: [
          "Introduzca los datos de la placa del motor",
          "Potencia: 5.5 kW, Tensión: 400V, Corriente: 11A",
          "Frecuencia: 50Hz, Velocidad: 1460 rpm, cos φ: 0.85",
          "Lance el auto-tuning"
        ],
        objective: "Configurar correctamente los parámetros del motor"
      }),
      hints: JSON.stringify([
        "Todos los valores están en la placa del motor",
        "El auto-tuning optimiza los parámetros de regulación",
        "Haga girar el motor en vacío para el auto-tuning"
      ])
    },
    "Configuration des rampes": {
      title: "Configuración de rampas",
      description: "Configure las rampas de aceleración y desaceleración",
      instructions: JSON.stringify({
        steps: [
          "Rampa de aceleración: 10 segundos",
          "Rampa de desaceleración: 5 segundos",
          "Active el suavizado S-curve",
          "Pruebe con diferentes consignas"
        ],
        objective: "Optimizar las rampas para un arranque suave"
      }),
      hints: JSON.stringify([
        "Una rampa muy corta puede provocar fallo por sobrecorriente",
        "El S-curve reduce los golpes mecánicos",
        "Adapte las rampas a la inercia de la carga"
      ])
    }
  }
}
