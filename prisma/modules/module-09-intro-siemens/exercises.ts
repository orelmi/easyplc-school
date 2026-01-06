import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module09Exercises: ExerciseData[] = [
  {
    title: "Identification CPU Siemens",
    description: "Identifiez les différentes gammes de CPU Siemens",
    type: "plc_config",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Associez chaque CPU à sa gamme (S7-1200, S7-1500, S7-300)",
        "Identifiez les caractéristiques principales",
        "Comparez les performances et applications typiques"
      ],
      objective: "Connaître les gammes de CPU Siemens"
    }),
    solution: JSON.stringify({
      cpus: {
        "S7-1200": { type: "Compact", application: "Petites machines" },
        "S7-1500": { type: "Modulaire", application: "Grandes installations" },
        "S7-300": { type: "Classique", application: "Systèmes existants" }
      }
    }),
    hints: JSON.stringify([
      "S7-1200 est la gamme compact",
      "S7-1500 est la plus récente et performante",
      "S7-300 est en fin de vie mais encore présent"
    ]),
    xpReward: 75,
    order: 1
  },
  {
    title: "Adressage Siemens",
    description: "Maîtrisez l'adressage des E/S Siemens",
    type: "troubleshooting",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Convertissez les adresses entre formats",
        "I0.0 à I0.7 = Octet 0, bits 0 à 7",
        "IW0 = Mot d'entrée à l'octet 0",
        "ID0 = Double mot d'entrée à l'octet 0"
      ],
      objective: "Maîtriser l'adressage bit, octet, mot et double mot"
    }),
    solution: JSON.stringify({
      exercises: [
        { bit: "I1.3", byte: "IB1", word: "IW0" },
        { bit: "Q2.5", byte: "QB2", word: "QW2" }
      ]
    }),
    hints: JSON.stringify([
      "Le premier chiffre est l'octet, le second le bit",
      "Un mot = 2 octets consécutifs",
      "Attention au chevauchement des mots"
    ]),
    xpReward: 125,
    order: 2
  }
]

export const module09ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Identification CPU Siemens": {
      title: "Siemens CPU Identification",
      description: "Identify the different Siemens CPU ranges",
      instructions: JSON.stringify({
        steps: [
          "Associate each CPU with its range (S7-1200, S7-1500, S7-300)",
          "Identify the main characteristics",
          "Compare performance and typical applications"
        ],
        objective: "Know the Siemens CPU ranges"
      }),
      hints: JSON.stringify([
        "S7-1200 is the compact range",
        "S7-1500 is the newest and most powerful",
        "S7-300 is end-of-life but still present"
      ])
    },
    "Adressage Siemens": {
      title: "Siemens Addressing",
      description: "Master Siemens I/O addressing",
      instructions: JSON.stringify({
        steps: [
          "Convert addresses between formats",
          "I0.0 to I0.7 = Byte 0, bits 0 to 7",
          "IW0 = Input word at byte 0",
          "ID0 = Input double word at byte 0"
        ],
        objective: "Master bit, byte, word and double word addressing"
      }),
      hints: JSON.stringify([
        "First number is byte, second is bit",
        "One word = 2 consecutive bytes",
        "Watch out for word overlap"
      ])
    }
  },
  es: {
    "Identification CPU Siemens": {
      title: "Identificación CPU Siemens",
      description: "Identifique las diferentes gamas de CPU Siemens",
      instructions: JSON.stringify({
        steps: [
          "Asocie cada CPU con su gama (S7-1200, S7-1500, S7-300)",
          "Identifique las características principales",
          "Compare rendimiento y aplicaciones típicas"
        ],
        objective: "Conocer las gamas de CPU Siemens"
      }),
      hints: JSON.stringify([
        "S7-1200 es la gama compacta",
        "S7-1500 es la más reciente y potente",
        "S7-300 está en fin de vida pero aún presente"
      ])
    },
    "Adressage Siemens": {
      title: "Direccionamiento Siemens",
      description: "Domine el direccionamiento de E/S Siemens",
      instructions: JSON.stringify({
        steps: [
          "Convierta direcciones entre formatos",
          "I0.0 a I0.7 = Byte 0, bits 0 a 7",
          "IW0 = Palabra de entrada en byte 0",
          "ID0 = Doble palabra de entrada en byte 0"
        ],
        objective: "Dominar direccionamiento bit, byte, palabra y doble palabra"
      }),
      hints: JSON.stringify([
        "El primer número es el byte, el segundo el bit",
        "Una palabra = 2 bytes consecutivos",
        "Cuidado con el solapamiento de palabras"
      ])
    }
  }
}
