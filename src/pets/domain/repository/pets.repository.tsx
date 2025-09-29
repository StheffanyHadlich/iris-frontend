import api from "@/auth/data/services/api";

export async function createPetRepository(data: any, token: string) {
  const response = await api.post("/pets", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
