// Module 14: VFD Communication and Diagnostics
import type { ModuleData } from '../types.js'

export const module14Data: ModuleData = {
  // Module info
  moduleOrder: 14,
  moduleTitle: "Communication et diagnostic VFD",
  moduleDescription: "Maîtrisez la communication industrielle et le diagnostic des variateurs",
  moduleTranslations: {
    en: {
      title: "VFD Communication and Diagnostics",
      description: "Master industrial communication and VFD diagnostics"
    },
    es: {
      title: "Comunicación y Diagnóstico VFD",
      description: "Domine la comunicación industrial y diagnóstico de variadores"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Protocoles de communication",
      description: "Découvrez les protocoles de communication industrielle",
      order: 1,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Protocoles de communication\n\nLes variateurs modernes supportent de nombreux protocoles de communication industrielle." },
          { type: "text", content: "## Protocoles courants\n\n| Protocole | Type | Vitesse | Fabricants |\n|-----------|------|---------|------------|\n| Modbus RTU | Série | 115.2kb/s | Universel |\n| Profibus DP | Série | 12Mb/s | Siemens |\n| Profinet | Ethernet | 100Mb/s | Siemens |\n| Ethernet/IP | Ethernet | 100Mb/s | Rockwell |\n| EtherCAT | Ethernet | 100Mb/s | Beckhoff |" },
          { type: "text", content: "## Données échangées\n\n- **Commande** : Marche, arrêt, reset\n- **Consigne** : Vitesse, couple\n- **Retours** : État, vitesse réelle, courant\n- **Alarmes** : Codes défauts, warnings" }
        ]
      })
    },
    {
      title: "Communication Modbus",
      description: "Maîtrisez la communication Modbus avec les variateurs",
      order: 2,
      xpReward: 65,
      duration: 18,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Communication Modbus\n\nModbus est le protocole le plus répandu pour la communication avec les variateurs." },
          { type: "text", content: "## Configuration Modbus RTU\n\n- **Adresse esclave** : 1-247\n- **Vitesse** : 9600-115200 baud\n- **Parité** : Paire, impaire ou aucune\n- **Bits de stop** : 1 ou 2" },
          { type: "text", content: "## Fonctions Modbus\n\n| Code | Fonction | Usage |\n|------|----------|-------|\n| 03 | Read Holding Registers | Lecture paramètres |\n| 06 | Write Single Register | Écriture 1 param |\n| 16 | Write Multiple Registers | Écriture multiple |" },
          { type: "info", content: "La plupart des variateurs utilisent les registres 40001-49999 (Holding Registers) pour les paramètres et le contrôle." }
        ]
      })
    },
    {
      title: "Intégration automate",
      description: "Intégrez les variateurs dans un système automatisé",
      order: 3,
      xpReward: 70,
      duration: 20,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Intégration avec automate\n\nL'intégration du variateur dans le système de contrôle permet une gestion centralisée." },
          { type: "text", content: "## Mot de commande (Control Word)\n\nStructure typique 16 bits :\n- Bit 0 : ON/OFF\n- Bit 1 : Reset défaut\n- Bit 2 : Coast stop\n- Bit 3 : Quick stop\n- Bits 4-5 : Rampe\n- Bit 10 : Sens de rotation" },
          { type: "text", content: "## Mot d'état (Status Word)\n\n- Bit 0 : Ready\n- Bit 1 : Running\n- Bit 2 : At speed\n- Bit 3 : Fault\n- Bit 7 : Warning" },
          { type: "warning", content: "Prévoyez toujours un mode de secours (commande locale) en cas de perte de communication avec l'automate." }
        ]
      })
    },
    {
      title: "Diagnostic et monitoring",
      description: "Surveillez l'état et les performances du variateur",
      order: 4,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Diagnostic et monitoring\n\nLe monitoring permet d'anticiper les problèmes et d'optimiser les performances." },
          { type: "text", content: "## Données à surveiller\n\n- **Courant moteur** : Charge relative\n- **Température** : IGBT, moteur\n- **Tension bus DC** : Stabilité alimentation\n- **Heures de fonctionnement** : Maintenance préventive" },
          { type: "text", content: "## Historique des défauts\n\nLes variateurs conservent un historique :\n- Code du défaut\n- Date et heure\n- Valeurs au moment du défaut\n- Conditions de fonctionnement" },
          { type: "info", content: "Consultez régulièrement le compteur d'heures de fonctionnement des ventilateurs et des condensateurs pour planifier leur remplacement." }
        ]
      })
    },
    {
      title: "Dépannage",
      description: "Diagnostiquez et résolvez les problèmes courants",
      order: 5,
      xpReward: 65,
      duration: 16,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Dépannage des variateurs\n\nMéthodologie de diagnostic pour résoudre efficacement les problèmes." },
          { type: "text", content: "## Procédure de dépannage\n\n1. **Relever le code défaut**\n2. **Consulter l'historique**\n3. **Vérifier les conditions**\n4. **Contrôler le câblage**\n5. **Tester les composants" },
          { type: "text", content: "## Problèmes fréquents\n\n| Symptôme | Causes possibles |\n|----------|------------------|\n| Défaut OC au démarrage | Court-circuit, câble trop long |\n| Défaut OV au freinage | Rampe trop courte, pas de résistance |\n| Surchauffe | Ventilation, surcharge |\n| Pas de communication | Paramètres, câblage |" }
        ]
      })
    },
    {
      title: "Maintenance préventive",
      description: "Planifiez la maintenance des variateurs",
      order: 6,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Maintenance préventive\n\nUne maintenance régulière prolonge la durée de vie et évite les arrêts imprévus." },
          { type: "text", content: "## Planning de maintenance\n\n| Intervalle | Actions |\n|------------|--------|\n| Mensuel | Nettoyage, inspection visuelle |\n| Annuel | Serrage connexions, ventilateurs |\n| 5 ans | Condensateurs bus DC |\n| 10 ans | Remplacement préventif |" },
          { type: "text", content: "## Points de contrôle\n\n- État des ventilateurs\n- Connexions serrées\n- Absence de poussière\n- Condensateurs (gonflement)\n- Historique des défauts" },
          { type: "info", content: "Tenez un carnet de maintenance pour chaque variateur avec l'historique des interventions." }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Protocoles de communication": {
        title: "Communication Protocols",
        description: "Discover industrial communication protocols"
      },
      "Communication Modbus": {
        title: "Modbus Communication",
        description: "Master Modbus communication with VFDs"
      },
      "Intégration automate": {
        title: "PLC Integration",
        description: "Integrate VFDs into an automated system"
      },
      "Diagnostic et monitoring": {
        title: "Diagnostics and Monitoring",
        description: "Monitor VFD status and performance"
      },
      "Dépannage": {
        title: "Troubleshooting",
        description: "Diagnose and solve common problems"
      },
      "Maintenance préventive": {
        title: "Preventive Maintenance",
        description: "Plan VFD maintenance"
      }
    },
    es: {
      "Protocoles de communication": {
        title: "Protocolos de comunicación",
        description: "Descubra los protocolos industriales"
      },
      "Communication Modbus": {
        title: "Comunicación Modbus",
        description: "Domine la comunicación Modbus"
      },
      "Intégration automate": {
        title: "Integración con PLC",
        description: "Integre variadores en sistemas automatizados"
      },
      "Diagnostic et monitoring": {
        title: "Diagnóstico y monitorización",
        description: "Supervise el estado del variador"
      },
      "Dépannage": {
        title: "Resolución de problemas",
        description: "Diagnostique y resuelva problemas comunes"
      },
      "Maintenance préventive": {
        title: "Mantenimiento preventivo",
        description: "Planifique el mantenimiento"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Protocoles de communication
    [
      { question: "Quel protocole est universel et supporté par tous les fabricants ?", options: ["Profinet", "EtherCAT", "Modbus", "CC-Link"], correctIndex: 2, explanation: "Modbus RTU est le protocole le plus universel, supporté par pratiquement tous les variateurs.", order: 1 },
      { question: "Quelle est la vitesse typique de Profinet ?", options: ["9600 bps", "115.2 kbps", "100 Mbps", "1 Gbps"], correctIndex: 2, explanation: "Profinet utilise Ethernet standard à 100 Mbps.", order: 2 },
      { question: "Quel type de données est échangé en continu ?", options: ["Paramètres de configuration", "Commande et retours d'état", "Historique des défauts", "Manuel utilisateur"], correctIndex: 1, explanation: "Les mots de commande, consignes et retours d'état sont échangés cycliquement.", order: 3 },
      { question: "Quel protocole est typiquement associé à Siemens ?", options: ["Modbus", "Profinet/Profibus", "Ethernet/IP", "DeviceNet"], correctIndex: 1, explanation: "Profinet et Profibus sont les protocoles natifs de l'écosystème Siemens.", order: 4 },
      { question: "Quel protocole offre le temps de cycle le plus court ?", options: ["Modbus RTU", "Profibus", "EtherCAT", "CANopen"], correctIndex: 2, explanation: "EtherCAT atteint des temps de cycle de l'ordre de la microseconde.", order: 5 }
    ],
    // Lesson 2: Communication Modbus
    [
      { question: "Quelle plage d'adresses Modbus pour un esclave ?", options: ["0-255", "1-247", "1-127", "0-65535"], correctIndex: 1, explanation: "Les adresses esclaves Modbus RTU vont de 1 à 247.", order: 1 },
      { question: "Quelle fonction Modbus pour lire plusieurs registres ?", options: ["01", "03", "06", "15"], correctIndex: 1, explanation: "La fonction 03 (Read Holding Registers) permet de lire plusieurs registres.", order: 2 },
      { question: "Quelle vitesse Modbus RTU est la plus courante ?", options: ["2400 baud", "9600 baud", "38400 baud", "115200 baud"], correctIndex: 1, explanation: "9600 baud est la vitesse par défaut la plus courante pour Modbus RTU.", order: 3 },
      { question: "Que signifie RTU dans Modbus RTU ?", options: ["Real Time Unit", "Remote Terminal Unit", "Register Transfer Unit", "Rapid Transfer Update"], correctIndex: 1, explanation: "RTU signifie Remote Terminal Unit, le format binaire compact de Modbus.", order: 4 },
      { question: "Quelle fonction pour écrire un seul registre ?", options: ["03", "06", "16", "01"], correctIndex: 1, explanation: "La fonction 06 (Write Single Register) écrit une valeur dans un registre.", order: 5 }
    ],
    // Lesson 3: Intégration automate
    [
      { question: "Que contient le mot de commande (Control Word) ?", options: ["La vitesse réelle", "Les ordres de marche/arrêt", "Les paramètres moteur", "L'historique"], correctIndex: 1, explanation: "Le Control Word contient les bits de commande : marche, arrêt, reset, etc.", order: 1 },
      { question: "Quel bit indique généralement le défaut dans le Status Word ?", options: ["Bit 0", "Bit 1", "Bit 3", "Bit 15"], correctIndex: 2, explanation: "Le bit 3 est conventionnellement utilisé pour signaler un défaut.", order: 2 },
      { question: "Pourquoi prévoir un mode de secours local ?", options: ["Pour les tests", "En cas de perte de communication", "Pour économiser", "C'est obligatoire"], correctIndex: 1, explanation: "Le mode local permet de continuer à fonctionner si la communication avec l'automate est perdue.", order: 3 },
      { question: "Comment s'appelle la consigne vitesse envoyée au variateur ?", options: ["Speed Feedback", "Speed Reference/Setpoint", "Speed Limit", "Speed Error"], correctIndex: 1, explanation: "La consigne s'appelle Speed Reference ou Speed Setpoint.", order: 4 },
      { question: "Que retourne le variateur comme information de vitesse ?", options: ["Speed Reference", "Speed Feedback/Actual", "Speed Error", "Speed Limit"], correctIndex: 1, explanation: "Le variateur retourne la vitesse réelle (actual/feedback) mesurée ou estimée.", order: 5 }
    ],
    // Lesson 4: Diagnostic et monitoring
    [
      { question: "Quel paramètre indique la charge relative du moteur ?", options: ["Tension bus DC", "Courant moteur", "Température IGBT", "Fréquence sortie"], correctIndex: 1, explanation: "Le courant moteur par rapport au nominal indique directement la charge.", order: 1 },
      { question: "Pourquoi surveiller les heures de fonctionnement ?", options: ["Pour la facturation", "Pour la maintenance préventive", "Pour la garantie", "Pour le rendement"], correctIndex: 1, explanation: "Les heures de fonctionnement permettent de planifier les maintenances préventives.", order: 2 },
      { question: "Que contient l'historique des défauts ?", options: ["Seulement le code", "Code, date, et conditions au moment du défaut", "Uniquement la date", "Rien d'utile"], correctIndex: 1, explanation: "L'historique complet aide au diagnostic avec le contexte du défaut.", order: 3 },
      { question: "Quel composant a une durée de vie limitée à surveiller ?", options: ["Le processeur", "Les condensateurs du bus DC", "Les borniers", "Le boîtier"], correctIndex: 1, explanation: "Les condensateurs électrolytiques vieillissent et doivent être remplacés typiquement tous les 5-10 ans.", order: 4 },
      { question: "Comment accéder au diagnostic à distance ?", options: ["Pas possible", "Via le bus de terrain", "Uniquement sur place", "Par téléphone"], correctIndex: 1, explanation: "Les protocoles de communication permettent de lire les données de diagnostic à distance.", order: 5 }
    ],
    // Lesson 5: Dépannage
    [
      { question: "Quelle est la première étape de dépannage ?", options: ["Changer le variateur", "Relever le code défaut", "Appeler le support", "Redémarrer"], correctIndex: 1, explanation: "Le code défaut oriente immédiatement vers la cause probable du problème.", order: 1 },
      { question: "Un défaut OC au démarrage peut indiquer ?", options: ["Surtension réseau", "Court-circuit ou câble trop long", "Surcharge thermique", "Défaut communication"], correctIndex: 1, explanation: "Un court-circuit moteur ou un câble trop long provoque une surintensité au démarrage.", order: 2 },
      { question: "Que vérifier pour un défaut de surchauffe ?", options: ["La communication", "Ventilation et charge", "Le câblage entrées", "La consigne"], correctIndex: 1, explanation: "La surchauffe est liée à un manque de ventilation ou une charge excessive.", order: 3 },
      { question: "Un défaut OV au freinage nécessite ?", options: ["Résistance de freinage ou rampe plus longue", "Moteur plus puissant", "Câble plus gros", "Nouveau variateur"], correctIndex: 0, explanation: "L'énergie de freinage doit être dissipée par une résistance ou la rampe allongée.", order: 4 },
      { question: "Pas de communication avec le variateur : que vérifier d'abord ?", options: ["Le firmware", "Paramètres et câblage", "Le moteur", "Les rampes"], correctIndex: 1, explanation: "Vérifier l'adresse, la vitesse, le câblage et la terminaison en premier.", order: 5 }
    ],
    // Lesson 6: Maintenance préventive
    [
      { question: "À quelle fréquence faire une inspection visuelle ?", options: ["Quotidienne", "Mensuelle", "Annuelle", "Jamais"], correctIndex: 1, explanation: "Une inspection mensuelle permet de détecter rapidement les problèmes.", order: 1 },
      { question: "Quand remplacer les condensateurs du bus DC ?", options: ["Tous les ans", "Tous les 5 ans environ", "Jamais", "À chaque panne"], correctIndex: 1, explanation: "Les condensateurs électrolytiques ont une durée de vie typique de 5-10 ans.", order: 2 },
      { question: "Que vérifier annuellement ?", options: ["Seulement le firmware", "Serrage connexions et ventilateurs", "Rien", "Le numéro de série"], correctIndex: 1, explanation: "Les connexions peuvent se desserrer avec les vibrations et les cycles thermiques.", order: 3 },
      { question: "Comment détecter un condensateur défaillant ?", options: ["Par la couleur", "Gonflement du dessus", "Par le bruit", "Impossible à détecter"], correctIndex: 1, explanation: "Un condensateur défaillant présente souvent un gonflement visible sur le dessus.", order: 4 },
      { question: "Pourquoi tenir un carnet de maintenance ?", options: ["Pour la garantie", "Pour l'historique et la traçabilité", "C'est obligatoire", "Pour la décoration"], correctIndex: 1, explanation: "L'historique des interventions aide à identifier les tendances et problèmes récurrents.", order: 5 }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1: Communication Protocols
      "Quel protocole est universel et supporté par tous les fabricants ?": {
        question: "Which protocol is universal and supported by all manufacturers?",
        options: ["Profinet", "EtherCAT", "Modbus", "CC-Link"],
        explanation: "Modbus RTU is the most universal protocol, supported by virtually all VFDs."
      },
      "Quelle est la vitesse typique de Profinet ?": {
        question: "What is the typical speed of Profinet?",
        options: ["9600 bps", "115.2 kbps", "100 Mbps", "1 Gbps"],
        explanation: "Profinet uses standard Ethernet at 100 Mbps."
      },
      "Quel type de données est échangé en continu ?": {
        question: "What type of data is continuously exchanged?",
        options: ["Configuration parameters", "Commands and status feedback", "Fault history", "User manual"],
        explanation: "Command words, setpoints, and status feedback are exchanged cyclically."
      },
      "Quel protocole est typiquement associé à Siemens ?": {
        question: "Which protocol is typically associated with Siemens?",
        options: ["Modbus", "Profinet/Profibus", "Ethernet/IP", "DeviceNet"],
        explanation: "Profinet and Profibus are the native protocols of the Siemens ecosystem."
      },
      "Quel protocole offre le temps de cycle le plus court ?": {
        question: "Which protocol offers the shortest cycle time?",
        options: ["Modbus RTU", "Profibus", "EtherCAT", "CANopen"],
        explanation: "EtherCAT achieves cycle times in the microsecond range."
      },
      // Lesson 2: Modbus Communication
      "Quelle plage d'adresses Modbus pour un esclave ?": {
        question: "What is the Modbus address range for a slave?",
        options: ["0-255", "1-247", "1-127", "0-65535"],
        explanation: "Modbus RTU slave addresses range from 1 to 247."
      },
      "Quelle fonction Modbus pour lire plusieurs registres ?": {
        question: "Which Modbus function reads multiple registers?",
        options: ["01", "03", "06", "15"],
        explanation: "Function 03 (Read Holding Registers) reads multiple registers."
      },
      "Quelle vitesse Modbus RTU est la plus courante ?": {
        question: "What is the most common Modbus RTU speed?",
        options: ["2400 baud", "9600 baud", "38400 baud", "115200 baud"],
        explanation: "9600 baud is the most common default speed for Modbus RTU."
      },
      "Que signifie RTU dans Modbus RTU ?": {
        question: "What does RTU mean in Modbus RTU?",
        options: ["Real Time Unit", "Remote Terminal Unit", "Register Transfer Unit", "Rapid Transfer Update"],
        explanation: "RTU stands for Remote Terminal Unit, the compact binary format of Modbus."
      },
      "Quelle fonction pour écrire un seul registre ?": {
        question: "Which function writes a single register?",
        options: ["03", "06", "16", "01"],
        explanation: "Function 06 (Write Single Register) writes a value to one register."
      },
      // Lesson 3: PLC Integration
      "Que contient le mot de commande (Control Word) ?": {
        question: "What does the Control Word contain?",
        options: ["Actual speed", "Start/stop commands", "Motor parameters", "History"],
        explanation: "The Control Word contains command bits: start, stop, reset, etc."
      },
      "Quel bit indique généralement le défaut dans le Status Word ?": {
        question: "Which bit typically indicates a fault in the Status Word?",
        options: ["Bit 0", "Bit 1", "Bit 3", "Bit 15"],
        explanation: "Bit 3 is conventionally used to signal a fault."
      },
      "Pourquoi prévoir un mode de secours local ?": {
        question: "Why provide a local backup mode?",
        options: ["For testing", "In case of communication loss", "To save money", "It's mandatory"],
        explanation: "Local mode allows continued operation if communication with the PLC is lost."
      },
      "Comment s'appelle la consigne vitesse envoyée au variateur ?": {
        question: "What is the speed setpoint sent to the VFD called?",
        options: ["Speed Feedback", "Speed Reference/Setpoint", "Speed Limit", "Speed Error"],
        explanation: "The setpoint is called Speed Reference or Speed Setpoint."
      },
      "Que retourne le variateur comme information de vitesse ?": {
        question: "What speed information does the VFD return?",
        options: ["Speed Reference", "Speed Feedback/Actual", "Speed Error", "Speed Limit"],
        explanation: "The VFD returns the actual speed (feedback) measured or estimated."
      },
      // Lesson 4: Diagnostics and Monitoring
      "Quel paramètre indique la charge relative du moteur ?": {
        question: "Which parameter indicates the relative motor load?",
        options: ["DC bus voltage", "Motor current", "IGBT temperature", "Output frequency"],
        explanation: "Motor current relative to nominal directly indicates the load."
      },
      "Pourquoi surveiller les heures de fonctionnement ?": {
        question: "Why monitor operating hours?",
        options: ["For billing", "For preventive maintenance", "For warranty", "For efficiency"],
        explanation: "Operating hours allow planning preventive maintenance."
      },
      "Que contient l'historique des défauts ?": {
        question: "What does the fault history contain?",
        options: ["Only the code", "Code, date, and conditions at fault time", "Only the date", "Nothing useful"],
        explanation: "Complete history helps diagnosis with fault context."
      },
      "Quel composant a une durée de vie limitée à surveiller ?": {
        question: "Which component has a limited lifespan to monitor?",
        options: ["The processor", "DC bus capacitors", "Terminals", "The enclosure"],
        explanation: "Electrolytic capacitors age and must be replaced typically every 5-10 years."
      },
      "Comment accéder au diagnostic à distance ?": {
        question: "How to access remote diagnostics?",
        options: ["Not possible", "Via fieldbus", "Only on-site", "By phone"],
        explanation: "Communication protocols allow reading diagnostic data remotely."
      },
      // Lesson 5: Troubleshooting
      "Quelle est la première étape de dépannage ?": {
        question: "What is the first troubleshooting step?",
        options: ["Replace the VFD", "Read the fault code", "Call support", "Restart"],
        explanation: "The fault code immediately points to the probable cause."
      },
      "Un défaut OC au démarrage peut indiquer ?": {
        question: "An OC fault at startup may indicate?",
        options: ["Grid overvoltage", "Short circuit or cable too long", "Thermal overload", "Communication fault"],
        explanation: "A motor short circuit or cable too long causes overcurrent at startup."
      },
      "Que vérifier pour un défaut de surchauffe ?": {
        question: "What to check for an overheating fault?",
        options: ["Communication", "Ventilation and load", "Input wiring", "Setpoint"],
        explanation: "Overheating is related to lack of ventilation or excessive load."
      },
      "Un défaut OV au freinage nécessite ?": {
        question: "An OV fault during braking requires?",
        options: ["Braking resistor or longer ramp", "More powerful motor", "Larger cable", "New VFD"],
        explanation: "Braking energy must be dissipated by a resistor or the ramp lengthened."
      },
      "Pas de communication avec le variateur : que vérifier d'abord ?": {
        question: "No communication with VFD: what to check first?",
        options: ["Firmware", "Parameters and wiring", "Motor", "Ramps"],
        explanation: "Check address, speed, wiring, and termination first."
      },
      // Lesson 6: Preventive Maintenance
      "À quelle fréquence faire une inspection visuelle ?": {
        question: "How often to perform a visual inspection?",
        options: ["Daily", "Monthly", "Yearly", "Never"],
        explanation: "Monthly inspection allows rapid problem detection."
      },
      "Quand remplacer les condensateurs du bus DC ?": {
        question: "When to replace DC bus capacitors?",
        options: ["Every year", "About every 5 years", "Never", "At each failure"],
        explanation: "Electrolytic capacitors have a typical lifespan of 5-10 years."
      },
      "Que vérifier annuellement ?": {
        question: "What to check annually?",
        options: ["Only firmware", "Connection tightness and fans", "Nothing", "Serial number"],
        explanation: "Connections can loosen with vibrations and thermal cycles."
      },
      "Comment détecter un condensateur défaillant ?": {
        question: "How to detect a failing capacitor?",
        options: ["By color", "Swelling on top", "By noise", "Impossible to detect"],
        explanation: "A failing capacitor often shows visible swelling on top."
      },
      "Pourquoi tenir un carnet de maintenance ?": {
        question: "Why keep a maintenance log?",
        options: ["For warranty", "For history and traceability", "It's mandatory", "For decoration"],
        explanation: "Intervention history helps identify trends and recurring problems."
      }
    },
    es: {
      // Lesson 1: Protocolos de comunicación
      "Quel protocole est universel et supporté par tous les fabricants ?": {
        question: "¿Qué protocolo es universal y soportado por todos los fabricantes?",
        options: ["Profinet", "EtherCAT", "Modbus", "CC-Link"],
        explanation: "Modbus RTU es el protocolo más universal, soportado por prácticamente todos los variadores."
      },
      "Quelle est la vitesse typique de Profinet ?": {
        question: "¿Cuál es la velocidad típica de Profinet?",
        options: ["9600 bps", "115.2 kbps", "100 Mbps", "1 Gbps"],
        explanation: "Profinet utiliza Ethernet estándar a 100 Mbps."
      },
      "Quel type de données est échangé en continu ?": {
        question: "¿Qué tipo de datos se intercambia continuamente?",
        options: ["Parámetros de configuración", "Comandos y retornos de estado", "Historial de fallos", "Manual de usuario"],
        explanation: "Las palabras de comando, consignas y retornos de estado se intercambian cíclicamente."
      },
      "Quel protocole est typiquement associé à Siemens ?": {
        question: "¿Qué protocolo está típicamente asociado con Siemens?",
        options: ["Modbus", "Profinet/Profibus", "Ethernet/IP", "DeviceNet"],
        explanation: "Profinet y Profibus son los protocolos nativos del ecosistema Siemens."
      },
      "Quel protocole offre le temps de cycle le plus court ?": {
        question: "¿Qué protocolo ofrece el tiempo de ciclo más corto?",
        options: ["Modbus RTU", "Profibus", "EtherCAT", "CANopen"],
        explanation: "EtherCAT alcanza tiempos de ciclo del orden del microsegundo."
      },
      // Lesson 2: Comunicación Modbus
      "Quelle plage d'adresses Modbus pour un esclave ?": {
        question: "¿Cuál es el rango de direcciones Modbus para un esclavo?",
        options: ["0-255", "1-247", "1-127", "0-65535"],
        explanation: "Las direcciones esclavas Modbus RTU van de 1 a 247."
      },
      "Quelle fonction Modbus pour lire plusieurs registres ?": {
        question: "¿Qué función Modbus lee varios registros?",
        options: ["01", "03", "06", "15"],
        explanation: "La función 03 (Read Holding Registers) permite leer varios registros."
      },
      "Quelle vitesse Modbus RTU est la plus courante ?": {
        question: "¿Cuál es la velocidad Modbus RTU más común?",
        options: ["2400 baud", "9600 baud", "38400 baud", "115200 baud"],
        explanation: "9600 baud es la velocidad predeterminada más común para Modbus RTU."
      },
      "Que signifie RTU dans Modbus RTU ?": {
        question: "¿Qué significa RTU en Modbus RTU?",
        options: ["Real Time Unit", "Remote Terminal Unit", "Register Transfer Unit", "Rapid Transfer Update"],
        explanation: "RTU significa Remote Terminal Unit, el formato binario compacto de Modbus."
      },
      "Quelle fonction pour écrire un seul registre ?": {
        question: "¿Qué función escribe un solo registro?",
        options: ["03", "06", "16", "01"],
        explanation: "La función 06 (Write Single Register) escribe un valor en un registro."
      },
      // Lesson 3: Integración con PLC
      "Que contient le mot de commande (Control Word) ?": {
        question: "¿Qué contiene la palabra de control (Control Word)?",
        options: ["La velocidad real", "Las órdenes de marcha/paro", "Los parámetros del motor", "El historial"],
        explanation: "El Control Word contiene los bits de comando: marcha, paro, reset, etc."
      },
      "Quel bit indique généralement le défaut dans le Status Word ?": {
        question: "¿Qué bit indica generalmente el fallo en el Status Word?",
        options: ["Bit 0", "Bit 1", "Bit 3", "Bit 15"],
        explanation: "El bit 3 se usa convencionalmente para señalar un fallo."
      },
      "Pourquoi prévoir un mode de secours local ?": {
        question: "¿Por qué prever un modo de emergencia local?",
        options: ["Para pruebas", "En caso de pérdida de comunicación", "Para ahorrar", "Es obligatorio"],
        explanation: "El modo local permite seguir funcionando si se pierde la comunicación con el PLC."
      },
      "Comment s'appelle la consigne vitesse envoyée au variateur ?": {
        question: "¿Cómo se llama la consigna de velocidad enviada al variador?",
        options: ["Speed Feedback", "Speed Reference/Setpoint", "Speed Limit", "Speed Error"],
        explanation: "La consigna se llama Speed Reference o Speed Setpoint."
      },
      "Que retourne le variateur comme information de vitesse ?": {
        question: "¿Qué devuelve el variador como información de velocidad?",
        options: ["Speed Reference", "Speed Feedback/Actual", "Speed Error", "Speed Limit"],
        explanation: "El variador devuelve la velocidad real (actual/feedback) medida o estimada."
      },
      // Lesson 4: Diagnóstico y monitorización
      "Quel paramètre indique la charge relative du moteur ?": {
        question: "¿Qué parámetro indica la carga relativa del motor?",
        options: ["Tensión bus DC", "Corriente del motor", "Temperatura IGBT", "Frecuencia de salida"],
        explanation: "La corriente del motor en relación al nominal indica directamente la carga."
      },
      "Pourquoi surveiller les heures de fonctionnement ?": {
        question: "¿Por qué vigilar las horas de funcionamiento?",
        options: ["Para facturación", "Para mantenimiento preventivo", "Para la garantía", "Para el rendimiento"],
        explanation: "Las horas de funcionamiento permiten planificar el mantenimiento preventivo."
      },
      "Que contient l'historique des défauts ?": {
        question: "¿Qué contiene el historial de fallos?",
        options: ["Solo el código", "Código, fecha y condiciones al momento del fallo", "Solo la fecha", "Nada útil"],
        explanation: "El historial completo ayuda al diagnóstico con el contexto del fallo."
      },
      "Quel composant a une durée de vie limitée à surveiller ?": {
        question: "¿Qué componente tiene una vida útil limitada a vigilar?",
        options: ["El procesador", "Los condensadores del bus DC", "Los bornes", "La carcasa"],
        explanation: "Los condensadores electrolíticos envejecen y deben reemplazarse típicamente cada 5-10 años."
      },
      "Comment accéder au diagnostic à distance ?": {
        question: "¿Cómo acceder al diagnóstico a distancia?",
        options: ["No es posible", "Vía bus de campo", "Solo en sitio", "Por teléfono"],
        explanation: "Los protocolos de comunicación permiten leer los datos de diagnóstico a distancia."
      },
      // Lesson 5: Resolución de problemas
      "Quelle est la première étape de dépannage ?": {
        question: "¿Cuál es el primer paso de resolución de problemas?",
        options: ["Cambiar el variador", "Leer el código de fallo", "Llamar al soporte", "Reiniciar"],
        explanation: "El código de fallo orienta inmediatamente hacia la causa probable del problema."
      },
      "Un défaut OC au démarrage peut indiquer ?": {
        question: "¿Un fallo OC al arranque puede indicar?",
        options: ["Sobretensión de red", "Cortocircuito o cable demasiado largo", "Sobrecarga térmica", "Fallo de comunicación"],
        explanation: "Un cortocircuito del motor o cable demasiado largo provoca sobreintensidad al arranque."
      },
      "Que vérifier pour un défaut de surchauffe ?": {
        question: "¿Qué verificar para un fallo de sobrecalentamiento?",
        options: ["La comunicación", "Ventilación y carga", "El cableado de entradas", "La consigna"],
        explanation: "El sobrecalentamiento está relacionado con falta de ventilación o carga excesiva."
      },
      "Un défaut OV au freinage nécessite ?": {
        question: "¿Un fallo OV durante el frenado necesita?",
        options: ["Resistencia de frenado o rampa más larga", "Motor más potente", "Cable más grueso", "Nuevo variador"],
        explanation: "La energía de frenado debe disiparse por una resistencia o alargar la rampa."
      },
      "Pas de communication avec le variateur : que vérifier d'abord ?": {
        question: "Sin comunicación con el variador: ¿qué verificar primero?",
        options: ["El firmware", "Parámetros y cableado", "El motor", "Las rampas"],
        explanation: "Verificar la dirección, velocidad, cableado y terminación primero."
      },
      // Lesson 6: Mantenimiento preventivo
      "À quelle fréquence faire une inspection visuelle ?": {
        question: "¿Con qué frecuencia hacer una inspección visual?",
        options: ["Diaria", "Mensual", "Anual", "Nunca"],
        explanation: "Una inspección mensual permite detectar rápidamente los problemas."
      },
      "Quand remplacer les condensateurs du bus DC ?": {
        question: "¿Cuándo reemplazar los condensadores del bus DC?",
        options: ["Cada año", "Aproximadamente cada 5 años", "Nunca", "En cada fallo"],
        explanation: "Los condensadores electrolíticos tienen una vida útil típica de 5-10 años."
      },
      "Que vérifier annuellement ?": {
        question: "¿Qué verificar anualmente?",
        options: ["Solo el firmware", "Apriete de conexiones y ventiladores", "Nada", "El número de serie"],
        explanation: "Las conexiones pueden aflojarse con las vibraciones y los ciclos térmicos."
      },
      "Comment détecter un condensateur défaillant ?": {
        question: "¿Cómo detectar un condensador defectuoso?",
        options: ["Por el color", "Hinchazón en la parte superior", "Por el ruido", "Imposible de detectar"],
        explanation: "Un condensador defectuoso a menudo presenta una hinchazón visible en la parte superior."
      },
      "Pourquoi tenir un carnet de maintenance ?": {
        question: "¿Por qué mantener un cuaderno de mantenimiento?",
        options: ["Para la garantía", "Para historial y trazabilidad", "Es obligatorio", "Para decoración"],
        explanation: "El historial de intervenciones ayuda a identificar tendencias y problemas recurrentes."
      }
    }
  }
}
