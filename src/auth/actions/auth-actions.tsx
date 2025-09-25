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

    (await cookies()).set("token", token, {
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

export async function registerAction(username: string, email: string, password: string): Promise<ActionResult> {
  try {
    const res = await registerService(username, email, password);

    const token = res.accessToken;
    if (token) {
      (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      return { success: true };
    }

    const loginRes = await loginService(email, password);
    if (loginRes.accessToken) {
      (await cookies()).set("token", loginRes.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      return { success: true };
    }

    return { success: false, message: "Registration succeeded but could not authenticate" };
  } catch (err) {
    console.error("Register error:", err);
    const message = (err as any)?.response?.data?.message ?? "Error registering user";
    return { success: false, message };
  }
}
