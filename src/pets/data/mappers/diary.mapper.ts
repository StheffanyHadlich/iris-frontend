import { DiaryEntry } from "@/pets/domain/entities/pets.types";

interface ApiDiaryResponse {
  id: number;
  date: string;
  description: string;
  petId: number;
  createdAt: string;
}

export function toApiDiaryPayload(entry: Pick<DiaryEntry, "dailyDate" | "notes">) {
  return {
    date: entry.dailyDate,
    description: entry.notes,
  };
}

export function fromApiDiaryResponse(apiData: ApiDiaryResponse): DiaryEntry {
  return {
    id: apiData.id,
    dailyDate: apiData.date,
    notes: apiData.description,
    petId: apiData.petId,
    createdAt: apiData.createdAt,
  };
}
