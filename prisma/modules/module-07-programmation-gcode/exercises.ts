import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module07Exercises: ExerciseData[] = [
  {
    title: "Carré en G-Code",
    description: "Programmez un parcours carré de 50mm x 50mm",
    type: "gcode",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Positionnez-vous au point de départ (0, 0)",
        "Utilisez G01 pour les déplacements linéaires",
        "Tracez un carré de 50mm de côté",
        "Revenez au point d'origine"
      ],
      objective: "Écrire un programme G-Code pour usiner un carré"
    }),
    initialCode: "G21 ; Unités en mm\nG90 ; Coordonnées absolues\nG00 X0 Y0 ; Point de départ\n; Votre code ici\n",
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X0 Y0\nG01 X50 F500\nG01 Y50\nG01 X0\nG01 Y0",
      path: [
        { x: 0, y: 0 },
        { x: 50, y: 0 },
        { x: 50, y: 50 },
        { x: 0, y: 50 },
        { x: 0, y: 0 }
      ]
    }),
    hints: JSON.stringify([
      "G01 effectue un déplacement linéaire avec avance (F)",
      "En mode absolu (G90), les coordonnées sont par rapport à l'origine",
      "N'oubliez pas de définir une avance avec F"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "Cercle en interpolation",
    description: "Programmez un cercle de rayon 25mm en utilisant G02/G03",
    type: "gcode",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Positionnez-vous au point (25, 0)",
        "Utilisez G02 ou G03 pour l'interpolation circulaire",
        "Créez un cercle complet de rayon 25mm",
        "Le centre du cercle est à l'origine (0, 0)"
      ],
      objective: "Maîtriser l'interpolation circulaire G02/G03"
    }),
    initialCode: "G21\nG90\nG00 X25 Y0 ; Point de départ sur le cercle\n; Votre code ici\n",
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X25 Y0\nG02 X25 Y0 I-25 J0 F300",
      path: "circle",
      radius: 25,
      center: { x: 0, y: 0 }
    }),
    hints: JSON.stringify([
      "G02 = interpolation circulaire horaire, G03 = anti-horaire",
      "I et J définissent le vecteur du point actuel vers le centre",
      "Pour un cercle complet, le point final = point initial"
    ]),
    xpReward: 150,
    order: 2
  },
  {
    title: "Poche rectangulaire",
    description: "Programmez l'usinage d'une poche rectangulaire",
    type: "gcode",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Dimensions de la poche: 60mm x 40mm, profondeur 10mm",
        "Utilisez un outil de 10mm de diamètre",
        "Programmez les passes en Z par incréments de 2mm",
        "Utilisez une stratégie de contournage"
      ],
      objective: "Créer un programme complet pour usiner une poche"
    }),
    initialCode: "G21 ; mm\nG90 ; Absolu\nG17 ; Plan XY\nT1 M6 ; Outil 10mm\nS3000 M3 ; Broche 3000 tr/min\n; Votre code ici\n",
    solution: JSON.stringify({
      code: `G21
G90
G17
T1 M6
S3000 M3
G00 X5 Y5
G00 Z2
G01 Z-2 F100
G01 X55 F500
G01 Y35
G01 X5
G01 Y5
G01 Z-4 F100
G01 X55 F500
G01 Y35
G01 X5
G01 Y5
; Répéter jusqu'à Z-10
G00 Z10
M5
M30`,
      passes: 5,
      depth_per_pass: 2
    }),
    hints: JSON.stringify([
      "Compensez le rayon d'outil (5mm de chaque côté)",
      "Descendez progressivement en Z",
      "Terminez par une remontée de sécurité"
    ]),
    xpReward: 250,
    order: 3
  },
  {
    title: "Triangle équilatéral",
    description: "Programmez un triangle équilatéral de 60mm de côté",
    type: "gcode",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Départ au point (0, 0)",
        "Côté de 60mm",
        "Utilisez la trigonométrie pour calculer les coordonnées",
        "Hauteur du triangle = côté × √3 / 2"
      ],
      objective: "Appliquer la trigonométrie en programmation CNC"
    }),
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X0 Y0\nG01 X60 Y0 F500\nG01 X30 Y51.96\nG01 X0 Y0",
      vertices: [
        { x: 0, y: 0 },
        { x: 60, y: 0 },
        { x: 30, y: 51.96 }
      ]
    }),
    hints: JSON.stringify([
      "Hauteur = 60 × √3 / 2 ≈ 51.96mm",
      "Le sommet est à X = côté/2 = 30mm",
      "Calculez les coordonnées avant de programmer"
    ]),
    xpReward: 125,
    order: 4
  }
]

