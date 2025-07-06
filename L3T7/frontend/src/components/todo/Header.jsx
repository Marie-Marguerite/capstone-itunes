//  components/todo/Header.jsx
import styles from "./styles/Header.module.css"
import React from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { logoutUser } from "../../redux/UserSlice";


export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); // Redirect after logout
  };

  return (
    <header>
      {/* BUTTON: LOGOUT */}
      <div className={styles.buttonWrapper}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          LOGOUT
        </button>

      {/* HEADING */}
      </div>
      <h1 >TO-DO LIST</h1>
    </header>
  );
}
