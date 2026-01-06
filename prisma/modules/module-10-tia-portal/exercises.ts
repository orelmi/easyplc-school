import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module10Exercises: ExerciseData[] = [
  {
    title: "Création projet TIA Portal",
    description: "Créez et configurez un nouveau projet TIA Portal",
    type: "plc_config",
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
    solution: JSON.stringify({
      steps: ["Nouveau projet", "Ajouter appareil", "Configurer IP", "Compiler"]
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
    title: "Programme LADDER TIA",
    description: "Créez un programme LADDER dans TIA Portal",
    type: "ladder",
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
    solution: JSON.stringify({
      program: {
        network1: "Start OR Motor AND NOT Stop -> Motor"
      }
    }),
    hints: JSON.stringify([
      "Utilisez des noms de tags explicites",
      "FC pour les fonctions sans mémoire",
      "FB pour les fonctions avec mémoire (DB instance)"
    ]),
    xpReward: 150,
    order: 2
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
