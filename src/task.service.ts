import TaskModel from "./task.model";
import type { Task } from "./types";


export const getAllTasks = async (p: string, l?: string) => {
  const page = Number.isNaN(parseInt(p)) || parseInt(p) < 1 ? 1 : parseInt(p);
  
  let limit = Number.isNaN(parseInt(l ?? "")) ? 10 : parseInt(l ?? "10");
  limit = limit < 0 ? 10 : limit
  limit  = limit > 100? 100: limit
  
  const skip = (page -1) * limit

  const [tasks, total ] = await Promise.all([
    TaskModel.find()
    .skip(skip)
    .limit(limit === 0 ? 0: limit),
    TaskModel.countDocuments()
  ])

  return {
    page,
    limit: limit === 0 ? 'all' : limit,
    totalDocs: total,
    tasks
  }
}

export const createTask = async (title:string) => {
  const task = await TaskModel.create({ title })
  return task
}

export const updateTaskById = async (
  id:string, updates: Partial<Task>
) => {
  const task = await TaskModel.findOneAndUpdate(
    { id }, updates, { new:true }
  )

  return task
}

export const deleteTaskById = async (id:string) => {
  const result = await TaskModel.findOneAndDelete({ id })
  return result
}
