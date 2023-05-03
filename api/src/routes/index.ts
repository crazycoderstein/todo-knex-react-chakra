import express from 'express'
import * as todos from '../controllers'

const router = express.Router()

router.route('/tasks').get(todos.getTasks).post(todos.createTask)

router.route('/tasks/:id').put(todos.updateTask).delete(todos.deleteTask)

router.route('/AllTasks').post(todos.postAllTasks)

export default router
