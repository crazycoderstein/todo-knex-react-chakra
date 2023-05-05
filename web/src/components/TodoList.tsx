import React, { useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Input, Stack, Box, VStack } from "@chakra-ui/react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import TodoItem from "./TodoItem";
import "../styles/todolist.style.css";
import { Todo } from "../types/todo.type";
import { reorder, getItemStyle } from "../helpers/todolist.helper";
import * as service from "../services/todos.service";

const TodoList = () => {
  const [name, setName] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    getTodos();
  }, [deleted]);

  const getTodos = async () => {
    const res = await service.get();
    setTodos(res);
  };

  const postTodos = async (newTodos: Todo[]) => {
    await service.post(newTodos);
  };

  const createTodo = async () => {
    const maxSortVal =
      todos.length > 0
        ? todos.reduce((a: Todo, b: Todo) => {
            return a.sort > b.sort ? a : b;
          }).sort + 1
        : 0;
    const payload = { name, completed: false, sort: maxSortVal };
    await service.postOne(payload);
    getTodos();
    setName("");
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items: Todo[] = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    const newItems = items.map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        completed: item.completed,
        sort: index,
      };
    });
    setTodos(newItems);
    postTodos(newItems);
  };

  return (
    <Box className="todo-list custom-font">
      <Box>
        <Stack direction="row" minW="30rem">
          <Input
            variant="flushed"
            placeholder="Add your todos here..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") createTodo();
            }}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<AddIcon />}
            onClick={createTodo}
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
                  spacing={3}
                  overflow="hidden"
                >
                  {todos.length > 0 &&
                    todos.map((todo, index) => {
                      return (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id + ""}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <TodoItem
                                data={todo}
                                key={todo.id}
                                setDeleted={setDeleted}
                                deleted={deleted}
                                provided={provided}
                              />
                            </Box>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};

export default TodoList;
