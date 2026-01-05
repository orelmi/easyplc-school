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
  progress: number
  lessonsPreview: LessonPreview[]
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
}

export default function CursusProgram() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const [cursus, setCursus] = useState<CursusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  // Calculate total duration and XP
  const totalDuration = cursus.modules.reduce((acc, module) =>
    acc + module.lessonsPreview.reduce((sum, lesson) => sum + lesson.duration, 0), 0
  )
  const totalXp = cursus.modules.reduce((acc, module) =>
    acc + module.lessonsPreview.reduce((sum, lesson) => sum + lesson.xpReward, 0), 0
  )

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/cursus" className="hover:text-primary-600">
          {t('cursus.title')}
        </Link>
        <span>/</span>
        <Link to={`/cursus/${cursus.id}`} className="hover:text-primary-600">
          {cursus.title}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{t('cursus.program')}</span>
      </div>

      {/* Title Card */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: `${cursus.color}20` }}
          >
            {cursus.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{cursus.title}</h1>
            <p className="text-gray-600 mt-1">{t('cursus.fullProgram')}</p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <span className="text-lg">📚</span>
                {cursus.modules.length} {t('cursus.modules')}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <span className="text-lg">📝</span>
                {cursus.progress.total} {t('cursus.lessons')}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <span className="text-lg">⏱</span>
                {Math.round(totalDuration / 60)}h {totalDuration % 60}min
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <span className="text-lg">⭐</span>
                {totalXp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules and Lessons */}
      <div className="space-y-6">
        {cursus.modules.map((module, moduleIndex) => (
          <div key={module.id} className="card">
            {/* Module Header */}
            <div className="flex items-start gap-4 pb-4 border-b">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{ backgroundColor: module.isLocked ? '#9ca3af' : module.color }}
              >
                {moduleIndex + 1}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${module.color}20` }}
              >
                {module.isLocked ? '🔒' : module.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
                  {module.isRequired && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                      {t('cursus.required')}
                    </span>
                  )}
                  {module.isLocked && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      🔒 {module.requiredXp} XP
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{module.lessonsCount} {t('cursus.lessons')}</span>
                  <span>⏱ {module.lessonsPreview.reduce((sum, l) => sum + l.duration, 0)} min</span>
                  <span>⭐ {module.lessonsPreview.reduce((sum, l) => sum + l.xpReward, 0)} XP</span>
                  {module.progress > 0 && (
                    <span style={{ color: module.color }}>{module.progress}% {t('cursus.completed')}</span>
                  )}
                </div>
              </div>
              {!module.isLocked && (
                <Link
                  to={`/modules/${module.id}`}
                  className="btn btn-sm"
                  style={{ backgroundColor: module.color, color: 'white' }}
                >
                  {module.progress === 100
                    ? t('modules.review')
                    : module.progress > 0
                    ? t('modules.continue')
                    : t('modules.start')}
                </Link>
              )}
            </div>

            {/* Lessons List */}
            <div className="mt-4 space-y-2">
              {module.lessonsPreview.map((lesson, lessonIndex) => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    lesson.completed ? 'bg-green-50' : 'bg-gray-50'
                  } ${module.isLocked ? 'opacity-60' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                      lesson.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {lesson.completed ? '✓' : lessonIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${lesson.completed ? 'text-green-700' : 'text-gray-700'}`}>
                      {lesson.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span>⏱</span> {lesson.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <span>⭐</span> {lesson.xpReward} XP
                    </span>
                  </div>
                  {!module.isLocked && (
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className={`text-xs px-3 py-1 rounded-full ${
                        lesson.completed
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      {lesson.completed ? t('modules.review') : t('modules.start')}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center pt-4">
        <Link
          to={`/cursus/${cursus.id}`}
          className="btn btn-secondary"
        >
          ← {t('cursus.backToCursus')}
        </Link>
      </div>
    </div>
  )
}
