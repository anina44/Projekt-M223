import { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth-service";
import { getToken, setToken as storeToken, clearToken } from "../services/api-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(getToken());

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, [token]);

  /**
   * Login Funktion (ECHT) - ruft Backend auf
   * @param {string} usernameOrEmail - Username ODER Email
   * @param {string} password - Passwort
   */
  const login = async (usernameOrEmail, password) => {
    setIsLoading(true);

    try {
      const data = await authService.login(usernameOrEmail, password);

      if (data?.token) {
        storeToken(data.token);   // localStorage
        setToken(data.token);     // state
      }

      setUser({
        username: data?.username ?? usernameOrEmail,
        role: data?.role ?? null,
      });

      console.log("✅ Login erfolgreich:", data);
      return data;
    } catch (err) {
      console.error("❌ Login fehlgeschlagen:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout(); // entfernt token (falls du es dort machst)
    clearToken();         // localStorage cleanup sicherstellen
    setUser(null);
    setToken(null);
    console.log("👋 User ausgeloggt");
  };

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
