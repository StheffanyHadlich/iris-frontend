// adoption-form.hook.ts
import { useState, useEffect } from "react";
import { fetchPets } from "@/pets/data/services/fetchPets";
import { Pet } from "@/pets/domain/entities/pets.types";
import { User } from "@/auth/domain/entities/user";
import api from "@/auth/data/services/api";

export interface AdoptionFormData {
  adopterId: string;
  petId: string;
  adoptionDate: string;
}

export function useAdoptionForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [usersRes, petsRes] = await Promise.all([
          api.get<User[]>("/users"),
          fetchPets(),
        ]);
        setUsers(usersRes.data);
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
    users,
    pets,
    loading,
    error,
  };
}