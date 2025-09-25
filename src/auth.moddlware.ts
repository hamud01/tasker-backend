import type { RequestHandler } from "express";
import type { AuthenticatedRequest } from "./types";
import { decodeToken } from "./jwt.service";

export const authMiddleware: RequestHandler = (req:AuthenticatedRequest, res, next) => {
  const authHeader = req.headers['authorization']
  if(!authHeader) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  if(!token) return res.sendStatus(401)

  // FIXME: should implement session auth features
  const [userId, error] = decodeToken(token, 'refresh')
  if(userId === null || error) return res.status(401).json({
    message: error ? error : 'authentification failure'
  })

  req.userId = userId as string
  next()  
}