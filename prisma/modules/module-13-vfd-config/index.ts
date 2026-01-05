import type { ModuleData } from '../types.js'

export const module13Data: ModuleData = {
  // Module info
  moduleOrder: 13,
  moduleTitle: "Configuration des variateurs",
  moduleDescription: "Apprenez à configurer et paramétrer un variateur de vitesse",
  moduleTranslations: {
    en: {
      title: "VFD Configuration",
      description: "Learn to configure and set up a variable frequency drive"
    },
    es: {
      title: "Configuración de Variadores",
      description: "Aprenda a configurar y parametrizar variadores de velocidad"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Paramètres moteur",
      description: "Configurez les paramètres du moteur dans le variateur",
      order: 1,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Paramétrage du moteur\n\nLa première étape est de renseigner les caractéristiques du moteur dans le variateur." },
          { type: "text", content: "## Données de la plaque signalétique\n\n- **Puissance nominale** (kW)\n- **Tension nominale** (V)\n- **Courant nominal** (A)\n- **Fréquence nominale** (Hz)\n- **Vitesse nominale** (tr/min)\n- **Cos φ** (facteur de puissance)" },
          { type: "text", content: "## Auto-tuning\n\nLa plupart des variateurs proposent une fonction d'identification automatique du moteur :\n1. Moteur à l'arrêt (identification statique)\n2. Moteur en rotation (identification dynamique)" },
          { type: "warning", content: "L'auto-tuning avec rotation nécessite que la charge soit découplée du moteur." }
        ]
      })
    },
    {
      title: "Rampes et limites",
      description: "Configurez les rampes d'accélération et les limites de vitesse",
      order: 2,
      xpReward: 55,
      duration: 14,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Rampes et limites\n\nLes rampes définissent la dynamique d'accélération et de décélération du moteur." },
          { type: "text", content: "## Types de rampes\n\n- **Linéaire** : Accélération constante\n- **En S** : Démarrage et fin progressifs\n- **Personnalisée** : Profil adapté à l'application" },
          { type: "text", content: "## Paramètres typiques\n\n| Paramètre | Plage | Défaut |\n|-----------|-------|--------|\n| Temps d'accélération | 0.1-999s | 5-10s |\n| Temps de décélération | 0.1-999s | 5-10s |\n| Vitesse minimale | 0-50% | 0% |\n| Vitesse maximale | 50-120% | 100% |" },
          { type: "info", content: "Des rampes trop rapides peuvent provoquer des défauts de surintensité ou de surtension (lors du freinage)." }
        ]
      })
    },
    {
      title: "Modes de commande",
      description: "Choisissez le mode de commande adapté à votre application",
      order: 3,
      xpReward: 60,
      duration: 15,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Modes de commande\n\nLe variateur peut être commandé de différentes manières selon l'installation." },
          { type: "text", content: "## Sources de commande\n\n- **Clavier local** : Boutons et potentiomètre sur le variateur\n- **Bornier** : Entrées numériques et analogiques\n- **Bus de terrain** : Profibus, Modbus, Ethernet/IP\n- **Combiné** : Certaines fonctions locales, d'autres par bus" },
          { type: "text", content: "## Sources de consigne\n\n| Source | Avantages | Inconvénients |\n|--------|-----------|---------------|\n| Potentiomètre | Simple | Imprécis |\n| 0-10V | Standard | Sensible aux parasites |\n| 4-20mA | Robuste | Nécessite alimentation |\n| Bus | Précis, flexible | Plus complexe |" }
        ]
      })
    },
    {
      title: "Régulation PID intégrée",
      description: "Utilisez le régulateur PID intégré du variateur",
      order: 4,
      xpReward: 65,
      duration: 16,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Régulation PID intégrée\n\nLes variateurs modernes intègrent un régulateur PID pour le contrôle de process." },
          { type: "text", content: "## Applications typiques\n\n- Régulation de pression (pompes)\n- Régulation de débit\n- Régulation de niveau\n- Maintien de tension (bobinage)" },
          { type: "text", content: "## Paramètres PID\n\n- **Gain proportionnel (P)** : Réactivité\n- **Temps d'intégration (I)** : Élimination de l'erreur statique\n- **Temps de dérivation (D)** : Anticipation\n- **Consigne** : Valeur cible du process" },
          { type: "info", content: "Commencez par régler P seul, puis ajoutez I progressivement. D est rarement nécessaire et peut rendre le système instable." }
        ]
      })
    },
    {
      title: "Gestion des défauts",
      description: "Configurez le comportement en cas de défaut",
      order: 5,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Gestion des défauts\n\nLa configuration correcte des défauts est essentielle pour la sécurité et la disponibilité." },
          { type: "text", content: "## Types de réaction\n\n- **Arrêt immédiat** : Roue libre\n- **Arrêt sur rampe** : Décélération contrôlée\n- **Arrêt rapide** : Rampe accélérée\n- **Injection DC** : Freinage électrique" },
          { type: "text", content: "## Défauts courants\n\n| Code | Signification | Action |\n|------|--------------|--------|\n| OC | Surintensité | Vérifier charge |\n| OV | Surtension | Allonger rampes |\n| OH | Surchauffe | Ventilation |\n| EF | Défaut terre | Câblage |" },
          { type: "warning", content: "Ne désactivez jamais les protections sans comprendre les risques pour l'installation." }
        ]
      })
    },
    {
      title: "Sauvegarde et restauration",
      description: "Sauvegardez et restaurez les paramètres du variateur",
      order: 6,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          { type: "text", content: "# Sauvegarde et restauration\n\nLa sauvegarde des paramètres est essentielle pour la maintenance et le remplacement." },
          { type: "text", content: "## Méthodes de sauvegarde\n\n- **Clé USB** : Direct sur le variateur\n- **Logiciel PC** : Outil constructeur\n- **Carte mémoire** : Module optionnel\n- **Export fichier** : Via logiciel" },
          { type: "text", content: "## Bonnes pratiques\n\n1. Sauvegarder après chaque modification\n2. Documenter les changements\n3. Garder une copie hors site\n4. Tester la restauration périodiquement" },
          { type: "info", content: "Pensez à sauvegarder également le firmware du variateur, pas seulement les paramètres." }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Paramètres moteur": {
        title: "Motor Parameters",
        description: "Configure motor parameters in the VFD"
      },
      "Rampes et limites": {
        title: "Ramps and Limits",
        description: "Configure acceleration ramps and speed limits"
      },
      "Modes de commande": {
        title: "Control Modes",
        description: "Choose the right control mode for your application"
      },
      "Régulation PID intégrée": {
        title: "Built-in PID Control",
        description: "Use the VFD's integrated PID controller"
      },
      "Gestion des défauts": {
        title: "Fault Management",
        description: "Configure fault behavior"
      },
      "Sauvegarde et restauration": {
        title: "Backup and Restore",
        description: "Backup and restore VFD parameters"
      }
    },
    es: {
      "Paramètres moteur": {
        title: "Parámetros del motor",
        description: "Configure los parámetros del motor"
      },
      "Rampes et limites": {
        title: "Rampas y límites",
        description: "Configure las rampas de aceleración"
      },
      "Modes de commande": {
        title: "Modos de control",
        description: "Elija el modo de control adecuado"
      },
      "Régulation PID intégrée": {
        title: "Regulación PID integrada",
        description: "Utilice el regulador PID integrado"
      },
      "Gestion des défauts": {
        title: "Gestión de fallos",
        description: "Configure el comportamiento ante fallos"
      },
      "Sauvegarde et restauration": {
        title: "Copia de seguridad y restauración",
        description: "Guarde y restaure los parámetros"
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1 - Paramètres moteur
    [
      { question: "Où trouve-t-on les données à paramétrer dans le variateur ?", options: ["Dans le manuel du variateur", "Sur la plaque signalétique du moteur", "Sur Internet", "Dans l'automate"], correctIndex: 1, explanation: "La plaque signalétique du moteur contient toutes les caractéristiques nominales nécessaires.", order: 1 },
      { question: "Qu'est-ce que l'auto-tuning ?", options: ["Réglage automatique de la radio", "Identification automatique du moteur", "Calibration des capteurs", "Mise à jour firmware"], correctIndex: 1, explanation: "L'auto-tuning identifie automatiquement les paramètres électriques du moteur.", order: 2 },
      { question: "Quelle condition pour l'auto-tuning dynamique ?", options: ["Moteur alimenté", "Charge découplée", "Variateur froid", "Communication active"], correctIndex: 1, explanation: "L'auto-tuning avec rotation nécessite que la charge soit découplée pour tourner librement.", order: 3 },
      { question: "Que représente le cos φ sur la plaque moteur ?", options: ["Le rendement", "Le facteur de puissance", "La vitesse maximale", "Le courant de démarrage"], correctIndex: 1, explanation: "Le cos φ (cosinus phi) est le facteur de puissance du moteur à charge nominale.", order: 4 },
      { question: "Pourquoi la fréquence nominale est-elle importante ?", options: ["Pour la communication", "Pour le calcul de la vitesse et du flux", "Pour le bruit", "Pour le refroidissement"], correctIndex: 1, explanation: "La fréquence nominale permet au variateur de calculer la vitesse synchrone et maintenir le flux correct.", order: 5 }
    ],
    // Lesson 2 - Rampes et limites
    [
      { question: "Qu'est-ce qu'une rampe en S ?", options: ["Une rampe en forme de S", "Une accélération progressive au début et à la fin", "Une rampe très rapide", "Une rampe pour charges lourdes"], correctIndex: 1, explanation: "La rampe en S a une accélération progressive au démarrage et à la fin pour un mouvement plus doux.", order: 1 },
      { question: "Que se passe-t-il si la rampe d'accélération est trop rapide ?", options: ["Rien de particulier", "Défaut de surintensité", "Le moteur va plus vite", "Économie d'énergie"], correctIndex: 1, explanation: "Une rampe trop rapide demande trop de courant et déclenche la protection surintensité.", order: 2 },
      { question: "Que provoque une décélération trop rapide ?", options: ["Surchauffe moteur", "Défaut de surtension", "Court-circuit", "Perte de communication"], correctIndex: 1, explanation: "Le moteur devient générateur lors du freinage, renvoyant de l'énergie qui fait monter la tension du bus DC.", order: 3 },
      { question: "À quoi sert la limite de vitesse minimale ?", options: ["Protéger le moteur", "Éviter la surchauffe à basse vitesse", "Économiser l'énergie", "Toutes ces réponses"], correctIndex: 3, explanation: "La limite basse protège le moteur qui peut surchauffer à très basse vitesse sans ventilation suffisante.", order: 4 },
      { question: "Peut-on dépasser 100% de la vitesse nominale ?", options: ["Non, jamais", "Oui, jusqu'à 120% typiquement", "Oui, sans limite", "Seulement en mode spécial"], correctIndex: 1, explanation: "On peut généralement aller jusqu'à 120% mais le couple disponible diminue au-delà de la fréquence nominale.", order: 5 }
    ],
    // Lesson 3 - Modes de commande
    [
      { question: "Quel avantage du signal 4-20mA sur le 0-10V ?", options: ["Plus précis", "Moins sensible aux parasites", "Plus rapide", "Moins cher"], correctIndex: 1, explanation: "Le signal courant 4-20mA est moins sensible aux perturbations électromagnétiques que la tension.", order: 1 },
      { question: "Que permet le mode de commande combiné ?", options: ["Plus de puissance", "Certaines fonctions locales, d'autres par bus", "Deux moteurs", "Redondance"], correctIndex: 1, explanation: "Le mode combiné permet par exemple la marche/arrêt par bornier et la consigne par bus de terrain.", order: 2 },
      { question: "Quel est l'inconvénient principal du potentiomètre ?", options: ["Coût élevé", "Imprécision", "Complexité", "Consommation"], correctIndex: 1, explanation: "Le potentiomètre manque de précision et de répétabilité comparé aux signaux numériques.", order: 3 },
      { question: "Quel protocole est universel pour les variateurs ?", options: ["Profinet", "EtherCAT", "Modbus", "DeviceNet"], correctIndex: 2, explanation: "Modbus est supporté par pratiquement tous les fabricants de variateurs.", order: 4 },
      { question: "Où se paramètre la source de commande ?", options: ["Dans l'automate", "Dans les paramètres du variateur", "Sur le moteur", "Dans le câblage"], correctIndex: 1, explanation: "La source de commande (local, bornier, bus) se configure dans les paramètres du variateur.", order: 5 }
    ],
    // Lesson 4 - Régulation PID intégrée
    [
      { question: "Que régule typiquement le PID intégré d'un variateur ?", options: ["La vitesse moteur", "Une grandeur process (pression, débit...)", "Le courant", "La température variateur"], correctIndex: 1, explanation: "Le PID intégré régule une grandeur process comme la pression ou le débit, pas la vitesse moteur directement.", order: 1 },
      { question: "Quel paramètre PID élimine l'erreur statique ?", options: ["P (proportionnel)", "I (intégral)", "D (dérivé)", "Aucun"], correctIndex: 1, explanation: "L'action intégrale accumule l'erreur dans le temps jusqu'à son élimination.", order: 2 },
      { question: "Par quoi commencer le réglage PID ?", options: ["D seul", "I seul", "P seul", "Tout en même temps"], correctIndex: 2, explanation: "On commence par P seul, puis on ajoute I progressivement. D est rarement nécessaire.", order: 3 },
      { question: "Que provoque un gain I trop élevé ?", options: ["Réponse lente", "Oscillations", "Erreur statique", "Aucun effet"], correctIndex: 1, explanation: "Un gain intégral trop élevé provoque des dépassements et oscillations.", order: 4 },
      { question: "Pour quelle application le PID intégré est-il adapté ?", options: ["Positionnement précis", "Régulation de pression pompe", "Synchronisation d'axes", "Commande numérique"], correctIndex: 1, explanation: "Le PID intégré est parfait pour les régulations simples comme la pression de pompe.", order: 5 }
    ],
    // Lesson 5 - Gestion des défauts
    [
      { question: "Que signifie le code défaut OC ?", options: ["Over Current (surintensité)", "Open Circuit", "Over Charge", "Output Control"], correctIndex: 0, explanation: "OC signifie Over Current, indiquant une surintensité détectée.", order: 1 },
      { question: "Quelle action pour un défaut OV (surtension) au freinage ?", options: ["Réduire la charge", "Allonger la rampe de décélération", "Augmenter la vitesse", "Changer le moteur"], correctIndex: 1, explanation: "Une rampe plus longue réduit l'énergie de freinage renvoyée et évite la surtension.", order: 2 },
      { question: "Qu'est-ce que l'arrêt sur rampe en cas de défaut ?", options: ["Arrêt immédiat", "Décélération contrôlée puis arrêt", "Maintien de vitesse", "Inversion"], correctIndex: 1, explanation: "L'arrêt sur rampe effectue une décélération contrôlée au lieu d'un arrêt brutal.", order: 3 },
      { question: "Que vérifier en cas de défaut de surchauffe ?", options: ["Le câblage", "La ventilation et la charge", "La communication", "La consigne"], correctIndex: 1, explanation: "La surchauffe indique généralement un problème de ventilation ou de surcharge.", order: 4 },
      { question: "Pourquoi ne pas désactiver les protections ?", options: ["C'est impossible", "Risque pour l'installation et la sécurité", "Ça consomme plus", "C'est illégal"], correctIndex: 1, explanation: "Désactiver les protections expose l'installation et les personnes à des risques graves.", order: 5 }
    ],
    // Lesson 6 - Sauvegarde et restauration
    [
      { question: "Pourquoi sauvegarder les paramètres du variateur ?", options: ["Pour la garantie", "Pour faciliter le remplacement", "Pour la certification", "C'est obligatoire"], correctIndex: 1, explanation: "La sauvegarde permet de reconfigurer rapidement un variateur de remplacement.", order: 1 },
      { question: "Quelle méthode de sauvegarde est la plus pratique ?", options: ["Noter sur papier", "Clé USB directement sur le variateur", "Photo de l'écran", "Mémoriser"], correctIndex: 1, explanation: "La clé USB permet une sauvegarde rapide et fiable directement sur le variateur.", order: 2 },
      { question: "Que faut-il également sauvegarder ?", options: ["Le manuel", "Le firmware du variateur", "La facture", "Le schéma électrique"], correctIndex: 1, explanation: "Le firmware peut être différent entre variateurs et affecter la compatibilité des paramètres.", order: 3 },
      { question: "À quelle fréquence sauvegarder ?", options: ["Une fois par an", "Après chaque modification", "Jamais", "À l'installation uniquement"], correctIndex: 1, explanation: "Chaque modification des paramètres devrait être suivie d'une sauvegarde.", order: 4 },
      { question: "Où garder la copie de sauvegarde ?", options: ["Sur le variateur uniquement", "À côté du variateur", "Hors site également", "Dans le moteur"], correctIndex: 2, explanation: "Une copie hors site protège contre la perte en cas de sinistre ou vol.", order: 5 }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1 - Motor Parameters
      "Où trouve-t-on les données à paramétrer dans le variateur ?": {
        question: "Where do you find the data to configure in the VFD?",
        options: ["In the VFD manual", "On the motor nameplate", "On the Internet", "In the PLC"],
        explanation: "The motor nameplate contains all the nominal characteristics needed."
      },
      "Qu'est-ce que l'auto-tuning ?": {
        question: "What is auto-tuning?",
        options: ["Automatic radio tuning", "Automatic motor identification", "Sensor calibration", "Firmware update"],
        explanation: "Auto-tuning automatically identifies the electrical parameters of the motor."
      },
      "Quelle condition pour l'auto-tuning dynamique ?": {
        question: "What condition is required for dynamic auto-tuning?",
        options: ["Motor powered", "Load decoupled", "Cold VFD", "Active communication"],
        explanation: "Auto-tuning with rotation requires the load to be decoupled to rotate freely."
      },
      "Que représente le cos φ sur la plaque moteur ?": {
        question: "What does cos phi represent on the motor nameplate?",
        options: ["Efficiency", "Power factor", "Maximum speed", "Starting current"],
        explanation: "Cos phi (cosine phi) is the power factor of the motor at nominal load."
      },
      "Pourquoi la fréquence nominale est-elle importante ?": {
        question: "Why is the nominal frequency important?",
        options: ["For communication", "For speed and flux calculation", "For noise", "For cooling"],
        explanation: "The nominal frequency allows the VFD to calculate synchronous speed and maintain correct flux."
      },
      // Lesson 2 - Ramps and Limits
      "Qu'est-ce qu'une rampe en S ?": {
        question: "What is an S-curve ramp?",
        options: ["An S-shaped ramp", "Progressive acceleration at start and end", "A very fast ramp", "A ramp for heavy loads"],
        explanation: "The S-curve ramp has progressive acceleration at startup and end for smoother motion."
      },
      "Que se passe-t-il si la rampe d'accélération est trop rapide ?": {
        question: "What happens if the acceleration ramp is too fast?",
        options: ["Nothing special", "Overcurrent fault", "Motor goes faster", "Energy savings"],
        explanation: "A ramp that is too fast demands too much current and triggers overcurrent protection."
      },
      "Que provoque une décélération trop rapide ?": {
        question: "What does too fast deceleration cause?",
        options: ["Motor overheating", "Overvoltage fault", "Short circuit", "Communication loss"],
        explanation: "The motor becomes a generator during braking, returning energy that raises the DC bus voltage."
      },
      "À quoi sert la limite de vitesse minimale ?": {
        question: "What is the minimum speed limit for?",
        options: ["Protect the motor", "Avoid overheating at low speed", "Save energy", "All of the above"],
        explanation: "The low limit protects the motor which can overheat at very low speed without sufficient ventilation."
      },
      "Peut-on dépasser 100% de la vitesse nominale ?": {
        question: "Can you exceed 100% of nominal speed?",
        options: ["No, never", "Yes, typically up to 120%", "Yes, without limit", "Only in special mode"],
        explanation: "You can generally go up to 120% but available torque decreases beyond the nominal frequency."
      },
      // Lesson 3 - Control Modes
      "Quel avantage du signal 4-20mA sur le 0-10V ?": {
        question: "What advantage does the 4-20mA signal have over 0-10V?",
        options: ["More precise", "Less sensitive to interference", "Faster", "Cheaper"],
        explanation: "The 4-20mA current signal is less sensitive to electromagnetic interference than voltage."
      },
      "Que permet le mode de commande combiné ?": {
        question: "What does combined control mode allow?",
        options: ["More power", "Some local functions, others via bus", "Two motors", "Redundancy"],
        explanation: "Combined mode allows, for example, start/stop via terminals and setpoint via fieldbus."
      },
      "Quel est l'inconvénient principal du potentiomètre ?": {
        question: "What is the main disadvantage of a potentiometer?",
        options: ["High cost", "Imprecision", "Complexity", "Consumption"],
        explanation: "The potentiometer lacks precision and repeatability compared to digital signals."
      },
      "Quel protocole est universel pour les variateurs ?": {
        question: "Which protocol is universal for VFDs?",
        options: ["Profinet", "EtherCAT", "Modbus", "DeviceNet"],
        explanation: "Modbus is supported by virtually all VFD manufacturers."
      },
      "Où se paramètre la source de commande ?": {
        question: "Where is the control source configured?",
        options: ["In the PLC", "In the VFD parameters", "On the motor", "In the wiring"],
        explanation: "The control source (local, terminal, bus) is configured in the VFD parameters."
      },
      // Lesson 4 - Built-in PID Control
      "Que régule typiquement le PID intégré d'un variateur ?": {
        question: "What does the VFD's built-in PID typically regulate?",
        options: ["Motor speed", "A process variable (pressure, flow...)", "Current", "VFD temperature"],
        explanation: "The built-in PID regulates a process variable like pressure or flow, not motor speed directly."
      },
      "Quel paramètre PID élimine l'erreur statique ?": {
        question: "Which PID parameter eliminates steady-state error?",
        options: ["P (proportional)", "I (integral)", "D (derivative)", "None"],
        explanation: "The integral action accumulates error over time until elimination."
      },
      "Par quoi commencer le réglage PID ?": {
        question: "What should you start with when tuning PID?",
        options: ["D only", "I only", "P only", "Everything at once"],
        explanation: "Start with P only, then add I progressively. D is rarely needed."
      },
      "Que provoque un gain I trop élevé ?": {
        question: "What does too high an I gain cause?",
        options: ["Slow response", "Oscillations", "Steady-state error", "No effect"],
        explanation: "An integral gain that is too high causes overshoots and oscillations."
      },
      "Pour quelle application le PID intégré est-il adapté ?": {
        question: "For which application is the built-in PID suitable?",
        options: ["Precise positioning", "Pump pressure regulation", "Axis synchronization", "Numerical control"],
        explanation: "The built-in PID is perfect for simple regulations like pump pressure."
      },
      // Lesson 5 - Fault Management
      "Que signifie le code défaut OC ?": {
        question: "What does the fault code OC mean?",
        options: ["Over Current", "Open Circuit", "Over Charge", "Output Control"],
        explanation: "OC means Over Current, indicating an overcurrent has been detected."
      },
      "Quelle action pour un défaut OV (surtension) au freinage ?": {
        question: "What action for an OV (overvoltage) fault during braking?",
        options: ["Reduce the load", "Lengthen the deceleration ramp", "Increase speed", "Change the motor"],
        explanation: "A longer ramp reduces the braking energy returned and avoids overvoltage."
      },
      "Qu'est-ce que l'arrêt sur rampe en cas de défaut ?": {
        question: "What is ramp stop in case of fault?",
        options: ["Immediate stop", "Controlled deceleration then stop", "Speed maintained", "Reversal"],
        explanation: "Ramp stop performs a controlled deceleration instead of an abrupt stop."
      },
      "Que vérifier en cas de défaut de surchauffe ?": {
        question: "What should you check in case of overheating fault?",
        options: ["Wiring", "Ventilation and load", "Communication", "Setpoint"],
        explanation: "Overheating usually indicates a ventilation or overload problem."
      },
      "Pourquoi ne pas désactiver les protections ?": {
        question: "Why not disable protections?",
        options: ["It's impossible", "Risk to installation and safety", "It consumes more", "It's illegal"],
        explanation: "Disabling protections exposes the installation and people to serious risks."
      },
      // Lesson 6 - Backup and Restore
      "Pourquoi sauvegarder les paramètres du variateur ?": {
        question: "Why backup VFD parameters?",
        options: ["For warranty", "To facilitate replacement", "For certification", "It's mandatory"],
        explanation: "Backup allows you to quickly reconfigure a replacement VFD."
      },
      "Quelle méthode de sauvegarde est la plus pratique ?": {
        question: "Which backup method is most practical?",
        options: ["Write on paper", "USB key directly on the VFD", "Screen photo", "Memorize"],
        explanation: "USB key allows quick and reliable backup directly on the VFD."
      },
      "Que faut-il également sauvegarder ?": {
        question: "What else should be saved?",
        options: ["The manual", "The VFD firmware", "The invoice", "The electrical diagram"],
        explanation: "Firmware can differ between VFDs and affect parameter compatibility."
      },
      "À quelle fréquence sauvegarder ?": {
        question: "How often should you backup?",
        options: ["Once a year", "After each modification", "Never", "At installation only"],
        explanation: "Each parameter modification should be followed by a backup."
      },
      "Où garder la copie de sauvegarde ?": {
        question: "Where to keep the backup copy?",
        options: ["On the VFD only", "Next to the VFD", "Off-site as well", "In the motor"],
        explanation: "An off-site copy protects against loss in case of disaster or theft."
      }
    },
    es: {
      // Lesson 1 - Parámetros del motor
      "Où trouve-t-on les données à paramétrer dans le variateur ?": {
        question: "¿Dónde se encuentran los datos a configurar en el variador?",
        options: ["En el manual del variador", "En la placa de características del motor", "En Internet", "En el PLC"],
        explanation: "La placa de características del motor contiene todas las características nominales necesarias."
      },
      "Qu'est-ce que l'auto-tuning ?": {
        question: "¿Qué es el auto-tuning?",
        options: ["Ajuste automático de radio", "Identificación automática del motor", "Calibración de sensores", "Actualización de firmware"],
        explanation: "El auto-tuning identifica automáticamente los parámetros eléctricos del motor."
      },
      "Quelle condition pour l'auto-tuning dynamique ?": {
        question: "¿Qué condición se requiere para el auto-tuning dinámico?",
        options: ["Motor alimentado", "Carga desacoplada", "Variador frío", "Comunicación activa"],
        explanation: "El auto-tuning con rotación requiere que la carga esté desacoplada para girar libremente."
      },
      "Que représente le cos φ sur la plaque moteur ?": {
        question: "¿Qué representa el cos phi en la placa del motor?",
        options: ["El rendimiento", "El factor de potencia", "La velocidad máxima", "La corriente de arranque"],
        explanation: "El cos phi (coseno phi) es el factor de potencia del motor a carga nominal."
      },
      "Pourquoi la fréquence nominale est-elle importante ?": {
        question: "¿Por qué es importante la frecuencia nominal?",
        options: ["Para la comunicación", "Para el cálculo de velocidad y flujo", "Para el ruido", "Para el enfriamiento"],
        explanation: "La frecuencia nominal permite al variador calcular la velocidad síncrona y mantener el flujo correcto."
      },
      // Lesson 2 - Rampas y límites
      "Qu'est-ce qu'une rampe en S ?": {
        question: "¿Qué es una rampa en S?",
        options: ["Una rampa en forma de S", "Aceleración progresiva al inicio y al final", "Una rampa muy rápida", "Una rampa para cargas pesadas"],
        explanation: "La rampa en S tiene una aceleración progresiva al arranque y al final para un movimiento más suave."
      },
      "Que se passe-t-il si la rampe d'accélération est trop rapide ?": {
        question: "¿Qué sucede si la rampa de aceleración es demasiado rápida?",
        options: ["Nada especial", "Fallo por sobreintensidad", "El motor va más rápido", "Ahorro de energía"],
        explanation: "Una rampa demasiado rápida demanda demasiada corriente y activa la protección por sobreintensidad."
      },
      "Que provoque une décélération trop rapide ?": {
        question: "¿Qué provoca una deceleración demasiado rápida?",
        options: ["Sobrecalentamiento del motor", "Fallo por sobretensión", "Cortocircuito", "Pérdida de comunicación"],
        explanation: "El motor se convierte en generador durante el frenado, devolviendo energía que eleva la tensión del bus DC."
      },
      "À quoi sert la limite de vitesse minimale ?": {
        question: "¿Para qué sirve el límite de velocidad mínima?",
        options: ["Proteger el motor", "Evitar el sobrecalentamiento a baja velocidad", "Ahorrar energía", "Todas estas respuestas"],
        explanation: "El límite bajo protege el motor que puede sobrecalentarse a muy baja velocidad sin ventilación suficiente."
      },
      "Peut-on dépasser 100% de la vitesse nominale ?": {
        question: "¿Se puede superar el 100% de la velocidad nominal?",
        options: ["No, nunca", "Sí, típicamente hasta 120%", "Sí, sin límite", "Solo en modo especial"],
        explanation: "Generalmente se puede llegar hasta 120% pero el par disponible disminuye por encima de la frecuencia nominal."
      },
      // Lesson 3 - Modos de control
      "Quel avantage du signal 4-20mA sur le 0-10V ?": {
        question: "¿Qué ventaja tiene la señal 4-20mA sobre 0-10V?",
        options: ["Más precisa", "Menos sensible a las interferencias", "Más rápida", "Más barata"],
        explanation: "La señal de corriente 4-20mA es menos sensible a las perturbaciones electromagnéticas que la tensión."
      },
      "Que permet le mode de commande combiné ?": {
        question: "¿Qué permite el modo de control combinado?",
        options: ["Más potencia", "Algunas funciones locales, otras por bus", "Dos motores", "Redundancia"],
        explanation: "El modo combinado permite, por ejemplo, marcha/paro por bornes y consigna por bus de campo."
      },
      "Quel est l'inconvénient principal du potentiomètre ?": {
        question: "¿Cuál es el principal inconveniente del potenciómetro?",
        options: ["Coste elevado", "Imprecisión", "Complejidad", "Consumo"],
        explanation: "El potenciómetro carece de precisión y repetibilidad comparado con las señales digitales."
      },
      "Quel protocole est universel pour les variateurs ?": {
        question: "¿Qué protocolo es universal para los variadores?",
        options: ["Profinet", "EtherCAT", "Modbus", "DeviceNet"],
        explanation: "Modbus es soportado por prácticamente todos los fabricantes de variadores."
      },
      "Où se paramètre la source de commande ?": {
        question: "¿Dónde se configura la fuente de control?",
        options: ["En el PLC", "En los parámetros del variador", "En el motor", "En el cableado"],
        explanation: "La fuente de control (local, bornes, bus) se configura en los parámetros del variador."
      },
      // Lesson 4 - Regulación PID integrada
      "Que régule typiquement le PID intégré d'un variateur ?": {
        question: "¿Qué regula típicamente el PID integrado de un variador?",
        options: ["La velocidad del motor", "Una variable de proceso (presión, caudal...)", "La corriente", "La temperatura del variador"],
        explanation: "El PID integrado regula una variable de proceso como la presión o el caudal, no directamente la velocidad del motor."
      },
      "Quel paramètre PID élimine l'erreur statique ?": {
        question: "¿Qué parámetro PID elimina el error estático?",
        options: ["P (proporcional)", "I (integral)", "D (derivativo)", "Ninguno"],
        explanation: "La acción integral acumula el error en el tiempo hasta eliminarlo."
      },
      "Par quoi commencer le réglage PID ?": {
        question: "¿Con qué empezar el ajuste PID?",
        options: ["Solo D", "Solo I", "Solo P", "Todo a la vez"],
        explanation: "Se comienza con P solo, luego se añade I progresivamente. D rara vez es necesario."
      },
      "Que provoque un gain I trop élevé ?": {
        question: "¿Qué provoca una ganancia I demasiado alta?",
        options: ["Respuesta lenta", "Oscilaciones", "Error estático", "Ningún efecto"],
        explanation: "Una ganancia integral demasiado alta provoca sobrepasamiento y oscilaciones."
      },
      "Pour quelle application le PID intégré est-il adapté ?": {
        question: "¿Para qué aplicación es adecuado el PID integrado?",
        options: ["Posicionamiento preciso", "Regulación de presión de bomba", "Sincronización de ejes", "Control numérico"],
        explanation: "El PID integrado es perfecto para regulaciones simples como la presión de bombas."
      },
      // Lesson 5 - Gestión de fallos
      "Que signifie le code défaut OC ?": {
        question: "¿Qué significa el código de fallo OC?",
        options: ["Over Current (sobreintensidad)", "Open Circuit", "Over Charge", "Output Control"],
        explanation: "OC significa Over Current, indicando que se ha detectado una sobreintensidad."
      },
      "Quelle action pour un défaut OV (surtension) au freinage ?": {
        question: "¿Qué acción para un fallo OV (sobretensión) durante el frenado?",
        options: ["Reducir la carga", "Alargar la rampa de deceleración", "Aumentar la velocidad", "Cambiar el motor"],
        explanation: "Una rampa más larga reduce la energía de frenado devuelta y evita la sobretensión."
      },
      "Qu'est-ce que l'arrêt sur rampe en cas de défaut ?": {
        question: "¿Qué es la parada en rampa en caso de fallo?",
        options: ["Parada inmediata", "Deceleración controlada y luego parada", "Mantenimiento de velocidad", "Inversión"],
        explanation: "La parada en rampa realiza una deceleración controlada en lugar de una parada brusca."
      },
      "Que vérifier en cas de défaut de surchauffe ?": {
        question: "¿Qué verificar en caso de fallo por sobrecalentamiento?",
        options: ["El cableado", "La ventilación y la carga", "La comunicación", "La consigna"],
        explanation: "El sobrecalentamiento generalmente indica un problema de ventilación o sobrecarga."
      },
      "Pourquoi ne pas désactiver les protections ?": {
        question: "¿Por qué no desactivar las protecciones?",
        options: ["Es imposible", "Riesgo para la instalación y la seguridad", "Consume más", "Es ilegal"],
        explanation: "Desactivar las protecciones expone la instalación y las personas a riesgos graves."
      },
      // Lesson 6 - Copia de seguridad y restauración
      "Pourquoi sauvegarder les paramètres du variateur ?": {
        question: "¿Por qué guardar los parámetros del variador?",
        options: ["Para la garantía", "Para facilitar el reemplazo", "Para la certificación", "Es obligatorio"],
        explanation: "La copia de seguridad permite reconfigurar rápidamente un variador de reemplazo."
      },
      "Quelle méthode de sauvegarde est la plus pratique ?": {
        question: "¿Qué método de copia de seguridad es más práctico?",
        options: ["Anotar en papel", "Llave USB directamente en el variador", "Foto de la pantalla", "Memorizar"],
        explanation: "La llave USB permite una copia de seguridad rápida y fiable directamente en el variador."
      },
      "Que faut-il également sauvegarder ?": {
        question: "¿Qué más se debe guardar?",
        options: ["El manual", "El firmware del variador", "La factura", "El esquema eléctrico"],
        explanation: "El firmware puede diferir entre variadores y afectar la compatibilidad de los parámetros."
      },
      "À quelle fréquence sauvegarder ?": {
        question: "¿Con qué frecuencia hacer copia de seguridad?",
        options: ["Una vez al año", "Después de cada modificación", "Nunca", "Solo en la instalación"],
        explanation: "Cada modificación de parámetros debería ir seguida de una copia de seguridad."
      },
      "Où garder la copie de sauvegarde ?": {
        question: "¿Dónde guardar la copia de seguridad?",
        options: ["Solo en el variador", "Junto al variador", "Fuera del sitio también", "En el motor"],
        explanation: "Una copia fuera del sitio protege contra la pérdida en caso de siniestro o robo."
      }
    }
  }
}
