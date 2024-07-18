import React from "react";

import edit from "../assets/edit.png";
import del from "../assets/delete.png";

const Todo = ({ tasks, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      <p
        onClick={() => {
          toggleComplete(tasks.id);
        }}
        className={`${tasks.completed ? "completed" : "incompleted"}`}
      >
        {tasks.task}
      </p>
      <div>
        <img
          src={edit}
          width="20px"
          height="20px"
          className="edit-icon"
          onClick={() => editTodo(tasks.id)}
        />

        <img
          src={del}
          width="20px"
          height="20px"
          className="delete-icon"
          onClick={() => deleteTodo(tasks.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
