import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "../types";
import { decodeToken } from "../services/jwt.service";
import { UnathorizedError } from "@/httpError";

export const authMiddleware: RequestHandler = async (req:AuthenticatedRequest, res, next) => {
  const sessionId = req.signedCookies['session-id']
  const accessToken = req.signedCookies['access-token']
  
  if(!sessionId || !accessToken) { 
    throw new UnathorizedError('No session credential has been provided')
  }     
  
  const [userId, error] = decodeToken(accessToken, 'access')

  if(error === "expired") {
    req.userId = userId ?? ''
    req.sessionId = sessionId
    return res.redirect('/user/refresh')
  }

  if(error) throw new UnathorizedError('invalid session')

  next()  
}