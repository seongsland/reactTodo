import React from "react";
const TodoForm = ({ value, onChange, onCreate, onKeyPress }) => {
  console.log("TodoForm");
  return (
    <div className="todoForm input-group mb-1">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Input Todo"
      />
      <button
        type="button"
        className="createButton btn btn-outline-primary"
        onClick={onCreate}
      >
        Add
      </button>
    </div>
  );
};

export default React.memo(TodoForm, (pp, np) => pp.value === np.value);
