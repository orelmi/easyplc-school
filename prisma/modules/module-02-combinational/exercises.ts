import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module02Exercises: ExerciseData[] = [
  {
    title: "Table de vérité AND",
    description: "Complétez la table de vérité d'une porte AND à deux entrées",
    type: "troubleshooting",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez la porte logique AND présentée",
        "Pour chaque combinaison d'entrées, déterminez la sortie",
        "Complétez la table de vérité"
      ],
      objective: "Compléter correctement la table de vérité"
    }),
    solution: JSON.stringify({
      truthTable: [
        { A: 0, B: 0, Y: 0 },
        { A: 0, B: 1, Y: 0 },
        { A: 1, B: 0, Y: 0 },
        { A: 1, B: 1, Y: 1 }
      ]
    }),
    hints: JSON.stringify([
      "La sortie AND est 1 uniquement si TOUTES les entrées sont 1",
      "Si une seule entrée est 0, la sortie est 0"
    ]),
    xpReward: 50,
    order: 1
  },
  {
    title: "Table de vérité OR",
    description: "Complétez la table de vérité d'une porte OR à deux entrées",
    type: "troubleshooting",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez la porte logique OR présentée",
        "Pour chaque combinaison d'entrées, déterminez la sortie",
        "Complétez la table de vérité"
      ],
      objective: "Compléter correctement la table de vérité"
    }),
    solution: JSON.stringify({
      truthTable: [
        { A: 0, B: 0, Y: 0 },
        { A: 0, B: 1, Y: 1 },
        { A: 1, B: 0, Y: 1 },
        { A: 1, B: 1, Y: 1 }
      ]
    }),
    hints: JSON.stringify([
      "La sortie OR est 1 si AU MOINS UNE entrée est 1",
      "La sortie est 0 uniquement si toutes les entrées sont 0"
    ]),
    xpReward: 50,
    order: 2
  },
  {
    title: "Simplification de Karnaugh",
    description: "Utilisez un tableau de Karnaugh pour simplifier une expression logique",
    type: "troubleshooting",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Remplissez le tableau de Karnaugh avec les valeurs données",
        "Identifiez les groupements possibles (1, 2, 4 ou 8 cases)",
        "Déduisez l'expression simplifiée"
      ],
      objective: "Simplifier l'expression: Y = A.B.C + A.B.C' + A.B'.C"
    }),
    solution: JSON.stringify({
      simplifiedExpression: "Y = A.B + A.C",
      groups: [
        { cells: [[1,1], [1,0]], term: "A.B" },
        { cells: [[1,1], [0,1]], term: "A.C" }
      ]
    }),
    hints: JSON.stringify([
      "Cherchez les plus grands groupements possibles",
      "Les groupements doivent être des puissances de 2",
      "Une case peut appartenir à plusieurs groupements"
    ]),
    xpReward: 150,
    order: 3
  }
]

export const module02ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Table de vérité AND": {
      title: "AND Truth Table",
      description: "Complete the truth table for a two-input AND gate",
      instructions: JSON.stringify({
        steps: [
          "Analyze the AND logic gate presented",
          "For each input combination, determine the output",
          "Complete the truth table"
        ],
        objective: "Correctly complete the truth table"
      }),
      hints: JSON.stringify([
        "AND output is 1 only if ALL inputs are 1",
        "If any input is 0, the output is 0"
      ])
    },
    "Table de vérité OR": {
      title: "OR Truth Table",
      description: "Complete the truth table for a two-input OR gate",
      instructions: JSON.stringify({
        steps: [
          "Analyze the OR logic gate presented",
          "For each input combination, determine the output",
          "Complete the truth table"
        ],
        objective: "Correctly complete the truth table"
      }),
      hints: JSON.stringify([
        "OR output is 1 if AT LEAST ONE input is 1",
        "Output is 0 only if all inputs are 0"
      ])
    },
    "Simplification de Karnaugh": {
      title: "Karnaugh Simplification",
      description: "Use a Karnaugh map to simplify a logic expression",
      instructions: JSON.stringify({
        steps: [
          "Fill in the Karnaugh map with the given values",
          "Identify possible groupings (1, 2, 4, or 8 cells)",
          "Deduce the simplified expression"
        ],
        objective: "Simplify the expression: Y = A.B.C + A.B.C' + A.B'.C"
      }),
      hints: JSON.stringify([
        "Look for the largest possible groupings",
        "Groupings must be powers of 2",
        "A cell can belong to multiple groupings"
      ])
    }
  },
  es: {
    "Table de vérité AND": {
      title: "Tabla de verdad AND",
      description: "Complete la tabla de verdad de una puerta AND de dos entradas",
      instructions: JSON.stringify({
        steps: [
          "Analice la puerta lógica AND presentada",
          "Para cada combinación de entradas, determine la salida",
          "Complete la tabla de verdad"
        ],
        objective: "Completar correctamente la tabla de verdad"
      }),
      hints: JSON.stringify([
        "La salida AND es 1 solo si TODAS las entradas son 1",
        "Si alguna entrada es 0, la salida es 0"
      ])
    },
    "Table de vérité OR": {
      title: "Tabla de verdad OR",
      description: "Complete la tabla de verdad de una puerta OR de dos entradas",
      instructions: JSON.stringify({
        steps: [
          "Analice la puerta lógica OR presentada",
          "Para cada combinación de entradas, determine la salida",
          "Complete la tabla de verdad"
        ],
        objective: "Completar correctamente la tabla de verdad"
      }),
      hints: JSON.stringify([
        "La salida OR es 1 si AL MENOS UNA entrada es 1",
        "La salida es 0 solo si todas las entradas son 0"
      ])
    },
    "Simplification de Karnaugh": {
      title: "Simplificación de Karnaugh",
      description: "Use un mapa de Karnaugh para simplificar una expresión lógica",
      instructions: JSON.stringify({
        steps: [
          "Complete el mapa de Karnaugh con los valores dados",
          "Identifique los agrupamientos posibles (1, 2, 4 u 8 celdas)",
          "Deduzca la expresión simplificada"
        ],
        objective: "Simplificar la expresión: Y = A.B.C + A.B.C' + A.B'.C"
      }),
      hints: JSON.stringify([
        "Busque los agrupamientos más grandes posibles",
        "Los agrupamientos deben ser potencias de 2",
        "Una celda puede pertenecer a varios agrupamientos"
      ])
    }
  }
}
