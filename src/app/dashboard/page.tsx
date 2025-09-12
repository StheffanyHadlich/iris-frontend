import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/repositories/user-repository";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const user = await getCurrentUser(token);

    return (
      <div style={{ padding: 20 }}>
        <h1>Dashboard</h1>
        <p>
          Welcome, {user.username} ({user.email})
        </p>
      </div>
    );
  } catch {
    redirect("/auth/login");
  }
}
