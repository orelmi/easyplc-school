import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '../lib/api'

interface LeaderboardUser {
  rank: number
  id: string
  username: string
  avatar: string | null
  totalXp: number
  level: number
  streak: number
  completedLessons: number
  rewardsCount: number
  isCurrentUser: boolean
}

interface LeaderboardData {
  leaderboard: LeaderboardUser[]
  currentUser: LeaderboardUser | null
  totalUsers: number
}

export default function Leaderboard() {
  const { t } = useTranslation()
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [period, setPeriod] = useState<'all' | 'month' | 'week'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getLeaderboard(period).then(setData).finally(() => setLoading(false))
  }, [period])

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return null
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300'
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300'
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('leaderboard.title')}</h1>
          <p className="text-gray-600 mt-1">
            {t('leaderboard.totalLearners', { count: data.totalUsers })}
          </p>
        </div>

        {/* Period filter */}
        <div className="flex gap-2">
          {(['all', 'month', 'week'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('leaderboard.period.' + p)}
            </button>
          ))}
        </div>
      </div>

      {/* Current user position (if not in top 10) */}
      {data.currentUser && data.currentUser.rank > 10 && (
        <div className="card bg-primary-50 border-primary-200 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-primary-600">#{data.currentUser.rank}</div>
            <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
              {data.currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="font-bold">{data.currentUser.username} ({t('leaderboard.you')})</div>
              <div className="text-sm text-gray-500">
                {data.currentUser.totalXp} XP • {t('leaderboard.level')} {data.currentUser.level}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 0, 2].map((podiumIndex) => {
          const user = data.leaderboard[podiumIndex]
          if (!user) return <div key={podiumIndex} />

          const heights = ['h-32', 'h-40', 'h-28']
          return (
            <div key={user.id} className="flex flex-col items-center">
              <div className="text-4xl mb-2">{getRankEmoji(user.rank)}</div>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  user.rank === 1
                    ? 'bg-yellow-200 text-yellow-800'
                    : user.rank === 2
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-orange-200 text-orange-800'
                }`}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-center mt-2">
                <div className={`font-bold ${user.isCurrentUser ? 'text-primary-600' : ''}`}>
                  {user.username}
                  {user.isCurrentUser && ` (${t("leaderboard.you")})`}
                </div>
                <div className="text-sm text-gray-500">{user.totalXp} XP</div>
              </div>
              <div
                className={`${heights[podiumIndex]} w-full mt-2 rounded-t-lg ${
                  user.rank === 1
                    ? 'bg-yellow-400'
                    : user.rank === 2
                    ? 'bg-gray-400'
                    : 'bg-orange-400'
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Rest of leaderboard */}
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 pl-2">{t('leaderboard.rank')}</th>
              <th className="pb-3">{t('leaderboard.user')}</th>
              <th className="pb-3 text-right">XP</th>
              <th className="pb-3 text-right hidden sm:table-cell">{t('leaderboard.level')}</th>
              <th className="pb-3 text-right hidden md:table-cell">{t('leaderboard.lessons')}</th>
              <th className="pb-3 text-right hidden md:table-cell">{t('leaderboard.streak')}</th>
            </tr>
          </thead>
          <tbody>
            {data.leaderboard.map((user) => (
              <tr
                key={user.id}
                className={`border-b last:border-0 ${
                  user.isCurrentUser ? 'bg-primary-50' : ''
                } ${getRankStyle(user.rank)}`}
              >
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-2">
                    {getRankEmoji(user.rank) || (
                      <span className="font-bold text-gray-500">#{user.rank}</span>
                    )}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        user.isCurrentUser
                          ? 'bg-primary-200 text-primary-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={`font-medium ${user.isCurrentUser ? 'text-primary-700' : ''}`}>
                        {user.username}
                        {user.isCurrentUser && ` (${t("leaderboard.you")})`}
                      </div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {t('leaderboard.level')} {user.level}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right font-bold text-primary-600">{user.totalXp}</td>
                <td className="py-4 text-right hidden sm:table-cell">{user.level}</td>
                <td className="py-4 text-right hidden md:table-cell">{user.completedLessons}</td>
                <td className="py-4 text-right hidden md:table-cell">
                  {user.streak > 0 && (
                    <span className="text-orange-500">🔥 {user.streak}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
