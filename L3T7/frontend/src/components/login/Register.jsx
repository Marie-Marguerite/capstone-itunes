// components/login/Register.jsx
import styles from "./styles/RegisterLogin.module.css";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import MessageAuth from "./MessageAuth";

export default function Register() {
  // Prep navigate to login page
  const navigateLogin = useNavigate();
  const handleClick = () => {
    navigateLogin("/login");
  };

  return (
    <>
      {/* REGISTRATION FORM */}
      <RegistrationForm />

      {/* CENTRALISED ERROR/SUCCESS MESSAGES */}
      <MessageAuth />
      
      {/* BUTTON: to navigate to login page */}
      <button
        className={styles.loginRegisterHereButton}
        type="button"
        onClick={handleClick}
      >
        LOGIN HERE
      </button>
    </>
  );
}
