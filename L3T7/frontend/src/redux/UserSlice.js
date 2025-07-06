// redux/UserSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

//* CONFIGURE
const API_BASE = "http://localhost:8000";
const token = localStorage.getItem("token");

const initialState = {
  loggedInUser: token ? { token } : null, // null until user logs in
  error: null,
  success: null,
};

//* 1. THUNKS
//  (to allow for asynchronous logic in Redux)
//  THUNK: REGISTER USER
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE}/api/register`,
        FormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.message;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(
        message || "Registration was unsuccessful"
      );
    }
  }
);

//  THUNK: LOGIN USER
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (CredentialsContainer, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE}/api/login`,
        CredentialsContainer,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      return { token };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message || "Login failed.");
    }
  }
);

//* 2. SLICE
const UserSlice = createSlice({
  name: "user",
  initialState,

  //* SYNC ACTIONS
  reducers: {
    // logout clears tokn from Redux and localStorage
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("token");
    },

    // Clears any error displayed to user
    clearError: (state) => {
      state.error = null;
    },

    // Clears any success messages
    clearSuccess: (state) => {
      state.success = false;
    },
  },

  //* ASYNC ACTIONS
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
        state.loggedInUser = null;
      });
  },
});

//* EXPORT
export const { logoutUser, clearError, clearSuccess } = UserSlice.actions;
export default UserSlice.reducer;
