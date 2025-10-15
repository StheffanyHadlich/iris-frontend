import api from '@/auth/data/services/api';
import { Pet } from '@/pets/domain/entities/pets.types';

export async function fetchPets(): Promise<Pet[]> {
  try {
    const { data } = await api.get<Pet[]>('/pets');
    return data;
  } catch (error) {
    console.error('Failed to fetch pets:', error);
    throw new Error('Unable to fetch pets at the moment.');
  }
}