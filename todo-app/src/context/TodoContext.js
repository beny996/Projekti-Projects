import React, { createContext, useReducer } from "react";
import { TodoReducer } from "../reducer/TodoReducer";
import { TODOS_KEY } from "../settings";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodoReducer, [], () => {
    const localData = localStorage.getItem(TODOS_KEY);
    return localData ? JSON.parse(localData) : [];
  });

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
