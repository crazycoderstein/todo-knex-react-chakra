import knex from 'knex'
import TaskRepo from './task'

const db = knex({
	client: 'sqlite3',
	connection: {
		filename: './db.sqlite',
		user: 'root',
		password: 'COOLbaby718',
		database: 'main',
	},
	useNullAsDefault: true,
})

export default {
	db,
	taskRepo: new TaskRepo(db),
}
