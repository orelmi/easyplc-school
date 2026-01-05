import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import moduleRoutes from './routes/modules.js'
import lessonRoutes from './routes/lessons.js'
import progressRoutes from './routes/progress.js'
import rewardRoutes from './routes/rewards.js'
import leaderboardRoutes from './routes/leaderboard.js'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

app.use(cors())
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

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

export { prisma }
