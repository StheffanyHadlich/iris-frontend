"use server";

import { cookies } from "next/headers";
import { createPetRepository } from "@/pets/repository/pets.repository";

export async function createPetAction(data: any) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("User not authenticated");

    const pet = await createPetRepository(data, token);
    return pet;
  } catch (error: any) {
    console.error("Error creating pet:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to create pet. Please try again."
    );
  }
}
