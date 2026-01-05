// Module 2: Combinational Logic - Seed Data
import type { ModuleData } from '../types.js'

export const module02Data: ModuleData = {
  // Module info
  moduleOrder: 2,
  moduleTitle: "Logique combinatoire",
  moduleDescription: "Maîtrisez les portes logiques ET, OU, NON et leurs applications",
  moduleTranslations: {
    en: {
      title: "Combinational Logic",
      description: "Master AND, OR, NOT logic gates and their applications"
    },
    es: {
      title: "Lógica Combinacional",
      description: "Domine las puertas lógicas AND, OR, NOT y sus aplicaciones"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "La porte ET (AND)",
      description: "Apprenez la fonction logique ET et ses applications",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique ET (AND)\n\nLa porte ET est une fonction logique fondamentale. La sortie est vraie (1) **uniquement** si toutes les entrées sont vraies (1)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A ET B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : A · B ou A ∧ B\n- En programmation : A AND B\n- En LADDER : Contacts en série"
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nUne machine ne démarre que si :\n- Le bouton START est appuyé **ET**\n- Le capot de sécurité est fermé **ET**\n- L'arrêt d'urgence n'est pas enclenché\n\n➡️ C'est une fonction ET à 3 entrées !"
          }
        ]
      })
    },
    {
      title: "La porte OU (OR)",
      description: "Apprenez la fonction logique OU et ses applications",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique OU (OR)\n\nLa porte OU donne une sortie vraie (1) si **au moins une** des entrées est vraie (1)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A OU B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : A + B ou A ∨ B\n- En programmation : A OR B\n- En LADDER : Contacts en parallèle"
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nUn voyant d'alarme s'allume si :\n- La température est trop haute **OU**\n- La pression est trop haute **OU**\n- Le niveau est trop bas\n\n➡️ C'est une fonction OU à 3 entrées !"
          }
        ]
      })
    },
    {
      title: "La porte NON (NOT)",
      description: "Apprenez la fonction logique NON (inversion)",
      order: 3,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique NON (NOT)\n\nLa porte NON **inverse** l'état de l'entrée. Si l'entrée est 0, la sortie est 1 et vice versa."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | NON A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : Ā ou ¬A\n- En programmation : NOT A\n- En LADDER : Contact normalement fermé (NF)"
          },
          {
            type: "info",
            content: "Un contact normalement fermé (NF) est un contact qui laisse passer le courant quand il n'est PAS actionné."
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nLe voyant \"MACHINE ARRÊTÉE\" est allumé quand le moteur n'est PAS en marche.\n\n➡️ Voyant = NON(Moteur_en_marche)"
          }
        ]
      })
    },
    {
      title: "Les portes NAND et NOR",
      description: "Découvrez les fonctions logiques composées NAND et NOR",
      order: 4,
      xpReward: 65,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Portes NAND et NOR\n\nCes portes sont des **combinaisons** des fonctions de base ET, OU, NON."
          },
          {
            type: "text",
            content: "## La porte NAND (NON-ET)\n\nC'est l'inverse de la porte ET : la sortie est 1 sauf si toutes les entrées sont à 1.\n\n| A | B | A NAND B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Formule** : NAND(A,B) = NON(A ET B)"
          },
          {
            type: "text",
            content: "## La porte NOR (NON-OU)\n\nC'est l'inverse de la porte OU : la sortie est 1 seulement si toutes les entrées sont à 0.\n\n| A | B | A NOR B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 0 |\n\n**Formule** : NOR(A,B) = NON(A OU B)"
          },
          {
            type: "info",
            content: "Fait remarquable : avec des portes NAND uniquement, on peut recréer TOUTES les autres fonctions logiques ! C'est pourquoi la NAND est appelée 'porte universelle'."
          }
        ]
      })
    },
    {
      title: "La porte XOR (OU exclusif)",
      description: "Apprenez la fonction logique XOR et ses applications",
      order: 5,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte XOR (OU Exclusif)\n\nLa porte XOR donne 1 si **exactement une** des entrées est à 1 (mais pas les deux)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A XOR B |\n|---|---|----------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Symbole** : A ⊕ B"
          },
          {
            type: "text",
            content: "## Formule équivalente\n\nXOR peut s'exprimer avec ET, OU, NON :\n\n```\nA XOR B = (A OU B) ET NON(A ET B)\n```\n\nOu encore :\n```\nA XOR B = (A ET NON B) OU (NON A ET B)\n```"
          },
          {
            type: "text",
            content: "## Applications industrielles\n\n- **Comparaison** : Détecter si deux signaux sont différents\n- **Commande va-et-vient** : Comme un interrupteur d'escalier\n- **Détection de changement d'état** : Front montant/descendant\n- **Contrôle de parité** : Vérification de données"
          }
        ]
      })
    },
    {
      title: "Simplification des équations logiques",
      description: "Apprenez à simplifier les expressions booléennes",
      order: 6,
      xpReward: 75,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Simplification des Équations Logiques\n\nUne équation simplifiée = **moins de composants** = **moins de coût** et **meilleure fiabilité**."
          },
          {
            type: "text",
            content: "## Propriétés de l'algèbre de Boole\n\n### Propriétés de base\n- **Identité** : A ET 1 = A, A OU 0 = A\n- **Élément nul** : A ET 0 = 0, A OU 1 = 1\n- **Complémentarité** : A ET NON(A) = 0, A OU NON(A) = 1\n- **Idempotence** : A ET A = A, A OU A = A"
          },
          {
            type: "text",
            content: "## Théorèmes importants\n\n### Théorème de De Morgan\n```\nNON(A ET B) = NON(A) OU NON(B)\nNON(A OU B) = NON(A) ET NON(B)\n```\n\n### Absorption\n```\nA OU (A ET B) = A\nA ET (A OU B) = A\n```"
          },
          {
            type: "diagram",
            title: "Exemple de simplification",
            content: `┌─────────────────────────────────────────────────────────────┐
│              EXEMPLE DE SIMPLIFICATION                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Expression initiale :                                       │
│  S = (A ET B) OU (A ET NON(B)) OU (NON(A) ET B)            │
│                                                              │
│  Étape 1 - Factorisation :                                  │
│  S = A ET (B OU NON(B)) OU (NON(A) ET B)                   │
│                                                              │
│  Étape 2 - Complémentarité (B OU NON(B) = 1) :             │
│  S = A ET 1 OU (NON(A) ET B)                                │
│                                                              │
│  Étape 3 - Identité (A ET 1 = A) :                         │
│  S = A OU (NON(A) ET B)                                     │
│                                                              │
│  Étape 4 - Distribution :                                   │
│  S = A OU B                                                 │
│                                                              │
│  Résultat : Expression simplifiée de 3 portes à 1 porte !  │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      })
    },
    {
      title: "Tableaux de Karnaugh",
      description: "Méthode graphique de simplification des fonctions logiques",
      order: 7,
      xpReward: 80,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Tableaux de Karnaugh\n\nLe tableau de Karnaugh est une méthode **graphique** pour simplifier les fonctions logiques, plus rapide que l'algèbre pour les fonctions à 3-4 variables."
          },
          {
            type: "diagram",
            title: "Tableau de Karnaugh à 2 variables",
            content: `┌─────────────────────────────────────────────────────────────┐
│           TABLEAU DE KARNAUGH (2 variables)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      B                                       │
│                  0       1                                   │
│              ┌───────┬───────┐                              │
│          0   │   0   │   1   │                              │
│      A       ├───────┼───────┤                              │
│          1   │   1   │   1   │                              │
│              └───────┴───────┘                              │
│                                                              │
│  On groupe les 1 adjacents pour simplifier :                │
│  - Groupe vertical (A=0,B=1 et A=1,B=1) → B                 │
│  - Case isolée (A=1,B=0) → A ET NON(B)                      │
│                                                              │
│  Ou groupe horizontal : ligne A=1 → A                       │
│  Résultat : S = A OU B                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Règles de regroupement\n\n1. **Grouper les 1** adjacents (horizontalement ou verticalement)\n2. Les groupes doivent contenir **2, 4, 8 ou 16** cases (puissances de 2)\n3. Les groupes peuvent se **chevaucher**\n4. Les bords sont **adjacents** (le tableau est cyclique)\n5. Faire les **plus grands groupes possibles**"
          },
          {
            type: "text",
            content: "## Lecture du résultat\n\nPour chaque groupe :\n- Les variables qui **ne changent pas** apparaissent dans le terme\n- Les variables qui **changent** disparaissent\n\nLe résultat final est le **OU** de tous les termes."
          },
          {
            type: "info",
            content: "Pour 5 variables ou plus, on utilise généralement des logiciels de simplification ou la méthode de Quine-McCluskey."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "La porte ET (AND)": {
        title: "The AND Gate",
        description: "Learn the AND logic function and its applications",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The AND Logic Gate\n\nThe AND gate is a fundamental logic function. The output is true (1) **only** if all inputs are true (1)."
            },
            {
              type: "text",
              content: "## Truth Table\n\n| A | B | A AND B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
            },
            {
              type: "text",
              content: "## Symbols\n\n- Logic symbol: A · B or A ∧ B\n- In programming: A AND B\n- In LADDER: Contacts in series"
            },
            {
              type: "text",
              content: "## Practical Example\n\nA machine only starts if:\n- The START button is pressed **AND**\n- The safety cover is closed **AND**\n- The emergency stop is not engaged\n\n➡️ This is a 3-input AND function!"
            }
          ]
        })
      },
      "La porte OU (OR)": {
        title: "The OR Gate",
        description: "Learn the OR logic function and its applications",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The OR Logic Gate\n\nThe OR gate gives a true output (1) if **at least one** of the inputs is true (1)."
            },
            {
              type: "text",
              content: "## Truth Table\n\n| A | B | A OR B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
            },
            {
              type: "text",
              content: "## Symbols\n\n- Logic symbol: A + B or A ∨ B\n- In programming: A OR B\n- In LADDER: Contacts in parallel"
            },
            {
              type: "text",
              content: "## Practical Example\n\nAn alarm light turns on if:\n- Temperature is too high **OR**\n- Pressure is too high **OR**\n- Level is too low\n\n➡️ This is a 3-input OR function!"
            }
          ]
        })
      },
      "La porte NON (NOT)": {
        title: "The NOT Gate",
        description: "Learn the NOT logic function (inversion)",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The NOT Logic Gate\n\nThe NOT gate **inverts** the input state. If the input is 0, the output is 1 and vice versa."
            },
            {
              type: "text",
              content: "## Truth Table\n\n| A | NOT A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
            },
            {
              type: "text",
              content: "## Symbols\n\n- Logic symbol: Ā or ¬A\n- In programming: NOT A\n- In LADDER: Normally closed contact (NC)"
            },
            {
              type: "info",
              content: "A normally closed contact (NC) is a contact that allows current to flow when it is NOT activated."
            },
            {
              type: "text",
              content: "## Practical Example\n\nThe \"MACHINE STOPPED\" indicator is on when the motor is NOT running.\n\n➡️ Indicator = NOT(Motor_running)"
            }
          ]
        })
      },
      "Les portes NAND et NOR": {
        title: "NAND and NOR Gates",
        description: "Discover the NAND and NOR compound logic functions",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# NAND and NOR Gates\n\nThese gates are **combinations** of the basic AND, OR, NOT functions."
            },
            {
              type: "text",
              content: "## The NAND Gate (NOT-AND)\n\nIt is the inverse of the AND gate: the output is 1 unless all inputs are 1.\n\n| A | B | A NAND B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Formula**: NAND(A,B) = NOT(A AND B)"
            },
            {
              type: "text",
              content: "## The NOR Gate (NOT-OR)\n\nIt is the inverse of the OR gate: the output is 1 only if all inputs are 0.\n\n| A | B | A NOR B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 0 |\n\n**Formula**: NOR(A,B) = NOT(A OR B)"
            },
            {
              type: "info",
              content: "Remarkable fact: with NAND gates alone, you can recreate ALL other logic functions! That's why NAND is called the 'universal gate'."
            }
          ]
        })
      },
      "La porte XOR (OU exclusif)": {
        title: "The XOR Gate (Exclusive OR)",
        description: "Learn the XOR logic function and its applications",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The XOR Gate (Exclusive OR)\n\nThe XOR gate gives 1 if **exactly one** of the inputs is 1 (but not both)."
            },
            {
              type: "text",
              content: "## Truth Table\n\n| A | B | A XOR B |\n|---|---|----------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Symbol**: A ⊕ B"
            },
            {
              type: "text",
              content: "## Equivalent Formula\n\nXOR can be expressed with AND, OR, NOT:\n\n```\nA XOR B = (A OR B) AND NOT(A AND B)\n```\n\nOr:\n```\nA XOR B = (A AND NOT B) OR (NOT A AND B)\n```"
            },
            {
              type: "text",
              content: "## Industrial Applications\n\n- **Comparison**: Detect if two signals are different\n- **Two-way switch control**: Like a staircase light switch\n- **State change detection**: Rising/falling edge\n- **Parity control**: Data verification"
            }
          ]
        })
      },
      "Simplification des équations logiques": {
        title: "Simplifying Logic Equations",
        description: "Learn to simplify Boolean expressions",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Simplifying Logic Equations\n\nA simplified equation = **fewer components** = **lower cost** and **better reliability**."
            },
            {
              type: "text",
              content: "## Boolean Algebra Properties\n\n### Basic Properties\n- **Identity**: A AND 1 = A, A OR 0 = A\n- **Null element**: A AND 0 = 0, A OR 1 = 1\n- **Complementarity**: A AND NOT(A) = 0, A OR NOT(A) = 1\n- **Idempotence**: A AND A = A, A OR A = A"
            },
            {
              type: "text",
              content: "## Important Theorems\n\n### De Morgan's Theorem\n```\nNOT(A AND B) = NOT(A) OR NOT(B)\nNOT(A OR B) = NOT(A) AND NOT(B)\n```\n\n### Absorption\n```\nA OR (A AND B) = A\nA AND (A OR B) = A\n```"
            },
            {
              type: "diagram",
              title: "Simplification Example",
              content: `┌─────────────────────────────────────────────────────────────┐
│              SIMPLIFICATION EXAMPLE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Initial expression:                                         │
│  S = (A AND B) OR (A AND NOT(B)) OR (NOT(A) AND B)         │
│                                                              │
│  Step 1 - Factorization:                                    │
│  S = A AND (B OR NOT(B)) OR (NOT(A) AND B)                 │
│                                                              │
│  Step 2 - Complementarity (B OR NOT(B) = 1):               │
│  S = A AND 1 OR (NOT(A) AND B)                              │
│                                                              │
│  Step 3 - Identity (A AND 1 = A):                          │
│  S = A OR (NOT(A) AND B)                                    │
│                                                              │
│  Step 4 - Distribution:                                     │
│  S = A OR B                                                 │
│                                                              │
│  Result: Expression simplified from 3 gates to 1 gate!     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            }
          ]
        })
      },
      "Tableaux de Karnaugh": {
        title: "Karnaugh Maps",
        description: "Graphical method for simplifying logic functions",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Karnaugh Maps\n\nThe Karnaugh map is a **graphical** method for simplifying logic functions, faster than algebra for 3-4 variable functions."
            },
            {
              type: "diagram",
              title: "2-Variable Karnaugh Map",
              content: `┌─────────────────────────────────────────────────────────────┐
│           KARNAUGH MAP (2 variables)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      B                                       │
│                  0       1                                   │
│              ┌───────┬───────┐                              │
│          0   │   0   │   1   │                              │
│      A       ├───────┼───────┤                              │
│          1   │   1   │   1   │                              │
│              └───────┴───────┘                              │
│                                                              │
│  Group adjacent 1s to simplify:                             │
│  - Vertical group (A=0,B=1 and A=1,B=1) → B                 │
│  - Isolated cell (A=1,B=0) → A AND NOT(B)                   │
│                                                              │
│  Or horizontal group: row A=1 → A                           │
│  Result: S = A OR B                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Grouping Rules\n\n1. **Group the 1s** adjacent (horizontally or vertically)\n2. Groups must contain **2, 4, 8 or 16** cells (powers of 2)\n3. Groups can **overlap**\n4. Edges are **adjacent** (the table is cyclic)\n5. Make the **largest groups possible**"
            },
            {
              type: "text",
              content: "## Reading the Result\n\nFor each group:\n- Variables that **don't change** appear in the term\n- Variables that **change** disappear\n\nThe final result is the **OR** of all terms."
            },
            {
              type: "info",
              content: "For 5 or more variables, simplification software or the Quine-McCluskey method is generally used."
            }
          ]
        })
      }
    },
    es: {
      "La porte ET (AND)": {
        title: "La puerta AND",
        description: "Aprenda la función lógica AND y sus aplicaciones",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# La puerta lógica AND\n\nLa puerta AND es una función lógica fundamental. La salida es verdadera (1) **solo** si todas las entradas son verdaderas (1)."
            },
            {
              type: "text",
              content: "## Tabla de verdad\n\n| A | B | A AND B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
            },
            {
              type: "text",
              content: "## Símbolos\n\n- Símbolo lógico: A · B o A ∧ B\n- En programación: A AND B\n- En LADDER: Contactos en serie"
            },
            {
              type: "text",
              content: "## Ejemplo práctico\n\nUna máquina solo arranca si:\n- El botón START está presionado **Y**\n- La cubierta de seguridad está cerrada **Y**\n- La parada de emergencia no está activada\n\n➡️ ¡Es una función AND de 3 entradas!"
            }
          ]
        })
      },
      "La porte OU (OR)": {
        title: "La puerta OR",
        description: "Aprenda la función lógica OR y sus aplicaciones",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# La puerta lógica OR\n\nLa puerta OR da una salida verdadera (1) si **al menos una** de las entradas es verdadera (1)."
            },
            {
              type: "text",
              content: "## Tabla de verdad\n\n| A | B | A OR B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
            },
            {
              type: "text",
              content: "## Símbolos\n\n- Símbolo lógico: A + B o A ∨ B\n- En programación: A OR B\n- En LADDER: Contactos en paralelo"
            },
            {
              type: "text",
              content: "## Ejemplo práctico\n\nUna luz de alarma se enciende si:\n- La temperatura es muy alta **O**\n- La presión es muy alta **O**\n- El nivel es muy bajo\n\n➡️ ¡Es una función OR de 3 entradas!"
            }
          ]
        })
      },
      "La porte NON (NOT)": {
        title: "La puerta NOT",
        description: "Aprenda la función lógica NOT (inversión)",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# La puerta lógica NOT\n\nLa puerta NOT **invierte** el estado de la entrada. Si la entrada es 0, la salida es 1 y viceversa."
            },
            {
              type: "text",
              content: "## Tabla de verdad\n\n| A | NOT A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
            },
            {
              type: "text",
              content: "## Símbolos\n\n- Símbolo lógico: Ā o ¬A\n- En programación: NOT A\n- En LADDER: Contacto normalmente cerrado (NC)"
            },
            {
              type: "info",
              content: "Un contacto normalmente cerrado (NC) es un contacto que permite el paso de corriente cuando NO está activado."
            },
            {
              type: "text",
              content: "## Ejemplo práctico\n\nEl indicador \"MÁQUINA DETENIDA\" está encendido cuando el motor NO está funcionando.\n\n➡️ Indicador = NOT(Motor_funcionando)"
            }
          ]
        })
      },
      "Les portes NAND et NOR": {
        title: "Puertas NAND y NOR",
        description: "Descubra las funciones lógicas compuestas NAND y NOR",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Puertas NAND y NOR\n\nEstas puertas son **combinaciones** de las funciones básicas AND, OR, NOT."
            },
            {
              type: "text",
              content: "## La puerta NAND (NO-Y)\n\nEs la inversa de la puerta AND: la salida es 1 a menos que todas las entradas sean 1.\n\n| A | B | A NAND B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Fórmula**: NAND(A,B) = NOT(A AND B)"
            },
            {
              type: "text",
              content: "## La puerta NOR (NO-O)\n\nEs la inversa de la puerta OR: la salida es 1 solo si todas las entradas son 0.\n\n| A | B | A NOR B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 0 |\n\n**Fórmula**: NOR(A,B) = NOT(A OR B)"
            },
            {
              type: "info",
              content: "Dato notable: ¡solo con puertas NAND se pueden recrear TODAS las demás funciones lógicas! Por eso la NAND se llama 'puerta universal'."
            }
          ]
        })
      },
      "La porte XOR (OU exclusif)": {
        title: "La puerta XOR (O exclusivo)",
        description: "Aprenda la función lógica XOR y sus aplicaciones",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# La puerta XOR (O Exclusivo)\n\nLa puerta XOR da 1 si **exactamente una** de las entradas es 1 (pero no ambas)."
            },
            {
              type: "text",
              content: "## Tabla de verdad\n\n| A | B | A XOR B |\n|---|---|----------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Símbolo**: A ⊕ B"
            },
            {
              type: "text",
              content: "## Fórmula equivalente\n\nXOR puede expresarse con AND, OR, NOT:\n\n```\nA XOR B = (A OR B) AND NOT(A AND B)\n```\n\nO también:\n```\nA XOR B = (A AND NOT B) OR (NOT A AND B)\n```"
            },
            {
              type: "text",
              content: "## Aplicaciones industriales\n\n- **Comparación**: Detectar si dos señales son diferentes\n- **Control conmutado**: Como un interruptor de escalera\n- **Detección de cambio de estado**: Flanco ascendente/descendente\n- **Control de paridad**: Verificación de datos"
            }
          ]
        })
      },
      "Simplification des équations logiques": {
        title: "Simplificación de ecuaciones lógicas",
        description: "Aprenda a simplificar expresiones booleanas",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Simplificación de ecuaciones lógicas\n\nUna ecuación simplificada = **menos componentes** = **menor costo** y **mejor fiabilidad**."
            },
            {
              type: "text",
              content: "## Propiedades del álgebra de Boole\n\n### Propiedades básicas\n- **Identidad**: A AND 1 = A, A OR 0 = A\n- **Elemento nulo**: A AND 0 = 0, A OR 1 = 1\n- **Complementariedad**: A AND NOT(A) = 0, A OR NOT(A) = 1\n- **Idempotencia**: A AND A = A, A OR A = A"
            },
            {
              type: "text",
              content: "## Teoremas importantes\n\n### Teorema de De Morgan\n```\nNOT(A AND B) = NOT(A) OR NOT(B)\nNOT(A OR B) = NOT(A) AND NOT(B)\n```\n\n### Absorción\n```\nA OR (A AND B) = A\nA AND (A OR B) = A\n```"
            },
            {
              type: "diagram",
              title: "Ejemplo de simplificación",
              content: `┌─────────────────────────────────────────────────────────────┐
│              EJEMPLO DE SIMPLIFICACIÓN                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Expresión inicial:                                          │
│  S = (A AND B) OR (A AND NOT(B)) OR (NOT(A) AND B)         │
│                                                              │
│  Paso 1 - Factorización:                                    │
│  S = A AND (B OR NOT(B)) OR (NOT(A) AND B)                 │
│                                                              │
│  Paso 2 - Complementariedad (B OR NOT(B) = 1):             │
│  S = A AND 1 OR (NOT(A) AND B)                              │
│                                                              │
│  Paso 3 - Identidad (A AND 1 = A):                         │
│  S = A OR (NOT(A) AND B)                                    │
│                                                              │
│  Paso 4 - Distribución:                                     │
│  S = A OR B                                                 │
│                                                              │
│  Resultado: ¡Expresión simplificada de 3 puertas a 1!      │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            }
          ]
        })
      },
      "Tableaux de Karnaugh": {
        title: "Mapas de Karnaugh",
        description: "Método gráfico para simplificar funciones lógicas",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Mapas de Karnaugh\n\nEl mapa de Karnaugh es un método **gráfico** para simplificar funciones lógicas, más rápido que el álgebra para funciones de 3-4 variables."
            },
            {
              type: "diagram",
              title: "Mapa de Karnaugh de 2 variables",
              content: `┌─────────────────────────────────────────────────────────────┐
│           MAPA DE KARNAUGH (2 variables)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      B                                       │
│                  0       1                                   │
│              ┌───────┬───────┐                              │
│          0   │   0   │   1   │                              │
│      A       ├───────┼───────┤                              │
│          1   │   1   │   1   │                              │
│              └───────┴───────┘                              │
│                                                              │
│  Agrupar los 1 adyacentes para simplificar:                 │
│  - Grupo vertical (A=0,B=1 y A=1,B=1) → B                   │
│  - Celda aislada (A=1,B=0) → A AND NOT(B)                   │
│                                                              │
│  O grupo horizontal: fila A=1 → A                           │
│  Resultado: S = A OR B                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Reglas de agrupación\n\n1. **Agrupar los 1** adyacentes (horizontal o verticalmente)\n2. Los grupos deben contener **2, 4, 8 o 16** celdas (potencias de 2)\n3. Los grupos pueden **superponerse**\n4. Los bordes son **adyacentes** (la tabla es cíclica)\n5. Hacer los **grupos más grandes posibles**"
            },
            {
              type: "text",
              content: "## Lectura del resultado\n\nPara cada grupo:\n- Las variables que **no cambian** aparecen en el término\n- Las variables que **cambian** desaparecen\n\nEl resultado final es el **OR** de todos los términos."
            },
            {
              type: "info",
              content: "Para 5 o más variables, generalmente se usa software de simplificación o el método de Quine-McCluskey."
            }
          ]
        })
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: La porte ET (AND) - 5 questions
    [
      {
        question: "Quelle est la sortie de A ET B si A=1 et B=0 ?",
        options: ["0", "1", "Indéfini", "Erreur"],
        correctIndex: 0,
        explanation: "La porte ET nécessite que TOUTES les entrées soient à 1 pour avoir une sortie à 1. Ici B=0, donc la sortie est 0.",
        order: 1
      },
      {
        question: "En LADDER, comment représente-t-on une fonction ET ?",
        options: ["Contacts en parallèle", "Contacts en série", "Une seule bobine", "Un temporisateur"],
        correctIndex: 1,
        explanation: "En LADDER, les contacts en série représentent une fonction ET : le courant ne passe que si tous les contacts sont fermés.",
        order: 2
      },
      {
        question: "Quelle est la sortie de A ET B si A=1 et B=1 ?",
        options: ["0", "1", "Indéfini", "Dépend du contexte"],
        correctIndex: 1,
        explanation: "Quand toutes les entrées sont à 1, la porte ET donne 1 en sortie.",
        order: 3
      },
      {
        question: "Quel symbole représente la fonction ET en logique ?",
        options: ["A + B", "A · B ou A ∧ B", "A / B", "A - B"],
        correctIndex: 1,
        explanation: "La fonction ET s'écrit A · B (point) ou A ∧ B (chapeau) en notation logique.",
        order: 4
      },
      {
        question: "Pour un démarrage sécurisé avec 3 conditions (START, capot fermé, pas d'arrêt urgence), combien d'entrées à 1 faut-il ?",
        options: ["Au moins 1", "Au moins 2", "Les 3 entrées à 1", "Aucune"],
        correctIndex: 2,
        explanation: "Pour une fonction ET à 3 entrées (démarrage sécurisé), TOUTES les conditions doivent être vraies.",
        order: 5
      }
    ],
    // Lesson 2: La porte OU (OR) - 5 questions
    [
      {
        question: "Quelle est la sortie de A OU B si A=0 et B=1 ?",
        options: ["0", "1", "Indéfini", "Erreur"],
        correctIndex: 1,
        explanation: "La porte OU donne 1 si AU MOINS une entrée est à 1. Ici B=1, donc la sortie est 1.",
        order: 1
      },
      {
        question: "En LADDER, comment représente-t-on une fonction OU ?",
        options: ["Contacts en série", "Contacts en parallèle", "Un contact inversé", "Une bobine SET"],
        correctIndex: 1,
        explanation: "En LADDER, les contacts en parallèle représentent une fonction OU : le courant passe si au moins un contact est fermé.",
        order: 2
      },
      {
        question: "Quelle est la sortie de A OU B si A=0 et B=0 ?",
        options: ["0", "1", "Indéfini", "Dépend du contexte"],
        correctIndex: 0,
        explanation: "La porte OU ne donne 0 que si TOUTES les entrées sont à 0.",
        order: 3
      },
      {
        question: "Quel symbole représente la fonction OU en logique ?",
        options: ["A · B", "A + B ou A ∨ B", "A / B", "A × B"],
        correctIndex: 1,
        explanation: "La fonction OU s'écrit A + B (plus) ou A ∨ B (V inversé) en notation logique.",
        order: 4
      },
      {
        question: "Un voyant d'alarme s'allume si température trop haute OU pression trop haute. Avec T=1 et P=0, le voyant est :",
        options: ["Éteint", "Allumé", "Clignotant", "Indéterminé"],
        correctIndex: 1,
        explanation: "Avec une fonction OU, il suffit qu'une seule condition soit vraie (T=1) pour que le voyant s'allume.",
        order: 5
      }
    ],
    // Lesson 3: La porte NON (NOT) - 5 questions
    [
      {
        question: "Quelle est la sortie de NON A si A=1 ?",
        options: ["0", "1", "Indéfini", "-1"],
        correctIndex: 0,
        explanation: "La porte NON inverse l'entrée. Si A=1, alors NON A = 0.",
        order: 1
      },
      {
        question: "Comment appelle-t-on un contact qui laisse passer le courant quand il n'est PAS actionné ?",
        options: ["Contact normalement ouvert (NO)", "Contact normalement fermé (NF)", "Contact temporisé", "Contact mémorisé"],
        correctIndex: 1,
        explanation: "Un contact normalement fermé (NF) laisse passer le courant au repos et bloque quand il est actionné.",
        order: 2
      },
      {
        question: "Quel symbole représente la fonction NON en logique ?",
        options: ["A + B", "Ā ou ¬A", "A · B", "A / B"],
        correctIndex: 1,
        explanation: "La fonction NON s'écrit avec une barre au-dessus (Ā) ou le symbole ¬ devant la variable.",
        order: 3
      },
      {
        question: "En LADDER, comment représente-t-on une fonction NON ?",
        options: ["Un contact en série", "Un contact en parallèle", "Un contact normalement fermé (NF)", "Une bobine inversée"],
        correctIndex: 2,
        explanation: "En LADDER, un contact normalement fermé --[/]-- représente la fonction NON.",
        order: 4
      },
      {
        question: "Le voyant 'MACHINE ARRÊTÉE' doit être allumé quand le moteur n'est PAS en marche. Quelle logique utiliser ?",
        options: ["Voyant = Moteur", "Voyant = NON(Moteur)", "Voyant = Moteur ET Bouton", "Voyant = Moteur OU Bouton"],
        correctIndex: 1,
        explanation: "Le voyant s'allume quand le moteur est arrêté, donc Voyant = NON(Moteur_en_marche).",
        order: 5
      }
    ],
    // Lesson 4: Les portes NAND et NOR - 5 questions
    [
      {
        question: "Que signifie NAND ?",
        options: ["NOT AND (NON-ET)", "NOT ANOTHER", "NEUTRAL AND", "NEGATIVE AND"],
        correctIndex: 0,
        explanation: "NAND signifie NOT AND, soit NON-ET en français. C'est l'inverse de la fonction ET.",
        order: 1
      },
      {
        question: "Quelle est la sortie de A NAND B si A=1 et B=1 ?",
        options: ["1", "0", "Indéfini", "-1"],
        correctIndex: 1,
        explanation: "NAND est l'inverse de ET. Si A=1 et B=1, ET=1, donc NAND=0.",
        order: 2
      },
      {
        question: "Quelle est la sortie de A NOR B si A=0 et B=0 ?",
        options: ["0", "1", "Indéfini", "-1"],
        correctIndex: 1,
        explanation: "NOR est l'inverse de OU. Si A=0 et B=0, OU=0, donc NOR=1.",
        order: 3
      },
      {
        question: "Pourquoi la porte NAND est-elle appelée 'porte universelle' ?",
        options: ["Elle est utilisée partout", "Elle peut recréer toutes les autres fonctions logiques", "Elle est la plus rapide", "Elle consomme moins d'énergie"],
        correctIndex: 1,
        explanation: "Avec des portes NAND uniquement, on peut recréer ET, OU, NON et toutes les autres fonctions.",
        order: 4
      },
      {
        question: "Quelle est la formule de NAND(A,B) ?",
        options: ["A ET B", "NON(A ET B)", "A OU B", "NON(A) ET NON(B)"],
        correctIndex: 1,
        explanation: "NAND(A,B) = NON(A ET B), c'est l'inverse de la fonction ET.",
        order: 5
      }
    ],
    // Lesson 5: La porte XOR (OU exclusif) - 5 questions
    [
      {
        question: "Quelle est la sortie de A XOR B si A=1 et B=1 ?",
        options: ["1", "0", "Indéfini", "2"],
        correctIndex: 1,
        explanation: "XOR donne 1 si exactement une entrée est à 1. Ici les deux sont à 1, donc XOR=0.",
        order: 1
      },
      {
        question: "Quelle est la sortie de A XOR B si A=0 et B=1 ?",
        options: ["0", "1", "Indéfini", "-1"],
        correctIndex: 1,
        explanation: "XOR donne 1 si exactement une entrée est à 1. Ici B=1 uniquement, donc XOR=1.",
        order: 2
      },
      {
        question: "Quel symbole représente la fonction XOR ?",
        options: ["A · B", "A + B", "A ⊕ B", "A ÷ B"],
        correctIndex: 2,
        explanation: "Le symbole ⊕ (cercle avec un plus) représente la fonction XOR.",
        order: 3
      },
      {
        question: "Quelle application utilise couramment la fonction XOR ?",
        options: ["Démarrage moteur", "Commande va-et-vient (interrupteur d'escalier)", "Alarme incendie", "Climatisation"],
        correctIndex: 1,
        explanation: "Le va-et-vient (deux interrupteurs pour une lampe) utilise la logique XOR.",
        order: 4
      },
      {
        question: "Comment peut-on exprimer XOR avec ET, OU et NON ?",
        options: ["A ET B", "(A OU B) ET NON(A ET B)", "A OU NON(B)", "NON(A) OU B"],
        correctIndex: 1,
        explanation: "XOR = (A OU B) ET NON(A ET B), soit 'un ou l'autre mais pas les deux'.",
        order: 5
      }
    ],
    // Lesson 6: Simplification des équations logiques - 5 questions
    [
      {
        question: "Que vaut A ET 1 selon l'algèbre de Boole ?",
        options: ["0", "1", "A", "NON(A)"],
        correctIndex: 2,
        explanation: "C'est la propriété d'identité : A ET 1 = A.",
        order: 1
      },
      {
        question: "Que vaut A OU NON(A) ?",
        options: ["0", "1", "A", "Indéterminé"],
        correctIndex: 1,
        explanation: "C'est la propriété de complémentarité : A OU NON(A) = 1 (toujours vrai).",
        order: 2
      },
      {
        question: "Selon le théorème de De Morgan, NON(A ET B) équivaut à ?",
        options: ["NON(A) ET NON(B)", "NON(A) OU NON(B)", "A OU B", "A ET B"],
        correctIndex: 1,
        explanation: "De Morgan : NON(A ET B) = NON(A) OU NON(B).",
        order: 3
      },
      {
        question: "Que vaut A OU (A ET B) selon la propriété d'absorption ?",
        options: ["B", "A ET B", "A", "1"],
        correctIndex: 2,
        explanation: "Absorption : A OU (A ET B) = A. Le terme (A ET B) est 'absorbé' par A.",
        order: 4
      },
      {
        question: "Quel est l'avantage de simplifier une équation logique ?",
        options: ["Rendre le programme plus long", "Moins de composants, moins de coût, meilleure fiabilité", "Utiliser plus de mémoire", "Ralentir le système"],
        correctIndex: 1,
        explanation: "Une équation simplifiée nécessite moins de composants, réduit les coûts et améliore la fiabilité.",
        order: 5
      }
    ],
    // Lesson 7: Tableaux de Karnaugh - 5 questions
    [
      {
        question: "À quoi sert un tableau de Karnaugh ?",
        options: ["À programmer un automate", "À simplifier graphiquement les fonctions logiques", "À dessiner des schémas électriques", "À calculer des temps de cycle"],
        correctIndex: 1,
        explanation: "Le tableau de Karnaugh est une méthode graphique pour simplifier les fonctions logiques.",
        order: 1
      },
      {
        question: "Combien de cases a un tableau de Karnaugh à 2 variables ?",
        options: ["2 cases", "4 cases", "8 cases", "16 cases"],
        correctIndex: 1,
        explanation: "Avec 2 variables, il y a 2² = 4 combinaisons possibles, donc 4 cases.",
        order: 2
      },
      {
        question: "Quelle taille de groupe est valide dans un tableau de Karnaugh ?",
        options: ["3 cases", "5 cases", "2, 4, 8 ou 16 cases (puissances de 2)", "N'importe quel nombre"],
        correctIndex: 2,
        explanation: "Les groupes doivent contenir un nombre de cases égal à une puissance de 2.",
        order: 3
      },
      {
        question: "Dans un tableau de Karnaugh, les bords sont-ils adjacents ?",
        options: ["Non, jamais", "Oui, le tableau est cyclique", "Seulement en horizontal", "Seulement en vertical"],
        correctIndex: 1,
        explanation: "Le tableau de Karnaugh est cyclique : les bords gauche/droit et haut/bas sont adjacents.",
        order: 4
      },
      {
        question: "Pour combien de variables le tableau de Karnaugh devient-il peu pratique ?",
        options: ["2 variables", "3 variables", "5 variables et plus", "Il est toujours pratique"],
        correctIndex: 2,
        explanation: "À partir de 5 variables, on utilise plutôt des logiciels ou la méthode de Quine-McCluskey.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1: AND Gate
      "Quelle est la sortie de A ET B si A=1 et B=0 ?": {
        question: "What is the output of A AND B if A=1 and B=0?",
        options: ["0", "1", "Undefined", "Error"],
        explanation: "The AND gate requires ALL inputs to be 1 to have an output of 1. Here B=0, so the output is 0."
      },
      "En LADDER, comment représente-t-on une fonction ET ?": {
        question: "In LADDER, how is an AND function represented?",
        options: ["Contacts in parallel", "Contacts in series", "A single coil", "A timer"],
        explanation: "In LADDER, contacts in series represent an AND function: current only passes if all contacts are closed."
      },
      "Quelle est la sortie de A ET B si A=1 et B=1 ?": {
        question: "What is the output of A AND B if A=1 and B=1?",
        options: ["0", "1", "Undefined", "Depends on context"],
        explanation: "When all inputs are 1, the AND gate outputs 1."
      },
      "Quel symbole représente la fonction ET en logique ?": {
        question: "Which symbol represents the AND function in logic?",
        options: ["A + B", "A · B or A ∧ B", "A / B", "A - B"],
        explanation: "The AND function is written A · B (dot) or A ∧ B (caret) in logical notation."
      },
      "Pour un démarrage sécurisé avec 3 conditions (START, capot fermé, pas d'arrêt urgence), combien d'entrées à 1 faut-il ?": {
        question: "For a safe start with 3 conditions (START, cover closed, no emergency stop), how many inputs must be 1?",
        options: ["At least 1", "At least 2", "All 3 inputs at 1", "None"],
        explanation: "For a 3-input AND function (safe start), ALL conditions must be true."
      },
      // Lesson 2: OR Gate
      "Quelle est la sortie de A OU B si A=0 et B=1 ?": {
        question: "What is the output of A OR B if A=0 and B=1?",
        options: ["0", "1", "Undefined", "Error"],
        explanation: "The OR gate gives 1 if AT LEAST one input is 1. Here B=1, so the output is 1."
      },
      "En LADDER, comment représente-t-on une fonction OU ?": {
        question: "In LADDER, how is an OR function represented?",
        options: ["Contacts in series", "Contacts in parallel", "An inverted contact", "A SET coil"],
        explanation: "In LADDER, contacts in parallel represent an OR function: current passes if at least one contact is closed."
      },
      "Quelle est la sortie de A OU B si A=0 et B=0 ?": {
        question: "What is the output of A OR B if A=0 and B=0?",
        options: ["0", "1", "Undefined", "Depends on context"],
        explanation: "The OR gate only gives 0 if ALL inputs are 0."
      },
      "Quel symbole représente la fonction OU en logique ?": {
        question: "Which symbol represents the OR function in logic?",
        options: ["A · B", "A + B or A ∨ B", "A / B", "A × B"],
        explanation: "The OR function is written A + B (plus) or A ∨ B (inverted V) in logical notation."
      },
      "Un voyant d'alarme s'allume si température trop haute OU pression trop haute. Avec T=1 et P=0, le voyant est :": {
        question: "An alarm light turns on if temperature too high OR pressure too high. With T=1 and P=0, the light is:",
        options: ["Off", "On", "Flashing", "Undetermined"],
        explanation: "With an OR function, only one condition needs to be true (T=1) for the light to turn on."
      },
      // Lesson 3: NOT Gate
      "Quelle est la sortie de NON A si A=1 ?": {
        question: "What is the output of NOT A if A=1?",
        options: ["0", "1", "Undefined", "-1"],
        explanation: "The NOT gate inverts the input. If A=1, then NOT A = 0."
      },
      "Comment appelle-t-on un contact qui laisse passer le courant quand il n'est PAS actionné ?": {
        question: "What do you call a contact that allows current to flow when it is NOT activated?",
        options: ["Normally open contact (NO)", "Normally closed contact (NC)", "Timed contact", "Memorized contact"],
        explanation: "A normally closed contact (NC) allows current to flow at rest and blocks when activated."
      },
      "Quel symbole représente la fonction NON en logique ?": {
        question: "Which symbol represents the NOT function in logic?",
        options: ["A + B", "Ā or ¬A", "A · B", "A / B"],
        explanation: "The NOT function is written with a bar above (Ā) or the ¬ symbol before the variable."
      },
      "En LADDER, comment représente-t-on une fonction NON ?": {
        question: "In LADDER, how is a NOT function represented?",
        options: ["A contact in series", "A contact in parallel", "A normally closed contact (NC)", "An inverted coil"],
        explanation: "In LADDER, a normally closed contact --[/]-- represents the NOT function."
      },
      "Le voyant 'MACHINE ARRÊTÉE' doit être allumé quand le moteur n'est PAS en marche. Quelle logique utiliser ?": {
        question: "The 'MACHINE STOPPED' indicator should be on when the motor is NOT running. What logic to use?",
        options: ["Indicator = Motor", "Indicator = NOT(Motor)", "Indicator = Motor AND Button", "Indicator = Motor OR Button"],
        explanation: "The indicator lights when the motor is stopped, so Indicator = NOT(Motor_running)."
      },
      // Lesson 4: NAND and NOR Gates
      "Que signifie NAND ?": {
        question: "What does NAND mean?",
        options: ["NOT AND", "NOT ANOTHER", "NEUTRAL AND", "NEGATIVE AND"],
        explanation: "NAND means NOT AND. It is the inverse of the AND function."
      },
      "Quelle est la sortie de A NAND B si A=1 et B=1 ?": {
        question: "What is the output of A NAND B if A=1 and B=1?",
        options: ["1", "0", "Undefined", "-1"],
        explanation: "NAND is the inverse of AND. If A=1 and B=1, AND=1, so NAND=0."
      },
      "Quelle est la sortie de A NOR B si A=0 et B=0 ?": {
        question: "What is the output of A NOR B if A=0 and B=0?",
        options: ["0", "1", "Undefined", "-1"],
        explanation: "NOR is the inverse of OR. If A=0 and B=0, OR=0, so NOR=1."
      },
      "Pourquoi la porte NAND est-elle appelée 'porte universelle' ?": {
        question: "Why is the NAND gate called a 'universal gate'?",
        options: ["It is used everywhere", "It can recreate all other logic functions", "It is the fastest", "It consumes less energy"],
        explanation: "With NAND gates alone, you can recreate AND, OR, NOT and all other functions."
      },
      "Quelle est la formule de NAND(A,B) ?": {
        question: "What is the formula for NAND(A,B)?",
        options: ["A AND B", "NOT(A AND B)", "A OR B", "NOT(A) AND NOT(B)"],
        explanation: "NAND(A,B) = NOT(A AND B), it is the inverse of the AND function."
      },
      // Lesson 5: XOR Gate
      "Quelle est la sortie de A XOR B si A=1 et B=1 ?": {
        question: "What is the output of A XOR B if A=1 and B=1?",
        options: ["1", "0", "Undefined", "2"],
        explanation: "XOR gives 1 if exactly one input is 1. Here both are 1, so XOR=0."
      },
      "Quelle est la sortie de A XOR B si A=0 et B=1 ?": {
        question: "What is the output of A XOR B if A=0 and B=1?",
        options: ["0", "1", "Undefined", "-1"],
        explanation: "XOR gives 1 if exactly one input is 1. Here only B=1, so XOR=1."
      },
      "Quel symbole représente la fonction XOR ?": {
        question: "Which symbol represents the XOR function?",
        options: ["A · B", "A + B", "A ⊕ B", "A ÷ B"],
        explanation: "The symbol ⊕ (circle with a plus) represents the XOR function."
      },
      "Quelle application utilise couramment la fonction XOR ?": {
        question: "Which application commonly uses the XOR function?",
        options: ["Motor start", "Two-way switch control (staircase light)", "Fire alarm", "Air conditioning"],
        explanation: "The two-way switch (two switches for one lamp) uses XOR logic."
      },
      "Comment peut-on exprimer XOR avec ET, OU et NON ?": {
        question: "How can XOR be expressed with AND, OR and NOT?",
        options: ["A AND B", "(A OR B) AND NOT(A AND B)", "A OR NOT(B)", "NOT(A) OR B"],
        explanation: "XOR = (A OR B) AND NOT(A AND B), meaning 'one or the other but not both'."
      },
      // Lesson 6: Simplification
      "Que vaut A ET 1 selon l'algèbre de Boole ?": {
        question: "What is A AND 1 according to Boolean algebra?",
        options: ["0", "1", "A", "NOT(A)"],
        explanation: "This is the identity property: A AND 1 = A."
      },
      "Que vaut A OU NON(A) ?": {
        question: "What is A OR NOT(A)?",
        options: ["0", "1", "A", "Undetermined"],
        explanation: "This is the complementarity property: A OR NOT(A) = 1 (always true)."
      },
      "Selon le théorème de De Morgan, NON(A ET B) équivaut à ?": {
        question: "According to De Morgan's theorem, NOT(A AND B) equals?",
        options: ["NOT(A) AND NOT(B)", "NOT(A) OR NOT(B)", "A OR B", "A AND B"],
        explanation: "De Morgan: NOT(A AND B) = NOT(A) OR NOT(B)."
      },
      "Que vaut A OU (A ET B) selon la propriété d'absorption ?": {
        question: "What is A OR (A AND B) according to the absorption property?",
        options: ["B", "A AND B", "A", "1"],
        explanation: "Absorption: A OR (A AND B) = A. The term (A AND B) is 'absorbed' by A."
      },
      "Quel est l'avantage de simplifier une équation logique ?": {
        question: "What is the advantage of simplifying a logic equation?",
        options: ["Make the program longer", "Fewer components, less cost, better reliability", "Use more memory", "Slow down the system"],
        explanation: "A simplified equation requires fewer components, reduces costs and improves reliability."
      },
      // Lesson 7: Karnaugh Maps
      "À quoi sert un tableau de Karnaugh ?": {
        question: "What is a Karnaugh map used for?",
        options: ["To program a PLC", "To graphically simplify logic functions", "To draw electrical diagrams", "To calculate cycle times"],
        explanation: "The Karnaugh map is a graphical method for simplifying logic functions."
      },
      "Combien de cases a un tableau de Karnaugh à 2 variables ?": {
        question: "How many cells does a 2-variable Karnaugh map have?",
        options: ["2 cells", "4 cells", "8 cells", "16 cells"],
        explanation: "With 2 variables, there are 2² = 4 possible combinations, so 4 cells."
      },
      "Quelle taille de groupe est valide dans un tableau de Karnaugh ?": {
        question: "What group size is valid in a Karnaugh map?",
        options: ["3 cells", "5 cells", "2, 4, 8 or 16 cells (powers of 2)", "Any number"],
        explanation: "Groups must contain a number of cells equal to a power of 2."
      },
      "Dans un tableau de Karnaugh, les bords sont-ils adjacents ?": {
        question: "In a Karnaugh map, are the edges adjacent?",
        options: ["No, never", "Yes, the table is cyclic", "Only horizontally", "Only vertically"],
        explanation: "The Karnaugh map is cyclic: left/right and top/bottom edges are adjacent."
      },
      "Pour combien de variables le tableau de Karnaugh devient-il peu pratique ?": {
        question: "For how many variables does the Karnaugh map become impractical?",
        options: ["2 variables", "3 variables", "5 variables and more", "It is always practical"],
        explanation: "From 5 variables, software or the Quine-McCluskey method is generally used instead."
      }
    },
    es: {
      // Lesson 1: AND Gate
      "Quelle est la sortie de A ET B si A=1 et B=0 ?": {
        question: "¿Cuál es la salida de A AND B si A=1 y B=0?",
        options: ["0", "1", "Indefinido", "Error"],
        explanation: "La puerta AND requiere que TODAS las entradas sean 1 para tener una salida de 1. Aquí B=0, entonces la salida es 0."
      },
      "En LADDER, comment représente-t-on une fonction ET ?": {
        question: "En LADDER, ¿cómo se representa una función AND?",
        options: ["Contactos en paralelo", "Contactos en serie", "Una sola bobina", "Un temporizador"],
        explanation: "En LADDER, los contactos en serie representan una función AND: la corriente solo pasa si todos los contactos están cerrados."
      },
      "Quelle est la sortie de A ET B si A=1 et B=1 ?": {
        question: "¿Cuál es la salida de A AND B si A=1 y B=1?",
        options: ["0", "1", "Indefinido", "Depende del contexto"],
        explanation: "Cuando todas las entradas son 1, la puerta AND da 1 como salida."
      },
      "Quel symbole représente la fonction ET en logique ?": {
        question: "¿Qué símbolo representa la función AND en lógica?",
        options: ["A + B", "A · B o A ∧ B", "A / B", "A - B"],
        explanation: "La función AND se escribe A · B (punto) o A ∧ B (circunflejo) en notación lógica."
      },
      "Pour un démarrage sécurisé avec 3 conditions (START, capot fermé, pas d'arrêt urgence), combien d'entrées à 1 faut-il ?": {
        question: "Para un arranque seguro con 3 condiciones (START, cubierta cerrada, sin parada de emergencia), ¿cuántas entradas deben ser 1?",
        options: ["Al menos 1", "Al menos 2", "Las 3 entradas en 1", "Ninguna"],
        explanation: "Para una función AND de 3 entradas (arranque seguro), TODAS las condiciones deben ser verdaderas."
      },
      // Lesson 2: OR Gate
      "Quelle est la sortie de A OU B si A=0 et B=1 ?": {
        question: "¿Cuál es la salida de A OR B si A=0 y B=1?",
        options: ["0", "1", "Indefinido", "Error"],
        explanation: "La puerta OR da 1 si AL MENOS una entrada es 1. Aquí B=1, entonces la salida es 1."
      },
      "En LADDER, comment représente-t-on une fonction OU ?": {
        question: "En LADDER, ¿cómo se representa una función OR?",
        options: ["Contactos en serie", "Contactos en paralelo", "Un contacto invertido", "Una bobina SET"],
        explanation: "En LADDER, los contactos en paralelo representan una función OR: la corriente pasa si al menos un contacto está cerrado."
      },
      "Quelle est la sortie de A OU B si A=0 et B=0 ?": {
        question: "¿Cuál es la salida de A OR B si A=0 y B=0?",
        options: ["0", "1", "Indefinido", "Depende del contexto"],
        explanation: "La puerta OR solo da 0 si TODAS las entradas son 0."
      },
      "Quel symbole représente la fonction OU en logique ?": {
        question: "¿Qué símbolo representa la función OR en lógica?",
        options: ["A · B", "A + B o A ∨ B", "A / B", "A × B"],
        explanation: "La función OR se escribe A + B (más) o A ∨ B (V invertida) en notación lógica."
      },
      "Un voyant d'alarme s'allume si température trop haute OU pression trop haute. Avec T=1 et P=0, le voyant est :": {
        question: "Una luz de alarma se enciende si la temperatura es muy alta O la presión es muy alta. Con T=1 y P=0, la luz está:",
        options: ["Apagada", "Encendida", "Parpadeando", "Indeterminado"],
        explanation: "Con una función OR, solo una condición necesita ser verdadera (T=1) para que la luz se encienda."
      },
      // Lesson 3: NOT Gate
      "Quelle est la sortie de NON A si A=1 ?": {
        question: "¿Cuál es la salida de NOT A si A=1?",
        options: ["0", "1", "Indefinido", "-1"],
        explanation: "La puerta NOT invierte la entrada. Si A=1, entonces NOT A = 0."
      },
      "Comment appelle-t-on un contact qui laisse passer le courant quand il n'est PAS actionné ?": {
        question: "¿Cómo se llama un contacto que permite el paso de corriente cuando NO está activado?",
        options: ["Contacto normalmente abierto (NA)", "Contacto normalmente cerrado (NC)", "Contacto temporizado", "Contacto memorizado"],
        explanation: "Un contacto normalmente cerrado (NC) permite el paso de corriente en reposo y bloquea cuando está activado."
      },
      "Quel symbole représente la fonction NON en logique ?": {
        question: "¿Qué símbolo representa la función NOT en lógica?",
        options: ["A + B", "Ā o ¬A", "A · B", "A / B"],
        explanation: "La función NOT se escribe con una barra encima (Ā) o el símbolo ¬ delante de la variable."
      },
      "En LADDER, comment représente-t-on une fonction NON ?": {
        question: "En LADDER, ¿cómo se representa una función NOT?",
        options: ["Un contacto en serie", "Un contacto en paralelo", "Un contacto normalmente cerrado (NC)", "Una bobina invertida"],
        explanation: "En LADDER, un contacto normalmente cerrado --[/]-- representa la función NOT."
      },
      "Le voyant 'MACHINE ARRÊTÉE' doit être allumé quand le moteur n'est PAS en marche. Quelle logique utiliser ?": {
        question: "El indicador 'MÁQUINA DETENIDA' debe estar encendido cuando el motor NO está funcionando. ¿Qué lógica usar?",
        options: ["Indicador = Motor", "Indicador = NOT(Motor)", "Indicador = Motor AND Botón", "Indicador = Motor OR Botón"],
        explanation: "El indicador se enciende cuando el motor está detenido, entonces Indicador = NOT(Motor_funcionando)."
      },
      // Lesson 4: NAND and NOR Gates
      "Que signifie NAND ?": {
        question: "¿Qué significa NAND?",
        options: ["NOT AND (NO-Y)", "NOT ANOTHER", "NEUTRAL AND", "NEGATIVE AND"],
        explanation: "NAND significa NOT AND, es decir NO-Y. Es la inversa de la función AND."
      },
      "Quelle est la sortie de A NAND B si A=1 et B=1 ?": {
        question: "¿Cuál es la salida de A NAND B si A=1 y B=1?",
        options: ["1", "0", "Indefinido", "-1"],
        explanation: "NAND es la inversa de AND. Si A=1 y B=1, AND=1, entonces NAND=0."
      },
      "Quelle est la sortie de A NOR B si A=0 et B=0 ?": {
        question: "¿Cuál es la salida de A NOR B si A=0 y B=0?",
        options: ["0", "1", "Indefinido", "-1"],
        explanation: "NOR es la inversa de OR. Si A=0 y B=0, OR=0, entonces NOR=1."
      },
      "Pourquoi la porte NAND est-elle appelée 'porte universelle' ?": {
        question: "¿Por qué la puerta NAND se llama 'puerta universal'?",
        options: ["Se usa en todas partes", "Puede recrear todas las demás funciones lógicas", "Es la más rápida", "Consume menos energía"],
        explanation: "Solo con puertas NAND se pueden recrear AND, OR, NOT y todas las demás funciones."
      },
      "Quelle est la formule de NAND(A,B) ?": {
        question: "¿Cuál es la fórmula de NAND(A,B)?",
        options: ["A AND B", "NOT(A AND B)", "A OR B", "NOT(A) AND NOT(B)"],
        explanation: "NAND(A,B) = NOT(A AND B), es la inversa de la función AND."
      },
      // Lesson 5: XOR Gate
      "Quelle est la sortie de A XOR B si A=1 et B=1 ?": {
        question: "¿Cuál es la salida de A XOR B si A=1 y B=1?",
        options: ["1", "0", "Indefinido", "2"],
        explanation: "XOR da 1 si exactamente una entrada es 1. Aquí ambas son 1, entonces XOR=0."
      },
      "Quelle est la sortie de A XOR B si A=0 et B=1 ?": {
        question: "¿Cuál es la salida de A XOR B si A=0 y B=1?",
        options: ["0", "1", "Indefinido", "-1"],
        explanation: "XOR da 1 si exactamente una entrada es 1. Aquí solo B=1, entonces XOR=1."
      },
      "Quel symbole représente la fonction XOR ?": {
        question: "¿Qué símbolo representa la función XOR?",
        options: ["A · B", "A + B", "A ⊕ B", "A ÷ B"],
        explanation: "El símbolo ⊕ (círculo con un más) representa la función XOR."
      },
      "Quelle application utilise couramment la fonction XOR ?": {
        question: "¿Qué aplicación usa comúnmente la función XOR?",
        options: ["Arranque de motor", "Control conmutado (interruptor de escalera)", "Alarma de incendio", "Aire acondicionado"],
        explanation: "El interruptor conmutado (dos interruptores para una lámpara) usa lógica XOR."
      },
      "Comment peut-on exprimer XOR avec ET, OU et NON ?": {
        question: "¿Cómo se puede expresar XOR con AND, OR y NOT?",
        options: ["A AND B", "(A OR B) AND NOT(A AND B)", "A OR NOT(B)", "NOT(A) OR B"],
        explanation: "XOR = (A OR B) AND NOT(A AND B), es decir 'uno u otro pero no ambos'."
      },
      // Lesson 6: Simplification
      "Que vaut A ET 1 selon l'algèbre de Boole ?": {
        question: "¿Cuánto vale A AND 1 según el álgebra de Boole?",
        options: ["0", "1", "A", "NOT(A)"],
        explanation: "Esta es la propiedad de identidad: A AND 1 = A."
      },
      "Que vaut A OU NON(A) ?": {
        question: "¿Cuánto vale A OR NOT(A)?",
        options: ["0", "1", "A", "Indeterminado"],
        explanation: "Esta es la propiedad de complementariedad: A OR NOT(A) = 1 (siempre verdadero)."
      },
      "Selon le théorème de De Morgan, NON(A ET B) équivaut à ?": {
        question: "Según el teorema de De Morgan, ¿NOT(A AND B) equivale a?",
        options: ["NOT(A) AND NOT(B)", "NOT(A) OR NOT(B)", "A OR B", "A AND B"],
        explanation: "De Morgan: NOT(A AND B) = NOT(A) OR NOT(B)."
      },
      "Que vaut A OU (A ET B) selon la propriété d'absorption ?": {
        question: "¿Cuánto vale A OR (A AND B) según la propiedad de absorción?",
        options: ["B", "A AND B", "A", "1"],
        explanation: "Absorción: A OR (A AND B) = A. El término (A AND B) es 'absorbido' por A."
      },
      "Quel est l'avantage de simplifier une équation logique ?": {
        question: "¿Cuál es la ventaja de simplificar una ecuación lógica?",
        options: ["Hacer el programa más largo", "Menos componentes, menor costo, mejor fiabilidad", "Usar más memoria", "Ralentizar el sistema"],
        explanation: "Una ecuación simplificada requiere menos componentes, reduce costos y mejora la fiabilidad."
      },
      // Lesson 7: Karnaugh Maps
      "À quoi sert un tableau de Karnaugh ?": {
        question: "¿Para qué sirve un mapa de Karnaugh?",
        options: ["Para programar un PLC", "Para simplificar gráficamente funciones lógicas", "Para dibujar diagramas eléctricos", "Para calcular tiempos de ciclo"],
        explanation: "El mapa de Karnaugh es un método gráfico para simplificar funciones lógicas."
      },
      "Combien de cases a un tableau de Karnaugh à 2 variables ?": {
        question: "¿Cuántas celdas tiene un mapa de Karnaugh de 2 variables?",
        options: ["2 celdas", "4 celdas", "8 celdas", "16 celdas"],
        explanation: "Con 2 variables, hay 2² = 4 combinaciones posibles, entonces 4 celdas."
      },
      "Quelle taille de groupe est valide dans un tableau de Karnaugh ?": {
        question: "¿Qué tamaño de grupo es válido en un mapa de Karnaugh?",
        options: ["3 celdas", "5 celdas", "2, 4, 8 o 16 celdas (potencias de 2)", "Cualquier número"],
        explanation: "Los grupos deben contener un número de celdas igual a una potencia de 2."
      },
      "Dans un tableau de Karnaugh, les bords sont-ils adjacents ?": {
        question: "En un mapa de Karnaugh, ¿los bordes son adyacentes?",
        options: ["No, nunca", "Sí, la tabla es cíclica", "Solo horizontalmente", "Solo verticalmente"],
        explanation: "El mapa de Karnaugh es cíclico: los bordes izquierdo/derecho y superior/inferior son adyacentes."
      },
      "Pour combien de variables le tableau de Karnaugh devient-il peu pratique ?": {
        question: "¿Para cuántas variables el mapa de Karnaugh se vuelve poco práctico?",
        options: ["2 variables", "3 variables", "5 variables o más", "Siempre es práctico"],
        explanation: "A partir de 5 variables, generalmente se usa software o el método de Quine-McCluskey."
      }
    }
  }
}
