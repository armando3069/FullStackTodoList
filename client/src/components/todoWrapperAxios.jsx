import React, { useState, useEffect } from "react";
import TodoForm from "./todoForm";
import Todo from "./todo";
import EditTodoForm from "./EditTodoForm";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const successAdd = () =>
  toast.success("Successfully add Task!", { position: "bottom-center" });

const succesDelete = () =>
  toast("Delete !", { icon: "🗑" }, { position: "top-center" });

const succesUpdate = () =>
  toast("Update !", { icon: "✨" }, { position: "top-center" });

const error = (message) => toast.error(message, { position: "top-center" });

const TodoWrapperAxios = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3008/get')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        error('Failed to fetch data from server');
      });
  }, []);

  
  const addTodo = (todo) => {
    if (!validateTask(todo)) {
      error("Invalid input. Please enter valid text.");
      return;
    }

    const newTodo = { task: todo, completed: false, isEditing: false };

    axios.post('http://localhost:3008/add', newTodo)
      .then(response => {
        setTodos([...todos, response.data]);
        successAdd();
      })
      .catch(err => {
        console.error('There was an error adding the data!', err);
        error('Failed to add data to server');
      });
  };

  const validateTask = (task) => {
    const regex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    return regex.test(task.trim());
  };

  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    axios.put(`http://localhost:3008/edit/${id}`, updatedTodo)
      .then(response => {
        setTodos(todos.map((todo) =>
          todo.id === id ? response.data : todo
        ));
      })
      .catch(err => {
        console.error('There was an error updating the data!', err);
        error('Failed to update data on server');
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3008/delete/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        succesDelete();
      })
      .catch(err => {
        console.error('There was an error deleting the data!', err);
        error('Failed to delete data from server');
      });
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const updatedTodo = { ...todos.find((todo) => todo.id === id), task, isEditing: false };

    axios.put(`http://localhost:3008/edit/${id}`, updatedTodo)
      .then(response => {
        setTodos(todos.map((todo) =>
          todo.id === id ? response.data : todo
        ));
        succesUpdate();
      })
      .catch(err => {
        console.error('There was an error updating the data!', err);
        error('Failed to update data on server');
      });
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

export default TodoWrapperAxios;