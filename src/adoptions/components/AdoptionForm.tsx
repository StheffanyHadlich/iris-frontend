"use client";

import { useState, useEffect } from "react";
import { createAdoptionAction } from "@/adoptions/actions/adoption-actions";
import { fetchPets } from "@/pets/data/services/fetchPets";
import { Pet } from "@/pets/domain/entities/pets.types";
import { User } from "@/auth/domain/entities/user";
import api from "@/auth/data/services/api";

interface AdoptionFormProps {
  onSaved?: (petName: string) => void;
}

export default function AdoptionForm({ onSaved }: AdoptionFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [formData, setFormData] = useState({
    adopterId: "",
    petId: "",
    adoptionDate: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [usersRes, petsRes] = await Promise.all([
          api.get<User[]>("/users"),
          fetchPets(),
        ]);
        setUsers(usersRes.data);
        setPets(petsRes.filter((pet) => pet.status !== "Adopted"));
      } catch (err) {
        console.error("Failed to load form data:", err);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pet = pets.find((p) => p.id === Number(formData.petId));
    if (!pet) return;

    await createAdoptionAction({
      adopterId: Number(formData.adopterId),
      petId: Number(formData.petId),
      adoptionDate: formData.adoptionDate,
    });

    onSaved?.(pet.name);

    setFormData({
      adopterId: "",
      petId: "",
      adoptionDate: "",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Register Adoption</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={formData.adopterId}
          onChange={(e) => setFormData({ ...formData, adopterId: e.target.value })}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <select
          value={formData.petId}
          onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
          required
        >
          <option value="">Select Pet</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={formData.adoptionDate}
          onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Confirm Adoption
        </button>
      </form>
    </div>
  );
}
