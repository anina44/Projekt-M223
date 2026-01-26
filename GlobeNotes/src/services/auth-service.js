import api from "./api-client";

export const login = async (usernameOrEmail, password) => {
  const response = await api.post("/api/auth/login", {
    usernameOrEmail,
    password,
  });

  // Token speichern
  localStorage.setItem("token", response.data.token);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
