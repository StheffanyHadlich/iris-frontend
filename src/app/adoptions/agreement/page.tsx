import AdoptionAgreement from "@/adoptions/components/AdoptionAgreement";
import { useSearchParams } from "next/navigation";

export default function AdoptionAgreementPage() {
  const searchParams = useSearchParams();
  const petName = searchParams.get("pet") ?? "your new companion";

  return <AdoptionAgreement petName={petName} />;
}
