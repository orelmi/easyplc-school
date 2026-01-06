import { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'
import { useAuthStore } from '../store/authStore'
import { ExerciseRenderer, exerciseIcons, exerciseLabels } from '../components/exercises'
import type { ExerciseForUser, ExerciseAnswer, ExerciseResult } from '../types/exercises'

interface Section {
  type: 'text' | 'info' | 'warning' | 'image' | 'diagram' | 'code'
  content?: string
  url?: string
  caption?: string
  title?: string
}

interface Quiz {
  id: string
  question: string
  options: string[]
  order: number
}

interface LessonData {
  id: string
  title: string
  content: { sections: Section[] }
  xpReward: number
  duration: number
  quizzes: Quiz[]
  exercises: ExerciseForUser[]
  exercisesEnabled: boolean
  completed: boolean
  score: number | null
  module: { id: string; title: string }
}

interface QuizResult {
  quizId: string
  isCorrect: boolean
  correctIndex: number
  explanation: string | null
}

interface SubmitResult {
  score: number
  correctCount: number
  totalQuestions: number
  xpEarned: number
  results: QuizResult[]
  newRewards: Array<{ id: string; name: string; icon: string; xpBonus: number }>
}

interface ExerciseSubmitResult {
  totalScore: number
  exerciseCount: number
  correctCount: number
  xpEarned: number
  results: ExerciseResult[]
  newRewards: Array<{ id: string; name: string; icon: string; xpBonus: number }>
}

type LessonStep = 'content' | 'quiz' | 'quiz-results' | 'exercises' | 'exercises-results' | 'completed'

export default function Lesson() {
  const { id } = useParams<{ id: string }>()
  const { i18n } = useTranslation()
  const { updateUser, user } = useAuthStore()

  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Navigation state
  const [currentStep, setCurrentStep] = useState<LessonStep>('content')

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizResult, setQuizResult] = useState<SubmitResult | null>(null)
  const [submittingQuiz, setSubmittingQuiz] = useState(false)

  // Exercise state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, ExerciseAnswer>>({})
  const [exerciseResult, setExerciseResult] = useState<ExerciseSubmitResult | null>(null)
  const [submittingExercises, setSubmittingExercises] = useState(false)

  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (id) {
      setLoading(true)
      api
        .getLesson(id)
        .then(setLesson)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id, i18n.language])

  const handleStartQuiz = () => {
    setCurrentStep('quiz')
    window.scrollTo(0, 0)
  }

  const handleSelectQuizAnswer = (quizId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optionIndex }))
  }

  const handleSubmitQuiz = async () => {
    if (!lesson || !id) return

    const unanswered = lesson.quizzes.filter((q) => quizAnswers[q.id] === undefined)
    if (unanswered.length > 0) {
      alert('Veuillez répondre à toutes les questions')
      return
    }

    setSubmittingQuiz(true)
    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      const result = await api.submitLesson(id, quizAnswers, timeSpent)
      setQuizResult(result)
      setCurrentStep('quiz-results')

      if (result.xpEarned > 0 && user) {
        updateUser({ totalXp: user.totalXp + result.xpEarned })
      }

      window.scrollTo(0, 0)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la soumission')
    } finally {
      setSubmittingQuiz(false)
    }
  }

  const handleStartExercises = () => {
    setCurrentStep('exercises')
    setCurrentExerciseIndex(0)
    window.scrollTo(0, 0)
  }

  const handleExerciseAnswer = useCallback((exerciseId: string, answer: ExerciseAnswer) => {
    setExerciseAnswers((prev) => ({ ...prev, [exerciseId]: answer }))
  }, [])

  const handleNextExercise = () => {
    if (!lesson) return
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmitExercises = async () => {
    if (!lesson || !id) return

    const unanswered = lesson.exercises.filter((ex) => !exerciseAnswers[ex.id])
    if (unanswered.length > 0) {
      alert('Veuillez compléter tous les exercices')
      return
    }

    setSubmittingExercises(true)
    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      const answers = lesson.exercises.map((ex) => ({
        exerciseId: ex.id,
        answer: exerciseAnswers[ex.id],
      }))

      const result = await api.submitExercises(id, answers, timeSpent)
      setExerciseResult(result)
      setCurrentStep('exercises-results')

      if (result.xpEarned > 0 && user) {
        updateUser({ totalXp: user.totalXp + result.xpEarned })
      }

      window.scrollTo(0, 0)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la soumission')
    } finally {
      setSubmittingExercises(false)
    }
  }

  const handleFinishLesson = () => {
    setCurrentStep('completed')
    window.scrollTo(0, 0)
  }

  const handleRestart = () => {
    setCurrentStep('content')
    setQuizAnswers({})
    setQuizResult(null)
    setExerciseAnswers({})
    setExerciseResult(null)
    setCurrentExerciseIndex(0)
    window.scrollTo(0, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error || 'Leçon non trouvée'}</div>
        <Link to="/modules" className="btn btn-primary">
          Retour aux modules
        </Link>
      </div>
    )
  }

  const hasExercises = lesson.exercisesEnabled && lesson.exercises.length > 0

  // Render content section
  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'text':
        const parseTextContent = (content: string) => {
          const parts: Array<{ type: 'text' | 'code'; content: string }> = []
          const codeBlockRegex = /```[\s\S]*?```/g
          let lastIndex = 0
          let match

          while ((match = codeBlockRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
              parts.push({ type: 'text', content: content.slice(lastIndex, match.index) })
            }
            const codeContent = match[0].replace(/^```\n?/, '').replace(/\n?```$/, '')
            parts.push({ type: 'code', content: codeContent })
            lastIndex = match.index + match[0].length
          }
          if (lastIndex < content.length) {
            parts.push({ type: 'text', content: content.slice(lastIndex) })
          }
          return parts
        }

        const parts = parseTextContent(section.content || '')

        return (
          <div key={index} className="prose prose-primary max-w-none">
            {parts.map((part, partIndex) => {
              if (part.type === 'code') {
                return (
                  <div key={partIndex} className="my-4 bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto">
                    <pre className="font-mono text-sm whitespace-pre leading-tight">{part.content}</pre>
                  </div>
                )
              }
              return (
                <div
                  key={partIndex}
                  dangerouslySetInnerHTML={{
                    __html: part.content
                      .replace(/\n/g, '<br>')
                      .replace(/#{1,6}\s/g, (match) => {
                        const level = match.trim().length
                        return `<h${level} class="font-bold mt-6 mb-3">`
                      })
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              )
            })}
          </div>
        )
      case 'info':
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r">
            <div className="flex items-start gap-2">
              <span>💡</span>
              <p className="text-blue-800">{section.content}</p>
            </div>
          </div>
        )
      case 'warning':
        return (
          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4 rounded-r">
            <div className="flex items-start gap-2">
              <span>⚠️</span>
              <p className="text-yellow-800">{section.content}</p>
            </div>
          </div>
        )
      case 'image':
        return (
          <figure key={index} className="my-6">
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-400">
              [Image: {section.caption}]
            </div>
            {section.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {section.caption}
              </figcaption>
            )}
          </figure>
        )
      case 'diagram':
        return (
          <figure key={index} className="my-6">
            {section.title && (
              <div className="text-sm font-semibold text-gray-700 mb-2">{section.title}</div>
            )}
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto">
              <pre className="font-mono text-sm whitespace-pre leading-tight">{section.content}</pre>
            </div>
            {section.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {section.caption}
              </figcaption>
            )}
          </figure>
        )
      case 'code':
        return (
          <div key={index} className="my-6">
            {section.title && (
              <div className="text-sm font-semibold text-gray-700 mb-2">{section.title}</div>
            )}
            <div className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
              <pre className="font-mono text-sm whitespace-pre">{section.content}</pre>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Progress indicator
  const renderProgressIndicator = () => {
    const steps = [
      { key: 'content', label: 'Contenu', icon: '📖' },
      { key: 'quiz', label: 'Quiz', icon: '❓' },
    ]
    if (hasExercises) {
      steps.push({ key: 'exercises', label: 'Exercices', icon: '🔧' })
    }

    const currentIndex = steps.findIndex((s) =>
      currentStep.startsWith(s.key) || (s.key === 'quiz' && currentStep === 'quiz-results')
    )

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                ${index <= currentIndex ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'}
              `}
            >
              <span>{step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${index < currentIndex ? 'bg-primary-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    )
  }

  // Completed view
  if (currentStep === 'completed') {
    const totalXpEarned = (quizResult?.xpEarned || 0) + (exerciseResult?.xpEarned || 0)
    const allRewards = [...(quizResult?.newRewards || []), ...(exerciseResult?.newRewards || [])]

    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        <div className="card text-center bg-gradient-to-br from-green-50 to-primary-50">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold mb-4">Leçon terminée !</h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-primary-600">{quizResult?.score || 0}%</div>
              <div className="text-sm text-gray-500">Score Quiz</div>
            </div>
            {exerciseResult && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">{exerciseResult.totalScore}%</div>
                <div className="text-sm text-gray-500">Score Exercices</div>
              </div>
            )}
          </div>

          {totalXpEarned > 0 && (
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-6 py-3 rounded-full text-lg">
              <span className="font-bold">+{totalXpEarned} XP</span> gagnés !
            </div>
          )}
        </div>

        {allRewards.length > 0 && (
          <div className="card mt-6 text-center bg-purple-50">
            <h2 className="text-xl font-bold mb-4">🏆 Récompenses débloquées !</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {allRewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-lg p-4 shadow">
                  <span className="text-4xl">{reward.icon}</span>
                  <div className="font-medium mt-2">{reward.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <Link to={`/modules/${lesson.module.id}`} className="btn btn-secondary">
            Retour au module
          </Link>
          <button onClick={handleRestart} className="btn btn-primary">
            Revoir la leçon
          </button>
        </div>
      </div>
    )
  }

  // Exercises results view
  if (currentStep === 'exercises-results' && exerciseResult) {
    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        {renderProgressIndicator()}

        <div className={`card text-center mb-8 ${
          exerciseResult.totalScore >= 80 ? 'bg-green-50' : exerciseResult.totalScore >= 50 ? 'bg-yellow-50' : 'bg-red-50'
        }`}>
          <div className="text-6xl mb-4">
            {exerciseResult.totalScore >= 80 ? '🎉' : exerciseResult.totalScore >= 50 ? '👍' : '💪'}
          </div>
          <h1 className="text-3xl font-bold mb-2">Exercices terminés !</h1>
          <div className="text-5xl font-bold mb-2" style={{
            color: exerciseResult.totalScore >= 80 ? '#16a34a' : exerciseResult.totalScore >= 50 ? '#d97706' : '#dc2626'
          }}>
            {exerciseResult.totalScore}%
          </div>
          <p className="text-gray-600">
            {exerciseResult.correctCount}/{exerciseResult.exerciseCount} exercices réussis
          </p>
          {exerciseResult.xpEarned > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
              <span className="font-bold">+{exerciseResult.xpEarned} XP</span>
            </div>
          )}
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Détail des exercices</h2>
          <div className="space-y-3">
            {lesson.exercises.map((exercise, index) => {
              const result = exerciseResult.results.find((r) => r.exerciseId === exercise.id)
              return (
                <div
                  key={exercise.id}
                  className={`p-4 rounded-lg ${result?.isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{exerciseIcons[exercise.type]}</span>
                    <div className="flex-1">
                      <div className="font-medium">{exercise.title}</div>
                      <div className="text-sm text-gray-500">{exerciseLabels[exercise.type]}</div>
                    </div>
                    <div className={`font-bold ${result?.score === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {result?.score || 0}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={handleFinishLesson} className="btn btn-primary px-8">
            Terminer la leçon
          </button>
        </div>
      </div>
    )
  }

  // Exercises view
  if (currentStep === 'exercises' && hasExercises) {
    const currentExercise = lesson.exercises[currentExerciseIndex]
    const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1
    const allAnswered = lesson.exercises.every((ex) => exerciseAnswers[ex.id])

    return (
      <div className="max-w-3xl mx-auto animate-slide-in">
        {renderProgressIndicator()}

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep('quiz-results')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Retour aux résultats du quiz
          </button>
          <span className="text-sm text-gray-500">
            Exercice {currentExerciseIndex + 1} / {lesson.exercises.length}
          </span>
        </div>

        {/* Exercise navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {lesson.exercises.map((ex, index) => (
            <button
              key={ex.id}
              onClick={() => setCurrentExerciseIndex(index)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-lg border-2 transition-all
                ${index === currentExerciseIndex
                  ? 'border-primary-500 bg-primary-50'
                  : exerciseAnswers[ex.id]
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">{exerciseIcons[ex.type]}</span>
              <span className="text-sm">{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Current exercise */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{exerciseIcons[currentExercise.type]}</span>
            <div>
              <h2 className="text-xl font-bold">{currentExercise.title}</h2>
              <span className="text-sm text-gray-500">{exerciseLabels[currentExercise.type]}</span>
            </div>
            <div className="ml-auto text-sm text-gray-400">
              {currentExercise.xpReward} XP
            </div>
          </div>

          {currentExercise.description && (
            <p className="text-gray-600 mb-6">{currentExercise.description}</p>
          )}

          <ExerciseRenderer
            exercise={currentExercise}
            onAnswer={(answer) => handleExerciseAnswer(currentExercise.id, answer)}
          />

          {currentExercise.hints && currentExercise.hints.length > 0 && (
            <details className="mt-6">
              <summary className="cursor-pointer text-primary-600 hover:text-primary-700">
                💡 Afficher les indices
              </summary>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {currentExercise.hints.map((hint, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevExercise}
            disabled={currentExerciseIndex === 0}
            className="btn btn-secondary disabled:opacity-50"
          >
            ← Précédent
          </button>

          <div className="flex gap-2">
            {!isLastExercise && (
              <button onClick={handleNextExercise} className="btn btn-secondary">
                Suivant →
              </button>
            )}
            {allAnswered && (
              <button
                onClick={handleSubmitExercises}
                disabled={submittingExercises}
                className="btn btn-primary"
              >
                {submittingExercises ? 'Envoi...' : 'Soumettre tous les exercices'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Quiz results view
  if (currentStep === 'quiz-results' && quizResult) {
    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        {renderProgressIndicator()}

        <div className={`card text-center mb-8 ${
          quizResult.score >= 80 ? 'bg-green-50' : quizResult.score >= 50 ? 'bg-yellow-50' : 'bg-red-50'
        }`}>
          <div className="text-6xl mb-4">
            {quizResult.score >= 80 ? '🎉' : quizResult.score >= 50 ? '👍' : '💪'}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {quizResult.score >= 80 ? 'Excellent !' : quizResult.score >= 50 ? 'Bien joué !' : 'Continuez vos efforts !'}
          </h1>
          <div className="text-5xl font-bold mb-2" style={{
            color: quizResult.score >= 80 ? '#16a34a' : quizResult.score >= 50 ? '#d97706' : '#dc2626'
          }}>
            {quizResult.score}%
          </div>
          <p className="text-gray-600">
            {quizResult.correctCount}/{quizResult.totalQuestions} bonnes réponses
          </p>
          {quizResult.xpEarned > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
              <span className="font-bold">+{quizResult.xpEarned} XP</span>
            </div>
          )}
        </div>

        {/* Results breakdown */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Détail des réponses</h2>
          <div className="space-y-4">
            {lesson.quizzes.map((quiz, index) => {
              const result = quizResult.results.find((r) => r.quizId === quiz.id)
              return (
                <div
                  key={quiz.id}
                  className={`p-4 rounded-lg ${result?.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={result?.isCorrect ? 'text-green-500' : 'text-red-500'}>
                      {result?.isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">Q{index + 1}: {quiz.question}</p>
                      <p className="text-sm mt-1">
                        <span className="text-gray-500">Votre réponse: </span>
                        <span className={result?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {quiz.options[quizAnswers[quiz.id]]}
                        </span>
                      </p>
                      {!result?.isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Bonne réponse: {quiz.options[result?.correctIndex || 0]}
                        </p>
                      )}
                      {result?.explanation && (
                        <p className="text-sm text-gray-600 mt-2 italic">💡 {result.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {hasExercises ? (
            <button onClick={handleStartExercises} className="btn btn-primary px-8">
              Continuer vers les exercices pratiques ({lesson.exercises.length})
            </button>
          ) : (
            <>
              <Link to={`/modules/${lesson.module.id}`} className="btn btn-secondary">
                Retour au module
              </Link>
              <button onClick={handleRestart} className="btn btn-primary">
                Revoir la leçon
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // Quiz view
  if (currentStep === 'quiz') {
    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        {renderProgressIndicator()}

        <div className="mb-6">
          <button
            onClick={() => setCurrentStep('content')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Revoir le contenu
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Quiz - {lesson.title}</h1>

        <div className="space-y-6">
          {lesson.quizzes.map((quiz, index) => (
            <div key={quiz.id} className="card">
              <h3 className="font-semibold mb-4">
                Question {index + 1}/{lesson.quizzes.length}
              </h3>
              <p className="text-lg mb-4">{quiz.question}</p>

              <div className="space-y-2">
                {quiz.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleSelectQuizAnswer(quiz.id, optIndex)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      quizAnswers[quiz.id] === optIndex
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmitQuiz}
            disabled={submittingQuiz}
            className="btn btn-primary px-8 py-3"
          >
            {submittingQuiz ? 'Envoi...' : 'Valider mes réponses'}
          </button>
        </div>
      </div>
    )
  }

  // Content view (default)
  return (
    <div className="max-w-3xl mx-auto animate-slide-in">
      {renderProgressIndicator()}

      <Link
        to={`/modules/${lesson.module.id}`}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← {lesson.module.title}
      </Link>

      {/* Header */}
      <div className="card mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>⏱️ {lesson.duration} min</span>
              <span>💎 {lesson.xpReward} XP</span>
              <span>❓ {lesson.quizzes.length} questions</span>
              {hasExercises && (
                <span>🔧 {lesson.exercises.length} exercices</span>
              )}
            </div>
          </div>
          {lesson.completed && (
            <span className="badge bg-green-100 text-green-700">✓ Terminé</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="card mb-8">
        {lesson.content.sections.map((section, index) => renderSection(section, index))}
      </div>

      {/* Quiz CTA */}
      <div className="card bg-primary-50 text-center">
        <h2 className="text-xl font-bold text-primary-800 mb-2">
          Prêt à tester vos connaissances ?
        </h2>
        <p className="text-primary-600 mb-4">
          Répondez au quiz{hasExercises ? ' et complétez les exercices pratiques ' : ' '}
          pour valider cette leçon et gagner {lesson.xpReward} XP
        </p>
        <button onClick={handleStartQuiz} className="btn btn-primary">
          Commencer le quiz ({lesson.quizzes.length} questions)
        </button>
      </div>
    </div>
  )
}
