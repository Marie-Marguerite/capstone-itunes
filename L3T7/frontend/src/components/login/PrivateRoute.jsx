// components/login/PrivateRoute.jsx

// NOTES: Ensures logged out users don't get stuck on a restricted home page (if for eg. token expires)

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  //* Access currently logged in user from redux
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  //* IF USER IS LOGGED IN: ALLOW ACCESS TO PRIVATE ROUTES
  //* IF NOT: REDIRECT USER TO LOGIN PAGE
  return loggedInUser ? children : <Navigate to="/login" replace />;
}
