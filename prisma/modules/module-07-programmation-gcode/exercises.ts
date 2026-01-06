import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module07Exercises: ExerciseData[] = [
  {
    title: "Carré en G-Code",
    description: "Programmez un parcours carré de 50mm x 50mm",
    type: "code_input",
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
    config: JSON.stringify({
      language: "gcode",
      starterCode: "G21 ; Unités en mm\nG90 ; Coordonnées absolues\nG00 X0 Y0 ; Point de départ\n; Votre code ici\n",
      expectedPatterns: ["G01", "X50", "Y50", "X0", "Y0"]
    }),
    initialCode: "G21 ; Unités en mm\nG90 ; Coordonnées absolues\nG00 X0 Y0 ; Point de départ\n; Votre code ici\n",
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X0 Y0\nG01 X50 F500\nG01 Y50\nG01 X0\nG01 Y0",
      acceptedPatterns: [
        "G01.*X50.*F",
        "G01.*Y50",
        "G01.*X0",
        "G01.*Y0"
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
    title: "Codes G essentiels",
    description: "Associez chaque code G à sa fonction",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Lisez la description de chaque code G",
        "Associez chaque code à sa fonction",
        "Vérifiez vos associations"
      ],
      objective: "Connaître les codes G fondamentaux"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "g00", text: "G00" },
        { id: "g01", text: "G01" },
        { id: "g02", text: "G02" },
        { id: "g90", text: "G90" },
        { id: "g91", text: "G91" }
      ],
      rightItems: [
        { id: "rapid", text: "Déplacement rapide (sans usinage)" },
        { id: "linear", text: "Interpolation linéaire (usinage)" },
        { id: "cw", text: "Interpolation circulaire horaire" },
        { id: "abs", text: "Mode coordonnées absolues" },
        { id: "inc", text: "Mode coordonnées relatives" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["g00", "rapid"],
        ["g01", "linear"],
        ["g02", "cw"],
        ["g90", "abs"],
        ["g91", "inc"]
      ]
    }),
    hints: JSON.stringify([
      "G00 = rapide, G01 = travail",
      "G02 = horaire, G03 = anti-horaire",
      "G90 = absolu, G91 = relatif"
    ]),
    xpReward: 75,
    order: 2
  },
  {
    title: "Cercle en interpolation",
    description: "Programmez un cercle de rayon 25mm en utilisant G02/G03",
    type: "code_input",
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
    config: JSON.stringify({
      language: "gcode",
      starterCode: "G21\nG90\nG00 X25 Y0 ; Point de départ sur le cercle\n; Votre code ici\n",
      expectedPatterns: ["G02|G03", "I-?\\d+", "J-?\\d+"]
    }),
    initialCode: "G21\nG90\nG00 X25 Y0 ; Point de départ sur le cercle\n; Votre code ici\n",
    solution: JSON.stringify({
      code: "G21\nG90\nG00 X25 Y0\nG02 X25 Y0 I-25 J0 F300",
      acceptedPatterns: [
        "G0[23].*X25.*Y0.*I-25.*J0",
        "G0[23].*I-25.*J0.*X25.*Y0"
      ]
    }),
    hints: JSON.stringify([
      "G02 = interpolation circulaire horaire, G03 = anti-horaire",
      "I et J définissent le vecteur du point actuel vers le centre",
      "Pour un cercle complet, le point final = point initial"
    ]),
    xpReward: 150,
    order: 3
  },
  {
    title: "Triangle équilatéral",
    description: "Programmez un triangle équilatéral de 60mm de côté",
    type: "fill_blank",
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
    config: JSON.stringify({
      text: "Triangle équilatéral de 60mm:\n\nHauteur = 60 × √3 / 2 ≈ {{blank1}} mm\n\nSommets:\n- Point 1: X={{blank2}}, Y={{blank3}}\n- Point 2: X={{blank4}}, Y={{blank5}}\n- Point 3: X={{blank6}}, Y={{blank7}}\n\nLe sommet supérieur est à X = côté/2 = {{blank8}} mm",
      blanks: [
        { id: "blank1", placeholder: "hauteur" },
        { id: "blank2", placeholder: "X1" },
        { id: "blank3", placeholder: "Y1" },
        { id: "blank4", placeholder: "X2" },
        { id: "blank5", placeholder: "Y2" },
        { id: "blank6", placeholder: "X3" },
        { id: "blank7", placeholder: "Y3" },
        { id: "blank8", placeholder: "X sommet" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "51.96|52",
        blank2: "0",
        blank3: "0",
        blank4: "60",
        blank5: "0",
        blank6: "30",
        blank7: "51.96|52",
        blank8: "30"
      }
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
    "Codes G essentiels": {
      title: "Essential G Codes",
      description: "Match each G code to its function",
      instructions: JSON.stringify({
        steps: [
          "Read the description of each G code",
          "Match each code to its function",
          "Verify your matches"
        ],
        objective: "Know the fundamental G codes"
      }),
      hints: JSON.stringify([
        "G00 = rapid, G01 = work",
        "G02 = clockwise, G03 = counter-clockwise",
        "G90 = absolute, G91 = relative"
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
    "Codes G essentiels": {
      title: "Códigos G esenciales",
      description: "Asocie cada código G a su función",
      instructions: JSON.stringify({
        steps: [
          "Lea la descripción de cada código G",
          "Asocie cada código a su función",
          "Verifique sus asociaciones"
        ],
        objective: "Conocer los códigos G fundamentales"
      }),
      hints: JSON.stringify([
        "G00 = rápido, G01 = trabajo",
        "G02 = horario, G03 = antihorario",
        "G90 = absoluto, G91 = relativo"
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
