import PetForm from "@/pets/components/PetForm";

export default function NewPetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-md p-10 shadow-2xl">
        <PetForm />
      </div>
    </div>
  );
}
