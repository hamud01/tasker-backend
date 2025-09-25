import type { Document } from "mongoose"
export interface Task {
  id: string
  title: string
  isArchived: boolean
  isCompleted: boolean
}


export type TaskDocument = Task & Document