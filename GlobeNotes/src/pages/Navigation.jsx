import { Link } from "react-router-dom";
import { FaPlusCircle, FaGlobeEurope, FaMapMarkerAlt, FaHome } from "react-icons/fa";

export default function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/">
            <FaHome size={44} style={{ marginRight: "8px" }} />
            Startseite
          </Link>
        </li>
        <li>
          <Link to="/hinzufuegen">
            <FaPlusCircle size={44} style={{ marginRight: "8px" }} />
            Hinzufügen
          </Link>
        </li>
        <li>
          <Link to="/weltkartepage">
            <FaGlobeEurope size={44} style={{ marginRight: "8px" }} />
            Weltkarte
          </Link>
        </li>
        <li>
          <Link to="/reiseziel">
            <FaMapMarkerAlt size={44} style={{ marginRight: "8px" }} />
            Reiseziel
          </Link>
        </li>
      </ul>
    </nav>
  );
}
