// components/todo/MessageError.jsx

// NOTE: handles all todo error/success messages centrally

import styles from "./styles/MessageError.module.css";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../../redux/TodoSlice";

export default function MessageError() {
  // GET TODO ERROR MESSAGES FROM REDUX STORE
  const error = useSelector((state) => state.todo.error);
  const dispatch = useDispatch();

  //* AUTO CLEAR AFTER 5s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  //* DISPLAY NOTING: IF NO ERROR MESSAGES
  if (!error) return null;

  //* DISPLAY: ERROR MESSAGE
  return <div className={styles.errorMessage}>{error}</div>;
}
