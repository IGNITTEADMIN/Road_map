// Server Component — no "use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import AdminPage from "./content/page";

export default async function AdminPageWrapper() {
   
  const session = await getServerSession(authOptions);
 console.log(session);
  if (!session) redirect("/login");

  if (session.user?.role !== "admin") redirect("/");

  return <AdminPage />;
}