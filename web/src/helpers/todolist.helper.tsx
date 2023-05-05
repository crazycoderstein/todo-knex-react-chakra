import { Todo } from "../types/todo.type";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  ...draggableStyle,
  width: "30rem",
});

export function newId() {
  return Math.random().toString(36).substr(2, 9);
}
