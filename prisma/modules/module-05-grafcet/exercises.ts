import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module05Exercises: ExerciseData[] = [
  {
    title: "GRAFCET séquentiel simple",
    description: "Créez un GRAFCET pour une séquence de démarrage machine",
    type: "grafcet",
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
    solution: JSON.stringify({
      steps: [
        { id: 0, initial: true, actions: [] },
        { id: 1, actions: [{ output: "Q0.0", condition: null }] },
        { id: 2, actions: [{ output: "Q0.1", condition: null }] }
      ],
      transitions: [
        { from: 0, to: 1, condition: "I0.0" },
        { from: 1, to: 2, condition: "T1/5s" }
      ]
    }),
    hints: JSON.stringify([
      "Commencez toujours par une étape initiale (double carré)",
      "Chaque transition nécessite une condition",
      "Les actions sont associées aux étapes, pas aux transitions"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "GRAFCET avec divergence en OU",
    description: "Créez un GRAFCET avec un choix entre deux séquences",
    type: "grafcet",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Étape 0: Attente pièce",
        "Détection pièce (I0.0) → choix selon type",
        "Si pièce type A (I0.1): Étape 1A → usinage court",
        "Si pièce type B (I0.2): Étape 1B → usinage long",
        "Convergence vers Étape 2: Évacuation"
      ],
      objective: "Implémenter une divergence en OU (choix exclusif)"
    }),
    solution: JSON.stringify({
      steps: [
        { id: 0, initial: true, actions: [] },
        { id: "1A", actions: [{ output: "Q0.0", condition: null }] },
        { id: "1B", actions: [{ output: "Q0.1", condition: null }] },
        { id: 2, actions: [{ output: "Q0.2", condition: null }] }
      ],
      transitions: [
        { from: 0, to: "1A", condition: "I0.0 AND I0.1" },
        { from: 0, to: "1B", condition: "I0.0 AND I0.2" },
        { from: "1A", to: 2, condition: "T1/3s" },
        { from: "1B", to: 2, condition: "T2/8s" }
      ],
      divergence: { type: "OR", from: 0 },
      convergence: { type: "OR", to: 2 }
    }),
    hints: JSON.stringify([
      "Une divergence en OU utilise une simple barre horizontale",
      "Les conditions de transition doivent être exclusives",
      "La convergence en OU rassemble les branches"
    ]),
    xpReward: 175,
    order: 2
  },
  {
    title: "GRAFCET avec divergence en ET",
    description: "Créez un GRAFCET avec des actions simultanées",
    type: "grafcet",
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
    solution: JSON.stringify({
      steps: [
        { id: 0, initial: true, actions: [] },
        { id: "1A", actions: [{ output: "Q0.0", condition: null }] },
        { id: "1B", actions: [{ output: "Q0.1", condition: null }] },
        { id: 2, actions: [{ output: "Q0.2", condition: null }] }
      ],
      transitions: [
        { from: 0, to: ["1A", "1B"], condition: "I0.0" },
        { from: ["1A", "1B"], to: 2, condition: "I0.1 AND I0.2" }
      ],
      divergence: { type: "AND", from: 0 },
      convergence: { type: "AND", to: 2 }
    }),
    hints: JSON.stringify([
      "Une divergence en ET utilise une double barre horizontale",
      "Les deux branches s'exécutent simultanément",
      "La convergence en ET attend que toutes les branches soient prêtes"
    ]),
    xpReward: 225,
    order: 3
  },
  {
    title: "GRAFCET cyclique",
    description: "Créez un GRAFCET qui boucle automatiquement",
    type: "grafcet",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Étape 0: Attente (état initial)",
        "Bouton départ → Étape 1: Avance vérin",
        "Fin de course avant → Étape 2: Temporisation 2s",
        "Temporisation → Étape 3: Recul vérin",
        "Fin de course arrière → Retour à Étape 0"
      ],
      objective: "Créer un cycle complet avec retour automatique"
    }),
    solution: JSON.stringify({
      steps: [
        { id: 0, initial: true, actions: [] },
        { id: 1, actions: [{ output: "Q0.0", condition: null }] },
        { id: 2, actions: [] },
        { id: 3, actions: [{ output: "Q0.1", condition: null }] }
      ],
      transitions: [
        { from: 0, to: 1, condition: "I0.0" },
        { from: 1, to: 2, condition: "I0.1" },
        { from: 2, to: 3, condition: "T1/2s" },
        { from: 3, to: 0, condition: "I0.2" }
      ]
    }),
    hints: JSON.stringify([
      "La dernière transition revient à l'étape initiale",
      "Le cycle peut être continu ou déclenché par bouton",
      "Utilisez les fins de course pour les transitions"
    ]),
    xpReward: 150,
    order: 4
  }
]

