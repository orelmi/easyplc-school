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

  const lesson1_4 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Les marques et les fabricants d'automates",
      description: "Découvrez les principaux fabricants d'automates programmables",
      order: 4,
      xpReward: 55,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Fabricants d'Automates\n\nLe marché des automates programmables est dominé par quelques grands acteurs mondiaux, chacun ayant ses spécificités."
          },
          {
            type: "diagram",
            title: "Les principaux fabricants",
            content: `┌─────────────────────────────────────────────────────────────────┐
│                  PRINCIPAUX FABRICANTS D'API                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔷 SIEMENS (Allemagne)        │  🟠 SCHNEIDER (France)         │
│  ├── S7-1500 (haut de gamme)   │  ├── Modicon M580             │
│  ├── S7-1200 (milieu de gamme) │  ├── Modicon M340             │
│  └── S7-300/400 (legacy)       │  └── Zelio Logic (compact)    │
│                                 │                                │
│  🔴 ALLEN-BRADLEY (USA)        │  🟡 OMRON (Japon)              │
│  ├── ControlLogix              │  ├── CJ2/NJ Series            │
│  ├── CompactLogix              │  ├── CP1L/CP1H                │
│  └── MicroLogix                │  └── SYSMAC                   │
│                                 │                                │
│  🟢 MITSUBISHI (Japon)         │  🔵 ABB (Suisse)               │
│  ├── iQ-R Series               │  ├── AC500                    │
│  ├── FX5 Series                │  └── PM5xx                    │
│  └── MELSEC Q                  │                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Siemens - Leader mondial\n\n**Parts de marché** : ~30% mondial\n\n**Points forts** :\n- Écosystème complet (TIA Portal)\n- Communication industrielle avancée\n- Support mondial excellent\n\n**Gammes principales** :\n- **LOGO!** : Micro-automates\n- **S7-1200** : Entrée de gamme\n- **S7-1500** : Haute performance"
          },
          {
            type: "text",
            content: "## Schneider Electric - Champion français\n\n**Points forts** :\n- Forte présence en France\n- Gamme complète Modicon\n- Solutions d'efficacité énergétique\n\n**Gammes principales** :\n- **Zelio Logic** : Petites applications\n- **Modicon M221/M241** : Compacts\n- **Modicon M340/M580** : Performance"
          },
          {
            type: "info",
            content: "Le choix d'un fabricant dépend souvent du secteur d'activité, de la région géographique et des compétences disponibles dans l'entreprise."
          }
        ]
      }),
    },
  })

  const lesson1_5 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "L'adressage des E/S",
      description: "Apprenez à identifier et adresser les entrées/sorties",
      order: 5,
      xpReward: 65,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# L'Adressage des Entrées/Sorties\n\nChaque entrée et sortie possède une **adresse unique** qui permet de l'identifier dans le programme."
          },
          {
            type: "text",
            content: "## Notation Siemens (IEC)\n\n```\n%I0.0    →  Entrée bit 0 de l'octet 0\n%I0.7    →  Entrée bit 7 de l'octet 0\n%I1.0    →  Entrée bit 0 de l'octet 1\n\n%Q0.0    →  Sortie bit 0 de l'octet 0\n%Q2.3    →  Sortie bit 3 de l'octet 2\n\n%IW0     →  Mot d'entrée (16 bits)\n%QW4     →  Mot de sortie (16 bits)\n```"
          },
          {
            type: "diagram",
            title: "Structure d'une adresse",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    STRUCTURE D'ADRESSE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│           %  I  0  .  3                                      │
│           │  │  │     │                                      │
│           │  │  │     └── Numéro de bit (0-7)               │
│           │  │  │                                            │
│           │  │  └──────── Numéro d'octet                    │
│           │  │                                               │
│           │  └─────────── Type : I=Entrée, Q=Sortie         │
│           │               M=Mémoire interne                  │
│           │                                                  │
│           └────────────── Préfixe IEC (optionnel)           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Types de données :                                          │
│  • X ou pas de lettre = Bit (1 bit)                         │
│  • B = Byte/Octet (8 bits)                                  │
│  • W = Word/Mot (16 bits)                                   │
│  • D = Double Word (32 bits)                                │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Notation Allen-Bradley\n\n```\nI:0/0    →  Entrée module 0, bit 0\nO:1/5    →  Sortie module 1, bit 5\nB3:0     →  Bit fichier 3, mot 0\n```"
          },
          {
            type: "warning",
            content: "La notation varie selon les fabricants ! Consultez toujours la documentation de votre automate."
          },
          {
            type: "text",
            content: "## Bonnes pratiques\n\n1. **Utilisez des noms symboliques** : `Bouton_Start` plutôt que `%I0.0`\n2. **Documentez vos adresses** dans une table des E/S\n3. **Groupez logiquement** les E/S par fonction\n4. **Réservez des adresses** pour les extensions futures"
          }
        ]
      }),
    },
  })

  const lesson1_6 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Sécurité et normes industrielles",
      description: "Découvrez les normes de sécurité essentielles en automatisme",
      order: 6,
      xpReward: 70,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sécurité en Automatisme Industriel\n\nLa sécurité est **primordiale** dans les systèmes automatisés. Des normes strictes encadrent la conception et l'utilisation des automates."
          },
          {
            type: "warning",
            content: "Un système automatisé mal conçu peut causer des blessures graves voire mortelles. La sécurité n'est pas une option !"
          },
          {
            type: "text",
            content: "## Normes principales\n\n| Norme | Domaine |\n|-------|----------|\n| **EN 60204-1** | Sécurité des machines - Équipement électrique |\n| **EN ISO 13849** | Sécurité des systèmes de commande (PL) |\n| **EN 62061** | Sécurité fonctionnelle (SIL) |\n| **EN 60947** | Appareillage basse tension |\n| **EN ISO 12100** | Principes généraux de conception |"
          },
          {
            type: "text",
            content: "## Niveaux de Performance (PL)\n\nLa norme EN ISO 13849 définit 5 niveaux de performance :\n\n- **PL a** : Risque faible\n- **PL b** : Risque modéré\n- **PL c** : Risque significatif  \n- **PL d** : Risque élevé\n- **PL e** : Risque très élevé (mort probable)"
          },
          {
            type: "diagram",
            title: "Circuit d'arrêt d'urgence type",
            content: `┌─────────────────────────────────────────────────────────────┐
│              CIRCUIT D'ARRÊT D'URGENCE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   [AU 1]     [AU 2]     [Relais de sécurité]                │
│     │          │              │                              │
│     ├──────────┤              │                              │
│     │          │         ┌────┴────┐                        │
│     └──────────┴────────▶│ PILZ    │──────▶ Contacteurs     │
│                          │ PNOZ    │        de puissance    │
│                          └────┬────┘                        │
│                               │                              │
│                          Retour de                          │
│                          surveillance                       │
│                                                              │
│   Caractéristiques :                                        │
│   • Double canal (redondance)                               │
│   • Contacts à ouverture forcée                             │
│   • Surveillance des contacteurs                            │
│   • Réarmement manuel obligatoire                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Automates de sécurité\n\nPour les fonctions de sécurité, on utilise des automates spéciaux :\n\n- **Siemens** : S7-1500F, ET 200SP F\n- **Schneider** : Preventa XPS\n- **Pilz** : PSS 4000, PNOZmulti\n- **Allen-Bradley** : GuardLogix\n\nCes automates ont une architecture redondante et sont certifiés SIL 3 / PL e."
          },
          {
            type: "info",
            content: "Un automate standard (non-F) ne doit JAMAIS être utilisé seul pour des fonctions de sécurité critiques."
          }
        ]
      }),
    },
  })

  const lesson1_7 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Communication et réseaux industriels",
      description: "Introduction aux protocoles de communication industriels",
      order: 7,
      xpReward: 75,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Communication Industrielle\n\nLes automates modernes communiquent entre eux et avec d'autres systèmes via des **réseaux industriels** spécialisés."
          },
          {
            type: "diagram",
            title: "Pyramide CIM (Computer Integrated Manufacturing)",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    PYRAMIDE CIM                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌─────────┐                              │
│                    │   ERP   │  Niveau 4 : Gestion          │
│                    └────┬────┘  (SAP, Oracle)               │
│                         │                                    │
│                ┌────────┴────────┐                          │
│                │      MES       │  Niveau 3 : Pilotage      │
│                └────────┬───────┘  (Manufacturing)          │
│                         │                                    │
│         ┌───────────────┴───────────────┐                   │
│         │         SCADA / HMI          │  Niveau 2 :        │
│         └───────────────┬───────────────┘  Supervision      │
│                         │                                    │
│    ┌────────────────────┴────────────────────┐              │
│    │              API / PLC                  │  Niveau 1 :  │
│    └────────────────────┬────────────────────┘  Commande    │
│                         │                                    │
│    ┌────────────────────┴────────────────────┐              │
│    │       Capteurs / Actionneurs            │  Niveau 0 :  │
│    └─────────────────────────────────────────┘  Terrain     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Protocoles courants\n\n### Bus de terrain\n- **PROFIBUS** : Standard Siemens, très répandu\n- **Modbus RTU** : Simple, économique, série RS-485\n- **DeviceNet** : Standard Allen-Bradley\n- **CANopen** : Basé sur CAN, industrie automobile\n\n### Ethernet industriel\n- **PROFINET** : Ethernet temps réel Siemens\n- **EtherNet/IP** : Standard Rockwell/ODVA\n- **Modbus TCP** : Modbus sur Ethernet\n- **EtherCAT** : Très haute vitesse (Beckhoff)"
          },
          {
            type: "text",
            content: "## Comparaison des protocoles\n\n| Protocole | Vitesse | Temps réel | Complexité |\n|-----------|---------|------------|------------|\n| Modbus RTU | 19.2 kbps | Non | Faible |\n| PROFIBUS | 12 Mbps | Oui | Moyenne |\n| PROFINET | 100 Mbps | Oui | Moyenne |\n| EtherCAT | 100 Mbps | Oui (µs) | Élevée |"
          },
          {
            type: "info",
            content: "PROFINET et EtherNet/IP sont les protocoles Ethernet industriels les plus utilisés aujourd'hui."
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

  const lesson2_4 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "Les portes NAND et NOR",
      description: "Découvrez les fonctions logiques composées NAND et NOR",
      order: 4,
      xpReward: 65,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Portes NAND et NOR\n\nCes portes sont des **combinaisons** des fonctions de base ET, OU, NON."
          },
          {
            type: "text",
            content: "## La porte NAND (NON-ET)\n\nC'est l'inverse de la porte ET : la sortie est 1 sauf si toutes les entrées sont à 1.\n\n| A | B | A NAND B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Formule** : NAND(A,B) = NON(A ET B)"
          },
          {
            type: "text",
            content: "## La porte NOR (NON-OU)\n\nC'est l'inverse de la porte OU : la sortie est 1 seulement si toutes les entrées sont à 0.\n\n| A | B | A NOR B |\n|---|---|----------|\n| 0 | 0 | 1 |\n| 0 | 1 | 0 |\n| 1 | 0 | 0 |\n| 1 | 1 | 0 |\n\n**Formule** : NOR(A,B) = NON(A OU B)"
          },
          {
            type: "info",
            content: "Fait remarquable : avec des portes NAND uniquement, on peut recréer TOUTES les autres fonctions logiques ! C'est pourquoi la NAND est appelée 'porte universelle'."
          }
        ]
      }),
    },
  })

  const lesson2_5 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "La porte XOR (OU exclusif)",
      description: "Apprenez la fonction logique XOR et ses applications",
      order: 5,
      xpReward: 60,
      duration: 12,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# La Porte XOR (OU Exclusif)\n\nLa porte XOR donne 1 si **exactement une** des entrées est à 1 (mais pas les deux)."
          },
          {
            type: "text",
            content: "## Table de vérité\n\n| A | B | A XOR B |\n|---|---|----------|\n| 0 | 0 | 0 |\n| 0 | 1 | 1 |\n| 1 | 0 | 1 |\n| 1 | 1 | 0 |\n\n**Symbole** : A ⊕ B"
          },
          {
            type: "text",
            content: "## Formule équivalente\n\nXOR peut s'exprimer avec ET, OU, NON :\n\n```\nA XOR B = (A OU B) ET NON(A ET B)\n```\n\nOu encore :\n```\nA XOR B = (A ET NON B) OU (NON A ET B)\n```"
          },
          {
            type: "text",
            content: "## Applications industrielles\n\n- **Comparaison** : Détecter si deux signaux sont différents\n- **Commande va-et-vient** : Comme un interrupteur d'escalier\n- **Détection de changement d'état** : Front montant/descendant\n- **Contrôle de parité** : Vérification de données"
          }
        ]
      }),
    },
  })

  const lesson2_6 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "Simplification des équations logiques",
      description: "Apprenez à simplifier les expressions booléennes",
      order: 6,
      xpReward: 75,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Simplification des Équations Logiques\n\nUne équation simplifiée = **moins de composants** = **moins de coût** et **meilleure fiabilité**."
          },
          {
            type: "text",
            content: "## Propriétés de l'algèbre de Boole\n\n### Propriétés de base\n- **Identité** : A ET 1 = A, A OU 0 = A\n- **Élément nul** : A ET 0 = 0, A OU 1 = 1\n- **Complémentarité** : A ET NON(A) = 0, A OU NON(A) = 1\n- **Idempotence** : A ET A = A, A OU A = A"
          },
          {
            type: "text",
            content: "## Théorèmes importants\n\n### Théorème de De Morgan\n```\nNON(A ET B) = NON(A) OU NON(B)\nNON(A OU B) = NON(A) ET NON(B)\n```\n\n### Absorption\n```\nA OU (A ET B) = A\nA ET (A OU B) = A\n```"
          },
          {
            type: "diagram",
            title: "Exemple de simplification",
            content: `┌─────────────────────────────────────────────────────────────┐
│              EXEMPLE DE SIMPLIFICATION                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Expression initiale :                                       │
│  S = (A ET B) OU (A ET NON(B)) OU (NON(A) ET B)            │
│                                                              │
│  Étape 1 - Factorisation :                                  │
│  S = A ET (B OU NON(B)) OU (NON(A) ET B)                   │
│                                                              │
│  Étape 2 - Complémentarité (B OU NON(B) = 1) :             │
│  S = A ET 1 OU (NON(A) ET B)                                │
│                                                              │
│  Étape 3 - Identité (A ET 1 = A) :                         │
│  S = A OU (NON(A) ET B)                                     │
│                                                              │
│  Étape 4 - Distribution :                                   │
│  S = A OU B                                                 │
│                                                              │
│  Résultat : Expression simplifiée de 3 portes à 1 porte !  │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      }),
    },
  })

  const lesson2_7 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      title: "Tableaux de Karnaugh",
      description: "Méthode graphique de simplification des fonctions logiques",
      order: 7,
      xpReward: 80,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Tableaux de Karnaugh\n\nLe tableau de Karnaugh est une méthode **graphique** pour simplifier les fonctions logiques, plus rapide que l'algèbre pour les fonctions à 3-4 variables."
          },
          {
            type: "diagram",
            title: "Tableau de Karnaugh à 2 variables",
            content: `┌─────────────────────────────────────────────────────────────┐
│           TABLEAU DE KARNAUGH (2 variables)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      B                                       │
│                  0       1                                   │
│              ┌───────┬───────┐                              │
│          0   │   0   │   1   │                              │
│      A       ├───────┼───────┤                              │
│          1   │   1   │   1   │                              │
│              └───────┴───────┘                              │
│                                                              │
│  On groupe les 1 adjacents pour simplifier :                │
│  - Groupe vertical (A=0,B=1 et A=1,B=1) → B                 │
│  - Case isolée (A=1,B=0) → A ET NON(B)                      │
│                                                              │
│  Ou groupe horizontal : ligne A=1 → A                       │
│  Résultat : S = A OU B                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Règles de regroupement\n\n1. **Grouper les 1** adjacents (horizontalement ou verticalement)\n2. Les groupes doivent contenir **2, 4, 8 ou 16** cases (puissances de 2)\n3. Les groupes peuvent se **chevaucher**\n4. Les bords sont **adjacents** (le tableau est cyclique)\n5. Faire les **plus grands groupes possibles**"
          },
          {
            type: "text",
            content: "## Lecture du résultat\n\nPour chaque groupe :\n- Les variables qui **ne changent pas** apparaissent dans le terme\n- Les variables qui **changent** disparaissent\n\nLe résultat final est le **OU** de tous les termes."
          },
          {
            type: "info",
            content: "Pour 5 variables ou plus, on utilise généralement des logiciels de simplification ou la méthode de Quine-McCluskey."
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

  const lesson3_3 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Circuit marche/arrêt avec auto-maintien",
      description: "Programmez le circuit classique de démarrage/arrêt moteur",
      order: 3,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Circuit Marche/Arrêt avec Auto-maintien\n\nC'est le circuit de base pour commander un moteur avec deux boutons : START et STOP."
          },
          {
            type: "diagram",
            title: "Schéma LADDER du circuit",
            content: `┌─────────────────────────────────────────────────────────────┐
│           CIRCUIT MARCHE/ARRÊT AVEC AUTO-MAINTIEN            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Réseau 1 : Commande du moteur                             │
│                                                              │
│   |     STOP      START        MOTEUR                       │
│   |----[/]----+---[ ]----+-----( )------|                   │
│   |           |          |              |                   │
│   |           |  MOTEUR  |              |                   │
│   |           +---[ ]----+              |                   │
│   |                                     |                   │
│   |    Contact NF    Contacts en        Bobine              │
│   |    pour STOP     parallèle pour     moteur              │
│   |                  auto-maintien                          │
│                                                              │
│   Fonctionnement :                                          │
│   1. Appui START → MOTEUR = 1                               │
│   2. Relâche START → MOTEUR reste à 1 (auto-maintien)       │
│   3. Appui STOP → Coupe le courant → MOTEUR = 0            │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Pourquoi un contact NF pour STOP ?\n\nLe bouton STOP utilise un contact normalement fermé pour :\n\n1. **Sécurité** : Si le fil est coupé, le moteur s'arrête\n2. **Logique intuitive** : Appuyer sur STOP coupe le courant\n3. **Conformité** : Respect des normes de sécurité"
          },
          {
            type: "text",
            content: "## L'auto-maintien\n\nLe contact MOTEUR en parallèle avec START permet de **maintenir** l'alimentation de la bobine après avoir relâché le bouton START.\n\nC'est le principe du **relais à accrochage**."
          },
          {
            type: "info",
            content: "Ce circuit est la base de 90% des commandes de moteurs en industrie. Maîtrisez-le parfaitement !"
          }
        ]
      }),
    },
  })

  const lesson3_4 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Les temporisateurs",
      description: "Apprenez à utiliser les temporisateurs TON, TOF et TP",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Temporisateurs en LADDER\n\nLes temporisateurs permettent de créer des **délais** dans le programme."
          },
          {
            type: "text",
            content: "## TON - Temporisateur à l'enclenchement\n\n```\n   |     IN                        Q\n   |----[ ]----[TON T#5s]----( )---||\n```\n\n- La sortie Q passe à 1 **après 5 secondes** si IN reste à 1\n- Si IN repasse à 0 avant 5s, le timer se réinitialise\n- Utilisation : Délai avant démarrage, anti-rebond"
          },
          {
            type: "text",
            content: "## TOF - Temporisateur au déclenchement\n\n```\n   |     IN                        Q\n   |----[ ]----[TOF T#3s]----( )---||\n```\n\n- Q est à 1 tant que IN est à 1\n- Quand IN passe à 0, Q reste à 1 pendant **3 secondes**\n- Utilisation : Maintien d'une ventilation, éclairage retardé"
          },
          {
            type: "text",
            content: "## TP - Impulsion (Pulse)\n\n```\n   |     IN                        Q\n   |----[ ]----[TP T#2s]-----( )---||\n```\n\n- Q passe à 1 pendant **exactement 2 secondes** quand IN passe à 1\n- Utilisation : Signal d'impulsion, buzzer"
          },
          {
            type: "diagram",
            title: "Chronogrammes des temporisateurs",
            content: `┌─────────────────────────────────────────────────────────────┐
│               CHRONOGRAMMES DES TIMERS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TON (délai à l'enclenchement)                              │
│  IN  ____████████████____                                   │
│  Q   _________██████____     (délai avant activation)       │
│          ↑ PT  ↑                                            │
│                                                              │
│  TOF (délai au déclenchement)                               │
│  IN  ____████████________                                   │
│  Q   ____████████████____    (maintien après désactivation) │
│                  ↑ PT  ↑                                    │
│                                                              │
│  TP (impulsion)                                              │
│  IN  ____█_______________                                   │
│  Q   ____████____________    (impulsion de durée PT)        │
│          ↑ PT ↑                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      }),
    },
  })

  const lesson3_5 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Les compteurs",
      description: "Utilisez les compteurs CTU, CTD et CTUD",
      order: 5,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Compteurs en LADDER\n\nLes compteurs permettent de **compter** des événements (pièces, cycles, impulsions...)."
          },
          {
            type: "text",
            content: "## CTU - Compteur incrémental\n\n```\n   |     CU                        Q\n   |----[P]----[CTU PV:10]---( )---||\n   |     R                         |\n   |----[ ]----[RESET]             |\n```\n\n- Chaque front montant sur CU incrémente le compteur\n- Q = 1 quand CV ≥ PV (valeur présélectionnée)\n- R remet le compteur à zéro"
          },
          {
            type: "text",
            content: "## CTD - Compteur décrémental\n\n- Initialisé à PV\n- Chaque front montant sur CD décrémente\n- Q = 1 quand CV ≤ 0"
          },
          {
            type: "text",
            content: "## CTUD - Compteur bidirectionnel\n\n- CU incrémente\n- CD décrémente\n- QU = 1 si CV ≥ PV\n- QD = 1 si CV ≤ 0\n- R et LD pour reset et chargement"
          },
          {
            type: "text",
            content: "## Applications\n\n| Application | Type | Exemple |\n|-------------|------|----------|\n| Comptage de pièces | CTU | 100 pièces → alerte |\n| Dosage | CTD | 10 doses → stop |\n| Stock | CTUD | Entrées/sorties magasin |"
          }
        ]
      }),
    },
  })

  const lesson3_6 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Détection de fronts",
      description: "Détectez les fronts montants et descendants",
      order: 6,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Détection de Fronts\n\nUn **front** est le moment où un signal change d'état. La détection de front est essentielle pour réagir à un **événement** plutôt qu'à un état."
          },
          {
            type: "text",
            content: "## Front montant (Rising Edge)\n\n```\n   |     IN                         Q\n   |----[P]------------------------( )---||\n```\n\n- Q = 1 pendant **un seul cycle** quand IN passe de 0 à 1\n- Symbole : P ou R_TRIG"
          },
          {
            type: "text",
            content: "## Front descendant (Falling Edge)\n\n```\n   |     IN                         Q\n   |----[N]------------------------( )---||\n```\n\n- Q = 1 pendant **un seul cycle** quand IN passe de 1 à 0\n- Symbole : N ou F_TRIG"
          },
          {
            type: "diagram",
            title: "Chronogramme des fronts",
            content: `┌─────────────────────────────────────────────────────────────┐
│                 DÉTECTION DE FRONTS                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Signal IN                                                   │
│  _______████████████████_______██████______                 │
│         ↑              ↓       ↑     ↓                      │
│                                                              │
│  Front montant [P]                                          │
│  _______█_______________       █___________                 │
│         ↑ impulsion 1 cycle    ↑                           │
│                                                              │
│  Front descendant [N]                                       │
│  ________________█_____________      █_____                 │
│                  ↑ impulsion          ↑                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Applications\n\n- **Comptage** : Compter chaque appui sur un bouton (pas plusieurs fois)\n- **Démarrage** : Déclencher une séquence sur appui\n- **Bascule** : Inverser un état à chaque appui (toggle)"
          }
        ]
      }),
    },
  })

  const lesson3_7 = await prisma.lesson.create({
    data: {
      moduleId: module3.id,
      title: "Blocs fonctionnels et réutilisation",
      description: "Créez des blocs réutilisables pour structurer vos programmes",
      order: 7,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Blocs Fonctionnels et Réutilisation\n\nPour des programmes complexes, il est essentiel de **structurer** le code en blocs réutilisables."
          },
          {
            type: "text",
            content: "## Pourquoi structurer ?\n\n- **Lisibilité** : Code plus facile à comprendre\n- **Maintenance** : Modifications localisées\n- **Réutilisation** : Un bloc = plusieurs instances\n- **Test** : Chaque bloc peut être testé séparément"
          },
          {
            type: "text",
            content: "## Types de blocs (IEC 61131-3)\n\n| Type | Mémoire | Usage |\n|------|---------|-------|\n| **FC** (Function) | Non | Calculs, logique sans mémoire |\n| **FB** (Function Block) | Oui | Timer, compteur, régulateur |\n| **OB** (Organization Block) | - | Point d'entrée (Main, interruptions) |"
          },
          {
            type: "diagram",
            title: "Exemple de structuration",
            content: `┌─────────────────────────────────────────────────────────────┐
│              STRUCTURE D'UN PROGRAMME                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌────────────┐                           │
│                    │    OB1     │  Programme principal       │
│                    │   (Main)   │                           │
│                    └─────┬──────┘                           │
│                          │                                   │
│          ┌───────────────┼───────────────┐                  │
│          │               │               │                   │
│    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐           │
│    │ FB_Moteur │   │ FB_Vanne  │   │ FC_Alarme │           │
│    │ Instance1 │   │ Instance1 │   │           │           │
│    └───────────┘   └───────────┘   └───────────┘           │
│          │                                                   │
│    ┌─────┴─────┐                                            │
│    │ FB_Moteur │  Même bloc, autre instance                 │
│    │ Instance2 │                                            │
│    └───────────┘                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "Un FB est comme un 'modèle' : chaque instance a ses propres données mais partage le même code."
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

  const lesson4_2 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
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
      }),
    },
  })

  const lesson4_3 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
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
      }),
    },
  })

  const lesson4_4 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
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
      }),
    },
  })

  const lesson4_5 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
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
      }),
    },
  })

  const lesson4_6 = await prisma.lesson.create({
    data: {
      moduleId: module4.id,
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

  const lesson5_2 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Étapes et transitions",
      description: "Approfondissez la notation des étapes et transitions",
      order: 2,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Étapes et Transitions\n\nLes étapes et transitions sont les briques fondamentales du GRAFCET."
          },
          {
            type: "diagram",
            title: "Notation des étapes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    NOTATION DES ÉTAPES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Étape normale          Étape initiale        Étape active │
│   ┌─────┐                ╔═════╗              ┌─────┐       │
│   │  5  │                ║  0  ║              │  3  │ ●     │
│   └─────┘                ╚═════╝              └─────┘       │
│                          (double cadre)       (point = actif)│
│                                                              │
│   Avec actions associées :                                   │
│   ┌─────┬──────────────────────────┐                        │
│   │  5  │ Moteur_avant             │  Action continue       │
│   └─────┴──────────────────────────┘                        │
│                                                              │
│   ┌─────┬──────────────────────────┐                        │
│   │  6  │ C Voyant_vert            │  Action conditionnelle │
│   └─────┴──────────────────────────┘  (C = condition)       │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Types de transitions\n\n| Notation | Signification |\n|----------|---------------|\n| a | Front montant sur entrée a |\n| ↑a | Front montant explicite |\n| ↓a | Front descendant |\n| a · b | a ET b |\n| a + b | a OU b |\n| /a | NON a (a barre) |\n| t/5/3s | Temporisation : 3s après activation de l'étape 5 |"
          },
          {
            type: "text",
            content: "## Réceptivité toujours vraie\n\n```\n= 1\n```\nLa transition est **toujours franchissable** dès que l'étape précédente est active. Utilisé pour enchaîner des étapes sans condition."
          }
        ]
      }),
    },
  })

  const lesson5_3 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Les différents types d'actions",
      description: "Actions continues, conditionnelles, mémorisées et temporisées",
      order: 3,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Les Types d'Actions\n\nLes actions associées aux étapes peuvent être de plusieurs types selon leur comportement."
          },
          {
            type: "text",
            content: "## Action continue (par défaut)\n\n```\n┌─────┬──────────────┐\n│  5  │ Moteur       │\n└─────┴──────────────┘\n```\n\nL'action est **active tant que l'étape est active**. Dès que l'on quitte l'étape, l'action s'arrête."
          },
          {
            type: "text",
            content: "## Action conditionnelle\n\n```\n┌─────┬──────────────────────┐\n│  5  │ C capteur : Moteur   │\n└─────┴──────────────────────┘\n```\n\nL'action n'est active que si l'étape est active **ET** la condition est vraie."
          },
          {
            type: "text",
            content: "## Action mémorisée (SET/RESET)\n\n```\n┌─────┬──────────────┐\n│  5  │ S Vanne      │  ← SET (activation mémorisée)\n└─────┴──────────────┘\n\n┌─────┬──────────────┐\n│  8  │ R Vanne      │  ← RESET (désactivation)\n└─────┴──────────────┘\n```\n\nL'action **reste active** même après avoir quitté l'étape."
          },
          {
            type: "text",
            content: "## Actions temporisées\n\n| Notation | Description |\n|----------|-------------|\n| D t : Action | Action retardée (Delay) |\n| L t : Action | Action limitée (Limited) |\n| P : Action | Action impulsionnelle (Pulse) |"
          }
        ]
      }),
    },
  })

  const lesson5_4 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Divergences et convergences",
      description: "Gérez les séquences parallèles et les choix",
      order: 4,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Divergences et Convergences\n\nLe GRAFCET permet de représenter des **séquences parallèles** (ET) et des **choix alternatifs** (OU)."
          },
          {
            type: "diagram",
            title: "Les 4 structures de base",
            content: `┌─────────────────────────────────────────────────────────────┐
│            DIVERGENCES ET CONVERGENCES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DIVERGENCE EN OU           CONVERGENCE EN OU               │
│  (choix exclusif)           (fin de choix)                  │
│                                                              │
│      ┌─────┐                   ┌───┐    ┌───┐               │
│      │  1  │                   │ 2 │    │ 3 │               │
│      └──┬──┘                   └─┬─┘    └─┬─┘               │
│   ──────┼──────             ────┼────────┼────              │
│   │     │     │                 │        │                  │
│  ─┼─   ─┼─   ─┼─              ──┴────────┴──                │
│   a     b     c                     │                       │
│   │     │     │                    ─┼─                      │
│ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐                   d                       │
│ │ 2 │ │ 3 │ │ 4 │                   │                       │
│ └───┘ └───┘ └───┘               ┌───┴───┐                   │
│                                 │   4   │                   │
│                                 └───────┘                   │
│                                                              │
│  DIVERGENCE EN ET           CONVERGENCE EN ET               │
│  (parallélisme)             (synchronisation)               │
│                                                              │
│      ┌─────┐                ┌───┐        ┌───┐              │
│      │  1  │                │ 2 │        │ 3 │              │
│      └──┬──┘                └─┬─┘        └─┬─┘              │
│        ─┼─                   ─┼─          ─┼─               │
│         a                     a            b                │
│   ══════╪══════          ════╪════════════╪════            │
│   │     │     │               │            │               │
│ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐        ════╪════════════╪════            │
│ │ 2 │ │ 3 │ │ 4 │                   │                       │
│ └───┘ └───┘ └───┘              ┌────┴────┐                  │
│ (double barre)                 │    4    │                  │
│                                └─────────┘                  │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Règles importantes\n\n- **Divergence EN OU** : Une seule branche est activée (choix)\n- **Convergence EN OU** : On attend qu'une branche arrive\n- **Divergence EN ET** : Toutes les branches sont activées simultanément\n- **Convergence EN ET** : On attend que TOUTES les branches soient terminées"
          },
          {
            type: "warning",
            content: "En divergence OU, les conditions doivent être mutuellement exclusives pour éviter des ambiguïtés !"
          }
        ]
      }),
    },
  })

  const lesson5_5 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Macro-étapes et sous-programmes",
      description: "Structurez vos GRAFCET avec les macro-étapes",
      order: 5,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Macro-étapes et Sous-programmes\n\nPour les systèmes complexes, on utilise des **macro-étapes** pour regrouper des séquences."
          },
          {
            type: "diagram",
            title: "Représentation d'une macro-étape",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    MACRO-ÉTAPE                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   GRAFCET principal            Expansion de M1              │
│                                                              │
│      ┌─────┐                      ┌═════┐  E (étape entrée) │
│      │  1  │                      │ E1  │                   │
│      └──┬──┘                      └──┬──┘                   │
│        ─┼─                          ─┼─                     │
│         a                            a                      │
│   ╔═════╪═════╗                     │                       │
│   ║     M1    ║ ◄─────────────  ┌───┴───┐                  │
│   ╚═════╪═════╝                 │  10   │                   │
│        ─┼─                      └───┬───┘                   │
│         b                          ─┼─                      │
│      ┌──┴──┐                        b                       │
│      │  2  │                       │                        │
│      └─────┘                   ┌───┴───┐                    │
│                                │  11   │                    │
│   Macro-étape M1               └───┬───┘                    │
│   (contient une                    │                        │
│   séquence complète)          ┌════╪════┐ S (étape sortie) │
│                               │   S1    │                   │
│                               └═════════┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Avantages des macro-étapes\n\n1. **Lisibilité** : Le GRAFCET principal reste simple\n2. **Réutilisation** : Une macro peut être appelée plusieurs fois\n3. **Modularité** : Développement et test indépendants\n4. **Maintenance** : Modifications localisées"
          },
          {
            type: "text",
            content: "## Hiérarchie des GRAFCET\n\n| Niveau | Rôle |\n|--------|------|\n| GRAFCET de sécurité | Gère les arrêts d'urgence (prioritaire) |\n| GRAFCET de conduite | Modes de marche (auto, manu, init) |\n| GRAFCET de production | Séquence normale de travail |\n| GRAFCET de défaut | Gestion des pannes |"
          }
        ]
      }),
    },
  })

  const lesson5_6 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Traduction GRAFCET vers LADDER",
      description: "Convertissez un GRAFCET en programme automate",
      order: 6,
      xpReward: 90,
      duration: 22,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Traduction GRAFCET vers LADDER\n\nUne fois le GRAFCET conçu, il faut le **traduire** en langage automate (LADDER, ST, etc.)."
          },
          {
            type: "text",
            content: "## Méthode de traduction\n\n### 1. Variables d'étape\nChaque étape devient une **variable booléenne** (bit mémoire) :\n- Étape 0 → X0 ou M0\n- Étape 1 → X1 ou M1\n- etc."
          },
          {
            type: "diagram",
            title: "Traduction d'une étape simple",
            content: `┌─────────────────────────────────────────────────────────────┐
│           TRADUCTION GRAFCET → LADDER                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GRAFCET :                    LADDER :                       │
│                                                              │
│  ┌─────┐                      Activation de X1 :            │
│  │  0  │                      |    X0      a       X1       │
│  └──┬──┘                      |---[ ]----[ ]-----(S)---|    │
│    ─┼─                                                       │
│     a                         Désactivation de X1 :         │
│  ┌──┴──┐                      |    X1      b       X1       │
│  │  1  │                      |---[ ]----[ ]-----(R)---|    │
│  └──┬──┘                                                     │
│    ─┼─                        Ou méthode combinée :         │
│     b                         |    X0      a       X2       │
│  ┌──┴──┐                      |---[ ]----[ ]--+---(S)---|   │
│  │  2  │                      |              |          |   │
│  └─────┘                      |    X1       X1          |   │
│                               |---[/]------(R)---------|   │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Règle générale\n\n```\nActivation Xi : Xi-1 · transition · /Xi\nDésactivation Xi : Xi+1 (quand étape suivante s'active)\n```\n\nOu avec SET/RESET :\n- SET Xi quand on doit l'activer\n- RESET Xi quand l'étape suivante s'active"
          },
          {
            type: "text",
            content: "## Traduction des actions\n\n```\nAction continue dans étape 5 :\n|    X5         Moteur\n|---[ ]----------( )---||\n\nAction SET dans étape 5 :\n|    X5         Vanne\n|---[P]---------(S)---||\n```"
          }
        ]
      }),
    },
  })

  const lesson5_7 = await prisma.lesson.create({
    data: {
      moduleId: module5.id,
      title: "Exemple complet : système de remplissage",
      description: "Conception d'un GRAFCET de A à Z sur un cas réel",
      order: 7,
      xpReward: 95,
      duration: 25,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Exemple : Système de Remplissage\n\nConception complète d'un GRAFCET pour une station de remplissage de bouteilles."
          },
          {
            type: "text",
            content: "## Cahier des charges\n\nLa machine doit :\n1. Détecter la présence d'une bouteille (capteur `presence`)\n2. Ouvrir la vanne de remplissage (`vanne`)\n3. Remplir pendant 3 secondes\n4. Fermer la vanne\n5. Évacuer la bouteille (vérin `evacuation`)\n6. Attendre le retour du vérin (`verin_rentre`)\n7. Recommencer"
          },
          {
            type: "diagram",
            title: "GRAFCET de la station de remplissage",
            content: `┌─────────────────────────────────────────────────────────────┐
│        GRAFCET STATION DE REMPLISSAGE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ╔═════╗                                                   │
│    ║  0  ║  Attente                                         │
│    ╚══╤══╝                                                   │
│      ─┼─                                                     │
│    presence · dcy                                            │
│       │                                                      │
│    ┌──┴──┬───────────────┐                                  │
│    │  1  │ Vanne         │  Remplissage                     │
│    └──┬──┴───────────────┘                                  │
│      ─┼─                                                     │
│    t/1/3s                                                    │
│       │                                                      │
│    ┌──┴──┬───────────────┐                                  │
│    │  2  │ Evacuation    │  Pousser bouteille               │
│    └──┬──┴───────────────┘                                  │
│      ─┼─                                                     │
│    verin_sorti                                               │
│       │                                                      │
│    ┌──┴──┐                                                   │
│    │  3  │  Retour vérin                                    │
│    └──┬──┘                                                   │
│      ─┼─                                                     │
│    verin_rentre                                              │
│       │                                                      │
│       └─────────────────────────────────▶ retour étape 0    │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Table des E/S\n\n| Adresse | Nom | Type | Description |\n|---------|-----|------|-------------|\n| I0.0 | presence | Entrée | Capteur présence bouteille |\n| I0.1 | dcy | Entrée | Bouton départ cycle |\n| I0.2 | verin_sorti | Entrée | Fin de course vérin sorti |\n| I0.3 | verin_rentre | Entrée | Fin de course vérin rentré |\n| Q0.0 | vanne | Sortie | Électrovanne remplissage |\n| Q0.1 | evacuation | Sortie | Vérin évacuation |"
          },
          {
            type: "info",
            content: "Ce type de GRAFCET simple est le point de départ. En production réelle, on ajouterait la gestion des modes (auto/manu), les défauts et les sécurités."
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

  const lesson6_3 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: "Sécurité sur machines CNC",
      description: "Les règles essentielles de sécurité en environnement CNC",
      order: 3,
      xpReward: 65,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sécurité sur machines CNC\n\nLes machines CNC sont des équipements puissants qui nécessitent le respect strict des règles de sécurité."
          },
          {
            type: "warning",
            content: "Ne jamais intervenir sur une machine en fonctionnement ! Les mouvements rapides peuvent causer des blessures graves."
          },
          {
            type: "text",
            content: "## Équipements de Protection Individuelle (EPI)\n\n- **Lunettes de sécurité** : Protection contre les projections de copeaux\n- **Chaussures de sécurité** : Protection contre les chutes d'objets\n- **Vêtements ajustés** : Éviter les vêtements amples qui peuvent se prendre dans les machines\n- **Protection auditive** : Dans les environnements bruyants"
          },
          {
            type: "text",
            content: "## Zones de danger\n\n| Zone | Risque | Précaution |\n|------|--------|------------|\n| Broche | Rotation rapide | Ne jamais approcher les mains |\n| Table | Mouvements soudains | Rester à distance |\n| Changeur d'outil | Pincement | Zone interdite en marche |\n| Copeaux | Coupures, brûlures | Utiliser un crochet pour les retirer |"
          },
          {
            type: "info",
            content: "Toujours effectuer un essai à vide (dry run) avant d'usiner une nouvelle pièce pour vérifier le programme."
          }
        ]
      }),
    },
  })

  const lesson6_4 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: "Matériaux et outils de coupe",
      description: "Comprendre les matériaux usinables et les outils adaptés",
      order: 4,
      xpReward: 70,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Matériaux et outils de coupe\n\nLe choix de l'outil de coupe dépend du matériau à usiner et des conditions d'usinage."
          },
          {
            type: "text",
            content: "## Matériaux courants\n\n### Métaux\n- **Aluminium** : Facile à usiner, vitesses élevées possibles\n- **Acier doux** : Vitesses moyennes, bon état de surface\n- **Acier inoxydable** : Plus difficile, vitesses réduites\n- **Titane** : Très difficile, outils spéciaux nécessaires"
          },
          {
            type: "text",
            content: "### Autres matériaux\n- **Plastiques** : Attention à la chaleur (fusion)\n- **Bois** : Vitesses élevées, poussière\n- **Composites** : Outils spéciaux (diamant)"
          },
          {
            type: "text",
            content: "## Types d'outils\n\n| Outil | Application |\n|-------|-------------|\n| Fraise en bout | Surfaçage, rainurage |\n| Fraise boule | Contournage 3D |\n| Foret | Perçage |\n| Taraud | Filetage intérieur |\n| Alésoir | Finition de trous précis |"
          },
          {
            type: "diagram",
            title: "Paramètres de coupe",
            content: `┌─────────────────────────────────────────────────────────┐
│              PARAMÈTRES DE COUPE                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Vc = Vitesse de coupe (m/min)                        │
│   ────────────────────────────                          │
│   Dépend du matériau outil + matériau pièce            │
│                                                         │
│   N = (Vc × 1000) / (π × D)                            │
│   ───────────────────────────                           │
│   N = Vitesse broche (tr/min)                          │
│   D = Diamètre outil (mm)                               │
│                                                         │
│   Vf = N × fz × Z                                       │
│   ─────────────────                                     │
│   Vf = Vitesse avance (mm/min)                         │
│   fz = Avance par dent (mm)                            │
│   Z = Nombre de dents                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘`
          }
        ]
      }),
    },
  })

  const lesson6_5 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: "Préparation d'une pièce",
      description: "Les étapes pour préparer et monter une pièce sur la machine",
      order: 5,
      xpReward: 70,
      duration: 15,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Préparation d'une pièce\n\nLa préparation correcte de la pièce est essentielle pour un usinage réussi."
          },
          {
            type: "text",
            content: "## Étapes de préparation\n\n1. **Analyser le dessin technique** : Dimensions, tolérances, état de surface\n2. **Choisir le brut** : Dimensions suffisantes pour la pièce finale\n3. **Sélectionner le montage** : Étau, mandrin, bridage\n4. **Définir l'origine pièce** : Point de référence pour le programme\n5. **Préparer les outils** : Mesurer et charger dans le magasin"
          },
          {
            type: "text",
            content: "## Systèmes de bridage\n\n### Étau de précision\nIdéal pour les pièces rectangulaires. S'assurer du parallélisme avec les axes.\n\n### Mandrin 3 mors\nPour les pièces cylindriques sur tour.\n\n### Bridage direct\nBrides et vis pour pièces complexes ou grandes."
          },
          {
            type: "warning",
            content: "Un bridage insuffisant peut entraîner l'éjection de la pièce ! Toujours vérifier le serrage avant l'usinage."
          },
          {
            type: "info",
            content: "Laisser une surépaisseur de 2-3 mm sur le brut pour les opérations de finition et les imprécisions de bridage."
          }
        ]
      }),
    },
  })

  const lesson6_6 = await prisma.lesson.create({
    data: {
      moduleId: module6.id,
      title: "Origines et décalages",
      description: "Comprendre les systèmes d'origine machine et pièce",
      order: 6,
      xpReward: 75,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Origines et décalages\n\nLa gestion des origines est fondamentale pour positionner correctement l'outil par rapport à la pièce."
          },
          {
            type: "diagram",
            title: "Systèmes d'origine",
            content: `┌─────────────────────────────────────────────────────────┐
│                    TABLE MACHINE                         │
│                                                          │
│    M ──────────────────────────────────────────────► X   │
│    │                                                     │
│    │     ┌─────────────────┐                            │
│    │     │                 │                            │
│    │     │   W ───────► x  │  ← Pièce                   │
│    │     │   │             │                            │
│    │     │   ▼ y           │                            │
│    │     │   Origine pièce │                            │
│    │     └─────────────────┘                            │
│    │                                                     │
│    ▼ Y                                                   │
│                                                          │
│    M = Origine machine (fixe)                           │
│    W = Origine pièce (programmable)                     │
└─────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Types d'origines\n\n| Origine | Code | Description |\n|---------|------|-------------|\n| Machine | G53 | Point de référence fixe de la machine |\n| Pièce | G54-G59 | Décalages programmables (jusqu'à 6) |\n| Locale | G52 | Décalage temporaire additionnel |"
          },
          {
            type: "text",
            content: "## Prise d'origine pièce\n\n### Avec palpeur\nLa méthode la plus précise. Le palpeur touche la pièce et enregistre la position.\n\n### Manuel (papier)\nGlisser une feuille de papier entre l'outil et la pièce. Moins précis mais rapide.\n\n### Comparateur\nPour l'alignement de pièces existantes."
          },
          {
            type: "info",
            content: "Les décalages d'origine sont stockés dans une table de la machine et persistent après l'arrêt."
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

  const lesson7_3 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: "Cycles préprogrammés",
      description: "Utiliser les cycles de perçage, taraudage et poches",
      order: 3,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Cycles préprogrammés (Canned Cycles)\n\nLes cycles préprogrammés simplifient la programmation d'opérations répétitives comme le perçage."
          },
          {
            type: "text",
            content: "## Cycles de perçage\n\n| Code | Cycle | Description |\n|------|-------|-------------|\n| G81 | Perçage simple | Plongée puis remontée rapide |\n| G82 | Perçage avec temporisation | Pause au fond du trou |\n| G83 | Perçage avec débourrage | Évacuation des copeaux |\n| G84 | Taraudage | Filetage intérieur |\n| G85 | Alésage | Finition de trous |"
          },
          {
            type: "text",
            content: "## Exemple G83 (Débourrage)\n\n```gcode\nG83 X50 Y30 Z-25 R2 Q5 F100\n```\n\n- **X, Y** : Position du trou\n- **Z** : Profondeur finale\n- **R** : Plan de retrait\n- **Q** : Profondeur de chaque passe\n- **F** : Vitesse d'avance"
          },
          {
            type: "diagram",
            title: "Cycle de débourrage G83",
            content: `┌─────────────────────────────────────────────┐
│          CYCLE G83 - DÉBOURRAGE             │
├─────────────────────────────────────────────┤
│                                             │
│    R=2 ─────────────────── Plan retrait     │
│         │   │   │   │                       │
│    Z=0  │   │   │   │  Surface pièce        │
│         ▼   │   │   │                       │
│    -5   ●   │   │   │  Passe 1 (Q=5)        │
│             ▼   │   │                       │
│    -10      ●   │   │  Passe 2              │
│                 ▼   │                       │
│    -15          ●   │  Passe 3              │
│                     ▼                       │
│    -25              ●  Profondeur finale    │
│                                             │
│    Remontée rapide entre chaque passe       │
│                                             │
└─────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "G80 annule tous les cycles actifs. Toujours terminer une série de perçages par G80."
          }
        ]
      }),
    },
  })

  const lesson7_4 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: "Sous-programmes et répétitions",
      description: "Organiser le code avec des sous-programmes et boucles",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sous-programmes et répétitions\n\nLes sous-programmes permettent de réutiliser du code et de simplifier les programmes complexes."
          },
          {
            type: "text",
            content: "## Appel de sous-programme\n\n```gcode\n; Programme principal\nN10 G0 X0 Y0\nN20 M98 P1000 L4  ; Appel du sous-prog 1000, 4 fois\nN30 M30\n\n; Sous-programme 1000\nO1000\nN100 G1 X10 F100\nN110 G1 Y10\nN120 G1 X0\nN130 G1 Y0\nN140 M99  ; Retour au programme principal\n```"
          },
          {
            type: "text",
            content: "## Syntaxe selon les contrôleurs\n\n| Contrôleur | Appel | Définition | Retour |\n|------------|-------|------------|--------|\n| Fanuc | M98 P | O | M99 |\n| Siemens | CALL | PROC | RET |\n| Heidenhain | CALL LBL | LBL | LBL 0 |"
          },
          {
            type: "text",
            content: "## Avantages\n\n- **Réduction du code** : Éviter les répétitions\n- **Lisibilité** : Programme principal simplifié\n- **Maintenance** : Modifier à un seul endroit\n- **Modularité** : Réutiliser entre programmes"
          },
          {
            type: "warning",
            content: "Attention à la profondeur d'imbrication ! Trop de sous-programmes appelant d'autres sous-programmes peut causer des erreurs."
          }
        ]
      }),
    },
  })

  const lesson7_5 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: "Compensation d'outil",
      description: "Comprendre et utiliser la compensation de rayon d'outil",
      order: 5,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Compensation d'outil\n\nLa compensation d'outil permet de programmer le contour de la pièce plutôt que la trajectoire du centre de l'outil."
          },
          {
            type: "diagram",
            title: "Compensation de rayon",
            content: `┌─────────────────────────────────────────────────────────┐
│              COMPENSATION DE RAYON                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│     Sans compensation        Avec compensation G41       │
│                                                          │
│     ┌───────────────┐       ┌───────────────┐           │
│     │               │       │               │           │
│     │    ───●───    │       │    ─────────  │ ← Contour │
│     │    Centre     │       │  ●            │   pièce   │
│     │    outil      │       │  │ Outil      │           │
│     │               │       │  │ décalé     │           │
│     └───────────────┘       └───────────────┘           │
│                                                          │
│     Erreur = rayon outil    Contour exact               │
│                                                          │
└─────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Codes de compensation\n\n| Code | Fonction |\n|------|----------|\n| G40 | Annulation de compensation |\n| G41 | Compensation à gauche (outil à gauche du contour) |\n| G42 | Compensation à droite (outil à droite du contour) |\n| G43 | Compensation de longueur d'outil (Z) |"
          },
          {
            type: "text",
            content: "## Exemple\n\n```gcode\nG0 X-10 Y0      ; Position d'approche\nG41 D1          ; Activer compensation, outil D1\nG1 X0 Y0 F200   ; Entrée en matière\nG1 X100         ; Usinage du contour\nG1 Y50\nG1 X0\nG1 Y0\nG40             ; Annuler compensation\nG0 X-10         ; Dégagement\n```"
          },
          {
            type: "warning",
            content: "Toujours activer/désactiver la compensation sur un mouvement linéaire (G1), jamais sur un arc (G2/G3) !"
          }
        ]
      }),
    },
  })

  const lesson7_6 = await prisma.lesson.create({
    data: {
      moduleId: module7.id,
      title: "Exemple complet : usinage d'une poche",
      description: "Programmation pas à pas d'une poche rectangulaire",
      order: 6,
      xpReward: 90,
      duration: 22,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Exemple : Usinage d'une poche rectangulaire\n\nCet exemple montre la programmation complète d'une poche 80×50 mm, profondeur 10 mm."
          },
          {
            type: "text",
            content: "## Données de la pièce\n\n- Poche : 80 × 50 mm\n- Profondeur : 10 mm\n- Coin inférieur gauche : X10, Y10\n- Outil : Fraise Ø10 mm\n- Matériau : Aluminium"
          },
          {
            type: "text",
            content: "## Programme complet\n\n```gcode\n%\nO0001 (POCHE RECTANGULAIRE)\n(Outil: Fraise D10)\n(Materiau: Aluminium)\n\nN10 G21 G90 G40     (Metrique, absolu, sans comp.)\nN20 G54             (Origine piece)\nN30 T1 M6           (Outil 1)\nN40 S3000 M3        (Broche 3000 tr/min)\nN50 G43 H1 Z50      (Comp. longueur, securite)\n\n(Passe 1: Z-3)\nN60 G0 X15 Y15      (Position depart)\nN70 G0 Z2           (Approche rapide)\nN80 G1 Z-3 F100     (Plongee)\nN90 G1 X85 F500     (Usinage)\nN100 G1 Y55\nN110 G1 X15\nN120 G1 Y15\n\n(Passe 2: Z-6)\nN130 G1 Z-6 F100\nN140 G1 X85 F500\nN150 G1 Y55\nN160 G1 X15\nN170 G1 Y15\n\n(Passe 3: Z-10)\nN180 G1 Z-10 F100\nN190 G1 X85 F500\nN200 G1 Y55\nN210 G1 X15\nN220 G1 Y15\n\n(Fin)\nN230 G0 Z50         (Degagement)\nN240 M5             (Broche OFF)\nN250 G28            (Retour origine)\nN260 M30            (Fin programme)\n%\n```"
          },
          {
            type: "info",
            content: "En production, on utiliserait un cycle de poche automatique (G73 sur certains contrôleurs) plutôt que cette programmation manuelle."
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

  const lesson8_3 = await prisma.lesson.create({
    data: {
      moduleId: module8.id,
      title: "Mode absolu vs incrémental",
      description: "Comprendre les deux modes de positionnement G90 et G91",
      order: 3,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Mode absolu vs incrémental\n\nLes deux modes de programmation définissent comment les coordonnées sont interprétées."
          },
          {
            type: "text",
            content: "## Mode absolu (G90)\n\nLes coordonnées sont relatives à l'origine pièce.\n\n```gcode\nG90              ; Mode absolu\nG0 X0 Y0         ; Aller à l'origine\nG1 X50 Y30 F100  ; Aller à X=50, Y=30\nG1 X100 Y60      ; Aller à X=100, Y=60\n```\n\nChaque position est définie par rapport au point 0,0."
          },
          {
            type: "text",
            content: "## Mode incrémental (G91)\n\nLes coordonnées sont relatives à la position actuelle.\n\n```gcode\nG91              ; Mode incrémental\nG0 X0 Y0         ; Rester sur place\nG1 X50 Y30 F100  ; Avancer de 50 en X, 30 en Y\nG1 X50 Y30       ; Encore +50 en X, +30 en Y\n```\n\nChaque mouvement s'ajoute au précédent."
          },
          {
            type: "diagram",
            title: "Comparaison des modes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    ABSOLU (G90)                              │
│                                                              │
│     Y                         Y                              │
│     ▲                         ▲                              │
│  60 │        ●B               │  B = (100, 60)               │
│     │       /                 │                              │
│  30 │   ●A─                   │  A = (50, 30)                │
│     │  /                      │                              │
│   0 └──●───────────► X        │  Coordonnées absolues        │
│        0   50  100            │                              │
├─────────────────────────────────────────────────────────────┤
│                  INCRÉMENTAL (G91)                           │
│                                                              │
│     Y                         Y                              │
│     ▲                         ▲                              │
│  60 │        ●B               │  B = A + (50, 30)            │
│     │       ↗                 │                              │
│  30 │   ●A─  +50,+30          │  A = 0 + (50, 30)            │
│     │  ↗ +50,+30              │                              │
│   0 └──●───────────► X        │  Déplacements relatifs       │
│        0   50  100            │                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "Le mode absolu est recommandé pour la plupart des programmes. Le mode incrémental est utile pour les sous-programmes réutilisables."
          }
        ]
      }),
    },
  })

  const lesson8_4 = await prisma.lesson.create({
    data: {
      moduleId: module8.id,
      title: "Sélection du plan de travail",
      description: "Choisir le plan d'interpolation circulaire G17, G18, G19",
      order: 4,
      xpReward: 70,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Sélection du plan de travail\n\nLe plan de travail détermine quels axes sont utilisés pour les interpolations circulaires."
          },
          {
            type: "text",
            content: "## Les trois plans\n\n| Code | Plan | Axes | Axe perpendiculaire |\n|------|------|------|---------------------|\n| G17 | XY | X, Y | Z (outil) |\n| G18 | XZ | X, Z | Y |\n| G19 | YZ | Y, Z | X |"
          },
          {
            type: "diagram",
            title: "Plans de travail",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    PLANS DE TRAVAIL                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    G17 (Plan XY)       G18 (Plan XZ)       G19 (Plan YZ)    │
│                                                              │
│        Z               Y                   X                 │
│        │               │                   │                 │
│        │  Y            │  Z                │  Z              │
│        │ /             │ /                 │ /               │
│        │/              │/                  │/                │
│        └────── X       └────── X           └────── Y         │
│                                                              │
│    Arc dans XY     Arc dans XZ         Arc dans YZ          │
│    Z = profondeur  Y = profondeur      X = profondeur       │
│                                                              │
│    Usinage 2.5D    Tournage            Usinage latéral      │
│    Fraiseuse       Tour CNC            Centre d'usinage     │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Exemple d'arc dans différents plans\n\n```gcode\nG17              ; Plan XY (défaut fraiseuse)\nG2 X50 Y50 I25 J0  ; Arc dans le plan XY\n\nG18              ; Plan XZ\nG2 X50 Z-10 I25 K0 ; Arc dans le plan XZ\n\nG19              ; Plan YZ\nG2 Y50 Z-10 J25 K0 ; Arc dans le plan YZ\n```"
          },
          {
            type: "warning",
            content: "G17 est le plan par défaut sur les fraiseuses. Oublier de le spécifier peut causer des mouvements inattendus si le programme précédent utilisait un autre plan."
          }
        ]
      }),
    },
  })

  const lesson8_5 = await prisma.lesson.create({
    data: {
      moduleId: module8.id,
      title: "Machines multi-axes",
      description: "Introduction aux machines 4 et 5 axes",
      order: 5,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Machines multi-axes\n\nLes machines 4 et 5 axes ajoutent des axes de rotation pour usiner des pièces complexes."
          },
          {
            type: "text",
            content: "## Axes supplémentaires\n\n| Axe | Rotation autour de | Utilisation |\n|-----|-------------------|-------------|\n| A | Axe X | Rotation de la pièce ou de la broche |\n| B | Axe Y | Inclinaison de la broche |\n| C | Axe Z | Rotation de la table |"
          },
          {
            type: "diagram",
            title: "Configuration 5 axes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    MACHINE 5 AXES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    Broche                                    │
│                      │                                       │
│                   ┌──┴──┐  ← Axe B (inclinaison)            │
│                   │     │                                    │
│                   │  ●  │  Outil                            │
│                   └─────┘                                    │
│                      │                                       │
│                      Z                                       │
│                      │                                       │
│            Y ◄───────┼───────► X                            │
│                      │                                       │
│              ┌───────┴───────┐                              │
│              │               │  ← Table rotative            │
│              │    Pièce      │    Axe C (rotation)          │
│              │      ◎       │    Axe A (basculement)       │
│              └───────────────┘                              │
│                                                              │
│    5 axes = X + Y + Z + 2 rotations (A/B/C)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Avantages du 5 axes\n\n- **Usinage complet** : Pièce finie en un seul montage\n- **Accès difficile** : Usinage de cavités profondes\n- **Qualité** : Meilleur état de surface (outil toujours perpendiculaire)\n- **Productivité** : Réduction des opérations"
          },
          {
            type: "info",
            content: "La programmation 5 axes est complexe et utilise généralement des logiciels FAO (Fabrication Assistée par Ordinateur) pour générer le G-code."
          }
        ]
      }),
    },
  })

  const lesson8_6 = await prisma.lesson.create({
    data: {
      moduleId: module8.id,
      title: "Vitesses et avances optimales",
      description: "Calculer les paramètres de coupe adaptés",
      order: 6,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Vitesses et avances optimales\n\nLe choix des paramètres de coupe est crucial pour la qualité et la durée de vie des outils."
          },
          {
            type: "text",
            content: "## Formules de base\n\n### Vitesse de broche (N)\n```\nN = (Vc × 1000) / (π × D)\n```\n- N : Vitesse en tr/min\n- Vc : Vitesse de coupe en m/min\n- D : Diamètre outil en mm\n\n### Vitesse d'avance (Vf)\n```\nVf = N × fz × Z\n```\n- Vf : Avance en mm/min\n- fz : Avance par dent en mm\n- Z : Nombre de dents"
          },
          {
            type: "text",
            content: "## Tableau des vitesses de coupe\n\n| Matériau pièce | Outil HSS | Outil carbure |\n|----------------|-----------|---------------|\n| Aluminium | 150-300 m/min | 300-1000 m/min |\n| Acier doux | 25-40 m/min | 80-150 m/min |\n| Acier inox | 15-25 m/min | 50-100 m/min |\n| Laiton | 100-200 m/min | 200-500 m/min |\n| Plastique | 100-500 m/min | 200-1000 m/min |"
          },
          {
            type: "text",
            content: "## Exemple de calcul\n\n**Données :**\n- Matériau : Aluminium (Vc = 300 m/min)\n- Fraise Ø10 mm, 3 dents\n- Avance par dent : 0.05 mm\n\n**Calculs :**\n```\nN = (300 × 1000) / (3.14 × 10) = 9550 tr/min\nVf = 9550 × 0.05 × 3 = 1433 mm/min\n```\n\n**Programme :**\n```gcode\nS9550 M3     ; Broche 9550 tr/min\nG1 X100 F1433 ; Avance 1433 mm/min\n```"
          },
          {
            type: "warning",
            content: "Ces valeurs sont des points de départ. Ajustez selon l'état de la machine, la rigidité du montage et l'état de surface souhaité."
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

  const lesson9_3 = await prisma.lesson.create({
    data: {
      moduleId: module9.id,
      title: "Gamme S7-1500 : choisir sa CPU",
      description: "Comprendre les différentes CPU de la gamme S7-1500",
      order: 3,
      xpReward: 65,
      duration: 14,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Gamme S7-1500 : choisir sa CPU\n\nLa gamme S7-1500 propose de nombreuses CPU adaptées à différents besoins."
          },
          {
            type: "text",
            content: "## Catégories de CPU\n\n| Gamme | CPU | Performance | Usage |\n|-------|-----|-------------|-------|\n| Standard | 1511-1 PN | Entrée de gamme | Petites machines |\n| Standard | 1513-1 PN | Moyenne | Machines moyennes |\n| Standard | 1515-2 PN | Haute | Lignes de production |\n| Standard | 1516-3 PN/DP | Très haute | Systèmes complexes |\n| Standard | 1518-4 PN/DP | Premium | Grandes installations |"
          },
          {
            type: "text",
            content: "## Versions spéciales\n\n### CPU Compactes (C)\n- 1511C, 1512C : Entrées/sorties intégrées\n- Idéales pour petites applications autonomes\n\n### CPU Failsafe (F)\n- 1511F, 1513F, 1515F, 1516F, 1518F\n- Fonctions de sécurité intégrées (SIL 3 / PL e)\n- Pour applications où la sécurité est critique\n\n### CPU Technologie (T)\n- 1511T, 1515T, 1516T, 1517T, 1518T\n- Motion Control avancé intégré\n- Pilotage d'axes synchronisés"
          },
          {
            type: "info",
            content: "Siemens propose un outil de sélection en ligne pour vous aider à choisir la CPU adaptée à votre application."
          }
        ]
      }),
    },
  })

  const lesson9_4 = await prisma.lesson.create({
    data: {
      moduleId: module9.id,
      title: "Modules d'entrées/sorties",
      description: "Les modules d'E/S pour le S7-1500",
      order: 4,
      xpReward: 70,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Modules d'entrées/sorties S7-1500\n\nLes modules d'E/S permettent de connecter capteurs et actionneurs à l'automate."
          },
          {
            type: "text",
            content: "## Modules d'entrées numériques (DI)\n\n| Référence | Points | Tension | Particularité |\n|-----------|--------|---------|---------------|\n| DI 16×24VDC | 16 | 24V DC | Standard |\n| DI 32×24VDC | 32 | 24V DC | Haute densité |\n| DI 16×24VDC HF | 16 | 24V DC | Haute fréquence |\n| DI 8×NAMUR | 8 | NAMUR | Zones Ex |"
          },
          {
            type: "text",
            content: "## Modules de sorties numériques (DO)\n\n| Référence | Points | Type | Courant max |\n|-----------|--------|------|-------------|\n| DQ 16×24VDC/0.5A | 16 | Transistor | 0.5A |\n| DQ 32×24VDC/0.5A | 32 | Transistor | 0.5A |\n| DQ 8×24VDC/2A | 8 | Transistor | 2A |\n| DQ 8×Relay | 8 | Relais | 2A AC/DC |"
          },
          {
            type: "text",
            content: "## Modules analogiques\n\n### Entrées analogiques (AI)\n- AI 8×U/I : 8 voies tension/courant\n- AI 4×U/I/RTD/TC : 4 voies multifonction (PT100, thermocouple)\n\n### Sorties analogiques (AO)\n- AQ 4×U/I : 4 sorties tension/courant\n- AQ 8×U/I : 8 sorties haute densité"
          },
          {
            type: "diagram",
            title: "Configuration typique",
            content: `┌─────────────────────────────────────────────────────────────┐
│              CONFIGURATION S7-1500 TYPIQUE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ CPU  │ │ DI   │ │ DI   │ │ DQ   │ │ AI   │ │ AQ   │     │
│  │1515-2│ │ 32   │ │ 16   │ │ 16   │ │ 8    │ │ 4    │     │
│  │  PN  │ │24VDC │ │24VDC │ │24VDC │ │ U/I  │ │ U/I  │     │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘     │
│     │        │        │        │        │        │          │
│     └────────┴────────┴────────┴────────┴────────┘          │
│                        Rail DIN                              │
│                                                              │
│  Total : 48 DI + 16 DQ + 8 AI + 4 AQ                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          }
        ]
      }),
    },
  })

  const lesson9_5 = await prisma.lesson.create({
    data: {
      moduleId: module9.id,
      title: "Communication PROFINET",
      description: "Comprendre le réseau industriel PROFINET",
      order: 5,
      xpReward: 75,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Communication PROFINET\n\n**PROFINET** est le réseau industriel Ethernet de Siemens, intégré nativement dans le S7-1500."
          },
          {
            type: "text",
            content: "## Caractéristiques\n\n- **Base** : Ethernet standard (IEEE 802.3)\n- **Vitesse** : 100 Mbit/s ou 1 Gbit/s\n- **Temps de cycle** : < 1 ms (IRT)\n- **Topologies** : Étoile, ligne, anneau"
          },
          {
            type: "text",
            content: "## Classes de performance\n\n| Classe | Temps cycle | Usage |\n|--------|-------------|-------|\n| RT (Real-Time) | 1-10 ms | Automatisation standard |\n| IRT (Isochronous RT) | < 1 ms | Motion Control, synchronisation |\n| NRT (Non Real-Time) | > 10 ms | Données non critiques |"
          },
          {
            type: "diagram",
            title: "Topologie PROFINET",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    RÉSEAU PROFINET                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              ┌──────────────────────┐                       │
│              │     SWITCH SCALANCE  │                       │
│              └──────────┬───────────┘                       │
│                         │                                    │
│         ┌───────────────┼───────────────┐                   │
│         │               │               │                   │
│    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐              │
│    │  S7-1500 │    │   IHM   │    │ ET 200SP │              │
│    │Contrôleur│    │  Panel  │    │ E/S dist.│              │
│    └────┬────┘    └─────────┘    └────┬────┘              │
│         │                             │                      │
│    ┌────┴────┐                   ┌────┴────┐              │
│    │Variateur│                   │ Robot   │              │
│    │SINAMICS │                   │ KUKA    │              │
│    └─────────┘                   └─────────┘              │
│                                                              │
│    Tous les appareils communiquent sur le même réseau       │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "info",
            content: "PROFINET est compatible avec les protocoles IT standards (TCP/IP, HTTP, FTP) pour l'intégration aux systèmes d'information."
          }
        ]
      }),
    },
  })

  const lesson9_6 = await prisma.lesson.create({
    data: {
      moduleId: module9.id,
      title: "Diagnostic et maintenance",
      description: "Outils de diagnostic intégrés au S7-1500",
      order: 6,
      xpReward: 70,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Diagnostic et maintenance\n\nLe S7-1500 offre des fonctionnalités de diagnostic avancées pour faciliter la maintenance."
          },
          {
            type: "text",
            content: "## Écran intégré de la CPU\n\nL'écran de la CPU affiche :\n- État de fonctionnement (RUN/STOP)\n- Adresse IP\n- Nom du projet\n- Diagnostics et erreurs\n- Heure et date"
          },
          {
            type: "text",
            content: "## Buffer de diagnostic\n\nLe buffer de diagnostic enregistre automatiquement :\n- Changements d'état (démarrage, arrêt)\n- Défauts matériels\n- Erreurs de programme\n- Défaillances réseau\n- Messages utilisateur personnalisés"
          },
          {
            type: "text",
            content: "## Serveur Web intégré\n\nAccessible via navigateur à l'adresse IP de la CPU :\n\n| Page | Contenu |\n|------|--------|\n| Vue d'ensemble | État général, CPU info |\n| Diagnostic | Buffer, alarmes actives |\n| Variables | Lecture/écriture de tags |\n| Messages | Historique des messages |\n| Fichiers | Accès aux fichiers de données |"
          },
          {
            type: "info",
            content: "Le serveur Web est désactivé par défaut pour des raisons de sécurité. Activez-le dans TIA Portal si nécessaire."
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

  const lesson10_3 = await prisma.lesson.create({
    data: {
      moduleId: module10.id,
      title: "Variables et types de données",
      description: "Déclarer et utiliser les variables dans TIA Portal",
      order: 3,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Variables et types de données\n\nLes variables (tags) permettent de donner des noms symboliques aux adresses mémoire."
          },
          {
            type: "text",
            content: "## Types de données élémentaires\n\n| Type | Taille | Plage | Exemple |\n|------|--------|-------|--------|\n| Bool | 1 bit | TRUE/FALSE | Capteur_Presence |\n| Byte | 8 bits | 0-255 | Code_Erreur |\n| Int | 16 bits | -32768 à 32767 | Compteur_Pieces |\n| DInt | 32 bits | ±2 milliards | Total_Production |\n| Real | 32 bits | Décimaux | Temperature |\n| Time | 32 bits | T#0ms à T#24d | Temps_Cycle |\n| String | Variable | Texte | Nom_Produit |"
          },
          {
            type: "text",
            content: "## Tables de variables\n\n### Variables API (PLC Tags)\nVariables globales accessibles depuis tout le programme.\n\n### Variables locales\nVariables internes à un bloc (FC, FB), non accessibles depuis l'extérieur.\n\n### Constantes\nValeurs fixes qui ne changent pas pendant l'exécution."
          },
          {
            type: "text",
            content: "## Exemple de déclaration\n\n```\nNom              Type    Adresse    Commentaire\n─────────────────────────────────────────────────\nBouton_Demarrage Bool    %I0.0      Bouton START\nBouton_Arret     Bool    %I0.1      Bouton STOP\nMoteur_Marche    Bool    %Q0.0      Sortie moteur\nVitesse_Consigne Int     %MW10      Vitesse en tr/min\nTemperature      Real    %MD20      Température °C\n```"
          },
          {
            type: "info",
            content: "Utilisez toujours des noms symboliques plutôt que des adresses absolues. Cela rend le programme plus lisible et plus facile à maintenir."
          }
        ]
      }),
    },
  })

  const lesson10_4 = await prisma.lesson.create({
    data: {
      moduleId: module10.id,
      title: "Instructions LAD de base",
      description: "Les instructions fondamentales en langage LADDER",
      order: 4,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Instructions LAD de base\n\nLe langage LAD (Ladder Diagram) représente la logique sous forme de schéma électrique."
          },
          {
            type: "diagram",
            title: "Éléments de base LAD",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    ÉLÉMENTS LAD                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTACTS                      BOBINES                       │
│                                                              │
│  ─┤ ├─  Contact NO             ─( )─   Bobine simple        │
│         (Normalement Ouvert)                                 │
│                                                              │
│  ─┤/├─  Contact NC             ─(/)─   Bobine inversée      │
│         (Normalement Fermé)                                  │
│                                                              │
│  ─┤P├─  Front montant          ─(S)─   Bobine Set (mémo)    │
│                                                              │
│  ─┤N├─  Front descendant       ─(R)─   Bobine Reset         │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Exemple : Circuit Marche/Arrêt\n\n```\n|     Start      Stop       Moteur         Moteur    |\n|----[ ]----+---[/]----------( )---------------------|\n|           |                                         |\n|   Moteur  |                                         |\n|----[ ]----+                                         |\n|                                                     |\n```\n\nLe moteur démarre avec Start et s'auto-maintient. Stop l'arrête."
          },
          {
            type: "text",
            content: "## Fonctions courantes\n\n| Bloc | Fonction |\n|------|----------|\n| MOVE | Copier une valeur |\n| ADD, SUB, MUL, DIV | Opérations arithmétiques |\n| CMP (>, <, =) | Comparaisons |\n| TON | Temporisation à l'enclenchement |\n| CTU | Compteur incrémental |"
          },
          {
            type: "warning",
            content: "En LAD, le flux d'énergie va de gauche à droite. Une bobine ne peut être activée que si tous les contacts de sa ligne sont passants."
          }
        ]
      }),
    },
  })

  const lesson10_5 = await prisma.lesson.create({
    data: {
      moduleId: module10.id,
      title: "Temporisateurs et compteurs",
      description: "Utiliser TON, TOF, TP et les compteurs CTU, CTD",
      order: 5,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Temporisateurs et compteurs\n\nLes temporisateurs et compteurs sont essentiels pour gérer le temps et compter des événements."
          },
          {
            type: "text",
            content: "## Types de temporisateurs\n\n| Type | Nom | Comportement |\n|------|-----|-------------|\n| TON | Timer On Delay | Retarde l'activation |\n| TOF | Timer Off Delay | Retarde la désactivation |\n| TP | Timer Pulse | Génère une impulsion |"
          },
          {
            type: "diagram",
            title: "Chronogrammes",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    TEMPORISATEURS                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TON (Timer On Delay)         TOF (Timer Off Delay)         │
│                                                              │
│  IN  ────┐     ┌────          IN  ────┐     ┌────           │
│          │     │                      │     │               │
│          └─────┘                      └─────┘               │
│                                                              │
│  Q       ─┐  ┌────            Q   ────┐     ┌─               │
│           │  │  ↑ PT                  │     │  ↑ PT         │
│           └──┘                        └─────┘               │
│                                                              │
│  TP (Timer Pulse)                                           │
│                                                              │
│  IN  ────┐     ┌────                                        │
│          │     │                                            │
│          └─────┘                                            │
│                                                              │
│  Q   ────┐  ┌────                                           │
│          │  │ PT (durée fixe)                               │
│          └──┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Compteurs\n\n| Type | Fonction | Action |\n|------|----------|--------|\n| CTU | Counter Up | Incrémente à chaque front montant |\n| CTD | Counter Down | Décrémente à chaque front montant |\n| CTUD | Counter Up/Down | Compte dans les deux sens |"
          },
          {
            type: "text",
            content: "## Exemple SCL\n\n```pascal\n// Temporisateur TON\n\"Timer_1\".TON(IN := Start,\n               PT := T#5s,\n               Q => Sortie,\n               ET => Temps_Ecoule);\n\n// Compteur CTU\n\"Counter_1\".CTU(CU := Capteur,\n                R := Reset,\n                PV := 100,\n                Q => Objectif_Atteint,\n                CV => Valeur_Compteur);\n```"
          }
        ]
      }),
    },
  })

  const lesson10_6 = await prisma.lesson.create({
    data: {
      moduleId: module10.id,
      title: "Mise en service et débogage",
      description: "Charger le programme et utiliser les outils de débogage",
      order: 6,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Mise en service et débogage\n\nUne fois le programme écrit, il faut le charger dans l'automate et le tester."
          },
          {
            type: "text",
            content: "## Étapes de mise en service\n\n1. **Compiler** : Vérifier les erreurs de syntaxe\n2. **Établir la connexion** : Via Ethernet ou USB\n3. **Charger le matériel** : Configuration de l'automate\n4. **Charger le programme** : Blocs et données\n5. **Passer en RUN** : Démarrer l'exécution\n6. **Tester** : Vérifier le fonctionnement"
          },
          {
            type: "text",
            content: "## Outils de débogage\n\n### Visualisation en ligne\n- Observer l'état des variables en temps réel\n- Voir le flux d'énergie en LAD (lignes vertes)\n\n### Tables de visualisation\n- Créer des listes de variables à surveiller\n- Modifier des valeurs pour les tests\n\n### Forçage\n- Forcer des entrées pour tester sans capteurs\n- Forcer des sorties pour tester les actionneurs"
          },
          {
            type: "diagram",
            title: "Modes de l'automate",
            content: `┌─────────────────────────────────────────────────────────────┐
│                    MODES DE LA CPU                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────┐      ┌─────────┐      ┌─────────┐           │
│    │  STOP   │ ──── │ STARTUP │ ──── │   RUN   │           │
│    │         │      │         │      │         │           │
│    │ Program │      │  OB100  │      │ Program │           │
│    │ inactif │      │ exécuté │      │  actif  │           │
│    └─────────┘      └─────────┘      └─────────┘           │
│         ▲                                  │                 │
│         │                                  │                 │
│         └──────────── ERREUR ──────────────┘                │
│                                                              │
│    STOP → RUN : Démarrage avec OB100                        │
│    RUN → STOP : Arrêt du programme                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "warning",
            content: "Ne forcez jamais de sorties sur une machine en production sans avoir sécurisé la zone ! Les mouvements peuvent être dangereux."
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

  const lesson11_3 = await prisma.lesson.create({
    data: {
      moduleId: module11.id,
      title: "Types de données utilisateur (UDT)",
      description: "Créer et utiliser des types de données personnalisés",
      order: 3,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Types de données utilisateur (UDT)\n\nLes **UDT** (User Defined Types) permettent de créer des structures de données personnalisées."
          },
          {
            type: "text",
            content: "## Pourquoi utiliser des UDT ?\n\n- **Regrouper** des données liées (ex: toutes les infos d'un moteur)\n- **Standardiser** la structure des données dans le projet\n- **Réutiliser** la même structure pour plusieurs instances\n- **Simplifier** la programmation et la maintenance"
          },
          {
            type: "text",
            content: "## Exemple : Structure Moteur\n\n```\nTYPE \"UDT_Moteur\"\nVERSION : 0.1\n   STRUCT\n      Commande     : Bool;     // Ordre de marche\n      Retour_Info  : Bool;     // Retour contacteur\n      Defaut       : Bool;     // Défaut thermique\n      Vitesse_Cons : Int;      // Consigne vitesse\n      Vitesse_Act  : Int;      // Vitesse actuelle\n      Temps_Marche : Time;     // Temps de fonctionnement\n      Nom          : String[32]; // Nom du moteur\n   END_STRUCT;\nEND_TYPE\n```"
          },
          {
            type: "text",
            content: "## Utilisation dans un DB\n\n```\nDATA_BLOCK \"DB_Moteurs\"\nVERSION : 0.1\n   VAR\n      Moteur_Convoyeur : \"UDT_Moteur\";\n      Moteur_Broche    : \"UDT_Moteur\";\n      Moteur_Pompe     : \"UDT_Moteur\";\n   END_VAR\nEND_DATA_BLOCK\n```\n\nAccès : `\"DB_Moteurs\".Moteur_Convoyeur.Vitesse_Cons`"
          },
          {
            type: "info",
            content: "Les UDT sont particulièrement utiles pour les machines répétitives : plusieurs moteurs identiques, plusieurs stations, etc."
          }
        ]
      }),
    },
  })

  const lesson11_4 = await prisma.lesson.create({
    data: {
      moduleId: module11.id,
      title: "Accès optimisé vs standard",
      description: "Comprendre les modes d'accès aux blocs de données",
      order: 4,
      xpReward: 75,
      duration: 16,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Accès optimisé vs standard\n\nLe S7-1500 introduit l'**accès optimisé** aux blocs de données, qui diffère de l'accès standard des anciens S7."
          },
          {
            type: "text",
            content: "## Accès standard (S7-300/400)\n\n```\nDB1.DBX0.0   // Bit 0 du byte 0\nDB1.DBW10    // Word à l'adresse 10\nDB1.DBD20    // DWord à l'adresse 20\n```\n\n- Adresses absolues fixes\n- Compatible avec anciens systèmes\n- Risque de chevauchement mémoire"
          },
          {
            type: "text",
            content: "## Accès optimisé (S7-1500)\n\n```\n\"DB_Production\".Compteur_Pieces\n\"DB_Production\".Temperature\n\"DB_Production\".Mode_Auto\n```\n\n- Adresses symboliques uniquement\n- Pas d'adresse absolue visible\n- Optimisation automatique de la mémoire"
          },
          {
            type: "text",
            content: "## Comparaison\n\n| Critère | Standard | Optimisé |\n|---------|----------|----------|\n| Performance | Moyenne | Excellente |\n| Mémoire | Manuelle | Automatique |\n| Lisibilité | Adresses | Noms symboliques |\n| Migration | Compatible S7-300/400 | S7-1500 uniquement |\n| Accès indirect | Possible | Limité |"
          },
          {
            type: "warning",
            content: "Pour la communication avec des systèmes externes (OPC, IHM tierces), vous pouvez avoir besoin de DB en accès standard. Configurez-le dans les propriétés du DB."
          }
        ]
      }),
    },
  })

  const lesson11_5 = await prisma.lesson.create({
    data: {
      moduleId: module11.id,
      title: "Blocs fonctionnels et instances",
      description: "Utiliser les FB avec leurs DB d'instance",
      order: 5,
      xpReward: 85,
      duration: 20,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Blocs fonctionnels et instances\n\nLes **FB** (Function Blocks) sont des blocs avec mémoire, utilisant des **DB d'instance** pour stocker leurs données."
          },
          {
            type: "diagram",
            title: "FB et DB d'instance",
            content: `┌─────────────────────────────────────────────────────────────┐
│              FB ET DB D'INSTANCE                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    ┌─────────────────┐                                      │
│    │  FB_Moteur      │   ← Bloc fonctionnel (code)          │
│    │                 │                                      │
│    │  IN: Commande   │                                      │
│    │  OUT: Etat      │                                      │
│    │  STAT: Timer    │   ← Variables statiques              │
│    │                 │                                      │
│    └─────────────────┘                                      │
│            │                                                 │
│            │ Instanciation                                   │
│            ▼                                                 │
│    ┌───────────────────────────────────────────────┐        │
│    │                                               │        │
│    │  DB_Moteur1    DB_Moteur2    DB_Moteur3      │        │
│    │  (Instance 1)  (Instance 2)  (Instance 3)    │        │
│    │                                               │        │
│    │  Chaque DB stocke les données                │        │
│    │  de son instance du FB                       │        │
│    │                                               │        │
│    └───────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
          },
          {
            type: "text",
            content: "## Types d'instances\n\n### Instance simple\nUn DB dédié pour chaque appel du FB.\n\n```\nCALL \"FB_Moteur\", \"DB_Moteur1\"\n     En := I0.0\n     Vitesse := 1500\n```\n\n### Multi-instance\nPlusieurs instances dans un seul DB parent (pour FB contenant d'autres FB)."
          },
          {
            type: "text",
            content: "## Exemple de FB\n\n```pascal\nFUNCTION_BLOCK \"FB_Moteur\"\nVAR_INPUT\n    Commande : Bool;\n    Vitesse_Cons : Int;\nEND_VAR\nVAR_OUTPUT\n    Marche : Bool;\nEND_VAR\nVAR\n    Timer_Demarrage : TON;  // Variable statique\nEND_VAR\n\nTimer_Demarrage(IN := Commande, PT := T#2s);\nMarche := Timer_Demarrage.Q;\n\nEND_FUNCTION_BLOCK\n```"
          }
        ]
      }),
    },
  })

  const lesson11_6 = await prisma.lesson.create({
    data: {
      moduleId: module11.id,
      title: "Bonnes pratiques de structuration",
      description: "Organiser efficacement son code S7-1500",
      order: 6,
      xpReward: 80,
      duration: 18,
      content: JSON.stringify({
        sections: [
          {
            type: "text",
            content: "# Bonnes pratiques de structuration\n\nUne bonne organisation du code facilite la maintenance et la compréhension du programme."
          },
          {
            type: "text",
            content: "## Structure recommandée\n\n```\nProjet TIA Portal\n├── OB1 (Main)\n│   ├── CALL FC_Lecture_Entrees\n│   ├── CALL FC_Traitement\n│   │   ├── CALL FB_Station1, DB_Station1\n│   │   ├── CALL FB_Station2, DB_Station2\n│   │   └── CALL FB_Station3, DB_Station3\n│   └── CALL FC_Ecriture_Sorties\n├── OB100 (Startup) - Initialisations\n├── OB80 (Time Error) - Gestion erreurs\n├── DB_Parametres (Données globales)\n└── DB_Production (Compteurs, états)\n```"
          },
          {
            type: "text",
            content: "## Conventions de nommage\n\n| Type | Préfixe | Exemple |\n|------|---------|--------|\n| Entrée | I_ ou E_ | I_Bouton_Start |\n| Sortie | Q_ ou S_ | Q_Moteur_Principal |\n| Mémento | M_ | M_Cycle_En_Cours |\n| FB | FB_ | FB_Gestion_Moteur |\n| FC | FC_ | FC_Calcul_Debit |\n| DB | DB_ | DB_Parametres_Machine |"
          },
          {
            type: "text",
            content: "## Règles d'or\n\n1. **Un FB par équipement** : Moteur, vérin, station...\n2. **Pas de logique dans OB1** : Uniquement des appels\n3. **Commentaires** : Documenter chaque bloc\n4. **UDT pour la répétition** : Même structure = même UDT\n5. **Paramétrage externe** : Valeurs dans DB, pas en dur dans le code"
          },
          {
            type: "info",
            content: "Utilisez les dossiers dans l'arbre du projet TIA Portal pour organiser vos blocs par fonction ou par partie de machine."
          }
        ]
      }),
    },
  })

  // Create Quizzes
  await prisma.quiz.createMany({
    data: [
      // Quiz Module 1 - Lesson 1 (5 questions)
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
      {
        lessonId: lesson1_1.id,
        question: "En quelle année a été inventé le premier automate programmable ?",
        options: JSON.stringify([
          "1958",
          "1968",
          "1978",
          "1988"
        ]),
        correctIndex: 1,
        explanation: "Le premier automate programmable a été inventé en 1968 par Dick Morley pour General Motors.",
        order: 3,
      },
      {
        lessonId: lesson1_1.id,
        question: "Quel composant stocke le programme et les données ?",
        options: JSON.stringify([
          "Le CPU",
          "L'alimentation",
          "La mémoire",
          "Les entrées"
        ]),
        correctIndex: 2,
        explanation: "La mémoire stocke le programme utilisateur et les données de travail de l'automate.",
        order: 4,
      },
      {
        lessonId: lesson1_1.id,
        question: "Quel est l'avantage principal d'un automate par rapport à un câblage traditionnel ?",
        options: JSON.stringify([
          "Il est moins cher",
          "Il consomme moins d'électricité",
          "On peut modifier le programme sans changer le câblage",
          "Il est plus petit"
        ]),
        correctIndex: 2,
        explanation: "La flexibilité est l'avantage clé : on peut modifier le comportement en changeant le programme, sans toucher au câblage physique.",
        order: 5,
      },
      // Quiz Module 1 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson1_2.id,
        question: "Quel type d'entrée permet de mesurer une température ?",
        options: JSON.stringify([
          "Entrée TOR",
          "Entrée analogique",
          "Entrée numérique série",
          "Entrée de sécurité"
        ]),
        correctIndex: 1,
        explanation: "Une entrée analogique peut mesurer des valeurs continues comme la température, la pression ou le niveau.",
        order: 3,
      },
      {
        lessonId: lesson1_2.id,
        question: "Un bouton poussoir est relié à quelle partie de l'automate ?",
        options: JSON.stringify([
          "Aux sorties",
          "Aux entrées",
          "À la mémoire",
          "Au CPU"
        ]),
        correctIndex: 1,
        explanation: "Un bouton poussoir est un capteur, il est donc relié aux entrées de l'automate.",
        order: 4,
      },
      {
        lessonId: lesson1_2.id,
        question: "Un voyant lumineux est commandé par :",
        options: JSON.stringify([
          "Une entrée",
          "Une sortie",
          "La mémoire",
          "L'alimentation"
        ]),
        correctIndex: 1,
        explanation: "Un voyant est un actionneur, il est commandé par une sortie de l'automate.",
        order: 5,
      },
      // Quiz Module 1 - Lesson 3 (5 questions)
      {
        lessonId: lesson1_3.id,
        question: "Combien de phases comporte le cycle automate ?",
        options: JSON.stringify([
          "2 phases",
          "3 phases principales",
          "5 phases",
          "1 seule phase"
        ]),
        correctIndex: 1,
        explanation: "Le cycle automate comporte 3 phases principales : lecture des entrées, exécution du programme, mise à jour des sorties.",
        order: 1,
      },
      {
        lessonId: lesson1_3.id,
        question: "Quel est le temps de cycle typique d'un automate ?",
        options: JSON.stringify([
          "1 seconde",
          "100 millisecondes",
          "5 à 20 millisecondes",
          "1 minute"
        ]),
        correctIndex: 2,
        explanation: "Le temps de cycle typique est de quelques millisecondes (5-20 ms), ce qui permet une réaction rapide.",
        order: 2,
      },
      {
        lessonId: lesson1_3.id,
        question: "À quel moment les entrées sont-elles lues ?",
        options: JSON.stringify([
          "Pendant l'exécution du programme",
          "Au début de chaque cycle",
          "À la fin de chaque cycle",
          "Uniquement au démarrage"
        ]),
        correctIndex: 1,
        explanation: "Les entrées sont lues au début de chaque cycle, avant l'exécution du programme.",
        order: 3,
      },
      {
        lessonId: lesson1_3.id,
        question: "Comment le programme est-il exécuté ?",
        options: JSON.stringify([
          "De manière aléatoire",
          "Du bas vers le haut",
          "De haut en bas, ligne par ligne",
          "Uniquement les lignes modifiées"
        ]),
        correctIndex: 2,
        explanation: "Le programme est exécuté séquentiellement, de haut en bas, ligne par ligne.",
        order: 4,
      },
      {
        lessonId: lesson1_3.id,
        question: "Qu'est-ce qui se passe si le programme est trop long ?",
        options: JSON.stringify([
          "L'automate s'arrête",
          "Le temps de cycle augmente",
          "Les entrées ne sont plus lues",
          "La mémoire est effacée"
        ]),
        correctIndex: 1,
        explanation: "Plus le programme est long, plus le temps de cycle augmente, ce qui peut ralentir la réactivité du système.",
        order: 5,
      },
      // Quiz Module 2 - Lesson 1 (5 questions)
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
      {
        lessonId: lesson2_1.id,
        question: "Quelle est la sortie de A ET B si A=1 et B=1 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Dépend du contexte"]),
        correctIndex: 1,
        explanation: "Quand toutes les entrées sont à 1, la porte ET donne 1 en sortie.",
        order: 3,
      },
      {
        lessonId: lesson2_1.id,
        question: "Quel symbole représente la fonction ET en logique ?",
        options: JSON.stringify([
          "A + B",
          "A · B ou A ∧ B",
          "A / B",
          "A - B"
        ]),
        correctIndex: 1,
        explanation: "La fonction ET s'écrit A · B (point) ou A ∧ B (chapeau) en notation logique.",
        order: 4,
      },
      {
        lessonId: lesson2_1.id,
        question: "Pour un démarrage sécurisé avec 3 conditions (START, capot fermé, pas d'arrêt urgence), combien d'entrées à 1 faut-il ?",
        options: JSON.stringify([
          "Au moins 1",
          "Au moins 2",
          "Les 3 entrées à 1",
          "Aucune"
        ]),
        correctIndex: 2,
        explanation: "Pour une fonction ET à 3 entrées (démarrage sécurisé), TOUTES les conditions doivent être vraies.",
        order: 5,
      },
      // Quiz Module 2 - Lesson 2 (5 questions)
      {
        lessonId: lesson2_2.id,
        question: "Quelle est la sortie de A OU B si A=0 et B=1 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Erreur"]),
        correctIndex: 1,
        explanation: "La porte OU donne 1 si AU MOINS une entrée est à 1. Ici B=1, donc la sortie est 1.",
        order: 1,
      },
      {
        lessonId: lesson2_2.id,
        question: "En LADDER, comment représente-t-on une fonction OU ?",
        options: JSON.stringify([
          "Contacts en série",
          "Contacts en parallèle",
          "Un contact inversé",
          "Une bobine SET"
        ]),
        correctIndex: 1,
        explanation: "En LADDER, les contacts en parallèle représentent une fonction OU : le courant passe si au moins un contact est fermé.",
        order: 2,
      },
      {
        lessonId: lesson2_2.id,
        question: "Quelle est la sortie de A OU B si A=0 et B=0 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "Dépend du contexte"]),
        correctIndex: 0,
        explanation: "La porte OU ne donne 0 que si TOUTES les entrées sont à 0.",
        order: 3,
      },
      {
        lessonId: lesson2_2.id,
        question: "Quel symbole représente la fonction OU en logique ?",
        options: JSON.stringify([
          "A · B",
          "A + B ou A ∨ B",
          "A / B",
          "A × B"
        ]),
        correctIndex: 1,
        explanation: "La fonction OU s'écrit A + B (plus) ou A ∨ B (V inversé) en notation logique.",
        order: 4,
      },
      {
        lessonId: lesson2_2.id,
        question: "Un voyant d'alarme s'allume si température trop haute OU pression trop haute. Avec T=1 et P=0, le voyant est :",
        options: JSON.stringify([
          "Éteint",
          "Allumé",
          "Clignotant",
          "Indéterminé"
        ]),
        correctIndex: 1,
        explanation: "Avec une fonction OU, il suffit qu'une seule condition soit vraie (T=1) pour que le voyant s'allume.",
        order: 5,
      },
      // Quiz Module 2 - Lesson 3 (5 questions)
      {
        lessonId: lesson2_3.id,
        question: "Quelle est la sortie de NON A si A=1 ?",
        options: JSON.stringify(["0", "1", "Indéfini", "-1"]),
        correctIndex: 0,
        explanation: "La porte NON inverse l'entrée. Si A=1, alors NON A = 0.",
        order: 1,
      },
      {
        lessonId: lesson2_3.id,
        question: "Comment appelle-t-on un contact qui laisse passer le courant quand il n'est PAS actionné ?",
        options: JSON.stringify([
          "Contact normalement ouvert (NO)",
          "Contact normalement fermé (NF)",
          "Contact temporisé",
          "Contact mémorisé"
        ]),
        correctIndex: 1,
        explanation: "Un contact normalement fermé (NF) laisse passer le courant au repos et bloque quand il est actionné.",
        order: 2,
      },
      {
        lessonId: lesson2_3.id,
        question: "Quel symbole représente la fonction NON en logique ?",
        options: JSON.stringify([
          "A + B",
          "Ā ou ¬A",
          "A · B",
          "A / B"
        ]),
        correctIndex: 1,
        explanation: "La fonction NON s'écrit avec une barre au-dessus (Ā) ou le symbole ¬ devant la variable.",
        order: 3,
      },
      {
        lessonId: lesson2_3.id,
        question: "En LADDER, comment représente-t-on une fonction NON ?",
        options: JSON.stringify([
          "Un contact en série",
          "Un contact en parallèle",
          "Un contact normalement fermé (NF)",
          "Une bobine inversée"
        ]),
        correctIndex: 2,
        explanation: "En LADDER, un contact normalement fermé --[/]-- représente la fonction NON.",
        order: 4,
      },
      {
        lessonId: lesson2_3.id,
        question: "Le voyant 'MACHINE ARRÊTÉE' doit être allumé quand le moteur n'est PAS en marche. Quelle logique utiliser ?",
        options: JSON.stringify([
          "Voyant = Moteur",
          "Voyant = NON(Moteur)",
          "Voyant = Moteur ET Bouton",
          "Voyant = Moteur OU Bouton"
        ]),
        correctIndex: 1,
        explanation: "Le voyant s'allume quand le moteur est arrêté, donc Voyant = NON(Moteur_en_marche).",
        order: 5,
      },
      // Quiz Module 3 - Lesson 1 (5 questions)
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
      {
        lessonId: lesson3_1.id,
        question: "Dans quel sens le 'courant' circule-t-il en LADDER ?",
        options: JSON.stringify([
          "De droite à gauche",
          "De gauche à droite",
          "De haut en bas",
          "Dans les deux sens"
        ]),
        correctIndex: 1,
        explanation: "En LADDER, le courant logique circule de gauche à droite, de la barre d'alimentation vers les bobines.",
        order: 2,
      },
      {
        lessonId: lesson3_1.id,
        question: "Quelle norme internationale définit le langage LADDER ?",
        options: JSON.stringify([
          "ISO 9001",
          "IEC 61131-3",
          "IEEE 802.3",
          "EN 60204"
        ]),
        correctIndex: 1,
        explanation: "La norme IEC 61131-3 définit les langages de programmation des automates, dont le LADDER.",
        order: 3,
      },
      {
        lessonId: lesson3_1.id,
        question: "Que représente le symbole --[ ]-- en LADDER ?",
        options: JSON.stringify([
          "Une bobine",
          "Un contact normalement ouvert (NO)",
          "Un contact normalement fermé (NF)",
          "Un temporisateur"
        ]),
        correctIndex: 1,
        explanation: "Le symbole --[ ]-- représente un contact normalement ouvert qui conduit quand l'entrée est à 1.",
        order: 4,
      },
      {
        lessonId: lesson3_1.id,
        question: "Que représente le symbole --( )-- en LADDER ?",
        options: JSON.stringify([
          "Un contact",
          "Une bobine",
          "Un temporisateur",
          "Un compteur"
        ]),
        correctIndex: 1,
        explanation: "Le symbole --( )-- représente une bobine qui s'active quand le courant l'atteint.",
        order: 5,
      },
      // Quiz Module 3 - Lesson 2 (5 questions)
      {
        lessonId: lesson3_2.id,
        question: "Quelle est la différence entre une bobine simple et une bobine SET ?",
        options: JSON.stringify([
          "Il n'y a pas de différence",
          "La bobine SET reste active même si la condition n'est plus vraie",
          "La bobine SET est plus rapide",
          "La bobine SET utilise moins de mémoire"
        ]),
        correctIndex: 1,
        explanation: "Une bobine SET mémorise son état : elle reste active même si la condition n'est plus vraie.",
        order: 1,
      },
      {
        lessonId: lesson3_2.id,
        question: "Comment désactive-t-on une bobine SET ?",
        options: JSON.stringify([
          "Elle se désactive automatiquement",
          "Avec une bobine RESET",
          "En coupant l'alimentation",
          "En utilisant un contact NF"
        ]),
        correctIndex: 1,
        explanation: "Une bobine SET ne peut être désactivée qu'avec une bobine RESET sur la même variable.",
        order: 2,
      },
      {
        lessonId: lesson3_2.id,
        question: "Quel symbole représente un contact normalement fermé ?",
        options: JSON.stringify([
          "--[ ]--",
          "--[/]--",
          "--( )--",
          "--(S)--"
        ]),
        correctIndex: 1,
        explanation: "Le symbole --[/]-- représente un contact normalement fermé (la barre oblique indique l'inversion).",
        order: 3,
      },
      {
        lessonId: lesson3_2.id,
        question: "Dans un circuit marche/arrêt avec auto-maintien, qu'est-ce qui permet au moteur de rester en marche après avoir relâché le bouton START ?",
        options: JSON.stringify([
          "La bobine SET",
          "Le contact de la sortie moteur en parallèle",
          "Le temporisateur",
          "Le contact NF"
        ]),
        correctIndex: 1,
        explanation: "L'auto-maintien utilise un contact de la sortie moteur en parallèle avec le bouton START pour maintenir l'activation.",
        order: 4,
      },
      {
        lessonId: lesson3_2.id,
        question: "Pourquoi utilise-t-on un contact NF pour le bouton STOP dans un circuit marche/arrêt ?",
        options: JSON.stringify([
          "Pour économiser de l'énergie",
          "Pour couper le courant quand STOP est appuyé",
          "C'est une obligation légale",
          "Pour accélérer le programme"
        ]),
        correctIndex: 1,
        explanation: "Un contact NF sur STOP coupe le courant quand on appuie sur le bouton, arrêtant ainsi le moteur.",
        order: 5,
      },
      // Quiz Module 4 - Lesson 1 (5 questions)
      {
        lessonId: lesson4_1.id,
        question: "Quel type de capteur détecte uniquement les métaux ?",
        options: JSON.stringify([
          "Capacitif",
          "Inductif",
          "Optique",
          "Mécanique"
        ]),
        correctIndex: 1,
        explanation: "Le capteur inductif utilise un champ magnétique et ne détecte que les matériaux métalliques.",
        order: 1,
      },
      {
        lessonId: lesson4_1.id,
        question: "Quel capteur peut détecter tous les types de matériaux ?",
        options: JSON.stringify([
          "Inductif",
          "Capacitif",
          "Magnétique",
          "Aucun"
        ]),
        correctIndex: 1,
        explanation: "Le capteur capacitif peut détecter tout type de matériau (métal, plastique, bois, liquide, etc.).",
        order: 2,
      },
      {
        lessonId: lesson4_1.id,
        question: "Qu'est-ce qu'un fin de course ?",
        options: JSON.stringify([
          "Un capteur de température",
          "Un capteur mécanique qui détecte une position extrême",
          "Un capteur de pression",
          "Un capteur de vitesse"
        ]),
        correctIndex: 1,
        explanation: "Un fin de course est un capteur mécanique actionné quand un élément mobile atteint une position limite.",
        order: 3,
      },
      {
        lessonId: lesson4_1.id,
        question: "Que signifie IP67 pour un capteur ?",
        options: JSON.stringify([
          "Sa vitesse de commutation",
          "Son indice de protection (étanche à la poussière et immersion)",
          "Sa portée de détection",
          "Son type de sortie"
        ]),
        correctIndex: 1,
        explanation: "IP67 indique une protection contre la poussière (6) et l'immersion temporaire dans l'eau (7).",
        order: 4,
      },
      {
        lessonId: lesson4_1.id,
        question: "Quelle est la caractéristique principale d'un capteur optique ?",
        options: JSON.stringify([
          "Il utilise un champ magnétique",
          "Il utilise un faisceau lumineux",
          "Il nécessite un contact physique",
          "Il mesure la température"
        ]),
        correctIndex: 1,
        explanation: "Un capteur optique utilise un faisceau lumineux (infrarouge, laser, etc.) pour détecter la présence d'un objet.",
        order: 5,
      },
      // Quiz Module 5 - Lesson 1 (5 questions)
      {
        lessonId: lesson5_1.id,
        question: "Que signifie GRAFCET ?",
        options: JSON.stringify([
          "Graphe Fonctionnel de Commande Étape-Transition",
          "Graphique de Fonctionnement des Capteurs",
          "Groupe de Recherche sur l'Automatisme",
          "Graph of Functions for Control Engineering"
        ]),
        correctIndex: 0,
        explanation: "GRAFCET signifie Graphe Fonctionnel de Commande Étape-Transition.",
        order: 1,
      },
      {
        lessonId: lesson5_1.id,
        question: "Qu'est-ce qu'une étape initiale dans un GRAFCET ?",
        options: JSON.stringify([
          "L'étape la plus longue",
          "L'étape active au démarrage du système",
          "L'étape finale",
          "Une étape sans action"
        ]),
        correctIndex: 1,
        explanation: "L'étape initiale est l'étape active au démarrage. Elle est représentée par un double carré.",
        order: 2,
      },
      {
        lessonId: lesson5_1.id,
        question: "Qu'est-ce qu'une transition dans un GRAFCET ?",
        options: JSON.stringify([
          "Une action à effectuer",
          "Une condition pour passer à l'étape suivante",
          "Un état du système",
          "Un type de capteur"
        ]),
        correctIndex: 1,
        explanation: "Une transition est une condition logique qui, lorsqu'elle est vraie, permet de passer à l'étape suivante.",
        order: 3,
      },
      {
        lessonId: lesson5_1.id,
        question: "Quelle norme française définit le GRAFCET ?",
        options: JSON.stringify([
          "NF C 15-100",
          "NF C 03-190",
          "NF EN 60204",
          "NF ISO 9001"
        ]),
        correctIndex: 1,
        explanation: "Le GRAFCET est défini par la norme NF C 03-190, largement utilisée dans l'industrie française.",
        order: 4,
      },
      {
        lessonId: lesson5_1.id,
        question: "Quand une transition est-elle franchissable ?",
        options: JSON.stringify([
          "Toujours",
          "Quand la condition est vraie uniquement",
          "Quand l'étape précédente est active ET la condition est vraie",
          "Après un délai fixe"
        ]),
        correctIndex: 2,
        explanation: "Une transition est franchissable si l'étape précédente est active ET si la condition de transition est vraie.",
        order: 5,
      },
      // Quiz Module 6 - Lesson 1 (5 questions)
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
        lessonId: lesson6_1.id,
        question: "Quand sont apparues les premières machines CNC ?",
        options: JSON.stringify([
          "Dans les années 1930",
          "Dans les années 1950",
          "Dans les années 1970",
          "Dans les années 1990"
        ]),
        correctIndex: 1,
        explanation: "Les premières machines CNC sont apparues dans les années 1950, révolutionnant l'industrie manufacturière.",
        order: 3,
      },
      {
        lessonId: lesson6_1.id,
        question: "Quel langage de programmation utilisent les machines CNC ?",
        options: JSON.stringify([
          "Python",
          "G-Code",
          "JavaScript",
          "C++"
        ]),
        correctIndex: 1,
        explanation: "Les machines CNC utilisent le G-Code, un langage de programmation standardisé pour contrôler les mouvements.",
        order: 4,
      },
      {
        lessonId: lesson6_1.id,
        question: "Quelle est la précision typique d'une machine CNC ?",
        options: JSON.stringify([
          "Quelques millimètres",
          "Quelques centièmes de millimètre",
          "Quelques centimètres",
          "Environ 1 mètre"
        ]),
        correctIndex: 1,
        explanation: "Les machines CNC atteignent des tolérances de quelques centièmes de millimètre (0.01 mm).",
        order: 5,
      },
      // Quiz Module 6 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson6_2.id,
        question: "Qu'est-ce qui caractérise une fraiseuse CNC ?",
        options: JSON.stringify([
          "La pièce tourne",
          "L'outil rotatif enlève la matière",
          "Elle utilise un laser",
          "Elle ajoute de la matière"
        ]),
        correctIndex: 1,
        explanation: "Sur une fraiseuse, c'est l'outil qui tourne et se déplace pour enlever la matière de la pièce fixe.",
        order: 2,
      },
      {
        lessonId: lesson6_2.id,
        question: "Quelle technologie utilise la découpe plasma ?",
        options: JSON.stringify([
          "Un jet d'eau à haute pression",
          "Un arc électrique à haute température",
          "Un faisceau laser",
          "Un outil mécanique"
        ]),
        correctIndex: 1,
        explanation: "La découpe plasma utilise un arc électrique qui ionise le gaz pour créer un jet très chaud capable de couper le métal.",
        order: 3,
      },
      {
        lessonId: lesson6_2.id,
        question: "Qu'est-ce que l'électroérosion ?",
        options: JSON.stringify([
          "Usinage par jet d'eau",
          "Usinage par décharges électriques",
          "Usinage par laser",
          "Usinage par abrasion"
        ]),
        correctIndex: 1,
        explanation: "L'électroérosion utilise des décharges électriques pour éroder le matériau, idéal pour les matériaux très durs.",
        order: 4,
      },
      {
        lessonId: lesson6_2.id,
        question: "Qu'est-ce que la fabrication additive ?",
        options: JSON.stringify([
          "Enlèvement de matière",
          "Ajout de matière couche par couche (impression 3D)",
          "Découpe par laser",
          "Usinage par électroérosion"
        ]),
        correctIndex: 1,
        explanation: "La fabrication additive (impression 3D) construit des pièces en ajoutant de la matière couche par couche.",
        order: 5,
      },
      // Quiz Module 7 - Lesson 1 (5 questions)
      {
        lessonId: lesson7_1.id,
        question: "Quel code est utilisé pour le positionnement rapide ?",
        options: JSON.stringify(["G1", "G0", "M3", "G2"]),
        correctIndex: 1,
        explanation: "G0 est le code de positionnement rapide. Il déplace l'outil le plus vite possible sans usinage.",
        order: 1,
      },
      {
        lessonId: lesson7_1.id,
        question: "Comment s'appelle une ligne de programme G-Code ?",
        options: JSON.stringify([
          "Une instruction",
          "Un bloc",
          "Une commande",
          "Un segment"
        ]),
        correctIndex: 1,
        explanation: "Chaque ligne d'un programme G-Code s'appelle un bloc.",
        order: 2,
      },
      {
        lessonId: lesson7_1.id,
        question: "Que représente la lettre F dans un programme G-Code ?",
        options: JSON.stringify([
          "La fonction auxiliaire",
          "La vitesse d'avance (Feed)",
          "La fréquence",
          "Le format de fichier"
        ]),
        correctIndex: 1,
        explanation: "F représente la vitesse d'avance (Feed rate), exprimée en mm/min ou pouces/min.",
        order: 3,
      },
      {
        lessonId: lesson7_1.id,
        question: "Que représente la lettre S dans un programme G-Code ?",
        options: JSON.stringify([
          "La sortie",
          "La vitesse de broche (Spindle)",
          "Le système de coordonnées",
          "La sécurité"
        ]),
        correctIndex: 1,
        explanation: "S représente la vitesse de rotation de la broche (Spindle speed), exprimée en tr/min.",
        order: 4,
      },
      {
        lessonId: lesson7_1.id,
        question: "Que signifie M30 en G-Code ?",
        options: JSON.stringify([
          "Démarrage du programme",
          "Fin du programme",
          "Changement d'outil",
          "Activation de l'arrosage"
        ]),
        correctIndex: 1,
        explanation: "M30 signifie fin du programme et rembobinage au début.",
        order: 5,
      },
      // Quiz Module 7 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson7_2.id,
        question: "Quelle est la différence entre G90 et G91 ?",
        options: JSON.stringify([
          "Vitesse rapide vs lente",
          "Mode absolu vs incrémental",
          "Mode métrique vs pouces",
          "Broche ON vs OFF"
        ]),
        correctIndex: 1,
        explanation: "G90 active le mode absolu (coordonnées par rapport à l'origine), G91 le mode incrémental (par rapport à la position actuelle).",
        order: 2,
      },
      {
        lessonId: lesson7_2.id,
        question: "Quel code active le mode métrique ?",
        options: JSON.stringify([
          "G20",
          "G21",
          "G90",
          "G91"
        ]),
        correctIndex: 1,
        explanation: "G21 active le mode métrique (millimètres), G20 active le mode pouces.",
        order: 3,
      },
      {
        lessonId: lesson7_2.id,
        question: "Que fait le code M5 ?",
        options: JSON.stringify([
          "Démarre la broche",
          "Arrête la broche",
          "Active l'arrosage",
          "Change l'outil"
        ]),
        correctIndex: 1,
        explanation: "M5 arrête la rotation de la broche.",
        order: 4,
      },
      {
        lessonId: lesson7_2.id,
        question: "Que fait le code M8 ?",
        options: JSON.stringify([
          "Arrête l'arrosage",
          "Active l'arrosage",
          "Change l'outil",
          "Fin du programme"
        ]),
        correctIndex: 1,
        explanation: "M8 active le système d'arrosage (coolant ON). M9 le désactive.",
        order: 5,
      },
      // Quiz Module 8 - Lesson 1 (5 questions)
      {
        lessonId: lesson8_1.id,
        question: "Quel est l'axe vertical sur une fraiseuse CNC ?",
        options: JSON.stringify(["Axe X", "Axe Y", "Axe Z", "Axe A"]),
        correctIndex: 2,
        explanation: "L'axe Z est l'axe vertical (mouvement haut/bas).",
        order: 1,
      },
      {
        lessonId: lesson8_1.id,
        question: "Qu'est-ce que l'origine pièce (W) ?",
        options: JSON.stringify([
          "Un point fixe sur la machine",
          "Le point de référence défini par le programmeur sur la pièce",
          "La position de l'outil",
          "Le centre de la broche"
        ]),
        correctIndex: 1,
        explanation: "L'origine pièce (Work) est le point de référence choisi par le programmeur pour positionner la pièce.",
        order: 2,
      },
      {
        lessonId: lesson8_1.id,
        question: "Sur une machine 5 axes, quels sont les axes de rotation ?",
        options: JSON.stringify([
          "X, Y, Z",
          "A, B, C",
          "1, 2, 3",
          "U, V, W"
        ]),
        correctIndex: 1,
        explanation: "Les axes A, B, C sont les axes de rotation autour de X, Y, Z respectivement.",
        order: 3,
      },
      {
        lessonId: lesson8_1.id,
        question: "Qu'est-ce que l'origine machine (M) ?",
        options: JSON.stringify([
          "Le point de référence de la pièce",
          "Un point physique fixe sur la machine",
          "La position actuelle de l'outil",
          "Le centre du plateau"
        ]),
        correctIndex: 1,
        explanation: "L'origine machine est un point physique fixe, généralement défini par les fins de course de la machine.",
        order: 4,
      },
      {
        lessonId: lesson8_1.id,
        question: "Dans quel plan s'effectue généralement le fraisage de face ?",
        options: JSON.stringify([
          "Plan XZ",
          "Plan YZ",
          "Plan XY",
          "Plan 3D"
        ]),
        correctIndex: 2,
        explanation: "Le fraisage de face s'effectue généralement dans le plan XY (horizontal), avec l'axe Z pour la profondeur.",
        order: 5,
      },
      // Quiz Module 8 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson8_2.id,
        question: "Que représentent I et J dans une interpolation circulaire ?",
        options: JSON.stringify([
          "Les coordonnées du point final",
          "Le décalage du centre de l'arc par rapport au point de départ",
          "Le rayon de l'arc",
          "Les vitesses sur X et Y"
        ]),
        correctIndex: 1,
        explanation: "I et J représentent le décalage du centre de l'arc par rapport au point de départ (incrémental).",
        order: 3,
      },
      {
        lessonId: lesson8_2.id,
        question: "Pourquoi ne doit-on JAMAIS usiner pendant un G0 ?",
        options: JSON.stringify([
          "La machine s'arrête",
          "La vitesse n'est pas contrôlée, risque de casse",
          "Le programme ne compile pas",
          "L'arrosage s'arrête"
        ]),
        correctIndex: 1,
        explanation: "G0 déplace l'outil à vitesse maximale sans contrôle de l'avance, ce qui pourrait casser l'outil ou endommager la pièce.",
        order: 4,
      },
      {
        lessonId: lesson8_2.id,
        question: "Quel code utiliser pour un arc anti-horaire ?",
        options: JSON.stringify([
          "G0",
          "G1",
          "G2",
          "G3"
        ]),
        correctIndex: 3,
        explanation: "G3 effectue une interpolation circulaire dans le sens anti-horaire.",
        order: 5,
      },
      // Quiz Module 9 - Lesson 1 (5 questions)
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
        lessonId: lesson9_1.id,
        question: "Quel protocole de communication industriel est intégré nativement au S7-1500 ?",
        options: JSON.stringify([
          "Modbus uniquement",
          "PROFINET et PROFIBUS",
          "Ethernet TCP uniquement",
          "RS-232"
        ]),
        correctIndex: 1,
        explanation: "Le S7-1500 intègre nativement PROFINET (Ethernet industriel) et peut communiquer en PROFIBUS.",
        order: 3,
      },
      {
        lessonId: lesson9_1.id,
        question: "Quelle gamme d'automates le S7-1500 remplace-t-il progressivement ?",
        options: JSON.stringify([
          "S7-200",
          "S7-300 et S7-400",
          "Logo!",
          "S5"
        ]),
        correctIndex: 1,
        explanation: "Le S7-1500 remplace progressivement les S7-300 et S7-400 grâce à ses performances supérieures.",
        order: 4,
      },
      {
        lessonId: lesson9_1.id,
        question: "Quelle fonctionnalité de sécurité est intégrée au S7-1500 ?",
        options: JSON.stringify([
          "Antivirus",
          "Safety Integrated (fonctions de sécurité)",
          "Pare-feu matériel",
          "Cryptage AES-512"
        ]),
        correctIndex: 1,
        explanation: "Safety Integrated permet d'implémenter des fonctions de sécurité (arrêt d'urgence, surveillance) directement dans l'automate.",
        order: 5,
      },
      // Quiz Module 9 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson9_2.id,
        question: "Quel composant de TIA Portal permet de créer des interfaces IHM ?",
        options: JSON.stringify([
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "SIMOTION SCOUT"
        ]),
        correctIndex: 1,
        explanation: "WinCC est le composant de TIA Portal dédié à la création des interfaces homme-machine (IHM).",
        order: 3,
      },
      {
        lessonId: lesson9_2.id,
        question: "Quelle est la différence entre la vue Portail et la vue Projet ?",
        options: JSON.stringify([
          "Il n'y a pas de différence",
          "Vue Portail = simplifiée, Vue Projet = complète",
          "Vue Portail = réseau, Vue Projet = programme",
          "Vue Portail = compilation, Vue Projet = édition"
        ]),
        correctIndex: 1,
        explanation: "La vue Portail offre une interface simplifiée pour démarrer rapidement, la vue Projet donne accès à toutes les fonctionnalités.",
        order: 4,
      },
      {
        lessonId: lesson9_2.id,
        question: "Quel composant de TIA Portal permet de configurer les variateurs Siemens ?",
        options: JSON.stringify([
          "STEP 7",
          "WinCC",
          "SINAMICS Startdrive",
          "Proneta"
        ]),
        correctIndex: 2,
        explanation: "SINAMICS Startdrive est l'outil intégré à TIA Portal pour configurer et paramétrer les variateurs SINAMICS.",
        order: 5,
      },
      // Quiz Module 10 - Lesson 1 (5 questions)
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
        lessonId: lesson10_1.id,
        question: "Pourquoi est-il important de choisir la référence exacte de la CPU ?",
        options: JSON.stringify([
          "Pour le design du projet",
          "Les programmes ne sont pas toujours compatibles entre versions",
          "C'est obligatoire pour la licence",
          "Pour accélérer la compilation"
        ]),
        correctIndex: 1,
        explanation: "Les programmes ne sont pas toujours compatibles entre différentes versions de CPU. Il faut choisir la référence exacte.",
        order: 3,
      },
      {
        lessonId: lesson10_1.id,
        question: "Où se trouve l'arborescence des blocs de programme dans TIA Portal ?",
        options: JSON.stringify([
          "Dans le menu Outils",
          "Dans l'arbre du projet, sous l'appareil PLC",
          "Dans la barre des tâches",
          "Dans les propriétés de la CPU"
        ]),
        correctIndex: 1,
        explanation: "Les blocs de programme se trouvent dans l'arbre du projet, sous l'appareil PLC > Blocs de programme.",
        order: 4,
      },
      {
        lessonId: lesson10_1.id,
        question: "Que doit-on faire avant de charger un programme dans l'automate ?",
        options: JSON.stringify([
          "Redémarrer l'ordinateur",
          "Compiler le projet",
          "Fermer TIA Portal",
          "Effacer la mémoire"
        ]),
        correctIndex: 1,
        explanation: "Il faut compiler le projet pour vérifier les erreurs et générer le code exécutable avant de le charger.",
        order: 5,
      },
      // Quiz Module 10 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson10_2.id,
        question: "Quel langage utilise des blocs graphiques reliés entre eux ?",
        options: JSON.stringify([
          "LAD",
          "FBD (Function Block Diagram)",
          "SCL",
          "GRAPH"
        ]),
        correctIndex: 1,
        explanation: "FBD utilise des blocs fonctionnels graphiques interconnectés, idéal pour le traitement du signal et la régulation.",
        order: 3,
      },
      {
        lessonId: lesson10_2.id,
        question: "Quel langage est spécialisé pour la programmation séquentielle type GRAFCET ?",
        options: JSON.stringify([
          "LAD",
          "FBD",
          "SCL",
          "GRAPH"
        ]),
        correctIndex: 3,
        explanation: "GRAPH permet de programmer des séquences de type GRAFCET avec des étapes et transitions.",
        order: 4,
      },
      {
        lessonId: lesson10_2.id,
        question: "Quelle norme définit les langages de programmation des automates comme LAD, FBD, SCL ?",
        options: JSON.stringify([
          "ISO 9001",
          "IEC 61131-3",
          "EN 60204",
          "IEEE 802.3"
        ]),
        correctIndex: 1,
        explanation: "La norme IEC 61131-3 définit les langages de programmation standards pour les automates programmables.",
        order: 5,
      },
      // Quiz Module 11 - Lesson 1 (5 questions)
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
        lessonId: lesson11_1.id,
        question: "Qu'est-ce qu'un DB de recette ?",
        options: JSON.stringify([
          "Un DB pour les calculs",
          "Un DB pour stocker des paramètres de production",
          "Un DB pour les alarmes",
          "Un DB pour la communication"
        ]),
        correctIndex: 1,
        explanation: "Un DB de recette stocke des paramètres de production qui peuvent être modifiés sans toucher au programme.",
        order: 3,
      },
      {
        lessonId: lesson11_1.id,
        question: "Qu'est-ce que l'accès optimisé aux DB dans le S7-1500 ?",
        options: JSON.stringify([
          "Un mode de compression des données",
          "Un mode d'accès plus performant sans adresses fixes",
          "Un mode de sauvegarde automatique",
          "Un mode de cryptage"
        ]),
        correctIndex: 1,
        explanation: "L'accès optimisé améliore les performances en organisant automatiquement les données sans adresses fixes.",
        order: 4,
      },
      {
        lessonId: lesson11_1.id,
        question: "Quel type de données peut-on stocker dans un DB ?",
        options: JSON.stringify([
          "Uniquement des Bool",
          "Uniquement des nombres",
          "Tous types : Bool, Int, Real, String, Time, etc.",
          "Uniquement des tableaux"
        ]),
        correctIndex: 2,
        explanation: "Les DB peuvent stocker tous types de données : Bool, Int, Real, String, Time, Array, Struct, etc.",
        order: 5,
      },
      // Quiz Module 11 - Lesson 2 (5 questions)
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
      {
        lessonId: lesson11_2.id,
        question: "Quelle est la différence entre un FB et un FC ?",
        options: JSON.stringify([
          "FC est plus rapide",
          "FB possède une mémoire (DB d'instance), FC non",
          "FB ne peut pas avoir de paramètres",
          "Il n'y a pas de différence"
        ]),
        correctIndex: 1,
        explanation: "Un FB possède un DB d'instance qui conserve les données entre les appels. Un FC ne conserve pas d'état.",
        order: 3,
      },
      {
        lessonId: lesson11_2.id,
        question: "Pourquoi éviter de tout programmer dans OB1 ?",
        options: JSON.stringify([
          "OB1 est limité en taille",
          "Pour structurer le code et faciliter la maintenance",
          "OB1 ne peut pas appeler d'autres blocs",
          "OB1 est réservé aux alarmes"
        ]),
        correctIndex: 1,
        explanation: "Utiliser des FB et FC permet d'organiser le code, de le réutiliser et de faciliter la maintenance et les tests.",
        order: 4,
      },
      {
        lessonId: lesson11_2.id,
        question: "Quel est l'avantage de réutiliser un FB avec plusieurs DB d'instance ?",
        options: JSON.stringify([
          "Économie de mémoire",
          "Gérer plusieurs équipements similaires avec le même code",
          "Améliorer les performances",
          "Simplifier la compilation"
        ]),
        correctIndex: 1,
        explanation: "Un même FB peut gérer plusieurs équipements similaires (ex: plusieurs moteurs) en utilisant des DB d'instance différents.",
        order: 5,
      },
      // Quiz Module 6 - Lesson 3 (Sécurité CNC)
      {
        lessonId: lesson6_3.id,
        question: "Quel EPI est essentiel pour se protéger des projections de copeaux ?",
        options: JSON.stringify([
          "Gants en cuir",
          "Lunettes de sécurité",
          "Casque antibruit",
          "Masque respiratoire"
        ]),
        correctIndex: 1,
        explanation: "Les lunettes de sécurité protègent les yeux des projections de copeaux métalliques qui peuvent causer des blessures graves.",
        order: 1,
      },
      {
        lessonId: lesson6_3.id,
        question: "Que signifie effectuer un 'dry run' ?",
        options: JSON.stringify([
          "Usiner sans lubrification",
          "Tester le programme à vide sans pièce",
          "Nettoyer la machine",
          "Faire un essai avec pièce de rebut"
        ]),
        correctIndex: 1,
        explanation: "Un dry run est un essai à vide qui permet de vérifier le programme sans risquer d'endommager la pièce ou la machine.",
        order: 2,
      },
      {
        lessonId: lesson6_3.id,
        question: "Pourquoi les vêtements amples sont-ils dangereux sur une CNC ?",
        options: JSON.stringify([
          "Ils génèrent de l'électricité statique",
          "Ils peuvent se prendre dans les pièces en rotation",
          "Ils réduisent la visibilité",
          "Ils accumulent la poussière"
        ]),
        correctIndex: 1,
        explanation: "Les vêtements amples peuvent se prendre dans la broche ou les pièces en rotation, entraînant l'opérateur vers la machine.",
        order: 3,
      },
      {
        lessonId: lesson6_3.id,
        question: "Quelle zone présente un risque de pincement sur une CNC ?",
        options: JSON.stringify([
          "Le panneau de commande",
          "Le changeur d'outil",
          "L'écran de contrôle",
          "Le pupitre opérateur"
        ]),
        correctIndex: 1,
        explanation: "Le changeur d'outil effectue des mouvements rapides et peut pincer une main qui se trouverait dans la zone.",
        order: 4,
      },
      {
        lessonId: lesson6_3.id,
        question: "Comment doit-on retirer les copeaux accumulés ?",
        options: JSON.stringify([
          "À la main directement",
          "En soufflant avec de l'air comprimé",
          "Avec un crochet adapté",
          "En inclinant la machine"
        ]),
        correctIndex: 2,
        explanation: "Les copeaux sont coupants et peuvent être brûlants. Un crochet permet de les retirer en toute sécurité.",
        order: 5,
      },
      // Quiz Module 6 - Lesson 4 (Matériaux et outils)
      {
        lessonId: lesson6_4.id,
        question: "Quel matériau permet les vitesses de coupe les plus élevées ?",
        options: JSON.stringify([
          "Acier inoxydable",
          "Titane",
          "Aluminium",
          "Acier trempé"
        ]),
        correctIndex: 2,
        explanation: "L'aluminium est un matériau très usinable qui permet des vitesses de coupe élevées (300-1000 m/min en carbure).",
        order: 1,
      },
      {
        lessonId: lesson6_4.id,
        question: "Quelle est la formule pour calculer la vitesse de broche N ?",
        options: JSON.stringify([
          "N = Vc × D × π",
          "N = (Vc × 1000) / (π × D)",
          "N = D / (Vc × π)",
          "N = Vc + D + 1000"
        ]),
        correctIndex: 1,
        explanation: "La formule N = (Vc × 1000) / (π × D) permet de calculer la vitesse de rotation en tr/min à partir de la vitesse de coupe.",
        order: 2,
      },
      {
        lessonId: lesson6_4.id,
        question: "Quel outil est adapté pour le contournage 3D ?",
        options: JSON.stringify([
          "Fraise en bout plate",
          "Foret",
          "Fraise boule",
          "Taraud"
        ]),
        correctIndex: 2,
        explanation: "La fraise boule permet de créer des surfaces courbes et complexes grâce à sa géométrie sphérique.",
        order: 3,
      },
      {
        lessonId: lesson6_4.id,
        question: "Quel est le risque principal lors de l'usinage des plastiques ?",
        options: JSON.stringify([
          "Usure rapide de l'outil",
          "Fusion du matériau par la chaleur",
          "Projection de copeaux",
          "Vibrations excessives"
        ]),
        correctIndex: 1,
        explanation: "Les plastiques ont une faible conductivité thermique et peuvent fondre si la chaleur générée n'est pas évacuée.",
        order: 4,
      },
      {
        lessonId: lesson6_4.id,
        question: "Que représente 'fz' dans les paramètres de coupe ?",
        options: JSON.stringify([
          "La fréquence de la broche",
          "L'avance par dent",
          "La profondeur de passe",
          "Le diamètre de l'outil"
        ]),
        correctIndex: 1,
        explanation: "fz (feed per tooth) représente l'avance par dent en mm, un paramètre clé pour calculer la vitesse d'avance.",
        order: 5,
      },
      // Quiz Module 6 - Lesson 5 (Préparation pièce)
      {
        lessonId: lesson6_5.id,
        question: "Quelle surépaisseur recommande-t-on sur le brut ?",
        options: JSON.stringify([
          "0.5 mm",
          "2-3 mm",
          "10 mm",
          "Aucune"
        ]),
        correctIndex: 1,
        explanation: "Une surépaisseur de 2-3 mm permet de compenser les imprécisions de bridage et d'effectuer les opérations de finition.",
        order: 1,
      },
      {
        lessonId: lesson6_5.id,
        question: "Quel système de bridage est adapté aux pièces cylindriques ?",
        options: JSON.stringify([
          "Étau de précision",
          "Bridage direct",
          "Mandrin 3 mors",
          "Table magnétique"
        ]),
        correctIndex: 2,
        explanation: "Le mandrin 3 mors est conçu pour serrer les pièces cylindriques de manière centrée et équilibrée.",
        order: 2,
      },
      {
        lessonId: lesson6_5.id,
        question: "Que risque-t-on avec un bridage insuffisant ?",
        options: JSON.stringify([
          "Usure prématurée de l'outil",
          "Éjection de la pièce",
          "Surchauffe de la broche",
          "Défaut d'état de surface"
        ]),
        correctIndex: 1,
        explanation: "Un bridage insuffisant peut entraîner l'éjection violente de la pièce, causant des dommages et des blessures.",
        order: 3,
      },
      {
        lessonId: lesson6_5.id,
        question: "Quelle est la première étape de préparation d'une pièce ?",
        options: JSON.stringify([
          "Choisir les outils",
          "Analyser le dessin technique",
          "Monter la pièce",
          "Écrire le programme"
        ]),
        correctIndex: 1,
        explanation: "L'analyse du dessin technique permet de comprendre les dimensions, tolérances et états de surface requis avant de commencer.",
        order: 4,
      },
      {
        lessonId: lesson6_5.id,
        question: "Pourquoi vérifier le parallélisme de l'étau ?",
        options: JSON.stringify([
          "Pour économiser du temps",
          "Pour éviter les vibrations",
          "Pour que les axes de la pièce soient alignés avec la machine",
          "Pour réduire l'usure de l'étau"
        ]),
        correctIndex: 2,
        explanation: "Un étau mal aligné produirait des pièces dont les surfaces ne sont pas parallèles aux axes X et Y de la machine.",
        order: 5,
      },
      // Quiz Module 6 - Lesson 6 (Origines et décalages)
      {
        lessonId: lesson6_6.id,
        question: "Quel code G permet d'utiliser l'origine machine ?",
        options: JSON.stringify([
          "G54",
          "G53",
          "G52",
          "G90"
        ]),
        correctIndex: 1,
        explanation: "G53 permet de programmer en coordonnées machine absolues, par rapport à l'origine fixe de la machine.",
        order: 1,
      },
      {
        lessonId: lesson6_6.id,
        question: "Combien de décalages d'origine pièce standard sont disponibles ?",
        options: JSON.stringify([
          "1 (G54)",
          "3 (G54-G56)",
          "6 (G54-G59)",
          "10 (G54-G63)"
        ]),
        correctIndex: 2,
        explanation: "Les codes G54 à G59 permettent de définir 6 origines pièce différentes pour usiner plusieurs pièces.",
        order: 2,
      },
      {
        lessonId: lesson6_6.id,
        question: "Quelle méthode de prise d'origine est la plus précise ?",
        options: JSON.stringify([
          "Méthode du papier",
          "À l'œil",
          "Avec un palpeur",
          "Par calcul"
        ]),
        correctIndex: 2,
        explanation: "Le palpeur de pièce touche automatiquement la surface et enregistre la position avec une grande précision.",
        order: 3,
      },
      {
        lessonId: lesson6_6.id,
        question: "Que permet le code G52 ?",
        options: JSON.stringify([
          "Définir l'origine machine",
          "Créer un décalage temporaire additionnel",
          "Annuler tous les décalages",
          "Sélectionner l'outil"
        ]),
        correctIndex: 1,
        explanation: "G52 crée un décalage local temporaire qui s'ajoute au décalage actif (G54-G59), utile pour les sous-programmes.",
        order: 4,
      },
      {
        lessonId: lesson6_6.id,
        question: "Où sont stockés les décalages d'origine ?",
        options: JSON.stringify([
          "Dans le programme G-code",
          "Dans une table de la machine",
          "Dans l'outil",
          "Nulle part, ils sont recalculés"
        ]),
        correctIndex: 1,
        explanation: "Les décalages d'origine sont stockés dans une table de paramètres de la machine et persistent après l'arrêt.",
        order: 5,
      },
      // Quiz Module 7 - Lesson 3 (Cycles préprogrammés)
      {
        lessonId: lesson7_3.id,
        question: "Quel cycle est utilisé pour le perçage avec évacuation des copeaux ?",
        options: JSON.stringify([
          "G81",
          "G82",
          "G83",
          "G84"
        ]),
        correctIndex: 2,
        explanation: "G83 est le cycle de débourrage qui remonte périodiquement l'outil pour évacuer les copeaux des trous profonds.",
        order: 1,
      },
      {
        lessonId: lesson7_3.id,
        question: "Que représente le paramètre 'Q' dans G83 ?",
        options: JSON.stringify([
          "La profondeur totale",
          "La vitesse d'avance",
          "La profondeur de chaque passe",
          "Le diamètre du trou"
        ]),
        correctIndex: 2,
        explanation: "Q définit la profondeur incrémentale de chaque passe avant que l'outil ne remonte pour évacuer les copeaux.",
        order: 2,
      },
      {
        lessonId: lesson7_3.id,
        question: "Quel code annule tous les cycles actifs ?",
        options: JSON.stringify([
          "G79",
          "G80",
          "G81",
          "G00"
        ]),
        correctIndex: 1,
        explanation: "G80 annule tous les cycles de perçage actifs et doit être utilisé après une série d'opérations de perçage.",
        order: 3,
      },
      {
        lessonId: lesson7_3.id,
        question: "Que représente le paramètre 'R' dans les cycles de perçage ?",
        options: JSON.stringify([
          "Le rayon du trou",
          "La vitesse de rotation",
          "Le plan de retrait",
          "Le rayon de l'outil"
        ]),
        correctIndex: 2,
        explanation: "R définit le plan de retrait, niveau auquel l'outil se positionne entre les trous et pour l'évacuation des copeaux.",
        order: 4,
      },
      {
        lessonId: lesson7_3.id,
        question: "Quel cycle est utilisé pour le taraudage ?",
        options: JSON.stringify([
          "G81",
          "G82",
          "G83",
          "G84"
        ]),
        correctIndex: 3,
        explanation: "G84 est le cycle de taraudage qui synchronise la rotation de la broche avec l'avance pour créer un filetage.",
        order: 5,
      },
      // Quiz Module 7 - Lesson 4 (Sous-programmes)
      {
        lessonId: lesson7_4.id,
        question: "Quel code Fanuc appelle un sous-programme ?",
        options: JSON.stringify([
          "M97",
          "M98",
          "M99",
          "M30"
        ]),
        correctIndex: 1,
        explanation: "M98 suivi de P (numéro) et optionnellement L (répétitions) appelle un sous-programme en contrôleur Fanuc.",
        order: 1,
      },
      {
        lessonId: lesson7_4.id,
        question: "Quel code marque la fin d'un sous-programme Fanuc ?",
        options: JSON.stringify([
          "M98",
          "M99",
          "M30",
          "M00"
        ]),
        correctIndex: 1,
        explanation: "M99 termine le sous-programme et retourne l'exécution au programme principal, à la ligne suivant l'appel.",
        order: 2,
      },
      {
        lessonId: lesson7_4.id,
        question: "Quel est l'avantage principal des sous-programmes ?",
        options: JSON.stringify([
          "Ils accélèrent l'usinage",
          "Ils évitent les répétitions de code",
          "Ils réduisent l'usure des outils",
          "Ils améliorent la précision"
        ]),
        correctIndex: 1,
        explanation: "Les sous-programmes permettent de réutiliser du code, réduisant la taille du programme et facilitant la maintenance.",
        order: 3,
      },
      {
        lessonId: lesson7_4.id,
        question: "Que signifie L4 dans M98 P1000 L4 ?",
        options: JSON.stringify([
          "Longueur de l'outil 4",
          "Appeler le sous-programme 4 fois",
          "Ligne 4 du sous-programme",
          "Label numéro 4"
        ]),
        correctIndex: 1,
        explanation: "L4 indique que le sous-programme P1000 sera exécuté 4 fois avant de continuer le programme principal.",
        order: 4,
      },
      {
        lessonId: lesson7_4.id,
        question: "Quel est le risque d'une imbrication trop profonde de sous-programmes ?",
        options: JSON.stringify([
          "Usinage plus lent",
          "Erreur de dépassement de pile",
          "Usure de la broche",
          "Perte de précision"
        ]),
        correctIndex: 1,
        explanation: "Trop de sous-programmes appelant d'autres sous-programmes peut dépasser la capacité de la pile mémoire du contrôleur.",
        order: 5,
      },
      // Quiz Module 7 - Lesson 5 (Compensation d'outil)
      {
        lessonId: lesson7_5.id,
        question: "Quel code active la compensation de rayon à gauche ?",
        options: JSON.stringify([
          "G40",
          "G41",
          "G42",
          "G43"
        ]),
        correctIndex: 1,
        explanation: "G41 active la compensation de rayon avec l'outil à gauche du contour (sens de déplacement).",
        order: 1,
      },
      {
        lessonId: lesson7_5.id,
        question: "Quel code annule la compensation de rayon ?",
        options: JSON.stringify([
          "G40",
          "G41",
          "G42",
          "G49"
        ]),
        correctIndex: 0,
        explanation: "G40 annule la compensation de rayon d'outil et doit être appelé avant les mouvements rapides de dégagement.",
        order: 2,
      },
      {
        lessonId: lesson7_5.id,
        question: "Pourquoi utiliser la compensation de rayon ?",
        options: JSON.stringify([
          "Pour accélérer l'usinage",
          "Pour programmer le contour de la pièce directement",
          "Pour réduire l'usure de l'outil",
          "Pour économiser la mémoire"
        ]),
        correctIndex: 1,
        explanation: "La compensation permet de programmer le contour final de la pièce, le contrôleur calculant la trajectoire du centre outil.",
        order: 3,
      },
      {
        lessonId: lesson7_5.id,
        question: "Sur quel type de mouvement doit-on activer/désactiver la compensation ?",
        options: JSON.stringify([
          "Mouvement rapide G0",
          "Mouvement linéaire G1",
          "Mouvement circulaire G2",
          "N'importe quel mouvement"
        ]),
        correctIndex: 1,
        explanation: "La compensation doit être activée/désactivée sur un mouvement linéaire G1, jamais sur un arc ou un rapide.",
        order: 4,
      },
      {
        lessonId: lesson7_5.id,
        question: "Quel code active la compensation de longueur d'outil ?",
        options: JSON.stringify([
          "G41",
          "G42",
          "G43",
          "G44"
        ]),
        correctIndex: 2,
        explanation: "G43 active la compensation de longueur d'outil sur l'axe Z, permettant de gérer des outils de différentes longueurs.",
        order: 5,
      },
      // Quiz Module 7 - Lesson 6 (Exemple poche)
      {
        lessonId: lesson7_6.id,
        question: "Pourquoi usine-t-on une poche en plusieurs passes ?",
        options: JSON.stringify([
          "Pour économiser l'outil",
          "Pour éviter de surcharger l'outil en profondeur",
          "Pour faciliter la programmation",
          "Pour améliorer la vitesse"
        ]),
        correctIndex: 1,
        explanation: "Usiner en plusieurs passes réduit les efforts de coupe et évite la casse de l'outil ou les vibrations excessives.",
        order: 1,
      },
      {
        lessonId: lesson7_6.id,
        question: "Que signifie G21 en début de programme ?",
        options: JSON.stringify([
          "Mode absolu",
          "Mode métrique",
          "Mode incrémental",
          "Mode pouces"
        ]),
        correctIndex: 1,
        explanation: "G21 sélectionne le mode métrique (millimètres), par opposition à G20 qui sélectionne le mode pouces.",
        order: 2,
      },
      {
        lessonId: lesson7_6.id,
        question: "Quel code démarre la broche en sens horaire ?",
        options: JSON.stringify([
          "M3",
          "M4",
          "M5",
          "M6"
        ]),
        correctIndex: 0,
        explanation: "M3 démarre la broche en rotation horaire (sens conventionnel pour le fraisage), M4 serait antihoraire.",
        order: 3,
      },
      {
        lessonId: lesson7_6.id,
        question: "Pourquoi utiliser G43 H1 Z50 au début ?",
        options: JSON.stringify([
          "Pour positionner l'outil",
          "Pour activer la compensation de longueur et aller en sécurité",
          "Pour sélectionner l'outil",
          "Pour définir l'avance"
        ]),
        correctIndex: 1,
        explanation: "G43 H1 active la compensation de longueur de l'outil 1, et Z50 positionne l'outil en hauteur de sécurité.",
        order: 4,
      },
      {
        lessonId: lesson7_6.id,
        question: "Que fait M30 à la fin du programme ?",
        options: JSON.stringify([
          "Arrête la broche",
          "Change d'outil",
          "Termine le programme et rembobine",
          "Active l'arrosage"
        ]),
        correctIndex: 2,
        explanation: "M30 termine le programme, arrête l'exécution et remet le pointeur au début pour un éventuel redémarrage.",
        order: 5,
      },
      // Quiz Module 8 - Lesson 3 (Mode absolu/incrémental)
      {
        lessonId: lesson8_3.id,
        question: "Quel code active le mode absolu ?",
        options: JSON.stringify([
          "G90",
          "G91",
          "G92",
          "G54"
        ]),
        correctIndex: 0,
        explanation: "G90 active le mode absolu où les coordonnées sont relatives à l'origine pièce (0,0,0).",
        order: 1,
      },
      {
        lessonId: lesson8_3.id,
        question: "En mode incrémental G91, que fait G1 X50 ?",
        options: JSON.stringify([
          "Va à la position X=50",
          "Avance de 50 mm en X par rapport à la position actuelle",
          "Définit la vitesse à 50",
          "Va à 50 mm de l'origine"
        ]),
        correctIndex: 1,
        explanation: "En mode incrémental, X50 signifie un déplacement de +50 mm par rapport à la position actuelle, pas vers X=50.",
        order: 2,
      },
      {
        lessonId: lesson8_3.id,
        question: "Quel mode est recommandé pour la programmation générale ?",
        options: JSON.stringify([
          "Mode incrémental G91",
          "Mode absolu G90",
          "Les deux sont équivalents",
          "Aucun des deux"
        ]),
        correctIndex: 1,
        explanation: "Le mode absolu G90 est recommandé car il est plus facile à lire et les erreurs ne s'accumulent pas.",
        order: 3,
      },
      {
        lessonId: lesson8_3.id,
        question: "Pour quel usage le mode incrémental est-il particulièrement utile ?",
        options: JSON.stringify([
          "Les contours complexes",
          "Les sous-programmes réutilisables",
          "L'usinage de poches",
          "Les opérations de perçage"
        ]),
        correctIndex: 1,
        explanation: "Le mode incrémental permet de créer des sous-programmes indépendants de la position de départ.",
        order: 4,
      },
      {
        lessonId: lesson8_3.id,
        question: "Que se passe-t-il si on oublie de revenir en G90 après un G91 ?",
        options: JSON.stringify([
          "Rien, c'est automatique",
          "Tous les mouvements suivants seront incrémentaux",
          "La machine s'arrête",
          "L'outil retourne à l'origine"
        ]),
        correctIndex: 1,
        explanation: "Le mode reste actif jusqu'à ce qu'il soit changé explicitement. Les mouvements suivants seraient en incrémental.",
        order: 5,
      },
      // Quiz Module 8 - Lesson 4 (Plans de travail)
      {
        lessonId: lesson8_4.id,
        question: "Quel plan de travail est sélectionné par défaut sur une fraiseuse ?",
        options: JSON.stringify([
          "G17 (XY)",
          "G18 (XZ)",
          "G19 (YZ)",
          "Aucun par défaut"
        ]),
        correctIndex: 0,
        explanation: "G17 (plan XY) est le plan par défaut sur les fraiseuses, l'outil se déplaçant verticalement en Z.",
        order: 1,
      },
      {
        lessonId: lesson8_4.id,
        question: "Sur quel plan un tour CNC travaille-t-il généralement ?",
        options: JSON.stringify([
          "G17 (XY)",
          "G18 (XZ)",
          "G19 (YZ)",
          "Aucun spécifique"
        ]),
        correctIndex: 1,
        explanation: "Un tour CNC travaille généralement en G18 (plan XZ), X étant le rayon et Z la longueur de la pièce.",
        order: 2,
      },
      {
        lessonId: lesson8_4.id,
        question: "Quels paramètres définissent le centre d'un arc en G17 ?",
        options: JSON.stringify([
          "I et K",
          "J et K",
          "I et J",
          "X et Y"
        ]),
        correctIndex: 2,
        explanation: "En plan G17 (XY), I et J définissent le décalage du centre de l'arc par rapport au point de départ.",
        order: 3,
      },
      {
        lessonId: lesson8_4.id,
        question: "Pourquoi est-il important de spécifier le plan au début du programme ?",
        options: JSON.stringify([
          "Pour définir les unités",
          "Pour éviter d'utiliser un plan résiduel du programme précédent",
          "Pour optimiser la vitesse",
          "C'est obligatoire pour compiler"
        ]),
        correctIndex: 1,
        explanation: "Le plan actif persiste après la fin d'un programme. Le spécifier évite des mouvements inattendus.",
        order: 4,
      },
      {
        lessonId: lesson8_4.id,
        question: "En G19, quel est l'axe perpendiculaire au plan de travail ?",
        options: JSON.stringify([
          "X",
          "Y",
          "Z",
          "A"
        ]),
        correctIndex: 0,
        explanation: "En G19 (plan YZ), l'axe X est perpendiculaire au plan de travail et représente la profondeur.",
        order: 5,
      },
      // Quiz Module 8 - Lesson 5 (Machines multi-axes)
      {
        lessonId: lesson8_5.id,
        question: "Autour de quel axe tourne l'axe rotatif A ?",
        options: JSON.stringify([
          "Axe X",
          "Axe Y",
          "Axe Z",
          "Son propre axe"
        ]),
        correctIndex: 0,
        explanation: "L'axe A effectue une rotation autour de l'axe X, selon la convention standard des axes rotatifs.",
        order: 1,
      },
      {
        lessonId: lesson8_5.id,
        question: "Combien d'axes possède une machine 5 axes ?",
        options: JSON.stringify([
          "3 linéaires + 2 rotatifs",
          "5 linéaires",
          "2 linéaires + 3 rotatifs",
          "4 linéaires + 1 rotatif"
        ]),
        correctIndex: 0,
        explanation: "Une machine 5 axes possède les 3 axes linéaires X, Y, Z plus 2 axes de rotation parmi A, B, C.",
        order: 2,
      },
      {
        lessonId: lesson8_5.id,
        question: "Quel est l'avantage principal du 5 axes ?",
        options: JSON.stringify([
          "Vitesse plus élevée",
          "Usinage complet en un seul montage",
          "Coût réduit",
          "Programmation simplifiée"
        ]),
        correctIndex: 1,
        explanation: "Le 5 axes permet d'usiner toutes les faces d'une pièce sans la démonter, réduisant les erreurs de repositionnement.",
        order: 3,
      },
      {
        lessonId: lesson8_5.id,
        question: "Quel logiciel est généralement nécessaire pour programmer en 5 axes ?",
        options: JSON.stringify([
          "Un éditeur de texte",
          "Un logiciel FAO (CAM)",
          "TIA Portal",
          "Excel"
        ]),
        correctIndex: 1,
        explanation: "La programmation 5 axes est complexe et utilise des logiciels FAO (Fabrication Assistée par Ordinateur) pour générer le G-code.",
        order: 4,
      },
      {
        lessonId: lesson8_5.id,
        question: "Quel axe rotatif permet l'inclinaison de la broche ?",
        options: JSON.stringify([
          "Axe A",
          "Axe B",
          "Axe C",
          "Axe Z"
        ]),
        correctIndex: 1,
        explanation: "L'axe B (rotation autour de Y) permet généralement l'inclinaison de la broche sur les centres d'usinage.",
        order: 5,
      },
      // Quiz Module 8 - Lesson 6 (Vitesses et avances)
      {
        lessonId: lesson8_6.id,
        question: "Quelle est l'unité de la vitesse de coupe Vc ?",
        options: JSON.stringify([
          "tr/min",
          "mm/min",
          "m/min",
          "mm/tour"
        ]),
        correctIndex: 2,
        explanation: "La vitesse de coupe Vc s'exprime en mètres par minute (m/min), représentant la vitesse périphérique de l'outil.",
        order: 1,
      },
      {
        lessonId: lesson8_6.id,
        question: "Quel matériau d'outil permet les vitesses de coupe les plus élevées ?",
        options: JSON.stringify([
          "HSS (acier rapide)",
          "Carbure",
          "Acier au carbone",
          "Bronze"
        ]),
        correctIndex: 1,
        explanation: "Les outils en carbure supportent des températures plus élevées et permettent des vitesses 2 à 5 fois supérieures au HSS.",
        order: 2,
      },
      {
        lessonId: lesson8_6.id,
        question: "Comment varie la vitesse de broche si on double le diamètre de l'outil ?",
        options: JSON.stringify([
          "Elle double",
          "Elle reste la même",
          "Elle diminue de moitié",
          "Elle quadruple"
        ]),
        correctIndex: 2,
        explanation: "N = (Vc × 1000) / (π × D). Si D double, N diminue de moitié pour maintenir la même vitesse de coupe.",
        order: 3,
      },
      {
        lessonId: lesson8_6.id,
        question: "Qu'est-ce que l'avance par dent (fz) ?",
        options: JSON.stringify([
          "La vitesse totale de l'avance",
          "L'épaisseur de copeau par dent",
          "Le nombre de dents de l'outil",
          "La profondeur de passe"
        ]),
        correctIndex: 1,
        explanation: "L'avance par dent (fz) représente l'épaisseur de copeau que chaque dent enlève, exprimée en mm.",
        order: 4,
      },
      {
        lessonId: lesson8_6.id,
        question: "Quelle Vc typique utilise-t-on pour l'aluminium avec un outil carbure ?",
        options: JSON.stringify([
          "25-40 m/min",
          "80-150 m/min",
          "300-1000 m/min",
          "1500-2000 m/min"
        ]),
        correctIndex: 2,
        explanation: "L'aluminium permet des vitesses de coupe élevées, typiquement 300 à 1000 m/min avec des outils carbure.",
        order: 5,
      },
      // Quiz Module 9 - Lesson 3 (Gamme S7-1500)
      {
        lessonId: lesson9_3.id,
        question: "Que signifie le suffixe 'F' dans CPU 1515F ?",
        options: JSON.stringify([
          "Fast (rapide)",
          "Failsafe (sécurité)",
          "Full (complet)",
          "Flexible"
        ]),
        correctIndex: 1,
        explanation: "F signifie Failsafe, indiquant que la CPU intègre des fonctions de sécurité certifiées SIL 3 / PL e.",
        order: 1,
      },
      {
        lessonId: lesson9_3.id,
        question: "Quelle gamme de CPU intègre des E/S ?",
        options: JSON.stringify([
          "CPU standard",
          "CPU Failsafe (F)",
          "CPU Compacte (C)",
          "CPU Technologie (T)"
        ]),
        correctIndex: 2,
        explanation: "Les CPU Compactes (1511C, 1512C) intègrent des entrées/sorties directement sur le module CPU.",
        order: 2,
      },
      {
        lessonId: lesson9_3.id,
        question: "Quelle CPU choisir pour du Motion Control avancé ?",
        options: JSON.stringify([
          "CPU 1511-1 PN",
          "CPU 1515F",
          "CPU 1516T",
          "CPU 1512C"
        ]),
        correctIndex: 2,
        explanation: "Les CPU Technologie (T) intègrent des fonctions Motion Control avancées pour le pilotage d'axes synchronisés.",
        order: 3,
      },
      {
        lessonId: lesson9_3.id,
        question: "Quelle est la CPU S7-1500 d'entrée de gamme ?",
        options: JSON.stringify([
          "CPU 1518-4",
          "CPU 1516-3",
          "CPU 1511-1 PN",
          "CPU 1515-2"
        ]),
        correctIndex: 2,
        explanation: "La CPU 1511-1 PN est l'entrée de gamme, adaptée aux petites machines et applications simples.",
        order: 4,
      },
      {
        lessonId: lesson9_3.id,
        question: "Quel niveau de sécurité atteignent les CPU Failsafe ?",
        options: JSON.stringify([
          "SIL 1 / PL a",
          "SIL 2 / PL c",
          "SIL 3 / PL e",
          "SIL 4 / PL g"
        ]),
        correctIndex: 2,
        explanation: "Les CPU Failsafe S7-1500 atteignent le niveau SIL 3 selon IEC 62061 et PL e selon ISO 13849.",
        order: 5,
      },
      // Quiz Module 9 - Lesson 4 (Modules E/S)
      {
        lessonId: lesson9_4.id,
        question: "Que signifie DI dans la nomenclature des modules ?",
        options: JSON.stringify([
          "Digital Interface",
          "Digital Input (Entrée numérique)",
          "Data Input",
          "Direct Input"
        ]),
        correctIndex: 1,
        explanation: "DI signifie Digital Input (entrée numérique), par opposition à AI (Analog Input) pour les entrées analogiques.",
        order: 1,
      },
      {
        lessonId: lesson9_4.id,
        question: "Quel type de module utiliser pour mesurer une température avec sonde PT100 ?",
        options: JSON.stringify([
          "DI (entrée numérique)",
          "DO (sortie numérique)",
          "AI avec RTD/TC",
          "AO (sortie analogique)"
        ]),
        correctIndex: 2,
        explanation: "Les modules AI avec entrées RTD (PT100) ou TC (thermocouple) sont conçus pour les mesures de température.",
        order: 2,
      },
      {
        lessonId: lesson9_4.id,
        question: "Quel courant maximum supporte un module DQ 16×24VDC/0.5A par sortie ?",
        options: JSON.stringify([
          "0.1 A",
          "0.5 A",
          "2 A",
          "5 A"
        ]),
        correctIndex: 1,
        explanation: "Le module DQ 16×24VDC/0.5A supporte jusqu'à 0.5 ampère par sortie, comme indiqué dans sa référence.",
        order: 3,
      },
      {
        lessonId: lesson9_4.id,
        question: "Quel type de module utiliser pour commander un contacteur AC ?",
        options: JSON.stringify([
          "DQ transistor",
          "DQ relais",
          "AQ",
          "DI"
        ]),
        correctIndex: 1,
        explanation: "Les modules à relais peuvent commuter du courant alternatif (AC), contrairement aux transistors qui ne fonctionnent qu'en DC.",
        order: 4,
      },
      {
        lessonId: lesson9_4.id,
        question: "À quoi servent les modules NAMUR ?",
        options: JSON.stringify([
          "Haute vitesse",
          "Zones explosives (Ex)",
          "Haute précision",
          "Communication réseau"
        ]),
        correctIndex: 1,
        explanation: "Les modules NAMUR sont conçus pour les zones explosives (ATEX), avec des niveaux de courant intrinsèquement sûrs.",
        order: 5,
      },
      // Quiz Module 9 - Lesson 5 (PROFINET)
      {
        lessonId: lesson9_5.id,
        question: "Sur quelle technologie est basé PROFINET ?",
        options: JSON.stringify([
          "RS-485",
          "CAN",
          "Ethernet",
          "USB"
        ]),
        correctIndex: 2,
        explanation: "PROFINET est basé sur Ethernet standard (IEEE 802.3), permettant l'utilisation de composants réseau standards.",
        order: 1,
      },
      {
        lessonId: lesson9_5.id,
        question: "Quel temps de cycle minimal atteint PROFINET IRT ?",
        options: JSON.stringify([
          "< 1 ms",
          "1-10 ms",
          "> 10 ms",
          "100 ms"
        ]),
        correctIndex: 0,
        explanation: "PROFINET IRT (Isochronous Real-Time) permet des temps de cycle inférieurs à 1 milliseconde pour le Motion Control.",
        order: 2,
      },
      {
        lessonId: lesson9_5.id,
        question: "Quelle classe PROFINET convient à l'automatisation standard ?",
        options: JSON.stringify([
          "NRT",
          "RT",
          "IRT",
          "TCP"
        ]),
        correctIndex: 1,
        explanation: "PROFINET RT (Real-Time) avec des temps de cycle de 1-10 ms convient à la plupart des applications d'automatisation.",
        order: 3,
      },
      {
        lessonId: lesson9_5.id,
        question: "Quelle topologie n'est PAS supportée par PROFINET ?",
        options: JSON.stringify([
          "Étoile",
          "Ligne",
          "Anneau",
          "Toutes sont supportées"
        ]),
        correctIndex: 3,
        explanation: "PROFINET supporte les topologies étoile, ligne et anneau, offrant une grande flexibilité d'installation.",
        order: 4,
      },
      {
        lessonId: lesson9_5.id,
        question: "Quels protocoles IT sont compatibles avec PROFINET ?",
        options: JSON.stringify([
          "TCP/IP uniquement",
          "HTTP uniquement",
          "TCP/IP, HTTP, FTP et autres",
          "Aucun protocole IT"
        ]),
        correctIndex: 2,
        explanation: "PROFINET est compatible avec les protocoles IT standards (TCP/IP, HTTP, FTP) pour l'intégration aux systèmes d'information.",
        order: 5,
      },
      // Quiz Module 9 - Lesson 6 (Diagnostic)
      {
        lessonId: lesson9_6.id,
        question: "Qu'affiche l'écran intégré de la CPU S7-1500 ?",
        options: JSON.stringify([
          "Uniquement l'heure",
          "État, IP, diagnostics, nom du projet",
          "Le programme LADDER",
          "La température de la CPU"
        ]),
        correctIndex: 1,
        explanation: "L'écran intégré affiche l'état (RUN/STOP), l'adresse IP, les diagnostics, le nom du projet et l'heure.",
        order: 1,
      },
      {
        lessonId: lesson9_6.id,
        question: "Que contient le buffer de diagnostic ?",
        options: JSON.stringify([
          "Uniquement les erreurs",
          "L'historique des événements (états, défauts, messages)",
          "Le code du programme",
          "Les valeurs des variables"
        ]),
        correctIndex: 1,
        explanation: "Le buffer de diagnostic enregistre automatiquement les changements d'état, défauts matériels, erreurs et messages.",
        order: 2,
      },
      {
        lessonId: lesson9_6.id,
        question: "Comment accède-t-on au serveur Web intégré ?",
        options: JSON.stringify([
          "Via TIA Portal uniquement",
          "Via un navigateur web à l'adresse IP de la CPU",
          "Via une application dédiée",
          "Via le port série"
        ]),
        correctIndex: 1,
        explanation: "Le serveur Web intégré est accessible via n'importe quel navigateur web en entrant l'adresse IP de la CPU.",
        order: 3,
      },
      {
        lessonId: lesson9_6.id,
        question: "Pourquoi le serveur Web est-il désactivé par défaut ?",
        options: JSON.stringify([
          "Pour économiser la mémoire",
          "Pour des raisons de sécurité",
          "Car il n'est pas utile",
          "Pour accélérer le démarrage"
        ]),
        correctIndex: 1,
        explanation: "Le serveur Web est désactivé par défaut pour des raisons de sécurité, évitant les accès non autorisés au système.",
        order: 4,
      },
      {
        lessonId: lesson9_6.id,
        question: "Quelle page Web permet de lire/écrire des variables ?",
        options: JSON.stringify([
          "Vue d'ensemble",
          "Diagnostic",
          "Variables",
          "Messages"
        ]),
        correctIndex: 2,
        explanation: "La page Variables du serveur Web permet de lire et écrire des tags pour les tests et le diagnostic.",
        order: 5,
      },
      // Quiz Module 10 - Lesson 3 (Variables et types)
      {
        lessonId: lesson10_3.id,
        question: "Quelle est la plage d'un type Int en S7 ?",
        options: JSON.stringify([
          "0 à 255",
          "-32768 à 32767",
          "0 à 65535",
          "-128 à 127"
        ]),
        correctIndex: 1,
        explanation: "Le type Int (16 bits signé) a une plage de -32768 à +32767 sur les automates Siemens.",
        order: 1,
      },
      {
        lessonId: lesson10_3.id,
        question: "Quel type utiliser pour stocker une température avec décimales ?",
        options: JSON.stringify([
          "Int",
          "DInt",
          "Real",
          "Word"
        ]),
        correctIndex: 2,
        explanation: "Le type Real (32 bits flottant) permet de stocker des valeurs décimales comme les températures.",
        order: 2,
      },
      {
        lessonId: lesson10_3.id,
        question: "Que représente %I0.0 ?",
        options: JSON.stringify([
          "Sortie 0, bit 0",
          "Entrée 0, bit 0",
          "Mémento 0, bit 0",
          "Data block 0, bit 0"
        ]),
        correctIndex: 1,
        explanation: "%I représente les entrées (Input). I0.0 est l'entrée numéro 0, bit 0 (première entrée).",
        order: 3,
      },
      {
        lessonId: lesson10_3.id,
        question: "Quelle est la différence entre variables API et variables locales ?",
        options: JSON.stringify([
          "Il n'y a pas de différence",
          "Les API sont globales, les locales sont internes à un bloc",
          "Les locales sont plus rapides",
          "Les API sont en lecture seule"
        ]),
        correctIndex: 1,
        explanation: "Les variables API (PLC Tags) sont globales et accessibles partout, les locales sont confinées à un bloc.",
        order: 4,
      },
      {
        lessonId: lesson10_3.id,
        question: "Pourquoi privilégier les noms symboliques aux adresses absolues ?",
        options: JSON.stringify([
          "C'est plus rapide",
          "Cela améliore la lisibilité et la maintenance",
          "C'est obligatoire",
          "Cela réduit la taille du programme"
        ]),
        correctIndex: 1,
        explanation: "Les noms symboliques rendent le programme lisible et facilitent la maintenance, sans impact sur les performances.",
        order: 5,
      },
      // Quiz Module 10 - Lesson 4 (Instructions LAD)
      {
        lessonId: lesson10_4.id,
        question: "Que représente le symbole --[ ]-- en LAD ?",
        options: JSON.stringify([
          "Une bobine",
          "Un contact normalement ouvert",
          "Un contact normalement fermé",
          "Une temporisation"
        ]),
        correctIndex: 1,
        explanation: "--[ ]-- représente un contact normalement ouvert (NO) qui laisse passer le courant quand l'entrée est vraie.",
        order: 1,
      },
      {
        lessonId: lesson10_4.id,
        question: "Que fait une bobine Set --(S)-- ?",
        options: JSON.stringify([
          "Active la sortie tant que l'entrée est vraie",
          "Mémorise l'état à 1 même si l'entrée redevient fausse",
          "Inverse l'état de la sortie",
          "Désactive la sortie"
        ]),
        correctIndex: 1,
        explanation: "La bobine Set mémorise l'état à 1 (SET). Elle reste active même si la condition d'entrée disparaît.",
        order: 2,
      },
      {
        lessonId: lesson10_4.id,
        question: "Comment réaliser un auto-maintien en LAD ?",
        options: JSON.stringify([
          "Avec une bobine Set",
          "Avec un contact de la sortie en parallèle du bouton Start",
          "Avec une temporisation",
          "C'est impossible en LAD"
        ]),
        correctIndex: 1,
        explanation: "L'auto-maintien se réalise en mettant un contact de la sortie en parallèle du bouton de démarrage.",
        order: 3,
      },
      {
        lessonId: lesson10_4.id,
        question: "Que détecte un contact --[P]-- ?",
        options: JSON.stringify([
          "Un état permanent",
          "Un front montant (passage de 0 à 1)",
          "Un front descendant",
          "Une impulsion"
        ]),
        correctIndex: 1,
        explanation: "Le contact P détecte un front montant, générant une impulsion d'un cycle quand l'entrée passe de 0 à 1.",
        order: 4,
      },
      {
        lessonId: lesson10_4.id,
        question: "Dans quel sens circule le flux d'énergie en LAD ?",
        options: JSON.stringify([
          "De droite à gauche",
          "De gauche à droite",
          "De haut en bas",
          "Dans les deux sens"
        ]),
        correctIndex: 1,
        explanation: "En LAD, le flux d'énergie circule de gauche (barre d'alimentation) vers la droite (bobines).",
        order: 5,
      },
      // Quiz Module 10 - Lesson 5 (Temporisateurs/Compteurs)
      {
        lessonId: lesson10_5.id,
        question: "Que fait un temporisateur TON ?",
        options: JSON.stringify([
          "Retarde la désactivation",
          "Retarde l'activation",
          "Génère une impulsion de durée fixe",
          "Compte des événements"
        ]),
        correctIndex: 1,
        explanation: "TON (Timer On Delay) retarde l'activation de la sortie : Q devient vrai après que IN soit resté vrai pendant PT.",
        order: 1,
      },
      {
        lessonId: lesson10_5.id,
        question: "Quelle est la différence entre TOF et TON ?",
        options: JSON.stringify([
          "TOF est plus rapide",
          "TOF retarde la désactivation, TON retarde l'activation",
          "TOF compte en décrémentant",
          "Il n'y a pas de différence"
        ]),
        correctIndex: 1,
        explanation: "TON retarde l'activation (ON delay), TOF retarde la désactivation (OFF delay) de la sortie.",
        order: 2,
      },
      {
        lessonId: lesson10_5.id,
        question: "Que représente PT dans un temporisateur ?",
        options: JSON.stringify([
          "Le temps écoulé",
          "Le temps de preset (consigne)",
          "La période",
          "Le temps de cycle"
        ]),
        correctIndex: 1,
        explanation: "PT (Preset Time) est le temps de consigne, la durée que doit atteindre le temporisateur.",
        order: 3,
      },
      {
        lessonId: lesson10_5.id,
        question: "Que fait un compteur CTU à chaque front montant sur CU ?",
        options: JSON.stringify([
          "Il se réinitialise",
          "Il incrémente sa valeur",
          "Il décrémente sa valeur",
          "Il change d'état"
        ]),
        correctIndex: 1,
        explanation: "CTU (Counter Up) incrémente sa valeur CV de 1 à chaque front montant sur l'entrée CU.",
        order: 4,
      },
      {
        lessonId: lesson10_5.id,
        question: "Quand la sortie Q d'un CTU devient-elle vraie ?",
        options: JSON.stringify([
          "À chaque incrémentation",
          "Quand CV atteint ou dépasse PV",
          "Quand CV atteint zéro",
          "À chaque front montant"
        ]),
        correctIndex: 1,
        explanation: "La sortie Q devient vraie quand la valeur courante CV atteint ou dépasse la valeur de preset PV.",
        order: 5,
      },
      // Quiz Module 10 - Lesson 6 (Mise en service)
      {
        lessonId: lesson10_6.id,
        question: "Quelle est la première étape de mise en service ?",
        options: JSON.stringify([
          "Charger le programme",
          "Passer en RUN",
          "Compiler le projet",
          "Tester les E/S"
        ]),
        correctIndex: 2,
        explanation: "La compilation vérifie les erreurs de syntaxe et prépare le projet avant tout chargement.",
        order: 1,
      },
      {
        lessonId: lesson10_6.id,
        question: "Que permettent les tables de visualisation ?",
        options: JSON.stringify([
          "Modifier le programme",
          "Surveiller et modifier des variables en temps réel",
          "Configurer le matériel",
          "Compiler le projet"
        ]),
        correctIndex: 1,
        explanation: "Les tables de visualisation permettent de surveiller des variables et de modifier leurs valeurs pour les tests.",
        order: 2,
      },
      {
        lessonId: lesson10_6.id,
        question: "Quel OB s'exécute au démarrage de la CPU ?",
        options: JSON.stringify([
          "OB1",
          "OB80",
          "OB100",
          "OB121"
        ]),
        correctIndex: 2,
        explanation: "OB100 (Startup) s'exécute une fois au passage de STOP à RUN, avant que OB1 ne commence son cycle.",
        order: 3,
      },
      {
        lessonId: lesson10_6.id,
        question: "Que signifient les lignes vertes en visualisation LAD ?",
        options: JSON.stringify([
          "Une erreur de syntaxe",
          "Le flux d'énergie passe (condition vraie)",
          "La ligne est sélectionnée",
          "Un commentaire"
        ]),
        correctIndex: 1,
        explanation: "Les lignes vertes en visualisation indiquent que le flux d'énergie passe, les conditions sont vraies.",
        order: 4,
      },
      {
        lessonId: lesson10_6.id,
        question: "Pourquoi est-il dangereux de forcer des sorties en production ?",
        options: JSON.stringify([
          "Cela use les sorties",
          "Cela peut provoquer des mouvements inattendus",
          "Cela efface le programme",
          "Cela déconnecte le réseau"
        ]),
        correctIndex: 1,
        explanation: "Forcer des sorties peut activer des actionneurs de manière inattendue, créant des situations dangereuses.",
        order: 5,
      },
      // Quiz Module 11 - Lesson 3 (UDT)
      {
        lessonId: lesson11_3.id,
        question: "Que signifie UDT ?",
        options: JSON.stringify([
          "Universal Data Type",
          "User Defined Type",
          "Unit Data Transfer",
          "Unified Design Tool"
        ]),
        correctIndex: 1,
        explanation: "UDT signifie User Defined Type (Type Défini par l'Utilisateur), une structure de données personnalisée.",
        order: 1,
      },
      {
        lessonId: lesson11_3.id,
        question: "Quel est l'avantage principal des UDT ?",
        options: JSON.stringify([
          "Ils accélèrent l'exécution",
          "Ils permettent de standardiser et réutiliser des structures de données",
          "Ils réduisent la mémoire utilisée",
          "Ils sont obligatoires pour les FB"
        ]),
        correctIndex: 1,
        explanation: "Les UDT permettent de définir une structure une fois et de la réutiliser pour plusieurs instances identiques.",
        order: 2,
      },
      {
        lessonId: lesson11_3.id,
        question: "Comment accède-t-on à un champ d'un UDT dans un DB ?",
        options: JSON.stringify([
          "DB.UDT.Champ",
          "DB.Instance.Champ",
          "UDT.Champ",
          "Champ.DB"
        ]),
        correctIndex: 1,
        explanation: "On accède via DB.Instance.Champ, exemple : \"DB_Moteurs\".Moteur_Convoyeur.Vitesse_Cons.",
        order: 3,
      },
      {
        lessonId: lesson11_3.id,
        question: "Quand utiliser un UDT plutôt que des variables séparées ?",
        options: JSON.stringify([
          "Toujours",
          "Quand on a des données liées et répétées (plusieurs moteurs, stations...)",
          "Jamais, c'est déconseillé",
          "Uniquement pour les chaînes de caractères"
        ]),
        correctIndex: 1,
        explanation: "Les UDT sont utiles quand on a des groupes de données liées qui se répètent pour plusieurs équipements similaires.",
        order: 4,
      },
      {
        lessonId: lesson11_3.id,
        question: "Un UDT peut-il contenir d'autres UDT ?",
        options: JSON.stringify([
          "Non, c'est interdit",
          "Oui, on peut imbriquer des UDT",
          "Seulement en SCL",
          "Seulement 2 niveaux"
        ]),
        correctIndex: 1,
        explanation: "Les UDT peuvent contenir d'autres UDT, permettant de créer des structures de données hiérarchiques.",
        order: 5,
      },
      // Quiz Module 11 - Lesson 4 (Accès optimisé)
      {
        lessonId: lesson11_4.id,
        question: "Quel type d'accès est par défaut sur S7-1500 ?",
        options: JSON.stringify([
          "Accès standard",
          "Accès optimisé",
          "Accès direct",
          "Aucun par défaut"
        ]),
        correctIndex: 1,
        explanation: "L'accès optimisé est le mode par défaut sur S7-1500, utilisant des adresses symboliques uniquement.",
        order: 1,
      },
      {
        lessonId: lesson11_4.id,
        question: "Quel est l'avantage de l'accès optimisé ?",
        options: JSON.stringify([
          "Compatible avec S7-300",
          "Meilleures performances et optimisation mémoire automatique",
          "Permet l'accès indirect",
          "Réduit la taille du code"
        ]),
        correctIndex: 1,
        explanation: "L'accès optimisé offre de meilleures performances car le compilateur optimise automatiquement l'agencement mémoire.",
        order: 2,
      },
      {
        lessonId: lesson11_4.id,
        question: "Quand utiliser l'accès standard plutôt qu'optimisé ?",
        options: JSON.stringify([
          "Pour de meilleures performances",
          "Pour la communication avec des systèmes externes qui nécessitent des adresses fixes",
          "Toujours préférer le standard",
          "Pour les grandes structures"
        ]),
        correctIndex: 1,
        explanation: "L'accès standard est nécessaire pour la communication avec des systèmes externes (OPC UA, IHM tierces) qui ont besoin d'adresses fixes.",
        order: 3,
      },
      {
        lessonId: lesson11_4.id,
        question: "Comment accède-t-on à une variable en mode standard ?",
        options: JSON.stringify([
          "Par nom symbolique uniquement",
          "Par adresse absolue (DB1.DBW10)",
          "Par pointeur uniquement",
          "Ce n'est pas possible"
        ]),
        correctIndex: 1,
        explanation: "En mode standard, on peut utiliser des adresses absolues comme DB1.DBW10 (Word à l'adresse 10 du DB1).",
        order: 4,
      },
      {
        lessonId: lesson11_4.id,
        question: "Où configure-t-on le type d'accès d'un DB ?",
        options: JSON.stringify([
          "Dans le programme",
          "Dans les propriétés du DB",
          "Dans la configuration matérielle",
          "Ce n'est pas configurable"
        ]),
        correctIndex: 1,
        explanation: "Le type d'accès (optimisé ou standard) se configure dans les propriétés du bloc de données dans TIA Portal.",
        order: 5,
      },
      // Quiz Module 11 - Lesson 5 (FB et instances)
      {
        lessonId: lesson11_5.id,
        question: "Quelle est la différence entre FB et FC ?",
        options: JSON.stringify([
          "FB est plus rapide",
          "FB a une mémoire (DB d'instance), FC n'en a pas",
          "FC ne peut pas avoir de paramètres",
          "Il n'y a pas de différence"
        ]),
        correctIndex: 1,
        explanation: "Un FB (Function Block) possède un DB d'instance pour stocker ses variables statiques, contrairement à un FC.",
        order: 1,
      },
      {
        lessonId: lesson11_5.id,
        question: "Que contient un DB d'instance ?",
        options: JSON.stringify([
          "Le code du FB",
          "Les variables statiques et paramètres du FB",
          "Uniquement les entrées du FB",
          "La configuration matérielle"
        ]),
        correctIndex: 1,
        explanation: "Le DB d'instance stocke les variables statiques (STAT), les paramètres d'entrée/sortie et leur valeur actuelle.",
        order: 2,
      },
      {
        lessonId: lesson11_5.id,
        question: "Pourquoi utiliser plusieurs instances d'un même FB ?",
        options: JSON.stringify([
          "Pour accélérer l'exécution",
          "Pour gérer plusieurs équipements similaires avec le même code",
          "Pour économiser de la mémoire",
          "C'est obligatoire"
        ]),
        correctIndex: 1,
        explanation: "Un même FB peut contrôler plusieurs équipements similaires (moteurs, vérins) en utilisant des DB d'instance différents.",
        order: 3,
      },
      {
        lessonId: lesson11_5.id,
        question: "Que sont les variables statiques dans un FB ?",
        options: JSON.stringify([
          "Des constantes",
          "Des variables qui conservent leur valeur entre les appels",
          "Des variables d'entrée",
          "Des variables temporaires"
        ]),
        correctIndex: 1,
        explanation: "Les variables statiques (VAR) conservent leur valeur entre les cycles d'appel du FB, stockées dans le DB d'instance.",
        order: 4,
      },
      {
        lessonId: lesson11_5.id,
        question: "Qu'est-ce qu'une multi-instance ?",
        options: JSON.stringify([
          "Appeler un FB plusieurs fois",
          "Plusieurs FB instanciés dans un seul DB parent",
          "Un FB avec plusieurs sorties",
          "Une erreur de programmation"
        ]),
        correctIndex: 1,
        explanation: "La multi-instance permet d'instancier plusieurs FB dans un seul DB parent, simplifiant la structure.",
        order: 5,
      },
      // Quiz Module 11 - Lesson 6 (Bonnes pratiques)
      {
        lessonId: lesson11_6.id,
        question: "Où devrait se trouver la logique principale du programme ?",
        options: JSON.stringify([
          "Directement dans OB1",
          "Dans des FB et FC appelés depuis OB1",
          "Dans les DB",
          "Dans OB100"
        ]),
        correctIndex: 1,
        explanation: "OB1 ne devrait contenir que des appels de blocs. La logique se place dans des FB et FC bien structurés.",
        order: 1,
      },
      {
        lessonId: lesson11_6.id,
        question: "Quel préfixe recommandé pour une entrée numérique ?",
        options: JSON.stringify([
          "Q_ ou S_",
          "I_ ou E_",
          "M_",
          "DB_"
        ]),
        correctIndex: 1,
        explanation: "Les conventions recommandent I_ (Input) ou E_ (Entrée) pour identifier clairement les entrées numériques.",
        order: 2,
      },
      {
        lessonId: lesson11_6.id,
        question: "Pourquoi éviter les valeurs en dur dans le code ?",
        options: JSON.stringify([
          "C'est plus rapide",
          "Pour faciliter les modifications sans recompiler la logique",
          "C'est interdit",
          "Pour réduire la mémoire"
        ]),
        correctIndex: 1,
        explanation: "Placer les valeurs dans des DB permet de les modifier facilement (via IHM, serveur Web) sans toucher au code.",
        order: 3,
      },
      {
        lessonId: lesson11_6.id,
        question: "Combien de FB devrait-on créer idéalement par équipement ?",
        options: JSON.stringify([
          "Aucun, tout dans OB1",
          "Un FB par type d'équipement",
          "Un FB pour tout le programme",
          "Autant que de lignes de code"
        ]),
        correctIndex: 1,
        explanation: "Un FB par type d'équipement (moteur, vérin, station) permet une organisation claire et réutilisable.",
        order: 4,
      },
      {
        lessonId: lesson11_6.id,
        question: "À quoi servent les dossiers dans l'arbre du projet ?",
        options: JSON.stringify([
          "À rien, c'est décoratif",
          "À organiser les blocs par fonction ou partie de machine",
          "À accélérer la compilation",
          "À protéger le code"
        ]),
        correctIndex: 1,
        explanation: "Les dossiers permettent d'organiser les blocs logiquement, facilitant la navigation dans les grands projets.",
        order: 5,
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
