import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'

interface Lesson {
  id: string
  title: string
  description: string
  order: number
  xpReward: number
  duration: number
  quizCount: number
  completed: boolean
  score: number | null
}

interface ModuleData {
  id: string
  title: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
}

export default function ModuleDetail() {
  const { id } = useParams<{ id: string }>()
  const { i18n } = useTranslation()
  const [module, setModule] = useState<ModuleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      setLoading(true)
      api
        .getModule(id)
        .then(setModule)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id, i18n.language])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <Link to="/modules" className="btn btn-primary">
          Retour aux modules
        </Link>
      </div>
    )
  }

  if (!module) return null

  const completedCount = module.lessons.filter((l) => l.completed).length
  const progress = Math.round((completedCount / module.lessons.length) * 100)

  return (
    <div className="animate-slide-in">
      {/* Back link */}
      <Link
        to="/modules"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← Retour aux modules
      </Link>

      {/* Header */}
      <div
        className="card mb-8"
        style={{ background: `linear-gradient(135deg, ${module.color}15, ${module.color}30)` }}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{module.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{module.title}</h1>
            <p className="text-gray-600">{module.description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>{completedCount}/{module.lessons.length} leçons terminées</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: module.color }}
            />
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <h2 className="text-xl font-bold mb-4">Leçons</h2>
      <div className="space-y-3">
        {module.lessons.map((lesson, index) => {
          const isAvailable = index === 0 || module.lessons[index - 1].completed

          return (
            <div
              key={lesson.id}
              className={`card ${!isAvailable ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-4">
                {/* Number/Status */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    lesson.completed
                      ? 'bg-green-100 text-green-600'
                      : isAvailable
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {lesson.completed ? '✓' : lesson.order}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>⏱️ {lesson.duration} min</span>
                    <span>💎 {lesson.xpReward} XP</span>
                    <span>❓ {lesson.quizCount} questions</span>
                  </div>
                </div>

                {/* Score/Action */}
                <div className="flex items-center gap-3">
                  {lesson.completed && lesson.score !== null && (
                    <span
                      className={`badge ${
                        lesson.score >= 80
                          ? 'bg-green-100 text-green-700'
                          : lesson.score >= 50
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {lesson.score}%
                    </span>
                  )}

                  {isAvailable ? (
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="btn btn-primary"
                      style={{ backgroundColor: module.color }}
                    >
                      {lesson.completed ? 'Revoir' : 'Commencer'}
                    </Link>
                  ) : (
                    <button disabled className="btn bg-gray-100 text-gray-400 cursor-not-allowed">
                      🔒 Verrouillé
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
