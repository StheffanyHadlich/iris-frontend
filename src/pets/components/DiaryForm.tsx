"use client";
import { useForm } from "react-hook-form";
import { createDiaryEntry } from "@/pets/data/repository/petsDiary";

export default function DiaryForm({ petId, onSaved }: { petId: number; onSaved: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ date: string; description: string }>();

  const onSubmit = async (data: { date: string; description: string }) => {
    // Convert from DD-MM-YYYY → YYYY-MM-DD
    const [day, month, year] = data.date.split("-");
    const formattedDate = `${year}-${month}-${day}`;

    await createDiaryEntry(petId, {
      dailyDate: formattedDate,
      notes: data.description,
    });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input
        type="text"
        placeholder="DD-MM-YYYY"
        {...register("date", { required: true })}
        className="border rounded p-2 w-full"
      />
      <textarea
        {...register("description", { required: true })}
        className="border rounded p-2 w-full"
      />
      <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save entry
      </button>
    </form>
  );
}
