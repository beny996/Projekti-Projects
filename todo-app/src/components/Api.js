import React, { useState, useEffect } from "react";

const Api = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setTodos(res));
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
