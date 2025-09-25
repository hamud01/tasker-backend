import type { RequestHandler } from "express";
import { createUser, validateUser } from "./user.service";
import { createToken } from "./jwt.service";

export const signInController:RequestHandler = async (req, res, next) => {
  try {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({
      error: 'Invalid credentials'
    })

    const [token, error] = await validateUser({username, password})
    if(error) res.status(401).json({ error: error })
    res.json(token)

  } catch (error) {
    return next(error)
  }
} 


export const signUpController:RequestHandler = async (req, res, next) => {
  try {
    const {id} = await createUser(req.body)
    // FIXME: Replace that trash with session features
    res.json(
      createToken(id, 'refresh')
    )
  } catch (error) {
    return next(error)
  }
} 