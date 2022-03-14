import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const { dispatch } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_TODO",
      payload: { title },
    });

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="submit" value="Add todo" />
    </form>
  );
};

export default TodoForm;
