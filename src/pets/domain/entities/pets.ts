export interface Pet {
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
