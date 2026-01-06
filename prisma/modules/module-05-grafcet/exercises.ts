import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module05Exercises: ExerciseData[] = [
  {
    title: "Éléments GRAFCET - Associations",
    description: "Associez chaque élément GRAFCET à sa signification",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez chaque symbole GRAFCET",
        "Associez chaque élément à sa description",
        "Vérifiez vos associations"
      ],
      objective: "Associer correctement les éléments GRAFCET"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "etape", text: "Carré simple" },
        { id: "etape_init", text: "Double carré" },
        { id: "transition", text: "Barre horizontale" },
        { id: "action", text: "Rectangle à droite de l'étape" }
      ],
      rightItems: [
        { id: "step", text: "Étape normale" },
        { id: "initial", text: "Étape initiale" },
        { id: "condition", text: "Condition de passage" },
        { id: "output", text: "Action associée à l'étape" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["etape", "step"],
        ["etape_init", "initial"],
        ["transition", "condition"],
        ["action", "output"]
      ]
    }),
    hints: JSON.stringify([
      "L'étape initiale est toujours représentée par un double carré",
      "Les transitions sont les conditions pour passer d'une étape à l'autre",
      "Les actions sont associées aux étapes, pas aux transitions"
    ]),
    xpReward: 75,
    order: 1
  },
  {
    title: "GRAFCET séquentiel simple",
    description: "Complétez un GRAFCET pour une séquence de démarrage machine",
    type: "fill_blank",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Étape 0: État initial - Machine à l'arrêt",
        "Transition 1: Bouton Départ (I0.0)",
        "Étape 1: Préchauffage moteur (Q0.0) pendant 5 secondes",
        "Transition 2: Temporisation écoulée",
        "Étape 2: Machine en marche (Q0.1)"
      ],
      objective: "Créer un GRAFCET linéaire à 3 étapes"
    }),
    config: JSON.stringify({
      text: "GRAFCET de démarrage machine:\n\nÉtape {{blank1}}: État initial (étape {{blank2}})\n↓\nTransition: {{blank3}} = 1\n↓\nÉtape 1: Action = {{blank4}} (préchauffage)\n↓\nTransition: T1 ≥ {{blank5}} secondes\n↓\nÉtape 2: Action = {{blank6}} (machine en marche)\n\nNombre total d'étapes: {{blank7}}",
      blanks: [
        { id: "blank1", placeholder: "numéro" },
        { id: "blank2", placeholder: "type" },
        { id: "blank3", placeholder: "entrée" },
        { id: "blank4", placeholder: "sortie" },
        { id: "blank5", placeholder: "durée" },
        { id: "blank6", placeholder: "sortie" },
        { id: "blank7", placeholder: "nombre" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "0",
        blank2: "initiale",
        blank3: "I0.0",
        blank4: "Q0.0",
        blank5: "5",
        blank6: "Q0.1",
        blank7: "3"
      }
    }),
    hints: JSON.stringify([
      "Commencez toujours par une étape initiale (double carré)",
      "Chaque transition nécessite une condition",
      "Les actions sont associées aux étapes, pas aux transitions"
    ]),
    xpReward: 100,
    order: 2
  },
  {
    title: "Types de divergences",
    description: "Identifiez les types de divergences GRAFCET",
    type: "drag_drop",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Analysez chaque type de divergence",
        "Placez chaque caractéristique dans la bonne catégorie",
        "Vérifiez vos placements"
      ],
      objective: "Distinguer divergence en OU et divergence en ET"
    }),
    config: JSON.stringify({
      items: [
        { id: "item1", text: "Une seule branche est active" },
        { id: "item2", text: "Toutes les branches sont actives simultanément" },
        { id: "item3", text: "Simple barre horizontale" },
        { id: "item4", text: "Double barre horizontale" },
        { id: "item5", text: "Conditions exclusives" },
        { id: "item6", text: "Même condition pour toutes les branches" }
      ],
      zones: [
        { id: "ou", label: "Divergence en OU" },
        { id: "et", label: "Divergence en ET" }
      ]
    }),
    solution: JSON.stringify({
      placements: {
        ou: ["item1", "item3", "item5"],
        et: ["item2", "item4", "item6"]
      }
    }),
    hints: JSON.stringify([
      "Une divergence en OU utilise une simple barre horizontale",
      "Une divergence en ET utilise une double barre horizontale",
      "OU = choix exclusif, ET = parallélisme"
    ]),
    xpReward: 125,
    order: 3
  },
  {
    title: "Ordre des étapes GRAFCET",
    description: "Remettez dans l'ordre les étapes d'un cycle automatique",
    type: "ordering",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Analysez le cycle d'un vérin pneumatique",
        "Remettez les étapes dans l'ordre logique",
        "Le cycle commence par l'attente"
      ],
      objective: "Ordonner les étapes d'un cycle vérin"
    }),
    config: JSON.stringify({
      items: [
        { id: "step0", text: "Étape 0: Attente (état initial)" },
        { id: "step1", text: "Étape 1: Avance vérin (Q0.0)" },
        { id: "step2", text: "Étape 2: Temporisation 2s" },
        { id: "step3", text: "Étape 3: Recul vérin (Q0.1)" },
        { id: "step4", text: "Retour à l'étape initiale" }
      ]
    }),
    solution: JSON.stringify({
      correctOrder: ["step0", "step1", "step2", "step3", "step4"]
    }),
    hints: JSON.stringify([
      "La dernière transition revient à l'étape initiale",
      "Le cycle peut être continu ou déclenché par bouton",
      "Utilisez les fins de course pour les transitions"
    ]),
    xpReward: 100,
    order: 4
  },
  {
    title: "GRAFCET avec divergence en ET",
    description: "Complétez un GRAFCET avec des actions simultanées",
    type: "fill_blank",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Étape 0: Attente départ",
        "Transition: Bouton départ (I0.0)",
        "Divergence ET: 2 branches simultanées",
        "Branche 1: Étape 1A → Serrage pièce (Q0.0)",
        "Branche 2: Étape 1B → Rotation broche (Q0.1)",
        "Convergence ET quand les deux actions sont terminées"
      ],
      objective: "Implémenter une divergence en ET (simultanéité)"
    }),
    config: JSON.stringify({
      text: "GRAFCET avec parallélisme:\n\nÉtape 0: Attente\n↓\nTransition: I0.0 = 1\n↓\n══════════════════  ← Divergence en {{blank1}}\n↓              ↓\nÉtape {{blank2}}      Étape {{blank3}}\nAction: Q0.0    Action: Q0.1\n↓              ↓\nTrans: I0.1     Trans: {{blank4}}\n↓              ↓\n══════════════════  ← {{blank5}} en ET\n↓\nÉtape 2: Usinage terminé\n\nLes deux branches s'exécutent {{blank6}}",
      blanks: [
        { id: "blank1", placeholder: "type" },
        { id: "blank2", placeholder: "numéro" },
        { id: "blank3", placeholder: "numéro" },
        { id: "blank4", placeholder: "condition" },
        { id: "blank5", placeholder: "type" },
        { id: "blank6", placeholder: "mode" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "ET",
        blank2: "1A",
        blank3: "1B",
        blank4: "I0.2",
        blank5: "Convergence",
        blank6: "simultanément|en parallèle"
      }
    }),
    hints: JSON.stringify([
      "Une divergence en ET utilise une double barre horizontale",
      "Les deux branches s'exécutent simultanément",
      "La convergence en ET attend que toutes les branches soient prêtes"
    ]),
    xpReward: 175,
    order: 5
  }
]

