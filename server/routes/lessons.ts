import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get lesson content
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: true,
        quizzes: {
          orderBy: { order: 'asc' },
        },
        progress: {
          where: { userId: req.userId },
        },
      },
    })

    if (!lesson) {
      return res.status(404).json({ error: 'Leçon non trouvée' })
    }

    // Check if module is unlocked
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { totalXp: true },
    })

    if (lesson.module.isLocked && (user?.totalXp || 0) < lesson.module.requiredXp) {
      return res.status(403).json({ error: 'Module verrouillé' })
    }

    // Parse content
    const content = JSON.parse(lesson.content)

    // Format quizzes (hide correct answer)
    const quizzes = lesson.quizzes.map((quiz) => ({
      id: quiz.id,
      question: quiz.question,
      options: JSON.parse(quiz.options),
      order: quiz.order,
    }))

    res.json({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      content,
      xpReward: lesson.xpReward,
      duration: lesson.duration,
      quizzes,
      completed: lesson.progress.some((p) => p.completed),
      score: lesson.progress[0]?.score || null,
      module: {
        id: lesson.module.id,
        title: lesson.module.title,
      },
    })
  } catch (error) {
    console.error('Get lesson error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Submit quiz answers
router.post('/:id/submit', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params
    const { answers, timeSpent } = req.body

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        quizzes: true,
      },
    })

    if (!lesson) {
      return res.status(404).json({ error: 'Leçon non trouvée' })
    }

    // Calculate score
    let correctCount = 0
    const results: { quizId: string; isCorrect: boolean; correctIndex: number; explanation: string | null }[] = []

    for (const quiz of lesson.quizzes) {
      const userAnswer = answers[quiz.id]
      const isCorrect = userAnswer === quiz.correctIndex
      if (isCorrect) correctCount++

      results.push({
        quizId: quiz.id,
        isCorrect,
        correctIndex: quiz.correctIndex,
        explanation: quiz.explanation,
      })

      // Record quiz attempt
      await prisma.quizAttempt.create({
        data: {
          userId: req.userId!,
          quizId: quiz.id,
          answer: userAnswer ?? -1,
          isCorrect,
        },
      })
    }

    const score = lesson.quizzes.length > 0 ? Math.round((correctCount / lesson.quizzes.length) * 100) : 100

    // Update or create progress
    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: req.userId!,
          lessonId: id,
        },
      },
    })

    let xpEarned = 0
    const isNewCompletion = !existingProgress?.completed

    if (isNewCompletion) {
      // Calculate XP based on score
      xpEarned = Math.round(lesson.xpReward * (score / 100))

      // Update user XP and level
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      })

      if (user) {
        const newTotalXp = user.totalXp + xpEarned
        const newLevel = calculateLevel(newTotalXp)

        await prisma.user.update({
          where: { id: req.userId },
          data: {
            totalXp: newTotalXp,
            level: newLevel,
          },
        })
      }
    }

    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: req.userId!,
          lessonId: id,
        },
      },
      update: {
        completed: true,
        score: existingProgress?.score ? Math.max(existingProgress.score, score) : score,
        timeSpent: (existingProgress?.timeSpent || 0) + (timeSpent || 0),
        completedAt: new Date(),
      },
      create: {
        userId: req.userId!,
        lessonId: id,
        completed: true,
        score,
        timeSpent: timeSpent || 0,
        completedAt: new Date(),
      },
    })

    // Check for new rewards
    const newRewards = await checkAndAwardRewards(prisma, req.userId!)

    res.json({
      score,
      correctCount,
      totalQuestions: lesson.quizzes.length,
      xpEarned,
      results,
      newRewards,
    })
  } catch (error) {
    console.error('Submit lesson error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

function calculateLevel(xp: number): number {
  // XP needed for each level: 100, 200, 300, 400...
  // Total XP for level n = 50 * n * (n + 1)
  let level = 1
  let xpNeeded = 100
  let totalXp = 0

  while (totalXp + xpNeeded <= xp) {
    totalXp += xpNeeded
    level++
    xpNeeded = level * 100
  }

  return level
}

async function checkAndAwardRewards(prisma: PrismaClient, userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      progress: { where: { completed: true } },
      rewards: true,
      quizAttempts: true,
    },
  })

  if (!user) return []

  const allRewards = await prisma.reward.findMany()
  const earnedRewardIds = user.rewards.map((r) => r.rewardId)
  const newRewards: { id: string; name: string; icon: string; xpBonus: number }[] = []

  for (const reward of allRewards) {
    if (earnedRewardIds.includes(reward.id)) continue

    const condition = JSON.parse(reward.condition)
    let earned = false

    switch (condition.type) {
      case 'lessons_completed':
        earned = user.progress.length >= condition.count
        break
      case 'streak':
        earned = user.streak >= condition.count
        break
      case 'level':
        earned = user.level >= condition.level
        break
      case 'perfect_quiz':
        // Check if user has any 100% quiz scores
        const perfectLessons = user.progress.filter((p) => p.score === 100)
        earned = perfectLessons.length >= condition.count
        break
      case 'module_completed':
        // Check if all lessons in the module are completed
        const moduleProgress = await prisma.lesson.findMany({
          where: {
            module: { order: condition.moduleOrder },
          },
          include: {
            progress: { where: { userId, completed: true } },
          },
        })
        earned = moduleProgress.length > 0 && moduleProgress.every((l) => l.progress.length > 0)
        break
    }

    if (earned) {
      await prisma.userReward.create({
        data: {
          userId,
          rewardId: reward.id,
        },
      })

      // Award bonus XP
      if (reward.xpBonus > 0) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalXp: { increment: reward.xpBonus },
          },
        })
      }

      newRewards.push({
        id: reward.id,
        name: reward.name,
        icon: reward.icon,
        xpBonus: reward.xpBonus,
      })
    }
  }

  return newRewards
}

export default router
