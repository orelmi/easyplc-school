import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get all modules with progress
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma

    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          include: {
            progress: {
              where: { userId: req.userId },
            },
          },
        },
      },
    })

    // Get user XP
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { totalXp: true },
    })

    const modulesWithProgress = modules.map((module) => {
      const completedLessons = module.lessons.filter((lesson) =>
        lesson.progress.some((p) => p.completed)
      ).length
      const totalLessons = module.lessons.length
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      // Check if module is unlocked based on user XP
      const isUnlocked = !module.isLocked || (user?.totalXp || 0) >= module.requiredXp

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        order: module.order,
        icon: module.icon,
        color: module.color,
        isLocked: !isUnlocked,
        requiredXp: module.requiredXp,
        lessonsCount: totalLessons,
        completedLessons,
        progress,
      }
    })

    res.json(modulesWithProgress)
  } catch (error) {
    console.error('Get modules error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Get single module with lessons
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          include: {
            progress: {
              where: { userId: req.userId },
            },
            quizzes: true,
          },
        },
      },
    })

    if (!module) {
      return res.status(404).json({ error: 'Module non trouvé' })
    }

    // Check if user has enough XP
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { totalXp: true },
    })

    if (module.isLocked && (user?.totalXp || 0) < module.requiredXp) {
      return res.status(403).json({ error: 'Module verrouillé', requiredXp: module.requiredXp })
    }

    const lessonsWithProgress = module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      order: lesson.order,
      xpReward: lesson.xpReward,
      duration: lesson.duration,
      quizCount: lesson.quizzes.length,
      completed: lesson.progress.some((p) => p.completed),
      score: lesson.progress[0]?.score || null,
    }))

    res.json({
      ...module,
      lessons: lessonsWithProgress,
    })
  } catch (error) {
    console.error('Get module error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
