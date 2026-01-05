import type { ModuleData } from '../types.js'

export const module12Data: ModuleData = {
  // Module info
  moduleOrder: 12,
  moduleTitle: "Introduction aux variateurs",
  moduleDescription: "Découvrez les fondamentaux des variateurs de fréquence",
  moduleTranslations: {
    en: {
      title: "Introduction to VFDs",
      description: "Discover the fundamentals of variable frequency drives"
    },
    es: {
      title: "Introducción a Variadores",
      description: "Descubra los fundamentos de los variadores de frecuencia"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Qu'est-ce qu'un variateur de vitesse ?",
      description: "Découvrez le principe et les applications des variateurs de fréquence",
      order: 1,
      xpReward: 50,
      duration: 12,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Introduction aux variateurs de vitesse\n\nUn **variateur de vitesse** (VFD - Variable Frequency Drive) est un dispositif électronique permettant de contrôler la vitesse d'un moteur électrique en faisant varier la fréquence et la tension d'alimentation." },
          { type: "info", content: "Les variateurs permettent des économies d'énergie de 20 à 50% dans les applications de pompage et ventilation." },
          { type: "text", content: "## Principe de fonctionnement\n\n1. **Redresseur** : Convertit le courant alternatif en courant continu\n2. **Bus DC** : Stocke l'énergie sous forme continue\n3. **Onduleur** : Convertit le DC en AC à fréquence variable\n4. **Contrôle** : Gère la vitesse selon la consigne" },
          { type: "text", content: "## Applications courantes\n\n- Pompes et ventilateurs\n- Convoyeurs\n- Compresseurs\n- Machines-outils\n- Systèmes de levage" }
        ]
      })
    },
    {
      title: "Types de moteurs et variateurs",
      description: "Apprenez les différents types de moteurs compatibles avec les variateurs",
      order: 2,
      xpReward: 55,
      duration: 14,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Types de moteurs et variateurs\n\nLes variateurs de vitesse sont principalement conçus pour les moteurs asynchrones, mais d'autres types existent." },
          { type: "text", content: "## Moteurs asynchrones (AC)\n\n- **Cage d'écureuil** : Le plus courant, robuste et économique\n- **À rotor bobiné** : Pour applications spéciales\n- **Caractéristiques** : Couple constant, vitesse variable" },
          { type: "text", content: "## Types de variateurs\n\n| Type | Application | Caractéristiques |\n|------|------------|------------------|\n| Scalaire (V/f) | Pompes, ventilateurs | Simple, économique |\n| Vectoriel boucle ouverte | Convoyeurs, mixeurs | Bon couple basse vitesse |\n| Vectoriel boucle fermée | Levage, positionnement | Haute performance |\n| Servo-drive | Robotique, CNC | Très haute dynamique |" },
          { type: "warning", content: "Un moteur standard ne doit pas fonctionner en continu en dessous de 30% de sa vitesse nominale sans ventilation forcée." }
        ]
      })
    },
    {
      title: "Schémas de câblage",
      description: "Comprenez le câblage électrique d'un variateur de vitesse",
      order: 3,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Câblage d'un variateur de vitesse\n\nLe câblage correct d'un variateur est essentiel pour son bon fonctionnement et la sécurité." },
          { type: "text", content: "## Circuit puissance\n\n- **L1, L2, L3** : Alimentation réseau triphasé\n- **U, V, W** : Sortie vers le moteur\n- **PE** : Terre de protection" },
          { type: "text", content: "## Circuit de commande\n\n- **Entrées numériques** : Marche/Arrêt, sens de rotation\n- **Entrées analogiques** : Consigne vitesse (0-10V ou 4-20mA)\n- **Sorties relais** : Défaut, prêt, en marche\n- **Sorties analogiques** : Retour vitesse, courant" },
          { type: "warning", content: "Respectez toujours les distances de câblage entre les circuits puissance et commande pour éviter les perturbations électromagnétiques." }
        ]
      })
    },
    {
      title: "Protections et sécurité",
      description: "Découvrez les dispositifs de protection des variateurs",
      order: 4,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Protections et sécurité\n\nLes variateurs intègrent de nombreuses protections pour le moteur et l'installation." },
          { type: "text", content: "## Protections intégrées\n\n- **Surcharge thermique** : Protection I²t du moteur\n- **Court-circuit** : Détection instantanée\n- **Surtension/Sous-tension** : Surveillance du bus DC\n- **Défaut terre** : Protection différentielle" },
          { type: "text", content: "## Fonctions de sécurité\n\n- **STO** (Safe Torque Off) : Coupure sûre du couple\n- **SLS** (Safely Limited Speed) : Vitesse limitée sûre\n- **SS1** (Safe Stop 1) : Arrêt contrôlé puis STO\n- **SBC** (Safe Brake Control) : Gestion sûre du frein" },
          { type: "info", content: "Les fonctions de sécurité intégrées (STO, SS1, etc.) sont certifiées SIL2/PLd selon les normes IEC 61508 et ISO 13849." }
        ]
      })
    },
    {
      title: "Économie d'énergie",
      description: "Optimisez la consommation énergétique avec les variateurs",
      order: 5,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Économie d'énergie\n\nLes variateurs de vitesse sont des outils majeurs pour réduire la consommation énergétique." },
          { type: "text", content: "## Loi du cube (pompes/ventilateurs)\n\nLa puissance consommée varie avec le cube de la vitesse :\n- 80% vitesse = 51% de puissance\n- 60% vitesse = 22% de puissance\n- 50% vitesse = 12.5% de puissance" },
          { type: "info", content: "Une réduction de vitesse de 20% sur une pompe peut réduire la consommation de près de 50% !" },
          { type: "text", content: "## Bonnes pratiques\n\n1. Dimensionner correctement le moteur\n2. Utiliser le mode économie d'énergie\n3. Optimiser les rampes d'accélération\n4. Récupérer l'énergie de freinage" }
        ]
      })
    },
    {
      title: "Marques et modèles courants",
      description: "Découvrez les principaux fabricants de variateurs",
      order: 6,
      xpReward: 45,
      duration: 10,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Principaux fabricants\n\nLe marché des variateurs est dominé par quelques grands acteurs." },
          { type: "text", content: "## Fabricants majeurs\n\n| Fabricant | Gammes | Points forts |\n|-----------|--------|-------------|\n| ABB | ACS580, ACS880 | Robustesse, industrie lourde |\n| Siemens | SINAMICS G, S | Intégration TIA Portal |\n| Schneider | Altivar | Simplicité, bâtiment |\n| Danfoss | VLT | HVAC, efficacité |\n| SEW | MOVIDRIVE | Précision, convoyage |" },
          { type: "text", content: "## Critères de choix\n\n- Puissance et tension\n- Type de contrôle requis\n- Environnement (IP, température)\n- Options de communication\n- Support technique local" }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Qu'est-ce qu'un variateur de vitesse ?": {
        title: "What is a Variable Frequency Drive?",
        description: "Discover the principle and applications of VFDs"
      },
      "Types de moteurs et variateurs": {
        title: "Types of Motors and Drives",
        description: "Learn about different motor types compatible with VFDs"
      },
      "Schémas de câblage": {
        title: "Wiring Diagrams",
        description: "Understand the electrical wiring of a VFD"
      },
      "Protections et sécurité": {
        title: "Protections and Safety",
        description: "Discover VFD protection devices"
      },
      "Économie d'énergie": {
        title: "Energy Savings",
        description: "Optimize energy consumption with VFDs"
      },
      "Marques et modèles courants": {
        title: "Common Brands and Models",
        description: "Discover the main VFD manufacturers"
      }
    },
    es: {
      "Qu'est-ce qu'un variateur de vitesse ?": {
        title: "¿Qué es un variador de frecuencia?",
        description: "Descubra el principio y aplicaciones de los variadores"
      },
      "Types de moteurs et variateurs": {
        title: "Tipos de motores y variadores",
        description: "Conozca los diferentes tipos de motores compatibles"
      },
      "Schémas de câblage": {
        title: "Esquemas de cableado",
        description: "Comprenda el cableado eléctrico de un variador"
      },
      "Protections et sécurité": {
        title: "Protecciones y seguridad",
        description: "Descubra los dispositivos de protección"
      },
      "Économie d'énergie": {
        title: "Ahorro de energía",
        description: "Optimice el consumo con variadores"
      },
      "Marques et modèles courants": {
        title: "Marcas y modelos comunes",
        description: "Descubra los principales fabricantes"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1 quizzes: Qu'est-ce qu'un variateur de vitesse ?
    [
      { question: "Que signifie l'acronyme VFD ?", options: ["Variable Frequency Drive", "Voltage Flux Device", "Virtual Field Data", "Variable Flow Driver"], correctIndex: 0, explanation: "VFD signifie Variable Frequency Drive, soit variateur de fréquence en français.", order: 1 },
      { question: "Quel composant du variateur convertit le DC en AC variable ?", options: ["Le redresseur", "Le bus DC", "L'onduleur", "Le filtre"], correctIndex: 2, explanation: "L'onduleur (inverter) convertit le courant continu en courant alternatif à fréquence variable.", order: 2 },
      { question: "Quelle économie d'énergie peut-on attendre sur les pompes/ventilateurs ?", options: ["5 à 10%", "20 à 50%", "60 à 80%", "Aucune"], correctIndex: 1, explanation: "Les variateurs permettent des économies de 20 à 50% sur les applications de pompage et ventilation grâce à la loi du cube.", order: 3 },
      { question: "Quelle est la fonction du redresseur ?", options: ["Convertir AC en DC", "Convertir DC en AC", "Filtrer les harmoniques", "Contrôler la vitesse"], correctIndex: 0, explanation: "Le redresseur convertit le courant alternatif du réseau en courant continu pour le bus DC.", order: 4 },
      { question: "Pour quelle application les variateurs sont-ils particulièrement adaptés ?", options: ["Éclairage", "Chauffage résistif", "Pompes et ventilateurs", "Ordinateurs"], correctIndex: 2, explanation: "Les variateurs sont très efficaces pour les pompes et ventilateurs où la puissance varie avec le cube de la vitesse.", order: 5 }
    ],
    // Lesson 2 quizzes: Types de moteurs et variateurs
    [
      { question: "Quel type de moteur est le plus couramment utilisé avec les variateurs ?", options: ["Moteur à courant continu", "Moteur asynchrone cage d'écureuil", "Moteur synchrone", "Moteur universel"], correctIndex: 1, explanation: "Le moteur asynchrone à cage d'écureuil est le plus courant car robuste, économique et bien adapté aux variateurs.", order: 1 },
      { question: "Quel type de variateur offre le meilleur couple à basse vitesse ?", options: ["Scalaire (V/f)", "Vectoriel", "PWM simple", "Résistance rotorique"], correctIndex: 1, explanation: "Le contrôle vectoriel offre un excellent couple même à très basse vitesse.", order: 2 },
      { question: "En dessous de quelle vitesse un moteur standard nécessite-t-il une ventilation forcée ?", options: ["50%", "30%", "10%", "5%"], correctIndex: 1, explanation: "En dessous de 30% de la vitesse nominale, le ventilateur intégré ne suffit plus à refroidir le moteur.", order: 3 },
      { question: "Pour quelle application utilise-t-on un servo-drive ?", options: ["Pompe centrifuge", "Ventilation bâtiment", "Robotique et CNC", "Climatisation"], correctIndex: 2, explanation: "Les servo-drives offrent une très haute dynamique nécessaire pour la robotique et les machines CNC.", order: 4 },
      { question: "Que signifie V/f dans le contrôle scalaire ?", options: ["Vitesse/fréquence", "Tension/fréquence", "Voltage/flux", "Variable/fixe"], correctIndex: 1, explanation: "Le contrôle V/f maintient un rapport constant entre la tension et la fréquence pour garder le flux constant.", order: 5 }
    ],
    // Lesson 3 quizzes: Schémas de câblage
    [
      { question: "Comment sont désignées les bornes de sortie moteur d'un variateur ?", options: ["L1, L2, L3", "U, V, W", "R, S, T", "A, B, C"], correctIndex: 1, explanation: "Les sorties vers le moteur sont conventionnellement désignées U, V, W.", order: 1 },
      { question: "Quel type de signal est couramment utilisé pour la consigne vitesse ?", options: ["0-5V uniquement", "0-10V ou 4-20mA", "Signal carré", "HDMI"], correctIndex: 1, explanation: "Les signaux 0-10V et 4-20mA sont les standards industriels pour les consignes analogiques.", order: 2 },
      { question: "Pourquoi séparer les câbles puissance et commande ?", options: ["Pour faciliter la maintenance", "Pour éviter les perturbations électromagnétiques", "C'est obligatoire par la norme", "Pour réduire les coûts"], correctIndex: 1, explanation: "La séparation évite que les signaux de puissance perturbent les signaux de commande sensibles.", order: 3 },
      { question: "À quoi sert la borne PE ?", options: ["Alimentation", "Sortie relais", "Terre de protection", "Entrée analogique"], correctIndex: 2, explanation: "PE (Protective Earth) est la connexion de terre de protection pour la sécurité électrique.", order: 4 },
      { question: "Que signalent typiquement les sorties relais d'un variateur ?", options: ["La température ambiante", "Défaut, prêt, en marche", "La consigne vitesse", "Le courant moteur"], correctIndex: 1, explanation: "Les relais signalent généralement l'état du variateur : défaut, prêt à fonctionner, moteur en marche.", order: 5 }
    ],
    // Lesson 4 quizzes: Protections et sécurité
    [
      { question: "Que signifie STO ?", options: ["Standard Terminal Output", "Safe Torque Off", "Speed Tracking Option", "System Test Operation"], correctIndex: 1, explanation: "STO (Safe Torque Off) est une fonction de sécurité qui coupe le couple moteur de façon sûre.", order: 1 },
      { question: "Quelle protection surveille la charge thermique du moteur ?", options: ["Surtension", "Protection I²t", "Défaut terre", "Court-circuit"], correctIndex: 1, explanation: "La protection I²t (I carré t) calcule l'échauffement du moteur en fonction du courant et du temps.", order: 2 },
      { question: "À quel niveau de sécurité les fonctions STO sont-elles généralement certifiées ?", options: ["SIL1/PLc", "SIL2/PLd", "SIL3/PLe", "Aucune certification"], correctIndex: 1, explanation: "Les fonctions STO sont typiquement certifiées SIL2/PLd selon IEC 61508 et ISO 13849.", order: 3 },
      { question: "Que fait la fonction SS1 ?", options: ["Démarre le moteur", "Arrêt contrôlé puis STO", "Limite la vitesse", "Active le frein"], correctIndex: 1, explanation: "SS1 (Safe Stop 1) effectue un arrêt contrôlé sur rampe puis active le STO.", order: 4 },
      { question: "Quelle protection détecte un défaut d'isolement ?", options: ["Surtension", "Surcharge", "Défaut terre", "Sous-tension"], correctIndex: 2, explanation: "La protection défaut terre (ground fault) détecte les courants de fuite vers la terre.", order: 5 }
    ],
    // Lesson 5 quizzes: Économie d'énergie
    [
      { question: "Selon la loi du cube, à 50% de vitesse, quelle est la puissance consommée ?", options: ["50%", "25%", "12.5%", "6.25%"], correctIndex: 2, explanation: "À 50% de vitesse, la puissance est de 0.5³ = 0.125 soit 12.5% de la puissance nominale.", order: 1 },
      { question: "Quelle application bénéficie le plus de la loi du cube ?", options: ["Levage", "Convoyeur", "Pompe centrifuge", "Presse hydraulique"], correctIndex: 2, explanation: "Les pompes centrifuges et ventilateurs suivent la loi d'affinité où la puissance varie avec le cube de la vitesse.", order: 2 },
      { question: "Comment récupérer l'énergie de freinage ?", options: ["Résistance de freinage", "Renvoi au réseau", "Les deux sont possibles", "Ce n'est pas possible"], correctIndex: 2, explanation: "L'énergie peut être dissipée dans une résistance ou renvoyée au réseau avec un variateur régénératif.", order: 3 },
      { question: "Pourquoi dimensionner correctement le moteur ?", options: ["Réduire le coût initial", "Optimiser le rendement", "Simplifier le câblage", "Faciliter la maintenance"], correctIndex: 1, explanation: "Un moteur surdimensionné fonctionne à charge partielle avec un rendement dégradé.", order: 4 },
      { question: "Qu'est-ce que le mode économie d'énergie du variateur ?", options: ["Arrêt automatique", "Réduction de tension à faible charge", "Limitation de vitesse", "Mise en veille"], correctIndex: 1, explanation: "Le mode éco réduit la tension moteur quand la charge est faible pour diminuer les pertes fer.", order: 5 }
    ],
    // Lesson 6 quizzes: Marques et modèles courants
    [
      { question: "Quelle marque est réputée pour l'intégration TIA Portal ?", options: ["ABB", "Siemens", "Danfoss", "SEW"], correctIndex: 1, explanation: "Les variateurs Siemens SINAMICS s'intègrent nativement dans l'environnement TIA Portal.", order: 1 },
      { question: "Pour quelle application Danfoss est-il particulièrement reconnu ?", options: ["Robotique", "HVAC et efficacité énergétique", "Industrie lourde", "Machines-outils"], correctIndex: 1, explanation: "Danfoss VLT est reconnu pour les applications HVAC et son efficacité énergétique.", order: 2 },
      { question: "Quel critère n'est PAS important dans le choix d'un variateur ?", options: ["Puissance et tension", "Couleur du boîtier", "Type de contrôle", "Options de communication"], correctIndex: 1, explanation: "La couleur est purement esthétique et n'affecte pas les performances du variateur.", order: 3 },
      { question: "Que signifie IP dans les caractéristiques environnementales ?", options: ["Internet Protocol", "Indice de Protection", "Input Power", "Integrated Processor"], correctIndex: 1, explanation: "L'indice IP (Ingress Protection) indique le niveau de protection contre la poussière et l'eau.", order: 4 },
      { question: "Quelle gamme ABB est adaptée à l'industrie lourde ?", options: ["ACS180", "ACS310", "ACS880", "ACS50"], correctIndex: 2, explanation: "La gamme ACS880 est la gamme industrielle haute performance d'ABB.", order: 5 }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1 quizzes
      "Que signifie l'acronyme VFD ?": {
        question: "What does VFD stand for?",
        options: ["Variable Frequency Drive", "Voltage Flux Device", "Virtual Field Data", "Variable Flow Driver"],
        explanation: "VFD stands for Variable Frequency Drive, used to control motor speed."
      },
      "Quel composant du variateur convertit le DC en AC variable ?": {
        question: "Which VFD component converts DC to variable AC?",
        options: ["The rectifier", "The DC bus", "The inverter", "The filter"],
        explanation: "The inverter converts direct current to alternating current at variable frequency."
      },
      "Quelle économie d'énergie peut-on attendre sur les pompes/ventilateurs ?": {
        question: "What energy savings can be expected on pumps/fans?",
        options: ["5 to 10%", "20 to 50%", "60 to 80%", "None"],
        explanation: "VFDs allow 20 to 50% savings on pumping and ventilation applications thanks to the cube law."
      },
      "Quelle est la fonction du redresseur ?": {
        question: "What is the function of the rectifier?",
        options: ["Convert AC to DC", "Convert DC to AC", "Filter harmonics", "Control speed"],
        explanation: "The rectifier converts alternating current from the grid to direct current for the DC bus."
      },
      "Pour quelle application les variateurs sont-ils particulièrement adaptés ?": {
        question: "For which application are VFDs particularly suited?",
        options: ["Lighting", "Resistive heating", "Pumps and fans", "Computers"],
        explanation: "VFDs are very effective for pumps and fans where power varies with the cube of speed."
      },
      // Lesson 2 quizzes
      "Quel type de moteur est le plus couramment utilisé avec les variateurs ?": {
        question: "What type of motor is most commonly used with VFDs?",
        options: ["DC motor", "Squirrel cage induction motor", "Synchronous motor", "Universal motor"],
        explanation: "The squirrel cage induction motor is most common because it's robust, economical and well suited to VFDs."
      },
      "Quel type de variateur offre le meilleur couple à basse vitesse ?": {
        question: "What type of drive offers the best torque at low speed?",
        options: ["Scalar (V/f)", "Vector", "Simple PWM", "Rotor resistance"],
        explanation: "Vector control offers excellent torque even at very low speed."
      },
      "En dessous de quelle vitesse un moteur standard nécessite-t-il une ventilation forcée ?": {
        question: "Below what speed does a standard motor require forced ventilation?",
        options: ["50%", "30%", "10%", "5%"],
        explanation: "Below 30% of nominal speed, the built-in fan is no longer sufficient to cool the motor."
      },
      "Pour quelle application utilise-t-on un servo-drive ?": {
        question: "For what application is a servo drive used?",
        options: ["Centrifugal pump", "Building ventilation", "Robotics and CNC", "Air conditioning"],
        explanation: "Servo drives offer very high dynamics needed for robotics and CNC machines."
      },
      "Que signifie V/f dans le contrôle scalaire ?": {
        question: "What does V/f mean in scalar control?",
        options: ["Velocity/frequency", "Voltage/frequency", "Voltage/flux", "Variable/fixed"],
        explanation: "V/f control maintains a constant ratio between voltage and frequency to keep the flux constant."
      },
      // Lesson 3 quizzes
      "Comment sont désignées les bornes de sortie moteur d'un variateur ?": {
        question: "How are the motor output terminals of a VFD designated?",
        options: ["L1, L2, L3", "U, V, W", "R, S, T", "A, B, C"],
        explanation: "Motor outputs are conventionally designated U, V, W."
      },
      "Quel type de signal est couramment utilisé pour la consigne vitesse ?": {
        question: "What type of signal is commonly used for speed reference?",
        options: ["0-5V only", "0-10V or 4-20mA", "Square wave", "HDMI"],
        explanation: "0-10V and 4-20mA signals are industrial standards for analog references."
      },
      "Pourquoi séparer les câbles puissance et commande ?": {
        question: "Why separate power and control cables?",
        options: ["To facilitate maintenance", "To avoid electromagnetic interference", "It's required by standards", "To reduce costs"],
        explanation: "Separation prevents power signals from interfering with sensitive control signals."
      },
      "À quoi sert la borne PE ?": {
        question: "What is the PE terminal for?",
        options: ["Power supply", "Relay output", "Protective earth", "Analog input"],
        explanation: "PE (Protective Earth) is the protective ground connection for electrical safety."
      },
      "Que signalent typiquement les sorties relais d'un variateur ?": {
        question: "What do VFD relay outputs typically signal?",
        options: ["Ambient temperature", "Fault, ready, running", "Speed reference", "Motor current"],
        explanation: "Relays typically signal the VFD status: fault, ready to operate, motor running."
      },
      // Lesson 4 quizzes
      "Que signifie STO ?": {
        question: "What does STO mean?",
        options: ["Standard Terminal Output", "Safe Torque Off", "Speed Tracking Option", "System Test Operation"],
        explanation: "STO (Safe Torque Off) is a safety function that safely cuts motor torque."
      },
      "Quelle protection surveille la charge thermique du moteur ?": {
        question: "Which protection monitors the motor's thermal load?",
        options: ["Overvoltage", "I²t protection", "Ground fault", "Short circuit"],
        explanation: "I²t protection (I squared t) calculates motor heating based on current and time."
      },
      "À quel niveau de sécurité les fonctions STO sont-elles généralement certifiées ?": {
        question: "At what safety level are STO functions typically certified?",
        options: ["SIL1/PLc", "SIL2/PLd", "SIL3/PLe", "No certification"],
        explanation: "STO functions are typically certified SIL2/PLd according to IEC 61508 and ISO 13849."
      },
      "Que fait la fonction SS1 ?": {
        question: "What does the SS1 function do?",
        options: ["Starts the motor", "Controlled stop then STO", "Limits speed", "Activates brake"],
        explanation: "SS1 (Safe Stop 1) performs a controlled ramp stop then activates STO."
      },
      "Quelle protection détecte un défaut d'isolement ?": {
        question: "Which protection detects an insulation fault?",
        options: ["Overvoltage", "Overload", "Ground fault", "Undervoltage"],
        explanation: "Ground fault protection detects leakage currents to earth."
      },
      // Lesson 5 quizzes
      "Selon la loi du cube, à 50% de vitesse, quelle est la puissance consommée ?": {
        question: "According to the cube law, at 50% speed, what is the power consumed?",
        options: ["50%", "25%", "12.5%", "6.25%"],
        explanation: "At 50% speed, power is 0.5³ = 0.125 or 12.5% of nominal power."
      },
      "Quelle application bénéficie le plus de la loi du cube ?": {
        question: "Which application benefits most from the cube law?",
        options: ["Hoisting", "Conveyor", "Centrifugal pump", "Hydraulic press"],
        explanation: "Centrifugal pumps and fans follow the affinity law where power varies with the cube of speed."
      },
      "Comment récupérer l'énergie de freinage ?": {
        question: "How to recover braking energy?",
        options: ["Braking resistor", "Regeneration to grid", "Both are possible", "It's not possible"],
        explanation: "Energy can be dissipated in a resistor or returned to the grid with a regenerative drive."
      },
      "Pourquoi dimensionner correctement le moteur ?": {
        question: "Why size the motor correctly?",
        options: ["Reduce initial cost", "Optimize efficiency", "Simplify wiring", "Facilitate maintenance"],
        explanation: "An oversized motor operates at partial load with degraded efficiency."
      },
      "Qu'est-ce que le mode économie d'énergie du variateur ?": {
        question: "What is the VFD's energy saving mode?",
        options: ["Automatic shutdown", "Voltage reduction at light load", "Speed limitation", "Sleep mode"],
        explanation: "Eco mode reduces motor voltage when load is light to decrease iron losses."
      },
      // Lesson 6 quizzes
      "Quelle marque est réputée pour l'intégration TIA Portal ?": {
        question: "Which brand is known for TIA Portal integration?",
        options: ["ABB", "Siemens", "Danfoss", "SEW"],
        explanation: "Siemens SINAMICS drives integrate natively into the TIA Portal environment."
      },
      "Pour quelle application Danfoss est-il particulièrement reconnu ?": {
        question: "For what application is Danfoss particularly recognized?",
        options: ["Robotics", "HVAC and energy efficiency", "Heavy industry", "Machine tools"],
        explanation: "Danfoss VLT is recognized for HVAC applications and energy efficiency."
      },
      "Quel critère n'est PAS important dans le choix d'un variateur ?": {
        question: "Which criterion is NOT important in choosing a VFD?",
        options: ["Power and voltage", "Cabinet color", "Control type", "Communication options"],
        explanation: "Color is purely aesthetic and does not affect VFD performance."
      },
      "Que signifie IP dans les caractéristiques environnementales ?": {
        question: "What does IP mean in environmental specifications?",
        options: ["Internet Protocol", "Ingress Protection", "Input Power", "Integrated Processor"],
        explanation: "IP (Ingress Protection) indicates the level of protection against dust and water."
      },
      "Quelle gamme ABB est adaptée à l'industrie lourde ?": {
        question: "Which ABB range is suited for heavy industry?",
        options: ["ACS180", "ACS310", "ACS880", "ACS50"],
        explanation: "The ACS880 range is ABB's high-performance industrial range."
      }
    },
    es: {
      // Lesson 1 quizzes
      "Que signifie l'acronyme VFD ?": {
        question: "¿Qué significa el acrónimo VFD?",
        options: ["Variable Frequency Drive", "Voltage Flux Device", "Virtual Field Data", "Variable Flow Driver"],
        explanation: "VFD significa Variable Frequency Drive, o variador de frecuencia en español."
      },
      "Quel composant du variateur convertit le DC en AC variable ?": {
        question: "¿Qué componente del variador convierte DC a AC variable?",
        options: ["El rectificador", "El bus DC", "El inversor", "El filtro"],
        explanation: "El inversor convierte la corriente continua en corriente alterna a frecuencia variable."
      },
      "Quelle économie d'énergie peut-on attendre sur les pompes/ventilateurs ?": {
        question: "¿Qué ahorro de energía se puede esperar en bombas/ventiladores?",
        options: ["5 a 10%", "20 a 50%", "60 a 80%", "Ninguno"],
        explanation: "Los variadores permiten ahorros de 20 a 50% en aplicaciones de bombeo y ventilación gracias a la ley del cubo."
      },
      "Quelle est la fonction du redresseur ?": {
        question: "¿Cuál es la función del rectificador?",
        options: ["Convertir AC a DC", "Convertir DC a AC", "Filtrar armónicos", "Controlar velocidad"],
        explanation: "El rectificador convierte la corriente alterna de la red en corriente continua para el bus DC."
      },
      "Pour quelle application les variateurs sont-ils particulièrement adaptés ?": {
        question: "¿Para qué aplicación son particularmente adecuados los variadores?",
        options: ["Iluminación", "Calefacción resistiva", "Bombas y ventiladores", "Ordenadores"],
        explanation: "Los variadores son muy eficaces para bombas y ventiladores donde la potencia varía con el cubo de la velocidad."
      },
      // Lesson 2 quizzes
      "Quel type de moteur est le plus couramment utilisé avec les variateurs ?": {
        question: "¿Qué tipo de motor se usa más comúnmente con los variadores?",
        options: ["Motor de corriente continua", "Motor asíncrono jaula de ardilla", "Motor síncrono", "Motor universal"],
        explanation: "El motor asíncrono de jaula de ardilla es el más común porque es robusto, económico y bien adaptado a los variadores."
      },
      "Quel type de variateur offre le meilleur couple à basse vitesse ?": {
        question: "¿Qué tipo de variador ofrece el mejor par a baja velocidad?",
        options: ["Escalar (V/f)", "Vectorial", "PWM simple", "Resistencia rotórica"],
        explanation: "El control vectorial ofrece un excelente par incluso a muy baja velocidad."
      },
      "En dessous de quelle vitesse un moteur standard nécessite-t-il une ventilation forcée ?": {
        question: "¿Por debajo de qué velocidad un motor estándar necesita ventilación forzada?",
        options: ["50%", "30%", "10%", "5%"],
        explanation: "Por debajo del 30% de la velocidad nominal, el ventilador integrado ya no es suficiente para enfriar el motor."
      },
      "Pour quelle application utilise-t-on un servo-drive ?": {
        question: "¿Para qué aplicación se utiliza un servo drive?",
        options: ["Bomba centrífuga", "Ventilación de edificios", "Robótica y CNC", "Aire acondicionado"],
        explanation: "Los servo drives ofrecen una dinámica muy alta necesaria para robótica y máquinas CNC."
      },
      "Que signifie V/f dans le contrôle scalaire ?": {
        question: "¿Qué significa V/f en el control escalar?",
        options: ["Velocidad/frecuencia", "Tensión/frecuencia", "Voltaje/flujo", "Variable/fijo"],
        explanation: "El control V/f mantiene una relación constante entre tensión y frecuencia para mantener el flujo constante."
      },
      // Lesson 3 quizzes
      "Comment sont désignées les bornes de sortie moteur d'un variateur ?": {
        question: "¿Cómo se designan los terminales de salida de motor de un variador?",
        options: ["L1, L2, L3", "U, V, W", "R, S, T", "A, B, C"],
        explanation: "Las salidas hacia el motor se designan convencionalmente U, V, W."
      },
      "Quel type de signal est couramment utilisé pour la consigne vitesse ?": {
        question: "¿Qué tipo de señal se usa comúnmente para la referencia de velocidad?",
        options: ["0-5V únicamente", "0-10V o 4-20mA", "Señal cuadrada", "HDMI"],
        explanation: "Las señales 0-10V y 4-20mA son los estándares industriales para referencias analógicas."
      },
      "Pourquoi séparer les câbles puissance et commande ?": {
        question: "¿Por qué separar los cables de potencia y control?",
        options: ["Para facilitar el mantenimiento", "Para evitar interferencias electromagnéticas", "Es obligatorio por norma", "Para reducir costos"],
        explanation: "La separación evita que las señales de potencia perturben las señales de control sensibles."
      },
      "À quoi sert la borne PE ?": {
        question: "¿Para qué sirve el terminal PE?",
        options: ["Alimentación", "Salida de relé", "Tierra de protección", "Entrada analógica"],
        explanation: "PE (Protective Earth) es la conexión de tierra de protección para la seguridad eléctrica."
      },
      "Que signalent typiquement les sorties relais d'un variateur ?": {
        question: "¿Qué señalan típicamente las salidas de relé de un variador?",
        options: ["La temperatura ambiente", "Fallo, listo, en marcha", "La referencia de velocidad", "La corriente del motor"],
        explanation: "Los relés señalan generalmente el estado del variador: fallo, listo para funcionar, motor en marcha."
      },
      // Lesson 4 quizzes
      "Que signifie STO ?": {
        question: "¿Qué significa STO?",
        options: ["Standard Terminal Output", "Safe Torque Off", "Speed Tracking Option", "System Test Operation"],
        explanation: "STO (Safe Torque Off) es una función de seguridad que corta el par del motor de forma segura."
      },
      "Quelle protection surveille la charge thermique du moteur ?": {
        question: "¿Qué protección supervisa la carga térmica del motor?",
        options: ["Sobretensión", "Protección I²t", "Fallo a tierra", "Cortocircuito"],
        explanation: "La protección I²t (I cuadrado t) calcula el calentamiento del motor en función de la corriente y el tiempo."
      },
      "À quel niveau de sécurité les fonctions STO sont-elles généralement certifiées ?": {
        question: "¿A qué nivel de seguridad están típicamente certificadas las funciones STO?",
        options: ["SIL1/PLc", "SIL2/PLd", "SIL3/PLe", "Sin certificación"],
        explanation: "Las funciones STO están típicamente certificadas SIL2/PLd según IEC 61508 e ISO 13849."
      },
      "Que fait la fonction SS1 ?": {
        question: "¿Qué hace la función SS1?",
        options: ["Arranca el motor", "Parada controlada luego STO", "Limita la velocidad", "Activa el freno"],
        explanation: "SS1 (Safe Stop 1) realiza una parada controlada en rampa y luego activa el STO."
      },
      "Quelle protection détecte un défaut d'isolement ?": {
        question: "¿Qué protección detecta un fallo de aislamiento?",
        options: ["Sobretensión", "Sobrecarga", "Fallo a tierra", "Subtensión"],
        explanation: "La protección de fallo a tierra detecta las corrientes de fuga hacia tierra."
      },
      // Lesson 5 quizzes
      "Selon la loi du cube, à 50% de vitesse, quelle est la puissance consommée ?": {
        question: "Según la ley del cubo, al 50% de velocidad, ¿cuál es la potencia consumida?",
        options: ["50%", "25%", "12.5%", "6.25%"],
        explanation: "Al 50% de velocidad, la potencia es 0.5³ = 0.125 o 12.5% de la potencia nominal."
      },
      "Quelle application bénéficie le plus de la loi du cube ?": {
        question: "¿Qué aplicación se beneficia más de la ley del cubo?",
        options: ["Elevación", "Transportador", "Bomba centrífuga", "Prensa hidráulica"],
        explanation: "Las bombas centrífugas y ventiladores siguen la ley de afinidad donde la potencia varía con el cubo de la velocidad."
      },
      "Comment récupérer l'énergie de freinage ?": {
        question: "¿Cómo recuperar la energía de frenado?",
        options: ["Resistencia de frenado", "Devolución a la red", "Ambas son posibles", "No es posible"],
        explanation: "La energía puede disiparse en una resistencia o devolverse a la red con un variador regenerativo."
      },
      "Pourquoi dimensionner correctement le moteur ?": {
        question: "¿Por qué dimensionar correctamente el motor?",
        options: ["Reducir el costo inicial", "Optimizar el rendimiento", "Simplificar el cableado", "Facilitar el mantenimiento"],
        explanation: "Un motor sobredimensionado funciona a carga parcial con un rendimiento degradado."
      },
      "Qu'est-ce que le mode économie d'énergie du variateur ?": {
        question: "¿Qué es el modo ahorro de energía del variador?",
        options: ["Apagado automático", "Reducción de tensión a baja carga", "Limitación de velocidad", "Modo de espera"],
        explanation: "El modo eco reduce la tensión del motor cuando la carga es baja para disminuir las pérdidas en el hierro."
      },
      // Lesson 6 quizzes
      "Quelle marque est réputée pour l'intégration TIA Portal ?": {
        question: "¿Qué marca es conocida por la integración con TIA Portal?",
        options: ["ABB", "Siemens", "Danfoss", "SEW"],
        explanation: "Los variadores Siemens SINAMICS se integran nativamente en el entorno TIA Portal."
      },
      "Pour quelle application Danfoss est-il particulièrement reconnu ?": {
        question: "¿Para qué aplicación es Danfoss particularmente reconocido?",
        options: ["Robótica", "HVAC y eficiencia energética", "Industria pesada", "Máquinas herramienta"],
        explanation: "Danfoss VLT es reconocido por aplicaciones HVAC y su eficiencia energética."
      },
      "Quel critère n'est PAS important dans le choix d'un variateur ?": {
        question: "¿Qué criterio NO es importante en la elección de un variador?",
        options: ["Potencia y tensión", "Color del gabinete", "Tipo de control", "Opciones de comunicación"],
        explanation: "El color es puramente estético y no afecta el rendimiento del variador."
      },
      "Que signifie IP dans les caractéristiques environnementales ?": {
        question: "¿Qué significa IP en las características ambientales?",
        options: ["Internet Protocol", "Índice de Protección", "Input Power", "Integrated Processor"],
        explanation: "El índice IP (Ingress Protection) indica el nivel de protección contra polvo y agua."
      },
      "Quelle gamme ABB est adaptée à l'industrie lourde ?": {
        question: "¿Qué gama de ABB es adecuada para la industria pesada?",
        options: ["ACS180", "ACS310", "ACS880", "ACS50"],
        explanation: "La gama ACS880 es la gama industrial de alto rendimiento de ABB."
      }
    }
  }
}
