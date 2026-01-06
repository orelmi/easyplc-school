import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module09Exercises: ExerciseData[] = [
  {
    title: "Gammes CPU Siemens",
    description: "Identifiez les différentes gammes de CPU Siemens",
    type: "matching",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Associez chaque CPU à sa gamme (S7-1200, S7-1500, S7-300)",
        "Identifiez les caractéristiques principales",
        "Comparez les performances et applications typiques"
      ],
      objective: "Connaître les gammes de CPU Siemens"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "s71200", text: "S7-1200" },
        { id: "s71500", text: "S7-1500" },
        { id: "s7300", text: "S7-300" }
      ],
      rightItems: [
        { id: "compact", text: "Gamme compacte - Petites machines" },
        { id: "modulaire", text: "Gamme modulaire - Grandes installations" },
        { id: "classique", text: "Gamme classique - Systèmes existants (fin de vie)" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["s71200", "compact"],
        ["s71500", "modulaire"],
        ["s7300", "classique"]
      ]
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
    type: "fill_blank",
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
    config: JSON.stringify({
      text: "Adressage Siemens:\n\nFormat: [Type][Taille][Numéro].[Bit]\n\nTypes:\n- I = {{blank1}} (Input)\n- Q = {{blank2}} (Output)\n- M = {{blank3}} (Memory)\n\nTailles:\n- Sans lettre = {{blank4}}\n- B = {{blank5}} (8 bits)\n- W = {{blank6}} (16 bits)\n- D = {{blank7}} (32 bits)\n\nExemple: I1.3 = Entrée, octet {{blank8}}, bit {{blank9}}",
      blanks: [
        { id: "blank1", placeholder: "type" },
        { id: "blank2", placeholder: "type" },
        { id: "blank3", placeholder: "type" },
        { id: "blank4", placeholder: "taille" },
        { id: "blank5", placeholder: "taille" },
        { id: "blank6", placeholder: "taille" },
        { id: "blank7", placeholder: "taille" },
        { id: "blank8", placeholder: "numéro" },
        { id: "blank9", placeholder: "numéro" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "Entrée|entrée",
        blank2: "Sortie|sortie",
        blank3: "Mémoire|mémoire|Mémento",
        blank4: "Bit",
        blank5: "Octet|Byte",
        blank6: "Mot|Word",
        blank7: "Double mot|Double Word|DWord",
        blank8: "1",
        blank9: "3"
      }
    }),
    hints: JSON.stringify([
      "Le premier chiffre est l'octet, le second le bit",
      "Un mot = 2 octets consécutifs",
      "Attention au chevauchement des mots"
    ]),
    xpReward: 125,
    order: 2
  },
  {
    title: "Composants Siemens",
    description: "Identifiez les composants d'un système Siemens",
    type: "drag_drop",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Identifiez chaque composant du système",
        "Classez-les par catégorie",
        "Vérifiez vos placements"
      ],
      objective: "Connaître les composants d'un système Siemens"
    }),
    config: JSON.stringify({
      items: [
        { id: "cpu", text: "CPU S7-1500" },
        { id: "di", text: "Module DI (entrées digitales)" },
        { id: "do", text: "Module DO (sorties digitales)" },
        { id: "ai", text: "Module AI (entrées analogiques)" },
        { id: "hmi", text: "Pupitre HMI" },
        { id: "ps", text: "Alimentation PS" }
      ],
      zones: [
        { id: "traitement", label: "Traitement" },
        { id: "entrees", label: "Entrées" },
        { id: "sorties", label: "Sorties" },
        { id: "ihm", label: "Interface homme-machine" },
        { id: "alim", label: "Alimentation" }
      ]
    }),
    solution: JSON.stringify({
      placements: {
        traitement: ["cpu"],
        entrees: ["di", "ai"],
        sorties: ["do"],
        ihm: ["hmi"],
        alim: ["ps"]
      }
    }),
    hints: JSON.stringify([
      "Le CPU est le cerveau du système",
      "DI/AI sont des entrées, DO sont des sorties",
      "Le HMI est l'interface opérateur"
    ]),
    xpReward: 100,
    order: 3
  }
]

export const module09ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Gammes CPU Siemens": {
      title: "Siemens CPU Ranges",
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
    },
    "Composants Siemens": {
      title: "Siemens Components",
      description: "Identify the components of a Siemens system",
      instructions: JSON.stringify({
        steps: [
          "Identify each system component",
          "Classify them by category",
          "Verify your placements"
        ],
        objective: "Know the components of a Siemens system"
      }),
      hints: JSON.stringify([
        "The CPU is the brain of the system",
        "DI/AI are inputs, DO are outputs",
        "The HMI is the operator interface"
      ])
    }
  },
  es: {
    "Gammes CPU Siemens": {
      title: "Gamas CPU Siemens",
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
    },
    "Composants Siemens": {
      title: "Componentes Siemens",
      description: "Identifique los componentes de un sistema Siemens",
      instructions: JSON.stringify({
        steps: [
          "Identifique cada componente del sistema",
          "Clasifíquelos por categoría",
          "Verifique sus colocaciones"
        ],
        objective: "Conocer los componentes de un sistema Siemens"
      }),
      hints: JSON.stringify([
        "La CPU es el cerebro del sistema",
        "DI/AI son entradas, DO son salidas",
        "El HMI es la interfaz del operador"
      ])
    }
  }
}
