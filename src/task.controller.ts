import type { RequestHandler } from "express";
import { createTask, deleteTaskById, getAllTasks, updateTaskById } from "./task.service";
import type { AuthenticatedRequest } from "./types";

export const createTaskController: RequestHandler = async (req:AuthenticatedRequest, res, next) => {
  try {
    const {title} = req.body
    if(!title) return res.status(400).json({
      error: 'Cannot create task without title.' 
    })

    const {userId} = req
    if(!userId) return res.sendStatus(403)

    const task = await createTask(userId, title)
    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const updateTaskController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query as Record<string, string>
    const { body } = req
  
    if(!id || !body) return res.status(400).json({
      error: 'Cannot update task, requires a identifier and updates data' 
    })

    const task = await updateTaskById(id , body)
    if(!task) return res.status(404).json({
      message: 'Not found, cannot update non-existent Task'
    })

    res.json(task)
  } catch (error) {
    next(error)
  }
}


export const deleteTaskController: RequestHandler = async (req, res, next) => {
  try {
    const {id} = req.query as Record<string, string>
    if(!id) return res.status(400).json({
      error: 'Cannot delete task, undefined id' 
    })
    const task = await deleteTaskById(id)
    if(!task)  return res.status(404).json({
      message: 'Not found, cannot delete non-existent Task'
    })

    return res.status(204).json({
      deletedTask: task,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllTasksController: RequestHandler = async (req:AuthenticatedRequest, res, next) => {
  try {
    const {page, limit} = req.query as Record<'page' | 'limit', string>

    const {userId} = req
    if(!userId) return res.sendStatus(403)
    const result = await getAllTasks(userId, page, limit)
    res.json(result)
  } catch (error) {
    next(error)
  } 
}