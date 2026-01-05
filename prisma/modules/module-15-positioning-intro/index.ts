import type { ModuleData } from '../types.js'

export const module15Data: ModuleData = {
  // Module info
  moduleOrder: 15,
  moduleTitle: "Introduction au positionnement",
  moduleDescription: "Découvrez les bases du contrôle de mouvement et du positionnement",
  moduleTranslations: {
    en: {
      title: "Introduction to Positioning",
      description: "Discover the basics of motion control and positioning"
    },
    es: {
      title: "Introducción al Posicionamiento",
      description: "Descubra las bases del control de movimiento y posicionamiento"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Principes du contrôle de mouvement",
      description: "Découvrez les fondamentaux du motion control",
      order: 1,
      xpReward: 55,
      duration: 14,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Introduction au contrôle de mouvement\n\nLe **motion control** ou contrôle de mouvement est la discipline qui permet de positionner précisément des éléments mécaniques." },
          { type: "text", content: "## Applications\n\n- **Robotique** : Bras manipulateurs\n- **Emballage** : Remplissage, étiquetage\n- **Usinage** : CNC, découpe laser\n- **Manutention** : Pick & place\n- **Impression** : Rotatives, jet d'encre" },
          { type: "text", content: "## Composants d'un système\n\n1. **Contrôleur** : Calcule les trajectoires\n2. **Drive (servo-variateur)** : Alimente le moteur\n3. **Moteur** : Convertit l'énergie électrique en mouvement\n4. **Retour position** : Codeur, règle optique" }
        ]
      })
    },
    {
      title: "Notions de mécanique",
      description: "Comprenez les concepts mécaniques essentiels",
      order: 2,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Notions de mécanique\n\nLa compréhension de la mécanique est essentielle pour dimensionner un système de positionnement." },
          { type: "text", content: "## Grandeurs fondamentales\n\n- **Position** : Où se trouve l'axe (mm, degrés)\n- **Vitesse** : Rapidité du déplacement (mm/s, tr/min)\n- **Accélération** : Variation de vitesse (m/s²)\n- **Couple** : Force de rotation (Nm)\n- **Inertie** : Résistance au changement de vitesse (kg.m²)" },
          { type: "text", content: "## Transmission mécanique\n\n| Type | Précision | Vitesse |\n|------|-----------|--------|\n| Vis à billes | Très haute | Moyenne |\n| Crémaillère | Haute | Haute |\n| Courroie | Moyenne | Très haute |\n| Entraînement direct | Maximale | Maximale |" }
        ]
      })
    },
    {
      title: "Codeurs et capteurs de position",
      description: "Maîtrisez les capteurs de position",
      order: 3,
      xpReward: 65,
      duration: 16,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Codeurs et capteurs de position\n\nLa mesure précise de la position est la clé du contrôle de mouvement." },
          { type: "text", content: "## Types de codeurs\n\n- **Incrémental** : Compte les impulsions, nécessite prise d'origine\n- **Absolu mono-tour** : Position absolue sur un tour\n- **Absolu multi-tours** : Position absolue sur plusieurs tours" },
          { type: "text", content: "## Caractéristiques\n\n| Paramètre | Description |\n|-----------|-------------|\n| Résolution | Points par tour (PPR) |\n| Précision | Erreur de mesure |\n| Répétabilité | Constance des mesures |\n| Vitesse max | Fréquence maximale |" },
          { type: "info", content: "Un codeur 17 bits offre une résolution de 131 072 points par tour, soit une précision de 0.0027°." }
        ]
      })
    },
    {
      title: "Boucles de régulation",
      description: "Comprenez les boucles de contrôle position/vitesse/courant",
      order: 4,
      xpReward: 70,
      duration: 18,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Boucles de régulation\n\nLe contrôle de mouvement utilise des boucles de régulation imbriquées." },
          { type: "text", content: "## Structure en cascade\n\n1. **Boucle de courant** (la plus rapide) : Contrôle du couple\n2. **Boucle de vitesse** : Contrôle de la vitesse\n3. **Boucle de position** (la plus lente) : Contrôle de la position" },
          { type: "text", content: "## Temps de cycle typiques\n\n| Boucle | Période | Fréquence |\n|--------|---------|----------|\n| Courant | 62.5 µs | 16 kHz |\n| Vitesse | 250 µs | 4 kHz |\n| Position | 1 ms | 1 kHz |" },
          { type: "warning", content: "Chaque boucle doit être réglée de l'intérieur vers l'extérieur : courant d'abord, puis vitesse, puis position." }
        ]
      })
    },
    {
      title: "Prise d'origine (homing)",
      description: "Configurez la prise d'origine des axes",
      order: 5,
      xpReward: 60,
      duration: 14,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Prise d'origine (Homing)\n\nLa prise d'origine permet d'établir un référentiel de position connu." },
          { type: "text", content: "## Méthodes de homing\n\n- **Sur capteur** : Fin de course ou détecteur\n- **Sur butée mécanique** : Couple limité\n- **Sur index codeur** : Top zéro du codeur\n- **Combinée** : Capteur + index pour précision" },
          { type: "text", content: "## Paramètres typiques\n\n| Paramètre | Description |\n|-----------|-------------|\n| Vitesse d'approche | Vitesse vers le capteur |\n| Vitesse de recherche | Vitesse lente pour précision |\n| Offset | Décalage après homing |\n| Direction | Sens de recherche |" },
          { type: "info", content: "Avec un codeur absolu multi-tours, la prise d'origine n'est nécessaire qu'une seule fois après le montage." }
        ]
      })
    },
    {
      title: "Limites et sécurités",
      description: "Configurez les limites logicielles et matérielles",
      order: 6,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Limites et sécurités\n\nLa protection des axes est essentielle pour la sécurité et la préservation du matériel." },
          { type: "text", content: "## Types de limites\n\n- **Fins de course matériels** : Interrupteurs physiques (sécurité)\n- **Limites logicielles** : Zones définies par programme\n- **Limites de vitesse** : Vitesse maximale autorisée\n- **Limites de couple** : Couple maximal (protection mécanique)" },
          { type: "text", content: "## Ordre de priorité\n\n1. Arrêt d'urgence (STO)\n2. Fins de course matériels\n3. Limites logicielles\n4. Limites process" },
          { type: "warning", content: "Les fins de course matériels sont une sécurité ultime et ne doivent jamais être utilisés en fonctionnement normal." }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Principes du contrôle de mouvement": {
        title: "Motion Control Principles",
        description: "Discover the fundamentals of motion control"
      },
      "Notions de mécanique": {
        title: "Mechanical Concepts",
        description: "Understand essential mechanical concepts"
      },
      "Codeurs et capteurs de position": {
        title: "Encoders and Position Sensors",
        description: "Master position sensors"
      },
      "Boucles de régulation": {
        title: "Control Loops",
        description: "Understand position/velocity/current control loops"
      },
      "Prise d'origine (homing)": {
        title: "Homing",
        description: "Configure axis homing"
      },
      "Limites et sécurités": {
        title: "Limits and Safety",
        description: "Configure software and hardware limits"
      }
    },
    es: {
      "Principes du contrôle de mouvement": {
        title: "Principios del control de movimiento",
        description: "Descubra los fundamentos del motion control"
      },
      "Notions de mécanique": {
        title: "Conceptos de mecánica",
        description: "Comprenda los conceptos mecánicos esenciales"
      },
      "Codeurs et capteurs de position": {
        title: "Encoders y sensores de posición",
        description: "Domine los sensores de posición"
      },
      "Boucles de régulation": {
        title: "Lazos de regulación",
        description: "Comprenda los lazos de control"
      },
      "Prise d'origine (homing)": {
        title: "Toma de origen (homing)",
        description: "Configure el homing de los ejes"
      },
      "Limites et sécurités": {
        title: "Límites y seguridades",
        description: "Configure límites software y hardware"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1 quizzes - Principes du contrôle de mouvement
    [
      { question: "Qu'est-ce que le motion control ?", options: ["Contrôle de température", "Contrôle de mouvement et positionnement", "Contrôle qualité", "Télécommande"], correctIndex: 1, explanation: "Le motion control est la discipline du contrôle précis des mouvements mécaniques.", order: 1 },
      { question: "Quel composant calcule les trajectoires ?", options: ["Le moteur", "Le contrôleur", "Le codeur", "L'alimentation"], correctIndex: 1, explanation: "Le contrôleur de mouvement calcule les profils et coordonne les axes.", order: 2 },
      { question: "À quoi sert le retour position ?", options: ["Alimenter le moteur", "Mesurer la position réelle", "Calculer la trajectoire", "Refroidir le système"], correctIndex: 1, explanation: "Le retour position (codeur) mesure la position réelle pour la boucle de régulation.", order: 3 },
      { question: "Quelle application n'utilise PAS le motion control ?", options: ["Robotique", "Emballage", "Éclairage", "CNC"], correctIndex: 2, explanation: "L'éclairage standard ne nécessite pas de contrôle de mouvement.", order: 4 },
      { question: "Quel est le rôle du drive/servo-variateur ?", options: ["Calculer les trajectoires", "Alimenter et contrôler le moteur", "Mesurer la position", "Programmer le système"], correctIndex: 1, explanation: "Le drive alimente le moteur en puissance et gère les boucles de régulation.", order: 5 }
    ],
    // Lesson 2 quizzes - Notions de mécanique
    [
      { question: "Quelle unité pour le couple ?", options: ["kg", "mm/s", "Nm", "rad/s"], correctIndex: 2, explanation: "Le couple s'exprime en Newton-mètres (Nm).", order: 1 },
      { question: "Qu'est-ce que l'inertie ?", options: ["La vitesse", "La résistance au changement de vitesse", "La position", "La température"], correctIndex: 1, explanation: "L'inertie représente la résistance d'un corps à modifier sa vitesse de rotation.", order: 2 },
      { question: "Quel type de transmission offre la meilleure précision ?", options: ["Courroie", "Chaîne", "Vis à billes", "Engrenage"], correctIndex: 2, explanation: "La vis à billes offre une très haute précision et un excellent rendement.", order: 3 },
      { question: "L'entraînement direct élimine quoi ?", options: ["Le moteur", "La transmission mécanique", "Le codeur", "L'alimentation"], correctIndex: 1, explanation: "L'entraînement direct supprime la transmission (réducteur, vis) pour une précision maximale.", order: 4 },
      { question: "Quelle transmission est la plus rapide ?", options: ["Vis à billes", "Courroie", "Crémaillère", "Réducteur"], correctIndex: 1, explanation: "La courroie permet les vitesses les plus élevées grâce à sa légèreté.", order: 5 }
    ],
    // Lesson 3 quizzes - Codeurs et capteurs de position
    [
      { question: "Que nécessite un codeur incrémental ?", options: ["Rien de spécial", "Une prise d'origine", "Un câble spécial", "Une alimentation 230V"], correctIndex: 1, explanation: "Le codeur incrémental ne connaît pas sa position absolue, une prise d'origine est nécessaire.", order: 1 },
      { question: "Combien de points par tour pour un codeur 17 bits ?", options: ["17", "1024", "65536", "131072"], correctIndex: 3, explanation: "Un codeur 17 bits offre 2^17 = 131072 points par tour.", order: 2 },
      { question: "Quel codeur garde sa position après coupure ?", options: ["Incrémental", "Absolu", "Potentiomètre", "Résolver"], correctIndex: 1, explanation: "Le codeur absolu conserve la position même hors tension grâce à un encodage unique.", order: 3 },
      { question: "Que signifie PPR ?", options: ["Points Par Révolution", "Position Par Registre", "Pulse Par Rotation", "Points Par Registre"], correctIndex: 0, explanation: "PPR (Points Per Revolution) indique la résolution du codeur.", order: 4 },
      { question: "Qu'est-ce qu'un codeur multi-tours ?", options: ["Un codeur à plusieurs vitesses", "Un codeur qui compte les tours complets", "Un codeur tournant vite", "Un codeur avec plusieurs câbles"], correctIndex: 1, explanation: "Le codeur multi-tours mémorise la position absolue sur plusieurs rotations complètes.", order: 5 }
    ],
    // Lesson 4 quizzes - Boucles de régulation
    [
      { question: "Quelle boucle est la plus rapide ?", options: ["Position", "Vitesse", "Courant", "Elles sont égales"], correctIndex: 2, explanation: "La boucle de courant est la plus rapide (16 kHz typique), puis vitesse, puis position.", order: 1 },
      { question: "Dans quel ordre régler les boucles ?", options: ["Position, vitesse, courant", "Courant, vitesse, position", "Tout en même temps", "L'ordre n'importe pas"], correctIndex: 1, explanation: "On règle de l'intérieur vers l'extérieur : courant, puis vitesse, puis position.", order: 2 },
      { question: "Quelle boucle contrôle le couple ?", options: ["Position", "Vitesse", "Courant", "Aucune"], correctIndex: 2, explanation: "Le couple est proportionnel au courant, donc contrôlé par la boucle de courant.", order: 3 },
      { question: "Quelle fréquence typique pour la boucle de position ?", options: ["16 kHz", "4 kHz", "1 kHz", "100 Hz"], correctIndex: 2, explanation: "La boucle de position fonctionne typiquement à 1 kHz (1 ms).", order: 4 },
      { question: "Pourquoi les boucles sont-elles imbriquées ?", options: ["Pour simplifier", "Chaque boucle corrige la suivante", "Par hasard", "Pour économiser"], correctIndex: 1, explanation: "Chaque boucle externe utilise la boucle interne comme actionneur, permettant un contrôle précis.", order: 5 }
    ],
    // Lesson 5 quizzes - Prise d'origine (homing)
    [
      { question: "À quoi sert la prise d'origine ?", options: ["Allumer le système", "Établir un référentiel de position connu", "Régler la vitesse", "Calibrer le codeur"], correctIndex: 1, explanation: "Le homing définit un point de référence connu pour le système de coordonnées.", order: 1 },
      { question: "Avec quel type de codeur peut-on éviter le homing ?", options: ["Incrémental", "Absolu mono-tour", "Absolu multi-tours", "Potentiomètre"], correctIndex: 2, explanation: "Le codeur absolu multi-tours conserve la position absolue, évitant le homing quotidien.", order: 2 },
      { question: "Qu'est-ce que la vitesse d'approche ?", options: ["Vitesse maximale", "Vitesse rapide vers le capteur de homing", "Vitesse de travail", "Vitesse minimale"], correctIndex: 1, explanation: "La vitesse d'approche est la vitesse rapide utilisée pour aller vers le capteur de homing.", order: 3 },
      { question: "Pourquoi utiliser une vitesse de recherche lente ?", options: ["Économie d'énergie", "Meilleure précision du point zéro", "Réduire le bruit", "Éviter l'usure"], correctIndex: 1, explanation: "Une vitesse lente après détection du capteur améliore la précision de la position zéro.", order: 4 },
      { question: "À quoi sert l'offset de homing ?", options: ["Décaler la position zéro", "Augmenter la vitesse", "Réduire le courant", "Changer de direction"], correctIndex: 0, explanation: "L'offset permet de définir la position zéro à un endroit différent du capteur physique.", order: 5 }
    ],
    // Lesson 6 quizzes - Limites et sécurités
    [
      { question: "Quel type de limite est prioritaire ?", options: ["Limites logicielles", "Fins de course matériels", "Limites process", "Elles sont égales"], correctIndex: 1, explanation: "Les fins de course matériels ont la priorité maximale après l'arrêt d'urgence.", order: 1 },
      { question: "À quoi servent les limites logicielles ?", options: ["Remplacer les fins de course matériels", "Définir la zone de travail normale", "Protéger le codeur", "Réduire la vitesse"], correctIndex: 1, explanation: "Les limites logicielles définissent la zone de travail, les fins de course matériels sont une sécurité.", order: 2 },
      { question: "Quand les fins de course matériels doivent-ils être activés ?", options: ["En fonctionnement normal", "Jamais en fonctionnement normal", "À chaque cycle", "Au démarrage"], correctIndex: 1, explanation: "Les fins de course sont une sécurité ultime et ne doivent pas être atteints en fonctionnement normal.", order: 3 },
      { question: "Que protège une limite de couple ?", options: ["Le codeur", "La mécanique en cas de blocage", "Le variateur", "Le câblage"], correctIndex: 1, explanation: "La limite de couple protège la mécanique si l'axe rencontre un obstacle.", order: 4 },
      { question: "Quel ordre de priorité des sécurités ?", options: ["Logiciel, matériel, AU", "AU, matériel, logiciel", "Tout pareil", "Logiciel uniquement"], correctIndex: 1, explanation: "L'arrêt d'urgence est prioritaire, puis les fins de course matériels, puis les limites logicielles.", order: 5 }
    ]
  ],

  // Quiz translations with question/options/explanation structure
  quizTranslations: {
    en: {
      // Lesson 1 - Motion Control Principles
      "Qu'est-ce que le motion control ?": {
        question: "What is motion control?",
        options: ["Temperature control", "Motion and positioning control", "Quality control", "Remote control"],
        explanation: "Motion control is the discipline of precise control of mechanical movements."
      },
      "Quel composant calcule les trajectoires ?": {
        question: "Which component calculates trajectories?",
        options: ["The motor", "The controller", "The encoder", "The power supply"],
        explanation: "The motion controller calculates profiles and coordinates the axes."
      },
      "À quoi sert le retour position ?": {
        question: "What is the purpose of position feedback?",
        options: ["Power the motor", "Measure the actual position", "Calculate the trajectory", "Cool the system"],
        explanation: "Position feedback (encoder) measures the actual position for the control loop."
      },
      "Quelle application n'utilise PAS le motion control ?": {
        question: "Which application does NOT use motion control?",
        options: ["Robotics", "Packaging", "Lighting", "CNC"],
        explanation: "Standard lighting does not require motion control."
      },
      "Quel est le rôle du drive/servo-variateur ?": {
        question: "What is the role of the drive/servo drive?",
        options: ["Calculate trajectories", "Power and control the motor", "Measure position", "Program the system"],
        explanation: "The drive powers the motor and manages the control loops."
      },
      // Lesson 2 - Mechanical Concepts
      "Quelle unité pour le couple ?": {
        question: "What unit is used for torque?",
        options: ["kg", "mm/s", "Nm", "rad/s"],
        explanation: "Torque is expressed in Newton-meters (Nm)."
      },
      "Qu'est-ce que l'inertie ?": {
        question: "What is inertia?",
        options: ["Speed", "Resistance to change in speed", "Position", "Temperature"],
        explanation: "Inertia represents a body's resistance to changing its rotational speed."
      },
      "Quel type de transmission offre la meilleure précision ?": {
        question: "Which type of transmission offers the best precision?",
        options: ["Belt", "Chain", "Ball screw", "Gear"],
        explanation: "Ball screws offer very high precision and excellent efficiency."
      },
      "L'entraînement direct élimine quoi ?": {
        question: "What does direct drive eliminate?",
        options: ["The motor", "The mechanical transmission", "The encoder", "The power supply"],
        explanation: "Direct drive removes the transmission (reducer, screw) for maximum precision."
      },
      "Quelle transmission est la plus rapide ?": {
        question: "Which transmission is the fastest?",
        options: ["Ball screw", "Belt", "Rack and pinion", "Reducer"],
        explanation: "Belts allow the highest speeds due to their light weight."
      },
      // Lesson 3 - Encoders and Position Sensors
      "Que nécessite un codeur incrémental ?": {
        question: "What does an incremental encoder require?",
        options: ["Nothing special", "A homing sequence", "A special cable", "230V power supply"],
        explanation: "An incremental encoder does not know its absolute position, so homing is required."
      },
      "Combien de points par tour pour un codeur 17 bits ?": {
        question: "How many points per revolution for a 17-bit encoder?",
        options: ["17", "1024", "65536", "131072"],
        explanation: "A 17-bit encoder provides 2^17 = 131,072 points per revolution."
      },
      "Quel codeur garde sa position après coupure ?": {
        question: "Which encoder retains its position after power loss?",
        options: ["Incremental", "Absolute", "Potentiometer", "Resolver"],
        explanation: "Absolute encoders retain position even when powered off thanks to unique encoding."
      },
      "Que signifie PPR ?": {
        question: "What does PPR mean?",
        options: ["Points Per Revolution", "Position Per Register", "Pulse Per Rotation", "Points Per Register"],
        explanation: "PPR (Points Per Revolution) indicates the encoder resolution."
      },
      "Qu'est-ce qu'un codeur multi-tours ?": {
        question: "What is a multi-turn encoder?",
        options: ["A multi-speed encoder", "An encoder that counts complete revolutions", "A fast-turning encoder", "An encoder with multiple cables"],
        explanation: "A multi-turn encoder memorizes the absolute position over multiple complete rotations."
      },
      // Lesson 4 - Control Loops
      "Quelle boucle est la plus rapide ?": {
        question: "Which loop is the fastest?",
        options: ["Position", "Velocity", "Current", "They are equal"],
        explanation: "The current loop is the fastest (typically 16 kHz), then velocity, then position."
      },
      "Dans quel ordre régler les boucles ?": {
        question: "In what order should the loops be tuned?",
        options: ["Position, velocity, current", "Current, velocity, position", "All at the same time", "Order doesn't matter"],
        explanation: "Tune from inside out: current first, then velocity, then position."
      },
      "Quelle boucle contrôle le couple ?": {
        question: "Which loop controls torque?",
        options: ["Position", "Velocity", "Current", "None"],
        explanation: "Torque is proportional to current, so it is controlled by the current loop."
      },
      "Quelle fréquence typique pour la boucle de position ?": {
        question: "What is the typical frequency for the position loop?",
        options: ["16 kHz", "4 kHz", "1 kHz", "100 Hz"],
        explanation: "The position loop typically operates at 1 kHz (1 ms)."
      },
      "Pourquoi les boucles sont-elles imbriquées ?": {
        question: "Why are the loops nested?",
        options: ["To simplify", "Each loop corrects the next", "By chance", "To save money"],
        explanation: "Each outer loop uses the inner loop as an actuator, enabling precise control."
      },
      // Lesson 5 - Homing
      "À quoi sert la prise d'origine ?": {
        question: "What is the purpose of homing?",
        options: ["Turn on the system", "Establish a known position reference", "Adjust speed", "Calibrate the encoder"],
        explanation: "Homing defines a known reference point for the coordinate system."
      },
      "Avec quel type de codeur peut-on éviter le homing ?": {
        question: "With which type of encoder can homing be avoided?",
        options: ["Incremental", "Absolute single-turn", "Absolute multi-turn", "Potentiometer"],
        explanation: "Multi-turn absolute encoders retain absolute position, avoiding daily homing."
      },
      "Qu'est-ce que la vitesse d'approche ?": {
        question: "What is approach speed?",
        options: ["Maximum speed", "Fast speed toward the homing sensor", "Working speed", "Minimum speed"],
        explanation: "Approach speed is the fast speed used to move toward the homing sensor."
      },
      "Pourquoi utiliser une vitesse de recherche lente ?": {
        question: "Why use a slow search speed?",
        options: ["Energy savings", "Better precision of the zero point", "Reduce noise", "Prevent wear"],
        explanation: "A slow speed after sensor detection improves the precision of the zero position."
      },
      "À quoi sert l'offset de homing ?": {
        question: "What is the homing offset used for?",
        options: ["Offset the zero position", "Increase speed", "Reduce current", "Change direction"],
        explanation: "The offset allows defining the zero position at a different location from the physical sensor."
      },
      // Lesson 6 - Limits and Safety
      "Quel type de limite est prioritaire ?": {
        question: "Which type of limit has priority?",
        options: ["Software limits", "Hardware limit switches", "Process limits", "They are equal"],
        explanation: "Hardware limit switches have maximum priority after emergency stop."
      },
      "À quoi servent les limites logicielles ?": {
        question: "What are software limits used for?",
        options: ["Replace hardware limit switches", "Define the normal working area", "Protect the encoder", "Reduce speed"],
        explanation: "Software limits define the working area; hardware limit switches are a safety measure."
      },
      "Quand les fins de course matériels doivent-ils être activés ?": {
        question: "When should hardware limit switches be activated?",
        options: ["During normal operation", "Never during normal operation", "Every cycle", "At startup"],
        explanation: "Limit switches are an ultimate safety measure and should not be reached during normal operation."
      },
      "Que protège une limite de couple ?": {
        question: "What does a torque limit protect?",
        options: ["The encoder", "The mechanics in case of blocking", "The drive", "The wiring"],
        explanation: "The torque limit protects the mechanics if the axis encounters an obstacle."
      },
      "Quel ordre de priorité des sécurités ?": {
        question: "What is the safety priority order?",
        options: ["Software, hardware, E-stop", "E-stop, hardware, software", "All equal", "Software only"],
        explanation: "Emergency stop has priority, then hardware limit switches, then software limits."
      }
    },
    es: {
      // Lesson 1 - Principios del control de movimiento
      "Qu'est-ce que le motion control ?": {
        question: "¿Qué es el motion control?",
        options: ["Control de temperatura", "Control de movimiento y posicionamiento", "Control de calidad", "Control remoto"],
        explanation: "El motion control es la disciplina del control preciso de movimientos mecánicos."
      },
      "Quel composant calcule les trajectoires ?": {
        question: "¿Qué componente calcula las trayectorias?",
        options: ["El motor", "El controlador", "El encoder", "La fuente de alimentación"],
        explanation: "El controlador de movimiento calcula los perfiles y coordina los ejes."
      },
      "À quoi sert le retour position ?": {
        question: "¿Para qué sirve la retroalimentación de posición?",
        options: ["Alimentar el motor", "Medir la posición real", "Calcular la trayectoria", "Enfriar el sistema"],
        explanation: "La retroalimentación de posición (encoder) mide la posición real para el lazo de control."
      },
      "Quelle application n'utilise PAS le motion control ?": {
        question: "¿Qué aplicación NO utiliza motion control?",
        options: ["Robótica", "Embalaje", "Iluminación", "CNC"],
        explanation: "La iluminación estándar no requiere control de movimiento."
      },
      "Quel est le rôle du drive/servo-variateur ?": {
        question: "¿Cuál es el rol del drive/servo variador?",
        options: ["Calcular trayectorias", "Alimentar y controlar el motor", "Medir la posición", "Programar el sistema"],
        explanation: "El drive alimenta el motor con potencia y gestiona los lazos de regulación."
      },
      // Lesson 2 - Conceptos de mecánica
      "Quelle unité pour le couple ?": {
        question: "¿Qué unidad se usa para el par?",
        options: ["kg", "mm/s", "Nm", "rad/s"],
        explanation: "El par se expresa en Newton-metros (Nm)."
      },
      "Qu'est-ce que l'inertie ?": {
        question: "¿Qué es la inercia?",
        options: ["La velocidad", "La resistencia al cambio de velocidad", "La posición", "La temperatura"],
        explanation: "La inercia representa la resistencia de un cuerpo a modificar su velocidad de rotación."
      },
      "Quel type de transmission offre la meilleure précision ?": {
        question: "¿Qué tipo de transmisión ofrece la mejor precisión?",
        options: ["Correa", "Cadena", "Husillo de bolas", "Engranaje"],
        explanation: "El husillo de bolas ofrece muy alta precisión y excelente rendimiento."
      },
      "L'entraînement direct élimine quoi ?": {
        question: "¿Qué elimina el accionamiento directo?",
        options: ["El motor", "La transmisión mecánica", "El encoder", "La alimentación"],
        explanation: "El accionamiento directo suprime la transmisión (reductor, husillo) para máxima precisión."
      },
      "Quelle transmission est la plus rapide ?": {
        question: "¿Qué transmisión es la más rápida?",
        options: ["Husillo de bolas", "Correa", "Cremallera", "Reductor"],
        explanation: "La correa permite las velocidades más altas gracias a su ligereza."
      },
      // Lesson 3 - Encoders y sensores de posición
      "Que nécessite un codeur incrémental ?": {
        question: "¿Qué necesita un encoder incremental?",
        options: ["Nada especial", "Una toma de origen", "Un cable especial", "Alimentación 230V"],
        explanation: "El encoder incremental no conoce su posición absoluta, se necesita una toma de origen."
      },
      "Combien de points par tour pour un codeur 17 bits ?": {
        question: "¿Cuántos puntos por vuelta para un encoder de 17 bits?",
        options: ["17", "1024", "65536", "131072"],
        explanation: "Un encoder de 17 bits ofrece 2^17 = 131,072 puntos por vuelta."
      },
      "Quel codeur garde sa position après coupure ?": {
        question: "¿Qué encoder mantiene su posición tras un corte de energía?",
        options: ["Incremental", "Absoluto", "Potenciómetro", "Resolver"],
        explanation: "El encoder absoluto conserva la posición incluso sin tensión gracias a una codificación única."
      },
      "Que signifie PPR ?": {
        question: "¿Qué significa PPR?",
        options: ["Puntos Por Revolución", "Posición Por Registro", "Pulso Por Rotación", "Puntos Por Registro"],
        explanation: "PPR (Points Per Revolution) indica la resolución del encoder."
      },
      "Qu'est-ce qu'un codeur multi-tours ?": {
        question: "¿Qué es un encoder multi-vuelta?",
        options: ["Un encoder de varias velocidades", "Un encoder que cuenta las vueltas completas", "Un encoder que gira rápido", "Un encoder con varios cables"],
        explanation: "El encoder multi-vuelta memoriza la posición absoluta sobre varias rotaciones completas."
      },
      // Lesson 4 - Lazos de regulación
      "Quelle boucle est la plus rapide ?": {
        question: "¿Qué lazo es el más rápido?",
        options: ["Posición", "Velocidad", "Corriente", "Son iguales"],
        explanation: "El lazo de corriente es el más rápido (16 kHz típico), luego velocidad, luego posición."
      },
      "Dans quel ordre régler les boucles ?": {
        question: "¿En qué orden se ajustan los lazos?",
        options: ["Posición, velocidad, corriente", "Corriente, velocidad, posición", "Todo al mismo tiempo", "El orden no importa"],
        explanation: "Se ajusta de adentro hacia afuera: corriente primero, luego velocidad, luego posición."
      },
      "Quelle boucle contrôle le couple ?": {
        question: "¿Qué lazo controla el par?",
        options: ["Posición", "Velocidad", "Corriente", "Ninguno"],
        explanation: "El par es proporcional a la corriente, por lo tanto es controlado por el lazo de corriente."
      },
      "Quelle fréquence typique pour la boucle de position ?": {
        question: "¿Qué frecuencia típica para el lazo de posición?",
        options: ["16 kHz", "4 kHz", "1 kHz", "100 Hz"],
        explanation: "El lazo de posición funciona típicamente a 1 kHz (1 ms)."
      },
      "Pourquoi les boucles sont-elles imbriquées ?": {
        question: "¿Por qué los lazos están anidados?",
        options: ["Para simplificar", "Cada lazo corrige al siguiente", "Por casualidad", "Para ahorrar"],
        explanation: "Cada lazo externo utiliza el lazo interno como actuador, permitiendo un control preciso."
      },
      // Lesson 5 - Toma de origen (homing)
      "À quoi sert la prise d'origine ?": {
        question: "¿Para qué sirve la toma de origen?",
        options: ["Encender el sistema", "Establecer un referencial de posición conocido", "Ajustar la velocidad", "Calibrar el encoder"],
        explanation: "El homing define un punto de referencia conocido para el sistema de coordenadas."
      },
      "Avec quel type de codeur peut-on éviter le homing ?": {
        question: "¿Con qué tipo de encoder se puede evitar el homing?",
        options: ["Incremental", "Absoluto mono-vuelta", "Absoluto multi-vuelta", "Potenciómetro"],
        explanation: "El encoder absoluto multi-vuelta conserva la posición absoluta, evitando el homing diario."
      },
      "Qu'est-ce que la vitesse d'approche ?": {
        question: "¿Qué es la velocidad de aproximación?",
        options: ["Velocidad máxima", "Velocidad rápida hacia el sensor de homing", "Velocidad de trabajo", "Velocidad mínima"],
        explanation: "La velocidad de aproximación es la velocidad rápida usada para ir hacia el sensor de homing."
      },
      "Pourquoi utiliser une vitesse de recherche lente ?": {
        question: "¿Por qué usar una velocidad de búsqueda lenta?",
        options: ["Ahorro de energía", "Mejor precisión del punto cero", "Reducir el ruido", "Evitar el desgaste"],
        explanation: "Una velocidad lenta después de la detección del sensor mejora la precisión de la posición cero."
      },
      "À quoi sert l'offset de homing ?": {
        question: "¿Para qué sirve el offset de homing?",
        options: ["Desplazar la posición cero", "Aumentar la velocidad", "Reducir la corriente", "Cambiar de dirección"],
        explanation: "El offset permite definir la posición cero en un lugar diferente del sensor físico."
      },
      // Lesson 6 - Límites y seguridades
      "Quel type de limite est prioritaire ?": {
        question: "¿Qué tipo de límite es prioritario?",
        options: ["Límites software", "Finales de carrera hardware", "Límites de proceso", "Son iguales"],
        explanation: "Los finales de carrera hardware tienen la prioridad máxima después de la parada de emergencia."
      },
      "À quoi servent les limites logicielles ?": {
        question: "¿Para qué sirven los límites software?",
        options: ["Reemplazar los finales de carrera hardware", "Definir la zona de trabajo normal", "Proteger el encoder", "Reducir la velocidad"],
        explanation: "Los límites software definen la zona de trabajo, los finales de carrera hardware son una seguridad."
      },
      "Quand les fins de course matériels doivent-ils être activés ?": {
        question: "¿Cuándo deben activarse los finales de carrera hardware?",
        options: ["En funcionamiento normal", "Nunca en funcionamiento normal", "En cada ciclo", "Al arranque"],
        explanation: "Los finales de carrera son una seguridad última y no deben alcanzarse en funcionamiento normal."
      },
      "Que protège une limite de couple ?": {
        question: "¿Qué protege un límite de par?",
        options: ["El encoder", "La mecánica en caso de bloqueo", "El variador", "El cableado"],
        explanation: "El límite de par protege la mecánica si el eje encuentra un obstáculo."
      },
      "Quel ordre de priorité des sécurités ?": {
        question: "¿Qué orden de prioridad de las seguridades?",
        options: ["Software, hardware, PE", "PE, hardware, software", "Todo igual", "Solo software"],
        explanation: "La parada de emergencia es prioritaria, luego los finales de carrera hardware, luego los límites software."
      }
    }
  }
}
