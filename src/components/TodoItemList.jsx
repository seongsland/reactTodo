import React from "react";
import TodoItem from "./TodoItem";

const TodoItemList = ({ todos, onToggle, onRemove }) => {
  console.log("TodoitemList");
  return (
    <div className="todoItemList list-group w-auto">
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            onToggle={onToggle}
            onRemove={onRemove}
            key={todo.id}
          />
        );
      })}
    </div>
  );
};

export default React.memo(TodoItemList, (pp, np) => pp.todos === np.todos);
