import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
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
  lessonsCount: number
  completedLessons: number
  progress: number
  lessonsPreview: LessonPreview[]
}

export default function Modules() {
  const { t, i18n } = useTranslation()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
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
    setLoading(true)
    api.getModules().then(setModules).finally(() => setLoading(false))
  }, [i18n.language])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('modules.title')}</h1>
        <p className="text-gray-600 mt-1">
          Progressez étape par étape dans votre apprentissage de l'automatisme
        </p>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`card ${module.isLocked ? 'opacity-75' : ''} transition-all hover:shadow-md`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${module.color}20` }}
              >
                {module.isLocked ? '🔒' : module.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Module {module.order}: {module.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{module.description}</p>
                  </div>

                  {module.isLocked ? (
                    <div className="badge bg-gray-100 text-gray-600 whitespace-nowrap">
                      🔒 {module.requiredXp} XP requis
                    </div>
                  ) : module.progress === 100 ? (
                    <div className="badge bg-green-100 text-green-700">✓ {t('modules.completed')}</div>
                  ) : null}
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">
                      {module.completedLessons}/{module.lessonsCount > 1 ? t('modules.lessons', { count: module.lessonsCount }) : t('modules.lesson', { count: module.lessonsCount })}
                    </span>
                    <span className="font-medium" style={{ color: module.color }}>
                      {module.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${module.progress}%`,
                        backgroundColor: module.color,
                      }}
                    />
                  </div>
                </div>

                {/* Action button and preview toggle */}
                <div className="mt-4 flex items-center gap-3">
                  {module.isLocked ? (
                    <button disabled className="btn bg-gray-100 text-gray-400 cursor-not-allowed">
                      Module verrouillé
                    </button>
                  ) : (
                    <Link
                      to={`/modules/${module.id}`}
                      className="btn btn-primary"
                      style={{ backgroundColor: module.color }}
                    >
                      {module.progress === 0
                        ? 'Commencer'
                        : module.progress === 100
                        ? 'Revoir'
                        : 'Continuer'}
                    </Link>
                  )}

                  {module.lessonsPreview && module.lessonsPreview.length > 0 && (
                    <button
                      onClick={() => toggleModuleExpanded(module.id)}
                      className="btn bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-2"
                    >
                      <span>{expandedModules.has(module.id) ? '▼' : '▶'}</span>
                      <span>Voir les leçons</span>
                    </button>
                  )}
                </div>

                {/* Lessons preview (expandable) */}
                {expandedModules.has(module.id) && module.lessonsPreview && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Contenu du module ({module.lessonsPreview.length} leçons)
                    </h4>
                    <div className="space-y-2">
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
