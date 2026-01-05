import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Modules from './pages/Modules'
import ModuleDetail from './pages/ModuleDetail'
import Lesson from './pages/Lesson'
import Rewards from './pages/Rewards'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import CursusSelect from './pages/CursusSelect'
import CursusDetail from './pages/CursusDetail'
import CursusProgram from './pages/CursusProgram'
import GCodeSimulator from './pages/GCodeSimulator'
import PLCSimulator from './pages/PLCSimulator'
import GRAFCETEditor from './pages/GRAFCETEditor'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cursus" element={<CursusSelect />} />
        <Route path="cursus/:id" element={<CursusDetail />} />
        <Route path="cursus/:id/program" element={<CursusProgram />} />
        <Route path="modules" element={<Modules />} />
        <Route path="modules/:id" element={<ModuleDetail />} />
        <Route path="lessons/:id" element={<Lesson />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="simulator/gcode" element={<GCodeSimulator />} />
        <Route path="simulator/plc" element={<PLCSimulator />} />
        <Route path="simulator/grafcet" element={<GRAFCETEditor />} />
      </Route>
    </Routes>
  )
}
