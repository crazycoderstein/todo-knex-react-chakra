import express from 'express'
import cors from 'cors'
import db from './models'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/tasks', async (req, res) => {
	const tasks = await db.taskRepo.find()
	res.send({ tasks })
})

app.post('/tasks', async (req, res) => {
	db.db('tasks')
		.insert({
			name: req.body.name,
			completed: req.body.completed,
			sort: req.body.sort,
		})
		.then(() => {
			res.send({ add: true, message: 'ok' })
		})
})

app.put('/tasks', async (req, res) => {
	db.db('tasks')
		.update({ name: req.body.name, completed: req.body.completed })
		.where({ id: req.body.id })
		.then(() => {
			res.send({ update: true, message: 'ok' })
		})
})

app.delete('/tasks', async (req, res) => {
	db.db('tasks')
		.where({ id: req.body.id })
		.del()
		.then(() => {
			res.send({ delete: true, message: 'ok' })
		})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
