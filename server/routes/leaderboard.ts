import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get leaderboard
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { period = 'all' } = req.query

    let dateFilter = {}
    const now = new Date()

    if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      dateFilter = { lastActivity: { gte: weekAgo } }
    } else if (period === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      dateFilter = { lastActivity: { gte: monthAgo } }
    }

    const users = await prisma.user.findMany({
      where: dateFilter,
      orderBy: { totalXp: 'desc' },
      take: 100,
      select: {
        id: true,
        username: true,
        avatar: true,
        totalXp: true,
        level: true,
        streak: true,
        _count: {
          select: {
            progress: { where: { completed: true } },
            rewards: true,
          },
        },
      },
    })

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      totalXp: user.totalXp,
      level: user.level,
      streak: user.streak,
      completedLessons: user._count.progress,
      rewardsCount: user._count.rewards,
      isCurrentUser: user.id === req.userId,
    }))

    // Find current user's rank if not in top 100
    const currentUserRank = leaderboard.find((u) => u.isCurrentUser)
    let currentUserData = null

    if (!currentUserRank) {
      const currentUser = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          username: true,
          avatar: true,
          totalXp: true,
          level: true,
          streak: true,
          _count: {
            select: {
              progress: { where: { completed: true } },
              rewards: true,
            },
          },
        },
      })

      if (currentUser) {
        const rank = await prisma.user.count({
          where: {
            totalXp: { gt: currentUser.totalXp },
            ...dateFilter,
          },
        })

        currentUserData = {
          rank: rank + 1,
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
          totalXp: currentUser.totalXp,
          level: currentUser.level,
          streak: currentUser.streak,
          completedLessons: currentUser._count.progress,
          rewardsCount: currentUser._count.rewards,
          isCurrentUser: true,
        }
      }
    }

    res.json({
      leaderboard,
      currentUser: currentUserRank || currentUserData,
      totalUsers: await prisma.user.count(dateFilter ? { where: dateFilter } : undefined),
    })
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
