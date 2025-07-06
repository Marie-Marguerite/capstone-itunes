//  /redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoSlice";
import UserReducer from "./UserSlice";

//* CREATE REDUX STORE
const store = configureStore({
  // DEFINE REDUCER(S) USED
  reducer: {
    // - name slice "todos" (TodoReducer handles logic)
    todo: TodoReducer,
    user: UserReducer,
  },
});

export default store;
