"use server";

import { cookies } from "next/headers";
import { login } from "@/auth/services/auth";
import { register } from "@/auth/services/auth";

export async function loginAction(email: string, password: string) {
  try {
    const res = await login(email, password);

    (await cookies()).set("token", res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Invalid credentials." };
  }
}

export async function registerAction(username: string, email: string, password: string) {
  try {
    const res = await register(username, email, password);

    if (res.token) {
      (await cookies()).set("token", res.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }

    return { success: true };
  } catch (err) {
    console.error("Register error:", err);
    return { success: false, message: "Error registering user" };
  }
}