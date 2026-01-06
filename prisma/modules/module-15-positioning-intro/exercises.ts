import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module15Exercises: ExerciseData[] = [
  {
    title: "Calcul de résolution encodeur",
    description: "Calculez la résolution d'un système de positionnement",
    type: "fill_blank",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Encodeur: 1024 impulsions/tour",
        "Vis à billes: pas de 5mm",
        "Calculez la résolution en mm",
        "Déterminez la précision maximale"
      ],
      objective: "Comprendre le lien encodeur/déplacement"
    }),
    config: JSON.stringify({
      text: "Calcul de résolution d'un système de positionnement:\n\nDonnées:\n- Encodeur: {{blank1}} impulsions/tour (PPR)\n- Vis à billes: pas de {{blank2}} mm\n- Mode quadrature (×4)\n\nCalculs:\n1. Impulsions après quadrature = PPR × 4 = {{blank1}} × 4 = {{blank3}} impulsions/tour\n\n2. Résolution = Pas / Impulsions totales\n   Résolution = {{blank2}} / {{blank3}} = {{blank4}} mm\n\n3. Cette résolution signifie que le système peut détecter des déplacements de {{blank4}} mm minimum.\n\nPour améliorer la résolution, on peut:\n- Augmenter le {{blank5}} de l'encodeur\n- Réduire le {{blank6}} de la vis",
      blanks: [
        { id: "blank1", placeholder: "PPR" },
        { id: "blank2", placeholder: "pas mm" },
        { id: "blank3", placeholder: "impulsions" },
        { id: "blank4", placeholder: "résolution" },
        { id: "blank5", placeholder: "paramètre" },
        { id: "blank6", placeholder: "paramètre" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "1024",
        blank2: "5",
        blank3: "4096",
        blank4: "0.00122|0.0012|0.001",
        blank5: "PPR|nombre d'impulsions|résolution",
        blank6: "pas"
      }
    }),
    hints: JSON.stringify([
      "En quadrature, la résolution est × 4",
      "Résolution = Pas / (Impulsions × 4)",
      "Plus le PPR est élevé, meilleure est la résolution"
    ]),
    xpReward: 125,
    order: 1
  },
  {
    title: "Profil de mouvement trapézoïdal",
    description: "Calculez un profil de déplacement trapézoïdal",
    type: "fill_blank",
    difficulty: "advanced",
    instructions: JSON.stringify({
      steps: [
        "Distance: 500mm",
        "Vitesse max: 100mm/s",
        "Accélération: 500mm/s²",
        "Calculez le temps total de déplacement"
      ],
      objective: "Maîtriser les profils de mouvement"
    }),
    config: JSON.stringify({
      text: "Calcul d'un profil de mouvement trapézoïdal:\n\nDonnées:\n- Distance totale: {{blank1}} mm\n- Vitesse maximale: {{blank2}} mm/s\n- Accélération: {{blank3}} mm/s²\n\nCalculs:\n1. Temps d'accélération:\n   t_acc = Vmax / a = {{blank2}} / {{blank3}} = {{blank4}} s\n\n2. Distance d'accélération:\n   d_acc = 0.5 × a × t² = 0.5 × {{blank3}} × {{blank4}}² = {{blank5}} mm\n\n3. Distance à vitesse constante:\n   d_cruise = Distance totale - 2 × d_acc = {{blank1}} - 2 × {{blank5}} = {{blank6}} mm\n\n4. Temps à vitesse constante:\n   t_cruise = d_cruise / Vmax = {{blank6}} / {{blank2}} = {{blank7}} s\n\n5. Temps total:\n   T = t_acc + t_cruise + t_dec = {{blank4}} + {{blank7}} + {{blank4}} = {{blank8}} s",
      blanks: [
        { id: "blank1", placeholder: "distance" },
        { id: "blank2", placeholder: "Vmax" },
        { id: "blank3", placeholder: "accélération" },
        { id: "blank4", placeholder: "t_acc" },
        { id: "blank5", placeholder: "d_acc" },
        { id: "blank6", placeholder: "d_cruise" },
        { id: "blank7", placeholder: "t_cruise" },
        { id: "blank8", placeholder: "T total" }
      ]
    }),
    solution: JSON.stringify({
      answers: {
        blank1: "500",
        blank2: "100",
        blank3: "500",
        blank4: "0.2",
        blank5: "10",
        blank6: "480",
        blank7: "4.8",
        blank8: "5.2"
      }
    }),
    hints: JSON.stringify([
      "Temps d'accélération = Vmax / Accélération",
      "Distance d'accélération = 0.5 × a × t²",
      "Vérifiez que la vitesse max est atteinte"
    ]),
    xpReward: 200,
    order: 2
  },
  {
    title: "Types de boucles de contrôle",
    description: "Comprenez les différentes boucles de contrôle motion",
    type: "matching",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "Identifiez les types de boucles",
        "Associez chaque boucle à sa fonction",
        "Comprenez leur imbrication"
      ],
      objective: "Comprendre l'architecture de contrôle motion"
    }),
    config: JSON.stringify({
      leftItems: [
        { id: "position", text: "Boucle de position" },
        { id: "velocity", text: "Boucle de vitesse" },
        { id: "current", text: "Boucle de courant" },
        { id: "encoder", text: "Encodeur" }
      ],
      rightItems: [
        { id: "outer", text: "Boucle externe, consigne de position" },
        { id: "middle", text: "Boucle intermédiaire, consigne de vitesse" },
        { id: "inner", text: "Boucle interne, la plus rapide" },
        { id: "feedback", text: "Fournit le retour de position réelle" }
      ]
    }),
    solution: JSON.stringify({
      pairs: [
        ["position", "outer"],
        ["velocity", "middle"],
        ["current", "inner"],
        ["encoder", "feedback"]
      ]
    }),
    hints: JSON.stringify([
      "La boucle de courant est la plus rapide (kHz)",
      "La boucle de position est la plus lente",
      "Chaque boucle externe donne une consigne à la boucle interne"
    ]),
    xpReward: 150,
    order: 3
  }
]

