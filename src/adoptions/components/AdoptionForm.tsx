"use client";

import { useState } from "react";
import { createAdoptionAction } from "@/adoptions/actions/adoption-actions";
import { useAdoptionForm, type AdoptionFormData, type Adopter } from "./useAdoptionForm";
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

  const { adopters, pets, loading, error } = useAdoptionForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pet = pets.find((p) => p.id === Number(formData.petId));
    const adopter = adopters.find((a) => a.id === Number(formData.adopterId));
    
    if (!pet) {
      alert("Please select a valid pet");
      return;
    }
    
    if (!adopter) {
      alert("Please select a valid adopter");
      return;
    }
    
    console.log("📤 Creating adoption:", {
      adopterId: formData.adopterId,
      petId: formData.petId,
      adoptionDate: formData.adoptionDate,
    });

    try {
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
      
      alert("Adoption created successfully!");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
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
      adopters={adopters}
      pets={pets}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onInputChange={handleInputChange}
    />
  );
}