import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module13Exercises: ExerciseData[] = [
  {
    title: "Paramétrage moteur",
    description: "Configurez les paramètres moteur dans le variateur",
    type: "fill_blank",
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
    config: JSON.stringify({
      text: "Paramètres moteur du variateur:\n\nP100 - Puissance nominale: {{blank1}} kW\nP101 - Tension nominale: {{blank2}} V\nP102 - Courant nominal: {{blank3}} A\nP103 - Fréquence nominale: {{blank4}} Hz\nP104 - Vitesse nominale: {{blank5}} tr/min\nP105 - Facteur de puissance (cos φ): {{blank6}}\n\nCalcul du glissement:\nVitesse synchrone (4 pôles, 50Hz) = {{blank7}} tr/min\nGlissement = (Ns - N) / Ns = ({{blank7}} - {{blank5}}) / {{blank7}} = {{blank8}}%",
      blanks: [
        { id: "blank1", placeholder: "puissance" },
        { id: "blank2", placeholder: "tension" },
        { id: "blank3", placeholder: "courant" },
        { id: "blank4", placeholder: "fréquence" },
        { id: "blank5", placeholder: "vitesse" },
        { id: "blank6", placeholder: "cos phi" },
        { id: "blank7", placeholder: "vitesse sync" },
        { id: "blank8", placeholder: "glissement %" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "5.5",
        blank2: "400",
        blank3: "11",
        blank4: "50",
        blank5: "1460",
        blank6: "0.85",
        blank7: "1500",
        blank8: "2.67|2.7|3"
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
    type: "matching",
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
    config: JSON.stringify({
      leftItems: [
        { id: "accel", text: "Rampe d'accélération longue" },
        { id: "decel", text: "Rampe de décélération courte" },
        { id: "scurve", text: "S-curve activée" },
        { id: "linear", text: "Rampe linéaire" }
      ],
      rightItems: [
        { id: "smooth", text: "Démarrage progressif, moins de stress mécanique" },
        { id: "fast", text: "Arrêt rapide, risque de surtension" },
        { id: "jerk", text: "Réduit les à-coups au début et fin de rampe" },
        { id: "simple", text: "Accélération constante, simple à régler" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["accel", "smooth"],
        ["decel", "fast"],
        ["scurve", "jerk"],
        ["linear", "simple"]
      ]
    }),
    hints: JSON.stringify([
      "Une rampe trop courte peut provoquer un défaut de surintensité",
      "Le S-curve réduit les à-coups mécaniques",
      "Adaptez les rampes à l'inertie de la charge"
    ]),
    xpReward: 100,
    order: 2
  },
  {
    title: "Modes de contrôle VFD",
    description: "Comprenez les différents modes de contrôle d'un variateur",
    type: "drag_drop",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les caractéristiques de chaque mode",
        "Classez-les selon leur complexité",
        "Comprenez leurs applications"
      ],
      objective: "Distinguer les modes V/f, vectoriel et boucle fermée"
    }),
    config: JSON.stringify({
      items: [
        { id: "simple", text: "Configuration simple, pas de retour" },
        { id: "couple", text: "Contrôle précis du couple" },
        { id: "position", text: "Contrôle de position précis" },
        { id: "cheap", text: "Économique, moteur standard" },
        { id: "encoder", text: "Nécessite un codeur" },
        { id: "sensorless", text: "Estimation par mesure courant" }
      ],
      zones: [
        { id: "vf", label: "Mode V/f (scalaire)" },
        { id: "vector", label: "Mode vectoriel" },
        { id: "closed", label: "Boucle fermée" }
      ]
    }),
    solution: JSON.stringify({
      placements: {
        vf: ["simple", "cheap"],
        vector: ["couple", "sensorless"],
        closed: ["position", "encoder"]
      }
    }),
    hints: JSON.stringify([
      "V/f est le mode le plus simple",
      "Le mode vectoriel contrôle flux et couple séparément",
      "La boucle fermée utilise un retour (codeur)"
    ]),
    xpReward: 125,
    order: 3
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
    },
    "Modes de contrôle VFD": {
      title: "VFD Control Modes",
      description: "Understand the different VFD control modes",
      instructions: JSON.stringify({
        steps: [
          "Identify the characteristics of each mode",
          "Classify them by complexity",
          "Understand their applications"
        ],
        objective: "Distinguish V/f, vector, and closed-loop modes"
      }),
      hints: JSON.stringify([
        "V/f is the simplest mode",
        "Vector mode controls flux and torque separately",
        "Closed-loop uses feedback (encoder)"
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
    },
    "Modes de contrôle VFD": {
      title: "Modos de control VFD",
      description: "Comprenda los diferentes modos de control de un variador",
      instructions: JSON.stringify({
        steps: [
          "Identifique las características de cada modo",
          "Clasifíquelos por complejidad",
          "Comprenda sus aplicaciones"
        ],
        objective: "Distinguir los modos V/f, vectorial y lazo cerrado"
      }),
      hints: JSON.stringify([
        "V/f es el modo más simple",
        "El modo vectorial controla flujo y par separadamente",
        "El lazo cerrado usa retroalimentación (encoder)"
      ])
    }
  }
}
