import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'

interface LessonPreview {
  id: string
  title: string
  order: number
  duration: number
  xpReward: number
  quizCount: number
  completed: boolean
}

interface ExercisePreview {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  order: number
  xpReward: number
  completed: boolean
}

interface Module {
  id: string
  title: string
  description: string
  order: number
  icon: string
  color: string
  isLocked: boolean
  requiredXp: number
  isRequired: boolean
  lessonsCount: number
  completedLessons: number
  exercisesCount: number
  completedExercises: number
  quizzesCount: number
  progress: number
  lessonsPreview: LessonPreview[]
  exercisesPreview: ExercisePreview[]
}

interface CursusData {
  id: string
  title: string
  description: string
  icon: string
  color: string
  modules: Module[]
  progress: {
    completed: number
    total: number
    percentage: number
  }
  exercises: {
    completed: number
    total: number
  }
  quizzes: {
    total: number
  }
}

export default function CursusDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const [cursus, setCursus] = useState<CursusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  const toggleModuleExpanded = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev)
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId)
      } else {
        newSet.add(moduleId)
      }
      return newSet
    })
  }

  useEffect(() => {
    if (id) {
      setLoading(true)
      api
        .getCursusById(id)
        .then(setCursus)
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

  if (error || !cursus) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || t('cursus.notFound')}</p>
        <Link to="/cursus" className="btn btn-primary mt-4">
          {t('cursus.backToList')}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/cursus" className="hover:text-primary-600">
          {t('cursus.title')}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{cursus.title}</span>
      </div>

      <div className="card">
        <div className="flex items-start gap-4">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{ backgroundColor: `${cursus.color}20` }}
          >
            {cursus.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{cursus.title}</h1>
            <p className="text-gray-600 mt-1">{cursus.description}</p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex flex-wrap gap-4">
                  <span className="text-gray-600">
                    📚 {cursus.progress.completed}/{cursus.progress.total} {t('cursus.lessonsCompleted')}
                  </span>
                  {cursus.quizzes && cursus.quizzes.total > 0 && (
                    <span className="text-gray-600">
                      ❓ {cursus.quizzes.total} {t('cursus.quizzes', 'questions')}
                    </span>
                  )}
                  {cursus.exercises && cursus.exercises.total > 0 && (
                    <span className="text-gray-600">
                      🎯 {cursus.exercises.completed}/{cursus.exercises.total} {t('cursus.exercisesCompleted', 'exercices')}
                    </span>
                  )}
                </div>
                <span className="font-semibold" style={{ color: cursus.color }}>
                  {cursus.progress.percentage}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${cursus.progress.percentage}%`,
                    backgroundColor: cursus.color,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t('cursus.modulesInPath')} ({cursus.modules.length})
        </h2>

        <div className="space-y-4">
          {cursus.modules.map((module, index) => (
            <div
              key={module.id}
              className={`card ${module.isLocked ? 'opacity-60' : 'hover:shadow-md'} transition-shadow`}
            >
              <div className="flex items-center gap-4">
                {/* Order number */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: module.isLocked ? '#9ca3af' : module.color }}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${module.color}20` }}
                >
                  {module.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    {module.isRequired && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                        {t('cursus.required')}
                      </span>
                    )}
                    {module.isLocked && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1">
                        <span>🔒</span>
                        {module.requiredXp} XP
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-1">{module.description}</p>

                  {module.progress > 0 && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden w-32">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${module.progress}%`,
                            backgroundColor: module.color,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats & Action */}
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-gray-500">
                      📚 {module.completedLessons}/{module.lessonsCount}
                    </div>
                    <div className="text-gray-400">{t('cursus.lessons')}</div>
                  </div>
                  {module.quizzesCount > 0 && (
                    <div className="text-right text-sm">
                      <div className="text-gray-500">
                        ❓ {module.quizzesCount}
                      </div>
                      <div className="text-gray-400">{t('cursus.quizzes', 'questions')}</div>
                    </div>
                  )}
                  {module.exercisesCount > 0 && (
                    <div className="text-right text-sm">
                      <div className="text-gray-500">
                        🎯 {module.completedExercises}/{module.exercisesCount}
                      </div>
                      <div className="text-gray-400">{t('cursus.exercises', 'exercices')}</div>
                    </div>
                  )}

                  {!module.isLocked ? (
                    <Link
                      to={`/modules/${module.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      {module.progress === 100
                        ? t('modules.review')
                        : module.progress > 0
                        ? t('modules.continue')
                        : t('modules.start')}
                    </Link>
                  ) : (
                    <button disabled className="btn btn-secondary btn-sm opacity-50 cursor-not-allowed">
                      🔒 {t('modules.locked')}
                    </button>
                  )}

                  {/* Preview toggle button */}
                  {((module.lessonsPreview && module.lessonsPreview.length > 0) ||
                    (module.exercisesPreview && module.exercisesPreview.length > 0)) && (
                    <button
                      onClick={() => toggleModuleExpanded(module.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Voir le contenu"
                    >
                      <span className="text-lg">{expandedModules.has(module.id) ? '▼' : '▶'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lessons and Exercises preview (expandable) */}
              {expandedModules.has(module.id) && (
                <div className="mt-4 border-t pt-4">
                  {/* Lessons section */}
                  {module.lessonsPreview && module.lessonsPreview.length > 0 && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        📚 Leçons ({module.lessonsPreview.length})
                      </h4>
                      <div className="space-y-2 mb-4">
                        {module.lessonsPreview.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center gap-3 p-2 rounded-lg ${
                              lesson.completed ? 'bg-green-50' : 'bg-gray-50'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                lesson.completed
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}
                            >
                              {lesson.completed ? '✓' : lessonIndex + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${lesson.completed ? 'text-green-700' : 'text-gray-700'}`}>
                                {lesson.title}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>⏱ {lesson.duration} min</span>
                              <span>⭐ {lesson.xpReward} XP</span>
                              {lesson.quizCount > 0 && (
                                <span>❓ {lesson.quizCount} questions</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Exercises section */}
                  {module.exercisesPreview && module.exercisesPreview.length > 0 && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        🎯 Exercices ({module.exercisesPreview.length})
                      </h4>
                      <div className="space-y-2">
                        {module.exercisesPreview.map((exercise, exerciseIndex) => (
                          <div
                            key={exercise.id}
                            className={`flex items-center gap-3 p-2 rounded-lg ${
                              exercise.completed ? 'bg-blue-50' : 'bg-gray-50'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                exercise.completed
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}
                            >
                              {exercise.completed ? '✓' : exerciseIndex + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${exercise.completed ? 'text-blue-700' : 'text-gray-700'}`}>
                                {exercise.title}
                              </p>
                              <p className="text-xs text-gray-500">{exercise.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {exercise.difficulty === 'beginner' ? 'Débutant' :
                                 exercise.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                              </span>
                              <span className="text-xs text-gray-500">⭐ {exercise.xpReward} XP</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
