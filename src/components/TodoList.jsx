// TodoList.js
import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

import TodoItem from "./TodoItems";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = async (formattedTask) => {
    try {
      const taskData = { task: formattedTask };
      const response = await axios
        .post("http://localhost:5001/todos", taskData)
        .then((res) => {
          alert(res.data.message);
          todos.current.value = "";
        });

      if (response.status === 200) {
        setTodos([...todos, response.data.task]);
      } else {
        console.error("Add task request failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async (taskId) => {
    // window.confirm method to show a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task permanently?"
    );

    if (confirmDelete) {
      try {
        // Sending DELETE request to the backend API to delete a task
        const response = await axios.delete(
          `http://localhost:5001/todos/${taskId}`
        );
        if (response.status === 200) {
          // Updating the local state to remove the deleted task
          setTodos(todos.filter((task) => task._id !== taskId));
        } else {
          // Handle errors
          console.error("Delete request failed.");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/todos");

        if (response.status === 200) {
          setTodos(response.data.tasks);
        } else {
          console.error("Fetch request failed.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchTasks();
  }, [todos]);

  return (
    <div>
      <h1>To do App</h1>
      <TodoForm handleAddTodo={handleAddTodo} />

      <div>
        <h2>
          <u>Task List</u>
        </h2>
        {todos.map((task, index) => (
          <TodoItem task={task} handleDelete={handleDelete} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
