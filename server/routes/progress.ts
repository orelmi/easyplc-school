import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get user progress summary
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const lang = (req.query.lang as string) || 'fr'

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        totalXp: true,
        level: true,
        streak: true,
      },
    })

    const progress = await prisma.lessonProgress.findMany({
      where: { userId: req.userId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                translations: {
                  where: { language: lang }
                }
              }
            },
            translations: {
              where: { language: lang }
            }
          },
        },
      },
    })

    const completedLessons = progress.filter((p) => p.completed)
    const totalLessons = await prisma.lesson.count()

    // Get module progress
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        lessons: true,
        translations: {
          where: { language: lang }
        }
      },
    })

    const moduleProgress = modules.map((module) => {
      const moduleLessonIds = module.lessons.map((l) => l.id)
      const completed = completedLessons.filter((p) => moduleLessonIds.includes(p.lessonId)).length
      const moduleTrans = (module as any).translations?.[0]
      return {
        moduleId: module.id,
        title: moduleTrans?.title || module.title,
        icon: module.icon,
        completed,
        total: module.lessons.length,
        percentage: module.lessons.length > 0 ? Math.round((completed / module.lessons.length) * 100) : 0,
      }
    })

    // Calculate XP needed for next level
    const currentLevel = user?.level || 1
    const xpForCurrentLevel = 50 * currentLevel * (currentLevel - 1)
    const xpForNextLevel = 50 * currentLevel * (currentLevel + 1)
    const xpProgress = ((user?.totalXp || 0) - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)

    res.json({
      user: {
        ...user,
        xpForNextLevel: xpForNextLevel - (user?.totalXp || 0),
        xpProgress: Math.round(xpProgress * 100),
      },
      overview: {
        completedLessons: completedLessons.length,
        totalLessons,
        percentage: totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0,
      },
      moduleProgress,
      recentActivity: completedLessons
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
        .slice(0, 5)
        .map((p) => {
          const lessonTrans = (p.lesson as any).translations?.[0]
          const moduleTrans = (p.lesson.module as any).translations?.[0]
          return {
            lessonId: p.lessonId,
            lessonTitle: lessonTrans?.title || p.lesson.title,
            moduleTitle: moduleTrans?.title || p.lesson.module.title,
            score: p.score,
            completedAt: p.completedAt,
          }
        }),
    })
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
