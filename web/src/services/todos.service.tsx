import { Todo } from "../types/todo.type";

export const get = async () => {
  try {
    const response = await fetch("http://localhost:5000/todos");
    const res = await response.json();
    return res.todos;
  } catch (err) {
    console.log(err);
  }
};

export const post = async (todos: Todo[]) => {
  try {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const postOne = async (todo: Todo) => {
  try {
    await fetch("http://localhost:5000/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateOne = async (todo: Todo) => {
  try {
    await fetch("http://localhost:5000/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify({
        name: todo.name,
        completed: todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOne = async (id: number | undefined) => {
  try {
    await fetch("http://localhost:5000/todos/" + id, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};
