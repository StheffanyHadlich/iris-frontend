"use client";
import React from "react";
import { DiaryEntry } from "@/pets/domain/entities/pets";

export default function DiaryList({ entries }: { entries: DiaryEntry[] }) {
  if (!entries.length) return <p>No diary entries yet.</p>;

  return (
    <ul className="space-y-4">
      {entries.map(e => (
        <li key={e.id} className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">{new Date(e.dailyDate).toLocaleDateString()}</div>
          <p className="mt-2 text-gray-800">{e.notes}</p>
        </li>
      ))}
    </ul>
  );
}
