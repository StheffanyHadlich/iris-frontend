"use client";

import PetsList from "@/pets/components/PetsList";

export default function PetsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <PetsList />
      </div>
    </div>
  );
}