import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module17Exercises: ExerciseData[] = [
  {
    title: "Synchronisation d'axes",
    description: "Programmez une synchronisation maître/esclave",
    type: "fill_blank",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Configurez l'axe maître (convoyeur)",
        "Configurez l'axe esclave (robot)",
        "Définissez le rapport de réduction: 2:1",
        "Testez la synchronisation"
      ],
      objective: "Réaliser un couplage électronique"
    }),
    config: JSON.stringify({
      text: "Configuration d'un couplage électronique (Electronic Gearing):\n\nAxe maître: {{blank1}} (source de position)\nAxe esclave: {{blank2}} (suit le maître)\n\nRapport de réduction (Gear Ratio):\n- Numérateur: {{blank3}}\n- Dénominateur: {{blank4}}\n- L'esclave tourne {{blank5}} fois plus vite que le maître\n\nFormule de synchronisation:\nPosition_esclave = Position_maître × ({{blank3}} / {{blank4}})\n\nSi le maître fait 1000 impulsions, l'esclave fait:\n{{blank6}} impulsions\n\nModes de couplage:\n- Mode {{blank7}}: synchronise les vitesses\n- Mode {{blank8}}: synchronise les positions\n\nRampe de raccordement: {{blank9}} ms (temps pour atteindre la synchronisation)",
      blanks: [
        { id: "blank1", placeholder: "axe" },
        { id: "blank2", placeholder: "axe" },
        { id: "blank3", placeholder: "numérateur" },
        { id: "blank4", placeholder: "dénominateur" },
        { id: "blank5", placeholder: "ratio" },
        { id: "blank6", placeholder: "impulsions" },
        { id: "blank7", placeholder: "mode" },
        { id: "blank8", placeholder: "mode" },
        { id: "blank9", placeholder: "temps" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "Axis1|convoyeur|maître",
        blank2: "Axis2|robot|esclave",
        blank3: "2",
        blank4: "1",
        blank5: "2",
        blank6: "2000",
        blank7: "vitesse|velocity",
        blank8: "position",
        blank9: "100|200|500"
      }
    }),
    hints: JSON.stringify([
      "Le mode vitesse synchronise les vitesses",
      "Le mode position synchronise les positions",
      "Prévoyez une rampe de raccordement"
    ]),
    xpReward: 200,
    order: 1
  },
  {
    title: "Came électronique",
    description: "Créez un profil de came électronique",
    type: "ordering",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Définissez les points du profil de came",
        "Interpolez les points (linéaire ou spline)",
        "Associez la came à un axe maître",
        "Testez le mouvement"
      ],
      objective: "Programmer une came électronique"
    }),
    config: JSON.stringify({
      items: [
        { id: "step1", text: "Définir les points maître/esclave du profil" },
        { id: "step2", text: "Choisir le type d'interpolation (linéaire/spline)" },
        { id: "step3", text: "Configurer l'axe maître comme source" },
        { id: "step4", text: "Activer le couplage par came" },
        { id: "step5", text: "Vérifier les vitesses et accélérations résultantes" },
        { id: "step6", text: "Tester le mouvement à vitesse réduite" }
      ]
    }),
    solution: JSON.stringify({
      correctOrder: ["step1", "step2", "step3", "step4", "step5", "step6"]
    }),
    hints: JSON.stringify([
      "La came remplace les cames mécaniques",
      "L'interpolation spline donne des mouvements plus doux",
      "Vérifiez les vitesses et accélérations résultantes"
    ]),
    xpReward: 250,
    order: 2
  },
  {
    title: "Profil de came",
    description: "Complétez un tableau de points de came",
    type: "fill_blank",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Analysez le mouvement requis",
        "Calculez les positions esclave pour chaque position maître",
        "Vérifiez la continuité du profil"
      ],
      objective: "Concevoir un profil de came"
    }),
    config: JSON.stringify({
      text: "Profil de came pour un mouvement de va-et-vient:\n\nL'esclave doit:\n- Avancer de 0 à 100mm pendant que le maître va de 0° à 180°\n- Revenir de 100mm à 0 pendant que le maître va de 180° à 360°\n\nTableau de points:\n\n| Maître (°) | Esclave (mm) |\n|------------|-------------|\n| 0          | {{blank1}}  |\n| 45         | {{blank2}}  |\n| 90         | {{blank3}}  |\n| 135        | {{blank4}}  |\n| 180        | {{blank5}}  |\n| 225        | {{blank6}}  |\n| 270        | {{blank7}}  |\n| 315        | {{blank8}}  |\n| 360        | {{blank9}}  |\n\nType d'interpolation recommandé: {{blank10}}\n(pour des mouvements plus doux aux inversions)",
      blanks: [
        { id: "blank1", placeholder: "position" },
        { id: "blank2", placeholder: "position" },
        { id: "blank3", placeholder: "position" },
        { id: "blank4", placeholder: "position" },
        { id: "blank5", placeholder: "position" },
        { id: "blank6", placeholder: "position" },
        { id: "blank7", placeholder: "position" },
        { id: "blank8", placeholder: "position" },
        { id: "blank9", placeholder: "position" },
        { id: "blank10", placeholder: "type" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "0",
        blank2: "25",
        blank3: "50",
        blank4: "75",
        blank5: "100",
        blank6: "75",
        blank7: "50",
        blank8: "25",
        blank9: "0",
        blank10: "spline|cubique"
      }
    }),
    hints: JSON.stringify([
      "Le mouvement est symétrique",
      "Position = (Angle / 180) × 100 pour la première moitié",
      "L'interpolation spline évite les à-coups"
    ]),
    xpReward: 225,
    order: 3
  },
  {
    title: "Blocs motion PLCopen",
    description: "Associez les blocs motion PLCopen à leur fonction",
    type: "matching",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les blocs motion standard",
        "Comprenez leur fonction",
        "Utilisez-les dans une séquence"
      ],
      objective: "Maîtriser les blocs PLCopen motion"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "power", text: "MC_Power" },
        { id: "home", text: "MC_Home" },
        { id: "moveabs", text: "MC_MoveAbsolute" },
        { id: "moverel", text: "MC_MoveRelative" },
        { id: "stop", text: "MC_Stop" },
        { id: "gearin", text: "MC_GearIn" }
      ],
      rightItems: [
        { id: "enable", text: "Active/désactive l'axe" },
        { id: "reference", text: "Effectue la prise d'origine" },
        { id: "absolute", text: "Déplacement vers une position absolue" },
        { id: "relative", text: "Déplacement d'une distance relative" },
        { id: "halt", text: "Arrête le mouvement en cours" },
        { id: "sync", text: "Active le couplage électronique" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["power", "enable"],
        ["home", "reference"],
        ["moveabs", "absolute"],
        ["moverel", "relative"],
        ["stop", "halt"],
        ["gearin", "sync"]
      ]
    }),
    hints: JSON.stringify([
      "MC_Power doit être appelé en premier",
      "MC_Home définit le point zéro de l'axe",
      "Les blocs PLCopen sont standardisés entre fabricants"
    ]),
    xpReward: 150,
    order: 4
  }
]

