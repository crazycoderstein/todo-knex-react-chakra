import React, { useState } from 'react'
import {
	Stack,
	Checkbox,
	Editable,
	EditableInput,
	EditablePreview,
	Input,
	Box
} from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { tTask } from '../TodoList'
import { DraggableProvided } from 'react-beautiful-dnd'

type Props = {
	id?: number,
	data: tTask;
	setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
	deleted: boolean;
	provided: DraggableProvided
};

function Task(props: Props) {
	const { data, setDeleted, deleted, provided } = props
	const [check, setCheck] = useState(data.completed)
	const [name, setName] = useState<string>(data.name)
	const textStyle = check ? 'del' : undefined

	const handleUpdate = (flag: number) => {
		fetch('http://localhost:5000/tasks', {
			method: 'PUT',
			body: JSON.stringify({
				id: data.id,
				name: name,
				completed: (flag && !check) || (!flag && check),
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
		fetch('http://localhost:5000/tasks', {
			method: 'DELETE',
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
		<Box borderColor="rgb(100, 116, 139)" borderWidth='1px' borderRadius="1rem" borderTop={'none'} >
			<Stack
				direction="row"
				w="max-content"
				minW="full"
				h="3rem"
				pt="2rem"
				pb="3rem"
				justifyContent="space-between"
			>
				<Stack direction="row">
					<Checkbox
						colorScheme="green"
						mt="18px"
						ml="1rem "
						onChange={handleCheck}
						defaultChecked={check}
					/>
					<Editable
						defaultValue={data.name}
						isPreviewFocusable={true}
						submitOnBlur={true}
						onSubmit={handleSubmit}
						value={name}
						onChange={(newVal) => setName(newVal)}
					>
						<EditablePreview as={textStyle} />
						<Input as={EditableInput} />
					</Editable>
				</Stack>
				<div {...provided.dragHandleProps}>
					<DragHandleIcon
						onClick={handleDelete}
						w={3}
						h={3}
						opacity="0.5"
						_hover={{ opacity: 1 }}
					/>
				</div>
			</Stack>
		</Box>
	)
}

export default Task
