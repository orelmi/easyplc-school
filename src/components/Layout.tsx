import { useState, useRef, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import LanguageSelector from './LanguageSelector'

export default function Layout() {
  const { t } = useTranslation()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [simulatorMenuOpen, setSimulatorMenuOpen] = useState(false)
  const simulatorMenuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (simulatorMenuRef.current && !simulatorMenuRef.current.contains(event.target as Node)) {
        setSimulatorMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: '📊' },
    { to: '/cursus', label: t('nav.cursus'), icon: '🎓' },
    { to: '/modules', label: t('nav.modules'), icon: '📚' },
    { to: '/rewards', label: t('nav.rewards'), icon: '🏆' },
    { to: '/leaderboard', label: t('nav.leaderboard'), icon: '🥇' },
  ]

  const simulatorItems = [
    { to: '/simulator/plc', label: t('nav.plcSimulator', 'PLC / LADDER'), icon: '⚡' },
    { to: '/simulator/gcode', label: t('nav.gcodeSimulator', 'G-Code / CNC'), icon: '🔧' },
  ]

  const isSimulatorActive = location.pathname.startsWith('/simulator')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-bold text-xl text-primary-600">EasyPLC School</span>
            </NavLink>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
              {/* Simulators dropdown */}
              <div className="relative" ref={simulatorMenuRef}>
                <button
                  onClick={() => setSimulatorMenuOpen(!simulatorMenuOpen)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isSimulatorActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">🖥️</span>
                  {t('nav.simulators', 'Simulateurs')}
                  <svg className={`w-4 h-4 transition-transform ${simulatorMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {simulatorMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-50">
                    {simulatorItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSimulatorMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* User menu */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <LanguageSelector />

              {/* XP Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-full">
                <span className="text-primary-600 font-bold">{user?.totalXp} XP</span>
                <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Niv. {user?.level}
                </span>
              </div>

              {/* Streak */}
              {user?.streak && user.streak > 0 && (
                <div className="hidden sm:flex items-center gap-1 text-orange-500">
                  <span>🔥</span>
                  <span className="font-bold">{user.streak}</span>
                </div>
              )}

              {/* Profile dropdown */}
              <div className="relative group">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user?.username}</span>
                </NavLink>
              </div>

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet navigation */}
        <nav className="lg:hidden border-t border-gray-100 px-4 py-2 flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          {simulatorItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
