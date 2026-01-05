import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { api } from '../lib/api'

interface ProfileData {
  id: string
  email: string
  username: string
  avatar: string | null
  totalXp: number
  level: number
  streak: number
  createdAt: string
  stats: {
    completedLessons: number
    totalTimeSpent: number
    averageScore: number
    rewardsCount: number
  }
  rewards: Array<{
    reward: {
      id: string
      name: string
      icon: string
    }
    earnedAt: string
  }>
}

export default function Profile() {
  const { user, updateUser } = useAuthStore()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getProfile().then(setProfile).finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (!newUsername.trim()) return

    setSaving(true)
    try {
      const updated = await api.updateProfile({ username: newUsername })
      updateUser({ username: updated.username })
      setProfile((prev) => prev ? { ...prev, username: updated.username } : null)
      setEditing(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
    } finally {
      setSaving(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}min`
    return `${minutes} min`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="max-w-3xl mx-auto animate-slide-in">
      {/* Profile header */}
      <div className="card mb-8">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-4xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1">
            {editing ? (
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="input flex-1"
                  placeholder="Nouveau nom d'utilisateur"
                />
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? '...' : 'Sauver'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <button
                  onClick={() => {
                    setNewUsername(profile.username)
                    setEditing(true)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✏️
                </button>
              </div>
            )}
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              Membre depuis le {new Date(profile.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>

          {/* Level badge */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.level}
            </div>
            <div className="text-sm text-gray-500 mt-1">Niveau</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{profile.totalXp}</div>
          <div className="text-sm text-gray-500">Points XP</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {profile.stats.completedLessons}
          </div>
          <div className="text-sm text-gray-500">Leçons terminées</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">
            {profile.stats.averageScore}%
          </div>
          <div className="text-sm text-gray-500">Score moyen</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-500">
            {profile.streak} 🔥
          </div>
          <div className="text-sm text-gray-500">Jours consécutifs</div>
        </div>
      </div>

      {/* Time spent */}
      <div className="card mb-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">⏱️</span>
          <div>
            <div className="text-2xl font-bold">{formatTime(profile.stats.totalTimeSpent)}</div>
            <div className="text-gray-500">Temps total d'apprentissage</div>
          </div>
        </div>
      </div>

      {/* Recent rewards */}
      {profile.rewards.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Récompenses récentes</h2>
          <div className="flex flex-wrap gap-4">
            {profile.rewards.slice(0, 8).map((r) => (
              <div
                key={r.reward.id}
                className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full"
              >
                <span className="text-2xl">{r.reward.icon}</span>
                <span className="font-medium">{r.reward.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
