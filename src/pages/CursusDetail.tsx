import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'

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

export default function CursusDetail() {
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
                <span className="text-gray-600">
                  {cursus.progress.completed}/{cursus.progress.total} {t('cursus.lessonsCompleted')}
                </span>
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
                      {module.completedLessons}/{module.lessonsCount}
                    </div>
                    <div className="text-gray-400">{t('cursus.lessons')}</div>
                  </div>

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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
