import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module15Exercises: ExerciseData[] = [
  {
    title: "Calcul de résolution encodeur",
    description: "Calculez la résolution d'un système de positionnement",
    type: "troubleshooting",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Encodeur: 1024 impulsions/tour",
        "Vis à billes: pas de 5mm",
        "Calculez la résolution en mm",
        "Déterminez la précision maximale"
      ],
      objective: "Comprendre le lien encodeur/déplacement"
    }),
    solution: JSON.stringify({
      calculation: {
        encoderPPR: 1024,
        leadscrew: 5,
        resolution: 0.00488,
        formula: "Résolution = Pas / (PPR × 4)"
      }
    }),
    hints: JSON.stringify([
      "En quadrature, la résolution est × 4",
      "Résolution = Pas / (Impulsions × 4)",
      "Plus le PPR est élevé, meilleure est la résolution"
    ]),
    xpReward: 125,
    order: 1
  },
  {
    title: "Profil de mouvement trapézoïdal",
    description: "Calculez un profil de déplacement trapézoïdal",
    type: "troubleshooting",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Distance: 500mm",
        "Vitesse max: 100mm/s",
        "Accélération: 500mm/s²",
        "Calculez le temps total de déplacement"
      ],
      objective: "Maîtriser les profils de mouvement"
    }),
    solution: JSON.stringify({
      profile: {
        distance: 500,
        maxSpeed: 100,
        acceleration: 500,
        accelTime: 0.2,
        cruiseTime: 4.8,
        totalTime: 5.2
      }
    }),
    hints: JSON.stringify([
      "Temps d'accélération = Vmax / Accélération",
      "Distance d'accélération = 0.5 × a × t²",
      "Vérifiez que la vitesse max est atteinte"
    ]),
    xpReward: 200,
    order: 2
  }
]

export const module15ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Calcul de résolution encodeur": {
      title: "Encoder Resolution Calculation",
      description: "Calculate the resolution of a positioning system",
      instructions: JSON.stringify({
        steps: [
          "Encoder: 1024 pulses/rev",
          "Ball screw: 5mm pitch",
          "Calculate resolution in mm",
          "Determine maximum precision"
        ],
        objective: "Understand encoder/displacement relationship"
      }),
      hints: JSON.stringify([
        "In quadrature, resolution is × 4",
        "Resolution = Pitch / (Pulses × 4)",
        "Higher PPR means better resolution"
      ])
    },
    "Profil de mouvement trapézoïdal": {
      title: "Trapezoidal Motion Profile",
      description: "Calculate a trapezoidal motion profile",
      instructions: JSON.stringify({
        steps: [
          "Distance: 500mm",
          "Max speed: 100mm/s",
          "Acceleration: 500mm/s²",
          "Calculate total move time"
        ],
        objective: "Master motion profiles"
      }),
      hints: JSON.stringify([
        "Acceleration time = Vmax / Acceleration",
        "Acceleration distance = 0.5 × a × t²",
        "Verify max speed is reached"
      ])
    }
  },
  es: {
    "Calcul de résolution encodeur": {
      title: "Cálculo de resolución del encoder",
      description: "Calcule la resolución de un sistema de posicionamiento",
      instructions: JSON.stringify({
        steps: [
          "Encoder: 1024 pulsos/vuelta",
          "Husillo de bolas: paso de 5mm",
          "Calcule la resolución en mm",
          "Determine la precisión máxima"
        ],
        objective: "Comprender la relación encoder/desplazamiento"
      }),
      hints: JSON.stringify([
        "En cuadratura, la resolución es × 4",
        "Resolución = Paso / (Pulsos × 4)",
        "Mayor PPR significa mejor resolución"
      ])
    },
    "Profil de mouvement trapézoïdal": {
      title: "Perfil de movimiento trapezoidal",
      description: "Calcule un perfil de movimiento trapezoidal",
      instructions: JSON.stringify({
        steps: [
          "Distancia: 500mm",
          "Velocidad máxima: 100mm/s",
          "Aceleración: 500mm/s²",
          "Calcule el tiempo total de desplazamiento"
        ],
        objective: "Dominar los perfiles de movimiento"
      }),
      hints: JSON.stringify([
        "Tiempo de aceleración = Vmax / Aceleración",
        "Distancia de aceleración = 0.5 × a × t²",
        "Verifique que se alcanza la velocidad máxima"
      ])
    }
  }
}
