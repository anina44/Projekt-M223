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

export default function Navigation() {
  const navigate = useNavigate();
  const token = getToken();
  const isAuthenticated = !!token;

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
          <li className="navItem">
            <Link to="/">
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

          <li className="navItem">
            <Link to="/reiseziel">
              <FaMapMarkerAlt size={44} style={{ marginRight: "8px" }} />
              Reiseziel
            </Link>
          </li>

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
