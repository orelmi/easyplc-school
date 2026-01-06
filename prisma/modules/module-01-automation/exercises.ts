import type { ExerciseData, ExerciseTranslation } from '../types.js'

// Exercises for Module 1: Introduction to Automation
// Each array corresponds to a lesson (indexed by lesson order - 1)

export const module01Exercises: ExerciseData[][] = [
  // Lesson 1: Qu'est-ce qu'un automate programmable ?
  [
    {
      type: 'fill_blank',
      title: 'Acronymes PLC',
      description: 'Complétez les définitions des acronymes',
      order: 1,
      xpReward: 15,
      config: JSON.stringify({
        template: 'PLC signifie ___ Logic Controller. En français, on utilise l\'acronyme ___ qui signifie Automate Programmable Industriel.',
        blanks: [
          { id: 'plc', position: 0, expectedAnswers: ['Programmable'], hint: 'P...' },
          { id: 'api', position: 1, expectedAnswers: ['API'], hint: 'Trois lettres' }
        ]
      }),
      solution: JSON.stringify({
        answers: { plc: 'Programmable', api: 'API' }
      }),
      hints: JSON.stringify([
        'PLC est l\'acronyme anglais',
        'API est l\'acronyme français couramment utilisé'
      ])
    },
    {
      type: 'matching',
      title: 'Composants de l\'automate',
      description: 'Associez chaque composant à sa fonction',
      order: 2,
      xpReward: 20,
      config: JSON.stringify({
        leftItems: [
          { id: 'cpu', content: 'CPU' },
          { id: 'inputs', content: 'Entrées' },
          { id: 'outputs', content: 'Sorties' },
          { id: 'memory', content: 'Mémoire' }
        ],
        rightItems: [
          { id: 'func_exec', content: 'Exécute le programme' },
          { id: 'func_capteurs', content: 'Reçoit les signaux des capteurs' },
          { id: 'func_actionneurs', content: 'Commande les actionneurs' },
          { id: 'func_stockage', content: 'Stocke le programme et les données' }
        ],
        instruction: 'Reliez chaque composant à sa fonction principale'
      }),
      solution: JSON.stringify({
        pairs: [['cpu', 'func_exec'], ['inputs', 'func_capteurs'], ['outputs', 'func_actionneurs'], ['memory', 'func_stockage']]
      })
    },
    {
      type: 'ordering',
      title: 'Historique de l\'automate',
      description: 'Remettez les événements dans l\'ordre chronologique',
      order: 3,
      xpReward: 15,
      config: JSON.stringify({
        items: [
          { id: 'item1', content: 'Invention du premier PLC par Dick Morley' },
          { id: 'item2', content: 'Utilisation chez General Motors' },
          { id: 'item3', content: 'Développement des langages de programmation standardisés' },
          { id: 'item4', content: 'Intégration des communications industrielles' }
        ],
        instruction: 'Classez ces événements du plus ancien au plus récent'
      }),
      solution: JSON.stringify({
        correctOrder: ['item1', 'item2', 'item3', 'item4']
      })
    }
  ],

  // Lesson 2: Les entrées et sorties (E/S)
  [
    {
      type: 'drag_drop',
      title: 'Classification E/S',
      description: 'Classez les éléments selon leur catégorie',
      order: 1,
      xpReward: 20,
      config: JSON.stringify({
        dropZones: [
          { id: 'inputs', label: 'Entrées (Capteurs)', x: 0, y: 0, width: 200, height: 150 },
          { id: 'outputs', label: 'Sorties (Actionneurs)', x: 0, y: 0, width: 200, height: 150 }
        ],
        draggables: [
          { id: 'btn', content: 'Bouton poussoir', type: 'sensor' },
          { id: 'motor', content: 'Moteur', type: 'actuator' },
          { id: 'detector', content: 'Détecteur de présence', type: 'sensor' },
          { id: 'lamp', content: 'Voyant lumineux', type: 'actuator' },
          { id: 'temp', content: 'Sonde de température', type: 'sensor' },
          { id: 'valve', content: 'Électrovanne', type: 'actuator' }
        ],
        instruction: 'Glissez chaque élément dans la bonne catégorie'
      }),
      solution: JSON.stringify({
        placements: {
          inputs: ['btn', 'detector', 'temp'],
          outputs: ['motor', 'lamp', 'valve']
        }
      })
    },
    {
      type: 'fill_blank',
      title: 'Types d\'E/S',
      description: 'Complétez les définitions',
      order: 2,
      xpReward: 15,
      config: JSON.stringify({
        template: 'Les entrées ___ (TOR) ne connaissent que deux états : 0 ou 1. Les entrées ___ peuvent prendre des valeurs continues.',
        blanks: [
          { id: 'tor', position: 0, expectedAnswers: ['Tout Ou Rien', 'tout ou rien', 'TOR'], hint: 'T.O.R.' },
          { id: 'analog', position: 1, expectedAnswers: ['analogiques', 'Analogiques', 'analogique'], hint: 'Contraire de numérique' }
        ]
      }),
      solution: JSON.stringify({
        answers: { tor: 'Tout Ou Rien|TOR', analog: 'analogiques' }
      })
    }
  ],

  // Lesson 3: Le cycle automate
  [
    {
      type: 'ordering',
      title: 'Phases du cycle automate',
      description: 'Remettez les phases dans le bon ordre',
      order: 1,
      xpReward: 20,
      config: JSON.stringify({
        items: [
          { id: 'read', content: 'Lecture des entrées' },
          { id: 'exec', content: 'Exécution du programme' },
          { id: 'write', content: 'Mise à jour des sorties' },
          { id: 'system', content: 'Gestion système' }
        ],
        instruction: 'Ordonnez les phases du cycle automate'
      }),
      solution: JSON.stringify({
        correctOrder: ['read', 'exec', 'write', 'system']
      })
    },
    {
      type: 'timing',
      title: 'Chronogramme du cycle',
      description: 'Complétez le chronogramme de sortie',
      order: 2,
      xpReward: 30,
      config: JSON.stringify({
        signals: [
          { id: 'input', name: 'Entrée I0.0', type: 'input', initialState: false },
          { id: 'output', name: 'Sortie Q0.0', type: 'output', initialState: false }
        ],
        timeScale: 100,
        totalTime: 1000,
        givenSignals: [
          { signalId: 'input', transitions: [{ time: 200, value: true }, { time: 600, value: false }] }
        ],
        instruction: 'La sortie Q0.0 copie l\'entrée I0.0. Complétez le chronogramme de sortie.'
      }),
      solution: JSON.stringify({
        expectedSignals: [
          { signalId: 'output', transitions: [{ time: 200, value: true }, { time: 600, value: false }] }
        ],
        tolerance: 50
      })
    }
  ],

  // Lesson 4: Les marques et les fabricants d'automates
  [
    {
      type: 'matching',
      title: 'Fabricants et pays',
      description: 'Associez chaque fabricant à son pays d\'origine',
      order: 1,
      xpReward: 15,
      config: JSON.stringify({
        leftItems: [
          { id: 'siemens', content: 'Siemens' },
          { id: 'schneider', content: 'Schneider Electric' },
          { id: 'ab', content: 'Allen-Bradley' },
          { id: 'omron', content: 'Omron' }
        ],
        rightItems: [
          { id: 'germany', content: 'Allemagne' },
          { id: 'france', content: 'France' },
          { id: 'usa', content: 'États-Unis' },
          { id: 'japan', content: 'Japon' }
        ],
        instruction: 'Associez chaque fabricant à son pays d\'origine'
      }),
      solution: JSON.stringify({
        pairs: [['siemens', 'germany'], ['schneider', 'france'], ['ab', 'usa'], ['omron', 'japan']]
      })
    },
    {
      type: 'fill_blank',
      title: 'Gammes Siemens',
      description: 'Complétez les noms des gammes Siemens',
      order: 2,
      xpReward: 15,
      config: JSON.stringify({
        template: 'Les automates Siemens de la gamme S7 comprennent : le ___ pour l\'entrée de gamme, et le ___ pour la haute performance.',
        blanks: [
          { id: 's1200', position: 0, expectedAnswers: ['S7-1200', 's7-1200', '1200'], hint: 'Nombre à 4 chiffres commençant par 12' },
          { id: 's1500', position: 1, expectedAnswers: ['S7-1500', 's7-1500', '1500'], hint: 'Nombre à 4 chiffres commençant par 15' }
        ]
      }),
      solution: JSON.stringify({
        answers: { s1200: 'S7-1200', s1500: 'S7-1500' }
      })
    }
  ],

  // Lesson 5: L'adressage des E/S
  [
    {
      type: 'code_input',
      title: 'Adressage Siemens',
      description: 'Écrivez l\'adresse correcte',
      order: 1,
      xpReward: 20,
      config: JSON.stringify({
        language: 'st',
        prompt: 'En notation Siemens, écrivez l\'adresse de la première entrée du premier module (octet 0, bit 0)',
        testCases: [
          {
            description: 'Format d\'adresse correct',
            inputs: {},
            expectedOutputs: {}
          }
        ]
      }),
      solution: JSON.stringify({
        code: 'I0.0',
        acceptedPatterns: ['^%?I0\\.0$', '^%?IW?0\\.0$']
      })
    },
    {
      type: 'wiring',
      title: 'Câblage simple',
      description: 'Connectez le capteur à l\'entrée de l\'automate',
      order: 2,
      xpReward: 25,
      config: JSON.stringify({
        components: [
          {
            id: 'plc',
            type: 'plc',
            label: 'Automate',
            x: 300,
            y: 100,
            terminals: [
              { id: 'i0', label: 'I0.0', type: 'input', position: 'left', offset: 30 },
              { id: 'i1', label: 'I0.1', type: 'input', position: 'left', offset: 70 },
              { id: 'q0', label: 'Q0.0', type: 'output', position: 'right', offset: 50 }
            ]
          },
          {
            id: 'sensor',
            type: 'sensor',
            label: 'Capteur',
            x: 50,
            y: 80,
            terminals: [
              { id: 's_out', label: 'Sortie', type: 'output', position: 'right', offset: 50 }
            ]
          },
          {
            id: 'lamp',
            type: 'actuator',
            label: 'Voyant',
            x: 500,
            y: 100,
            terminals: [
              { id: 'l_in', label: 'Entrée', type: 'input', position: 'left', offset: 50 }
            ]
          }
        ],
        instruction: 'Connectez le capteur à l\'entrée I0.0 et le voyant à la sortie Q0.0'
      }),
      solution: JSON.stringify({
        connections: [['s_out', 'i0'], ['q0', 'l_in']]
      }),
      hints: JSON.stringify([
        'Le capteur doit être connecté à une entrée',
        'Le voyant doit être connecté à une sortie'
      ])
    },
    {
      type: 'ladder_builder',
      title: 'Premier programme Ladder',
      description: 'Créez un programme qui allume une sortie quand l\'entrée est active',
      order: 3,
      xpReward: 40,
      config: JSON.stringify({
        availableElements: {
          contacts: ['NO', 'NC'],
          coils: ['normal'],
          timers: [],
          counters: []
        },
        inputs: [
          { address: 'I0.0', label: 'Bouton' },
          { address: 'I0.1', label: 'Capteur' }
        ],
        outputs: [
          { address: 'Q0.0', label: 'Voyant' }
        ],
        maxRungs: 3,
        instruction: 'Créez un programme qui active Q0.0 quand I0.0 est à 1',
        testScenario: {
          description: 'Test du programme',
          steps: [
            { action: 'Set I0.0 = OFF', expectedState: { 'Q0.0': false } },
            { action: 'Set I0.0 = ON', expectedState: { 'Q0.0': true } }
          ]
        }
      }),
      solution: JSON.stringify({
        expectedBehavior: [
          { inputs: { 'I0.0': false }, expectedOutputs: { 'Q0.0': false } },
          { inputs: { 'I0.0': true }, expectedOutputs: { 'Q0.0': true } }
        ]
      })
    }
  ]
]

