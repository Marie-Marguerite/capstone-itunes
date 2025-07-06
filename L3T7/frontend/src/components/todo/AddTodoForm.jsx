// components/todo/AddTodoForm.jsx
import styles from "./styles/AddTodoForm.module.css";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/TodoSlice";

export default function AddTodoForm() {
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch(); 

  //* 1. FOCUS INPUT FIELD
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //* 2. HANDLE SUBMIT
  const handleSubmit = (event) => {
    //  Prevent default refresh upon submit
    event.preventDefault();
    //  if no content: don't dispatch
    if (!content.trim()) return;
    //  2.2 IF INPUT: add new todo to Todos
    dispatch(addTodo(content));
    // clear input field
    setContent("");
  };

  //* 3. INPUT FORM
  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* INPUT FIELD: add todo */}
          <div>
            <input
              className={styles.inputField}
              ref={inputRef}
              type="text"
              placeholder="To-do | Task"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          {/* BUTTON: ADD */}
          <div>
            <button className={styles.addButton} type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
