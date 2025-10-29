export interface Pet {
  status: string;
  id: number;
  name: string;
  species: string;
  breed?: string;
  urlPhoto?: string;
}

export type PetFormInputs = {
  name: string;
  species: string;
  breed?: string;
  color?: string;
  sex?: "MALE" | "FEMALE" | "UNKNOWN";
  dateOfBirth?: string;
  castrated?: boolean;
  urlPhoto?: string;
  registrationDate: string;
};

export interface DiaryEntry {
  id: number;
  petId: number;
  dailyDate: string;
  weight?: string | null;
  notes?: string | null;
  prescriptionNotes?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
