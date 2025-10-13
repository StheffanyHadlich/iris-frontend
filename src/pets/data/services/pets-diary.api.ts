import api from '@/auth/data/services/api';
import { DiaryEntry } from '@/pets/domain/entities/pets';

export async function fetchPetDiary(petId: number): Promise<DiaryEntry[]> {
  const { data } = await api.get<DiaryEntry[]>(`/pets/${petId}/diary`);
  return data;
}

export async function createDiaryEntry(petId: number, body: { date: string; description: string }) {
  const { data } = await api.post(`/pets/${petId}/diary`, body);
  return data;
}
