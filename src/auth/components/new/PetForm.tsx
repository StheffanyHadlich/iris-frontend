"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createPetAction } from "@/auth/actions/pets-actions";
import { PawPrint, Calendar, Scale } from "lucide-react";
import { useState } from "react";

type PetFormInputs = {
  name: string;
  age: number;
  type: string;
  race?: string;
  currentWeight?: number;
  urlPhoto?: string;
  registrationDate: string;
};

export default function PetForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormInputs>();

  const onSubmit = async (data: PetFormInputs) => {
    try {
      const payload = {
        ...data,
        age: Number(data.age),
        currentWeight: data.currentWeight ? Number(data.currentWeight) : undefined,
      };

      await createPetAction(payload);
      router.push("/pets?created=1");
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="w-full">
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
        <div className="relative">
          <input
            type="text"
            placeholder="Pet name"
            {...register("name", { required: "Pet name is required" })}
            className="w-full rounded-xl border border-gray-300 pl-3 pr-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="number"
            placeholder="Age"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 0, message: "Age cannot be negative" },
            })}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div className="relative">
          <select
            {...register("type", { required: "Pet species is required" })}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          >
            <option value="">Select species</option>
            <option value="dog">Dog 🐶</option>
            <option value="cat">Cat 🐱</option>
            <option value="bird">Bird 🐦</option>
            <option value="other">Other 🐾</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Breed (optional)"
            {...register("race")}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        <div className="relative flex items-center gap-2">
          <Scale className="text-gray-400" size={20} />
          <input
            type="number"
            step="0.01"
            placeholder="Current Weight (kg, optional)"
            {...register("currentWeight", { valueAsNumber: true })}
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

        <div className="relative">
          <input
            type="text"
            placeholder="Photo URL (optional)"
            {...register("urlPhoto")}
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
          />
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
