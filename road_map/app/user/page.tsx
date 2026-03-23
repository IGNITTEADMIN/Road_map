// Server Component 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserPage from "./content/page";

import UserClientPage from "./content/page";

export default async function UserPageWrapper() {
  
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user?.role !== "user") redirect("/");

  return <UserPage />;
}