import Tasks from '../models'

import { Request, Response } from 'express'
import { Task } from '../models/task'

export async function getTasks (req: Request, res: Response) {
	const tasks = await Tasks.taskRepo.find()
	res.status(200).json({tasks})
}

export function postAllTasks (req: Request, res: Response) {
	const todos: Task[] = req.body
	todos.map(async (todo: Task) => {
		await Tasks.db('tasks')
			.update({ sort: todo.sort })
			.where({ id: todo.id })
	})
	res.status(200).json({addAll: true, message: 'ok'})
}

export function createTask (req: Request, res: Response) {
	Tasks.db('tasks')
		.insert({
			name: req.body.name,
			completed: req.body.completed,
			sort: req.body.sort,
		})
		.then(() => {
			res.status(200).json({ add: true, message: 'ok' })
		})
}

export function updateTask (req: Request, res: Response) {
	const { id } = req.header
	Tasks.db('tasks')
		.update({ name: req.body.name, completed: req.body.completed })
		.where({ id: req.body.id })
		.then(() => {
			res.status(200).json({ update: true, message: 'ok' })
		})
}

export function deleteTask (req: Request, res: Response) {
	Tasks.db('tasks')
		.where({ id: req.body.id })
		.del()
		.then(() => {
			res.status(200).json({ delete: true, message: 'ok' })
		})
}
