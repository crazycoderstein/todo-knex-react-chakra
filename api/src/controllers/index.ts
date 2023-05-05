import Tasks from '../models'

import { Request, Response } from 'express'
import { Task } from '../models/task'

export async function getTasks (req: Request, res: Response) {
	try {
		const tasks = await Tasks.taskRepo.find()
		res.status(201).json({tasks, message:'ok'})
	} catch (err) {
		res.status(500).json({create: false, message: 'failed', err})
	}
}

export function postAllTasks (req: Request, res: Response) {
	const todos: Task[] = req.body
	try{
		todos.map(async (todo: Task) => {
			await Tasks.db('tasks')
				.update({ sort: todo.sort })
				.where({ id: todo.id })
		})
		res.status(200).json({addAll: true, message: 'ok'})
	} catch(err){
		res.status(500).json({addAll: false , message: 'failed', err})
	}
}

export async function createTask (req: Request, res: Response) {
	try{
		await Tasks.db('tasks')
			.insert({
				name: req.body.name,
				completed: req.body.completed,
				sort: req.body.sort,
			})
		res.status(201).json({ add: true, message: 'ok' })
	} catch(err) {
		res.status(500).json({ add: false, message: 'failed', err})
	}
}

export async function updateTask (req: Request, res: Response) {
	const { id } = req.params
	try {
		await Tasks.db('tasks')
			.update({ name: req.body.name, completed: req.body.completed })
			.where({ id })
		res.status(200).json({ update: true, message: 'ok' })
	} catch(err) {
		res.status(500).json({ update: false, message: 'failed', err})
	}
}


export async function deleteTask (req: Request, res: Response) {
	const { id } = req.params
	try {
		await Tasks.db('tasks')
			.where({ id })
			.del()
		res.status(200).json({ delete: true, message: 'ok' })
	} catch (err) {
		res.status(500).json({ delete: false, message: 'failed', err})
	}
}
