import api from "@/auth/data/services/api";
import { PetFormInputs } from "@/pets/domain/entities/pets";

export async function createPetRepository(data: PetFormInputs, token: string) {
  const response = await api.post("/pets", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function fetchSpeciesRepository(): Promise<
  { value: string; label: string }[]
> {
  const response = await api.get("/pets/species");
  return response.data as { value: string; label: string }[];
}
