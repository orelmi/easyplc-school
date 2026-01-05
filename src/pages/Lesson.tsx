import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuthStore } from '../store/authStore'

interface Section {
  type: 'text' | 'info' | 'warning' | 'image'
  content?: string
  url?: string
  caption?: string
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

export default function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { updateUser, user } = useAuthStore()

  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Quiz state
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz' | 'results'>('content')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (id) {
      api
        .getLesson(id)
        .then(setLesson)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleStartQuiz = () => {
    setCurrentStep('quiz')
    window.scrollTo(0, 0)
  }

  const handleSelectAnswer = (quizId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [quizId]: optionIndex }))
  }

  const handleSubmit = async () => {
    if (!lesson || !id) return

    const unanswered = lesson.quizzes.filter((q) => answers[q.id] === undefined)
    if (unanswered.length > 0) {
      alert('Veuillez répondre à toutes les questions')
      return
    }

    setSubmitting(true)
    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      const submitResult = await api.submitLesson(id, answers, timeSpent)
      setResult(submitResult)
      setCurrentStep('results')

      // Update user XP
      if (submitResult.xpEarned > 0 && user) {
        updateUser({ totalXp: user.totalXp + submitResult.xpEarned })
      }

      window.scrollTo(0, 0)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la soumission')
    } finally {
      setSubmitting(false)
    }
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

  // Render content section
  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div
            key={index}
            className="prose prose-primary max-w-none"
            dangerouslySetInnerHTML={{
              __html: section.content?.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, (match) => {
                const level = match.trim().length
                return `<h${level} class="font-bold mt-6 mb-3">`
              }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || ''
            }}
          />
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
      default:
        return null
    }
  }

  // Results view
  if (currentStep === 'results' && result) {
    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        {/* Score card */}
        <div className={`card text-center mb-8 ${
          result.score >= 80 ? 'bg-green-50' : result.score >= 50 ? 'bg-yellow-50' : 'bg-red-50'
        }`}>
          <div className="text-6xl mb-4">
            {result.score >= 80 ? '🎉' : result.score >= 50 ? '👍' : '💪'}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {result.score >= 80
              ? 'Excellent !'
              : result.score >= 50
              ? 'Bien joué !'
              : 'Continuez vos efforts !'}
          </h1>
          <div className="text-5xl font-bold mb-2" style={{
            color: result.score >= 80 ? '#16a34a' : result.score >= 50 ? '#d97706' : '#dc2626'
          }}>
            {result.score}%
          </div>
          <p className="text-gray-600">
            {result.correctCount}/{result.totalQuestions} bonnes réponses
          </p>

          {result.xpEarned > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
              <span className="font-bold">+{result.xpEarned} XP</span> gagnés !
            </div>
          )}
        </div>

        {/* New rewards */}
        {result.newRewards.length > 0 && (
          <div className="card mb-8 text-center bg-purple-50">
            <h2 className="text-xl font-bold mb-4">🏆 Nouvelles récompenses !</h2>
            <div className="flex justify-center gap-4">
              {result.newRewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-lg p-4 shadow">
                  <span className="text-4xl">{reward.icon}</span>
                  <div className="font-medium mt-2">{reward.name}</div>
                  {reward.xpBonus > 0 && (
                    <div className="text-sm text-primary-600">+{reward.xpBonus} XP</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results breakdown */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Détail des réponses</h2>
          <div className="space-y-4">
            {lesson.quizzes.map((quiz, index) => {
              const quizResult = result.results.find((r) => r.quizId === quiz.id)
              return (
                <div
                  key={quiz.id}
                  className={`p-4 rounded-lg ${
                    quizResult?.isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={quizResult?.isCorrect ? 'text-green-500' : 'text-red-500'}>
                      {quizResult?.isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">Q{index + 1}: {quiz.question}</p>
                      <p className="text-sm mt-1">
                        <span className="text-gray-500">Votre réponse: </span>
                        <span className={quizResult?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {quiz.options[answers[quiz.id]]}
                        </span>
                      </p>
                      {!quizResult?.isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Bonne réponse: {quiz.options[quizResult?.correctIndex || 0]}
                        </p>
                      )}
                      {quizResult?.explanation && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          💡 {quizResult.explanation}
                        </p>
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
          <Link to={`/modules/${lesson.module.id}`} className="btn btn-secondary">
            Retour au module
          </Link>
          <button onClick={() => {
            setCurrentStep('content')
            setAnswers({})
            setResult(null)
          }} className="btn btn-primary">
            Revoir la leçon
          </button>
        </div>
      </div>
    )
  }

  // Quiz view
  if (currentStep === 'quiz') {
    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        <div className="mb-6">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentStep('content')
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Revoir le contenu
          </Link>
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
                    onClick={() => handleSelectAnswer(quiz.id, optIndex)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[quiz.id] === optIndex
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn btn-primary px-8 py-3"
          >
            {submitting ? 'Envoi...' : 'Valider mes réponses'}
          </button>
        </div>
      </div>
    )
  }

  // Content view
  return (
    <div className="max-w-3xl mx-auto animate-slide-in">
      {/* Navigation */}
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
          Répondez au quiz pour valider cette leçon et gagner {lesson.xpReward} XP
        </p>
        <button onClick={handleStartQuiz} className="btn btn-primary">
          Commencer le quiz ({lesson.quizzes.length} questions)
        </button>
      </div>
    </div>
  )
}
