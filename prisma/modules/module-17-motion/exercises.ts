import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module17Exercises: ExerciseData[] = [
  {
    title: "Synchronisation d'axes",
    description: "Programmez une synchronisation maître/esclave",
    type: "plc_config",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Configurez l'axe maître (convoyeur)",
        "Configurez l'axe esclave (robot)",
        "Définissez le rapport de réduction: 2:1",
        "Testez la synchronisation"
      ],
      objective: "Réaliser un couplage électronique"
    }),
    solution: JSON.stringify({
      configuration: {
        master: "Axis1",
        slave: "Axis2",
        ratio: 2.0,
        mode: "velocity"
      }
    }),
    hints: JSON.stringify([
      "Le mode vitesse synchronise les vitesses",
      "Le mode position synchronise les positions",
      "Prévoyez une rampe de raccordement"
    ]),
    xpReward: 200,
    order: 1
  },
  {
    title: "Came électronique",
    description: "Créez un profil de came électronique",
    type: "plc_config",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Définissez les points du profil de came",
        "Interpolez les points (linéaire ou spline)",
        "Associez la came à un axe maître",
        "Testez le mouvement"
      ],
      objective: "Programmer une came électronique"
    }),
    solution: JSON.stringify({
      camProfile: [
        { master: 0, slave: 0 },
        { master: 90, slave: 50 },
        { master: 180, slave: 100 },
        { master: 270, slave: 50 },
        { master: 360, slave: 0 }
      ]
    }),
    hints: JSON.stringify([
      "La came remplace les cames mécaniques",
      "L'interpolation spline donne des mouvements plus doux",
      "Vérifiez les vitesses et accélérations résultantes"
    ]),
    xpReward: 250,
    order: 2
  }
]

export const module17ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Synchronisation d'axes": {
      title: "Axis Synchronization",
      description: "Program a master/slave synchronization",
      instructions: JSON.stringify({
        steps: [
          "Configure master axis (conveyor)",
          "Configure slave axis (robot)",
          "Define gear ratio: 2:1",
          "Test synchronization"
        ],
        objective: "Achieve electronic gearing"
      }),
      hints: JSON.stringify([
        "Velocity mode synchronizes speeds",
        "Position mode synchronizes positions",
        "Plan a blending ramp"
      ])
    },
    "Came électronique": {
      title: "Electronic Cam",
      description: "Create an electronic cam profile",
      instructions: JSON.stringify({
        steps: [
          "Define cam profile points",
          "Interpolate points (linear or spline)",
          "Associate cam with master axis",
          "Test the motion"
        ],
        objective: "Program an electronic cam"
      }),
      hints: JSON.stringify([
        "The cam replaces mechanical cams",
        "Spline interpolation gives smoother motion",
        "Check resulting velocities and accelerations"
      ])
    }
  },
  es: {
    "Synchronisation d'axes": {
      title: "Sincronización de ejes",
      description: "Programe una sincronización maestro/esclavo",
      instructions: JSON.stringify({
        steps: [
          "Configure el eje maestro (transportador)",
          "Configure el eje esclavo (robot)",
          "Defina la relación de reducción: 2:1",
          "Pruebe la sincronización"
        ],
        objective: "Realizar un acoplamiento electrónico"
      }),
      hints: JSON.stringify([
        "El modo velocidad sincroniza las velocidades",
        "El modo posición sincroniza las posiciones",
        "Prevea una rampa de enlace"
      ])
    },
    "Came électronique": {
      title: "Leva electrónica",
      description: "Cree un perfil de leva electrónica",
      instructions: JSON.stringify({
        steps: [
          "Defina los puntos del perfil de leva",
          "Interpole los puntos (lineal o spline)",
          "Asocie la leva a un eje maestro",
          "Pruebe el movimiento"
        ],
        objective: "Programar una leva electrónica"
      }),
      hints: JSON.stringify([
        "La leva reemplaza las levas mecánicas",
        "La interpolación spline da movimientos más suaves",
        "Verifique las velocidades y aceleraciones resultantes"
      ])
    }
  }
}
