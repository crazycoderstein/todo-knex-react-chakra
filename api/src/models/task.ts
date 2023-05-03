import { BaseRepo } from "./base";
import { Knex } from "knex";
export interface Task {
  id: number;
  name: string;
  completed: boolean;
  sort: number;
}

export default class TaskRepo extends BaseRepo<Task> {
  constructor(db: Knex) {
    super(db, "tasks");
  }
}
