// Module 9: Introduction to Siemens S7-1500
import type { ModuleData } from '../types.js'

export const module09Data: ModuleData = {
  // Module info
  moduleOrder: 9,
  moduleTitle: "Introduction a Siemens S7-1500",
  moduleDescription: "Decouvrez l'automate S7-1500 et l'environnement TIA Portal",
  moduleTranslations: {
    en: {
      title: "Introduction to Siemens S7-1500",
      description: "Discover the S7-1500 PLC and TIA Portal environment"
    },
    es: {
      title: "Introduccion a Siemens S7-1500",
      description: "Descubra el PLC S7-1500 y el entorno TIA Portal"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Presentation du S7-1500",
      description: "Decouvrez l'automate Siemens S7-1500 et ses caracteristiques",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# L'automate Siemens S7-1500\n\nLe **S7-1500** est la gamme haut de gamme des automates Siemens. Il offre des performances elevees et de nombreuses fonctionnalites avancees."
          },
          {
            type: "diagram",
            title: "Architecture du S7-1500",
            content: `┌────────────────────────────────────────────────────────────────┐
│                     SIEMENS S7-1500                              │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   CPU    │  │    DI    │  │    DO    │  │    AI    │        │
│  │ 1511-1   │  │  32xDC   │  │  32xDC   │  │   8xAI   │        │
│  │          │  │          │  │          │  │          │        │
│  │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │        │
│  │  │DISP│  │  │  │LED │  │  │  │LED │  │  │  │LED │  │        │
│  │  └────┘  │  │  └────┘  │  │  └────┘  │  │  └────┘  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │                │
│       └─────────────┴─────────────┴─────────────┘                │
│                          │                                       │
│                    Rail DIN profile                              │
│                                                                  │
└────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Caracteristiques principales\n\n- **Performance** : Temps de cycle rapide (jusqu'a 1 ns/instruction)\n- **Ecran integre** : Affichage des diagnostics et parametres\n- **Memoire** : Jusqu'a 10 Mo de memoire de travail\n- **Communication** : PROFINET, PROFIBUS, OPC UA integres\n- **Securite** : Fonctions de securite integrees (Safety Integrated)"
          },
          {
            type: "info",
            content: "Le S7-1500 remplace progressivement les anciens S7-300 et S7-400 grace a ses performances superieures."
          }
        ]
      })
    },
    {
      title: "L'environnement TIA Portal",
      description: "Introduction a l'outil de programmation Siemens TIA Portal",
      order: 2,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# TIA Portal\n\n**TIA Portal** (Totally Integrated Automation Portal) est l'environnement de developpement integre de Siemens pour programmer et configurer les automates S7."
          },
          {
            type: "text",
            content: "## Les composants de TIA Portal\n\n| Composant | Description |\n|-----------|-------------|\n| STEP 7 | Programmation des automates |\n| WinCC | Creation des interfaces IHM |\n| SINAMICS Startdrive | Configuration des variateurs |\n| SIMOTION SCOUT | Programmation motion control |"
          },
          {
            type: "diagram",
            title: "Interface TIA Portal",
            content: `┌──────────────────────────────────────────────────────────────┐
│  TIA Portal V18                                    [─][□][×] │
├──────────────────────────────────────────────────────────────┤
│  Projet │ Edition │ Affichage │ Outils │ Fenetre │ Aide     │
├─────────────┬────────────────────────────────────┬───────────┤
│             │                                    │           │
│  Arbre du   │     Zone de travail               │  Taches   │
│  projet     │                                    │           │
│             │  ┌─────────────────────────────┐  │  ┌─────┐  │
│  ▼ PLC_1    │  │                             │  │  │Biblio│  │
│   ├ Blocs   │  │   Editeur LAD/FBD/SCL       │  │  │theque│  │
│   ├ Tables  │  │                             │  │  │     │  │
│   └ Config  │  │                             │  │  └─────┘  │
│             │  └─────────────────────────────┘  │           │
│             │                                    │           │
├─────────────┴────────────────────────────────────┴───────────┤
│  Details │ Diagnostic │ Compilation │ Resultats              │
└──────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Vue portail vs Vue projet\n\n- **Vue portail** : Vue simplifiee pour demarrer rapidement\n- **Vue projet** : Vue complete pour la configuration avancee"
          }
        ]
      })
    },
    {
      title: "Gamme S7-1500 : choisir sa CPU",
      description: "Comprendre les differentes CPU de la gamme S7-1500",
      order: 3,
      xpReward: 65,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Gamme S7-1500 : choisir sa CPU\n\nLa gamme S7-1500 propose de nombreuses CPU adaptees a differents besoins."
          },
          {
            type: "text",
            content: "## Categories de CPU\n\n| Gamme | CPU | Performance | Usage |\n|-------|-----|-------------|-------|\n| Standard | 1511-1 PN | Entree de gamme | Petites machines |\n| Standard | 1513-1 PN | Moyenne | Machines moyennes |\n| Standard | 1515-2 PN | Haute | Lignes de production |\n| Standard | 1516-3 PN/DP | Tres haute | Systemes complexes |\n| Standard | 1518-4 PN/DP | Premium | Grandes installations |"
          },
          {
            type: "text",
            content: "## Versions speciales\n\n### CPU Compactes (C)\n- 1511C, 1512C : Entrees/sorties integrees\n- Ideales pour petites applications autonomes\n\n### CPU Failsafe (F)\n- 1511F, 1513F, 1515F, 1516F, 1518F\n- Fonctions de securite integrees (SIL 3 / PL e)\n- Pour applications ou la securite est critique\n\n### CPU Technologie (T)\n- 1511T, 1515T, 1516T, 1517T, 1518T\n- Motion Control avance integre\n- Pilotage d'axes synchronises"
          },
          {
            type: "info",
            content: "Siemens propose un outil de selection en ligne pour vous aider a choisir la CPU adaptee a votre application."
          }
        ]
      })
    },
    {
      title: "Modules d'entrees/sorties",
      description: "Les modules d'E/S pour le S7-1500",
      order: 4,
      xpReward: 70,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Modules d'entrees/sorties S7-1500\n\nLes modules d'E/S permettent de connecter capteurs et actionneurs a l'automate."
          },
          {
            type: "text",
            content: "## Modules d'entrees numeriques (DI)\n\n| Reference | Points | Tension | Particularite |\n|-----------|--------|---------|---------------|\n| DI 16x24VDC | 16 | 24V DC | Standard |\n| DI 32x24VDC | 32 | 24V DC | Haute densite |\n| DI 16x24VDC HF | 16 | 24V DC | Haute frequence |\n| DI 8xNAMUR | 8 | NAMUR | Zones Ex |"
          },
          {
            type: "text",
            content: "## Modules de sorties numeriques (DO)\n\n| Reference | Points | Type | Courant max |\n|-----------|--------|------|-------------|\n| DQ 16x24VDC/0.5A | 16 | Transistor | 0.5A |\n| DQ 32x24VDC/0.5A | 32 | Transistor | 0.5A |\n| DQ 8x24VDC/2A | 8 | Transistor | 2A |\n| DQ 8xRelay | 8 | Relais | 2A AC/DC |"
          },
          {
            type: "text",
            content: "## Modules analogiques\n\n### Entrees analogiques (AI)\n- AI 8xU/I : 8 voies tension/courant\n- AI 4xU/I/RTD/TC : 4 voies multifonction (PT100, thermocouple)\n\n### Sorties analogiques (AO)\n- AQ 4xU/I : 4 sorties tension/courant\n- AQ 8xU/I : 8 sorties haute densite"
          },
          {
            type: "diagram",
            title: "Configuration typique",
            content: `┌─────────────────────────────────────────────────────────────┐
│              CONFIGURATION S7-1500 TYPIQUE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ CPU  │ │ DI   │ │ DI   │ │ DQ   │ │ AI   │ │ AQ   │     │
│  │1515-2│ │ 32   │ │ 16   │ │ 16   │ │ 8    │ │ 4    │     │
│  │  PN  │ │24VDC │ │24VDC │ │24VDC │ │ U/I  │ │ U/I  │     │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘     │
│     │        │        │        │        │        │          │
│     └────────┴────────┴────────┴────────┴────────┘          │
│                        Rail DIN                              │
│                                                              │
│  Total : 48 DI + 16 DQ + 8 AI + 4 AQ                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      })
    },
    {
      title: "Communication PROFINET",
      description: "Comprendre le reseau industriel PROFINET",
      order: 5,
      xpReward: 75,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Communication PROFINET\n\n**PROFINET** est le reseau industriel Ethernet de Siemens, integre nativement dans le S7-1500."
          },
          {
            type: "text",
            content: "## Caracteristiques\n\n- **Base** : Ethernet standard (IEEE 802.3)\n- **Vitesse** : 100 Mbit/s ou 1 Gbit/s\n- **Temps de cycle** : < 1 ms (IRT)\n- **Topologies** : Etoile, ligne, anneau"
          },
          {
            type: "text",
            content: "## Classes de performance\n\n| Classe | Temps cycle | Usage |\n|--------|-------------|-------|\n| RT (Real-Time) | 1-10 ms | Automatisation standard |\n| IRT (Isochronous RT) | < 1 ms | Motion Control, synchronisation |\n| NRT (Non Real-Time) | > 10 ms | Donnees non critiques |"
          },
          {
            type: "diagram",
            title: "Topologie PROFINET",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    RESEAU PROFINET                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              ┌──────────────────────┐                       │
│              │     SWITCH SCALANCE  │                       │
│              └──────────┬───────────┘                       │
│                         │                                    │
│         ┌───────────────┼───────────────┐                   │
│         │               │               │                   │
│    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐              │
│    │  S7-1500 │    │   IHM   │    │ ET 200SP │              │
│    │Controleur│    │  Panel  │    │ E/S dist.│              │
│    └────┬────┘    └─────────┘    └────┬────┘              │
│         │                             │                      │
│    ┌────┴────┐                   ┌────┴────┐              │
│    │Variateur│                   │ Robot   │              │
│    │SINAMICS │                   │ KUKA    │              │
│    └─────────┘                   └─────────┘              │
│                                                              │
│    Tous les appareils communiquent sur le meme reseau       │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "PROFINET est compatible avec les protocoles IT standards (TCP/IP, HTTP, FTP) pour l'integration aux systemes d'information."
          }
        ]
      })
    },
    {
      title: "Diagnostic et maintenance",
      description: "Outils de diagnostic integres au S7-1500",
      order: 6,
      xpReward: 70,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Diagnostic et maintenance\n\nLe S7-1500 offre des fonctionnalites de diagnostic avancees pour faciliter la maintenance."
          },
          {
            type: "text",
            content: "## Ecran integre de la CPU\n\nL'ecran de la CPU affiche :\n- Etat de fonctionnement (RUN/STOP)\n- Adresse IP\n- Nom du projet\n- Diagnostics et erreurs\n- Heure et date"
          },
          {
            type: "text",
            content: "## Buffer de diagnostic\n\nLe buffer de diagnostic enregistre automatiquement :\n- Changements d'etat (demarrage, arret)\n- Defauts materiels\n- Erreurs de programme\n- Defaillances reseau\n- Messages utilisateur personnalises"
          },
          {
            type: "text",
            content: "## Serveur Web integre\n\nAccessible via navigateur a l'adresse IP de la CPU :\n\n| Page | Contenu |\n|------|--------|\n| Vue d'ensemble | Etat general, CPU info |\n| Diagnostic | Buffer, alarmes actives |\n| Variables | Lecture/ecriture de tags |\n| Messages | Historique des messages |\n| Fichiers | Acces aux fichiers de donnees |"
          },
          {
            type: "info",
            content: "Le serveur Web est desactive par defaut pour des raisons de securite. Activez-le dans TIA Portal si necessaire."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Presentation du S7-1500": {
        title: "Introduction to the S7-1500",
        description: "Discover the Siemens S7-1500 PLC and its features",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The Siemens S7-1500\n\nThe **S7-1500** is Siemens' high-end programmable logic controller, designed for maximum performance."
            },
            {
              type: "info",
              content: "The S7-1500 replaces the S7-300/400 series and offers increased performance, better diagnostics, and a modern design."
            },
            {
              type: "text",
              content: "## Key Features\n\n- **Integrated display**: Diagnostics and configuration without PC\n- **Enhanced security**: Protection against unauthorized access\n- **High performance**: Very fast cycle times\n- **Technology functions**: Motion control, PID built-in"
            },
            {
              type: "diagram",
              title: "S7-1500 Architecture",
              content: `┌─────────────────────────────────────────────────────────────────────┐
│                           S7-1500                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ││
│  │   │ DISPLAY │ │   CPU   │ │   DI    │ │   DQ    │ │   AI    │  ││
│  │   │         │ │ 1511-1  │ │  16x24V │ │  16x24V │ │   8x    │  ││
│  │   │  [===]  │ │  PN     │ │         │ │         │ │  0-10V  │  ││
│  │   │  [===]  │ │         │ │  o o o  │ │  o o o  │ │         │  ││
│  │   │  [===]  │ │  RUN    │ │  o o o  │ │  o o o  │ │  CH0-7  │  ││
│  │   │         │ │  STOP   │ │         │ │         │ │         │  ││
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  ││
│  │                                                                 ││
│  │   ════════════════════════════════════════════════════════════ ││
│  │                        PROFINET / PROFIBUS                      ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## CPU Range\n\n| CPU | Memory | Performance |\n|-----|--------|-------------|\n| 1511 | 150 KB | Entry-level |\n| 1513 | 300 KB | Standard |\n| 1515 | 500 KB | Advanced |\n| 1517 | 2 MB | High performance |\n| 1518 | 4 MB | Maximum |"
            }
          ]
        })
      },
      "L'environnement TIA Portal": {
        title: "The TIA Portal Environment",
        description: "Discover the TIA Portal development environment",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# TIA Portal\n\n**TIA Portal** (Totally Integrated Automation) is Siemens' unified engineering platform."
            },
            {
              type: "text",
              content: "## What is TIA Portal?\n\nTIA Portal brings together all automation tools in a single environment:\n\n- **Step 7**: PLC programming\n- **WinCC**: HMI visualization\n- **Startdrive**: Drive configuration\n- **Safety**: Safety programming"
            },
            {
              type: "diagram",
              title: "TIA Portal Interface",
              content: `┌───────────────────────────────────────────────────────────────┐
│  TIA Portal V17                                    [─][□][X]  │
├─────────────┬─────────────────────────────────────────────────┤
│ Project     │  Program blocks                                 │
│ ├─ PLC_1    │  ┌───────────────────────────────────────────┐  │
│ │  ├─ Prog  │  │  Main [OB1]                               │  │
│ │  │  ├─OB1 │  │                                           │  │
│ │  │  ├─FB1 │  │  --| |--| |------------------( )--        │  │
│ │  │  └─DB1 │  │   I0.0  I0.1                 Q0.0         │  │
│ │  ├─ Tech  │  │                                           │  │
│ │  └─ HMI   │  │  --| |------------------------( )--       │  │
│ └─ HMI_1    │  │   I0.2                        Q0.1         │  │
│                │  │                                           │  │
├─────────────┴─┴───────────────────────────────────────────────┤
│ Properties │ Info │ Diagnostics │ Cross-references            │
└───────────────────────────────────────────────────────────────┘`
            },
            {
              type: "info",
              content: "TIA Portal uses a \"Portal view\" for intuitive navigation and a \"Project view\" for detailed editing."
            },
            {
              type: "text",
              content: "## Key Features\n\n- **Unified interface**: Everything in one software\n- **Drag & drop**: Simplified configuration\n- **Integrated simulation**: PLCSIM for testing\n- **Libraries**: Reusable code blocks"
            }
          ]
        })
      },
      "Gamme S7-1500 : choisir sa CPU": {
        title: "S7-1500 Range: Choosing Your CPU",
        description: "Understanding the different CPUs in the S7-1500 range"
      },
      "Modules d'entrees/sorties": {
        title: "Input/Output Modules",
        description: "I/O modules for the S7-1500"
      },
      "Communication PROFINET": {
        title: "PROFINET Communication",
        description: "Understanding the PROFINET industrial network"
      },
      "Diagnostic et maintenance": {
        title: "Diagnostics and Maintenance",
        description: "Built-in diagnostic tools for the S7-1500"
      }
    },
    es: {
      "Presentation du S7-1500": {
        title: "Presentacion del S7-1500",
        description: "Descubre el PLC Siemens S7-1500 y sus caracteristicas",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# El Siemens S7-1500\n\nEl **S7-1500** es el controlador logico programable de gama alta de Siemens, disenado para el maximo rendimiento."
            },
            {
              type: "info",
              content: "El S7-1500 reemplaza la serie S7-300/400 y ofrece mayor rendimiento, mejor diagnostico y un diseno moderno."
            },
            {
              type: "text",
              content: "## Caracteristicas principales\n\n- **Pantalla integrada**: Diagnostico y configuracion sin PC\n- **Seguridad mejorada**: Proteccion contra acceso no autorizado\n- **Alto rendimiento**: Tiempos de ciclo muy rapidos\n- **Funciones tecnologicas**: Control de movimiento, PID integrado"
            },
            {
              type: "diagram",
              title: "Arquitectura S7-1500",
              content: `┌─────────────────────────────────────────────────────────────────────┐
│                           S7-1500                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  ││
│  │   │ DISPLAY │ │   CPU   │ │   DI    │ │   DQ    │ │   AI    │  ││
│  │   │         │ │ 1511-1  │ │  16x24V │ │  16x24V │ │   8x    │  ││
│  │   │  [===]  │ │  PN     │ │         │ │         │ │  0-10V  │  ││
│  │   │  [===]  │ │         │ │  o o o  │ │  o o o  │ │         │  ││
│  │   │  [===]  │ │  RUN    │ │  o o o  │ │  o o o  │ │  CH0-7  │  ││
│  │   │         │ │  STOP   │ │         │ │         │ │         │  ││
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  ││
│  │                                                                 ││
│  │   ════════════════════════════════════════════════════════════ ││
│  │                        PROFINET / PROFIBUS                      ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Gama de CPUs\n\n| CPU | Memoria | Rendimiento |\n|-----|---------|-------------|\n| 1511 | 150 KB | Entrada |\n| 1513 | 300 KB | Estandar |\n| 1515 | 500 KB | Avanzado |\n| 1517 | 2 MB | Alto rendimiento |\n| 1518 | 4 MB | Maximo |"
            }
          ]
        })
      },
      "L'environnement TIA Portal": {
        title: "El entorno TIA Portal",
        description: "Descubre el entorno de desarrollo TIA Portal",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# TIA Portal\n\n**TIA Portal** (Totally Integrated Automation) es la plataforma de ingenieria unificada de Siemens."
            },
            {
              type: "text",
              content: "## Que es TIA Portal?\n\nTIA Portal reune todas las herramientas de automatizacion en un solo entorno:\n\n- **Step 7**: Programacion de PLC\n- **WinCC**: Visualizacion HMI\n- **Startdrive**: Configuracion de variadores\n- **Safety**: Programacion de seguridad"
            },
            {
              type: "diagram",
              title: "Interfaz TIA Portal",
              content: `┌───────────────────────────────────────────────────────────────┐
│  TIA Portal V17                                    [─][□][X]  │
├─────────────┬─────────────────────────────────────────────────┤
│ Proyecto    │  Bloques de programa                            │
│ ├─ PLC_1    │  ┌───────────────────────────────────────────┐  │
│ │  ├─ Prog  │  │  Main [OB1]                               │  │
│ │  │  ├─OB1 │  │                                           │  │
│ │  │  ├─FB1 │  │  --| |--| |------------------( )--        │  │
│ │  │  └─DB1 │  │   I0.0  I0.1                 Q0.0         │  │
│ │  ├─ Tech  │  │                                           │  │
│ │  └─ HMI   │  │  --| |------------------------( )--       │  │
│ └─ HMI_1    │  │   I0.2                        Q0.1         │  │
│             │  │                                           │  │
├─────────────┴─┴───────────────────────────────────────────────┤
│ Propiedades │ Info │ Diagnostico │ Referencias cruzadas       │
└───────────────────────────────────────────────────────────────┘`
            },
            {
              type: "info",
              content: "TIA Portal utiliza una \"Vista de portal\" para navegacion intuitiva y una \"Vista de proyecto\" para edicion detallada."
            },
            {
              type: "text",
              content: "## Caracteristicas clave\n\n- **Interfaz unificada**: Todo en un solo software\n- **Arrastrar y soltar**: Configuracion simplificada\n- **Simulacion integrada**: PLCSIM para pruebas\n- **Bibliotecas**: Bloques de codigo reutilizables"
            }
          ]
        })
      },
      "Gamme S7-1500 : choisir sa CPU": {
        title: "Gama S7-1500: elegir su CPU",
        description: "Comprender las diferentes CPUs de la gama S7-1500"
      },
      "Modules d'entrees/sorties": {
        title: "Modulos de entradas/salidas",
        description: "Los modulos de E/S para el S7-1500"
      },
      "Communication PROFINET": {
        title: "Comunicacion PROFINET",
        description: "Comprender la red industrial PROFINET"
      },
      "Diagnostic et maintenance": {
        title: "Diagnostico y mantenimiento",
        description: "Herramientas de diagnostico integradas en el S7-1500"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1 quizzes (Presentation du S7-1500)
    [
      {
        question: "Quelle est la particularite du S7-1500 par rapport aux anciens automates Siemens ?",
        options: [
          "Il est moins cher",
          "Il dispose d'un ecran integre et de performances accrues",
          "Il ne necessite pas de programmation",
          "Il fonctionne sans alimentation"
        ],
        correctIndex: 1,
        explanation: "Le S7-1500 dispose d'un ecran frontal integre, de meilleures performances et d'un diagnostic ameliore par rapport aux S7-300/400.",
        order: 1
      },
      {
        question: "Quel logiciel est utilise pour programmer les S7-1500 ?",
        options: [
          "Step 7 Classic",
          "WinCC",
          "TIA Portal",
          "Logo! Soft Comfort"
        ],
        correctIndex: 2,
        explanation: "TIA Portal (Totally Integrated Automation) est l'environnement de programmation unifie pour les S7-1500.",
        order: 2
      },
      {
        question: "Quel protocole de communication industriel est integre nativement au S7-1500 ?",
        options: [
          "Modbus uniquement",
          "PROFINET et PROFIBUS",
          "Ethernet TCP uniquement",
          "RS-232"
        ],
        correctIndex: 1,
        explanation: "Le S7-1500 integre nativement PROFINET (Ethernet industriel) et peut communiquer en PROFIBUS.",
        order: 3
      },
      {
        question: "Quelle gamme d'automates le S7-1500 remplace-t-il progressivement ?",
        options: [
          "S7-200",
          "S7-300 et S7-400",
          "Logo!",
          "S5"
        ],
        correctIndex: 1,
        explanation: "Le S7-1500 remplace progressivement les S7-300 et S7-400 grace a ses performances superieures.",
        order: 4
      },
      {
        question: "Quelle fonctionnalite de securite est integree au S7-1500 ?",
        options: [
          "Antivirus",
          "Safety Integrated (fonctions de securite)",
          "Pare-feu materiel",
          "Cryptage AES-512"
        ],
        correctIndex: 1,
        explanation: "Safety Integrated permet d'implementer des fonctions de securite (arret d'urgence, surveillance) directement dans l'automate.",
        order: 5
      }
    ],
    // Lesson 2 quizzes (L'environnement TIA Portal)
    [
      {
        question: "Que signifie TIA dans TIA Portal ?",
        options: [
          "Total Industrial Automation",
          "Totally Integrated Automation",
          "Technical Integration Application",
          "Tool for Industrial Applications"
        ],
        correctIndex: 1,
        explanation: "TIA signifie Totally Integrated Automation, refletant l'integration de tous les outils de conception dans un seul environnement.",
        order: 1
      },
      {
        question: "Quelle vue de TIA Portal permet de voir tous les appareils du projet ?",
        options: [
          "Vue du programme",
          "Vue du portail",
          "Vue du projet",
          "Vue reseau"
        ],
        correctIndex: 2,
        explanation: "La Vue du projet affiche l'arborescence complete avec tous les appareils, programmes et configurations.",
        order: 2
      },
      {
        question: "Quel composant de TIA Portal permet de creer des interfaces IHM ?",
        options: [
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "SIMOTION SCOUT"
        ],
        correctIndex: 1,
        explanation: "WinCC est le composant de TIA Portal dedie a la creation des interfaces homme-machine (IHM).",
        order: 3
      },
      {
        question: "Quelle est la difference entre la vue Portail et la vue Projet ?",
        options: [
          "Il n'y a pas de difference",
          "Vue Portail = simplifiee, Vue Projet = complete",
          "Vue Portail = reseau, Vue Projet = programme",
          "Vue Portail = compilation, Vue Projet = edition"
        ],
        correctIndex: 1,
        explanation: "La vue Portail offre une interface simplifiee pour demarrer rapidement, la vue Projet donne acces a toutes les fonctionnalites.",
        order: 4
      },
      {
        question: "Quel composant de TIA Portal permet de configurer les variateurs Siemens ?",
        options: [
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "Proneta"
        ],
        correctIndex: 2,
        explanation: "SINAMICS Startdrive est l'outil integre a TIA Portal pour configurer et parametrer les variateurs SINAMICS.",
        order: 5
      }
    ],
    // Lesson 3 quizzes (Gamme S7-1500)
    [
      {
        question: "Que signifie le suffixe 'F' dans CPU 1515F ?",
        options: [
          "Fast (rapide)",
          "Failsafe (securite)",
          "Full (complet)",
          "Flexible"
        ],
        correctIndex: 1,
        explanation: "F signifie Failsafe, indiquant que la CPU integre des fonctions de securite certifiees SIL 3 / PL e.",
        order: 1
      },
      {
        question: "Quelle gamme de CPU integre des E/S ?",
        options: [
          "CPU standard",
          "CPU Failsafe (F)",
          "CPU Compacte (C)",
          "CPU Technologie (T)"
        ],
        correctIndex: 2,
        explanation: "Les CPU Compactes (1511C, 1512C) integrent des entrees/sorties directement sur le module CPU.",
        order: 2
      },
      {
        question: "Quelle CPU choisir pour du Motion Control avance ?",
        options: [
          "CPU 1511-1 PN",
          "CPU 1515F",
          "CPU 1516T",
          "CPU 1512C"
        ],
        correctIndex: 2,
        explanation: "Les CPU Technologie (T) integrent des fonctions Motion Control avancees pour le pilotage d'axes synchronises.",
        order: 3
      },
      {
        question: "Quelle est la CPU S7-1500 d'entree de gamme ?",
        options: [
          "CPU 1518-4",
          "CPU 1516-3",
          "CPU 1511-1 PN",
          "CPU 1515-2"
        ],
        correctIndex: 2,
        explanation: "La CPU 1511-1 PN est l'entree de gamme, adaptee aux petites machines et applications simples.",
        order: 4
      },
      {
        question: "Quel niveau de securite atteignent les CPU Failsafe ?",
        options: [
          "SIL 1 / PL a",
          "SIL 2 / PL c",
          "SIL 3 / PL e",
          "SIL 4 / PL g"
        ],
        correctIndex: 2,
        explanation: "Les CPU Failsafe S7-1500 atteignent le niveau SIL 3 selon IEC 62061 et PL e selon ISO 13849.",
        order: 5
      }
    ],
    // Lesson 4 quizzes (Modules E/S)
    [
      {
        question: "Que signifie DI dans la nomenclature des modules ?",
        options: [
          "Digital Interface",
          "Digital Input (Entree numerique)",
          "Data Input",
          "Direct Input"
        ],
        correctIndex: 1,
        explanation: "DI signifie Digital Input (entree numerique), par opposition a AI (Analog Input) pour les entrees analogiques.",
        order: 1
      },
      {
        question: "Quel type de module utiliser pour mesurer une temperature avec sonde PT100 ?",
        options: [
          "DI (entree numerique)",
          "DO (sortie numerique)",
          "AI avec RTD/TC",
          "AO (sortie analogique)"
        ],
        correctIndex: 2,
        explanation: "Les modules AI avec entrees RTD (PT100) ou TC (thermocouple) sont concus pour les mesures de temperature.",
        order: 2
      },
      {
        question: "Quel courant maximum supporte un module DQ 16x24VDC/0.5A par sortie ?",
        options: [
          "0.1 A",
          "0.5 A",
          "2 A",
          "5 A"
        ],
        correctIndex: 1,
        explanation: "Le module DQ 16x24VDC/0.5A supporte jusqu'a 0.5 ampere par sortie, comme indique dans sa reference.",
        order: 3
      },
      {
        question: "Quel type de module utiliser pour commander un contacteur AC ?",
        options: [
          "DQ transistor",
          "DQ relais",
          "AQ",
          "DI"
        ],
        correctIndex: 1,
        explanation: "Les modules a relais peuvent commuter du courant alternatif (AC), contrairement aux transistors qui ne fonctionnent qu'en DC.",
        order: 4
      },
      {
        question: "A quoi servent les modules NAMUR ?",
        options: [
          "Haute vitesse",
          "Zones explosives (Ex)",
          "Haute precision",
          "Communication reseau"
        ],
        correctIndex: 1,
        explanation: "Les modules NAMUR sont concus pour les zones explosives (ATEX), avec des niveaux de courant intrinsequement surs.",
        order: 5
      }
    ],
    // Lesson 5 quizzes (PROFINET)
    [
      {
        question: "Sur quelle technologie est base PROFINET ?",
        options: [
          "RS-485",
          "CAN",
          "Ethernet",
          "USB"
        ],
        correctIndex: 2,
        explanation: "PROFINET est base sur Ethernet standard (IEEE 802.3), permettant l'utilisation de composants reseau standards.",
        order: 1
      },
      {
        question: "Quel temps de cycle minimal atteint PROFINET IRT ?",
        options: [
          "< 1 ms",
          "1-10 ms",
          "> 10 ms",
          "100 ms"
        ],
        correctIndex: 0,
        explanation: "PROFINET IRT (Isochronous Real-Time) permet des temps de cycle inferieurs a 1 milliseconde pour le Motion Control.",
        order: 2
      },
      {
        question: "Quelle classe PROFINET convient a l'automatisation standard ?",
        options: [
          "NRT",
          "RT",
          "IRT",
          "TCP"
        ],
        correctIndex: 1,
        explanation: "PROFINET RT (Real-Time) avec des temps de cycle de 1-10 ms convient a la plupart des applications d'automatisation.",
        order: 3
      },
      {
        question: "Quelle topologie n'est PAS supportee par PROFINET ?",
        options: [
          "Etoile",
          "Ligne",
          "Anneau",
          "Toutes sont supportees"
        ],
        correctIndex: 3,
        explanation: "PROFINET supporte les topologies etoile, ligne et anneau, offrant une grande flexibilite d'installation.",
        order: 4
      },
      {
        question: "Quels protocoles IT sont compatibles avec PROFINET ?",
        options: [
          "TCP/IP uniquement",
          "HTTP uniquement",
          "TCP/IP, HTTP, FTP et autres",
          "Aucun protocole IT"
        ],
        correctIndex: 2,
        explanation: "PROFINET est compatible avec les protocoles IT standards (TCP/IP, HTTP, FTP) pour l'integration aux systemes d'information.",
        order: 5
      }
    ],
    // Lesson 6 quizzes (Diagnostic)
    [
      {
        question: "Qu'affiche l'ecran integre de la CPU S7-1500 ?",
        options: [
          "Uniquement l'heure",
          "Etat, IP, diagnostics, nom du projet",
          "Le programme LADDER",
          "La temperature de la CPU"
        ],
        correctIndex: 1,
        explanation: "L'ecran integre affiche l'etat (RUN/STOP), l'adresse IP, les diagnostics, le nom du projet et l'heure.",
        order: 1
      },
      {
        question: "Que contient le buffer de diagnostic ?",
        options: [
          "Uniquement les erreurs",
          "L'historique des evenements (etats, defauts, messages)",
          "Le code du programme",
          "Les valeurs des variables"
        ],
        correctIndex: 1,
        explanation: "Le buffer de diagnostic enregistre automatiquement les changements d'etat, defauts materiels, erreurs et messages.",
        order: 2
      },
      {
        question: "Comment accede-t-on au serveur Web integre ?",
        options: [
          "Via TIA Portal uniquement",
          "Via un navigateur web a l'adresse IP de la CPU",
          "Via une application dediee",
          "Via le port serie"
        ],
        correctIndex: 1,
        explanation: "Le serveur Web integre est accessible via n'importe quel navigateur web en entrant l'adresse IP de la CPU.",
        order: 3
      },
      {
        question: "Pourquoi le serveur Web est-il desactive par defaut ?",
        options: [
          "Pour economiser la memoire",
          "Pour des raisons de securite",
          "Car il n'est pas utile",
          "Pour accelerer le demarrage"
        ],
        correctIndex: 1,
        explanation: "Le serveur Web est desactive par defaut pour des raisons de securite, evitant les acces non autorises au systeme.",
        order: 4
      },
      {
        question: "Quelle page Web permet de lire/ecrire des variables ?",
        options: [
          "Vue d'ensemble",
          "Diagnostic",
          "Variables",
          "Messages"
        ],
        correctIndex: 2,
        explanation: "La page Variables du serveur Web permet de lire et ecrire des tags pour les tests et le diagnostic.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1 quizzes
      "Quelle est la particularite du S7-1500 par rapport aux anciens automates Siemens ?": {
        question: "What is unique about the S7-1500 compared to older Siemens PLCs?",
        options: [
          "It is cheaper",
          "It has an integrated display and improved performance",
          "It does not require programming",
          "It works without power"
        ],
        explanation: "The S7-1500 has an integrated front display, better performance, and improved diagnostics compared to the S7-300/400."
      },
      "Quel logiciel est utilise pour programmer les S7-1500 ?": {
        question: "What software is used to program the S7-1500?",
        options: [
          "Step 7 Classic",
          "WinCC",
          "TIA Portal",
          "Logo! Soft Comfort"
        ],
        explanation: "TIA Portal (Totally Integrated Automation) is the unified programming environment for the S7-1500."
      },
      "Quel protocole de communication industriel est integre nativement au S7-1500 ?": {
        question: "Which industrial communication protocol is natively integrated in the S7-1500?",
        options: [
          "Modbus only",
          "PROFINET and PROFIBUS",
          "Ethernet TCP only",
          "RS-232"
        ],
        explanation: "The S7-1500 natively integrates PROFINET (Industrial Ethernet) and can communicate via PROFIBUS."
      },
      "Quelle gamme d'automates le S7-1500 remplace-t-il progressivement ?": {
        question: "Which PLC series is the S7-1500 gradually replacing?",
        options: [
          "S7-200",
          "S7-300 and S7-400",
          "Logo!",
          "S5"
        ],
        explanation: "The S7-1500 is gradually replacing the S7-300 and S7-400 thanks to its superior performance."
      },
      "Quelle fonctionnalite de securite est integree au S7-1500 ?": {
        question: "What security feature is integrated into the S7-1500?",
        options: [
          "Antivirus",
          "Safety Integrated (safety functions)",
          "Hardware firewall",
          "AES-512 encryption"
        ],
        explanation: "Safety Integrated allows implementing safety functions (emergency stop, monitoring) directly in the PLC."
      },
      // Lesson 2 quizzes
      "Que signifie TIA dans TIA Portal ?": {
        question: "What does TIA stand for in TIA Portal?",
        options: [
          "Total Industrial Automation",
          "Totally Integrated Automation",
          "Technical Integration Application",
          "Tool for Industrial Applications"
        ],
        explanation: "TIA stands for Totally Integrated Automation, reflecting the integration of all design tools in a single environment."
      },
      "Quelle vue de TIA Portal permet de voir tous les appareils du projet ?": {
        question: "Which TIA Portal view allows you to see all project devices?",
        options: [
          "Program view",
          "Portal view",
          "Project view",
          "Network view"
        ],
        explanation: "The Project view displays the complete tree with all devices, programs, and configurations."
      },
      "Quel composant de TIA Portal permet de creer des interfaces IHM ?": {
        question: "Which TIA Portal component is used to create HMI interfaces?",
        options: [
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "SIMOTION SCOUT"
        ],
        explanation: "WinCC is the TIA Portal component dedicated to creating human-machine interfaces (HMI)."
      },
      "Quelle est la difference entre la vue Portail et la vue Projet ?": {
        question: "What is the difference between Portal view and Project view?",
        options: [
          "There is no difference",
          "Portal view = simplified, Project view = complete",
          "Portal view = network, Project view = program",
          "Portal view = compilation, Project view = editing"
        ],
        explanation: "Portal view offers a simplified interface for quick start, Project view gives access to all features."
      },
      "Quel composant de TIA Portal permet de configurer les variateurs Siemens ?": {
        question: "Which TIA Portal component is used to configure Siemens drives?",
        options: [
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "Proneta"
        ],
        explanation: "SINAMICS Startdrive is the tool integrated in TIA Portal for configuring and parameterizing SINAMICS drives."
      },
      // Lesson 3 quizzes
      "Que signifie le suffixe 'F' dans CPU 1515F ?": {
        question: "What does the 'F' suffix mean in CPU 1515F?",
        options: [
          "Fast",
          "Failsafe (safety)",
          "Full",
          "Flexible"
        ],
        explanation: "F stands for Failsafe, indicating that the CPU integrates certified safety functions SIL 3 / PL e."
      },
      "Quelle gamme de CPU integre des E/S ?": {
        question: "Which CPU range integrates I/O?",
        options: [
          "Standard CPU",
          "Failsafe CPU (F)",
          "Compact CPU (C)",
          "Technology CPU (T)"
        ],
        explanation: "Compact CPUs (1511C, 1512C) integrate inputs/outputs directly on the CPU module."
      },
      "Quelle CPU choisir pour du Motion Control avance ?": {
        question: "Which CPU should you choose for advanced Motion Control?",
        options: [
          "CPU 1511-1 PN",
          "CPU 1515F",
          "CPU 1516T",
          "CPU 1512C"
        ],
        explanation: "Technology CPUs (T) integrate advanced Motion Control functions for synchronized axis control."
      },
      "Quelle est la CPU S7-1500 d'entree de gamme ?": {
        question: "What is the entry-level S7-1500 CPU?",
        options: [
          "CPU 1518-4",
          "CPU 1516-3",
          "CPU 1511-1 PN",
          "CPU 1515-2"
        ],
        explanation: "The CPU 1511-1 PN is the entry-level, suitable for small machines and simple applications."
      },
      "Quel niveau de securite atteignent les CPU Failsafe ?": {
        question: "What safety level do Failsafe CPUs achieve?",
        options: [
          "SIL 1 / PL a",
          "SIL 2 / PL c",
          "SIL 3 / PL e",
          "SIL 4 / PL g"
        ],
        explanation: "S7-1500 Failsafe CPUs achieve SIL 3 level according to IEC 62061 and PL e according to ISO 13849."
      },
      // Lesson 4 quizzes
      "Que signifie DI dans la nomenclature des modules ?": {
        question: "What does DI mean in module nomenclature?",
        options: [
          "Digital Interface",
          "Digital Input",
          "Data Input",
          "Direct Input"
        ],
        explanation: "DI stands for Digital Input, as opposed to AI (Analog Input) for analog inputs."
      },
      "Quel type de module utiliser pour mesurer une temperature avec sonde PT100 ?": {
        question: "What type of module should be used to measure temperature with a PT100 sensor?",
        options: [
          "DI (digital input)",
          "DO (digital output)",
          "AI with RTD/TC",
          "AO (analog output)"
        ],
        explanation: "AI modules with RTD (PT100) or TC (thermocouple) inputs are designed for temperature measurements."
      },
      "Quel courant maximum supporte un module DQ 16x24VDC/0.5A par sortie ?": {
        question: "What maximum current does a DQ 16x24VDC/0.5A module support per output?",
        options: [
          "0.1 A",
          "0.5 A",
          "2 A",
          "5 A"
        ],
        explanation: "The DQ 16x24VDC/0.5A module supports up to 0.5 ampere per output, as indicated in its reference."
      },
      "Quel type de module utiliser pour commander un contacteur AC ?": {
        question: "What type of module should be used to control an AC contactor?",
        options: [
          "DQ transistor",
          "DQ relay",
          "AQ",
          "DI"
        ],
        explanation: "Relay modules can switch alternating current (AC), unlike transistors which only work in DC."
      },
      "A quoi servent les modules NAMUR ?": {
        question: "What are NAMUR modules used for?",
        options: [
          "High speed",
          "Explosive zones (Ex)",
          "High precision",
          "Network communication"
        ],
        explanation: "NAMUR modules are designed for explosive zones (ATEX), with intrinsically safe current levels."
      },
      // Lesson 5 quizzes
      "Sur quelle technologie est base PROFINET ?": {
        question: "What technology is PROFINET based on?",
        options: [
          "RS-485",
          "CAN",
          "Ethernet",
          "USB"
        ],
        explanation: "PROFINET is based on standard Ethernet (IEEE 802.3), allowing the use of standard network components."
      },
      "Quel temps de cycle minimal atteint PROFINET IRT ?": {
        question: "What minimum cycle time does PROFINET IRT achieve?",
        options: [
          "< 1 ms",
          "1-10 ms",
          "> 10 ms",
          "100 ms"
        ],
        explanation: "PROFINET IRT (Isochronous Real-Time) allows cycle times less than 1 millisecond for Motion Control."
      },
      "Quelle classe PROFINET convient a l'automatisation standard ?": {
        question: "Which PROFINET class is suitable for standard automation?",
        options: [
          "NRT",
          "RT",
          "IRT",
          "TCP"
        ],
        explanation: "PROFINET RT (Real-Time) with 1-10 ms cycle times is suitable for most automation applications."
      },
      "Quelle topologie n'est PAS supportee par PROFINET ?": {
        question: "Which topology is NOT supported by PROFINET?",
        options: [
          "Star",
          "Line",
          "Ring",
          "All are supported"
        ],
        explanation: "PROFINET supports star, line, and ring topologies, offering great installation flexibility."
      },
      "Quels protocoles IT sont compatibles avec PROFINET ?": {
        question: "Which IT protocols are compatible with PROFINET?",
        options: [
          "TCP/IP only",
          "HTTP only",
          "TCP/IP, HTTP, FTP and others",
          "No IT protocol"
        ],
        explanation: "PROFINET is compatible with standard IT protocols (TCP/IP, HTTP, FTP) for integration with information systems."
      },
      // Lesson 6 quizzes
      "Qu'affiche l'ecran integre de la CPU S7-1500 ?": {
        question: "What does the integrated display of the S7-1500 CPU show?",
        options: [
          "Time only",
          "Status, IP, diagnostics, project name",
          "The LADDER program",
          "The CPU temperature"
        ],
        explanation: "The integrated display shows status (RUN/STOP), IP address, diagnostics, project name, and time."
      },
      "Que contient le buffer de diagnostic ?": {
        question: "What does the diagnostic buffer contain?",
        options: [
          "Errors only",
          "Event history (states, faults, messages)",
          "The program code",
          "Variable values"
        ],
        explanation: "The diagnostic buffer automatically records state changes, hardware faults, errors, and messages."
      },
      "Comment accede-t-on au serveur Web integre ?": {
        question: "How do you access the integrated web server?",
        options: [
          "Via TIA Portal only",
          "Via a web browser at the CPU's IP address",
          "Via a dedicated application",
          "Via the serial port"
        ],
        explanation: "The integrated web server is accessible via any web browser by entering the CPU's IP address."
      },
      "Pourquoi le serveur Web est-il desactive par defaut ?": {
        question: "Why is the web server disabled by default?",
        options: [
          "To save memory",
          "For security reasons",
          "Because it's not useful",
          "To speed up startup"
        ],
        explanation: "The web server is disabled by default for security reasons, preventing unauthorized access to the system."
      },
      "Quelle page Web permet de lire/ecrire des variables ?": {
        question: "Which web page allows reading/writing variables?",
        options: [
          "Overview",
          "Diagnostic",
          "Variables",
          "Messages"
        ],
        explanation: "The Variables page on the web server allows reading and writing tags for testing and diagnostics."
      }
    },
    es: {
      // Lesson 1 quizzes
      "Quelle est la particularite du S7-1500 par rapport aux anciens automates Siemens ?": {
        question: "Cual es la particularidad del S7-1500 en comparacion con los antiguos PLCs Siemens?",
        options: [
          "Es mas barato",
          "Tiene una pantalla integrada y mejor rendimiento",
          "No requiere programacion",
          "Funciona sin alimentacion"
        ],
        explanation: "El S7-1500 tiene una pantalla frontal integrada, mejor rendimiento y diagnostico mejorado en comparacion con los S7-300/400."
      },
      "Quel logiciel est utilise pour programmer les S7-1500 ?": {
        question: "Que software se utiliza para programar los S7-1500?",
        options: [
          "Step 7 Classic",
          "WinCC",
          "TIA Portal",
          "Logo! Soft Comfort"
        ],
        explanation: "TIA Portal (Totally Integrated Automation) es el entorno de programacion unificado para los S7-1500."
      },
      "Quel protocole de communication industriel est integre nativement au S7-1500 ?": {
        question: "Que protocolo de comunicacion industrial esta integrado nativamente en el S7-1500?",
        options: [
          "Solo Modbus",
          "PROFINET y PROFIBUS",
          "Solo Ethernet TCP",
          "RS-232"
        ],
        explanation: "El S7-1500 integra nativamente PROFINET (Ethernet industrial) y puede comunicarse via PROFIBUS."
      },
      "Quelle gamme d'automates le S7-1500 remplace-t-il progressivement ?": {
        question: "Que gama de PLCs esta reemplazando gradualmente el S7-1500?",
        options: [
          "S7-200",
          "S7-300 y S7-400",
          "Logo!",
          "S5"
        ],
        explanation: "El S7-1500 esta reemplazando gradualmente los S7-300 y S7-400 gracias a su rendimiento superior."
      },
      "Quelle fonctionnalite de securite est integree au S7-1500 ?": {
        question: "Que funcion de seguridad esta integrada en el S7-1500?",
        options: [
          "Antivirus",
          "Safety Integrated (funciones de seguridad)",
          "Firewall de hardware",
          "Encriptacion AES-512"
        ],
        explanation: "Safety Integrated permite implementar funciones de seguridad (parada de emergencia, monitoreo) directamente en el PLC."
      },
      // Lesson 2 quizzes
      "Que signifie TIA dans TIA Portal ?": {
        question: "Que significa TIA en TIA Portal?",
        options: [
          "Total Industrial Automation",
          "Totally Integrated Automation",
          "Technical Integration Application",
          "Tool for Industrial Applications"
        ],
        explanation: "TIA significa Totally Integrated Automation, reflejando la integracion de todas las herramientas de diseno en un solo entorno."
      },
      "Quelle vue de TIA Portal permet de voir tous les appareils du projet ?": {
        question: "Que vista de TIA Portal permite ver todos los dispositivos del proyecto?",
        options: [
          "Vista de programa",
          "Vista de portal",
          "Vista de proyecto",
          "Vista de red"
        ],
        explanation: "La vista de proyecto muestra el arbol completo con todos los dispositivos, programas y configuraciones."
      },
      "Quel composant de TIA Portal permet de creer des interfaces IHM ?": {
        question: "Que componente de TIA Portal permite crear interfaces HMI?",
        options: [
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "SIMOTION SCOUT"
        ],
        explanation: "WinCC es el componente de TIA Portal dedicado a la creacion de interfaces hombre-maquina (HMI)."
      },
      "Quelle est la difference entre la vue Portail et la vue Projet ?": {
        question: "Cual es la diferencia entre la vista Portal y la vista Proyecto?",
        options: [
          "No hay diferencia",
          "Vista Portal = simplificada, Vista Proyecto = completa",
          "Vista Portal = red, Vista Proyecto = programa",
          "Vista Portal = compilacion, Vista Proyecto = edicion"
        ],
        explanation: "La vista Portal ofrece una interfaz simplificada para inicio rapido, la vista Proyecto da acceso a todas las funcionalidades."
      },
      "Quel composant de TIA Portal permet de configurer les variateurs Siemens ?": {
        question: "Que componente de TIA Portal permite configurar los variadores Siemens?",
        options: [
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "Proneta"
        ],
        explanation: "SINAMICS Startdrive es la herramienta integrada en TIA Portal para configurar y parametrizar los variadores SINAMICS."
      },
      // Lesson 3 quizzes
      "Que signifie le suffixe 'F' dans CPU 1515F ?": {
        question: "Que significa el sufijo 'F' en CPU 1515F?",
        options: [
          "Fast (rapido)",
          "Failsafe (seguridad)",
          "Full (completo)",
          "Flexible"
        ],
        explanation: "F significa Failsafe, indicando que la CPU integra funciones de seguridad certificadas SIL 3 / PL e."
      },
      "Quelle gamme de CPU integre des E/S ?": {
        question: "Que gama de CPU integra E/S?",
        options: [
          "CPU estandar",
          "CPU Failsafe (F)",
          "CPU Compacta (C)",
          "CPU Tecnologia (T)"
        ],
        explanation: "Las CPUs Compactas (1511C, 1512C) integran entradas/salidas directamente en el modulo CPU."
      },
      "Quelle CPU choisir pour du Motion Control avance ?": {
        question: "Que CPU elegir para Motion Control avanzado?",
        options: [
          "CPU 1511-1 PN",
          "CPU 1515F",
          "CPU 1516T",
          "CPU 1512C"
        ],
        explanation: "Las CPUs Tecnologia (T) integran funciones de Motion Control avanzadas para control de ejes sincronizados."
      },
      "Quelle est la CPU S7-1500 d'entree de gamme ?": {
        question: "Cual es la CPU S7-1500 de entrada de gama?",
        options: [
          "CPU 1518-4",
          "CPU 1516-3",
          "CPU 1511-1 PN",
          "CPU 1515-2"
        ],
        explanation: "La CPU 1511-1 PN es la entrada de gama, adecuada para maquinas pequenas y aplicaciones simples."
      },
      "Quel niveau de securite atteignent les CPU Failsafe ?": {
        question: "Que nivel de seguridad alcanzan las CPU Failsafe?",
        options: [
          "SIL 1 / PL a",
          "SIL 2 / PL c",
          "SIL 3 / PL e",
          "SIL 4 / PL g"
        ],
        explanation: "Las CPUs Failsafe S7-1500 alcanzan el nivel SIL 3 segun IEC 62061 y PL e segun ISO 13849."
      },
      // Lesson 4 quizzes
      "Que signifie DI dans la nomenclature des modules ?": {
        question: "Que significa DI en la nomenclatura de modulos?",
        options: [
          "Digital Interface",
          "Digital Input (Entrada digital)",
          "Data Input",
          "Direct Input"
        ],
        explanation: "DI significa Digital Input (entrada digital), a diferencia de AI (Analog Input) para entradas analogicas."
      },
      "Quel type de module utiliser pour mesurer une temperature avec sonde PT100 ?": {
        question: "Que tipo de modulo usar para medir temperatura con sonda PT100?",
        options: [
          "DI (entrada digital)",
          "DO (salida digital)",
          "AI con RTD/TC",
          "AO (salida analogica)"
        ],
        explanation: "Los modulos AI con entradas RTD (PT100) o TC (termopar) estan disenados para mediciones de temperatura."
      },
      "Quel courant maximum supporte un module DQ 16x24VDC/0.5A par sortie ?": {
        question: "Que corriente maxima soporta un modulo DQ 16x24VDC/0.5A por salida?",
        options: [
          "0.1 A",
          "0.5 A",
          "2 A",
          "5 A"
        ],
        explanation: "El modulo DQ 16x24VDC/0.5A soporta hasta 0.5 amperios por salida, como indica su referencia."
      },
      "Quel type de module utiliser pour commander un contacteur AC ?": {
        question: "Que tipo de modulo usar para controlar un contactor AC?",
        options: [
          "DQ transistor",
          "DQ rele",
          "AQ",
          "DI"
        ],
        explanation: "Los modulos de rele pueden conmutar corriente alterna (AC), a diferencia de los transistores que solo funcionan en DC."
      },
      "A quoi servent les modules NAMUR ?": {
        question: "Para que sirven los modulos NAMUR?",
        options: [
          "Alta velocidad",
          "Zonas explosivas (Ex)",
          "Alta precision",
          "Comunicacion de red"
        ],
        explanation: "Los modulos NAMUR estan disenados para zonas explosivas (ATEX), con niveles de corriente intrinsecamente seguros."
      },
      // Lesson 5 quizzes
      "Sur quelle technologie est base PROFINET ?": {
        question: "En que tecnologia se basa PROFINET?",
        options: [
          "RS-485",
          "CAN",
          "Ethernet",
          "USB"
        ],
        explanation: "PROFINET se basa en Ethernet estandar (IEEE 802.3), permitiendo el uso de componentes de red estandar."
      },
      "Quel temps de cycle minimal atteint PROFINET IRT ?": {
        question: "Que tiempo de ciclo minimo alcanza PROFINET IRT?",
        options: [
          "< 1 ms",
          "1-10 ms",
          "> 10 ms",
          "100 ms"
        ],
        explanation: "PROFINET IRT (Isochronous Real-Time) permite tiempos de ciclo inferiores a 1 milisegundo para Motion Control."
      },
      "Quelle classe PROFINET convient a l'automatisation standard ?": {
        question: "Que clase PROFINET es adecuada para automatizacion estandar?",
        options: [
          "NRT",
          "RT",
          "IRT",
          "TCP"
        ],
        explanation: "PROFINET RT (Real-Time) con tiempos de ciclo de 1-10 ms es adecuado para la mayoria de aplicaciones de automatizacion."
      },
      "Quelle topologie n'est PAS supportee par PROFINET ?": {
        question: "Que topologia NO es soportada por PROFINET?",
        options: [
          "Estrella",
          "Linea",
          "Anillo",
          "Todas son soportadas"
        ],
        explanation: "PROFINET soporta topologias de estrella, linea y anillo, ofreciendo gran flexibilidad de instalacion."
      },
      "Quels protocoles IT sont compatibles avec PROFINET ?": {
        question: "Que protocolos IT son compatibles con PROFINET?",
        options: [
          "Solo TCP/IP",
          "Solo HTTP",
          "TCP/IP, HTTP, FTP y otros",
          "Ningun protocolo IT"
        ],
        explanation: "PROFINET es compatible con protocolos IT estandar (TCP/IP, HTTP, FTP) para integracion con sistemas de informacion."
      },
      // Lesson 6 quizzes
      "Qu'affiche l'ecran integre de la CPU S7-1500 ?": {
        question: "Que muestra la pantalla integrada de la CPU S7-1500?",
        options: [
          "Solo la hora",
          "Estado, IP, diagnosticos, nombre del proyecto",
          "El programa LADDER",
          "La temperatura de la CPU"
        ],
        explanation: "La pantalla integrada muestra el estado (RUN/STOP), direccion IP, diagnosticos, nombre del proyecto y hora."
      },
      "Que contient le buffer de diagnostic ?": {
        question: "Que contiene el buffer de diagnostico?",
        options: [
          "Solo errores",
          "Historial de eventos (estados, fallos, mensajes)",
          "El codigo del programa",
          "Valores de variables"
        ],
        explanation: "El buffer de diagnostico registra automaticamente cambios de estado, fallos de hardware, errores y mensajes."
      },
      "Comment accede-t-on au serveur Web integre ?": {
        question: "Como se accede al servidor Web integrado?",
        options: [
          "Solo via TIA Portal",
          "Via un navegador web en la direccion IP de la CPU",
          "Via una aplicacion dedicada",
          "Via el puerto serie"
        ],
        explanation: "El servidor Web integrado es accesible via cualquier navegador web ingresando la direccion IP de la CPU."
      },
      "Pourquoi le serveur Web est-il desactive par defaut ?": {
        question: "Por que el servidor Web esta desactivado por defecto?",
        options: [
          "Para ahorrar memoria",
          "Por razones de seguridad",
          "Porque no es util",
          "Para acelerar el arranque"
        ],
        explanation: "El servidor Web esta desactivado por defecto por razones de seguridad, evitando accesos no autorizados al sistema."
      },
      "Quelle page Web permet de lire/ecrire des variables ?": {
        question: "Que pagina Web permite leer/escribir variables?",
        options: [
          "Vista general",
          "Diagnostico",
          "Variables",
          "Mensajes"
        ],
        explanation: "La pagina Variables del servidor Web permite leer y escribir tags para pruebas y diagnostico."
      }
    }
  }
}
