"use server";

import api from "@/auth/data/services/api";
import { cookies } from "next/headers";

export async function createPetAction(data: any) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("User not authenticated");

    const response = await api.post("/pets", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating pet:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to create pet. Please try again."
    );
  }
}
