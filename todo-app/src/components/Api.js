import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const Api = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const callAPI = () => {
    axios.get("http://localhost:9001/testAPI").then((res) => {
      console.log(res.data);
      const todo = res.data;
      setTodos(todo);
    });
  };

  useEffect(() => {
    callAPI();
  }, []);
  return (
    <div>
      {children}
      {todos}
    </div>
  );
};

export default Api;
