import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoLlistItem from "./TodoListItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  return (
    <ul>
      {todos.length
        ? todos.map((todo) => <TodoLlistItem key={todo.id} todo={todo} />)
        : "You have finished all your tasks!"}
    </ul>
  );
};

export default TodoList;
