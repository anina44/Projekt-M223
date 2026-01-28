import { Link } from "react-router-dom";
import { FaPlusCircle, FaGlobeEurope, FaMapMarkerAlt, FaHome, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navigation() {
  const { user, isAuthenticated } = useContext(AuthContext);

  let loginClass = "navItem navLogin";

  if (isAuthenticated) {
    if (user?.role === "ADMIN") loginClass += " isAdmin";
    else loginClass += " isUser"; // z.B. USER/PLAYER
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

        <li className={loginClass}>
          <Link to="/login">
            <FaUser size={44} style={{ marginRight: "8px" }} />
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
