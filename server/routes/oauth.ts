import { Router, Request, Response } from 'express'
import passport from 'passport'
import { generateToken } from '../middleware/auth.js'

const router = Router()

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Helper to handle OAuth callback
function handleOAuthCallback(req: Request, res: Response) {
  const user = req.user as any
  if (!user) {
    return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`)
  }

  const token = generateToken(user.id)
  // Redirect to frontend with token
  res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`)
}

// Get available OAuth providers
router.get('/providers', (_req: Request, res: Response) => {
  const providers = []

  if (process.env.GOOGLE_CLIENT_ID) {
    providers.push({ id: 'google', name: 'Google', icon: 'google' })
  }
  if (process.env.FACEBOOK_APP_ID) {
    providers.push({ id: 'facebook', name: 'Facebook', icon: 'facebook' })
  }
  if (process.env.MICROSOFT_CLIENT_ID) {
    providers.push({ id: 'microsoft', name: 'Microsoft', icon: 'microsoft' })
  }

  res.json({ providers })
})

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_URL}/login?error=google_failed` }),
  handleOAuthCallback
)

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: `${FRONTEND_URL}/login?error=facebook_failed` }),
  handleOAuthCallback
)

// Microsoft OAuth
router.get('/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }))

router.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', { session: false, failureRedirect: `${FRONTEND_URL}/login?error=microsoft_failed` }),
  handleOAuthCallback
)

export default router
