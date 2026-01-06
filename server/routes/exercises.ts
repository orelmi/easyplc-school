import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// Get exercise content
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params
    const lang = (req.query.lang as string) || 'fr'

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            translations: {
              where: { language: lang }
            }
          }
        },
        progress: {
          where: { userId: req.userId },
        },
        translations: {
          where: { language: lang }
        }
      },
    })

    if (!exercise) {
      return res.status(404).json({ error: 'Exercice non trouvé' })
    }

    // Check if module is unlocked
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { totalXp: true },
    })

    if (exercise.module.isLocked && (user?.totalXp || 0) < exercise.module.requiredXp) {
      return res.status(403).json({ error: 'Module verrouillé' })
    }

    // Get translations
    const exerciseTrans = (exercise as any).translations?.[0]
    const moduleTrans = (exercise.module as any).translations?.[0]

    // Parse JSON fields (use translated content if available)
    const instructions = JSON.parse(exerciseTrans?.instructions || exercise.instructions)
    const hints = exercise.hints ? JSON.parse(exerciseTrans?.hints || exercise.hints) : []

    res.json({
      id: exercise.id,
      title: exerciseTrans?.title || exercise.title,
      description: exerciseTrans?.description || exercise.description,
      type: exercise.type,
      difficulty: exercise.difficulty,
      instructions,
      initialCode: exercise.initialCode,
      hints,
      xpReward: exercise.xpReward,
      order: exercise.order,
      completed: exercise.progress.some((p) => p.completed),
      bestScore: exercise.progress[0]?.bestScore || null,
      attempts: exercise.progress[0]?.attempts || 0,
      module: {
        id: exercise.module.id,
        title: moduleTrans?.title || exercise.module.title,
      },
    })
  } catch (error) {
    console.error('Get exercise error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Submit exercise solution
router.post('/:id/submit', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id } = req.params
    const { userCode, userAnswer } = req.body

    // Verify user still exists
    const userExists = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true }
    })

    if (!userExists) {
      return res.status(401).json({ error: 'Session invalide, veuillez vous reconnecter' })
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id },
    })

    if (!exercise) {
      return res.status(404).json({ error: 'Exercice non trouvé' })
    }

    // Parse solution for validation
    const solution = JSON.parse(exercise.solution)

    // Calculate score based on exercise type
    let score = 0
    let isCorrect = false
    let feedback = ''

    switch (exercise.type) {
      case 'ladder':
      case 'grafcet':
      case 'gcode':
        // For code-based exercises, compare user code with solution
        // Simple comparison for now - can be enhanced with more sophisticated validation
        if (userCode) {
          const normalizedUserCode = userCode.toLowerCase().replace(/\s+/g, '')
          const normalizedSolution = JSON.stringify(solution).toLowerCase().replace(/\s+/g, '')

          // Check if key elements are present
          const keyElements = solution.code || solution.steps || []
          let matchCount = 0

          if (Array.isArray(keyElements)) {
            keyElements.forEach((element: string) => {
              if (normalizedUserCode.includes(element.toLowerCase().replace(/\s+/g, ''))) {
                matchCount++
              }
            })
            score = keyElements.length > 0 ? Math.round((matchCount / keyElements.length) * 100) : 0
          } else {
            // Direct comparison
            score = normalizedUserCode === normalizedSolution ? 100 : 50
          }

          isCorrect = score >= 70
          feedback = isCorrect ? 'Excellent travail!' : 'Continuez à améliorer votre solution.'
        }
        break

      case 'plc_config':
      case 'vfd_config':
        // For configuration exercises, check if configuration matches
        if (userAnswer && typeof userAnswer === 'object') {
          const solutionConfig = solution.configuration || solution
          let correctFields = 0
          let totalFields = Object.keys(solutionConfig).length

          Object.keys(solutionConfig).forEach((key) => {
            if (userAnswer[key] !== undefined &&
                String(userAnswer[key]).toLowerCase() === String(solutionConfig[key]).toLowerCase()) {
              correctFields++
            }
          })

          score = totalFields > 0 ? Math.round((correctFields / totalFields) * 100) : 0
          isCorrect = score >= 70
          feedback = isCorrect ? 'Configuration correcte!' : 'Vérifiez les paramètres de configuration.'
        }
        break

      case 'troubleshooting':
        // For troubleshooting, check if the answer matches
        if (userAnswer) {
          const correctAnswer = solution.answer || solution.cause || solution
          if (typeof correctAnswer === 'string') {
            isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase())
          } else if (typeof correctAnswer === 'object') {
            // Check multiple possible answers
            const answers = Object.values(correctAnswer)
            isCorrect = answers.some((ans: any) =>
              userAnswer.toLowerCase().includes(String(ans).toLowerCase())
            )
          }
          score = isCorrect ? 100 : 30
          feedback = isCorrect ? 'Diagnostic correct!' : 'Analysez les symptômes plus attentivement.'
        }
        break

      case 'wiring':
        // For wiring exercises, check connections
        if (userAnswer && Array.isArray(userAnswer)) {
          const correctConnections = solution.connections || solution
          let correctCount = 0

          if (Array.isArray(correctConnections)) {
            correctConnections.forEach((conn: any) => {
              const found = userAnswer.some((ua: any) =>
                ua.from === conn.from && ua.to === conn.to
              )
              if (found) correctCount++
            })
            score = correctConnections.length > 0
              ? Math.round((correctCount / correctConnections.length) * 100)
              : 0
          }
          isCorrect = score >= 70
          feedback = isCorrect ? 'Câblage correct!' : 'Vérifiez vos connexions.'
        }
        break

      default:
        // Generic scoring
        score = 50
        feedback = 'Exercice soumis.'
    }

    // Get existing progress
    const existingProgress = await prisma.exerciseProgress.findUnique({
      where: {
        userId_exerciseId: {
          userId: req.userId!,
          exerciseId: id,
        },
      },
    })

    let xpEarned = 0
    const isNewCompletion = !existingProgress?.completed && isCorrect

    if (isNewCompletion) {
      // Calculate XP based on score
      xpEarned = Math.round(exercise.xpReward * (score / 100))

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

    // Update or create progress
    await prisma.exerciseProgress.upsert({
      where: {
        userId_exerciseId: {
          userId: req.userId!,
          exerciseId: id,
        },
      },
      update: {
        completed: existingProgress?.completed || isCorrect,
        attempts: { increment: 1 },
        bestScore: existingProgress?.bestScore
          ? Math.max(existingProgress.bestScore, score)
          : score,
        userCode: userCode || null,
        completedAt: isCorrect ? new Date() : existingProgress?.completedAt,
      },
      create: {
        userId: req.userId!,
        exerciseId: id,
        completed: isCorrect,
        attempts: 1,
        bestScore: score,
        userCode: userCode || null,
        completedAt: isCorrect ? new Date() : null,
      },
    })

    res.json({
      score,
      isCorrect,
      feedback,
      xpEarned,
      attempts: (existingProgress?.attempts || 0) + 1,
    })
  } catch (error) {
    console.error('Submit exercise error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Get hint for exercise
router.get('/:id/hint/:hintIndex', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma
    const { id, hintIndex } = req.params
    const lang = (req.query.lang as string) || 'fr'

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: {
        translations: {
          where: { language: lang }
        }
      }
    })

    if (!exercise) {
      return res.status(404).json({ error: 'Exercice non trouvé' })
    }

    const exerciseTrans = (exercise as any).translations?.[0]
    const hints = exercise.hints ? JSON.parse(exerciseTrans?.hints || exercise.hints) : []
    const index = parseInt(hintIndex, 10)

    if (index < 0 || index >= hints.length) {
      return res.status(404).json({ error: 'Indice non disponible' })
    }

    res.json({
      hint: hints[index],
      totalHints: hints.length,
      currentIndex: index,
    })
  } catch (error) {
    console.error('Get hint error:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

function calculateLevel(xp: number): number {
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

export default router
