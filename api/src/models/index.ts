import knex from "knex";
import TodoRepo from "./todo";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite",
    user: "root",
    password: "COOLbaby718",
    database: "main",
  },
  useNullAsDefault: true,
});

export default {
  db,
  todoRepo: new TodoRepo(db),
};
