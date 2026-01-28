import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth-service";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(usernameOrEmail, password);
      navigate("/reiseziel"); // oder "/"
    } catch (err) {
      setError("Falsche Zugangsdaten");
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
          />

          <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "10px" }}
          />

          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
  );
};

export default Login;
