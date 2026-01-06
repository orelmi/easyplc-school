import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module10Exercises: ExerciseData[] = [
  {
    title: "Création projet TIA Portal",
    description: "Créez et configurez un nouveau projet TIA Portal",
    type: "ordering",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Créez un nouveau projet",
        "Ajoutez un CPU S7-1500",
        "Configurez les propriétés réseau",
        "Ajoutez un module d'entrées/sorties"
      ],
      objective: "Configurer un projet TIA Portal de base"
    }),
    config: JSON.stringify({
      items: [
        { id: "step1", text: "Créer un nouveau projet (Fichier → Nouveau)" },
        { id: "step2", text: "Ajouter un appareil (CPU S7-1500)" },
        { id: "step3", text: "Configurer l'adresse IP du CPU" },
        { id: "step4", text: "Ajouter les modules E/S nécessaires" },
        { id: "step5", text: "Compiler le matériel et le programme" },
        { id: "step6", text: "Charger dans le CPU" }
      ]
    }),
    solution: JSON.stringify({
      correctOrder: ["step1", "step2", "step3", "step4", "step5", "step6"]
    }),
    hints: JSON.stringify([
      "Utilisez la vue du portail pour commencer",
      "La configuration réseau est dans les propriétés du CPU",
      "Compilez régulièrement pour détecter les erreurs"
    ]),
    xpReward: 100,
    order: 1
  },
  {
    title: "Blocs TIA Portal",
    description: "Associez chaque type de bloc à sa fonction",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les différents types de blocs",
        "Associez chaque bloc à sa fonction",
        "Comprenez quand utiliser chaque type"
      ],
      objective: "Comprendre les types de blocs TIA Portal"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "ob", text: "OB (Organisation Block)" },
        { id: "fc", text: "FC (Function)" },
        { id: "fb", text: "FB (Function Block)" },
        { id: "db", text: "DB (Data Block)" }
      ],
      rightItems: [
        { id: "cycle", text: "Exécuté cycliquement par le système" },
        { id: "function", text: "Fonction sans mémoire propre" },
        { id: "memory", text: "Fonction avec mémoire (DB instance)" },
        { id: "data", text: "Stockage de données globales" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["ob", "cycle"],
        ["fc", "function"],
        ["fb", "memory"],
        ["db", "data"]
      ]
    }),
    hints: JSON.stringify([
      "OB1 est le bloc principal exécuté en boucle",
      "FC pour les fonctions sans mémoire",
      "FB pour les fonctions avec mémoire (DB instance)"
    ]),
    xpReward: 75,
    order: 2
  },
  {
    title: "Programme LADDER TIA",
    description: "Créez un programme LADDER dans TIA Portal",
    type: "ladder_builder",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Créez un bloc FC (fonction)",
        "Programmez un circuit marche/arrêt",
        "Utilisez les tags symboliques",
        "Testez avec la simulation"
      ],
      objective: "Programmer en LADDER dans TIA Portal"
    }),
    config: JSON.stringify({
      availableElements: [
        { type: "contact_no", label: "Contact NO" },
        { type: "contact_nc", label: "Contact NC" },
        { type: "coil", label: "Bobine" },
        { type: "set", label: "SET" },
        { type: "reset", label: "RESET" }
      ],
      inputs: [
        { address: "Start", label: "Bouton Démarrer" },
        { address: "Stop", label: "Bouton Arrêt" }
      ],
      outputs: [
        { address: "Motor", label: "Moteur" }
      ],
      gridSize: { rows: 2, cols: 6 },
      objectives: [
        { id: "obj1", description: "Le moteur démarre avec Start", test: "Start=1 -> Motor=1" },
        { id: "obj2", description: "Le moteur reste en marche (auto-maintien)", test: "Start=0 -> Motor=1" },
        { id: "obj3", description: "Stop arrête le moteur", test: "Stop=1 -> Motor=0" }
      ]
    }),
    solution: JSON.stringify({
      program: {
        network1: "Start OR Motor AND NOT Stop -> Motor"
      },
      objectiveChecks: ["obj1", "obj2", "obj3"]
    }),
    hints: JSON.stringify([
      "Utilisez des noms de tags explicites",
      "FC pour les fonctions sans mémoire",
      "FB pour les fonctions avec mémoire (DB instance)"
    ]),
    xpReward: 150,
    order: 3
  }
]

