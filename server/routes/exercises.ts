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

    // Parse config if available
    let config = null
    if (exercise.config) {
      try {
        config = JSON.parse(exercise.config)
      } catch (e) {
        console.error('Failed to parse exercise config:', e)
      }
    }

    res.json({
      id: exercise.id,
      title: exerciseTrans?.title || exercise.title,
      description: exerciseTrans?.description || exercise.description,
      type: exercise.type,
      difficulty: exercise.difficulty,
      instructions,
      config,
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
    const { answer } = req.body

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
    const solution = exercise.solution ? JSON.parse(exercise.solution) : null

    // Calculate score based on exercise type
    let score = 0
    let isCorrect = false
    let feedback = ''
    let correctAnswer: unknown = null

    switch (exercise.type) {
      case 'fill_blank':
        // For fill-blank exercises, check each blank
        if (answer && answer.blanks && solution?.answers) {
          let correctCount = 0
          const totalBlanks = Object.keys(solution.answers).length

          Object.entries(solution.answers).forEach(([blankId, expectedAnswer]) => {
            const userAnswer = answer.blanks[blankId]?.toLowerCase().trim()
            const acceptedAnswers = String(expectedAnswer).toLowerCase().split('|')
            if (acceptedAnswers.includes(userAnswer)) {
              correctCount++
            }
          })

          score = totalBlanks > 0 ? Math.round((correctCount / totalBlanks) * 100) : 0
          isCorrect = score === 100
          feedback = isCorrect ? 'Toutes les réponses sont correctes!' : 'Certaines réponses sont incorrectes.'
          correctAnswer = solution.answers
        }
        break

      case 'ordering':
        // For ordering exercises, check the order
        if (answer && answer.order && solution?.correctOrder) {
          let correctPositions = 0
          const totalItems = solution.correctOrder.length

          solution.correctOrder.forEach((itemId: string, index: number) => {
            if (answer.order[index] === itemId) {
              correctPositions++
            }
          })

          score = totalItems > 0 ? Math.round((correctPositions / totalItems) * 100) : 0
          isCorrect = score === 100
          feedback = isCorrect ? 'L\'ordre est parfait!' : 'L\'ordre n\'est pas tout à fait correct.'
          correctAnswer = solution.correctOrder
        }
        break

      case 'matching':
        // For matching exercises, check pairs
        if (answer && answer.pairs && solution?.pairs) {
          let correctPairs = 0
          const totalPairs = solution.pairs.length

          solution.pairs.forEach(([leftId, rightId]: [string, string]) => {
            const found = answer.pairs.some(([l, r]: [string, string]) =>
              l === leftId && r === rightId
            )
            if (found) correctPairs++
          })

          score = totalPairs > 0 ? Math.round((correctPairs / totalPairs) * 100) : 0
          isCorrect = score === 100
          feedback = isCorrect ? 'Toutes les associations sont correctes!' : 'Certaines associations sont incorrectes.'
          correctAnswer = solution.pairs
        }
        break

      case 'code_input':
        // For code input exercises, check patterns or test cases
        if (answer && answer.code) {
          const userCode = answer.code.trim()

          if (solution?.acceptedPatterns) {
            // Check against regex patterns
            const matches = solution.acceptedPatterns.some((pattern: string) =>
              new RegExp(pattern, 'i').test(userCode)
            )
            score = matches ? 100 : 30
          } else if (solution?.code) {
            // Simple comparison
            const normalizedUser = userCode.toLowerCase().replace(/\s+/g, ' ')
            const normalizedSolution = solution.code.toLowerCase().replace(/\s+/g, ' ')
            score = normalizedUser === normalizedSolution ? 100 : 40
          }

          isCorrect = score >= 70
          feedback = isCorrect ? 'Code correct!' : 'Le code ne correspond pas à la solution attendue.'
          correctAnswer = solution?.code
        }
        break

      case 'drag_drop':
        // For drag-drop exercises, check placements
        if (answer && answer.placements && solution?.placements) {
          let correctPlacements = 0
          let totalExpected = 0

          Object.entries(solution.placements).forEach(([zoneId, expectedItems]) => {
            const items = expectedItems as string[]
            totalExpected += items.length
            const userItems = answer.placements[zoneId] || []

            items.forEach((itemId: string) => {
              if (userItems.includes(itemId)) correctPlacements++
            })
          })

          score = totalExpected > 0 ? Math.round((correctPlacements / totalExpected) * 100) : 0
          isCorrect = score >= 80
          feedback = isCorrect ? 'Tous les éléments sont bien placés!' : 'Certains éléments ne sont pas au bon endroit.'
          correctAnswer = solution.placements
        }
        break

      case 'wiring':
        // For wiring exercises, check connections
        if (answer && answer.connections && solution?.connections) {
          let correctConnections = 0
          const totalConnections = solution.connections.length

          solution.connections.forEach(([t1, t2]: [string, string]) => {
            const found = answer.connections.some(([c1, c2]: [string, string]) =>
              (c1 === t1 && c2 === t2) || (c1 === t2 && c2 === t1)
            )
            if (found) correctConnections++
          })

          score = totalConnections > 0 ? Math.round((correctConnections / totalConnections) * 100) : 0
          isCorrect = score >= 80
          feedback = isCorrect ? 'Câblage correct!' : 'Certaines connexions sont manquantes ou incorrectes.'
          correctAnswer = solution.connections
        }
        break

      case 'timing':
        // For timing exercises, check signal transitions with tolerance
        if (answer && answer.signals && solution?.expectedSignals) {
          const tolerance = solution.tolerance || 50 // ms

          let correctSignals = 0
          const totalSignals = solution.expectedSignals.length

          solution.expectedSignals.forEach((expected: any) => {
            const userSignal = answer.signals.find((s: any) => s.signalId === expected.signalId)
            if (userSignal) {
              // Check if transitions are close enough
              let transitionsMatch = expected.transitions.every((et: any) =>
                userSignal.transitions.some((ut: any) =>
                  Math.abs(ut.time - et.time) <= tolerance && ut.value === et.value
                )
              )
              if (transitionsMatch) correctSignals++
            }
          })

          score = totalSignals > 0 ? Math.round((correctSignals / totalSignals) * 100) : 0
          isCorrect = score >= 80
          feedback = isCorrect ? 'Chronogramme correct!' : 'Le chronogramme ne correspond pas tout à fait.'
          correctAnswer = solution.expectedSignals
        }
        break

      case 'ladder_builder':
      case 'plc_simulator':
        // For simulation exercises, check objectives or behavior
        if (answer && answer.completedObjectives) {
          const totalObjectives = solution?.objectiveChecks?.length || 1
          const completedCount = answer.completedObjectives.length
          score = Math.round((completedCount / totalObjectives) * 100)
          isCorrect = completedCount === totalObjectives
          feedback = isCorrect ? 'Tous les objectifs sont atteints!' : `${totalObjectives - completedCount} objectif(s) restant(s).`
        } else if (answer && answer.program) {
          // Basic program validation
          score = 70
          isCorrect = true
          feedback = 'Programme soumis avec succès!'
        }
        break

      default:
        // Generic scoring for legacy types
        score = 50
        isCorrect = false
        feedback = 'Type d\'exercice non supporté.'
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
        userCode: answer ? JSON.stringify(answer) : null,
        completedAt: isCorrect ? new Date() : existingProgress?.completedAt,
      },
      create: {
        userId: req.userId!,
        exerciseId: id,
        completed: isCorrect,
        attempts: 1,
        bestScore: score,
        userCode: answer ? JSON.stringify(answer) : null,
        completedAt: isCorrect ? new Date() : null,
      },
    })

    res.json({
      score,
      isCorrect,
      feedback,
      xpEarned,
      attempts: (existingProgress?.attempts || 0) + 1,
      correctAnswer,
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
