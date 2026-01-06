import type { ExerciseData, ExerciseTranslation } from '../types.js'

export const module06Exercises: ExerciseData[] = [
  {
    title: "Identification des axes CNC",
    description: "Identifiez les axes X, Y et Z sur une fraiseuse CNC",
    type: "plc_config",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Observez la machine CNC présentée",
        "Identifiez l'axe X (mouvement latéral)",
        "Identifiez l'axe Y (mouvement avant/arrière)",
        "Identifiez l'axe Z (mouvement vertical)"
      ],
      objective: "Associer correctement chaque axe à son mouvement"
    }),
    solution: JSON.stringify({
      axes: {
        X: "lateral",
        Y: "longitudinal",
        Z: "vertical"
      }
    }),
    hints: JSON.stringify([
      "X est généralement le mouvement gauche/droite",
      "Y est le mouvement vers/depuis l'opérateur",
      "Z est toujours le mouvement vertical (broche)"
    ]),
    xpReward: 50,
    order: 1
  },
  {
    title: "Composants d'une CNC",
    description: "Identifiez les composants principaux d'une machine CNC",
    type: "plc_config",
    difficulty: "beginner",
    instructions: JSON.stringify({
      steps: [
        "Observez le schéma de la machine CNC",
        "Identifiez la broche, la table, le pupitre",
        "Localisez le changeur d'outils et les guides",
        "Associez chaque composant à sa fonction"
      ],
      objective: "Identifier tous les composants principaux"
    }),
    solution: JSON.stringify({
      components: {
        spindle: "Rotation de l'outil",
        table: "Support de la pièce",
        controller: "Commande de la machine",
        toolChanger: "Changement automatique d'outils",
        guides: "Guidage linéaire des axes"
      }
    }),
    hints: JSON.stringify([
      "La broche est en haut, elle tient l'outil",
      "La table se déplace en X et Y",
      "Le pupitre est l'interface opérateur"
    ]),
    xpReward: 75,
    order: 2
  },
  {
    title: "Origines machine et pièce",
    description: "Comprenez la différence entre origine machine et origine pièce",
    type: "troubleshooting",
    difficulty: "intermediate",
    instructions: JSON.stringify({
      steps: [
        "L'origine machine (M) est fixe, définie par les fins de course",
        "L'origine pièce (W) est définie par l'opérateur",
        "Calculez les coordonnées pièce à partir des coordonnées machine",
        "Le décalage est G54 à G59"
      ],
      objective: "Convertir entre coordonnées machine et pièce"
    }),
    solution: JSON.stringify({
      exercises: [
        { machine: { x: 100, y: 50, z: -20 }, offset: { x: 80, y: 30, z: 0 }, piece: { x: 20, y: 20, z: -20 } },
        { machine: { x: 150, y: 80, z: -30 }, offset: { x: 80, y: 30, z: 0 }, piece: { x: 70, y: 50, z: -30 } }
      ]
    }),
    hints: JSON.stringify([
      "Coordonnées pièce = Coordonnées machine - Décalage",
      "G54 contient le décalage d'origine pièce",
      "L'origine pièce est souvent sur un coin de la pièce"
    ]),
    xpReward: 125,
    order: 3
  }
]

export const module06ExerciseTranslations: {
  en: Record<string, ExerciseTranslation>
  es: Record<string, ExerciseTranslation>
} = {
  en: {
    "Identification des axes CNC": {
      title: "CNC Axis Identification",
      description: "Identify the X, Y and Z axes on a CNC milling machine",
      instructions: JSON.stringify({
        steps: [
          "Observe the CNC machine presented",
          "Identify the X axis (lateral movement)",
          "Identify the Y axis (forward/backward movement)",
          "Identify the Z axis (vertical movement)"
        ],
        objective: "Correctly associate each axis with its movement"
      }),
      hints: JSON.stringify([
        "X is usually the left/right movement",
        "Y is the movement toward/away from the operator",
        "Z is always the vertical movement (spindle)"
      ])
    },
    "Composants d'une CNC": {
      title: "CNC Components",
      description: "Identify the main components of a CNC machine",
      instructions: JSON.stringify({
        steps: [
          "Observe the CNC machine diagram",
          "Identify the spindle, table, and control panel",
          "Locate the tool changer and guides",
          "Associate each component with its function"
        ],
        objective: "Identify all main components"
      }),
      hints: JSON.stringify([
        "The spindle is at the top, holding the tool",
        "The table moves in X and Y",
        "The control panel is the operator interface"
      ])
    },
    "Origines machine et pièce": {
      title: "Machine and Work Origins",
      description: "Understand the difference between machine and work origins",
      instructions: JSON.stringify({
        steps: [
          "Machine origin (M) is fixed, defined by limit switches",
          "Work origin (W) is defined by the operator",
          "Calculate work coordinates from machine coordinates",
          "The offset is G54 to G59"
        ],
        objective: "Convert between machine and work coordinates"
      }),
      hints: JSON.stringify([
        "Work coordinates = Machine coordinates - Offset",
        "G54 contains the work origin offset",
        "Work origin is often on a corner of the workpiece"
      ])
    }
  },
  es: {
    "Identification des axes CNC": {
      title: "Identificación de ejes CNC",
      description: "Identifique los ejes X, Y y Z en una fresadora CNC",
      instructions: JSON.stringify({
        steps: [
          "Observe la máquina CNC presentada",
          "Identifique el eje X (movimiento lateral)",
          "Identifique el eje Y (movimiento adelante/atrás)",
          "Identifique el eje Z (movimiento vertical)"
        ],
        objective: "Asociar correctamente cada eje con su movimiento"
      }),
      hints: JSON.stringify([
        "X es generalmente el movimiento izquierda/derecha",
        "Y es el movimiento hacia/desde el operador",
        "Z es siempre el movimiento vertical (husillo)"
      ])
    },
    "Composants d'une CNC": {
      title: "Componentes de una CNC",
      description: "Identifique los componentes principales de una máquina CNC",
      instructions: JSON.stringify({
        steps: [
          "Observe el diagrama de la máquina CNC",
          "Identifique el husillo, la mesa y el panel de control",
          "Localice el cambiador de herramientas y las guías",
          "Asocie cada componente con su función"
        ],
        objective: "Identificar todos los componentes principales"
      }),
      hints: JSON.stringify([
        "El husillo está arriba, sostiene la herramienta",
        "La mesa se mueve en X e Y",
        "El panel de control es la interfaz del operador"
      ])
    },
    "Origines machine et pièce": {
      title: "Orígenes de máquina y pieza",
      description: "Comprenda la diferencia entre origen de máquina y origen de pieza",
      instructions: JSON.stringify({
        steps: [
          "El origen de máquina (M) es fijo, definido por los finales de carrera",
          "El origen de pieza (W) es definido por el operador",
          "Calcule las coordenadas de pieza a partir de las coordenadas de máquina",
          "El desplazamiento es G54 a G59"
        ],
        objective: "Convertir entre coordenadas de máquina y pieza"
      }),
      hints: JSON.stringify([
        "Coordenadas pieza = Coordenadas máquina - Desplazamiento",
        "G54 contiene el desplazamiento del origen de pieza",
        "El origen de pieza suele estar en una esquina de la pieza"
      ])
    }
  }
}
