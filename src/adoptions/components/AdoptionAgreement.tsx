import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/button/button";

interface AdoptionAgreementProps {
  petName: string;
}

export default function AdoptionAgreement({ petName }: AdoptionAgreementProps) {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Adoption Commitment</h1>

      <div className="text-gray-800 space-y-4 leading-relaxed">
        <p>
          I commit to caring for the health and safety of <strong>{petName}</strong>,
          providing proper food and fresh water.
        </p>

        <p>
          I will maintain a safe environment with no street access, avoiding any
          risk of escape or accidents.
        </p>

        <p>
          I will ensure the animal’s health through spaying/neutering and vaccination,
          as guided by a licensed veterinarian.
        </p>

        <p>
          I will never abandon, mistreat, or transfer the adoption to third parties
          without notifying the organization.
        </p>

        <p>
          I will provide affection, attention, and respect, ensuring that{" "}
          <strong>{petName}</strong> enjoys quality of life and well-being.
        </p>

        <p>
          I understand adoption is an act of love — but also a lifelong responsibility —
          and that the life and happiness of <strong>{petName}</strong> depend on my commitment.
        </p>
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={() => router.push("/pets")}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-2"
        >
          Return to Pet List
        </Button>
      </div>
    </div>
  );
}
