import todos from "../models";

import { Request, Response } from "express";
import { Todo } from "../types/todo.type";

export async function getTodos(req: Request, res: Response) {
	try {
		const todoList = await todos.todoRepo.find();
		res.status(200).json({ todos: todoList, message: "Getting todos Succeed" });
	} catch (err) {
		res
			.status(500)
			.json({ getTodos: false, message: "Getting todos Failed", err });
	}
}

export async function createTodo(req: Request, res: Response) {
	try {
		await todos.db("tasks").insert({
			name: req.body.name,
			completed: req.body.completed,
			sort: req.body.sort,
		});
		res.status(201).json({ add: true, message: "Creating a task Succeed" });
	} catch (err) {
		res
			.status(500)
			.json({ add: false, message: "Creating a task Failed", err });
	}
}

export async function updateTodo(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await todos
			.db("tasks")
			.update({ name: req.body.name, completed: req.body.completed })
			.where({ id });
		res.status(200).json({ update: true, message: "Updating a task Succeed" });
	} catch (err) {
		res
			.status(500)
			.json({ update: false, message: "Updating a task Failed", err });
	}
}

export async function deleteTodo(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await todos.db("tasks").where({ id }).del();
		res.status(200).json({ delete: true, message: "Deleting a task Succeed" });
	} catch (err) {
		res
			.status(500)
			.json({ delete: false, message: "Deleting a task Failed", err });
	}
}

export function postTodos(req: Request, res: Response) {
	const todoList: Todo[] = req.body;
	try {
		todoList.map(async (todo: Todo) => {
			await todos
				.db("tasks")
				.update({ sort: todo.sort })
				.where({ id: todo.id });
		});
		res.status(200).json({ postTodos: true, message: "Posting todos Succeed" });
	} catch (err) {
		res
			.status(500)
			.json({ postTodos: false, message: "Posting todos Failed ", err });
	}
}
