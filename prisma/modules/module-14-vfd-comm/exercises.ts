import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module14Exercises: ExerciseData[] = [
  {
    title: "Configuration Modbus RTU",
    description: "Configurez la communication Modbus RTU du variateur",
    type: "fill_blank",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Adresse esclave: 1",
        "Vitesse: 19200 bauds",
        "Format: 8 bits, parité paire, 1 stop",
        "Activez le contrôle par bus"
      ],
      objective: "Configurer Modbus RTU pour contrôle à distance"
    }),
    config: JSON.stringify({
      text: "Configuration Modbus RTU du variateur:\n\nP300 - Adresse esclave: {{blank1}}\nP301 - Vitesse de communication: {{blank2}} bauds\nP302 - Format de données: {{blank3}} bits\nP303 - Parité: {{blank4}}\nP304 - Bits de stop: {{blank5}}\nP305 - Source de commande: {{blank6}}\n\nCâblage RS485:\n- Borne A (D+): Signal {{blank7}}\n- Borne B (D-): Signal {{blank8}}\n- Résistance de terminaison: {{blank9}} Ω en fin de ligne",
      blanks: [
        { id: "blank1", placeholder: "adresse" },
        { id: "blank2", placeholder: "vitesse" },
        { id: "blank3", placeholder: "bits données" },
        { id: "blank4", placeholder: "parité" },
        { id: "blank5", placeholder: "stop bits" },
        { id: "blank6", placeholder: "source" },
        { id: "blank7", placeholder: "signal" },
        { id: "blank8", placeholder: "signal" },
        { id: "blank9", placeholder: "résistance" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "1",
        blank2: "19200",
        blank3: "8",
        blank4: "paire|even|pair",
        blank5: "1",
        blank6: "bus|modbus|réseau",
        blank7: "positif|+|plus",
        blank8: "négatif|-|moins",
        blank9: "120"
      }
    }),
    hints: JSON.stringify([
      "Toutes les stations doivent avoir les mêmes paramètres de communication",
      "Utilisez une résistance de terminaison en fin de ligne",
      "Vérifiez le câblage A/B du RS485"
    ]),
    xpReward: 150,
    order: 1
  },
  {
    title: "Registres Modbus",
    description: "Identifiez les registres Modbus pour contrôler le variateur",
    type: "matching",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Trouvez le registre du mot de commande",
        "Trouvez le registre de la consigne vitesse",
        "Lisez le mot d'état",
        "Lisez la vitesse actuelle"
      ],
      objective: "Maîtriser les registres de contrôle Modbus"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "40001", text: "Registre 40001" },
        { id: "40002", text: "Registre 40002" },
        { id: "40003", text: "Registre 40003" },
        { id: "40004", text: "Registre 40004" },
        { id: "func03", text: "Fonction 03" },
        { id: "func06", text: "Fonction 06" }
      ],
      rightItems: [
        { id: "control", text: "Mot de commande (marche/arrêt/sens)" },
        { id: "speed", text: "Consigne de vitesse (0-16384)" },
        { id: "status", text: "Mot d'état (prêt/défaut/en marche)" },
        { id: "actual", text: "Vitesse actuelle (retour)" },
        { id: "read", text: "Lecture de registres" },
        { id: "write", text: "Écriture d'un registre" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["40001", "control"],
        ["40002", "speed"],
        ["40003", "status"],
        ["40004", "actual"],
        ["func03", "read"],
        ["func06", "write"]
      ]
    }),
    hints: JSON.stringify([
      "Les registres 4xxxx sont des holding registers",
      "Le mot de commande contrôle marche/arrêt et sens",
      "Consultez la documentation du variateur"
    ]),
    xpReward: 200,
    order: 2
  },
  {
    title: "Trame Modbus RTU",
    description: "Analysez et construisez une trame Modbus RTU",
    type: "drag_drop",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les composants d'une trame Modbus",
        "Placez-les dans l'ordre correct",
        "Comprenez le calcul du CRC"
      ],
      objective: "Comprendre la structure des trames Modbus"
    }),
    config: JSON.stringify({
      items: [
        { id: "addr", text: "Adresse esclave (1 octet)" },
        { id: "func", text: "Code fonction (1 octet)" },
        { id: "data", text: "Données (N octets)" },
        { id: "crc", text: "CRC (2 octets)" },
        { id: "start", text: "Silence 3.5 caractères" }
      ],
      zones: [
        { id: "pos1", label: "Position 1 (début)" },
        { id: "pos2", label: "Position 2" },
        { id: "pos3", label: "Position 3" },
        { id: "pos4", label: "Position 4" },
        { id: "pos5", label: "Position 5 (fin)" }
      ]
    }),
    solution: JSON.stringify({
      placements: {
        pos1: ["start"],
        pos2: ["addr"],
        pos3: ["func"],
        pos4: ["data"],
        pos5: ["crc"]
      }
    }),
    hints: JSON.stringify([
      "La trame commence par un silence",
      "L'adresse identifie l'esclave destinataire",
      "Le CRC permet de détecter les erreurs de transmission"
    ]),
    xpReward: 175,
    order: 3
  }
]