export const module07ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Carré en G-Code": {
      title: "Square in G-Code",
      description: "Program a 50mm x 50mm square path",
      instructions: JSON.stringify({
        steps: [
          "Position at starting point (0, 0)",
          "Use G01 for linear movements",
          "Draw a 50mm square",
          "Return to origin point"
        ],
        objective: "Write a G-Code program to machine a square"
      }),
      hints: JSON.stringify([
        "G01 performs linear movement with feed rate (F)",
        "In absolute mode (G90), coordinates are relative to origin",
        "Don't forget to define a feed rate with F"
      ])
    },
    "Cercle en interpolation": {
      title: "Circle with Interpolation",
      description: "Program a 25mm radius circle using G02/G03",
      instructions: JSON.stringify({
        steps: [
          "Position at point (25, 0)",
          "Use G02 or G03 for circular interpolation",
          "Create a complete circle with 25mm radius",
          "The center of the circle is at origin (0, 0)"
        ],
        objective: "Master G02/G03 circular interpolation"
      }),
      hints: JSON.stringify([
        "G02 = clockwise circular interpolation, G03 = counter-clockwise",
        "I and J define the vector from current point to center",
        "For a full circle, end point = start point"
      ])
    },
    "Poche rectangulaire": {
      title: "Rectangular Pocket",
      description: "Program the machining of a rectangular pocket",
      instructions: JSON.stringify({
        steps: [
          "Pocket dimensions: 60mm x 40mm, depth 10mm",
          "Use a 10mm diameter tool",
          "Program Z passes in 2mm increments",
          "Use a contouring strategy"
        ],
        objective: "Create a complete program to machine a pocket"
      }),
      hints: JSON.stringify([
        "Compensate for tool radius (5mm on each side)",
        "Descend progressively in Z",
        "End with a safety retract"
      ])
    },
    "Triangle équilatéral": {
      title: "Equilateral Triangle",
      description: "Program an equilateral triangle with 60mm sides",
      instructions: JSON.stringify({
        steps: [
          "Start at point (0, 0)",
          "Side length 60mm",
          "Use trigonometry to calculate coordinates",
          "Triangle height = side × √3 / 2"
        ],
        objective: "Apply trigonometry in CNC programming"
      }),
      hints: JSON.stringify([
        "Height = 60 × √3 / 2 ≈ 51.96mm",
        "The apex is at X = side/2 = 30mm",
        "Calculate coordinates before programming"
      ])
    }
  },
  es: {
    "Carré en G-Code": {
      title: "Cuadrado en G-Code",
      description: "Programe un recorrido cuadrado de 50mm x 50mm",
      instructions: JSON.stringify({
        steps: [
          "Posiciónese en el punto de inicio (0, 0)",
          "Use G01 para movimientos lineales",
          "Trace un cuadrado de 50mm de lado",
          "Regrese al punto de origen"
        ],
        objective: "Escribir un programa G-Code para mecanizar un cuadrado"
      }),
      hints: JSON.stringify([
        "G01 realiza un movimiento lineal con avance (F)",
        "En modo absoluto (G90), las coordenadas son relativas al origen",
        "No olvide definir un avance con F"
      ])
    },
    "Cercle en interpolation": {
      title: "Círculo con interpolación",
      description: "Programe un círculo de radio 25mm usando G02/G03",
      instructions: JSON.stringify({
        steps: [
          "Posiciónese en el punto (25, 0)",
          "Use G02 o G03 para interpolación circular",
          "Cree un círculo completo de radio 25mm",
          "El centro del círculo está en el origen (0, 0)"
        ],
        objective: "Dominar la interpolación circular G02/G03"
      }),
      hints: JSON.stringify([
        "G02 = interpolación circular horaria, G03 = antihoraria",
        "I y J definen el vector del punto actual al centro",
        "Para un círculo completo, punto final = punto inicial"
      ])
    },
    "Poche rectangulaire": {
      title: "Cajera rectangular",
      description: "Programe el mecanizado de una cajera rectangular",
      instructions: JSON.stringify({
        steps: [
          "Dimensiones de la cajera: 60mm x 40mm, profundidad 10mm",
          "Use una herramienta de 10mm de diámetro",
          "Programe las pasadas en Z en incrementos de 2mm",
          "Use una estrategia de contorneado"
        ],
        objective: "Crear un programa completo para mecanizar una cajera"
      }),
      hints: JSON.stringify([
        "Compense el radio de herramienta (5mm a cada lado)",
        "Descienda progresivamente en Z",
        "Termine con una retracción de seguridad"
      ])
    },
    "Triangle équilatéral": {
      title: "Triángulo equilátero",
      description: "Programe un triángulo equilátero de 60mm de lado",
      instructions: JSON.stringify({
        steps: [
          "Inicio en el punto (0, 0)",
          "Lado de 60mm",
          "Use trigonometría para calcular las coordenadas",
          "Altura del triángulo = lado × √3 / 2"
        ],
        objective: "Aplicar trigonometría en programación CNC"
      }),
      hints: JSON.stringify([
        "Altura = 60 × √3 / 2 ≈ 51.96mm",
        "El vértice está en X = lado/2 = 30mm",
        "Calcule las coordenadas antes de programar"
      ])
    }
  }
}
