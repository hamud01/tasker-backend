import type { CreateSessionCookieOptions } from "@/types/session";


export const createSessionCookies = ({
  sessionId,
  accessToken,
  response
}:CreateSessionCookieOptions) => {

  const sessionOptions = {
    signed: true,
    httpOnly: true,
    secure: true,
    sameSit: true
  }

  response.cookie('session-id', sessionId, sessionOptions)
  response.cookie('access-token', accessToken, sessionOptions)
}