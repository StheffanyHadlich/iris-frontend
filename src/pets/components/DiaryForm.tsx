"use client";
import { useForm } from "react-hook-form";
import { createDiaryEntry } from "@/pets/data/services/pets-diary.api";

export default function DiaryForm({ petId, onSaved }: { petId: number, onSaved: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ date: string; description: string }>();

  const onSubmit = async (data: any) => {
    await createDiaryEntry(petId, data);
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input type="date" {...register("date", { required: true })} className="..." />
      <textarea {...register("description", { required: true })} className="..." />
      <button type="submit" disabled={isSubmitting}>Save entry</button>
    </form>
  );
}
