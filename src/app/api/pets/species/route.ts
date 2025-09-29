import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const backendUrl = "http://localhost:3000/pets/species";

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const res = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch species from backend");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching species:", err);
    return NextResponse.json(
      { message: "Could not load species options" },
      { status: 500 }
    );
  }
}
