import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'
import { useAuthStore } from '../store/authStore'

interface ExerciseData {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  instructions: {
    steps: string[]
    objective: string
  }
  initialCode?: string
  hints: string[]
  xpReward: number
  order: number
  completed: boolean
  bestScore: number | null
  attempts: number
  module: { id: string; title: string }
}

interface SubmitResult {
  score: number
  isCorrect: boolean
  feedback: string
  xpEarned: number
  attempts: number
}

export default function Exercise() {
  const { id } = useParams<{ id: string }>()
  const { i18n, t } = useTranslation()
  const { updateUser, user } = useAuthStore()

  const [exercise, setExercise] = useState<ExerciseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Exercise state
  const [currentStep, setCurrentStep] = useState<'instructions' | 'exercise' | 'results'>('instructions')
  const [userCode, setUserCode] = useState('')
  const [userAnswer, setUserAnswer] = useState<Record<string, string>>({})
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([])

  useEffect(() => {
    if (id) {
      setLoading(true)
      api
        .getExercise(id)
        .then((data) => {
          setExercise(data)
          if (data.initialCode) {
            setUserCode(data.initialCode)
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id, i18n.language])

  const handleStartExercise = () => {
    setCurrentStep('exercise')
    window.scrollTo(0, 0)
  }

  const handleRevealHint = (index: number) => {
    if (!hintsRevealed.includes(index)) {
      setHintsRevealed([...hintsRevealed, index])
    }
  }

  const handleSubmit = async () => {
    if (!exercise || !id) return

    setSubmitting(true)
    try {
      const submitResult = await api.submitExercise(id, {
        userCode: userCode || undefined,
        userAnswer: Object.keys(userAnswer).length > 0 ? userAnswer : undefined,
      })
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

  const handleRetry = () => {
    setCurrentStep('exercise')
    setResult(null)
    setHintsRevealed([])
    window.scrollTo(0, 0)
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return t('exercise.beginner', 'Debutant')
      case 'intermediate': return t('exercise.intermediate', 'Intermediaire')
      case 'advanced': return t('exercise.advanced', 'Avance')
      default: return difficulty
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'ladder': 'Programmation LADDER',
      'grafcet': 'GRAFCET',
      'gcode': 'G-Code',
      'plc_config': 'Configuration PLC',
      'vfd_config': 'Configuration Variateur',
      'troubleshooting': 'Depannage',
      'wiring': 'Cablage',
    }
    return labels[type] || type
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !exercise) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error || 'Exercice non trouve'}</div>
        <Link to="/modules" className="btn btn-primary">
          Retour aux modules
        </Link>
      </div>
    )
  }

  // Results view
  if (currentStep === 'results' && result) {
    return (
      <div className="max-w-2xl mx-auto animate-slide-in">
        {/* Score card */}
        <div className={`card text-center mb-8 ${
          result.isCorrect ? 'bg-green-50' : 'bg-yellow-50'
        }`}>
          <div className="text-6xl mb-4">
            {result.isCorrect ? '🎉' : '💪'}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {result.isCorrect ? 'Excellent !' : 'Presque !'}
          </h1>
          <div className="text-5xl font-bold mb-2" style={{
            color: result.isCorrect ? '#16a34a' : '#d97706'
          }}>
            {result.score}%
          </div>
          <p className="text-gray-600">{result.feedback}</p>
          <p className="text-sm text-gray-500 mt-2">
            Tentative #{result.attempts}
          </p>

          {result.xpEarned > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
              <span className="font-bold">+{result.xpEarned} XP</span> gagnes !
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link to={`/modules/${exercise.module.id}`} className="btn btn-secondary">
            Retour au module
          </Link>
          {!result.isCorrect && (
            <button onClick={handleRetry} className="btn btn-primary">
              Reessayer
            </button>
          )}
        </div>
      </div>
    )
  }

  // Exercise view
  if (currentStep === 'exercise') {
    return (
      <div className="max-w-4xl mx-auto animate-slide-in">
        {/* Navigation */}
        <button
          onClick={() => setCurrentStep('instructions')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Voir les instructions
        </button>

        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{exercise.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
              {getDifficultyLabel(exercise.difficulty)}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{exercise.instructions.objective}</p>
        </div>

        {/* Exercise area based on type */}
        <div className="card mb-6">
          {(exercise.type === 'ladder' || exercise.type === 'grafcet' || exercise.type === 'gcode') && (
            <div>
              <h3 className="font-semibold mb-3">Votre code</h3>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 font-mono text-sm bg-gray-900 text-green-400 p-4 rounded-lg"
                placeholder="Ecrivez votre code ici..."
              />
            </div>
          )}

          {(exercise.type === 'plc_config' || exercise.type === 'vfd_config') && (
            <div>
              <h3 className="font-semibold mb-3">Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parametre 1
                  </label>
                  <input
                    type="text"
                    value={userAnswer['param1'] || ''}
                    onChange={(e) => setUserAnswer({ ...userAnswer, param1: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Entrez la valeur..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parametre 2
                  </label>
                  <input
                    type="text"
                    value={userAnswer['param2'] || ''}
                    onChange={(e) => setUserAnswer({ ...userAnswer, param2: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Entrez la valeur..."
                  />
                </div>
              </div>
            </div>
          )}

          {exercise.type === 'troubleshooting' && (
            <div>
              <h3 className="font-semibold mb-3">Votre diagnostic</h3>
              <textarea
                value={userAnswer['diagnosis'] || ''}
                onChange={(e) => setUserAnswer({ ...userAnswer, diagnosis: e.target.value })}
                className="w-full h-32 border rounded-lg p-3"
                placeholder="Decrivez le probleme identifie et la solution proposee..."
              />
            </div>
          )}

          {exercise.type === 'wiring' && (
            <div>
              <h3 className="font-semibold mb-3">Connexions</h3>
              <p className="text-gray-600 mb-4">
                Definissez les connexions (format: FROM,TO sur chaque ligne)
              </p>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-48 font-mono text-sm border rounded-lg p-3"
                placeholder="L1,T1&#10;L2,T2&#10;L3,T3"
              />
            </div>
          )}
        </div>

        {/* Hints */}
        {exercise.hints && exercise.hints.length > 0 && (
          <div className="card mb-6">
            <h3 className="font-semibold mb-3">Indices ({hintsRevealed.length}/{exercise.hints.length})</h3>
            <div className="space-y-2">
              {exercise.hints.map((hint, index) => (
                <div key={index}>
                  {hintsRevealed.includes(index) ? (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                      <p className="text-blue-800">💡 {hint}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRevealHint(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Reveler l'indice {index + 1}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn btn-primary px-8 py-3"
          >
            {submitting ? 'Verification...' : 'Soumettre ma solution'}
          </button>
        </div>
      </div>
    )
  }

  // Instructions view (default)
  return (
    <div className="max-w-3xl mx-auto animate-slide-in">
      {/* Navigation */}
      <Link
        to={`/modules/${exercise.module.id}`}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← {exercise.module.title}
      </Link>

      {/* Header */}
      <div className="card mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{exercise.title}</h1>
              {exercise.completed && (
                <span className="badge bg-green-100 text-green-700">✓ Complete</span>
              )}
            </div>
            <p className="text-gray-600">{exercise.description}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
                {getDifficultyLabel(exercise.difficulty)}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {getTypeLabel(exercise.type)}
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                💎 {exercise.xpReward} XP
              </span>
              {exercise.attempts > 0 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {exercise.attempts} tentative{exercise.attempts > 1 ? 's' : ''}
                </span>
              )}
              {exercise.bestScore !== null && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Meilleur score: {exercise.bestScore}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Instructions</h2>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r mb-6">
          <p className="text-blue-800 font-medium">{exercise.instructions.objective}</p>
        </div>

        <h3 className="font-semibold mb-3">Etapes a suivre :</h3>
        <ol className="space-y-3">
          {exercise.instructions.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Start CTA */}
      <div className="card bg-primary-50 text-center">
        <h2 className="text-xl font-bold text-primary-800 mb-2">
          Pret a relever le defi ?
        </h2>
        <p className="text-primary-600 mb-4">
          Completez cet exercice pour gagner {exercise.xpReward} XP
        </p>
        <button onClick={handleStartExercise} className="btn btn-primary">
          Commencer l'exercice
        </button>
      </div>
    </div>
  )
}
