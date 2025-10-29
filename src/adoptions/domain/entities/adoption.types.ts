export interface Adoption {
  id: number;
  adopterId: number;
  petId: number;
  adoptionDate: string;
  createdAt: string;
}

export interface CreateAdoptionDTO {
  adopterId: number;
  petId: number;
  adoptionDate: string;
}
