import api from "@/auth/services/api";

export interface User {
  id: string;
  username: string;
  email: string;
}

export async function getCurrentUser(token: string): Promise<User> {
  const res = await api.get<User>("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
