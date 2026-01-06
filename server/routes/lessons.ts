import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Check if exercises are enabled
function isExercisesEnabled(req: AuthRequest): boolean {
  return req.app.locals.exercisesEnabled ?? true
}

// Get lesson content
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params
    const lang = (req.query.lang as string) || 'fr'

    const exercisesEnabled = isExercisesEnabled(req)

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            translations: {
              where: { language: lang }
            }
          }
        },
        quizzes: {
          orderBy: { order: 'asc' },
          include: {
            translations: {
              where: { language: lang }
            }
          }
        },
        exercises: exercisesEnabled ? {
          orderBy: { order: 'asc' },
          include: {
            translations: {
              where: { language: lang }
            }
          }
        } : false,
        progress: {
          where: { userId: req.userId },
        },
        translations: {
          where: { language: lang }
        }
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

    // Get translations
    const lessonTrans = (lesson as any).translations?.[0]
    const moduleTrans = (lesson.module as any).translations?.[0]

    // Parse content (use translated content if available)
    const content = JSON.parse(lessonTrans?.content || lesson.content)

    // Format quizzes (hide correct answer, use translations)
    const quizzes = lesson.quizzes.map((quiz) => {
      const quizTrans = (quiz as any).translations?.[0]
      return {
        id: quiz.id,
        question: quizTrans?.question || quiz.question,
        options: JSON.parse(quizTrans?.options || quiz.options),
        order: quiz.order,
      }
    })

    // Format exercises (hide solution, use translations)
    const exercises = exercisesEnabled && (lesson as any).exercises
      ? (lesson as any).exercises.map((exercise: any) => {
          const exerciseTrans = exercise.translations?.[0]
          return {
            id: exercise.id,
            type: exercise.type,
            title: exerciseTrans?.title || exercise.title,
            description: exerciseTrans?.description || exercise.description,
            config: JSON.parse(exerciseTrans?.config || exercise.config),
            hints: exercise.hints ? JSON.parse(exerciseTrans?.hints || exercise.hints) : null,
            order: exercise.order,
            xpReward: exercise.xpReward,
            // Note: solution is NOT included for security
          }
        })
      : []

    res.json({
      id: lesson.id,
      title: lessonTrans?.title || lesson.title,
      description: lessonTrans?.description || lesson.description,
      content,
      xpReward: lesson.xpReward,
      duration: lesson.duration,
      quizzes,
      exercises,
      exercisesEnabled,
      completed: lesson.progress.some((p) => p.completed),
      score: lesson.progress[0]?.score || null,
      module: {
        id: lesson.module.id,
        title: moduleTrans?.title || lesson.module.title,
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
    const lang = (req.query.lang as string) || 'fr'

    // Verify user still exists (in case DB was reseeded)
    const userExists = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true }
    })

    if (!userExists) {
      return res.status(401).json({ error: 'Session invalide, veuillez vous reconnecter' })
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        quizzes: {
          include: {
            translations: {
              where: { language: lang }
            }
          }
        },
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

      // Get translated explanation
      const quizTrans = (quiz as any).translations?.[0]

      results.push({
        quizId: quiz.id,
        isCorrect,
        correctIndex: quiz.correctIndex,
        explanation: quizTrans?.explanation || quiz.explanation,
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

// ==================== EXERCISE VALIDATION ====================

interface ExerciseAnswer {
  exerciseId: string
  answer: unknown
}

// Validate exercise answer and return score (0-100)
function validateExerciseAnswer(
  exercise: { type: string; config: string; solution: string },
  answer: unknown
): { isCorrect: boolean; score: number; feedback?: string; correctAnswer?: unknown } {
  const config = JSON.parse(exercise.config)
  const solution = JSON.parse(exercise.solution)

  switch (exercise.type) {
    case 'fill_blank': {
      const userAnswer = answer as { blanks: Record<string, string> }
      let correctCount = 0
      const totalBlanks = config.blanks.length

      for (const blank of config.blanks) {
        const userValue = userAnswer.blanks?.[blank.id]?.trim().toLowerCase() || ''
        const acceptedAnswers = (solution.answers[blank.id] as string)
          .split('|')
          .map((a: string) => a.trim().toLowerCase())

        if (acceptedAnswers.includes(userValue)) {
          correctCount++
        }
      }

      const score = Math.round((correctCount / totalBlanks) * 100)
      return {
        isCorrect: score === 100,
        score,
        correctAnswer: solution.answers,
      }
    }

    case 'ordering': {
      const userOrder = (answer as { order: string[] }).order || []
      const correctOrder = solution.correctOrder as string[]

      if (userOrder.length !== correctOrder.length) {
        return { isCorrect: false, score: 0, correctAnswer: correctOrder }
      }

      let correctPositions = 0
      for (let i = 0; i < userOrder.length; i++) {
        if (userOrder[i] === correctOrder[i]) {
          correctPositions++
        }
      }

      const score = Math.round((correctPositions / correctOrder.length) * 100)
      return {
        isCorrect: score === 100,
        score,
        correctAnswer: correctOrder,
      }
    }

    case 'matching': {
      const userPairs = (answer as { pairs: [string, string][] }).pairs || []
      const correctPairs = solution.pairs as [string, string][]

      let correctMatches = 0
      for (const [left, right] of userPairs) {
        if (correctPairs.some(([l, r]) => l === left && r === right)) {
          correctMatches++
        }
      }

      const score = Math.round((correctMatches / correctPairs.length) * 100)
      return {
        isCorrect: score === 100,
        score,
        correctAnswer: correctPairs,
      }
    }

    case 'code_input': {
      const userCode = (answer as { code: string }).code?.trim() || ''
      const acceptedPatterns = solution.acceptedPatterns as string[] | undefined
      const exactCode = solution.code as string

      // Check exact match first
      if (userCode === exactCode.trim()) {
        return { isCorrect: true, score: 100, correctAnswer: exactCode }
      }

      // Check regex patterns
      if (acceptedPatterns) {
        for (const pattern of acceptedPatterns) {
          if (new RegExp(pattern, 'i').test(userCode)) {
            return { isCorrect: true, score: 100, correctAnswer: exactCode }
          }
        }
      }

      return { isCorrect: false, score: 0, correctAnswer: exactCode }
    }

    case 'drag_drop': {
      const userPlacements = (answer as { placements: Record<string, string[]> }).placements || {}
      const correctPlacements = solution.placements as Record<string, string[]>

      let correctItems = 0
      let totalItems = 0

      for (const [zoneId, items] of Object.entries(correctPlacements)) {
        totalItems += items.length
        const userItems = userPlacements[zoneId] || []
        for (const item of items) {
          if (userItems.includes(item)) {
            correctItems++
          }
        }
      }

      const score = totalItems > 0 ? Math.round((correctItems / totalItems) * 100) : 100
      return {
        isCorrect: score === 100,
        score,
        correctAnswer: correctPlacements,
      }
    }

    case 'wiring': {
      const userConnections = (answer as { connections: [string, string][] }).connections || []
      const correctConnections = solution.connections as [string, string][]

      let correctWires = 0
      for (const [t1, t2] of userConnections) {
        // Check both directions
        if (
          correctConnections.some(
            ([c1, c2]) => (c1 === t1 && c2 === t2) || (c1 === t2 && c2 === t1)
          )
        ) {
          correctWires++
        }
      }

      const score = correctConnections.length > 0
        ? Math.round((correctWires / correctConnections.length) * 100)
        : 100
      return {
        isCorrect: score === 100 && userConnections.length === correctConnections.length,
        score,
        correctAnswer: correctConnections,
      }
    }

    case 'timing': {
      const userSignals = (answer as { signals: { signalId: string; transitions: { time: number; value: boolean }[] }[] }).signals || []
      const expectedSignals = solution.expectedSignals as { signalId: string; transitions: { time: number; value: boolean }[] }[]
      const tolerance = solution.tolerance || 100 // Default 100ms tolerance

      let totalTransitions = 0
      let correctTransitions = 0

      for (const expected of expectedSignals) {
        const userSignal = userSignals.find(s => s.signalId === expected.signalId)
        totalTransitions += expected.transitions.length

        if (userSignal) {
          for (const expectedTrans of expected.transitions) {
            const matchingTrans = userSignal.transitions.find(
              t => Math.abs(t.time - expectedTrans.time) <= tolerance && t.value === expectedTrans.value
            )
            if (matchingTrans) {
              correctTransitions++
            }
          }
        }
      }

      const score = totalTransitions > 0 ? Math.round((correctTransitions / totalTransitions) * 100) : 100
      return {
        isCorrect: score === 100,
        score,
        correctAnswer: expectedSignals,
      }
    }

    case 'ladder_builder':
    case 'plc_simulator': {
      // For complex exercises, we check against expected behavior
      const expectedBehavior = solution.expectedBehavior as { inputs: Record<string, boolean>; expectedOutputs: Record<string, boolean> }[]

      // Simplified validation - in real implementation, would run the program
      // For now, return partial credit based on structure
      return {
        isCorrect: false,
        score: 50, // Placeholder - real validation would be more complex
        feedback: 'Exercice soumis pour évaluation manuelle',
        correctAnswer: solution,
      }
    }

    default:
      return { isCorrect: false, score: 0, feedback: 'Type d\'exercice non reconnu' }
  }
}

// Submit exercise answers
router.post('/:id/submit-exercises', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params
    const { answers, timeSpent } = req.body as { answers: ExerciseAnswer[]; timeSpent: number }
    const lang = (req.query.lang as string) || 'fr'

    // Check if exercises are enabled
    if (!isExercisesEnabled(req)) {
      return res.status(403).json({ error: 'Les exercices pratiques sont désactivés' })
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    })

    if (!user) {
      return res.status(401).json({ error: 'Session invalide, veuillez vous reconnecter' })
    }

    // Get lesson with exercises
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        exercises: {
          include: {
            translations: {
              where: { language: lang }
            }
          }
        },
      },
    })

    if (!lesson) {
      return res.status(404).json({ error: 'Leçon non trouvée' })
    }

    if (!lesson.exercises || lesson.exercises.length === 0) {
      return res.status(400).json({ error: 'Cette leçon n\'a pas d\'exercices' })
    }

    // Validate each exercise answer
    const results: {
      exerciseId: string
      isCorrect: boolean
      score: number
      feedback?: string
      correctAnswer?: unknown
    }[] = []

    let totalScore = 0
    let totalXpEarned = 0

    for (const exerciseAnswer of answers) {
      const exercise = lesson.exercises.find(e => e.id === exerciseAnswer.exerciseId)

      if (!exercise) {
        results.push({
          exerciseId: exerciseAnswer.exerciseId,
          isCorrect: false,
          score: 0,
          feedback: 'Exercice non trouvé',
        })
        continue
      }

      const validation = validateExerciseAnswer(exercise, exerciseAnswer.answer)
      results.push({
        exerciseId: exercise.id,
        ...validation,
      })

      totalScore += validation.score

      // Calculate XP for this exercise
      const exerciseXp = Math.round(exercise.xpReward * (validation.score / 100))
      totalXpEarned += exerciseXp

      // Record exercise attempt
      await prisma.exerciseAttempt.create({
        data: {
          userId: req.userId!,
          exerciseId: exercise.id,
          answer: JSON.stringify(exerciseAnswer.answer),
          isCorrect: validation.isCorrect,
          score: validation.score,
          timeSpent: Math.round((timeSpent || 0) / lesson.exercises.length),
        },
      })
    }

    // Calculate average score
    const averageScore = lesson.exercises.length > 0
      ? Math.round(totalScore / lesson.exercises.length)
      : 100

    const correctCount = results.filter(r => r.isCorrect).length

    // Award XP to user
    if (totalXpEarned > 0) {
      const newTotalXp = user.totalXp + totalXpEarned
      const newLevel = calculateLevel(newTotalXp)

      await prisma.user.update({
        where: { id: req.userId },
        data: {
          totalXp: newTotalXp,
          level: newLevel,
        },
      })
    }

    // Check for new rewards
    const newRewards = await checkAndAwardRewards(prisma, req.userId!)

    res.json({
      totalScore: averageScore,
      exerciseCount: lesson.exercises.length,
      correctCount,
      xpEarned: totalXpEarned,
      results,
      newRewards,
    })
  } catch (error) {
    console.error('Submit exercises error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
