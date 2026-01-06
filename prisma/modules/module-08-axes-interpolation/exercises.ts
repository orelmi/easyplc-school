import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module08Exercises: ExerciseData[] = [
  {
    title: "Interpolation linéaire multi-axes",
    description: "Programmez un déplacement simultané sur X, Y et Z",
    type: "gcode",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Départ en (0, 0, 10)",
        "Déplacement en interpolation vers (50, 30, -5)",
        "Les trois axes doivent arriver simultanément",
        "Utilisez G01 avec les trois coordonnées"
      ],
      objective: "Maîtriser l'interpolation linéaire 3 axes"
    }),
    initialCode: "G21\nG90\nG00 X0 Y0 Z10\n; Votre code ici\n",
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X0 Y0 Z10\nG01 X50 Y30 Z-5 F300"
    }),
    hints: JSON.stringify([
      "G01 interpole tous les axes spécifiés",
      "L'avance F s'applique au mouvement résultant",
      "Les axes arrivent tous en même temps"
    ]),
    xpReward: 125,
    order: 1
  },
  {
    title: "Arc hélicoïdal",
    description: "Programmez une interpolation circulaire avec descente en Z",
    type: "gcode",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Créez un arc de 180° en XY",
        "Pendant l'arc, descendez de 5mm en Z",
        "Rayon de l'arc: 20mm",
        "C'est une interpolation hélicoïdale"
      ],
      objective: "Combiner interpolation circulaire et linéaire"
    }),
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X20 Y0 Z0\nG02 X-20 Y0 Z-5 I-20 J0 F200"
    }),
    hints: JSON.stringify([
      "Ajoutez Z dans la commande G02/G03",
      "Le mouvement en Z est linéaire pendant l'arc",
      "Utile pour le filetage ou les rampes d'entrée"
    ]),
    xpReward: 200,
    order: 2
  }
]

export const module08ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Interpolation linéaire multi-axes": {
      title: "Multi-axis Linear Interpolation",
      description: "Program a simultaneous movement on X, Y and Z",
      instructions: JSON.stringify({
        steps: [
          "Start at (0, 0, 10)",
          "Interpolate to (50, 30, -5)",
          "All three axes must arrive simultaneously",
          "Use G01 with all three coordinates"
        ],
        objective: "Master 3-axis linear interpolation"
      }),
      hints: JSON.stringify([
        "G01 interpolates all specified axes",
        "Feed rate F applies to resultant movement",
        "All axes arrive at the same time"
      ])
    },
    "Arc hélicoïdal": {
      title: "Helical Arc",
      description: "Program a circular interpolation with Z descent",
      instructions: JSON.stringify({
        steps: [
          "Create a 180° arc in XY",
          "During the arc, descend 5mm in Z",
          "Arc radius: 20mm",
          "This is helical interpolation"
        ],
        objective: "Combine circular and linear interpolation"
      }),
      hints: JSON.stringify([
        "Add Z to the G02/G03 command",
        "Z movement is linear during the arc",
        "Useful for threading or ramp entries"
      ])
    }
  },
  es: {
    "Interpolation linéaire multi-axes": {
      title: "Interpolación lineal multi-eje",
      description: "Programe un movimiento simultáneo en X, Y y Z",
      instructions: JSON.stringify({
        steps: [
          "Inicio en (0, 0, 10)",
          "Interpolación hacia (50, 30, -5)",
          "Los tres ejes deben llegar simultáneamente",
          "Use G01 con las tres coordenadas"
        ],
        objective: "Dominar la interpolación lineal 3 ejes"
      }),
      hints: JSON.stringify([
        "G01 interpola todos los ejes especificados",
        "El avance F se aplica al movimiento resultante",
        "Todos los ejes llegan al mismo tiempo"
      ])
    },
    "Arc hélicoïdal": {
      title: "Arco helicoidal",
      description: "Programe una interpolación circular con descenso en Z",
      instructions: JSON.stringify({
        steps: [
          "Cree un arco de 180° en XY",
          "Durante el arco, descienda 5mm en Z",
          "Radio del arco: 20mm",
          "Es una interpolación helicoidal"
        ],
        objective: "Combinar interpolación circular y lineal"
      }),
      hints: JSON.stringify([
        "Añada Z al comando G02/G03",
        "El movimiento en Z es lineal durante el arco",
        "Útil para roscado o rampas de entrada"
      ])
    }
  }
}
