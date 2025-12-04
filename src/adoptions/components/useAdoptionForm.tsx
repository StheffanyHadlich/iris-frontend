import { useState, useEffect } from "react";
import { fetchPets } from "@/pets/data/services/fetchPets";
import { Pet } from "@/pets/domain/entities/pets.types";
import api from "@/auth/data/services/api";

export interface Adopter {
  id: number;
  name: string;
  email: string;
  telephone?: string;
  address?: string;
}

export interface AdoptionFormData {
  adopterId: string;
  petId: string;
  adoptionDate: string;
}

export function useAdoptionForm() {
  const [adopters, setAdopters] = useState<Adopter[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        const [adoptersRes, petsRes] = await Promise.all([
          api.get<Adopter[]>("/adopter"),
          fetchPets(),
        ]);
        
        console.log("👥 Adopters carregados:", adoptersRes.data);
        console.log("🐾 Pets carregados:", petsRes.length);
        
        setAdopters(adoptersRes.data);
        setPets(petsRes.filter((pet) => pet.status !== "Adopted"));
        
      } catch (err) {
        console.error("Failed to load form data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return {
    adopters,
    pets,
    loading,
    error,
  };
}