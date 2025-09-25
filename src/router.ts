import {Router} from 'express'
import { createTaskController, deleteTaskController, getAllTasksController, updateTaskController } from './task.controller'
import { authMiddleware } from './auth.moddlware'
import {signInController, signUpController} from '@/user.controller'

const v1 = Router()

// USER ROUTES
v1.post('/user/signup', signUpController)
v1.post('/user/signin', signInController)

// TASK ROUTES
v1.get('/task/all', [authMiddleware, getAllTasksController])
v1.post('/task/create', [authMiddleware, createTaskController])
v1.put('/task/update', [authMiddleware, updateTaskController])
v1.delete('/task/delete', [authMiddleware, deleteTaskController])

export default v1