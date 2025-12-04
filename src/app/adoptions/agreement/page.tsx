"use client";

import { Suspense } from "react";
import AdoptionAgreement from "@/adoptions/components/AdoptionAgreement";
import { useSearchParams } from "next/navigation";

function LoadingFallback() {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 mx-auto"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function AdoptionAgreementContent() {
  const searchParams = useSearchParams();
  const petName = searchParams.get("pet") ?? "your new companion";

  return <AdoptionAgreement petName={petName} />;
}

export default function AdoptionAgreementPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AdoptionAgreementContent />
    </Suspense>
  );
}
