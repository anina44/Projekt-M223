import { useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const { login, isLoading } = useContext(AuthContext);

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(usernameOrEmail, password);
      alert("Login erfolgreich!");
      // optional: navigate("/") oder navigate("/reiseziel")
    } catch (err) {
      const status = err?.response?.status; // falls axios
      // falls fetch: err hat status nicht -> dann setz es im auth-service
      if (status === 401) setError("Falsche Zugangsdaten");
      else if (status === 403) setError("Login ist blockiert (Backend Security/CSRF).");
      else setError("Login fehlgeschlagen (Server/Verbindung).");
    }
  };

  return (
    <div style={{ maxWidth: "320px", margin: "80px auto" }}>
      <h2>
        <FaUser /> Login
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-Mail oder Username"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
          disabled={isLoading}
        />

        <button type="submit" style={{ width: "100%" }} disabled={isLoading}>
          {isLoading ? "Lädt..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
