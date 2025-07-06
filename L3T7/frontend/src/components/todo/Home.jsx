// components/todo/Home.jsx
import React from "react";

import Header from "./Header";
import MapTodos from "./MapTodos";
import AddTodoForm from "./AddTodoForm";
import TodoCounter from "./TodoCounter";
import MessageError from "./MessageError";
import InfoPopup from "./InfoPopup";

export default function Home() {
  return (
    <>
      <TodoCounter />
      <Header />
      <InfoPopup />
      <AddTodoForm />
      <MessageError />
      <MapTodos />
    </>
  );
}
