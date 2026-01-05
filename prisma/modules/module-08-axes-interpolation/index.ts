import type { ModuleData } from '../types.js'

export const module08Data: ModuleData = {
  moduleOrder: 8,
  moduleTitle: "Axes et interpolation",
  moduleDescription: "Maitrisez les systemes de coordonnees et les mouvements d'outils",
  moduleTranslations: {
    en: {
      title: "Axes and Interpolation",
      description: "Master coordinate systems and tool movements"
    },
    es: {
      title: "Ejes e Interpolacion",
      description: "Domine los sistemas de coordenadas y movimientos de herramienta"
    }
  },
  lessons: [
    // Lesson 1: Systeme de coordonnees
    {
      title: "Systeme de coordonnees",
      description: "Comprenez le systeme de coordonnees utilise en CNC",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Systeme de coordonnees CNC\n\nLes machines CNC utilisent un systeme de coordonnees **cartesien** pour positionner l'outil par rapport a la piece."
          },
          {
            type: "text",
            content: "## Les trois axes principaux\n\n- **Axe X** : Deplacement horizontal (gauche/droite)\n- **Axe Y** : Deplacement horizontal (avant/arriere)\n- **Axe Z** : Deplacement vertical (haut/bas)\n\nLa direction positive de Z est generalement vers la broche."
          },
          {
            type: "text",
            content: "## Points de reference\n\n### Origine machine (M)\nPoint physique fixe sur la machine.\n\n### Origine piece (W)\nPoint de reference pour la piece, defini par le programmeur.\n\n### Position outil (T)\nPoint controle par le programme, generalement la pointe de l'outil."
          },
          {
            type: "info",
            content: "Sur les machines 5 axes, les axes de rotation A, B et C s'ajoutent aux axes lineaires X, Y, Z."
          }
        ]
      })
    },
    // Lesson 2: Interpolation lineaire et circulaire
    {
      title: "Interpolation lineaire et circulaire",
      description: "Maitrisez les deplacements d'outil G0, G1, G2, G3",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Interpolation d'outil\n\nL'interpolation est le mouvement calcule entre deux points. Le controleur CNC calcule toutes les positions intermediaires."
          },
          {
            type: "text",
            content: "## Positionnement rapide (G0)\n\n```gcode\nG0 X100 Y50 Z10\n```\n\nLa machine se deplace le plus vite possible en ligne droite. **Pas d'enlevement de matiere** pendant un G0 !"
          },
          {
            type: "text",
            content: "## Interpolation lineaire (G1)\n\n```gcode\nG1 X100 Y50 F200\n```\n\nDeplacement controle en ligne droite a la vitesse d'avance specifiee (F). Utilise pour l'usinage."
          },
          {
            type: "text",
            content: "## Interpolation circulaire\n\n```gcode\nG2 X50 Y50 I25 J0  ; Arc horaire\nG3 X50 Y50 I25 J0  ; Arc anti-horaire\n```\n\n- **G2** : Sens horaire\n- **G3** : Sens anti-horaire\n- **I, J, K** : Decalage du centre de l'arc (relatif au point de depart)"
          },
          {
            type: "warning",
            content: "Verifiez toujours la vitesse d'avance avant d'usiner. Une vitesse trop elevee peut endommager l'outil ou la piece !"
          }
        ]
      })
    },
    // Lesson 3: Mode absolu vs incremental
    {
      title: "Mode absolu vs incremental",
      description: "Comprendre les deux modes de positionnement G90 et G91",
      order: 3,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Mode absolu vs incremental\n\nLes deux modes de programmation definissent comment les coordonnees sont interpretees."
          },
          {
            type: "text",
            content: "## Mode absolu (G90)\n\nLes coordonnees sont relatives a l'origine piece.\n\n```gcode\nG90              ; Mode absolu\nG0 X0 Y0         ; Aller a l'origine\nG1 X50 Y30 F100  ; Aller a X=50, Y=30\nG1 X100 Y60      ; Aller a X=100, Y=60\n```\n\nChaque position est definie par rapport au point 0,0."
          },
          {
            type: "text",
            content: "## Mode incremental (G91)\n\nLes coordonnees sont relatives a la position actuelle.\n\n```gcode\nG91              ; Mode incremental\nG0 X0 Y0         ; Rester sur place\nG1 X50 Y30 F100  ; Avancer de 50 en X, 30 en Y\nG1 X50 Y30       ; Encore +50 en X, +30 en Y\n```\n\nChaque mouvement s'ajoute au precedent."
          },
          {
            type: "diagram",
            title: "Comparaison des modes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    ABSOLU (G90)                              │
│                                                              │
│     Y                         Y                              │
│     ▲                         ▲                              │
│  60 │        ●B               │  B = (100, 60)               │
│     │       /                 │                              │
│  30 │   ●A─                   │  A = (50, 30)                │
│     │  /                      │                              │
│   0 └──●───────────► X        │  Coordonnees absolues        │
│        0   50  100            │                              │
├─────────────────────────────────────────────────────────────┤
│                  INCREMENTAL (G91)                           │
│                                                              │
│     Y                         Y                              │
│     ▲                         ▲                              │
│  60 │        ●B               │  B = A + (50, 30)            │
│     │       ↗                 │                              │
│  30 │   ●A─  +50,+30          │  A = 0 + (50, 30)            │
│     │  ↗ +50,+30              │                              │
│   0 └──●───────────► X        │  Deplacements relatifs       │
│        0   50  100            │                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "Le mode absolu est recommande pour la plupart des programmes. Le mode incremental est utile pour les sous-programmes reutilisables."
          }
        ]
      })
    },
    // Lesson 4: Selection du plan de travail
    {
      title: "Selection du plan de travail",
      description: "Choisir le plan d'interpolation circulaire G17, G18, G19",
      order: 4,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Selection du plan de travail\n\nLe plan de travail determine quels axes sont utilises pour les interpolations circulaires."
          },
          {
            type: "text",
            content: "## Les trois plans\n\n| Code | Plan | Axes | Axe perpendiculaire |\n|------|------|------|---------------------|\n| G17 | XY | X, Y | Z (outil) |\n| G18 | XZ | X, Z | Y |\n| G19 | YZ | Y, Z | X |"
          },
          {
            type: "diagram",
            title: "Plans de travail",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    PLANS DE TRAVAIL                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    G17 (Plan XY)       G18 (Plan XZ)       G19 (Plan YZ)    │
│                                                              │
│        Z               Y                   X                 │
│        │               │                   │                 │
│        │  Y            │  Z                │  Z              │
│        │ /             │ /                 │ /               │
│        │/              │/                  │/                │
│        └────── X       └────── X           └────── Y         │
│                                                              │
│    Arc dans XY     Arc dans XZ         Arc dans YZ          │
│    Z = profondeur  Y = profondeur      X = profondeur       │
│                                                              │
│    Usinage 2.5D    Tournage            Usinage lateral      │
│    Fraiseuse       Tour CNC            Centre d'usinage     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Exemple d'arc dans differents plans\n\n```gcode\nG17              ; Plan XY (defaut fraiseuse)\nG2 X50 Y50 I25 J0  ; Arc dans le plan XY\n\nG18              ; Plan XZ\nG2 X50 Z-10 I25 K0 ; Arc dans le plan XZ\n\nG19              ; Plan YZ\nG2 Y50 Z-10 J25 K0 ; Arc dans le plan YZ\n```"
          },
          {
            type: "warning",
            content: "G17 est le plan par defaut sur les fraiseuses. Oublier de le specifier peut causer des mouvements inattendus si le programme precedent utilisait un autre plan."
          }
        ]
      })
    },
    // Lesson 5: Machines multi-axes
    {
      title: "Machines multi-axes",
      description: "Introduction aux machines 4 et 5 axes",
      order: 5,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Machines multi-axes\n\nLes machines 4 et 5 axes ajoutent des axes de rotation pour usiner des pieces complexes."
          },
          {
            type: "text",
            content: "## Axes supplementaires\n\n| Axe | Rotation autour de | Utilisation |\n|-----|-------------------|-------------|\n| A | Axe X | Rotation de la piece ou de la broche |\n| B | Axe Y | Inclinaison de la broche |\n| C | Axe Z | Rotation de la table |"
          },
          {
            type: "diagram",
            title: "Configuration 5 axes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    MACHINE 5 AXES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    Broche                                    │
│                      │                                       │
│                   ┌──┴──┐  ← Axe B (inclinaison)            │
│                   │     │                                    │
│                   │  ●  │  Outil                            │
│                   └─────┘                                    │
│                      │                                       │
│                      Z                                       │
│                      │                                       │
│            Y ◄───────┼───────► X                            │
│                      │                                       │
│              ┌───────┴───────┐                              │
│              │               │  ← Table rotative            │
│              │    Piece      │    Axe C (rotation)          │
│              │      ◎       │    Axe A (basculement)       │
│              └───────────────┘                              │
│                                                              │
│    5 axes = X + Y + Z + 2 rotations (A/B/C)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Avantages du 5 axes\n\n- **Usinage complet** : Piece finie en un seul montage\n- **Acces difficile** : Usinage de cavites profondes\n- **Qualite** : Meilleur etat de surface (outil toujours perpendiculaire)\n- **Productivite** : Reduction des operations"
          },
          {
            type: "info",
            content: "La programmation 5 axes est complexe et utilise generalement des logiciels FAO (Fabrication Assistee par Ordinateur) pour generer le G-code."
          }
        ]
      })
    },
    // Lesson 6: Vitesses et avances optimales
    {
      title: "Vitesses et avances optimales",
      description: "Calculer les parametres de coupe adaptes",
      order: 6,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Vitesses et avances optimales\n\nLe choix des parametres de coupe est crucial pour la qualite et la duree de vie des outils."
          },
          {
            type: "text",
            content: "## Formules de base\n\n### Vitesse de broche (N)\n```\nN = (Vc x 1000) / (pi x D)\n```\n- N : Vitesse en tr/min\n- Vc : Vitesse de coupe en m/min\n- D : Diametre outil en mm\n\n### Vitesse d'avance (Vf)\n```\nVf = N x fz x Z\n```\n- Vf : Avance en mm/min\n- fz : Avance par dent en mm\n- Z : Nombre de dents"
          },
          {
            type: "text",
            content: "## Tableau des vitesses de coupe\n\n| Materiau piece | Outil HSS | Outil carbure |\n|----------------|-----------|---------------|\n| Aluminium | 150-300 m/min | 300-1000 m/min |\n| Acier doux | 25-40 m/min | 80-150 m/min |\n| Acier inox | 15-25 m/min | 50-100 m/min |\n| Laiton | 100-200 m/min | 200-500 m/min |\n| Plastique | 100-500 m/min | 200-1000 m/min |"
          },
          {
            type: "text",
            content: "## Exemple de calcul\n\n**Donnees :**\n- Materiau : Aluminium (Vc = 300 m/min)\n- Fraise O10 mm, 3 dents\n- Avance par dent : 0.05 mm\n\n**Calculs :**\n```\nN = (300 x 1000) / (3.14 x 10) = 9550 tr/min\nVf = 9550 x 0.05 x 3 = 1433 mm/min\n```\n\n**Programme :**\n```gcode\nS9550 M3     ; Broche 9550 tr/min\nG1 X100 F1433 ; Avance 1433 mm/min\n```"
          },
          {
            type: "warning",
            content: "Ces valeurs sont des points de depart. Ajustez selon l'etat de la machine, la rigidite du montage et l'etat de surface souhaite."
          }
        ]
      })
    }
  ],
  lessonTranslations: {
    en: {
      "Systeme de coordonnees": {
        title: "Coordinate System",
        description: "Understand the coordinate system used in CNC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# CNC Coordinate System\n\nCNC machines use a **Cartesian** coordinate system to position the tool relative to the part."
            },
            {
              type: "text",
              content: "## The Three Main Axes\n\n- **X axis**: Horizontal movement (left/right)\n- **Y axis**: Horizontal movement (forward/backward)\n- **Z axis**: Vertical movement (up/down)\n\nThe positive direction of Z is generally toward the spindle."
            },
            {
              type: "text",
              content: "## Reference Points\n\n### Machine Origin (M)\nFixed physical point on the machine.\n\n### Work Origin (W)\nReference point for the part, defined by the programmer.\n\n### Tool Position (T)\nPoint controlled by the program, usually the tool tip."
            },
            {
              type: "info",
              content: "On 5-axis machines, rotational axes A, B, and C are added to the linear axes X, Y, Z."
            }
          ]
        })
      },
      "Interpolation lineaire et circulaire": {
        title: "Linear and Circular Interpolation",
        description: "Master G0, G1, G2, G3 tool movements",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Tool Interpolation\n\nInterpolation is the calculated movement between two points. The CNC controller calculates all intermediate positions."
            },
            {
              type: "text",
              content: "## Rapid Positioning (G0)\n\n```gcode\nG0 X100 Y50 Z10\n```\n\nThe machine moves as fast as possible in a straight line. **No material removal** during G0!"
            },
            {
              type: "text",
              content: "## Linear Interpolation (G1)\n\n```gcode\nG1 X100 Y50 F200\n```\n\nControlled movement in a straight line at the specified feed rate (F). Used for machining."
            },
            {
              type: "text",
              content: "## Circular Interpolation\n\n```gcode\nG2 X50 Y50 I25 J0  ; Clockwise arc\nG3 X50 Y50 I25 J0  ; Counter-clockwise arc\n```\n\n- **G2**: Clockwise\n- **G3**: Counter-clockwise\n- **I, J, K**: Arc center offset (relative to start point)"
            },
            {
              type: "warning",
              content: "Always verify the feed rate before machining. A rate that is too high can damage the tool or the part!"
            }
          ]
        })
      },
      "Mode absolu vs incremental": {
        title: "Absolute vs Incremental Mode",
        description: "Understand the two positioning modes G90 and G91"
      },
      "Selection du plan de travail": {
        title: "Work Plane Selection",
        description: "Choose the circular interpolation plane G17, G18, G19"
      },
      "Machines multi-axes": {
        title: "Multi-Axis Machines",
        description: "Introduction to 4 and 5 axis machines"
      },
      "Vitesses et avances optimales": {
        title: "Optimal Speeds and Feeds",
        description: "Calculate appropriate cutting parameters"
      }
    },
    es: {
      "Systeme de coordonnees": {
        title: "Sistema de coordenadas",
        description: "Comprenda el sistema de coordenadas utilizado en CNC",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Sistema de coordenadas CNC\n\nLas maquinas CNC utilizan un sistema de coordenadas **cartesiano** para posicionar la herramienta respecto a la pieza."
            },
            {
              type: "text",
              content: "## Los tres ejes principales\n\n- **Eje X**: Movimiento horizontal (izquierda/derecha)\n- **Eje Y**: Movimiento horizontal (adelante/atras)\n- **Eje Z**: Movimiento vertical (arriba/abajo)\n\nLa direccion positiva de Z generalmente es hacia el husillo."
            },
            {
              type: "text",
              content: "## Puntos de referencia\n\n### Origen maquina (M)\nPunto fisico fijo en la maquina.\n\n### Origen pieza (W)\nPunto de referencia para la pieza, definido por el programador.\n\n### Posicion herramienta (T)\nPunto controlado por el programa, generalmente la punta de la herramienta."
            },
            {
              type: "info",
              content: "En maquinas de 5 ejes, los ejes de rotacion A, B y C se anaden a los ejes lineales X, Y, Z."
            }
          ]
        })
      },
      "Interpolation lineaire et circulaire": {
        title: "Interpolacion lineal y circular",
        description: "Domine los movimientos de herramienta G0, G1, G2, G3",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Interpolacion de herramienta\n\nLa interpolacion es el movimiento calculado entre dos puntos. El controlador CNC calcula todas las posiciones intermedias."
            },
            {
              type: "text",
              content: "## Posicionamiento rapido (G0)\n\n```gcode\nG0 X100 Y50 Z10\n```\n\nLa maquina se mueve lo mas rapido posible en linea recta. **Sin arranque de material** durante G0!"
            },
            {
              type: "text",
              content: "## Interpolacion lineal (G1)\n\n```gcode\nG1 X100 Y50 F200\n```\n\nMovimiento controlado en linea recta a la velocidad de avance especificada (F). Utilizado para mecanizado."
            },
            {
              type: "text",
              content: "## Interpolacion circular\n\n```gcode\nG2 X50 Y50 I25 J0  ; Arco horario\nG3 X50 Y50 I25 J0  ; Arco antihorario\n```\n\n- **G2**: Sentido horario\n- **G3**: Sentido antihorario\n- **I, J, K**: Desplazamiento del centro del arco (relativo al punto inicial)"
            },
            {
              type: "warning",
              content: "Siempre verifique la velocidad de avance antes de mecanizar. Una velocidad demasiado alta puede danar la herramienta o la pieza!"
            }
          ]
        })
      },
      "Mode absolu vs incremental": {
        title: "Modo absoluto vs incremental",
        description: "Comprenda los dos modos de posicionamiento G90 y G91"
      },
      "Selection du plan de travail": {
        title: "Seleccion del plano de trabajo",
        description: "Elija el plano de interpolacion circular G17, G18, G19"
      },
      "Machines multi-axes": {
        title: "Maquinas multi-ejes",
        description: "Introduccion a las maquinas de 4 y 5 ejes"
      },
      "Vitesses et avances optimales": {
        title: "Velocidades y avances optimos",
        description: "Calcule los parametros de corte adecuados"
      }
    }
  },
  quizzes: [
    // Lesson 1 quizzes (Systeme de coordonnees) - 5 questions
    [
      {
        question: "Quel est l'axe vertical sur une fraiseuse CNC ?",
        options: ["Axe X", "Axe Y", "Axe Z", "Axe A"],
        correctIndex: 2,
        explanation: "L'axe Z est l'axe vertical (mouvement haut/bas).",
        order: 1
      },
      {
        question: "Qu'est-ce que l'origine piece (W) ?",
        options: [
          "Un point fixe sur la machine",
          "Le point de reference defini par le programmeur sur la piece",
          "La position de l'outil",
          "Le centre de la broche"
        ],
        correctIndex: 1,
        explanation: "L'origine piece (Work) est le point de reference choisi par le programmeur pour positionner la piece.",
        order: 2
      },
      {
        question: "Sur une machine 5 axes, quels sont les axes de rotation ?",
        options: [
          "X, Y, Z",
          "A, B, C",
          "1, 2, 3",
          "U, V, W"
        ],
        correctIndex: 1,
        explanation: "Les axes A, B, C sont les axes de rotation autour de X, Y, Z respectivement.",
        order: 3
      },
      {
        question: "Qu'est-ce que l'origine machine (M) ?",
        options: [
          "Le point de reference de la piece",
          "Un point physique fixe sur la machine",
          "La position actuelle de l'outil",
          "Le centre du plateau"
        ],
        correctIndex: 1,
        explanation: "L'origine machine est un point physique fixe, generalement defini par les fins de course de la machine.",
        order: 4
      },
      {
        question: "Dans quel plan s'effectue generalement le fraisage de face ?",
        options: [
          "Plan XZ",
          "Plan YZ",
          "Plan XY",
          "Plan 3D"
        ],
        correctIndex: 2,
        explanation: "Le fraisage de face s'effectue generalement dans le plan XY (horizontal), avec l'axe Z pour la profondeur.",
        order: 5
      }
    ],
    // Lesson 2 quizzes (Interpolation lineaire et circulaire) - 5 questions
    [
      {
        question: "Que fait le code G1 ?",
        options: [
          "Deplacement rapide",
          "Interpolation lineaire a vitesse controlee",
          "Deplacement circulaire",
          "Arret du programme"
        ],
        correctIndex: 1,
        explanation: "G1 effectue une interpolation lineaire a une vitesse d'avance controlee, utilise pour l'usinage.",
        order: 1
      },
      {
        question: "G2 effectue une interpolation circulaire dans quel sens ?",
        options: [
          "Sens anti-horaire",
          "Sens horaire",
          "Sens vertical",
          "Depend de la machine"
        ],
        correctIndex: 1,
        explanation: "G2 effectue une interpolation circulaire dans le sens horaire. G3 est pour le sens anti-horaire.",
        order: 2
      },
      {
        question: "Que representent I et J dans une interpolation circulaire ?",
        options: [
          "Les coordonnees du point final",
          "Le decalage du centre de l'arc par rapport au point de depart",
          "Le rayon de l'arc",
          "Les vitesses sur X et Y"
        ],
        correctIndex: 1,
        explanation: "I et J representent le decalage du centre de l'arc par rapport au point de depart (incremental).",
        order: 3
      },
      {
        question: "Pourquoi ne doit-on JAMAIS usiner pendant un G0 ?",
        options: [
          "La machine s'arrete",
          "La vitesse n'est pas controlee, risque de casse",
          "Le programme ne compile pas",
          "L'arrosage s'arrete"
        ],
        correctIndex: 1,
        explanation: "G0 deplace l'outil a vitesse maximale sans controle de l'avance, ce qui pourrait casser l'outil ou endommager la piece.",
        order: 4
      },
      {
        question: "Quel code utiliser pour un arc anti-horaire ?",
        options: [
          "G0",
          "G1",
          "G2",
          "G3"
        ],
        correctIndex: 3,
        explanation: "G3 effectue une interpolation circulaire dans le sens anti-horaire.",
        order: 5
      }
    ],
    // Lesson 3 quizzes (Mode absolu vs incremental) - 5 questions
    [
      {
        question: "Quel code active le mode absolu ?",
        options: [
          "G90",
          "G91",
          "G92",
          "G54"
        ],
        correctIndex: 0,
        explanation: "G90 active le mode absolu ou les coordonnees sont relatives a l'origine piece (0,0,0).",
        order: 1
      },
      {
        question: "En mode incremental G91, que fait G1 X50 ?",
        options: [
          "Va a la position X=50",
          "Avance de 50 mm en X par rapport a la position actuelle",
          "Definit la vitesse a 50",
          "Va a 50 mm de l'origine"
        ],
        correctIndex: 1,
        explanation: "En mode incremental, X50 signifie un deplacement de +50 mm par rapport a la position actuelle, pas vers X=50.",
        order: 2
      },
      {
        question: "Quel mode est recommande pour la programmation generale ?",
        options: [
          "Mode incremental G91",
          "Mode absolu G90",
          "Les deux sont equivalents",
          "Aucun des deux"
        ],
        correctIndex: 1,
        explanation: "Le mode absolu G90 est recommande car il est plus facile a lire et les erreurs ne s'accumulent pas.",
        order: 3
      },
      {
        question: "Pour quel usage le mode incremental est-il particulierement utile ?",
        options: [
          "Les contours complexes",
          "Les sous-programmes reutilisables",
          "L'usinage de poches",
          "Les operations de percage"
        ],
        correctIndex: 1,
        explanation: "Le mode incremental permet de creer des sous-programmes independants de la position de depart.",
        order: 4
      },
      {
        question: "Que se passe-t-il si on oublie de revenir en G90 apres un G91 ?",
        options: [
          "Rien, c'est automatique",
          "Tous les mouvements suivants seront incrementaux",
          "La machine s'arrete",
          "L'outil retourne a l'origine"
        ],
        correctIndex: 1,
        explanation: "Le mode reste actif jusqu'a ce qu'il soit change explicitement. Les mouvements suivants seraient en incremental.",
        order: 5
      }
    ],
    // Lesson 4 quizzes (Plans de travail) - 5 questions
    [
      {
        question: "Quel plan de travail est selectionne par defaut sur une fraiseuse ?",
        options: [
          "G17 (XY)",
          "G18 (XZ)",
          "G19 (YZ)",
          "Aucun par defaut"
        ],
        correctIndex: 0,
        explanation: "G17 (plan XY) est le plan par defaut sur les fraiseuses, l'outil se deplacant verticalement en Z.",
        order: 1
      },
      {
        question: "Sur quel plan un tour CNC travaille-t-il generalement ?",
        options: [
          "G17 (XY)",
          "G18 (XZ)",
          "G19 (YZ)",
          "Aucun specifique"
        ],
        correctIndex: 1,
        explanation: "Un tour CNC travaille generalement en G18 (plan XZ), X etant le rayon et Z la longueur de la piece.",
        order: 2
      },
      {
        question: "Quels parametres definissent le centre d'un arc en G17 ?",
        options: [
          "I et K",
          "J et K",
          "I et J",
          "X et Y"
        ],
        correctIndex: 2,
        explanation: "En plan G17 (XY), I et J definissent le decalage du centre de l'arc par rapport au point de depart.",
        order: 3
      },
      {
        question: "Pourquoi est-il important de specifier le plan au debut du programme ?",
        options: [
          "Pour definir les unites",
          "Pour eviter d'utiliser un plan residuel du programme precedent",
          "Pour optimiser la vitesse",
          "C'est obligatoire pour compiler"
        ],
        correctIndex: 1,
        explanation: "Le plan actif persiste apres la fin d'un programme. Le specifier evite des mouvements inattendus.",
        order: 4
      },
      {
        question: "En G19, quel est l'axe perpendiculaire au plan de travail ?",
        options: [
          "X",
          "Y",
          "Z",
          "A"
        ],
        correctIndex: 0,
        explanation: "En G19 (plan YZ), l'axe X est perpendiculaire au plan de travail et represente la profondeur.",
        order: 5
      }
    ],
    // Lesson 5 quizzes (Machines multi-axes) - 5 questions
    [
      {
        question: "Autour de quel axe tourne l'axe rotatif A ?",
        options: [
          "Axe X",
          "Axe Y",
          "Axe Z",
          "Son propre axe"
        ],
        correctIndex: 0,
        explanation: "L'axe A effectue une rotation autour de l'axe X, selon la convention standard des axes rotatifs.",
        order: 1
      },
      {
        question: "Combien d'axes possede une machine 5 axes ?",
        options: [
          "3 lineaires + 2 rotatifs",
          "5 lineaires",
          "2 lineaires + 3 rotatifs",
          "4 lineaires + 1 rotatif"
        ],
        correctIndex: 0,
        explanation: "Une machine 5 axes possede les 3 axes lineaires X, Y, Z plus 2 axes de rotation parmi A, B, C.",
        order: 2
      },
      {
        question: "Quel est l'avantage principal du 5 axes ?",
        options: [
          "Vitesse plus elevee",
          "Usinage complet en un seul montage",
          "Cout reduit",
          "Programmation simplifiee"
        ],
        correctIndex: 1,
        explanation: "Le 5 axes permet d'usiner toutes les faces d'une piece sans la demonter, reduisant les erreurs de repositionnement.",
        order: 3
      },
      {
        question: "Quel logiciel est generalement necessaire pour programmer en 5 axes ?",
        options: [
          "Un editeur de texte",
          "Un logiciel FAO (CAM)",
          "TIA Portal",
          "Excel"
        ],
        correctIndex: 1,
        explanation: "La programmation 5 axes est complexe et utilise des logiciels FAO (Fabrication Assistee par Ordinateur) pour generer le G-code.",
        order: 4
      },
      {
        question: "Quel axe rotatif permet l'inclinaison de la broche ?",
        options: [
          "Axe A",
          "Axe B",
          "Axe C",
          "Axe Z"
        ],
        correctIndex: 1,
        explanation: "L'axe B (rotation autour de Y) permet generalement l'inclinaison de la broche sur les centres d'usinage.",
        order: 5
      }
    ],
    // Lesson 6 quizzes (Vitesses et avances) - 5 questions
    [
      {
        question: "Quelle est l'unite de la vitesse de coupe Vc ?",
        options: [
          "tr/min",
          "mm/min",
          "m/min",
          "mm/tour"
        ],
        correctIndex: 2,
        explanation: "La vitesse de coupe Vc s'exprime en metres par minute (m/min), representant la vitesse peripherique de l'outil.",
        order: 1
      },
      {
        question: "Quel materiau d'outil permet les vitesses de coupe les plus elevees ?",
        options: [
          "HSS (acier rapide)",
          "Carbure",
          "Acier au carbone",
          "Bronze"
        ],
        correctIndex: 1,
        explanation: "Les outils en carbure supportent des temperatures plus elevees et permettent des vitesses 2 a 5 fois superieures au HSS.",
        order: 2
      },
      {
        question: "Comment varie la vitesse de broche si on double le diametre de l'outil ?",
        options: [
          "Elle double",
          "Elle reste la meme",
          "Elle diminue de moitie",
          "Elle quadruple"
        ],
        correctIndex: 2,
        explanation: "N = (Vc x 1000) / (pi x D). Si D double, N diminue de moitie pour maintenir la meme vitesse de coupe.",
        order: 3
      },
      {
        question: "Qu'est-ce que l'avance par dent (fz) ?",
        options: [
          "La vitesse totale de l'avance",
          "L'epaisseur de copeau par dent",
          "Le nombre de dents de l'outil",
          "La profondeur de passe"
        ],
        correctIndex: 1,
        explanation: "L'avance par dent (fz) represente l'epaisseur de copeau que chaque dent enleve, exprimee en mm.",
        order: 4
      },
      {
        question: "Quelle Vc typique utilise-t-on pour l'aluminium avec un outil carbure ?",
        options: [
          "25-40 m/min",
          "80-150 m/min",
          "300-1000 m/min",
          "1500-2000 m/min"
        ],
        correctIndex: 2,
        explanation: "L'aluminium permet des vitesses de coupe elevees, typiquement 300 a 1000 m/min avec des outils carbure.",
        order: 5
      }
    ]
  ],
  quizTranslations: {
    en: {
      // Lesson 1 quiz translations
      "Quel est l'axe vertical sur une fraiseuse CNC ?": {
        question: "What is the vertical axis on a CNC milling machine?",
        options: ["X axis", "Y axis", "Z axis", "A axis"],
        explanation: "The Z axis is the vertical axis (up/down movement)."
      },
      "Qu'est-ce que l'origine piece (W) ?": {
        question: "What is the work origin (W)?",
        options: [
          "A fixed point on the machine",
          "The reference point defined by the programmer on the part",
          "The tool position",
          "The center of the spindle"
        ],
        explanation: "The work origin is the reference point chosen by the programmer to position the part."
      },
      "Sur une machine 5 axes, quels sont les axes de rotation ?": {
        question: "On a 5-axis machine, what are the rotational axes?",
        options: ["X, Y, Z", "A, B, C", "1, 2, 3", "U, V, W"],
        explanation: "The A, B, C axes are the rotational axes around X, Y, Z respectively."
      },
      "Qu'est-ce que l'origine machine (M) ?": {
        question: "What is the machine origin (M)?",
        options: [
          "The part reference point",
          "A fixed physical point on the machine",
          "The current tool position",
          "The center of the table"
        ],
        explanation: "The machine origin is a fixed physical point, usually defined by the machine's limit switches."
      },
      "Dans quel plan s'effectue generalement le fraisage de face ?": {
        question: "In which plane is face milling typically performed?",
        options: ["XZ plane", "YZ plane", "XY plane", "3D plane"],
        explanation: "Face milling is typically performed in the XY plane (horizontal), with the Z axis for depth."
      },
      // Lesson 2 quiz translations
      "Que fait le code G1 ?": {
        question: "What does the G1 code do?",
        options: ["Rapid move", "Linear interpolation at controlled speed", "Circular move", "Program stop"],
        explanation: "G1 performs linear interpolation at a controlled feed rate, used for machining."
      },
      "G2 effectue une interpolation circulaire dans quel sens ?": {
        question: "G2 performs circular interpolation in which direction?",
        options: ["Counter-clockwise", "Clockwise", "Vertical", "Depends on the machine"],
        explanation: "G2 performs clockwise circular interpolation. G3 is for counter-clockwise."
      },
      "Que representent I et J dans une interpolation circulaire ?": {
        question: "What do I and J represent in circular interpolation?",
        options: [
          "The end point coordinates",
          "The arc center offset from the start point",
          "The arc radius",
          "The speeds on X and Y"
        ],
        explanation: "I and J represent the arc center offset from the start point (incremental)."
      },
      "Pourquoi ne doit-on JAMAIS usiner pendant un G0 ?": {
        question: "Why should you NEVER machine during a G0?",
        options: [
          "The machine stops",
          "The speed is not controlled, risk of breakage",
          "The program won't compile",
          "The coolant stops"
        ],
        explanation: "G0 moves the tool at maximum speed without feed control, which could break the tool or damage the part."
      },
      "Quel code utiliser pour un arc anti-horaire ?": {
        question: "Which code to use for a counter-clockwise arc?",
        options: ["G0", "G1", "G2", "G3"],
        explanation: "G3 performs circular interpolation in the counter-clockwise direction."
      },
      // Lesson 3 quiz translations
      "Quel code active le mode absolu ?": {
        question: "Which code activates absolute mode?",
        options: ["G90", "G91", "G92", "G54"],
        explanation: "G90 activates absolute mode where coordinates are relative to the work origin (0,0,0)."
      },
      "En mode incremental G91, que fait G1 X50 ?": {
        question: "In incremental mode G91, what does G1 X50 do?",
        options: [
          "Goes to position X=50",
          "Moves 50 mm in X from the current position",
          "Sets speed to 50",
          "Goes to 50 mm from origin"
        ],
        explanation: "In incremental mode, X50 means a movement of +50 mm from the current position, not to X=50."
      },
      "Quel mode est recommande pour la programmation generale ?": {
        question: "Which mode is recommended for general programming?",
        options: [
          "Incremental mode G91",
          "Absolute mode G90",
          "Both are equivalent",
          "Neither"
        ],
        explanation: "Absolute mode G90 is recommended because it's easier to read and errors don't accumulate."
      },
      "Pour quel usage le mode incremental est-il particulierement utile ?": {
        question: "For what use is incremental mode particularly useful?",
        options: [
          "Complex contours",
          "Reusable subprograms",
          "Pocket machining",
          "Drilling operations"
        ],
        explanation: "Incremental mode allows creating subprograms that are independent of the starting position."
      },
      "Que se passe-t-il si on oublie de revenir en G90 apres un G91 ?": {
        question: "What happens if you forget to return to G90 after G91?",
        options: [
          "Nothing, it's automatic",
          "All following movements will be incremental",
          "The machine stops",
          "The tool returns to origin"
        ],
        explanation: "The mode remains active until explicitly changed. Following movements would be in incremental."
      },
      // Lesson 4 quiz translations
      "Quel plan de travail est selectionne par defaut sur une fraiseuse ?": {
        question: "Which work plane is selected by default on a milling machine?",
        options: ["G17 (XY)", "G18 (XZ)", "G19 (YZ)", "None by default"],
        explanation: "G17 (XY plane) is the default plane on milling machines, with the tool moving vertically in Z."
      },
      "Sur quel plan un tour CNC travaille-t-il generalement ?": {
        question: "On which plane does a CNC lathe typically work?",
        options: ["G17 (XY)", "G18 (XZ)", "G19 (YZ)", "None specific"],
        explanation: "A CNC lathe typically works in G18 (XZ plane), X being the radius and Z the length of the part."
      },
      "Quels parametres definissent le centre d'un arc en G17 ?": {
        question: "Which parameters define the arc center in G17?",
        options: ["I and K", "J and K", "I and J", "X and Y"],
        explanation: "In G17 (XY plane), I and J define the arc center offset from the start point."
      },
      "Pourquoi est-il important de specifier le plan au debut du programme ?": {
        question: "Why is it important to specify the plane at the beginning of the program?",
        options: [
          "To define units",
          "To avoid using a residual plane from the previous program",
          "To optimize speed",
          "It's required to compile"
        ],
        explanation: "The active plane persists after a program ends. Specifying it avoids unexpected movements."
      },
      "En G19, quel est l'axe perpendiculaire au plan de travail ?": {
        question: "In G19, which axis is perpendicular to the work plane?",
        options: ["X", "Y", "Z", "A"],
        explanation: "In G19 (YZ plane), the X axis is perpendicular to the work plane and represents depth."
      },
      // Lesson 5 quiz translations
      "Autour de quel axe tourne l'axe rotatif A ?": {
        question: "Around which axis does the rotary A axis rotate?",
        options: ["X axis", "Y axis", "Z axis", "Its own axis"],
        explanation: "The A axis rotates around the X axis, according to the standard convention for rotary axes."
      },
      "Combien d'axes possede une machine 5 axes ?": {
        question: "How many axes does a 5-axis machine have?",
        options: [
          "3 linear + 2 rotary",
          "5 linear",
          "2 linear + 3 rotary",
          "4 linear + 1 rotary"
        ],
        explanation: "A 5-axis machine has the 3 linear axes X, Y, Z plus 2 rotary axes from A, B, C."
      },
      "Quel est l'avantage principal du 5 axes ?": {
        question: "What is the main advantage of 5-axis?",
        options: [
          "Higher speed",
          "Complete machining in a single setup",
          "Reduced cost",
          "Simplified programming"
        ],
        explanation: "5-axis allows machining all faces of a part without removing it, reducing repositioning errors."
      },
      "Quel logiciel est generalement necessaire pour programmer en 5 axes ?": {
        question: "What software is typically needed for 5-axis programming?",
        options: ["A text editor", "CAM software", "TIA Portal", "Excel"],
        explanation: "5-axis programming is complex and uses CAM (Computer Aided Manufacturing) software to generate G-code."
      },
      "Quel axe rotatif permet l'inclinaison de la broche ?": {
        question: "Which rotary axis allows spindle tilt?",
        options: ["A axis", "B axis", "C axis", "Z axis"],
        explanation: "The B axis (rotation around Y) typically allows spindle tilt on machining centers."
      },
      // Lesson 6 quiz translations
      "Quelle est l'unite de la vitesse de coupe Vc ?": {
        question: "What is the unit for cutting speed Vc?",
        options: ["rpm", "mm/min", "m/min", "mm/rev"],
        explanation: "Cutting speed Vc is expressed in meters per minute (m/min), representing the peripheral speed of the tool."
      },
      "Quel materiau d'outil permet les vitesses de coupe les plus elevees ?": {
        question: "Which tool material allows the highest cutting speeds?",
        options: ["HSS (high speed steel)", "Carbide", "Carbon steel", "Bronze"],
        explanation: "Carbide tools withstand higher temperatures and allow speeds 2-5 times higher than HSS."
      },
      "Comment varie la vitesse de broche si on double le diametre de l'outil ?": {
        question: "How does spindle speed change if you double the tool diameter?",
        options: ["It doubles", "It stays the same", "It halves", "It quadruples"],
        explanation: "N = (Vc x 1000) / (pi x D). If D doubles, N halves to maintain the same cutting speed."
      },
      "Qu'est-ce que l'avance par dent (fz) ?": {
        question: "What is feed per tooth (fz)?",
        options: [
          "The total feed rate",
          "The chip thickness per tooth",
          "The number of tool teeth",
          "The depth of cut"
        ],
        explanation: "Feed per tooth (fz) represents the chip thickness that each tooth removes, expressed in mm."
      },
      "Quelle Vc typique utilise-t-on pour l'aluminium avec un outil carbure ?": {
        question: "What typical Vc is used for aluminum with a carbide tool?",
        options: ["25-40 m/min", "80-150 m/min", "300-1000 m/min", "1500-2000 m/min"],
        explanation: "Aluminum allows high cutting speeds, typically 300-1000 m/min with carbide tools."
      }
    },
    es: {
      // Lesson 1 quiz translations
      "Quel est l'axe vertical sur une fraiseuse CNC ?": {
        question: "Cual es el eje vertical en una fresadora CNC?",
        options: ["Eje X", "Eje Y", "Eje Z", "Eje A"],
        explanation: "El eje Z es el eje vertical (movimiento arriba/abajo)."
      },
      "Qu'est-ce que l'origine piece (W) ?": {
        question: "Que es el origen pieza (W)?",
        options: [
          "Un punto fijo en la maquina",
          "El punto de referencia definido por el programador en la pieza",
          "La posicion de la herramienta",
          "El centro del husillo"
        ],
        explanation: "El origen pieza es el punto de referencia elegido por el programador para posicionar la pieza."
      },
      "Sur une machine 5 axes, quels sont les axes de rotation ?": {
        question: "En una maquina de 5 ejes, cuales son los ejes de rotacion?",
        options: ["X, Y, Z", "A, B, C", "1, 2, 3", "U, V, W"],
        explanation: "Los ejes A, B, C son los ejes de rotacion alrededor de X, Y, Z respectivamente."
      },
      "Qu'est-ce que l'origine machine (M) ?": {
        question: "Que es el origen maquina (M)?",
        options: [
          "El punto de referencia de la pieza",
          "Un punto fisico fijo en la maquina",
          "La posicion actual de la herramienta",
          "El centro de la mesa"
        ],
        explanation: "El origen maquina es un punto fisico fijo, generalmente definido por los finales de carrera de la maquina."
      },
      "Dans quel plan s'effectue generalement le fraisage de face ?": {
        question: "En que plano se realiza generalmente el fresado frontal?",
        options: ["Plano XZ", "Plano YZ", "Plano XY", "Plano 3D"],
        explanation: "El fresado frontal se realiza generalmente en el plano XY (horizontal), con el eje Z para la profundidad."
      },
      // Lesson 2 quiz translations
      "Que fait le code G1 ?": {
        question: "Que hace el codigo G1?",
        options: ["Movimiento rapido", "Interpolacion lineal a velocidad controlada", "Movimiento circular", "Parada del programa"],
        explanation: "G1 realiza interpolacion lineal a una velocidad de avance controlada, utilizado para mecanizado."
      },
      "G2 effectue une interpolation circulaire dans quel sens ?": {
        question: "G2 realiza interpolacion circular en que sentido?",
        options: ["Sentido antihorario", "Sentido horario", "Vertical", "Depende de la maquina"],
        explanation: "G2 realiza interpolacion circular en sentido horario. G3 es para antihorario."
      },
      "Que representent I et J dans une interpolation circulaire ?": {
        question: "Que representan I y J en una interpolacion circular?",
        options: [
          "Las coordenadas del punto final",
          "El desplazamiento del centro del arco desde el punto inicial",
          "El radio del arco",
          "Las velocidades en X e Y"
        ],
        explanation: "I y J representan el desplazamiento del centro del arco desde el punto inicial (incremental)."
      },
      "Pourquoi ne doit-on JAMAIS usiner pendant un G0 ?": {
        question: "Por que NUNCA se debe mecanizar durante un G0?",
        options: [
          "La maquina se detiene",
          "La velocidad no esta controlada, riesgo de rotura",
          "El programa no compila",
          "El refrigerante se detiene"
        ],
        explanation: "G0 mueve la herramienta a velocidad maxima sin control de avance, lo que podria romper la herramienta o danar la pieza."
      },
      "Quel code utiliser pour un arc anti-horaire ?": {
        question: "Que codigo usar para un arco antihorario?",
        options: ["G0", "G1", "G2", "G3"],
        explanation: "G3 realiza interpolacion circular en sentido antihorario."
      },
      // Lesson 3 quiz translations
      "Quel code active le mode absolu ?": {
        question: "Que codigo activa el modo absoluto?",
        options: ["G90", "G91", "G92", "G54"],
        explanation: "G90 activa el modo absoluto donde las coordenadas son relativas al origen pieza (0,0,0)."
      },
      "En mode incremental G91, que fait G1 X50 ?": {
        question: "En modo incremental G91, que hace G1 X50?",
        options: [
          "Va a la posicion X=50",
          "Avanza 50 mm en X desde la posicion actual",
          "Establece la velocidad a 50",
          "Va a 50 mm del origen"
        ],
        explanation: "En modo incremental, X50 significa un desplazamiento de +50 mm desde la posicion actual, no hacia X=50."
      },
      "Quel mode est recommande pour la programmation generale ?": {
        question: "Que modo se recomienda para la programacion general?",
        options: [
          "Modo incremental G91",
          "Modo absoluto G90",
          "Ambos son equivalentes",
          "Ninguno"
        ],
        explanation: "El modo absoluto G90 se recomienda porque es mas facil de leer y los errores no se acumulan."
      },
      "Pour quel usage le mode incremental est-il particulierement utile ?": {
        question: "Para que uso es particularmente util el modo incremental?",
        options: [
          "Contornos complejos",
          "Subprogramas reutilizables",
          "Mecanizado de cavidades",
          "Operaciones de taladrado"
        ],
        explanation: "El modo incremental permite crear subprogramas independientes de la posicion inicial."
      },
      "Que se passe-t-il si on oublie de revenir en G90 apres un G91 ?": {
        question: "Que pasa si olvida volver a G90 despues de G91?",
        options: [
          "Nada, es automatico",
          "Todos los movimientos siguientes seran incrementales",
          "La maquina se detiene",
          "La herramienta vuelve al origen"
        ],
        explanation: "El modo permanece activo hasta que se cambie explicitamente. Los movimientos siguientes serian en incremental."
      },
      // Lesson 4 quiz translations
      "Quel plan de travail est selectionne par defaut sur une fraiseuse ?": {
        question: "Que plano de trabajo se selecciona por defecto en una fresadora?",
        options: ["G17 (XY)", "G18 (XZ)", "G19 (YZ)", "Ninguno por defecto"],
        explanation: "G17 (plano XY) es el plano por defecto en fresadoras, con la herramienta moviendose verticalmente en Z."
      },
      "Sur quel plan un tour CNC travaille-t-il generalement ?": {
        question: "En que plano trabaja generalmente un torno CNC?",
        options: ["G17 (XY)", "G18 (XZ)", "G19 (YZ)", "Ninguno especifico"],
        explanation: "Un torno CNC trabaja generalmente en G18 (plano XZ), X siendo el radio y Z la longitud de la pieza."
      },
      "Quels parametres definissent le centre d'un arc en G17 ?": {
        question: "Que parametros definen el centro de un arco en G17?",
        options: ["I y K", "J y K", "I y J", "X e Y"],
        explanation: "En G17 (plano XY), I y J definen el desplazamiento del centro del arco desde el punto inicial."
      },
      "Pourquoi est-il important de specifier le plan au debut du programme ?": {
        question: "Por que es importante especificar el plano al inicio del programa?",
        options: [
          "Para definir unidades",
          "Para evitar usar un plano residual del programa anterior",
          "Para optimizar la velocidad",
          "Es obligatorio para compilar"
        ],
        explanation: "El plano activo persiste despues de que termina un programa. Especificarlo evita movimientos inesperados."
      },
      "En G19, quel est l'axe perpendiculaire au plan de travail ?": {
        question: "En G19, cual es el eje perpendicular al plano de trabajo?",
        options: ["X", "Y", "Z", "A"],
        explanation: "En G19 (plano YZ), el eje X es perpendicular al plano de trabajo y representa la profundidad."
      },
      // Lesson 5 quiz translations
      "Autour de quel axe tourne l'axe rotatif A ?": {
        question: "Alrededor de que eje gira el eje rotativo A?",
        options: ["Eje X", "Eje Y", "Eje Z", "Su propio eje"],
        explanation: "El eje A gira alrededor del eje X, segun la convencion estandar de ejes rotativos."
      },
      "Combien d'axes possede une machine 5 axes ?": {
        question: "Cuantos ejes tiene una maquina de 5 ejes?",
        options: [
          "3 lineales + 2 rotativos",
          "5 lineales",
          "2 lineales + 3 rotativos",
          "4 lineales + 1 rotativo"
        ],
        explanation: "Una maquina de 5 ejes tiene los 3 ejes lineales X, Y, Z mas 2 ejes de rotacion de A, B, C."
      },
      "Quel est l'avantage principal du 5 axes ?": {
        question: "Cual es la principal ventaja de 5 ejes?",
        options: [
          "Mayor velocidad",
          "Mecanizado completo en una sola sujecion",
          "Costo reducido",
          "Programacion simplificada"
        ],
        explanation: "El 5 ejes permite mecanizar todas las caras de una pieza sin desmontarla, reduciendo errores de reposicionamiento."
      },
      "Quel logiciel est generalement necessaire pour programmer en 5 axes ?": {
        question: "Que software se necesita generalmente para programar en 5 ejes?",
        options: ["Un editor de texto", "Software CAM", "TIA Portal", "Excel"],
        explanation: "La programacion de 5 ejes es compleja y usa software CAM (Fabricacion Asistida por Computadora) para generar el codigo G."
      },
      "Quel axe rotatif permet l'inclinaison de la broche ?": {
        question: "Que eje rotativo permite la inclinacion del husillo?",
        options: ["Eje A", "Eje B", "Eje C", "Eje Z"],
        explanation: "El eje B (rotacion alrededor de Y) generalmente permite la inclinacion del husillo en centros de mecanizado."
      },
      // Lesson 6 quiz translations
      "Quelle est l'unite de la vitesse de coupe Vc ?": {
        question: "Cual es la unidad de la velocidad de corte Vc?",
        options: ["rpm", "mm/min", "m/min", "mm/rev"],
        explanation: "La velocidad de corte Vc se expresa en metros por minuto (m/min), representando la velocidad periferica de la herramienta."
      },
      "Quel materiau d'outil permet les vitesses de coupe les plus elevees ?": {
        question: "Que material de herramienta permite las velocidades de corte mas altas?",
        options: ["HSS (acero rapido)", "Carburo", "Acero al carbono", "Bronce"],
        explanation: "Las herramientas de carburo soportan temperaturas mas altas y permiten velocidades 2-5 veces mayores que HSS."
      },
      "Comment varie la vitesse de broche si on double le diametre de l'outil ?": {
        question: "Como varia la velocidad del husillo si se duplica el diametro de la herramienta?",
        options: ["Se duplica", "Permanece igual", "Se reduce a la mitad", "Se cuadruplica"],
        explanation: "N = (Vc x 1000) / (pi x D). Si D se duplica, N se reduce a la mitad para mantener la misma velocidad de corte."
      },
      "Qu'est-ce que l'avance par dent (fz) ?": {
        question: "Que es el avance por diente (fz)?",
        options: [
          "La velocidad total de avance",
          "El espesor de viruta por diente",
          "El numero de dientes de la herramienta",
          "La profundidad de pasada"
        ],
        explanation: "El avance por diente (fz) representa el espesor de viruta que cada diente remueve, expresado en mm."
      },
      "Quelle Vc typique utilise-t-on pour l'aluminium avec un outil carbure ?": {
        question: "Que Vc tipica se usa para aluminio con herramienta de carburo?",
        options: ["25-40 m/min", "80-150 m/min", "300-1000 m/min", "1500-2000 m/min"],
        explanation: "El aluminio permite velocidades de corte altas, tipicamente 300-1000 m/min con herramientas de carburo."
      }
    }
  }
}
