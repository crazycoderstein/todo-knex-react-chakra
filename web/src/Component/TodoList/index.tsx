import React, {useState, useEffect} from 'react'
import Task from '../Task'
import './index.css'
import { IconButton , Input, Stack} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export type tTask = {
  id?: number;
  name: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<tTask[]>([]);
  const [name, setName] = useState<string>('')
  const [deleted, setDeleted] = useState<boolean>(false)
  

  const getTasks = async () => {
    return fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res.tasks)
      });
  };

  useEffect(() => {
    getTasks();
  }, [deleted]);

  const handleCreate = async () => {
    const newTodo = { name, completed: false, sort: todos.length}
    setName('')
    await fetch("http://localhost:5000/tasks",{
      method:'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },      
    })
    getTasks()
  }

  return (
    <div className="todolist custom-font">
      <div>
        <Stack  direction='row' minW="35rem">
          <Input variant='flushed' placeholder='Add todos here...' value={name} onChange={(e)=> {
                setName(e.target.value)
              }}
            />
          <IconButton colorScheme='blue' aria-label='Search database' icon={<AddIcon/>} onClick={handleCreate}/>
        </Stack>
        <div>
          {
            todos.map((item) => {
              return <Task data={item} key={item.id} setDeleted={setDeleted} deleted={deleted}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TodoList