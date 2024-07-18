import React, { useState } from "react";

const TodoForm = ({ addTodo,error }) => {
  const [value, setValue] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (value) {
        addTodo(value);
        // clear form after submission
        setValue('');
      }
      else{
        error('Empty');
      }
  };
  return (
    <form className="TodoForm" onSubmit={handlerSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder="What to do !"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;

/// firma de conditioner  smad shop   conditioner artel split  35 meters
