import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get all cursus with progress
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const lang = (req.query.lang as string) || 'fr'

    const cursusList = await prisma.cursus.findMany({
      orderBy: { order: 'asc' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            module: {
              include: {
                lessons: {
                  include: {
                    progress: {
                      where: { userId: req.userId },
                    },
                  },
                },
                exercises: {
                  include: {
                    progress: {
                      where: { userId: req.userId },
                    },
                  },
                },
              },
            },
          },
        },
        translations: {
          where: { language: lang },
        },
      },
    })

    const cursusWithProgress = cursusList.map((cursus) => {
      // Calculate progress for this cursus
      let totalLessons = 0
      let completedLessons = 0
      let totalExercises = 0
      let completedExercises = 0

      cursus.modules.forEach((cm) => {
        totalLessons += cm.module.lessons.length
        completedLessons += cm.module.lessons.filter((lesson) =>
          lesson.progress.some((p) => p.completed)
        ).length
        totalExercises += cm.module.exercises.length
        completedExercises += cm.module.exercises.filter((exercise) =>
          exercise.progress.some((p) => p.completed)
        ).length
      })

      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      // Get translation if available
      const translation = cursus.translations?.[0]

      return {
        id: cursus.id,
        title: translation?.title || cursus.title,
        description: translation?.description || cursus.description,
        icon: cursus.icon,
        color: cursus.color,
        order: cursus.order,
        modulesCount: cursus.modules.length,
        lessonsCount: totalLessons,
        completedLessons,
        exercisesCount: totalExercises,
        completedExercises,
        progress,
      }
    })

    res.json(cursusWithProgress)
  } catch (error) {
    console.error('Get cursus error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Get single cursus with modules
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params
    const lang = (req.query.lang as string) || 'fr'

    const cursus = await prisma.cursus.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            module: {
              include: {
                lessons: {
                  orderBy: { order: 'asc' },
                  include: {
                    progress: {
                      where: { userId: req.userId },
                    },
                    translations: {
                      where: { language: lang },
                    },
                    quizzes: {
                      orderBy: { order: 'asc' },
                    },
                  },
                },
                exercises: {
                  orderBy: { order: 'asc' },
                  include: {
                    progress: {
                      where: { userId: req.userId },
                    },
                    translations: {
                      where: { language: lang },
                    },
                  },
                },
                translations: {
                  where: { language: lang },
                },
              },
            },
          },
        },
        translations: {
          where: { language: lang },
        },
      },
    })

    if (!cursus) {
      return res.status(404).json({ error: 'Cursus non trouvé' })
    }

    // Get user XP
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { totalXp: true },
    })

    const modulesWithProgress = cursus.modules.map((cm) => {
      const module = cm.module
      const completedLessons = module.lessons.filter((lesson) =>
        lesson.progress.some((p) => p.completed)
      ).length
      const totalLessons = module.lessons.length
      const completedExercises = module.exercises.filter((exercise) =>
        exercise.progress.some((p) => p.completed)
      ).length
      const totalExercises = module.exercises.length
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      // Check if module is unlocked based on user XP
      const isUnlocked = !module.isLocked || (user?.totalXp || 0) >= module.requiredXp

      // Get translated content if available
      const translation = module.translations?.[0]

      // Calculate total quizzes
      const totalQuizzes = module.lessons.reduce((sum, lesson) => sum + (lesson as any).quizzes.length, 0)

      // Include lesson preview (titles only for locked modules)
      const lessonsPreview = module.lessons.map((lesson) => {
        const lessonTrans = (lesson as any).translations?.[0]
        return {
          id: lesson.id,
          title: lessonTrans?.title || lesson.title,
          order: lesson.order,
          duration: lesson.duration,
          xpReward: lesson.xpReward,
          quizCount: (lesson as any).quizzes.length,
          completed: lesson.progress.some((p) => p.completed),
        }
      })

      // Include exercises preview
      const exercisesPreview = module.exercises.map((exercise) => {
        const exerciseTrans = (exercise as any).translations?.[0]
        return {
          id: exercise.id,
          title: exerciseTrans?.title || exercise.title,
          description: exerciseTrans?.description || exercise.description,
          type: exercise.type,
          difficulty: exercise.difficulty,
          order: exercise.order,
          xpReward: exercise.xpReward,
          completed: exercise.progress.some((p) => p.completed),
        }
      })

      return {
        id: module.id,
        title: translation?.title || module.title,
        description: translation?.description || module.description,
        order: cm.order,
        icon: module.icon,
        color: module.color,
        isLocked: !isUnlocked,
        requiredXp: module.requiredXp,
        isRequired: cm.isRequired,
        lessonsCount: totalLessons,
        completedLessons,
        exercisesCount: totalExercises,
        completedExercises,
        quizzesCount: totalQuizzes,
        progress,
        lessonsPreview,
        exercisesPreview,
      }
    })

    // Get translation if available
    const translation = cursus.translations?.[0]

    // Calculate overall progress
    let totalLessons = 0
    let completedLessons = 0
    let totalExercises = 0
    let completedExercises = 0
    let totalQuizzes = 0
    cursus.modules.forEach((cm) => {
      totalLessons += cm.module.lessons.length
      completedLessons += cm.module.lessons.filter((lesson) =>
        lesson.progress.some((p) => p.completed)
      ).length
      totalExercises += cm.module.exercises.length
      completedExercises += cm.module.exercises.filter((exercise) =>
        exercise.progress.some((p) => p.completed)
      ).length
      totalQuizzes += cm.module.lessons.reduce((sum, lesson) => sum + (lesson as any).quizzes.length, 0)
    })

    res.json({
      id: cursus.id,
      title: translation?.title || cursus.title,
      description: translation?.description || cursus.description,
      icon: cursus.icon,
      color: cursus.color,
      modules: modulesWithProgress,
      progress: {
        completed: completedLessons,
        total: totalLessons,
        percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      },
      exercises: {
        completed: completedExercises,
        total: totalExercises,
      },
      quizzes: {
        total: totalQuizzes,
      },
    })
  } catch (error) {
    console.error('Get cursus error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
