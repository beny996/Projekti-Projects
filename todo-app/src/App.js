import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoContextProvider from "./context/TodoContext";
import Api from "./components/Api";

function App() {
  return (
    <div className="App">
      <TodoContextProvider>
        <Navbar />
        <TodoList />
        <TodoForm />
        {/* <Api /> */}
      </TodoContextProvider>
    </div>
  );
}

export default App;
