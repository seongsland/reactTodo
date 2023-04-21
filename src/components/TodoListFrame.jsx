import { useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItemList from "./TodoItemList.jsx";

let id = 1;

const TodoListFrame = ({ title }) => {
  let todosJS = null;
  try {
    todosJS = JSON.parse(localStorage.getItem("todoStorage"));
    id = todosJS.at(-1)["id"] + 1;
  } catch {
    console.log("localstorage parsing error");
    todosJS = null;
  }
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(todosJS || []);
  const [todoStorage, setTodoStorage] = useState(todosJS || []);
  const [viewState, setViewState] = useState("all");

  console.log("TodoListFrame");

  useEffect(() => {
    localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
    changeTodosState();
  }, [todoStorage]);

  useEffect(() => {
    changeTodosState();
  }, [viewState]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const changeTodosState = () => {
    console.log(viewState);
    if (viewState == "all") {
      setTodos(todoStorage);
    } else if (viewState == "uncheck") {
      setTodos(
        todoStorage.filter((obj) => {
          return !obj.checked;
        })
      );
    } else if (viewState == "check") {
      setTodos(
        todoStorage.filter((obj) => {
          return obj.checked;
        })
      );
    }
  };

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
    setTodoStorage([...todoStorage, { id: id++, text: input, checked: false }]);
  };

  const handleToggle = (id) => {
    setTodoStorage([
      ...todoStorage.map((todo) => {
        if (todo.id === id) todo.checked = !todo.checked;
        return todo;
      }),
    ]);
  };

  const handleRemove = (id) => {
    setTodoStorage([...todoStorage.filter((todo) => todo.id !== id)]);
  };

  const handleChangeViewState = (viewState) => {
    setViewState(viewState);
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
      <div
        onClick={() => {
          handleChangeViewState("all");
        }}
      >
        All
      </div>
      <div
        onClick={() => {
          handleChangeViewState("check");
        }}
      >
        check
      </div>
      <div
        onClick={() => {
          handleChangeViewState("uncheck");
        }}
      >
        uncheck
      </div>
    </div>
  );
};

export default TodoListFrame;
