// TodoForm.js
import React, { useRef } from "react";

const TodoForm = ({ handleAddTodo }) => {
  let todo = useRef();

  const handleAddClick = (e) => {
    e.preventDefault();
    const taskText = todo.current.value.trim();

    if (taskText !== "") {
      const formattedTask =
        taskText.charAt(0).toUpperCase() + taskText.slice(1);

      handleAddTodo(formattedTask);
      todo.current.value = "";
    }
  };

  return (
    <form action="" className="task-form">
      <input
        type="text"
        placeholder="Add your task here..."
        ref={todo}
        name="todo"
        className="input-task"
      />
      <button
        style={{ cursor: "pointer" }}
        className="material-symbols-outlined add"
        onClick={handleAddClick}
      >
        add
      </button>
    </form>
  );
};

export default TodoForm;
