import React, { useState } from 'react'
import {  Stack, Divider, Checkbox,  Editable, EditableInput, EditablePreview, Input} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { tTask } from '../TodoList'

type Props = {
  data: tTask
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>
  deleted: boolean
}

function Task(props: Props) {
  const { data, setDeleted , deleted } = props
  const [check, setCheck] = useState(data.completed)
  const [name, setName] = useState<string>(data.name)
  const textStyle = check?"del":undefined

  const handleUpdate =(flag: number) => {
    fetch("http://localhost:5000/tasks",{
      method:'PUT',
      body: JSON.stringify({
        id: data.id,
        name: name,
        completed: flag&&!check || !flag&&check
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },      
    })
  }

  const handleCheck = () => {
    setCheck(!check)
    handleUpdate(1)
  }

  const handleDelete = () => {
    fetch("http://localhost:5000/tasks",{
      method:'DELETE',
      body: JSON.stringify({
        id: data.id,
        name: data.name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },      
    })
    setDeleted(!deleted)
  }

  const handleSubmit = () => {
    handleUpdate(0)
  }
  
  return (
    <div>
      <Stack direction='row' w='max-content' minW="full" h='3rem' pt="2rem" pb="3rem" justifyContent="space-between">
        <Stack direction='row'>
          <Checkbox colorScheme='green' mt='18px'  ml="1rem " onChange={handleCheck} defaultChecked={check}/>
          <Editable defaultValue={data.name} isPreviewFocusable={true} submitOnBlur={true} onSubmit={handleSubmit} 
          value={name} onChange={(newVal) => setName(newVal)}
          >
            <EditablePreview as={textStyle}/>
            <Input as={EditableInput} />
          </Editable>
        </Stack>
        <div>
          <CloseIcon onClick={handleDelete} w={3} h={3} opacity="0.5"  _hover={{ opacity: 1 }}/>
        </div>
      </Stack>
      <Divider />
    </div>
  )
}

export default Task