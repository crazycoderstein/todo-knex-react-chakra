import { BaseRepo } from "./base";
import { Knex } from "knex";
import { Todo } from "../types/todo.type";

export default class TodoRepo extends BaseRepo<Todo> {
  constructor(db: Knex) {
    super(db, "tasks");
  }

  public async find() {
    return await this.db("tasks").select<Todo>().orderBy("sort", "asc");
  }
}
