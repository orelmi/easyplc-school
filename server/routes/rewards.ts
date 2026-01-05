import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get all rewards with user's earned status
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const lang = (req.query.lang as string) || 'fr'

    const allRewards = await prisma.reward.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        translations: {
          where: { language: lang }
        }
      }
    })

    const userRewards = await prisma.userReward.findMany({
      where: { userId: req.userId },
    })

    const earnedRewardIds = userRewards.map((ur) => ur.rewardId)
    const earnedDates = Object.fromEntries(userRewards.map((ur) => [ur.rewardId, ur.earnedAt]))

    const rewards = allRewards.map((reward) => {
      const translation = (reward as any).translations?.[0]
      return {
        id: reward.id,
        name: translation?.name || reward.name,
        description: translation?.description || reward.description,
        icon: reward.icon,
        type: reward.type,
        xpBonus: reward.xpBonus,
        earned: earnedRewardIds.includes(reward.id),
        earnedAt: earnedDates[reward.id] || null,
      }
    })

    // Separate by type
    const badges = rewards.filter((r) => r.type === 'badge')
    const trophies = rewards.filter((r) => r.type === 'trophy')
    const certificates = rewards.filter((r) => r.type === 'certificate')

    res.json({
      summary: {
        total: rewards.length,
        earned: earnedRewardIds.length,
        percentage: Math.round((earnedRewardIds.length / rewards.length) * 100),
      },
      badges,
      trophies,
      certificates,
    })
  } catch (error) {
    console.error('Get rewards error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
