import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user?.role !== "admin") redirect("/");

  return (
    <main className="bg-black min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {children}
      </div>
    </main>
  );
}