import React from "react";
import { Pet } from "@/pets/domain/entities/pets.types";
import { Card, CardContent, CardHeader } from "@/common/components/card/card";
import { Button } from "@/common/components/button/button";
import Image from "next/image";
import { Edit2, Heart } from "lucide-react";

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  const isValidImageUrl = (url?: string): boolean => {
    if (!url) return false;
    if (url.trim() === "") return false;

    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  };

  const imageSrc = isValidImageUrl(pet.urlPhoto)
    ? pet.urlPhoto!
    : "/default-pet.png";

  return (
    <Card className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-200 hover:border-orange-300 overflow-hidden">
      <CardHeader className="pb-0">
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-amber-100 rounded-t-2xl flex items-center justify-center overflow-hidden">
            <Image
              src={imageSrc}
              alt={pet.name}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/default-pet.png";
              }}
            />
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
              <Heart className="w-4 h-4" fill="currentColor" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-bold text-orange-900 mb-2 group-hover:text-orange-700 transition-colors">
          {pet.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
          <p className="text-sm text-orange-600 font-medium">
            {pet.breed || pet.species}
          </p>
        </div>

        <div className="flex justify-between items-center mb-4 px-2">
          <div className="text-center">
            <div className="text-xs text-orange-500 uppercase tracking-wide">
              Species
            </div>
            <div className="text-sm font-semibold text-orange-800">
              {pet.species}
            </div>
          </div>
          <div className="w-px h-8 bg-orange-200"></div>
          <div className="text-center">
            <div className="text-xs text-orange-500 uppercase tracking-wide">
              Breed
            </div>
            <div className="text-sm font-semibold text-orange-800">
              {pet.breed || "Mixed"}
            </div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
          <Edit2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
