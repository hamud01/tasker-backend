import {Router} from 'express'
import { createTaskController, deleteTaskController, getAllTasksController, updateTaskController } from '@/controllers/task.controller'
import { authMiddleware } from '@/middlewares/auth.middlware'
import {signInController, signUpController} from '@/controllers/user.controller'
import { createSessionController } from './controllers/session.controller'

const v1 = Router()

// USER ROUTES
v1.post('/user/signup', [signUpController, createSessionController])
v1.post('/user/signin', [signInController, createSessionController])

// TASK ROUTES
v1.get('/task/all', [authMiddleware, getAllTasksController])
v1.post('/task/create', [authMiddleware, createTaskController])
v1.put('/task/update', [authMiddleware, updateTaskController])
v1.delete('/task/delete', [authMiddleware, deleteTaskController])

export default v1