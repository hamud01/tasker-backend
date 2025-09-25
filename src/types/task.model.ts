import type { TaskDocument } from '@/types'
import { randomUUIDv7 } from 'bun'
import { model, Schema } from 'mongoose'

const taskSchema = new Schema<TaskDocument>({
  id: {
    type: String,
    default: randomUUIDv7('hex')
  },

  title: {
    type: String,
    required: true,
    unique: true
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  isArchived: {
    type: Boolean,
    default: false
  }
})


export default model('tasks', taskSchema)