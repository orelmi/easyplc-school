// Module 3: LADDER Language
import type { ModuleData } from '../types.js'

export const module03Data: ModuleData = {
  // Module info
  moduleOrder: 3,
  moduleTitle: "Langage LADDER",
  moduleDescription: "Apprenez à programmer en langage LADDER (schéma à contacts)",
  moduleTranslations: {
    en: {
      title: "LADDER Language",
      description: "Learn to program in LADDER language (contact diagram)"
    },
    es: {
      title: "Lenguaje LADDER",
      description: "Aprenda a programar en lenguaje LADDER (diagrama de contactos)"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Introduction au langage LADDER",
      description: "Découvrez le langage de programmation graphique LADDER",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le Langage LADDER\n\nLe **LADDER** (échelle en anglais) est un langage graphique qui ressemble aux schémas électriques à relais."
          },
          {
            type: "text",
            content: "## Pourquoi LADDER ?\n\n- Facile à comprendre pour les électriciens\n- Représentation visuelle intuitive\n- Standard industriel (IEC 61131-3)\n- Idéal pour la logique combinatoire"
          },
          {
            type: "text",
            content: "## Structure d'un programme LADDER\n\n```\n   |     Contact     Contact      Bobine    |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- Le courant \"circule\" de gauche à droite\n- Les contacts laissent passer ou bloquent le courant\n- Les bobines sont activées si le courant les atteint"
          },
          {
            type: "text",
            content: "## Éléments de base\n\n| Symbole | Nom | Description |\n|---------|-----|-------------|\n| --[ ]-- | Contact NO | Passant si l'entrée = 1 |\n| --[/]-- | Contact NF | Passant si l'entrée = 0 |\n| --( )-- | Bobine | Activée si courant arrive |\n| --(/)-- | Bobine inversée | Activée si pas de courant |"
          }
        ]
      })
    },
    {
      title: "Contacts et bobines",
      description: "Maîtrisez les contacts NO, NF et les différents types de bobines",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Contacts et Bobines en LADDER\n\nLes contacts et bobines sont les éléments fondamentaux de la programmation LADDER."
          },
          {
            type: "text",
            content: "## Types de contacts\n\n### Contact Normalement Ouvert (NO)\n```\n--[ ]--\n```\nLaisse passer le courant quand la variable associée est à 1.\n\n### Contact Normalement Fermé (NF)\n```\n--[/]--\n```\nLaisse passer le courant quand la variable associée est à 0."
          },
          {
            type: "text",
            content: "## Types de bobines\n\n### Bobine simple\n```\n--( )--\n```\nS'active quand le courant arrive, se désactive sinon.\n\n### Bobine SET (mémorisation)\n```\n--(S)--\n```\nS'active quand le courant arrive et **reste active**.\n\n### Bobine RESET\n```\n--(R)--\n```\nDésactive une bobine SET."
          },
          {
            type: "warning",
            content: "Attention : Une bobine SET reste active même si la condition n'est plus vraie. Il faut utiliser RESET pour la désactiver !"
          }
        ]
      })
    },
    {
      title: "Circuit marche/arrêt avec auto-maintien",
      description: "Programmez le circuit classique de démarrage/arrêt moteur",
      order: 3,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Circuit Marche/Arrêt avec Auto-maintien\n\nC'est le circuit de base pour commander un moteur avec deux boutons : START et STOP."
          },
          {
            type: "diagram",
            title: "Schéma LADDER du circuit",
            content: `┌─────────────────────────────────────────────────────────────┐
│           CIRCUIT MARCHE/ARRÊT AVEC AUTO-MAINTIEN            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Réseau 1 : Commande du moteur                             │
│                                                              │
│   |     STOP      START        MOTEUR                       │
│   |----[/]----+---[ ]----+-----( )------|                   │
│   |           |          |              |                   │
│   |           |  MOTEUR  |              |                   │
│   |           +---[ ]----+              |                   │
│   |                                     |                   │
│   |    Contact NF    Contacts en        Bobine              │
│   |    pour STOP     parallèle pour     moteur              │
│   |                  auto-maintien                          │
│                                                              │
│   Fonctionnement :                                          │
│   1. Appui START → MOTEUR = 1                               │
│   2. Relâche START → MOTEUR reste à 1 (auto-maintien)       │
│   3. Appui STOP → Coupe le courant → MOTEUR = 0            │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Pourquoi un contact NF pour STOP ?\n\nLe bouton STOP utilise un contact normalement fermé pour :\n\n1. **Sécurité** : Si le fil est coupé, le moteur s'arrête\n2. **Logique intuitive** : Appuyer sur STOP coupe le courant\n3. **Conformité** : Respect des normes de sécurité"
          },
          {
            type: "text",
            content: "## L'auto-maintien\n\nLe contact MOTEUR en parallèle avec START permet de **maintenir** l'alimentation de la bobine après avoir relâché le bouton START.\n\nC'est le principe du **relais à accrochage**."
          },
          {
            type: "info",
            content: "Ce circuit est la base de 90% des commandes de moteurs en industrie. Maîtrisez-le parfaitement !"
          }
        ]
      })
    },
    {
      title: "Les temporisateurs",
      description: "Apprenez à utiliser les temporisateurs TON, TOF et TP",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Temporisateurs en LADDER\n\nLes temporisateurs permettent de créer des **délais** dans le programme."
          },
          {
            type: "text",
            content: "## TON - Temporisateur à l'enclenchement\n\n```\n   |     IN                        Q\n   |----[ ]----[TON T#5s]----( )---||\n```\n\n- La sortie Q passe à 1 **après 5 secondes** si IN reste à 1\n- Si IN repasse à 0 avant 5s, le timer se réinitialise\n- Utilisation : Délai avant démarrage, anti-rebond"
          },
          {
            type: "text",
            content: "## TOF - Temporisateur au déclenchement\n\n```\n   |     IN                        Q\n   |----[ ]----[TOF T#3s]----( )---||\n```\n\n- Q est à 1 tant que IN est à 1\n- Quand IN passe à 0, Q reste à 1 pendant **3 secondes**\n- Utilisation : Maintien d'une ventilation, éclairage retardé"
          },
          {
            type: "text",
            content: "## TP - Impulsion (Pulse)\n\n```\n   |     IN                        Q\n   |----[ ]----[TP T#2s]-----( )---||\n```\n\n- Q passe à 1 pendant **exactement 2 secondes** quand IN passe à 1\n- Utilisation : Signal d'impulsion, buzzer"
          },
          {
            type: "diagram",
            title: "Chronogrammes des temporisateurs",
            content: `┌─────────────────────────────────────────────────────────────┐
│               CHRONOGRAMMES DES TIMERS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TON (délai à l'enclenchement)                              │
│  IN  ____████████████____                                   │
│  Q   _________██████____     (délai avant activation)       │
│          ↑ PT  ↑                                            │
│                                                              │
│  TOF (délai au déclenchement)                               │
│  IN  ____████████________                                   │
│  Q   ____████████████____    (maintien après désactivation) │
│                  ↑ PT  ↑                                    │
│                                                              │
│  TP (impulsion)                                              │
│  IN  ____█_______________                                   │
│  Q   ____████____________    (impulsion de durée PT)        │
│          ↑ PT ↑                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      })
    },
    {
      title: "Les compteurs",
      description: "Utilisez les compteurs CTU, CTD et CTUD",
      order: 5,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Compteurs en LADDER\n\nLes compteurs permettent de **compter** des événements (pièces, cycles, impulsions...)."
          },
          {
            type: "text",
            content: "## CTU - Compteur incrémental\n\n```\n   |     CU                        Q\n   |----[P]----[CTU PV:10]---( )---||\n   |     R                         |\n   |----[ ]----[RESET]             |\n```\n\n- Chaque front montant sur CU incrémente le compteur\n- Q = 1 quand CV ≥ PV (valeur présélectionnée)\n- R remet le compteur à zéro"
          },
          {
            type: "text",
            content: "## CTD - Compteur décrémental\n\n- Initialisé à PV\n- Chaque front montant sur CD décrémente\n- Q = 1 quand CV ≤ 0"
          },
          {
            type: "text",
            content: "## CTUD - Compteur bidirectionnel\n\n- CU incrémente\n- CD décrémente\n- QU = 1 si CV ≥ PV\n- QD = 1 si CV ≤ 0\n- R et LD pour reset et chargement"
          },
          {
            type: "text",
            content: "## Applications\n\n| Application | Type | Exemple |\n|-------------|------|----------|\n| Comptage de pièces | CTU | 100 pièces → alerte |\n| Dosage | CTD | 10 doses → stop |\n| Stock | CTUD | Entrées/sorties magasin |"
          }
        ]
      })
    },
    {
      title: "Détection de fronts",
      description: "Détectez les fronts montants et descendants",
      order: 6,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Détection de Fronts\n\nUn **front** est le moment où un signal change d'état. La détection de front est essentielle pour réagir à un **événement** plutôt qu'à un état."
          },
          {
            type: "text",
            content: "## Front montant (Rising Edge)\n\n```\n   |     IN                         Q\n   |----[P]------------------------( )---||\n```\n\n- Q = 1 pendant **un seul cycle** quand IN passe de 0 à 1\n- Symbole : P ou R_TRIG"
          },
          {
            type: "text",
            content: "## Front descendant (Falling Edge)\n\n```\n   |     IN                         Q\n   |----[N]------------------------( )---||\n```\n\n- Q = 1 pendant **un seul cycle** quand IN passe de 1 à 0\n- Symbole : N ou F_TRIG"
          },
          {
            type: "diagram",
            title: "Chronogramme des fronts",
            content: `┌─────────────────────────────────────────────────────────────┐
│                 DÉTECTION DE FRONTS                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Signal IN                                                   │
│  _______████████████████_______██████______                 │
│         ↑              ↓       ↑     ↓                      │
│                                                              │
│  Front montant [P]                                          │
│  _______█_______________       █___________                 │
│         ↑ impulsion 1 cycle    ↑                           │
│                                                              │
│  Front descendant [N]                                       │
│  ________________█_____________      █_____                 │
│                  ↑ impulsion          ↑                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Applications\n\n- **Comptage** : Compter chaque appui sur un bouton (pas plusieurs fois)\n- **Démarrage** : Déclencher une séquence sur appui\n- **Bascule** : Inverser un état à chaque appui (toggle)"
          }
        ]
      })
    },
    {
      title: "Blocs fonctionnels et réutilisation",
      description: "Créez des blocs réutilisables pour structurer vos programmes",
      order: 7,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Blocs Fonctionnels et Réutilisation\n\nPour des programmes complexes, il est essentiel de **structurer** le code en blocs réutilisables."
          },
          {
            type: "text",
            content: "## Pourquoi structurer ?\n\n- **Lisibilité** : Code plus facile à comprendre\n- **Maintenance** : Modifications localisées\n- **Réutilisation** : Un bloc = plusieurs instances\n- **Test** : Chaque bloc peut être testé séparément"
          },
          {
            type: "text",
            content: "## Types de blocs (IEC 61131-3)\n\n| Type | Mémoire | Usage |\n|------|---------|-------|\n| **FC** (Function) | Non | Calculs, logique sans mémoire |\n| **FB** (Function Block) | Oui | Timer, compteur, régulateur |\n| **OB** (Organization Block) | - | Point d'entrée (Main, interruptions) |"
          },
          {
            type: "diagram",
            title: "Exemple de structuration",
            content: `┌─────────────────────────────────────────────────────────────┐
│              STRUCTURE D'UN PROGRAMME                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌────────────┐                           │
│                    │    OB1     │  Programme principal       │
│                    │   (Main)   │                           │
│                    └─────┬──────┘                           │
│                          │                                   │
│          ┌───────────────┼───────────────┐                  │
│          │               │               │                   │
│    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐           │
│    │ FB_Moteur │   │ FB_Vanne  │   │ FC_Alarme │           │
│    │ Instance1 │   │ Instance1 │   │           │           │
│    └───────────┘   └───────────┘   └───────────┘           │
│          │                                                   │
│    ┌─────┴─────┐                                            │
│    │ FB_Moteur │  Même bloc, autre instance                 │
│    │ Instance2 │                                            │
│    └───────────┘                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "Un FB est comme un 'modèle' : chaque instance a ses propres données mais partage le même code."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Introduction au langage LADDER": {
        title: "Introduction to LADDER Language",
        description: "Discover the LADDER graphical programming language",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# The LADDER Language\n\n**LADDER** (ladder in English) is a graphical language that resembles relay electrical diagrams."
            },
            {
              type: "text",
              content: "## Why LADDER?\n\n- Easy to understand for electricians\n- Intuitive visual representation\n- Industrial standard (IEC 61131-3)\n- Ideal for combinational logic"
            },
            {
              type: "text",
              content: "## Structure of a LADDER program\n\n```\n   |     Contact     Contact      Coil      |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- Current \"flows\" from left to right\n- Contacts allow or block current flow\n- Coils are activated if current reaches them"
            },
            {
              type: "text",
              content: "## Basic Elements\n\n| Symbol | Name | Description |\n|---------|-----|-------------|\n| --[ ]-- | NO Contact | Passes if input = 1 |\n| --[/]-- | NC Contact | Passes if input = 0 |\n| --( )-- | Coil | Activated if current arrives |\n| --(/)-- | Inverted Coil | Activated if no current |"
            }
          ]
        })
      },
      "Contacts et bobines": {
        title: "Contacts and Coils",
        description: "Master NO, NC contacts and different types of coils",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Contacts and Coils in LADDER\n\nContacts and coils are the fundamental elements of LADDER programming."
            },
            {
              type: "text",
              content: "## Types of Contacts\n\n### Normally Open Contact (NO)\n```\n--[ ]--\n```\nAllows current to pass when the associated variable is 1.\n\n### Normally Closed Contact (NC)\n```\n--[/]--\n```\nAllows current to pass when the associated variable is 0."
            },
            {
              type: "text",
              content: "## Types of Coils\n\n### Simple Coil\n```\n--( )--\n```\nActivates when current arrives, deactivates otherwise.\n\n### SET Coil (latch)\n```\n--(S)--\n```\nActivates when current arrives and **stays active**.\n\n### RESET Coil\n```\n--(R)--\n```\nDeactivates a SET coil."
            },
            {
              type: "warning",
              content: "Warning: A SET coil remains active even if the condition is no longer true. You must use RESET to deactivate it!"
            }
          ]
        })
      },
      "Circuit marche/arrêt avec auto-maintien": {
        title: "Start/Stop Circuit with Self-Holding",
        description: "Learn how to create latching circuits"
      },
      "Les temporisateurs": {
        title: "Timers",
        description: "Master different timer types in PLCs"
      },
      "Les compteurs": {
        title: "Counters",
        description: "Learn to use up/down counters"
      },
      "Détection de fronts": {
        title: "Edge Detection",
        description: "Detect rising and falling edges"
      },
      "Blocs fonctionnels et réutilisation": {
        title: "Function Blocks and Reuse",
        description: "Create reusable function blocks"
      }
    },
    es: {
      "Introduction au langage LADDER": {
        title: "Introduccion al lenguaje LADDER",
        description: "Descubra el lenguaje de programacion grafico LADDER",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# El lenguaje LADDER\n\n**LADDER** (escalera en ingles) es un lenguaje grafico que se asemeja a los diagramas electricos de reles."
            },
            {
              type: "text",
              content: "## Por que LADDER?\n\n- Facil de entender para electricistas\n- Representacion visual intuitiva\n- Estandar industrial (IEC 61131-3)\n- Ideal para logica combinacional"
            },
            {
              type: "text",
              content: "## Estructura de un programa LADDER\n\n```\n   |     Contacto   Contacto      Bobina    |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- La corriente \"fluye\" de izquierda a derecha\n- Los contactos permiten o bloquean el flujo de corriente\n- Las bobinas se activan si la corriente llega a ellas"
            },
            {
              type: "text",
              content: "## Elementos basicos\n\n| Simbolo | Nombre | Descripcion |\n|---------|-----|-------------|\n| --[ ]-- | Contacto NA | Pasa si entrada = 1 |\n| --[/]-- | Contacto NC | Pasa si entrada = 0 |\n| --( )-- | Bobina | Activada si llega corriente |\n| --(/)-- | Bobina invertida | Activada si no hay corriente |"
            }
          ]
        })
      },
      "Contacts et bobines": {
        title: "Contactos y bobinas",
        description: "Domine los contactos NA, NC y los diferentes tipos de bobinas",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Contactos y bobinas en LADDER\n\nLos contactos y las bobinas son los elementos fundamentales de la programacion LADDER."
            },
            {
              type: "text",
              content: "## Tipos de contactos\n\n### Contacto Normalmente Abierto (NA)\n```\n--[ ]--\n```\nPermite el paso de corriente cuando la variable asociada es 1.\n\n### Contacto Normalmente Cerrado (NC)\n```\n--[/]--\n```\nPermite el paso de corriente cuando la variable asociada es 0."
            },
            {
              type: "text",
              content: "## Tipos de bobinas\n\n### Bobina simple\n```\n--( )--\n```\nSe activa cuando llega corriente, se desactiva en caso contrario.\n\n### Bobina SET (enclavamiento)\n```\n--(S)--\n```\nSe activa cuando llega corriente y **permanece activa**.\n\n### Bobina RESET\n```\n--(R)--\n```\nDesactiva una bobina SET."
            },
            {
              type: "warning",
              content: "Atencion: Una bobina SET permanece activa incluso si la condicion ya no es verdadera. Debe usar RESET para desactivarla!"
            }
          ]
        })
      },
      "Circuit marche/arrêt avec auto-maintien": {
        title: "Circuito marcha/paro con autoenclavamiento",
        description: "Aprenda a crear circuitos enclavados"
      },
      "Les temporisateurs": {
        title: "Temporizadores",
        description: "Domine los diferentes tipos de temporizadores"
      },
      "Les compteurs": {
        title: "Contadores",
        description: "Aprenda a usar contadores ascendentes/descendentes"
      },
      "Détection de fronts": {
        title: "Deteccion de flancos",
        description: "Detecte flancos ascendentes y descendentes"
      },
      "Blocs fonctionnels et réutilisation": {
        title: "Bloques funcionales y reutilizacion",
        description: "Cree bloques de funcion reutilizables"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Introduction au langage LADDER (5 questions)
    [
      {
        question: "Pourquoi le langage LADDER est-il populaire ?",
        options: [
          "C'est le plus recent",
          "Il ressemble aux schemas electriques",
          "Il est le plus rapide",
          "Il est gratuit"
        ],
        correctIndex: 1,
        explanation: "Le LADDER ressemble aux schemas electriques a relais, ce qui le rend intuitif pour les electriciens.",
        order: 1
      },
      {
        question: "Dans quel sens le 'courant' circule-t-il en LADDER ?",
        options: [
          "De droite a gauche",
          "De gauche a droite",
          "De haut en bas",
          "Dans les deux sens"
        ],
        correctIndex: 1,
        explanation: "En LADDER, le courant logique circule de gauche a droite, de la barre d'alimentation vers les bobines.",
        order: 2
      },
      {
        question: "Quelle norme internationale definit le langage LADDER ?",
        options: [
          "ISO 9001",
          "IEC 61131-3",
          "IEEE 802.3",
          "EN 60204"
        ],
        correctIndex: 1,
        explanation: "La norme IEC 61131-3 definit les langages de programmation des automates, dont le LADDER.",
        order: 3
      },
      {
        question: "Que represente le symbole --[ ]-- en LADDER ?",
        options: [
          "Une bobine",
          "Un contact normalement ouvert (NO)",
          "Un contact normalement ferme (NF)",
          "Un temporisateur"
        ],
        correctIndex: 1,
        explanation: "Le symbole --[ ]-- represente un contact normalement ouvert qui conduit quand l'entree est a 1.",
        order: 4
      },
      {
        question: "Que represente le symbole --( )-- en LADDER ?",
        options: [
          "Un contact",
          "Une bobine",
          "Un temporisateur",
          "Un compteur"
        ],
        correctIndex: 1,
        explanation: "Le symbole --( )-- represente une bobine qui s'active quand le courant l'atteint.",
        order: 5
      }
    ],
    // Lesson 2: Contacts et bobines (5 questions)
    [
      {
        question: "Quelle est la difference entre une bobine simple et une bobine SET ?",
        options: [
          "Il n'y a pas de difference",
          "La bobine SET reste active meme si la condition n'est plus vraie",
          "La bobine SET est plus rapide",
          "La bobine SET utilise moins de memoire"
        ],
        correctIndex: 1,
        explanation: "Une bobine SET memorise son etat : elle reste active meme si la condition n'est plus vraie.",
        order: 1
      },
      {
        question: "Comment desactive-t-on une bobine SET ?",
        options: [
          "Elle se desactive automatiquement",
          "Avec une bobine RESET",
          "En coupant l'alimentation",
          "En utilisant un contact NF"
        ],
        correctIndex: 1,
        explanation: "Une bobine SET ne peut etre desactivee qu'avec une bobine RESET sur la meme variable.",
        order: 2
      },
      {
        question: "Quel symbole represente un contact normalement ferme ?",
        options: [
          "--[ ]--",
          "--[/]--",
          "--( )--",
          "--(S)--"
        ],
        correctIndex: 1,
        explanation: "Le symbole --[/]-- represente un contact normalement ferme (la barre oblique indique l'inversion).",
        order: 3
      },
      {
        question: "Dans un circuit marche/arret avec auto-maintien, qu'est-ce qui permet au moteur de rester en marche apres avoir relache le bouton START ?",
        options: [
          "La bobine SET",
          "Le contact de la sortie moteur en parallele",
          "Le temporisateur",
          "Le contact NF"
        ],
        correctIndex: 1,
        explanation: "L'auto-maintien utilise un contact de la sortie moteur en parallele avec le bouton START pour maintenir l'activation.",
        order: 4
      },
      {
        question: "Pourquoi utilise-t-on un contact NF pour le bouton STOP dans un circuit marche/arret ?",
        options: [
          "Pour economiser de l'energie",
          "Pour couper le courant quand STOP est appuye",
          "C'est une obligation legale",
          "Pour accelerer le programme"
        ],
        correctIndex: 1,
        explanation: "Un contact NF sur STOP coupe le courant quand on appuie sur le bouton, arretant ainsi le moteur.",
        order: 5
      }
    ],
    // Lesson 3: Circuit marche/arret avec auto-maintien (5 questions)
    [
      {
        question: "Dans un circuit marche/arret avec auto-maintien, quel element permet de maintenir le moteur en marche apres avoir relache START ?",
        options: [
          "Le bouton STOP",
          "Le contact du moteur en parallele avec START",
          "Le temporisateur",
          "La bobine inversee"
        ],
        correctIndex: 1,
        explanation: "Le contact du moteur en parallele avec START permet l'auto-maintien : le moteur reste alimente via son propre contact.",
        order: 1
      },
      {
        question: "Pourquoi utilise-t-on un contact normalement ferme (NF) pour le bouton STOP ?",
        options: [
          "Pour economiser de l'energie",
          "Pour la securite - si le fil est coupe, le moteur s'arrete",
          "Pour la vitesse de reaction",
          "C'est moins cher"
        ],
        correctIndex: 1,
        explanation: "Un contact NF assure la securite : si le fil est coupe ou le bouton defaillant, le circuit s'ouvre et le moteur s'arrete.",
        order: 2
      },
      {
        question: "Quelle est la priorite dans un circuit marche/arret standard ?",
        options: [
          "START a la priorite sur STOP",
          "STOP a la priorite sur START",
          "Ils ont la meme priorite",
          "Cela depend du programme"
        ],
        correctIndex: 1,
        explanation: "STOP a toujours la priorite pour des raisons de securite. Le contact NF de STOP est en serie avec tout le circuit.",
        order: 3
      },
      {
        question: "Comment appelle-t-on le principe du relais a accrochage utilise dans ce circuit ?",
        options: [
          "Auto-maintien",
          "Auto-destruction",
          "Auto-regulation",
          "Auto-calibration"
        ],
        correctIndex: 0,
        explanation: "L'auto-maintien (ou relais a accrochage) permet au circuit de rester actif apres une impulsion de demarrage.",
        order: 4
      },
      {
        question: "Ce circuit est la base de quel pourcentage des commandes de moteurs en industrie ?",
        options: [
          "10%",
          "50%",
          "90%",
          "100%"
        ],
        correctIndex: 2,
        explanation: "Le circuit marche/arret avec auto-maintien est la base d'environ 90% des commandes de moteurs industriels.",
        order: 5
      }
    ],
    // Lesson 4: Les temporisateurs (5 questions)
    [
      {
        question: "Que fait un temporisateur TON ?",
        options: [
          "La sortie passe a 1 immediatement",
          "La sortie passe a 1 apres un delai si l'entree reste a 1",
          "La sortie reste a 1 apres que l'entree passe a 0",
          "La sortie genere des impulsions"
        ],
        correctIndex: 1,
        explanation: "TON (Timer ON Delay) : la sortie s'active apres le delai defini, si l'entree reste a 1.",
        order: 1
      },
      {
        question: "Que fait un temporisateur TOF ?",
        options: [
          "Retarde l'activation",
          "Maintient la sortie pendant un temps apres que l'entree passe a 0",
          "Genere une impulsion",
          "Compte des evenements"
        ],
        correctIndex: 1,
        explanation: "TOF (Timer OFF Delay) : la sortie reste a 1 pendant le delai defini apres que l'entree passe a 0.",
        order: 2
      },
      {
        question: "Quelle est l'application typique d'un TOF ?",
        options: [
          "Anti-rebond de bouton",
          "Maintien d'une ventilation apres arret machine",
          "Comptage de pieces",
          "Demarrage progressif"
        ],
        correctIndex: 1,
        explanation: "TOF est souvent utilise pour maintenir une ventilation ou un eclairage apres l'arret de la machine.",
        order: 3
      },
      {
        question: "Que fait un temporisateur TP (Pulse) ?",
        options: [
          "Genere une impulsion de duree fixe",
          "Retarde l'activation",
          "Compte des evenements",
          "Mesure une temperature"
        ],
        correctIndex: 0,
        explanation: "TP genere une impulsion de duree fixe (definie par PT) quand l'entree passe a 1.",
        order: 4
      },
      {
        question: "Comment note-t-on un temps de 5 secondes dans un temporisateur ?",
        options: [
          "5000",
          "T#5s",
          "5 SEC",
          "PT=5"
        ],
        correctIndex: 1,
        explanation: "La notation standard IEC est T#5s (T# suivi de la duree et de l'unite).",
        order: 5
      }
    ],
    // Lesson 5: Les compteurs (5 questions)
    [
      {
        question: "Que signifie CTU ?",
        options: [
          "Counter Total Universal",
          "Count Up (compteur incremental)",
          "Control Timer Unit",
          "Counter Time Unit"
        ],
        correctIndex: 1,
        explanation: "CTU signifie Count Up, un compteur qui incremente a chaque front montant sur l'entree CU.",
        order: 1
      },
      {
        question: "Quand la sortie Q d'un compteur CTU passe-t-elle a 1 ?",
        options: [
          "Quand CV = 0",
          "Quand CV >= PV (valeur preselectionnee)",
          "Apres un delai",
          "Quand CU passe a 1"
        ],
        correctIndex: 1,
        explanation: "La sortie Q devient vraie quand la valeur courante CV atteint ou depasse la valeur preselectionnee PV.",
        order: 2
      },
      {
        question: "Quel compteur est ideal pour un systeme de dosage (compte a rebours) ?",
        options: [
          "CTU (Count Up)",
          "CTD (Count Down)",
          "CTUD",
          "TON"
        ],
        correctIndex: 1,
        explanation: "CTD (Count Down) decremente depuis PV et s'arrete quand CV=0, parfait pour le dosage.",
        order: 3
      },
      {
        question: "Que permet de faire un compteur CTUD ?",
        options: [
          "Compter uniquement vers le haut",
          "Compter uniquement vers le bas",
          "Compter dans les deux sens (up et down)",
          "Mesurer le temps"
        ],
        correctIndex: 2,
        explanation: "CTUD (Count Up/Down) peut incrementer (CU) ou decrementer (CD), utile pour la gestion de stock.",
        order: 4
      },
      {
        question: "Comment remet-on un compteur CTU a zero ?",
        options: [
          "En coupant l'alimentation",
          "Automatiquement apres PV",
          "Avec l'entree Reset (R)",
          "Ce n'est pas possible"
        ],
        correctIndex: 2,
        explanation: "L'entree Reset (R) remet la valeur courante CV a zero et la sortie Q a 0.",
        order: 5
      }
    ],
    // Lesson 6: Detection de fronts (5 questions)
    [
      {
        question: "Qu'est-ce qu'un front montant ?",
        options: [
          "Un signal qui reste a 1",
          "Le moment ou un signal passe de 0 a 1",
          "Un signal qui oscille",
          "Un signal analogique"
        ],
        correctIndex: 1,
        explanation: "Le front montant est l'instant ou le signal passe de l'etat 0 a l'etat 1.",
        order: 1
      },
      {
        question: "Pendant combien de cycles la sortie d'une detection de front est-elle a 1 ?",
        options: [
          "Tant que l'entree est a 1",
          "Un seul cycle automate",
          "5 cycles",
          "Jusqu'au reset"
        ],
        correctIndex: 1,
        explanation: "La detection de front genere une impulsion d'un seul cycle automate.",
        order: 2
      },
      {
        question: "Quel symbole represente la detection de front montant en LADDER ?",
        options: [
          "--[ ]--",
          "--[/]--",
          "--[P]-- ou R_TRIG",
          "--( )--"
        ],
        correctIndex: 2,
        explanation: "Le symbole [P] ou l'instruction R_TRIG represente la detection de front montant.",
        order: 3
      },
      {
        question: "Pourquoi utilise-t-on la detection de front pour le comptage ?",
        options: [
          "Pour compter plus vite",
          "Pour compter une seule fois par appui (pas plusieurs fois)",
          "Pour economiser de la memoire",
          "Pour simplifier le programme"
        ],
        correctIndex: 1,
        explanation: "Sans detection de front, le compteur s'incrementerait a chaque cycle tant que le bouton est appuye.",
        order: 4
      },
      {
        question: "Quelle est l'application d'une fonction toggle (bascule) ?",
        options: [
          "Mesurer le temps",
          "Inverser un etat a chaque appui sur un bouton",
          "Compter des pieces",
          "Demarrer un moteur"
        ],
        correctIndex: 1,
        explanation: "La fonction toggle inverse l'etat a chaque front montant, comme un interrupteur ON/OFF.",
        order: 5
      }
    ],
    // Lesson 7: Blocs fonctionnels et reutilisation (5 questions)
    [
      {
        question: "Quelle est la difference principale entre FC et FB ?",
        options: [
          "FC est plus rapide",
          "FB conserve ses donnees entre les appels (memoire), FC non",
          "FC est plus recent",
          "Il n'y a pas de difference"
        ],
        correctIndex: 1,
        explanation: "Un FB (Function Block) possede une memoire persistante, contrairement a une FC (Function).",
        order: 1
      },
      {
        question: "Pourquoi utilise-t-on des blocs fonctionnels ?",
        options: [
          "Pour rendre le programme plus long",
          "Pour la lisibilite, la maintenance et la reutilisation",
          "Parce que c'est obligatoire",
          "Pour ralentir l'execution"
        ],
        correctIndex: 1,
        explanation: "Les blocs fonctionnels ameliorent la lisibilite, facilitent la maintenance et permettent la reutilisation du code.",
        order: 2
      },
      {
        question: "Qu'est-ce qu'une instance de FB ?",
        options: [
          "Une copie du code",
          "Un FB utilise avec ses propres donnees",
          "Un FB supprime",
          "Un FB desactive"
        ],
        correctIndex: 1,
        explanation: "Une instance est une utilisation du FB avec son propre jeu de donnees. Meme code, donnees differentes.",
        order: 3
      },
      {
        question: "Quel type de bloc est le point d'entree du programme (Main) ?",
        options: [
          "FC (Function)",
          "FB (Function Block)",
          "OB (Organization Block)",
          "DB (Data Block)"
        ],
        correctIndex: 2,
        explanation: "OB1 (Organization Block) est le bloc principal qui est appele cycliquement par l'automate.",
        order: 4
      },
      {
        question: "Les temporisateurs et compteurs sont-ils des FC ou des FB ?",
        options: [
          "Des FC car ils n'ont pas besoin de memoire",
          "Des FB car ils conservent leur etat entre les cycles",
          "Ni l'un ni l'autre",
          "Ca depend du fabricant"
        ],
        correctIndex: 1,
        explanation: "Les timers et compteurs sont des FB car ils doivent memoriser leur etat (valeur courante, sortie, etc.).",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      "Pourquoi le langage LADDER est-il populaire ?": {
        question: "Why is the LADDER language popular?",
        options: ["It's the most recent", "It resembles electrical diagrams", "It's the fastest", "It's free"],
        explanation: "LADDER resembles relay electrical diagrams, making it intuitive for electricians."
      },
      "Dans quel sens le 'courant' circule-t-il en LADDER ?": {
        question: "In which direction does 'current' flow in LADDER?",
        options: ["Right to left", "Left to right", "Top to bottom", "Both directions"],
        explanation: "In LADDER, logical current flows from left to right, from the power rail to the coils."
      },
      "Quelle norme internationale definit le langage LADDER ?": {
        question: "Which international standard defines the LADDER language?",
        options: ["ISO 9001", "IEC 61131-3", "IEEE 802.3", "EN 60204"],
        explanation: "The IEC 61131-3 standard defines PLC programming languages, including LADDER."
      },
      "Que represente le symbole --[ ]-- en LADDER ?": {
        question: "What does the symbol --[ ]-- represent in LADDER?",
        options: ["A coil", "A normally open contact (NO)", "A normally closed contact (NC)", "A timer"],
        explanation: "The symbol --[ ]-- represents a normally open contact that conducts when the input is 1."
      },
      "Que represente le symbole --( )-- en LADDER ?": {
        question: "What does the symbol --( )-- represent in LADDER?",
        options: ["A contact", "A coil", "A timer", "A counter"],
        explanation: "The symbol --( )-- represents a coil that activates when current reaches it."
      },
      "Quelle est la difference entre une bobine simple et une bobine SET ?": {
        question: "What is the difference between a simple coil and a SET coil?",
        options: ["There is no difference", "The SET coil remains active even if the condition is no longer true", "The SET coil is faster", "The SET coil uses less memory"],
        explanation: "A SET coil memorizes its state: it remains active even if the condition is no longer true."
      },
      "Comment desactive-t-on une bobine SET ?": {
        question: "How do you deactivate a SET coil?",
        options: ["It deactivates automatically", "With a RESET coil", "By cutting the power", "By using an NC contact"],
        explanation: "A SET coil can only be deactivated with a RESET coil on the same variable."
      },
      "Quel symbole represente un contact normalement ferme ?": {
        question: "Which symbol represents a normally closed contact?",
        options: ["--[ ]--", "--[/]--", "--( )--", "--(S)--"],
        explanation: "The symbol --[/]-- represents a normally closed contact (the slash indicates inversion)."
      },
      "Dans un circuit marche/arret avec auto-maintien, qu'est-ce qui permet au moteur de rester en marche apres avoir relache le bouton START ?": {
        question: "In a start/stop circuit with self-holding, what allows the motor to keep running after releasing the START button?",
        options: ["The SET coil", "The motor output contact in parallel", "The timer", "The NC contact"],
        explanation: "Self-holding uses a motor output contact in parallel with the START button to maintain activation."
      },
      "Pourquoi utilise-t-on un contact NF pour le bouton STOP dans un circuit marche/arret ?": {
        question: "Why is an NC contact used for the STOP button in a start/stop circuit?",
        options: ["To save energy", "To cut the current when STOP is pressed", "It's a legal requirement", "To speed up the program"],
        explanation: "An NC contact on STOP cuts the current when the button is pressed, thus stopping the motor."
      },
      "Dans un circuit marche/arret avec auto-maintien, quel element permet de maintenir le moteur en marche apres avoir relache START ?": {
        question: "In a start/stop circuit with self-holding, which element keeps the motor running after releasing START?",
        options: ["The STOP button", "The motor contact in parallel with START", "The timer", "The inverted coil"],
        explanation: "The motor contact in parallel with START allows self-holding: the motor remains powered through its own contact."
      },
      "Pourquoi utilise-t-on un contact normalement ferme (NF) pour le bouton STOP ?": {
        question: "Why is a normally closed (NC) contact used for the STOP button?",
        options: ["To save energy", "For safety - if the wire is cut, the motor stops", "For reaction speed", "It's cheaper"],
        explanation: "An NC contact ensures safety: if the wire is cut or the button fails, the circuit opens and the motor stops."
      },
      "Quelle est la priorite dans un circuit marche/arret standard ?": {
        question: "What is the priority in a standard start/stop circuit?",
        options: ["START has priority over STOP", "STOP has priority over START", "They have the same priority", "It depends on the program"],
        explanation: "STOP always has priority for safety reasons. The NC contact of STOP is in series with the entire circuit."
      },
      "Comment appelle-t-on le principe du relais a accrochage utilise dans ce circuit ?": {
        question: "What is the name of the latching relay principle used in this circuit?",
        options: ["Self-holding", "Self-destruction", "Self-regulation", "Self-calibration"],
        explanation: "Self-holding (or latching relay) allows the circuit to remain active after a start pulse."
      },
      "Ce circuit est la base de quel pourcentage des commandes de moteurs en industrie ?": {
        question: "This circuit is the basis for what percentage of motor controls in industry?",
        options: ["10%", "50%", "90%", "100%"],
        explanation: "The start/stop circuit with self-holding is the basis of approximately 90% of industrial motor controls."
      },
      "Que fait un temporisateur TON ?": {
        question: "What does a TON timer do?",
        options: ["The output goes to 1 immediately", "The output goes to 1 after a delay if the input stays at 1", "The output stays at 1 after the input goes to 0", "The output generates pulses"],
        explanation: "TON (Timer ON Delay): the output activates after the defined delay, if the input stays at 1."
      },
      "Que fait un temporisateur TOF ?": {
        question: "What does a TOF timer do?",
        options: ["Delays activation", "Maintains the output for a time after the input goes to 0", "Generates a pulse", "Counts events"],
        explanation: "TOF (Timer OFF Delay): the output stays at 1 for the defined delay after the input goes to 0."
      },
      "Quelle est l'application typique d'un TOF ?": {
        question: "What is the typical application of a TOF?",
        options: ["Button debounce", "Maintaining ventilation after machine stop", "Part counting", "Progressive start"],
        explanation: "TOF is often used to maintain ventilation or lighting after the machine stops."
      },
      "Que fait un temporisateur TP (Pulse) ?": {
        question: "What does a TP (Pulse) timer do?",
        options: ["Generates a fixed duration pulse", "Delays activation", "Counts events", "Measures temperature"],
        explanation: "TP generates a fixed duration pulse (defined by PT) when the input goes to 1."
      },
      "Comment note-t-on un temps de 5 secondes dans un temporisateur ?": {
        question: "How do you specify a time of 5 seconds in a timer?",
        options: ["5000", "T#5s", "5 SEC", "PT=5"],
        explanation: "The standard IEC notation is T#5s (T# followed by the duration and unit)."
      },
      "Que signifie CTU ?": {
        question: "What does CTU mean?",
        options: ["Counter Total Universal", "Count Up (incremental counter)", "Control Timer Unit", "Counter Time Unit"],
        explanation: "CTU means Count Up, a counter that increments on each rising edge on the CU input."
      },
      "Quand la sortie Q d'un compteur CTU passe-t-elle a 1 ?": {
        question: "When does the Q output of a CTU counter go to 1?",
        options: ["When CV = 0", "When CV >= PV (preset value)", "After a delay", "When CU goes to 1"],
        explanation: "The Q output becomes true when the current value CV reaches or exceeds the preset value PV."
      },
      "Quel compteur est ideal pour un systeme de dosage (compte a rebours) ?": {
        question: "Which counter is ideal for a dosing system (countdown)?",
        options: ["CTU (Count Up)", "CTD (Count Down)", "CTUD", "TON"],
        explanation: "CTD (Count Down) decrements from PV and stops when CV=0, perfect for dosing."
      },
      "Que permet de faire un compteur CTUD ?": {
        question: "What does a CTUD counter allow you to do?",
        options: ["Count only up", "Count only down", "Count in both directions (up and down)", "Measure time"],
        explanation: "CTUD (Count Up/Down) can increment (CU) or decrement (CD), useful for stock management."
      },
      "Comment remet-on un compteur CTU a zero ?": {
        question: "How do you reset a CTU counter to zero?",
        options: ["By cutting the power", "Automatically after PV", "With the Reset input (R)", "It's not possible"],
        explanation: "The Reset input (R) resets the current value CV to zero and the output Q to 0."
      },
      "Qu'est-ce qu'un front montant ?": {
        question: "What is a rising edge?",
        options: ["A signal that stays at 1", "The moment when a signal goes from 0 to 1", "An oscillating signal", "An analog signal"],
        explanation: "The rising edge is the instant when the signal goes from state 0 to state 1."
      },
      "Pendant combien de cycles la sortie d'une detection de front est-elle a 1 ?": {
        question: "For how many cycles is the output of an edge detection at 1?",
        options: ["As long as the input is at 1", "One single PLC cycle", "5 cycles", "Until reset"],
        explanation: "Edge detection generates a pulse of one single PLC cycle."
      },
      "Quel symbole represente la detection de front montant en LADDER ?": {
        question: "Which symbol represents rising edge detection in LADDER?",
        options: ["--[ ]--", "--[/]--", "--[P]-- or R_TRIG", "--( )--"],
        explanation: "The symbol [P] or the R_TRIG instruction represents rising edge detection."
      },
      "Pourquoi utilise-t-on la detection de front pour le comptage ?": {
        question: "Why is edge detection used for counting?",
        options: ["To count faster", "To count only once per press (not multiple times)", "To save memory", "To simplify the program"],
        explanation: "Without edge detection, the counter would increment every cycle while the button is pressed."
      },
      "Quelle est l'application d'une fonction toggle (bascule) ?": {
        question: "What is the application of a toggle function?",
        options: ["Measure time", "Invert a state each time a button is pressed", "Count parts", "Start a motor"],
        explanation: "The toggle function inverts the state on each rising edge, like an ON/OFF switch."
      },
      "Quelle est la difference principale entre FC et FB ?": {
        question: "What is the main difference between FC and FB?",
        options: ["FC is faster", "FB retains its data between calls (memory), FC does not", "FC is more recent", "There is no difference"],
        explanation: "An FB (Function Block) has persistent memory, unlike an FC (Function)."
      },
      "Pourquoi utilise-t-on des blocs fonctionnels ?": {
        question: "Why are function blocks used?",
        options: ["To make the program longer", "For readability, maintenance and reuse", "Because it's mandatory", "To slow down execution"],
        explanation: "Function blocks improve readability, facilitate maintenance and enable code reuse."
      },
      "Qu'est-ce qu'une instance de FB ?": {
        question: "What is an FB instance?",
        options: ["A copy of the code", "An FB used with its own data", "A deleted FB", "A disabled FB"],
        explanation: "An instance is a use of the FB with its own set of data. Same code, different data."
      },
      "Quel type de bloc est le point d'entree du programme (Main) ?": {
        question: "What type of block is the program entry point (Main)?",
        options: ["FC (Function)", "FB (Function Block)", "OB (Organization Block)", "DB (Data Block)"],
        explanation: "OB1 (Organization Block) is the main block that is called cyclically by the PLC."
      },
      "Les temporisateurs et compteurs sont-ils des FC ou des FB ?": {
        question: "Are timers and counters FC or FB?",
        options: ["FC because they don't need memory", "FB because they retain their state between cycles", "Neither", "It depends on the manufacturer"],
        explanation: "Timers and counters are FB because they must memorize their state (current value, output, etc.)."
      }
    },
    es: {
      "Pourquoi le langage LADDER est-il populaire ?": {
        question: "Por que es popular el lenguaje LADDER?",
        options: ["Es el mas reciente", "Se parece a los diagramas electricos", "Es el mas rapido", "Es gratis"],
        explanation: "LADDER se parece a los diagramas electricos de reles, lo que lo hace intuitivo para electricistas."
      },
      "Dans quel sens le 'courant' circule-t-il en LADDER ?": {
        question: "En que direccion circula la 'corriente' en LADDER?",
        options: ["De derecha a izquierda", "De izquierda a derecha", "De arriba a abajo", "En ambas direcciones"],
        explanation: "En LADDER, la corriente logica fluye de izquierda a derecha, desde la barra de alimentacion hacia las bobinas."
      },
      "Quelle norme internationale definit le langage LADDER ?": {
        question: "Que norma internacional define el lenguaje LADDER?",
        options: ["ISO 9001", "IEC 61131-3", "IEEE 802.3", "EN 60204"],
        explanation: "La norma IEC 61131-3 define los lenguajes de programacion de PLCs, incluyendo LADDER."
      },
      "Que represente le symbole --[ ]-- en LADDER ?": {
        question: "Que representa el simbolo --[ ]-- en LADDER?",
        options: ["Una bobina", "Un contacto normalmente abierto (NA)", "Un contacto normalmente cerrado (NC)", "Un temporizador"],
        explanation: "El simbolo --[ ]-- representa un contacto normalmente abierto que conduce cuando la entrada es 1."
      },
      "Que represente le symbole --( )-- en LADDER ?": {
        question: "Que representa el simbolo --( )-- en LADDER?",
        options: ["Un contacto", "Una bobina", "Un temporizador", "Un contador"],
        explanation: "El simbolo --( )-- representa una bobina que se activa cuando la corriente la alcanza."
      },
      "Quelle est la difference entre une bobine simple et une bobine SET ?": {
        question: "Cual es la diferencia entre una bobina simple y una bobina SET?",
        options: ["No hay diferencia", "La bobina SET permanece activa incluso si la condicion ya no es verdadera", "La bobina SET es mas rapida", "La bobina SET usa menos memoria"],
        explanation: "Una bobina SET memoriza su estado: permanece activa incluso si la condicion ya no es verdadera."
      },
      "Comment desactive-t-on une bobine SET ?": {
        question: "Como se desactiva una bobina SET?",
        options: ["Se desactiva automaticamente", "Con una bobina RESET", "Cortando la alimentacion", "Usando un contacto NC"],
        explanation: "Una bobina SET solo puede desactivarse con una bobina RESET en la misma variable."
      },
      "Quel symbole represente un contact normalement ferme ?": {
        question: "Que simbolo representa un contacto normalmente cerrado?",
        options: ["--[ ]--", "--[/]--", "--( )--", "--(S)--"],
        explanation: "El simbolo --[/]-- representa un contacto normalmente cerrado (la barra indica inversion)."
      },
      "Dans un circuit marche/arret avec auto-maintien, qu'est-ce qui permet au moteur de rester en marche apres avoir relache le bouton START ?": {
        question: "En un circuito marcha/paro con autoenclavamiento, que permite que el motor siga funcionando despues de soltar el boton START?",
        options: ["La bobina SET", "El contacto de salida del motor en paralelo", "El temporizador", "El contacto NC"],
        explanation: "El autoenclavamiento utiliza un contacto de salida del motor en paralelo con el boton START para mantener la activacion."
      },
      "Pourquoi utilise-t-on un contact NF pour le bouton STOP dans un circuit marche/arret ?": {
        question: "Por que se usa un contacto NC para el boton STOP en un circuito marcha/paro?",
        options: ["Para ahorrar energia", "Para cortar la corriente cuando se presiona STOP", "Es una obligacion legal", "Para acelerar el programa"],
        explanation: "Un contacto NC en STOP corta la corriente cuando se presiona el boton, deteniendo asi el motor."
      },
      "Dans un circuit marche/arret avec auto-maintien, quel element permet de maintenir le moteur en marche apres avoir relache START ?": {
        question: "En un circuito marcha/paro con autoenclavamiento, que elemento mantiene el motor en marcha despues de soltar START?",
        options: ["El boton STOP", "El contacto del motor en paralelo con START", "El temporizador", "La bobina invertida"],
        explanation: "El contacto del motor en paralelo con START permite el autoenclavamiento: el motor permanece alimentado a traves de su propio contacto."
      },
      "Pourquoi utilise-t-on un contact normalement ferme (NF) pour le bouton STOP ?": {
        question: "Por que se usa un contacto normalmente cerrado (NC) para el boton STOP?",
        options: ["Para ahorrar energia", "Por seguridad - si el cable se corta, el motor se detiene", "Por velocidad de reaccion", "Es mas barato"],
        explanation: "Un contacto NC asegura la seguridad: si el cable se corta o el boton falla, el circuito se abre y el motor se detiene."
      },
      "Quelle est la priorite dans un circuit marche/arret standard ?": {
        question: "Cual es la prioridad en un circuito marcha/paro estandar?",
        options: ["START tiene prioridad sobre STOP", "STOP tiene prioridad sobre START", "Tienen la misma prioridad", "Depende del programa"],
        explanation: "STOP siempre tiene prioridad por razones de seguridad. El contacto NC de STOP esta en serie con todo el circuito."
      },
      "Comment appelle-t-on le principe du relais a accrochage utilise dans ce circuit ?": {
        question: "Como se llama el principio del rele de enclavamiento utilizado en este circuito?",
        options: ["Autoenclavamiento", "Autodestruccion", "Autorregulacion", "Autocalibracion"],
        explanation: "El autoenclavamiento (o rele de enganche) permite que el circuito permanezca activo despues de un pulso de arranque."
      },
      "Ce circuit est la base de quel pourcentage des commandes de moteurs en industrie ?": {
        question: "Este circuito es la base de que porcentaje de controles de motores en la industria?",
        options: ["10%", "50%", "90%", "100%"],
        explanation: "El circuito marcha/paro con autoenclavamiento es la base de aproximadamente el 90% de los controles de motores industriales."
      },
      "Que fait un temporisateur TON ?": {
        question: "Que hace un temporizador TON?",
        options: ["La salida pasa a 1 inmediatamente", "La salida pasa a 1 despues de un retardo si la entrada permanece en 1", "La salida permanece en 1 despues de que la entrada pase a 0", "La salida genera pulsos"],
        explanation: "TON (Timer ON Delay): la salida se activa despues del retardo definido, si la entrada permanece en 1."
      },
      "Que fait un temporisateur TOF ?": {
        question: "Que hace un temporizador TOF?",
        options: ["Retrasa la activacion", "Mantiene la salida durante un tiempo despues de que la entrada pase a 0", "Genera un pulso", "Cuenta eventos"],
        explanation: "TOF (Timer OFF Delay): la salida permanece en 1 durante el retardo definido despues de que la entrada pase a 0."
      },
      "Quelle est l'application typique d'un TOF ?": {
        question: "Cual es la aplicacion tipica de un TOF?",
        options: ["Antirebote de boton", "Mantener la ventilacion despues de parar la maquina", "Conteo de piezas", "Arranque progresivo"],
        explanation: "TOF se usa frecuentemente para mantener la ventilacion o iluminacion despues de que la maquina se detenga."
      },
      "Que fait un temporisateur TP (Pulse) ?": {
        question: "Que hace un temporizador TP (Pulso)?",
        options: ["Genera un pulso de duracion fija", "Retrasa la activacion", "Cuenta eventos", "Mide temperatura"],
        explanation: "TP genera un pulso de duracion fija (definida por PT) cuando la entrada pasa a 1."
      },
      "Comment note-t-on un temps de 5 secondes dans un temporisateur ?": {
        question: "Como se especifica un tiempo de 5 segundos en un temporizador?",
        options: ["5000", "T#5s", "5 SEC", "PT=5"],
        explanation: "La notacion estandar IEC es T#5s (T# seguido de la duracion y unidad)."
      },
      "Que signifie CTU ?": {
        question: "Que significa CTU?",
        options: ["Counter Total Universal", "Count Up (contador incremental)", "Control Timer Unit", "Counter Time Unit"],
        explanation: "CTU significa Count Up, un contador que incrementa en cada flanco ascendente en la entrada CU."
      },
      "Quand la sortie Q d'un compteur CTU passe-t-elle a 1 ?": {
        question: "Cuando pasa a 1 la salida Q de un contador CTU?",
        options: ["Cuando CV = 0", "Cuando CV >= PV (valor preseleccionado)", "Despues de un retardo", "Cuando CU pasa a 1"],
        explanation: "La salida Q se vuelve verdadera cuando el valor actual CV alcanza o supera el valor preseleccionado PV."
      },
      "Quel compteur est ideal pour un systeme de dosage (compte a rebours) ?": {
        question: "Que contador es ideal para un sistema de dosificacion (cuenta atras)?",
        options: ["CTU (Count Up)", "CTD (Count Down)", "CTUD", "TON"],
        explanation: "CTD (Count Down) decrementa desde PV y se detiene cuando CV=0, perfecto para dosificacion."
      },
      "Que permet de faire un compteur CTUD ?": {
        question: "Que permite hacer un contador CTUD?",
        options: ["Contar solo hacia arriba", "Contar solo hacia abajo", "Contar en ambas direcciones (arriba y abajo)", "Medir tiempo"],
        explanation: "CTUD (Count Up/Down) puede incrementar (CU) o decrementar (CD), util para gestion de stock."
      },
      "Comment remet-on un compteur CTU a zero ?": {
        question: "Como se pone a cero un contador CTU?",
        options: ["Cortando la alimentacion", "Automaticamente despues de PV", "Con la entrada Reset (R)", "No es posible"],
        explanation: "La entrada Reset (R) pone el valor actual CV a cero y la salida Q a 0."
      },
      "Qu'est-ce qu'un front montant ?": {
        question: "Que es un flanco ascendente?",
        options: ["Una senal que permanece en 1", "El momento en que una senal pasa de 0 a 1", "Una senal oscilante", "Una senal analogica"],
        explanation: "El flanco ascendente es el instante en que la senal pasa del estado 0 al estado 1."
      },
      "Pendant combien de cycles la sortie d'une detection de front est-elle a 1 ?": {
        question: "Durante cuantos ciclos la salida de una deteccion de flanco esta en 1?",
        options: ["Mientras la entrada este en 1", "Un solo ciclo de PLC", "5 ciclos", "Hasta el reset"],
        explanation: "La deteccion de flanco genera un pulso de un solo ciclo de PLC."
      },
      "Quel symbole represente la detection de front montant en LADDER ?": {
        question: "Que simbolo representa la deteccion de flanco ascendente en LADDER?",
        options: ["--[ ]--", "--[/]--", "--[P]-- o R_TRIG", "--( )--"],
        explanation: "El simbolo [P] o la instruccion R_TRIG representa la deteccion de flanco ascendente."
      },
      "Pourquoi utilise-t-on la detection de front pour le comptage ?": {
        question: "Por que se usa la deteccion de flanco para el conteo?",
        options: ["Para contar mas rapido", "Para contar solo una vez por pulsacion (no varias veces)", "Para ahorrar memoria", "Para simplificar el programa"],
        explanation: "Sin deteccion de flanco, el contador incrementaria cada ciclo mientras el boton este presionado."
      },
      "Quelle est l'application d'une fonction toggle (bascule) ?": {
        question: "Cual es la aplicacion de una funcion toggle (bascula)?",
        options: ["Medir tiempo", "Invertir un estado cada vez que se presiona un boton", "Contar piezas", "Arrancar un motor"],
        explanation: "La funcion toggle invierte el estado en cada flanco ascendente, como un interruptor ON/OFF."
      },
      "Quelle est la difference principale entre FC et FB ?": {
        question: "Cual es la diferencia principal entre FC y FB?",
        options: ["FC es mas rapido", "FB conserva sus datos entre llamadas (memoria), FC no", "FC es mas reciente", "No hay diferencia"],
        explanation: "Un FB (Function Block) tiene memoria persistente, a diferencia de un FC (Function)."
      },
      "Pourquoi utilise-t-on des blocs fonctionnels ?": {
        question: "Por que se usan bloques funcionales?",
        options: ["Para hacer el programa mas largo", "Para legibilidad, mantenimiento y reutilizacion", "Porque es obligatorio", "Para ralentizar la ejecucion"],
        explanation: "Los bloques funcionales mejoran la legibilidad, facilitan el mantenimiento y permiten la reutilizacion del codigo."
      },
      "Qu'est-ce qu'une instance de FB ?": {
        question: "Que es una instancia de FB?",
        options: ["Una copia del codigo", "Un FB usado con sus propios datos", "Un FB eliminado", "Un FB desactivado"],
        explanation: "Una instancia es un uso del FB con su propio conjunto de datos. Mismo codigo, datos diferentes."
      },
      "Quel type de bloc est le point d'entree du programme (Main) ?": {
        question: "Que tipo de bloque es el punto de entrada del programa (Main)?",
        options: ["FC (Function)", "FB (Function Block)", "OB (Organization Block)", "DB (Data Block)"],
        explanation: "OB1 (Organization Block) es el bloque principal que es llamado ciclicamente por el PLC."
      },
      "Les temporisateurs et compteurs sont-ils des FC ou des FB ?": {
        question: "Los temporizadores y contadores son FC o FB?",
        options: ["FC porque no necesitan memoria", "FB porque conservan su estado entre ciclos", "Ninguno", "Depende del fabricante"],
        explanation: "Los temporizadores y contadores son FB porque deben memorizar su estado (valor actual, salida, etc.)."
      }
    }
  }
}
