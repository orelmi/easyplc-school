import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module11Exercises: ExerciseData[] = [
  {
    title: "Création d'un DB global",
    description: "Créez un bloc de données global pour stocker des paramètres",
    type: "plc_config",
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
    solution: JSON.stringify({
      dbStructure: {
        "Temperature_Max": { type: "Real", default: 80.0 },
        "Alarm_Active": { type: "Bool", default: false },
        "Cycle_Count": { type: "DInt", default: 0 }
      }
    }),
    hints: JSON.stringify([
      "Les DB globaux sont accessibles partout",
      "Utilisez des noms explicites",
      "Définissez toujours une valeur par défaut"
    ]),
    xpReward: 125,
    order: 1
  },
  {
    title: "DB d'instance FB",
    description: "Créez un FB avec son DB d'instance",
    type: "ladder",
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
    solution: JSON.stringify({
      fb: {
        inputs: ["Enable", "SetPoint"],
        outputs: ["Active", "Error"],
        static: ["LastValue", "Counter"]
      }
    }),
    hints: JSON.stringify([
      "Chaque appel de FB nécessite un DB d'instance unique",
      "Les variables STAT conservent leur valeur entre les appels",
      "IN/OUT permet de lire et modifier la même variable"
    ]),
    xpReward: 200,
    order: 2
  }
]

export const module11ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
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
      description: "Create an FB with its instance DB",
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
      description: "Cree un FB con su DB de instancia",
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
