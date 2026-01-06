import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module12Exercises: ExerciseData[] = [
  {
    title: "Configuration basique VFD",
    description: "Configurez les paramètres de base d'un variateur de fréquence",
    type: "fill_blank",
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
    config: JSON.stringify({
      text: "Configuration de base VFD:\n\nP001 - Fréquence nominale: {{blank1}} Hz\nP002 - Tension nominale: {{blank2}} V\nP003 - Rampe d'accélération: {{blank3}} secondes\nP004 - Rampe de décélération: {{blank4}} secondes\n\nLa relation entre fréquence et vitesse:\nVitesse = (Fréquence × {{blank5}}) / Nombre de paires de pôles\n\nPour un moteur 4 pôles à 50Hz: {{blank6}} tr/min synchrone",
      blanks: [
        { id: "blank1", placeholder: "fréquence" },
        { id: "blank2", placeholder: "tension" },
        { id: "blank3", placeholder: "temps" },
        { id: "blank4", placeholder: "temps" },
        { id: "blank5", placeholder: "valeur" },
        { id: "blank6", placeholder: "vitesse" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "50",
        blank2: "400",
        blank3: "5",
        blank4: "3",
        blank5: "60|120",
        blank6: "1500"
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
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez la puissance nominale",
        "Repérez la tension et le courant nominal",
        "Notez la vitesse de rotation",
        "Comprenez le facteur de puissance"
      ],
      objective: "Extraire toutes les informations utiles de la plaque"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "kw", text: "4 kW" },
        { id: "volt", text: "400 V" },
        { id: "amp", text: "8.5 A" },
        { id: "rpm", text: "1450 tr/min" },
        { id: "cos", text: "cos φ = 0.85" }
      ],
      rightItems: [
        { id: "power", text: "Puissance mécanique nominale" },
        { id: "voltage", text: "Tension d'alimentation triphasée" },
        { id: "current", text: "Courant nominal absorbé" },
        { id: "speed", text: "Vitesse de rotation nominale" },
        { id: "factor", text: "Facteur de puissance (rendement réactif)" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["kw", "power"],
        ["volt", "voltage"],
        ["amp", "current"],
        ["rpm", "speed"],
        ["cos", "factor"]
      ]
    }),
    hints: JSON.stringify([
      "La puissance est en kW ou HP",
      "Le courant dépend du couplage (étoile/triangle)",
      "Le cos φ indique l'efficacité du moteur"
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
    config: JSON.stringify({
      components: [
        {
          id: "power",
          type: "power_supply",
          label: "Alimentation triphasée",
          terminals: [
            { id: "L1", label: "L1", color: "#8B4513" },
            { id: "L2", label: "L2", color: "#000000" },
            { id: "L3", label: "L3", color: "#808080" }
          ]
        },
        {
          id: "vfd",
          type: "vfd",
          label: "Variateur",
          terminals: [
            { id: "R", label: "R (L1)", color: "#8B4513" },
            { id: "S", label: "S (L2)", color: "#000000" },
            { id: "T", label: "T (L3)", color: "#808080" },
            { id: "U", label: "U", color: "#FF0000" },
            { id: "V", label: "V", color: "#FFFF00" },
            { id: "W", label: "W", color: "#0000FF" },
            { id: "DI1", label: "DI1 (Marche)", color: "#00FF00" },
            { id: "DI2", label: "DI2 (Arrêt)", color: "#00FF00" },
            { id: "AI1", label: "AI1 (Vitesse)", color: "#FFA500" }
          ]
        },
        {
          id: "motor",
          type: "motor",
          label: "Moteur",
          terminals: [
            { id: "U", label: "U", color: "#FF0000" },
            { id: "V", label: "V", color: "#FFFF00" },
            { id: "W", label: "W", color: "#0000FF" }
          ]
        }
      ],
      wireColors: ["#8B4513", "#000000", "#808080", "#FF0000", "#FFFF00", "#0000FF"]
    }),
    solution: JSON.stringify({
      connections: [
        ["power.L1", "vfd.R"],
        ["power.L2", "vfd.S"],
        ["power.L3", "vfd.T"],
        ["vfd.U", "motor.U"],
        ["vfd.V", "motor.V"],
        ["vfd.W", "motor.W"]
      ]
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
          "Understand the power factor"
        ],
        objective: "Extract all useful information from the nameplate"
      }),
      hints: JSON.stringify([
        "Power is in kW or HP",
        "Current depends on wiring (star/delta)",
        "cos φ indicates motor efficiency"
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
          "Comprenda el factor de potencia"
        ],
        objective: "Extraer toda la información útil de la placa"
      }),
      hints: JSON.stringify([
        "La potencia está en kW o HP",
        "La corriente depende del conexionado (estrella/triángulo)",
        "cos φ indica la eficiencia del motor"
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
