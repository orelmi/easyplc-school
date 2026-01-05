import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { lessonTranslations, quizTranslations, cncLessonTranslations, cncQuizTranslations, siemensLessonTranslations, siemensQuizTranslations } from './translations.js'
import { vfdLessonTranslations, vfdQuizTranslations } from './vfd-translations.js'

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
    { order: 11, title: "S7-1500 Data Blocks", description: "Master data blocks (DB) and structured programming" },
    { order: 12, title: "Introduction to VFDs", description: "Discover the fundamentals of variable frequency drives" },
    { order: 13, title: "VFD Configuration", description: "Learn to configure and set up a variable frequency drive" },
    { order: 14, title: "VFD Communication and Diagnostics", description: "Master industrial communication and VFD diagnostics" },
    { order: 15, title: "Introduction to Positioning", description: "Discover the basics of motion control and positioning" },
    { order: 16, title: "Stepper Motors and Servomotors", description: "Understand different motor types for positioning" },
    { order: 17, title: "Motion Programming", description: "Learn to program trajectories and motion profiles" }
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
    { order: 11, title: "Bloques de Datos S7-1500", description: "Domine los bloques de datos (DB) y la programación estructurada" },
    { order: 12, title: "Introducción a Variadores", description: "Descubra los fundamentos de los variadores de frecuencia" },
    { order: 13, title: "Configuración de Variadores", description: "Aprenda a configurar y parametrizar variadores de velocidad" },
    { order: 14, title: "Comunicación y Diagnóstico VFD", description: "Domine la comunicación industrial y diagnóstico de variadores" },
    { order: 15, title: "Introducción al Posicionamiento", description: "Descubra las bases del control de movimiento y posicionamiento" },
    { order: 16, title: "Motores Paso a Paso y Servomotores", description: "Comprenda los diferentes tipos de motores para posicionamiento" },
    { order: 17, title: "Programación del Movimiento", description: "Aprenda a programar trayectorias y perfiles de movimiento" }
  ]
} as const

