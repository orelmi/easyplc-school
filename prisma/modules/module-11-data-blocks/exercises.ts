import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module11Exercises: ExerciseData[] = [
  {
    title: "Types de DB Siemens",
    description: "Associez chaque type de DB à sa caractéristique",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les différents types de DB",
        "Associez chaque type à sa caractéristique",
        "Comprenez quand utiliser chaque type"
      ],
      objective: "Comprendre les types de blocs de données"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "global", text: "DB Global" },
        { id: "instance", text: "DB d'Instance" },
        { id: "array", text: "DB Array" },
        { id: "optimized", text: "DB Optimisé" }
      ],
      rightItems: [
        { id: "everywhere", text: "Accessible depuis tous les blocs" },
        { id: "fb", text: "Associé à un appel de FB" },
        { id: "table", text: "Stockage de données répétitives" },
        { id: "efficient", text: "Accès mémoire optimisé par le système" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["global", "everywhere"],
        ["instance", "fb"],
        ["array", "table"],
        ["optimized", "efficient"]
      ]
    }),
    hints: JSON.stringify([
      "Les DB globaux sont accessibles partout",
      "Chaque appel de FB nécessite un DB d'instance",
      "Les DB optimisés améliorent les performances"
    ]),
    xpReward: 75,
    order: 1
  },
  {
    title: "Création d'un DB global",
    description: "Créez un bloc de données global pour stocker des paramètres",
    type: "fill_blank",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Créez un nouveau DB global",
        "Ajoutez des variables de différents types",
        "Définissez des valeurs par défaut",
        "Accédez aux données depuis un FC"
      ],
      objective: "Maîtriser les blocs de données globaux"
    }),
    config: JSON.stringify({
      text: "Structure d'un DB Global:\n\nDB{{blank1}} \"Parametres\"\n\nVARIABLE          TYPE        VALEUR_DEFAUT\nTemperature_Max   {{blank2}}     80.0\nAlarm_Active      {{blank3}}     false\nCycle_Count       {{blank4}}     0\nMessage           {{blank5}}     ''\n\nPour accéder à Temperature_Max depuis un FC:\n\"{{blank6}}\".Temperature_Max\n\nOu en adresse absolue:\nDB{{blank1}}.DBD{{blank7}}",
      blanks: [
        { id: "blank1", placeholder: "numéro" },
        { id: "blank2", placeholder: "type" },
        { id: "blank3", placeholder: "type" },
        { id: "blank4", placeholder: "type" },
        { id: "blank5", placeholder: "type" },
        { id: "blank6", placeholder: "nom DB" },
        { id: "blank7", placeholder: "offset" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "1|10",
        blank2: "Real",
        blank3: "Bool",
        blank4: "DInt|Int",
        blank5: "String",
        blank6: "Parametres",
        blank7: "0"
      }
    }),
    hints: JSON.stringify([
      "Les DB globaux sont accessibles partout",
      "Utilisez des noms explicites",
      "Définissez toujours une valeur par défaut"
    ]),
    xpReward: 125,
    order: 2
  },
  {
    title: "DB d'instance FB",
    description: "Comprenez la relation entre FB et DB d'instance",
    type: "drag_drop",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Créez un FB avec des paramètres IN, OUT, INOUT",
        "Ajoutez des variables STAT pour mémoriser l'état",
        "Appelez le FB avec un DB d'instance",
        "Réutilisez le FB avec différentes instances"
      ],
      objective: "Comprendre les FB et leurs instances"
    }),
    config: JSON.stringify({
      items: [
        { id: "in", text: "Paramètres d'entrée (lecture seule)" },
        { id: "out", text: "Paramètres de sortie (écriture)" },
        { id: "inout", text: "Paramètres lecture/écriture" },
        { id: "stat", text: "Variables mémorisées entre appels" },
        { id: "temp", text: "Variables temporaires (non mémorisées)" }
      ],
      zones: [
        { id: "input", label: "Section IN" },
        { id: "output", label: "Section OUT" },
        { id: "bidir", label: "Section IN_OUT" },
        { id: "static", label: "Section STAT" },
        { id: "temporary", label: "Section TEMP" }
      ]
    }),
    solution: JSON.stringify({
      placements: {
        input: ["in"],
        output: ["out"],
        bidir: ["inout"],
        static: ["stat"],
        temporary: ["temp"]
      }
    }),
    hints: JSON.stringify([
      "Chaque appel de FB nécessite un DB d'instance unique",
      "Les variables STAT conservent leur valeur entre les appels",
      "IN/OUT permet de lire et modifier la même variable"
    ]),
    xpReward: 200,
    order: 3
  }
]

