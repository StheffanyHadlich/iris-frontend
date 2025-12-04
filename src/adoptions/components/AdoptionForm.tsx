"use client";

import { useState } from "react";
import { createAdoptionAction } from "@/adoptions/actions/adoption-actions";
import { useAdoptionForm, type AdoptionFormData } from "./useAdoptionForm";
import AdoptionFormView from "./AdoptionFormView";

interface AdoptionFormProps {
  onSaved?: (petName: string) => void;
}

export default function AdoptionForm({ onSaved }: AdoptionFormProps) {
  const [formData, setFormData] = useState<AdoptionFormData>({
    adopterId: "",
    petId: "",
    adoptionDate: "",
  });

  const { users, pets, loading, error } = useAdoptionForm();

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AdoptionFormView
      formData={formData}
      users={users}
      pets={pets}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
    />
  );
}