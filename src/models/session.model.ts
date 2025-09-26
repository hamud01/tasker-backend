import { model, Schema } from 'mongoose'
import type { SessionDocument } from '@/types/session'
import { randomUUIDv7 } from 'bun'
import dayjs from 'dayjs'
import { createToken, decodeToken } from '@/services/jwt.service'


const sessionSchema = new Schema<SessionDocument>({
  id: {
    type: String,
    unique: true,
    default: randomUUIDv7('hex')
  },

  userId: {
    type: String,
    required: true
  },

  refreshToken: String,

  createdAt: {
    type: Number,
    default: dayjs().unix()
  },

  isExpired: {
    type: Boolean,
    default: false
  }
})


sessionSchema.pre('save', function(done) {
  if(this.isNew) {
    this.refreshToken = createToken(this.userId, 'refresh')
  }
  done()
})

sessionSchema.method('createAccessToken', async function() {
  const [userId, error] = decodeToken(this.refreshToken, 'refresh')
  if(error || userId === null) { 
    if(error  ===  'expired') this.isExpired = true
    await this.save()
    return '' 
  }
  if(userId) {
    return createToken(userId, 'access')
  }
})



export default model<SessionDocument>('sessions', sessionSchema)