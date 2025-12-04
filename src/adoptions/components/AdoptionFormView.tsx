import { Pet } from "@/pets/domain/entities/pets.types";
import { AdoptionFormData, Adopter } from "./useAdoptionForm";

interface AdoptionFormViewProps {
  formData: AdoptionFormData;
  adopters: Adopter[];  // Mude de users para adopters
  pets: Pet[];
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export default function AdoptionFormView({
  formData,
  adopters,  // Recebe adopters em vez de users
  pets,
  loading,
  error,
  onSubmit,
  onInputChange,
}: AdoptionFormViewProps) {
  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading adopters and pets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (adopters.length === 0) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 text-center">
        <p className="text-yellow-600 mb-4">No adopters found</p>
        <p className="text-gray-600 text-sm">
          You need to register adopters before creating adoptions.
        </p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 text-center">
        <p className="text-yellow-600 mb-4">No available pets found</p>
        <p className="text-gray-600 text-sm">
          All pets are already adopted or there are no pets registered.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Register Adoption</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Adopter
          </label>
          <select
            name="adopterId"
            value={formData.adopterId}
            onChange={onInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Choose an adopter...</option>
            {adopters.map((adopter) => (
              <option key={adopter.id} value={adopter.id}>
                {adopter.name} ({adopter.email})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {adopters.length} adopters available
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Pet
          </label>
          <select
            name="petId"
            value={formData.petId}
            onChange={onInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Choose a pet...</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.species.toLowerCase()})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {pets.length} pets available for adoption
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adoption Date
          </label>
          <input
            type="date"
            name="adoptionDate"
            value={formData.adoptionDate}
            onChange={onInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          disabled={!formData.adopterId || !formData.petId || !formData.adoptionDate}
        >
          Confirm Adoption
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          This will create a new adoption record in the system.
        </p>
      </form>
    </div>
  );
}