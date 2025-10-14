import api from "@/auth/data/services/api";
import { DiaryEntry } from "@/pets/domain/entities/pets.types";
import { fromApiDiaryResponse, toApiDiaryPayload } from "@/pets/data/mappers/diary.mapper";

type DiaryApiResponse = {
  id: number;
  date: string;
  description: string;
  petId: number;
  createdAt: string;
};

export async function fetchPetDiary(petId: number): Promise<DiaryEntry[]> {
  const { data } = await api.get<DiaryApiResponse[]>(`/pets/${petId}/diary`);
  return data.map(fromApiDiaryResponse);
}

export async function createDiaryEntry(
  petId: number,
  entry: Pick<DiaryEntry, "dailyDate" | "notes">
): Promise<DiaryEntry> {
  const payload = toApiDiaryPayload(entry);
  const { data } = await api.post<DiaryApiResponse>(`/pets/${petId}/diary`, payload);
  return fromApiDiaryResponse(data);
}
