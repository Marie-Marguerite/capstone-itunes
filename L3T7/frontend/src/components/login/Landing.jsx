// components/login/Landing

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  // Access current user (if logged in) from Redux
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const navigate = useNavigate();

  // useEffect - runs once on load OR if loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      //* IF LOGGED IN: go/redirect to home page
      navigate("/home");
    } else {
      //* IF NOT LOGGED IN: go/REDIRECT to login page
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  // Return/render nothing visible while redirecting
  return null;
}
