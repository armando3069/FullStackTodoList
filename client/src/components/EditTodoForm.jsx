import React, { useState } from "react";

const EditTodoForm = ({ editTask, tasks }) => {
  const [value, setValue] = useState(tasks.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(value, tasks.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;