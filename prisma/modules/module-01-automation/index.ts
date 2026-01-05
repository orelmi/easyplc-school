import type { ModuleData } from '../types.js'

export const module01Data: ModuleData = {
  moduleOrder: 1,
  moduleTitle: "Introduction à l'automatisation",
  moduleDescription: "Découvrez les bases de l'automatisation industrielle et des automates programmables",
  moduleTranslations: {
    en: {
      title: "Introduction to Automation",
      description: "Discover the basics of industrial automation and programmable logic controllers"
    },
    es: {
      title: "Introducción a la Automatización",
      description: "Descubra los fundamentos de la automatización industrial y los controladores lógicos programables"
    }
  },
  lessons: [
    // Lesson 1: Qu'est-ce qu'un automate programmable ?
    {
      title: "Qu'est-ce qu'un automate programmable ?",
      description: "Découvrez ce qu'est un PLC et son rôle dans l'industrie",
      order: 1,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Bienvenue dans le monde de l'automatisme !\n\nUn **automate programmable industriel** (API) ou **PLC** (Programmable Logic Controller) est un dispositif électronique programmable destiné à la commande de processus industriels."
          },
          {
            type: "info",
            content: "Le premier automate programmable a été inventé en 1968 par Dick Morley pour General Motors."
          },
          {
            type: "text",
            content: "## Pourquoi utiliser un automate ?\n\n- **Flexibilité** : On peut modifier le programme sans changer le câblage\n- **Fiabilité** : Conçu pour fonctionner 24h/24 en environnement industriel\n- **Diagnostic** : Détection et signalement des pannes\n- **Communication** : Échange de données avec d'autres systèmes"
          },
          {
            type: "diagram",
            title: "Structure d'un automate programmable",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATE PROGRAMMABLE                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ ││
│  │  │         │    │             │    │                 │ ││
│  │  │ ENTRÉES │───▶│     CPU     │───▶│    SORTIES      │ ││
│  │  │  (I)    │    │  (Programme)│    │      (Q)        │ ││
│  │  │         │    │             │    │                 │ ││
│  │  └─────────┘    └─────────────┘    └─────────────────┘ ││
│  │       ▲               │                    │           ││
│  │       │          ┌────┴────┐               ▼           ││
│  │       │          │ MÉMOIRE │         ┌─────────┐       ││
│  │       │          └─────────┘         │ALIMENT. │       ││
│  │       │                              └─────────┘       ││
│  └───────┼──────────────────────────────────────────────┘ │
│          │                                      │          │
└──────────┼──────────────────────────────────────┼──────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  CAPTEURS   │                      │  ACTIONNEURS  │
    │ - Boutons   │                      │ - Moteurs     │
    │ - Détecteurs│                      │ - Vannes      │
    │ - Sondes    │                      │ - Voyants     │
    └─────────────┘                      └───────────────┘`
          },
          {
            type: "text",
            content: "## Les composants principaux\n\n1. **Unité centrale (CPU)** : Le cerveau qui exécute le programme\n2. **Mémoire** : Stocke le programme et les données\n3. **Entrées** : Reçoit les informations des capteurs\n4. **Sorties** : Commande les actionneurs\n5. **Alimentation** : Fournit l'énergie électrique"
          }
        ]
      })
    },
    // Lesson 2: Les entrées et sorties (E/S)
    {
      title: "Les entrées et sorties (E/S)",
      description: "Comprenez le rôle des entrées et sorties dans un automate",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Entrées et Sorties\n\nLes entrées et sorties (E/S ou I/O en anglais) sont l'interface entre l'automate et le monde physique."
          },
          {
            type: "text",
            content: "## Les Entrées (Inputs)\n\nLes entrées reçoivent les informations provenant des **capteurs** :\n\n- Boutons poussoirs\n- Détecteurs de présence\n- Capteurs de température\n- Fins de course\n- Etc."
          },
          {
            type: "warning",
            content: "Les entrées TOR (Tout Ou Rien) ne connaissent que deux états : 0 (faux) ou 1 (vrai)."
          },
          {
            type: "text",
            content: "## Les Sorties (Outputs)\n\nLes sorties commandent les **actionneurs** :\n\n- Voyants lumineux\n- Contacteurs\n- Électrovannes\n- Variateurs de vitesse\n- Etc."
          },
          {
            type: "text",
            content: "## Types d'E/S\n\n| Type | Description | Exemple |\n|------|-------------|----------|\n| TOR | Tout Ou Rien (0 ou 1) | Bouton, voyant |\n| Analogique | Valeur continue | Température, pression |\n| Numérique | Communication série | Codeur, afficheur |"
          }
        ]
      })
    },
    // Lesson 3: Le cycle automate
    {
      title: "Le cycle automate",
      description: "Découvrez comment fonctionne le cycle de l'automate",
      order: 3,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le Cycle Automate\n\nL'automate fonctionne en exécutant un **cycle répétitif** composé de plusieurs phases."
          },
          {
            type: "text",
            content: "## Les phases du cycle\n\n### 1. Lecture des entrées\nL'automate lit l'état de toutes les entrées et stocke ces valeurs en mémoire.\n\n### 2. Exécution du programme\nLe CPU exécute le programme utilisateur ligne par ligne, de haut en bas.\n\n### 3. Mise à jour des sorties\nLes nouvelles valeurs des sorties sont envoyées aux modules de sortie.\n\n### 4. Gestion système\nCommunications, diagnostics, etc."
          },
          {
            type: "info",
            content: "Le temps de cycle typique est de quelques millisecondes (5-20 ms). Plus le programme est long, plus le cycle est long."
          },
          {
            type: "text",
            content: "## Importance du cycle\n\n- Un cycle rapide permet de réagir rapidement aux événements\n- Le programme doit être optimisé pour éviter les cycles trop longs\n- Certains automates permettent des tâches rapides pour les événements critiques"
          }
        ]
      })
    },
    // Lesson 4: Les marques et les fabricants d'automates
    {
      title: "Les marques et les fabricants d'automates",
      description: "Découvrez les principaux fabricants d'automates programmables",
      order: 4,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Fabricants d'Automates\n\nLe marché des automates programmables est dominé par quelques grands acteurs mondiaux, chacun ayant ses spécificités."
          },
          {
            type: "diagram",
            title: "Les principaux fabricants",
            content: `┌─────────────────────────────────────────────────────────────────┐
│                  PRINCIPAUX FABRICANTS D'API                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔷 SIEMENS (Allemagne)        │  🟠 SCHNEIDER (France)         │
│  ├── S7-1500 (haut de gamme)   │  ├── Modicon M580             │
│  ├── S7-1200 (milieu de gamme) │  ├── Modicon M340             │
│  └── S7-300/400 (legacy)       │  └── Zelio Logic (compact)    │
│                                 │                                │
│  🔴 ALLEN-BRADLEY (USA)        │  🟡 OMRON (Japon)              │
│  ├── ControlLogix              │  ├── CJ2/NJ Series            │
│  ├── CompactLogix              │  ├── CP1L/CP1H                │
│  └── MicroLogix                │  └── SYSMAC                   │
│                                 │                                │
│  🟢 MITSUBISHI (Japon)         │  🔵 ABB (Suisse)               │
│  ├── iQ-R Series               │  ├── AC500                    │
│  ├── FX5 Series                │  └── PM5xx                    │
│  └── MELSEC Q                  │                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Siemens - Leader mondial\n\n**Parts de marché** : ~30% mondial\n\n**Points forts** :\n- Écosystème complet (TIA Portal)\n- Communication industrielle avancée\n- Support mondial excellent\n\n**Gammes principales** :\n- **LOGO!** : Micro-automates\n- **S7-1200** : Entrée de gamme\n- **S7-1500** : Haute performance"
          },
          {
            type: "text",
            content: "## Schneider Electric - Champion français\n\n**Points forts** :\n- Forte présence en France\n- Gamme complète Modicon\n- Solutions d'efficacité énergétique\n\n**Gammes principales** :\n- **Zelio Logic** : Petites applications\n- **Modicon M221/M241** : Compacts\n- **Modicon M340/M580** : Performance"
          },
          {
            type: "info",
            content: "Le choix d'un fabricant dépend souvent du secteur d'activité, de la région géographique et des compétences disponibles dans l'entreprise."
          }
        ]
      })
    },
    // Lesson 5: L'adressage des E/S
    {
      title: "L'adressage des E/S",
      description: "Apprenez à identifier et adresser les entrées/sorties",
      order: 5,
      xpReward: 65,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# L'Adressage des Entrées/Sorties\n\nChaque entrée et sortie possède une **adresse unique** qui permet de l'identifier dans le programme."
          },
          {
            type: "text",
            content: "## Notation Siemens (IEC)\n\n```\n%I0.0    →  Entrée bit 0 de l'octet 0\n%I0.7    →  Entrée bit 7 de l'octet 0\n%I1.0    →  Entrée bit 0 de l'octet 1\n\n%Q0.0    →  Sortie bit 0 de l'octet 0\n%Q2.3    →  Sortie bit 3 de l'octet 2\n\n%IW0     →  Mot d'entrée (16 bits)\n%QW4     →  Mot de sortie (16 bits)\n```"
          },
          {
            type: "diagram",
            title: "Structure d'une adresse",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    STRUCTURE D'ADRESSE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│           %  I  0  .  3                                      │
│           │  │  │     │                                      │
│           │  │  │     └── Numéro de bit (0-7)               │
│           │  │  │                                            │
│           │  │  └──────── Numéro d'octet                    │
│           │  │                                               │
│           │  └─────────── Type : I=Entrée, Q=Sortie         │
│           │               M=Mémoire interne                  │
│           │                                                  │
│           └────────────── Préfixe IEC (optionnel)           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Types de données :                                          │
│  • X ou pas de lettre = Bit (1 bit)                         │
│  • B = Byte/Octet (8 bits)                                  │
│  • W = Word/Mot (16 bits)                                   │
│  • D = Double Word (32 bits)                                │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Notation Allen-Bradley\n\n```\nI:0/0    →  Entrée module 0, bit 0\nO:1/5    →  Sortie module 1, bit 5\nB3:0     →  Bit fichier 3, mot 0\n```"
          },
          {
            type: "warning",
            content: "La notation varie selon les fabricants ! Consultez toujours la documentation de votre automate."
          },
          {
            type: "text",
            content: "## Bonnes pratiques\n\n1. **Utilisez des noms symboliques** : `Bouton_Start` plutôt que `%I0.0`\n2. **Documentez vos adresses** dans une table des E/S\n3. **Groupez logiquement** les E/S par fonction\n4. **Réservez des adresses** pour les extensions futures"
          }
        ]
      })
    },
    // Lesson 6: Sécurité et normes industrielles
    {
      title: "Sécurité et normes industrielles",
      description: "Découvrez les normes de sécurité essentielles en automatisme",
      order: 6,
      xpReward: 70,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sécurité en Automatisme Industriel\n\nLa sécurité est **primordiale** dans les systèmes automatisés. Des normes strictes encadrent la conception et l'utilisation des automates."
          },
          {
            type: "warning",
            content: "Un système automatisé mal conçu peut causer des blessures graves voire mortelles. La sécurité n'est pas une option !"
          },
          {
            type: "text",
            content: "## Normes principales\n\n| Norme | Domaine |\n|-------|----------|\n| **EN 60204-1** | Sécurité des machines - Équipement électrique |\n| **EN ISO 13849** | Sécurité des systèmes de commande (PL) |\n| **EN 62061** | Sécurité fonctionnelle (SIL) |\n| **EN 60947** | Appareillage basse tension |\n| **EN ISO 12100** | Principes généraux de conception |"
          },
          {
            type: "text",
            content: "## Niveaux de Performance (PL)\n\nLa norme EN ISO 13849 définit 5 niveaux de performance :\n\n- **PL a** : Risque faible\n- **PL b** : Risque modéré\n- **PL c** : Risque significatif  \n- **PL d** : Risque élevé\n- **PL e** : Risque très élevé (mort probable)"
          },
          {
            type: "diagram",
            title: "Circuit d'arrêt d'urgence type",
            content: `┌─────────────────────────────────────────────────────────────┐
│              CIRCUIT D'ARRÊT D'URGENCE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   [AU 1]     [AU 2]     [Relais de sécurité]                │
│     │          │              │                              │
│     ├──────────┤              │                              │
│     │          │         ┌────┴────┐                        │
│     └──────────┴────────▶│ PILZ    │──────▶ Contacteurs     │
│                          │ PNOZ    │        de puissance    │
│                          └────┬────┘                        │
│                               │                              │
│                          Retour de                          │
│                          surveillance                       │
│                                                              │
│   Caractéristiques :                                        │
│   • Double canal (redondance)                               │
│   • Contacts à ouverture forcée                             │
│   • Surveillance des contacteurs                            │
│   • Réarmement manuel obligatoire                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Automates de sécurité\n\nPour les fonctions de sécurité, on utilise des automates spéciaux :\n\n- **Siemens** : S7-1500F, ET 200SP F\n- **Schneider** : Preventa XPS\n- **Pilz** : PSS 4000, PNOZmulti\n- **Allen-Bradley** : GuardLogix\n\nCes automates ont une architecture redondante et sont certifiés SIL 3 / PL e."
          },
          {
            type: "info",
            content: "Un automate standard (non-F) ne doit JAMAIS être utilisé seul pour des fonctions de sécurité critiques."
          }
        ]
      })
    },
    // Lesson 7: Communication et réseaux industriels
    {
      title: "Communication et réseaux industriels",
      description: "Introduction aux protocoles de communication industriels",
      order: 7,
      xpReward: 75,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Communication Industrielle\n\nLes automates modernes communiquent entre eux et avec d'autres systèmes via des **réseaux industriels** spécialisés."
          },
          {
            type: "diagram",
            title: "Pyramide CIM (Computer Integrated Manufacturing)",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    PYRAMIDE CIM                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌─────────┐                              │
│                    │   ERP   │  Niveau 4 : Gestion          │
│                    └────┬────┘  (SAP, Oracle)               │
│                         │                                    │
│                ┌────────┴────────┐                          │
│                │      MES       │  Niveau 3 : Pilotage      │
│                └────────┬───────┘  (Manufacturing)          │
│                         │                                    │
│         ┌───────────────┴───────────────┐                   │
│         │         SCADA / HMI          │  Niveau 2 :        │
│         └───────────────┬───────────────┘  Supervision      │
│                         │                                    │
│    ┌────────────────────┴────────────────────┐              │
│    │              API / PLC                  │  Niveau 1 :  │
│    └────────────────────┬────────────────────┘  Commande    │
│                         │                                    │
│    ┌────────────────────┴────────────────────┐              │
│    │       Capteurs / Actionneurs            │  Niveau 0 :  │
│    └─────────────────────────────────────────┘  Terrain     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Protocoles courants\n\n### Bus de terrain\n- **PROFIBUS** : Standard Siemens, très répandu\n- **Modbus RTU** : Simple, économique, série RS-485\n- **DeviceNet** : Standard Allen-Bradley\n- **CANopen** : Basé sur CAN, industrie automobile\n\n### Ethernet industriel\n- **PROFINET** : Ethernet temps réel Siemens\n- **EtherNet/IP** : Standard Rockwell/ODVA\n- **Modbus TCP** : Modbus sur Ethernet\n- **EtherCAT** : Très haute vitesse (Beckhoff)"
          },
          {
            type: "text",
            content: "## Comparaison des protocoles\n\n| Protocole | Vitesse | Temps réel | Complexité |\n|-----------|---------|------------|------------|\n| Modbus RTU | 19.2 kbps | Non | Faible |\n| PROFIBUS | 12 Mbps | Oui | Moyenne |\n| PROFINET | 100 Mbps | Oui | Moyenne |\n| EtherCAT | 100 Mbps | Oui (µs) | Élevée |"
          },
          {
            type: "info",
            content: "PROFINET et EtherNet/IP sont les protocoles Ethernet industriels les plus utilisés aujourd'hui."
          }
        ]
      })
    }
  ],
  lessonTranslations: {
    en: {
      "Qu'est-ce qu'un automate programmable ?": {
        title: "What is a Programmable Logic Controller?",
        description: "Discover what a PLC is and its role in industry",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Welcome to the world of automation!\n\nA **Programmable Logic Controller** (PLC) is a programmable electronic device designed to control industrial processes."
            },
            {
              type: "info",
              content: "The first programmable logic controller was invented in 1968 by Dick Morley for General Motors."
            },
            {
              type: "text",
              content: "## Why use a PLC?\n\n- **Flexibility**: The program can be modified without changing the wiring\n- **Reliability**: Designed to operate 24/7 in industrial environments\n- **Diagnostics**: Detection and reporting of faults\n- **Communication**: Data exchange with other systems"
            },
            {
              type: "diagram",
              title: "Structure of a programmable logic controller",
              content: `┌─────────────────────────────────────────────────────────────┐
│                  PROGRAMMABLE LOGIC CONTROLLER              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ ││
│  │  │         │    │             │    │                 │ ││
│  │  │ INPUTS  │───▶│     CPU     │───▶│    OUTPUTS      │ ││
│  │  │  (I)    │    │  (Program)  │    │      (Q)        │ ││
│  │  │         │    │             │    │                 │ ││
│  │  └─────────┘    └─────────────┘    └─────────────────┘ ││
│  │       ▲               │                    │           ││
│  │       │          ┌────┴────┐               ▼           ││
│  │       │          │ MEMORY  │         ┌─────────┐       ││
│  │       │          └─────────┘         │  POWER  │       ││
│  │       │                              └─────────┘       ││
│  └───────┼──────────────────────────────────────────────┘ │
│          │                                      │          │
└──────────┼──────────────────────────────────────┼──────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  SENSORS    │                      │  ACTUATORS    │
    │ - Buttons   │                      │ - Motors      │
    │ - Detectors │                      │ - Valves      │
    │ - Probes    │                      │ - Indicators  │
    └─────────────┘                      └───────────────┘`
            },
            {
              type: "text",
              content: "## Main components\n\n1. **Central Processing Unit (CPU)**: The brain that executes the program\n2. **Memory**: Stores the program and data\n3. **Inputs**: Receives information from sensors\n4. **Outputs**: Controls actuators\n5. **Power Supply**: Provides electrical energy"
            }
          ]
        })
      },
      "Les entrées et sorties (E/S)": {
        title: "Inputs and Outputs (I/O)",
        description: "Understand the role of inputs and outputs in a PLC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Inputs and Outputs\n\nInputs and outputs (I/O) are the interface between the PLC and the physical world."
            },
            {
              type: "text",
              content: "## Inputs\n\nInputs receive information from **sensors**:\n\n- Push buttons\n- Presence detectors\n- Temperature sensors\n- Limit switches\n- Etc."
            },
            {
              type: "warning",
              content: "Digital inputs (discrete) only know two states: 0 (false) or 1 (true)."
            },
            {
              type: "text",
              content: "## Outputs\n\nOutputs control **actuators**:\n\n- Indicator lights\n- Contactors\n- Solenoid valves\n- Variable speed drives\n- Etc."
            },
            {
              type: "text",
              content: "## Types of I/O\n\n| Type | Description | Example |\n|------|-------------|----------|\n| Digital | On or Off (0 or 1) | Button, indicator |\n| Analog | Continuous value | Temperature, pressure |\n| Communication | Serial data | Encoder, display |"
            }
          ]
        })
      },
      "Le cycle automate": {
        title: "The PLC Scan Cycle",
        description: "Discover how the PLC cycle works",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The PLC Scan Cycle\n\nThe PLC operates by executing a **repetitive cycle** composed of several phases."
            },
            {
              type: "text",
              content: "## Cycle phases\n\n### 1. Read Inputs\nThe PLC reads the state of all inputs and stores these values in memory.\n\n### 2. Execute Program\nThe CPU executes the user program line by line, from top to bottom.\n\n### 3. Update Outputs\nNew output values are sent to the output modules.\n\n### 4. System Management\nCommunications, diagnostics, etc."
            },
            {
              type: "info",
              content: "The typical scan time is a few milliseconds (5-20 ms). The longer the program, the longer the cycle."
            },
            {
              type: "text",
              content: "## Importance of the cycle\n\n- A fast cycle allows quick reaction to events\n- The program must be optimized to avoid cycles that are too long\n- Some PLCs allow fast tasks for critical events"
            }
          ]
        })
      },
      "Les marques et les fabricants d'automates": {
        title: "PLC Brands and Manufacturers",
        description: "Discover the main PLC manufacturers"
      },
      "L'adressage des E/S": {
        title: "I/O Addressing",
        description: "Understand input/output addressing in PLCs"
      },
      "Sécurité et normes industrielles": {
        title: "Safety and Industrial Standards",
        description: "Learn safety standards in industrial automation"
      },
      "Communication et réseaux industriels": {
        title: "Communication and Industrial Networks",
        description: "Discover industrial communication protocols"
      }
    },
    es: {
      "Qu'est-ce qu'un automate programmable ?": {
        title: "¿Qué es un controlador lógico programable?",
        description: "Descubra qué es un PLC y su papel en la industria",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# ¡Bienvenido al mundo de la automatización!\n\nUn **Controlador Lógico Programable** (PLC) es un dispositivo electrónico programable diseñado para controlar procesos industriales."
            },
            {
              type: "info",
              content: "El primer controlador lógico programable fue inventado en 1968 por Dick Morley para General Motors."
            },
            {
              type: "text",
              content: "## ¿Por qué usar un PLC?\n\n- **Flexibilidad**: El programa puede modificarse sin cambiar el cableado\n- **Fiabilidad**: Diseñado para funcionar 24/7 en entornos industriales\n- **Diagnósticos**: Detección y reporte de fallos\n- **Comunicación**: Intercambio de datos con otros sistemas"
            },
            {
              type: "diagram",
              title: "Estructura de un controlador lógico programable",
              content: `┌─────────────────────────────────────────────────────────────┐
│                CONTROLADOR LÓGICO PROGRAMABLE               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ ││
│  │  │         │    │             │    │                 │ ││
│  │  │ENTRADAS │───▶│     CPU     │───▶│    SALIDAS      │ ││
│  │  │  (I)    │    │ (Programa)  │    │      (Q)        │ ││
│  │  │         │    │             │    │                 │ ││
│  │  └─────────┘    └─────────────┘    └─────────────────┘ ││
│  │       ▲               │                    │           ││
│  │       │          ┌────┴────┐               ▼           ││
│  │       │          │ MEMORIA │         ┌─────────┐       ││
│  │       │          └─────────┘         │ ALIMENT.│       ││
│  │       │                              └─────────┘       ││
│  └───────┼──────────────────────────────────────────────┘ │
│          │                                      │          │
└──────────┼──────────────────────────────────────┼──────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  SENSORES   │                      │  ACTUADORES   │
    │ - Botones   │                      │ - Motores     │
    │ - Detectores│                      │ - Válvulas    │
    │ - Sondas    │                      │ - Indicadores │
    └─────────────┘                      └───────────────┘`
            },
            {
              type: "text",
              content: "## Componentes principales\n\n1. **Unidad Central de Procesamiento (CPU)**: El cerebro que ejecuta el programa\n2. **Memoria**: Almacena el programa y los datos\n3. **Entradas**: Recibe información de los sensores\n4. **Salidas**: Controla los actuadores\n5. **Fuente de alimentación**: Proporciona energía eléctrica"
            }
          ]
        })
      },
      "Les entrées et sorties (E/S)": {
        title: "Entradas y Salidas (E/S)",
        description: "Comprenda el papel de las entradas y salidas en un PLC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Entradas y Salidas\n\nLas entradas y salidas (E/S) son la interfaz entre el PLC y el mundo físico."
            },
            {
              type: "text",
              content: "## Entradas\n\nLas entradas reciben información de los **sensores**:\n\n- Pulsadores\n- Detectores de presencia\n- Sensores de temperatura\n- Finales de carrera\n- Etc."
            },
            {
              type: "warning",
              content: "Las entradas digitales (discretas) solo conocen dos estados: 0 (falso) o 1 (verdadero)."
            },
            {
              type: "text",
              content: "## Salidas\n\nLas salidas controlan los **actuadores**:\n\n- Luces indicadoras\n- Contactores\n- Electroválvulas\n- Variadores de velocidad\n- Etc."
            },
            {
              type: "text",
              content: "## Tipos de E/S\n\n| Tipo | Descripción | Ejemplo |\n|------|-------------|----------|\n| Digital | Encendido o Apagado (0 o 1) | Botón, indicador |\n| Analógica | Valor continuo | Temperatura, presión |\n| Comunicación | Datos serie | Encoder, display |"
            }
          ]
        })
      },
      "Le cycle automate": {
        title: "El ciclo de escaneo del PLC",
        description: "Descubra cómo funciona el ciclo del PLC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# El ciclo de escaneo del PLC\n\nEl PLC opera ejecutando un **ciclo repetitivo** compuesto por varias fases."
            },
            {
              type: "text",
              content: "## Fases del ciclo\n\n### 1. Lectura de entradas\nEl PLC lee el estado de todas las entradas y almacena estos valores en memoria.\n\n### 2. Ejecución del programa\nLa CPU ejecuta el programa de usuario línea por línea, de arriba a abajo.\n\n### 3. Actualización de salidas\nLos nuevos valores de salida se envían a los módulos de salida.\n\n### 4. Gestión del sistema\nComunicaciones, diagnósticos, etc."
            },
            {
              type: "info",
              content: "El tiempo de ciclo típico es de unos pocos milisegundos (5-20 ms). Cuanto más largo es el programa, más largo es el ciclo."
            },
            {
              type: "text",
              content: "## Importancia del ciclo\n\n- Un ciclo rápido permite reaccionar rápidamente a los eventos\n- El programa debe optimizarse para evitar ciclos demasiado largos\n- Algunos PLCs permiten tareas rápidas para eventos críticos"
            }
          ]
        })
      },
      "Les marques et les fabricants d'automates": {
        title: "Marcas y fabricantes de PLCs",
        description: "Descubra los principales fabricantes de PLCs"
      },
      "L'adressage des E/S": {
        title: "Direccionamiento de E/S",
        description: "Comprenda el direccionamiento de entradas/salidas"
      },
      "Sécurité et normes industrielles": {
        title: "Seguridad y normas industriales",
        description: "Aprenda las normas de seguridad en automatización"
      },
      "Communication et réseaux industriels": {
        title: "Comunicación y redes industriales",
        description: "Descubra los protocolos de comunicación industrial"
      }
    }
  },
  quizzes: [
    // Lesson 1 quizzes (5 questions)
    [
      {
        question: "Que signifie l'acronyme PLC ?",
        options: ["Programmable Logic Controller", "Power Line Carrier", "Programmable Linear Computer", "Process Logic Control"],
        correctIndex: 0,
        explanation: "PLC signifie Programmable Logic Controller, traduit en français par Automate Programmable Industriel (API).",
        order: 1
      },
      {
        question: "Quel composant de l'automate exécute le programme ?",
        options: ["Les entrées", "L'alimentation", "L'unité centrale (CPU)", "Les sorties"],
        correctIndex: 2,
        explanation: "L'unité centrale (CPU) est le cerveau de l'automate qui exécute le programme utilisateur.",
        order: 2
      },
      {
        question: "En quelle année a été inventé le premier automate programmable ?",
        options: ["1958", "1968", "1978", "1988"],
        correctIndex: 1,
        explanation: "Le premier automate programmable a été inventé en 1968 par Dick Morley pour General Motors.",
        order: 3
      },
      {
        question: "Quel composant stocke le programme et les données ?",
        options: ["Le CPU", "L'alimentation", "La mémoire", "Les entrées"],
        correctIndex: 2,
        explanation: "La mémoire stocke le programme utilisateur et les données de travail de l'automate.",
        order: 4
      },
      {
        question: "Quel est l'avantage principal d'un automate par rapport à un câblage traditionnel ?",
        options: ["Il est moins cher", "Il consomme moins d'électricité", "On peut modifier le programme sans changer le câblage", "Il est plus petit"],
        correctIndex: 2,
        explanation: "La flexibilité est l'avantage clé : on peut modifier le comportement en changeant le programme, sans toucher au câblage physique.",
        order: 5
      }
    ],
    // Lesson 2 quizzes (5 questions)
    [
      {
        question: "Qu'est-ce qu'une entrée TOR ?",
        options: ["Une entrée qui mesure une température", "Une entrée binaire (0 ou 1)", "Une entrée de communication", "Une entrée haute fréquence"],
        correctIndex: 1,
        explanation: "TOR signifie Tout Ou Rien : l'entrée ne peut avoir que deux états, 0 (faux) ou 1 (vrai).",
        order: 1
      },
      {
        question: "Les sorties de l'automate commandent :",
        options: ["Les capteurs", "Les actionneurs", "L'alimentation", "La mémoire"],
        correctIndex: 1,
        explanation: "Les sorties commandent les actionneurs (moteurs, vannes, voyants, etc.) qui agissent sur le processus.",
        order: 2
      },
      {
        question: "Quel type d'entrée permet de mesurer une température ?",
        options: ["Entrée TOR", "Entrée analogique", "Entrée numérique série", "Entrée de sécurité"],
        correctIndex: 1,
        explanation: "Une entrée analogique peut mesurer des valeurs continues comme la température, la pression ou le niveau.",
        order: 3
      },
      {
        question: "Un bouton poussoir est relié à quelle partie de l'automate ?",
        options: ["Aux sorties", "Aux entrées", "À la mémoire", "Au CPU"],
        correctIndex: 1,
        explanation: "Un bouton poussoir est un capteur, il est donc relié aux entrées de l'automate.",
        order: 4
      },
      {
        question: "Un voyant lumineux est commandé par :",
        options: ["Une entrée", "Une sortie", "La mémoire", "L'alimentation"],
        correctIndex: 1,
        explanation: "Un voyant est un actionneur, il est commandé par une sortie de l'automate.",
        order: 5
      }
    ],
    // Lesson 3 quizzes (5 questions)
    [
      {
        question: "Combien de phases comporte le cycle automate ?",
        options: ["2 phases", "3 phases principales", "5 phases", "1 seule phase"],
        correctIndex: 1,
        explanation: "Le cycle automate comporte 3 phases principales : lecture des entrées, exécution du programme, mise à jour des sorties.",
        order: 1
      },
      {
        question: "Quel est le temps de cycle typique d'un automate ?",
        options: ["1 seconde", "100 millisecondes", "5 à 20 millisecondes", "1 minute"],
        correctIndex: 2,
        explanation: "Le temps de cycle typique est de quelques millisecondes (5-20 ms), ce qui permet une réaction rapide.",
        order: 2
      },
      {
        question: "À quel moment les entrées sont-elles lues ?",
        options: ["Pendant l'exécution du programme", "Au début de chaque cycle", "À la fin de chaque cycle", "Uniquement au démarrage"],
        correctIndex: 1,
        explanation: "Les entrées sont lues au début de chaque cycle, avant l'exécution du programme.",
        order: 3
      },
      {
        question: "Comment le programme est-il exécuté ?",
        options: ["De manière aléatoire", "Du bas vers le haut", "De haut en bas, ligne par ligne", "Uniquement les lignes modifiées"],
        correctIndex: 2,
        explanation: "Le programme est exécuté séquentiellement, de haut en bas, ligne par ligne.",
        order: 4
      },
      {
        question: "Qu'est-ce qui se passe si le programme est trop long ?",
        options: ["L'automate s'arrête", "Le temps de cycle augmente", "Les entrées ne sont plus lues", "La mémoire est effacée"],
        correctIndex: 1,
        explanation: "Plus le programme est long, plus le temps de cycle augmente, ce qui peut ralentir la réactivité du système.",
        order: 5
      }
    ],
    // Lesson 4 quizzes (5 questions) - Les marques et fabricants
    [
      {
        question: "Quel fabricant d'automates a environ 30% de parts de marché mondial ?",
        options: ["Allen-Bradley", "Siemens", "Schneider Electric", "Omron"],
        correctIndex: 1,
        explanation: "Siemens est le leader mondial avec environ 30% de parts de marché.",
        order: 1
      },
      {
        question: "Quel est le logiciel de programmation de Siemens ?",
        options: ["Unity Pro", "TIA Portal", "RSLogix", "GX Works"],
        correctIndex: 1,
        explanation: "TIA Portal (Totally Integrated Automation Portal) est l'environnement de programmation de Siemens.",
        order: 2
      },
      {
        question: "Quelle est la gamme haut de gamme de Siemens ?",
        options: ["S7-300", "S7-1200", "S7-1500", "LOGO!"],
        correctIndex: 2,
        explanation: "Le S7-1500 est la gamme haute performance de Siemens, offrant les meilleures performances.",
        order: 3
      },
      {
        question: "Quel fabricant français propose la gamme Modicon ?",
        options: ["Siemens", "Schneider Electric", "Omron", "ABB"],
        correctIndex: 1,
        explanation: "Schneider Electric, champion français, propose la gamme Modicon.",
        order: 4
      },
      {
        question: "Quel critère influence souvent le choix d'un fabricant d'automates ?",
        options: ["La couleur de l'automate", "Le secteur d'activité et les compétences disponibles", "Le poids de l'automate", "Le prix uniquement"],
        correctIndex: 1,
        explanation: "Le choix dépend du secteur, de la région et des compétences disponibles dans l'entreprise.",
        order: 5
      }
    ],
    // Lesson 5 quizzes (5 questions) - L'adressage des E/S
    [
      {
        question: "Que signifie %I0.3 en notation Siemens ?",
        options: ["Sortie 3 de l'octet 0", "Entrée bit 3 de l'octet 0", "Mémoire interne 3", "Entrée mot 3"],
        correctIndex: 1,
        explanation: "%I0.3 signifie Entrée (I) bit 3 de l'octet 0.",
        order: 1
      },
      {
        question: "Quelle lettre désigne une sortie en notation IEC ?",
        options: ["I", "Q", "M", "S"],
        correctIndex: 1,
        explanation: "Q (Query/Output) désigne les sorties, I les entrées, M la mémoire interne.",
        order: 2
      },
      {
        question: "Que représente %IW0 en notation Siemens ?",
        options: ["Un bit d'entrée", "Un mot d'entrée (16 bits)", "Une sortie", "Un octet de mémoire"],
        correctIndex: 1,
        explanation: "W = Word (mot de 16 bits), donc %IW0 est un mot d'entrée.",
        order: 3
      },
      {
        question: "Quelle bonne pratique est recommandée pour l'adressage ?",
        options: ["Utiliser uniquement des adresses numériques", "Utiliser des noms symboliques comme Bouton_Start", "Ne pas documenter les adresses", "Changer les adresses fréquemment"],
        correctIndex: 1,
        explanation: "Les noms symboliques (Bouton_Start plutôt que %I0.0) rendent le programme plus lisible.",
        order: 4
      },
      {
        question: "Quelle notation utilise Allen-Bradley pour les entrées ?",
        options: ["%I0.0", "I:0/0", "E0.0", "IN[0]"],
        correctIndex: 1,
        explanation: "Allen-Bradley utilise la notation I:module/bit, par exemple I:0/0.",
        order: 5
      }
    ],
    // Lesson 6 quizzes (5 questions) - Sécurité et normes
    [
      {
        question: "Quelle norme définit la sécurité des machines - équipement électrique ?",
        options: ["EN 60947", "EN 60204-1", "EN 62061", "EN ISO 9001"],
        correctIndex: 1,
        explanation: "EN 60204-1 définit la sécurité des machines concernant l'équipement électrique.",
        order: 1
      },
      {
        question: "Combien de niveaux de performance (PL) définit la norme EN ISO 13849 ?",
        options: ["3 niveaux", "4 niveaux", "5 niveaux (a à e)", "10 niveaux"],
        correctIndex: 2,
        explanation: "La norme définit 5 niveaux : PL a (risque faible) à PL e (risque très élevé).",
        order: 2
      },
      {
        question: "Pourquoi les circuits d'arrêt d'urgence utilisent-ils un double canal ?",
        options: ["Pour économiser de l'énergie", "Pour la redondance et la sécurité", "Pour la vitesse", "Pour réduire les coûts"],
        correctIndex: 1,
        explanation: "Le double canal assure la redondance : si un canal est défaillant, l'autre assure la sécurité.",
        order: 3
      },
      {
        question: "Quel type d'automate est requis pour les fonctions de sécurité critiques ?",
        options: ["N'importe quel automate", "Un automate de sécurité (ex: S7-1500F)", "Un micro-automate", "Un automate virtuel"],
        correctIndex: 1,
        explanation: "Les automates de sécurité (F = Failsafe) ont une architecture redondante certifiée SIL 3 / PL e.",
        order: 4
      },
      {
        question: "Quel fabricant propose les relais de sécurité PNOZ ?",
        options: ["Siemens", "Schneider", "Pilz", "ABB"],
        correctIndex: 2,
        explanation: "Pilz est spécialisé dans la sécurité et propose les relais PNOZ et automates PSS.",
        order: 5
      }
    ],
    // Lesson 7 quizzes (5 questions) - Communication et réseaux
    [
      {
        question: "Quel niveau de la pyramide CIM gère les commandes en temps réel ?",
        options: ["Niveau entreprise", "Niveau atelier", "Niveau terrain", "Niveau gestion"],
        correctIndex: 2,
        explanation: "Le niveau terrain gère les capteurs, actionneurs et la commande en temps réel.",
        order: 1
      },
      {
        question: "Quel protocole est le plus utilisé pour la communication terrain ?",
        options: ["HTTP", "PROFINET / Ethernet/IP", "FTP", "SMTP"],
        correctIndex: 1,
        explanation: "PROFINET (Siemens) et Ethernet/IP (Allen-Bradley) sont les standards industriels actuels.",
        order: 2
      },
      {
        question: "Quel est l'avantage principal de PROFINET par rapport à PROFIBUS ?",
        options: ["Moins cher", "Plus lent", "Basé sur Ethernet, plus rapide et flexible", "Plus ancien"],
        correctIndex: 2,
        explanation: "PROFINET utilise Ethernet industriel, offrant plus de vitesse et de flexibilité.",
        order: 3
      },
      {
        question: "Que signifie IHM dans le contexte industriel ?",
        options: ["Interface Homme Machine", "Indicateur Haute Mesure", "Installation Hydraulique Motorisée", "Identifiant Haute Mémoire"],
        correctIndex: 0,
        explanation: "IHM signifie Interface Homme Machine, l'écran de supervision et commande.",
        order: 4
      },
      {
        question: "Quel bus de terrain était dominant avant Ethernet industriel ?",
        options: ["USB", "PROFIBUS / DeviceNet", "HDMI", "WiFi"],
        correctIndex: 1,
        explanation: "PROFIBUS (Siemens) et DeviceNet (Allen-Bradley) dominaient avant l'arrivée d'Ethernet industriel.",
        order: 5
      }
    ]
  ],
  quizTranslations: {
    en: {
      // Lesson 1 quiz translations
      "Que signifie l'acronyme PLC ?": {
        question: "What does the acronym PLC stand for?",
        options: ["Programmable Logic Controller", "Power Line Carrier", "Programmable Linear Computer", "Process Logic Control"],
        explanation: "PLC stands for Programmable Logic Controller."
      },
      "Quel composant de l'automate exécute le programme ?": {
        question: "Which component of the PLC executes the program?",
        options: ["The inputs", "The power supply", "The Central Processing Unit (CPU)", "The outputs"],
        explanation: "The Central Processing Unit (CPU) is the brain of the PLC that executes the user program."
      },
      "En quelle année a été inventé le premier automate programmable ?": {
        question: "In what year was the first programmable logic controller invented?",
        options: ["1958", "1968", "1978", "1988"],
        explanation: "The first programmable logic controller was invented in 1968 by Dick Morley for General Motors."
      },
      "Quel composant stocke le programme et les données ?": {
        question: "Which component stores the program and data?",
        options: ["The CPU", "The power supply", "The memory", "The inputs"],
        explanation: "Memory stores the user program and working data of the PLC."
      },
      "Quel est l'avantage principal d'un automate par rapport à un câblage traditionnel ?": {
        question: "What is the main advantage of a PLC compared to traditional wiring?",
        options: ["It is cheaper", "It consumes less electricity", "The program can be modified without changing the wiring", "It is smaller"],
        explanation: "Flexibility is the key advantage: you can modify behavior by changing the program, without touching the physical wiring."
      },
      // Lesson 2 quiz translations
      "Qu'est-ce qu'une entrée TOR ?": {
        question: "What is a digital input?",
        options: ["An input that measures temperature", "A binary input (0 or 1)", "A communication input", "A high frequency input"],
        explanation: "Digital (discrete) means the input can only have two states, 0 (false) or 1 (true)."
      },
      "Les sorties de l'automate commandent :": {
        question: "The PLC outputs control:",
        options: ["Sensors", "Actuators", "Power supply", "Memory"],
        explanation: "Outputs control actuators (motors, valves, indicators, etc.) that act on the process."
      },
      "Quel type d'entrée permet de mesurer une température ?": {
        question: "What type of input allows measuring temperature?",
        options: ["Digital input", "Analog input", "Serial digital input", "Safety input"],
        explanation: "An analog input can measure continuous values like temperature, pressure, or level."
      },
      "Un bouton poussoir est relié à quelle partie de l'automate ?": {
        question: "A push button is connected to which part of the PLC?",
        options: ["To the outputs", "To the inputs", "To the memory", "To the CPU"],
        explanation: "A push button is a sensor, so it is connected to the PLC inputs."
      },
      "Un voyant lumineux est commandé par :": {
        question: "An indicator light is controlled by:",
        options: ["An input", "An output", "Memory", "Power supply"],
        explanation: "An indicator is an actuator, it is controlled by a PLC output."
      },
      // Lesson 3 quiz translations
      "Combien de phases comporte le cycle automate ?": {
        question: "How many phases does the PLC cycle have?",
        options: ["2 phases", "3 main phases", "5 phases", "1 single phase"],
        explanation: "The PLC cycle has 3 main phases: read inputs, execute program, update outputs."
      },
      "Quel est le temps de cycle typique d'un automate ?": {
        question: "What is the typical scan time of a PLC?",
        options: ["1 second", "100 milliseconds", "5 to 20 milliseconds", "1 minute"],
        explanation: "The typical scan time is a few milliseconds (5-20 ms), allowing quick reaction."
      },
      "À quel moment les entrées sont-elles lues ?": {
        question: "When are the inputs read?",
        options: ["During program execution", "At the beginning of each cycle", "At the end of each cycle", "Only at startup"],
        explanation: "Inputs are read at the beginning of each cycle, before program execution."
      },
      "Comment le programme est-il exécuté ?": {
        question: "How is the program executed?",
        options: ["Randomly", "From bottom to top", "From top to bottom, line by line", "Only modified lines"],
        explanation: "The program is executed sequentially, from top to bottom, line by line."
      },
      "Qu'est-ce qui se passe si le programme est trop long ?": {
        question: "What happens if the program is too long?",
        options: ["The PLC stops", "The scan time increases", "Inputs are no longer read", "Memory is erased"],
        explanation: "The longer the program, the longer the scan time, which can slow down system responsiveness."
      },
      // Lesson 4 quiz translations
      "Quel fabricant d'automates a environ 30% de parts de marché mondial ?": {
        question: "Which PLC manufacturer has about 30% of global market share?",
        options: ["Allen-Bradley", "Siemens", "Schneider Electric", "Omron"],
        explanation: "Siemens is the world leader with about 30% market share."
      },
      "Quel est le logiciel de programmation de Siemens ?": {
        question: "What is Siemens' programming software?",
        options: ["Unity Pro", "TIA Portal", "RSLogix", "GX Works"],
        explanation: "TIA Portal (Totally Integrated Automation Portal) is Siemens' programming environment."
      },
      "Quelle est la gamme haut de gamme de Siemens ?": {
        question: "What is Siemens' high-end range?",
        options: ["S7-300", "S7-1200", "S7-1500", "LOGO!"],
        explanation: "The S7-1500 is Siemens' high-performance range, offering the best performance."
      },
      "Quel fabricant français propose la gamme Modicon ?": {
        question: "Which French manufacturer offers the Modicon range?",
        options: ["Siemens", "Schneider Electric", "Omron", "ABB"],
        explanation: "Schneider Electric, the French champion, offers the Modicon range."
      },
      "Quel critère influence souvent le choix d'un fabricant d'automates ?": {
        question: "What criteria often influences the choice of a PLC manufacturer?",
        options: ["The color of the PLC", "The industry sector and available skills", "The weight of the PLC", "Price only"],
        explanation: "The choice depends on the sector, region, and skills available in the company."
      },
      // Lesson 5 quiz translations
      "Que signifie %I0.3 en notation Siemens ?": {
        question: "What does %I0.3 mean in Siemens notation?",
        options: ["Output 3 of byte 0", "Input bit 3 of byte 0", "Internal memory 3", "Input word 3"],
        explanation: "%I0.3 means Input (I) bit 3 of byte 0."
      },
      "Quelle lettre désigne une sortie en notation IEC ?": {
        question: "Which letter designates an output in IEC notation?",
        options: ["I", "Q", "M", "S"],
        explanation: "Q (Query/Output) designates outputs, I inputs, M internal memory."
      },
      "Que représente %IW0 en notation Siemens ?": {
        question: "What does %IW0 represent in Siemens notation?",
        options: ["An input bit", "An input word (16 bits)", "An output", "A memory byte"],
        explanation: "W = Word (16 bits), so %IW0 is an input word."
      },
      "Quelle bonne pratique est recommandée pour l'adressage ?": {
        question: "What best practice is recommended for addressing?",
        options: ["Use only numeric addresses", "Use symbolic names like Button_Start", "Don't document addresses", "Change addresses frequently"],
        explanation: "Symbolic names (Button_Start rather than %I0.0) make the program more readable."
      },
      "Quelle notation utilise Allen-Bradley pour les entrées ?": {
        question: "What notation does Allen-Bradley use for inputs?",
        options: ["%I0.0", "I:0/0", "E0.0", "IN[0]"],
        explanation: "Allen-Bradley uses the notation I:module/bit, for example I:0/0."
      },
      // Lesson 6 quiz translations
      "Quelle norme définit la sécurité des machines - équipement électrique ?": {
        question: "Which standard defines machine safety - electrical equipment?",
        options: ["EN 60947", "EN 60204-1", "EN 62061", "EN ISO 9001"],
        explanation: "EN 60204-1 defines machine safety regarding electrical equipment."
      },
      "Combien de niveaux de performance (PL) définit la norme EN ISO 13849 ?": {
        question: "How many performance levels (PL) does the EN ISO 13849 standard define?",
        options: ["3 levels", "4 levels", "5 levels (a to e)", "10 levels"],
        explanation: "The standard defines 5 levels: PL a (low risk) to PL e (very high risk)."
      },
      "Pourquoi les circuits d'arrêt d'urgence utilisent-ils un double canal ?": {
        question: "Why do emergency stop circuits use dual channel?",
        options: ["To save energy", "For redundancy and safety", "For speed", "To reduce costs"],
        explanation: "Dual channel ensures redundancy: if one channel fails, the other ensures safety."
      },
      "Quel type d'automate est requis pour les fonctions de sécurité critiques ?": {
        question: "What type of PLC is required for critical safety functions?",
        options: ["Any PLC", "A safety PLC (e.g., S7-1500F)", "A micro PLC", "A virtual PLC"],
        explanation: "Safety PLCs (F = Failsafe) have redundant architecture certified SIL 3 / PL e."
      },
      "Quel fabricant propose les relais de sécurité PNOZ ?": {
        question: "Which manufacturer offers PNOZ safety relays?",
        options: ["Siemens", "Schneider", "Pilz", "ABB"],
        explanation: "Pilz specializes in safety and offers PNOZ relays and PSS PLCs."
      },
      // Lesson 7 quiz translations
      "Quel niveau de la pyramide CIM gère les commandes en temps réel ?": {
        question: "Which level of the CIM pyramid handles real-time commands?",
        options: ["Enterprise level", "Workshop level", "Field level", "Management level"],
        explanation: "The field level handles sensors, actuators, and real-time control."
      },
      "Quel protocole est le plus utilisé pour la communication terrain ?": {
        question: "Which protocol is most used for field communication?",
        options: ["HTTP", "PROFINET / Ethernet/IP", "FTP", "SMTP"],
        explanation: "PROFINET (Siemens) and Ethernet/IP (Allen-Bradley) are today's industrial standards."
      },
      "Quel est l'avantage principal de PROFINET par rapport à PROFIBUS ?": {
        question: "What is the main advantage of PROFINET compared to PROFIBUS?",
        options: ["Cheaper", "Slower", "Based on Ethernet, faster and more flexible", "Older"],
        explanation: "PROFINET uses industrial Ethernet, offering more speed and flexibility."
      },
      "Que signifie IHM dans le contexte industriel ?": {
        question: "What does HMI mean in the industrial context?",
        options: ["Human Machine Interface", "High Measurement Indicator", "Hydraulic Motorized Installation", "High Memory Identifier"],
        explanation: "HMI stands for Human Machine Interface, the supervision and command screen."
      },
      "Quel bus de terrain était dominant avant Ethernet industriel ?": {
        question: "Which fieldbus was dominant before industrial Ethernet?",
        options: ["USB", "PROFIBUS / DeviceNet", "HDMI", "WiFi"],
        explanation: "PROFIBUS (Siemens) and DeviceNet (Allen-Bradley) dominated before industrial Ethernet."
      }
    },
    es: {
      // Lesson 1 quiz translations
      "Que signifie l'acronyme PLC ?": {
        question: "¿Qué significa el acrónimo PLC?",
        options: ["Controlador Lógico Programable", "Portador de Línea de Potencia", "Computadora Lineal Programable", "Control Lógico de Proceso"],
        explanation: "PLC significa Controlador Lógico Programable (Programmable Logic Controller)."
      },
      "Quel composant de l'automate exécute le programme ?": {
        question: "¿Qué componente del PLC ejecuta el programa?",
        options: ["Las entradas", "La fuente de alimentación", "La Unidad Central de Procesamiento (CPU)", "Las salidas"],
        explanation: "La Unidad Central de Procesamiento (CPU) es el cerebro del PLC que ejecuta el programa de usuario."
      },
      "En quelle année a été inventé le premier automate programmable ?": {
        question: "¿En qué año se inventó el primer controlador lógico programable?",
        options: ["1958", "1968", "1978", "1988"],
        explanation: "El primer controlador lógico programable fue inventado en 1968 por Dick Morley para General Motors."
      },
      "Quel composant stocke le programme et les données ?": {
        question: "¿Qué componente almacena el programa y los datos?",
        options: ["La CPU", "La fuente de alimentación", "La memoria", "Las entradas"],
        explanation: "La memoria almacena el programa de usuario y los datos de trabajo del PLC."
      },
      "Quel est l'avantage principal d'un automate par rapport à un câblage traditionnel ?": {
        question: "¿Cuál es la principal ventaja de un PLC respecto al cableado tradicional?",
        options: ["Es más barato", "Consume menos electricidad", "Se puede modificar el programa sin cambiar el cableado", "Es más pequeño"],
        explanation: "La flexibilidad es la ventaja clave: se puede modificar el comportamiento cambiando el programa, sin tocar el cableado físico."
      },
      // Lesson 2 quiz translations
      "Qu'est-ce qu'une entrée TOR ?": {
        question: "¿Qué es una entrada digital?",
        options: ["Una entrada que mide temperatura", "Una entrada binaria (0 o 1)", "Una entrada de comunicación", "Una entrada de alta frecuencia"],
        explanation: "Digital (discreto) significa que la entrada solo puede tener dos estados, 0 (falso) o 1 (verdadero)."
      },
      "Les sorties de l'automate commandent :": {
        question: "Las salidas del PLC controlan:",
        options: ["Sensores", "Actuadores", "Fuente de alimentación", "Memoria"],
        explanation: "Las salidas controlan actuadores (motores, válvulas, indicadores, etc.) que actúan sobre el proceso."
      },
      "Quel type d'entrée permet de mesurer une température ?": {
        question: "¿Qué tipo de entrada permite medir temperatura?",
        options: ["Entrada digital", "Entrada analógica", "Entrada digital serie", "Entrada de seguridad"],
        explanation: "Una entrada analógica puede medir valores continuos como temperatura, presión o nivel."
      },
      "Un bouton poussoir est relié à quelle partie de l'automate ?": {
        question: "¿Un pulsador está conectado a qué parte del PLC?",
        options: ["A las salidas", "A las entradas", "A la memoria", "A la CPU"],
        explanation: "Un pulsador es un sensor, por lo que está conectado a las entradas del PLC."
      },
      "Un voyant lumineux est commandé par :": {
        question: "Una luz indicadora está controlada por:",
        options: ["Una entrada", "Una salida", "Memoria", "Fuente de alimentación"],
        explanation: "Un indicador es un actuador, está controlado por una salida del PLC."
      },
      // Lesson 3 quiz translations
      "Combien de phases comporte le cycle automate ?": {
        question: "¿Cuántas fases tiene el ciclo del PLC?",
        options: ["2 fases", "3 fases principales", "5 fases", "1 sola fase"],
        explanation: "El ciclo del PLC tiene 3 fases principales: lectura de entradas, ejecución del programa, actualización de salidas."
      },
      "Quel est le temps de cycle typique d'un automate ?": {
        question: "¿Cuál es el tiempo de ciclo típico de un PLC?",
        options: ["1 segundo", "100 milisegundos", "5 a 20 milisegundos", "1 minuto"],
        explanation: "El tiempo de ciclo típico es de unos pocos milisegundos (5-20 ms), permitiendo una reacción rápida."
      },
      "À quel moment les entrées sont-elles lues ?": {
        question: "¿Cuándo se leen las entradas?",
        options: ["Durante la ejecución del programa", "Al inicio de cada ciclo", "Al final de cada ciclo", "Solo al arrancar"],
        explanation: "Las entradas se leen al inicio de cada ciclo, antes de la ejecución del programa."
      },
      "Comment le programme est-il exécuté ?": {
        question: "¿Cómo se ejecuta el programa?",
        options: ["Aleatoriamente", "De abajo hacia arriba", "De arriba a abajo, línea por línea", "Solo las líneas modificadas"],
        explanation: "El programa se ejecuta secuencialmente, de arriba a abajo, línea por línea."
      },
      "Qu'est-ce qui se passe si le programme est trop long ?": {
        question: "¿Qué pasa si el programa es demasiado largo?",
        options: ["El PLC se detiene", "El tiempo de ciclo aumenta", "Las entradas ya no se leen", "La memoria se borra"],
        explanation: "Cuanto más largo es el programa, más largo es el tiempo de ciclo, lo que puede ralentizar la capacidad de respuesta del sistema."
      },
      // Lesson 4 quiz translations
      "Quel fabricant d'automates a environ 30% de parts de marché mondial ?": {
        question: "¿Qué fabricante de PLCs tiene aproximadamente el 30% del mercado mundial?",
        options: ["Allen-Bradley", "Siemens", "Schneider Electric", "Omron"],
        explanation: "Siemens es el líder mundial con aproximadamente el 30% de cuota de mercado."
      },
      "Quel est le logiciel de programmation de Siemens ?": {
        question: "¿Cuál es el software de programación de Siemens?",
        options: ["Unity Pro", "TIA Portal", "RSLogix", "GX Works"],
        explanation: "TIA Portal (Totally Integrated Automation Portal) es el entorno de programación de Siemens."
      },
      "Quelle est la gamme haut de gamme de Siemens ?": {
        question: "¿Cuál es la gama de alta gama de Siemens?",
        options: ["S7-300", "S7-1200", "S7-1500", "LOGO!"],
        explanation: "El S7-1500 es la gama de alto rendimiento de Siemens, ofreciendo el mejor desempeño."
      },
      "Quel fabricant français propose la gamme Modicon ?": {
        question: "¿Qué fabricante francés ofrece la gama Modicon?",
        options: ["Siemens", "Schneider Electric", "Omron", "ABB"],
        explanation: "Schneider Electric, el campeón francés, ofrece la gama Modicon."
      },
      "Quel critère influence souvent le choix d'un fabricant d'automates ?": {
        question: "¿Qué criterio influye a menudo en la elección de un fabricante de PLCs?",
        options: ["El color del PLC", "El sector de actividad y las competencias disponibles", "El peso del PLC", "Solo el precio"],
        explanation: "La elección depende del sector, la región y las competencias disponibles en la empresa."
      },
      // Lesson 5 quiz translations
      "Que signifie %I0.3 en notation Siemens ?": {
        question: "¿Qué significa %I0.3 en notación Siemens?",
        options: ["Salida 3 del byte 0", "Entrada bit 3 del byte 0", "Memoria interna 3", "Entrada palabra 3"],
        explanation: "%I0.3 significa Entrada (I) bit 3 del byte 0."
      },
      "Quelle lettre désigne une sortie en notation IEC ?": {
        question: "¿Qué letra designa una salida en notación IEC?",
        options: ["I", "Q", "M", "S"],
        explanation: "Q (Query/Output) designa las salidas, I las entradas, M la memoria interna."
      },
      "Que représente %IW0 en notation Siemens ?": {
        question: "¿Qué representa %IW0 en notación Siemens?",
        options: ["Un bit de entrada", "Una palabra de entrada (16 bits)", "Una salida", "Un byte de memoria"],
        explanation: "W = Word (palabra de 16 bits), por lo que %IW0 es una palabra de entrada."
      },
      "Quelle bonne pratique est recommandée pour l'adressage ?": {
        question: "¿Qué buena práctica se recomienda para el direccionamiento?",
        options: ["Usar solo direcciones numéricas", "Usar nombres simbólicos como Boton_Start", "No documentar las direcciones", "Cambiar las direcciones frecuentemente"],
        explanation: "Los nombres simbólicos (Boton_Start en lugar de %I0.0) hacen el programa más legible."
      },
      "Quelle notation utilise Allen-Bradley pour les entrées ?": {
        question: "¿Qué notación usa Allen-Bradley para las entradas?",
        options: ["%I0.0", "I:0/0", "E0.0", "IN[0]"],
        explanation: "Allen-Bradley usa la notación I:módulo/bit, por ejemplo I:0/0."
      },
      // Lesson 6 quiz translations
      "Quelle norme définit la sécurité des machines - équipement électrique ?": {
        question: "¿Qué norma define la seguridad de las máquinas - equipo eléctrico?",
        options: ["EN 60947", "EN 60204-1", "EN 62061", "EN ISO 9001"],
        explanation: "EN 60204-1 define la seguridad de las máquinas en lo que respecta al equipo eléctrico."
      },
      "Combien de niveaux de performance (PL) définit la norme EN ISO 13849 ?": {
        question: "¿Cuántos niveles de rendimiento (PL) define la norma EN ISO 13849?",
        options: ["3 niveles", "4 niveles", "5 niveles (a a e)", "10 niveles"],
        explanation: "La norma define 5 niveles: PL a (riesgo bajo) a PL e (riesgo muy alto)."
      },
      "Pourquoi les circuits d'arrêt d'urgence utilisent-ils un double canal ?": {
        question: "¿Por qué los circuitos de parada de emergencia usan doble canal?",
        options: ["Para ahorrar energía", "Para redundancia y seguridad", "Para velocidad", "Para reducir costos"],
        explanation: "El doble canal asegura la redundancia: si un canal falla, el otro asegura la seguridad."
      },
      "Quel type d'automate est requis pour les fonctions de sécurité critiques ?": {
        question: "¿Qué tipo de PLC se requiere para funciones de seguridad críticas?",
        options: ["Cualquier PLC", "Un PLC de seguridad (ej: S7-1500F)", "Un micro PLC", "Un PLC virtual"],
        explanation: "Los PLCs de seguridad (F = Failsafe) tienen arquitectura redundante certificada SIL 3 / PL e."
      },
      "Quel fabricant propose les relais de sécurité PNOZ ?": {
        question: "¿Qué fabricante ofrece los relés de seguridad PNOZ?",
        options: ["Siemens", "Schneider", "Pilz", "ABB"],
        explanation: "Pilz está especializado en seguridad y ofrece relés PNOZ y PLCs PSS."
      },
      // Lesson 7 quiz translations
      "Quel niveau de la pyramide CIM gère les commandes en temps réel ?": {
        question: "¿Qué nivel de la pirámide CIM maneja los comandos en tiempo real?",
        options: ["Nivel empresa", "Nivel taller", "Nivel campo", "Nivel gestión"],
        explanation: "El nivel de campo maneja los sensores, actuadores y el control en tiempo real."
      },
      "Quel protocole est le plus utilisé pour la communication terrain ?": {
        question: "¿Qué protocolo es el más utilizado para la comunicación de campo?",
        options: ["HTTP", "PROFINET / Ethernet/IP", "FTP", "SMTP"],
        explanation: "PROFINET (Siemens) y Ethernet/IP (Allen-Bradley) son los estándares industriales actuales."
      },
      "Quel est l'avantage principal de PROFINET par rapport à PROFIBUS ?": {
        question: "¿Cuál es la principal ventaja de PROFINET respecto a PROFIBUS?",
        options: ["Más barato", "Más lento", "Basado en Ethernet, más rápido y flexible", "Más antiguo"],
        explanation: "PROFINET usa Ethernet industrial, ofreciendo más velocidad y flexibilidad."
      },
      "Que signifie IHM dans le contexte industriel ?": {
        question: "¿Qué significa HMI en el contexto industrial?",
        options: ["Interfaz Hombre Máquina", "Indicador de Alta Medida", "Instalación Hidráulica Motorizada", "Identificador de Alta Memoria"],
        explanation: "HMI significa Interfaz Hombre Máquina, la pantalla de supervisión y comando."
      },
      "Quel bus de terrain était dominant avant Ethernet industriel ?": {
        question: "¿Qué bus de campo era dominante antes del Ethernet industrial?",
        options: ["USB", "PROFIBUS / DeviceNet", "HDMI", "WiFi"],
        explanation: "PROFIBUS (Siemens) y DeviceNet (Allen-Bradley) dominaban antes de la llegada del Ethernet industrial."
      }
    }
  }
}
