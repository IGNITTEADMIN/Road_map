// /app/learn/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LearnRouter() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  // console.log("User role:", session.user?.role);
  if (session.user?.role === "admin") {
    redirect("/admin");
  }

  redirect("/user");
}