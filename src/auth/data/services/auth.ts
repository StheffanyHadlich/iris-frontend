// src/auth/data/services/auth.ts
import api from "./api";
import type { User } from "@/auth/domain/entities/user";

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  access_token?: string;
  user: User;
}

/* We keep the backend naming (access_token) then map at caller site.*/
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
}

export async function register(username: string, email: string, password: string): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>("/auth/register", { username, email, password });
  return res.data;
}
