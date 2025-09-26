import type { RequestHandler } from "express";
import { createUser, validateUser } from "@/services/user.service";
import { createToken } from "@/services/jwt.service";
import { BadRequestError } from "@/httpError";
import type { AuthenticatedRequest } from "@/types";

export const signInController:RequestHandler = async (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password) throw new BadRequestError()

    const {sessionId, accessToken} = await validateUser({username, password})

    res.cookie('session-id', sessionId,  {
      httpOnly: true,
      sameSite: true,
      signed: true
    })

    res.cookie('access-token', accessToken, {
      httpOnly: true,
      sameSite: true,
      signed: true
    })

} 


export const signUpController:RequestHandler = async (req: AuthenticatedRequest, res, next) => {
  const {id} = await createUser(req.body)
  req.userId = id
} 