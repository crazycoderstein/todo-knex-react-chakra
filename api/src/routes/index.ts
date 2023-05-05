import express from "express";
import * as todos from "../controllers";

const router = express.Router();

router.route("/todos").get(todos.getTodos).post(todos.postTodos);

router.route("/todos/:id").put(todos.updateTodo).delete(todos.deleteTodo);

router.route("/todo").post(todos.createTodo);

export default router;
