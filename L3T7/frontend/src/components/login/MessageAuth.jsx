// components/login/MessageAuth.jsx

// NOTE: handles all authentication error/success messages centrally

import styles from "./styles/RegisterLogin.module.css";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearSuccess } from "../../redux/UserSlice";

export default function MessageAuth() {
  // GET AUTHENTICATION (AUTH) ERROR/SUCCESS MESSAGES FROM REDUX STORE
  const { error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // console.log("MessageAuth render:", { error, success });

  //* AUTO CLEAR AFTER 5s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }

    if (success) {
      const timer = setTimeout(() => dispatch(clearSuccess()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  //* DISPLAY: ERROR MESSAGE
  if (error) {
    return (
      <div className={styles.error}>
        {error.includes("Cannot read properties")
          ? "Oops! Something went wrong. Please try again."
          : error}
      </div>
    );
  }

  //* DISPLAY: SUCCESS MESSAGE
  if (success) {
    return <div className={styles.success}>{success}</div>;
  }

  //* DISPLAY NOTHING: IF NO MESSAGES
  return null;
}
