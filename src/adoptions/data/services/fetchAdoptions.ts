import { createAdoptionRepository, getAllAdoptionsRepository } from "../repository/adoptions.repository";
import { CreateAdoptionDTO, Adoption } from "@/adoptions/domain/entities/adoption.types";

export async function createAdoptionService(data: CreateAdoptionDTO, token: string): Promise<Adoption> {
  return await createAdoptionRepository(data, token);
}

export async function getAdoptionsService(token: string): Promise<Adoption[]> {
  return await getAllAdoptionsRepository(token);
}
