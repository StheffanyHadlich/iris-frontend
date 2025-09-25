import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userRepositoryImpl } from "@/auth/data/repositories/user-repository-impl";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const user = await userRepositoryImpl.getCurrentUser(token);

    return (
      <div style={{ padding: 20 }}>
        <h1>Dashboard</h1>
        <p>Welcome, {user.username} ({user.email})</p>
      </div>
    );
  } catch (err) {
    redirect("/auth/login");
  }
}
