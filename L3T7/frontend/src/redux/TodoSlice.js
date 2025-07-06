//  redux/TodoSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

//* 1. THUNKS
//  (to allow for asynchronous logic in Redux)
//  THUNK: FETCH/GET ALL TODOS (for logged in user)
export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/todos");
      return response.data.todos; // NOTE: assumes { todos: [...]}
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch failed."
      );
    }
  }
);

//  THUNK: ADD NEW TODO
export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (content, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/todos", { content });
      return response.data.todo; // NOTE: assumes { todo: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Add failed."
      );
    }
  }
);

//  THUNK: EDIT EXISTING TODO
export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async ({ id, newContent }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/todos/${id}`, {
        content: newContent,
      });
      return response.data.todo;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Edit failed."
      );
    }
  }
);

//  THUNK: DELETE TODO (by id)
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      return id; // so it can be removed from Redux state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed."
      );
    }
  }
);

//  THUNK: TOGGLE COMPLETE CHECKBOX (true/false)
export const toggleComplete = createAsyncThunk(
  "todo/toggleComplete",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/todos/${id}/toggle`, {});
      return response.data.todo;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Could not mark as complete."
      );
    }
  }
);

//* 2. SLICE
//  INITIAL STATE TODO ITEMS
const initialState = {
  list: [], // all todo items
  status: "idle", // loading | succeeded | failed
  error: null,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,

  //* SYNC ACTIONS
  reducers: {
    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },

  //* ASYNC ACTION
  extraReducers: (builder) => {
    builder
      // FETCH/GET TODOS
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ADD TODO
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      })

      // EDIT TODO
      .addCase(editTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.list.findIndex(
          (todo) => todo._id === updatedTodo._id
        );
        if (index !== -1) {
          state.list[index] = updatedTodo;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE TODO
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
      })

      // TOGGLE COMPLETE
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.list.findIndex(
          (todo) => todo._id === updatedTodo._id
        );
        if (index !== -1) {
          state.list[index] = updatedTodo;
        }
      })
      .addCase(toggleComplete.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

//*  EXPORT REDUCER FOR USE IN STORE
export const { clearError } = TodoSlice.actions;
export default TodoSlice.reducer;