export const module05ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "GRAFCET séquentiel simple": {
      title: "Simple Sequential GRAFCET",
      description: "Create a GRAFCET for a machine startup sequence",
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
    "GRAFCET avec divergence en OU": {
      title: "GRAFCET with OR Divergence",
      description: "Create a GRAFCET with a choice between two sequences",
      instructions: JSON.stringify({
        steps: [
          "Step 0: Waiting for part",
          "Part detection (I0.0) → choice based on type",
          "If type A part (I0.1): Step 1A → short machining",
          "If type B part (I0.2): Step 1B → long machining",
          "Convergence to Step 2: Evacuation"
        ],
        objective: "Implement an OR divergence (exclusive choice)"
      }),
      hints: JSON.stringify([
        "An OR divergence uses a simple horizontal bar",
        "Transition conditions must be exclusive",
        "The OR convergence brings branches together"
      ])
    },
    "GRAFCET avec divergence en ET": {
      title: "GRAFCET with AND Divergence",
      description: "Create a GRAFCET with simultaneous actions",
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
    },
    "GRAFCET cyclique": {
      title: "Cyclic GRAFCET",
      description: "Create a GRAFCET that loops automatically",
      instructions: JSON.stringify({
        steps: [
          "Step 0: Waiting (initial state)",
          "Start button → Step 1: Cylinder extend",
          "Front limit switch → Step 2: 2s timer",
          "Timer → Step 3: Cylinder retract",
          "Rear limit switch → Return to Step 0"
        ],
        objective: "Create a complete cycle with automatic return"
      }),
      hints: JSON.stringify([
        "The last transition returns to the initial step",
        "The cycle can be continuous or button-triggered",
        "Use limit switches for transitions"
      ])
    }
  },
  es: {
    "GRAFCET séquentiel simple": {
      title: "GRAFCET secuencial simple",
      description: "Cree un GRAFCET para una secuencia de arranque de máquina",
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
    "GRAFCET avec divergence en OU": {
      title: "GRAFCET con divergencia en O",
      description: "Cree un GRAFCET con una elección entre dos secuencias",
      instructions: JSON.stringify({
        steps: [
          "Etapa 0: Esperando pieza",
          "Detección de pieza (I0.0) → elección según tipo",
          "Si pieza tipo A (I0.1): Etapa 1A → mecanizado corto",
          "Si pieza tipo B (I0.2): Etapa 1B → mecanizado largo",
          "Convergencia hacia Etapa 2: Evacuación"
        ],
        objective: "Implementar una divergencia en O (elección exclusiva)"
      }),
      hints: JSON.stringify([
        "Una divergencia en O usa una simple barra horizontal",
        "Las condiciones de transición deben ser exclusivas",
        "La convergencia en O reúne las ramas"
      ])
    },
    "GRAFCET avec divergence en ET": {
      title: "GRAFCET con divergencia en Y",
      description: "Cree un GRAFCET con acciones simultáneas",
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
    },
    "GRAFCET cyclique": {
      title: "GRAFCET cíclico",
      description: "Cree un GRAFCET que se repita automáticamente",
      instructions: JSON.stringify({
        steps: [
          "Etapa 0: Espera (estado inicial)",
          "Botón de inicio → Etapa 1: Avance del cilindro",
          "Final de carrera delantero → Etapa 2: Temporización 2s",
          "Temporización → Etapa 3: Retroceso del cilindro",
          "Final de carrera trasero → Retorno a Etapa 0"
        ],
        objective: "Crear un ciclo completo con retorno automático"
      }),
      hints: JSON.stringify([
        "La última transición vuelve a la etapa inicial",
        "El ciclo puede ser continuo o activado por botón",
        "Use los finales de carrera para las transiciones"
      ])
    }
  }
}