export const module05ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Éléments GRAFCET - Associations": {
      title: "GRAFCET Elements - Matching",
      description: "Match each GRAFCET element to its meaning",
      instructions: JSON.stringify({
        steps: [
          "Identify each GRAFCET symbol",
          "Match each element to its description",
          "Verify your matches"
        ],
        objective: "Correctly match GRAFCET elements"
      }),
      hints: JSON.stringify([
        "The initial step is always represented by a double square",
        "Transitions are conditions for moving from one step to another",
        "Actions are associated with steps, not transitions"
      ])
    },
    "GRAFCET séquentiel simple": {
      title: "Simple Sequential GRAFCET",
      description: "Complete a GRAFCET for a machine startup sequence",
      instructions: JSON.stringify({
        steps: [
          "Step 0: Initial state - Machine stopped",
          "Transition 1: Start button (I0.0)",
          "Step 1: Motor preheating (Q0.0) for 5 seconds",
          "Transition 2: Timer elapsed",
          "Step 2: Machine running (Q0.1)"
        ],
        objective: "Create a linear 3-step GRAFCET"
      }),
      hints: JSON.stringify([
        "Always start with an initial step (double square)",
        "Each transition requires a condition",
        "Actions are associated with steps, not transitions"
      ])
    },
    "Types de divergences": {
      title: "Divergence Types",
      description: "Identify GRAFCET divergence types",
      instructions: JSON.stringify({
        steps: [
          "Analyze each divergence type",
          "Place each characteristic in the correct category",
          "Verify your placements"
        ],
        objective: "Distinguish OR divergence and AND divergence"
      }),
      hints: JSON.stringify([
        "An OR divergence uses a simple horizontal bar",
        "An AND divergence uses a double horizontal bar",
        "OR = exclusive choice, AND = parallelism"
      ])
    },
    "Ordre des étapes GRAFCET": {
      title: "GRAFCET Steps Order",
      description: "Put the automatic cycle steps in order",
      instructions: JSON.stringify({
        steps: [
          "Analyze the pneumatic cylinder cycle",
          "Put the steps in logical order",
          "The cycle starts with waiting"
        ],
        objective: "Order the cylinder cycle steps"
      }),
      hints: JSON.stringify([
        "The last transition returns to the initial step",
        "The cycle can be continuous or button-triggered",
        "Use limit switches for transitions"
      ])
    },
    "GRAFCET avec divergence en ET": {
      title: "GRAFCET with AND Divergence",
      description: "Complete a GRAFCET with simultaneous actions",
      instructions: JSON.stringify({
        steps: [
          "Step 0: Waiting for start",
          "Transition: Start button (I0.0)",
          "AND divergence: 2 simultaneous branches",
          "Branch 1: Step 1A → Part clamping (Q0.0)",
          "Branch 2: Step 1B → Spindle rotation (Q0.1)",
          "AND convergence when both actions are complete"
        ],
        objective: "Implement an AND divergence (simultaneity)"
      }),
      hints: JSON.stringify([
        "An AND divergence uses a double horizontal bar",
        "Both branches execute simultaneously",
        "The AND convergence waits for all branches to be ready"
      ])
    }
  },
  es: {
    "Éléments GRAFCET - Associations": {
      title: "Elementos GRAFCET - Asociaciones",
      description: "Asocie cada elemento GRAFCET a su significado",
      instructions: JSON.stringify({
        steps: [
          "Identifique cada símbolo GRAFCET",
          "Asocie cada elemento a su descripción",
          "Verifique sus asociaciones"
        ],
        objective: "Asociar correctamente los elementos GRAFCET"
      }),
      hints: JSON.stringify([
        "La etapa inicial siempre está representada por un doble cuadrado",
        "Las transiciones son condiciones para pasar de una etapa a otra",
        "Las acciones están asociadas a las etapas, no a las transiciones"
      ])
    },
    "GRAFCET séquentiel simple": {
      title: "GRAFCET secuencial simple",
      description: "Complete un GRAFCET para una secuencia de arranque de máquina",
      instructions: JSON.stringify({
        steps: [
          "Etapa 0: Estado inicial - Máquina parada",
          "Transición 1: Botón de inicio (I0.0)",
          "Etapa 1: Precalentamiento del motor (Q0.0) durante 5 segundos",
          "Transición 2: Temporización transcurrida",
          "Etapa 2: Máquina en marcha (Q0.1)"
        ],
        objective: "Crear un GRAFCET lineal de 3 etapas"
      }),
      hints: JSON.stringify([
        "Siempre comience con una etapa inicial (doble cuadrado)",
        "Cada transición requiere una condición",
        "Las acciones están asociadas a las etapas, no a las transiciones"
      ])
    },
    "Types de divergences": {
      title: "Tipos de divergencias",
      description: "Identifique los tipos de divergencias GRAFCET",
      instructions: JSON.stringify({
        steps: [
          "Analice cada tipo de divergencia",
          "Coloque cada característica en la categoría correcta",
          "Verifique sus colocaciones"
        ],
        objective: "Distinguir divergencia en O y divergencia en Y"
      }),
      hints: JSON.stringify([
        "Una divergencia en O usa una simple barra horizontal",
        "Una divergencia en Y usa una doble barra horizontal",
        "O = elección exclusiva, Y = paralelismo"
      ])
    },
    "Ordre des étapes GRAFCET": {
      title: "Orden de las etapas GRAFCET",
      description: "Ordene las etapas de un ciclo automático",
      instructions: JSON.stringify({
        steps: [
          "Analice el ciclo de un cilindro neumático",
          "Ordene las etapas lógicamente",
          "El ciclo comienza con la espera"
        ],
        objective: "Ordenar las etapas del ciclo del cilindro"
      }),
      hints: JSON.stringify([
        "La última transición vuelve a la etapa inicial",
        "El ciclo puede ser continuo o activado por botón",
        "Use los finales de carrera para las transiciones"
      ])
    },
    "GRAFCET avec divergence en ET": {
      title: "GRAFCET con divergencia en Y",
      description: "Complete un GRAFCET con acciones simultáneas",
      instructions: JSON.stringify({
        steps: [
          "Etapa 0: Esperando inicio",
          "Transición: Botón de inicio (I0.0)",
          "Divergencia Y: 2 ramas simultáneas",
          "Rama 1: Etapa 1A → Sujeción de pieza (Q0.0)",
          "Rama 2: Etapa 1B → Rotación del husillo (Q0.1)",
          "Convergencia Y cuando ambas acciones están completas"
        ],
        objective: "Implementar una divergencia en Y (simultaneidad)"
      }),
      hints: JSON.stringify([
        "Una divergencia en Y usa una doble barra horizontal",
        "Ambas ramas se ejecutan simultáneamente",
        "La convergencia en Y espera que todas las ramas estén listas"
      ])
    }
  }
}
