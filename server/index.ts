import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import moduleRoutes from './routes/modules.js'
import lessonRoutes from './routes/lessons.js'
import progressRoutes from './routes/progress.js'
import rewardRoutes from './routes/rewards.js'
import leaderboardRoutes from './routes/leaderboard.js'
import cursusRoutes from './routes/cursus.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production'
    ? (process.env.CORS_ORIGINS?.split(',') || [])
    : '*',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

// Make prisma available in routes
app.locals.prisma = prisma

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/modules', moduleRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/rewards', rewardRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/cursus', cursusRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve static files in production
if (NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client')

  // Serve static assets
  app.use(express.static(clientPath))

  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (${NODE_ENV})`)
})

export { prisma }
