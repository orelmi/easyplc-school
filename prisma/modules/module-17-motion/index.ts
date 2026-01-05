import type { ModuleData } from '../types.js'

export const module17Data: ModuleData = {
  // Module info
  moduleOrder: 17,
  moduleTitle: "Programmation du mouvement",
  moduleDescription: "Apprenez à programmer des trajectoires et profils de mouvement",
  moduleTranslations: {
    en: {
      title: "Motion Programming",
      description: "Learn to program trajectories and motion profiles"
    },
    es: {
      title: "Programación del Movimiento",
      description: "Aprenda a programar trayectorias y perfiles de movimiento"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Profils de mouvement",
      description: "Maîtrisez les profils de vitesse et d'accélération",
      order: 1,
      xpReward: 65,
      duration: 16,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Profils de mouvement\n\nLe profil de mouvement définit comment l'axe passe d'un point à un autre." },
          { type: "text", content: "## Types de profils\n\n- **Trapézoïdal** : Accélération constante, simple\n- **En S** : Jerk limité, plus doux\n- **Sinusoïdal** : Très doux, optimal pour certaines charges" },
          { type: "text", content: "## Paramètres du profil\n\n| Paramètre | Description | Unité |\n|-----------|-------------|-------|\n| Position | Point de destination | mm, degrés |\n| Vitesse max | Vitesse de croisière | mm/s |\n| Accélération | Montée en vitesse | mm/s² |\n| Jerk | Variation d'accélération | mm/s³ |" },
          { type: "info", content: "Un profil en S réduit les vibrations mécaniques et l'usure, particulièrement important pour les charges lourdes ou fragiles." }
        ]
      })
    },
    {
      title: "Mouvements absolus et relatifs",
      description: "Programmez des déplacements absolus et incrémentaux",
      order: 2,
      xpReward: 55,
      duration: 14,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Mouvements absolus et relatifs\n\nDeux façons de spécifier une destination de mouvement." },
          { type: "text", content: "## Mouvement absolu\n\n- La position cible est définie par rapport à l'origine\n- Exemple : \"Aller à la position 100 mm\"\n- Indépendant de la position actuelle" },
          { type: "text", content: "## Mouvement relatif (incrémental)\n\n- Le déplacement est défini par rapport à la position actuelle\n- Exemple : \"Avancer de 50 mm\"\n- Dépend de la position de départ" },
          { type: "text", content: "## Instructions typiques\n\n| Instruction | Type | Exemple |\n|-------------|------|--------|\n| MC_MoveAbsolute | Absolu | Aller à 200 mm |\n| MC_MoveRelative | Relatif | Avancer de 50 mm |\n| MC_MoveVelocity | Vitesse | Tourner à 1000 tr/min |" }
        ]
      })
    },
    {
      title: "Synchronisation d'axes",
      description: "Synchronisez plusieurs axes entre eux",
      order: 3,
      xpReward: 70,
      duration: 18,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Synchronisation d'axes\n\nLa synchronisation permet de coordonner plusieurs axes pour des mouvements complexes." },
          { type: "text", content: "## Types de synchronisation\n\n- **Engrenage électronique (gearing)** : Ratio fixe entre axes\n- **Came électronique (camming)** : Profil personnalisé\n- **Maître-esclave** : Un axe suit l'autre" },
          { type: "text", content: "## Applications\n\n| Application | Type de synchro |\n|-------------|----------------|\n| Convoyeur synchrone | Gearing |\n| Découpe à la volée | Camming |\n| Impression | Gearing + correction |\n| Emballage flow-pack | Camming |" },
          { type: "info", content: "L'engrenage électronique peut avoir un rapport variable (rampe d'embrayage) pour un accouplement progressif." }
        ]
      })
    },
    {
      title: "Interpolation multi-axes",
      description: "Programmez des trajectoires coordonnées",
      order: 4,
      xpReward: 75,
      duration: 20,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Interpolation multi-axes\n\nL'interpolation coordonne plusieurs axes pour des trajectoires fluides." },
          { type: "text", content: "## Types d'interpolation\n\n- **Linéaire** : Ligne droite entre deux points\n- **Circulaire** : Arc de cercle\n- **Hélicoïdale** : Combinaison linéaire + circulaire\n- **Spline** : Courbes complexes" },
          { type: "text", content: "## Exemple : Découpe\n\n```\nG01 X100 Y50 F1000  // Linéaire\nG02 X150 Y100 R50   // Arc horaire\nG03 X100 Y150 I-50  // Arc anti-horaire\n```" },
          { type: "warning", content: "La vitesse résultante sur la trajectoire doit être contrôlée pour respecter les limites de chaque axe individuel." }
        ]
      })
    },
    {
      title: "Blocs fonction PLCopen",
      description: "Utilisez les blocs standardisés PLCopen Motion",
      order: 5,
      xpReward: 65,
      duration: 16,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Blocs PLCopen Motion\n\nLa norme PLCopen définit des blocs fonctionnels standardisés pour le contrôle de mouvement." },
          { type: "text", content: "## Blocs de base\n\n| Bloc | Fonction |\n|------|----------|\n| MC_Power | Activer/désactiver l'axe |\n| MC_Home | Prise d'origine |\n| MC_MoveAbsolute | Mouvement absolu |\n| MC_MoveRelative | Mouvement relatif |\n| MC_Stop | Arrêt immédiat |\n| MC_Reset | Acquitter les défauts |" },
          { type: "text", content: "## Structure d'un bloc\n\n- **Entrées** : Execute, Position, Velocity, Acceleration\n- **Sorties** : Done, Busy, Error, ErrorID\n- **Axe** : Référence de l'axe concerné" },
          { type: "info", content: "L'utilisation des blocs PLCopen garantit une portabilité du code entre différents fabricants d'automates." }
        ]
      })
    },
    {
      title: "Diagnostic et optimisation",
      description: "Optimisez les performances de vos axes",
      order: 6,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Diagnostic et optimisation\n\nL'analyse des performances permet d'optimiser les temps de cycle et la qualité." },
          { type: "text", content: "## Outils de diagnostic\n\n- **Oscilloscope intégré** : Visualisation en temps réel\n- **Enregistrement** : Historique des mouvements\n- **FFT** : Analyse fréquentielle des vibrations" },
          { type: "text", content: "## Paramètres à surveiller\n\n| Paramètre | Optimal | Problème si |\n|-----------|---------|-------------|\n| Erreur de poursuite | < 1 mm | Croissante |\n| Courant moyen | < 80% nominal | > 100% |\n| Vibrations | Faibles | Résonance |" },
          { type: "text", content: "## Optimisation\n\n1. Ajuster les gains PID\n2. Réduire les jeux mécaniques\n3. Optimiser les profils de mouvement\n4. Vérifier l'alignement" }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Profils de mouvement": {
        title: "Motion Profiles",
        description: "Master velocity and acceleration profiles",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Motion Profiles\n\nThe motion profile defines how the axis moves from one point to another." },
            { type: "text", content: "## Profile Types\n\n- **Trapezoidal**: Constant acceleration, simple\n- **S-curve**: Limited jerk, smoother\n- **Sinusoidal**: Very smooth, optimal for certain loads" },
            { type: "text", content: "## Profile Parameters\n\n| Parameter | Description | Unit |\n|-----------|-------------|------|\n| Position | Destination point | mm, degrees |\n| Max velocity | Cruise speed | mm/s |\n| Acceleration | Speed ramp-up | mm/s\u00b2 |\n| Jerk | Acceleration variation | mm/s\u00b3 |" },
            { type: "info", content: "An S-curve profile reduces mechanical vibrations and wear, particularly important for heavy or fragile loads." }
          ]
        })
      },
      "Mouvements absolus et relatifs": {
        title: "Absolute and Relative Movements",
        description: "Program absolute and incremental movements",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Absolute and Relative Movements\n\nTwo ways to specify a motion destination." },
            { type: "text", content: "## Absolute Movement\n\n- Target position is defined relative to the origin\n- Example: \"Go to position 100 mm\"\n- Independent of current position" },
            { type: "text", content: "## Relative Movement (Incremental)\n\n- Displacement is defined relative to current position\n- Example: \"Move forward 50 mm\"\n- Depends on starting position" },
            { type: "text", content: "## Typical Instructions\n\n| Instruction | Type | Example |\n|-------------|------|--------|\n| MC_MoveAbsolute | Absolute | Go to 200 mm |\n| MC_MoveRelative | Relative | Move forward 50 mm |\n| MC_MoveVelocity | Velocity | Rotate at 1000 rpm |" }
          ]
        })
      },
      "Synchronisation d'axes": {
        title: "Axis Synchronization",
        description: "Synchronize multiple axes together",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Axis Synchronization\n\nSynchronization allows coordination of multiple axes for complex movements." },
            { type: "text", content: "## Types of Synchronization\n\n- **Electronic gearing**: Fixed ratio between axes\n- **Electronic camming**: Custom profile\n- **Master-slave**: One axis follows the other" },
            { type: "text", content: "## Applications\n\n| Application | Sync Type |\n|-------------|----------------|\n| Synchronous conveyor | Gearing |\n| Flying shear | Camming |\n| Printing | Gearing + correction |\n| Flow-pack packaging | Camming |" },
            { type: "info", content: "Electronic gearing can have a variable ratio (engagement ramp) for progressive coupling." }
          ]
        })
      },
      "Interpolation multi-axes": {
        title: "Multi-Axis Interpolation",
        description: "Program coordinated trajectories",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Multi-Axis Interpolation\n\nInterpolation coordinates multiple axes for smooth trajectories." },
            { type: "text", content: "## Types of Interpolation\n\n- **Linear**: Straight line between two points\n- **Circular**: Arc of a circle\n- **Helical**: Linear + circular combination\n- **Spline**: Complex curves" },
            { type: "text", content: "## Example: Cutting\n\n```\nG01 X100 Y50 F1000  // Linear\nG02 X150 Y100 R50   // Clockwise arc\nG03 X100 Y150 I-50  // Counter-clockwise arc\n```" },
            { type: "warning", content: "The resultant velocity on the trajectory must be controlled to respect the limits of each individual axis." }
          ]
        })
      },
      "Blocs fonction PLCopen": {
        title: "PLCopen Function Blocks",
        description: "Use standardized PLCopen Motion blocks",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# PLCopen Motion Blocks\n\nThe PLCopen standard defines standardized function blocks for motion control." },
            { type: "text", content: "## Basic Blocks\n\n| Block | Function |\n|------|----------|\n| MC_Power | Enable/disable axis |\n| MC_Home | Homing |\n| MC_MoveAbsolute | Absolute movement |\n| MC_MoveRelative | Relative movement |\n| MC_Stop | Immediate stop |\n| MC_Reset | Acknowledge faults |" },
            { type: "text", content: "## Block Structure\n\n- **Inputs**: Execute, Position, Velocity, Acceleration\n- **Outputs**: Done, Busy, Error, ErrorID\n- **Axis**: Reference of the concerned axis" },
            { type: "info", content: "Using PLCopen blocks guarantees code portability between different PLC manufacturers." }
          ]
        })
      },
      "Diagnostic et optimisation": {
        title: "Diagnostics and Optimization",
        description: "Optimize your axis performance",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Diagnostics and Optimization\n\nPerformance analysis allows optimization of cycle times and quality." },
            { type: "text", content: "## Diagnostic Tools\n\n- **Built-in oscilloscope**: Real-time visualization\n- **Recording**: Movement history\n- **FFT**: Frequency analysis of vibrations" },
            { type: "text", content: "## Parameters to Monitor\n\n| Parameter | Optimal | Problem if |\n|-----------|---------|-------------|\n| Following error | < 1 mm | Increasing |\n| Average current | < 80% nominal | > 100% |\n| Vibrations | Low | Resonance |" },
            { type: "text", content: "## Optimization\n\n1. Adjust PID gains\n2. Reduce mechanical backlash\n3. Optimize motion profiles\n4. Check alignment" }
          ]
        })
      }
    },
    es: {
      "Profils de mouvement": {
        title: "Perfiles de Movimiento",
        description: "Domine los perfiles de velocidad y aceleracion",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Perfiles de Movimiento\n\nEl perfil de movimiento define como el eje pasa de un punto a otro." },
            { type: "text", content: "## Tipos de Perfiles\n\n- **Trapezoidal**: Aceleracion constante, simple\n- **En S**: Jerk limitado, mas suave\n- **Sinusoidal**: Muy suave, optimo para ciertas cargas" },
            { type: "text", content: "## Parametros del Perfil\n\n| Parametro | Descripcion | Unidad |\n|-----------|-------------|--------|\n| Posicion | Punto de destino | mm, grados |\n| Velocidad max | Velocidad de crucero | mm/s |\n| Aceleracion | Rampa de velocidad | mm/s\u00b2 |\n| Jerk | Variacion de aceleracion | mm/s\u00b3 |" },
            { type: "info", content: "Un perfil en S reduce las vibraciones mecanicas y el desgaste, particularmente importante para cargas pesadas o fragiles." }
          ]
        })
      },
      "Mouvements absolus et relatifs": {
        title: "Movimientos Absolutos y Relativos",
        description: "Programe desplazamientos absolutos e incrementales",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Movimientos Absolutos y Relativos\n\nDos formas de especificar un destino de movimiento." },
            { type: "text", content: "## Movimiento Absoluto\n\n- La posicion objetivo se define respecto al origen\n- Ejemplo: \"Ir a la posicion 100 mm\"\n- Independiente de la posicion actual" },
            { type: "text", content: "## Movimiento Relativo (Incremental)\n\n- El desplazamiento se define respecto a la posicion actual\n- Ejemplo: \"Avanzar 50 mm\"\n- Depende de la posicion de partida" },
            { type: "text", content: "## Instrucciones Tipicas\n\n| Instruccion | Tipo | Ejemplo |\n|-------------|------|--------|\n| MC_MoveAbsolute | Absoluto | Ir a 200 mm |\n| MC_MoveRelative | Relativo | Avanzar 50 mm |\n| MC_MoveVelocity | Velocidad | Girar a 1000 rpm |" }
          ]
        })
      },
      "Synchronisation d'axes": {
        title: "Sincronizacion de Ejes",
        description: "Sincronice multiples ejes entre si",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Sincronizacion de Ejes\n\nLa sincronizacion permite coordinar multiples ejes para movimientos complejos." },
            { type: "text", content: "## Tipos de Sincronizacion\n\n- **Engranaje electronico (gearing)**: Relacion fija entre ejes\n- **Leva electronica (camming)**: Perfil personalizado\n- **Maestro-esclavo**: Un eje sigue al otro" },
            { type: "text", content: "## Aplicaciones\n\n| Aplicacion | Tipo de sincro |\n|-------------|----------------|\n| Transportador sincrono | Gearing |\n| Corte al vuelo | Camming |\n| Impresion | Gearing + correccion |\n| Embalaje flow-pack | Camming |" },
            { type: "info", content: "El engranaje electronico puede tener una relacion variable (rampa de acoplamiento) para un acoplamiento progresivo." }
          ]
        })
      },
      "Interpolation multi-axes": {
        title: "Interpolacion Multi-ejes",
        description: "Programe trayectorias coordinadas",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Interpolacion Multi-ejes\n\nLa interpolacion coordina multiples ejes para trayectorias fluidas." },
            { type: "text", content: "## Tipos de Interpolacion\n\n- **Lineal**: Linea recta entre dos puntos\n- **Circular**: Arco de circulo\n- **Helicoidal**: Combinacion lineal + circular\n- **Spline**: Curvas complejas" },
            { type: "text", content: "## Ejemplo: Corte\n\n```\nG01 X100 Y50 F1000  // Lineal\nG02 X150 Y100 R50   // Arco horario\nG03 X100 Y150 I-50  // Arco antihorario\n```" },
            { type: "warning", content: "La velocidad resultante en la trayectoria debe controlarse para respetar los limites de cada eje individual." }
          ]
        })
      },
      "Blocs fonction PLCopen": {
        title: "Bloques de Funcion PLCopen",
        description: "Utilice los bloques estandarizados PLCopen Motion",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Bloques PLCopen Motion\n\nEl estandar PLCopen define bloques funcionales estandarizados para el control de movimiento." },
            { type: "text", content: "## Bloques Basicos\n\n| Bloque | Funcion |\n|------|----------|\n| MC_Power | Activar/desactivar eje |\n| MC_Home | Busqueda de origen |\n| MC_MoveAbsolute | Movimiento absoluto |\n| MC_MoveRelative | Movimiento relativo |\n| MC_Stop | Parada inmediata |\n| MC_Reset | Reconocer fallos |" },
            { type: "text", content: "## Estructura de un Bloque\n\n- **Entradas**: Execute, Position, Velocity, Acceleration\n- **Salidas**: Done, Busy, Error, ErrorID\n- **Eje**: Referencia del eje concernido" },
            { type: "info", content: "El uso de bloques PLCopen garantiza la portabilidad del codigo entre diferentes fabricantes de PLCs." }
          ]
        })
      },
      "Diagnostic et optimisation": {
        title: "Diagnostico y Optimizacion",
        description: "Optimice el rendimiento de sus ejes",
        content: JSON.stringify({
          sections: [
            { type: "text", content: "# Diagnostico y Optimizacion\n\nEl analisis de rendimiento permite optimizar los tiempos de ciclo y la calidad." },
            { type: "text", content: "## Herramientas de Diagnostico\n\n- **Osciloscopio integrado**: Visualizacion en tiempo real\n- **Grabacion**: Historial de movimientos\n- **FFT**: Analisis frecuencial de vibraciones" },
            { type: "text", content: "## Parametros a Monitorear\n\n| Parametro | Optimo | Problema si |\n|-----------|---------|-------------|\n| Error de seguimiento | < 1 mm | Creciente |\n| Corriente media | < 80% nominal | > 100% |\n| Vibraciones | Bajas | Resonancia |" },
            { type: "text", content: "## Optimizacion\n\n1. Ajustar ganancias PID\n2. Reducir holguras mecanicas\n3. Optimizar perfiles de movimiento\n4. Verificar alineacion" }
          ]
        })
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Profils de mouvement
    [
      { question: "Quel profil est le plus doux mécaniquement ?", options: ["Trapézoïdal", "En S", "Carré", "Linéaire"], correctIndex: 1, explanation: "Le profil en S limite le jerk (variation d'accélération) pour un mouvement plus doux.", order: 1 },
      { question: "Qu'est-ce que le jerk ?", options: ["La vitesse", "L'accélération", "La variation d'accélération", "La position"], correctIndex: 2, explanation: "Le jerk est la dérivée de l'accélération, exprimé en mm/s³ ou m/s³.", order: 2 },
      { question: "Quel profil est le plus simple à calculer ?", options: ["En S", "Sinusoïdal", "Trapézoïdal", "Polynomial"], correctIndex: 2, explanation: "Le profil trapézoïdal avec accélération constante est le plus simple.", order: 3 },
      { question: "Pourquoi limiter le jerk ?", options: ["Économie d'énergie", "Réduire les vibrations et l'usure", "Augmenter la vitesse", "Simplifier le calcul"], correctIndex: 1, explanation: "Un jerk limité réduit les chocs mécaniques, les vibrations et l'usure.", order: 4 },
      { question: "Quels paramètres définissent un profil trapézoïdal ?", options: ["Position uniquement", "Position, vitesse, accélération", "Vitesse uniquement", "Jerk uniquement"], correctIndex: 1, explanation: "Position cible, vitesse de croisière et accélération définissent le trapèze.", order: 5 }
    ],
    // Lesson 2: Mouvements absolus et relatifs
    [
      { question: "Un mouvement absolu de 100mm depuis la position 50mm amène à ?", options: ["50mm", "100mm", "150mm", "0mm"], correctIndex: 1, explanation: "Un mouvement absolu va à la position spécifiée : 100mm.", order: 1 },
      { question: "Un mouvement relatif de 100mm depuis la position 50mm amène à ?", options: ["50mm", "100mm", "150mm", "0mm"], correctIndex: 2, explanation: "Un mouvement relatif ajoute le déplacement à la position actuelle : 50+100=150mm.", order: 2 },
      { question: "Quelle instruction PLCopen pour un mouvement absolu ?", options: ["MC_MoveRelative", "MC_MoveAbsolute", "MC_MoveVelocity", "MC_Home"], correctIndex: 1, explanation: "MC_MoveAbsolute effectue un mouvement vers une position absolue.", order: 3 },
      { question: "MC_MoveVelocity fait quoi ?", options: ["Mouvement à position", "Mouvement à vitesse constante sans position cible", "Prise d'origine", "Arrêt"], correctIndex: 1, explanation: "MC_MoveVelocity maintient une vitesse constante sans destination précise.", order: 4 },
      { question: "Quel type de mouvement pour un convoyeur continu ?", options: ["Absolu", "Relatif", "Vitesse (velocity)", "Homing"], correctIndex: 2, explanation: "Un convoyeur tourne à vitesse constante sans position cible, donc mode velocity.", order: 5 }
    ],
    // Lesson 3: Synchronisation d'axes
    [
      { question: "Qu'est-ce qu'un engrenage électronique ?", options: ["Un réducteur", "Un rapport de transmission virtuel entre axes", "Un codeur", "Un type de moteur"], correctIndex: 1, explanation: "L'engrenage électronique lie deux axes avec un rapport de vitesse fixe.", order: 1 },
      { question: "La came électronique permet ?", options: ["Un rapport fixe", "Un profil de synchronisation personnalisé", "Plus de vitesse", "Moins de consommation"], correctIndex: 1, explanation: "La came électronique définit un profil position/position personnalisé entre axes.", order: 2 },
      { question: "Pour une découpe à la volée, quel type de synchro ?", options: ["Gearing simple", "Camming", "Aucune", "Mode velocity"], correctIndex: 1, explanation: "La découpe à la volée nécessite un profil de came pour synchroniser avec le produit.", order: 3 },
      { question: "Qu'est-ce que la rampe d'embrayage ?", options: ["Freinage d'urgence", "Accouplement progressif au maître", "Accélération maximum", "Type de moteur"], correctIndex: 1, explanation: "La rampe d'embrayage permet un accouplement progressif de l'esclave au maître.", order: 4 },
      { question: "Dans un système maître-esclave, qui définit le mouvement ?", options: ["L'esclave", "Le maître", "Les deux également", "L'automate uniquement"], correctIndex: 1, explanation: "Le maître définit le mouvement, l'esclave le suit selon la relation définie.", order: 5 }
    ],
    // Lesson 4: Interpolation multi-axes
    [
      { question: "L'interpolation linéaire produit ?", options: ["Un arc de cercle", "Une ligne droite", "Une spirale", "Un point"], correctIndex: 1, explanation: "L'interpolation linéaire coordonne les axes pour une trajectoire en ligne droite.", order: 1 },
      { question: "Quel code G pour un arc horaire ?", options: ["G00", "G01", "G02", "G03"], correctIndex: 2, explanation: "G02 commande un arc de cercle dans le sens horaire.", order: 2 },
      { question: "Qu'est-ce qu'une interpolation hélicoïdale ?", options: ["Un cercle", "Un cercle + mouvement linéaire", "Une ligne", "Un point"], correctIndex: 1, explanation: "L'hélice combine un mouvement circulaire dans un plan avec un mouvement linéaire perpendiculaire.", order: 3 },
      { question: "Pourquoi contrôler la vitesse résultante ?", options: ["Pour le bruit", "Pour ne pas dépasser les limites des axes individuels", "Pour économiser", "Ce n'est pas nécessaire"], correctIndex: 1, explanation: "La vitesse sur la trajectoire doit respecter les capacités de chaque axe.", order: 4 },
      { question: "Pour des courbes complexes, quel type d'interpolation ?", options: ["Linéaire", "Circulaire", "Spline", "Aucune"], correctIndex: 2, explanation: "Les splines permettent des courbes complexes avec continuité de courbure.", order: 5 }
    ],
    // Lesson 5: Blocs fonction PLCopen
    [
      { question: "Que fait MC_Power ?", options: ["Coupe l'alimentation", "Active/désactive l'axe", "Fait un mouvement", "Reset les défauts"], correctIndex: 1, explanation: "MC_Power active ou désactive le contrôle de l'axe.", order: 1 },
      { question: "Quelle sortie indique la fin du mouvement ?", options: ["Busy", "Done", "Error", "Active"], correctIndex: 1, explanation: "La sortie Done passe à TRUE quand le mouvement est terminé.", order: 2 },
      { question: "Que signifie Busy = TRUE ?", options: ["Erreur", "Mouvement en cours", "Terminé", "En attente"], correctIndex: 1, explanation: "Busy à TRUE indique que le bloc est en train d'exécuter son mouvement.", order: 3 },
      { question: "Quel avantage de la norme PLCopen ?", options: ["Code plus rapide", "Portabilité entre fabricants", "Moins cher", "Plus de puissance"], correctIndex: 1, explanation: "Les blocs PLCopen standardisés facilitent la migration entre différents automates.", order: 4 },
      { question: "MC_Reset sert à ?", options: ["Réinitialiser la position", "Acquitter les défauts", "Arrêter le mouvement", "Calibrer le codeur"], correctIndex: 1, explanation: "MC_Reset acquitte les erreurs de l'axe pour permettre de nouveaux mouvements.", order: 5 }
    ],
    // Lesson 6: Diagnostic et optimisation
    [
      { question: "Qu'est-ce que l'erreur de poursuite ?", options: ["Erreur de communication", "Écart entre position commandée et réelle", "Défaut moteur", "Erreur de programme"], correctIndex: 1, explanation: "L'erreur de poursuite (following error) est l'écart entre consigne et position réelle.", order: 1 },
      { question: "Que permet l'analyse FFT ?", options: ["Mesurer la vitesse", "Détecter les fréquences de vibration", "Calculer le couple", "Programmer le mouvement"], correctIndex: 1, explanation: "La FFT (Fast Fourier Transform) identifie les fréquences de vibration problématiques.", order: 2 },
      { question: "Une erreur de poursuite croissante indique ?", options: ["Fonctionnement normal", "Problème de réglage ou mécanique", "Vitesse trop basse", "Rien de particulier"], correctIndex: 1, explanation: "Une erreur croissante signale un problème de gains, friction ou charge excessive.", order: 3 },
      { question: "Comment réduire les vibrations ?", options: ["Augmenter les gains", "Ajuster les gains et vérifier la mécanique", "Augmenter la vitesse", "Ignorer"], correctIndex: 1, explanation: "Les vibrations peuvent être dues à des gains trop élevés ou des problèmes mécaniques.", order: 4 },
      { question: "À quoi sert l'oscilloscope intégré ?", options: ["Mesurer la tension secteur", "Visualiser les signaux en temps réel", "Programmer", "Communiquer"], correctIndex: 1, explanation: "L'oscilloscope intégré permet de visualiser courant, vitesse, position en temps réel.", order: 5 }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      "Quel profil est le plus doux mécaniquement ?": {
        question: "Which profile is mechanically smoothest?",
        options: ["Trapezoidal", "S-curve", "Square", "Linear"],
        explanation: "The S-curve profile limits jerk (acceleration variation) for smoother motion."
      },
      "Qu'est-ce que le jerk ?": {
        question: "What is jerk?",
        options: ["Velocity", "Acceleration", "Rate of change of acceleration", "Position"],
        explanation: "Jerk is the derivative of acceleration, expressed in mm/s\u00b3 or m/s\u00b3."
      },
      "Quel profil est le plus simple à calculer ?": {
        question: "Which profile is simplest to calculate?",
        options: ["S-curve", "Sinusoidal", "Trapezoidal", "Polynomial"],
        explanation: "The trapezoidal profile with constant acceleration is the simplest."
      },
      "Pourquoi limiter le jerk ?": {
        question: "Why limit jerk?",
        options: ["Energy savings", "Reduce vibrations and wear", "Increase speed", "Simplify calculation"],
        explanation: "Limited jerk reduces mechanical shocks, vibrations, and wear."
      },
      "Quels paramètres définissent un profil trapézoïdal ?": {
        question: "What parameters define a trapezoidal profile?",
        options: ["Position only", "Position, velocity, acceleration", "Velocity only", "Jerk only"],
        explanation: "Target position, cruise velocity, and acceleration define the trapezoid."
      },
      "Un mouvement absolu de 100mm depuis la position 50mm amène à ?": {
        question: "An absolute movement of 100mm from position 50mm goes to?",
        options: ["50mm", "100mm", "150mm", "0mm"],
        explanation: "An absolute movement goes to the specified position: 100mm."
      },
      "Un mouvement relatif de 100mm depuis la position 50mm amène à ?": {
        question: "A relative movement of 100mm from position 50mm goes to?",
        options: ["50mm", "100mm", "150mm", "0mm"],
        explanation: "A relative movement adds the displacement to current position: 50+100=150mm."
      },
      "Quelle instruction PLCopen pour un mouvement absolu ?": {
        question: "Which PLCopen instruction for an absolute movement?",
        options: ["MC_MoveRelative", "MC_MoveAbsolute", "MC_MoveVelocity", "MC_Home"],
        explanation: "MC_MoveAbsolute performs a movement to an absolute position."
      },
      "MC_MoveVelocity fait quoi ?": {
        question: "What does MC_MoveVelocity do?",
        options: ["Position movement", "Constant velocity movement without target position", "Homing", "Stop"],
        explanation: "MC_MoveVelocity maintains constant velocity without a specific destination."
      },
      "Quel type de mouvement pour un convoyeur continu ?": {
        question: "What type of movement for a continuous conveyor?",
        options: ["Absolute", "Relative", "Velocity", "Homing"],
        explanation: "A conveyor runs at constant velocity without a target position, so velocity mode."
      },
      "Qu'est-ce qu'un engrenage électronique ?": {
        question: "What is electronic gearing?",
        options: ["A gearbox", "A virtual transmission ratio between axes", "An encoder", "A motor type"],
        explanation: "Electronic gearing links two axes with a fixed velocity ratio."
      },
      "La came électronique permet ?": {
        question: "Electronic camming allows?",
        options: ["A fixed ratio", "A custom synchronization profile", "More speed", "Less consumption"],
        explanation: "Electronic camming defines a custom position/position profile between axes."
      },
      "Pour une découpe à la volée, quel type de synchro ?": {
        question: "For flying shear, what type of sync?",
        options: ["Simple gearing", "Camming", "None", "Velocity mode"],
        explanation: "Flying shear requires a cam profile to synchronize with the product."
      },
      "Qu'est-ce que la rampe d'embrayage ?": {
        question: "What is the engagement ramp?",
        options: ["Emergency braking", "Progressive coupling to master", "Maximum acceleration", "Motor type"],
        explanation: "The engagement ramp allows progressive coupling of slave to master."
      },
      "Dans un système maître-esclave, qui définit le mouvement ?": {
        question: "In a master-slave system, who defines the motion?",
        options: ["The slave", "The master", "Both equally", "The PLC only"],
        explanation: "The master defines the motion, the slave follows according to the defined relationship."
      },
      "L'interpolation linéaire produit ?": {
        question: "Linear interpolation produces?",
        options: ["An arc", "A straight line", "A spiral", "A point"],
        explanation: "Linear interpolation coordinates axes for a straight-line trajectory."
      },
      "Quel code G pour un arc horaire ?": {
        question: "Which G code for a clockwise arc?",
        options: ["G00", "G01", "G02", "G03"],
        explanation: "G02 commands a clockwise arc."
      },
      "Qu'est-ce qu'une interpolation hélicoïdale ?": {
        question: "What is helical interpolation?",
        options: ["A circle", "A circle + linear movement", "A line", "A point"],
        explanation: "A helix combines circular movement in one plane with perpendicular linear movement."
      },
      "Pourquoi contrôler la vitesse résultante ?": {
        question: "Why control the resultant velocity?",
        options: ["For noise", "To not exceed individual axis limits", "To save money", "It's not necessary"],
        explanation: "The velocity on the trajectory must respect each axis's capabilities."
      },
      "Pour des courbes complexes, quel type d'interpolation ?": {
        question: "For complex curves, what type of interpolation?",
        options: ["Linear", "Circular", "Spline", "None"],
        explanation: "Splines allow complex curves with curvature continuity."
      },
      "Que fait MC_Power ?": {
        question: "What does MC_Power do?",
        options: ["Cuts power", "Enables/disables the axis", "Makes a movement", "Resets faults"],
        explanation: "MC_Power enables or disables axis control."
      },
      "Quelle sortie indique la fin du mouvement ?": {
        question: "Which output indicates end of movement?",
        options: ["Busy", "Done", "Error", "Active"],
        explanation: "The Done output goes TRUE when the movement is complete."
      },
      "Que signifie Busy = TRUE ?": {
        question: "What does Busy = TRUE mean?",
        options: ["Error", "Movement in progress", "Completed", "Waiting"],
        explanation: "Busy at TRUE indicates the block is executing its movement."
      },
      "Quel avantage de la norme PLCopen ?": {
        question: "What advantage of the PLCopen standard?",
        options: ["Faster code", "Portability between manufacturers", "Cheaper", "More power"],
        explanation: "Standardized PLCopen blocks facilitate migration between different PLCs."
      },
      "MC_Reset sert à ?": {
        question: "MC_Reset is used to?",
        options: ["Reset position", "Acknowledge faults", "Stop movement", "Calibrate encoder"],
        explanation: "MC_Reset acknowledges axis errors to allow new movements."
      },
      "Qu'est-ce que l'erreur de poursuite ?": {
        question: "What is following error?",
        options: ["Communication error", "Difference between commanded and actual position", "Motor fault", "Program error"],
        explanation: "Following error is the difference between setpoint and actual position."
      },
      "Que permet l'analyse FFT ?": {
        question: "What does FFT analysis allow?",
        options: ["Measure velocity", "Detect vibration frequencies", "Calculate torque", "Program motion"],
        explanation: "FFT (Fast Fourier Transform) identifies problematic vibration frequencies."
      },
      "Une erreur de poursuite croissante indique ?": {
        question: "An increasing following error indicates?",
        options: ["Normal operation", "Tuning or mechanical problem", "Speed too low", "Nothing particular"],
        explanation: "An increasing error signals a problem with gains, friction, or excessive load."
      },
      "Comment réduire les vibrations ?": {
        question: "How to reduce vibrations?",
        options: ["Increase gains", "Adjust gains and check mechanics", "Increase speed", "Ignore"],
        explanation: "Vibrations can be due to gains too high or mechanical problems."
      },
      "À quoi sert l'oscilloscope intégré ?": {
        question: "What is the built-in oscilloscope for?",
        options: ["Measure mains voltage", "Visualize signals in real-time", "Program", "Communicate"],
        explanation: "The built-in oscilloscope allows visualization of current, velocity, position in real-time."
      }
    },
    es: {
      "Quel profil est le plus doux mécaniquement ?": {
        question: "Cual perfil es mecanicamente mas suave?",
        options: ["Trapezoidal", "En S", "Cuadrado", "Lineal"],
        explanation: "El perfil en S limita el jerk (variacion de aceleracion) para un movimiento mas suave."
      },
      "Qu'est-ce que le jerk ?": {
        question: "Que es el jerk?",
        options: ["La velocidad", "La aceleracion", "La variacion de aceleracion", "La posicion"],
        explanation: "El jerk es la derivada de la aceleracion, expresado en mm/s\u00b3 o m/s\u00b3."
      },
      "Quel profil est le plus simple à calculer ?": {
        question: "Cual perfil es el mas simple de calcular?",
        options: ["En S", "Sinusoidal", "Trapezoidal", "Polinomial"],
        explanation: "El perfil trapezoidal con aceleracion constante es el mas simple."
      },
      "Pourquoi limiter le jerk ?": {
        question: "Por que limitar el jerk?",
        options: ["Ahorro de energia", "Reducir vibraciones y desgaste", "Aumentar velocidad", "Simplificar calculo"],
        explanation: "Un jerk limitado reduce los choques mecanicos, vibraciones y desgaste."
      },
      "Quels paramètres définissent un profil trapézoïdal ?": {
        question: "Que parametros definen un perfil trapezoidal?",
        options: ["Solo posicion", "Posicion, velocidad, aceleracion", "Solo velocidad", "Solo jerk"],
        explanation: "Posicion objetivo, velocidad de crucero y aceleracion definen el trapecio."
      },
      "Un mouvement absolu de 100mm depuis la position 50mm amène à ?": {
        question: "Un movimiento absoluto de 100mm desde la posicion 50mm lleva a?",
        options: ["50mm", "100mm", "150mm", "0mm"],
        explanation: "Un movimiento absoluto va a la posicion especificada: 100mm."
      },
      "Un mouvement relatif de 100mm depuis la position 50mm amène à ?": {
        question: "Un movimiento relativo de 100mm desde la posicion 50mm lleva a?",
        options: ["50mm", "100mm", "150mm", "0mm"],
        explanation: "Un movimiento relativo suma el desplazamiento a la posicion actual: 50+100=150mm."
      },
      "Quelle instruction PLCopen pour un mouvement absolu ?": {
        question: "Cual instruccion PLCopen para un movimiento absoluto?",
        options: ["MC_MoveRelative", "MC_MoveAbsolute", "MC_MoveVelocity", "MC_Home"],
        explanation: "MC_MoveAbsolute efectua un movimiento hacia una posicion absoluta."
      },
      "MC_MoveVelocity fait quoi ?": {
        question: "Que hace MC_MoveVelocity?",
        options: ["Movimiento a posicion", "Movimiento a velocidad constante sin posicion objetivo", "Busqueda de origen", "Parada"],
        explanation: "MC_MoveVelocity mantiene una velocidad constante sin destino preciso."
      },
      "Quel type de mouvement pour un convoyeur continu ?": {
        question: "Que tipo de movimiento para un transportador continuo?",
        options: ["Absoluto", "Relativo", "Velocidad", "Homing"],
        explanation: "Un transportador gira a velocidad constante sin posicion objetivo, por lo tanto modo velocidad."
      },
      "Qu'est-ce qu'un engrenage électronique ?": {
        question: "Que es un engranaje electronico?",
        options: ["Un reductor", "Una relacion de transmision virtual entre ejes", "Un codificador", "Un tipo de motor"],
        explanation: "El engranaje electronico vincula dos ejes con una relacion de velocidad fija."
      },
      "La came électronique permet ?": {
        question: "La leva electronica permite?",
        options: ["Una relacion fija", "Un perfil de sincronizacion personalizado", "Mas velocidad", "Menos consumo"],
        explanation: "La leva electronica define un perfil posicion/posicion personalizado entre ejes."
      },
      "Pour une découpe à la volée, quel type de synchro ?": {
        question: "Para un corte al vuelo, que tipo de sincro?",
        options: ["Gearing simple", "Camming", "Ninguna", "Modo velocidad"],
        explanation: "El corte al vuelo necesita un perfil de leva para sincronizar con el producto."
      },
      "Qu'est-ce que la rampe d'embrayage ?": {
        question: "Que es la rampa de acoplamiento?",
        options: ["Frenado de emergencia", "Acoplamiento progresivo al maestro", "Aceleracion maxima", "Tipo de motor"],
        explanation: "La rampa de acoplamiento permite un acoplamiento progresivo del esclavo al maestro."
      },
      "Dans un système maître-esclave, qui définit le mouvement ?": {
        question: "En un sistema maestro-esclavo, quien define el movimiento?",
        options: ["El esclavo", "El maestro", "Ambos igualmente", "Solo el PLC"],
        explanation: "El maestro define el movimiento, el esclavo lo sigue segun la relacion definida."
      },
      "L'interpolation linéaire produit ?": {
        question: "La interpolacion lineal produce?",
        options: ["Un arco de circulo", "Una linea recta", "Una espiral", "Un punto"],
        explanation: "La interpolacion lineal coordina los ejes para una trayectoria en linea recta."
      },
      "Quel code G pour un arc horaire ?": {
        question: "Cual codigo G para un arco horario?",
        options: ["G00", "G01", "G02", "G03"],
        explanation: "G02 comanda un arco de circulo en sentido horario."
      },
      "Qu'est-ce qu'une interpolation hélicoïdale ?": {
        question: "Que es una interpolacion helicoidal?",
        options: ["Un circulo", "Un circulo + movimiento lineal", "Una linea", "Un punto"],
        explanation: "La helice combina un movimiento circular en un plano con un movimiento lineal perpendicular."
      },
      "Pourquoi contrôler la vitesse résultante ?": {
        question: "Por que controlar la velocidad resultante?",
        options: ["Por el ruido", "Para no superar los limites de los ejes individuales", "Para ahorrar", "No es necesario"],
        explanation: "La velocidad en la trayectoria debe respetar las capacidades de cada eje."
      },
      "Pour des courbes complexes, quel type d'interpolation ?": {
        question: "Para curvas complejas, que tipo de interpolacion?",
        options: ["Lineal", "Circular", "Spline", "Ninguna"],
        explanation: "Los splines permiten curvas complejas con continuidad de curvatura."
      },
      "Que fait MC_Power ?": {
        question: "Que hace MC_Power?",
        options: ["Corta la alimentacion", "Activa/desactiva el eje", "Hace un movimiento", "Resetea los fallos"],
        explanation: "MC_Power activa o desactiva el control del eje."
      },
      "Quelle sortie indique la fin du mouvement ?": {
        question: "Cual salida indica el fin del movimiento?",
        options: ["Busy", "Done", "Error", "Active"],
        explanation: "La salida Done pasa a TRUE cuando el movimiento ha terminado."
      },
      "Que signifie Busy = TRUE ?": {
        question: "Que significa Busy = TRUE?",
        options: ["Error", "Movimiento en curso", "Terminado", "En espera"],
        explanation: "Busy a TRUE indica que el bloque esta ejecutando su movimiento."
      },
      "Quel avantage de la norme PLCopen ?": {
        question: "Cual es la ventaja del estandar PLCopen?",
        options: ["Codigo mas rapido", "Portabilidad entre fabricantes", "Mas barato", "Mas potencia"],
        explanation: "Los bloques PLCopen estandarizados facilitan la migracion entre diferentes PLCs."
      },
      "MC_Reset sert à ?": {
        question: "MC_Reset sirve para?",
        options: ["Reiniciar la posicion", "Reconocer los fallos", "Detener el movimiento", "Calibrar el codificador"],
        explanation: "MC_Reset reconoce los errores del eje para permitir nuevos movimientos."
      },
      "Qu'est-ce que l'erreur de poursuite ?": {
        question: "Que es el error de seguimiento?",
        options: ["Error de comunicacion", "Diferencia entre posicion comandada y real", "Fallo de motor", "Error de programa"],
        explanation: "El error de seguimiento (following error) es la diferencia entre consigna y posicion real."
      },
      "Que permet l'analyse FFT ?": {
        question: "Que permite el analisis FFT?",
        options: ["Medir la velocidad", "Detectar frecuencias de vibracion", "Calcular el par", "Programar el movimiento"],
        explanation: "La FFT (Fast Fourier Transform) identifica las frecuencias de vibracion problematicas."
      },
      "Une erreur de poursuite croissante indique ?": {
        question: "Un error de seguimiento creciente indica?",
        options: ["Funcionamiento normal", "Problema de ajuste o mecanico", "Velocidad demasiado baja", "Nada en particular"],
        explanation: "Un error creciente senala un problema de ganancias, friccion o carga excesiva."
      },
      "Comment réduire les vibrations ?": {
        question: "Como reducir las vibraciones?",
        options: ["Aumentar las ganancias", "Ajustar las ganancias y verificar la mecanica", "Aumentar la velocidad", "Ignorar"],
        explanation: "Las vibraciones pueden deberse a ganancias demasiado altas o problemas mecanicos."
      },
      "À quoi sert l'oscilloscope intégré ?": {
        question: "Para que sirve el osciloscopio integrado?",
        options: ["Medir la tension de red", "Visualizar senales en tiempo real", "Programar", "Comunicar"],
        explanation: "El osciloscopio integrado permite visualizar corriente, velocidad, posicion en tiempo real."
      }
    }
  }
}
