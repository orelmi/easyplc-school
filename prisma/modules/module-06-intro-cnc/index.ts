import type { ModuleData } from '../types.js'

export const module06Data: ModuleData = {
  // Module info
  moduleOrder: 6,
  moduleTitle: "Introduction à la CNC",
  moduleDescription: "Découvrez les bases des machines à commande numérique",
  moduleTranslations: {
    en: {
      title: "Introduction to CNC",
      description: "Discover the basics of CNC machines and their operation"
    },
    es: {
      title: "Introducción a CNC",
      description: "Descubra los fundamentos de las máquinas CNC y su funcionamiento"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Qu'est-ce qu'une machine CNC ?",
      description: "Découvrez les bases des machines à commande numérique",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les machines CNC\n\nUne **machine CNC** (Commande Numérique par Calculateur) est un outil de fabrication piloté par un programme informatique. Elle automatise l'usinage de pièces avec une grande précision."
          },
          {
            type: "info",
            content: "Les premières machines CNC sont apparues dans les années 1950, révolutionnant l'industrie manufacturière."
          },
          {
            type: "text",
            content: "## Comment ça fonctionne ?\n\nLa machine CNC suit des instructions écrites en **G-code**, un langage de programmation standardisé. Ces instructions contrôlent :\n\n- Les mouvements de l'outil selon différents axes\n- La vitesse de rotation de la broche\n- La vitesse d'avance\n- Les changements d'outil"
          },
          {
            type: "text",
            content: "## Avantages de la CNC\n\n- **Précision** : Tolérances de quelques centièmes de millimètre\n- **Répétabilité** : Pièces identiques à chaque fois\n- **Productivité** : Fonctionnement continu 24h/24\n- **Complexité** : Usinage possible de formes complexes"
          }
        ]
      })
    },
    {
      title: "Types de machines CNC",
      description: "Découvrez les différents types de machines CNC et leurs applications",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Types de machines CNC\n\nIl existe de nombreux types de machines CNC, chacune conçue pour des applications spécifiques."
          },
          {
            type: "text",
            content: "## Fraiseuse CNC\n\nLa fraiseuse utilise un outil rotatif qui enlève la matière. Elle peut :\n- Usiner des surfaces planes\n- Créer des rainures et des poches\n- Percer des trous\n- Réaliser des formes 3D complexes"
          },
          {
            type: "text",
            content: "## Tour CNC\n\nLe tour fait tourner la pièce pendant que l'outil enlève la matière. Idéal pour :\n- Les pièces cylindriques\n- Les filetages\n- Les cônes et sphères\n- L'usinage intérieur et extérieur"
          },
          {
            type: "text",
            content: "## Autres types\n\n| Machine | Application |\n|---------|-------------|\n| Découpe laser | Découpe de précision de tôles |\n| Découpe plasma | Découpe de métal épais |\n| Électroérosion | Usinage de matériaux durs |\n| Imprimante 3D | Fabrication additive |"
          }
        ]
      })
    },
    {
      title: "Sécurité sur machines CNC",
      description: "Les règles essentielles de sécurité en environnement CNC",
      order: 3,
      xpReward: 65,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sécurité sur machines CNC\n\nLes machines CNC sont des équipements puissants qui nécessitent le respect strict des règles de sécurité."
          },
          {
            type: "warning",
            content: "Ne jamais intervenir sur une machine en fonctionnement ! Les mouvements rapides peuvent causer des blessures graves."
          },
          {
            type: "text",
            content: "## Équipements de Protection Individuelle (EPI)\n\n- **Lunettes de sécurité** : Protection contre les projections de copeaux\n- **Chaussures de sécurité** : Protection contre les chutes d'objets\n- **Vêtements ajustés** : Éviter les vêtements amples qui peuvent se prendre dans les machines\n- **Protection auditive** : Dans les environnements bruyants"
          },
          {
            type: "text",
            content: "## Zones de danger\n\n| Zone | Risque | Précaution |\n|------|--------|------------|\n| Broche | Rotation rapide | Ne jamais approcher les mains |\n| Table | Mouvements soudains | Rester à distance |\n| Changeur d'outil | Pincement | Zone interdite en marche |\n| Copeaux | Coupures, brûlures | Utiliser un crochet pour les retirer |"
          },
          {
            type: "info",
            content: "Toujours effectuer un essai à vide (dry run) avant d'usiner une nouvelle pièce pour vérifier le programme."
          }
        ]
      })
    },
    {
      title: "Matériaux et outils de coupe",
      description: "Comprendre les matériaux usinables et les outils adaptés",
      order: 4,
      xpReward: 70,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Matériaux et outils de coupe\n\nLe choix de l'outil de coupe dépend du matériau à usiner et des conditions d'usinage."
          },
          {
            type: "text",
            content: "## Matériaux courants\n\n### Métaux\n- **Aluminium** : Facile à usiner, vitesses élevées possibles\n- **Acier doux** : Vitesses moyennes, bon état de surface\n- **Acier inoxydable** : Plus difficile, vitesses réduites\n- **Titane** : Très difficile, outils spéciaux nécessaires"
          },
          {
            type: "text",
            content: "### Autres matériaux\n- **Plastiques** : Attention à la chaleur (fusion)\n- **Bois** : Vitesses élevées, poussière\n- **Composites** : Outils spéciaux (diamant)"
          },
          {
            type: "text",
            content: "## Types d'outils\n\n| Outil | Application |\n|-------|-------------|\n| Fraise en bout | Surfaçage, rainurage |\n| Fraise boule | Contournage 3D |\n| Foret | Perçage |\n| Taraud | Filetage intérieur |\n| Alésoir | Finition de trous précis |"
          },
          {
            type: "diagram",
            title: "Paramètres de coupe",
            content: `┌─────────────────────────────────────────────────────────┐
│              PARAMÈTRES DE COUPE                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Vc = Vitesse de coupe (m/min)                        │
│   ────────────────────────────                          │
│   Dépend du matériau outil + matériau pièce            │
│                                                         │
│   N = (Vc × 1000) / (π × D)                            │
│   ───────────────────────────                           │
│   N = Vitesse broche (tr/min)                          │
│   D = Diamètre outil (mm)                               │
│                                                         │
│   Vf = N × fz × Z                                       │
│   ─────────────────                                     │
│   Vf = Vitesse avance (mm/min)                         │
│   fz = Avance par dent (mm)                            │
│   Z = Nombre de dents                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘`
          }
        ]
      })
    },
    {
      title: "Préparation d'une pièce",
      description: "Les étapes pour préparer et monter une pièce sur la machine",
      order: 5,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Préparation d'une pièce\n\nLa préparation correcte de la pièce est essentielle pour un usinage réussi."
          },
          {
            type: "text",
            content: "## Étapes de préparation\n\n1. **Analyser le dessin technique** : Dimensions, tolérances, état de surface\n2. **Choisir le brut** : Dimensions suffisantes pour la pièce finale\n3. **Sélectionner le montage** : Étau, mandrin, bridage\n4. **Définir l'origine pièce** : Point de référence pour le programme\n5. **Préparer les outils** : Mesurer et charger dans le magasin"
          },
          {
            type: "text",
            content: "## Systèmes de bridage\n\n### Étau de précision\nIdéal pour les pièces rectangulaires. S'assurer du parallélisme avec les axes.\n\n### Mandrin 3 mors\nPour les pièces cylindriques sur tour.\n\n### Bridage direct\nBrides et vis pour pièces complexes ou grandes."
          },
          {
            type: "warning",
            content: "Un bridage insuffisant peut entraîner l'éjection de la pièce ! Toujours vérifier le serrage avant l'usinage."
          },
          {
            type: "info",
            content: "Laisser une surépaisseur de 2-3 mm sur le brut pour les opérations de finition et les imprécisions de bridage."
          }
        ]
      })
    },
    {
      title: "Origines et décalages",
      description: "Comprendre les systèmes d'origine machine et pièce",
      order: 6,
      xpReward: 75,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Origines et décalages\n\nLa gestion des origines est fondamentale pour positionner correctement l'outil par rapport à la pièce."
          },
          {
            type: "diagram",
            title: "Systèmes d'origine",
            content: `┌─────────────────────────────────────────────────────────┐
│                    TABLE MACHINE                         │
│                                                          │
│    M ──────────────────────────────────────────────► X   │
│    │                                                     │
│    │     ┌─────────────────┐                            │
│    │     │                 │                            │
│    │     │   W ───────► x  │  ← Pièce                   │
│    │     │   │             │                            │
│    │     │   ▼ y           │                            │
│    │     │   Origine pièce │                            │
│    │     └─────────────────┘                            │
│    │                                                     │
│    ▼ Y                                                   │
│                                                          │
│    M = Origine machine (fixe)                           │
│    W = Origine pièce (programmable)                     │
└─────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Types d'origines\n\n| Origine | Code | Description |\n|---------|------|-------------|\n| Machine | G53 | Point de référence fixe de la machine |\n| Pièce | G54-G59 | Décalages programmables (jusqu'à 6) |\n| Locale | G52 | Décalage temporaire additionnel |"
          },
          {
            type: "text",
            content: "## Prise d'origine pièce\n\n### Avec palpeur\nLa méthode la plus précise. Le palpeur touche la pièce et enregistre la position.\n\n### Manuel (papier)\nGlisser une feuille de papier entre l'outil et la pièce. Moins précis mais rapide.\n\n### Comparateur\nPour l'alignement de pièces existantes."
          },
          {
            type: "info",
            content: "Les décalages d'origine sont stockés dans une table de la machine et persistent après l'arrêt."
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Qu'est-ce qu'une machine CNC ?": {
        title: "What is a CNC Machine?",
        description: "Discover the basics of Computer Numerical Control machines",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# CNC Machines\n\nA **CNC machine** (Computer Numerical Control) is a manufacturing tool controlled by a computer program. It automates the machining of parts with high precision."
            },
            {
              type: "info",
              content: "The first CNC machines appeared in the 1950s, revolutionizing the manufacturing industry."
            },
            {
              type: "text",
              content: "## How does it work?\n\nThe CNC machine follows instructions written in **G-code**, a standardized programming language. These instructions control:\n\n- Tool movements along different axes\n- Spindle rotation speed\n- Feed rate\n- Tool changes"
            },
            {
              type: "text",
              content: "## Advantages of CNC\n\n- **Precision**: Tolerances of a few hundredths of a millimeter\n- **Repeatability**: Identical parts every time\n- **Productivity**: Continuous operation 24/7\n- **Complexity**: Possible machining of complex shapes"
            }
          ]
        })
      },
      "Types de machines CNC": {
        title: "Types of CNC Machines",
        description: "Discover the different types of CNC machines and their applications",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Types of CNC Machines\n\nThere are many types of CNC machines, each designed for specific applications."
            },
            {
              type: "text",
              content: "## CNC Milling Machine\n\nThe milling machine uses a rotating tool that removes material. It can:\n- Machine flat surfaces\n- Create grooves and pockets\n- Drill holes\n- Make complex 3D shapes"
            },
            {
              type: "text",
              content: "## CNC Lathe\n\nThe lathe rotates the part while the tool removes material. Ideal for:\n- Cylindrical parts\n- Threads\n- Cones and spheres\n- Interior and exterior machining"
            },
            {
              type: "text",
              content: "## Other Types\n\n| Machine | Application |\n|---------|-------------|\n| Laser cutter | Precision cutting of sheets |\n| Plasma cutter | Cutting thick metal |\n| EDM | Hard material machining |\n| 3D printer | Additive manufacturing |"
            }
          ]
        })
      },
      "Sécurité sur machines CNC": {
        title: "CNC Machine Safety",
        description: "Essential safety rules in CNC environments"
      },
      "Matériaux et outils de coupe": {
        title: "Materials and Cutting Tools",
        description: "Understanding machinable materials and appropriate tools"
      },
      "Préparation d'une pièce": {
        title: "Part Preparation",
        description: "Steps to prepare and mount a part on the machine"
      },
      "Origines et décalages": {
        title: "Origins and Offsets",
        description: "Understanding machine and work origin systems"
      }
    },
    es: {
      "Qu'est-ce qu'une machine CNC ?": {
        title: "¿Qué es una máquina CNC?",
        description: "Descubra los fundamentos de las máquinas de Control Numérico Computarizado",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Máquinas CNC\n\nUna **máquina CNC** (Control Numérico Computarizado) es una herramienta de fabricación controlada por un programa de computadora. Automatiza el mecanizado de piezas con alta precisión."
            },
            {
              type: "info",
              content: "Las primeras máquinas CNC aparecieron en la década de 1950, revolucionando la industria manufacturera."
            },
            {
              type: "text",
              content: "## ¿Cómo funciona?\n\nLa máquina CNC sigue instrucciones escritas en **código G**, un lenguaje de programación estandarizado. Estas instrucciones controlan:\n\n- Movimientos de la herramienta en diferentes ejes\n- Velocidad de rotación del husillo\n- Velocidad de avance\n- Cambios de herramienta"
            },
            {
              type: "text",
              content: "## Ventajas del CNC\n\n- **Precisión**: Tolerancias de unas centésimas de milímetro\n- **Repetibilidad**: Piezas idénticas cada vez\n- **Productividad**: Funcionamiento continuo 24/7\n- **Complejidad**: Mecanizado posible de formas complejas"
            }
          ]
        })
      },
      "Types de machines CNC": {
        title: "Tipos de máquinas CNC",
        description: "Descubra los diferentes tipos de máquinas CNC y sus aplicaciones",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Tipos de máquinas CNC\n\nExisten muchos tipos de máquinas CNC, cada una diseñada para aplicaciones específicas."
            },
            {
              type: "text",
              content: "## Fresadora CNC\n\nLa fresadora utiliza una herramienta giratoria que elimina material. Puede:\n- Mecanizar superficies planas\n- Crear ranuras y cavidades\n- Taladrar agujeros\n- Hacer formas 3D complejas"
            },
            {
              type: "text",
              content: "## Torno CNC\n\nEl torno hace girar la pieza mientras la herramienta elimina material. Ideal para:\n- Piezas cilíndricas\n- Roscas\n- Conos y esferas\n- Mecanizado interior y exterior"
            },
            {
              type: "text",
              content: "## Otros tipos\n\n| Máquina | Aplicación |\n|---------|-------------|\n| Corte láser | Corte de precisión de chapas |\n| Corte plasma | Corte de metal grueso |\n| Electroerosión | Mecanizado de material duro |\n| Impresora 3D | Fabricación aditiva |"
            }
          ]
        })
      },
      "Sécurité sur machines CNC": {
        title: "Seguridad en máquinas CNC",
        description: "Reglas esenciales de seguridad en entornos CNC"
      },
      "Matériaux et outils de coupe": {
        title: "Materiales y herramientas de corte",
        description: "Comprender los materiales mecanizables y las herramientas adecuadas"
      },
      "Préparation d'une pièce": {
        title: "Preparación de una pieza",
        description: "Pasos para preparar y montar una pieza en la máquina"
      },
      "Origines et décalages": {
        title: "Orígenes y desfases",
        description: "Comprender los sistemas de origen de máquina y pieza"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Qu'est-ce qu'une machine CNC ? (5 questions)
    [
      {
        question: "Que signifie CNC ?",
        options: [
          "Commande Numérique par Calculateur",
          "Centrale Numérique de Commande",
          "Contrôle Numérique de Coupe",
          "Centre Numérique de Calcul"
        ],
        correctIndex: 0,
        explanation: "CNC signifie Commande Numérique par Calculateur (Computer Numerical Control en anglais).",
        order: 1
      },
      {
        question: "Quel est l'avantage principal d'une machine CNC ?",
        options: [
          "Elle est moins chère",
          "Haute précision et répétabilité",
          "Elle n'a pas besoin d'électricité",
          "Elle est plus petite"
        ],
        correctIndex: 1,
        explanation: "Les machines CNC offrent une haute précision (centièmes de millimètre) et peuvent produire des pièces identiques à chaque fois.",
        order: 2
      },
      {
        question: "Quand sont apparues les premières machines CNC ?",
        options: [
          "Dans les années 1930",
          "Dans les années 1950",
          "Dans les années 1970",
          "Dans les années 1990"
        ],
        correctIndex: 1,
        explanation: "Les premières machines CNC sont apparues dans les années 1950, révolutionnant l'industrie manufacturière.",
        order: 3
      },
      {
        question: "Quel langage de programmation utilisent les machines CNC ?",
        options: [
          "Python",
          "G-Code",
          "JavaScript",
          "C++"
        ],
        correctIndex: 1,
        explanation: "Les machines CNC utilisent le G-Code, un langage de programmation standardisé pour contrôler les mouvements.",
        order: 4
      },
      {
        question: "Quelle est la précision typique d'une machine CNC ?",
        options: [
          "Quelques millimètres",
          "Quelques centièmes de millimètre",
          "Quelques centimètres",
          "Environ 1 mètre"
        ],
        correctIndex: 1,
        explanation: "Les machines CNC atteignent des tolérances de quelques centièmes de millimètre (0.01 mm).",
        order: 5
      }
    ],
    // Lesson 2: Types de machines CNC (5 questions)
    [
      {
        question: "Quelle machine est idéale pour les pièces cylindriques ?",
        options: [
          "La fraiseuse",
          "Le tour CNC",
          "La découpeuse laser",
          "L'imprimante 3D"
        ],
        correctIndex: 1,
        explanation: "Le tour fait tourner la pièce et est idéal pour usiner des formes cylindriques.",
        order: 1
      },
      {
        question: "Qu'est-ce qui caractérise une fraiseuse CNC ?",
        options: [
          "La pièce tourne",
          "L'outil rotatif enlève la matière",
          "Elle utilise un laser",
          "Elle ajoute de la matière"
        ],
        correctIndex: 1,
        explanation: "Sur une fraiseuse, c'est l'outil qui tourne et se déplace pour enlever la matière de la pièce fixe.",
        order: 2
      },
      {
        question: "Quelle technologie utilise la découpe plasma ?",
        options: [
          "Un jet d'eau à haute pression",
          "Un arc électrique à haute température",
          "Un faisceau laser",
          "Un outil mécanique"
        ],
        correctIndex: 1,
        explanation: "La découpe plasma utilise un arc électrique qui ionise le gaz pour créer un jet très chaud capable de couper le métal.",
        order: 3
      },
      {
        question: "Qu'est-ce que l'électroérosion ?",
        options: [
          "Usinage par jet d'eau",
          "Usinage par décharges électriques",
          "Usinage par laser",
          "Usinage par abrasion"
        ],
        correctIndex: 1,
        explanation: "L'électroérosion utilise des décharges électriques pour éroder le matériau, idéal pour les matériaux très durs.",
        order: 4
      },
      {
        question: "Qu'est-ce que la fabrication additive ?",
        options: [
          "Enlèvement de matière",
          "Ajout de matière couche par couche (impression 3D)",
          "Découpe par laser",
          "Usinage par électroérosion"
        ],
        correctIndex: 1,
        explanation: "La fabrication additive (impression 3D) construit des pièces en ajoutant de la matière couche par couche.",
        order: 5
      }
    ],
    // Lesson 3: Sécurité sur machines CNC (5 questions)
    [
      {
        question: "Quel est le premier EPI obligatoire en zone CNC ?",
        options: [
          "Un casque de chantier",
          "Des lunettes de sécurité",
          "Un gilet réfléchissant",
          "Des gants isolants"
        ],
        correctIndex: 1,
        explanation: "Les lunettes de sécurité protègent contre les projections de copeaux qui sont très fréquentes.",
        order: 1
      },
      {
        question: "Pourquoi doit-on porter des vêtements ajustés ?",
        options: [
          "Pour le confort",
          "Pour éviter qu'ils se prennent dans les pièces en rotation",
          "Pour l'esthétique",
          "Pour la température"
        ],
        correctIndex: 1,
        explanation: "Les vêtements amples peuvent se prendre dans les pièces en rotation et causer des accidents graves.",
        order: 2
      },
      {
        question: "Qu'est-ce qu'un essai à vide (dry run) ?",
        options: [
          "Un test sans électricité",
          "Un test du programme sans usiner de pièce",
          "Un test de la broche seule",
          "Un test de l'arrosage"
        ],
        correctIndex: 1,
        explanation: "L'essai à vide permet de vérifier le programme en faisant tourner la machine sans pièce pour détecter les erreurs.",
        order: 3
      },
      {
        question: "Comment doit-on retirer les copeaux ?",
        options: [
          "À la main directement",
          "Avec un crochet ou une pince",
          "En soufflant dessus",
          "On ne les retire jamais"
        ],
        correctIndex: 1,
        explanation: "Les copeaux peuvent être très chauds et coupants. On utilise un crochet ou une pince pour les retirer en sécurité.",
        order: 4
      },
      {
        question: "Quand peut-on intervenir sur la zone de travail ?",
        options: [
          "À tout moment",
          "Uniquement machine à l'arrêt complet",
          "Pendant les mouvements lents",
          "Quand la broche est arrêtée"
        ],
        correctIndex: 1,
        explanation: "On n'intervient jamais sur une machine en fonctionnement. Il faut attendre l'arrêt complet.",
        order: 5
      }
    ],
    // Lesson 4: Matériaux et outils de coupe (5 questions)
    [
      {
        question: "Quel matériau est le plus facile à usiner ?",
        options: [
          "Titane",
          "Aluminium",
          "Acier inoxydable",
          "Composites"
        ],
        correctIndex: 1,
        explanation: "L'aluminium est facile à usiner et permet des vitesses de coupe élevées.",
        order: 1
      },
      {
        question: "Quel outil utilise-t-on pour le perçage ?",
        options: [
          "Fraise en bout",
          "Foret",
          "Taraud",
          "Alésoir"
        ],
        correctIndex: 1,
        explanation: "Le foret est l'outil spécifique pour le perçage de trous.",
        order: 2
      },
      {
        question: "Que représente Vc dans les paramètres de coupe ?",
        options: [
          "Volume de coupe",
          "Vitesse de coupe",
          "Viscosité du lubrifiant",
          "Valeur critique"
        ],
        correctIndex: 1,
        explanation: "Vc représente la vitesse de coupe, exprimée en m/min.",
        order: 3
      },
      {
        question: "Quel outil utilise-t-on pour le contournage 3D ?",
        options: [
          "Fraise en bout plate",
          "Fraise boule",
          "Foret",
          "Taraud"
        ],
        correctIndex: 1,
        explanation: "La fraise boule (hémisphérique) est idéale pour le contournage de surfaces 3D.",
        order: 4
      },
      {
        question: "Pourquoi faut-il faire attention avec les plastiques ?",
        options: [
          "Ils sont trop durs",
          "Ils peuvent fondre avec la chaleur",
          "Ils sont conducteurs",
          "Ils sont magnétiques"
        ],
        correctIndex: 1,
        explanation: "Les plastiques peuvent fondre si la chaleur générée par l'usinage est trop importante.",
        order: 5
      }
    ],
    // Lesson 5: Préparation d'une pièce (5 questions)
    [
      {
        question: "Quelle est la première étape de préparation ?",
        options: [
          "Monter la pièce",
          "Analyser le dessin technique",
          "Démarrer la machine",
          "Choisir l'outil"
        ],
        correctIndex: 1,
        explanation: "On commence toujours par analyser le dessin technique pour comprendre les dimensions et tolérances requises.",
        order: 1
      },
      {
        question: "Quel système de bridage utilise-t-on pour les pièces cylindriques ?",
        options: [
          "Étau de précision",
          "Mandrin 3 mors",
          "Bridage direct",
          "Plateau magnétique"
        ],
        correctIndex: 1,
        explanation: "Le mandrin 3 mors est idéal pour serrer les pièces cylindriques de manière concentrique.",
        order: 2
      },
      {
        question: "Pourquoi laisse-t-on une surépaisseur sur le brut ?",
        options: [
          "Pour économiser de la matière",
          "Pour les opérations de finition et les imprécisions",
          "Pour la décoration",
          "Ce n'est pas nécessaire"
        ],
        correctIndex: 1,
        explanation: "La surépaisseur (2-3 mm) compense les imprécisions de bridage et permet les passes de finition.",
        order: 3
      },
      {
        question: "Que risque-t-on avec un bridage insuffisant ?",
        options: [
          "Usure de l'outil",
          "Éjection de la pièce",
          "Surchauffe du moteur",
          "Erreur de programme"
        ],
        correctIndex: 1,
        explanation: "Un bridage insuffisant peut entraîner l'éjection de la pièce pendant l'usinage, très dangereux.",
        order: 4
      },
      {
        question: "Qu'est-ce que l'origine pièce ?",
        options: [
          "Le pays de fabrication",
          "Le point de référence pour le programme",
          "La marque de la machine",
          "Le type de matériau"
        ],
        correctIndex: 1,
        explanation: "L'origine pièce est le point de référence (X0, Y0, Z0) utilisé par le programme pour tous les déplacements.",
        order: 5
      }
    ],
    // Lesson 6: Origines et décalages (5 questions)
    [
      {
        question: "Que représente G54 en G-Code ?",
        options: [
          "Une vitesse de broche",
          "Un décalage d'origine pièce",
          "Un cycle de perçage",
          "Une avance rapide"
        ],
        correctIndex: 1,
        explanation: "G54 à G59 sont des décalages d'origine pièce programmables (Work Offsets).",
        order: 1
      },
      {
        question: "Quelle est la méthode la plus précise pour prendre l'origine pièce ?",
        options: [
          "À l'oeil",
          "Avec un palpeur",
          "Avec une feuille de papier",
          "Au hasard"
        ],
        correctIndex: 1,
        explanation: "Le palpeur électronique est la méthode la plus précise pour définir l'origine pièce.",
        order: 2
      },
      {
        question: "Que représente G53 ?",
        options: [
          "L'origine pièce",
          "L'origine machine (fixe)",
          "Un cycle de taraudage",
          "Une compensation d'outil"
        ],
        correctIndex: 1,
        explanation: "G53 permet de se référer à l'origine machine, un point fixe défini par la machine.",
        order: 3
      },
      {
        question: "Combien de décalages d'origine peut-on généralement programmer ?",
        options: [
          "1 seul",
          "Jusqu'à 6 (G54-G59)",
          "Illimité",
          "2 maximum"
        ],
        correctIndex: 1,
        explanation: "Les contrôleurs standard offrent 6 décalages (G54 à G59), certains en proposent plus.",
        order: 4
      },
      {
        question: "Les décalages d'origine sont-ils conservés après l'arrêt de la machine ?",
        options: [
          "Non, jamais",
          "Oui, ils persistent dans une table",
          "Seulement G54",
          "Seulement en mode automatique"
        ],
        correctIndex: 1,
        explanation: "Les décalages sont stockés dans une table de la machine et persistent après l'arrêt.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1
      "Que signifie CNC ?": {
        question: "What does CNC stand for?",
        options: ["Computer Numerical Control", "Central Numeric Computer", "Controlled Numeric Cutting", "Computer Network Control"],
        explanation: "CNC stands for Computer Numerical Control."
      },
      "Quel est l'avantage principal d'une machine CNC ?": {
        question: "What is the main advantage of a CNC machine?",
        options: ["It's cheaper", "High precision and repeatability", "It doesn't need electricity", "It's smaller"],
        explanation: "CNC machines offer high precision (hundredths of a millimeter) and can produce identical parts repeatedly."
      },
      "Quand sont apparues les premières machines CNC ?": {
        question: "When did the first CNC machines appear?",
        options: ["In the 1930s", "In the 1950s", "In the 1970s", "In the 1990s"],
        explanation: "The first CNC machines appeared in the 1950s, revolutionizing the manufacturing industry."
      },
      "Quel langage de programmation utilisent les machines CNC ?": {
        question: "What programming language do CNC machines use?",
        options: ["Python", "G-Code", "JavaScript", "C++"],
        explanation: "CNC machines use G-Code, a standardized programming language to control movements."
      },
      "Quelle est la précision typique d'une machine CNC ?": {
        question: "What is the typical precision of a CNC machine?",
        options: ["A few millimeters", "A few hundredths of a millimeter", "A few centimeters", "About 1 meter"],
        explanation: "CNC machines achieve tolerances of a few hundredths of a millimeter (0.01 mm)."
      },
      // Lesson 2
      "Quelle machine est idéale pour les pièces cylindriques ?": {
        question: "Which machine is ideal for cylindrical parts?",
        options: ["Milling machine", "CNC Lathe", "Laser cutter", "3D printer"],
        explanation: "The lathe rotates the part and is ideal for machining cylindrical shapes."
      },
      "Qu'est-ce qui caractérise une fraiseuse CNC ?": {
        question: "What characterizes a CNC milling machine?",
        options: ["The part rotates", "The rotating tool removes material", "It uses a laser", "It adds material"],
        explanation: "On a milling machine, the tool rotates and moves to remove material from the fixed part."
      },
      "Quelle technologie utilise la découpe plasma ?": {
        question: "What technology does plasma cutting use?",
        options: ["A high-pressure water jet", "A high-temperature electric arc", "A laser beam", "A mechanical tool"],
        explanation: "Plasma cutting uses an electric arc that ionizes gas to create a very hot jet capable of cutting metal."
      },
      "Qu'est-ce que l'électroérosion ?": {
        question: "What is EDM (Electrical Discharge Machining)?",
        options: ["Water jet machining", "Machining by electrical discharges", "Laser machining", "Abrasive machining"],
        explanation: "EDM uses electrical discharges to erode material, ideal for very hard materials."
      },
      "Qu'est-ce que la fabrication additive ?": {
        question: "What is additive manufacturing?",
        options: ["Material removal", "Adding material layer by layer (3D printing)", "Laser cutting", "EDM machining"],
        explanation: "Additive manufacturing (3D printing) builds parts by adding material layer by layer."
      },
      // Lesson 3
      "Quel est le premier EPI obligatoire en zone CNC ?": {
        question: "What is the first mandatory PPE in CNC areas?",
        options: ["A hard hat", "Safety glasses", "A reflective vest", "Insulating gloves"],
        explanation: "Safety glasses protect against chip projections which are very common."
      },
      "Pourquoi doit-on porter des vêtements ajustés ?": {
        question: "Why should you wear fitted clothing?",
        options: ["For comfort", "To prevent them from getting caught in rotating parts", "For aesthetics", "For temperature"],
        explanation: "Loose clothing can get caught in rotating parts and cause serious accidents."
      },
      "Qu'est-ce qu'un essai à vide (dry run) ?": {
        question: "What is a dry run?",
        options: ["A test without electricity", "A program test without machining a part", "A spindle-only test", "A coolant test"],
        explanation: "A dry run verifies the program by running the machine without a part to detect errors."
      },
      "Comment doit-on retirer les copeaux ?": {
        question: "How should you remove chips?",
        options: ["By hand directly", "With a hook or pliers", "By blowing on them", "Never remove them"],
        explanation: "Chips can be very hot and sharp. Use a hook or pliers to remove them safely."
      },
      "Quand peut-on intervenir sur la zone de travail ?": {
        question: "When can you access the work area?",
        options: ["At any time", "Only when the machine is completely stopped", "During slow movements", "When the spindle is stopped"],
        explanation: "Never intervene on a running machine. Wait for complete stop."
      },
      // Lesson 4
      "Quel matériau est le plus facile à usiner ?": {
        question: "Which material is easiest to machine?",
        options: ["Titanium", "Aluminum", "Stainless steel", "Composites"],
        explanation: "Aluminum is easy to machine and allows high cutting speeds."
      },
      "Quel outil utilise-t-on pour le perçage ?": {
        question: "What tool is used for drilling?",
        options: ["End mill", "Drill bit", "Tap", "Reamer"],
        explanation: "The drill bit is the specific tool for drilling holes."
      },
      "Que représente Vc dans les paramètres de coupe ?": {
        question: "What does Vc represent in cutting parameters?",
        options: ["Cutting volume", "Cutting speed", "Lubricant viscosity", "Critical value"],
        explanation: "Vc represents the cutting speed, expressed in m/min."
      },
      "Quel outil utilise-t-on pour le contournage 3D ?": {
        question: "What tool is used for 3D contouring?",
        options: ["Flat end mill", "Ball nose end mill", "Drill bit", "Tap"],
        explanation: "The ball nose (hemispherical) end mill is ideal for 3D surface contouring."
      },
      "Pourquoi faut-il faire attention avec les plastiques ?": {
        question: "Why should you be careful with plastics?",
        options: ["They are too hard", "They can melt from heat", "They are conductive", "They are magnetic"],
        explanation: "Plastics can melt if the heat generated by machining is too high."
      },
      // Lesson 5
      "Quelle est la première étape de préparation ?": {
        question: "What is the first preparation step?",
        options: ["Mount the part", "Analyze the technical drawing", "Start the machine", "Choose the tool"],
        explanation: "Always start by analyzing the technical drawing to understand required dimensions and tolerances."
      },
      "Quel système de bridage utilise-t-on pour les pièces cylindriques ?": {
        question: "What clamping system is used for cylindrical parts?",
        options: ["Precision vise", "3-jaw chuck", "Direct clamping", "Magnetic plate"],
        explanation: "The 3-jaw chuck is ideal for clamping cylindrical parts concentrically."
      },
      "Pourquoi laisse-t-on une surépaisseur sur le brut ?": {
        question: "Why do we leave extra material on the blank?",
        options: ["To save material", "For finishing operations and inaccuracies", "For decoration", "It's not necessary"],
        explanation: "The extra material (2-3 mm) compensates for clamping inaccuracies and allows for finishing passes."
      },
      "Que risque-t-on avec un bridage insuffisant ?": {
        question: "What risk is there with insufficient clamping?",
        options: ["Tool wear", "Part ejection", "Motor overheating", "Program error"],
        explanation: "Insufficient clamping can cause the part to be ejected during machining, very dangerous."
      },
      "Qu'est-ce que l'origine pièce ?": {
        question: "What is the work origin?",
        options: ["Country of manufacture", "The reference point for the program", "Machine brand", "Material type"],
        explanation: "The work origin is the reference point (X0, Y0, Z0) used by the program for all movements."
      },
      // Lesson 6
      "Que représente G54 en G-Code ?": {
        question: "What does G54 represent in G-Code?",
        options: ["A spindle speed", "A work offset", "A drilling cycle", "A rapid move"],
        explanation: "G54 to G59 are programmable work offsets."
      },
      "Quelle est la méthode la plus précise pour prendre l'origine pièce ?": {
        question: "What is the most accurate method to set the work origin?",
        options: ["By eye", "With a probe", "With a sheet of paper", "At random"],
        explanation: "The electronic probe is the most accurate method to define the work origin."
      },
      "Que représente G53 ?": {
        question: "What does G53 represent?",
        options: ["Work origin", "Machine origin (fixed)", "Tapping cycle", "Tool compensation"],
        explanation: "G53 allows referencing the machine origin, a fixed point defined by the machine."
      },
      "Combien de décalages d'origine peut-on généralement programmer ?": {
        question: "How many work offsets can typically be programmed?",
        options: ["Only 1", "Up to 6 (G54-G59)", "Unlimited", "2 maximum"],
        explanation: "Standard controllers offer 6 offsets (G54 to G59), some offer more."
      },
      "Les décalages d'origine sont-ils conservés après l'arrêt de la machine ?": {
        question: "Are work offsets retained after the machine is turned off?",
        options: ["No, never", "Yes, they persist in a table", "Only G54", "Only in automatic mode"],
        explanation: "Offsets are stored in a machine table and persist after shutdown."
      }
    },
    es: {
      // Lesson 1
      "Que signifie CNC ?": {
        question: "¿Qué significa CNC?",
        options: ["Control Numérico Computarizado", "Computadora Numérica Central", "Corte Numérico Controlado", "Control de Red de Computadoras"],
        explanation: "CNC significa Control Numérico Computarizado."
      },
      "Quel est l'avantage principal d'une machine CNC ?": {
        question: "¿Cuál es la principal ventaja de una máquina CNC?",
        options: ["Es más barata", "Alta precisión y repetibilidad", "No necesita electricidad", "Es más pequeña"],
        explanation: "Las máquinas CNC ofrecen alta precisión (centésimas de milímetro) y pueden producir piezas idénticas repetidamente."
      },
      "Quand sont apparues les premières machines CNC ?": {
        question: "¿Cuándo aparecieron las primeras máquinas CNC?",
        options: ["En los años 1930", "En los años 1950", "En los años 1970", "En los años 1990"],
        explanation: "Las primeras máquinas CNC aparecieron en los años 1950, revolucionando la industria manufacturera."
      },
      "Quel langage de programmation utilisent les machines CNC ?": {
        question: "¿Qué lenguaje de programación usan las máquinas CNC?",
        options: ["Python", "Código G", "JavaScript", "C++"],
        explanation: "Las máquinas CNC usan código G, un lenguaje de programación estandarizado para controlar movimientos."
      },
      "Quelle est la précision typique d'une machine CNC ?": {
        question: "¿Cuál es la precisión típica de una máquina CNC?",
        options: ["Algunos milímetros", "Algunas centésimas de milímetro", "Algunos centímetros", "Aproximadamente 1 metro"],
        explanation: "Las máquinas CNC alcanzan tolerancias de algunas centésimas de milímetro (0.01 mm)."
      },
      // Lesson 2
      "Quelle machine est idéale pour les pièces cylindriques ?": {
        question: "¿Qué máquina es ideal para piezas cilíndricas?",
        options: ["Fresadora", "Torno CNC", "Cortadora láser", "Impresora 3D"],
        explanation: "El torno hace girar la pieza y es ideal para mecanizar formas cilíndricas."
      },
      "Qu'est-ce qui caractérise une fraiseuse CNC ?": {
        question: "¿Qué caracteriza a una fresadora CNC?",
        options: ["La pieza gira", "La herramienta giratoria elimina material", "Usa un láser", "Añade material"],
        explanation: "En una fresadora, la herramienta gira y se mueve para eliminar material de la pieza fija."
      },
      "Quelle technologie utilise la découpe plasma ?": {
        question: "¿Qué tecnología usa el corte por plasma?",
        options: ["Un chorro de agua a alta presión", "Un arco eléctrico a alta temperatura", "Un rayo láser", "Una herramienta mecánica"],
        explanation: "El corte por plasma usa un arco eléctrico que ioniza el gas para crear un chorro muy caliente capaz de cortar metal."
      },
      "Qu'est-ce que l'électroérosion ?": {
        question: "¿Qué es la electroerosión?",
        options: ["Mecanizado por chorro de agua", "Mecanizado por descargas eléctricas", "Mecanizado por láser", "Mecanizado por abrasión"],
        explanation: "La electroerosión usa descargas eléctricas para erosionar el material, ideal para materiales muy duros."
      },
      "Qu'est-ce que la fabrication additive ?": {
        question: "¿Qué es la fabricación aditiva?",
        options: ["Eliminación de material", "Adición de material capa por capa (impresión 3D)", "Corte por láser", "Mecanizado por electroerosión"],
        explanation: "La fabricación aditiva (impresión 3D) construye piezas añadiendo material capa por capa."
      },
      // Lesson 3
      "Quel est le premier EPI obligatoire en zone CNC ?": {
        question: "¿Cuál es el primer EPI obligatorio en zona CNC?",
        options: ["Un casco de obra", "Gafas de seguridad", "Un chaleco reflectante", "Guantes aislantes"],
        explanation: "Las gafas de seguridad protegen contra las proyecciones de virutas que son muy frecuentes."
      },
      "Pourquoi doit-on porter des vêtements ajustés ?": {
        question: "¿Por qué se debe usar ropa ajustada?",
        options: ["Por comodidad", "Para evitar que se enganchen en piezas giratorias", "Por estética", "Por temperatura"],
        explanation: "La ropa holgada puede engancharse en piezas giratorias y causar accidentes graves."
      },
      "Qu'est-ce qu'un essai à vide (dry run) ?": {
        question: "¿Qué es una prueba en vacío (dry run)?",
        options: ["Una prueba sin electricidad", "Una prueba del programa sin mecanizar pieza", "Una prueba solo del husillo", "Una prueba del refrigerante"],
        explanation: "La prueba en vacío verifica el programa haciendo funcionar la máquina sin pieza para detectar errores."
      },
      "Comment doit-on retirer les copeaux ?": {
        question: "¿Cómo se deben retirar las virutas?",
        options: ["Con la mano directamente", "Con un gancho o pinzas", "Soplando sobre ellas", "Nunca se retiran"],
        explanation: "Las virutas pueden estar muy calientes y afiladas. Se usa un gancho o pinzas para retirarlas de forma segura."
      },
      "Quand peut-on intervenir sur la zone de travail ?": {
        question: "¿Cuándo se puede acceder a la zona de trabajo?",
        options: ["En cualquier momento", "Solo con la máquina completamente parada", "Durante movimientos lentos", "Cuando el husillo está parado"],
        explanation: "Nunca se interviene en una máquina en funcionamiento. Hay que esperar la parada completa."
      },
      // Lesson 4
      "Quel matériau est le plus facile à usiner ?": {
        question: "¿Qué material es más fácil de mecanizar?",
        options: ["Titanio", "Aluminio", "Acero inoxidable", "Composites"],
        explanation: "El aluminio es fácil de mecanizar y permite velocidades de corte elevadas."
      },
      "Quel outil utilise-t-on pour le perçage ?": {
        question: "¿Qué herramienta se usa para taladrar?",
        options: ["Fresa de extremo", "Broca", "Macho de roscar", "Escariador"],
        explanation: "La broca es la herramienta específica para taladrar agujeros."
      },
      "Que représente Vc dans les paramètres de coupe ?": {
        question: "¿Qué representa Vc en los parámetros de corte?",
        options: ["Volumen de corte", "Velocidad de corte", "Viscosidad del lubricante", "Valor crítico"],
        explanation: "Vc representa la velocidad de corte, expresada en m/min."
      },
      "Quel outil utilise-t-on pour le contournage 3D ?": {
        question: "¿Qué herramienta se usa para el contorneado 3D?",
        options: ["Fresa plana de extremo", "Fresa de bola", "Broca", "Macho de roscar"],
        explanation: "La fresa de bola (hemisférica) es ideal para el contorneado de superficies 3D."
      },
      "Pourquoi faut-il faire attention avec les plastiques ?": {
        question: "¿Por qué hay que tener cuidado con los plásticos?",
        options: ["Son demasiado duros", "Pueden fundirse con el calor", "Son conductores", "Son magnéticos"],
        explanation: "Los plásticos pueden fundirse si el calor generado por el mecanizado es demasiado alto."
      },
      // Lesson 5
      "Quelle est la première étape de préparation ?": {
        question: "¿Cuál es el primer paso de preparación?",
        options: ["Montar la pieza", "Analizar el dibujo técnico", "Arrancar la máquina", "Elegir la herramienta"],
        explanation: "Siempre se empieza analizando el dibujo técnico para entender las dimensiones y tolerancias requeridas."
      },
      "Quel système de bridage utilise-t-on pour les pièces cylindriques ?": {
        question: "¿Qué sistema de sujeción se usa para piezas cilíndricas?",
        options: ["Mordaza de precisión", "Plato de 3 garras", "Sujeción directa", "Plato magnético"],
        explanation: "El plato de 3 garras es ideal para sujetar piezas cilíndricas de forma concéntrica."
      },
      "Pourquoi laisse-t-on une surépaisseur sur le brut ?": {
        question: "¿Por qué se deja un sobreespesor en el bruto?",
        options: ["Para ahorrar material", "Para operaciones de acabado e imprecisiones", "Para decoración", "No es necesario"],
        explanation: "El sobreespesor (2-3 mm) compensa las imprecisiones de sujeción y permite las pasadas de acabado."
      },
      "Que risque-t-on avec un bridage insuffisant ?": {
        question: "¿Qué riesgo hay con una sujeción insuficiente?",
        options: ["Desgaste de herramienta", "Eyección de la pieza", "Sobrecalentamiento del motor", "Error de programa"],
        explanation: "Una sujeción insuficiente puede causar la eyección de la pieza durante el mecanizado, muy peligroso."
      },
      "Qu'est-ce que l'origine pièce ?": {
        question: "¿Qué es el origen pieza?",
        options: ["País de fabricación", "El punto de referencia para el programa", "Marca de la máquina", "Tipo de material"],
        explanation: "El origen pieza es el punto de referencia (X0, Y0, Z0) usado por el programa para todos los movimientos."
      },
      // Lesson 6
      "Que représente G54 en G-Code ?": {
        question: "¿Qué representa G54 en código G?",
        options: ["Una velocidad de husillo", "Un decalaje de origen pieza", "Un ciclo de taladrado", "Un avance rápido"],
        explanation: "G54 a G59 son decalajes de origen pieza programables."
      },
      "Quelle est la méthode la plus précise pour prendre l'origine pièce ?": {
        question: "¿Cuál es el método más preciso para tomar el origen pieza?",
        options: ["A ojo", "Con un palpador", "Con una hoja de papel", "Al azar"],
        explanation: "El palpador electrónico es el método más preciso para definir el origen pieza."
      },
      "Que représente G53 ?": {
        question: "¿Qué representa G53?",
        options: ["Origen pieza", "Origen máquina (fijo)", "Ciclo de roscado", "Compensación de herramienta"],
        explanation: "G53 permite referirse al origen máquina, un punto fijo definido por la máquina."
      },
      "Combien de décalages d'origine peut-on généralement programmer ?": {
        question: "¿Cuántos decalajes de origen se pueden programar normalmente?",
        options: ["Solo 1", "Hasta 6 (G54-G59)", "Ilimitados", "2 máximo"],
        explanation: "Los controles estándar ofrecen 6 decalajes (G54 a G59), algunos ofrecen más."
      },
      "Les décalages d'origine sont-ils conservés après l'arrêt de la machine ?": {
        question: "¿Se conservan los decalajes de origen después de apagar la máquina?",
        options: ["No, nunca", "Sí, persisten en una tabla", "Solo G54", "Solo en modo automático"],
        explanation: "Los decalajes se almacenan en una tabla de la máquina y persisten después del apagado."
      }
    }
  }
}
