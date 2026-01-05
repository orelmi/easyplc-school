import type { ModuleData } from '../types.js'

export const module05Data: ModuleData = {
  // Module info
  moduleOrder: 5,
  moduleTitle: "Grafcet",
  moduleDescription: "Modélisez des systèmes séquentiels avec le GRAFCET",
  moduleTranslations: {
    en: {
      title: "Grafcet",
      description: "Model sequential systems with GRAFCET"
    },
    es: {
      title: "Grafcet",
      description: "Modele sistemas secuenciales con GRAFCET"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Introduction au GRAFCET",
      description: "Découvrez le GRAFCET pour modéliser les systèmes séquentiels",
      order: 1,
      xpReward: 80,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le GRAFCET\n\nLe **GRAFCET** (Graphe Fonctionnel de Commande Étape-Transition) est un outil de modélisation des systèmes automatisés séquentiels."
          },
          {
            type: "text",
            content: "## Éléments de base\n\n### Les étapes\nReprésentées par des carrés numérotés. Chaque étape correspond à un état du système.\n\n### Les transitions\nConditions logiques entre les étapes. Quand la condition est vraie, on passe à l'étape suivante.\n\n### Les actions\nCe que fait le système dans chaque étape (activer un moteur, ouvrir une vanne, etc.)."
          },
          {
            type: "text",
            content: "## Règles d'évolution\n\n1. L'étape initiale est active au départ\n2. Une transition est franchissable si l'étape précédente est active ET la condition est vraie\n3. Le franchissement désactive l'étape précédente et active la suivante\n4. Plusieurs transitions simultanées sont possibles (divergence/convergence)"
          },
          {
            type: "info",
            content: "Le GRAFCET est normalisé (NF C 03-190) et largement utilisé dans l'industrie française."
          }
        ]
      })
    },
    {
      title: "Étapes et transitions",
      description: "Approfondissez la notation des étapes et transitions",
      order: 2,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Étapes et Transitions\n\nLes étapes et transitions sont les briques fondamentales du GRAFCET."
          },
          {
            type: "diagram",
            title: "Notation des étapes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    NOTATION DES ÉTAPES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Étape normale          Étape initiale        Étape active │
│   ┌─────┐                ╔═════╗              ┌─────┐       │
│   │  5  │                ║  0  ║              │  3  │ ●     │
│   └─────┘                ╚═════╝              └─────┘       │
│                          (double cadre)       (point = actif)│
│                                                              │
│   Avec actions associées :                                   │
│   ┌─────┬──────────────────────────┐                        │
│   │  5  │ Moteur_avant             │  Action continue       │
│   └─────┴──────────────────────────┘                        │
│                                                              │
│   ┌─────┬──────────────────────────┐                        │
│   │  6  │ C Voyant_vert            │  Action conditionnelle │
│   └─────┴──────────────────────────┘  (C = condition)       │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Types de transitions\n\n| Notation | Signification |\n|----------|---------------|\n| a | Front montant sur entrée a |\n| ↑a | Front montant explicite |\n| ↓a | Front descendant |\n| a · b | a ET b |\n| a + b | a OU b |\n| /a | NON a (a barre) |\n| t/5/3s | Temporisation : 3s après activation de l'étape 5 |"
          },
          {
            type: "text",
            content: "## Réceptivité toujours vraie\n\n```\n= 1\n```\nLa transition est **toujours franchissable** dès que l'étape précédente est active. Utilisé pour enchaîner des étapes sans condition."
          }
        ]
      })
    },
    {
      title: "Les différents types d'actions",
      description: "Actions continues, conditionnelles, mémorisées et temporisées",
      order: 3,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Types d'Actions\n\nLes actions associées aux étapes peuvent être de plusieurs types selon leur comportement."
          },
          {
            type: "text",
            content: "## Action continue (par défaut)\n\n```\n┌─────┬──────────────┐\n│  5  │ Moteur       │\n└─────┴──────────────┘\n```\n\nL'action est **active tant que l'étape est active**. Dès que l'on quitte l'étape, l'action s'arrête."
          },
          {
            type: "text",
            content: "## Action conditionnelle\n\n```\n┌─────┬──────────────────────┐\n│  5  │ C capteur : Moteur   │\n└─────┴──────────────────────┘\n```\n\nL'action n'est active que si l'étape est active **ET** la condition est vraie."
          },
          {
            type: "text",
            content: "## Action mémorisée (SET/RESET)\n\n```\n┌─────┬──────────────┐\n│  5  │ S Vanne      │  ← SET (activation mémorisée)\n└─────┴──────────────┘\n\n┌─────┬──────────────┐\n│  8  │ R Vanne      │  ← RESET (désactivation)\n└─────┴──────────────┘\n```\n\nL'action **reste active** même après avoir quitté l'étape."
          },
          {
            type: "text",
            content: "## Actions temporisées\n\n| Notation | Description |\n|----------|-------------|\n| D t : Action | Action retardée (Delay) |\n| L t : Action | Action limitée (Limited) |\n| P : Action | Action impulsionnelle (Pulse) |"
          }
        ]
      })
    },
    {
      title: "Divergences et convergences",
      description: "Gérez les séquences parallèles et les choix",
      order: 4,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Divergences et Convergences\n\nLe GRAFCET permet de représenter des **séquences parallèles** (ET) et des **choix alternatifs** (OU)."
          },
          {
            type: "diagram",
            title: "Les 4 structures de base",
            content: `┌─────────────────────────────────────────────────────────────┐
│            DIVERGENCES ET CONVERGENCES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DIVERGENCE EN OU           CONVERGENCE EN OU               │
│  (choix exclusif)           (fin de choix)                  │
│                                                              │
│      ┌─────┐                   ┌───┐    ┌───┐               │
│      │  1  │                   │ 2 │    │ 3 │               │
│      └──┬──┘                   └─┬─┘    └─┬─┘               │
│   ──────┼──────             ────┼────────┼────              │
│   │     │     │                 │        │                  │
│  ─┼─   ─┼─   ─┼─              ──┴────────┴──                │
│   a     b     c                     │                       │
│   │     │     │                    ─┼─                      │
│ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐                   d                       │
│ │ 2 │ │ 3 │ │ 4 │                   │                       │
│ └───┘ └───┘ └───┘               ┌───┴───┐                   │
│                                 │   4   │                   │
│                                 └───────┘                   │
│                                                              │
│  DIVERGENCE EN ET           CONVERGENCE EN ET               │
│  (parallélisme)             (synchronisation)               │
│                                                              │
│      ┌─────┐                ┌───┐        ┌───┐              │
│      │  1  │                │ 2 │        │ 3 │              │
│      └──┬──┘                └─┬─┘        └─┬─┘              │
│        ─┼─                   ─┼─          ─┼─               │
│         a                     a            b                │
│   ══════╪══════          ════╪════════════╪════            │
│   │     │     │               │            │               │
│ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐        ════╪════════════╪════            │
│ │ 2 │ │ 3 │ │ 4 │                   │                       │
│ └───┘ └───┘ └───┘              ┌────┴────┐                  │
│ (double barre)                 │    4    │                  │
│                                └─────────┘                  │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Règles importantes\n\n- **Divergence EN OU** : Une seule branche est activée (choix)\n- **Convergence EN OU** : On attend qu'une branche arrive\n- **Divergence EN ET** : Toutes les branches sont activées simultanément\n- **Convergence EN ET** : On attend que TOUTES les branches soient terminées"
          },
          {
            type: "warning",
            content: "En divergence OU, les conditions doivent être mutuellement exclusives pour éviter des ambiguïtés !"
          }
        ]
      })
    },
    {
      title: "Macro-étapes et sous-programmes",
      description: "Structurez vos GRAFCET avec les macro-étapes",
      order: 5,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Macro-étapes et Sous-programmes\n\nPour les systèmes complexes, on utilise des **macro-étapes** pour regrouper des séquences."
          },
          {
            type: "diagram",
            title: "Représentation d'une macro-étape",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    MACRO-ÉTAPE                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   GRAFCET principal            Expansion de M1              │
│                                                              │
│      ┌─────┐                      ┌═════┐  E (étape entrée) │
│      │  1  │                      │ E1  │                   │
│      └──┬──┘                      └──┬──┘                   │
│        ─┼─                          ─┼─                     │
│         a                            a                      │
│   ╔═════╪═════╗                     │                       │
│   ║     M1    ║ ◄─────────────  ┌───┴───┐                  │
│   ╚═════╪═════╝                 │  10   │                   │
│        ─┼─                      └───┬───┘                   │
│         b                          ─┼─                      │
│      ┌──┴──┐                        b                       │
│      │  2  │                       │                        │
│      └─────┘                   ┌───┴───┐                    │
│                                │  11   │                    │
│   Macro-étape M1               └───┬───┘                    │
│   (contient une                    │                        │
│   séquence complète)          ┌════╪════┐ S (étape sortie) │
│                               │   S1    │                   │
│                               └═════════┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Avantages des macro-étapes\n\n1. **Lisibilité** : Le GRAFCET principal reste simple\n2. **Réutilisation** : Une macro peut être appelée plusieurs fois\n3. **Modularité** : Développement et test indépendants\n4. **Maintenance** : Modifications localisées"
          },
          {
            type: "text",
            content: "## Hiérarchie des GRAFCET\n\n| Niveau | Rôle |\n|--------|------|\n| GRAFCET de sécurité | Gère les arrêts d'urgence (prioritaire) |\n| GRAFCET de conduite | Modes de marche (auto, manu, init) |\n| GRAFCET de production | Séquence normale de travail |\n| GRAFCET de défaut | Gestion des pannes |"
          }
        ]
      })
    },
    {
      title: "Traduction GRAFCET vers LADDER",
      description: "Convertissez un GRAFCET en programme automate",
      order: 6,
      xpReward: 90,
      duration: 22,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Traduction GRAFCET vers LADDER\n\nUne fois le GRAFCET conçu, il faut le **traduire** en langage automate (LADDER, ST, etc.)."
          },
          {
            type: "text",
            content: "## Méthode de traduction\n\n### 1. Variables d'étape\nChaque étape devient une **variable booléenne** (bit mémoire) :\n- Étape 0 → X0 ou M0\n- Étape 1 → X1 ou M1\n- etc."
          },
          {
            type: "diagram",
            title: "Traduction d'une étape simple",
            content: `┌─────────────────────────────────────────────────────────────┐
│           TRADUCTION GRAFCET → LADDER                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GRAFCET :                    LADDER :                       │
│                                                              │
│  ┌─────┐                      Activation de X1 :            │
│  │  0  │                      |    X0      a       X1       │
│  └──┬──┘                      |---[ ]----[ ]-----(S)---|    │
│    ─┼─                                                       │
│     a                         Désactivation de X1 :         │
│  ┌──┴──┐                      |    X1      b       X1       │
│  │  1  │                      |---[ ]----[ ]-----(R)---|    │
│  └──┬──┘                                                     │
│    ─┼─                        Ou méthode combinée :         │
│     b                         |    X0      a       X2       │
│  ┌──┴──┐                      |---[ ]----[ ]--+---(S)---|   │
│  │  2  │                      |              |          |   │
│  └─────┘                      |    X1       X1          |   │
│                               |---[/]------(R)---------|   │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Règle générale\n\n```\nActivation Xi : Xi-1 · transition · /Xi\nDésactivation Xi : Xi+1 (quand étape suivante s'active)\n```\n\nOu avec SET/RESET :\n- SET Xi quand on doit l'activer\n- RESET Xi quand l'étape suivante s'active"
          },
          {
            type: "text",
            content: "## Traduction des actions\n\n```\nAction continue dans étape 5 :\n|    X5         Moteur\n|---[ ]----------( )---||\n\nAction SET dans étape 5 :\n|    X5         Vanne\n|---[P]---------(S)---||\n```"
          }
        ]
      })
    },
    {
      title: "Exemple complet : système de remplissage",
      description: "Conception d'un GRAFCET de A à Z sur un cas réel",
      order: 7,
      xpReward: 95,
      duration: 25,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Exemple : Système de Remplissage\n\nConception complète d'un GRAFCET pour une station de remplissage de bouteilles."
          },
          {
            type: "text",
            content: "## Cahier des charges\n\nLa machine doit :\n1. Détecter la présence d'une bouteille (capteur `presence`)\n2. Ouvrir la vanne de remplissage (`vanne`)\n3. Remplir pendant 3 secondes\n4. Fermer la vanne\n5. Évacuer la bouteille (vérin `evacuation`)\n6. Attendre le retour du vérin (`verin_rentre`)\n7. Recommencer"
          },
          {
            type: "diagram",
            title: "GRAFCET de la station de remplissage",
            content: `┌─────────────────────────────────────────────────────────────┐
│        GRAFCET STATION DE REMPLISSAGE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ╔═════╗                                                   │
│    ║  0  ║  Attente                                         │
│    ╚══╤══╝                                                   │
│      ─┼─                                                     │
│    presence · dcy                                            │
│       │                                                      │
│    ┌──┴──┬───────────────┐                                  │
│    │  1  │ Vanne         │  Remplissage                     │
│    └──┬──┴───────────────┘                                  │
│      ─┼─                                                     │
│    t/1/3s                                                    │
│       │                                                      │
│    ┌──┴──┬───────────────┐                                  │
│    │  2  │ Evacuation    │  Pousser bouteille               │
│    └──┬──┴───────────────┘                                  │
│      ─┼─                                                     │
│    verin_sorti                                               │
│       │                                                      │
│    ┌──┴──┐                                                   │
│    │  3  │  Retour vérin                                    │
│    └──┬──┘                                                   │
│      ─┼─                                                     │
│    verin_rentre                                              │
│       │                                                      │
│       └─────────────────────────────────▶ retour étape 0    │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Table des E/S\n\n| Adresse | Nom | Type | Description |\n|---------|-----|------|-------------|\n| I0.0 | presence | Entrée | Capteur présence bouteille |\n| I0.1 | dcy | Entrée | Bouton départ cycle |\n| I0.2 | verin_sorti | Entrée | Fin de course vérin sorti |\n| I0.3 | verin_rentre | Entrée | Fin de course vérin rentré |\n| Q0.0 | vanne | Sortie | Électrovanne remplissage |\n| Q0.1 | evacuation | Sortie | Vérin évacuation |"
          },
          {
            type: "info",
            content: "Ce type de GRAFCET simple est le point de départ. En production réelle, on ajouterait la gestion des modes (auto/manu), les défauts et les sécurités."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Introduction au GRAFCET": {
        title: "Introduction to GRAFCET",
        description: "Discover GRAFCET for modeling sequential systems",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# GRAFCET\n\n**GRAFCET** (Sequential Function Chart) is a modeling tool for sequential automated systems."
            },
            {
              type: "text",
              content: "## Basic Elements\n\n### Steps\nRepresented by numbered squares. Each step corresponds to a state of the system.\n\n### Transitions\nLogical conditions between steps. When the condition is true, we move to the next step.\n\n### Actions\nWhat the system does in each step (activate a motor, open a valve, etc.)."
            },
            {
              type: "text",
              content: "## Evolution Rules\n\n1. The initial step is active at startup\n2. A transition is crossable if the previous step is active AND the condition is true\n3. Crossing deactivates the previous step and activates the next one\n4. Multiple simultaneous transitions are possible (divergence/convergence)"
            },
            {
              type: "info",
              content: "GRAFCET is standardized (IEC 60848) and widely used in industry."
            }
          ]
        })
      },
      "Étapes et transitions": {
        title: "Steps and Transitions",
        description: "Master GRAFCET steps and transitions"
      },
      "Les différents types d'actions": {
        title: "Different Types of Actions",
        description: "Learn about continuous, conditional and stored actions"
      },
      "Divergences et convergences": {
        title: "Divergences and Convergences",
        description: "Create parallel and alternative branches"
      },
      "Macro-étapes et sous-programmes": {
        title: "Macro-steps and Subroutines",
        description: "Structure complex sequences"
      },
      "Traduction GRAFCET vers LADDER": {
        title: "GRAFCET to LADDER Translation",
        description: "Convert GRAFCET to LADDER code"
      },
      "Exemple complet : système de remplissage": {
        title: "Complete Example: Filling System",
        description: "Apply GRAFCET to a real system"
      }
    },
    es: {
      "Introduction au GRAFCET": {
        title: "Introduccion al GRAFCET",
        description: "Descubra el GRAFCET para modelar sistemas secuenciales",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# GRAFCET\n\n**GRAFCET** (Grafico Funcional de Control Etapa-Transicion) es una herramienta de modelado para sistemas automatizados secuenciales."
            },
            {
              type: "text",
              content: "## Elementos basicos\n\n### Etapas\nRepresentadas por cuadrados numerados. Cada etapa corresponde a un estado del sistema.\n\n### Transiciones\nCondiciones logicas entre etapas. Cuando la condicion es verdadera, pasamos a la siguiente etapa.\n\n### Acciones\nLo que hace el sistema en cada etapa (activar un motor, abrir una valvula, etc.)."
            },
            {
              type: "text",
              content: "## Reglas de evolucion\n\n1. La etapa inicial esta activa al inicio\n2. Una transicion es franqueable si la etapa anterior esta activa Y la condicion es verdadera\n3. El franqueo desactiva la etapa anterior y activa la siguiente\n4. Son posibles multiples transiciones simultaneas (divergencia/convergencia)"
            },
            {
              type: "info",
              content: "El GRAFCET esta normalizado (IEC 60848) y es ampliamente utilizado en la industria."
            }
          ]
        })
      },
      "Étapes et transitions": {
        title: "Etapas y transiciones",
        description: "Domine las etapas y transiciones del GRAFCET"
      },
      "Les différents types d'actions": {
        title: "Los diferentes tipos de acciones",
        description: "Aprenda acciones continuas, condicionales y memorizadas"
      },
      "Divergences et convergences": {
        title: "Divergencias y convergencias",
        description: "Cree ramas paralelas y alternativas"
      },
      "Macro-étapes et sous-programmes": {
        title: "Macro-etapas y subprogramas",
        description: "Estructure secuencias complejas"
      },
      "Traduction GRAFCET vers LADDER": {
        title: "Traduccion GRAFCET a LADDER",
        description: "Convierta GRAFCET a codigo LADDER"
      },
      "Exemple complet : système de remplissage": {
        title: "Ejemplo completo: sistema de llenado",
        description: "Aplique GRAFCET a un sistema real"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Introduction au GRAFCET (5 questions)
    [
      {
        question: "Que signifie GRAFCET ?",
        options: [
          "Graphe Fonctionnel de Commande Etape-Transition",
          "Graphique de Fonctionnement des Capteurs",
          "Groupe de Recherche sur l'Automatisme",
          "Graph of Functions for Control Engineering"
        ],
        correctIndex: 0,
        explanation: "GRAFCET signifie Graphe Fonctionnel de Commande Etape-Transition.",
        order: 1
      },
      {
        question: "Qu'est-ce qu'une etape initiale dans un GRAFCET ?",
        options: [
          "L'etape la plus longue",
          "L'etape active au demarrage du systeme",
          "L'etape finale",
          "Une etape sans action"
        ],
        correctIndex: 1,
        explanation: "L'etape initiale est l'etape active au demarrage. Elle est representee par un double carre.",
        order: 2
      },
      {
        question: "Qu'est-ce qu'une transition dans un GRAFCET ?",
        options: [
          "Une action a effectuer",
          "Une condition pour passer a l'etape suivante",
          "Un etat du systeme",
          "Un type de capteur"
        ],
        correctIndex: 1,
        explanation: "Une transition est une condition logique qui, lorsqu'elle est vraie, permet de passer a l'etape suivante.",
        order: 3
      },
      {
        question: "Quelle norme francaise definit le GRAFCET ?",
        options: [
          "NF C 15-100",
          "NF C 03-190",
          "NF EN 60204",
          "NF ISO 9001"
        ],
        correctIndex: 1,
        explanation: "Le GRAFCET est defini par la norme NF C 03-190, largement utilisee dans l'industrie francaise.",
        order: 4
      },
      {
        question: "Quand une transition est-elle franchissable ?",
        options: [
          "Toujours",
          "Quand la condition est vraie uniquement",
          "Quand l'etape precedente est active ET la condition est vraie",
          "Apres un delai fixe"
        ],
        correctIndex: 2,
        explanation: "Une transition est franchissable si l'etape precedente est active ET si la condition de transition est vraie.",
        order: 5
      }
    ],
    // Lesson 2: Etapes et transitions (5 questions)
    [
      {
        question: "Comment represente-t-on une etape initiale dans un GRAFCET ?",
        options: [
          "Un carre simple",
          "Un double carre (carre dans un carre)",
          "Un cercle",
          "Un triangle"
        ],
        correctIndex: 1,
        explanation: "L'etape initiale est representee par un double carre pour la distinguer des etapes normales.",
        order: 1
      },
      {
        question: "Que signifie la notation t/5/3s dans une transition ?",
        options: [
          "Transition 5, duree 3s",
          "Temporisation : 3s apres activation de l'etape 5",
          "5 transitions en 3 secondes",
          "Transition numero 53"
        ],
        correctIndex: 1,
        explanation: "t/5/3s signifie une temporisation de 3 secondes apres l'activation de l'etape 5.",
        order: 2
      },
      {
        question: "Que represente le symbole ↑a dans une transition ?",
        options: [
          "a est toujours vrai",
          "Front montant sur a",
          "Front descendant sur a",
          "a est desactive"
        ],
        correctIndex: 1,
        explanation: "↑a represente un front montant (passage de 0 a 1) sur la variable a.",
        order: 3
      },
      {
        question: "Quelle est la signification de la receptivite '= 1' ?",
        options: [
          "La transition n'est jamais franchissable",
          "La transition est toujours franchissable",
          "Il faut appuyer sur le bouton 1",
          "L'etape dure 1 seconde"
        ],
        correctIndex: 1,
        explanation: "= 1 signifie 'toujours vrai', la transition est franchissable des que l'etape est active.",
        order: 4
      },
      {
        question: "Comment note-t-on une condition 'a ET b' dans une transition ?",
        options: [
          "a + b",
          "a . b ou a ∧ b",
          "a - b",
          "a / b"
        ],
        correctIndex: 1,
        explanation: "a . b (point) ou a ∧ b (chapeau) represente la fonction ET en notation GRAFCET.",
        order: 5
      }
    ],
    // Lesson 3: Les differents types d'actions (5 questions)
    [
      {
        question: "Qu'est-ce qu'une action continue dans un GRAFCET ?",
        options: [
          "Une action qui dure 1 seconde",
          "Une action active tant que l'etape est active",
          "Une action qui reste active apres avoir quitte l'etape",
          "Une action conditionnelle"
        ],
        correctIndex: 1,
        explanation: "L'action continue est active tant que l'etape est active. Elle s'arrete quand on quitte l'etape.",
        order: 1
      },
      {
        question: "Que signifie le prefixe S dans une action GRAFCET ?",
        options: [
          "Stop",
          "SET (activation memorisee)",
          "Slow (lent)",
          "Signal"
        ],
        correctIndex: 1,
        explanation: "S = SET, l'action est activee et reste active meme apres avoir quitte l'etape.",
        order: 2
      },
      {
        question: "Comment desactive-t-on une action SET ?",
        options: [
          "Elle se desactive automatiquement",
          "Avec une action RESET (R)",
          "En coupant l'alimentation",
          "Avec une temporisation"
        ],
        correctIndex: 1,
        explanation: "Une action SET reste active jusqu'a ce qu'elle soit desactivee par une action RESET (R).",
        order: 3
      },
      {
        question: "Que signifie 'C capteur : Moteur' dans une etape ?",
        options: [
          "Le capteur commande le moteur",
          "L'action Moteur est conditionnelle a la variable capteur",
          "Le capteur est connecte au moteur",
          "C'est une erreur de syntaxe"
        ],
        correctIndex: 1,
        explanation: "C = Condition. L'action n'est active que si l'etape est active ET la condition est vraie.",
        order: 4
      },
      {
        question: "Que signifie D t : Action dans un GRAFCET ?",
        options: [
          "Delete action",
          "Action retardee (Delay) - s'active apres le temps t",
          "Double action",
          "Direct action"
        ],
        correctIndex: 1,
        explanation: "D = Delay (retard). L'action ne s'active qu'apres le temps t depuis l'activation de l'etape.",
        order: 5
      }
    ],
    // Lesson 4: Divergences et convergences (5 questions)
    [
      {
        question: "Qu'est-ce qu'une divergence en OU ?",
        options: [
          "Toutes les branches sont activees simultanement",
          "Une seule branche est activee selon la condition",
          "Aucune branche n'est activee",
          "Les branches s'executent en boucle"
        ],
        correctIndex: 1,
        explanation: "En divergence OU, une seule branche est choisie selon la condition de transition vraie.",
        order: 1
      },
      {
        question: "Comment represente-t-on une divergence en ET (parallelisme) ?",
        options: [
          "Un trait simple horizontal",
          "Une double barre horizontale",
          "Un cercle",
          "Un losange"
        ],
        correctIndex: 1,
        explanation: "La double barre horizontale indique une divergence/convergence en ET (parallelisme).",
        order: 2
      },
      {
        question: "Que se passe-t-il a une convergence en ET ?",
        options: [
          "La premiere branche terminee continue",
          "On attend que TOUTES les branches soient terminees",
          "On quitte immediatement",
          "Une seule branche est selectionnee"
        ],
        correctIndex: 1,
        explanation: "La convergence ET est une synchronisation : on attend que toutes les branches soient terminees.",
        order: 3
      },
      {
        question: "Pourquoi les conditions en divergence OU doivent-elles etre mutuellement exclusives ?",
        options: [
          "Pour economiser de la memoire",
          "Pour eviter l'ambiguite (deux branches activees)",
          "C'est une preference de style",
          "Pour la vitesse d'execution"
        ],
        correctIndex: 1,
        explanation: "Si deux conditions sont vraies simultanement, on ne sait pas quelle branche choisir (ambiguite).",
        order: 4
      },
      {
        question: "Combien de branches peuvent etre actives simultanement dans une divergence en ET ?",
        options: [
          "Une seule",
          "Deux maximum",
          "Toutes les branches",
          "Aucune"
        ],
        correctIndex: 2,
        explanation: "Dans une divergence ET, toutes les branches sont activees simultanement (parallelisme).",
        order: 5
      }
    ],
    // Lesson 5: Macro-etapes et sous-programmes (5 questions)
    [
      {
        question: "Qu'est-ce qu'une macro-etape dans un GRAFCET ?",
        options: [
          "Une etape tres grande",
          "Une etape qui contient une sequence complete",
          "Une etape rapide",
          "Une etape sans action"
        ],
        correctIndex: 1,
        explanation: "Une macro-etape regroupe une sequence complete de GRAFCET pour simplifier le schema principal.",
        order: 1
      },
      {
        question: "Quel est l'avantage principal des macro-etapes ?",
        options: [
          "Elles sont plus rapides",
          "Lisibilite et modularite du programme",
          "Elles consomment moins de memoire",
          "Elles sont obligatoires"
        ],
        correctIndex: 1,
        explanation: "Les macro-etapes ameliorent la lisibilite en masquant les details et permettent la reutilisation.",
        order: 2
      },
      {
        question: "Qu'est-ce que l'etape E dans une macro-etape ?",
        options: [
          "L'etape d'erreur",
          "L'etape d'entree de la macro",
          "L'etape d'execution",
          "L'etape d'echappement"
        ],
        correctIndex: 1,
        explanation: "E = Entree, c'est la premiere etape de la sequence contenue dans la macro-etape.",
        order: 3
      },
      {
        question: "Quel GRAFCET est prioritaire dans la hierarchie ?",
        options: [
          "GRAFCET de production",
          "GRAFCET de securite",
          "GRAFCET de conduite",
          "GRAFCET de defaut"
        ],
        correctIndex: 1,
        explanation: "Le GRAFCET de securite (arrets d'urgence) est toujours prioritaire sur les autres.",
        order: 4
      },
      {
        question: "Une macro-etape peut-elle etre appelee plusieurs fois dans un programme ?",
        options: [
          "Non, jamais",
          "Oui, c'est l'un de ses avantages (reutilisation)",
          "Seulement deux fois",
          "Uniquement en mode manuel"
        ],
        correctIndex: 1,
        explanation: "La reutilisation est un avantage cle : une macro peut etre appelee plusieurs fois.",
        order: 5
      }
    ],
    // Lesson 6: Traduction GRAFCET vers LADDER (5 questions)
    [
      {
        question: "En LADDER, comment represente-t-on une etape GRAFCET ?",
        options: [
          "Par un temporisateur",
          "Par un bit memoire (variable booleenne)",
          "Par une entree physique",
          "Par une sortie analogique"
        ],
        correctIndex: 1,
        explanation: "Chaque etape devient un bit memoire (ex: X0, X1, M0, M1...) qui vaut 1 quand l'etape est active.",
        order: 1
      },
      {
        question: "Comment active-t-on une etape Xi en LADDER ?",
        options: [
          "Avec un temporisateur",
          "Quand l'etape precedente est active ET la transition est vraie",
          "Automatiquement au demarrage",
          "Avec une entree analogique"
        ],
        correctIndex: 1,
        explanation: "Xi s'active quand Xi-1 est active ET que la condition de transition est vraie.",
        order: 2
      },
      {
        question: "Quelle methode utilise-t-on souvent pour les etapes en LADDER ?",
        options: [
          "Temporisateurs uniquement",
          "SET/RESET (memorisation)",
          "Contacts uniquement",
          "Compteurs"
        ],
        correctIndex: 1,
        explanation: "SET active l'etape, RESET la desactive. C'est la methode la plus claire pour les GRAFCET.",
        order: 3
      },
      {
        question: "Comment traduit-on une action continue de l'etape 5 ?",
        options: [
          "SET Moteur quand X5 est actif",
          "Contact X5 en serie avec la bobine Moteur",
          "Temporisateur de 5 secondes",
          "Compteur a 5"
        ],
        correctIndex: 1,
        explanation: "Une action continue utilise un contact de l'etape : quand X5=1, la bobine est alimentee.",
        order: 4
      },
      {
        question: "Comment traduit-on une action SET dans une etape ?",
        options: [
          "Avec un contact simple",
          "Avec un front montant [P] et une bobine SET",
          "Avec un temporisateur",
          "Avec un compteur"
        ],
        correctIndex: 1,
        explanation: "On utilise un front [P] sur l'etape pour ne SET qu'une fois a l'activation.",
        order: 5
      }
    ],
    // Lesson 7: Exemple complet (5 questions)
    [
      {
        question: "Dans l'exemple de remplissage, quelle est la premiere condition pour demarrer ?",
        options: [
          "Le verin est sorti",
          "Presence d'une bouteille ET bouton depart cycle",
          "La vanne est ouverte",
          "Le temporisateur est termine"
        ],
        correctIndex: 1,
        explanation: "La transition 0→1 necessite : presence bouteille ET bouton depart cycle (dcy).",
        order: 1
      },
      {
        question: "Combien de temps dure le remplissage dans l'exemple ?",
        options: [
          "1 seconde",
          "3 secondes",
          "5 secondes",
          "10 secondes"
        ],
        correctIndex: 1,
        explanation: "La transition t/1/3s indique un remplissage de 3 secondes apres l'activation de l'etape 1.",
        order: 2
      },
      {
        question: "Quelle action est associee a l'etape 2 (evacuation) ?",
        options: [
          "Ouverture de la vanne",
          "Sortie du verin evacuation",
          "Retour du verin",
          "Arret du systeme"
        ],
        correctIndex: 1,
        explanation: "L'etape 2 active la sortie 'Evacuation' qui pousse la bouteille avec le verin.",
        order: 3
      },
      {
        question: "Quelle est la condition pour passer de l'etape 2 a l'etape 3 ?",
        options: [
          "Temporisation de 3s",
          "Fin de course verin sorti",
          "Presence bouteille",
          "Bouton depart cycle"
        ],
        correctIndex: 1,
        explanation: "La transition utilise le capteur 'verin_sorti' qui detecte que le verin a atteint sa position.",
        order: 4
      },
      {
        question: "Que manque-t-il souvent dans un GRAFCET de production reel ?",
        options: [
          "Les etapes",
          "Les transitions",
          "La gestion des modes (auto/manu) et les securites",
          "Les actions"
        ],
        correctIndex: 2,
        explanation: "En production reelle, on ajoute la gestion des modes, des defauts et des securites.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1
      "Que signifie GRAFCET ?": {
        question: "What does GRAFCET stand for?",
        options: [
          "Sequential Function Chart for Control Commands",
          "Graph of Operation Functions for Sensors",
          "Research Group on Automation",
          "Graph of Functions for Control Engineering"
        ],
        explanation: "GRAFCET stands for Sequential Function Chart (Graphe Fonctionnel de Commande Etape-Transition in French)."
      },
      "Qu'est-ce qu'une etape initiale dans un GRAFCET ?": {
        question: "What is an initial step in a GRAFCET?",
        options: [
          "The longest step",
          "The step active at system startup",
          "The final step",
          "A step without action"
        ],
        explanation: "The initial step is the step active at startup. It is represented by a double square."
      },
      "Qu'est-ce qu'une transition dans un GRAFCET ?": {
        question: "What is a transition in a GRAFCET?",
        options: [
          "An action to perform",
          "A condition to move to the next step",
          "A system state",
          "A type of sensor"
        ],
        explanation: "A transition is a logical condition that, when true, allows moving to the next step."
      },
      "Quelle norme francaise definit le GRAFCET ?": {
        question: "Which standard defines GRAFCET?",
        options: [
          "NF C 15-100",
          "NF C 03-190 (IEC 60848)",
          "NF EN 60204",
          "NF ISO 9001"
        ],
        explanation: "GRAFCET is defined by IEC 60848 (NF C 03-190 in France), widely used in industry."
      },
      "Quand une transition est-elle franchissable ?": {
        question: "When is a transition crossable?",
        options: [
          "Always",
          "When the condition is true only",
          "When the previous step is active AND the condition is true",
          "After a fixed delay"
        ],
        explanation: "A transition is crossable if the previous step is active AND the transition condition is true."
      },
      // Lesson 2
      "Comment represente-t-on une etape initiale dans un GRAFCET ?": {
        question: "How is an initial step represented in a GRAFCET?",
        options: [
          "A simple square",
          "A double square (square inside a square)",
          "A circle",
          "A triangle"
        ],
        explanation: "The initial step is represented by a double square to distinguish it from normal steps."
      },
      "Que signifie la notation t/5/3s dans une transition ?": {
        question: "What does the notation t/5/3s mean in a transition?",
        options: [
          "Transition 5, duration 3s",
          "Timer: 3s after activation of step 5",
          "5 transitions in 3 seconds",
          "Transition number 53"
        ],
        explanation: "t/5/3s means a timer of 3 seconds after the activation of step 5."
      },
      "Que represente le symbole ↑a dans une transition ?": {
        question: "What does the symbol ↑a represent in a transition?",
        options: [
          "a is always true",
          "Rising edge on a",
          "Falling edge on a",
          "a is deactivated"
        ],
        explanation: "↑a represents a rising edge (change from 0 to 1) on variable a."
      },
      "Quelle est la signification de la receptivite '= 1' ?": {
        question: "What is the meaning of receptivity '= 1'?",
        options: [
          "The transition is never crossable",
          "The transition is always crossable",
          "Button 1 must be pressed",
          "The step lasts 1 second"
        ],
        explanation: "= 1 means 'always true', the transition is crossable as soon as the step is active."
      },
      "Comment note-t-on une condition 'a ET b' dans une transition ?": {
        question: "How do you write a condition 'a AND b' in a transition?",
        options: [
          "a + b",
          "a . b or a ∧ b",
          "a - b",
          "a / b"
        ],
        explanation: "a . b (dot) or a ∧ b (caret) represents the AND function in GRAFCET notation."
      },
      // Lesson 3
      "Qu'est-ce qu'une action continue dans un GRAFCET ?": {
        question: "What is a continuous action in a GRAFCET?",
        options: [
          "An action that lasts 1 second",
          "An action active while the step is active",
          "An action that remains active after leaving the step",
          "A conditional action"
        ],
        explanation: "A continuous action is active while the step is active. It stops when leaving the step."
      },
      "Que signifie le prefixe S dans une action GRAFCET ?": {
        question: "What does the prefix S mean in a GRAFCET action?",
        options: [
          "Stop",
          "SET (stored activation)",
          "Slow",
          "Signal"
        ],
        explanation: "S = SET, the action is activated and remains active even after leaving the step."
      },
      "Comment desactive-t-on une action SET ?": {
        question: "How do you deactivate a SET action?",
        options: [
          "It deactivates automatically",
          "With a RESET action (R)",
          "By cutting power",
          "With a timer"
        ],
        explanation: "A SET action remains active until it is deactivated by a RESET action (R)."
      },
      "Que signifie 'C capteur : Moteur' dans une etape ?": {
        question: "What does 'C sensor : Motor' mean in a step?",
        options: [
          "The sensor controls the motor",
          "The Motor action is conditional on the sensor variable",
          "The sensor is connected to the motor",
          "It's a syntax error"
        ],
        explanation: "C = Condition. The action is only active if the step is active AND the condition is true."
      },
      "Que signifie D t : Action dans un GRAFCET ?": {
        question: "What does D t : Action mean in a GRAFCET?",
        options: [
          "Delete action",
          "Delayed action - activates after time t",
          "Double action",
          "Direct action"
        ],
        explanation: "D = Delay. The action only activates after time t from the step activation."
      },
      // Lesson 4
      "Qu'est-ce qu'une divergence en OU ?": {
        question: "What is an OR divergence?",
        options: [
          "All branches are activated simultaneously",
          "Only one branch is activated based on condition",
          "No branch is activated",
          "Branches execute in a loop"
        ],
        explanation: "In OR divergence, only one branch is chosen based on the true transition condition."
      },
      "Comment represente-t-on une divergence en ET (parallelisme) ?": {
        question: "How is an AND divergence (parallelism) represented?",
        options: [
          "A simple horizontal line",
          "A double horizontal bar",
          "A circle",
          "A diamond"
        ],
        explanation: "The double horizontal bar indicates an AND divergence/convergence (parallelism)."
      },
      "Que se passe-t-il a une convergence en ET ?": {
        question: "What happens at an AND convergence?",
        options: [
          "The first completed branch continues",
          "We wait for ALL branches to be completed",
          "We exit immediately",
          "Only one branch is selected"
        ],
        explanation: "AND convergence is a synchronization: we wait for all branches to be completed."
      },
      "Pourquoi les conditions en divergence OU doivent-elles etre mutuellement exclusives ?": {
        question: "Why must conditions in OR divergence be mutually exclusive?",
        options: [
          "To save memory",
          "To avoid ambiguity (two branches activated)",
          "It's a style preference",
          "For execution speed"
        ],
        explanation: "If two conditions are true simultaneously, we don't know which branch to choose (ambiguity)."
      },
      "Combien de branches peuvent etre actives simultanement dans une divergence en ET ?": {
        question: "How many branches can be active simultaneously in an AND divergence?",
        options: [
          "Only one",
          "Two maximum",
          "All branches",
          "None"
        ],
        explanation: "In an AND divergence, all branches are activated simultaneously (parallelism)."
      },
      // Lesson 5
      "Qu'est-ce qu'une macro-etape dans un GRAFCET ?": {
        question: "What is a macro-step in a GRAFCET?",
        options: [
          "A very large step",
          "A step that contains a complete sequence",
          "A fast step",
          "A step without action"
        ],
        explanation: "A macro-step groups a complete GRAFCET sequence to simplify the main diagram."
      },
      "Quel est l'avantage principal des macro-etapes ?": {
        question: "What is the main advantage of macro-steps?",
        options: [
          "They are faster",
          "Readability and modularity of the program",
          "They consume less memory",
          "They are mandatory"
        ],
        explanation: "Macro-steps improve readability by hiding details and allow reuse."
      },
      "Qu'est-ce que l'etape E dans une macro-etape ?": {
        question: "What is the E step in a macro-step?",
        options: [
          "The error step",
          "The entry step of the macro",
          "The execution step",
          "The escape step"
        ],
        explanation: "E = Entry, it's the first step of the sequence contained in the macro-step."
      },
      "Quel GRAFCET est prioritaire dans la hierarchie ?": {
        question: "Which GRAFCET is priority in the hierarchy?",
        options: [
          "Production GRAFCET",
          "Safety GRAFCET",
          "Control GRAFCET",
          "Fault GRAFCET"
        ],
        explanation: "The safety GRAFCET (emergency stops) is always priority over others."
      },
      "Une macro-etape peut-elle etre appelee plusieurs fois dans un programme ?": {
        question: "Can a macro-step be called multiple times in a program?",
        options: [
          "No, never",
          "Yes, that's one of its advantages (reuse)",
          "Only twice",
          "Only in manual mode"
        ],
        explanation: "Reuse is a key advantage: a macro can be called multiple times."
      },
      // Lesson 6
      "En LADDER, comment represente-t-on une etape GRAFCET ?": {
        question: "In LADDER, how is a GRAFCET step represented?",
        options: [
          "By a timer",
          "By a memory bit (Boolean variable)",
          "By a physical input",
          "By an analog output"
        ],
        explanation: "Each step becomes a memory bit (e.g., X0, X1, M0, M1...) that equals 1 when the step is active."
      },
      "Comment active-t-on une etape Xi en LADDER ?": {
        question: "How do you activate step Xi in LADDER?",
        options: [
          "With a timer",
          "When the previous step is active AND the transition is true",
          "Automatically at startup",
          "With an analog input"
        ],
        explanation: "Xi is activated when Xi-1 is active AND the transition condition is true."
      },
      "Quelle methode utilise-t-on souvent pour les etapes en LADDER ?": {
        question: "What method is often used for steps in LADDER?",
        options: [
          "Timers only",
          "SET/RESET (latching)",
          "Contacts only",
          "Counters"
        ],
        explanation: "SET activates the step, RESET deactivates it. It's the clearest method for GRAFCET."
      },
      "Comment traduit-on une action continue de l'etape 5 ?": {
        question: "How do you translate a continuous action from step 5?",
        options: [
          "SET Motor when X5 is active",
          "X5 contact in series with Motor coil",
          "Timer of 5 seconds",
          "Counter to 5"
        ],
        explanation: "A continuous action uses a step contact: when X5=1, the coil is energized."
      },
      "Comment traduit-on une action SET dans une etape ?": {
        question: "How do you translate a SET action in a step?",
        options: [
          "With a simple contact",
          "With a rising edge [P] and a SET coil",
          "With a timer",
          "With a counter"
        ],
        explanation: "A rising edge [P] on the step is used to SET only once at activation."
      },
      // Lesson 7
      "Dans l'exemple de remplissage, quelle est la premiere condition pour demarrer ?": {
        question: "In the filling example, what is the first condition to start?",
        options: [
          "The cylinder is extended",
          "Bottle presence AND start cycle button",
          "The valve is open",
          "The timer is finished"
        ],
        explanation: "Transition 0→1 requires: bottle presence AND start cycle button (dcy)."
      },
      "Combien de temps dure le remplissage dans l'exemple ?": {
        question: "How long does filling last in the example?",
        options: [
          "1 second",
          "3 seconds",
          "5 seconds",
          "10 seconds"
        ],
        explanation: "Transition t/1/3s indicates filling of 3 seconds after activation of step 1."
      },
      "Quelle action est associee a l'etape 2 (evacuation) ?": {
        question: "What action is associated with step 2 (evacuation)?",
        options: [
          "Opening the valve",
          "Extending the evacuation cylinder",
          "Cylinder return",
          "System stop"
        ],
        explanation: "Step 2 activates the 'Evacuation' output which pushes the bottle with the cylinder."
      },
      "Quelle est la condition pour passer de l'etape 2 a l'etape 3 ?": {
        question: "What is the condition to go from step 2 to step 3?",
        options: [
          "3s timer",
          "Cylinder extended limit switch",
          "Bottle presence",
          "Start cycle button"
        ],
        explanation: "The transition uses the 'cylinder_extended' sensor that detects the cylinder reached its position."
      },
      "Que manque-t-il souvent dans un GRAFCET de production reel ?": {
        question: "What is often missing in a real production GRAFCET?",
        options: [
          "Steps",
          "Transitions",
          "Mode management (auto/manual) and safety features",
          "Actions"
        ],
        explanation: "In real production, mode management, faults, and safety features are added."
      }
    },
    es: {
      // Lesson 1
      "Que signifie GRAFCET ?": {
        question: "Que significa GRAFCET?",
        options: [
          "Grafico Funcional de Control Etapa-Transicion",
          "Grafico de Funcionamiento de Captadores",
          "Grupo de Investigacion sobre Automatismo",
          "Grafico de Funciones para Ingenieria de Control"
        ],
        explanation: "GRAFCET significa Grafico Funcional de Control Etapa-Transicion."
      },
      "Qu'est-ce qu'une etape initiale dans un GRAFCET ?": {
        question: "Que es una etapa inicial en un GRAFCET?",
        options: [
          "La etapa mas larga",
          "La etapa activa al arrancar el sistema",
          "La etapa final",
          "Una etapa sin accion"
        ],
        explanation: "La etapa inicial es la etapa activa al arranque. Se representa con un doble cuadrado."
      },
      "Qu'est-ce qu'une transition dans un GRAFCET ?": {
        question: "Que es una transicion en un GRAFCET?",
        options: [
          "Una accion a realizar",
          "Una condicion para pasar a la siguiente etapa",
          "Un estado del sistema",
          "Un tipo de sensor"
        ],
        explanation: "Una transicion es una condicion logica que, cuando es verdadera, permite pasar a la siguiente etapa."
      },
      "Quelle norme francaise definit le GRAFCET ?": {
        question: "Que norma define el GRAFCET?",
        options: [
          "NF C 15-100",
          "NF C 03-190 (IEC 60848)",
          "NF EN 60204",
          "NF ISO 9001"
        ],
        explanation: "El GRAFCET esta definido por la norma IEC 60848, ampliamente utilizada en la industria."
      },
      "Quand une transition est-elle franchissable ?": {
        question: "Cuando es franqueable una transicion?",
        options: [
          "Siempre",
          "Cuando la condicion es verdadera unicamente",
          "Cuando la etapa anterior esta activa Y la condicion es verdadera",
          "Despues de un retardo fijo"
        ],
        explanation: "Una transicion es franqueable si la etapa anterior esta activa Y la condicion de transicion es verdadera."
      },
      // Lesson 2
      "Comment represente-t-on une etape initiale dans un GRAFCET ?": {
        question: "Como se representa una etapa inicial en un GRAFCET?",
        options: [
          "Un cuadrado simple",
          "Un doble cuadrado (cuadrado dentro de un cuadrado)",
          "Un circulo",
          "Un triangulo"
        ],
        explanation: "La etapa inicial se representa con un doble cuadrado para distinguirla de las etapas normales."
      },
      "Que signifie la notation t/5/3s dans une transition ?": {
        question: "Que significa la notacion t/5/3s en una transicion?",
        options: [
          "Transicion 5, duracion 3s",
          "Temporizacion: 3s despues de activar la etapa 5",
          "5 transiciones en 3 segundos",
          "Transicion numero 53"
        ],
        explanation: "t/5/3s significa una temporizacion de 3 segundos despues de la activacion de la etapa 5."
      },
      "Que represente le symbole ↑a dans une transition ?": {
        question: "Que representa el simbolo ↑a en una transicion?",
        options: [
          "a siempre es verdadero",
          "Flanco ascendente en a",
          "Flanco descendente en a",
          "a esta desactivado"
        ],
        explanation: "↑a representa un flanco ascendente (cambio de 0 a 1) en la variable a."
      },
      "Quelle est la signification de la receptivite '= 1' ?": {
        question: "Cual es el significado de la receptividad '= 1'?",
        options: [
          "La transicion nunca es franqueable",
          "La transicion siempre es franqueable",
          "Hay que pulsar el boton 1",
          "La etapa dura 1 segundo"
        ],
        explanation: "= 1 significa 'siempre verdadero', la transicion es franqueable en cuanto la etapa esta activa."
      },
      "Comment note-t-on une condition 'a ET b' dans une transition ?": {
        question: "Como se escribe una condicion 'a Y b' en una transicion?",
        options: [
          "a + b",
          "a . b o a ∧ b",
          "a - b",
          "a / b"
        ],
        explanation: "a . b (punto) o a ∧ b (acento) representa la funcion Y en notacion GRAFCET."
      },
      // Lesson 3
      "Qu'est-ce qu'une action continue dans un GRAFCET ?": {
        question: "Que es una accion continua en un GRAFCET?",
        options: [
          "Una accion que dura 1 segundo",
          "Una accion activa mientras la etapa esta activa",
          "Una accion que permanece activa al salir de la etapa",
          "Una accion condicional"
        ],
        explanation: "La accion continua esta activa mientras la etapa esta activa. Se detiene al salir de la etapa."
      },
      "Que signifie le prefixe S dans une action GRAFCET ?": {
        question: "Que significa el prefijo S en una accion GRAFCET?",
        options: [
          "Stop",
          "SET (activacion memorizada)",
          "Slow (lento)",
          "Signal"
        ],
        explanation: "S = SET, la accion se activa y permanece activa incluso despues de salir de la etapa."
      },
      "Comment desactive-t-on une action SET ?": {
        question: "Como se desactiva una accion SET?",
        options: [
          "Se desactiva automaticamente",
          "Con una accion RESET (R)",
          "Cortando la alimentacion",
          "Con una temporizacion"
        ],
        explanation: "Una accion SET permanece activa hasta que se desactiva con una accion RESET (R)."
      },
      "Que signifie 'C capteur : Moteur' dans une etape ?": {
        question: "Que significa 'C sensor : Motor' en una etapa?",
        options: [
          "El sensor controla el motor",
          "La accion Motor es condicional a la variable sensor",
          "El sensor esta conectado al motor",
          "Es un error de sintaxis"
        ],
        explanation: "C = Condicion. La accion solo esta activa si la etapa esta activa Y la condicion es verdadera."
      },
      "Que signifie D t : Action dans un GRAFCET ?": {
        question: "Que significa D t : Accion en un GRAFCET?",
        options: [
          "Delete action",
          "Accion retardada - se activa despues del tiempo t",
          "Double action",
          "Direct action"
        ],
        explanation: "D = Delay (retardo). La accion solo se activa despues del tiempo t desde la activacion de la etapa."
      },
      // Lesson 4
      "Qu'est-ce qu'une divergence en OU ?": {
        question: "Que es una divergencia en O?",
        options: [
          "Todas las ramas se activan simultaneamente",
          "Solo una rama se activa segun la condicion",
          "Ninguna rama se activa",
          "Las ramas se ejecutan en bucle"
        ],
        explanation: "En divergencia O, solo se elige una rama segun la condicion de transicion verdadera."
      },
      "Comment represente-t-on une divergence en ET (parallelisme) ?": {
        question: "Como se representa una divergencia en Y (paralelismo)?",
        options: [
          "Una linea horizontal simple",
          "Una doble barra horizontal",
          "Un circulo",
          "Un rombo"
        ],
        explanation: "La doble barra horizontal indica una divergencia/convergencia en Y (paralelismo)."
      },
      "Que se passe-t-il a une convergence en ET ?": {
        question: "Que ocurre en una convergencia en Y?",
        options: [
          "La primera rama terminada continua",
          "Se espera a que TODAS las ramas esten terminadas",
          "Se sale inmediatamente",
          "Solo se selecciona una rama"
        ],
        explanation: "La convergencia Y es una sincronizacion: se espera a que todas las ramas esten terminadas."
      },
      "Pourquoi les conditions en divergence OU doivent-elles etre mutuellement exclusives ?": {
        question: "Por que las condiciones en divergencia O deben ser mutuamente exclusivas?",
        options: [
          "Para ahorrar memoria",
          "Para evitar ambiguedad (dos ramas activadas)",
          "Es una preferencia de estilo",
          "Para la velocidad de ejecucion"
        ],
        explanation: "Si dos condiciones son verdaderas simultaneamente, no se sabe que rama elegir (ambiguedad)."
      },
      "Combien de branches peuvent etre actives simultanement dans une divergence en ET ?": {
        question: "Cuantas ramas pueden estar activas simultaneamente en una divergencia en Y?",
        options: [
          "Solo una",
          "Dos maximo",
          "Todas las ramas",
          "Ninguna"
        ],
        explanation: "En una divergencia Y, todas las ramas se activan simultaneamente (paralelismo)."
      },
      // Lesson 5
      "Qu'est-ce qu'une macro-etape dans un GRAFCET ?": {
        question: "Que es una macro-etapa en un GRAFCET?",
        options: [
          "Una etapa muy grande",
          "Una etapa que contiene una secuencia completa",
          "Una etapa rapida",
          "Una etapa sin accion"
        ],
        explanation: "Una macro-etapa agrupa una secuencia GRAFCET completa para simplificar el diagrama principal."
      },
      "Quel est l'avantage principal des macro-etapes ?": {
        question: "Cual es la principal ventaja de las macro-etapas?",
        options: [
          "Son mas rapidas",
          "Legibilidad y modularidad del programa",
          "Consumen menos memoria",
          "Son obligatorias"
        ],
        explanation: "Las macro-etapas mejoran la legibilidad ocultando detalles y permiten la reutilizacion."
      },
      "Qu'est-ce que l'etape E dans une macro-etape ?": {
        question: "Que es la etapa E en una macro-etapa?",
        options: [
          "La etapa de error",
          "La etapa de entrada de la macro",
          "La etapa de ejecucion",
          "La etapa de escape"
        ],
        explanation: "E = Entrada, es la primera etapa de la secuencia contenida en la macro-etapa."
      },
      "Quel GRAFCET est prioritaire dans la hierarchie ?": {
        question: "Que GRAFCET es prioritario en la jerarquia?",
        options: [
          "GRAFCET de produccion",
          "GRAFCET de seguridad",
          "GRAFCET de conduccion",
          "GRAFCET de defecto"
        ],
        explanation: "El GRAFCET de seguridad (paradas de emergencia) siempre es prioritario sobre los demas."
      },
      "Une macro-etape peut-elle etre appelee plusieurs fois dans un programme ?": {
        question: "Puede llamarse una macro-etapa varias veces en un programa?",
        options: [
          "No, nunca",
          "Si, es una de sus ventajas (reutilizacion)",
          "Solo dos veces",
          "Solo en modo manual"
        ],
        explanation: "La reutilizacion es una ventaja clave: una macro puede llamarse varias veces."
      },
      // Lesson 6
      "En LADDER, comment represente-t-on une etape GRAFCET ?": {
        question: "En LADDER, como se representa una etapa GRAFCET?",
        options: [
          "Por un temporizador",
          "Por un bit de memoria (variable booleana)",
          "Por una entrada fisica",
          "Por una salida analogica"
        ],
        explanation: "Cada etapa se convierte en un bit de memoria (ej: X0, X1, M0, M1...) que vale 1 cuando la etapa esta activa."
      },
      "Comment active-t-on une etape Xi en LADDER ?": {
        question: "Como se activa una etapa Xi en LADDER?",
        options: [
          "Con un temporizador",
          "Cuando la etapa anterior esta activa Y la transicion es verdadera",
          "Automaticamente al arrancar",
          "Con una entrada analogica"
        ],
        explanation: "Xi se activa cuando Xi-1 esta activa Y la condicion de transicion es verdadera."
      },
      "Quelle methode utilise-t-on souvent pour les etapes en LADDER ?": {
        question: "Que metodo se usa frecuentemente para las etapas en LADDER?",
        options: [
          "Solo temporizadores",
          "SET/RESET (memorizacion)",
          "Solo contactos",
          "Contadores"
        ],
        explanation: "SET activa la etapa, RESET la desactiva. Es el metodo mas claro para GRAFCET."
      },
      "Comment traduit-on une action continue de l'etape 5 ?": {
        question: "Como se traduce una accion continua de la etapa 5?",
        options: [
          "SET Motor cuando X5 esta activo",
          "Contacto X5 en serie con la bobina Motor",
          "Temporizador de 5 segundos",
          "Contador a 5"
        ],
        explanation: "Una accion continua usa un contacto de la etapa: cuando X5=1, la bobina esta alimentada."
      },
      "Comment traduit-on une action SET dans une etape ?": {
        question: "Como se traduce una accion SET en una etapa?",
        options: [
          "Con un contacto simple",
          "Con un flanco ascendente [P] y una bobina SET",
          "Con un temporizador",
          "Con un contador"
        ],
        explanation: "Se usa un flanco [P] en la etapa para hacer SET solo una vez en la activacion."
      },
      // Lesson 7
      "Dans l'exemple de remplissage, quelle est la premiere condition pour demarrer ?": {
        question: "En el ejemplo de llenado, cual es la primera condicion para arrancar?",
        options: [
          "El cilindro esta extendido",
          "Presencia de una botella Y boton de inicio de ciclo",
          "La valvula esta abierta",
          "El temporizador ha terminado"
        ],
        explanation: "La transicion 0→1 requiere: presencia de botella Y boton de inicio de ciclo (dcy)."
      },
      "Combien de temps dure le remplissage dans l'exemple ?": {
        question: "Cuanto tiempo dura el llenado en el ejemplo?",
        options: [
          "1 segundo",
          "3 segundos",
          "5 segundos",
          "10 segundos"
        ],
        explanation: "La transicion t/1/3s indica un llenado de 3 segundos despues de la activacion de la etapa 1."
      },
      "Quelle action est associee a l'etape 2 (evacuation) ?": {
        question: "Que accion esta asociada a la etapa 2 (evacuacion)?",
        options: [
          "Apertura de la valvula",
          "Salida del cilindro de evacuacion",
          "Retorno del cilindro",
          "Parada del sistema"
        ],
        explanation: "La etapa 2 activa la salida 'Evacuacion' que empuja la botella con el cilindro."
      },
      "Quelle est la condition pour passer de l'etape 2 a l'etape 3 ?": {
        question: "Cual es la condicion para pasar de la etapa 2 a la etapa 3?",
        options: [
          "Temporizacion de 3s",
          "Fin de carrera cilindro extendido",
          "Presencia de botella",
          "Boton de inicio de ciclo"
        ],
        explanation: "La transicion usa el sensor 'cilindro_extendido' que detecta que el cilindro alcanzo su posicion."
      },
      "Que manque-t-il souvent dans un GRAFCET de production reel ?": {
        question: "Que falta frecuentemente en un GRAFCET de produccion real?",
        options: [
          "Las etapas",
          "Las transiciones",
          "La gestion de modos (auto/manual) y las seguridades",
          "Las acciones"
        ],
        explanation: "En produccion real, se anade la gestion de modos, defectos y seguridades."
      }
    }
  }
}
