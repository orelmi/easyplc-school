import { useAuthStore } from '../store/authStore'
import i18n from '../i18n'

const API_URL = '/api'

function withLang(endpoint: string): string {
  const lang = i18n.language || 'fr'
  const separator = endpoint.includes('?') ? '&' : '?'
  return `${endpoint}${separator}lang=${lang}`
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    useAuthStore.getState().logout()
    throw new Error('Session expirée')
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Une erreur est survenue')
  }

  return data
}

export const api = {
  // Auth
  register: (email: string, username: string, password: string) =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    }),

  login: (email: string, password: string) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => fetchWithAuth('/auth/me'),

  // Modules
  getModules: () => fetchWithAuth(withLang('/modules')),
  getModule: (id: string) => fetchWithAuth(withLang(`/modules/${id}`)),

  // Lessons
  getLesson: (id: string) => fetchWithAuth(withLang(`/lessons/${id}`)),
  submitLesson: (id: string, answers: Record<string, number>, timeSpent: number) =>
    fetchWithAuth(withLang(`/lessons/${id}/submit`), {
      method: 'POST',
      body: JSON.stringify({ answers, timeSpent }),
    }),

  // Exercises
  getExercise: (id: string) => fetchWithAuth(withLang(`/exercises/${id}`)),
  submitExercise: (id: string, data: { answer: unknown }) =>
    fetchWithAuth(withLang(`/exercises/${id}/submit`), {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getExerciseHint: (id: string, hintIndex: number) =>
    fetchWithAuth(withLang(`/exercises/${id}/hint/${hintIndex}`)),

  // Progress
  getProgress: () => fetchWithAuth(withLang('/progress')),

  // Rewards
  getRewards: () => fetchWithAuth(withLang('/rewards')),

  // Leaderboard
  getLeaderboard: (period?: string) =>
    fetchWithAuth(`/leaderboard${period ? `?period=${period}` : ''}`),

  // User
  getProfile: () => fetchWithAuth('/users/profile'),
  updateProfile: (data: { username?: string; avatar?: string }) =>
    fetchWithAuth('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Cursus
  getCursus: () => fetchWithAuth(withLang('/cursus')),
  getCursusById: (id: string) => fetchWithAuth(withLang(`/cursus/${id}`)),
}
