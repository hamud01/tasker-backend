import {Router} from 'express'
import { createTaskController, deleteTaskController, getAllTasksController, updateTaskController } from './task.controller'

const v1 = Router()

v1.get('/task/all', getAllTasksController)
v1.post('/task/create', createTaskController)
v1.put('/task/update', updateTaskController)
v1.delete('/task/delete', deleteTaskController)

export default v1