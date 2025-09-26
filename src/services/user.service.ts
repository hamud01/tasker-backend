import type { CreateUserInput, ValidateUserInput } from "@/types";
import userModel from "@/models/user.model";
import { createToken } from "./jwt.service";
import { createSession } from "./session.service";
import { NotFoundError, UnathorizedError } from "@/httpError";


export const createUser = async (data:CreateUserInput) => {
  const user = await userModel.create(data)
  return user
}

export const validateUser =  async ({username, password}: ValidateUserInput) => {
  const user = await userModel.findOne({username})
  
  if(!user) throw new NotFoundError('user not exists')
  const passwordIsValid = await user.validatePassword(password)
  
  if(!passwordIsValid) throw new UnathorizedError('password or username is invalid')

  return user.id
}


