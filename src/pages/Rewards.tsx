import { useEffect, useState } from 'react'
import { api } from '../lib/api'

interface Reward {
  id: string
  name: string
  description: string
  icon: string
  type: string
  xpBonus: number
  earned: boolean
  earnedAt: string | null
}

interface RewardsData {
  summary: {
    total: number
    earned: number
    percentage: number
  }
  badges: Reward[]
  trophies: Reward[]
  certificates: Reward[]
}

export default function Rewards() {
  const [data, setData] = useState<RewardsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getRewards().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!data) return null

  const RewardCard = ({ reward }: { reward: Reward }) => (
    <div
      className={`card text-center transition-all ${
        reward.earned
          ? 'bg-gradient-to-b from-yellow-50 to-white border-yellow-200'
          : 'bg-gray-50 opacity-60'
      }`}
    >
      <div className={`text-5xl mb-3 ${reward.earned ? '' : 'grayscale'}`}>
        {reward.icon}
      </div>
      <h3 className="font-bold">{reward.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
      {reward.xpBonus > 0 && (
        <div className="text-sm text-primary-600 font-medium mt-2">+{reward.xpBonus} XP</div>
      )}
      {reward.earned && reward.earnedAt && (
        <div className="text-xs text-gray-400 mt-2">
          Obtenu le {new Date(reward.earnedAt).toLocaleDateString('fr-FR')}
        </div>
      )}
      {!reward.earned && (
        <div className="text-xs text-gray-400 mt-2">🔒 Non débloqué</div>
      )}
    </div>
  )

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Récompenses</h1>
        <p className="text-gray-600 mt-1">
          Collectionnez des badges et trophées en progressant dans votre apprentissage
        </p>
      </div>

      {/* Summary */}
      <div className="card bg-gradient-to-r from-yellow-100 to-orange-100 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-yellow-800">
              {data.summary.earned}/{data.summary.total} récompenses
            </h2>
            <p className="text-yellow-700">
              Vous avez débloqué {data.summary.percentage}% des récompenses
            </p>
          </div>
          <div className="text-6xl">🏆</div>
        </div>
        <div className="mt-4 h-3 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            style={{ width: `${data.summary.percentage}%` }}
          />
        </div>
      </div>

      {/* Badges */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎖️</span>
          <h2 className="text-xl font-bold">Badges</h2>
          <span className="text-sm text-gray-500">
            ({data.badges.filter((b) => b.earned).length}/{data.badges.length})
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.badges.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </section>

      {/* Trophies */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏆</span>
          <h2 className="text-xl font-bold">Trophées</h2>
          <span className="text-sm text-gray-500">
            ({data.trophies.filter((t) => t.earned).length}/{data.trophies.length})
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.trophies.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </section>

      {/* Certificates */}
      {data.certificates.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📜</span>
            <h2 className="text-xl font-bold">Certificats</h2>
            <span className="text-sm text-gray-500">
              ({data.certificates.filter((c) => c.earned).length}/{data.certificates.length})
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.certificates.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
