import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper to find or create user from OAuth profile
async function findOrCreateUser(
  provider: string,
  profile: {
    id: string
    emails?: { value: string }[]
    displayName?: string
    photos?: { value: string }[]
  }
) {
  const email = profile.emails?.[0]?.value
  const providerAccountId = profile.id
  const displayName = profile.displayName || email?.split('@')[0] || `user_${Date.now()}`
  const avatar = profile.photos?.[0]?.value

  // Check if account already exists
  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    include: { user: true },
  })

  if (existingAccount) {
    return existingAccount.user
  }

  // Check if user with this email exists
  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      // Link account to existing user
      await prisma.account.create({
        data: {
          userId: existingUser.id,
          provider,
          providerAccountId,
        },
      })
      return existingUser
    }
  }

  // Create new user with account
  let username = displayName.toLowerCase().replace(/[^a-z0-9]/g, '_')

  // Ensure username is unique
  let suffix = 0
  let finalUsername = username
  while (await prisma.user.findUnique({ where: { username: finalUsername } })) {
    suffix++
    finalUsername = `${username}_${suffix}`
  }

  const user = await prisma.user.create({
    data: {
      email: email || `${provider}_${providerAccountId}@oauth.local`,
      username: finalUsername,
      password: null,
      avatar,
      accounts: {
        create: {
          provider,
          providerAccountId,
        },
      },
    },
  })

  return user
}

export function configurePassport() {
  passport.serializeUser((user: any, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })

  // Google Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
          scope: ['profile', 'email'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreateUser('google', profile)
            done(null, user)
          } catch (error) {
            done(error as Error, undefined)
          }
        }
      )
    )
  }

  // Facebook Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/api/auth/facebook/callback',
          profileFields: ['id', 'emails', 'displayName', 'photos'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreateUser('facebook', profile)
            done(null, user)
          } catch (error) {
            done(error as Error, undefined)
          }
        }
      )
    )
  }

  // Microsoft Strategy
  if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    passport.use(
      new MicrosoftStrategy(
        {
          clientID: process.env.MICROSOFT_CLIENT_ID,
          clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
          callbackURL: process.env.MICROSOFT_CALLBACK_URL || '/api/auth/microsoft/callback',
          scope: ['user.read'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await findOrCreateUser('microsoft', profile)
            done(null, user)
          } catch (error) {
            done(error as Error, undefined)
          }
        }
      )
    )
  }

  return passport
}
