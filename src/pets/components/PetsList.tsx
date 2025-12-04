"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPets } from "@/pets/data/services/fetchPets";
import { Pet } from "@/pets/domain/entities/pets.types";
import PetCard from "@/pets/components/PetCard";
import { Button } from "@/common/components/button/button";
import { Plus, PawPrint, Heart } from "lucide-react";

export default function PetsList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await fetchPets();
        setPets(data);
      } catch (err: unknown) {
        console.error("Failed to load pets:", err);

        if (typeof err === "object" && err !== null && "response" in err) {
          const axiosErr = err as { response?: { status?: number } };
          if (axiosErr.response?.status === 401) {
            setError("Please log in to view your pets.");
            return;
          }
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load pets. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [router]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-lg text-orange-700 font-medium">Loading your pets...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl max-w-md">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );

  const handleAddPet = () => router.push("/pets/new");
  const handleAdoption = () => router.push("/adoptions/new"); // Nova função

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full shadow-lg">
            <PawPrint className="w-12 h-12 text-orange-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-orange-800 mb-4">
          Welcome to Your Pet Dashboard
        </h1>
        <p className="text-lg text-orange-600 max-w-2xl mx-auto">
          Here you can manage all your cute friends and their information.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-orange-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-orange-900">
              Pet Collection
            </h2>
            <p className="text-orange-600">
              There are {pets.length} {pets.length === 1 ? 'pet' : 'pets'} in your care
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Botão de Adoção */}
            <Button 
              onClick={handleAdoption}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Register Adoption
            </Button>
            
            {/* Botão de Adicionar Pet */}
            <Button 
              onClick={handleAddPet}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Pet
            </Button>
          </div>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 text-center border border-orange-200">
          <div className="max-w-md mx-auto">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <PawPrint className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              No Pets Yet
            </h3>
            <p className="text-orange-600 mb-6">
              You don't have any pets yet. Start by adding your first furry friend to your family!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleAdoption}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Register Adoption
              </Button>
              <Button 
                onClick={handleAddPet}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Pet
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
          
          {/* Botão adicional no final da lista */}
          <div className="mt-10 text-center">
            <Button 
              onClick={handleAdoption}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Start New Adoption Process
            </Button>
            <p className="text-gray-500 text-sm mt-3">
              Found a loving home for a pet? Register the adoption here.
            </p>
          </div>
        </>
      )}
    </div>
  );
}