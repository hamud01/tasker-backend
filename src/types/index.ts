import { extend } from "dayjs"
import type { Request } from "express"
import type { Document, ObjectId } from "mongoose"

export interface Task {
  id: string
  title: string
  isArchived: boolean
  isCompleted: boolean
  userId: string
}

export type TaskDocument = Task & Document

export interface User {
  username: string
  password: string
  firstName: string
  lastName: string
  fullName: string
  createdAt: number
}

export interface UserMethods {
  validatePassword(password:string): Promise<boolean>
}

export type CreateUserInput = Pick<User, 
|
'firstName' | 
'lastName'  | 
'username'  | 
'password'
>

export type ValidateUserInput = Pick<User, 
|
'username' | 
'password'
>


export interface UserDocument extends User, UserMethods, Document {}


export interface AuthenticatedRequest extends Request {
  userId?: string
  sessionId?:string
}