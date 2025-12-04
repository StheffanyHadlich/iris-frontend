"use server";

import { cookies } from "next/headers";
import { createAdoptionRepository } from "@/adoptions/data/repository/adoptions.repository";
import { CreateAdoptionDTO } from "@/adoptions/domain/entities/adoption.types";

export async function createAdoptionAction(data: CreateAdoptionDTO) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("User not authenticated");

    return await createAdoptionRepository(data, token);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating adoption:", error.message);
      throw new Error(error.message);
    }
    throw new Error("Failed to create adoption.");
  }
}
