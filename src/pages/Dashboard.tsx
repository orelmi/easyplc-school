import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { api } from '../lib/api'

interface ProgressData {
  user: {
    totalXp: number
    level: number
    streak: number
    xpForNextLevel: number
    xpProgress: number
  }
  overview: {
    completedLessons: number
    totalLessons: number
    percentage: number
  }
  moduleProgress: Array<{
    moduleId: string
    title: string
    icon: string
    completed: number
    total: number
    percentage: number
  }>
  recentActivity: Array<{
    lessonId: string
    lessonTitle: string
    moduleTitle: string
    score: number
    completedAt: string
  }>
}

export default function Dashboard() {
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getProgress().then(setProgress).finally(() => setLoading(false))
  }, [i18n.language])

  const getLocale = () => {
    switch (i18n.language) {
      case 'en': return 'en-US'
      case 'es': return 'es-ES'
      default: return 'fr-FR'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-slide-in">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">{t('dashboard.welcome', { username: user?.username })} ! 👋</h1>
        <p className="text-primary-100 mt-1">
          {progress?.overview.completedLessons === 0
            ? t('dashboard.startLearning')
            : t('dashboard.continueLearn')}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{progress?.user.totalXp}</div>
          <div className="text-sm text-gray-500">{t('dashboard.totalXp')}</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">{progress?.user.level}</div>
          <div className="text-sm text-gray-500">{t('leaderboard.level')}</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {progress?.overview.completedLessons}
          </div>
          <div className="text-sm text-gray-500">{t('dashboard.lessonsCompleted')}</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-500">
            {progress?.user.streak || 0} 🔥
          </div>
          <div className="text-sm text-gray-500">{t('dashboard.currentStreak')}</div>
        </div>
      </div>

      {/* Level progress */}
      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{t('dashboard.level', { level: (progress?.user.level || 1) + 1 })}</h3>
          <span className="text-sm text-gray-500">
            {progress?.user.xpForNextLevel} XP
          </span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progress?.user.xpProgress || 0}%` }}
          />
        </div>
      </div>

      {/* Module progress */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('dashboard.modulesProgress')}</h2>
          <Link to="/modules" className="text-primary-600 hover:underline text-sm font-medium">
            Voir tous les modules →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progress?.moduleProgress.map((module) => (
            <Link
              key={module.moduleId}
              to={`/modules/${module.moduleId}`}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{module.icon}</span>
                <h3 className="font-semibold">{module.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${module.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">
                  {module.completed}/{module.total}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      {progress?.recentActivity && progress.recentActivity.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">{t('dashboard.recentActivity')}</h2>
          <div className="card divide-y divide-gray-100">
            {progress.recentActivity.map((activity) => (
              <Link
                key={activity.lessonId}
                to={`/lessons/${activity.lessonId}`}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-gray-50 -mx-6 px-6"
              >
                <div>
                  <div className="font-medium">{activity.lessonTitle}</div>
                  <div className="text-sm text-gray-500">{activity.moduleTitle}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`badge ${
                      activity.score >= 80
                        ? 'bg-green-100 text-green-700'
                        : activity.score >= 50
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {activity.score}%
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(activity.completedAt).toLocaleDateString(getLocale())}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA if no lessons completed */}
      {progress?.overview.completedLessons === 0 && (
        <div className="card bg-primary-50 border-primary-200 text-center py-8">
          <h3 className="text-xl font-bold text-primary-800 mb-2">
            Commencez votre première leçon !
          </h3>
          <p className="text-primary-600 mb-4">
            Découvrez les bases de l'automatisme industriel
          </p>
          <Link to="/modules" className="btn btn-primary">
            Explorer les modules
          </Link>
        </div>
      )}
    </div>
  )
}
