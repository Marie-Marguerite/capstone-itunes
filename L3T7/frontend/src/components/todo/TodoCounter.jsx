// components/todo/TodoCounter.jsx
import styles from "./styles/TodoCounter.module.css";
import React from "react";
import { useSelector } from "react-redux";

export default function TodoCounter() {
  //* COUNT TODOs
  //  SELECT/GET NR OF TODOS FROM STATE/STORE
const todos = useSelector((state)=> state.todo.list);
const count = todos.filter((todo)=> !todo.completed).length;


  return (
    //* DISPLAY NR OF TODOS
    <div className={styles.counter}>{count}</div>
  );
}
