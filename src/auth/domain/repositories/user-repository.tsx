import type { User } from "../entities/user";

export interface UserRepository {
  getCurrentUser(token: string): Promise<User>;
}
