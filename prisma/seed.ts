import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { lessonTranslations, quizTranslations, cncLessonTranslations, cncQuizTranslations, siemensLessonTranslations, siemensQuizTranslations } from './translations.js'

const prisma = new PrismaClient()
// Module translations for English and Spanish
const moduleTranslations = {
  en: [
    { order: 1, title: "Introduction to Automation", description: "Discover the basics of industrial automation and programmable logic controllers" },
    { order: 2, title: "Combinational Logic", description: "Master AND, OR, NOT logic gates and their applications" },
    { order: 3, title: "LADDER Language", description: "Learn to program in LADDER language (contact diagram)" },
    { order: 4, title: "Sensors and Actuators", description: "Understand sensors, actuators and their interfacing" },
    { order: 5, title: "Grafcet", description: "Model sequential systems with GRAFCET" },
    { order: 6, title: "Introduction to CNC", description: "Discover the basics of CNC machines and their operation" },
    { order: 7, title: "G-Code Programming", description: "Learn to program CNC machines with G-Code" },
    { order: 8, title: "Axes and Interpolation", description: "Master coordinate systems and tool movements" },
    { order: 9, title: "Introduction to Siemens S7-1500", description: "Discover the S7-1500 PLC and TIA Portal environment" },
    { order: 10, title: "TIA Portal Programming", description: "Learn to create projects and program with TIA Portal" },
    { order: 11, title: "S7-1500 Data Blocks", description: "Master data blocks (DB) and structured programming" }
  ],
  es: [
    { order: 1, title: "Introducción a la Automatización", description: "Descubra los fundamentos de la automatización industrial y los controladores lógicos programables" },
    { order: 2, title: "Lógica Combinacional", description: "Domine las puertas lógicas AND, OR, NOT y sus aplicaciones" },
    { order: 3, title: "Lenguaje LADDER", description: "Aprenda a programar en lenguaje LADDER (diagrama de contactos)" },
    { order: 4, title: "Sensores y Actuadores", description: "Comprenda los sensores, actuadores y su interfaz" },
    { order: 5, title: "Grafcet", description: "Modele sistemas secuenciales con GRAFCET" },
    { order: 6, title: "Introducción a CNC", description: "Descubra los fundamentos de las máquinas CNC y su funcionamiento" },
    { order: 7, title: "Programación G-Code", description: "Aprenda a programar máquinas CNC con código G" },
    { order: 8, title: "Ejes e Interpolación", description: "Domine los sistemas de coordenadas y movimientos de herramienta" },
    { order: 9, title: "Introducción a Siemens S7-1500", description: "Descubra el PLC S7-1500 y el entorno TIA Portal" },
    { order: 10, title: "Programación con TIA Portal", description: "Aprenda a crear proyectos y programar con TIA Portal" },
    { order: 11, title: "Bloques de Datos S7-1500", description: "Domine los bloques de datos (DB) y la programación estructurada" }
  ]
} as const

// Cursus translations
const cursusTranslations = {
  en: [
    { order: 1, title: "Industrial Automation", description: "Complete learning path for industrial automation and PLC programming" },
    { order: 2, title: "CNC Machining", description: "Learn to program and operate CNC machines" },
    { order: 3, title: "Siemens Automation", description: "Specialized path for Siemens S7-1500 PLCs and TIA Portal" }
  ],
  es: [
    { order: 1, title: "Automatización Industrial", description: "Ruta de aprendizaje completa para automatización industrial y programación de PLCs" },
    { order: 2, title: "Mecanizado CNC", description: "Aprenda a programar y operar máquinas CNC" },
    { order: 3, title: "Automatización Siemens", description: "Ruta especializada para PLCs Siemens S7-1500 y TIA Portal" }
  ]
}

const rewardTranslations: Record<string, Record<string, { name: string; description: string }>> = {
  en: {
    "Premier pas": { name: "First Step", description: "Complete your first lesson" },
    "Étudiant assidu": { name: "Dedicated Student", description: "Complete 5 lessons" },
    "Expert en herbe": { name: "Budding Expert", description: "Complete 10 lessons" },
    "Sans faute !": { name: "Perfect Score!", description: "Get 100% on a quiz" },
    "Série de 3": { name: "3-Day Streak", description: "Log in 3 consecutive days" },
    "Série de 7": { name: "7-Day Streak", description: "Log in 7 consecutive days" },
    "Maître logicien": { name: "Logic Master", description: "Complete the Combinational Logic module" },
    "Pro du LADDER": { name: "LADDER Pro", description: "Complete the LADDER module" },
    "Niveau 5": { name: "Level 5", description: "Reach level 5" },
    "Niveau 10": { name: "Level 10", description: "Reach level 10" }
  },
  es: {
    "Premier pas": { name: "Primer Paso", description: "Completar tu primera lección" },
    "Étudiant assidu": { name: "Estudiante Dedicado", description: "Completar 5 lecciones" },
    "Expert en herbe": { name: "Experto en Ciernes", description: "Completar 10 lecciones" },
    "Sans faute !": { name: "¡Puntuación Perfecta!", description: "Obtener 100% en un quiz" },
    "Série de 3": { name: "Racha de 3 Días", description: "Conectarse 3 días consecutivos" },
    "Série de 7": { name: "Racha de 7 Días", description: "Conectarse 7 días consecutivos" },
    "Maître logicien": { name: "Maestro de la Lógica", description: "Completar el módulo de Lógica Combinacional" },
    "Pro du LADDER": { name: "Profesional LADDER", description: "Completar el módulo LADDER" },
    "Niveau 5": { name: "Nivel 5", description: "Alcanzar el nivel 5" },
    "Niveau 10": { name: "Nivel 10", description: "Alcanzar el nivel 10" }
  }
}



