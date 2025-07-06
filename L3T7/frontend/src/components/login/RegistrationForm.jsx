// components/login/RegistrationForm.jsx
import styles from "./styles/RegisterLogin.module.css";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/UserSlice";

export default function RegisterForm() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.user);

  //* FOCUS INPUT FIELD (first input field - firstName)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //* TIMER FOR REDIRECT TO LOGIN
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login"); // go to login page
      }, 4000);
      return () => clearTimeout(timer); // remove once used (cleanup)
    }
  }, [success, dispatch, navigate]);

  //* THE FORM
  const formik = useFormik({
    //* 3.1. INITIAL VALUES
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    //* VALIDATE
    validate: (values) => {
      const errors = {};

      // VALIDATE: EMAIL (expected email characters)
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Please enter a valid email.";
      }

      // VALIDATE: PASSWORD (8 characters or more, at least one uppercase and lowercase letter, a number and a special case character)
      if (!values.password) {
        errors.password = "Required.";
      } else if (values.password.length < 8) {
        errors.password = "Password must contain 8 or more characters.";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(
          values.password
        )
      ) {
        errors.password =
          "Please enter a password with at least one upper- and lowercase letter, a number and a special character.";
      }

      // VALIDATE: CONFIRM PASSWORD
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword =
          "Please re-enter as the passwords do not match.";
      }
      return errors;
    },

    //* ON SUBMIT
    onSubmit: (values, { resetForm, setTouched }) => {
      dispatch(registerUser(values));
      resetForm(); // clear old input
      setTouched({}); // prevent 'touch' from old input to pickup (and thus show errors) during new registration
    },
  });

  //* RETURN: FORM INPUT FIELDS
  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.loginRegisterForm}>
        {/* EMAIL */}
        <label htmlFor="email" className={styles.visuallyHidden}>
          Email
        </label>
        <input
          ref={inputRef}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.formikError}>{formik.errors.email}</div>
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
          <div className={styles.formikError}>{formik.errors.password}</div>
        ) : null}

        {/* CONFIRM PASSWORD */}
        <label htmlFor="confirmPassword" className={styles.visuallyHidden}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className={styles.formikError}>{formik.errors.confirmPassword}</div>
        ) : null}

        {/* SUBMIT BUTTON */}
        <button className={styles.loginRegisterButton} type="submit">
          REGISTER
        </button>
      </form>
    </div>
  );
}
