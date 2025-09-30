"use server";

import { cookies } from "next/headers";
import { login as loginService, register as registerService } from "@/auth/data/services/auth";

type ActionResult = { success: true } | { success: false; message?: string };

export async function loginAction(email: string, password: string): Promise<ActionResult> {
  try {
    const res = await loginService(email, password);

    const token = res.accessToken;
    if (!token) {
      return { success: false, message: "No token returned from API" };
    }

    const cookieStore = await cookies();
    
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Invalid credentials." };
  }
}