export const module11ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Types de DB Siemens": {
      title: "Siemens DB Types",
      description: "Match each DB type to its characteristic",
      instructions: JSON.stringify({
        steps: [
          "Identify the different DB types",
          "Match each type to its characteristic",
          "Understand when to use each type"
        ],
        objective: "Understand data block types"
      }),
      hints: JSON.stringify([
        "Global DBs are accessible everywhere",
        "Each FB call requires an instance DB",
        "Optimized DBs improve performance"
      ])
    },
    "Création d'un DB global": {
      title: "Creating a Global DB",
      description: "Create a global data block to store parameters",
      instructions: JSON.stringify({
        steps: [
          "Create a new global DB",
          "Add variables of different types",
          "Define default values",
          "Access data from an FC"
        ],
        objective: "Master global data blocks"
      }),
      hints: JSON.stringify([
        "Global DBs are accessible everywhere",
        "Use explicit names",
        "Always define a default value"
      ])
    },
    "DB d'instance FB": {
      title: "FB Instance DB",
      description: "Understand the relationship between FB and instance DB",
      instructions: JSON.stringify({
        steps: [
          "Create an FB with IN, OUT, INOUT parameters",
          "Add STAT variables to store state",
          "Call the FB with an instance DB",
          "Reuse the FB with different instances"
        ],
        objective: "Understand FBs and their instances"
      }),
      hints: JSON.stringify([
        "Each FB call requires a unique instance DB",
        "STAT variables retain their value between calls",
        "IN/OUT allows reading and modifying the same variable"
      ])
    }
  },
  es: {
    "Types de DB Siemens": {
      title: "Tipos de DB Siemens",
      description: "Asocie cada tipo de DB a su característica",
      instructions: JSON.stringify({
        steps: [
          "Identifique los diferentes tipos de DB",
          "Asocie cada tipo a su característica",
          "Comprenda cuándo usar cada tipo"
        ],
        objective: "Comprender los tipos de bloques de datos"
      }),
      hints: JSON.stringify([
        "Los DB globales son accesibles desde cualquier lugar",
        "Cada llamada a FB requiere un DB de instancia",
        "Los DB optimizados mejoran el rendimiento"
      ])
    },
    "Création d'un DB global": {
      title: "Creación de un DB global",
      description: "Cree un bloque de datos global para almacenar parámetros",
      instructions: JSON.stringify({
        steps: [
          "Cree un nuevo DB global",
          "Añada variables de diferentes tipos",
          "Defina valores por defecto",
          "Acceda a los datos desde un FC"
        ],
        objective: "Dominar los bloques de datos globales"
      }),
      hints: JSON.stringify([
        "Los DB globales son accesibles desde cualquier lugar",
        "Use nombres explícitos",
        "Siempre defina un valor por defecto"
      ])
    },
    "DB d'instance FB": {
      title: "DB de instancia FB",
      description: "Comprenda la relación entre FB y DB de instancia",
      instructions: JSON.stringify({
        steps: [
          "Cree un FB con parámetros IN, OUT, INOUT",
          "Añada variables STAT para memorizar el estado",
          "Llame al FB con un DB de instancia",
          "Reutilice el FB con diferentes instancias"
        ],
        objective: "Comprender los FB y sus instancias"
      }),
      hints: JSON.stringify([
        "Cada llamada a FB requiere un DB de instancia único",
        "Las variables STAT conservan su valor entre llamadas",
        "IN/OUT permite leer y modificar la misma variable"
      ])
    }
  }
}