// Cursus translations
const cursusTranslations = {
  en: [
    { order: 1, title: "Industrial Automation", description: "Complete learning path for industrial automation and PLC programming" },
    { order: 2, title: "CNC Machining", description: "Learn to program and operate CNC machines" },
    { order: 3, title: "Siemens Automation", description: "Specialized path for Siemens S7-1500 PLCs and TIA Portal" },
    { order: 4, title: "Variable Speed Drives and Positioning", description: "Master variable frequency drives and motion control" }
  ],
  es: [
    { order: 1, title: "Automatización Industrial", description: "Ruta de aprendizaje completa para automatización industrial y programación de PLCs" },
    { order: 2, title: "Mecanizado CNC", description: "Aprenda a programar y operar máquinas CNC" },
    { order: 3, title: "Automatización Siemens", description: "Ruta especializada para PLCs Siemens S7-1500 y TIA Portal" },
    { order: 4, title: "Variadores de Velocidad y Posicionamiento", description: "Domine los variadores de frecuencia y el control de movimiento" }
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

  // Create VFD (Variable Frequency Drive) Modules
  const module12 = await prisma.module.create({
    data: {
      title: "Introduction aux variateurs de vitesse",
      description: "Découvrez les principes fondamentaux des variateurs de fréquence",
      order: 12,
      icon: "⚡",
      color: "#7c3aed",
      isLocked: false,
      requiredXp: 0,
    },
  })

  const module13 = await prisma.module.create({
    data: {
      title: "Paramétrage des variateurs",
      description: "Apprenez à configurer et paramétrer un variateur de vitesse",
      order: 13,
      icon: "🎛️",
      color: "#a855f7",
      isLocked: true,
      requiredXp: 300,
    },
  })

  const module14 = await prisma.module.create({
    data: {
      title: "Communication et diagnostic VFD",
      description: "Maîtrisez la communication industrielle et le diagnostic des variateurs",
      order: 14,
      icon: "📡",
      color: "#c084fc",
      isLocked: true,
      requiredXp: 600,
    },
  })

  // Create Positioning/Motion Control Modules
  const module15 = await prisma.module.create({
    data: {
      title: "Introduction au positionnement",
      description: "Découvrez les bases du contrôle de mouvement et du positionnement",
      order: 15,
      icon: "🎯",
      color: "#dc2626",
      isLocked: false,
      requiredXp: 0,
    },
  })

  const module16 = await prisma.module.create({
    data: {
      title: "Moteurs pas à pas et servomoteurs",
      description: "Comprenez les différents types de moteurs pour le positionnement",
      order: 16,
      icon: "🔄",
      color: "#ea580c",
      isLocked: true,
      requiredXp: 300,
    },
  })

  const module17 = await prisma.module.create({
    data: {
      title: "Programmation du mouvement",
      description: "Apprenez à programmer des trajectoires et des profils de mouvement",
      order: 17,
      icon: "📈",
      color: "#f97316",
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

  const cursusVFD = await prisma.cursus.create({
    data: {
      title: "Variation de vitesse et positionnement",
      description: "Maîtrisez les variateurs de fréquence et le contrôle de mouvement",
      icon: "⚡",
      color: "#7c3aed",
      order: 4,
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
    const cursusVFDTrans = cursusTranslations[lang].find(t => t.order === 4)
    if (cursusVFDTrans) {
      await prisma.cursusTranslation.create({
        data: {
          cursusId: cursusVFD.id,
          language: lang,
          title: cursusVFDTrans.title,
          description: cursusVFDTrans.description
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

  // Associate Modules to Cursus VFD/Positionnement
  await prisma.cursusModule.createMany({
    data: [
      { cursusId: cursusVFD.id, moduleId: module1.id, order: 1, isRequired: true },   // Shared foundation
      { cursusId: cursusVFD.id, moduleId: module2.id, order: 2, isRequired: true },   // Shared foundation
      { cursusId: cursusVFD.id, moduleId: module4.id, order: 3, isRequired: true },   // Sensors/Actuators (important for motion)
      { cursusId: cursusVFD.id, moduleId: module12.id, order: 4, isRequired: true },  // Intro VFD
      { cursusId: cursusVFD.id, moduleId: module13.id, order: 5, isRequired: true },  // VFD Configuration
      { cursusId: cursusVFD.id, moduleId: module14.id, order: 6, isRequired: true },  // VFD Communication
      { cursusId: cursusVFD.id, moduleId: module15.id, order: 7, isRequired: true },  // Intro Positioning
      { cursusId: cursusVFD.id, moduleId: module16.id, order: 8, isRequired: true },  // Motors
      { cursusId: cursusVFD.id, moduleId: module17.id, order: 9, isRequired: true },  // Motion Programming
    ]
  })

  // Create Module Translations
  const modules = [module1, module2, module3, module4, module5, module6, module7, module8, module9, module10, module11, module12, module13, module14, module15, module16, module17]
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

  // Create Lessons for Module 12 (Introduction aux variateurs de vitesse)
  const lesson12_1 = await prisma.lesson.create({
    data: {
      moduleId: module12.id,
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
      }),
    },
  })

  const lesson12_2 = await prisma.lesson.create({
    data: {
      moduleId: module12.id,
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
      }),
    },
  })

  const lesson12_3 = await prisma.lesson.create({
    data: {
      moduleId: module12.id,
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
      }),
    },
  })

  const lesson12_4 = await prisma.lesson.create({
    data: {
      moduleId: module12.id,
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
      }),
    },
  })

  const lesson12_5 = await prisma.lesson.create({
    data: {
      moduleId: module12.id,
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
      }),
    },
  })

  const lesson12_6 = await prisma.lesson.create({
    data: {
      moduleId: module12.id,
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
      }),
    },
  })

  // Create Lessons for Module 13 (Paramétrage des variateurs)
  const lesson13_1 = await prisma.lesson.create({
    data: {
      moduleId: module13.id,
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
      }),
    },
  })

  const lesson13_2 = await prisma.lesson.create({
    data: {
      moduleId: module13.id,
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
      }),
    },
  })

  const lesson13_3 = await prisma.lesson.create({
    data: {
      moduleId: module13.id,
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
      }),
    },
  })

  const lesson13_4 = await prisma.lesson.create({
    data: {
      moduleId: module13.id,
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
      }),
    },
  })

  const lesson13_5 = await prisma.lesson.create({
    data: {
      moduleId: module13.id,
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
      }),
    },
  })

  const lesson13_6 = await prisma.lesson.create({
    data: {
      moduleId: module13.id,
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
      }),
    },
  })

  // Create Lessons for Module 14 (Communication et diagnostic VFD)
  const lesson14_1 = await prisma.lesson.create({
    data: {
      moduleId: module14.id,
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
      }),
    },
  })

  const lesson14_2 = await prisma.lesson.create({
    data: {
      moduleId: module14.id,
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
      }),
    },
  })

  const lesson14_3 = await prisma.lesson.create({
    data: {
      moduleId: module14.id,
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
      }),
    },
  })

  const lesson14_4 = await prisma.lesson.create({
    data: {
      moduleId: module14.id,
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
      }),
    },
  })

  const lesson14_5 = await prisma.lesson.create({
    data: {
      moduleId: module14.id,
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
      }),
    },
  })

  const lesson14_6 = await prisma.lesson.create({
    data: {
      moduleId: module14.id,
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
      }),
    },
  })

  // Create Lessons for Module 15 (Introduction au positionnement)
  const lesson15_1 = await prisma.lesson.create({
    data: {
      moduleId: module15.id,
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
      }),
    },
  })

  const lesson15_2 = await prisma.lesson.create({
    data: {
      moduleId: module15.id,
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
      }),
    },
  })

  const lesson15_3 = await prisma.lesson.create({
    data: {
      moduleId: module15.id,
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
      }),
    },
  })

  const lesson15_4 = await prisma.lesson.create({
    data: {
      moduleId: module15.id,
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
      }),
    },
  })

  const lesson15_5 = await prisma.lesson.create({
    data: {
      moduleId: module15.id,
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
      }),
    },
  })

  const lesson15_6 = await prisma.lesson.create({
    data: {
      moduleId: module15.id,
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
      }),
    },
  })

  // Create Lessons for Module 16 (Moteurs pas à pas et servomoteurs)
  const lesson16_1 = await prisma.lesson.create({
    data: {
      moduleId: module16.id,
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
      }),
    },
  })

  const lesson16_2 = await prisma.lesson.create({
    data: {
      moduleId: module16.id,
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
      }),
    },
  })

  const lesson16_3 = await prisma.lesson.create({
    data: {
      moduleId: module16.id,
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
      }),
    },
  })

  const lesson16_4 = await prisma.lesson.create({
    data: {
      moduleId: module16.id,
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
      }),
    },
  })

  const lesson16_5 = await prisma.lesson.create({
    data: {
      moduleId: module16.id,
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
      }),
    },
  })

  const lesson16_6 = await prisma.lesson.create({
    data: {
      moduleId: module16.id,
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
      }),
    },
  })

  // Create Lessons for Module 17 (Programmation du mouvement)
  const lesson17_1 = await prisma.lesson.create({
    data: {
      moduleId: module17.id,
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
      }),
    },
  })

  const lesson17_2 = await prisma.lesson.create({
    data: {
      moduleId: module17.id,
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
      }),
    },
  })

  const lesson17_3 = await prisma.lesson.create({
    data: {
      moduleId: module17.id,
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
      }),
    },
  })

  const lesson17_4 = await prisma.lesson.create({
    data: {
      moduleId: module17.id,
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
      }),
    },
  })

  const lesson17_5 = await prisma.lesson.create({
    data: {
      moduleId: module17.id,
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
      }),
    },
  })

  const lesson17_6 = await prisma.lesson.create({
    data: {
      moduleId: module17.id,
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
      // Quiz Module 1 - Lesson 4 (5 questions) - Les marques et fabricants
      {
        lessonId: lesson1_4.id,
        question: "Quel fabricant d'automates a environ 30% de parts de marché mondial ?",
        options: JSON.stringify([
          "Allen-Bradley",
          "Siemens",
          "Schneider Electric",
          "Omron"
        ]),
        correctIndex: 1,
        explanation: "Siemens est le leader mondial avec environ 30% de parts de marché.",
        order: 1,
      },
      {
        lessonId: lesson1_4.id,
        question: "Quel est le logiciel de programmation de Siemens ?",
        options: JSON.stringify([
          "Unity Pro",
          "TIA Portal",
          "RSLogix",
          "GX Works"
        ]),
        correctIndex: 1,
        explanation: "TIA Portal (Totally Integrated Automation Portal) est l'environnement de programmation de Siemens.",
        order: 2,
      },
      {
        lessonId: lesson1_4.id,
        question: "Quelle est la gamme haut de gamme de Siemens ?",
        options: JSON.stringify([
          "S7-300",
          "S7-1200",
          "S7-1500",
          "LOGO!"
        ]),
        correctIndex: 2,
        explanation: "Le S7-1500 est la gamme haute performance de Siemens, offrant les meilleures performances.",
        order: 3,
      },
      {
        lessonId: lesson1_4.id,
        question: "Quel fabricant français propose la gamme Modicon ?",
        options: JSON.stringify([
          "Siemens",
          "Schneider Electric",
          "Omron",
          "ABB"
        ]),
        correctIndex: 1,
        explanation: "Schneider Electric, champion français, propose la gamme Modicon.",
        order: 4,
      },
      {
        lessonId: lesson1_4.id,
        question: "Quel critère influence souvent le choix d'un fabricant d'automates ?",
        options: JSON.stringify([
          "La couleur de l'automate",
          "Le secteur d'activité et les compétences disponibles",
          "Le poids de l'automate",
          "Le prix uniquement"
        ]),
        correctIndex: 1,
        explanation: "Le choix dépend du secteur, de la région et des compétences disponibles dans l'entreprise.",
        order: 5,
      },
      // Quiz Module 1 - Lesson 5 (5 questions) - L'adressage des E/S
      {
        lessonId: lesson1_5.id,
        question: "Que signifie %I0.3 en notation Siemens ?",
        options: JSON.stringify([
          "Sortie 3 de l'octet 0",
          "Entrée bit 3 de l'octet 0",
          "Mémoire interne 3",
          "Entrée mot 3"
        ]),
        correctIndex: 1,
        explanation: "%I0.3 signifie Entrée (I) bit 3 de l'octet 0.",
        order: 1,
      },
      {
        lessonId: lesson1_5.id,
        question: "Quelle lettre désigne une sortie en notation IEC ?",
        options: JSON.stringify([
          "I",
          "Q",
          "M",
          "S"
        ]),
        correctIndex: 1,
        explanation: "Q (Query/Output) désigne les sorties, I les entrées, M la mémoire interne.",
        order: 2,
      },
      {
        lessonId: lesson1_5.id,
        question: "Que représente %IW0 en notation Siemens ?",
        options: JSON.stringify([
          "Un bit d'entrée",
          "Un mot d'entrée (16 bits)",
          "Une sortie",
          "Un octet de mémoire"
        ]),
        correctIndex: 1,
        explanation: "W = Word (mot de 16 bits), donc %IW0 est un mot d'entrée.",
        order: 3,
      },
      {
        lessonId: lesson1_5.id,
        question: "Quelle bonne pratique est recommandée pour l'adressage ?",
        options: JSON.stringify([
          "Utiliser uniquement des adresses numériques",
          "Utiliser des noms symboliques comme Bouton_Start",
          "Ne pas documenter les adresses",
          "Changer les adresses fréquemment"
        ]),
        correctIndex: 1,
        explanation: "Les noms symboliques (Bouton_Start plutôt que %I0.0) rendent le programme plus lisible.",
        order: 4,
      },
      {
        lessonId: lesson1_5.id,
        question: "Quelle notation utilise Allen-Bradley pour les entrées ?",
        options: JSON.stringify([
          "%I0.0",
          "I:0/0",
          "E0.0",
          "IN[0]"
        ]),
        correctIndex: 1,
        explanation: "Allen-Bradley utilise la notation I:module/bit, par exemple I:0/0.",
        order: 5,
      },
      // Quiz Module 1 - Lesson 6 (5 questions) - Sécurité et normes
      {
        lessonId: lesson1_6.id,
        question: "Quelle norme définit la sécurité des machines - équipement électrique ?",
        options: JSON.stringify([
          "EN 60947",
          "EN 60204-1",
          "EN 62061",
          "EN ISO 9001"
        ]),
        correctIndex: 1,
        explanation: "EN 60204-1 définit la sécurité des machines concernant l'équipement électrique.",
        order: 1,
      },
      {
        lessonId: lesson1_6.id,
        question: "Combien de niveaux de performance (PL) définit la norme EN ISO 13849 ?",
        options: JSON.stringify([
          "3 niveaux",
          "4 niveaux",
          "5 niveaux (a à e)",
          "10 niveaux"
        ]),
        correctIndex: 2,
        explanation: "La norme définit 5 niveaux : PL a (risque faible) à PL e (risque très élevé).",
        order: 2,
      },
      {
        lessonId: lesson1_6.id,
        question: "Pourquoi les circuits d'arrêt d'urgence utilisent-ils un double canal ?",
        options: JSON.stringify([
          "Pour économiser de l'énergie",
          "Pour la redondance et la sécurité",
          "Pour la vitesse",
          "Pour réduire les coûts"
        ]),
        correctIndex: 1,
        explanation: "Le double canal assure la redondance : si un canal est défaillant, l'autre assure la sécurité.",
        order: 3,
      },
      {
        lessonId: lesson1_6.id,
        question: "Quel type d'automate est requis pour les fonctions de sécurité critiques ?",
        options: JSON.stringify([
          "N'importe quel automate",
          "Un automate de sécurité (ex: S7-1500F)",
          "Un micro-automate",
          "Un automate virtuel"
        ]),
        correctIndex: 1,
        explanation: "Les automates de sécurité (F = Failsafe) ont une architecture redondante certifiée SIL 3 / PL e.",
        order: 4,
      },
      {
        lessonId: lesson1_6.id,
        question: "Quel fabricant propose les relais de sécurité PNOZ ?",
        options: JSON.stringify([
          "Siemens",
          "Schneider",
          "Pilz",
          "ABB"
        ]),
        correctIndex: 2,
        explanation: "Pilz est spécialisé dans la sécurité et propose les relais PNOZ et automates PSS.",
        order: 5,
      },
      // Quiz Module 1 - Lesson 7 (5 questions) - Communication et réseaux
      {
        lessonId: lesson1_7.id,
        question: "Quel niveau de la pyramide CIM gère les commandes en temps réel ?",
        options: JSON.stringify([
          "Niveau entreprise",
          "Niveau atelier",
          "Niveau terrain",
          "Niveau gestion"
        ]),
        correctIndex: 2,
        explanation: "Le niveau terrain gère les capteurs, actionneurs et la commande en temps réel.",
        order: 1,
      },
      {
        lessonId: lesson1_7.id,
        question: "Quel protocole est le plus utilisé pour la communication terrain ?",
        options: JSON.stringify([
          "HTTP",
          "PROFINET / Ethernet/IP",
          "FTP",
          "SMTP"
        ]),
        correctIndex: 1,
        explanation: "PROFINET (Siemens) et Ethernet/IP (Allen-Bradley) sont les standards industriels actuels.",
        order: 2,
      },
      {
        lessonId: lesson1_7.id,
        question: "Quel est l'avantage principal de PROFINET par rapport à PROFIBUS ?",
        options: JSON.stringify([
          "Moins cher",
          "Plus lent",
          "Basé sur Ethernet, plus rapide et flexible",
          "Plus ancien"
        ]),
        correctIndex: 2,
        explanation: "PROFINET utilise Ethernet industriel, offrant plus de vitesse et de flexibilité.",
        order: 3,
      },
      {
        lessonId: lesson1_7.id,
        question: "Que signifie IHM dans le contexte industriel ?",
        options: JSON.stringify([
          "Interface Homme Machine",
          "Indicateur Haute Mesure",
          "Installation Hydraulique Motorisée",
          "Identifiant Haute Mémoire"
        ]),
        correctIndex: 0,
        explanation: "IHM signifie Interface Homme Machine, l'écran de supervision et commande.",
        order: 4,
      },
      {
        lessonId: lesson1_7.id,
        question: "Quel bus de terrain était dominant avant Ethernet industriel ?",
        options: JSON.stringify([
          "USB",
          "PROFIBUS / DeviceNet",
          "HDMI",
          "WiFi"
        ]),
        correctIndex: 1,
        explanation: "PROFIBUS (Siemens) et DeviceNet (Allen-Bradley) dominaient avant l'arrivée d'Ethernet industriel.",
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
      // Quiz Module 2 - Lesson 4 (5 questions) - NAND et NOR
      {
        lessonId: lesson2_4.id,
        question: "Que signifie NAND ?",
        options: JSON.stringify([
          "NOT AND (NON-ET)",
          "NOT ANOTHER",
          "NEUTRAL AND",
          "NEGATIVE AND"
        ]),
        correctIndex: 0,
        explanation: "NAND signifie NOT AND, soit NON-ET en français. C'est l'inverse de la fonction ET.",
        order: 1,
      },
      {
        lessonId: lesson2_4.id,
        question: "Quelle est la sortie de A NAND B si A=1 et B=1 ?",
        options: JSON.stringify([
          "1",
          "0",
          "Indéfini",
          "-1"
        ]),
        correctIndex: 1,
        explanation: "NAND est l'inverse de ET. Si A=1 et B=1, ET=1, donc NAND=0.",
        order: 2,
      },
      {
        lessonId: lesson2_4.id,
        question: "Quelle est la sortie de A NOR B si A=0 et B=0 ?",
        options: JSON.stringify([
          "0",
          "1",
          "Indéfini",
          "-1"
        ]),
        correctIndex: 1,
        explanation: "NOR est l'inverse de OU. Si A=0 et B=0, OU=0, donc NOR=1.",
        order: 3,
      },
      {
        lessonId: lesson2_4.id,
        question: "Pourquoi la porte NAND est-elle appelée 'porte universelle' ?",
        options: JSON.stringify([
          "Elle est utilisée partout",
          "Elle peut recréer toutes les autres fonctions logiques",
          "Elle est la plus rapide",
          "Elle consomme moins d'énergie"
        ]),
        correctIndex: 1,
        explanation: "Avec des portes NAND uniquement, on peut recréer ET, OU, NON et toutes les autres fonctions.",
        order: 4,
      },
      {
        lessonId: lesson2_4.id,
        question: "Quelle est la formule de NAND(A,B) ?",
        options: JSON.stringify([
          "A ET B",
          "NON(A ET B)",
          "A OU B",
          "NON(A) ET NON(B)"
        ]),
        correctIndex: 1,
        explanation: "NAND(A,B) = NON(A ET B), c'est l'inverse de la fonction ET.",
        order: 5,
      },
      // Quiz Module 2 - Lesson 5 (5 questions) - XOR
      {
        lessonId: lesson2_5.id,
        question: "Quelle est la sortie de A XOR B si A=1 et B=1 ?",
        options: JSON.stringify([
          "1",
          "0",
          "Indéfini",
          "2"
        ]),
        correctIndex: 1,
        explanation: "XOR donne 1 si exactement une entrée est à 1. Ici les deux sont à 1, donc XOR=0.",
        order: 1,
      },
      {
        lessonId: lesson2_5.id,
        question: "Quelle est la sortie de A XOR B si A=0 et B=1 ?",
        options: JSON.stringify([
          "0",
          "1",
          "Indéfini",
          "-1"
        ]),
        correctIndex: 1,
        explanation: "XOR donne 1 si exactement une entrée est à 1. Ici B=1 uniquement, donc XOR=1.",
        order: 2,
      },
      {
        lessonId: lesson2_5.id,
        question: "Quel symbole représente la fonction XOR ?",
        options: JSON.stringify([
          "A · B",
          "A + B",
          "A ⊕ B",
          "A ÷ B"
        ]),
        correctIndex: 2,
        explanation: "Le symbole ⊕ (cercle avec un plus) représente la fonction XOR.",
        order: 3,
      },
      {
        lessonId: lesson2_5.id,
        question: "Quelle application utilise couramment la fonction XOR ?",
        options: JSON.stringify([
          "Démarrage moteur",
          "Commande va-et-vient (interrupteur d'escalier)",
          "Alarme incendie",
          "Climatisation"
        ]),
        correctIndex: 1,
        explanation: "Le va-et-vient (deux interrupteurs pour une lampe) utilise la logique XOR.",
        order: 4,
      },
      {
        lessonId: lesson2_5.id,
        question: "Comment peut-on exprimer XOR avec ET, OU et NON ?",
        options: JSON.stringify([
          "A ET B",
          "(A OU B) ET NON(A ET B)",
          "A OU NON(B)",
          "NON(A) OU B"
        ]),
        correctIndex: 1,
        explanation: "XOR = (A OU B) ET NON(A ET B), soit 'un ou l'autre mais pas les deux'.",
        order: 5,
      },
      // Quiz Module 2 - Lesson 6 (5 questions) - Simplification
      {
        lessonId: lesson2_6.id,
        question: "Que vaut A ET 1 selon l'algèbre de Boole ?",
        options: JSON.stringify([
          "0",
          "1",
          "A",
          "NON(A)"
        ]),
        correctIndex: 2,
        explanation: "C'est la propriété d'identité : A ET 1 = A.",
        order: 1,
      },
      {
        lessonId: lesson2_6.id,
        question: "Que vaut A OU NON(A) ?",
        options: JSON.stringify([
          "0",
          "1",
          "A",
          "Indéterminé"
        ]),
        correctIndex: 1,
        explanation: "C'est la propriété de complémentarité : A OU NON(A) = 1 (toujours vrai).",
        order: 2,
      },
      {
        lessonId: lesson2_6.id,
        question: "Selon le théorème de De Morgan, NON(A ET B) équivaut à ?",
        options: JSON.stringify([
          "NON(A) ET NON(B)",
          "NON(A) OU NON(B)",
          "A OU B",
          "A ET B"
        ]),
        correctIndex: 1,
        explanation: "De Morgan : NON(A ET B) = NON(A) OU NON(B).",
        order: 3,
      },
      {
        lessonId: lesson2_6.id,
        question: "Que vaut A OU (A ET B) selon la propriété d'absorption ?",
        options: JSON.stringify([
          "B",
          "A ET B",
          "A",
          "1"
        ]),
        correctIndex: 2,
        explanation: "Absorption : A OU (A ET B) = A. Le terme (A ET B) est 'absorbé' par A.",
        order: 4,
      },
      {
        lessonId: lesson2_6.id,
        question: "Quel est l'avantage de simplifier une équation logique ?",
        options: JSON.stringify([
          "Rendre le programme plus long",
          "Moins de composants, moins de coût, meilleure fiabilité",
          "Utiliser plus de mémoire",
          "Ralentir le système"
        ]),
        correctIndex: 1,
        explanation: "Une équation simplifiée nécessite moins de composants, réduit les coûts et améliore la fiabilité.",
        order: 5,
      },
      // Quiz Module 2 - Lesson 7 (5 questions) - Karnaugh
      {
        lessonId: lesson2_7.id,
        question: "À quoi sert un tableau de Karnaugh ?",
        options: JSON.stringify([
          "À programmer un automate",
          "À simplifier graphiquement les fonctions logiques",
          "À dessiner des schémas électriques",
          "À calculer des temps de cycle"
        ]),
        correctIndex: 1,
        explanation: "Le tableau de Karnaugh est une méthode graphique pour simplifier les fonctions logiques.",
        order: 1,
      },
      {
        lessonId: lesson2_7.id,
        question: "Combien de cases a un tableau de Karnaugh à 2 variables ?",
        options: JSON.stringify([
          "2 cases",
          "4 cases",
          "8 cases",
          "16 cases"
        ]),
        correctIndex: 1,
        explanation: "Avec 2 variables, il y a 2² = 4 combinaisons possibles, donc 4 cases.",
        order: 2,
      },
      {
        lessonId: lesson2_7.id,
        question: "Quelle taille de groupe est valide dans un tableau de Karnaugh ?",
        options: JSON.stringify([
          "3 cases",
          "5 cases",
          "2, 4, 8 ou 16 cases (puissances de 2)",
          "N'importe quel nombre"
        ]),
        correctIndex: 2,
        explanation: "Les groupes doivent contenir un nombre de cases égal à une puissance de 2.",
        order: 3,
      },
      {
        lessonId: lesson2_7.id,
        question: "Dans un tableau de Karnaugh, les bords sont-ils adjacents ?",
        options: JSON.stringify([
          "Non, jamais",
          "Oui, le tableau est cyclique",
          "Seulement en horizontal",
          "Seulement en vertical"
        ]),
        correctIndex: 1,
        explanation: "Le tableau de Karnaugh est cyclique : les bords gauche/droit et haut/bas sont adjacents.",
        order: 4,
      },
      {
        lessonId: lesson2_7.id,
        question: "Pour combien de variables le tableau de Karnaugh devient-il peu pratique ?",
        options: JSON.stringify([
          "2 variables",
          "3 variables",
          "5 variables et plus",
          "Il est toujours pratique"
        ]),
        correctIndex: 2,
        explanation: "À partir de 5 variables, on utilise plutôt des logiciels ou la méthode de Quine-McCluskey.",
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
      // Quiz Module 3 - Lesson 3 (5 questions) - Circuit marche/arrêt
      {
        lessonId: lesson3_3.id,
        question: "Dans un circuit marche/arrêt avec auto-maintien, quel élément permet de maintenir le moteur en marche après avoir relâché START ?",
        options: JSON.stringify([
          "Le bouton STOP",
          "Le contact du moteur en parallèle avec START",
          "Le temporisateur",
          "La bobine inversée"
        ]),
        correctIndex: 1,
        explanation: "Le contact du moteur en parallèle avec START permet l'auto-maintien : le moteur reste alimenté via son propre contact.",
        order: 1,
      },
      {
        lessonId: lesson3_3.id,
        question: "Pourquoi utilise-t-on un contact normalement fermé (NF) pour le bouton STOP ?",
        options: JSON.stringify([
          "Pour économiser de l'énergie",
          "Pour la sécurité - si le fil est coupé, le moteur s'arrête",
          "Pour la vitesse de réaction",
          "C'est moins cher"
        ]),
        correctIndex: 1,
        explanation: "Un contact NF assure la sécurité : si le fil est coupé ou le bouton défaillant, le circuit s'ouvre et le moteur s'arrête.",
        order: 2,
      },
      {
        lessonId: lesson3_3.id,
        question: "Quelle est la priorité dans un circuit marche/arrêt standard ?",
        options: JSON.stringify([
          "START a la priorité sur STOP",
          "STOP a la priorité sur START",
          "Ils ont la même priorité",
          "Cela dépend du programme"
        ]),
        correctIndex: 1,
        explanation: "STOP a toujours la priorité pour des raisons de sécurité. Le contact NF de STOP est en série avec tout le circuit.",
        order: 3,
      },
      {
        lessonId: lesson3_3.id,
        question: "Comment appelle-t-on le principe du relais à accrochage utilisé dans ce circuit ?",
        options: JSON.stringify([
          "Auto-maintien",
          "Auto-destruction",
          "Auto-régulation",
          "Auto-calibration"
        ]),
        correctIndex: 0,
        explanation: "L'auto-maintien (ou relais à accrochage) permet au circuit de rester actif après une impulsion de démarrage.",
        order: 4,
      },
      {
        lessonId: lesson3_3.id,
        question: "Ce circuit est la base de quel pourcentage des commandes de moteurs en industrie ?",
        options: JSON.stringify([
          "10%",
          "50%",
          "90%",
          "100%"
        ]),
        correctIndex: 2,
        explanation: "Le circuit marche/arrêt avec auto-maintien est la base d'environ 90% des commandes de moteurs industriels.",
        order: 5,
      },
      // Quiz Module 3 - Lesson 4 (5 questions) - Temporisateurs
      {
        lessonId: lesson3_4.id,
        question: "Que fait un temporisateur TON ?",
        options: JSON.stringify([
          "La sortie passe à 1 immédiatement",
          "La sortie passe à 1 après un délai si l'entrée reste à 1",
          "La sortie reste à 1 après que l'entrée passe à 0",
          "La sortie génère des impulsions"
        ]),
        correctIndex: 1,
        explanation: "TON (Timer ON Delay) : la sortie s'active après le délai défini, si l'entrée reste à 1.",
        order: 1,
      },
      {
        lessonId: lesson3_4.id,
        question: "Que fait un temporisateur TOF ?",
        options: JSON.stringify([
          "Retarde l'activation",
          "Maintient la sortie pendant un temps après que l'entrée passe à 0",
          "Génère une impulsion",
          "Compte des événements"
        ]),
        correctIndex: 1,
        explanation: "TOF (Timer OFF Delay) : la sortie reste à 1 pendant le délai défini après que l'entrée passe à 0.",
        order: 2,
      },
      {
        lessonId: lesson3_4.id,
        question: "Quelle est l'application typique d'un TOF ?",
        options: JSON.stringify([
          "Anti-rebond de bouton",
          "Maintien d'une ventilation après arrêt machine",
          "Comptage de pièces",
          "Démarrage progressif"
        ]),
        correctIndex: 1,
        explanation: "TOF est souvent utilisé pour maintenir une ventilation ou un éclairage après l'arrêt de la machine.",
        order: 3,
      },
      {
        lessonId: lesson3_4.id,
        question: "Que fait un temporisateur TP (Pulse) ?",
        options: JSON.stringify([
          "Génère une impulsion de durée fixe",
          "Retarde l'activation",
          "Compte des événements",
          "Mesure une température"
        ]),
        correctIndex: 0,
        explanation: "TP génère une impulsion de durée fixe (définie par PT) quand l'entrée passe à 1.",
        order: 4,
      },
      {
        lessonId: lesson3_4.id,
        question: "Comment note-t-on un temps de 5 secondes dans un temporisateur ?",
        options: JSON.stringify([
          "5000",
          "T#5s",
          "5 SEC",
          "PT=5"
        ]),
        correctIndex: 1,
        explanation: "La notation standard IEC est T#5s (T# suivi de la durée et de l'unité).",
        order: 5,
      },
      // Quiz Module 3 - Lesson 5 (5 questions) - Compteurs
      {
        lessonId: lesson3_5.id,
        question: "Que signifie CTU ?",
        options: JSON.stringify([
          "Counter Total Universal",
          "Count Up (compteur incrémental)",
          "Control Timer Unit",
          "Counter Time Unit"
        ]),
        correctIndex: 1,
        explanation: "CTU signifie Count Up, un compteur qui incrémente à chaque front montant sur l'entrée CU.",
        order: 1,
      },
      {
        lessonId: lesson3_5.id,
        question: "Quand la sortie Q d'un compteur CTU passe-t-elle à 1 ?",
        options: JSON.stringify([
          "Quand CV = 0",
          "Quand CV >= PV (valeur présélectionnée)",
          "Après un délai",
          "Quand CU passe à 1"
        ]),
        correctIndex: 1,
        explanation: "La sortie Q devient vraie quand la valeur courante CV atteint ou dépasse la valeur présélectionnée PV.",
        order: 2,
      },
      {
        lessonId: lesson3_5.id,
        question: "Quel compteur est idéal pour un système de dosage (compte à rebours) ?",
        options: JSON.stringify([
          "CTU (Count Up)",
          "CTD (Count Down)",
          "CTUD",
          "TON"
        ]),
        correctIndex: 1,
        explanation: "CTD (Count Down) décrémente depuis PV et s'arrête quand CV=0, parfait pour le dosage.",
        order: 3,
      },
      {
        lessonId: lesson3_5.id,
        question: "Que permet de faire un compteur CTUD ?",
        options: JSON.stringify([
          "Compter uniquement vers le haut",
          "Compter uniquement vers le bas",
          "Compter dans les deux sens (up et down)",
          "Mesurer le temps"
        ]),
        correctIndex: 2,
        explanation: "CTUD (Count Up/Down) peut incrémenter (CU) ou décrémenter (CD), utile pour la gestion de stock.",
        order: 4,
      },
      {
        lessonId: lesson3_5.id,
        question: "Comment remet-on un compteur CTU à zéro ?",
        options: JSON.stringify([
          "En coupant l'alimentation",
          "Automatiquement après PV",
          "Avec l'entrée Reset (R)",
          "Ce n'est pas possible"
        ]),
        correctIndex: 2,
        explanation: "L'entrée Reset (R) remet la valeur courante CV à zéro et la sortie Q à 0.",
        order: 5,
      },
      // Quiz Module 3 - Lesson 6 (5 questions) - Fronts
      {
        lessonId: lesson3_6.id,
        question: "Qu'est-ce qu'un front montant ?",
        options: JSON.stringify([
          "Un signal qui reste à 1",
          "Le moment où un signal passe de 0 à 1",
          "Un signal qui oscille",
          "Un signal analogique"
        ]),
        correctIndex: 1,
        explanation: "Le front montant est l'instant où le signal passe de l'état 0 à l'état 1.",
        order: 1,
      },
      {
        lessonId: lesson3_6.id,
        question: "Pendant combien de cycles la sortie d'une détection de front est-elle à 1 ?",
        options: JSON.stringify([
          "Tant que l'entrée est à 1",
          "Un seul cycle automate",
          "5 cycles",
          "Jusqu'au reset"
        ]),
        correctIndex: 1,
        explanation: "La détection de front génère une impulsion d'un seul cycle automate.",
        order: 2,
      },
      {
        lessonId: lesson3_6.id,
        question: "Quel symbole représente la détection de front montant en LADDER ?",
        options: JSON.stringify([
          "--[ ]--",
          "--[/]--",
          "--[P]-- ou R_TRIG",
          "--( )--"
        ]),
        correctIndex: 2,
        explanation: "Le symbole [P] ou l'instruction R_TRIG représente la détection de front montant.",
        order: 3,
      },
      {
        lessonId: lesson3_6.id,
        question: "Pourquoi utilise-t-on la détection de front pour le comptage ?",
        options: JSON.stringify([
          "Pour compter plus vite",
          "Pour compter une seule fois par appui (pas plusieurs fois)",
          "Pour économiser de la mémoire",
          "Pour simplifier le programme"
        ]),
        correctIndex: 1,
        explanation: "Sans détection de front, le compteur s'incrémenterait à chaque cycle tant que le bouton est appuyé.",
        order: 4,
      },
      {
        lessonId: lesson3_6.id,
        question: "Quelle est l'application d'une fonction toggle (bascule) ?",
        options: JSON.stringify([
          "Mesurer le temps",
          "Inverser un état à chaque appui sur un bouton",
          "Compter des pièces",
          "Démarrer un moteur"
        ]),
        correctIndex: 1,
        explanation: "La fonction toggle inverse l'état à chaque front montant, comme un interrupteur ON/OFF.",
        order: 5,
      },
      // Quiz Module 3 - Lesson 7 (5 questions) - Blocs fonctionnels
      {
        lessonId: lesson3_7.id,
        question: "Quelle est la différence principale entre FC et FB ?",
        options: JSON.stringify([
          "FC est plus rapide",
          "FB conserve ses données entre les appels (mémoire), FC non",
          "FC est plus récent",
          "Il n'y a pas de différence"
        ]),
        correctIndex: 1,
        explanation: "Un FB (Function Block) possède une mémoire persistante, contrairement à une FC (Function).",
        order: 1,
      },
      {
        lessonId: lesson3_7.id,
        question: "Pourquoi utilise-t-on des blocs fonctionnels ?",
        options: JSON.stringify([
          "Pour rendre le programme plus long",
          "Pour la lisibilité, la maintenance et la réutilisation",
          "Parce que c'est obligatoire",
          "Pour ralentir l'exécution"
        ]),
        correctIndex: 1,
        explanation: "Les blocs fonctionnels améliorent la lisibilité, facilitent la maintenance et permettent la réutilisation du code.",
        order: 2,
      },
      {
        lessonId: lesson3_7.id,
        question: "Qu'est-ce qu'une instance de FB ?",
        options: JSON.stringify([
          "Une copie du code",
          "Un FB utilisé avec ses propres données",
          "Un FB supprimé",
          "Un FB désactivé"
        ]),
        correctIndex: 1,
        explanation: "Une instance est une utilisation du FB avec son propre jeu de données. Même code, données différentes.",
        order: 3,
      },
      {
        lessonId: lesson3_7.id,
        question: "Quel type de bloc est le point d'entrée du programme (Main) ?",
        options: JSON.stringify([
          "FC (Function)",
          "FB (Function Block)",
          "OB (Organization Block)",
          "DB (Data Block)"
        ]),
        correctIndex: 2,
        explanation: "OB1 (Organization Block) est le bloc principal qui est appelé cycliquement par l'automate.",
        order: 4,
      },
      {
        lessonId: lesson3_7.id,
        question: "Les temporisateurs et compteurs sont-ils des FC ou des FB ?",
        options: JSON.stringify([
          "Des FC car ils n'ont pas besoin de mémoire",
          "Des FB car ils conservent leur état entre les cycles",
          "Ni l'un ni l'autre",
          "Ça dépend du fabricant"
        ]),
        correctIndex: 1,
        explanation: "Les timers et compteurs sont des FB car ils doivent mémoriser leur état (valeur courante, sortie, etc.).",
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
      // Quiz Module 4 - Lesson 2 (5 questions) - Capteurs analogiques
      {
        lessonId: lesson4_2.id,
        question: "Quel signal est privilégié en industrie pour les longues distances ?",
        options: JSON.stringify([
          "0-10V",
          "4-20mA",
          "0-5V",
          "RS232"
        ]),
        correctIndex: 1,
        explanation: "Le signal 4-20mA est privilégié car il est immunisé au bruit et permet de détecter une coupure de fil (0mA).",
        order: 1,
      },
      {
        lessonId: lesson4_2.id,
        question: "Pourquoi le signal 4-20mA commence-t-il à 4mA et non à 0mA ?",
        options: JSON.stringify([
          "Pour économiser de l'énergie",
          "Pour détecter une coupure de fil (0mA = défaut)",
          "C'est une norme historique",
          "Pour la compatibilité"
        ]),
        correctIndex: 1,
        explanation: "4mA minimum indique que le capteur est alimenté. 0mA signifie un défaut (fil coupé).",
        order: 2,
      },
      {
        lessonId: lesson4_2.id,
        question: "Qu'est-ce qu'une PT100 ?",
        options: JSON.stringify([
          "Un capteur de pression",
          "Une sonde de température à résistance de platine",
          "Un capteur optique",
          "Un variateur de vitesse"
        ]),
        correctIndex: 1,
        explanation: "PT100 est une sonde de température à résistance de platine (100Ω à 0°C).",
        order: 3,
      },
      {
        lessonId: lesson4_2.id,
        question: "Que signifie une résolution de 12 bits pour un convertisseur analogique ?",
        options: JSON.stringify([
          "12 entrées analogiques",
          "4096 niveaux de mesure possibles",
          "12 sorties",
          "12 volts maximum"
        ]),
        correctIndex: 1,
        explanation: "12 bits = 2^12 = 4096 niveaux, donc une résolution de 1/4096 de la plage.",
        order: 4,
      },
      {
        lessonId: lesson4_2.id,
        question: "Quel type de capteur mesure un débit par effet électromagnétique ?",
        options: JSON.stringify([
          "Débitmètre Coriolis",
          "Débitmètre électromagnétique",
          "Débitmètre vortex",
          "Débitmètre à ultrasons"
        ]),
        correctIndex: 1,
        explanation: "Le débitmètre électromagnétique mesure le débit des liquides conducteurs par induction.",
        order: 5,
      },
      // Quiz Module 4 - Lesson 3 (5 questions) - PNP vs NPN
      {
        lessonId: lesson4_3.id,
        question: "Quelle technologie est majoritaire en Europe ?",
        options: JSON.stringify([
          "NPN",
          "PNP",
          "Les deux également",
          "Aucune"
        ]),
        correctIndex: 1,
        explanation: "En Europe, le standard est PNP (sourcing). NPN est plus courant au Japon.",
        order: 1,
      },
      {
        lessonId: lesson4_3.id,
        question: "Dans un capteur PNP, quel signal est fourni quand le capteur est actif ?",
        options: JSON.stringify([
          "0V",
          "+24V",
          "Un signal alternatif",
          "Aucun signal"
        ]),
        correctIndex: 1,
        explanation: "PNP 'fournit' du +24V à l'entrée quand il est actif (sourcing = source de courant).",
        order: 2,
      },
      {
        lessonId: lesson4_3.id,
        question: "Dans un capteur NPN, le signal actif correspond à ?",
        options: JSON.stringify([
          "+24V",
          "0V (relié à la masse)",
          "12V",
          "Signal flottant"
        ]),
        correctIndex: 1,
        explanation: "NPN 'tire' l'entrée vers 0V quand il est actif (sinking = puits de courant).",
        order: 3,
      },
      {
        lessonId: lesson4_3.id,
        question: "Peut-on mélanger des capteurs PNP et NPN sur le même automate ?",
        options: JSON.stringify([
          "Oui, sans problème",
          "Non, jamais",
          "Oui, si l'automate le permet",
          "Seulement avec un adaptateur"
        ]),
        correctIndex: 2,
        explanation: "Certains automates ont des entrées universelles, sinon il faut vérifier la compatibilité.",
        order: 4,
      },
      {
        lessonId: lesson4_3.id,
        question: "Quel fil est commun dans un câblage PNP 3 fils ?",
        options: JSON.stringify([
          "+24V et signal sur le même fil",
          "0V et signal sur le même fil",
          "+24V seul",
          "Aucun"
        ]),
        correctIndex: 2,
        explanation: "En PNP 3 fils : +24V, 0V et signal. Le +24V alimente le capteur et est la source du signal.",
        order: 5,
      },
      // Quiz Module 4 - Lesson 4 (5 questions) - Actionneurs électriques
      {
        lessonId: lesson4_4.id,
        question: "Quel est le moteur le plus répandu en industrie ?",
        options: JSON.stringify([
          "Moteur à courant continu",
          "Moteur asynchrone triphasé",
          "Moteur brushless",
          "Moteur pas à pas"
        ]),
        correctIndex: 1,
        explanation: "Le moteur asynchrone triphasé est le plus répandu : simple, robuste et économique.",
        order: 1,
      },
      {
        lessonId: lesson4_4.id,
        question: "Quelle est la fonction d'un contacteur ?",
        options: JSON.stringify([
          "Varier la vitesse",
          "Commander le moteur en TOR (marche/arrêt)",
          "Protéger contre les surcharges",
          "Mesurer le courant"
        ]),
        correctIndex: 1,
        explanation: "Le contacteur est un interrupteur de puissance commandé électriquement pour la commutation TOR.",
        order: 2,
      },
      {
        lessonId: lesson4_4.id,
        question: "Quelle est la fonction du relais thermique ?",
        options: JSON.stringify([
          "Commander le moteur",
          "Varier la vitesse",
          "Protéger contre les surcharges",
          "Mesurer la température ambiante"
        ]),
        correctIndex: 2,
        explanation: "Le relais thermique protège le moteur contre les surcharges en détectant l'échauffement.",
        order: 3,
      },
      {
        lessonId: lesson4_4.id,
        question: "Qu'est-ce qu'un variateur de vitesse ?",
        options: JSON.stringify([
          "Un capteur de vitesse",
          "Un équipement qui contrôle la vitesse et le couple du moteur",
          "Un type de moteur",
          "Un fusible spécial"
        ]),
        correctIndex: 1,
        explanation: "Le variateur de vitesse (VFD) permet de contrôler la vitesse et le couple d'un moteur.",
        order: 4,
      },
      {
        lessonId: lesson4_4.id,
        question: "Quel équipement permet un positionnement précis ?",
        options: JSON.stringify([
          "Moteur asynchrone seul",
          "Contacteur",
          "Servomoteur",
          "Disjoncteur"
        ]),
        correctIndex: 2,
        explanation: "Le servomoteur avec son encodeur permet un positionnement précis et un contrôle de trajectoire.",
        order: 5,
      },
      // Quiz Module 4 - Lesson 5 (5 questions) - Actionneurs pneumatiques
      {
        lessonId: lesson4_5.id,
        question: "Quelle pression est standard en pneumatique industrielle ?",
        options: JSON.stringify([
          "1 bar",
          "6 bar",
          "20 bar",
          "100 bar"
        ]),
        correctIndex: 1,
        explanation: "6 bar (600 kPa) est la pression standard en pneumatique industrielle.",
        order: 1,
      },
      {
        lessonId: lesson4_5.id,
        question: "Quelle est la différence entre un vérin simple effet et double effet ?",
        options: JSON.stringify([
          "Le simple effet est plus rapide",
          "Le double effet a deux sens motorisés",
          "Le simple effet est plus puissant",
          "Il n'y a pas de différence"
        ]),
        correctIndex: 1,
        explanation: "Simple effet : un sens motorisé, retour par ressort. Double effet : deux sens motorisés par air.",
        order: 2,
      },
      {
        lessonId: lesson4_5.id,
        question: "Que signifie la notation 5/2 pour un distributeur ?",
        options: JSON.stringify([
          "5 volts, 2 ampères",
          "5 orifices, 2 positions",
          "5 bar, 2 litres",
          "5 entrées, 2 sorties"
        ]),
        correctIndex: 1,
        explanation: "5/2 signifie 5 orifices et 2 positions. C'est le distributeur standard pour vérin double effet.",
        order: 3,
      },
      {
        lessonId: lesson4_5.id,
        question: "Quel distributeur utilise-t-on pour un vérin simple effet ?",
        options: JSON.stringify([
          "5/2",
          "3/2",
          "5/3",
          "4/2"
        ]),
        correctIndex: 1,
        explanation: "Un distributeur 3/2 (3 orifices, 2 positions) suffit pour un vérin simple effet.",
        order: 4,
      },
      {
        lessonId: lesson4_5.id,
        question: "Qu'est-ce qu'un distributeur 5/3 permet de faire ?",
        options: JSON.stringify([
          "Commander 3 vérins",
          "Avoir une position intermédiaire (arrêt en position)",
          "Augmenter la pression",
          "Réduire le débit"
        ]),
        correctIndex: 1,
        explanation: "5/3 a une 3ème position centrale permettant d'arrêter le vérin en position intermédiaire.",
        order: 5,
      },
      // Quiz Module 4 - Lesson 6 (5 questions) - Câblage
      {
        lessonId: lesson4_6.id,
        question: "Pourquoi sépare-t-on les circuits de puissance et de commande ?",
        options: JSON.stringify([
          "Pour économiser des câbles",
          "Pour éviter les interférences électromagnétiques",
          "C'est une préférence esthétique",
          "Pour utiliser moins de goulottes"
        ]),
        correctIndex: 1,
        explanation: "La séparation évite que les signaux de puissance perturbent les signaux de commande (CEM).",
        order: 1,
      },
      {
        lessonId: lesson4_6.id,
        question: "Quelle couleur de fil est utilisée pour le neutre ?",
        options: JSON.stringify([
          "Noir",
          "Bleu",
          "Rouge",
          "Vert-jaune"
        ]),
        correctIndex: 1,
        explanation: "Le bleu est la couleur normalisée pour le neutre en installation électrique.",
        order: 2,
      },
      {
        lessonId: lesson4_6.id,
        question: "Quelle couleur est réservée à la terre (PE) ?",
        options: JSON.stringify([
          "Bleu",
          "Rouge",
          "Vert-jaune",
          "Noir"
        ]),
        correctIndex: 2,
        explanation: "Le vert-jaune est exclusivement réservé au conducteur de protection (terre).",
        order: 3,
      },
      {
        lessonId: lesson4_6.id,
        question: "Que doit-on toujours faire avant d'intervenir sur le câblage ?",
        options: JSON.stringify([
          "Prendre une photo",
          "Couper l'alimentation et consigner",
          "Appeler un collègue",
          "Vérifier la météo"
        ]),
        correctIndex: 1,
        explanation: "Couper l'alimentation et consigner (cadenasser) est obligatoire pour la sécurité.",
        order: 4,
      },
      {
        lessonId: lesson4_6.id,
        question: "Pourquoi utilise-t-on des câbles blindés pour les signaux analogiques ?",
        options: JSON.stringify([
          "Pour résister à la chaleur",
          "Pour protéger contre les interférences électromagnétiques",
          "Pour la flexibilité",
          "Pour la couleur"
        ]),
        correctIndex: 1,
        explanation: "Le blindage protège les signaux analogiques sensibles contre les perturbations électromagnétiques.",
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
      // Quiz Module 5 - Lesson 2 (5 questions) - Étapes et transitions
      {
        lessonId: lesson5_2.id,
        question: "Comment représente-t-on une étape initiale dans un GRAFCET ?",
        options: JSON.stringify([
          "Un carré simple",
          "Un double carré (carré dans un carré)",
          "Un cercle",
          "Un triangle"
        ]),
        correctIndex: 1,
        explanation: "L'étape initiale est représentée par un double carré pour la distinguer des étapes normales.",
        order: 1,
      },
      {
        lessonId: lesson5_2.id,
        question: "Que signifie la notation t/5/3s dans une transition ?",
        options: JSON.stringify([
          "Transition 5, durée 3s",
          "Temporisation : 3s après activation de l'étape 5",
          "5 transitions en 3 secondes",
          "Transition numéro 53"
        ]),
        correctIndex: 1,
        explanation: "t/5/3s signifie une temporisation de 3 secondes après l'activation de l'étape 5.",
        order: 2,
      },
      {
        lessonId: lesson5_2.id,
        question: "Que représente le symbole ↑a dans une transition ?",
        options: JSON.stringify([
          "a est toujours vrai",
          "Front montant sur a",
          "Front descendant sur a",
          "a est désactivé"
        ]),
        correctIndex: 1,
        explanation: "↑a représente un front montant (passage de 0 à 1) sur la variable a.",
        order: 3,
      },
      {
        lessonId: lesson5_2.id,
        question: "Quelle est la signification de la réceptivité '= 1' ?",
        options: JSON.stringify([
          "La transition n'est jamais franchissable",
          "La transition est toujours franchissable",
          "Il faut appuyer sur le bouton 1",
          "L'étape dure 1 seconde"
        ]),
        correctIndex: 1,
        explanation: "= 1 signifie 'toujours vrai', la transition est franchissable dès que l'étape est active.",
        order: 4,
      },
      {
        lessonId: lesson5_2.id,
        question: "Comment note-t-on une condition 'a ET b' dans une transition ?",
        options: JSON.stringify([
          "a + b",
          "a · b ou a ∧ b",
          "a - b",
          "a / b"
        ]),
        correctIndex: 1,
        explanation: "a · b (point) ou a ∧ b (chapeau) représente la fonction ET en notation GRAFCET.",
        order: 5,
      },
      // Quiz Module 5 - Lesson 3 (5 questions) - Types d'actions
      {
        lessonId: lesson5_3.id,
        question: "Qu'est-ce qu'une action continue dans un GRAFCET ?",
        options: JSON.stringify([
          "Une action qui dure 1 seconde",
          "Une action active tant que l'étape est active",
          "Une action qui reste active après avoir quitté l'étape",
          "Une action conditionnelle"
        ]),
        correctIndex: 1,
        explanation: "L'action continue est active tant que l'étape est active. Elle s'arrête quand on quitte l'étape.",
        order: 1,
      },
      {
        lessonId: lesson5_3.id,
        question: "Que signifie le préfixe S dans une action GRAFCET ?",
        options: JSON.stringify([
          "Stop",
          "SET (activation mémorisée)",
          "Slow (lent)",
          "Signal"
        ]),
        correctIndex: 1,
        explanation: "S = SET, l'action est activée et reste active même après avoir quitté l'étape.",
        order: 2,
      },
      {
        lessonId: lesson5_3.id,
        question: "Comment désactive-t-on une action SET ?",
        options: JSON.stringify([
          "Elle se désactive automatiquement",
          "Avec une action RESET (R)",
          "En coupant l'alimentation",
          "Avec une temporisation"
        ]),
        correctIndex: 1,
        explanation: "Une action SET reste active jusqu'à ce qu'elle soit désactivée par une action RESET (R).",
        order: 3,
      },
      {
        lessonId: lesson5_3.id,
        question: "Que signifie 'C capteur : Moteur' dans une étape ?",
        options: JSON.stringify([
          "Le capteur commande le moteur",
          "L'action Moteur est conditionnelle à la variable capteur",
          "Le capteur est connecté au moteur",
          "C'est une erreur de syntaxe"
        ]),
        correctIndex: 1,
        explanation: "C = Condition. L'action n'est active que si l'étape est active ET la condition est vraie.",
        order: 4,
      },
      {
        lessonId: lesson5_3.id,
        question: "Que signifie D t : Action dans un GRAFCET ?",
        options: JSON.stringify([
          "Delete action",
          "Action retardée (Delay) - s'active après le temps t",
          "Double action",
          "Direct action"
        ]),
        correctIndex: 1,
        explanation: "D = Delay (retard). L'action ne s'active qu'après le temps t depuis l'activation de l'étape.",
        order: 5,
      },
      // Quiz Module 5 - Lesson 4 (5 questions) - Divergences et convergences
      {
        lessonId: lesson5_4.id,
        question: "Qu'est-ce qu'une divergence en OU ?",
        options: JSON.stringify([
          "Toutes les branches sont activées simultanément",
          "Une seule branche est activée selon la condition",
          "Aucune branche n'est activée",
          "Les branches s'exécutent en boucle"
        ]),
        correctIndex: 1,
        explanation: "En divergence OU, une seule branche est choisie selon la condition de transition vraie.",
        order: 1,
      },
      {
        lessonId: lesson5_4.id,
        question: "Comment représente-t-on une divergence en ET (parallélisme) ?",
        options: JSON.stringify([
          "Un trait simple horizontal",
          "Une double barre horizontale",
          "Un cercle",
          "Un losange"
        ]),
        correctIndex: 1,
        explanation: "La double barre horizontale indique une divergence/convergence en ET (parallélisme).",
        order: 2,
      },
      {
        lessonId: lesson5_4.id,
        question: "Que se passe-t-il à une convergence en ET ?",
        options: JSON.stringify([
          "La première branche terminée continue",
          "On attend que TOUTES les branches soient terminées",
          "On quitte immédiatement",
          "Une seule branche est sélectionnée"
        ]),
        correctIndex: 1,
        explanation: "La convergence ET est une synchronisation : on attend que toutes les branches soient terminées.",
        order: 3,
      },
      {
        lessonId: lesson5_4.id,
        question: "Pourquoi les conditions en divergence OU doivent-elles être mutuellement exclusives ?",
        options: JSON.stringify([
          "Pour économiser de la mémoire",
          "Pour éviter l'ambiguïté (deux branches activées)",
          "C'est une préférence de style",
          "Pour la vitesse d'exécution"
        ]),
        correctIndex: 1,
        explanation: "Si deux conditions sont vraies simultanément, on ne sait pas quelle branche choisir (ambiguïté).",
        order: 4,
      },
      {
        lessonId: lesson5_4.id,
        question: "Combien de branches peuvent être actives simultanément dans une divergence en ET ?",
        options: JSON.stringify([
          "Une seule",
          "Deux maximum",
          "Toutes les branches",
          "Aucune"
        ]),
        correctIndex: 2,
        explanation: "Dans une divergence ET, toutes les branches sont activées simultanément (parallélisme).",
        order: 5,
      },
      // Quiz Module 5 - Lesson 5 (5 questions) - Macro-étapes
      {
        lessonId: lesson5_5.id,
        question: "Qu'est-ce qu'une macro-étape dans un GRAFCET ?",
        options: JSON.stringify([
          "Une étape très grande",
          "Une étape qui contient une séquence complète",
          "Une étape rapide",
          "Une étape sans action"
        ]),
        correctIndex: 1,
        explanation: "Une macro-étape regroupe une séquence complète de GRAFCET pour simplifier le schéma principal.",
        order: 1,
      },
      {
        lessonId: lesson5_5.id,
        question: "Quel est l'avantage principal des macro-étapes ?",
        options: JSON.stringify([
          "Elles sont plus rapides",
          "Lisibilité et modularité du programme",
          "Elles consomment moins de mémoire",
          "Elles sont obligatoires"
        ]),
        correctIndex: 1,
        explanation: "Les macro-étapes améliorent la lisibilité en masquant les détails et permettent la réutilisation.",
        order: 2,
      },
      {
        lessonId: lesson5_5.id,
        question: "Qu'est-ce que l'étape E dans une macro-étape ?",
        options: JSON.stringify([
          "L'étape d'erreur",
          "L'étape d'entrée de la macro",
          "L'étape d'exécution",
          "L'étape d'échappement"
        ]),
        correctIndex: 1,
        explanation: "E = Entrée, c'est la première étape de la séquence contenue dans la macro-étape.",
        order: 3,
      },
      {
        lessonId: lesson5_5.id,
        question: "Quel GRAFCET est prioritaire dans la hiérarchie ?",
        options: JSON.stringify([
          "GRAFCET de production",
          "GRAFCET de sécurité",
          "GRAFCET de conduite",
          "GRAFCET de défaut"
        ]),
        correctIndex: 1,
        explanation: "Le GRAFCET de sécurité (arrêts d'urgence) est toujours prioritaire sur les autres.",
        order: 4,
      },
      {
        lessonId: lesson5_5.id,
        question: "Une macro-étape peut-elle être appelée plusieurs fois dans un programme ?",
        options: JSON.stringify([
          "Non, jamais",
          "Oui, c'est l'un de ses avantages (réutilisation)",
          "Seulement deux fois",
          "Uniquement en mode manuel"
        ]),
        correctIndex: 1,
        explanation: "La réutilisation est un avantage clé : une macro peut être appelée plusieurs fois.",
        order: 5,
      },
      // Quiz Module 5 - Lesson 6 (5 questions) - Traduction LADDER
      {
        lessonId: lesson5_6.id,
        question: "En LADDER, comment représente-t-on une étape GRAFCET ?",
        options: JSON.stringify([
          "Par un temporisateur",
          "Par un bit mémoire (variable booléenne)",
          "Par une entrée physique",
          "Par une sortie analogique"
        ]),
        correctIndex: 1,
        explanation: "Chaque étape devient un bit mémoire (ex: X0, X1, M0, M1...) qui vaut 1 quand l'étape est active.",
        order: 1,
      },
      {
        lessonId: lesson5_6.id,
        question: "Comment active-t-on une étape Xi en LADDER ?",
        options: JSON.stringify([
          "Avec un temporisateur",
          "Quand l'étape précédente est active ET la transition est vraie",
          "Automatiquement au démarrage",
          "Avec une entrée analogique"
        ]),
        correctIndex: 1,
        explanation: "Xi s'active quand Xi-1 est active ET que la condition de transition est vraie.",
        order: 2,
      },
      {
        lessonId: lesson5_6.id,
        question: "Quelle méthode utilise-t-on souvent pour les étapes en LADDER ?",
        options: JSON.stringify([
          "Temporisateurs uniquement",
          "SET/RESET (mémorisation)",
          "Contacts uniquement",
          "Compteurs"
        ]),
        correctIndex: 1,
        explanation: "SET active l'étape, RESET la désactive. C'est la méthode la plus claire pour les GRAFCET.",
        order: 3,
      },
      {
        lessonId: lesson5_6.id,
        question: "Comment traduit-on une action continue de l'étape 5 ?",
        options: JSON.stringify([
          "SET Moteur quand X5 est actif",
          "Contact X5 en série avec la bobine Moteur",
          "Temporisateur de 5 secondes",
          "Compteur à 5"
        ]),
        correctIndex: 1,
        explanation: "Une action continue utilise un contact de l'étape : quand X5=1, la bobine est alimentée.",
        order: 4,
      },
      {
        lessonId: lesson5_6.id,
        question: "Comment traduit-on une action SET dans une étape ?",
        options: JSON.stringify([
          "Avec un contact simple",
          "Avec un front montant [P] et une bobine SET",
          "Avec un temporisateur",
          "Avec un compteur"
        ]),
        correctIndex: 1,
        explanation: "On utilise un front [P] sur l'étape pour ne SET qu'une fois à l'activation.",
        order: 5,
      },
      // Quiz Module 5 - Lesson 7 (5 questions) - Exemple complet
      {
        lessonId: lesson5_7.id,
        question: "Dans l'exemple de remplissage, quelle est la première condition pour démarrer ?",
        options: JSON.stringify([
          "Le vérin est sorti",
          "Présence d'une bouteille ET bouton départ cycle",
          "La vanne est ouverte",
          "Le temporisateur est terminé"
        ]),
        correctIndex: 1,
        explanation: "La transition 0→1 nécessite : présence bouteille ET bouton départ cycle (dcy).",
        order: 1,
      },
      {
        lessonId: lesson5_7.id,
        question: "Combien de temps dure le remplissage dans l'exemple ?",
        options: JSON.stringify([
          "1 seconde",
          "3 secondes",
          "5 secondes",
          "10 secondes"
        ]),
        correctIndex: 1,
        explanation: "La transition t/1/3s indique un remplissage de 3 secondes après l'activation de l'étape 1.",
        order: 2,
      },
      {
        lessonId: lesson5_7.id,
        question: "Quelle action est associée à l'étape 2 (évacuation) ?",
        options: JSON.stringify([
          "Ouverture de la vanne",
          "Sortie du vérin évacuation",
          "Retour du vérin",
          "Arrêt du système"
        ]),
        correctIndex: 1,
        explanation: "L'étape 2 active la sortie 'Evacuation' qui pousse la bouteille avec le vérin.",
        order: 3,
      },
      {
        lessonId: lesson5_7.id,
        question: "Quelle est la condition pour passer de l'étape 2 à l'étape 3 ?",
        options: JSON.stringify([
          "Temporisation de 3s",
          "Fin de course vérin sorti",
          "Présence bouteille",
          "Bouton départ cycle"
        ]),
        correctIndex: 1,
        explanation: "La transition utilise le capteur 'verin_sorti' qui détecte que le vérin a atteint sa position.",
        order: 4,
      },
      {
        lessonId: lesson5_7.id,
        question: "Que manque-t-il souvent dans un GRAFCET de production réel ?",
        options: JSON.stringify([
          "Les étapes",
          "Les transitions",
          "La gestion des modes (auto/manu) et les sécurités",
          "Les actions"
        ]),
        correctIndex: 2,
        explanation: "En production réelle, on ajoute la gestion des modes, des défauts et des sécurités.",
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
      // Quiz Module 12 - Lesson 1 (Introduction aux variateurs)
      { lessonId: lesson12_1.id, question: "Que signifie l'acronyme VFD ?", options: JSON.stringify(["Variable Frequency Drive", "Voltage Flux Device", "Virtual Field Data", "Variable Flow Driver"]), correctIndex: 0, explanation: "VFD signifie Variable Frequency Drive, soit variateur de fréquence en français.", order: 1 },
      { lessonId: lesson12_1.id, question: "Quel composant du variateur convertit le DC en AC variable ?", options: JSON.stringify(["Le redresseur", "Le bus DC", "L'onduleur", "Le filtre"]), correctIndex: 2, explanation: "L'onduleur (inverter) convertit le courant continu en courant alternatif à fréquence variable.", order: 2 },
      { lessonId: lesson12_1.id, question: "Quelle économie d'énergie peut-on attendre sur les pompes/ventilateurs ?", options: JSON.stringify(["5 à 10%", "20 à 50%", "60 à 80%", "Aucune"]), correctIndex: 1, explanation: "Les variateurs permettent des économies de 20 à 50% sur les applications de pompage et ventilation grâce à la loi du cube.", order: 3 },
      { lessonId: lesson12_1.id, question: "Quelle est la fonction du redresseur ?", options: JSON.stringify(["Convertir AC en DC", "Convertir DC en AC", "Filtrer les harmoniques", "Contrôler la vitesse"]), correctIndex: 0, explanation: "Le redresseur convertit le courant alternatif du réseau en courant continu pour le bus DC.", order: 4 },
      { lessonId: lesson12_1.id, question: "Pour quelle application les variateurs sont-ils particulièrement adaptés ?", options: JSON.stringify(["Éclairage", "Chauffage résistif", "Pompes et ventilateurs", "Ordinateurs"]), correctIndex: 2, explanation: "Les variateurs sont très efficaces pour les pompes et ventilateurs où la puissance varie avec le cube de la vitesse.", order: 5 },
      // Quiz Module 12 - Lesson 2 (Types de moteurs)
      { lessonId: lesson12_2.id, question: "Quel type de moteur est le plus couramment utilisé avec les variateurs ?", options: JSON.stringify(["Moteur à courant continu", "Moteur asynchrone cage d'écureuil", "Moteur synchrone", "Moteur universel"]), correctIndex: 1, explanation: "Le moteur asynchrone à cage d'écureuil est le plus courant car robuste, économique et bien adapté aux variateurs.", order: 1 },
      { lessonId: lesson12_2.id, question: "Quel type de variateur offre le meilleur couple à basse vitesse ?", options: JSON.stringify(["Scalaire (V/f)", "Vectoriel", "PWM simple", "Résistance rotorique"]), correctIndex: 1, explanation: "Le contrôle vectoriel offre un excellent couple même à très basse vitesse.", order: 2 },
      { lessonId: lesson12_2.id, question: "En dessous de quelle vitesse un moteur standard nécessite-t-il une ventilation forcée ?", options: JSON.stringify(["50%", "30%", "10%", "5%"]), correctIndex: 1, explanation: "En dessous de 30% de la vitesse nominale, le ventilateur intégré ne suffit plus à refroidir le moteur.", order: 3 },
      { lessonId: lesson12_2.id, question: "Pour quelle application utilise-t-on un servo-drive ?", options: JSON.stringify(["Pompe centrifuge", "Ventilation bâtiment", "Robotique et CNC", "Climatisation"]), correctIndex: 2, explanation: "Les servo-drives offrent une très haute dynamique nécessaire pour la robotique et les machines CNC.", order: 4 },
      { lessonId: lesson12_2.id, question: "Que signifie V/f dans le contrôle scalaire ?", options: JSON.stringify(["Vitesse/fréquence", "Tension/fréquence", "Voltage/flux", "Variable/fixe"]), correctIndex: 1, explanation: "Le contrôle V/f maintient un rapport constant entre la tension et la fréquence pour garder le flux constant.", order: 5 },
      // Quiz Module 12 - Lesson 3 (Câblage)
      { lessonId: lesson12_3.id, question: "Comment sont désignées les bornes de sortie moteur d'un variateur ?", options: JSON.stringify(["L1, L2, L3", "U, V, W", "R, S, T", "A, B, C"]), correctIndex: 1, explanation: "Les sorties vers le moteur sont conventionnellement désignées U, V, W.", order: 1 },
      { lessonId: lesson12_3.id, question: "Quel type de signal est couramment utilisé pour la consigne vitesse ?", options: JSON.stringify(["0-5V uniquement", "0-10V ou 4-20mA", "Signal carré", "HDMI"]), correctIndex: 1, explanation: "Les signaux 0-10V et 4-20mA sont les standards industriels pour les consignes analogiques.", order: 2 },
      { lessonId: lesson12_3.id, question: "Pourquoi séparer les câbles puissance et commande ?", options: JSON.stringify(["Pour faciliter la maintenance", "Pour éviter les perturbations électromagnétiques", "C'est obligatoire par la norme", "Pour réduire les coûts"]), correctIndex: 1, explanation: "La séparation évite que les signaux de puissance perturbent les signaux de commande sensibles.", order: 3 },
      { lessonId: lesson12_3.id, question: "À quoi sert la borne PE ?", options: JSON.stringify(["Alimentation", "Sortie relais", "Terre de protection", "Entrée analogique"]), correctIndex: 2, explanation: "PE (Protective Earth) est la connexion de terre de protection pour la sécurité électrique.", order: 4 },
      { lessonId: lesson12_3.id, question: "Que signalent typiquement les sorties relais d'un variateur ?", options: JSON.stringify(["La température ambiante", "Défaut, prêt, en marche", "La consigne vitesse", "Le courant moteur"]), correctIndex: 1, explanation: "Les relais signalent généralement l'état du variateur : défaut, prêt à fonctionner, moteur en marche.", order: 5 },
      // Quiz Module 12 - Lesson 4 (Protections)
      { lessonId: lesson12_4.id, question: "Que signifie STO ?", options: JSON.stringify(["Standard Terminal Output", "Safe Torque Off", "Speed Tracking Option", "System Test Operation"]), correctIndex: 1, explanation: "STO (Safe Torque Off) est une fonction de sécurité qui coupe le couple moteur de façon sûre.", order: 1 },
      { lessonId: lesson12_4.id, question: "Quelle protection surveille la charge thermique du moteur ?", options: JSON.stringify(["Surtension", "Protection I²t", "Défaut terre", "Court-circuit"]), correctIndex: 1, explanation: "La protection I²t (I carré t) calcule l'échauffement du moteur en fonction du courant et du temps.", order: 2 },
      { lessonId: lesson12_4.id, question: "À quel niveau de sécurité les fonctions STO sont-elles généralement certifiées ?", options: JSON.stringify(["SIL1/PLc", "SIL2/PLd", "SIL3/PLe", "Aucune certification"]), correctIndex: 1, explanation: "Les fonctions STO sont typiquement certifiées SIL2/PLd selon IEC 61508 et ISO 13849.", order: 3 },
      { lessonId: lesson12_4.id, question: "Que fait la fonction SS1 ?", options: JSON.stringify(["Démarre le moteur", "Arrêt contrôlé puis STO", "Limite la vitesse", "Active le frein"]), correctIndex: 1, explanation: "SS1 (Safe Stop 1) effectue un arrêt contrôlé sur rampe puis active le STO.", order: 4 },
      { lessonId: lesson12_4.id, question: "Quelle protection détecte un défaut d'isolement ?", options: JSON.stringify(["Surtension", "Surcharge", "Défaut terre", "Sous-tension"]), correctIndex: 2, explanation: "La protection défaut terre (ground fault) détecte les courants de fuite vers la terre.", order: 5 },
      // Quiz Module 12 - Lesson 5 (Économie d'énergie)
      { lessonId: lesson12_5.id, question: "Selon la loi du cube, à 50% de vitesse, quelle est la puissance consommée ?", options: JSON.stringify(["50%", "25%", "12.5%", "6.25%"]), correctIndex: 2, explanation: "À 50% de vitesse, la puissance est de 0.5³ = 0.125 soit 12.5% de la puissance nominale.", order: 1 },
      { lessonId: lesson12_5.id, question: "Quelle application bénéficie le plus de la loi du cube ?", options: JSON.stringify(["Levage", "Convoyeur", "Pompe centrifuge", "Presse hydraulique"]), correctIndex: 2, explanation: "Les pompes centrifuges et ventilateurs suivent la loi d'affinité où la puissance varie avec le cube de la vitesse.", order: 2 },
      { lessonId: lesson12_5.id, question: "Comment récupérer l'énergie de freinage ?", options: JSON.stringify(["Résistance de freinage", "Renvoi au réseau", "Les deux sont possibles", "Ce n'est pas possible"]), correctIndex: 2, explanation: "L'énergie peut être dissipée dans une résistance ou renvoyée au réseau avec un variateur régénératif.", order: 3 },
      { lessonId: lesson12_5.id, question: "Pourquoi dimensionner correctement le moteur ?", options: JSON.stringify(["Réduire le coût initial", "Optimiser le rendement", "Simplifier le câblage", "Faciliter la maintenance"]), correctIndex: 1, explanation: "Un moteur surdimensionné fonctionne à charge partielle avec un rendement dégradé.", order: 4 },
      { lessonId: lesson12_5.id, question: "Qu'est-ce que le mode économie d'énergie du variateur ?", options: JSON.stringify(["Arrêt automatique", "Réduction de tension à faible charge", "Limitation de vitesse", "Mise en veille"]), correctIndex: 1, explanation: "Le mode éco réduit la tension moteur quand la charge est faible pour diminuer les pertes fer.", order: 5 },
      // Quiz Module 12 - Lesson 6 (Marques)
      { lessonId: lesson12_6.id, question: "Quelle marque est réputée pour l'intégration TIA Portal ?", options: JSON.stringify(["ABB", "Siemens", "Danfoss", "SEW"]), correctIndex: 1, explanation: "Les variateurs Siemens SINAMICS s'intègrent nativement dans l'environnement TIA Portal.", order: 1 },
      { lessonId: lesson12_6.id, question: "Pour quelle application Danfoss est-il particulièrement reconnu ?", options: JSON.stringify(["Robotique", "HVAC et efficacité énergétique", "Industrie lourde", "Machines-outils"]), correctIndex: 1, explanation: "Danfoss VLT est reconnu pour les applications HVAC et son efficacité énergétique.", order: 2 },
      { lessonId: lesson12_6.id, question: "Quel critère n'est PAS important dans le choix d'un variateur ?", options: JSON.stringify(["Puissance et tension", "Couleur du boîtier", "Type de contrôle", "Options de communication"]), correctIndex: 1, explanation: "La couleur est purement esthétique et n'affecte pas les performances du variateur.", order: 3 },
      { lessonId: lesson12_6.id, question: "Que signifie IP dans les caractéristiques environnementales ?", options: JSON.stringify(["Internet Protocol", "Indice de Protection", "Input Power", "Integrated Processor"]), correctIndex: 1, explanation: "L'indice IP (Ingress Protection) indique le niveau de protection contre la poussière et l'eau.", order: 4 },
      { lessonId: lesson12_6.id, question: "Quelle gamme ABB est adaptée à l'industrie lourde ?", options: JSON.stringify(["ACS180", "ACS310", "ACS880", "ACS50"]), correctIndex: 2, explanation: "La gamme ACS880 est la gamme industrielle haute performance d'ABB.", order: 5 },
      // Quiz Module 13 - Lesson 1 (Paramètres moteur)
      { lessonId: lesson13_1.id, question: "Où trouve-t-on les données à paramétrer dans le variateur ?", options: JSON.stringify(["Dans le manuel du variateur", "Sur la plaque signalétique du moteur", "Sur Internet", "Dans l'automate"]), correctIndex: 1, explanation: "La plaque signalétique du moteur contient toutes les caractéristiques nominales nécessaires.", order: 1 },
      { lessonId: lesson13_1.id, question: "Qu'est-ce que l'auto-tuning ?", options: JSON.stringify(["Réglage automatique de la radio", "Identification automatique du moteur", "Calibration des capteurs", "Mise à jour firmware"]), correctIndex: 1, explanation: "L'auto-tuning identifie automatiquement les paramètres électriques du moteur.", order: 2 },
      { lessonId: lesson13_1.id, question: "Quelle condition pour l'auto-tuning dynamique ?", options: JSON.stringify(["Moteur alimenté", "Charge découplée", "Variateur froid", "Communication active"]), correctIndex: 1, explanation: "L'auto-tuning avec rotation nécessite que la charge soit découplée pour tourner librement.", order: 3 },
      { lessonId: lesson13_1.id, question: "Que représente le cos φ sur la plaque moteur ?", options: JSON.stringify(["Le rendement", "Le facteur de puissance", "La vitesse maximale", "Le courant de démarrage"]), correctIndex: 1, explanation: "Le cos φ (cosinus phi) est le facteur de puissance du moteur à charge nominale.", order: 4 },
      { lessonId: lesson13_1.id, question: "Pourquoi la fréquence nominale est-elle importante ?", options: JSON.stringify(["Pour la communication", "Pour le calcul de la vitesse et du flux", "Pour le bruit", "Pour le refroidissement"]), correctIndex: 1, explanation: "La fréquence nominale permet au variateur de calculer la vitesse synchrone et maintenir le flux correct.", order: 5 },
      // Quiz Module 13 - Lesson 2 (Rampes)
      { lessonId: lesson13_2.id, question: "Qu'est-ce qu'une rampe en S ?", options: JSON.stringify(["Une rampe en forme de S", "Une accélération progressive au début et à la fin", "Une rampe très rapide", "Une rampe pour charges lourdes"]), correctIndex: 1, explanation: "La rampe en S a une accélération progressive au démarrage et à la fin pour un mouvement plus doux.", order: 1 },
      { lessonId: lesson13_2.id, question: "Que se passe-t-il si la rampe d'accélération est trop rapide ?", options: JSON.stringify(["Rien de particulier", "Défaut de surintensité", "Le moteur va plus vite", "Économie d'énergie"]), correctIndex: 1, explanation: "Une rampe trop rapide demande trop de courant et déclenche la protection surintensité.", order: 2 },
      { lessonId: lesson13_2.id, question: "Que provoque une décélération trop rapide ?", options: JSON.stringify(["Surchauffe moteur", "Défaut de surtension", "Court-circuit", "Perte de communication"]), correctIndex: 1, explanation: "Le moteur devient générateur lors du freinage, renvoyant de l'énergie qui fait monter la tension du bus DC.", order: 3 },
      { lessonId: lesson13_2.id, question: "À quoi sert la limite de vitesse minimale ?", options: JSON.stringify(["Protéger le moteur", "Éviter la surchauffe à basse vitesse", "Économiser l'énergie", "Toutes ces réponses"]), correctIndex: 3, explanation: "La limite basse protège le moteur qui peut surchauffer à très basse vitesse sans ventilation suffisante.", order: 4 },
      { lessonId: lesson13_2.id, question: "Peut-on dépasser 100% de la vitesse nominale ?", options: JSON.stringify(["Non, jamais", "Oui, jusqu'à 120% typiquement", "Oui, sans limite", "Seulement en mode spécial"]), correctIndex: 1, explanation: "On peut généralement aller jusqu'à 120% mais le couple disponible diminue au-delà de la fréquence nominale.", order: 5 },
      // Quiz Module 13 - Lesson 3 (Modes de commande)
      { lessonId: lesson13_3.id, question: "Quel avantage du signal 4-20mA sur le 0-10V ?", options: JSON.stringify(["Plus précis", "Moins sensible aux parasites", "Plus rapide", "Moins cher"]), correctIndex: 1, explanation: "Le signal courant 4-20mA est moins sensible aux perturbations électromagnétiques que la tension.", order: 1 },
      { lessonId: lesson13_3.id, question: "Que permet le mode de commande combiné ?", options: JSON.stringify(["Plus de puissance", "Certaines fonctions locales, d'autres par bus", "Deux moteurs", "Redondance"]), correctIndex: 1, explanation: "Le mode combiné permet par exemple la marche/arrêt par bornier et la consigne par bus de terrain.", order: 2 },
      { lessonId: lesson13_3.id, question: "Quel est l'inconvénient principal du potentiomètre ?", options: JSON.stringify(["Coût élevé", "Imprécision", "Complexité", "Consommation"]), correctIndex: 1, explanation: "Le potentiomètre manque de précision et de répétabilité comparé aux signaux numériques.", order: 3 },
      { lessonId: lesson13_3.id, question: "Quel protocole est universel pour les variateurs ?", options: JSON.stringify(["Profinet", "EtherCAT", "Modbus", "DeviceNet"]), correctIndex: 2, explanation: "Modbus est supporté par pratiquement tous les fabricants de variateurs.", order: 4 },
      { lessonId: lesson13_3.id, question: "Où se paramètre la source de commande ?", options: JSON.stringify(["Dans l'automate", "Dans les paramètres du variateur", "Sur le moteur", "Dans le câblage"]), correctIndex: 1, explanation: "La source de commande (local, bornier, bus) se configure dans les paramètres du variateur.", order: 5 },
      // Quiz Module 13 - Lesson 4 (PID)
      { lessonId: lesson13_4.id, question: "Que régule typiquement le PID intégré d'un variateur ?", options: JSON.stringify(["La vitesse moteur", "Une grandeur process (pression, débit...)", "Le courant", "La température variateur"]), correctIndex: 1, explanation: "Le PID intégré régule une grandeur process comme la pression ou le débit, pas la vitesse moteur directement.", order: 1 },
      { lessonId: lesson13_4.id, question: "Quel paramètre PID élimine l'erreur statique ?", options: JSON.stringify(["P (proportionnel)", "I (intégral)", "D (dérivé)", "Aucun"]), correctIndex: 1, explanation: "L'action intégrale accumule l'erreur dans le temps jusqu'à son élimination.", order: 2 },
      { lessonId: lesson13_4.id, question: "Par quoi commencer le réglage PID ?", options: JSON.stringify(["D seul", "I seul", "P seul", "Tout en même temps"]), correctIndex: 2, explanation: "On commence par P seul, puis on ajoute I progressivement. D est rarement nécessaire.", order: 3 },
      { lessonId: lesson13_4.id, question: "Que provoque un gain I trop élevé ?", options: JSON.stringify(["Réponse lente", "Oscillations", "Erreur statique", "Aucun effet"]), correctIndex: 1, explanation: "Un gain intégral trop élevé provoque des dépassements et oscillations.", order: 4 },
      { lessonId: lesson13_4.id, question: "Pour quelle application le PID intégré est-il adapté ?", options: JSON.stringify(["Positionnement précis", "Régulation de pression pompe", "Synchronisation d'axes", "Commande numérique"]), correctIndex: 1, explanation: "Le PID intégré est parfait pour les régulations simples comme la pression de pompe.", order: 5 },
      // Quiz Module 13 - Lesson 5 (Défauts)
      { lessonId: lesson13_5.id, question: "Que signifie le code défaut OC ?", options: JSON.stringify(["Over Current (surintensité)", "Open Circuit", "Over Charge", "Output Control"]), correctIndex: 0, explanation: "OC signifie Over Current, indiquant une surintensité détectée.", order: 1 },
      { lessonId: lesson13_5.id, question: "Quelle action pour un défaut OV (surtension) au freinage ?", options: JSON.stringify(["Réduire la charge", "Allonger la rampe de décélération", "Augmenter la vitesse", "Changer le moteur"]), correctIndex: 1, explanation: "Une rampe plus longue réduit l'énergie de freinage renvoyée et évite la surtension.", order: 2 },
      { lessonId: lesson13_5.id, question: "Qu'est-ce que l'arrêt sur rampe en cas de défaut ?", options: JSON.stringify(["Arrêt immédiat", "Décélération contrôlée puis arrêt", "Maintien de vitesse", "Inversion"]), correctIndex: 1, explanation: "L'arrêt sur rampe effectue une décélération contrôlée au lieu d'un arrêt brutal.", order: 3 },
      { lessonId: lesson13_5.id, question: "Que vérifier en cas de défaut de surchauffe ?", options: JSON.stringify(["Le câblage", "La ventilation et la charge", "La communication", "La consigne"]), correctIndex: 1, explanation: "La surchauffe indique généralement un problème de ventilation ou de surcharge.", order: 4 },
      { lessonId: lesson13_5.id, question: "Pourquoi ne pas désactiver les protections ?", options: JSON.stringify(["C'est impossible", "Risque pour l'installation et la sécurité", "Ça consomme plus", "C'est illégal"]), correctIndex: 1, explanation: "Désactiver les protections expose l'installation et les personnes à des risques graves.", order: 5 },
      // Quiz Module 13 - Lesson 6 (Sauvegarde)
      { lessonId: lesson13_6.id, question: "Pourquoi sauvegarder les paramètres du variateur ?", options: JSON.stringify(["Pour la garantie", "Pour faciliter le remplacement", "Pour la certification", "C'est obligatoire"]), correctIndex: 1, explanation: "La sauvegarde permet de reconfigurer rapidement un variateur de remplacement.", order: 1 },
      { lessonId: lesson13_6.id, question: "Quelle méthode de sauvegarde est la plus pratique ?", options: JSON.stringify(["Noter sur papier", "Clé USB directement sur le variateur", "Photo de l'écran", "Mémoriser"]), correctIndex: 1, explanation: "La clé USB permet une sauvegarde rapide et fiable directement sur le variateur.", order: 2 },
      { lessonId: lesson13_6.id, question: "Que faut-il également sauvegarder ?", options: JSON.stringify(["Le manuel", "Le firmware du variateur", "La facture", "Le schéma électrique"]), correctIndex: 1, explanation: "Le firmware peut être différent entre variateurs et affecter la compatibilité des paramètres.", order: 3 },
      { lessonId: lesson13_6.id, question: "À quelle fréquence sauvegarder ?", options: JSON.stringify(["Une fois par an", "Après chaque modification", "Jamais", "À l'installation uniquement"]), correctIndex: 1, explanation: "Chaque modification des paramètres devrait être suivie d'une sauvegarde.", order: 4 },
      { lessonId: lesson13_6.id, question: "Où garder la copie de sauvegarde ?", options: JSON.stringify(["Sur le variateur uniquement", "À côté du variateur", "Hors site également", "Dans le moteur"]), correctIndex: 2, explanation: "Une copie hors site protège contre la perte en cas de sinistre ou vol.", order: 5 },
      // Quiz Module 14 - Lesson 1 (Protocoles)
      { lessonId: lesson14_1.id, question: "Quel protocole est universel et supporté par tous les fabricants ?", options: JSON.stringify(["Profinet", "EtherCAT", "Modbus", "CC-Link"]), correctIndex: 2, explanation: "Modbus RTU est le protocole le plus universel, supporté par pratiquement tous les variateurs.", order: 1 },
      { lessonId: lesson14_1.id, question: "Quelle est la vitesse typique de Profinet ?", options: JSON.stringify(["9600 bps", "115.2 kbps", "100 Mbps", "1 Gbps"]), correctIndex: 2, explanation: "Profinet utilise Ethernet standard à 100 Mbps.", order: 2 },
      { lessonId: lesson14_1.id, question: "Quel type de données est échangé en continu ?", options: JSON.stringify(["Paramètres de configuration", "Commande et retours d'état", "Historique des défauts", "Manuel utilisateur"]), correctIndex: 1, explanation: "Les mots de commande, consignes et retours d'état sont échangés cycliquement.", order: 3 },
      { lessonId: lesson14_1.id, question: "Quel protocole est typiquement associé à Siemens ?", options: JSON.stringify(["Modbus", "Profinet/Profibus", "Ethernet/IP", "DeviceNet"]), correctIndex: 1, explanation: "Profinet et Profibus sont les protocoles natifs de l'écosystème Siemens.", order: 4 },
      { lessonId: lesson14_1.id, question: "Quel protocole offre le temps de cycle le plus court ?", options: JSON.stringify(["Modbus RTU", "Profibus", "EtherCAT", "CANopen"]), correctIndex: 2, explanation: "EtherCAT atteint des temps de cycle de l'ordre de la microseconde.", order: 5 },
      // Quiz Module 14 - Lesson 2 (Modbus)
      { lessonId: lesson14_2.id, question: "Quelle plage d'adresses Modbus pour un esclave ?", options: JSON.stringify(["0-255", "1-247", "1-127", "0-65535"]), correctIndex: 1, explanation: "Les adresses esclaves Modbus RTU vont de 1 à 247.", order: 1 },
      { lessonId: lesson14_2.id, question: "Quelle fonction Modbus pour lire plusieurs registres ?", options: JSON.stringify(["01", "03", "06", "15"]), correctIndex: 1, explanation: "La fonction 03 (Read Holding Registers) permet de lire plusieurs registres.", order: 2 },
      { lessonId: lesson14_2.id, question: "Quelle vitesse Modbus RTU est la plus courante ?", options: JSON.stringify(["2400 baud", "9600 baud", "38400 baud", "115200 baud"]), correctIndex: 1, explanation: "9600 baud est la vitesse par défaut la plus courante pour Modbus RTU.", order: 3 },
      { lessonId: lesson14_2.id, question: "Que signifie RTU dans Modbus RTU ?", options: JSON.stringify(["Real Time Unit", "Remote Terminal Unit", "Register Transfer Unit", "Rapid Transfer Update"]), correctIndex: 1, explanation: "RTU signifie Remote Terminal Unit, le format binaire compact de Modbus.", order: 4 },
      { lessonId: lesson14_2.id, question: "Quelle fonction pour écrire un seul registre ?", options: JSON.stringify(["03", "06", "16", "01"]), correctIndex: 1, explanation: "La fonction 06 (Write Single Register) écrit une valeur dans un registre.", order: 5 },
      // Quiz Module 14 - Lesson 3 (Intégration automate)
      { lessonId: lesson14_3.id, question: "Que contient le mot de commande (Control Word) ?", options: JSON.stringify(["La vitesse réelle", "Les ordres de marche/arrêt", "Les paramètres moteur", "L'historique"]), correctIndex: 1, explanation: "Le Control Word contient les bits de commande : marche, arrêt, reset, etc.", order: 1 },
      { lessonId: lesson14_3.id, question: "Quel bit indique généralement le défaut dans le Status Word ?", options: JSON.stringify(["Bit 0", "Bit 1", "Bit 3", "Bit 15"]), correctIndex: 2, explanation: "Le bit 3 est conventionnellement utilisé pour signaler un défaut.", order: 2 },
      { lessonId: lesson14_3.id, question: "Pourquoi prévoir un mode de secours local ?", options: JSON.stringify(["Pour les tests", "En cas de perte de communication", "Pour économiser", "C'est obligatoire"]), correctIndex: 1, explanation: "Le mode local permet de continuer à fonctionner si la communication avec l'automate est perdue.", order: 3 },
      { lessonId: lesson14_3.id, question: "Comment s'appelle la consigne vitesse envoyée au variateur ?", options: JSON.stringify(["Speed Feedback", "Speed Reference/Setpoint", "Speed Limit", "Speed Error"]), correctIndex: 1, explanation: "La consigne s'appelle Speed Reference ou Speed Setpoint.", order: 4 },
      { lessonId: lesson14_3.id, question: "Que retourne le variateur comme information de vitesse ?", options: JSON.stringify(["Speed Reference", "Speed Feedback/Actual", "Speed Error", "Speed Limit"]), correctIndex: 1, explanation: "Le variateur retourne la vitesse réelle (actual/feedback) mesurée ou estimée.", order: 5 },
      // Quiz Module 14 - Lesson 4 (Diagnostic)
      { lessonId: lesson14_4.id, question: "Quel paramètre indique la charge relative du moteur ?", options: JSON.stringify(["Tension bus DC", "Courant moteur", "Température IGBT", "Fréquence sortie"]), correctIndex: 1, explanation: "Le courant moteur par rapport au nominal indique directement la charge.", order: 1 },
      { lessonId: lesson14_4.id, question: "Pourquoi surveiller les heures de fonctionnement ?", options: JSON.stringify(["Pour la facturation", "Pour la maintenance préventive", "Pour la garantie", "Pour le rendement"]), correctIndex: 1, explanation: "Les heures de fonctionnement permettent de planifier les maintenances préventives.", order: 2 },
      { lessonId: lesson14_4.id, question: "Que contient l'historique des défauts ?", options: JSON.stringify(["Seulement le code", "Code, date, et conditions au moment du défaut", "Uniquement la date", "Rien d'utile"]), correctIndex: 1, explanation: "L'historique complet aide au diagnostic avec le contexte du défaut.", order: 3 },
      { lessonId: lesson14_4.id, question: "Quel composant a une durée de vie limitée à surveiller ?", options: JSON.stringify(["Le processeur", "Les condensateurs du bus DC", "Les borniers", "Le boîtier"]), correctIndex: 1, explanation: "Les condensateurs électrolytiques vieillissent et doivent être remplacés typiquement tous les 5-10 ans.", order: 4 },
      { lessonId: lesson14_4.id, question: "Comment accéder au diagnostic à distance ?", options: JSON.stringify(["Pas possible", "Via le bus de terrain", "Uniquement sur place", "Par téléphone"]), correctIndex: 1, explanation: "Les protocoles de communication permettent de lire les données de diagnostic à distance.", order: 5 },
      // Quiz Module 14 - Lesson 5 (Dépannage)
      { lessonId: lesson14_5.id, question: "Quelle est la première étape de dépannage ?", options: JSON.stringify(["Changer le variateur", "Relever le code défaut", "Appeler le support", "Redémarrer"]), correctIndex: 1, explanation: "Le code défaut oriente immédiatement vers la cause probable du problème.", order: 1 },
      { lessonId: lesson14_5.id, question: "Un défaut OC au démarrage peut indiquer ?", options: JSON.stringify(["Surtension réseau", "Court-circuit ou câble trop long", "Surcharge thermique", "Défaut communication"]), correctIndex: 1, explanation: "Un court-circuit moteur ou un câble trop long provoque une surintensité au démarrage.", order: 2 },
      { lessonId: lesson14_5.id, question: "Que vérifier pour un défaut de surchauffe ?", options: JSON.stringify(["La communication", "Ventilation et charge", "Le câblage entrées", "La consigne"]), correctIndex: 1, explanation: "La surchauffe est liée à un manque de ventilation ou une charge excessive.", order: 3 },
      { lessonId: lesson14_5.id, question: "Un défaut OV au freinage nécessite ?", options: JSON.stringify(["Résistance de freinage ou rampe plus longue", "Moteur plus puissant", "Câble plus gros", "Nouveau variateur"]), correctIndex: 0, explanation: "L'énergie de freinage doit être dissipée par une résistance ou la rampe allongée.", order: 4 },
      { lessonId: lesson14_5.id, question: "Pas de communication avec le variateur : que vérifier d'abord ?", options: JSON.stringify(["Le firmware", "Paramètres et câblage", "Le moteur", "Les rampes"]), correctIndex: 1, explanation: "Vérifier l'adresse, la vitesse, le câblage et la terminaison en premier.", order: 5 },
      // Quiz Module 14 - Lesson 6 (Maintenance)
      { lessonId: lesson14_6.id, question: "À quelle fréquence faire une inspection visuelle ?", options: JSON.stringify(["Quotidienne", "Mensuelle", "Annuelle", "Jamais"]), correctIndex: 1, explanation: "Une inspection mensuelle permet de détecter rapidement les problèmes.", order: 1 },
      { lessonId: lesson14_6.id, question: "Quand remplacer les condensateurs du bus DC ?", options: JSON.stringify(["Tous les ans", "Tous les 5 ans environ", "Jamais", "À chaque panne"]), correctIndex: 1, explanation: "Les condensateurs électrolytiques ont une durée de vie typique de 5-10 ans.", order: 2 },
      { lessonId: lesson14_6.id, question: "Que vérifier annuellement ?", options: JSON.stringify(["Seulement le firmware", "Serrage connexions et ventilateurs", "Rien", "Le numéro de série"]), correctIndex: 1, explanation: "Les connexions peuvent se desserrer avec les vibrations et les cycles thermiques.", order: 3 },
      { lessonId: lesson14_6.id, question: "Comment détecter un condensateur défaillant ?", options: JSON.stringify(["Par la couleur", "Gonflement du dessus", "Par le bruit", "Impossible à détecter"]), correctIndex: 1, explanation: "Un condensateur défaillant présente souvent un gonflement visible sur le dessus.", order: 4 },
      { lessonId: lesson14_6.id, question: "Pourquoi tenir un carnet de maintenance ?", options: JSON.stringify(["Pour la garantie", "Pour l'historique et la traçabilité", "C'est obligatoire", "Pour la décoration"]), correctIndex: 1, explanation: "L'historique des interventions aide à identifier les tendances et problèmes récurrents.", order: 5 },
      // Quiz Module 15 - Lesson 1 (Principes positionnement)
      { lessonId: lesson15_1.id, question: "Qu'est-ce que le motion control ?", options: JSON.stringify(["Contrôle de température", "Contrôle de mouvement et positionnement", "Contrôle qualité", "Télécommande"]), correctIndex: 1, explanation: "Le motion control est la discipline du contrôle précis des mouvements mécaniques.", order: 1 },
      { lessonId: lesson15_1.id, question: "Quel composant calcule les trajectoires ?", options: JSON.stringify(["Le moteur", "Le contrôleur", "Le codeur", "L'alimentation"]), correctIndex: 1, explanation: "Le contrôleur de mouvement calcule les profils et coordonne les axes.", order: 2 },
      { lessonId: lesson15_1.id, question: "À quoi sert le retour position ?", options: JSON.stringify(["Alimenter le moteur", "Mesurer la position réelle", "Calculer la trajectoire", "Refroidir le système"]), correctIndex: 1, explanation: "Le retour position (codeur) mesure la position réelle pour la boucle de régulation.", order: 3 },
      { lessonId: lesson15_1.id, question: "Quelle application n'utilise PAS le motion control ?", options: JSON.stringify(["Robotique", "Emballage", "Éclairage", "CNC"]), correctIndex: 2, explanation: "L'éclairage standard ne nécessite pas de contrôle de mouvement.", order: 4 },
      { lessonId: lesson15_1.id, question: "Quel est le rôle du drive/servo-variateur ?", options: JSON.stringify(["Calculer les trajectoires", "Alimenter et contrôler le moteur", "Mesurer la position", "Programmer le système"]), correctIndex: 1, explanation: "Le drive alimente le moteur en puissance et gère les boucles de régulation.", order: 5 },
      // Quiz Module 15 - Lesson 2 (Mécanique)
      { lessonId: lesson15_2.id, question: "Quelle unité pour le couple ?", options: JSON.stringify(["kg", "mm/s", "Nm", "rad/s"]), correctIndex: 2, explanation: "Le couple s'exprime en Newton-mètres (Nm).", order: 1 },
      { lessonId: lesson15_2.id, question: "Qu'est-ce que l'inertie ?", options: JSON.stringify(["La vitesse", "La résistance au changement de vitesse", "La position", "La température"]), correctIndex: 1, explanation: "L'inertie représente la résistance d'un corps à modifier sa vitesse de rotation.", order: 2 },
      { lessonId: lesson15_2.id, question: "Quel type de transmission offre la meilleure précision ?", options: JSON.stringify(["Courroie", "Chaîne", "Vis à billes", "Engrenage"]), correctIndex: 2, explanation: "La vis à billes offre une très haute précision et un excellent rendement.", order: 3 },
      { lessonId: lesson15_2.id, question: "L'entraînement direct élimine quoi ?", options: JSON.stringify(["Le moteur", "La transmission mécanique", "Le codeur", "L'alimentation"]), correctIndex: 1, explanation: "L'entraînement direct supprime la transmission (réducteur, vis) pour une précision maximale.", order: 4 },
      { lessonId: lesson15_2.id, question: "Quelle transmission est la plus rapide ?", options: JSON.stringify(["Vis à billes", "Courroie", "Crémaillère", "Réducteur"]), correctIndex: 1, explanation: "La courroie permet les vitesses les plus élevées grâce à sa légèreté.", order: 5 },
      // Quiz Module 15 - Lesson 3 (Codeurs)
      { lessonId: lesson15_3.id, question: "Que nécessite un codeur incrémental ?", options: JSON.stringify(["Rien de spécial", "Une prise d'origine", "Un câble spécial", "Une alimentation 230V"]), correctIndex: 1, explanation: "Le codeur incrémental ne connaît pas sa position absolue, une prise d'origine est nécessaire.", order: 1 },
      { lessonId: lesson15_3.id, question: "Combien de points par tour pour un codeur 17 bits ?", options: JSON.stringify(["17", "1024", "65536", "131072"]), correctIndex: 3, explanation: "Un codeur 17 bits offre 2^17 = 131072 points par tour.", order: 2 },
      { lessonId: lesson15_3.id, question: "Quel codeur garde sa position après coupure ?", options: JSON.stringify(["Incrémental", "Absolu", "Potentiomètre", "Résolver"]), correctIndex: 1, explanation: "Le codeur absolu conserve la position même hors tension grâce à un encodage unique.", order: 3 },
      { lessonId: lesson15_3.id, question: "Que signifie PPR ?", options: JSON.stringify(["Points Par Révolution", "Position Par Registre", "Pulse Par Rotation", "Points Par Registre"]), correctIndex: 0, explanation: "PPR (Points Per Revolution) indique la résolution du codeur.", order: 4 },
      { lessonId: lesson15_3.id, question: "Qu'est-ce qu'un codeur multi-tours ?", options: JSON.stringify(["Un codeur à plusieurs vitesses", "Un codeur qui compte les tours complets", "Un codeur tournant vite", "Un codeur avec plusieurs câbles"]), correctIndex: 1, explanation: "Le codeur multi-tours mémorise la position absolue sur plusieurs rotations complètes.", order: 5 },
      // Quiz Module 15 - Lesson 4 (Boucles)
      { lessonId: lesson15_4.id, question: "Quelle boucle est la plus rapide ?", options: JSON.stringify(["Position", "Vitesse", "Courant", "Elles sont égales"]), correctIndex: 2, explanation: "La boucle de courant est la plus rapide (16 kHz typique), puis vitesse, puis position.", order: 1 },
      { lessonId: lesson15_4.id, question: "Dans quel ordre régler les boucles ?", options: JSON.stringify(["Position, vitesse, courant", "Courant, vitesse, position", "Tout en même temps", "L'ordre n'importe pas"]), correctIndex: 1, explanation: "On règle de l'intérieur vers l'extérieur : courant, puis vitesse, puis position.", order: 2 },
      { lessonId: lesson15_4.id, question: "Quelle boucle contrôle le couple ?", options: JSON.stringify(["Position", "Vitesse", "Courant", "Aucune"]), correctIndex: 2, explanation: "Le couple est proportionnel au courant, donc contrôlé par la boucle de courant.", order: 3 },
      { lessonId: lesson15_4.id, question: "Quelle fréquence typique pour la boucle de position ?", options: JSON.stringify(["16 kHz", "4 kHz", "1 kHz", "100 Hz"]), correctIndex: 2, explanation: "La boucle de position fonctionne typiquement à 1 kHz (1 ms).", order: 4 },
      { lessonId: lesson15_4.id, question: "Pourquoi les boucles sont-elles imbriquées ?", options: JSON.stringify(["Pour simplifier", "Chaque boucle corrige la suivante", "Par hasard", "Pour économiser"]), correctIndex: 1, explanation: "Chaque boucle externe utilise la boucle interne comme actionneur, permettant un contrôle précis.", order: 5 },
      // Quiz Module 15 - Lesson 5 (Homing)
      { lessonId: lesson15_5.id, question: "À quoi sert la prise d'origine ?", options: JSON.stringify(["Allumer le système", "Établir un référentiel de position connu", "Régler la vitesse", "Calibrer le codeur"]), correctIndex: 1, explanation: "Le homing définit un point de référence connu pour le système de coordonnées.", order: 1 },
      { lessonId: lesson15_5.id, question: "Avec quel type de codeur peut-on éviter le homing ?", options: JSON.stringify(["Incrémental", "Absolu mono-tour", "Absolu multi-tours", "Potentiomètre"]), correctIndex: 2, explanation: "Le codeur absolu multi-tours conserve la position absolue, évitant le homing quotidien.", order: 2 },
      { lessonId: lesson15_5.id, question: "Qu'est-ce que la vitesse d'approche ?", options: JSON.stringify(["Vitesse maximale", "Vitesse rapide vers le capteur de homing", "Vitesse de travail", "Vitesse minimale"]), correctIndex: 1, explanation: "La vitesse d'approche est la vitesse rapide utilisée pour aller vers le capteur de homing.", order: 3 },
      { lessonId: lesson15_5.id, question: "Pourquoi utiliser une vitesse de recherche lente ?", options: JSON.stringify(["Économie d'énergie", "Meilleure précision du point zéro", "Réduire le bruit", "Éviter l'usure"]), correctIndex: 1, explanation: "Une vitesse lente après détection du capteur améliore la précision de la position zéro.", order: 4 },
      { lessonId: lesson15_5.id, question: "À quoi sert l'offset de homing ?", options: JSON.stringify(["Décaler la position zéro", "Augmenter la vitesse", "Réduire le courant", "Changer de direction"]), correctIndex: 0, explanation: "L'offset permet de définir la position zéro à un endroit différent du capteur physique.", order: 5 },
      // Quiz Module 15 - Lesson 6 (Limites)
      { lessonId: lesson15_6.id, question: "Quel type de limite est prioritaire ?", options: JSON.stringify(["Limites logicielles", "Fins de course matériels", "Limites process", "Elles sont égales"]), correctIndex: 1, explanation: "Les fins de course matériels ont la priorité maximale après l'arrêt d'urgence.", order: 1 },
      { lessonId: lesson15_6.id, question: "À quoi servent les limites logicielles ?", options: JSON.stringify(["Remplacer les fins de course matériels", "Définir la zone de travail normale", "Protéger le codeur", "Réduire la vitesse"]), correctIndex: 1, explanation: "Les limites logicielles définissent la zone de travail, les fins de course matériels sont une sécurité.", order: 2 },
      { lessonId: lesson15_6.id, question: "Quand les fins de course matériels doivent-ils être activés ?", options: JSON.stringify(["En fonctionnement normal", "Jamais en fonctionnement normal", "À chaque cycle", "Au démarrage"]), correctIndex: 1, explanation: "Les fins de course sont une sécurité ultime et ne doivent pas être atteints en fonctionnement normal.", order: 3 },
      { lessonId: lesson15_6.id, question: "Que protège une limite de couple ?", options: JSON.stringify(["Le codeur", "La mécanique en cas de blocage", "Le variateur", "Le câblage"]), correctIndex: 1, explanation: "La limite de couple protège la mécanique si l'axe rencontre un obstacle.", order: 4 },
      { lessonId: lesson15_6.id, question: "Quel ordre de priorité des sécurités ?", options: JSON.stringify(["Logiciel, matériel, AU", "AU, matériel, logiciel", "Tout pareil", "Logiciel uniquement"]), correctIndex: 1, explanation: "L'arrêt d'urgence est prioritaire, puis les fins de course matériels, puis les limites logicielles.", order: 5 },
      // Quiz Module 16 - Lesson 1 (Pas à pas)
      { lessonId: lesson16_1.id, question: "Quel est le pas angulaire standard d'un moteur pas à pas ?", options: JSON.stringify(["0.9°", "1.8°", "3.6°", "7.2°"]), correctIndex: 1, explanation: "Le pas standard est de 1.8°, soit 200 pas par tour complet.", order: 1 },
      { lessonId: lesson16_1.id, question: "Qu'est-ce que le micro-stepping ?", options: JSON.stringify(["Petits moteurs", "Division du pas en fractions", "Pas très rapides", "Moteurs miniatures"]), correctIndex: 1, explanation: "Le micro-stepping divise chaque pas en fractions plus petites pour plus de résolution.", order: 2 },
      { lessonId: lesson16_1.id, question: "Quel inconvénient majeur du moteur pas à pas ?", options: JSON.stringify(["Coût élevé", "Perte de pas possible en surcharge", "Faible couple", "Bruit nul"]), correctIndex: 1, explanation: "En boucle ouverte, une surcharge peut faire perdre des pas sans détection.", order: 3 },
      { lessonId: lesson16_1.id, question: "Combien de fils pour un moteur bipolaire ?", options: JSON.stringify(["2", "4", "6", "8"]), correctIndex: 1, explanation: "Un moteur bipolaire a 4 fils (2 par phase).", order: 4 },
      { lessonId: lesson16_1.id, question: "Où le moteur pas à pas excelle-t-il ?", options: JSON.stringify(["Haute vitesse", "Positionnement à basse vitesse", "Forte accélération", "Charges variables"]), correctIndex: 1, explanation: "Le pas à pas offre un excellent couple et maintien de position à basse vitesse.", order: 5 },
      // Quiz Module 16 - Lesson 2 (Servomoteurs)
      { lessonId: lesson16_2.id, question: "Que signifie PMSM ?", options: JSON.stringify(["Permanent Magnet Synchronous Motor", "Power Motor Speed Management", "Precision Motion System Module", "Programmable Motor Servo Module"]), correctIndex: 0, explanation: "PMSM signifie Permanent Magnet Synchronous Motor (moteur synchrone à aimants permanents).", order: 1 },
      { lessonId: lesson16_2.id, question: "Quel rendement typique d'un servomoteur ?", options: JSON.stringify(["50%", "70%", "90% ou plus", "99%"]), correctIndex: 2, explanation: "Les servomoteurs synchrones ont un excellent rendement, souvent supérieur à 90%.", order: 2 },
      { lessonId: lesson16_2.id, question: "Quelle surcharge momentanée un servo peut-il fournir ?", options: JSON.stringify(["Aucune", "1.5x nominal", "3x nominal typiquement", "10x nominal"]), correctIndex: 2, explanation: "Un servomoteur peut typiquement fournir 3 fois son couple nominal pendant quelques secondes.", order: 3 },
      { lessonId: lesson16_2.id, question: "Pourquoi les servos n'ont-ils pas de balais ?", options: JSON.stringify(["Pour le coût", "Pas de maintenance, meilleur rendement", "Par hasard", "Pour le design"]), correctIndex: 1, explanation: "L'absence de balais élimine l'usure et les étincelles, améliorant rendement et durée de vie.", order: 4 },
      { lessonId: lesson16_2.id, question: "Quel type de retour est intégré aux servomoteurs ?", options: JSON.stringify(["Aucun", "Codeur ou résolver", "Potentiomètre", "Sonde température uniquement"]), correctIndex: 1, explanation: "Les servomoteurs intègrent un codeur ou résolver pour le retour position.", order: 5 },
      // Quiz Module 16 - Lesson 3 (Comparaison)
      { lessonId: lesson16_3.id, question: "Quel moteur choisir pour un budget limité ?", options: JSON.stringify(["Servo", "Pas à pas", "Linéaire", "DC brushless"]), correctIndex: 1, explanation: "Le moteur pas à pas est nettement moins cher qu'un système servo.", order: 1 },
      { lessonId: lesson16_3.id, question: "Pour quelle application choisir un servo ?", options: JSON.stringify(["Positionnement simple et lent", "Haute dynamique et charges variables", "Coût minimal", "Boucle ouverte"]), correctIndex: 1, explanation: "Les servos excellent pour les applications dynamiques avec charges variables.", order: 2 },
      { lessonId: lesson16_3.id, question: "Quel moteur est plus silencieux ?", options: JSON.stringify(["Pas à pas", "Servo", "Ils sont identiques", "DC brossé"]), correctIndex: 1, explanation: "Les servomoteurs sont généralement plus silencieux que les moteurs pas à pas.", order: 3 },
      { lessonId: lesson16_3.id, question: "Lequel peut fonctionner en boucle ouverte ?", options: JSON.stringify(["Servo uniquement", "Pas à pas", "Les deux", "Aucun"]), correctIndex: 1, explanation: "Le moteur pas à pas peut fonctionner sans retour de position (boucle ouverte).", order: 4 },
      { lessonId: lesson16_3.id, question: "Pour maintenir une position à l'arrêt ?", options: JSON.stringify(["Servo consomme moins", "Pas à pas maintient naturellement", "Identique", "Impossible"]), correctIndex: 1, explanation: "Le pas à pas maintient sa position avec couple même à l'arrêt, sans contrôle actif.", order: 5 },
      // Quiz Module 16 - Lesson 4 (Dimensionnement)
      { lessonId: lesson16_4.id, question: "Quelle formule pour le couple d'accélération ?", options: JSON.stringify(["T = m × v", "T = J × α", "T = P / ω", "T = F × d"]), correctIndex: 1, explanation: "Le couple d'accélération est T = J (inertie) × α (accélération angulaire).", order: 1 },
      { lessonId: lesson16_4.id, question: "Quel rapport d'inertie charge/moteur est optimal ?", options: JSON.stringify(["< 1", "= 1", "≤ 10", "> 100"]), correctIndex: 2, explanation: "Un rapport d'inertie inférieur à 10 assure de bonnes performances dynamiques.", order: 2 },
      { lessonId: lesson16_4.id, question: "Que représente le couple RMS ?", options: JSON.stringify(["Couple maximal", "Couple moyen sur le cycle", "Couple minimal", "Couple au démarrage"]), correctIndex: 1, explanation: "Le couple RMS est le couple moyen quadratique sur le cycle, à comparer au nominal.", order: 3 },
      { lessonId: lesson16_4.id, question: "Un rapport d'inertie trop élevé provoque ?", options: JSON.stringify(["Meilleure précision", "Instabilité et mauvaises performances", "Économie d'énergie", "Aucun effet"]), correctIndex: 1, explanation: "Un rapport d'inertie trop élevé dégrade les performances dynamiques et la stabilité.", order: 4 },
      { lessonId: lesson16_4.id, question: "Que faut-il calculer en premier ?", options: JSON.stringify(["Le couple moteur", "L'inertie totale", "La vitesse max", "Le prix"]), correctIndex: 1, explanation: "L'inertie totale (charge + transmission + moteur) est le point de départ du dimensionnement.", order: 5 },
      // Quiz Module 16 - Lesson 5 (Drivers)
      { lessonId: lesson16_5.id, question: "Quels signaux pour un driver pas à pas ?", options: JSON.stringify(["U, V, W", "Step, Dir, Enable", "0-10V", "CAN bus"]), correctIndex: 1, explanation: "Un driver pas à pas reçoit des impulsions (Step), la direction (Dir) et l'activation (Enable).", order: 1 },
      { lessonId: lesson16_5.id, question: "Qu'est-ce que l'auto-tuning d'un servo-variateur ?", options: JSON.stringify(["Réglage radio", "Identification et réglage automatique des gains", "Mise à jour firmware", "Configuration IP"]), correctIndex: 1, explanation: "L'auto-tuning identifie le système et règle automatiquement les gains des boucles.", order: 2 },
      { lessonId: lesson16_5.id, question: "Jusqu'à combien de micro-pas peut-on diviser ?", options: JSON.stringify(["1/2", "1/16", "1/256", "Illimité"]), correctIndex: 2, explanation: "Certains drivers permettent jusqu'à 1/256 micro-pas, soit 51200 pas/tour.", order: 3 },
      { lessonId: lesson16_5.id, question: "Quelle fonction de sécurité est standard dans les servo-variateurs ?", options: JSON.stringify(["Aucune", "STO (Safe Torque Off)", "Arrêt d'urgence complet", "Protection incendie"]), correctIndex: 1, explanation: "La fonction STO est standard dans les servo-variateurs modernes.", order: 4 },
      { lessonId: lesson16_5.id, question: "Que règle-t-on principalement sur un driver pas à pas ?", options: JSON.stringify(["Les gains PID", "Le courant et le micro-stepping", "La température", "La communication"]), correctIndex: 1, explanation: "Le courant (selon le moteur) et le niveau de micro-stepping sont les réglages principaux.", order: 5 },
      // Quiz Module 16 - Lesson 6 (Moteurs linéaires)
      { lessonId: lesson16_6.id, question: "Quel avantage principal du moteur linéaire ?", options: JSON.stringify(["Coût réduit", "Pas de transmission = pas de jeu mécanique", "Simplicité", "Faible puissance"]), correctIndex: 1, explanation: "L'entraînement direct élimine tous les jeux mécaniques des transmissions.", order: 1 },
      { lessonId: lesson16_6.id, question: "Quelle vitesse peut atteindre un moteur linéaire ?", options: JSON.stringify(["1 m/s max", "Jusqu'à 10 m/s et plus", "100 m/s", "Identique aux rotatifs"]), correctIndex: 1, explanation: "Les moteurs linéaires peuvent atteindre plus de 10 m/s.", order: 2 },
      { lessonId: lesson16_6.id, question: "Quel type de moteur linéaire n'a pas d'ondulation de force ?", options: JSON.stringify(["Ironcore", "Ironless", "Tubulaire", "Hybride"]), correctIndex: 1, explanation: "Les moteurs ironless (sans fer) n'ont pas d'ondulation de force (cogging).", order: 3 },
      { lessonId: lesson16_6.id, question: "Quelle précaution avec les moteurs linéaires ?", options: JSON.stringify(["Éviter l'eau", "Attention aux champs magnétiques forts", "Ne pas dépasser 1 m/s", "Lubrification constante"]), correctIndex: 1, explanation: "Les aimants puissants peuvent attirer des objets métalliques et perturber des équipements.", order: 4 },
      { lessonId: lesson16_6.id, question: "Où utilise-t-on les moteurs linéaires tubulaires ?", options: JSON.stringify(["Grandes courses", "Applications compactes avec guidage intégré", "Haute vitesse", "Fort couple"]), correctIndex: 1, explanation: "Les moteurs tubulaires sont compacts et intègrent souvent leur guidage.", order: 5 },
      // Quiz Module 17 - Lesson 1 (Profils)
      { lessonId: lesson17_1.id, question: "Quel profil est le plus doux mécaniquement ?", options: JSON.stringify(["Trapézoïdal", "En S", "Carré", "Linéaire"]), correctIndex: 1, explanation: "Le profil en S limite le jerk (variation d'accélération) pour un mouvement plus doux.", order: 1 },
      { lessonId: lesson17_1.id, question: "Qu'est-ce que le jerk ?", options: JSON.stringify(["La vitesse", "L'accélération", "La variation d'accélération", "La position"]), correctIndex: 2, explanation: "Le jerk est la dérivée de l'accélération, exprimé en mm/s³ ou m/s³.", order: 2 },
      { lessonId: lesson17_1.id, question: "Quel profil est le plus simple à calculer ?", options: JSON.stringify(["En S", "Sinusoïdal", "Trapézoïdal", "Polynomial"]), correctIndex: 2, explanation: "Le profil trapézoïdal avec accélération constante est le plus simple.", order: 3 },
      { lessonId: lesson17_1.id, question: "Pourquoi limiter le jerk ?", options: JSON.stringify(["Économie d'énergie", "Réduire les vibrations et l'usure", "Augmenter la vitesse", "Simplifier le calcul"]), correctIndex: 1, explanation: "Un jerk limité réduit les chocs mécaniques, les vibrations et l'usure.", order: 4 },
      { lessonId: lesson17_1.id, question: "Quels paramètres définissent un profil trapézoïdal ?", options: JSON.stringify(["Position uniquement", "Position, vitesse, accélération", "Vitesse uniquement", "Jerk uniquement"]), correctIndex: 1, explanation: "Position cible, vitesse de croisière et accélération définissent le trapèze.", order: 5 },
      // Quiz Module 17 - Lesson 2 (Absolu/Relatif)
      { lessonId: lesson17_2.id, question: "Un mouvement absolu de 100mm depuis la position 50mm amène à ?", options: JSON.stringify(["50mm", "100mm", "150mm", "0mm"]), correctIndex: 1, explanation: "Un mouvement absolu va à la position spécifiée : 100mm.", order: 1 },
      { lessonId: lesson17_2.id, question: "Un mouvement relatif de 100mm depuis la position 50mm amène à ?", options: JSON.stringify(["50mm", "100mm", "150mm", "0mm"]), correctIndex: 2, explanation: "Un mouvement relatif ajoute le déplacement à la position actuelle : 50+100=150mm.", order: 2 },
      { lessonId: lesson17_2.id, question: "Quelle instruction PLCopen pour un mouvement absolu ?", options: JSON.stringify(["MC_MoveRelative", "MC_MoveAbsolute", "MC_MoveVelocity", "MC_Home"]), correctIndex: 1, explanation: "MC_MoveAbsolute effectue un mouvement vers une position absolue.", order: 3 },
      { lessonId: lesson17_2.id, question: "MC_MoveVelocity fait quoi ?", options: JSON.stringify(["Mouvement à position", "Mouvement à vitesse constante sans position cible", "Prise d'origine", "Arrêt"]), correctIndex: 1, explanation: "MC_MoveVelocity maintient une vitesse constante sans destination précise.", order: 4 },
      { lessonId: lesson17_2.id, question: "Quel type de mouvement pour un convoyeur continu ?", options: JSON.stringify(["Absolu", "Relatif", "Vitesse (velocity)", "Homing"]), correctIndex: 2, explanation: "Un convoyeur tourne à vitesse constante sans position cible, donc mode velocity.", order: 5 },
      // Quiz Module 17 - Lesson 3 (Synchronisation)
      { lessonId: lesson17_3.id, question: "Qu'est-ce qu'un engrenage électronique ?", options: JSON.stringify(["Un réducteur", "Un rapport de transmission virtuel entre axes", "Un codeur", "Un type de moteur"]), correctIndex: 1, explanation: "L'engrenage électronique lie deux axes avec un rapport de vitesse fixe.", order: 1 },
      { lessonId: lesson17_3.id, question: "La came électronique permet ?", options: JSON.stringify(["Un rapport fixe", "Un profil de synchronisation personnalisé", "Plus de vitesse", "Moins de consommation"]), correctIndex: 1, explanation: "La came électronique définit un profil position/position personnalisé entre axes.", order: 2 },
      { lessonId: lesson17_3.id, question: "Pour une découpe à la volée, quel type de synchro ?", options: JSON.stringify(["Gearing simple", "Camming", "Aucune", "Mode velocity"]), correctIndex: 1, explanation: "La découpe à la volée nécessite un profil de came pour synchroniser avec le produit.", order: 3 },
      { lessonId: lesson17_3.id, question: "Qu'est-ce que la rampe d'embrayage ?", options: JSON.stringify(["Freinage d'urgence", "Accouplement progressif au maître", "Accélération maximum", "Type de moteur"]), correctIndex: 1, explanation: "La rampe d'embrayage permet un accouplement progressif de l'esclave au maître.", order: 4 },
      { lessonId: lesson17_3.id, question: "Dans un système maître-esclave, qui définit le mouvement ?", options: JSON.stringify(["L'esclave", "Le maître", "Les deux également", "L'automate uniquement"]), correctIndex: 1, explanation: "Le maître définit le mouvement, l'esclave le suit selon la relation définie.", order: 5 },
      // Quiz Module 17 - Lesson 4 (Interpolation)
      { lessonId: lesson17_4.id, question: "L'interpolation linéaire produit ?", options: JSON.stringify(["Un arc de cercle", "Une ligne droite", "Une spirale", "Un point"]), correctIndex: 1, explanation: "L'interpolation linéaire coordonne les axes pour une trajectoire en ligne droite.", order: 1 },
      { lessonId: lesson17_4.id, question: "Quel code G pour un arc horaire ?", options: JSON.stringify(["G00", "G01", "G02", "G03"]), correctIndex: 2, explanation: "G02 commande un arc de cercle dans le sens horaire.", order: 2 },
      { lessonId: lesson17_4.id, question: "Qu'est-ce qu'une interpolation hélicoïdale ?", options: JSON.stringify(["Un cercle", "Un cercle + mouvement linéaire", "Une ligne", "Un point"]), correctIndex: 1, explanation: "L'hélice combine un mouvement circulaire dans un plan avec un mouvement linéaire perpendiculaire.", order: 3 },
      { lessonId: lesson17_4.id, question: "Pourquoi contrôler la vitesse résultante ?", options: JSON.stringify(["Pour le bruit", "Pour ne pas dépasser les limites des axes individuels", "Pour économiser", "Ce n'est pas nécessaire"]), correctIndex: 1, explanation: "La vitesse sur la trajectoire doit respecter les capacités de chaque axe.", order: 4 },
      { lessonId: lesson17_4.id, question: "Pour des courbes complexes, quel type d'interpolation ?", options: JSON.stringify(["Linéaire", "Circulaire", "Spline", "Aucune"]), correctIndex: 2, explanation: "Les splines permettent des courbes complexes avec continuité de courbure.", order: 5 },
      // Quiz Module 17 - Lesson 5 (PLCopen)
      { lessonId: lesson17_5.id, question: "Que fait MC_Power ?", options: JSON.stringify(["Coupe l'alimentation", "Active/désactive l'axe", "Fait un mouvement", "Reset les défauts"]), correctIndex: 1, explanation: "MC_Power active ou désactive le contrôle de l'axe.", order: 1 },
      { lessonId: lesson17_5.id, question: "Quelle sortie indique la fin du mouvement ?", options: JSON.stringify(["Busy", "Done", "Error", "Active"]), correctIndex: 1, explanation: "La sortie Done passe à TRUE quand le mouvement est terminé.", order: 2 },
      { lessonId: lesson17_5.id, question: "Que signifie Busy = TRUE ?", options: JSON.stringify(["Erreur", "Mouvement en cours", "Terminé", "En attente"]), correctIndex: 1, explanation: "Busy à TRUE indique que le bloc est en train d'exécuter son mouvement.", order: 3 },
      { lessonId: lesson17_5.id, question: "Quel avantage de la norme PLCopen ?", options: JSON.stringify(["Code plus rapide", "Portabilité entre fabricants", "Moins cher", "Plus de puissance"]), correctIndex: 1, explanation: "Les blocs PLCopen standardisés facilitent la migration entre différents automates.", order: 4 },
      { lessonId: lesson17_5.id, question: "MC_Reset sert à ?", options: JSON.stringify(["Réinitialiser la position", "Acquitter les défauts", "Arrêter le mouvement", "Calibrer le codeur"]), correctIndex: 1, explanation: "MC_Reset acquitte les erreurs de l'axe pour permettre de nouveaux mouvements.", order: 5 },
      // Quiz Module 17 - Lesson 6 (Diagnostic)
      { lessonId: lesson17_6.id, question: "Qu'est-ce que l'erreur de poursuite ?", options: JSON.stringify(["Erreur de communication", "Écart entre position commandée et réelle", "Défaut moteur", "Erreur de programme"]), correctIndex: 1, explanation: "L'erreur de poursuite (following error) est l'écart entre consigne et position réelle.", order: 1 },
      { lessonId: lesson17_6.id, question: "Que permet l'analyse FFT ?", options: JSON.stringify(["Mesurer la vitesse", "Détecter les fréquences de vibration", "Calculer le couple", "Programmer le mouvement"]), correctIndex: 1, explanation: "La FFT (Fast Fourier Transform) identifie les fréquences de vibration problématiques.", order: 2 },
      { lessonId: lesson17_6.id, question: "Une erreur de poursuite croissante indique ?", options: JSON.stringify(["Fonctionnement normal", "Problème de réglage ou mécanique", "Vitesse trop basse", "Rien de particulier"]), correctIndex: 1, explanation: "Une erreur croissante signale un problème de gains, friction ou charge excessive.", order: 3 },
      { lessonId: lesson17_6.id, question: "Comment réduire les vibrations ?", options: JSON.stringify(["Augmenter les gains", "Ajuster les gains et vérifier la mécanique", "Augmenter la vitesse", "Ignorer"]), correctIndex: 1, explanation: "Les vibrations peuvent être dues à des gains trop élevés ou des problèmes mécaniques.", order: 4 },
      { lessonId: lesson17_6.id, question: "À quoi sert l'oscilloscope intégré ?", options: JSON.stringify(["Mesurer la tension secteur", "Visualiser les signaux en temps réel", "Programmer", "Communiquer"]), correctIndex: 1, explanation: "L'oscilloscope intégré permet de visualiser courant, vitesse, position en temps réel.", order: 5 },
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
      // Try regular translations first, then CNC, then Siemens, then VFD translations
      const trans = lessonTranslations[lang][lesson.title as keyof typeof lessonTranslations['en']]
        || cncLessonTranslations[lang][lesson.title as keyof typeof cncLessonTranslations['en']]
        || siemensLessonTranslations[lang][lesson.title as keyof typeof siemensLessonTranslations['en']]
        || vfdLessonTranslations[lang][lesson.title as keyof typeof vfdLessonTranslations['en']]
      if (trans) {
        await prisma.lessonTranslation.create({
          data: {
            lessonId: lesson.id,
            language: lang,
            title: trans.title,
            description: trans.description,
            content: trans.content || lesson.content // Use original content if translation not provided
          }
        })
      }
    }
  }

  // Create Quiz Translations
  const allQuizzes = await prisma.quiz.findMany()
  for (const quiz of allQuizzes) {
    for (const lang of ['en', 'es'] as const) {
      // Try regular translations first, then CNC, then Siemens, then VFD translations
      const trans = quizTranslations[lang][quiz.question as keyof typeof quizTranslations['en']]
        || cncQuizTranslations[lang][quiz.question as keyof typeof cncQuizTranslations['en']]
        || siemensQuizTranslations[lang][quiz.question as keyof typeof siemensQuizTranslations['en']]
        || vfdQuizTranslations[lang][quiz.question as keyof typeof vfdQuizTranslations['en']]
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
