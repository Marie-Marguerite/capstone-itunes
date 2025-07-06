// components/login/Login.jsx
import styles from "./styles/RegisterLogin.module.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import MessageAuth from "./MessageAuth";

export default function Login() {

  // Prep navigate to register page
  const navigateRegister = useNavigate();
  const handleClick = () => {
    navigateRegister("/register");
  };

  return (
    <>
      {/* LOGIN FORM */}
      <LoginForm />

      {/* CENTRALISED ERROR/SUCCESS MESSAGES */}
      <MessageAuth />
      
      {/* BUTTON: to navigate to register page */}
      <button
        type="button"
        className={styles.loginRegisterHereButton}
        onClick={handleClick}
      >
        REGISTER HERE
      </button>
    </>
  );
}
