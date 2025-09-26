import { JsonWebTokenError, sign, TokenExpiredError, verify } from 'jsonwebtoken'
import type { JwtType, JwtErrorType, JwtDecodeResult } from '@/types/jwt'
import config from '@/config'
import dayjs from 'dayjs'

export const createToken = (sub:string, type: JwtType): string => {
  const duration = config.token[type].duration as [number, 'h' |'d']
  return sign(
    {
      sub,
      iat: dayjs().unix(),
      exp: dayjs().add(...duration).unix(),
    }, config.token[type].secret
  )
}

export const decodeToken = (token:string, type: JwtType): JwtDecodeResult => {
  try {
    const { sub } = verify(token, config.token[type].secret)
    if(!sub) return [null, 'unknown']
    return [sub as string, null]
  } catch (error) {
    if(error instanceof TokenExpiredError) {
      return [null, 'expired']
    }
    if(error instanceof JsonWebTokenError) {
      return [null, 'invalid']
    }
    return [null, 'unknown']
  }
}