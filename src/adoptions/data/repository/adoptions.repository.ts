import api from "@/auth/data/services/api";
import { Adoption, CreateAdoptionDTO } from "@/adoptions/domain/entities/adoption.types";

export async function createAdoptionRepository(
  data: CreateAdoptionDTO,
  token?: string
): Promise<Adoption> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.post<Adoption>("/adoptions", data, { headers });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating adoption:", error.message);
      throw new Error(error.message);
    }
    throw new Error("Failed to create adoption.");
  }
}

export async function getAllAdoptionsRepository(token?: string): Promise<Adoption[]> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.get<Adoption[]>("/adoptions", { headers });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch adoptions:", error.message);
      throw new Error(error.message);
    }
    throw new Error("Unable to load adoptions at the moment.");
  }
}
