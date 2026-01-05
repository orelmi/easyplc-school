import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { allModules } from './modules/index.js'

const prisma = new PrismaClient()

// Module configurations (icons, colors, xp requirements)
const moduleConfigs = [
  { order: 1, icon: "🔌", color: "#3b82f6", isLocked: false, requiredXp: 0 },
  { order: 2, icon: "🔀", color: "#22c55e", isLocked: true, requiredXp: 200 },
  { order: 3, icon: "🪜", color: "#f59e0b", isLocked: true, requiredXp: 500 },
  { order: 4, icon: "📡", color: "#ef4444", isLocked: true, requiredXp: 900 },
  { order: 5, icon: "📊", color: "#8b5cf6", isLocked: true, requiredXp: 1400 },
  { order: 6, icon: "⚙️", color: "#06b6d4", isLocked: false, requiredXp: 0 },
  { order: 7, icon: "📝", color: "#ec4899", isLocked: true, requiredXp: 300 },
  { order: 8, icon: "📐", color: "#14b8a6", isLocked: true, requiredXp: 700 },
  { order: 9, icon: "🔧", color: "#0ea5e9", isLocked: false, requiredXp: 0 },
  { order: 10, icon: "💻", color: "#6366f1", isLocked: true, requiredXp: 400 },
  { order: 11, icon: "🗃️", color: "#a855f7", isLocked: true, requiredXp: 900 },
  { order: 12, icon: "⚡", color: "#f97316", isLocked: false, requiredXp: 0 },
  { order: 13, icon: "🎛️", color: "#84cc16", isLocked: true, requiredXp: 350 },
  { order: 14, icon: "📶", color: "#06b6d4", isLocked: true, requiredXp: 750 },
  { order: 15, icon: "🎯", color: "#f43f5e", isLocked: false, requiredXp: 0 },
  { order: 16, icon: "🔄", color: "#8b5cf6", isLocked: true, requiredXp: 400 },
  { order: 17, icon: "📈", color: "#10b981", isLocked: true, requiredXp: 850 },
]

// Cursus definitions
const cursusData = [
  {
    order: 1,
    title: "Automatisme industriel",
    description: "Parcours complet pour l'automatisme industriel et la programmation d'automates",
    icon: "🏭",
    color: "#3b82f6",
    translations: {
      en: { title: "Industrial Automation", description: "Complete learning path for industrial automation and PLC programming" },
      es: { title: "Automatización Industrial", description: "Ruta de aprendizaje completa para automatización industrial y programación de PLCs" }
    },
    moduleOrders: [1, 2, 3, 4, 5]
  },
  {
    order: 2,
    title: "Usinage CNC",
    description: "Apprenez à programmer et opérer les machines CNC",
    icon: "🔧",
    color: "#06b6d4",
    translations: {
      en: { title: "CNC Machining", description: "Learn to program and operate CNC machines" },
      es: { title: "Mecanizado CNC", description: "Aprenda a programar y operar máquinas CNC" }
    },
    moduleOrders: [1, 6, 7, 8]
  },
  {
    order: 3,
    title: "Automatisme Siemens",
    description: "Parcours spécialisé pour les automates Siemens S7-1500 et TIA Portal",
    icon: "🔷",
    color: "#0ea5e9",
    translations: {
      en: { title: "Siemens Automation", description: "Specialized path for Siemens S7-1500 PLCs and TIA Portal" },
      es: { title: "Automatización Siemens", description: "Ruta especializada para PLCs Siemens S7-1500 y TIA Portal" }
    },
    moduleOrders: [1, 9, 10, 11]
  },
  {
    order: 4,
    title: "Variateurs et positionnement",
    description: "Maîtrisez les variateurs de vitesse et le contrôle de mouvement",
    icon: "⚡",
    color: "#f97316",
    translations: {
      en: { title: "Variable Speed Drives and Positioning", description: "Master variable frequency drives and motion control" },
      es: { title: "Variadores de Velocidad y Posicionamiento", description: "Domine los variadores de frecuencia y el control de movimiento" }
    },
    moduleOrders: [1, 12, 13, 14, 15, 16, 17]
  }
]