export const module14ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Configuration Modbus RTU": {
      title: "Modbus RTU Configuration",
      description: "Configure the drive's Modbus RTU communication",
      instructions: JSON.stringify({
        steps: [
          "Slave address: 1",
          "Speed: 19200 baud",
          "Format: 8 bits, even parity, 1 stop",
          "Enable bus control"
        ],
        objective: "Configure Modbus RTU for remote control"
      }),
      hints: JSON.stringify([
        "All stations must have the same communication parameters",
        "Use a termination resistor at end of line",
        "Check RS485 A/B wiring"
      ])
    },
    "Registres Modbus": {
      title: "Modbus Registers",
      description: "Identify Modbus registers to control the drive",
      instructions: JSON.stringify({
        steps: [
          "Find the control word register",
          "Find the speed reference register",
          "Read the status word",
          "Read actual speed"
        ],
        objective: "Master Modbus control registers"
      }),
      hints: JSON.stringify([
        "4xxxx registers are holding registers",
        "Control word controls start/stop and direction",
        "Consult the drive documentation"
      ])
    },
    "Trame Modbus RTU": {
      title: "Modbus RTU Frame",
      description: "Analyze and build a Modbus RTU frame",
      instructions: JSON.stringify({
        steps: [
          "Identify Modbus frame components",
          "Place them in correct order",
          "Understand CRC calculation"
        ],
        objective: "Understand Modbus frame structure"
      }),
      hints: JSON.stringify([
        "The frame starts with silence",
        "The address identifies the target slave",
        "CRC detects transmission errors"
      ])
    }
  },
  es: {
    "Configuration Modbus RTU": {
      title: "Configuración Modbus RTU",
      description: "Configure la comunicación Modbus RTU del variador",
      instructions: JSON.stringify({
        steps: [
          "Dirección esclavo: 1",
          "Velocidad: 19200 baudios",
          "Formato: 8 bits, paridad par, 1 stop",
          "Active el control por bus"
        ],
        objective: "Configurar Modbus RTU para control remoto"
      }),
      hints: JSON.stringify([
        "Todas las estaciones deben tener los mismos parámetros de comunicación",
        "Use una resistencia de terminación al final de la línea",
        "Verifique el cableado A/B del RS485"
      ])
    },
    "Registres Modbus": {
      title: "Registros Modbus",
      description: "Identifique los registros Modbus para controlar el variador",
      instructions: JSON.stringify({
        steps: [
          "Encuentre el registro de palabra de control",
          "Encuentre el registro de consigna de velocidad",
          "Lea la palabra de estado",
          "Lea la velocidad actual"
        ],
        objective: "Dominar los registros de control Modbus"
      }),
      hints: JSON.stringify([
        "Los registros 4xxxx son holding registers",
        "La palabra de control controla marcha/paro y sentido",
        "Consulte la documentación del variador"
      ])
    },
    "Trame Modbus RTU": {
      title: "Trama Modbus RTU",
      description: "Analice y construya una trama Modbus RTU",
      instructions: JSON.stringify({
        steps: [
          "Identifique los componentes de una trama Modbus",
          "Colóquelos en el orden correcto",
          "Comprenda el cálculo del CRC"
        ],
        objective: "Comprender la estructura de tramas Modbus"
      }),
      hints: JSON.stringify([
        "La trama comienza con silencio",
        "La dirección identifica al esclavo destinatario",
        "El CRC detecta errores de transmisión"
      ])
    }
  }
}
