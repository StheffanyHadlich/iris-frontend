// adoption-form.view.tsx
import { User } from "@/auth/domain/entities/user";
import { Pet } from "@/pets/domain/entities/pets.types";
import { AdoptionFormData } from "./useAdoptionForm";

interface AdoptionFormViewProps {
  formData: AdoptionFormData;
  users: User[];
  pets: Pet[];
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export default function AdoptionFormView({
  formData,
  users,
  pets,
  loading,
  error,
  onSubmit,
  onInputChange,
}: AdoptionFormViewProps) {
  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Register Adoption</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <select
          name="adopterId"
          value={formData.adopterId}
          onChange={onInputChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <select
          name="petId"
          value={formData.petId}
          onChange={onInputChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
          name="adoptionDate"
          value={formData.adoptionDate}
          onChange={onInputChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
          disabled={!formData.adopterId || !formData.petId || !formData.adoptionDate}
        >
          Confirm Adoption
        </button>
      </form>
    </div>
  );
}