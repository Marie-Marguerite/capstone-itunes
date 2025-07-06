// component/todo/TodoItem.jsx
import styles from "./styles/TodoItem.module.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, toggleComplete, deleteTodo } from "../../redux/TodoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(todo.content);

  
  //* 1. HANDLE... FUNCTIONS
  //  HANDLE: COMPLETE
  const handleCheckbox = () => dispatch(toggleComplete(todo._id));

  //  HANDLE: DELETE
  const handleDelete = () => dispatch(deleteTodo(todo._id));

  // HANDLE: EDIT
  const handleEdit = () => {
    if (newContent.trim() && newContent !== todo.content) {
      dispatch(editTodo({ id: todo._id, newContent }));
    }
    setIsEditing(false);
  };

  //* 2. LINE ITEMS
  return (
    <div className={styles.todoLineItem}>
      {/* CHECKBOX (COMPLETE) */}
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckbox}
      />

      {/* MAIN CONTENT */}
      {/* MAIN CONTENT: EDITING */}
      {isEditing ? (
        <>
          <input
            value={newContent}
            onChange={(event) => setNewContent(event.target.value)}
            className={styles.content}
          />
          <button onClick={handleEdit} className={`${styles.button} ${styles.doneButton}`}>
            ✔
          </button>
        </>
      ) : (
        <>
        {/* MAIN CONTENT: COMPLETED */}
          <div
            className={`${styles.content} ${
              todo.completed ? styles.completedContent : ""
            }`}
          >
            {todo.content}
          </div>
          {/* EDIT */}
          <button
            onClick={() => setIsEditing(true)}
          className={`${styles.button} ${todo.completed ? styles.editButtonDisabled :""}`}
          >
            ✎
          </button>
        </>
      )}

      {/* DELETE (button) */}
      <button className={styles.button} onClick={handleDelete}>
        ✖
      </button>
    </div>
  );
}
