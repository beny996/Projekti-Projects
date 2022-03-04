import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoLlistItem from "./TodoListItem";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  return (
    <ul>
      {todos.length
        ? todos.map((todo) => <TodoLlistItem key={todo.id} todo={todo} />)
        : "You are finished with your todo list. Congratz!"}
    </ul>
  );
};

export default TodoList;
