import type { RequestHandler } from "express";
import { createTask, deleteTaskById, getAllTasks, updateTaskById } from "../services/task.service";
import type { AuthenticatedRequest } from "../types";
import { BadRequestError, NotFoundError, UnathorizedError } from "@/httpError";

export const createTaskController: RequestHandler = async (req:AuthenticatedRequest, res) => {
  const {title} = req.body
  if(!title) throw new BadRequestError('undefined task title')

  const {userId} = req
  if(!userId) throw new UnathorizedError('invalid session')

  const task = await createTask(userId, title)
  res.json(task)
  
}

export const updateTaskController: RequestHandler = async (req, res) => {
    const { id } = req.query as Record<string, string>
    const { body } = req
    if(!id || !body) throw new BadRequestError(
      'Cannot update task, requires a identifier and updates data' 
    )

    const task = await updateTaskById(id , body)

    if(!task) throw new NotFoundError('Not found, cannot update non-existent Task')

    res.json(task)
}


export const deleteTaskController: RequestHandler = async (req, res) => {
    const {id} = req.query as Record<string, string>
    if(!id) throw new BadRequestError('Cannot delete task, undefined id')

    const task = await deleteTaskById(id)
    if(!task) throw new NotFoundError('Not found, cannot delete non-existent Task')

    return res.status(204).json({
      deletedTask: task,
    })

}

export const getAllTasksController: RequestHandler = async (req:AuthenticatedRequest, res) => {
  const {page, limit} = req.query as Record<'page' | 'limit', string>

  const result = await getAllTasks(req.userId ?? '', page, limit)
  res.json(result)
}