async function main() {
  // Clear existing data
  await prisma.cursusTranslation.deleteMany()
  await prisma.cursusModule.deleteMany()
  await prisma.cursus.deleteMany()
  await prisma.quizTranslation.deleteMany()
  await prisma.rewardTranslation.deleteMany()
  await prisma.lessonTranslation.deleteMany()
  await prisma.moduleTranslation.deleteMany()
  await prisma.quizAttempt.deleteMany()
  await prisma.userReward.deleteMany()
  await prisma.lessonProgress.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.reward.deleteMany()
  await prisma.user.deleteMany()

  // Create Modules
  const module1 = await prisma.module.create({
    data: {
      title: "Introduction à l'automatisme",
      description: "Découvrez les bases de l'automatisme industriel et les automates programmables",
      order: 1,
      icon: "🔌",
      color: "#3b82f6",
      isLocked: false,
      requiredXp: 0,
    },
  })

  const module2 = await prisma.module.create({
    data: {
      title: "Logique combinatoire",
      description: "Maîtrisez les portes logiques ET, OU, NON et leurs applications",
      order: 2,
      icon: "🔀",
      color: "#22c55e",
      isLocked: true,
      requiredXp: 200,
    },
  })

  const module3 = await prisma.module.create({
    data: {
      title: "Le langage LADDER",
      description: "Apprenez à programmer en langage LADDER (schéma à contacts)",
      order: 3,
      icon: "🪜",
      color: "#f59e0b",
      isLocked: true,
      requiredXp: 500,
    },
  })

  const module4 = await prisma.module.create({
    data: {
      title: "Capteurs et actionneurs",
      description: "Comprenez les capteurs, actionneurs et leur interfaçage",
      order: 4,
      icon: "📡",
      color: "#ef4444",
      isLocked: true,
      requiredXp: 900,
    },
  })

  const module5 = await prisma.module.create({
    data: {
      title: "Grafcet",
      description: "Modélisez des systèmes séquentiels avec le GRAFCET",
      order: 5,
      icon: "📊",
      color: "#8b5cf6",
      isLocked: true,
      requiredXp: 1400,
    },
  })

  // Create CNC Modules
  const module6 = await prisma.module.create({
    data: {
      title: "Introduction à la CNC",
      description: "Découvrez les bases des machines à commande numérique",
      order: 6,
      icon: "⚙️",
      color: "#06b6d4",
      isLocked: false,
      requiredXp: 0,
    },
  })

  const module7 = await prisma.module.create({
    data: {
      title: "Programmation G-Code",
      description: "Apprenez à programmer les machines CNC avec le G-Code",
      order: 7,
      icon: "📝",
      color: "#ec4899",
      isLocked: true,
      requiredXp: 300,
    },
  })

  const module8 = await prisma.module.create({
    data: {
      title: "Axes et interpolation",
      description: "Maîtrisez les systèmes de coordonnées et les mouvements d'outil",
      order: 8,
      icon: "📐",
      color: "#14b8a6",
      isLocked: true,
      requiredXp: 600,
    },
  })

  // Create Siemens Modules
  const module9 = await prisma.module.create({
    data: {
      title: "Introduction au Siemens S7-1500",
      description: "Découvrez l'automate S7-1500 et l'environnement TIA Portal",
      order: 9,
      icon: "🔷",
      color: "#009999",
      isLocked: false,
      requiredXp: 0,
    },
  })

  const module10 = await prisma.module.create({
    data: {
      title: "Programmation TIA Portal",
      description: "Apprenez à créer des projets et programmer avec TIA Portal",
      order: 10,
      icon: "💻",
      color: "#00cccc",
      isLocked: true,
      requiredXp: 300,
    },
  })

  const module11 = await prisma.module.create({
    data: {
      title: "Blocs de données S7-1500",
      description: "Maîtrisez les blocs de données (DB) et la programmation structurée",
      order: 11,
      icon: "📦",
      color: "#00aaaa",
      isLocked: true,
      requiredXp: 600,
    },
  })

  // Create Cursus
  const cursusAutomatisme = await prisma.cursus.create({
    data: {
      title: "Automatisme industriel",
      description: "Parcours complet pour maîtriser l'automatisation industrielle et la programmation d'automates",
      icon: "🏭",
      color: "#3b82f6",
      order: 1,
    },
  })

  const cursusCNC = await prisma.cursus.create({
    data: {
      title: "Commande numérique (CNC)",
      description: "Apprenez à programmer et piloter les machines à commande numérique",
      icon: "⚙️",
      color: "#06b6d4",
      order: 2,
    },
  })

  const cursusSiemens = await prisma.cursus.create({
    data: {
      title: "Automatisme SIEMENS",
      description: "Parcours spécialisé pour les automates Siemens S7-1500 et TIA Portal",
      icon: "🔷",
      color: "#009999",
      order: 3,
    },
  })

  // Create Cursus Translations
  for (const lang of ['en', 'es'] as const) {
    const cursusAutoTrans = cursusTranslations[lang].find(t => t.order === 1)
    const cursusCNCTrans = cursusTranslations[lang].find(t => t.order === 2)
    const cursusSiemensTrans = cursusTranslations[lang].find(t => t.order === 3)

    if (cursusAutoTrans) {
      await prisma.cursusTranslation.create({
        data: {
          cursusId: cursusAutomatisme.id,
          language: lang,
          title: cursusAutoTrans.title,
          description: cursusAutoTrans.description
        }
      })
    }
    if (cursusCNCTrans) {
      await prisma.cursusTranslation.create({
        data: {
          cursusId: cursusCNC.id,
          language: lang,
          title: cursusCNCTrans.title,
          description: cursusCNCTrans.description
        }
      })
    }
    if (cursusSiemensTrans) {
      await prisma.cursusTranslation.create({
        data: {
          cursusId: cursusSiemens.id,
          language: lang,
          title: cursusSiemensTrans.title,
          description: cursusSiemensTrans.description
        }
      })
    }
  }

  // Associate Modules to Cursus Automatisme
  await prisma.cursusModule.createMany({
    data: [
      { cursusId: cursusAutomatisme.id, moduleId: module1.id, order: 1, isRequired: true },
      { cursusId: cursusAutomatisme.id, moduleId: module2.id, order: 2, isRequired: true },
      { cursusId: cursusAutomatisme.id, moduleId: module3.id, order: 3, isRequired: true },
      { cursusId: cursusAutomatisme.id, moduleId: module4.id, order: 4, isRequired: true },
      { cursusId: cursusAutomatisme.id, moduleId: module5.id, order: 5, isRequired: true },
    ]
  })

  // Associate Modules to Cursus CNC
  await prisma.cursusModule.createMany({
    data: [
      { cursusId: cursusCNC.id, moduleId: module1.id, order: 1, isRequired: true },  // Shared foundation
      { cursusId: cursusCNC.id, moduleId: module2.id, order: 2, isRequired: true },  // Shared foundation
      { cursusId: cursusCNC.id, moduleId: module4.id, order: 3, isRequired: true },  // Shared foundation
      { cursusId: cursusCNC.id, moduleId: module6.id, order: 4, isRequired: true },
      { cursusId: cursusCNC.id, moduleId: module7.id, order: 5, isRequired: true },
      { cursusId: cursusCNC.id, moduleId: module8.id, order: 6, isRequired: true },
    ]
  })

  // Associate Modules to Cursus Siemens
  await prisma.cursusModule.createMany({
    data: [
      { cursusId: cursusSiemens.id, moduleId: module1.id, order: 1, isRequired: true },  // Shared foundation
      { cursusId: cursusSiemens.id, moduleId: module2.id, order: 2, isRequired: true },  // Shared foundation
      { cursusId: cursusSiemens.id, moduleId: module3.id, order: 3, isRequired: true },  // LADDER (Siemens uses LAD)
      { cursusId: cursusSiemens.id, moduleId: module9.id, order: 4, isRequired: true },  // Intro S7-1500
      { cursusId: cursusSiemens.id, moduleId: module10.id, order: 5, isRequired: true }, // TIA Portal
      { cursusId: cursusSiemens.id, moduleId: module11.id, order: 6, isRequired: true }, // Data Blocks
    ]
  })

  // Create Module Translations
  const modules = [module1, module2, module3, module4, module5, module6, module7, module8, module9, module10, module11]
  for (const lang of ['en', 'es'] as const) {
    for (const module of modules) {
      const trans = moduleTranslations[lang].find(t => t.order === modules.indexOf(module) + 1)
      if (trans) {
        await prisma.moduleTranslation.create({
          data: {
            moduleId: module.id,
            language: lang,
            title: trans.title,
            description: trans.description
          }
        })
      }
    }
  }

  // Create Lessons for Module 1
  const lesson1_1 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Qu'est-ce qu'un automate programmable ?",
      description: "Découvrez ce qu'est un PLC et son rôle dans l'industrie",
      order: 1,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Bienvenue dans le monde de l'automatisme !\n\nUn **automate programmable industriel** (API) ou **PLC** (Programmable Logic Controller) est un dispositif électronique programmable destiné à la commande de processus industriels."
          },
          {
            type: "info",
            content: "Le premier automate programmable a été inventé en 1968 par Dick Morley pour General Motors."
          },
          {
            type: "text",
            content: "## Pourquoi utiliser un automate ?\n\n- **Flexibilité** : On peut modifier le programme sans changer le câblage\n- **Fiabilité** : Conçu pour fonctionner 24h/24 en environnement industriel\n- **Diagnostic** : Détection et signalement des pannes\n- **Communication** : Échange de données avec d'autres systèmes"
          },
          {
            type: "diagram",
            title: "Structure d'un automate programmable",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATE PROGRAMMABLE                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │  ┌─────────┐    ┌─────────────┐    ┌─────────────────┐ ││
│  │  │         │    │             │    │                 │ ││
│  │  │ ENTRÉES │───▶│     CPU     │───▶│    SORTIES      │ ││
│  │  │  (I)    │    │  (Programme)│    │      (Q)        │ ││
│  │  │         │    │             │    │                 │ ││
│  │  └─────────┘    └─────────────┘    └─────────────────┘ ││
│  │       ▲               │                    │           ││
│  │       │          ┌────┴────┐               ▼           ││
│  │       │          │ MÉMOIRE │         ┌─────────┐       ││
│  │       │          └─────────┘         │ALIMENT. │       ││
│  │       │                              └─────────┘       ││
│  └───────┼──────────────────────────────────────────────┘ │
│          │                                      │          │
└──────────┼──────────────────────────────────────┼──────────┘
           │                                      │
    ┌──────┴──────┐                      ┌───────┴───────┐
    │  CAPTEURS   │                      │  ACTIONNEURS  │
    │ - Boutons   │                      │ - Moteurs     │
    │ - Détecteurs│                      │ - Vannes      │
    │ - Sondes    │                      │ - Voyants     │
    └─────────────┘                      └───────────────┘`
          },
          {
            type: "text",
            content: "## Les composants principaux\n\n1. **Unité centrale (CPU)** : Le cerveau qui exécute le programme\n2. **Mémoire** : Stocke le programme et les données\n3. **Entrées** : Reçoit les informations des capteurs\n4. **Sorties** : Commande les actionneurs\n5. **Alimentation** : Fournit l'énergie électrique"
          }
        ]
      }),
    },
  })

  const lesson1_2 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Les entrées et sorties (E/S)",
      description: "Comprenez le rôle des entrées et sorties dans un automate",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Entrées et Sorties\n\nLes entrées et sorties (E/S ou I/O en anglais) sont l'interface entre l'automate et le monde physique."
          },
          {
            type: "text",
            content: "## Les Entrées (Inputs)\n\nLes entrées reçoivent les informations provenant des **capteurs** :\n\n- Boutons poussoirs\n- Détecteurs de présence\n- Capteurs de température\n- Fins de course\n- Etc."
          },
          {
            type: "warning",
            content: "Les entrées TOR (Tout Ou Rien) ne connaissent que deux états : 0 (faux) ou 1 (vrai)."
          },
          {
            type: "text",
            content: "## Les Sorties (Outputs)\n\nLes sorties commandent les **actionneurs** :\n\n- Voyants lumineux\n- Contacteurs\n- Électrovannes\n- Variateurs de vitesse\n- Etc."
          },
          {
            type: "text",
            content: "## Types d'E/S\n\n| Type | Description | Exemple |\n|------|-------------|----------|\n| TOR | Tout Ou Rien (0 ou 1) | Bouton, voyant |\n| Analogique | Valeur continue | Température, pression |\n| Numérique | Communication série | Codeur, afficheur |"
          }
        ]
      }),
    },
  })

  const lesson1_3 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Le cycle automate",
      description: "Découvrez comment fonctionne le cycle de l'automate",
      order: 3,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le Cycle Automate\n\nL'automate fonctionne en exécutant un **cycle répétitif** composé de plusieurs phases."
          },
          {
            type: "text",
            content: "## Les phases du cycle\n\n### 1. Lecture des entrées\nL'automate lit l'état de toutes les entrées et stocke ces valeurs en mémoire.\n\n### 2. Exécution du programme\nLe CPU exécute le programme utilisateur ligne par ligne, de haut en bas.\n\n### 3. Mise à jour des sorties\nLes nouvelles valeurs des sorties sont envoyées aux modules de sortie.\n\n### 4. Gestion système\nCommunications, diagnostics, etc."
          },
          {
            type: "info",
            content: "Le temps de cycle typique est de quelques millisecondes (5-20 ms). Plus le programme est long, plus le cycle est long."
          },
          {
            type: "text",
            content: "## Importance du cycle\n\n- Un cycle rapide permet de réagir rapidement aux événements\n- Le programme doit être optimisé pour éviter les cycles trop longs\n- Certains automates permettent des tâches rapides pour les événements critiques"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 2
  const lesson2_1 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte ET (AND)",
      description: "Apprenez la fonction logique ET et ses applications",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique ET (AND)\n\nLa porte ET est une fonction logique fondamentale. La sortie est vraie (1) **uniquement** si toutes les entrées sont vraies (1)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A ET B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : A · B ou A ∧ B\n- En programmation : A AND B\n- En LADDER : Contacts en série"
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nUne machine ne démarre que si :\n- Le bouton START est appuyé **ET**\n- Le capot de sécurité est fermé **ET**\n- L'arrêt d'urgence n'est pas enclenché\n\n➡️ C'est une fonction ET à 3 entrées !"
          }
        ]
      }),
    },
  })

  const lesson2_2 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte OU (OR)",
      description: "Apprenez la fonction logique OU et ses applications",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique OU (OR)\n\nLa porte OU donne une sortie vraie (1) si **au moins une** des entrées est vraie (1)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A OU B |\n|---|---|--------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 1 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : A + B ou A ∨ B\n- En programmation : A OR B\n- En LADDER : Contacts en parallèle"
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nUn voyant d'alarme s'allume si :\n- La température est trop haute **OU**\n- La pression est trop haute **OU**\n- Le niveau est trop bas\n\n➡️ C'est une fonction OU à 3 entrées !"
          }
        ]
      }),
    },
  })

  const lesson2_3 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte NON (NOT)",
      description: "Apprenez la fonction logique NON (inversion)",
      order: 3,
      xpReward: 50,
      duration: 10,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte Logique NON (NOT)\n\nLa porte NON **inverse** l'état de l'entrée. Si l'entrée est 0, la sortie est 1 et vice versa."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | NON A |\n|---|-------|\n| 0 | 1 |\n| 1 | 0 |"
          },
          {
            type: "text",
            content: "## Symboles\n\n- Symbole logique : Ā ou ¬A\n- En programmation : NOT A\n- En LADDER : Contact normalement fermé (NF)"
          },
          {
            type: "info",
            content: "Un contact normalement fermé (NF) est un contact qui laisse passer le courant quand il n'est PAS actionné."
          },
          {
            type: "text",
            content: "## Exemple pratique\n\nLe voyant \"MACHINE ARRÊTÉE\" est allumé quand le moteur n'est PAS en marche.\n\n➡️ Voyant = NON(Moteur_en_marche)"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 3
  const lesson3_1 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Introduction au langage LADDER",
      description: "Découvrez le langage de programmation graphique LADDER",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le Langage LADDER\n\nLe **LADDER** (échelle en anglais) est un langage graphique qui ressemble aux schémas électriques à relais."
          },
          {
            type: "text",
            content: "## Pourquoi LADDER ?\n\n- Facile à comprendre pour les électriciens\n- Représentation visuelle intuitive\n- Standard industriel (IEC 61131-3)\n- Idéal pour la logique combinatoire"
          },
          {
            type: "text",
            content: "## Structure d'un programme LADDER\n\n```\n   |     Contact     Contact      Bobine    |\n   |----[ ]----------[ ]-----------( )-----|\n   |     I0.0        I0.1          Q0.0     |\n```\n\n- Le courant \"circule\" de gauche à droite\n- Les contacts laissent passer ou bloquent le courant\n- Les bobines sont activées si le courant les atteint"
          },
          {
            type: "text",
            content: "## Éléments de base\n\n| Symbole | Nom | Description |\n|---------|-----|-------------|\n| --[ ]-- | Contact NO | Passant si l'entrée = 1 |\n| --[/]-- | Contact NF | Passant si l'entrée = 0 |\n| --( )-- | Bobine | Activée si courant arrive |\n| --(/)-- | Bobine inversée | Activée si pas de courant |"
          }
        ]
      }),
    },
  })

  const lesson3_2 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Contacts et bobines",
      description: "Maîtrisez les contacts NO, NF et les différents types de bobines",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Contacts et Bobines en LADDER\n\nLes contacts et bobines sont les éléments fondamentaux de la programmation LADDER."
          },
          {
            type: "text",
            content: "## Types de contacts\n\n### Contact Normalement Ouvert (NO)\n```\n--[ ]--\n```\nLaisse passer le courant quand la variable associée est à 1.\n\n### Contact Normalement Fermé (NF)\n```\n--[/]--\n```\nLaisse passer le courant quand la variable associée est à 0."
          },
          {
            type: "text",
            content: "## Types de bobines\n\n### Bobine simple\n```\n--( )--\n```\nS'active quand le courant arrive, se désactive sinon.\n\n### Bobine SET (mémorisation)\n```\n--(S)--\n```\nS'active quand le courant arrive et **reste active**.\n\n### Bobine RESET\n```\n--(R)--\n```\nDésactive une bobine SET."
          },
          {
            type: "warning",
            content: "Attention : Une bobine SET reste active même si la condition n'est plus vraie. Il faut utiliser RESET pour la désactiver !"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 4
  const lesson4_1 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
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
      }),
    },
  })

  // Create Lessons for Module 5
  const lesson5_1 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Introduction au GRAFCET",
      description: "Découvrez le GRAFCET pour modéliser les systèmes séquentiels",
      order: 1,
      xpReward: 80,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Le GRAFCET\n\nLe **GRAFCET** (Graphe Fonctionnel de Commande Étape-Transition) est un outil de modélisation des systèmes automatisés séquentiels."
          },
          {
            type: "text",
            content: "## Éléments de base\n\n### Les étapes\nReprésentées par des carrés numérotés. Chaque étape correspond à un état du système.\n\n### Les transitions\nConditions logiques entre les étapes. Quand la condition est vraie, on passe à l'étape suivante.\n\n### Les actions\nCe que fait le système dans chaque étape (activer un moteur, ouvrir une vanne, etc.)."
          },
          {
            type: "text",
            content: "## Règles d'évolution\n\n1. L'étape initiale est active au départ\n2. Une transition est franchissable si l'étape précédente est active ET la condition est vraie\n3. Le franchissement désactive l'étape précédente et active la suivante\n4. Plusieurs transitions simultanées sont possibles (divergence/convergence)"
          },
          {
            type: "info",
            content: "Le GRAFCET est normalisé (NF C 03-190) et largement utilisé dans l'industrie française."
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 6 (CNC Introduction)
  const lesson6_1 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: "Qu'est-ce qu'une machine CNC ?",
      description: "Découvrez les bases des machines à commande numérique",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les machines CNC\n\nUne **machine CNC** (Commande Numérique par Calculateur) est un outil de fabrication piloté par un programme informatique. Elle automatise l'usinage de pièces avec une grande précision."
          },
          {
            type: "info",
            content: "Les premières machines CNC sont apparues dans les années 1950, révolutionnant l'industrie manufacturière."
          },
          {
            type: "text",
            content: "## Comment ça fonctionne ?\n\nLa machine CNC suit des instructions écrites en **G-code**, un langage de programmation standardisé. Ces instructions contrôlent :\n\n- Les mouvements de l'outil selon différents axes\n- La vitesse de rotation de la broche\n- La vitesse d'avance\n- Les changements d'outil"
          },
          {
            type: "text",
            content: "## Avantages de la CNC\n\n- **Précision** : Tolérances de quelques centièmes de millimètre\n- **Répétabilité** : Pièces identiques à chaque fois\n- **Productivité** : Fonctionnement continu 24h/24\n- **Complexité** : Usinage possible de formes complexes"
          }
        ]
      }),
    },
  })

  const lesson6_2 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: "Types de machines CNC",
      description: "Découvrez les différents types de machines CNC et leurs applications",
      order: 2,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Types de machines CNC\n\nIl existe de nombreux types de machines CNC, chacune conçue pour des applications spécifiques."
          },
          {
            type: "text",
            content: "## Fraiseuse CNC\n\nLa fraiseuse utilise un outil rotatif qui enlève la matière. Elle peut :\n- Usiner des surfaces planes\n- Créer des rainures et des poches\n- Percer des trous\n- Réaliser des formes 3D complexes"
          },
          {
            type: "text",
            content: "## Tour CNC\n\nLe tour fait tourner la pièce pendant que l'outil enlève la matière. Idéal pour :\n- Les pièces cylindriques\n- Les filetages\n- Les cônes et sphères\n- L'usinage intérieur et extérieur"
          },
          {
            type: "text",
            content: "## Autres types\n\n| Machine | Application |\n|---------|-------------|\n| Découpe laser | Découpe de précision de tôles |\n| Découpe plasma | Découpe de métal épais |\n| Électroérosion | Usinage de matériaux durs |\n| Imprimante 3D | Fabrication additive |"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 7 (G-Code Programming)
  const lesson7_1 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: "Structure d'un programme G-Code",
      description: "Apprenez comment est organisé un programme CNC",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Structure d'un programme G-Code\n\nUn programme G-code est une série d'instructions qui indiquent à la machine CNC ce qu'elle doit faire."
          },
          {
            type: "text",
            content: "## Lignes et blocs\n\nChaque ligne d'un programme s'appelle un **bloc**. Un bloc peut contenir :\n\n- Un numéro de ligne (N)\n- Des codes préparatoires (G)\n- Des coordonnées (X, Y, Z)\n- Une vitesse d'avance (F)\n- Une vitesse de broche (S)\n- Un outil (T)\n- Une fonction auxiliaire (M)"
          },
          {
            type: "text",
            content: "## Exemple de programme\n\n```gcode\nN10 G21 G90       ; Mode métrique, absolu\nN20 G0 X0 Y0 Z10  ; Positionnement rapide\nN30 M3 S1500      ; Broche ON, 1500 tr/min\nN40 G1 Z-5 F100   ; Plongée à 100 mm/min\nN50 G1 X50 F200   ; Déplacement linéaire\nN60 G0 Z10        ; Remontée\nN70 M5            ; Broche OFF\nN80 M30           ; Fin du programme\n```"
          },
          {
            type: "info",
            content: "Les commentaires sont généralement indiqués par un point-virgule (;) ou des parenthèses."
          }
        ]
      }),
    },
  })

  const lesson7_2 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: "Codes G et M essentiels",
      description: "Maîtrisez les codes fondamentaux pour la programmation CNC",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Codes G et M essentiels\n\nLes codes G (préparatoires) et codes M (auxiliaires) sont la base de la programmation CNC."
          },
          {
            type: "text",
            content: "## Principaux codes G\n\n| Code | Fonction |\n|------|----------|\n| G0 | Positionnement rapide |\n| G1 | Interpolation linéaire |\n| G2 | Interpolation circulaire horaire |\n| G3 | Interpolation circulaire anti-horaire |\n| G17 | Sélection plan XY |\n| G20 | Mode pouces |\n| G21 | Mode métrique |\n| G28 | Retour à l'origine |\n| G90 | Mode absolu |\n| G91 | Mode incrémental |"
          },
          {
            type: "text",
            content: "## Principaux codes M\n\n| Code | Fonction |\n|------|----------|\n| M0 | Arrêt programme |\n| M3 | Broche ON (horaire) |\n| M4 | Broche ON (anti-horaire) |\n| M5 | Broche OFF |\n| M6 | Changement d'outil |\n| M8 | Arrosage ON |\n| M9 | Arrosage OFF |\n| M30 | Fin du programme |"
          },
          {
            type: "warning",
            content: "Les codes peuvent varier légèrement selon les fabricants de machines. Vérifiez toujours la documentation spécifique."
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 8 (Axes and Interpolation)
  const lesson8_1 = await prisma.lesson.create({
    data: {
      moduleId: module8.id,
      title: "Système de coordonnées",
      description: "Comprenez le système de coordonnées utilisé en CNC",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Système de coordonnées CNC\n\nLes machines CNC utilisent un système de coordonnées **cartésien** pour positionner l'outil par rapport à la pièce."
          },
          {
            type: "text",
            content: "## Les trois axes principaux\n\n- **Axe X** : Déplacement horizontal (gauche/droite)\n- **Axe Y** : Déplacement horizontal (avant/arrière)\n- **Axe Z** : Déplacement vertical (haut/bas)\n\nLa direction positive de Z est généralement vers la broche."
          },
          {
            type: "text",
            content: "## Points de référence\n\n### Origine machine (M)\nPoint physique fixe sur la machine.\n\n### Origine pièce (W)\nPoint de référence pour la pièce, défini par le programmeur.\n\n### Position outil (T)\nPoint contrôlé par le programme, généralement la pointe de l'outil."
          },
          {
            type: "info",
            content: "Sur les machines 5 axes, les axes de rotation A, B et C s'ajoutent aux axes linéaires X, Y, Z."
          }
        ]
      }),
    },
  })

  const lesson8_2 = await prisma.lesson.create({
    data: {
      moduleId: module8.id,
      title: "Interpolation linéaire et circulaire",
      description: "Maîtrisez les déplacements d'outil G0, G1, G2, G3",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Interpolation d'outil\n\nL'interpolation est le mouvement calculé entre deux points. Le contrôleur CNC calcule toutes les positions intermédiaires."
          },
          {
            type: "text",
            content: "## Positionnement rapide (G0)\n\n```gcode\nG0 X100 Y50 Z10\n```\n\nLa machine se déplace le plus vite possible en ligne droite. **Pas d'enlèvement de matière** pendant un G0 !"
          },
          {
            type: "text",
            content: "## Interpolation linéaire (G1)\n\n```gcode\nG1 X100 Y50 F200\n```\n\nDéplacement contrôlé en ligne droite à la vitesse d'avance spécifiée (F). Utilisé pour l'usinage."
          },
          {
            type: "text",
            content: "## Interpolation circulaire\n\n```gcode\nG2 X50 Y50 I25 J0  ; Arc horaire\nG3 X50 Y50 I25 J0  ; Arc anti-horaire\n```\n\n- **G2** : Sens horaire\n- **G3** : Sens anti-horaire\n- **I, J, K** : Décalage du centre de l'arc (relatif au point de départ)"
          },
          {
            type: "warning",
            content: "Vérifiez toujours la vitesse d'avance avant d'usiner. Une vitesse trop élevée peut endommager l'outil ou la pièce !"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 9 (Siemens S7-1500 Introduction)
  const lesson9_1 = await prisma.lesson.create({
    data: {
      moduleId: module9.id,
      title: "Présentation du S7-1500",
      description: "Découvrez l'automate Siemens S7-1500 et ses caractéristiques",
      order: 1,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# L'automate Siemens S7-1500\n\nLe **S7-1500** est la gamme haut de gamme des automates Siemens. Il offre des performances élevées et de nombreuses fonctionnalités avancées."
          },
          {
            type: "diagram",
            title: "Architecture du S7-1500",
            content: `┌────────────────────────────────────────────────────────────────┐
│                     SIEMENS S7-1500                              │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   CPU    │  │    DI    │  │    DO    │  │    AI    │        │
│  │ 1511-1   │  │  32xDC   │  │  32xDC   │  │   8xAI   │        │
│  │          │  │          │  │          │  │          │        │
│  │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │        │
│  │  │DISP│  │  │  │LED │  │  │  │LED │  │  │  │LED │  │        │
│  │  └────┘  │  │  └────┘  │  │  └────┘  │  │  └────┘  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │                │
│       └─────────────┴─────────────┴─────────────┘                │
│                          │                                       │
│                    Rail DIN profilé                              │
│                                                                  │
└────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Caractéristiques principales\n\n- **Performance** : Temps de cycle rapide (jusqu'à 1 ns/instruction)\n- **Écran intégré** : Affichage des diagnostics et paramètres\n- **Mémoire** : Jusqu'à 10 Mo de mémoire de travail\n- **Communication** : PROFINET, PROFIBUS, OPC UA intégrés\n- **Sécurité** : Fonctions de sécurité intégrées (Safety Integrated)"
          },
          {
            type: "info",
            content: "Le S7-1500 remplace progressivement les anciens S7-300 et S7-400 grâce à ses performances supérieures."
          }
        ]
      }),
    },
  })

  const lesson9_2 = await prisma.lesson.create({
    data: {
      moduleId: module9.id,
      title: "L'environnement TIA Portal",
      description: "Introduction à l'outil de programmation Siemens TIA Portal",
      order: 2,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# TIA Portal\n\n**TIA Portal** (Totally Integrated Automation Portal) est l'environnement de développement intégré de Siemens pour programmer et configurer les automates S7."
          },
          {
            type: "text",
            content: "## Les composants de TIA Portal\n\n| Composant | Description |\n|-----------|-------------|\n| STEP 7 | Programmation des automates |\n| WinCC | Création des interfaces IHM |\n| SINAMICS Startdrive | Configuration des variateurs |\n| SIMOTION SCOUT | Programmation motion control |"
          },
          {
            type: "diagram",
            title: "Interface TIA Portal",
            content: `┌──────────────────────────────────────────────────────────────┐
│  TIA Portal V18                                    [─][□][×] │
├──────────────────────────────────────────────────────────────┤
│  Projet │ Édition │ Affichage │ Outils │ Fenêtre │ Aide     │
├─────────────┬────────────────────────────────────┬───────────┤
│             │                                    │           │
│  Arbre du   │     Zone de travail               │  Tâches   │
│  projet     │                                    │           │
│             │  ┌─────────────────────────────┐  │  ┌─────┐  │
│  ▼ PLC_1    │  │                             │  │  │Biblio│  │
│   ├ Blocs   │  │   Éditeur LAD/FBD/SCL       │  │  │thèque│  │
│   ├ Tables  │  │                             │  │  │     │  │
│   └ Config  │  │                             │  │  └─────┘  │
│             │  └─────────────────────────────┘  │           │
│             │                                    │           │
├─────────────┴────────────────────────────────────┴───────────┤
│  Détails │ Diagnostic │ Compilation │ Résultats              │
└──────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Vue portail vs Vue projet\n\n- **Vue portail** : Vue simplifiée pour démarrer rapidement\n- **Vue projet** : Vue complète pour la configuration avancée"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 10 (TIA Portal Programming)
  const lesson10_1 = await prisma.lesson.create({
    data: {
      moduleId: module10.id,
      title: "Créer un projet TIA Portal",
      description: "Apprenez à créer et configurer un projet S7-1500",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Créer un projet TIA Portal\n\nLa création d'un projet est la première étape pour programmer un automate Siemens."
          },
          {
            type: "text",
            content: "## Étapes de création\n\n1. **Nouveau projet** : Fichier → Nouveau → Projet\n2. **Ajouter un appareil** : Sélectionner la CPU (ex: CPU 1511-1 PN)\n3. **Configurer le matériel** : Ajouter les modules d'E/S\n4. **Configurer le réseau** : Définir l'adresse IP\n5. **Compiler** : Vérifier la configuration"
          },
          {
            type: "info",
            content: "Choisissez toujours la référence exacte de votre CPU. Les programmes ne sont pas toujours compatibles entre différentes versions."
          },
          {
            type: "text",
            content: "## Structure du projet\n\n```\nProjet TIA Portal\n├── Appareils et réseaux\n│   └── PLC_1 [CPU 1511-1 PN]\n│       ├── Configuration des appareils\n│       ├── Blocs de programme\n│       │   ├── Main [OB1]\n│       │   ├── Fonctions (FC)\n│       │   └── Blocs fonctionnels (FB)\n│       ├── Variables API\n│       └── Tables de visualisation\n└── Données communes\n```"
          }
        ]
      }),
    },
  })

  const lesson10_2 = await prisma.lesson.create({
    data: {
      moduleId: module10.id,
      title: "Langages de programmation S7",
      description: "Découvrez LAD, FBD, SCL et Graph pour programmer le S7-1500",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Langages de programmation\n\nLe S7-1500 supporte plusieurs langages de programmation selon la norme IEC 61131-3."
          },
          {
            type: "text",
            content: "## LAD (Ladder Diagram)\n\nLe plus utilisé, similaire aux schémas électriques.\n\n```\n|     I0.0        I0.1          Q0.0     |\n|----[ ]----------[/]-----------( )-----|\n|                                        |\n```"
          },
          {
            type: "text",
            content: "## FBD (Function Block Diagram)\n\nReprésentation graphique par blocs fonctionnels.\n\n```\n     ┌─────┐\nI0.0─┤     │\n     │ AND ├─Q0.0\nI0.1─┤     │\n     └─────┘\n```"
          },
          {
            type: "text",
            content: "## SCL (Structured Control Language)\n\nLangage textuel similaire au Pascal.\n\n```pascal\nIF I0.0 AND NOT I0.1 THEN\n    Q0.0 := TRUE;\nELSE\n    Q0.0 := FALSE;\nEND_IF;\n```"
          },
          {
            type: "text",
            content: "## GRAPH\n\nProgrammation séquentielle de type GRAFCET.\n\n| Langage | Utilisation |\n|---------|-------------|\n| LAD | Logique combinatoire, électriciens |\n| FBD | Traitement de signal, régulation |\n| SCL | Calculs complexes, gestion données |\n| GRAPH | Séquences, cycles machines |"
          }
        ]
      }),
    },
  })

  // Create Lessons for Module 11 (Data Blocks)
  const lesson11_1 = await prisma.lesson.create({
    data: {
      moduleId: module11.id,
      title: "Les blocs de données (DB)",
      description: "Comprenez les différents types de blocs de données S7",
      order: 1,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les blocs de données (DB)\n\nLes **Data Blocks** (DB) permettent de stocker des données dans l'automate S7-1500."
          },
          {
            type: "text",
            content: "## Types de blocs de données\n\n### DB Global\nAccessible depuis n'importe quel bloc du programme.\n\n### DB d'instance\nAssocié à un bloc fonctionnel (FB) spécifique.\n\n### DB de recette\nPour stocker des paramètres de production."
          },
          {
            type: "diagram",
            title: "Structure d'un DB",
            content: `┌─────────────────────────────────────────────┐
│  DB1 - Données_Production                   │
├─────────────────────────────────────────────┤
│  Nom              │ Type    │ Valeur       │
├───────────────────┼─────────┼──────────────┤
│  Compteur_Pieces  │ Int     │ 0            │
│  Vitesse_Consigne │ Real    │ 1500.0       │
│  Mode_Auto        │ Bool    │ FALSE        │
│  Nom_Produit      │ String  │ 'Pièce A'    │
│  Temps_Cycle      │ Time    │ T#5s         │
└───────────────────┴─────────┴──────────────┘`
          },
          {
            type: "info",
            content: "Le S7-1500 utilise par défaut l'accès optimisé aux DB, ce qui améliore les performances mais change la façon d'accéder aux données."
          }
        ]
      }),
    },
  })

  const lesson11_2 = await prisma.lesson.create({
    data: {
      moduleId: module11.id,
      title: "Programmation structurée",
      description: "Organisez votre code avec FB, FC et DB",
      order: 2,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Programmation structurée\n\nLa programmation structurée permet d'organiser le code en blocs réutilisables."
          },
          {
            type: "text",
            content: "## Types de blocs\n\n| Bloc | Description |\n|------|-------------|\n| OB (Organisation Block) | Point d'entrée du programme |\n| FB (Function Block) | Bloc avec mémoire (DB d'instance) |\n| FC (Function) | Bloc sans mémoire |\n| DB (Data Block) | Stockage de données |"
          },
          {
            type: "diagram",
            title: "Appel de blocs",
            content: `┌───────────────────────────────────────────────────────────┐
│                        OB1 (Main)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │   CALL "FC_Lecture_Entrees"                         │  │
│  │                                                     │  │
│  │   CALL "FB_Moteur", "DB_Moteur1"                    │  │
│  │        En := I0.0                                   │  │
│  │        Vitesse := 1500                              │  │
│  │                                                     │  │
│  │   CALL "FB_Moteur", "DB_Moteur2"                    │  │
│  │        En := I0.1                                   │  │
│  │        Vitesse := 1200                              │  │
│  │                                                     │  │
│  │   CALL "FC_Ecriture_Sorties"                        │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Avantages\n\n- **Réutilisation** : Un FB peut être appelé plusieurs fois avec des DB différents\n- **Lisibilité** : Code organisé et documenté\n- **Maintenance** : Modifications localisées\n- **Tests** : Blocs testables individuellement"
          },
          {
            type: "warning",
            content: "Évitez de programmer tout dans OB1 ! Utilisez des FB et FC pour structurer votre code."
          }
        ]
      }),
    },
  })

  // Create Quizzes
  await prisma.quiz.createMany({
    data: [
      // Quiz Module 1 - Lesson 1
      {
        lessonId: lesson1_1.id,
        question: "Que signifie l'acronyme PLC ?",
        options: JSON.stringify([
          "Programmable Logic Controller",
          "Power Line Carrier",
          "Programmable Linear Computer",
          "Process Logic Control"
        ]),
        correctIndex: 0,
        explanation: "PLC signifie Programmable Logic Controller, traduit en français par Automate Programmable Industriel (API).",
        order: 1,
      },
      {
        lessonId: lesson1_1.id,
        question: "Quel composant de l'automate exécute le programme ?",
        options: JSON.stringify([
          "Les entrées",
          "L'alimentation",
          "L'unité centrale (CPU)",
          "Les sorties"
        ]),
        correctIndex: 2,
        explanation: "L'unité centrale (CPU) est le cerveau de l'automate qui exécute le programme utilisateur.",
        order: 2,
      },
      // Quiz Module 1 - Lesson 2
      {
        lessonId: lesson1_2.id,
        question: "Qu'est-ce qu'une entrée TOR ?",
        options: JSON.stringify([
          "Une entrée qui mesure une température",
          "Une entrée binaire (0 ou 1)",
          "Une entrée de communication",
          "Une entrée haute fréquence"
        ]),
        correctIndex: 1,
        explanation: "TOR signifie Tout Ou Rien : l'entrée ne peut avoir que deux états, 0 (faux) ou 1 (vrai).",
        order: 1,
      },
      {
        lessonId: lesson1_2.id,
        question: "Les sorties de l'automate commandent :",
        options: JSON.stringify([
          "Les capteurs",
          "Les actionneurs",
          "L'alimentation",
          "La mémoire"
        ]),
        correctIndex: 1,
        explanation: "Les sorties commandent les actionneurs (moteurs, vannes, voyants, etc.) qui agissent sur le processus.",
        order: 2,
      },
      // Quiz Module 2 - Lesson 1
      {
        lessonId: lesson2_1.id,
        question: "Quelle est la sortie de A ET B si A=1 et B=0 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Erreur"]),
        correctIndex: 0,
        explanation: "La porte ET nécessite que TOUTES les entrées soient à 1 pour avoir une sortie à 1. Ici B=0, donc la sortie est 0.",
        order: 1,
      },
      {
        lessonId: lesson2_1.id,
        question: "En LADDER, comment représente-t-on une fonction ET ?",
        options: JSON.stringify([
          "Contacts en parallèle",
          "Contacts en série",
          "Une seule bobine",
          "Un temporisateur"
        ]),
        correctIndex: 1,
        explanation: "En LADDER, les contacts en série représentent une fonction ET : le courant ne passe que si tous les contacts sont fermés.",
        order: 2,
      },
      // Quiz Module 2 - Lesson 2
      {
        lessonId: lesson2_2.id,
        question: "Quelle est la sortie de A OU B si A=0 et B=1 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Erreur"]),
        correctIndex: 1,
        explanation: "La porte OU donne 1 si AU MOINS une entrée est à 1. Ici B=1, donc la sortie est 1.",
        order: 1,
      },
      // Quiz Module 3 - Lesson 1
      {
        lessonId: lesson3_1.id,
        question: "Pourquoi le langage LADDER est-il populaire ?",
        options: JSON.stringify([
          "C'est le plus récent",
          "Il ressemble aux schémas électriques",
          "Il est le plus rapide",
          "Il est gratuit"
        ]),
        correctIndex: 1,
        explanation: "Le LADDER ressemble aux schémas électriques à relais, ce qui le rend intuitif pour les électriciens.",
        order: 1,
      },
      // Quiz Module 6 - CNC Introduction
      {
        lessonId: lesson6_1.id,
        question: "Que signifie CNC ?",
        options: JSON.stringify([
          "Commande Numérique par Calculateur",
          "Centrale Numérique de Commande",
          "Contrôle Numérique de Coupe",
          "Centre Numérique de Calcul"
        ]),
        correctIndex: 0,
        explanation: "CNC signifie Commande Numérique par Calculateur (Computer Numerical Control en anglais).",
        order: 1,
      },
      {
        lessonId: lesson6_1.id,
        question: "Quel est l'avantage principal d'une machine CNC ?",
        options: JSON.stringify([
          "Elle est moins chère",
          "Haute précision et répétabilité",
          "Elle n'a pas besoin d'électricité",
          "Elle est plus petite"
        ]),
        correctIndex: 1,
        explanation: "Les machines CNC offrent une haute précision (centièmes de millimètre) et peuvent produire des pièces identiques à chaque fois.",
        order: 2,
      },
      {
        lessonId: lesson6_2.id,
        question: "Quelle machine est idéale pour les pièces cylindriques ?",
        options: JSON.stringify([
          "La fraiseuse",
          "Le tour CNC",
          "La découpeuse laser",
          "L'imprimante 3D"
        ]),
        correctIndex: 1,
        explanation: "Le tour fait tourner la pièce et est idéal pour usiner des formes cylindriques.",
        order: 1,
      },
      // Quiz Module 7 - G-Code
      {
        lessonId: lesson7_1.id,
        question: "Quel code est utilisé pour le positionnement rapide ?",
        options: JSON.stringify(["G1", "G0", "M3", "G2"]),
        correctIndex: 1,
        explanation: "G0 est le code de positionnement rapide. Il déplace l'outil le plus vite possible sans usinage.",
        order: 1,
      },
      {
        lessonId: lesson7_2.id,
        question: "Que fait le code M3 ?",
        options: JSON.stringify([
          "Arrête le programme",
          "Met la broche en marche (sens horaire)",
          "Active l'arrosage",
          "Déplace l'axe Z"
        ]),
        correctIndex: 1,
        explanation: "M3 met la broche en rotation dans le sens horaire.",
        order: 1,
      },
      // Quiz Module 8 - Axes
      {
        lessonId: lesson8_1.id,
        question: "Quel est l'axe vertical sur une fraiseuse CNC ?",
        options: JSON.stringify(["Axe X", "Axe Y", "Axe Z", "Axe A"]),
        correctIndex: 2,
        explanation: "L'axe Z est l'axe vertical (mouvement haut/bas).",
        order: 1,
      },
      {
        lessonId: lesson8_2.id,
        question: "Que fait le code G1 ?",
        options: JSON.stringify([
          "Déplacement rapide",
          "Interpolation linéaire à vitesse contrôlée",
          "Déplacement circulaire",
          "Arrêt du programme"
        ]),
        correctIndex: 1,
        explanation: "G1 effectue une interpolation linéaire à une vitesse d'avance contrôlée, utilisé pour l'usinage.",
        order: 1,
      },
      {
        lessonId: lesson8_2.id,
        question: "G2 effectue une interpolation circulaire dans quel sens ?",
        options: JSON.stringify([
          "Sens anti-horaire",
          "Sens horaire",
          "Sens vertical",
          "Dépend de la machine"
        ]),
        correctIndex: 1,
        explanation: "G2 effectue une interpolation circulaire dans le sens horaire. G3 est pour le sens anti-horaire.",
        order: 2,
      },
      // Quiz Module 9 - Siemens S7-1500 Introduction
      {
        lessonId: lesson9_1.id,
        question: "Quelle est la particularité du S7-1500 par rapport aux anciens automates Siemens ?",
        options: JSON.stringify([
          "Il est moins cher",
          "Il dispose d'un écran intégré et de performances accrues",
          "Il ne nécessite pas de programmation",
          "Il fonctionne sans alimentation"
        ]),
        correctIndex: 1,
        explanation: "Le S7-1500 dispose d'un écran frontal intégré, de meilleures performances et d'un diagnostic amélioré par rapport aux S7-300/400.",
        order: 1,
      },
      {
        lessonId: lesson9_1.id,
        question: "Quel logiciel est utilisé pour programmer les S7-1500 ?",
        options: JSON.stringify([
          "Step 7 Classic",
          "WinCC",
          "TIA Portal",
          "Logo! Soft Comfort"
        ]),
        correctIndex: 2,
        explanation: "TIA Portal (Totally Integrated Automation) est l'environnement de programmation unifié pour les S7-1500.",
        order: 2,
      },
      {
        lessonId: lesson9_2.id,
        question: "Que signifie TIA dans TIA Portal ?",
        options: JSON.stringify([
          "Total Industrial Automation",
          "Totally Integrated Automation",
          "Technical Integration Application",
          "Tool for Industrial Applications"
        ]),
        correctIndex: 1,
        explanation: "TIA signifie Totally Integrated Automation, reflétant l'intégration de tous les outils de conception dans un seul environnement.",
        order: 1,
      },
      {
        lessonId: lesson9_2.id,
        question: "Quelle vue de TIA Portal permet de voir tous les appareils du projet ?",
        options: JSON.stringify([
          "Vue du programme",
          "Vue du portail",
          "Vue du projet",
          "Vue réseau"
        ]),
        correctIndex: 2,
        explanation: "La Vue du projet affiche l'arborescence complète avec tous les appareils, programmes et configurations.",
        order: 2,
      },
      // Quiz Module 10 - TIA Portal Programming
      {
        lessonId: lesson10_1.id,
        question: "Quelle est la première étape pour créer un projet TIA Portal ?",
        options: JSON.stringify([
          "Écrire le programme",
          "Créer un nouveau projet et configurer le matériel",
          "Connecter l'automate",
          "Compiler le programme"
        ]),
        correctIndex: 1,
        explanation: "On commence toujours par créer un projet puis configurer le matériel (CPU, modules E/S) avant de programmer.",
        order: 1,
      },
      {
        lessonId: lesson10_1.id,
        question: "Qu'est-ce que le HW Config dans TIA Portal ?",
        options: JSON.stringify([
          "L'éditeur de programme",
          "La configuration matérielle",
          "Le simulateur",
          "Le diagnostic en ligne"
        ]),
        correctIndex: 1,
        explanation: "HW Config (Hardware Configuration) permet de définir la configuration matérielle : CPU, modules, adresses.",
        order: 2,
      },
      {
        lessonId: lesson10_2.id,
        question: "Quel langage utilise des contacts et bobines comme un schéma électrique ?",
        options: JSON.stringify([
          "SCL",
          "FBD",
          "LAD (LADDER)",
          "GRAPH"
        ]),
        correctIndex: 2,
        explanation: "LAD (Ladder Diagram) représente la logique avec des contacts et bobines comme un schéma à relais.",
        order: 1,
      },
      {
        lessonId: lesson10_2.id,
        question: "Quel langage est similaire au Pascal et permet des calculs complexes ?",
        options: JSON.stringify([
          "LAD",
          "FBD",
          "SCL",
          "GRAPH"
        ]),
        correctIndex: 2,
        explanation: "SCL (Structured Control Language) est un langage textuel de haut niveau similaire au Pascal, idéal pour les algorithmes.",
        order: 2,
      },
      // Quiz Module 11 - Data Blocks
      {
        lessonId: lesson11_1.id,
        question: "Quelle est la différence entre un DB global et un DB d'instance ?",
        options: JSON.stringify([
          "Il n'y a pas de différence",
          "Le DB global est accessible partout, le DB d'instance est lié à un FB",
          "Le DB d'instance est plus grand",
          "Le DB global est automatique"
        ]),
        correctIndex: 1,
        explanation: "Un DB global stocke des données accessibles dans tout le programme. Un DB d'instance stocke les données internes d'un FB spécifique.",
        order: 1,
      },
      {
        lessonId: lesson11_1.id,
        question: "Comment accède-t-on à une variable 'Vitesse' dans le DB10 ?",
        options: JSON.stringify([
          "Vitesse",
          "DB10.Vitesse",
          "%DB10.Vitesse",
          "#Vitesse"
        ]),
        correctIndex: 1,
        explanation: "On accède aux variables d'un DB avec la syntaxe DB<numéro>.<variable>, par exemple DB10.Vitesse.",
        order: 2,
      },
      {
        lessonId: lesson11_2.id,
        question: "Quel bloc possède une mémoire (DB d'instance) ?",
        options: JSON.stringify([
          "FC (Function)",
          "FB (Function Block)",
          "OB (Organisation Block)",
          "Aucun bloc"
        ]),
        correctIndex: 1,
        explanation: "Les FB (Function Block) possèdent un DB d'instance qui conserve les données entre les appels, contrairement aux FC.",
        order: 1,
      },
      {
        lessonId: lesson11_2.id,
        question: "Quel bloc est le point d'entrée principal du programme cyclique ?",
        options: JSON.stringify([
          "FB1",
          "FC1",
          "OB1",
          "DB1"
        ]),
        correctIndex: 2,
        explanation: "OB1 (Main) est l'Organisation Block cyclique principal, exécuté en boucle par le CPU.",
        order: 2,
      },
    ],
  })

  // Create Rewards
  await prisma.reward.createMany({
    data: [
      {
        name: "Premier pas",
        description: "Terminer votre première leçon",
        icon: "🎯",
        type: "badge",
        condition: JSON.stringify({ type: "lessons_completed", count: 1 }),
        xpBonus: 25,
      },
      {
        name: "Étudiant assidu",
        description: "Terminer 5 leçons",
        icon: "📚",
        type: "badge",
        condition: JSON.stringify({ type: "lessons_completed", count: 5 }),
        xpBonus: 50,
      },
      {
        name: "Expert en herbe",
        description: "Terminer 10 leçons",
        icon: "🌟",
        type: "badge",
        condition: JSON.stringify({ type: "lessons_completed", count: 10 }),
        xpBonus: 100,
      },
      {
        name: "Sans faute !",
        description: "Obtenir 100% à un quiz",
        icon: "💯",
        type: "badge",
        condition: JSON.stringify({ type: "perfect_quiz", count: 1 }),
        xpBonus: 30,
      },
      {
        name: "Série de 3",
        description: "Se connecter 3 jours consécutifs",
        icon: "🔥",
        type: "badge",
        condition: JSON.stringify({ type: "streak", count: 3 }),
        xpBonus: 40,
      },
      {
        name: "Série de 7",
        description: "Se connecter 7 jours consécutifs",
        icon: "🔥🔥",
        type: "badge",
        condition: JSON.stringify({ type: "streak", count: 7 }),
        xpBonus: 100,
      },
      {
        name: "Maître logicien",
        description: "Terminer le module Logique combinatoire",
        icon: "🧠",
        type: "trophy",
        condition: JSON.stringify({ type: "module_completed", moduleOrder: 2 }),
        xpBonus: 150,
      },
      {
        name: "Pro du LADDER",
        description: "Terminer le module LADDER",
        icon: "🪜",
        type: "trophy",
        condition: JSON.stringify({ type: "module_completed", moduleOrder: 3 }),
        xpBonus: 200,
      },
      {
        name: "Niveau 5",
        description: "Atteindre le niveau 5",
        icon: "⭐",
        type: "badge",
        condition: JSON.stringify({ type: "level", level: 5 }),
        xpBonus: 75,
      },
      {
        name: "Niveau 10",
        description: "Atteindre le niveau 10",
        icon: "🏆",
        type: "trophy",
        condition: JSON.stringify({ type: "level", level: 10 }),
        xpBonus: 200,
      },
    ],
  })

  // Create Lesson Translations
  const allLessons = await prisma.lesson.findMany()
  for (const lesson of allLessons) {
    for (const lang of ['en', 'es'] as const) {
      // Try regular translations first, then CNC, then Siemens translations
      const trans = lessonTranslations[lang][lesson.title as keyof typeof lessonTranslations['en']]
        || cncLessonTranslations[lang][lesson.title as keyof typeof cncLessonTranslations['en']]
        || siemensLessonTranslations[lang][lesson.title as keyof typeof siemensLessonTranslations['en']]
      if (trans) {
        await prisma.lessonTranslation.create({
          data: {
            lessonId: lesson.id,
            language: lang,
            title: trans.title,
            description: trans.description,
            content: trans.content
          }
        })
      }
    }
  }

  // Create Quiz Translations
  const allQuizzes = await prisma.quiz.findMany()
  for (const quiz of allQuizzes) {
    for (const lang of ['en', 'es'] as const) {
      // Try regular translations first, then CNC, then Siemens translations
      const trans = quizTranslations[lang][quiz.question as keyof typeof quizTranslations['en']]
        || cncQuizTranslations[lang][quiz.question as keyof typeof cncQuizTranslations['en']]
        || siemensQuizTranslations[lang][quiz.question as keyof typeof siemensQuizTranslations['en']]
      if (trans) {
        await prisma.quizTranslation.create({
          data: {
            quizId: quiz.id,
            language: lang,
            question: trans.question,
            options: JSON.stringify(trans.options),
            explanation: trans.explanation
          }
        })
      }
    }
  }

  // Create Reward Translations
  const allRewards = await prisma.reward.findMany()
  for (const reward of allRewards) {
    for (const lang of ['en', 'es'] as const) {
      const trans = rewardTranslations[lang][reward.name]
      if (trans) {
        await prisma.rewardTranslation.create({
          data: {
            rewardId: reward.id,
            language: lang,
            name: trans.name,
            description: trans.description
          }
        })
      }
    }
  }

  // Create demo user with some progress
  const hashedPassword = await bcrypt.hash('demo123', 10)

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@easyplc.fr',
      username: 'DemoUser',
      password: hashedPassword,
      totalXp: 255,
      level: 2,
      streak: 3,
    },
  })

  // Add progress for demo user (completed first 3 lessons)
  await prisma.lessonProgress.createMany({
    data: [
      {
        userId: demoUser.id,
        lessonId: lesson1_1.id,
        completed: true,
        score: 100,
        timeSpent: 480,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: demoUser.id,
        lessonId: lesson1_2.id,
        completed: true,
        score: 85,
        timeSpent: 600,
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        userId: demoUser.id,
        lessonId: lesson1_3.id,
        completed: true,
        score: 70,
        timeSpent: 720,
        completedAt: new Date(), // today
      },
    ],
  })

  // Give demo user some rewards
  const firstReward = await prisma.reward.findFirst({
    where: { name: 'Premier pas' },
  })
  const perfectReward = await prisma.reward.findFirst({
    where: { name: 'Sans faute !' },
  })
  const streakReward = await prisma.reward.findFirst({
    where: { name: 'Série de 3' },
  })

  if (firstReward) {
    await prisma.userReward.create({
      data: {
        userId: demoUser.id,
        rewardId: firstReward.id,
        earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    })
  }
  if (perfectReward) {
    await prisma.userReward.create({
      data: {
        userId: demoUser.id,
        rewardId: perfectReward.id,
        earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    })
  }
  if (streakReward) {
    await prisma.userReward.create({
      data: {
        userId: demoUser.id,
        rewardId: streakReward.id,
        earnedAt: new Date(),
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('📧 Compte démo créé :')
  console.log('   Email: demo@easyplc.fr')
  console.log('   Mot de passe: demo123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
