declare module 'passport-microsoft' {
  import { Strategy as PassportStrategy } from 'passport'

  interface StrategyOptions {
    clientID: string
    clientSecret: string
    callbackURL: string
    scope?: string[]
    tenant?: string
  }

  interface Profile {
    id: string
    displayName?: string
    emails?: { value: string }[]
    photos?: { value: string }[]
    provider: string
    _json?: any
  }

  type VerifyCallback = (err: Error | null, user?: any, info?: any) => void

  type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => void

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyFunction)
  }
}
