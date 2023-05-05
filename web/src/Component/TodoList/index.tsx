import React, { useState, useEffect } from 'react'
import Task from '../Task'
import './index.css'
import { IconButton, Input, Stack, Box, VStack} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { reorder, getItemStyle} from '../../helper'

export type tTask = {
	id?: number;
	name: string;
	completed: boolean;
	sort: number;
};

const TodoList = () => {
	const [todos, setTodos] = useState<tTask[]>([])
	const [name, setName] = useState<string>('')
	const [deleted, setDeleted] = useState<boolean>(false)

	const getTasks = async () => {
		try {
			const response = (await fetch('http://localhost:5000/tasks'))
			const res = await response.json()
			const data: tTask[] = res.tasks
			data.sort(function (a: tTask, b:tTask) { 
				if ( a.sort > b.sort) return 1
				if( a.sort < b.sort) return -1
				return 0
			})
			setTodos(data)			
		}catch(err) { /// error page
			console.log(err)
		}
	}

	useEffect(() => {
		postTasks()
	}, [todos])

	const postTasks = async () => {
		try {
			await fetch('http://localhost:5000/AllTasks', {
				method: 'POST',
				body: JSON.stringify(todos),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getTasks()
	}, [deleted])

	const handleCreate = async () => {
		const newTodo = { name, completed: false, sort: todos.length }
		try {
			await fetch('http://localhost:5000/tasks', {
				method: 'POST',
				body: JSON.stringify(newTodo),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			setName('')
			getTasks()
		} catch(err) {
			console.log(err)
		}
		
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return
		}
		const items: tTask[] = reorder(
			todos,
			result.source.index,
			result.destination.index
		)
		const newItems = items.map((item, index) => {
			return {
				id: item.id,
				name: item.name,
				completed: item.completed,
				sort: index
			}
		})
		setTodos(newItems)
	}
	
	return (
		<div className="todo-list custom-font">
			<div>
				<Stack direction="row" minW="35rem">
					<Input
						variant="flushed"
						placeholder="add your todos here..."
						value={name}
						onChange={(e) => {
							setName(e.target.value)
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleCreate()
						}}
						_placeholder={{ opacity: 1, color: 'white' }}
					/>
					<IconButton
						colorScheme="blue"
						aria-label="Search database"
						icon={<AddIcon />}
						onClick={handleCreate}
					/>
				</Stack>
				<Box>
					<DragDropContext onDragEnd={(e) => onDragEnd(e)}>
						<Droppable droppableId="droppable">
							{(provided) => (
								<VStack
									{...provided.droppableProps}
									ref={provided.innerRef}
									borderTopRadius={6}
									bg="transparent"
									alignItems="flex-start"
									spacing={0}
									overflow="hidden"
								>
									{todos.length > 0  && todos.map((todo, index) => {
										return <Draggable
											key={todo.id}
											draggableId={todo.id + ''}
											index={index}
										>
											{(provided, snapshot) => (
												<Box
													ref={provided.innerRef}
													{...provided.draggableProps}
													// {...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style
													)}
												>
													<Task
														data={todo}
														id={todo.id}
														key={todo.id}
														setDeleted={setDeleted}
														deleted={deleted}
														provided={provided}
													/>
												</Box>
											)}
										</Draggable>
									})}
									{provided.placeholder}
								</VStack>
							)}
							
						</Droppable>
					</DragDropContext>
				</Box>
			</div>
		</div>
	)
}

export default TodoList
