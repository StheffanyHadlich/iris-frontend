import DiaryList from "@/pets/components/DiaryList";
import DiaryForm from "@/pets/components/DiaryForm";
import { fetchPetDiary } from "@/pets/data/repository/petsDiary";

export default async function PetDiaryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const petId = Number(resolvedParams.id);
  const entries = await fetchPetDiary(petId);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Diary</h1>
      <DiaryList entries={entries} />
      <DiaryForm petId={petId} onSaved={() => { /* revalidate or refresh logic */ }} />
    </div>
  );
}