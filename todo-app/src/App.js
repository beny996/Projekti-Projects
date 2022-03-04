// import "./App.css";
// import React from "react";
// import Api from "./components/Api";
// import Todo from "./components/Todo";
// import AddTodo from "./components/AddTodo";

// function App() {
//   return (
//     <div className="App">
//       <Api>
//         <Todo />
//         <AddTodo />
//       </Api>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoContextProvider from "./context/TodoContext";
import Api from "./components/Api";

function App() {
  return (
    <div className="App">
      <Api>
        <TodoContextProvider>
          <Navbar />
          <TodoList />
          <TodoForm />
        </TodoContextProvider>
      </Api>
    </div>
  );
}

export default App;