// Translations for Module 1 exercises
export const module01ExerciseTranslations = {
  en: {
    'ex-1-1': { title: 'PLC Acronyms', description: 'Complete the acronym definitions' },
    'ex-1-2': { title: 'PLC Components', description: 'Match each component to its function' },
    'ex-1-3': { title: 'PLC History', description: 'Put the events in chronological order' },
    'ex-2-1': { title: 'I/O Classification', description: 'Classify items by category' },
    'ex-2-2': { title: 'I/O Types', description: 'Complete the definitions' },
    'ex-3-1': { title: 'Scan Cycle Phases', description: 'Put the phases in the correct order' },
    'ex-3-2': { title: 'Timing Diagram', description: 'Complete the output timing diagram' },
    'ex-4-1': { title: 'Manufacturers and Countries', description: 'Match each manufacturer to its country' },
    'ex-4-2': { title: 'Siemens Product Lines', description: 'Complete the Siemens product line names' },
    'ex-5-1': { title: 'Siemens Addressing', description: 'Write the correct address' },
    'ex-5-2': { title: 'Simple Wiring', description: 'Connect the sensor to the PLC input' },
    'ex-5-3': { title: 'First Ladder Program', description: 'Create a program that turns on an output when input is active' }
  },
  es: {
    'ex-1-1': { title: 'Acrónimos PLC', description: 'Complete las definiciones de los acrónimos' },
    'ex-1-2': { title: 'Componentes del PLC', description: 'Asocie cada componente con su función' },
    'ex-1-3': { title: 'Historia del PLC', description: 'Ordene los eventos cronológicamente' },
    'ex-2-1': { title: 'Clasificación E/S', description: 'Clasifique los elementos por categoría' },
    'ex-2-2': { title: 'Tipos de E/S', description: 'Complete las definiciones' },
    'ex-3-1': { title: 'Fases del Ciclo', description: 'Ordene las fases correctamente' },
    'ex-3-2': { title: 'Cronograma', description: 'Complete el cronograma de salida' },
    'ex-4-1': { title: 'Fabricantes y Países', description: 'Asocie cada fabricante con su país' },
    'ex-4-2': { title: 'Gamas Siemens', description: 'Complete los nombres de las gamas Siemens' },
    'ex-5-1': { title: 'Direccionamiento Siemens', description: 'Escriba la dirección correcta' },
    'ex-5-2': { title: 'Cableado Simple', description: 'Conecte el sensor a la entrada del PLC' },
    'ex-5-3': { title: 'Primer Programa Ladder', description: 'Cree un programa que active una salida cuando la entrada esté activa' }
  }
}
