import { useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItemList from "./TodoItemList.jsx";

let id = 1;

const TodoListFrame = ({ title }) => {
  let todosJS = null;
  try {
    todosJS = JSON.parse(localStorage.getItem("todos"));
    id = todosJS.at(-1)["id"] + 1;
  } catch {
    console.log("localstorage parsing error");
    todosJS = null;
  }
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(todosJS || []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  const handleCreate = () => {
    setInput("");
    setTodos([...todos, { id: id++, text: input, checked: false }]);
  };

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => {
        if (todo.id === id) todo.checked = !todo.checked;
        return todo;
      })
    ]);
  };

  const handleRemove = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };
  return (
    <div className="todoListTemplate text-center bg-light p-5 rounded mt-3">
      <h1 className="h3 mb-3 fw-normal">{title}</h1>
      <TodoForm
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onCreate={handleCreate}
      />
      <TodoItemList
        todos={todos}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default TodoListFrame;
