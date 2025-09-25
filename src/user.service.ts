import type { CreateUserInput, ValidateUserInput } from "@/types";
import userModel from "./user.model";
import { createToken } from "./jwt.service";


export const createUser = async (data:CreateUserInput) => {
  const user = await userModel.create(data)
  return user
}

export const validateUser =  async ({username, password}: ValidateUserInput) => {
  const user = await userModel.findOne({username})
  if(!user) return [null, 'User not found']
  const passwordIsValid = await user.validatePassword(password)
  if(!passwordIsValid) return [null, 'username and password not match']

  //FIXME: should be remplaced by real session
  return [createToken(user.id, 'refresh') , null]
}