// Rewards
const rewardsData = [
  { name: "Premier pas", description: "Terminer votre première leçon", icon: "🎯", type: "lesson_count", condition: "1", xpBonus: 50, translations: { en: { name: "First Step", description: "Complete your first lesson" }, es: { name: "Primer Paso", description: "Completar tu primera lección" } } },
  { name: "Étudiant assidu", description: "Terminer 5 leçons", icon: "📚", type: "lesson_count", condition: "5", xpBonus: 100, translations: { en: { name: "Dedicated Student", description: "Complete 5 lessons" }, es: { name: "Estudiante Dedicado", description: "Completar 5 lecciones" } } },
  { name: "Expert en herbe", description: "Terminer 10 leçons", icon: "🌱", type: "lesson_count", condition: "10", xpBonus: 200, translations: { en: { name: "Budding Expert", description: "Complete 10 lessons" }, es: { name: "Experto en Ciernes", description: "Completar 10 lecciones" } } },
  { name: "Sans faute !", description: "Obtenir 100% à un quiz", icon: "✨", type: "perfect_quiz", condition: "1", xpBonus: 75, translations: { en: { name: "Perfect Score!", description: "Get 100% on a quiz" }, es: { name: "¡Puntuación Perfecta!", description: "Obtener 100% en un quiz" } } },
  { name: "Série de 3", description: "Se connecter 3 jours consécutifs", icon: "🔥", type: "streak", condition: "3", xpBonus: 50, translations: { en: { name: "3-Day Streak", description: "Log in 3 consecutive days" }, es: { name: "Racha de 3 Días", description: "Conectarse 3 días consecutivos" } } },
  { name: "Série de 7", description: "Se connecter 7 jours consécutifs", icon: "💪", type: "streak", condition: "7", xpBonus: 150, translations: { en: { name: "7-Day Streak", description: "Log in 7 consecutive days" }, es: { name: "Racha de 7 Días", description: "Conectarse 7 días consecutivos" } } },
  { name: "Maître logicien", description: "Terminer le module Logique combinatoire", icon: "🧠", type: "module_complete", condition: "2", xpBonus: 300, translations: { en: { name: "Logic Master", description: "Complete the Combinational Logic module" }, es: { name: "Maestro de la Lógica", description: "Completar el módulo de Lógica Combinacional" } } },
  { name: "Pro du LADDER", description: "Terminer le module LADDER", icon: "🪜", type: "module_complete", condition: "3", xpBonus: 300, translations: { en: { name: "LADDER Pro", description: "Complete the LADDER module" }, es: { name: "Profesional LADDER", description: "Completar el módulo LADDER" } } },
  { name: "Niveau 5", description: "Atteindre le niveau 5", icon: "⭐", type: "level", condition: "5", xpBonus: 100, translations: { en: { name: "Level 5", description: "Reach level 5" }, es: { name: "Nivel 5", description: "Alcanzar el nivel 5" } } },
  { name: "Niveau 10", description: "Atteindre le niveau 10", icon: "🏆", type: "level", condition: "10", xpBonus: 250, translations: { en: { name: "Level 10", description: "Reach level 10" }, es: { name: "Nivel 10", description: "Alcanzar el nivel 10" } } },
]

