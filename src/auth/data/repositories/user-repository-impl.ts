import type { User } from "@/auth/domain/entities/user";
import type { UserRepository } from "@/auth/domain/repositories/user-repository";
import api from "../services/api";

export const userRepositoryImpl: UserRepository = {
  async getCurrentUser(token: string): Promise<User> {
    const res = await api.get<User>("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
