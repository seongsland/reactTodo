import { useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoItemList from "./TodoItemList.jsx";
import TodoAction from "./TodoAction.jsx";

let id = 1;
let viewState = "all";
let todoStorage = [];
let todosJS = null;
let leftCount = 0;

const TodoListFrame = ({ title }) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  console.log("TodoListFrame");

  useEffect(() => {
    console.log("localStorage loading..");
    try {
      todosJS = JSON.parse(localStorage.getItem("todoStorage"));
      id = todosJS.at(-1)["id"] + 1;
      todoStorage = todosJS || [];
      changeTodosState();
      leftCount = todoStorage.filter((obj) => {
        return !obj.checked;
      }).length;
    } catch {
      console.log("localstorage parsing error");
    }
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const changeTodoStorage = () => {
    localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
    changeTodosState();
    leftCount = todoStorage.filter((obj) => {
      return !obj.checked;
    }).length;
  };

  const changeTodosState = () => {
    console.log(viewState);
    if (viewState == "all") {
      setTodos([...todoStorage]);
    } else if (viewState == "uncheck") {
      setTodos(
        [...todoStorage].filter((obj) => {
          return !obj.checked;
        })
      );
    } else if (viewState == "check") {
      setTodos(
        [...todoStorage].filter((obj) => {
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
    todoStorage.push({ id: id++, text: input, checked: false });
    changeTodoStorage();
  };

  const handleToggle = (id) => {
    todoStorage.map((todo) => {
      if (todo.id === id) todo.checked = !todo.checked;
    });
    changeTodoStorage();
  };

  const handleRemove = (id) => {
    todoStorage = todoStorage.filter((todo) => todo.id !== id);
    changeTodoStorage();
  };

  const handleChangeViewState = (pViewState) => {
    if (pViewState == "clear") {
      pViewState = "all";
      todoStorage = todoStorage.filter((todo) => !todo.checked);
      changeTodoStorage();
    }

    if (viewState != pViewState) {
      viewState = pViewState;
      changeTodosState();
    }
  };

  return (
    <div className="todoListTemplate text-center bg-light p-5 rounded">
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
      <TodoAction
        leftCount={leftCount}
        viewState={viewState}
        onChangeViewState={handleChangeViewState}
      />
    </div>
  );
};

export default TodoListFrame;
