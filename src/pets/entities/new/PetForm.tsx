"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createPetAction } from "@/pets/actions/pets-actions";
import { PawPrint, Calendar } from "lucide-react";
import { useState } from "react";

type PetFormInputs = {
  name: string;
  species: "DOG" | "CAT" | "BIRD" | "OTHER";
  breed?: string;
  color?: string;
  sex?: "MALE" | "FEMALE" | "UNKNOWN";
  dateOfBirth?: string;
  castrated?: boolean;
  urlPhoto?: string;
  registrationDate: string;
};

export default function PetForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PetFormInputs>();

  const onSubmit = async (data: PetFormInputs) => {
    try {
      await createPetAction(data);
      router.push("/pets?created=1");
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <PawPrint className="text-orange-600 w-12 h-12" />
      </div>

      <h1 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
        Add a New Pet
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Pet name"
            {...register("name", { required: "Pet name is required" })}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("species", { required: "Pet species is required" })}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          >
            <option value="">Select species</option>
            <option value="DOG">Dog 🐶</option>
            <option value="CAT">Cat 🐱</option>
            <option value="BIRD">Bird 🐦</option>
            <option value="OTHER">Other 🐾</option>
          </select>
          {errors.species && (
            <p className="text-red-500 text-sm mt-1">{errors.species.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Breed (optional)"
            {...register("breed")}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Color (optional)"
            {...register("color")}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="MALE"
              {...register("sex")}
              className="accent-orange-600"
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="FEMALE"
              {...register("sex")}
              className="accent-orange-600"
            />
            Female
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="UNKNOWN"
              {...register("sex")}
              className="accent-orange-600"
              defaultChecked
            />
            Unknown
          </label>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="date"
            {...register("dateOfBirth")}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("castrated")}
            className="accent-orange-600"
          />
          <span>Castrated</span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Photo URL (optional)"
            {...register("urlPhoto")}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="date"
            {...register("registrationDate", {
              required: "Date of registration is required",
            })}
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.registrationDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationDate.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white shadow-md hover:bg-orange-700 hover:shadow-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/pets")}
            className="w-full rounded-xl bg-gray-300 py-3 font-semibold text-gray-700 shadow-md hover:bg-gray-400 hover:shadow-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
