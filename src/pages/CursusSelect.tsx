import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'

interface Cursus {
  id: string
  title: string
  description: string
  icon: string
  color: string
  modulesCount: number
  lessonsCount: number
  completedLessons: number
  progress: number
}

export default function CursusSelect() {
  const { t, i18n } = useTranslation()
  const [cursusList, setCursusList] = useState<Cursus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getCursus().then(setCursusList).finally(() => setLoading(false))
  }, [i18n.language])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('cursus.title')}</h1>
        <p className="text-gray-600 mt-1">{t('cursus.subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cursusList.map((cursus) => (
          <Link
            key={cursus.id}
            to={`/cursus/${cursus.id}`}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${cursus.color}20` }}
              >
                {cursus.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-gray-900">{cursus.title}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{cursus.description}</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>{cursus.modulesCount} {t('cursus.modules')}</span>
                  <span>{cursus.lessonsCount} {t('cursus.lessons')}</span>
                </div>

                {cursus.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{t('cursus.progress')}</span>
                      <span className="font-medium" style={{ color: cursus.color }}>
                        {cursus.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${cursus.progress}%`,
                          backgroundColor: cursus.color,
                        }}
                      />
                    </div>
                  </div>
                )}

                {cursus.progress === 0 && (
                  <div className="mt-3">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${cursus.color}20`,
                        color: cursus.color,
                      }}
                    >
                      {t('cursus.startNow')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-2">{t('cursus.sharedModules')}</h3>
        <p className="text-gray-600 text-sm">
          {t('cursus.sharedModulesDescription')}
        </p>
      </div>
    </div>
  )
}
