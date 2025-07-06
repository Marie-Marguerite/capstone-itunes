// components/todo/MapTodos.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../redux/TodoSlice";
import TodoItem from "./TodoItem";

export default function MapTodos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);
  const status = useSelector((state) => state.todo.status);

  //* FETCH TODOS (ONLY ON FIRST LOAD IS STATUS IS IDLE)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  // Show loading message
  if (status === "loading") return <p>Loading...</p>;

  //* DISPLAY EACH EXISTING TODO (map through)
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
