import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module03Exercises: ExerciseData[] = [
  {
    title: "Circuit Marche/Arrêt",
    description: "Créez un circuit LADDER pour un bouton marche/arrêt avec auto-maintien",
    type: "ladder_builder",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Utilisez I0.0 comme bouton Marche (NO)",
        "Utilisez I0.1 comme bouton Arrêt (NC)",
        "La sortie Q0.0 doit rester activée après relâchement du bouton Marche",
        "Le bouton Arrêt doit couper la sortie"
      ],
      objective: "Créer un circuit d'auto-maintien fonctionnel"
    }),
    config: JSON.stringify({
      availableElements: [
        { type: "contact_no", label: "Contact NO" },
        { type: "contact_nc", label: "Contact NC" },
        { type: "coil", label: "Bobine" }
      ],
      inputs: [
        { address: "I0.0", label: "Bouton Marche" },
        { address: "I0.1", label: "Bouton Arrêt" }
      ],
      outputs: [
        { address: "Q0.0", label: "Moteur" }
      ],
      gridSize: { rows: 3, cols: 6 },
      objectives: [
        { id: "obj1", description: "Le moteur démarre quand on appuie sur Marche", test: "I0.0=1 -> Q0.0=1" },
        { id: "obj2", description: "Le moteur reste en marche après relâchement", test: "I0.0=0 -> Q0.0=1" },
        { id: "obj3", description: "Le moteur s'arrête avec le bouton Arrêt", test: "I0.1=0 -> Q0.0=0" }
      ]
    }),
    initialCode: JSON.stringify({
      rungs: [
        { contacts: [], coil: null }
      ]
    }),
    solution: JSON.stringify({
      rungs: [
        {
          contacts: [
            { type: "NO", address: "I0.0", parallel: [{ type: "NO", address: "Q0.0" }] },
            { type: "NC", address: "I0.1" }
          ],
          coil: { type: "OUT", address: "Q0.0" }
        }
      ],
      objectiveChecks: ["obj1", "obj2", "obj3"]
    }),
    hints: JSON.stringify([
      "L'auto-maintien utilise un contact NO de la sortie en parallèle avec le bouton Marche",
      "Le bouton Arrêt doit être en série et normalement fermé (NC)"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "Éléments LADDER - Associations",
    description: "Associez chaque élément LADDER à sa fonction",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez chaque symbole LADDER",
        "Associez chaque élément à sa description",
        "Vérifiez vos associations"
      ],
      objective: "Associer correctement les éléments LADDER"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "no", text: "Contact NO (--| |--)" },
        { id: "nc", text: "Contact NC (--|/|--)" },
        { id: "coil", text: "Bobine (--( )--)" },
        { id: "set", text: "Bobine SET (--(S)--)" }
      ],
      rightItems: [
        { id: "passant", text: "Passant si l'entrée est à 1" },
        { id: "bloquant", text: "Passant si l'entrée est à 0" },
        { id: "sortie", text: "Active la sortie si alimentation" },
        { id: "memoire", text: "Mémorise l'état activé" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["no", "passant"],
        ["nc", "bloquant"],
        ["coil", "sortie"],
        ["set", "memoire"]
      ]
    }),
    hints: JSON.stringify([
      "NO = Normalement Ouvert, laisse passer quand activé",
      "NC = Normalement Fermé, laisse passer quand désactivé",
      "SET mémorise l'état, RESET l'efface"
    ]),
    xpReward: 75,
    order: 2
  },
  {
    title: "Temporisation TON",
    description: "Complétez les paramètres d'une temporisation à l'enclenchement",
    type: "fill_blank",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Quand I0.0 est activé, Q0.0 doit s'allumer après 5 secondes",
        "Utilisez un temporisateur TON (Timer ON Delay)",
        "La sortie doit s'éteindre immédiatement quand I0.0 est désactivé"
      ],
      objective: "Implémenter une temporisation à l'enclenchement de 5 secondes"
    }),
    config: JSON.stringify({
      text: "Configuration du temporisateur TON:\n\nType de timer: {{blank1}} (TON/TOF/TP)\nEntrée: {{blank2}}\nPréréglage (PT): {{blank3}} ms\nSortie timer: {{blank4}}.Q\n\nComportement:\n- Quand IN passe à 1, le timer {{blank5}}\n- Quand ET = PT, la sortie Q passe à {{blank6}}\n- Quand IN passe à 0, la sortie Q passe {{blank7}} à 0",
      blanks: [
        { id: "blank1", placeholder: "type" },
        { id: "blank2", placeholder: "adresse" },
        { id: "blank3", placeholder: "valeur ms" },
        { id: "blank4", placeholder: "nom" },
        { id: "blank5", placeholder: "action" },
        { id: "blank6", placeholder: "valeur" },
        { id: "blank7", placeholder: "moment" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "TON",
        blank2: "I0.0",
        blank3: "5000",
        blank4: "T1",
        blank5: "démarre|commence",
        blank6: "1",
        blank7: "immédiatement"
      }
    }),
    hints: JSON.stringify([
      "Le temporisateur TON active sa sortie après le délai configuré",
      "La sortie du timer reste active tant que l'entrée est maintenue",
      "5 secondes = 5000 millisecondes"
    ]),
    xpReward: 150,
    order: 3
  },
  {
    title: "Ordre des éléments LADDER",
    description: "Remettez dans l'ordre les étapes de création d'un programme LADDER",
    type: "ordering",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Lisez chaque étape de conception",
        "Remettez-les dans l'ordre logique",
        "La première étape est l'analyse du cahier des charges"
      ],
      objective: "Ordonner les étapes de création d'un programme LADDER"
    }),
    config: JSON.stringify({
      items: [
        { id: "step1", text: "Analyser le cahier des charges" },
        { id: "step2", text: "Identifier les entrées/sorties" },
        { id: "step3", text: "Dessiner le schéma électrique équivalent" },
        { id: "step4", text: "Convertir en langage LADDER" },
        { id: "step5", text: "Tester et valider le programme" }
      ]
    }),
    solution: JSON.stringify({
      correctOrder: ["step1", "step2", "step3", "step4", "step5"]
    }),
    hints: JSON.stringify([
      "On commence toujours par comprendre le besoin",
      "Le schéma électrique aide à visualiser la logique",
      "Le test est la dernière étape"
    ]),
    xpReward: 75,
    order: 4
  },
  {
    title: "Compteur de pièces",
    description: "Créez un programme pour compter des pièces et activer une sortie tous les 10 pièces",
    type: "ladder_builder",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Le capteur sur I0.0 détecte chaque pièce",
        "Comptez les pièces avec un compteur CTU",
        "Quand 10 pièces sont comptées, activez Q0.0",
        "I0.1 remet le compteur à zéro"
      ],
      objective: "Implémenter un compteur de lots de 10 pièces"
    }),
    config: JSON.stringify({
      availableElements: [
        { type: "contact_no", label: "Contact NO" },
        { type: "contact_nc", label: "Contact NC" },
        { type: "coil", label: "Bobine" },
        { type: "counter_ctu", label: "Compteur CTU" },
        { type: "reset", label: "Reset" }
      ],
      inputs: [
        { address: "I0.0", label: "Capteur pièce" },
        { address: "I0.1", label: "Reset" }
      ],
      outputs: [
        { address: "Q0.0", label: "Lot complet" }
      ],
      counters: [
        { address: "C1", label: "Compteur", preset: 10 }
      ],
      gridSize: { rows: 4, cols: 6 },
      objectives: [
        { id: "obj1", description: "Le compteur s'incrémente à chaque pièce", test: "count" },
        { id: "obj2", description: "Q0.0 s'active à 10 pièces", test: "C1=10 -> Q0.0=1" },
        { id: "obj3", description: "I0.1 remet le compteur à zéro", test: "I0.1=1 -> C1=0" }
      ]
    }),
    solution: JSON.stringify({
      rungs: [
        {
          contacts: [{ type: "NO", address: "I0.0" }],
          coil: { type: "CTU", address: "C1", preset: 10 }
        },
        {
          contacts: [{ type: "NO", address: "I0.1" }],
          coil: { type: "RES", address: "C1" }
        },
        {
          contacts: [{ type: "NO", address: "C1.Q" }],
          coil: { type: "OUT", address: "Q0.0" }
        }
      ],
      objectiveChecks: ["obj1", "obj2", "obj3"]
    }),
    hints: JSON.stringify([
      "CTU = Counter Up (comptage croissant)",
      "Le bit C1.Q devient 1 quand la valeur atteint le preset",
      "RES réinitialise le compteur à 0"
    ]),
    xpReward: 200,
    order: 5
  }
]

