import { UnathorizedError } from "@/httpError";
import { createSession, refreshSession } from "@/services/session.service";
import { createSessionCookies } from "@/services/sessionCookie.service";
import type { AuthenticatedRequest } from "@/types";
import type { RequestHandler } from "express";

export const refreshSessionController: RequestHandler = async (req:AuthenticatedRequest, res, next) => {
  if(!req.sessionId) {
    throw new UnathorizedError('no session id provided')
  }

  res.cookie('access-token', await refreshSession(req.sessionId), {
    signed: true,
    httpOnly: true,
    sameSite: true
  })

  next()
}

export const createSessionController: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {

  const { userId } = req
  if(!userId) throw new UnathorizedError()
  const credential = await createSession(req.userId as string)
  createSessionCookies({
    response: res,
    ...credential
  })
} 