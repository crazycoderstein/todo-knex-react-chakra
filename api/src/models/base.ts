import { Knex , knex} from "knex";
import { Task } from "./task";
export class BaseRepo<T extends {}> {
  protected tableName: string;
  protected db: Knex;
  constructor(db: Knex, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  public async find() {
    return await this.db(this.tableName).select<T>();
  }
}
