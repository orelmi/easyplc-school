import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module08Exercises: ExerciseData[] = [
  {
    title: "Interpolation linéaire multi-axes",
    description: "Programmez un déplacement simultané sur X, Y et Z",
    type: "code_input",
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
    config: JSON.stringify({
      language: "gcode",
      starterCode: "G21\nG90\nG00 X0 Y0 Z10\n; Votre code ici\n",
      expectedPatterns: ["G01", "X50", "Y30", "Z-5"]
    }),
    initialCode: "G21\nG90\nG00 X0 Y0 Z10\n; Votre code ici\n",
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X0 Y0 Z10\nG01 X50 Y30 Z-5 F300",
      acceptedPatterns: [
        "G01.*X50.*Y30.*Z-5",
        "G01.*X50.*Z-5.*Y30"
      ]
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
    title: "Types d'interpolation",
    description: "Associez chaque type d'interpolation à sa description",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Lisez la description de chaque type d'interpolation",
        "Associez chaque type à sa description",
        "Vérifiez vos associations"
      ],
      objective: "Comprendre les différents types d'interpolation"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "linear", text: "Interpolation linéaire (G01)" },
        { id: "circular_cw", text: "Interpolation circulaire CW (G02)" },
        { id: "circular_ccw", text: "Interpolation circulaire CCW (G03)" },
        { id: "helical", text: "Interpolation hélicoïdale" }
      ],
      rightItems: [
        { id: "straight", text: "Trajectoire en ligne droite" },
        { id: "cw_arc", text: "Arc dans le sens horaire" },
        { id: "ccw_arc", text: "Arc dans le sens anti-horaire" },
        { id: "spiral", text: "Arc + mouvement axial simultané" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["linear", "straight"],
        ["circular_cw", "cw_arc"],
        ["circular_ccw", "ccw_arc"],
        ["helical", "spiral"]
      ]
    }),
    hints: JSON.stringify([
      "G01 = ligne droite",
      "G02 = sens horaire (comme les aiguilles d'une montre)",
      "L'hélicoïdale combine arc et mouvement en Z"
    ]),
    xpReward: 75,
    order: 2
  },
  {
    title: "Arc hélicoïdal",
    description: "Programmez une interpolation circulaire avec descente en Z",
    type: "fill_blank",
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
    config: JSON.stringify({
      text: "Arc hélicoïdal:\n\nDépart: X={{blank1}}, Y=0, Z=0\nArrivée: X={{blank2}}, Y=0, Z={{blank3}}\n\nCommande: G{{blank4}} X-20 Y0 Z-5 I{{blank5}} J0 F200\n\nI représente le décalage en X vers le {{blank6}}\nLe mouvement en Z est {{blank7}} pendant l'arc",
      blanks: [
        { id: "blank1", placeholder: "X départ" },
        { id: "blank2", placeholder: "X arrivée" },
        { id: "blank3", placeholder: "Z arrivée" },
        { id: "blank4", placeholder: "code G" },
        { id: "blank5", placeholder: "valeur I" },
        { id: "blank6", placeholder: "point" },
        { id: "blank7", placeholder: "type mouvement" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "20",
        blank2: "-20",
        blank3: "-5",
        blank4: "02",
        blank5: "-20",
        blank6: "centre",
        blank7: "linéaire"
      }
    }),
    hints: JSON.stringify([
      "Ajoutez Z dans la commande G02/G03",
      "Le mouvement en Z est linéaire pendant l'arc",
      "Utile pour le filetage ou les rampes d'entrée"
    ]),
    xpReward: 200,
    order: 3
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
    "Types d'interpolation": {
      title: "Interpolation Types",
      description: "Match each interpolation type to its description",
      instructions: JSON.stringify({
        steps: [
          "Read the description of each interpolation type",
          "Match each type to its description",
          "Verify your matches"
        ],
        objective: "Understand the different interpolation types"
      }),
      hints: JSON.stringify([
        "G01 = straight line",
        "G02 = clockwise (like clock hands)",
        "Helical combines arc and Z movement"
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
    "Types d'interpolation": {
      title: "Tipos de interpolación",
      description: "Asocie cada tipo de interpolación a su descripción",
      instructions: JSON.stringify({
        steps: [
          "Lea la descripción de cada tipo de interpolación",
          "Asocie cada tipo a su descripción",
          "Verifique sus asociaciones"
        ],
        objective: "Comprender los diferentes tipos de interpolación"
      }),
      hints: JSON.stringify([
        "G01 = línea recta",
        "G02 = sentido horario (como las agujas del reloj)",
        "La helicoidal combina arco y movimiento en Z"
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
