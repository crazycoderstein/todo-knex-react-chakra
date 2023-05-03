import { Knex } from 'knex'
export class BaseRepo<T extends object> {
	protected tableName: string
	protected db: Knex
	constructor(db: Knex, tableName: string) {
		this.db = db
		this.tableName = tableName
	}

	public async find() {
		return await this.db(this.tableName).select<T>()
	}
}
