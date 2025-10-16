"use server";

import { cookies } from "next/headers";
import { createPetRepository } from "@/pets/data/repository/pets.repository";
import { PetFormInputs } from "@/pets/domain/entities/pets.types";

export async function createPetAction(data: PetFormInputs) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("User not authenticated");

    const pet = await createPetRepository(data, token);
    return pet;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating pet:", error.message);
      throw new Error("Failed to create pet. Please try again.");
    }

    // Caso o erro venha do Axios (response.data)
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosErr = error as { response?: { data?: { message?: string } } };
      console.error("Error creating pet:", axiosErr.response?.data);
      throw new Error(axiosErr.response?.data?.message ?? "Unknown error");
    }

    throw new Error("Unexpected error occurred.");
  }
}
