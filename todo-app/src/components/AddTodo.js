import React, { createContext } from "react";

const AddTodo = (props) => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add todo</label>
        <input
          type="text"
          placeholder="Enter the title of your task"
          onChange={handleChange}
        />
        <button>Add todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
