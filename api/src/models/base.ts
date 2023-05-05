import { Knex } from "knex";
export class BaseRepo<T extends object> {
  protected tableName: string;
  protected db: Knex;
  constructor(db: Knex, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }
}
