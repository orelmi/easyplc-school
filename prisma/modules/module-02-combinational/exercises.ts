import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module02Exercises: ExerciseData[] = [
  {
    title: "Table de vérité AND",
    description: "Complétez la table de vérité d'une porte AND à deux entrées",
    type: "fill_blank",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez la porte logique AND présentée",
        "Pour chaque combinaison d'entrées, déterminez la sortie",
        "Complétez la table de vérité"
      ],
      objective: "Compléter correctement la table de vérité"
    }),
    config: JSON.stringify({
      text: "Table de vérité AND:\n\nA=0, B=0 → Y={{blank1}}\nA=0, B=1 → Y={{blank2}}\nA=1, B=0 → Y={{blank3}}\nA=1, B=1 → Y={{blank4}}\n\nRègle: La sortie AND est {{blank5}} uniquement si TOUTES les entrées sont 1",
      blanks: [
        { id: "blank1", placeholder: "0 ou 1" },
        { id: "blank2", placeholder: "0 ou 1" },
        { id: "blank3", placeholder: "0 ou 1" },
        { id: "blank4", placeholder: "0 ou 1" },
        { id: "blank5", placeholder: "valeur" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "0",
        blank2: "0",
        blank3: "0",
        blank4: "1",
        blank5: "1"
      }
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
    type: "fill_blank",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Analysez la porte logique OR présentée",
        "Pour chaque combinaison d'entrées, déterminez la sortie",
        "Complétez la table de vérité"
      ],
      objective: "Compléter correctement la table de vérité"
    }),
    config: JSON.stringify({
      text: "Table de vérité OR:\n\nA=0, B=0 → Y={{blank1}}\nA=0, B=1 → Y={{blank2}}\nA=1, B=0 → Y={{blank3}}\nA=1, B=1 → Y={{blank4}}\n\nRègle: La sortie OR est 1 si {{blank5}} entrée est 1",
      blanks: [
        { id: "blank1", placeholder: "0 ou 1" },
        { id: "blank2", placeholder: "0 ou 1" },
        { id: "blank3", placeholder: "0 ou 1" },
        { id: "blank4", placeholder: "0 ou 1" },
        { id: "blank5", placeholder: "combien" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "0",
        blank2: "1",
        blank3: "1",
        blank4: "1",
        blank5: "au moins une|une"
      }
    }),
    hints: JSON.stringify([
      "La sortie OR est 1 si AU MOINS UNE entrée est 1",
      "La sortie est 0 uniquement si toutes les entrées sont 0"
    ]),
    xpReward: 50,
    order: 2
  },
  {
    title: "Portes logiques - Associations",
    description: "Associez chaque porte logique à sa fonction",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Lisez la description de chaque fonction logique",
        "Associez chaque porte à sa description correcte",
        "Vérifiez vos associations"
      ],
      objective: "Associer correctement les portes logiques à leurs fonctions"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "and", text: "Porte AND" },
        { id: "or", text: "Porte OR" },
        { id: "not", text: "Porte NOT" },
        { id: "xor", text: "Porte XOR" }
      ],
      rightItems: [
        { id: "all", text: "Sortie = 1 si toutes les entrées sont 1" },
        { id: "any", text: "Sortie = 1 si au moins une entrée est 1" },
        { id: "invert", text: "Inverse l'état de l'entrée" },
        { id: "diff", text: "Sortie = 1 si les entrées sont différentes" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["and", "all"],
        ["or", "any"],
        ["not", "invert"],
        ["xor", "diff"]
      ]
    }),
    hints: JSON.stringify([
      "AND = ET logique, toutes les conditions",
      "OR = OU logique, au moins une condition",
      "NOT = NON logique, inversion"
    ]),
    xpReward: 75,
    order: 3
  },
  {
    title: "Simplification de Karnaugh",
    description: "Utilisez un tableau de Karnaugh pour simplifier une expression logique",
    type: "fill_blank",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Remplissez le tableau de Karnaugh avec les valeurs données",
        "Identifiez les groupements possibles (1, 2, 4 ou 8 cases)",
        "Déduisez l'expression simplifiée"
      ],
      objective: "Simplifier l'expression: Y = A.B.C + A.B.C' + A.B'.C"
    }),
    config: JSON.stringify({
      text: "Expression initiale: Y = A.B.C + A.B.C' + A.B'.C\n\nTableau de Karnaugh (variables A, B, C):\n\nGroupement 1: A.B (couvre {{blank1}} cases)\nGroupement 2: A.C (couvre {{blank2}} cases)\n\nExpression simplifiée: Y = A.{{blank3}} + A.{{blank4}}",
      blanks: [
        { id: "blank1", placeholder: "nombre" },
        { id: "blank2", placeholder: "nombre" },
        { id: "blank3", placeholder: "variable" },
        { id: "blank4", placeholder: "variable" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "2",
        blank2: "2",
        blank3: "B",
        blank4: "C"
      }
    }),
    hints: JSON.stringify([
      "Cherchez les plus grands groupements possibles",
      "Les groupements doivent être des puissances de 2",
      "Une case peut appartenir à plusieurs groupements"
    ]),
    xpReward: 150,
    order: 4
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
    "Portes logiques - Associations": {
      title: "Logic Gates - Matching",
      description: "Match each logic gate to its function",
      instructions: JSON.stringify({
        steps: [
          "Read the description of each logic function",
          "Match each gate to its correct description",
          "Verify your matches"
        ],
        objective: "Correctly match logic gates to their functions"
      }),
      hints: JSON.stringify([
        "AND = logical AND, all conditions",
        "OR = logical OR, at least one condition",
        "NOT = logical NOT, inversion"
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
    "Portes logiques - Associations": {
      title: "Puertas lógicas - Asociaciones",
      description: "Asocie cada puerta lógica a su función",
      instructions: JSON.stringify({
        steps: [
          "Lea la descripción de cada función lógica",
          "Asocie cada puerta a su descripción correcta",
          "Verifique sus asociaciones"
        ],
        objective: "Asociar correctamente las puertas lógicas a sus funciones"
      }),
      hints: JSON.stringify([
        "AND = Y lógico, todas las condiciones",
        "OR = O lógico, al menos una condición",
        "NOT = NO lógico, inversión"
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
