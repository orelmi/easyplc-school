// Module 16: Stepper and Servo Motors (Moteurs pas à pas et servomoteurs)
import type { ModuleData } from '../types.js'

export const module16Data: ModuleData = {
  // Module info
  moduleOrder: 16,
  moduleTitle: "Moteurs pas à pas et servomoteurs",
  moduleDescription: "Comprenez les différents types de moteurs pour le positionnement",
  moduleTranslations: {
    en: {
      title: "Stepper Motors and Servomotors",
      description: "Understand different motor types for positioning"
    },
    es: {
      title: "Motores Paso a Paso y Servomotores",
      description: "Comprenda los diferentes tipos de motores para posicionamiento"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Moteurs pas à pas",
      description: "Découvrez le fonctionnement des moteurs pas à pas",
      order: 1,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Moteurs pas à pas\n\nLe moteur pas à pas avance par incréments fixes appelés \"pas\", permettant un positionnement précis en boucle ouverte." },
          { type: "text", content: "## Caractéristiques\n\n- **Pas standard** : 1.8° (200 pas/tour)\n- **Modes** : Pas entier, demi-pas, micro-pas\n- **Couple** : Élevé à basse vitesse\n- **Pas de retour nécessaire** : En boucle ouverte" },
          { type: "text", content: "## Types de moteurs pas à pas\n\n| Type | Caractéristiques |\n|------|------------------|\n| Bipolaire | Plus de couple, 4 fils |\n| Unipolaire | Plus simple, 5-6 fils |\n| Hybride | Précision, couple élevé |" },
          { type: "warning", content: "Un moteur pas à pas peut perdre des pas en cas de surcharge, sans que le système ne le détecte en boucle ouverte." }
        ]
      })
    },
    {
      title: "Servomoteurs synchrones",
      description: "Maîtrisez les servomoteurs à aimants permanents",
      order: 2,
      xpReward: 65,
      duration: 16,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Servomoteurs synchrones\n\nLes servomoteurs synchrones (PMSM) sont la référence pour les applications de positionnement haute performance." },
          { type: "text", content: "## Caractéristiques\n\n- **Rotor à aimants permanents**\n- **Haute dynamique** : Accélération rapide\n- **Large plage de vitesse** : Du quasi-statique au très rapide\n- **Couple constant** : Sur toute la plage\n- **Retour position intégré** : Codeur ou résolver" },
          { type: "text", content: "## Avantages\n\n- Rendement élevé (>90%)\n- Pas de maintenance (pas de balais)\n- Précision excellente\n- Capacité de surcharge momentanée" },
          { type: "info", content: "Un servomoteur peut typiquement fournir 3 fois son couple nominal pendant quelques secondes pour les accélérations." }
        ]
      })
    },
    {
      title: "Comparaison et choix",
      description: "Choisissez le bon moteur pour votre application",
      order: 3,
      xpReward: 55,
      duration: 14,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Comparaison pas à pas vs servo\n\nLe choix dépend des exigences de l'application." },
          { type: "text", content: "## Tableau comparatif\n\n| Critère | Pas à pas | Servo |\n|---------|-----------|-------|\n| Coût | Faible | Élevé |\n| Précision | Bonne | Excellente |\n| Vitesse max | Limitée | Élevée |\n| Dynamique | Moyenne | Excellente |\n| Boucle | Ouverte possible | Fermée requise |\n| Bruit | Plus élevé | Faible |" },
          { type: "text", content: "## Quand choisir le pas à pas\n\n- Budget limité\n- Vitesses modérées\n- Charges prévisibles\n- Position maintenue à l'arrêt" },
          { type: "text", content: "## Quand choisir le servo\n\n- Haute dynamique requise\n- Charges variables\n- Haute vitesse\n- Précision critique" }
        ]
      })
    },
    {
      title: "Dimensionnement moteur",
      description: "Apprenez à dimensionner un système d'entraînement",
      order: 4,
      xpReward: 70,
      duration: 18,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Dimensionnement moteur\n\nUn dimensionnement correct garantit les performances et la durée de vie du système." },
          { type: "text", content: "## Étapes de dimensionnement\n\n1. **Calculer l'inertie totale** : Charge + transmission + moteur\n2. **Déterminer le couple requis** : Accélération + friction + gravité\n3. **Définir le cycle** : Temps de mouvement et repos\n4. **Vérifier le couple RMS** : Ne doit pas dépasser le nominal" },
          { type: "text", content: "## Formules essentielles\n\n- Couple accélération : T = J × α\n- Couple friction : T = F × r\n- Inertie cylindre : J = ½ × m × r²\n- Rapport d'inertie optimal : Jcharge/Jmoteur ≤ 10" },
          { type: "warning", content: "Un rapport d'inertie trop élevé dégrade les performances dynamiques et la stabilité de l'asservissement." }
        ]
      })
    },
    {
      title: "Drivers et servo-variateurs",
      description: "Découvrez l'électronique de commande des moteurs",
      order: 5,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Drivers et servo-variateurs\n\nLe driver ou servo-variateur est l'électronique qui alimente et contrôle le moteur." },
          { type: "text", content: "## Drivers pas à pas\n\n- **Entrées** : Step (impulsion), Dir (direction), Enable\n- **Modes** : Pas entier à 1/256 micro-pas\n- **Courant** : Réglable selon le moteur" },
          { type: "text", content: "## Servo-variateurs\n\n| Fonction | Description |\n|----------|-------------|\n| Boucle courant | Contrôle du couple |\n| Boucle vitesse | Contrôle de la vitesse |\n| Boucle position | Contrôle de la position |\n| Auto-tuning | Réglage automatique |" },
          { type: "info", content: "Les servo-variateurs modernes intègrent des fonctions de sécurité (STO, SS1) conformes aux normes SIL/PL." }
        ]
      })
    },
    {
      title: "Moteurs linéaires",
      description: "Découvrez les moteurs à entraînement direct linéaire",
      order: 6,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Moteurs linéaires\n\nLes moteurs linéaires éliminent les transmissions mécaniques pour un entraînement direct." },
          { type: "text", content: "## Avantages\n\n- **Pas de jeu mécanique** : Précision maximale\n- **Vitesse élevée** : Jusqu'à 10 m/s et plus\n- **Dynamique** : Accélérations de plusieurs g\n- **Maintenance** : Réduite (pas de pièces d'usure)" },
          { type: "text", content: "## Types de moteurs linéaires\n\n| Type | Caractéristiques |\n|------|------------------|\n| Ironcore | Force élevée, ondulation |\n| Ironless | Pas d'ondulation, force moindre |\n| Tubulaire | Compact, guidage intégré |" },
          { type: "warning", content: "Les moteurs linéaires génèrent des champs magnétiques forts. Attention aux objets métalliques et aux équipements sensibles à proximité." }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Moteurs pas à pas": {
        title: "Stepper Motors",
        description: "Discover how stepper motors work"
      },
      "Servomoteurs synchrones": {
        title: "Synchronous Servomotors",
        description: "Master permanent magnet servomotors"
      },
      "Comparaison et choix": {
        title: "Comparison and Selection",
        description: "Choose the right motor for your application"
      },
      "Dimensionnement moteur": {
        title: "Motor Sizing",
        description: "Learn to size a drive system"
      },
      "Drivers et servo-variateurs": {
        title: "Drivers and Servo Drives",
        description: "Discover motor control electronics"
      },
      "Moteurs linéaires": {
        title: "Linear Motors",
        description: "Discover direct linear drives"
      }
    },
    es: {
      "Moteurs pas à pas": {
        title: "Motores paso a paso",
        description: "Descubra el funcionamiento de los motores paso a paso"
      },
      "Servomoteurs synchrones": {
        title: "Servomotores síncronos",
        description: "Domine los servomotores de imanes permanentes"
      },
      "Comparaison et choix": {
        title: "Comparación y elección",
        description: "Elija el motor adecuado para su aplicación"
      },
      "Dimensionnement moteur": {
        title: "Dimensionamiento del motor",
        description: "Aprenda a dimensionar un sistema de accionamiento"
      },
      "Drivers et servo-variateurs": {
        title: "Drivers y servo variadores",
        description: "Descubra la electrónica de control de motores"
      },
      "Moteurs linéaires": {
        title: "Motores lineales",
        description: "Descubra los accionamientos lineales directos"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Moteurs pas à pas
    [
      { question: "Quel est le pas angulaire standard d'un moteur pas à pas ?", options: ["0.9°", "1.8°", "3.6°", "7.2°"], correctIndex: 1, explanation: "Le pas standard est de 1.8°, soit 200 pas par tour complet.", order: 1 },
      { question: "Qu'est-ce que le micro-stepping ?", options: ["Petits moteurs", "Division du pas en fractions", "Pas très rapides", "Moteurs miniatures"], correctIndex: 1, explanation: "Le micro-stepping divise chaque pas en fractions plus petites pour plus de résolution.", order: 2 },
      { question: "Quel inconvénient majeur du moteur pas à pas ?", options: ["Coût élevé", "Perte de pas possible en surcharge", "Faible couple", "Bruit nul"], correctIndex: 1, explanation: "En boucle ouverte, une surcharge peut faire perdre des pas sans détection.", order: 3 },
      { question: "Combien de fils pour un moteur bipolaire ?", options: ["2", "4", "6", "8"], correctIndex: 1, explanation: "Un moteur bipolaire a 4 fils (2 par phase).", order: 4 },
      { question: "Où le moteur pas à pas excelle-t-il ?", options: ["Haute vitesse", "Positionnement à basse vitesse", "Forte accélération", "Charges variables"], correctIndex: 1, explanation: "Le pas à pas offre un excellent couple et maintien de position à basse vitesse.", order: 5 }
    ],
    // Lesson 2: Servomoteurs synchrones
    [
      { question: "Que signifie PMSM ?", options: ["Permanent Magnet Synchronous Motor", "Power Motor Speed Management", "Precision Motion System Module", "Programmable Motor Servo Module"], correctIndex: 0, explanation: "PMSM signifie Permanent Magnet Synchronous Motor (moteur synchrone à aimants permanents).", order: 1 },
      { question: "Quel rendement typique d'un servomoteur ?", options: ["50%", "70%", "90% ou plus", "99%"], correctIndex: 2, explanation: "Les servomoteurs synchrones ont un excellent rendement, souvent supérieur à 90%.", order: 2 },
      { question: "Quelle surcharge momentanée un servo peut-il fournir ?", options: ["Aucune", "1.5x nominal", "3x nominal typiquement", "10x nominal"], correctIndex: 2, explanation: "Un servomoteur peut typiquement fournir 3 fois son couple nominal pendant quelques secondes.", order: 3 },
      { question: "Pourquoi les servos n'ont-ils pas de balais ?", options: ["Pour le coût", "Pas de maintenance, meilleur rendement", "Par hasard", "Pour le design"], correctIndex: 1, explanation: "L'absence de balais élimine l'usure et les étincelles, améliorant rendement et durée de vie.", order: 4 },
      { question: "Quel type de retour est intégré aux servomoteurs ?", options: ["Aucun", "Codeur ou résolver", "Potentiomètre", "Sonde température uniquement"], correctIndex: 1, explanation: "Les servomoteurs intègrent un codeur ou résolver pour le retour position.", order: 5 }
    ],
    // Lesson 3: Comparaison et choix
    [
      { question: "Quel moteur choisir pour un budget limité ?", options: ["Servo", "Pas à pas", "Linéaire", "DC brushless"], correctIndex: 1, explanation: "Le moteur pas à pas est nettement moins cher qu'un système servo.", order: 1 },
      { question: "Pour quelle application choisir un servo ?", options: ["Positionnement simple et lent", "Haute dynamique et charges variables", "Coût minimal", "Boucle ouverte"], correctIndex: 1, explanation: "Les servos excellent pour les applications dynamiques avec charges variables.", order: 2 },
      { question: "Quel moteur est plus silencieux ?", options: ["Pas à pas", "Servo", "Ils sont identiques", "DC brossé"], correctIndex: 1, explanation: "Les servomoteurs sont généralement plus silencieux que les moteurs pas à pas.", order: 3 },
      { question: "Lequel peut fonctionner en boucle ouverte ?", options: ["Servo uniquement", "Pas à pas", "Les deux", "Aucun"], correctIndex: 1, explanation: "Le moteur pas à pas peut fonctionner sans retour de position (boucle ouverte).", order: 4 },
      { question: "Pour maintenir une position à l'arrêt ?", options: ["Servo consomme moins", "Pas à pas maintient naturellement", "Identique", "Impossible"], correctIndex: 1, explanation: "Le pas à pas maintient sa position avec couple même à l'arrêt, sans contrôle actif.", order: 5 }
    ],
    // Lesson 4: Dimensionnement moteur
    [
      { question: "Quelle formule pour le couple d'accélération ?", options: ["T = m × v", "T = J × α", "T = P / ω", "T = F × d"], correctIndex: 1, explanation: "Le couple d'accélération est T = J (inertie) × α (accélération angulaire).", order: 1 },
      { question: "Quel rapport d'inertie charge/moteur est optimal ?", options: ["< 1", "= 1", "≤ 10", "> 100"], correctIndex: 2, explanation: "Un rapport d'inertie inférieur à 10 assure de bonnes performances dynamiques.", order: 2 },
      { question: "Que représente le couple RMS ?", options: ["Couple maximal", "Couple moyen sur le cycle", "Couple minimal", "Couple au démarrage"], correctIndex: 1, explanation: "Le couple RMS est le couple moyen quadratique sur le cycle, à comparer au nominal.", order: 3 },
      { question: "Un rapport d'inertie trop élevé provoque ?", options: ["Meilleure précision", "Instabilité et mauvaises performances", "Économie d'énergie", "Aucun effet"], correctIndex: 1, explanation: "Un rapport d'inertie trop élevé dégrade les performances dynamiques et la stabilité.", order: 4 },
      { question: "Que faut-il calculer en premier ?", options: ["Le couple moteur", "L'inertie totale", "La vitesse max", "Le prix"], correctIndex: 1, explanation: "L'inertie totale (charge + transmission + moteur) est le point de départ du dimensionnement.", order: 5 }
    ],
    // Lesson 5: Drivers et servo-variateurs
    [
      { question: "Quels signaux pour un driver pas à pas ?", options: ["U, V, W", "Step, Dir, Enable", "0-10V", "CAN bus"], correctIndex: 1, explanation: "Un driver pas à pas reçoit des impulsions (Step), la direction (Dir) et l'activation (Enable).", order: 1 },
      { question: "Qu'est-ce que l'auto-tuning d'un servo-variateur ?", options: ["Réglage radio", "Identification et réglage automatique des gains", "Mise à jour firmware", "Configuration IP"], correctIndex: 1, explanation: "L'auto-tuning identifie le système et règle automatiquement les gains des boucles.", order: 2 },
      { question: "Jusqu'à combien de micro-pas peut-on diviser ?", options: ["1/2", "1/16", "1/256", "Illimité"], correctIndex: 2, explanation: "Certains drivers permettent jusqu'à 1/256 micro-pas, soit 51200 pas/tour.", order: 3 },
      { question: "Quelle fonction de sécurité est standard dans les servo-variateurs ?", options: ["Aucune", "STO (Safe Torque Off)", "Arrêt d'urgence complet", "Protection incendie"], correctIndex: 1, explanation: "La fonction STO est standard dans les servo-variateurs modernes.", order: 4 },
      { question: "Que règle-t-on principalement sur un driver pas à pas ?", options: ["Les gains PID", "Le courant et le micro-stepping", "La température", "La communication"], correctIndex: 1, explanation: "Le courant (selon le moteur) et le niveau de micro-stepping sont les réglages principaux.", order: 5 }
    ],
    // Lesson 6: Moteurs linéaires
    [
      { question: "Quel avantage principal du moteur linéaire ?", options: ["Coût réduit", "Pas de transmission = pas de jeu mécanique", "Simplicité", "Faible puissance"], correctIndex: 1, explanation: "L'entraînement direct élimine tous les jeux mécaniques des transmissions.", order: 1 },
      { question: "Quelle vitesse peut atteindre un moteur linéaire ?", options: ["1 m/s max", "Jusqu'à 10 m/s et plus", "100 m/s", "Identique aux rotatifs"], correctIndex: 1, explanation: "Les moteurs linéaires peuvent atteindre plus de 10 m/s.", order: 2 },
      { question: "Quel type de moteur linéaire n'a pas d'ondulation de force ?", options: ["Ironcore", "Ironless", "Tubulaire", "Hybride"], correctIndex: 1, explanation: "Les moteurs ironless (sans fer) n'ont pas d'ondulation de force (cogging).", order: 3 },
      { question: "Quelle précaution avec les moteurs linéaires ?", options: ["Éviter l'eau", "Attention aux champs magnétiques forts", "Ne pas dépasser 1 m/s", "Lubrification constante"], correctIndex: 1, explanation: "Les aimants puissants peuvent attirer des objets métalliques et perturber des équipements.", order: 4 },
      { question: "Où utilise-t-on les moteurs linéaires tubulaires ?", options: ["Grandes courses", "Applications compactes avec guidage intégré", "Haute vitesse", "Fort couple"], correctIndex: 1, explanation: "Les moteurs tubulaires sont compacts et intègrent souvent leur guidage.", order: 5 }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1: Stepper Motors
      "Quel est le pas angulaire standard d'un moteur pas à pas ?": {
        question: "What is the standard step angle of a stepper motor?",
        options: ["0.9°", "1.8°", "3.6°", "7.2°"],
        explanation: "The standard step is 1.8°, or 200 steps per full revolution."
      },
      "Qu'est-ce que le micro-stepping ?": {
        question: "What is micro-stepping?",
        options: ["Small motors", "Dividing steps into fractions", "Very fast steps", "Miniature motors"],
        explanation: "Micro-stepping divides each step into smaller fractions for higher resolution."
      },
      "Quel inconvénient majeur du moteur pas à pas ?": {
        question: "What is the major disadvantage of stepper motors?",
        options: ["High cost", "Possible step loss under overload", "Low torque", "No noise"],
        explanation: "In open loop, an overload can cause step loss without detection."
      },
      "Combien de fils pour un moteur bipolaire ?": {
        question: "How many wires for a bipolar motor?",
        options: ["2", "4", "6", "8"],
        explanation: "A bipolar motor has 4 wires (2 per phase)."
      },
      "Où le moteur pas à pas excelle-t-il ?": {
        question: "Where does the stepper motor excel?",
        options: ["High speed", "Low speed positioning", "High acceleration", "Variable loads"],
        explanation: "Stepper motors offer excellent torque and position holding at low speed."
      },
      // Lesson 2: Synchronous Servomotors
      "Que signifie PMSM ?": {
        question: "What does PMSM stand for?",
        options: ["Permanent Magnet Synchronous Motor", "Power Motor Speed Management", "Precision Motion System Module", "Programmable Motor Servo Module"],
        explanation: "PMSM stands for Permanent Magnet Synchronous Motor."
      },
      "Quel rendement typique d'un servomoteur ?": {
        question: "What is the typical efficiency of a servomotor?",
        options: ["50%", "70%", "90% or more", "99%"],
        explanation: "Synchronous servomotors have excellent efficiency, often above 90%."
      },
      "Quelle surcharge momentanée un servo peut-il fournir ?": {
        question: "What momentary overload can a servo provide?",
        options: ["None", "1.5x rated", "Typically 3x rated", "10x rated"],
        explanation: "A servomotor can typically provide 3 times its rated torque for a few seconds."
      },
      "Pourquoi les servos n'ont-ils pas de balais ?": {
        question: "Why don't servos have brushes?",
        options: ["For cost", "No maintenance, better efficiency", "By chance", "For design"],
        explanation: "The absence of brushes eliminates wear and sparks, improving efficiency and lifespan."
      },
      "Quel type de retour est intégré aux servomoteurs ?": {
        question: "What type of feedback is integrated into servomotors?",
        options: ["None", "Encoder or resolver", "Potentiometer", "Temperature probe only"],
        explanation: "Servomotors integrate an encoder or resolver for position feedback."
      },
      // Lesson 3: Comparison and Selection
      "Quel moteur choisir pour un budget limité ?": {
        question: "Which motor to choose for a limited budget?",
        options: ["Servo", "Stepper", "Linear", "DC brushless"],
        explanation: "Stepper motors are significantly cheaper than servo systems."
      },
      "Pour quelle application choisir un servo ?": {
        question: "For which application should you choose a servo?",
        options: ["Simple and slow positioning", "High dynamics and variable loads", "Minimal cost", "Open loop"],
        explanation: "Servos excel for dynamic applications with variable loads."
      },
      "Quel moteur est plus silencieux ?": {
        question: "Which motor is quieter?",
        options: ["Stepper", "Servo", "They are identical", "Brushed DC"],
        explanation: "Servomotors are generally quieter than stepper motors."
      },
      "Lequel peut fonctionner en boucle ouverte ?": {
        question: "Which can operate in open loop?",
        options: ["Servo only", "Stepper", "Both", "Neither"],
        explanation: "Stepper motors can operate without position feedback (open loop)."
      },
      "Pour maintenir une position à l'arrêt ?": {
        question: "To maintain a position at standstill?",
        options: ["Servo consumes less", "Stepper naturally holds", "Identical", "Impossible"],
        explanation: "Steppers maintain their position with torque even at standstill, without active control."
      },
      // Lesson 4: Motor Sizing
      "Quelle formule pour le couple d'accélération ?": {
        question: "What formula for acceleration torque?",
        options: ["T = m × v", "T = J × α", "T = P / ω", "T = F × d"],
        explanation: "Acceleration torque is T = J (inertia) × α (angular acceleration)."
      },
      "Quel rapport d'inertie charge/moteur est optimal ?": {
        question: "What load/motor inertia ratio is optimal?",
        options: ["< 1", "= 1", "≤ 10", "> 100"],
        explanation: "An inertia ratio below 10 ensures good dynamic performance."
      },
      "Que représente le couple RMS ?": {
        question: "What does RMS torque represent?",
        options: ["Maximum torque", "Average torque over the cycle", "Minimum torque", "Starting torque"],
        explanation: "RMS torque is the root mean square torque over the cycle, to be compared with rated torque."
      },
      "Un rapport d'inertie trop élevé provoque ?": {
        question: "A too high inertia ratio causes?",
        options: ["Better precision", "Instability and poor performance", "Energy savings", "No effect"],
        explanation: "A too high inertia ratio degrades dynamic performance and stability."
      },
      "Que faut-il calculer en premier ?": {
        question: "What should be calculated first?",
        options: ["Motor torque", "Total inertia", "Max speed", "Price"],
        explanation: "Total inertia (load + transmission + motor) is the starting point for sizing."
      },
      // Lesson 5: Drivers and Servo Drives
      "Quels signaux pour un driver pas à pas ?": {
        question: "What signals for a stepper driver?",
        options: ["U, V, W", "Step, Dir, Enable", "0-10V", "CAN bus"],
        explanation: "A stepper driver receives pulses (Step), direction (Dir) and enable (Enable)."
      },
      "Qu'est-ce que l'auto-tuning d'un servo-variateur ?": {
        question: "What is auto-tuning in a servo drive?",
        options: ["Radio tuning", "Automatic identification and gain adjustment", "Firmware update", "IP configuration"],
        explanation: "Auto-tuning identifies the system and automatically adjusts the loop gains."
      },
      "Jusqu'à combien de micro-pas peut-on diviser ?": {
        question: "Up to how many micro-steps can be divided?",
        options: ["1/2", "1/16", "1/256", "Unlimited"],
        explanation: "Some drivers allow up to 1/256 micro-steps, or 51200 steps/rev."
      },
      "Quelle fonction de sécurité est standard dans les servo-variateurs ?": {
        question: "What safety function is standard in servo drives?",
        options: ["None", "STO (Safe Torque Off)", "Complete emergency stop", "Fire protection"],
        explanation: "The STO function is standard in modern servo drives."
      },
      "Que règle-t-on principalement sur un driver pas à pas ?": {
        question: "What is mainly adjusted on a stepper driver?",
        options: ["PID gains", "Current and micro-stepping", "Temperature", "Communication"],
        explanation: "Current (according to the motor) and micro-stepping level are the main settings."
      },
      // Lesson 6: Linear Motors
      "Quel avantage principal du moteur linéaire ?": {
        question: "What is the main advantage of linear motors?",
        options: ["Reduced cost", "No transmission = no mechanical backlash", "Simplicity", "Low power"],
        explanation: "Direct drive eliminates all mechanical backlash from transmissions."
      },
      "Quelle vitesse peut atteindre un moteur linéaire ?": {
        question: "What speed can a linear motor reach?",
        options: ["1 m/s max", "Up to 10 m/s and more", "100 m/s", "Same as rotary"],
        explanation: "Linear motors can reach over 10 m/s."
      },
      "Quel type de moteur linéaire n'a pas d'ondulation de force ?": {
        question: "Which type of linear motor has no force ripple?",
        options: ["Ironcore", "Ironless", "Tubular", "Hybrid"],
        explanation: "Ironless motors have no force ripple (cogging)."
      },
      "Quelle précaution avec les moteurs linéaires ?": {
        question: "What precaution with linear motors?",
        options: ["Avoid water", "Beware of strong magnetic fields", "Do not exceed 1 m/s", "Constant lubrication"],
        explanation: "Powerful magnets can attract metal objects and disturb sensitive equipment."
      },
      "Où utilise-t-on les moteurs linéaires tubulaires ?": {
        question: "Where are tubular linear motors used?",
        options: ["Long strokes", "Compact applications with integrated guidance", "High speed", "High torque"],
        explanation: "Tubular motors are compact and often integrate their guidance."
      }
    },
    es: {
      // Lesson 1: Motores paso a paso
      "Quel est le pas angulaire standard d'un moteur pas à pas ?": {
        question: "¿Cuál es el ángulo de paso estándar de un motor paso a paso?",
        options: ["0.9°", "1.8°", "3.6°", "7.2°"],
        explanation: "El paso estándar es de 1.8°, es decir, 200 pasos por vuelta completa."
      },
      "Qu'est-ce que le micro-stepping ?": {
        question: "¿Qué es el micro-stepping?",
        options: ["Motores pequeños", "División del paso en fracciones", "Pasos muy rápidos", "Motores miniatura"],
        explanation: "El micro-stepping divide cada paso en fracciones más pequeñas para mayor resolución."
      },
      "Quel inconvénient majeur du moteur pas à pas ?": {
        question: "¿Cuál es la principal desventaja del motor paso a paso?",
        options: ["Alto costo", "Posible pérdida de pasos bajo sobrecarga", "Bajo par", "Sin ruido"],
        explanation: "En lazo abierto, una sobrecarga puede causar pérdida de pasos sin detección."
      },
      "Combien de fils pour un moteur bipolaire ?": {
        question: "¿Cuántos cables tiene un motor bipolar?",
        options: ["2", "4", "6", "8"],
        explanation: "Un motor bipolar tiene 4 cables (2 por fase)."
      },
      "Où le moteur pas à pas excelle-t-il ?": {
        question: "¿Dónde destaca el motor paso a paso?",
        options: ["Alta velocidad", "Posicionamiento a baja velocidad", "Alta aceleración", "Cargas variables"],
        explanation: "Los motores paso a paso ofrecen excelente par y mantenimiento de posición a baja velocidad."
      },
      // Lesson 2: Servomotores síncronos
      "Que signifie PMSM ?": {
        question: "¿Qué significa PMSM?",
        options: ["Permanent Magnet Synchronous Motor", "Power Motor Speed Management", "Precision Motion System Module", "Programmable Motor Servo Module"],
        explanation: "PMSM significa Permanent Magnet Synchronous Motor (motor síncrono de imanes permanentes)."
      },
      "Quel rendement typique d'un servomoteur ?": {
        question: "¿Cuál es el rendimiento típico de un servomotor?",
        options: ["50%", "70%", "90% o más", "99%"],
        explanation: "Los servomotores síncronos tienen un excelente rendimiento, a menudo superior al 90%."
      },
      "Quelle surcharge momentanée un servo peut-il fournir ?": {
        question: "¿Qué sobrecarga momentánea puede proporcionar un servo?",
        options: ["Ninguna", "1.5x nominal", "Típicamente 3x nominal", "10x nominal"],
        explanation: "Un servomotor puede proporcionar típicamente 3 veces su par nominal durante unos segundos."
      },
      "Pourquoi les servos n'ont-ils pas de balais ?": {
        question: "¿Por qué los servos no tienen escobillas?",
        options: ["Por el costo", "Sin mantenimiento, mejor rendimiento", "Por casualidad", "Por diseño"],
        explanation: "La ausencia de escobillas elimina el desgaste y las chispas, mejorando el rendimiento y la vida útil."
      },
      "Quel type de retour est intégré aux servomoteurs ?": {
        question: "¿Qué tipo de realimentación está integrada en los servomotores?",
        options: ["Ninguna", "Encoder o resolver", "Potenciómetro", "Solo sonda de temperatura"],
        explanation: "Los servomotores integran un encoder o resolver para la realimentación de posición."
      },
      // Lesson 3: Comparación y elección
      "Quel moteur choisir pour un budget limité ?": {
        question: "¿Qué motor elegir con presupuesto limitado?",
        options: ["Servo", "Paso a paso", "Lineal", "DC brushless"],
        explanation: "El motor paso a paso es significativamente más barato que un sistema servo."
      },
      "Pour quelle application choisir un servo ?": {
        question: "¿Para qué aplicación elegir un servo?",
        options: ["Posicionamiento simple y lento", "Alta dinámica y cargas variables", "Costo mínimo", "Lazo abierto"],
        explanation: "Los servos destacan en aplicaciones dinámicas con cargas variables."
      },
      "Quel moteur est plus silencieux ?": {
        question: "¿Qué motor es más silencioso?",
        options: ["Paso a paso", "Servo", "Son idénticos", "DC con escobillas"],
        explanation: "Los servomotores son generalmente más silenciosos que los motores paso a paso."
      },
      "Lequel peut fonctionner en boucle ouverte ?": {
        question: "¿Cuál puede funcionar en lazo abierto?",
        options: ["Solo servo", "Paso a paso", "Ambos", "Ninguno"],
        explanation: "El motor paso a paso puede funcionar sin realimentación de posición (lazo abierto)."
      },
      "Pour maintenir une position à l'arrêt ?": {
        question: "¿Para mantener una posición en parada?",
        options: ["El servo consume menos", "El paso a paso mantiene naturalmente", "Idéntico", "Imposible"],
        explanation: "El paso a paso mantiene su posición con par incluso detenido, sin control activo."
      },
      // Lesson 4: Dimensionamiento del motor
      "Quelle formule pour le couple d'accélération ?": {
        question: "¿Qué fórmula para el par de aceleración?",
        options: ["T = m × v", "T = J × α", "T = P / ω", "T = F × d"],
        explanation: "El par de aceleración es T = J (inercia) × α (aceleración angular)."
      },
      "Quel rapport d'inertie charge/moteur est optimal ?": {
        question: "¿Qué relación de inercia carga/motor es óptima?",
        options: ["< 1", "= 1", "≤ 10", "> 100"],
        explanation: "Una relación de inercia inferior a 10 asegura buen rendimiento dinámico."
      },
      "Que représente le couple RMS ?": {
        question: "¿Qué representa el par RMS?",
        options: ["Par máximo", "Par medio en el ciclo", "Par mínimo", "Par de arranque"],
        explanation: "El par RMS es el par cuadrático medio en el ciclo, a comparar con el nominal."
      },
      "Un rapport d'inertie trop élevé provoque ?": {
        question: "¿Una relación de inercia demasiado alta provoca?",
        options: ["Mejor precisión", "Inestabilidad y mal rendimiento", "Ahorro de energía", "Ningún efecto"],
        explanation: "Una relación de inercia demasiado alta degrada el rendimiento dinámico y la estabilidad."
      },
      "Que faut-il calculer en premier ?": {
        question: "¿Qué hay que calcular primero?",
        options: ["El par del motor", "La inercia total", "La velocidad máxima", "El precio"],
        explanation: "La inercia total (carga + transmisión + motor) es el punto de partida del dimensionamiento."
      },
      // Lesson 5: Drivers y servo variadores
      "Quels signaux pour un driver pas à pas ?": {
        question: "¿Qué señales para un driver paso a paso?",
        options: ["U, V, W", "Step, Dir, Enable", "0-10V", "CAN bus"],
        explanation: "Un driver paso a paso recibe pulsos (Step), dirección (Dir) y habilitación (Enable)."
      },
      "Qu'est-ce que l'auto-tuning d'un servo-variateur ?": {
        question: "¿Qué es el auto-tuning de un servo variador?",
        options: ["Sintonización de radio", "Identificación y ajuste automático de ganancias", "Actualización de firmware", "Configuración IP"],
        explanation: "El auto-tuning identifica el sistema y ajusta automáticamente las ganancias de los lazos."
      },
      "Jusqu'à combien de micro-pas peut-on diviser ?": {
        question: "¿Hasta cuántos micro-pasos se puede dividir?",
        options: ["1/2", "1/16", "1/256", "Ilimitado"],
        explanation: "Algunos drivers permiten hasta 1/256 micro-pasos, es decir, 51200 pasos/vuelta."
      },
      "Quelle fonction de sécurité est standard dans les servo-variateurs ?": {
        question: "¿Qué función de seguridad es estándar en los servo variadores?",
        options: ["Ninguna", "STO (Safe Torque Off)", "Parada de emergencia completa", "Protección contra incendios"],
        explanation: "La función STO es estándar en los servo variadores modernos."
      },
      "Que règle-t-on principalement sur un driver pas à pas ?": {
        question: "¿Qué se ajusta principalmente en un driver paso a paso?",
        options: ["Las ganancias PID", "La corriente y el micro-stepping", "La temperatura", "La comunicación"],
        explanation: "La corriente (según el motor) y el nivel de micro-stepping son los ajustes principales."
      },
      // Lesson 6: Motores lineales
      "Quel avantage principal du moteur linéaire ?": {
        question: "¿Cuál es la principal ventaja del motor lineal?",
        options: ["Costo reducido", "Sin transmisión = sin juego mecánico", "Simplicidad", "Baja potencia"],
        explanation: "El accionamiento directo elimina todo el juego mecánico de las transmisiones."
      },
      "Quelle vitesse peut atteindre un moteur linéaire ?": {
        question: "¿Qué velocidad puede alcanzar un motor lineal?",
        options: ["1 m/s máximo", "Hasta 10 m/s y más", "100 m/s", "Igual que los rotativos"],
        explanation: "Los motores lineales pueden alcanzar más de 10 m/s."
      },
      "Quel type de moteur linéaire n'a pas d'ondulation de force ?": {
        question: "¿Qué tipo de motor lineal no tiene ondulación de fuerza?",
        options: ["Ironcore", "Ironless", "Tubular", "Híbrido"],
        explanation: "Los motores ironless (sin hierro) no tienen ondulación de fuerza (cogging)."
      },
      "Quelle précaution avec les moteurs linéaires ?": {
        question: "¿Qué precaución con los motores lineales?",
        options: ["Evitar el agua", "Cuidado con los campos magnéticos fuertes", "No superar 1 m/s", "Lubricación constante"],
        explanation: "Los imanes potentes pueden atraer objetos metálicos y perturbar equipos sensibles."
      },
      "Où utilise-t-on les moteurs linéaires tubulaires ?": {
        question: "¿Dónde se utilizan los motores lineales tubulares?",
        options: ["Carreras largas", "Aplicaciones compactas con guiado integrado", "Alta velocidad", "Alto par"],
        explanation: "Los motores tubulares son compactos y a menudo integran su guiado."
      }
    }
  }
}
