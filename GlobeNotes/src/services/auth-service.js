import api, { setToken, clearToken } from "./api-client";

export async function login(usernameOrEmail, password) {
  const response = await api.post("/api/auth/login", {
    usernameOrEmail,
    password,
  });

  const data = response.data;

  if (data?.token) {
    setToken(data.token);
  }

  return data;
}

export function logout() {
  clearToken();
}
