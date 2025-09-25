import { Schema, model } from 'mongoose'
import type { UserDocument } from "@/types";
import { randomUUIDv7 } from 'bun';
import { hash, genSalt, compare } from 'bcrypt' 
import dayjs from 'dayjs';

const userSchema = new Schema<UserDocument>({
  id: {
    type: String,
    unique: true,
    default: randomUUIDv7()
  },

  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    unique: true,
    required: true
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true
  },
  
  fullName: String,
  
  createdAt: {
    type: Number,
    default: dayjs().unix()
  }
})

userSchema.pre('save', async function() {
  if(this.isModified(['firstName', 'lastName'])) {
    this.fullName = `${this.firstName} ${this.lastName}`
  }
  if(this.isModified('password')) {
    this.password = await hash(this.password, await genSalt(10))
  }
})

userSchema.method('validatePassword', 
async function (password:string) {
  return await compare(password, this.password)  
})

export default model<UserDocument>('users', userSchema)