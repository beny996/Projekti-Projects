import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoLlistItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  const handleDelete = (id) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: { id },
    });
  };
  return (
    <li>
      {todo.title}
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoLlistItem;
