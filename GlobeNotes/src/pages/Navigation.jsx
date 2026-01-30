import { Link, useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaGlobeEurope,
  FaMapMarkerAlt,
  FaHome,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { getToken } from "../services/api-client";
import { logout } from "../services/auth-service";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navigation() {
  const navigate = useNavigate();
  const token = getToken();
  const isAuthenticated = !!token;

  // Decode token to get role
  let userRole = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userRole = payload.role;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  const handleLogout = () => {
    logout();              // Token aus localStorage entfernen
    navigate("/login");    // zurück zum Login
  };

  let loginClass = "navItem navLogin";
  if (isAuthenticated) {
    loginClass += " isUser"; // optional für Styling
  }

  return (
      <nav className="main-nav">
        <ul>
          {isAuthenticated && (
            <>
              <li className="navItem">
                <Link to="/home">
                  <FaHome size={44} style={{ marginRight: "8px" }} />
                  Startseite
                </Link>
              </li>

              <li className="navItem">
                <Link to="/hinzufuegen">
                  <FaPlusCircle size={44} style={{ marginRight: "8px" }} />
                  Hinzufügen
                </Link>
              </li>

              <li className="navItem">
                <Link to="/weltkartepage">
                  <FaGlobeEurope size={44} style={{ marginRight: "8px" }} />
                  Weltkarte
                </Link>
              </li>

              {userRole === "ADMIN" && (
                <li className="navItem">
                  <Link to="/reiseziele">
                    <FaMapMarkerAlt size={44} style={{ marginRight: "8px" }} />
                    Reiseziele
                  </Link>
                </li>
              )}
            </>
          )}

          {!isAuthenticated ? (
              <li className={loginClass}>
                <Link to="/login">
                  <FaUser size={44} style={{ marginRight: "8px" }} />
                  Login
                </Link>
              </li>
          ) : (
              <li className={`${loginClass} navLogout`}>
                <button onClick={handleLogout} className="logoutButton">
                  <FaSignOutAlt size={44} style={{ marginRight: "8px" }} />
                  Logout
                </button>
              </li>
          )}
        </ul>
      </nav>
  );
}
