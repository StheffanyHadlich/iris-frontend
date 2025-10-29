"use client"

import { useState } from "react";
import AdoptionForm from "@/adoptions/components/AdoptionForm";
import AdoptionAgreement from "@/adoptions/components/AdoptionAgreement";

export default function AdoptionPage() {
  const [selectedPetName, setSelectedPetName] = useState<string>("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Register Pet Adoption</h1>
      <AdoptionForm onSaved={(petName) => setSelectedPetName(petName)} />
      {selectedPetName && (
        <div className="mt-6">
          <AdoptionAgreement petName={selectedPetName} />
        </div>
      )}
    </div>
  );
}