async function main() {
  console.log('🧹 Clearing existing data...')

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

  console.log('📦 Creating modules...')

  // Create all modules
  const createdModules: { id: string; order: number }[] = []
  const lessonIdMap: Map<string, string> = new Map() // Map "moduleOrder-lessonOrder" to lessonId

  for (let i = 0; i < allModules.length; i++) {
    const moduleData = allModules[i]
    const config = moduleConfigs[i]

    // Create module
    const module = await prisma.module.create({
      data: {
        title: moduleData.moduleTitle,
        description: moduleData.moduleDescription,
        order: moduleData.moduleOrder,
        icon: config.icon,
        color: config.color,
        isLocked: config.isLocked,
        requiredXp: config.requiredXp,
      },
    })

    createdModules.push({ id: module.id, order: module.order })

    // Create module translations
    for (const lang of ['en', 'es'] as const) {
      const trans = moduleData.moduleTranslations[lang]
      if (trans) {
        await prisma.moduleTranslation.create({
          data: {
            moduleId: module.id,
            language: lang,
            title: trans.title,
            description: trans.description,
          },
        })
      }
    }

    // Create lessons
    for (const lessonData of moduleData.lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          moduleId: module.id,
          title: lessonData.title,
          description: lessonData.description,
          order: lessonData.order,
          xpReward: lessonData.xpReward,
          duration: lessonData.duration,
          content: lessonData.content,
        },
      })

      lessonIdMap.set(`${moduleData.moduleOrder}-${lessonData.order}`, lesson.id)

      // Create lesson translations
      for (const lang of ['en', 'es'] as const) {
        const trans = moduleData.lessonTranslations[lang][lessonData.title]
        if (trans) {
          await prisma.lessonTranslation.create({
            data: {
              lessonId: lesson.id,
              language: lang,
              title: trans.title,
              description: trans.description,
              content: trans.content || lessonData.content,
            },
          })
        }
      }

      // Create quizzes for this lesson
      const lessonQuizzes = moduleData.quizzes[lessonData.order - 1] || []
      for (const quizData of lessonQuizzes) {
        const quiz = await prisma.quiz.create({
          data: {
            lessonId: lesson.id,
            question: quizData.question,
            options: JSON.stringify(quizData.options),
            correctIndex: quizData.correctIndex,
            explanation: quizData.explanation,
            order: quizData.order,
          },
        })

        // Create quiz translations
        for (const lang of ['en', 'es'] as const) {
          const trans = moduleData.quizTranslations[lang][quizData.question]
          if (trans) {
            await prisma.quizTranslation.create({
              data: {
                quizId: quiz.id,
                language: lang,
                question: trans.question,
                options: JSON.stringify(trans.options),
                explanation: trans.explanation,
              },
            })
          }
        }
      }
    }

    console.log(`  ✓ Module ${moduleData.moduleOrder}: ${moduleData.moduleTitle}`)
  }

  console.log('📚 Creating cursus...')

  // Create cursus
  for (const cursus of cursusData) {
    const createdCursus = await prisma.cursus.create({
      data: {
        title: cursus.title,
        description: cursus.description,
        order: cursus.order,
        icon: cursus.icon,
        color: cursus.color,
      },
    })

    // Create cursus translations
    for (const lang of ['en', 'es'] as const) {
      const trans = cursus.translations[lang]
      await prisma.cursusTranslation.create({
        data: {
          cursusId: createdCursus.id,
          language: lang,
          title: trans.title,
          description: trans.description,
        },
      })
    }

    // Link modules to cursus
    for (let i = 0; i < cursus.moduleOrders.length; i++) {
      const moduleOrder = cursus.moduleOrders[i]
      const module = createdModules.find(m => m.order === moduleOrder)
      if (module) {
        await prisma.cursusModule.create({
          data: {
            cursusId: createdCursus.id,
            moduleId: module.id,
            order: i + 1,
            isRequired: true,
          },
        })
      }
    }

    console.log(`  ✓ Cursus: ${cursus.title}`)
  }

  console.log('🏆 Creating rewards...')

  // Create rewards
  for (const reward of rewardsData) {
    const createdReward = await prisma.reward.create({
      data: {
        name: reward.name,
        description: reward.description,
        icon: reward.icon,
        xpBonus: reward.xpBonus,
        type: reward.type,
        condition: reward.condition,
      },
    })

    // Create reward translations
    for (const lang of ['en', 'es'] as const) {
      const trans = reward.translations[lang]
      await prisma.rewardTranslation.create({
        data: {
          rewardId: createdReward.id,
          language: lang,
          name: trans.name,
          description: trans.description,
        },
      })
    }
  }

  console.log('👤 Creating demo user...')

  // Create demo user
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
  const lesson1_1_id = lessonIdMap.get('1-1')
  const lesson1_2_id = lessonIdMap.get('1-2')
  const lesson1_3_id = lessonIdMap.get('1-3')

  if (lesson1_1_id && lesson1_2_id && lesson1_3_id) {
    await prisma.lessonProgress.createMany({
      data: [
        { userId: demoUser.id, lessonId: lesson1_1_id, completed: true, score: 100, timeSpent: 480, completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { userId: demoUser.id, lessonId: lesson1_2_id, completed: true, score: 85, timeSpent: 600, completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        { userId: demoUser.id, lessonId: lesson1_3_id, completed: true, score: 70, timeSpent: 720, completedAt: new Date() },
      ],
    })
  }

  // Give demo user some rewards
  const firstReward = await prisma.reward.findFirst({ where: { name: 'Premier pas' } })
  const perfectReward = await prisma.reward.findFirst({ where: { name: 'Sans faute !' } })
  const streakReward = await prisma.reward.findFirst({ where: { name: 'Série de 3' } })

  if (firstReward) {
    await prisma.userReward.create({ data: { userId: demoUser.id, rewardId: firstReward.id, earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) } })
  }
  if (perfectReward) {
    await prisma.userReward.create({ data: { userId: demoUser.id, rewardId: perfectReward.id, earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) } })
  }
  if (streakReward) {
    await prisma.userReward.create({ data: { userId: demoUser.id, rewardId: streakReward.id, earnedAt: new Date() } })
  }

  console.log('')
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