export const module10ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Création projet TIA Portal": {
      title: "TIA Portal Project Creation",
      description: "Create and configure a new TIA Portal project",
      instructions: JSON.stringify({
        steps: [
          "Create a new project",
          "Add an S7-1500 CPU",
          "Configure network properties",
          "Add an I/O module"
        ],
        objective: "Configure a basic TIA Portal project"
      }),
      hints: JSON.stringify([
        "Use portal view to start",
        "Network config is in CPU properties",
        "Compile regularly to detect errors"
      ])
    },
    "Blocs TIA Portal": {
      title: "TIA Portal Blocks",
      description: "Match each block type to its function",
      instructions: JSON.stringify({
        steps: [
          "Identify the different block types",
          "Match each block to its function",
          "Understand when to use each type"
        ],
        objective: "Understand TIA Portal block types"
      }),
      hints: JSON.stringify([
        "OB1 is the main block executed in a loop",
        "FC for functions without memory",
        "FB for functions with memory (instance DB)"
      ])
    },
    "Programme LADDER TIA": {
      title: "TIA LADDER Program",
      description: "Create a LADDER program in TIA Portal",
      instructions: JSON.stringify({
        steps: [
          "Create an FC block (function)",
          "Program a start/stop circuit",
          "Use symbolic tags",
          "Test with simulation"
        ],
        objective: "Program in LADDER in TIA Portal"
      }),
      hints: JSON.stringify([
        "Use explicit tag names",
        "FC for functions without memory",
        "FB for functions with memory (instance DB)"
      ])
    }
  },
  es: {
    "Création projet TIA Portal": {
      title: "Creación proyecto TIA Portal",
      description: "Cree y configure un nuevo proyecto TIA Portal",
      instructions: JSON.stringify({
        steps: [
          "Cree un nuevo proyecto",
          "Añada un CPU S7-1500",
          "Configure las propiedades de red",
          "Añada un módulo de E/S"
        ],
        objective: "Configurar un proyecto TIA Portal básico"
      }),
      hints: JSON.stringify([
        "Use la vista del portal para comenzar",
        "La configuración de red está en las propiedades del CPU",
        "Compile regularmente para detectar errores"
      ])
    },
    "Blocs TIA Portal": {
      title: "Bloques TIA Portal",
      description: "Asocie cada tipo de bloque a su función",
      instructions: JSON.stringify({
        steps: [
          "Identifique los diferentes tipos de bloques",
          "Asocie cada bloque a su función",
          "Comprenda cuándo usar cada tipo"
        ],
        objective: "Comprender los tipos de bloques TIA Portal"
      }),
      hints: JSON.stringify([
        "OB1 es el bloque principal ejecutado en bucle",
        "FC para funciones sin memoria",
        "FB para funciones con memoria (DB de instancia)"
      ])
    },
    "Programme LADDER TIA": {
      title: "Programa LADDER TIA",
      description: "Cree un programa LADDER en TIA Portal",
      instructions: JSON.stringify({
        steps: [
          "Cree un bloque FC (función)",
          "Programe un circuito marcha/paro",
          "Use tags simbólicos",
          "Pruebe con la simulación"
        ],
        objective: "Programar en LADDER en TIA Portal"
      }),
      hints: JSON.stringify([
        "Use nombres de tags explícitos",
        "FC para funciones sin memoria",
        "FB para funciones con memoria (DB de instancia)"
      ])
    }
  }
}
