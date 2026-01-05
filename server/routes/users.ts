import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get user profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        totalXp: true,
        level: true,
        streak: true,
        createdAt: true,
        progress: {
          include: {
            lesson: {
              include: {
                module: true,
              },
            },
          },
        },
        rewards: {
          include: {
            reward: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Calculate stats
    const completedLessons = user.progress.filter((p) => p.completed).length
    const totalTimeSpent = user.progress.reduce((acc, p) => acc + p.timeSpent, 0)
    const averageScore =
      user.progress.filter((p) => p.score !== null).reduce((acc, p, _, arr) => acc + (p.score || 0) / arr.length, 0) || 0

    res.json({
      ...user,
      stats: {
        completedLessons,
        totalTimeSpent,
        averageScore: Math.round(averageScore),
        rewardsCount: user.rewards.length,
      },
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Update user profile
router.patch('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { username, avatar } = req.body

    const updateData: { username?: string; avatar?: string } = {}
    if (username) updateData.username = username
    if (avatar) updateData.avatar = avatar

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        totalXp: true,
        level: true,
        streak: true,
      },
    })

    res.json(user)
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour' })
  }
})

export default router
