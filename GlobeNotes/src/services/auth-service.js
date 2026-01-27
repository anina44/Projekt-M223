import { apiFetch, setToken, clearToken } from "./api-client";

export async function login(usernameOrEmail, password) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: { usernameOrEmail, password },
  });

  if (data?.token) setToken(data.token);
  return data;
}

export function logout() {
  clearToken();
}
