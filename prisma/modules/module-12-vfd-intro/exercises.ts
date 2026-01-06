import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module12Exercises: ExerciseData[] = [
  {
    title: "Configuration basique VFD",
    description: "Configurez les paramètres de base d'un variateur de fréquence",
    type: "vfd_config",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Configurez la fréquence nominale du moteur (50Hz)",
        "Définissez la tension nominale (400V)",
        "Réglez la rampe d'accélération à 5 secondes",
        "Réglez la rampe de décélération à 3 secondes"
      ],
      objective: "Paramétrer correctement un VFD pour un moteur standard"
    }),
    solution: JSON.stringify({
      parameters: {
        P001: 50,
        P002: 400,
        P003: 5.0,
        P004: 3.0
      }
    }),
    hints: JSON.stringify([
      "La fréquence nominale correspond à la fréquence réseau (50Hz en Europe)",
      "La tension nominale est celle indiquée sur la plaque moteur",
      "Des rampes trop courtes peuvent déclencher des défauts"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "Lecture plaque signalétique",
    description: "Interprétez les données de la plaque signalétique d'un moteur",
    type: "troubleshooting",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez la puissance nominale",
        "Repérez la tension et le courant nominal",
        "Notez la vitesse de rotation",
        "Calculez le couple nominal"
      ],
      objective: "Extraire toutes les informations utiles de la plaque"
    }),
    solution: JSON.stringify({
      motorData: {
        power: "4 kW",
        voltage: "400V",
        current: "8.5A",
        speed: "1450 tr/min",
        frequency: "50Hz",
        cos_phi: 0.85,
        torque: "26.3 Nm"
      },
      formula: "Couple = (P × 9550) / N"
    }),
    hints: JSON.stringify([
      "La puissance est en kW ou HP",
      "Le courant dépend du couplage (étoile/triangle)",
      "Le couple se calcule: T = (P × 9550) / N"
    ]),
    xpReward: 75,
    order: 2
  },
  {
    title: "Schéma de câblage VFD",
    description: "Réalisez le schéma de câblage d'un variateur",
    type: "wiring",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Connectez l'alimentation triphasée (L1, L2, L3)",
        "Câblez le moteur (U, V, W)",
        "Ajoutez le contact de sécurité",
        "Connectez les entrées de commande (Marche, Arrêt, Vitesse)"
      ],
      objective: "Réaliser un câblage complet et sécurisé"
    }),
    solution: JSON.stringify({
      connections: {
        power: ["L1-R", "L2-S", "L3-T"],
        motor: ["U-U", "V-V", "W-W"],
        safety: ["S1-24V", "S2-DI1"],
        control: ["Start-DI2", "Stop-DI3", "Speed-AI1"]
      }
    }),
    hints: JSON.stringify([
      "Respectez le sens des phases pour le sens de rotation",
      "Le contact de sécurité doit couper l'alimentation",
      "Utilisez des câbles blindés pour les signaux analogiques"
    ]),
    xpReward: 150,
    order: 3
  }
]

export const module12ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Configuration basique VFD": {
      title: "Basic VFD Configuration",
      description: "Configure the basic parameters of a variable frequency drive",
      instructions: JSON.stringify({
        steps: [
          "Configure motor nominal frequency (50Hz)",
          "Set nominal voltage (400V)",
          "Set acceleration ramp to 5 seconds",
          "Set deceleration ramp to 3 seconds"
        ],
        objective: "Correctly configure a VFD for a standard motor"
      }),
      hints: JSON.stringify([
        "Nominal frequency corresponds to grid frequency (50Hz in Europe)",
        "Nominal voltage is shown on the motor nameplate",
        "Ramps that are too short can trigger faults"
      ])
    },
    "Lecture plaque signalétique": {
      title: "Reading Motor Nameplate",
      description: "Interpret the data from a motor nameplate",
      instructions: JSON.stringify({
        steps: [
          "Identify the nominal power",
          "Find the voltage and nominal current",
          "Note the rotation speed",
          "Calculate the nominal torque"
        ],
        objective: "Extract all useful information from the nameplate"
      }),
      hints: JSON.stringify([
        "Power is in kW or HP",
        "Current depends on wiring (star/delta)",
        "Torque is calculated: T = (P × 9550) / N"
      ])
    },
    "Schéma de câblage VFD": {
      title: "VFD Wiring Diagram",
      description: "Create the wiring diagram for a VFD",
      instructions: JSON.stringify({
        steps: [
          "Connect the three-phase power supply (L1, L2, L3)",
          "Wire the motor (U, V, W)",
          "Add the safety contact",
          "Connect control inputs (Start, Stop, Speed)"
        ],
        objective: "Create a complete and safe wiring"
      }),
      hints: JSON.stringify([
        "Respect phase order for rotation direction",
        "Safety contact must cut power",
        "Use shielded cables for analog signals"
      ])
    }
  },
  es: {
    "Configuration basique VFD": {
      title: "Configuración básica VFD",
      description: "Configure los parámetros básicos de un variador de frecuencia",
      instructions: JSON.stringify({
        steps: [
          "Configure la frecuencia nominal del motor (50Hz)",
          "Defina la tensión nominal (400V)",
          "Ajuste la rampa de aceleración a 5 segundos",
          "Ajuste la rampa de desaceleración a 3 segundos"
        ],
        objective: "Configurar correctamente un VFD para un motor estándar"
      }),
      hints: JSON.stringify([
        "La frecuencia nominal corresponde a la frecuencia de red (50Hz en Europa)",
        "La tensión nominal es la indicada en la placa del motor",
        "Rampas demasiado cortas pueden provocar fallos"
      ])
    },
    "Lecture plaque signalétique": {
      title: "Lectura de placa de características",
      description: "Interprete los datos de la placa de características de un motor",
      instructions: JSON.stringify({
        steps: [
          "Identifique la potencia nominal",
          "Encuentre la tensión y corriente nominal",
          "Anote la velocidad de rotación",
          "Calcule el par nominal"
        ],
        objective: "Extraer toda la información útil de la placa"
      }),
      hints: JSON.stringify([
        "La potencia está en kW o HP",
        "La corriente depende del conexionado (estrella/triángulo)",
        "El par se calcula: T = (P × 9550) / N"
      ])
    },
    "Schéma de câblage VFD": {
      title: "Esquema de cableado VFD",
      description: "Realice el esquema de cableado de un variador",
      instructions: JSON.stringify({
        steps: [
          "Conecte la alimentación trifásica (L1, L2, L3)",
          "Cablee el motor (U, V, W)",
          "Añada el contacto de seguridad",
          "Conecte las entradas de control (Marcha, Paro, Velocidad)"
        ],
        objective: "Realizar un cableado completo y seguro"
      }),
      hints: JSON.stringify([
        "Respete el orden de fases para el sentido de giro",
        "El contacto de seguridad debe cortar la alimentación",
        "Use cables apantallados para señales analógicas"
      ])
    }
  }
}
