// components/login/LoginForm.jsx
import styles from "./styles/RegisterLogin.module.css";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/UserSlice";

export default function LoginForm() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  //* FOCUS FIRST INPUT FIELD
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //* REDIRECT TO HOME AFTER SUCCESSFUL LOGIN
  useEffect(() => {
    if (loggedInUser) {
      navigate("/home"); // redirect home
    }
  }, [loggedInUser, navigate]);

  //* HANDLE FORM
  const formik = useFormik({
    // INITIAL VALUES
    initialValues: {
      email: "",
      password: "",
    },

    // VALIDATE
    validate: (values) => {
      const errors = {};
      // If no input:
      // - username
      if (!values.email) {
        errors.email = "Email required.";
      }
      // - password
      if (!values.password) {
        errors.password = "Password required.";
      }
      return errors;
    },

    //* ON SUBMIT
    onSubmit: (values, { resetForm, setTouched }) => {
      // - dispatch login to Redux
      dispatch(
        loginUser({ email: values.email, password: values.password })
      );
      // - clear old input
      resetForm();
      // - // prevent 'touch' from old input to pickup (and thus show errors) during new registration
      setTouched({});
    },
  });

  //* RENDER FORM
  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.loginRegisterForm}>
        {/* EMAIL */}
        <label htmlFor="email" className={styles.visuallyHidden}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}

        {/* PASSWORD */}
        <label htmlFor="password" className={styles.visuallyHidden}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        {/* SUBMIT BUTTON */}
        <button className={styles.loginRegisterButton} type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
}
