import React, { useState, useEffect } from "react";
import TodoForm from "./todoForm";
import Todo from "./todo";
import EditTodoForm from "./EditTodoForm";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const successAdd = () =>
  toast.success("Successfully add Task!", { position: "bottom-center" });

const succesDelete = () =>
  toast("Delete !", { icon: "🗑" }, { position: "top-center" });

const succesUpdate = () =>
  toast("Update !", { icon: "✨" }, { position: "top-center" });

const error = (message) => toast.error(message, { position: "top-center" });

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    if (!validateTask(todo)) {
      error("Invalid input. Please enter valid text.");
      return;
    }

    const newAddtodo = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];

    setTodos(newAddtodo);

    localStorage.setItem("todos", JSON.stringify(newAddtodo));
    successAdd();
  };

  const validateTask = (task) => {
    const regex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    return regex.test(task.trim());
  };

  const toggleComplete = (id) => {
    const newToggleComplete = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newToggleComplete);
    localStorage.setItem("todos", JSON.stringify(newToggleComplete));
  };

  const deleteTodo = (id) => {
    const newDeleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newDeleteTodo);
    localStorage.setItem("todos", JSON.stringify(newDeleteTodo));
    succesDelete();
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const newEditTask = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: false } : todo
    );

    setTodos(newEditTask);
    localStorage.setItem("todos", JSON.stringify(newEditTask));
    succesUpdate();
  };

  return (
    <div className="TodoWrapper">
      <h1>To do List</h1>

      <TodoForm addTodo={addTodo} error={error} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} tasks={todo} editTask={editTask} />
        ) : (
          <Todo
            key={todo.id}
            tasks={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}

      <Toaster />
    </div>
  );
};

export default TodoWrapper;
