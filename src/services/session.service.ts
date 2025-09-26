import sessionModel from "@/models/session.model"

export const createSession = async (userId:string) => {
  const session = await sessionModel.create({userId})
  return {
    accessToken: await session.createAccessToken(),
    sessionId: session.id
  }
}


export const removeSessionById = async (id:string) => {
  await sessionModel.deleteOne({id})
}


export const refreshSession = async (id:string) => {
  const session = await sessionModel.findOne({id})
  if(!session) return null
  if(session.isExpired) await removeSessionById(id)  
  const accessToken = await session.createAccessToken()
  return accessToken ? accessToken : null
}