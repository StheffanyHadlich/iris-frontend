"use server";

import { cookies } from "next/headers";
import { login as loginService, register as registerService } from "@/auth/data/services/auth";

type ActionResult = { success: true } | { success: false; message?: string };

/* Log in the user by calling the login service, storing the returned token in an HTTP-only cookie.*/
export async function loginAction(email: string, password: string): Promise<ActionResult> {
  try {
    const res = await loginService(email, password);

    const token = res.access_token;
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

/* Register and automatically log in the user if registration returns a token. If not, attempt to log in right after registering.*/
export async function registerAction(username: string, email: string, password: string): Promise<ActionResult> {
  try {
    const res = await registerService(username, email, password);

    const token = res.access_token;
    if (token) {
      (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      return { success: true };
    }

    // fallback: attempt login flow to get token automatically
    const loginRes = await loginService(email, password);
    if (loginRes.access_token) {
      (await cookies()).set("token", loginRes.access_token, {
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
    // try to surface backend message if available
    const message = (err as any)?.response?.data?.message ?? "Error registering user";
    return { success: false, message };
  }
}