export const module15ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Calcul de résolution encodeur": {
      title: "Encoder Resolution Calculation",
      description: "Calculate the resolution of a positioning system",
      instructions: JSON.stringify({
        steps: [
          "Encoder: 1024 pulses/rev",
          "Ball screw: 5mm pitch",
          "Calculate resolution in mm",
          "Determine maximum precision"
        ],
        objective: "Understand encoder/displacement relationship"
      }),
      hints: JSON.stringify([
        "In quadrature, resolution is × 4",
        "Resolution = Pitch / (Pulses × 4)",
        "Higher PPR means better resolution"
      ])
    },
    "Profil de mouvement trapézoïdal": {
      title: "Trapezoidal Motion Profile",
      description: "Calculate a trapezoidal motion profile",
      instructions: JSON.stringify({
        steps: [
          "Distance: 500mm",
          "Max speed: 100mm/s",
          "Acceleration: 500mm/s²",
          "Calculate total move time"
        ],
        objective: "Master motion profiles"
      }),
      hints: JSON.stringify([
        "Acceleration time = Vmax / Acceleration",
        "Acceleration distance = 0.5 × a × t²",
        "Verify max speed is reached"
      ])
    },
    "Types de boucles de contrôle": {
      title: "Control Loop Types",
      description: "Understand the different motion control loops",
      instructions: JSON.stringify({
        steps: [
          "Identify loop types",
          "Match each loop to its function",
          "Understand their nesting"
        ],
        objective: "Understand motion control architecture"
      }),
      hints: JSON.stringify([
        "Current loop is the fastest (kHz)",
        "Position loop is the slowest",
        "Each outer loop gives a setpoint to the inner loop"
      ])
    }
  },
  es: {
    "Calcul de résolution encodeur": {
      title: "Cálculo de resolución del encoder",
      description: "Calcule la resolución de un sistema de posicionamiento",
      instructions: JSON.stringify({
        steps: [
          "Encoder: 1024 pulsos/vuelta",
          "Husillo de bolas: paso de 5mm",
          "Calcule la resolución en mm",
          "Determine la precisión máxima"
        ],
        objective: "Comprender la relación encoder/desplazamiento"
      }),
      hints: JSON.stringify([
        "En cuadratura, la resolución es × 4",
        "Resolución = Paso / (Pulsos × 4)",
        "Mayor PPR significa mejor resolución"
      ])
    },
    "Profil de mouvement trapézoïdal": {
      title: "Perfil de movimiento trapezoidal",
      description: "Calcule un perfil de movimiento trapezoidal",
      instructions: JSON.stringify({
        steps: [
          "Distancia: 500mm",
          "Velocidad máxima: 100mm/s",
          "Aceleración: 500mm/s²",
          "Calcule el tiempo total de desplazamiento"
        ],
        objective: "Dominar los perfiles de movimiento"
      }),
      hints: JSON.stringify([
        "Tiempo de aceleración = Vmax / Aceleración",
        "Distancia de aceleración = 0.5 × a × t²",
        "Verifique que se alcanza la velocidad máxima"
      ])
    },
    "Types de boucles de contrôle": {
      title: "Tipos de lazos de control",
      description: "Comprenda los diferentes lazos de control motion",
      instructions: JSON.stringify({
        steps: [
          "Identifique los tipos de lazos",
          "Asocie cada lazo a su función",
          "Comprenda su anidamiento"
        ],
        objective: "Comprender la arquitectura de control motion"
      }),
      hints: JSON.stringify([
        "El lazo de corriente es el más rápido (kHz)",
        "El lazo de posición es el más lento",
        "Cada lazo externo da una consigna al lazo interno"
      ])
    }
  }
}
