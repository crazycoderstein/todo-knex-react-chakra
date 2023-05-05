import React, { useState, useEffect } from "react";
import {
  Stack,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Box,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DraggableProvided } from "react-beautiful-dnd";

import { useIsFirstRender } from "../hooks/useIsFirstRender";
import { Todo } from "../types/todo.type";
import * as service from "../services/todos.service";

type Props = {
  data: Todo;
  provided: DraggableProvided;
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

function TodoItem(props: Props) {
  const isFirstRender = useIsFirstRender();
  const { data, setDeleted, deleted, provided } = props;
  const [check, setCheck] = useState(data.completed);
  const [name, setName] = useState<string>(data.name);
  const textStyle = check ? "del" : undefined;

  useEffect(() => {
    if (isFirstRender) return;
    const payload: Todo = {
      id: data.id,
      name: data.name,
      completed: check,
      sort: data.sort,
    };
    service.updateOne(payload);
  }, [check]);

  const handleItemCheck = () => setCheck(!check);

  const handleItemDelete = async () => {
    service.deleteOne(data.id);
    setDeleted(!deleted);
  };

  const handleNameSubmit = () => {
    const payload: Todo = {
      id: data.id,
      name: name,
      completed: check,
      sort: data.sort,
    };
    service.updateOne(payload);
  };

  return (
    <Box
      border="solid 1px rgb(255, 255, 255)"
      borderRadius="1rem"
      borderTop={"none"}
      p="1rem"
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" maxW="95%" isTruncated>
          <Checkbox
            colorScheme="green"
            onChange={handleItemCheck}
            defaultChecked={check}
          />
          <Editable
            defaultValue={data.name}
            isPreviewFocusable={true}
            submitOnBlur={true}
            onSubmit={handleNameSubmit}
            value={name}
            onChange={(newVal) => setName(newVal)}
          >
            <EditablePreview as={textStyle} />
            <Input as={EditableInput} />
          </Editable>
        </Stack>
        <Box {...provided.dragHandleProps} alignSelf="center">
          <DragHandleIcon onClick={handleItemDelete} h="1rem" />
        </Box>
      </Stack>
    </Box>
  );
}

export default TodoItem;
