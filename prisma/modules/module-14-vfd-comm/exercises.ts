import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module14Exercises: ExerciseData[] = [
  {
    title: "Configuration Modbus RTU",
    description: "Configurez la communication Modbus RTU du variateur",
    type: "vfd_config",
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
    solution: JSON.stringify({
      parameters: {
        P300: 1,
        P301: 19200,
        P302: 0,
        P303: 2
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
    type: "troubleshooting",
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
    solution: JSON.stringify({
      registers: {
        controlWord: { address: 40001, description: "Mot de commande" },
        speedRef: { address: 40002, description: "Consigne vitesse" },
        statusWord: { address: 40003, description: "Mot d'état" },
        actualSpeed: { address: 40004, description: "Vitesse actuelle" }
      }
    }),
    hints: JSON.stringify([
      "Les registres 4xxxx sont des holding registers",
      "Le mot de commande contrôle marche/arrêt et sens",
      "Consultez la documentation du variateur"
    ]),
    xpReward: 200,
    order: 2
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
    }
  }
}
