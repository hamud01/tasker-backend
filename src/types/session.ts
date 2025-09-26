import type { Response } from "express"

export interface Session {
  id: string
  userId: string
  refreshToken: string
  createdAt: number
  isExpired: boolean
}

export interface SessionMethods {
  createAccessToken(): Promise<string>
}

export interface SessionDocument extends Session, SessionMethods, Document {}

export interface CreateSessionCookieOptions {
  sessionId: string
  accessToken: string
  response: Response
}