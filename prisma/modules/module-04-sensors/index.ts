// Module 4: Sensors and Actuators
import type { ModuleData } from '../types.js'

export const module04Data: ModuleData = {
  // Module info
  moduleOrder: 4,
  moduleTitle: "Capteurs et actionneurs",
  moduleDescription: "Comprenez les capteurs, actionneurs et leur interfaçage",
  moduleTranslations: {
    en: {
      title: "Sensors and Actuators",
      description: "Understand sensors, actuators and their interfacing"
    },
    es: {
      title: "Sensores y Actuadores",
      description: "Comprenda los sensores, actuadores y su interfaz"
    }
  },

  // Lessons data (in French - base language)
  lessons: [
    {
      title: "Les capteurs TOR",
      description: "Découvrez les différents types de capteurs Tout Ou Rien",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Capteurs TOR\n\nLes capteurs **TOR** (Tout Ou Rien) délivrent un signal binaire : 0 ou 1."
          },
          {
            type: "text",
            content: "## Types de capteurs TOR\n\n### Capteurs mécaniques\n- **Fin de course** : Détecte une position extrême\n- **Bouton poussoir** : Actionné manuellement\n- **Interrupteur de position** : Détecte un passage\n\n### Capteurs de proximité\n- **Inductif** : Détecte les métaux (sans contact)\n- **Capacitif** : Détecte tout matériau\n- **Optique** : Utilise un faisceau lumineux"
          },
          {
            type: "text",
            content: "## Caractéristiques importantes\n\n- **Portée** : Distance de détection\n- **Fréquence de commutation** : Nombre de détections par seconde\n- **Type de sortie** : PNP ou NPN\n- **Indice de protection** : IP67, IP69K, etc."
          }
        ]
      })
    },
    {
      title: "Les capteurs analogiques",
      description: "Comprenez les capteurs qui mesurent des grandeurs continues",
      order: 2,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Capteurs Analogiques\n\nLes capteurs analogiques mesurent des grandeurs **continues** : température, pression, niveau, débit..."
          },
          {
            type: "text",
            content: "## Signaux de sortie courants\n\n| Signal | Plage | Usage |\n|--------|-------|-------|\n| 0-10V | 0 à 10 volts | Courte distance |\n| 4-20mA | 4 à 20 mA | Longue distance, industriel |\n| 0-20mA | 0 à 20 mA | Applications spécifiques |\n| PT100/PT1000 | Résistance | Température |"
          },
          {
            type: "info",
            content: "Le signal 4-20mA est privilégié en industrie car : 4mA = capteur alimenté (détection de coupure de fil), immunité au bruit électrique, longues distances possibles."
          },
          {
            type: "text",
            content: "## Conversion analogique-numérique\n\nL'automate convertit le signal analogique en valeur numérique :\n\n- **Résolution** : Nombre de bits (12 bits = 4096 niveaux)\n- **Temps de conversion** : Rapidité de l'échantillonnage\n- **Mise à l'échelle** : Conversion en unités physiques (°C, bar, etc.)"
          },
          {
            type: "text",
            content: "## Types de capteurs analogiques\n\n- **Température** : PT100, thermocouple, CTN/CTP\n- **Pression** : Piézoélectrique, capacitif\n- **Niveau** : Ultrason, radar, pression hydrostatique\n- **Débit** : Électromagnétique, Coriolis, vortex\n- **Position** : Potentiomètre, LVDT, encodeur"
          }
        ]
      })
    },
    {
      title: "PNP vs NPN : comprendre les sorties",
      description: "Maîtrisez les types de sortie des capteurs industriels",
      order: 3,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# PNP vs NPN\n\nLes capteurs TOR utilisent des transistors de sortie de type **PNP** ou **NPN**. Comprendre la différence est essentiel pour le câblage."
          },
          {
            type: "diagram",
            title: "Schémas de câblage PNP et NPN",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    PNP vs NPN                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PNP (Sourcing - Source de courant)                         │
│  ┌────────┐                                                 │
│  │ +24V ──┼──┬──────────────────────────                    │
│  │        │  │  ┌─────────┐                                 │
│  │ Signal─┼──┴──┤ CAPTEUR ├──▶ Signal (+24V si actif)      │
│  │        │     └─────────┘                                 │
│  │ 0V ────┼──────────────────────────── 0V automate         │
│  └────────┘                                                  │
│  → Le capteur "fournit" du +24V à l'entrée                  │
│                                                              │
│  NPN (Sinking - Puits de courant)                           │
│  ┌────────┐                                                 │
│  │ +24V ──┼─────────────────────────── +24V automate        │
│  │        │     ┌─────────┐                                 │
│  │ Signal─┼─────┤ CAPTEUR ├──▶ Signal (0V si actif)        │
│  │        │  ┌──┴─────────┘                                 │
│  │ 0V ────┼──┴───────────────────────                       │
│  └────────┘                                                  │
│  → Le capteur "tire" l'entrée vers 0V                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Quelle technologie choisir ?\n\n| Région | Standard |\n|--------|----------|\n| Europe | PNP (majoritaire) |\n| Asie (Japon) | NPN (historique) |\n| Amérique | Les deux |"
          },
          {
            type: "warning",
            content: "Ne jamais mélanger PNP et NPN sur les mêmes entrées sans vérifier la compatibilité de l'automate !"
          }
        ]
      })
    },
    {
      title: "Les actionneurs électriques",
      description: "Découvrez les moteurs, contacteurs et variateurs",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Actionneurs Électriques\n\nLes actionneurs transforment l'énergie électrique en énergie mécanique ou en signal."
          },
          {
            type: "text",
            content: "## Moteurs électriques\n\n### Moteur asynchrone triphasé\n- Le plus répandu en industrie\n- Simple, robuste, économique\n- Vitesse quasi-constante\n\n### Moteur à courant continu\n- Variation de vitesse simple\n- Couple élevé au démarrage\n- Nécessite un entretien (balais)\n\n### Moteur brushless (BLDC)\n- Haut rendement\n- Pas d'entretien\n- Plus coûteux"
          },
          {
            type: "text",
            content: "## Commande des moteurs\n\n| Équipement | Fonction |\n|------------|----------|\n| **Contacteur** | Commutation TOR (marche/arrêt) |\n| **Démarreur** | Démarrage progressif |\n| **Variateur** | Contrôle de vitesse et couple |\n| **Servomoteur** | Positionnement précis |"
          },
          {
            type: "diagram",
            title: "Schéma de puissance d'un moteur",
            content: `┌─────────────────────────────────────────────────────────────┐
│            SCHÉMA DE PUISSANCE MOTEUR                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   L1  L2  L3  (Triphasé 400V)                               │
│    │   │   │                                                 │
│    ├───┴───┤                                                 │
│    │  Q1   │  Sectionneur                                   │
│    ├───────┤                                                 │
│    │  F1   │  Fusibles / Disjoncteur                        │
│    ├───────┤                                                 │
│    │  KM1  │  Contacteur                                    │
│    ├───────┤                                                 │
│    │  F2   │  Relais thermique                              │
│    ├───┬───┤                                                 │
│    │   │   │                                                 │
│   ┌┴───┴───┴┐                                               │
│   │   M     │  Moteur                                       │
│   │   3~    │                                                │
│   └─────────┘                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      })
    },
    {
      title: "Les actionneurs pneumatiques",
      description: "Comprenez les vérins et électrovannes",
      order: 5,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Actionneurs Pneumatiques\n\nLa pneumatique utilise l'air comprimé pour créer des mouvements. Très répandue dans les machines automatiques."
          },
          {
            type: "text",
            content: "## Les vérins\n\n### Vérin simple effet\n- Un seul sens motorisé\n- Retour par ressort\n- Applications : serrage, éjection\n\n### Vérin double effet\n- Deux sens motorisés\n- Plus de force et vitesse contrôlable\n- Le plus utilisé en industrie"
          },
          {
            type: "text",
            content: "## Les distributeurs (électrovannes)\n\n| Type | Notation | Positions | Usage |\n|------|----------|-----------|-------|\n| 3/2 | 3 orifices, 2 positions | 2 | Vérin simple effet |\n| 5/2 | 5 orifices, 2 positions | 2 | Vérin double effet |\n| 5/3 | 5 orifices, 3 positions | 3 | Arrêt intermédiaire |"
          },
          {
            type: "diagram",
            title: "Schéma vérin double effet avec distributeur 5/2",
            content: `┌─────────────────────────────────────────────────────────────┐
│        VÉRIN DOUBLE EFFET + DISTRIBUTEUR 5/2                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              ┌────────────────────────┐                     │
│              │    VÉRIN DOUBLE EFFET  │                     │
│    ◄─────────┤ A           B ├─────────►                    │
│              └────────┬───────┘                             │
│                       │                                      │
│           ┌───────────┼───────────┐                         │
│           │     DISTRIBUTEUR 5/2  │                         │
│           │  ┌───────────────┐    │                         │
│     Y1 ───┼──┤ 14    2    4  ├────┼─── vers vérin B        │
│           │  │               │    │                         │
│           │  │  1    3    5  │    │                         │
│           │  └───┬───┬───┬───┘    │                         │
│           └──────┼───┼───┼────────┘                         │
│                  │   │   │                                   │
│                  P   R   R                                   │
│                  │   │   │                                   │
│              Air comprimé  Échappements                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "La pression standard en industrie est de 6 bar (600 kPa). Les vérins sont dimensionnés selon la force requise."
          }
        ]
      })
    },
    {
      title: "Câblage et mise en service",
      description: "Bonnes pratiques de câblage des E/S industrielles",
      order: 6,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Câblage et Mise en Service\n\nUn câblage propre et organisé est essentiel pour la fiabilité et la maintenance du système."
          },
          {
            type: "text",
            content: "## Règles de câblage\n\n1. **Séparation des circuits** : Puissance et commande dans des goulottes séparées\n2. **Blindage** : Câbles blindés pour les signaux analogiques\n3. **Repérage** : Chaque fil doit être identifié (bagues, couleurs)\n4. **Raccordement** : Cosses à sertir, pas de fils en vrac\n5. **Réserve** : Prévoir 10-20% de bornes de réserve"
          },
          {
            type: "text",
            content: "## Code couleur des fils\n\n| Couleur | Usage |\n|---------|-------|\n| Noir | Phase L1 |\n| Marron | Phase L2 |\n| Gris | Phase L3 |\n| Bleu | Neutre |\n| Vert-jaune | Terre (PE) |\n| Rouge | Commande 24V+ |\n| Bleu clair | Commande 0V |"
          },
          {
            type: "warning",
            content: "Toujours couper l'alimentation avant d'intervenir sur le câblage ! Consigner et cadenasser si nécessaire."
          },
          {
            type: "text",
            content: "## Étapes de mise en service\n\n1. Vérifier le câblage sans tension (continuité, isolement)\n2. Alimenter le 24V commande seul\n3. Tester chaque entrée individuellement\n4. Tester chaque sortie (charge débranchée puis branchée)\n5. Vérifier le programme en mode pas à pas\n6. Tests en conditions réelles"
          }
        ]
      })
    }
  ],

  // Lesson translations
  lessonTranslations: {
    en: {
      "Les capteurs TOR": {
        title: "Digital Sensors",
        description: "Discover the different types of discrete sensors",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Digital Sensors\n\n**Digital** sensors (discrete) deliver a binary signal: 0 or 1."
            },
            {
              type: "text",
              content: "## Types of Digital Sensors\n\n### Mechanical Sensors\n- **Limit switch**: Detects an extreme position\n- **Push button**: Manually operated\n- **Position switch**: Detects a passage\n\n### Proximity Sensors\n- **Inductive**: Detects metals (non-contact)\n- **Capacitive**: Detects any material\n- **Optical**: Uses a light beam"
            },
            {
              type: "text",
              content: "## Important Characteristics\n\n- **Range**: Detection distance\n- **Switching frequency**: Number of detections per second\n- **Output type**: PNP or NPN\n- **Protection rating**: IP67, IP69K, etc."
            }
          ]
        })
      },
      "Les capteurs analogiques": {
        title: "Analog Sensors",
        description: "Understand analog sensors and signals",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Analog Sensors\n\nAnalog sensors measure **continuous** quantities: temperature, pressure, level, flow..."
            },
            {
              type: "text",
              content: "## Common Output Signals\n\n| Signal | Range | Usage |\n|--------|-------|-------|\n| 0-10V | 0 to 10 volts | Short distance |\n| 4-20mA | 4 to 20 mA | Long distance, industrial |\n| 0-20mA | 0 to 20 mA | Specific applications |\n| PT100/PT1000 | Resistance | Temperature |"
            },
            {
              type: "info",
              content: "The 4-20mA signal is preferred in industry because: 4mA = sensor powered (wire break detection), immunity to electrical noise, long distances possible."
            },
            {
              type: "text",
              content: "## Analog-to-Digital Conversion\n\nThe PLC converts the analog signal to a digital value:\n\n- **Resolution**: Number of bits (12 bits = 4096 levels)\n- **Conversion time**: Sampling speed\n- **Scaling**: Conversion to physical units (C, bar, etc.)"
            },
            {
              type: "text",
              content: "## Types of Analog Sensors\n\n- **Temperature**: PT100, thermocouple, NTC/PTC\n- **Pressure**: Piezoelectric, capacitive\n- **Level**: Ultrasonic, radar, hydrostatic pressure\n- **Flow**: Electromagnetic, Coriolis, vortex\n- **Position**: Potentiometer, LVDT, encoder"
            }
          ]
        })
      },
      "PNP vs NPN : comprendre les sorties": {
        title: "PNP vs NPN: Understanding Outputs",
        description: "Learn the difference between PNP and NPN",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# PNP vs NPN\n\nDigital sensors use output transistors of type **PNP** or **NPN**. Understanding the difference is essential for wiring."
            },
            {
              type: "diagram",
              title: "PNP and NPN Wiring Diagrams",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    PNP vs NPN                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PNP (Sourcing - Current source)                            │
│  ┌────────┐                                                 │
│  │ +24V ──┼──┬──────────────────────────                    │
│  │        │  │  ┌─────────┐                                 │
│  │ Signal─┼──┴──┤ SENSOR  ├──▶ Signal (+24V when active)   │
│  │        │     └─────────┘                                 │
│  │ 0V ────┼──────────────────────────── 0V PLC              │
│  └────────┘                                                  │
│  → The sensor "provides" +24V to the input                  │
│                                                              │
│  NPN (Sinking - Current sink)                               │
│  ┌────────┐                                                 │
│  │ +24V ──┼─────────────────────────── +24V PLC             │
│  │        │     ┌─────────┐                                 │
│  │ Signal─┼─────┤ SENSOR  ├──▶ Signal (0V when active)     │
│  │        │  ┌──┴─────────┘                                 │
│  │ 0V ────┼──┴───────────────────────                       │
│  └────────┘                                                  │
│  → The sensor "pulls" the input to 0V                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Which Technology to Choose?\n\n| Region | Standard |\n|--------|----------|\n| Europe | PNP (majority) |\n| Asia (Japan) | NPN (historical) |\n| America | Both |"
            },
            {
              type: "warning",
              content: "Never mix PNP and NPN on the same inputs without checking PLC compatibility!"
            }
          ]
        })
      },
      "Les actionneurs électriques": {
        title: "Electrical Actuators",
        description: "Discover motors, contactors, and drives",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Electrical Actuators\n\nActuators transform electrical energy into mechanical energy or signals."
            },
            {
              type: "text",
              content: "## Electric Motors\n\n### Three-phase Asynchronous Motor\n- Most common in industry\n- Simple, robust, economical\n- Nearly constant speed\n\n### DC Motor\n- Simple speed variation\n- High starting torque\n- Requires maintenance (brushes)\n\n### Brushless Motor (BLDC)\n- High efficiency\n- No maintenance\n- More expensive"
            },
            {
              type: "text",
              content: "## Motor Control\n\n| Equipment | Function |\n|-----------|----------|\n| **Contactor** | On/Off switching |\n| **Soft starter** | Progressive starting |\n| **VFD** | Speed and torque control |\n| **Servo motor** | Precise positioning |"
            },
            {
              type: "diagram",
              title: "Motor Power Diagram",
              content: `┌─────────────────────────────────────────────────────────────┐
│            MOTOR POWER DIAGRAM                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   L1  L2  L3  (Three-phase 400V)                            │
│    │   │   │                                                 │
│    ├───┴───┤                                                 │
│    │  Q1   │  Disconnect switch                             │
│    ├───────┤                                                 │
│    │  F1   │  Fuses / Circuit breaker                       │
│    ├───────┤                                                 │
│    │  KM1  │  Contactor                                     │
│    ├───────┤                                                 │
│    │  F2   │  Thermal relay                                 │
│    ├───┬───┤                                                 │
│    │   │   │                                                 │
│   ┌┴───┴───┴┐                                               │
│   │   M     │  Motor                                        │
│   │   3~    │                                                │
│   └─────────┘                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            }
          ]
        })
      },
      "Les actionneurs pneumatiques": {
        title: "Pneumatic Actuators",
        description: "Learn about pneumatic cylinders and valves",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Pneumatic Actuators\n\nPneumatics uses compressed air to create movements. Very common in automatic machines."
            },
            {
              type: "text",
              content: "## Cylinders\n\n### Single-acting Cylinder\n- One motorized direction\n- Spring return\n- Applications: clamping, ejection\n\n### Double-acting Cylinder\n- Both directions motorized\n- More force and controllable speed\n- Most used in industry"
            },
            {
              type: "text",
              content: "## Distributors (Solenoid Valves)\n\n| Type | Notation | Positions | Usage |\n|------|----------|-----------|-------|\n| 3/2 | 3 ports, 2 positions | 2 | Single-acting cylinder |\n| 5/2 | 5 ports, 2 positions | 2 | Double-acting cylinder |\n| 5/3 | 5 ports, 3 positions | 3 | Intermediate stop |"
            },
            {
              type: "diagram",
              title: "Double-acting Cylinder with 5/2 Valve",
              content: `┌─────────────────────────────────────────────────────────────┐
│        DOUBLE-ACTING CYLINDER + 5/2 VALVE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              ┌────────────────────────┐                     │
│              │  DOUBLE-ACTING CYLINDER │                     │
│    ◄─────────┤ A           B ├─────────►                    │
│              └────────┬───────┘                             │
│                       │                                      │
│           ┌───────────┼───────────┐                         │
│           │      5/2 VALVE        │                         │
│           │  ┌───────────────┐    │                         │
│     Y1 ───┼──┤ 14    2    4  ├────┼─── to cylinder B       │
│           │  │               │    │                         │
│           │  │  1    3    5  │    │                         │
│           │  └───┬───┬───┬───┘    │                         │
│           └──────┼───┼───┼────────┘                         │
│                  │   │   │                                   │
│                  P   R   R                                   │
│                  │   │   │                                   │
│           Compressed air  Exhausts                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "info",
              content: "The standard pressure in industry is 6 bar (600 kPa). Cylinders are sized according to required force."
            }
          ]
        })
      },
      "Câblage et mise en service": {
        title: "Wiring and Commissioning",
        description: "Wire and commission an automated system",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Wiring and Commissioning\n\nClean and organized wiring is essential for system reliability and maintenance."
            },
            {
              type: "text",
              content: "## Wiring Rules\n\n1. **Circuit separation**: Power and control in separate ducts\n2. **Shielding**: Shielded cables for analog signals\n3. **Labeling**: Each wire must be identified (tags, colors)\n4. **Connection**: Crimped terminals, no loose wires\n5. **Reserve**: Plan for 10-20% spare terminals"
            },
            {
              type: "text",
              content: "## Wire Color Code\n\n| Color | Usage |\n|-------|-------|\n| Black | Phase L1 |\n| Brown | Phase L2 |\n| Gray | Phase L3 |\n| Blue | Neutral |\n| Green-yellow | Ground (PE) |\n| Red | Control 24V+ |\n| Light blue | Control 0V |"
            },
            {
              type: "warning",
              content: "Always disconnect power before working on wiring! Lock out and tag out if necessary."
            },
            {
              type: "text",
              content: "## Commissioning Steps\n\n1. Check wiring without power (continuity, insulation)\n2. Power up 24V control only\n3. Test each input individually\n4. Test each output (load disconnected then connected)\n5. Verify program in step mode\n6. Real condition tests"
            }
          ]
        })
      }
    },
    es: {
      "Les capteurs TOR": {
        title: "Sensores digitales",
        description: "Descubra los diferentes tipos de sensores discretos",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Sensores digitales\n\nLos sensores **digitales** (discretos) entregan una senal binaria: 0 o 1."
            },
            {
              type: "text",
              content: "## Tipos de sensores digitales\n\n### Sensores mecanicos\n- **Final de carrera**: Detecta una posicion extrema\n- **Pulsador**: Operado manualmente\n- **Interruptor de posicion**: Detecta un paso\n\n### Sensores de proximidad\n- **Inductivo**: Detecta metales (sin contacto)\n- **Capacitivo**: Detecta cualquier material\n- **Optico**: Usa un haz de luz"
            },
            {
              type: "text",
              content: "## Caracteristicas importantes\n\n- **Alcance**: Distancia de deteccion\n- **Frecuencia de conmutacion**: Numero de detecciones por segundo\n- **Tipo de salida**: PNP o NPN\n- **Grado de proteccion**: IP67, IP69K, etc."
            }
          ]
        })
      },
      "Les capteurs analogiques": {
        title: "Sensores analogicos",
        description: "Comprenda los sensores y senales analogicas",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Sensores Analogicos\n\nLos sensores analogicos miden magnitudes **continuas**: temperatura, presion, nivel, caudal..."
            },
            {
              type: "text",
              content: "## Senales de salida comunes\n\n| Senal | Rango | Uso |\n|-------|-------|-----|\n| 0-10V | 0 a 10 voltios | Corta distancia |\n| 4-20mA | 4 a 20 mA | Larga distancia, industrial |\n| 0-20mA | 0 a 20 mA | Aplicaciones especificas |\n| PT100/PT1000 | Resistencia | Temperatura |"
            },
            {
              type: "info",
              content: "La senal 4-20mA es preferida en industria porque: 4mA = sensor alimentado (deteccion de corte de cable), inmunidad al ruido electrico, largas distancias posibles."
            },
            {
              type: "text",
              content: "## Conversion analogico-digital\n\nEl PLC convierte la senal analogica en valor digital:\n\n- **Resolucion**: Numero de bits (12 bits = 4096 niveles)\n- **Tiempo de conversion**: Velocidad de muestreo\n- **Escalado**: Conversion a unidades fisicas (C, bar, etc.)"
            },
            {
              type: "text",
              content: "## Tipos de sensores analogicos\n\n- **Temperatura**: PT100, termopar, NTC/PTC\n- **Presion**: Piezoelectrico, capacitivo\n- **Nivel**: Ultrasonico, radar, presion hidrostatica\n- **Caudal**: Electromagnetico, Coriolis, vortex\n- **Posicion**: Potenciometro, LVDT, encoder"
            }
          ]
        })
      },
      "PNP vs NPN : comprendre les sorties": {
        title: "PNP vs NPN: Entender las salidas",
        description: "Aprenda la diferencia entre PNP y NPN",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# PNP vs NPN\n\nLos sensores digitales usan transistores de salida de tipo **PNP** o **NPN**. Entender la diferencia es esencial para el cableado."
            },
            {
              type: "diagram",
              title: "Diagramas de cableado PNP y NPN",
              content: `┌─────────────────────────────────────────────────────────────┐
│                    PNP vs NPN                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PNP (Sourcing - Fuente de corriente)                       │
│  ┌────────┐                                                 │
│  │ +24V ──┼──┬──────────────────────────                    │
│  │        │  │  ┌─────────┐                                 │
│  │ Senal──┼──┴──┤ SENSOR  ├──▶ Senal (+24V cuando activo)  │
│  │        │     └─────────┘                                 │
│  │ 0V ────┼──────────────────────────── 0V PLC              │
│  └────────┘                                                  │
│  → El sensor "proporciona" +24V a la entrada                │
│                                                              │
│  NPN (Sinking - Sumidero de corriente)                      │
│  ┌────────┐                                                 │
│  │ +24V ──┼─────────────────────────── +24V PLC             │
│  │        │     ┌─────────┐                                 │
│  │ Senal──┼─────┤ SENSOR  ├──▶ Senal (0V cuando activo)    │
│  │        │  ┌──┴─────────┘                                 │
│  │ 0V ────┼──┴───────────────────────                       │
│  └────────┘                                                  │
│  → El sensor "tira" la entrada a 0V                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "text",
              content: "## Que tecnologia elegir?\n\n| Region | Estandar |\n|--------|----------|\n| Europa | PNP (mayoritario) |\n| Asia (Japon) | NPN (historico) |\n| America | Ambos |"
            },
            {
              type: "warning",
              content: "Nunca mezcle PNP y NPN en las mismas entradas sin verificar la compatibilidad del PLC!"
            }
          ]
        })
      },
      "Les actionneurs électriques": {
        title: "Actuadores electricos",
        description: "Descubra motores, contactores y variadores",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Actuadores Electricos\n\nLos actuadores transforman la energia electrica en energia mecanica o senales."
            },
            {
              type: "text",
              content: "## Motores electricos\n\n### Motor asincrono trifasico\n- El mas comun en la industria\n- Simple, robusto, economico\n- Velocidad casi constante\n\n### Motor de corriente continua\n- Variacion de velocidad simple\n- Alto par de arranque\n- Requiere mantenimiento (escobillas)\n\n### Motor brushless (BLDC)\n- Alta eficiencia\n- Sin mantenimiento\n- Mas costoso"
            },
            {
              type: "text",
              content: "## Control de motores\n\n| Equipo | Funcion |\n|--------|----------|\n| **Contactor** | Conmutacion On/Off |\n| **Arrancador suave** | Arranque progresivo |\n| **Variador** | Control de velocidad y par |\n| **Servomotor** | Posicionamiento preciso |"
            },
            {
              type: "diagram",
              title: "Diagrama de potencia del motor",
              content: `┌─────────────────────────────────────────────────────────────┐
│            DIAGRAMA DE POTENCIA DEL MOTOR                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   L1  L2  L3  (Trifasico 400V)                              │
│    │   │   │                                                 │
│    ├───┴───┤                                                 │
│    │  Q1   │  Seccionador                                   │
│    ├───────┤                                                 │
│    │  F1   │  Fusibles / Interruptor                        │
│    ├───────┤                                                 │
│    │  KM1  │  Contactor                                     │
│    ├───────┤                                                 │
│    │  F2   │  Rele termico                                  │
│    ├───┬───┤                                                 │
│    │   │   │                                                 │
│   ┌┴───┴───┴┐                                               │
│   │   M     │  Motor                                        │
│   │   3~    │                                                │
│   └─────────┘                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            }
          ]
        })
      },
      "Les actionneurs pneumatiques": {
        title: "Actuadores neumaticos",
        description: "Aprenda sobre cilindros y valvulas neumaticas",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Actuadores Neumaticos\n\nLa neumatica utiliza aire comprimido para crear movimientos. Muy comun en maquinas automaticas."
            },
            {
              type: "text",
              content: "## Cilindros\n\n### Cilindro de simple efecto\n- Una direccion motorizada\n- Retorno por resorte\n- Aplicaciones: sujecion, expulsion\n\n### Cilindro de doble efecto\n- Ambas direcciones motorizadas\n- Mas fuerza y velocidad controlable\n- El mas usado en la industria"
            },
            {
              type: "text",
              content: "## Distribuidores (Electrovalvulas)\n\n| Tipo | Notacion | Posiciones | Uso |\n|------|----------|------------|-----|\n| 3/2 | 3 puertos, 2 posiciones | 2 | Cilindro simple efecto |\n| 5/2 | 5 puertos, 2 posiciones | 2 | Cilindro doble efecto |\n| 5/3 | 5 puertos, 3 posiciones | 3 | Parada intermedia |"
            },
            {
              type: "diagram",
              title: "Cilindro doble efecto con valvula 5/2",
              content: `┌─────────────────────────────────────────────────────────────┐
│        CILINDRO DOBLE EFECTO + VALVULA 5/2                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              ┌────────────────────────┐                     │
│              │  CILINDRO DOBLE EFECTO │                     │
│    ◄─────────┤ A           B ├─────────►                    │
│              └────────┬───────┘                             │
│                       │                                      │
│           ┌───────────┼───────────┐                         │
│           │      VALVULA 5/2      │                         │
│           │  ┌───────────────┐    │                         │
│     Y1 ───┼──┤ 14    2    4  ├────┼─── al cilindro B       │
│           │  │               │    │                         │
│           │  │  1    3    5  │    │                         │
│           │  └───┬───┬───┬───┘    │                         │
│           └──────┼───┼───┼────────┘                         │
│                  │   │   │                                   │
│                  P   R   R                                   │
│                  │   │   │                                   │
│           Aire comprimido  Escapes                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
            },
            {
              type: "info",
              content: "La presion estandar en la industria es de 6 bar (600 kPa). Los cilindros se dimensionan segun la fuerza requerida."
            }
          ]
        })
      },
      "Câblage et mise en service": {
        title: "Cableado y puesta en marcha",
        description: "Cablee y ponga en marcha un sistema automatizado",
        content: JSON.stringify({
          sections: [
            {
              type: "text",
              content: "# Cableado y Puesta en Marcha\n\nUn cableado limpio y organizado es esencial para la fiabilidad y el mantenimiento del sistema."
            },
            {
              type: "text",
              content: "## Reglas de cableado\n\n1. **Separacion de circuitos**: Potencia y control en canaletas separadas\n2. **Blindaje**: Cables blindados para senales analogicas\n3. **Identificacion**: Cada cable debe estar identificado (etiquetas, colores)\n4. **Conexion**: Terminales engarzados, no cables sueltos\n5. **Reserva**: Planificar 10-20% de bornes de reserva"
            },
            {
              type: "text",
              content: "## Codigo de colores de cables\n\n| Color | Uso |\n|-------|-----|\n| Negro | Fase L1 |\n| Marron | Fase L2 |\n| Gris | Fase L3 |\n| Azul | Neutro |\n| Verde-amarillo | Tierra (PE) |\n| Rojo | Control 24V+ |\n| Azul claro | Control 0V |"
            },
            {
              type: "warning",
              content: "Siempre desconecte la alimentacion antes de trabajar en el cableado! Bloquee y etiquete si es necesario."
            },
            {
              type: "text",
              content: "## Pasos de puesta en marcha\n\n1. Verificar cableado sin tension (continuidad, aislamiento)\n2. Alimentar solo el control 24V\n3. Probar cada entrada individualmente\n4. Probar cada salida (carga desconectada luego conectada)\n5. Verificar programa en modo paso a paso\n6. Pruebas en condiciones reales"
            }
          ]
        })
      }
    }
  },

  // Quizzes per lesson (indexed by lesson order - 1)
  quizzes: [
    // Lesson 1: Les capteurs TOR (5 questions)
    [
      {
        question: "Quel type de capteur detecte uniquement les metaux ?",
        options: ["Capacitif", "Inductif", "Optique", "Mecanique"],
        correctIndex: 1,
        explanation: "Le capteur inductif utilise un champ magnetique et ne detecte que les materiaux metalliques.",
        order: 1
      },
      {
        question: "Quel capteur peut detecter tous les types de materiaux ?",
        options: ["Inductif", "Capacitif", "Magnetique", "Aucun"],
        correctIndex: 1,
        explanation: "Le capteur capacitif peut detecter tout type de materiau (metal, plastique, bois, liquide, etc.).",
        order: 2
      },
      {
        question: "Qu'est-ce qu'un fin de course ?",
        options: ["Un capteur de temperature", "Un capteur mecanique qui detecte une position extreme", "Un capteur de pression", "Un capteur de vitesse"],
        correctIndex: 1,
        explanation: "Un fin de course est un capteur mecanique actionne quand un element mobile atteint une position limite.",
        order: 3
      },
      {
        question: "Que signifie IP67 pour un capteur ?",
        options: ["Sa vitesse de commutation", "Son indice de protection (etanche a la poussiere et immersion)", "Sa portee de detection", "Son type de sortie"],
        correctIndex: 1,
        explanation: "IP67 indique une protection contre la poussiere (6) et l'immersion temporaire dans l'eau (7).",
        order: 4
      },
      {
        question: "Quelle est la caracteristique principale d'un capteur optique ?",
        options: ["Il utilise un champ magnetique", "Il utilise un faisceau lumineux", "Il necessite un contact physique", "Il mesure la temperature"],
        correctIndex: 1,
        explanation: "Un capteur optique utilise un faisceau lumineux (infrarouge, laser, etc.) pour detecter la presence d'un objet.",
        order: 5
      }
    ],
    // Lesson 2: Les capteurs analogiques (5 questions)
    [
      {
        question: "Quel signal est privilegie en industrie pour les longues distances ?",
        options: ["0-10V", "4-20mA", "0-5V", "RS232"],
        correctIndex: 1,
        explanation: "Le signal 4-20mA est privilegie car il est immunise au bruit et permet de detecter une coupure de fil (0mA).",
        order: 1
      },
      {
        question: "Pourquoi le signal 4-20mA commence-t-il a 4mA et non a 0mA ?",
        options: ["Pour economiser de l'energie", "Pour detecter une coupure de fil (0mA = defaut)", "C'est une norme historique", "Pour la compatibilite"],
        correctIndex: 1,
        explanation: "4mA minimum indique que le capteur est alimente. 0mA signifie un defaut (fil coupe).",
        order: 2
      },
      {
        question: "Qu'est-ce qu'une PT100 ?",
        options: ["Un capteur de pression", "Une sonde de temperature a resistance de platine", "Un capteur optique", "Un variateur de vitesse"],
        correctIndex: 1,
        explanation: "PT100 est une sonde de temperature a resistance de platine (100 Ohm a 0C).",
        order: 3
      },
      {
        question: "Que signifie une resolution de 12 bits pour un convertisseur analogique ?",
        options: ["12 entrees analogiques", "4096 niveaux de mesure possibles", "12 sorties", "12 volts maximum"],
        correctIndex: 1,
        explanation: "12 bits = 2^12 = 4096 niveaux, donc une resolution de 1/4096 de la plage.",
        order: 4
      },
      {
        question: "Quel type de capteur mesure un debit par effet electromagnetique ?",
        options: ["Debitmetre Coriolis", "Debitmetre electromagnetique", "Debitmetre vortex", "Debitmetre a ultrasons"],
        correctIndex: 1,
        explanation: "Le debitmetre electromagnetique mesure le debit des liquides conducteurs par induction.",
        order: 5
      }
    ],
    // Lesson 3: PNP vs NPN (5 questions)
    [
      {
        question: "Quelle technologie est majoritaire en Europe ?",
        options: ["NPN", "PNP", "Les deux egalement", "Aucune"],
        correctIndex: 1,
        explanation: "En Europe, le standard est PNP (sourcing). NPN est plus courant au Japon.",
        order: 1
      },
      {
        question: "Dans un capteur PNP, quel signal est fourni quand le capteur est actif ?",
        options: ["0V", "+24V", "Un signal alternatif", "Aucun signal"],
        correctIndex: 1,
        explanation: "PNP 'fournit' du +24V a l'entree quand il est actif (sourcing = source de courant).",
        order: 2
      },
      {
        question: "Dans un capteur NPN, le signal actif correspond a ?",
        options: ["+24V", "0V (relie a la masse)", "12V", "Signal flottant"],
        correctIndex: 1,
        explanation: "NPN 'tire' l'entree vers 0V quand il est actif (sinking = puits de courant).",
        order: 3
      },
      {
        question: "Peut-on melanger des capteurs PNP et NPN sur le meme automate ?",
        options: ["Oui, sans probleme", "Non, jamais", "Oui, si l'automate le permet", "Seulement avec un adaptateur"],
        correctIndex: 2,
        explanation: "Certains automates ont des entrees universelles, sinon il faut verifier la compatibilite.",
        order: 4
      },
      {
        question: "Quel fil est commun dans un cablage PNP 3 fils ?",
        options: ["+24V et signal sur le meme fil", "0V et signal sur le meme fil", "+24V seul", "Aucun"],
        correctIndex: 2,
        explanation: "En PNP 3 fils : +24V, 0V et signal. Le +24V alimente le capteur et est la source du signal.",
        order: 5
      }
    ],
    // Lesson 4: Les actionneurs electriques (5 questions)
    [
      {
        question: "Quel est le moteur le plus repandu en industrie ?",
        options: ["Moteur a courant continu", "Moteur asynchrone triphase", "Moteur brushless", "Moteur pas a pas"],
        correctIndex: 1,
        explanation: "Le moteur asynchrone triphase est le plus repandu : simple, robuste et economique.",
        order: 1
      },
      {
        question: "Quelle est la fonction d'un contacteur ?",
        options: ["Varier la vitesse", "Commander le moteur en TOR (marche/arret)", "Proteger contre les surcharges", "Mesurer le courant"],
        correctIndex: 1,
        explanation: "Le contacteur est un interrupteur de puissance commande electriquement pour la commutation TOR.",
        order: 2
      },
      {
        question: "Quelle est la fonction du relais thermique ?",
        options: ["Commander le moteur", "Varier la vitesse", "Proteger contre les surcharges", "Mesurer la temperature ambiante"],
        correctIndex: 2,
        explanation: "Le relais thermique protege le moteur contre les surcharges en detectant l'echauffement.",
        order: 3
      },
      {
        question: "Qu'est-ce qu'un variateur de vitesse ?",
        options: ["Un capteur de vitesse", "Un equipement qui controle la vitesse et le couple du moteur", "Un type de moteur", "Un fusible special"],
        correctIndex: 1,
        explanation: "Le variateur de vitesse (VFD) permet de controler la vitesse et le couple d'un moteur.",
        order: 4
      },
      {
        question: "Quel equipement permet un positionnement precis ?",
        options: ["Moteur asynchrone seul", "Contacteur", "Servomoteur", "Disjoncteur"],
        correctIndex: 2,
        explanation: "Le servomoteur avec son encodeur permet un positionnement precis et un controle de trajectoire.",
        order: 5
      }
    ],
    // Lesson 5: Les actionneurs pneumatiques (5 questions)
    [
      {
        question: "Quelle pression est standard en pneumatique industrielle ?",
        options: ["1 bar", "6 bar", "20 bar", "100 bar"],
        correctIndex: 1,
        explanation: "6 bar (600 kPa) est la pression standard en pneumatique industrielle.",
        order: 1
      },
      {
        question: "Quelle est la difference entre un verin simple effet et double effet ?",
        options: ["Le simple effet est plus rapide", "Le double effet a deux sens motorises", "Le simple effet est plus puissant", "Il n'y a pas de difference"],
        correctIndex: 1,
        explanation: "Simple effet : un sens motorise, retour par ressort. Double effet : deux sens motorises par air.",
        order: 2
      },
      {
        question: "Que signifie la notation 5/2 pour un distributeur ?",
        options: ["5 volts, 2 amperes", "5 orifices, 2 positions", "5 bar, 2 litres", "5 entrees, 2 sorties"],
        correctIndex: 1,
        explanation: "5/2 signifie 5 orifices et 2 positions. C'est le distributeur standard pour verin double effet.",
        order: 3
      },
      {
        question: "Quel distributeur utilise-t-on pour un verin simple effet ?",
        options: ["5/2", "3/2", "5/3", "4/2"],
        correctIndex: 1,
        explanation: "Un distributeur 3/2 (3 orifices, 2 positions) suffit pour un verin simple effet.",
        order: 4
      },
      {
        question: "Qu'est-ce qu'un distributeur 5/3 permet de faire ?",
        options: ["Commander 3 verins", "Avoir une position intermediaire (arret en position)", "Augmenter la pression", "Reduire le debit"],
        correctIndex: 1,
        explanation: "5/3 a une 3eme position centrale permettant d'arreter le verin en position intermediaire.",
        order: 5
      }
    ],
    // Lesson 6: Cablage et mise en service (5 questions)
    [
      {
        question: "Pourquoi separe-t-on les circuits de puissance et de commande ?",
        options: ["Pour economiser des cables", "Pour eviter les interferences electromagnetiques", "C'est une preference esthetique", "Pour utiliser moins de goulottes"],
        correctIndex: 1,
        explanation: "La separation evite que les signaux de puissance perturbent les signaux de commande (CEM).",
        order: 1
      },
      {
        question: "Quelle couleur de fil est utilisee pour le neutre ?",
        options: ["Noir", "Bleu", "Rouge", "Vert-jaune"],
        correctIndex: 1,
        explanation: "Le bleu est la couleur normalisee pour le neutre en installation electrique.",
        order: 2
      },
      {
        question: "Quelle couleur est reservee a la terre (PE) ?",
        options: ["Bleu", "Rouge", "Vert-jaune", "Noir"],
        correctIndex: 2,
        explanation: "Le vert-jaune est exclusivement reserve au conducteur de protection (terre).",
        order: 3
      },
      {
        question: "Que doit-on toujours faire avant d'intervenir sur le cablage ?",
        options: ["Prendre une photo", "Couper l'alimentation et consigner", "Appeler un collegue", "Verifier la meteo"],
        correctIndex: 1,
        explanation: "Couper l'alimentation et consigner (cadenasser) est obligatoire pour la securite.",
        order: 4
      },
      {
        question: "Pourquoi utilise-t-on des cables blindes pour les signaux analogiques ?",
        options: ["Pour resister a la chaleur", "Pour proteger contre les interferences electromagnetiques", "Pour la flexibilite", "Pour la couleur"],
        correctIndex: 1,
        explanation: "Le blindage protege les signaux analogiques sensibles contre les perturbations electromagnetiques.",
        order: 5
      }
    ]
  ],

  // Quiz translations
  quizTranslations: {
    en: {
      // Lesson 1 quizzes
      "Quel type de capteur detecte uniquement les metaux ?": {
        question: "What type of sensor detects only metals?",
        options: ["Capacitive", "Inductive", "Optical", "Mechanical"],
        explanation: "The inductive sensor uses a magnetic field and only detects metallic materials."
      },
      "Quel capteur peut detecter tous les types de materiaux ?": {
        question: "Which sensor can detect all types of materials?",
        options: ["Inductive", "Capacitive", "Magnetic", "None"],
        explanation: "The capacitive sensor can detect any type of material (metal, plastic, wood, liquid, etc.)."
      },
      "Qu'est-ce qu'un fin de course ?": {
        question: "What is a limit switch?",
        options: ["A temperature sensor", "A mechanical sensor that detects an extreme position", "A pressure sensor", "A speed sensor"],
        explanation: "A limit switch is a mechanical sensor triggered when a moving element reaches a limit position."
      },
      "Que signifie IP67 pour un capteur ?": {
        question: "What does IP67 mean for a sensor?",
        options: ["Its switching speed", "Its protection rating (dust-tight and immersion)", "Its detection range", "Its output type"],
        explanation: "IP67 indicates protection against dust (6) and temporary immersion in water (7)."
      },
      "Quelle est la caracteristique principale d'un capteur optique ?": {
        question: "What is the main characteristic of an optical sensor?",
        options: ["It uses a magnetic field", "It uses a light beam", "It requires physical contact", "It measures temperature"],
        explanation: "An optical sensor uses a light beam (infrared, laser, etc.) to detect the presence of an object."
      },
      // Lesson 2 quizzes
      "Quel signal est privilegie en industrie pour les longues distances ?": {
        question: "Which signal is preferred in industry for long distances?",
        options: ["0-10V", "4-20mA", "0-5V", "RS232"],
        explanation: "The 4-20mA signal is preferred because it is immune to noise and can detect wire breaks (0mA)."
      },
      "Pourquoi le signal 4-20mA commence-t-il a 4mA et non a 0mA ?": {
        question: "Why does the 4-20mA signal start at 4mA and not at 0mA?",
        options: ["To save energy", "To detect a wire break (0mA = fault)", "It's a historical standard", "For compatibility"],
        explanation: "4mA minimum indicates the sensor is powered. 0mA means a fault (broken wire)."
      },
      "Qu'est-ce qu'une PT100 ?": {
        question: "What is a PT100?",
        options: ["A pressure sensor", "A platinum resistance temperature probe", "An optical sensor", "A variable speed drive"],
        explanation: "PT100 is a platinum resistance temperature probe (100 Ohm at 0C)."
      },
      "Que signifie une resolution de 12 bits pour un convertisseur analogique ?": {
        question: "What does 12-bit resolution mean for an analog converter?",
        options: ["12 analog inputs", "4096 possible measurement levels", "12 outputs", "12 volts maximum"],
        explanation: "12 bits = 2^12 = 4096 levels, so a resolution of 1/4096 of the range."
      },
      "Quel type de capteur mesure un debit par effet electromagnetique ?": {
        question: "What type of sensor measures flow by electromagnetic effect?",
        options: ["Coriolis flowmeter", "Electromagnetic flowmeter", "Vortex flowmeter", "Ultrasonic flowmeter"],
        explanation: "The electromagnetic flowmeter measures the flow of conductive liquids by induction."
      },
      // Lesson 3 quizzes
      "Quelle technologie est majoritaire en Europe ?": {
        question: "Which technology is predominant in Europe?",
        options: ["NPN", "PNP", "Both equally", "None"],
        explanation: "In Europe, PNP (sourcing) is the standard. NPN is more common in Japan."
      },
      "Dans un capteur PNP, quel signal est fourni quand le capteur est actif ?": {
        question: "In a PNP sensor, what signal is provided when the sensor is active?",
        options: ["0V", "+24V", "An alternating signal", "No signal"],
        explanation: "PNP 'provides' +24V to the input when active (sourcing = current source)."
      },
      "Dans un capteur NPN, le signal actif correspond a ?": {
        question: "In an NPN sensor, the active signal corresponds to?",
        options: ["+24V", "0V (connected to ground)", "12V", "Floating signal"],
        explanation: "NPN 'pulls' the input to 0V when active (sinking = current sink)."
      },
      "Peut-on melanger des capteurs PNP et NPN sur le meme automate ?": {
        question: "Can you mix PNP and NPN sensors on the same PLC?",
        options: ["Yes, no problem", "No, never", "Yes, if the PLC allows it", "Only with an adapter"],
        explanation: "Some PLCs have universal inputs, otherwise you must check compatibility."
      },
      "Quel fil est commun dans un cablage PNP 3 fils ?": {
        question: "Which wire is common in a 3-wire PNP wiring?",
        options: ["+24V and signal on the same wire", "0V and signal on the same wire", "+24V alone", "None"],
        explanation: "In 3-wire PNP: +24V, 0V and signal. The +24V powers the sensor and is the signal source."
      },
      // Lesson 4 quizzes
      "Quel est le moteur le plus repandu en industrie ?": {
        question: "What is the most common motor in industry?",
        options: ["DC motor", "Three-phase asynchronous motor", "Brushless motor", "Stepper motor"],
        explanation: "The three-phase asynchronous motor is the most common: simple, robust and economical."
      },
      "Quelle est la fonction d'un contacteur ?": {
        question: "What is the function of a contactor?",
        options: ["Vary speed", "Switch the motor on/off", "Protect against overloads", "Measure current"],
        explanation: "The contactor is an electrically controlled power switch for on/off switching."
      },
      "Quelle est la fonction du relais thermique ?": {
        question: "What is the function of the thermal relay?",
        options: ["Control the motor", "Vary speed", "Protect against overloads", "Measure ambient temperature"],
        explanation: "The thermal relay protects the motor against overloads by detecting overheating."
      },
      "Qu'est-ce qu'un variateur de vitesse ?": {
        question: "What is a variable frequency drive?",
        options: ["A speed sensor", "Equipment that controls motor speed and torque", "A type of motor", "A special fuse"],
        explanation: "The variable frequency drive (VFD) allows control of motor speed and torque."
      },
      "Quel equipement permet un positionnement precis ?": {
        question: "Which equipment allows precise positioning?",
        options: ["Asynchronous motor alone", "Contactor", "Servo motor", "Circuit breaker"],
        explanation: "The servo motor with its encoder allows precise positioning and trajectory control."
      },
      // Lesson 5 quizzes
      "Quelle pression est standard en pneumatique industrielle ?": {
        question: "What pressure is standard in industrial pneumatics?",
        options: ["1 bar", "6 bar", "20 bar", "100 bar"],
        explanation: "6 bar (600 kPa) is the standard pressure in industrial pneumatics."
      },
      "Quelle est la difference entre un verin simple effet et double effet ?": {
        question: "What is the difference between a single-acting and double-acting cylinder?",
        options: ["Single-acting is faster", "Double-acting has two motorized directions", "Single-acting is more powerful", "There is no difference"],
        explanation: "Single-acting: one motorized direction, spring return. Double-acting: both directions motorized by air."
      },
      "Que signifie la notation 5/2 pour un distributeur ?": {
        question: "What does the 5/2 notation mean for a valve?",
        options: ["5 volts, 2 amps", "5 ports, 2 positions", "5 bar, 2 liters", "5 inputs, 2 outputs"],
        explanation: "5/2 means 5 ports and 2 positions. It's the standard valve for double-acting cylinders."
      },
      "Quel distributeur utilise-t-on pour un verin simple effet ?": {
        question: "Which valve is used for a single-acting cylinder?",
        options: ["5/2", "3/2", "5/3", "4/2"],
        explanation: "A 3/2 valve (3 ports, 2 positions) is sufficient for a single-acting cylinder."
      },
      "Qu'est-ce qu'un distributeur 5/3 permet de faire ?": {
        question: "What does a 5/3 valve allow?",
        options: ["Control 3 cylinders", "Have an intermediate position (stop in position)", "Increase pressure", "Reduce flow"],
        explanation: "5/3 has a 3rd central position allowing the cylinder to stop in an intermediate position."
      },
      // Lesson 6 quizzes
      "Pourquoi separe-t-on les circuits de puissance et de commande ?": {
        question: "Why are power and control circuits separated?",
        options: ["To save cables", "To avoid electromagnetic interference", "It's an aesthetic preference", "To use fewer ducts"],
        explanation: "Separation prevents power signals from disturbing control signals (EMC)."
      },
      "Quelle couleur de fil est utilisee pour le neutre ?": {
        question: "What wire color is used for neutral?",
        options: ["Black", "Blue", "Red", "Green-yellow"],
        explanation: "Blue is the standardized color for neutral in electrical installations."
      },
      "Quelle couleur est reservee a la terre (PE) ?": {
        question: "What color is reserved for ground (PE)?",
        options: ["Blue", "Red", "Green-yellow", "Black"],
        explanation: "Green-yellow is exclusively reserved for the protective conductor (ground)."
      },
      "Que doit-on toujours faire avant d'intervenir sur le cablage ?": {
        question: "What must always be done before working on wiring?",
        options: ["Take a photo", "Disconnect power and lock out", "Call a colleague", "Check the weather"],
        explanation: "Disconnecting power and locking out (LOTO) is mandatory for safety."
      },
      "Pourquoi utilise-t-on des cables blindes pour les signaux analogiques ?": {
        question: "Why are shielded cables used for analog signals?",
        options: ["To resist heat", "To protect against electromagnetic interference", "For flexibility", "For color"],
        explanation: "Shielding protects sensitive analog signals from electromagnetic interference."
      }
    },
    es: {
      // Lesson 1 quizzes
      "Quel type de capteur detecte uniquement les metaux ?": {
        question: "Que tipo de sensor detecta solo metales?",
        options: ["Capacitivo", "Inductivo", "Optico", "Mecanico"],
        explanation: "El sensor inductivo utiliza un campo magnetico y solo detecta materiales metalicos."
      },
      "Quel capteur peut detecter tous les types de materiaux ?": {
        question: "Que sensor puede detectar todos los tipos de materiales?",
        options: ["Inductivo", "Capacitivo", "Magnetico", "Ninguno"],
        explanation: "El sensor capacitivo puede detectar cualquier tipo de material (metal, plastico, madera, liquido, etc.)."
      },
      "Qu'est-ce qu'un fin de course ?": {
        question: "Que es un final de carrera?",
        options: ["Un sensor de temperatura", "Un sensor mecanico que detecta una posicion extrema", "Un sensor de presion", "Un sensor de velocidad"],
        explanation: "Un final de carrera es un sensor mecanico que se activa cuando un elemento movil alcanza una posicion limite."
      },
      "Que signifie IP67 pour un capteur ?": {
        question: "Que significa IP67 para un sensor?",
        options: ["Su velocidad de conmutacion", "Su grado de proteccion (estanco al polvo e inmersion)", "Su alcance de deteccion", "Su tipo de salida"],
        explanation: "IP67 indica proteccion contra el polvo (6) y la inmersion temporal en agua (7)."
      },
      "Quelle est la caracteristique principale d'un capteur optique ?": {
        question: "Cual es la caracteristica principal de un sensor optico?",
        options: ["Utiliza un campo magnetico", "Utiliza un haz de luz", "Requiere contacto fisico", "Mide la temperatura"],
        explanation: "Un sensor optico utiliza un haz de luz (infrarrojo, laser, etc.) para detectar la presencia de un objeto."
      },
      // Lesson 2 quizzes
      "Quel signal est privilegie en industrie pour les longues distances ?": {
        question: "Que senal se prefiere en la industria para largas distancias?",
        options: ["0-10V", "4-20mA", "0-5V", "RS232"],
        explanation: "La senal 4-20mA es preferida porque es inmune al ruido y permite detectar cortes de cable (0mA)."
      },
      "Pourquoi le signal 4-20mA commence-t-il a 4mA et non a 0mA ?": {
        question: "Por que la senal 4-20mA comienza en 4mA y no en 0mA?",
        options: ["Para ahorrar energia", "Para detectar un corte de cable (0mA = fallo)", "Es un estandar historico", "Por compatibilidad"],
        explanation: "4mA minimo indica que el sensor esta alimentado. 0mA significa un fallo (cable cortado)."
      },
      "Qu'est-ce qu'une PT100 ?": {
        question: "Que es una PT100?",
        options: ["Un sensor de presion", "Una sonda de temperatura de resistencia de platino", "Un sensor optico", "Un variador de velocidad"],
        explanation: "PT100 es una sonda de temperatura de resistencia de platino (100 Ohm a 0C)."
      },
      "Que signifie une resolution de 12 bits pour un convertisseur analogique ?": {
        question: "Que significa una resolucion de 12 bits para un convertidor analogico?",
        options: ["12 entradas analogicas", "4096 niveles de medicion posibles", "12 salidas", "12 voltios maximo"],
        explanation: "12 bits = 2^12 = 4096 niveles, por lo tanto una resolucion de 1/4096 del rango."
      },
      "Quel type de capteur mesure un debit par effet electromagnetique ?": {
        question: "Que tipo de sensor mide el caudal por efecto electromagnetico?",
        options: ["Caudalimetro Coriolis", "Caudalimetro electromagnetico", "Caudalimetro vortex", "Caudalimetro ultrasonico"],
        explanation: "El caudalimetro electromagnetico mide el caudal de liquidos conductores por induccion."
      },
      // Lesson 3 quizzes
      "Quelle technologie est majoritaire en Europe ?": {
        question: "Que tecnologia es predominante en Europa?",
        options: ["NPN", "PNP", "Ambas por igual", "Ninguna"],
        explanation: "En Europa, el estandar es PNP (sourcing). NPN es mas comun en Japon."
      },
      "Dans un capteur PNP, quel signal est fourni quand le capteur est actif ?": {
        question: "En un sensor PNP, que senal se proporciona cuando el sensor esta activo?",
        options: ["0V", "+24V", "Una senal alterna", "Ninguna senal"],
        explanation: "PNP 'proporciona' +24V a la entrada cuando esta activo (sourcing = fuente de corriente)."
      },
      "Dans un capteur NPN, le signal actif correspond a ?": {
        question: "En un sensor NPN, la senal activa corresponde a?",
        options: ["+24V", "0V (conectado a masa)", "12V", "Senal flotante"],
        explanation: "NPN 'tira' la entrada a 0V cuando esta activo (sinking = sumidero de corriente)."
      },
      "Peut-on melanger des capteurs PNP et NPN sur le meme automate ?": {
        question: "Se pueden mezclar sensores PNP y NPN en el mismo PLC?",
        options: ["Si, sin problema", "No, nunca", "Si, si el PLC lo permite", "Solo con un adaptador"],
        explanation: "Algunos PLCs tienen entradas universales, de lo contrario hay que verificar la compatibilidad."
      },
      "Quel fil est commun dans un cablage PNP 3 fils ?": {
        question: "Cual cable es comun en un cableado PNP de 3 hilos?",
        options: ["+24V y senal en el mismo cable", "0V y senal en el mismo cable", "+24V solo", "Ninguno"],
        explanation: "En PNP de 3 hilos: +24V, 0V y senal. El +24V alimenta el sensor y es la fuente de la senal."
      },
      // Lesson 4 quizzes
      "Quel est le moteur le plus repandu en industrie ?": {
        question: "Cual es el motor mas comun en la industria?",
        options: ["Motor de corriente continua", "Motor asincrono trifasico", "Motor brushless", "Motor paso a paso"],
        explanation: "El motor asincrono trifasico es el mas comun: simple, robusto y economico."
      },
      "Quelle est la fonction d'un contacteur ?": {
        question: "Cual es la funcion de un contactor?",
        options: ["Variar la velocidad", "Conmutar el motor on/off", "Proteger contra sobrecargas", "Medir la corriente"],
        explanation: "El contactor es un interruptor de potencia controlado electricamente para conmutacion on/off."
      },
      "Quelle est la fonction du relais thermique ?": {
        question: "Cual es la funcion del rele termico?",
        options: ["Controlar el motor", "Variar la velocidad", "Proteger contra sobrecargas", "Medir la temperatura ambiente"],
        explanation: "El rele termico protege el motor contra sobrecargas detectando el sobrecalentamiento."
      },
      "Qu'est-ce qu'un variateur de vitesse ?": {
        question: "Que es un variador de frecuencia?",
        options: ["Un sensor de velocidad", "Un equipo que controla la velocidad y el par del motor", "Un tipo de motor", "Un fusible especial"],
        explanation: "El variador de frecuencia (VFD) permite controlar la velocidad y el par de un motor."
      },
      "Quel equipement permet un positionnement precis ?": {
        question: "Que equipo permite un posicionamiento preciso?",
        options: ["Motor asincrono solo", "Contactor", "Servomotor", "Disyuntor"],
        explanation: "El servomotor con su encoder permite un posicionamiento preciso y control de trayectoria."
      },
      // Lesson 5 quizzes
      "Quelle pression est standard en pneumatique industrielle ?": {
        question: "Que presion es estandar en neumatica industrial?",
        options: ["1 bar", "6 bar", "20 bar", "100 bar"],
        explanation: "6 bar (600 kPa) es la presion estandar en neumatica industrial."
      },
      "Quelle est la difference entre un verin simple effet et double effet ?": {
        question: "Cual es la diferencia entre un cilindro simple efecto y doble efecto?",
        options: ["El simple efecto es mas rapido", "El doble efecto tiene dos direcciones motorizadas", "El simple efecto es mas potente", "No hay diferencia"],
        explanation: "Simple efecto: una direccion motorizada, retorno por resorte. Doble efecto: ambas direcciones motorizadas por aire."
      },
      "Que signifie la notation 5/2 pour un distributeur ?": {
        question: "Que significa la notacion 5/2 para una valvula?",
        options: ["5 voltios, 2 amperios", "5 puertos, 2 posiciones", "5 bar, 2 litros", "5 entradas, 2 salidas"],
        explanation: "5/2 significa 5 puertos y 2 posiciones. Es la valvula estandar para cilindros de doble efecto."
      },
      "Quel distributeur utilise-t-on pour un verin simple effet ?": {
        question: "Que valvula se usa para un cilindro de simple efecto?",
        options: ["5/2", "3/2", "5/3", "4/2"],
        explanation: "Una valvula 3/2 (3 puertos, 2 posiciones) es suficiente para un cilindro de simple efecto."
      },
      "Qu'est-ce qu'un distributeur 5/3 permet de faire ?": {
        question: "Que permite hacer una valvula 5/3?",
        options: ["Controlar 3 cilindros", "Tener una posicion intermedia (parada en posicion)", "Aumentar la presion", "Reducir el caudal"],
        explanation: "5/3 tiene una 3ra posicion central que permite detener el cilindro en una posicion intermedia."
      },
      // Lesson 6 quizzes
      "Pourquoi separe-t-on les circuits de puissance et de commande ?": {
        question: "Por que se separan los circuitos de potencia y control?",
        options: ["Para ahorrar cables", "Para evitar interferencias electromagneticas", "Es una preferencia estetica", "Para usar menos canaletas"],
        explanation: "La separacion evita que las senales de potencia perturben las senales de control (CEM)."
      },
      "Quelle couleur de fil est utilisee pour le neutre ?": {
        question: "Que color de cable se usa para el neutro?",
        options: ["Negro", "Azul", "Rojo", "Verde-amarillo"],
        explanation: "El azul es el color normalizado para el neutro en instalaciones electricas."
      },
      "Quelle couleur est reservee a la terre (PE) ?": {
        question: "Que color esta reservado para la tierra (PE)?",
        options: ["Azul", "Rojo", "Verde-amarillo", "Negro"],
        explanation: "El verde-amarillo esta reservado exclusivamente para el conductor de proteccion (tierra)."
      },
      "Que doit-on toujours faire avant d'intervenir sur le cablage ?": {
        question: "Que se debe hacer siempre antes de trabajar en el cableado?",
        options: ["Tomar una foto", "Desconectar la alimentacion y bloquear", "Llamar a un colega", "Verificar el clima"],
        explanation: "Desconectar la alimentacion y bloquear (LOTO) es obligatorio para la seguridad."
      },
      "Pourquoi utilise-t-on des cables blindes pour les signaux analogiques ?": {
        question: "Por que se usan cables blindados para senales analogicas?",
        options: ["Para resistir el calor", "Para proteger contra interferencias electromagneticas", "Por flexibilidad", "Por el color"],
        explanation: "El blindaje protege las senales analogicas sensibles contra las perturbaciones electromagneticas."
      }
    }
  }
}