export const module17ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Synchronisation d'axes": {
      title: "Axis Synchronization",
      description: "Program a master/slave synchronization",
      instructions: JSON.stringify({
        steps: [
          "Configure master axis (conveyor)",
          "Configure slave axis (robot)",
          "Define gear ratio: 2:1",
          "Test synchronization"
        ],
        objective: "Achieve electronic gearing"
      }),
      hints: JSON.stringify([
        "Velocity mode synchronizes speeds",
        "Position mode synchronizes positions",
        "Plan a blending ramp"
      ])
    },
    "Came électronique": {
      title: "Electronic Cam",
      description: "Create an electronic cam profile",
      instructions: JSON.stringify({
        steps: [
          "Define cam profile points",
          "Interpolate points (linear or spline)",
          "Associate cam with master axis",
          "Test the motion"
        ],
        objective: "Program an electronic cam"
      }),
      hints: JSON.stringify([
        "The cam replaces mechanical cams",
        "Spline interpolation gives smoother motion",
        "Check resulting velocities and accelerations"
      ])
    },
    "Profil de came": {
      title: "Cam Profile",
      description: "Complete a cam point table",
      instructions: JSON.stringify({
        steps: [
          "Analyze required motion",
          "Calculate slave positions for each master position",
          "Verify profile continuity"
        ],
        objective: "Design a cam profile"
      }),
      hints: JSON.stringify([
        "The motion is symmetrical",
        "Position = (Angle / 180) × 100 for first half",
        "Spline interpolation avoids jerks"
      ])
    },
    "Blocs motion PLCopen": {
      title: "PLCopen Motion Blocks",
      description: "Match PLCopen motion blocks to their function",
      instructions: JSON.stringify({
        steps: [
          "Identify standard motion blocks",
          "Understand their function",
          "Use them in a sequence"
        ],
        objective: "Master PLCopen motion blocks"
      }),
      hints: JSON.stringify([
        "MC_Power must be called first",
        "MC_Home defines the axis zero point",
        "PLCopen blocks are standardized across manufacturers"
      ])
    }
  },
  es: {
    "Synchronisation d'axes": {
      title: "Sincronización de ejes",
      description: "Programe una sincronización maestro/esclavo",
      instructions: JSON.stringify({
        steps: [
          "Configure el eje maestro (transportador)",
          "Configure el eje esclavo (robot)",
          "Defina la relación de reducción: 2:1",
          "Pruebe la sincronización"
        ],
        objective: "Realizar un acoplamiento electrónico"
      }),
      hints: JSON.stringify([
        "El modo velocidad sincroniza las velocidades",
        "El modo posición sincroniza las posiciones",
        "Prevea una rampa de enlace"
      ])
    },
    "Came électronique": {
      title: "Leva electrónica",
      description: "Cree un perfil de leva electrónica",
      instructions: JSON.stringify({
        steps: [
          "Defina los puntos del perfil de leva",
          "Interpole los puntos (lineal o spline)",
          "Asocie la leva a un eje maestro",
          "Pruebe el movimiento"
        ],
        objective: "Programar una leva electrónica"
      }),
      hints: JSON.stringify([
        "La leva reemplaza las levas mecánicas",
        "La interpolación spline da movimientos más suaves",
        "Verifique las velocidades y aceleraciones resultantes"
      ])
    },
    "Profil de came": {
      title: "Perfil de leva",
      description: "Complete una tabla de puntos de leva",
      instructions: JSON.stringify({
        steps: [
          "Analice el movimiento requerido",
          "Calcule las posiciones esclavo para cada posición maestro",
          "Verifique la continuidad del perfil"
        ],
        objective: "Diseñar un perfil de leva"
      }),
      hints: JSON.stringify([
        "El movimiento es simétrico",
        "Posición = (Ángulo / 180) × 100 para la primera mitad",
        "La interpolación spline evita sacudidas"
      ])
    },
    "Blocs motion PLCopen": {
      title: "Bloques motion PLCopen",
      description: "Asocie los bloques motion PLCopen a su función",
      instructions: JSON.stringify({
        steps: [
          "Identifique los bloques motion estándar",
          "Comprenda su función",
          "Úselos en una secuencia"
        ],
        objective: "Dominar los bloques PLCopen motion"
      }),
      hints: JSON.stringify([
        "MC_Power debe llamarse primero",
        "MC_Home define el punto cero del eje",
        "Los bloques PLCopen están estandarizados entre fabricantes"
      ])
    }
  }
}
