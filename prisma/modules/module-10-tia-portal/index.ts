// Module 10: TIA Portal Programming
import type { ModuleData } from '../types.js'

export const module10Data: ModuleData = {
  // Module info
  moduleOrder: 10,
  moduleTitle: "Programmation TIA Portal",
  moduleDescription: "Apprenez a creer des projets et a programmer avec TIA Portal",
  moduleTranslations: {
    en: {
      title: "TIA Portal Programming",
      description: "Learn to create projects and program with TIA Portal"
    },
    es: {
      title: "Programacion con TIA Portal",
      description: "Aprenda a crear proyectos y programar con TIA Portal"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Creer un projet TIA Portal",
      description: "Apprenez a creer et configurer un projet S7-1500",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Creer un projet TIA Portal\n\nLa creation d'un projet est la premiere etape pour programmer un automate Siemens."
          },
          {
            type: "text",
            content: "## Etapes de creation\n\n1. **Nouveau projet** : Fichier -> Nouveau -> Projet\n2. **Ajouter un appareil** : Selectionner la CPU (ex: CPU 1511-1 PN)\n3. **Configurer le materiel** : Ajouter les modules d'E/S\n4. **Configurer le reseau** : Definir l'adresse IP\n5. **Compiler** : Verifier la configuration"
          },
          {
            type: "info",
            content: "Choisissez toujours la reference exacte de votre CPU. Les programmes ne sont pas toujours compatibles entre differentes versions."
          },
          {
            type: "text",
            content: "## Structure du projet\n\n```\nProjet TIA Portal\n├── Appareils et reseaux\n│   └── PLC_1 [CPU 1511-1 PN]\n│       ├── Configuration des appareils\n│       ├── Blocs de programme\n│       │   ├── Main [OB1]\n│       │   ├── Fonctions (FC)\n│       │   └── Blocs fonctionnels (FB)\n│       ├── Variables API\n│       └── Tables de visualisation\n└── Donnees communes\n```"
          }
        ]
      })
    },
    {
      title: "Langages de programmation S7",
      description: "Decouvrez LAD, FBD, SCL et Graph pour programmer le S7-1500",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Langages de programmation\n\nLe S7-1500 supporte plusieurs langages de programmation selon la norme IEC 61131-3."
          },
          {
            type: "text",
            content: "## LAD (Ladder Diagram)\n\nLe plus utilise, similaire aux schemas electriques.\n\n```\n|     I0.0        I0.1          Q0.0     |\n|----[ ]----------[/]-----------( )-----|\n|                                        |\n```"
          },
          {
            type: "text",
            content: "## FBD (Function Block Diagram)\n\nRepresentation graphique par blocs fonctionnels.\n\n```\n     ┌─────┐\nI0.0─┤     │\n     │ AND ├─Q0.0\nI0.1─┤     │\n     └─────┘\n```"
          },
          {
            type: "text",
            content: "## SCL (Structured Control Language)\n\nLangage textuel similaire au Pascal.\n\n```pascal\nIF I0.0 AND NOT I0.1 THEN\n    Q0.0 := TRUE;\nELSE\n    Q0.0 := FALSE;\nEND_IF;\n```"
          },
          {
            type: "text",
            content: "## GRAPH\n\nProgrammation sequentielle de type GRAFCET.\n\n| Langage | Utilisation |\n|---------|-------------|\n| LAD | Logique combinatoire, electriciens |\n| FBD | Traitement de signal, regulation |\n| SCL | Calculs complexes, gestion donnees |\n| GRAPH | Sequences, cycles machines |"
          }
        ]
      })
    },
    {
      title: "Variables et types de donnees",
      description: "Declarer et utiliser les variables dans TIA Portal",
      order: 3,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Variables et types de donnees\n\nLes variables (tags) permettent de donner des noms symboliques aux adresses memoire."
          },
          {
            type: "text",
            content: "## Types de donnees elementaires\n\n| Type | Taille | Plage | Exemple |\n|------|--------|-------|--------|\n| Bool | 1 bit | TRUE/FALSE | Capteur_Presence |\n| Byte | 8 bits | 0-255 | Code_Erreur |\n| Int | 16 bits | -32768 a 32767 | Compteur_Pieces |\n| DInt | 32 bits | ±2 milliards | Total_Production |\n| Real | 32 bits | Decimaux | Temperature |\n| Time | 32 bits | T#0ms a T#24d | Temps_Cycle |\n| String | Variable | Texte | Nom_Produit |"
          },
          {
            type: "text",
            content: "## Tables de variables\n\n### Variables API (PLC Tags)\nVariables globales accessibles depuis tout le programme.\n\n### Variables locales\nVariables internes a un bloc (FC, FB), non accessibles depuis l'exterieur.\n\n### Constantes\nValeurs fixes qui ne changent pas pendant l'execution."
          },
          {
            type: "text",
            content: "## Exemple de declaration\n\n```\nNom              Type    Adresse    Commentaire\n─────────────────────────────────────────────────\nBouton_Demarrage Bool    %I0.0      Bouton START\nBouton_Arret     Bool    %I0.1      Bouton STOP\nMoteur_Marche    Bool    %Q0.0      Sortie moteur\nVitesse_Consigne Int     %MW10      Vitesse en tr/min\nTemperature      Real    %MD20      Temperature °C\n```"
          },
          {
            type: "info",
            content: "Utilisez toujours des noms symboliques plutot que des adresses absolues. Cela rend le programme plus lisible et plus facile a maintenir."
          }
        ]
      })
    },
    {
      title: "Instructions LAD de base",
      description: "Les instructions fondamentales en langage LADDER",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Instructions LAD de base\n\nLe langage LAD (Ladder Diagram) represente la logique sous forme de schema electrique."
          },
          {
            type: "diagram",
            title: "Elements de base LAD",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    ELEMENTS LAD                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTACTS                      BOBINES                       │
│                                                              │
│  ─┤ ├─  Contact NO             ─( )─   Bobine simple        │
│         (Normalement Ouvert)                                 │
│                                                              │
│  ─┤/├─  Contact NC             ─(/)─   Bobine inversee      │
│         (Normalement Ferme)                                  │
│                                                              │
│  ─┤P├─  Front montant          ─(S)─   Bobine Set (memo)    │
│                                                              │
│  ─┤N├─  Front descendant       ─(R)─   Bobine Reset         │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Exemple : Circuit Marche/Arret\n\n```\n|     Start      Stop       Moteur         Moteur    |\n|----[ ]----+---[/]----------( )---------------------|\n|           |                                         |\n|   Moteur  |                                         |\n|----[ ]----+                                         |\n|                                                     |\n```\n\nLe moteur demarre avec Start et s'auto-maintient. Stop l'arrete."
          },
          {
            type: "text",
            content: "## Fonctions courantes\n\n| Bloc | Fonction |\n|------|----------|\n| MOVE | Copier une valeur |\n| ADD, SUB, MUL, DIV | Operations arithmetiques |\n| CMP (>, <, =) | Comparaisons |\n| TON | Temporisation a l'enclenchement |\n| CTU | Compteur incremental |"
          },
          {
            type: "warning",
            content: "En LAD, le flux d'energie va de gauche a droite. Une bobine ne peut etre activee que si tous les contacts de sa ligne sont passants."
          }
        ]
      })
    },
    {
      title: "Temporisateurs et compteurs",
      description: "Utiliser TON, TOF, TP et les compteurs CTU, CTD",
      order: 5,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Temporisateurs et compteurs\n\nLes temporisateurs et compteurs sont essentiels pour gerer le temps et compter des evenements."
          },
          {
            type: "text",
            content: "## Types de temporisateurs\n\n| Type | Nom | Comportement |\n|------|-----|-------------|\n| TON | Timer On Delay | Retarde l'activation |\n| TOF | Timer Off Delay | Retarde la desactivation |\n| TP | Timer Pulse | Genere une impulsion |"
          },
          {
            type: "diagram",
            title: "Chronogrammes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    TEMPORISATEURS                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TON (Timer On Delay)         TOF (Timer Off Delay)         │
│                                                              │
│  IN  ────┐     ┌────          IN  ────┐     ┌────           │
│          │     │                      │     │               │
│          └─────┘                      └─────┘               │
│                                                              │
│  Q       ─┐  ┌────            Q   ────┐     ┌─               │
│           │  │  ↑ PT                  │     │  ↑ PT         │
│           └──┘                        └─────┘               │
│                                                              │
│  TP (Timer Pulse)                                           │
│                                                              │
│  IN  ────┐     ┌────                                        │
│          │     │                                            │
│          └─────┘                                            │
│                                                              │
│  Q   ────┐  ┌────                                           │
│          │  │ PT (duree fixe)                               │
│          └──┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Compteurs\n\n| Type | Fonction | Action |\n|------|----------|--------|\n| CTU | Counter Up | Incremente a chaque front montant |\n| CTD | Counter Down | Decremente a chaque front montant |\n| CTUD | Counter Up/Down | Compte dans les deux sens |"
          },
          {
            type: "text",
            content: "## Exemple SCL\n\n```pascal\n// Temporisateur TON\n\"Timer_1\".TON(IN := Start,\n               PT := T#5s,\n               Q => Sortie,\n               ET => Temps_Ecoule);\n\n// Compteur CTU\n\"Counter_1\".CTU(CU := Capteur,\n                R := Reset,\n                PV := 100,\n                Q => Objectif_Atteint,\n                CV => Valeur_Compteur);\n```"
          }
        ]
      })
    },
    {
      title: "Mise en service et debogage",
      description: "Charger le programme et utiliser les outils de debogage",
      order: 6,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Mise en service et debogage\n\nUne fois le programme ecrit, il faut le charger dans l'automate et le tester."
          },
          {
            type: "text",
            content: "## Etapes de mise en service\n\n1. **Compiler** : Verifier les erreurs de syntaxe\n2. **Etablir la connexion** : Via Ethernet ou USB\n3. **Charger le materiel** : Configuration de l'automate\n4. **Charger le programme** : Blocs et donnees\n5. **Passer en RUN** : Demarrer l'execution\n6. **Tester** : Verifier le fonctionnement"
          },
          {
            type: "text",
            content: "## Outils de debogage\n\n### Visualisation en ligne\n- Observer l'etat des variables en temps reel\n- Voir le flux d'energie en LAD (lignes vertes)\n\n### Tables de visualisation\n- Creer des listes de variables a surveiller\n- Modifier des valeurs pour les tests\n\n### Forcage\n- Forcer des entrees pour tester sans capteurs\n- Forcer des sorties pour tester les actionneurs"
          },
          {
            type: "diagram",
            title: "Modes de l'automate",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    MODES DE LA CPU                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────┐      ┌─────────┐      ┌─────────┐           │
│    │  STOP   │ ──── │ STARTUP │ ──── │   RUN   │           │
│    │         │      │         │      │         │           │
│    │ Program │      │  OB100  │      │ Program │           │
│    │ inactif │      │ execute │      │  actif  │           │
│    └─────────┘      └─────────┘      └─────────┘           │
│         ▲                                  │                 │
│         │                                  │                 │
│         └──────────── ERREUR ──────────────┘                │
│                                                              │
│    STOP -> RUN : Demarrage avec OB100                        │
│    RUN -> STOP : Arret du programme                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "warning",
            content: "Ne forcez jamais de sorties sur une machine en production sans avoir securise la zone ! Les mouvements peuvent etre dangereux."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Creer un projet TIA Portal": {
        title: "Creating a TIA Portal Project",
        description: "Learn to create and configure a TIA Portal project",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Creating a TIA Portal Project\n\nA structured project is the foundation of any automation application."
            },
            {
              type: "text",
              content: "## Creation Steps\n\n1. **New Project**: File > New > Project\n2. **Device selection**: Choose CPU (e.g., CPU 1511-1 PN)\n3. **Hardware configuration**: Add I/O modules\n4. **Network**: Configure PROFINET addresses\n5. **Programming**: Create program blocks"
            },
            {
              type: "diagram",
              title: "Hardware Configuration (HW Config)",
              content: `┌─────────────────────────────────────────────────────────────┐
│  Device Configuration - PLC_1                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Rail 0                                                  ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          ││
│  │  │  PS  │ │ CPU  │ │ DI16 │ │ DQ16 │ │ AI8  │          ││
│  │  │ 25W  │ │1511-1│ │      │ │      │ │      │          ││
│  │  │      │ │  PN  │ │      │ │      │ │      │          ││
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          ││
│  │   Slot 0   Slot 1   Slot 2   Slot 3   Slot 4           ││
│  │                                                          ││
│  │  Addresses:        I0.0-I1.7  Q0.0-Q1.7  IW64-IW78     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "info",
              content: "Compile and download your project to the PLC regularly to verify that everything works."
            }
          ]
        })
      },
      "Langages de programmation S7": {
        title: "S7 Programming Languages",
        description: "Discover LAD, FBD, SCL and GRAPH",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# S7 Programming Languages\n\nSiemens offers several programming languages for different needs."
            },
            {
              type: "text",
              content: "## Available Languages\n\n### LAD (Ladder Diagram)\nGraphical language resembling electrical diagrams. Ideal for discrete logic.\n\n### FBD (Function Block Diagram)\nGraphical language using logic blocks. Good for process control.\n\n### SCL (Structured Control Language)\nHigh-level textual language similar to Pascal. Powerful for algorithms.\n\n### GRAPH\nSequential programming language for step-by-step processes."
            },
            {
              type: "diagram",
              title: "Language Comparison",
              content: `┌─────────────────────────────────────────────────────────────────┐
│  Example: Q0.0 = I0.0 AND I0.1                                  │
│                                                                  │
│  LAD:     ──| |────| |────────────────────────( )──             │
│             I0.0    I0.1                        Q0.0             │
│                                                                  │
│  FBD:     ┌─────┐                                               │
│           │ AND │                                               │
│     I0.0──┤     ├───Q0.0                                        │
│     I0.1──┤     │                                               │
│           └─────┘                                               │
│                                                                  │
│  SCL:     IF I0.0 AND I0.1 THEN                                 │
│              Q0.0 := TRUE;                                      │
│           END_IF;                                               │
└─────────────────────────────────────────────────────────────────┘`
            },
            {
              type: "warning",
              content: "Choose the language based on the task: LAD for logic, SCL for math, GRAPH for sequences."
            }
          ]
        })
      },
      "Variables et types de donnees": {
        title: "Variables and Data Types",
        description: "Declare and use variables in TIA Portal",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Variables and Data Types\n\nVariables (tags) allow you to give symbolic names to memory addresses."
            },
            {
              type: "text",
              content: "## Elementary Data Types\n\n| Type | Size | Range | Example |\n|------|--------|-------|--------|\n| Bool | 1 bit | TRUE/FALSE | Presence_Sensor |\n| Byte | 8 bits | 0-255 | Error_Code |\n| Int | 16 bits | -32768 to 32767 | Part_Counter |\n| DInt | 32 bits | +/-2 billion | Total_Production |\n| Real | 32 bits | Decimals | Temperature |\n| Time | 32 bits | T#0ms to T#24d | Cycle_Time |\n| String | Variable | Text | Product_Name |"
            },
            {
              type: "text",
              content: "## Variable Tables\n\n### PLC Tags\nGlobal variables accessible from anywhere in the program.\n\n### Local Variables\nInternal variables to a block (FC, FB), not accessible from outside.\n\n### Constants\nFixed values that do not change during execution."
            },
            {
              type: "text",
              content: "## Declaration Example\n\n```\nName              Type    Address    Comment\n─────────────────────────────────────────────────\nStart_Button      Bool    %I0.0      START button\nStop_Button       Bool    %I0.1      STOP button\nMotor_Running     Bool    %Q0.0      Motor output\nSpeed_Setpoint    Int     %MW10      Speed in RPM\nTemperature       Real    %MD20      Temperature C\n```"
            },
            {
              type: "info",
              content: "Always use symbolic names rather than absolute addresses. This makes the program more readable and easier to maintain."
            }
          ]
        })
      },
      "Instructions LAD de base": {
        title: "Basic LAD Instructions",
        description: "Fundamental instructions in LADDER language",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Basic LAD Instructions\n\nThe LAD (Ladder Diagram) language represents logic as an electrical diagram."
            },
            {
              type: "diagram",
              title: "Basic LAD Elements",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    LAD ELEMENTS                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTACTS                      COILS                         │
│                                                              │
│  ─┤ ├─  NO Contact             ─( )─   Simple coil          │
│         (Normally Open)                                      │
│                                                              │
│  ─┤/├─  NC Contact             ─(/)─   Inverted coil        │
│         (Normally Closed)                                    │
│                                                              │
│  ─┤P├─  Rising edge            ─(S)─   Set coil (latch)     │
│                                                              │
│  ─┤N├─  Falling edge           ─(R)─   Reset coil           │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Example: Start/Stop Circuit\n\n```\n|     Start      Stop       Motor          Motor     |\n|----[ ]----+---[/]----------( )---------------------|\n|           |                                         |\n|   Motor   |                                         |\n|----[ ]----+                                         |\n|                                                     |\n```\n\nThe motor starts with Start and self-holds. Stop turns it off."
            },
            {
              type: "text",
              content: "## Common Functions\n\n| Block | Function |\n|------|----------|\n| MOVE | Copy a value |\n| ADD, SUB, MUL, DIV | Arithmetic operations |\n| CMP (>, <, =) | Comparisons |\n| TON | On-delay timer |\n| CTU | Incremental counter |"
            },
            {
              type: "warning",
              content: "In LAD, the power flow goes from left to right. A coil can only be activated if all contacts in its line are conducting."
            }
          ]
        })
      },
      "Temporisateurs et compteurs": {
        title: "Timers and Counters",
        description: "Use TON, TOF, TP and CTU, CTD counters",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Timers and Counters\n\nTimers and counters are essential for managing time and counting events."
            },
            {
              type: "text",
              content: "## Timer Types\n\n| Type | Name | Behavior |\n|------|-----|-------------|\n| TON | Timer On Delay | Delays activation |\n| TOF | Timer Off Delay | Delays deactivation |\n| TP | Timer Pulse | Generates a pulse |"
            },
            {
              type: "diagram",
              title: "Timing Diagrams",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    TIMERS                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TON (Timer On Delay)         TOF (Timer Off Delay)         │
│                                                              │
│  IN  ────┐     ┌────          IN  ────┐     ┌────           │
│          │     │                      │     │               │
│          └─────┘                      └─────┘               │
│                                                              │
│  Q       ─┐  ┌────            Q   ────┐     ┌─               │
│           │  │  ↑ PT                  │     │  ↑ PT         │
│           └──┘                        └─────┘               │
│                                                              │
│  TP (Timer Pulse)                                           │
│                                                              │
│  IN  ────┐     ┌────                                        │
│          │     │                                            │
│          └─────┘                                            │
│                                                              │
│  Q   ────┐  ┌────                                           │
│          │  │ PT (fixed duration)                           │
│          └──┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Counters\n\n| Type | Function | Action |\n|------|----------|--------|\n| CTU | Counter Up | Increments on each rising edge |\n| CTD | Counter Down | Decrements on each rising edge |\n| CTUD | Counter Up/Down | Counts in both directions |"
            },
            {
              type: "text",
              content: "## SCL Example\n\n```pascal\n// TON Timer\n\"Timer_1\".TON(IN := Start,\n               PT := T#5s,\n               Q => Output,\n               ET => Elapsed_Time);\n\n// CTU Counter\n\"Counter_1\".CTU(CU := Sensor,\n                R := Reset,\n                PV := 100,\n                Q => Target_Reached,\n                CV => Counter_Value);\n```"
            }
          ]
        })
      },
      "Mise en service et debogage": {
        title: "Commissioning and Debugging",
        description: "Download the program and use debugging tools",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Commissioning and Debugging\n\nOnce the program is written, it must be downloaded to the PLC and tested."
            },
            {
              type: "text",
              content: "## Commissioning Steps\n\n1. **Compile**: Check for syntax errors\n2. **Establish connection**: Via Ethernet or USB\n3. **Download hardware**: PLC configuration\n4. **Download program**: Blocks and data\n5. **Switch to RUN**: Start execution\n6. **Test**: Verify operation"
            },
            {
              type: "text",
              content: "## Debugging Tools\n\n### Online Monitoring\n- Observe variable states in real-time\n- See power flow in LAD (green lines)\n\n### Watch Tables\n- Create lists of variables to monitor\n- Modify values for testing\n\n### Forcing\n- Force inputs to test without sensors\n- Force outputs to test actuators"
            },
            {
              type: "diagram",
              title: "CPU Modes",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    CPU MODES                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────┐      ┌─────────┐      ┌─────────┐           │
│    │  STOP   │ ──── │ STARTUP │ ──── │   RUN   │           │
│    │         │      │         │      │         │           │
│    │ Program │      │  OB100  │      │ Program │           │
│    │ inactive│      │ executed│      │  active │           │
│    └─────────┘      └─────────┘      └─────────┘           │
│         ▲                                  │                 │
│         │                                  │                 │
│         └──────────── ERROR ───────────────┘                │
│                                                              │
│    STOP -> RUN : Startup with OB100                          │
│    RUN -> STOP : Program stop                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "warning",
              content: "Never force outputs on a machine in production without securing the area! Movements can be dangerous."
            }
          ]
        })
      }
    },
    es: {
      "Creer un projet TIA Portal": {
        title: "Crear un proyecto TIA Portal",
        description: "Aprende a crear y configurar un proyecto TIA Portal",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Crear un proyecto TIA Portal\n\nUn proyecto estructurado es la base de cualquier aplicacion de automatizacion."
            },
            {
              type: "text",
              content: "## Pasos de creacion\n\n1. **Nuevo proyecto**: Archivo > Nuevo > Proyecto\n2. **Seleccion del dispositivo**: Elegir CPU (ej. CPU 1511-1 PN)\n3. **Configuracion de hardware**: Agregar modulos E/S\n4. **Red**: Configurar direcciones PROFINET\n5. **Programacion**: Crear bloques de programa"
            },
            {
              type: "diagram",
              title: "Configuracion de Hardware (HW Config)",
              content: `┌─────────────────────────────────────────────────────────────┐
│  Configuracion del dispositivo - PLC_1                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Rack 0                                                  ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          ││
│  │  │  PS  │ │ CPU  │ │ DI16 │ │ DQ16 │ │ AI8  │          ││
│  │  │ 25W  │ │1511-1│ │      │ │      │ │      │          ││
│  │  │      │ │  PN  │ │      │ │      │ │      │          ││
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          ││
│  │   Slot 0   Slot 1   Slot 2   Slot 3   Slot 4           ││
│  │                                                          ││
│  │  Direcciones:      I0.0-I1.7  Q0.0-Q1.7  IW64-IW78     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "info",
              content: "Compile y descargue su proyecto al PLC regularmente para verificar que todo funcione."
            }
          ]
        })
      },
      "Langages de programmation S7": {
        title: "Lenguajes de programacion S7",
        description: "Descubre LAD, FBD, SCL y GRAPH",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Lenguajes de programacion S7\n\nSiemens ofrece varios lenguajes de programacion para diferentes necesidades."
            },
            {
              type: "text",
              content: "## Lenguajes disponibles\n\n### LAD (Diagrama de Escalera)\nLenguaje grafico que se asemeja a diagramas electricos. Ideal para logica discreta.\n\n### FBD (Diagrama de Bloques de Funcion)\nLenguaje grafico usando bloques logicos. Bueno para control de procesos.\n\n### SCL (Lenguaje de Control Estructurado)\nLenguaje textual de alto nivel similar a Pascal. Potente para algoritmos.\n\n### GRAPH\nLenguaje de programacion secuencial para procesos paso a paso."
            },
            {
              type: "diagram",
              title: "Comparacion de lenguajes",
              content: `┌─────────────────────────────────────────────────────────────────┐
│  Ejemplo: Q0.0 = I0.0 AND I0.1                                  │
│                                                                  │
│  LAD:     ──| |────| |────────────────────────( )──             │
│             I0.0    I0.1                        Q0.0             │
│                                                                  │
│  FBD:     ┌─────┐                                               │
│           │ AND │                                               │
│     I0.0──┤     ├───Q0.0                                        │
│     I0.1──┤     │                                               │
│           └─────┘                                               │
│                                                                  │
│  SCL:     IF I0.0 AND I0.1 THEN                                 │
│              Q0.0 := TRUE;                                      │
│           END_IF;                                               │
└─────────────────────────────────────────────────────────────────┘`
            },
            {
              type: "warning",
              content: "Elija el lenguaje segun la tarea: LAD para logica, SCL para matematicas, GRAPH para secuencias."
            }
          ]
        })
      },
      "Variables et types de donnees": {
        title: "Variables y tipos de datos",
        description: "Declarar y usar variables en TIA Portal",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Variables y tipos de datos\n\nLas variables (tags) permiten dar nombres simbolicos a las direcciones de memoria."
            },
            {
              type: "text",
              content: "## Tipos de datos elementales\n\n| Tipo | Tamano | Rango | Ejemplo |\n|------|--------|-------|--------|\n| Bool | 1 bit | TRUE/FALSE | Sensor_Presencia |\n| Byte | 8 bits | 0-255 | Codigo_Error |\n| Int | 16 bits | -32768 a 32767 | Contador_Piezas |\n| DInt | 32 bits | +/-2 mil millones | Total_Produccion |\n| Real | 32 bits | Decimales | Temperatura |\n| Time | 32 bits | T#0ms a T#24d | Tiempo_Ciclo |\n| String | Variable | Texto | Nombre_Producto |"
            },
            {
              type: "text",
              content: "## Tablas de variables\n\n### Variables PLC (PLC Tags)\nVariables globales accesibles desde cualquier parte del programa.\n\n### Variables locales\nVariables internas a un bloque (FC, FB), no accesibles desde el exterior.\n\n### Constantes\nValores fijos que no cambian durante la ejecucion."
            },
            {
              type: "text",
              content: "## Ejemplo de declaracion\n\n```\nNombre            Tipo    Direccion  Comentario\n─────────────────────────────────────────────────\nBoton_Arranque    Bool    %I0.0      Boton START\nBoton_Paro        Bool    %I0.1      Boton STOP\nMotor_Marcha      Bool    %Q0.0      Salida motor\nVelocidad_Consigna Int    %MW10      Velocidad en RPM\nTemperatura       Real    %MD20      Temperatura C\n```"
            },
            {
              type: "info",
              content: "Utilice siempre nombres simbolicos en lugar de direcciones absolutas. Esto hace el programa mas legible y facil de mantener."
            }
          ]
        })
      },
      "Instructions LAD de base": {
        title: "Instrucciones LAD basicas",
        description: "Instrucciones fundamentales en lenguaje LADDER",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Instrucciones LAD basicas\n\nEl lenguaje LAD (Diagrama de Escalera) representa la logica como un diagrama electrico."
            },
            {
              type: "diagram",
              title: "Elementos LAD basicos",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    ELEMENTOS LAD                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTACTOS                     BOBINAS                       │
│                                                              │
│  ─┤ ├─  Contacto NA            ─( )─   Bobina simple        │
│         (Normalmente Abierto)                                │
│                                                              │
│  ─┤/├─  Contacto NC            ─(/)─   Bobina invertida     │
│         (Normalmente Cerrado)                                │
│                                                              │
│  ─┤P├─  Flanco ascendente      ─(S)─   Bobina Set (encl.)   │
│                                                              │
│  ─┤N├─  Flanco descendente     ─(R)─   Bobina Reset         │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Ejemplo: Circuito Marcha/Paro\n\n```\n|     Start      Stop       Motor          Motor     |\n|----[ ]----+---[/]----------( )---------------------|\n|           |                                         |\n|   Motor   |                                         |\n|----[ ]----+                                         |\n|                                                     |\n```\n\nEl motor arranca con Start y se autoencla. Stop lo detiene."
            },
            {
              type: "text",
              content: "## Funciones comunes\n\n| Bloque | Funcion |\n|------|----------|\n| MOVE | Copiar un valor |\n| ADD, SUB, MUL, DIV | Operaciones aritmeticas |\n| CMP (>, <, =) | Comparaciones |\n| TON | Temporizador al encendido |\n| CTU | Contador incremental |"
            },
            {
              type: "warning",
              content: "En LAD, el flujo de energia va de izquierda a derecha. Una bobina solo puede activarse si todos los contactos de su linea estan conduciendo."
            }
          ]
        })
      },
      "Temporisateurs et compteurs": {
        title: "Temporizadores y contadores",
        description: "Usar TON, TOF, TP y contadores CTU, CTD",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Temporizadores y contadores\n\nLos temporizadores y contadores son esenciales para gestionar el tiempo y contar eventos."
            },
            {
              type: "text",
              content: "## Tipos de temporizadores\n\n| Tipo | Nombre | Comportamiento |\n|------|-----|-------------|\n| TON | Timer On Delay | Retrasa la activacion |\n| TOF | Timer Off Delay | Retrasa la desactivacion |\n| TP | Timer Pulse | Genera un pulso |"
            },
            {
              type: "diagram",
              title: "Cronogramas",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    TEMPORIZADORES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TON (Timer On Delay)         TOF (Timer Off Delay)         │
│                                                              │
│  IN  ────┐     ┌────          IN  ────┐     ┌────           │
│          │     │                      │     │               │
│          └─────┘                      └─────┘               │
│                                                              │
│  Q       ─┐  ┌────            Q   ────┐     ┌─               │
│           │  │  ↑ PT                  │     │  ↑ PT         │
│           └──┘                        └─────┘               │
│                                                              │
│  TP (Timer Pulse)                                           │
│                                                              │
│  IN  ────┐     ┌────                                        │
│          │     │                                            │
│          └─────┘                                            │
│                                                              │
│  Q   ────┐  ┌────                                           │
│          │  │ PT (duracion fija)                            │
│          └──┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Contadores\n\n| Tipo | Funcion | Accion |\n|------|----------|--------|\n| CTU | Counter Up | Incrementa en cada flanco ascendente |\n| CTD | Counter Down | Decrementa en cada flanco ascendente |\n| CTUD | Counter Up/Down | Cuenta en ambas direcciones |"
            },
            {
              type: "text",
              content: "## Ejemplo SCL\n\n```pascal\n// Temporizador TON\n\"Timer_1\".TON(IN := Start,\n               PT := T#5s,\n               Q => Salida,\n               ET => Tiempo_Transcurrido);\n\n// Contador CTU\n\"Counter_1\".CTU(CU := Sensor,\n                R := Reset,\n                PV := 100,\n                Q => Objetivo_Alcanzado,\n                CV => Valor_Contador);\n```"
            }
          ]
        })
      },
      "Mise en service et debogage": {
        title: "Puesta en servicio y depuracion",
        description: "Cargar el programa y usar las herramientas de depuracion",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Puesta en servicio y depuracion\n\nUna vez escrito el programa, hay que cargarlo en el automata y probarlo."
            },
            {
              type: "text",
              content: "## Pasos de puesta en servicio\n\n1. **Compilar**: Verificar errores de sintaxis\n2. **Establecer conexion**: Via Ethernet o USB\n3. **Cargar hardware**: Configuracion del automata\n4. **Cargar programa**: Bloques y datos\n5. **Pasar a RUN**: Iniciar la ejecucion\n6. **Probar**: Verificar el funcionamiento"
            },
            {
              type: "text",
              content: "## Herramientas de depuracion\n\n### Visualizacion en linea\n- Observar el estado de las variables en tiempo real\n- Ver el flujo de energia en LAD (lineas verdes)\n\n### Tablas de visualizacion\n- Crear listas de variables a supervisar\n- Modificar valores para las pruebas\n\n### Forzado\n- Forzar entradas para probar sin sensores\n- Forzar salidas para probar actuadores"
            },
            {
              type: "diagram",
              title: "Modos de la CPU",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    MODOS DE LA CPU                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────┐      ┌─────────┐      ┌─────────┐           │
│    │  STOP   │ ──── │ STARTUP │ ──── │   RUN   │           │
│    │         │      │         │      │         │           │
│    │ Programa│      │  OB100  │      │ Programa│           │
│    │ inactivo│      │ejecutado│      │  activo │           │
│    └─────────┘      └─────────┘      └─────────┘           │
│         ▲                                  │                 │
│         │                                  │                 │
│         └──────────── ERROR ───────────────┘                │
│                                                              │
│    STOP -> RUN : Arranque con OB100                          │
│    RUN -> STOP : Parada del programa                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "warning",
              content: "Nunca fuerce salidas en una maquina en produccion sin haber asegurado la zona. Los movimientos pueden ser peligrosos."
            }
          ]
        })
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Creer un projet TIA Portal (5 questions)
    [
      {
        question: "Quelle est la premiere etape pour creer un projet TIA Portal ?",
        options: [
          "Ecrire le programme",
          "Creer un nouveau projet et configurer le materiel",
          "Connecter l'automate",
          "Compiler le programme"
        ],
        correctIndex: 1,
        explanation: "On commence toujours par creer un projet puis configurer le materiel (CPU, modules E/S) avant de programmer.",
        order: 1
      },
      {
        question: "Qu'est-ce que le HW Config dans TIA Portal ?",
        options: [
          "L'editeur de programme",
          "La configuration materielle",
          "Le simulateur",
          "Le diagnostic en ligne"
        ],
        correctIndex: 1,
        explanation: "HW Config (Hardware Configuration) permet de definir la configuration materielle : CPU, modules, adresses.",
        order: 2
      },
      {
        question: "Pourquoi est-il important de choisir la reference exacte de la CPU ?",
        options: [
          "Pour le design du projet",
          "Les programmes ne sont pas toujours compatibles entre versions",
          "C'est obligatoire pour la licence",
          "Pour accelerer la compilation"
        ],
        correctIndex: 1,
        explanation: "Les programmes ne sont pas toujours compatibles entre differentes versions de CPU. Il faut choisir la reference exacte.",
        order: 3
      },
      {
        question: "Ou se trouve l'arborescence des blocs de programme dans TIA Portal ?",
        options: [
          "Dans le menu Outils",
          "Dans l'arbre du projet, sous l'appareil PLC",
          "Dans la barre des taches",
          "Dans les proprietes de la CPU"
        ],
        correctIndex: 1,
        explanation: "Les blocs de programme se trouvent dans l'arbre du projet, sous l'appareil PLC > Blocs de programme.",
        order: 4
      },
      {
        question: "Que doit-on faire avant de charger un programme dans l'automate ?",
        options: [
          "Redemarrer l'ordinateur",
          "Compiler le projet",
          "Fermer TIA Portal",
          "Effacer la memoire"
        ],
        correctIndex: 1,
        explanation: "Il faut compiler le projet pour verifier les erreurs et generer le code executable avant de le charger.",
        order: 5
      }
    ],
    // Lesson 2: Langages de programmation S7 (5 questions)
    [
      {
        question: "Quel langage utilise des contacts et bobines comme un schema electrique ?",
        options: [
          "SCL",
          "FBD",
          "LAD (LADDER)",
          "GRAPH"
        ],
        correctIndex: 2,
        explanation: "LAD (Ladder Diagram) represente la logique avec des contacts et bobines comme un schema a relais.",
        order: 1
      },
      {
        question: "Quel langage est similaire au Pascal et permet des calculs complexes ?",
        options: [
          "LAD",
          "FBD",
          "SCL",
          "GRAPH"
        ],
        correctIndex: 2,
        explanation: "SCL (Structured Control Language) est un langage textuel de haut niveau similaire au Pascal, ideal pour les algorithmes.",
        order: 2
      },
      {
        question: "Quel langage utilise des blocs graphiques relies entre eux ?",
        options: [
          "LAD",
          "FBD (Function Block Diagram)",
          "SCL",
          "GRAPH"
        ],
        correctIndex: 1,
        explanation: "FBD utilise des blocs fonctionnels graphiques interconnectes, ideal pour le traitement du signal et la regulation.",
        order: 3
      },
      {
        question: "Quel langage est specialise pour la programmation sequentielle type GRAFCET ?",
        options: [
          "LAD",
          "FBD",
          "SCL",
          "GRAPH"
        ],
        correctIndex: 3,
        explanation: "GRAPH permet de programmer des sequences de type GRAFCET avec des etapes et transitions.",
        order: 4
      },
      {
        question: "Quelle norme definit les langages de programmation des automates comme LAD, FBD, SCL ?",
        options: [
          "ISO 9001",
          "IEC 61131-3",
          "EN 60204",
          "IEEE 802.3"
        ],
        correctIndex: 1,
        explanation: "La norme IEC 61131-3 definit les langages de programmation standards pour les automates programmables.",
        order: 5
      }
    ],
    // Lesson 3: Variables et types de donnees (5 questions)
    [
      {
        question: "Quelle est la plage d'un type Int en S7 ?",
        options: [
          "0 a 255",
          "-32768 a 32767",
          "0 a 65535",
          "-128 a 127"
        ],
        correctIndex: 1,
        explanation: "Le type Int (16 bits signe) a une plage de -32768 a +32767 sur les automates Siemens.",
        order: 1
      },
      {
        question: "Quel type utiliser pour stocker une temperature avec decimales ?",
        options: [
          "Int",
          "DInt",
          "Real",
          "Word"
        ],
        correctIndex: 2,
        explanation: "Le type Real (32 bits flottant) permet de stocker des valeurs decimales comme les temperatures.",
        order: 2
      },
      {
        question: "Que represente %I0.0 ?",
        options: [
          "Sortie 0, bit 0",
          "Entree 0, bit 0",
          "Memento 0, bit 0",
          "Data block 0, bit 0"
        ],
        correctIndex: 1,
        explanation: "%I represente les entrees (Input). I0.0 est l'entree numero 0, bit 0 (premiere entree).",
        order: 3
      },
      {
        question: "Quelle est la difference entre variables API et variables locales ?",
        options: [
          "Il n'y a pas de difference",
          "Les API sont globales, les locales sont internes a un bloc",
          "Les locales sont plus rapides",
          "Les API sont en lecture seule"
        ],
        correctIndex: 1,
        explanation: "Les variables API (PLC Tags) sont globales et accessibles partout, les locales sont confinees a un bloc.",
        order: 4
      },
      {
        question: "Pourquoi privilegier les noms symboliques aux adresses absolues ?",
        options: [
          "C'est plus rapide",
          "Cela ameliore la lisibilite et la maintenance",
          "C'est obligatoire",
          "Cela reduit la taille du programme"
        ],
        correctIndex: 1,
        explanation: "Les noms symboliques rendent le programme lisible et facilitent la maintenance, sans impact sur les performances.",
        order: 5
      }
    ],
    // Lesson 4: Instructions LAD de base (5 questions)
    [
      {
        question: "Que represente le symbole --[ ]-- en LAD ?",
        options: [
          "Une bobine",
          "Un contact normalement ouvert",
          "Un contact normalement ferme",
          "Une temporisation"
        ],
        correctIndex: 1,
        explanation: "--[ ]-- represente un contact normalement ouvert (NO) qui laisse passer le courant quand l'entree est vraie.",
        order: 1
      },
      {
        question: "Que fait une bobine Set --(S)-- ?",
        options: [
          "Active la sortie tant que l'entree est vraie",
          "Memorise l'etat a 1 meme si l'entree redevient fausse",
          "Inverse l'etat de la sortie",
          "Desactive la sortie"
        ],
        correctIndex: 1,
        explanation: "La bobine Set memorise l'etat a 1 (SET). Elle reste active meme si la condition d'entree disparait.",
        order: 2
      },
      {
        question: "Comment realiser un auto-maintien en LAD ?",
        options: [
          "Avec une bobine Set",
          "Avec un contact de la sortie en parallele du bouton Start",
          "Avec une temporisation",
          "C'est impossible en LAD"
        ],
        correctIndex: 1,
        explanation: "L'auto-maintien se realise en mettant un contact de la sortie en parallele du bouton de demarrage.",
        order: 3
      },
      {
        question: "Que detecte un contact --[P]-- ?",
        options: [
          "Un etat permanent",
          "Un front montant (passage de 0 a 1)",
          "Un front descendant",
          "Une impulsion"
        ],
        correctIndex: 1,
        explanation: "Le contact P detecte un front montant, generant une impulsion d'un cycle quand l'entree passe de 0 a 1.",
        order: 4
      },
      {
        question: "Dans quel sens circule le flux d'energie en LAD ?",
        options: [
          "De droite a gauche",
          "De gauche a droite",
          "De haut en bas",
          "Dans les deux sens"
        ],
        correctIndex: 1,
        explanation: "En LAD, le flux d'energie circule de gauche (barre d'alimentation) vers la droite (bobines).",
        order: 5
      }
    ],
    // Lesson 5: Temporisateurs et compteurs (5 questions)
    [
      {
        question: "Que fait un temporisateur TON ?",
        options: [
          "Retarde la desactivation",
          "Retarde l'activation",
          "Genere une impulsion de duree fixe",
          "Compte des evenements"
        ],
        correctIndex: 1,
        explanation: "TON (Timer On Delay) retarde l'activation de la sortie : Q devient vrai apres que IN soit reste vrai pendant PT.",
        order: 1
      },
      {
        question: "Quelle est la difference entre TOF et TON ?",
        options: [
          "TOF est plus rapide",
          "TOF retarde la desactivation, TON retarde l'activation",
          "TOF compte en decrementant",
          "Il n'y a pas de difference"
        ],
        correctIndex: 1,
        explanation: "TON retarde l'activation (ON delay), TOF retarde la desactivation (OFF delay) de la sortie.",
        order: 2
      },
      {
        question: "Que represente PT dans un temporisateur ?",
        options: [
          "Le temps ecoule",
          "Le temps de preset (consigne)",
          "La periode",
          "Le temps de cycle"
        ],
        correctIndex: 1,
        explanation: "PT (Preset Time) est le temps de consigne, la duree que doit atteindre le temporisateur.",
        order: 3
      },
      {
        question: "Que fait un compteur CTU a chaque front montant sur CU ?",
        options: [
          "Il se reinitialise",
          "Il incremente sa valeur",
          "Il decremente sa valeur",
          "Il change d'etat"
        ],
        correctIndex: 1,
        explanation: "CTU (Counter Up) incremente sa valeur CV de 1 a chaque front montant sur l'entree CU.",
        order: 4
      },
      {
        question: "Quand la sortie Q d'un CTU devient-elle vraie ?",
        options: [
          "A chaque incrementation",
          "Quand CV atteint ou depasse PV",
          "Quand CV atteint zero",
          "A chaque front montant"
        ],
        correctIndex: 1,
        explanation: "La sortie Q devient vraie quand la valeur courante CV atteint ou depasse la valeur de preset PV.",
        order: 5
      }
    ],
    // Lesson 6: Mise en service et debogage (5 questions)
    [
      {
        question: "Quelle est la premiere etape de mise en service ?",
        options: [
          "Charger le programme",
          "Passer en RUN",
          "Compiler le projet",
          "Tester les E/S"
        ],
        correctIndex: 2,
        explanation: "La compilation verifie les erreurs de syntaxe et prepare le projet avant tout chargement.",
        order: 1
      },
      {
        question: "Que permettent les tables de visualisation ?",
        options: [
          "Modifier le programme",
          "Surveiller et modifier des variables en temps reel",
          "Configurer le materiel",
          "Compiler le projet"
        ],
        correctIndex: 1,
        explanation: "Les tables de visualisation permettent de surveiller des variables et de modifier leurs valeurs pour les tests.",
        order: 2
      },
      {
        question: "Quel OB s'execute au demarrage de la CPU ?",
        options: [
          "OB1",
          "OB80",
          "OB100",
          "OB121"
        ],
        correctIndex: 2,
        explanation: "OB100 (Startup) s'execute une fois au passage de STOP a RUN, avant que OB1 ne commence son cycle.",
        order: 3
      },
      {
        question: "Que signifient les lignes vertes en visualisation LAD ?",
        options: [
          "Une erreur de syntaxe",
          "Le flux d'energie passe (condition vraie)",
          "La ligne est selectionnee",
          "Un commentaire"
        ],
        correctIndex: 1,
        explanation: "Les lignes vertes en visualisation indiquent que le flux d'energie passe, les conditions sont vraies.",
        order: 4
      },
      {
        question: "Pourquoi est-il dangereux de forcer des sorties en production ?",
        options: [
          "Cela use les sorties",
          "Cela peut provoquer des mouvements inattendus",
          "Cela efface le programme",
          "Cela deconnecte le reseau"
        ],
        correctIndex: 1,
        explanation: "Forcer des sorties peut activer des actionneurs de maniere inattendue, creant des situations dangereuses.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      "Quelle est la premiere etape pour creer un projet TIA Portal ?": {
        question: "What is the first step to create a TIA Portal project?",
        options: ["Write the program", "Create a new project and configure hardware", "Connect the PLC", "Compile the program"],
        explanation: "You always start by creating a project then configuring hardware (CPU, I/O modules) before programming."
      },
      "Qu'est-ce que le HW Config dans TIA Portal ?": {
        question: "What is HW Config in TIA Portal?",
        options: ["The program editor", "Hardware configuration", "The simulator", "Online diagnostics"],
        explanation: "HW Config (Hardware Configuration) allows you to define the hardware configuration: CPU, modules, addresses."
      },
      "Pourquoi est-il important de choisir la reference exacte de la CPU ?": {
        question: "Why is it important to choose the exact CPU reference?",
        options: ["For project design", "Programs are not always compatible between versions", "It's required for the license", "To speed up compilation"],
        explanation: "Programs are not always compatible between different CPU versions. You must choose the exact reference."
      },
      "Ou se trouve l'arborescence des blocs de programme dans TIA Portal ?": {
        question: "Where is the program blocks tree located in TIA Portal?",
        options: ["In the Tools menu", "In the project tree, under the PLC device", "In the taskbar", "In the CPU properties"],
        explanation: "Program blocks are located in the project tree, under PLC device > Program blocks."
      },
      "Que doit-on faire avant de charger un programme dans l'automate ?": {
        question: "What must be done before downloading a program to the PLC?",
        options: ["Restart the computer", "Compile the project", "Close TIA Portal", "Clear memory"],
        explanation: "You must compile the project to check for errors and generate executable code before downloading."
      },
      "Quel langage utilise des contacts et bobines comme un schema electrique ?": {
        question: "Which language uses contacts and coils like an electrical diagram?",
        options: ["SCL", "FBD", "LAD (LADDER)", "GRAPH"],
        explanation: "LAD (Ladder Diagram) represents logic with contacts and coils like a relay diagram."
      },
      "Quel langage est similaire au Pascal et permet des calculs complexes ?": {
        question: "Which language is similar to Pascal and allows complex calculations?",
        options: ["LAD", "FBD", "SCL", "GRAPH"],
        explanation: "SCL (Structured Control Language) is a high-level textual language similar to Pascal, ideal for algorithms."
      },
      "Quel langage utilise des blocs graphiques relies entre eux ?": {
        question: "Which language uses graphical blocks connected together?",
        options: ["LAD", "FBD (Function Block Diagram)", "SCL", "GRAPH"],
        explanation: "FBD uses interconnected graphical function blocks, ideal for signal processing and regulation."
      },
      "Quel langage est specialise pour la programmation sequentielle type GRAFCET ?": {
        question: "Which language is specialized for GRAFCET-type sequential programming?",
        options: ["LAD", "FBD", "SCL", "GRAPH"],
        explanation: "GRAPH allows programming GRAFCET-type sequences with steps and transitions."
      },
      "Quelle norme definit les langages de programmation des automates comme LAD, FBD, SCL ?": {
        question: "Which standard defines PLC programming languages like LAD, FBD, SCL?",
        options: ["ISO 9001", "IEC 61131-3", "EN 60204", "IEEE 802.3"],
        explanation: "The IEC 61131-3 standard defines the standard programming languages for programmable logic controllers."
      },
      "Quelle est la plage d'un type Int en S7 ?": {
        question: "What is the range of an Int type in S7?",
        options: ["0 to 255", "-32768 to 32767", "0 to 65535", "-128 to 127"],
        explanation: "The Int type (16-bit signed) has a range of -32768 to +32767 on Siemens PLCs."
      },
      "Quel type utiliser pour stocker une temperature avec decimales ?": {
        question: "Which type should be used to store a temperature with decimals?",
        options: ["Int", "DInt", "Real", "Word"],
        explanation: "The Real type (32-bit floating point) allows storing decimal values like temperatures."
      },
      "Que represente %I0.0 ?": {
        question: "What does %I0.0 represent?",
        options: ["Output 0, bit 0", "Input 0, bit 0", "Memory bit 0, bit 0", "Data block 0, bit 0"],
        explanation: "%I represents inputs. I0.0 is input number 0, bit 0 (first input)."
      },
      "Quelle est la difference entre variables API et variables locales ?": {
        question: "What is the difference between PLC tags and local variables?",
        options: ["There is no difference", "PLC tags are global, local variables are internal to a block", "Local variables are faster", "PLC tags are read-only"],
        explanation: "PLC tags are global and accessible everywhere, local variables are confined to a block."
      },
      "Pourquoi privilegier les noms symboliques aux adresses absolues ?": {
        question: "Why prefer symbolic names over absolute addresses?",
        options: ["It's faster", "It improves readability and maintenance", "It's mandatory", "It reduces program size"],
        explanation: "Symbolic names make the program readable and facilitate maintenance, with no impact on performance."
      },
      "Que represente le symbole --[ ]-- en LAD ?": {
        question: "What does the symbol --[ ]-- represent in LAD?",
        options: ["A coil", "A normally open contact", "A normally closed contact", "A timer"],
        explanation: "--[ ]-- represents a normally open (NO) contact that allows current when the input is true."
      },
      "Que fait une bobine Set --(S)-- ?": {
        question: "What does a Set coil --(S)-- do?",
        options: ["Activates output while input is true", "Latches the state to 1 even if input becomes false", "Inverts the output state", "Deactivates the output"],
        explanation: "The Set coil latches the state to 1 (SET). It remains active even if the input condition disappears."
      },
      "Comment realiser un auto-maintien en LAD ?": {
        question: "How do you create self-holding in LAD?",
        options: ["With a Set coil", "With an output contact in parallel with the Start button", "With a timer", "It's impossible in LAD"],
        explanation: "Self-holding is achieved by placing an output contact in parallel with the start button."
      },
      "Que detecte un contact --[P]-- ?": {
        question: "What does a --[P]-- contact detect?",
        options: ["A permanent state", "A rising edge (transition from 0 to 1)", "A falling edge", "A pulse"],
        explanation: "The P contact detects a rising edge, generating a one-cycle pulse when the input goes from 0 to 1."
      },
      "Dans quel sens circule le flux d'energie en LAD ?": {
        question: "In which direction does energy flow in LAD?",
        options: ["Right to left", "Left to right", "Top to bottom", "Both directions"],
        explanation: "In LAD, energy flows from left (power rail) to right (coils)."
      },
      "Que fait un temporisateur TON ?": {
        question: "What does a TON timer do?",
        options: ["Delays deactivation", "Delays activation", "Generates a fixed-duration pulse", "Counts events"],
        explanation: "TON (Timer On Delay) delays output activation: Q becomes true after IN has been true for PT."
      },
      "Quelle est la difference entre TOF et TON ?": {
        question: "What is the difference between TOF and TON?",
        options: ["TOF is faster", "TOF delays deactivation, TON delays activation", "TOF counts down", "There is no difference"],
        explanation: "TON delays activation (ON delay), TOF delays deactivation (OFF delay) of the output."
      },
      "Que represente PT dans un temporisateur ?": {
        question: "What does PT represent in a timer?",
        options: ["Elapsed time", "Preset time (setpoint)", "Period", "Cycle time"],
        explanation: "PT (Preset Time) is the time setpoint, the duration the timer must reach."
      },
      "Que fait un compteur CTU a chaque front montant sur CU ?": {
        question: "What does a CTU counter do on each rising edge on CU?",
        options: ["It resets", "It increments its value", "It decrements its value", "It changes state"],
        explanation: "CTU (Counter Up) increments its CV value by 1 on each rising edge on the CU input."
      },
      "Quand la sortie Q d'un CTU devient-elle vraie ?": {
        question: "When does the Q output of a CTU become true?",
        options: ["On each increment", "When CV reaches or exceeds PV", "When CV reaches zero", "On each rising edge"],
        explanation: "The Q output becomes true when the current value CV reaches or exceeds the preset value PV."
      },
      "Quelle est la premiere etape de mise en service ?": {
        question: "What is the first commissioning step?",
        options: ["Download the program", "Switch to RUN", "Compile the project", "Test I/O"],
        explanation: "Compilation checks for syntax errors and prepares the project before any download."
      },
      "Que permettent les tables de visualisation ?": {
        question: "What do watch tables allow?",
        options: ["Modify the program", "Monitor and modify variables in real-time", "Configure hardware", "Compile the project"],
        explanation: "Watch tables allow monitoring variables and modifying their values for testing."
      },
      "Quel OB s'execute au demarrage de la CPU ?": {
        question: "Which OB executes at CPU startup?",
        options: ["OB1", "OB80", "OB100", "OB121"],
        explanation: "OB100 (Startup) executes once when transitioning from STOP to RUN, before OB1 begins its cycle."
      },
      "Que signifient les lignes vertes en visualisation LAD ?": {
        question: "What do green lines mean in LAD visualization?",
        options: ["A syntax error", "Power flow passes (condition true)", "The line is selected", "A comment"],
        explanation: "Green lines in visualization indicate that power flow passes, conditions are true."
      },
      "Pourquoi est-il dangereux de forcer des sorties en production ?": {
        question: "Why is it dangerous to force outputs in production?",
        options: ["It wears out the outputs", "It can cause unexpected movements", "It erases the program", "It disconnects the network"],
        explanation: "Forcing outputs can activate actuators unexpectedly, creating dangerous situations."
      }
    },
    es: {
      "Quelle est la premiere etape pour creer un projet TIA Portal ?": {
        question: "Cual es el primer paso para crear un proyecto TIA Portal?",
        options: ["Escribir el programa", "Crear un nuevo proyecto y configurar el hardware", "Conectar el PLC", "Compilar el programa"],
        explanation: "Siempre se comienza creando un proyecto y configurando el hardware (CPU, modulos E/S) antes de programar."
      },
      "Qu'est-ce que le HW Config dans TIA Portal ?": {
        question: "Que es HW Config en TIA Portal?",
        options: ["El editor de programa", "Configuracion de hardware", "El simulador", "Diagnostico en linea"],
        explanation: "HW Config (Hardware Configuration) permite definir la configuracion de hardware: CPU, modulos, direcciones."
      },
      "Pourquoi est-il important de choisir la reference exacte de la CPU ?": {
        question: "Por que es importante elegir la referencia exacta de la CPU?",
        options: ["Para el diseno del proyecto", "Los programas no siempre son compatibles entre versiones", "Es obligatorio para la licencia", "Para acelerar la compilacion"],
        explanation: "Los programas no siempre son compatibles entre diferentes versiones de CPU. Hay que elegir la referencia exacta."
      },
      "Ou se trouve l'arborescence des blocs de programme dans TIA Portal ?": {
        question: "Donde se encuentra el arbol de bloques de programa en TIA Portal?",
        options: ["En el menu Herramientas", "En el arbol del proyecto, bajo el dispositivo PLC", "En la barra de tareas", "En las propiedades de la CPU"],
        explanation: "Los bloques de programa se encuentran en el arbol del proyecto, bajo dispositivo PLC > Bloques de programa."
      },
      "Que doit-on faire avant de charger un programme dans l'automate ?": {
        question: "Que se debe hacer antes de cargar un programa en el automata?",
        options: ["Reiniciar el ordenador", "Compilar el proyecto", "Cerrar TIA Portal", "Borrar la memoria"],
        explanation: "Hay que compilar el proyecto para verificar errores y generar el codigo ejecutable antes de cargarlo."
      },
      "Quel langage utilise des contacts et bobines comme un schema electrique ?": {
        question: "Que lenguaje usa contactos y bobinas como un esquema electrico?",
        options: ["SCL", "FBD", "LAD (LADDER)", "GRAPH"],
        explanation: "LAD (Diagrama de Escalera) representa la logica con contactos y bobinas como un diagrama de reles."
      },
      "Quel langage est similaire au Pascal et permet des calculs complexes ?": {
        question: "Que lenguaje es similar a Pascal y permite calculos complejos?",
        options: ["LAD", "FBD", "SCL", "GRAPH"],
        explanation: "SCL (Lenguaje de Control Estructurado) es un lenguaje textual de alto nivel similar a Pascal, ideal para algoritmos."
      },
      "Quel langage utilise des blocs graphiques relies entre eux ?": {
        question: "Que lenguaje usa bloques graficos conectados entre si?",
        options: ["LAD", "FBD (Function Block Diagram)", "SCL", "GRAPH"],
        explanation: "FBD usa bloques funcionales graficos interconectados, ideal para procesamiento de senales y regulacion."
      },
      "Quel langage est specialise pour la programmation sequentielle type GRAFCET ?": {
        question: "Que lenguaje esta especializado para programacion secuencial tipo GRAFCET?",
        options: ["LAD", "FBD", "SCL", "GRAPH"],
        explanation: "GRAPH permite programar secuencias tipo GRAFCET con etapas y transiciones."
      },
      "Quelle norme definit les langages de programmation des automates comme LAD, FBD, SCL ?": {
        question: "Que norma define los lenguajes de programacion de automatas como LAD, FBD, SCL?",
        options: ["ISO 9001", "IEC 61131-3", "EN 60204", "IEEE 802.3"],
        explanation: "La norma IEC 61131-3 define los lenguajes de programacion estandar para automatas programables."
      },
      "Quelle est la plage d'un type Int en S7 ?": {
        question: "Cual es el rango de un tipo Int en S7?",
        options: ["0 a 255", "-32768 a 32767", "0 a 65535", "-128 a 127"],
        explanation: "El tipo Int (16 bits con signo) tiene un rango de -32768 a +32767 en automatas Siemens."
      },
      "Quel type utiliser pour stocker une temperature avec decimales ?": {
        question: "Que tipo usar para almacenar una temperatura con decimales?",
        options: ["Int", "DInt", "Real", "Word"],
        explanation: "El tipo Real (32 bits flotante) permite almacenar valores decimales como temperaturas."
      },
      "Que represente %I0.0 ?": {
        question: "Que representa %I0.0?",
        options: ["Salida 0, bit 0", "Entrada 0, bit 0", "Memoria 0, bit 0", "Bloque de datos 0, bit 0"],
        explanation: "%I representa las entradas (Input). I0.0 es la entrada numero 0, bit 0 (primera entrada)."
      },
      "Quelle est la difference entre variables API et variables locales ?": {
        question: "Cual es la diferencia entre variables PLC y variables locales?",
        options: ["No hay diferencia", "Las PLC son globales, las locales son internas a un bloque", "Las locales son mas rapidas", "Las PLC son de solo lectura"],
        explanation: "Las variables PLC (PLC Tags) son globales y accesibles en todas partes, las locales estan confinadas a un bloque."
      },
      "Pourquoi privilegier les noms symboliques aux adresses absolues ?": {
        question: "Por que preferir nombres simbolicos a direcciones absolutas?",
        options: ["Es mas rapido", "Mejora la legibilidad y el mantenimiento", "Es obligatorio", "Reduce el tamano del programa"],
        explanation: "Los nombres simbolicos hacen el programa legible y facilitan el mantenimiento, sin impacto en el rendimiento."
      },
      "Que represente le symbole --[ ]-- en LAD ?": {
        question: "Que representa el simbolo --[ ]-- en LAD?",
        options: ["Una bobina", "Un contacto normalmente abierto", "Un contacto normalmente cerrado", "Un temporizador"],
        explanation: "--[ ]-- representa un contacto normalmente abierto (NA) que deja pasar corriente cuando la entrada es verdadera."
      },
      "Que fait une bobine Set --(S)-- ?": {
        question: "Que hace una bobina Set --(S)--?",
        options: ["Activa la salida mientras la entrada es verdadera", "Memoriza el estado a 1 aunque la entrada vuelva a ser falsa", "Invierte el estado de la salida", "Desactiva la salida"],
        explanation: "La bobina Set memoriza el estado a 1 (SET). Permanece activa aunque la condicion de entrada desaparezca."
      },
      "Comment realiser un auto-maintien en LAD ?": {
        question: "Como realizar un autoenclavamiento en LAD?",
        options: ["Con una bobina Set", "Con un contacto de la salida en paralelo con el boton Start", "Con un temporizador", "Es imposible en LAD"],
        explanation: "El autoenclavamiento se realiza poniendo un contacto de la salida en paralelo con el boton de arranque."
      },
      "Que detecte un contact --[P]-- ?": {
        question: "Que detecta un contacto --[P]--?",
        options: ["Un estado permanente", "Un flanco ascendente (paso de 0 a 1)", "Un flanco descendente", "Un pulso"],
        explanation: "El contacto P detecta un flanco ascendente, generando un pulso de un ciclo cuando la entrada pasa de 0 a 1."
      },
      "Dans quel sens circule le flux d'energie en LAD ?": {
        question: "En que sentido circula el flujo de energia en LAD?",
        options: ["De derecha a izquierda", "De izquierda a derecha", "De arriba a abajo", "En ambos sentidos"],
        explanation: "En LAD, el flujo de energia circula de izquierda (barra de alimentacion) hacia la derecha (bobinas)."
      },
      "Que fait un temporisateur TON ?": {
        question: "Que hace un temporizador TON?",
        options: ["Retrasa la desactivacion", "Retrasa la activacion", "Genera un pulso de duracion fija", "Cuenta eventos"],
        explanation: "TON (Timer On Delay) retrasa la activacion de la salida: Q se vuelve verdadero despues de que IN haya sido verdadero durante PT."
      },
      "Quelle est la difference entre TOF et TON ?": {
        question: "Cual es la diferencia entre TOF y TON?",
        options: ["TOF es mas rapido", "TOF retrasa la desactivacion, TON retrasa la activacion", "TOF cuenta decrementando", "No hay diferencia"],
        explanation: "TON retrasa la activacion (ON delay), TOF retrasa la desactivacion (OFF delay) de la salida."
      },
      "Que represente PT dans un temporisateur ?": {
        question: "Que representa PT en un temporizador?",
        options: ["El tiempo transcurrido", "El tiempo de preset (consigna)", "El periodo", "El tiempo de ciclo"],
        explanation: "PT (Preset Time) es el tiempo de consigna, la duracion que debe alcanzar el temporizador."
      },
      "Que fait un compteur CTU a chaque front montant sur CU ?": {
        question: "Que hace un contador CTU en cada flanco ascendente en CU?",
        options: ["Se reinicializa", "Incrementa su valor", "Decrementa su valor", "Cambia de estado"],
        explanation: "CTU (Counter Up) incrementa su valor CV en 1 en cada flanco ascendente en la entrada CU."
      },
      "Quand la sortie Q d'un CTU devient-elle vraie ?": {
        question: "Cuando se vuelve verdadera la salida Q de un CTU?",
        options: ["En cada incremento", "Cuando CV alcanza o supera PV", "Cuando CV alcanza cero", "En cada flanco ascendente"],
        explanation: "La salida Q se vuelve verdadera cuando el valor actual CV alcanza o supera el valor de preset PV."
      },
      "Quelle est la premiere etape de mise en service ?": {
        question: "Cual es el primer paso de puesta en servicio?",
        options: ["Cargar el programa", "Pasar a RUN", "Compilar el proyecto", "Probar las E/S"],
        explanation: "La compilacion verifica los errores de sintaxis y prepara el proyecto antes de cualquier carga."
      },
      "Que permettent les tables de visualisation ?": {
        question: "Que permiten las tablas de visualizacion?",
        options: ["Modificar el programa", "Supervisar y modificar variables en tiempo real", "Configurar el hardware", "Compilar el proyecto"],
        explanation: "Las tablas de visualizacion permiten supervisar variables y modificar sus valores para las pruebas."
      },
      "Quel OB s'execute au demarrage de la CPU ?": {
        question: "Que OB se ejecuta al arranque de la CPU?",
        options: ["OB1", "OB80", "OB100", "OB121"],
        explanation: "OB100 (Startup) se ejecuta una vez al pasar de STOP a RUN, antes de que OB1 comience su ciclo."
      },
      "Que signifient les lignes vertes en visualisation LAD ?": {
        question: "Que significan las lineas verdes en visualizacion LAD?",
        options: ["Un error de sintaxis", "El flujo de energia pasa (condicion verdadera)", "La linea esta seleccionada", "Un comentario"],
        explanation: "Las lineas verdes en visualizacion indican que el flujo de energia pasa, las condiciones son verdaderas."
      },
      "Pourquoi est-il dangereux de forcer des sorties en production ?": {
        question: "Por que es peligroso forzar salidas en produccion?",
        options: ["Desgasta las salidas", "Puede provocar movimientos inesperados", "Borra el programa", "Desconecta la red"],
        explanation: "Forzar salidas puede activar actuadores de manera inesperada, creando situaciones peligrosas."
      }
    }
  }
}