export const module03ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Circuit Marche/Arrêt": {
      title: "Start/Stop Circuit",
      description: "Create a LADDER circuit for a start/stop button with self-holding",
      instructions: JSON.stringify({
        steps: [
          "Use I0.0 as Start button (NO)",
          "Use I0.1 as Stop button (NC)",
          "Output Q0.0 must stay activated after releasing Start button",
          "Stop button must turn off the output"
        ],
        objective: "Create a working self-holding circuit"
      }),
      hints: JSON.stringify([
        "Self-holding uses a NO contact of the output in parallel with the Start button",
        "The Stop button must be in series and normally closed (NC)"
      ])
    },
    "Éléments LADDER - Associations": {
      title: "LADDER Elements - Matching",
      description: "Match each LADDER element to its function",
      instructions: JSON.stringify({
        steps: [
          "Identify each LADDER symbol",
          "Match each element to its description",
          "Verify your matches"
        ],
        objective: "Correctly match LADDER elements"
      }),
      hints: JSON.stringify([
        "NO = Normally Open, passes when activated",
        "NC = Normally Closed, passes when deactivated",
        "SET memorizes the state, RESET clears it"
      ])
    },
    "Temporisation TON": {
      title: "TON Timer",
      description: "Complete the parameters for an on-delay timer",
      instructions: JSON.stringify({
        steps: [
          "When I0.0 is activated, Q0.0 must turn on after 5 seconds",
          "Use a TON timer (Timer ON Delay)",
          "The output must turn off immediately when I0.0 is deactivated"
        ],
        objective: "Implement a 5-second on-delay timer"
      }),
      hints: JSON.stringify([
        "The TON timer activates its output after the configured delay",
        "The timer output stays active as long as the input is maintained",
        "5 seconds = 5000 milliseconds"
      ])
    },
    "Ordre des éléments LADDER": {
      title: "LADDER Elements Order",
      description: "Put the LADDER program creation steps in order",
      instructions: JSON.stringify({
        steps: [
          "Read each design step",
          "Put them in logical order",
          "The first step is requirements analysis"
        ],
        objective: "Order the LADDER program creation steps"
      }),
      hints: JSON.stringify([
        "Always start by understanding the requirements",
        "The electrical diagram helps visualize the logic",
        "Testing is the last step"
      ])
    },
    "Compteur de pièces": {
      title: "Part Counter",
      description: "Create a program to count parts and activate an output every 10 parts",
      instructions: JSON.stringify({
        steps: [
          "The sensor on I0.0 detects each part",
          "Count parts with a CTU counter",
          "When 10 parts are counted, activate Q0.0",
          "I0.1 resets the counter to zero"
        ],
        objective: "Implement a batch counter for 10 parts"
      }),
      hints: JSON.stringify([
        "CTU = Counter Up (counting up)",
        "The C1.Q bit becomes 1 when the value reaches the preset",
        "RES resets the counter to 0"
      ])
    }
  },
  es: {
    "Circuit Marche/Arrêt": {
      title: "Circuito Marcha/Paro",
      description: "Cree un circuito LADDER para un botón marcha/paro con auto-retención",
      instructions: JSON.stringify({
        steps: [
          "Use I0.0 como botón de Marcha (NO)",
          "Use I0.1 como botón de Paro (NC)",
          "La salida Q0.0 debe permanecer activada después de soltar el botón Marcha",
          "El botón de Paro debe apagar la salida"
        ],
        objective: "Crear un circuito de auto-retención funcional"
      }),
      hints: JSON.stringify([
        "La auto-retención usa un contacto NO de la salida en paralelo con el botón Marcha",
        "El botón de Paro debe estar en serie y normalmente cerrado (NC)"
      ])
    },
    "Éléments LADDER - Associations": {
      title: "Elementos LADDER - Asociaciones",
      description: "Asocie cada elemento LADDER a su función",
      instructions: JSON.stringify({
        steps: [
          "Identifique cada símbolo LADDER",
          "Asocie cada elemento a su descripción",
          "Verifique sus asociaciones"
        ],
        objective: "Asociar correctamente los elementos LADDER"
      }),
      hints: JSON.stringify([
        "NO = Normalmente Abierto, pasa cuando está activado",
        "NC = Normalmente Cerrado, pasa cuando está desactivado",
        "SET memoriza el estado, RESET lo borra"
      ])
    },
    "Temporisation TON": {
      title: "Temporizador TON",
      description: "Complete los parámetros de un temporizador de retardo",
      instructions: JSON.stringify({
        steps: [
          "Cuando I0.0 esté activado, Q0.0 debe encenderse después de 5 segundos",
          "Use un temporizador TON (Timer ON Delay)",
          "La salida debe apagarse inmediatamente cuando I0.0 se desactive"
        ],
        objective: "Implementar un temporizador de retardo de 5 segundos"
      }),
      hints: JSON.stringify([
        "El temporizador TON activa su salida después del retardo configurado",
        "La salida del temporizador permanece activa mientras la entrada se mantenga",
        "5 segundos = 5000 milisegundos"
      ])
    },
    "Ordre des éléments LADDER": {
      title: "Orden de los elementos LADDER",
      description: "Ordene los pasos de creación de un programa LADDER",
      instructions: JSON.stringify({
        steps: [
          "Lea cada paso de diseño",
          "Póngalos en orden lógico",
          "El primer paso es el análisis de requisitos"
        ],
        objective: "Ordenar los pasos de creación de un programa LADDER"
      }),
      hints: JSON.stringify([
        "Siempre comience por entender los requisitos",
        "El esquema eléctrico ayuda a visualizar la lógica",
        "La prueba es el último paso"
      ])
    },
    "Compteur de pièces": {
      title: "Contador de piezas",
      description: "Cree un programa para contar piezas y activar una salida cada 10 piezas",
      instructions: JSON.stringify({
        steps: [
          "El sensor en I0.0 detecta cada pieza",
          "Cuente las piezas con un contador CTU",
          "Cuando se cuenten 10 piezas, active Q0.0",
          "I0.1 reinicia el contador a cero"
        ],
        objective: "Implementar un contador de lotes de 10 piezas"
      }),
      hints: JSON.stringify([
        "CTU = Counter Up (conteo ascendente)",
        "El bit C1.Q se pone en 1 cuando el valor alcanza el preset",
        "RES reinicia el contador a 0"
      ])
    }
  }
}
