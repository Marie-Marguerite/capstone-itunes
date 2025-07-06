//  App.jsx
import "./App.css";
import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

//* PAGE COMPONENTS
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Landing from "./components/login/Landing";
import Home from "./components/todo/Home";
import PrivateRoute from "./components/login/PrivateRoute";

export default function App() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const location = useLocation();
  const navigate = useNavigate();

  //* REDIRECT UNAUTHORISED USERS:
  // (Redirect to login if user is logged out)
  useEffect(() => {
    const protectedRoutes = ["/home"];
    const isProtected = protectedRoutes.includes(location.pathname);

    // IF not logged in & trying to access a protected route
    if (!loggedInUser && isProtected) {
      navigate("/login"); // redirect to login page
    }
  }, [loggedInUser, location.pathname, navigate]);

  //* ROUTING
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTE */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
