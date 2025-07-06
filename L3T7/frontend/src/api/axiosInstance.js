// api/axiosInstance.js

// NOTE: used to simplify HTTP requests

import axios from "axios";

// Create reusable Axios instance
const instance = axios.create({
  baseURL: "http://localhost:8000", // Root URL for all backend API calls
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

//* 1. REQUEST INTERCEPTOR
//  Automatically attach/add token (if any) to every request to authenticate
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // If token exists, attach it to request headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//* 2. RESPONSE INTERCEPTORS
//  Catches errors globally from API responses
instance.interceptors.response.use(
  (response) => response, // pass successful responses through unchanged

  (error) => {
    const status = error?.response?.status;

    // Handel 403 (forbidden): if token expires/invalid
    if (status === 403) {
      console.error("[API 403] Invalid or expired token.");
      localStorage.removeItem("token"); // remove token
    }

    // Log server response messages in browser
    const serverMsg =
      error.response?.data?.message || error.response?.data?.message;
    console.log(`[API ${status}]`, serverMsg || error.message);

    // Return error
    return Promise.reject(error);
  }
);

//* EXPORT
export default instance;
