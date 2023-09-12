// TodoItem.js
import React from "react";

const TodoItem = ({ task, handleDelete }) => {
  return (
    <div className="task-list">
      <p>{task?.task}</p>
      <button
        className="material-symbols-outlined delete"
        onClick={() => handleDelete(task._id)}
      >
        delete_forever
      </button>
    </div>
  );
};

export default TodoItem;
