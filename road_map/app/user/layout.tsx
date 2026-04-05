import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserProviders from "@/app/user/providers"; // ✅ import wrapper

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user?.role !== "user") redirect("/");

  if (!session.user?.profileCompleted) redirect("/profile");

  return (
    <UserProviders> {/* ✅ wrap here */}
      <main className="bg-black min-h-screen text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {children}
        </div>
      </main>
    </UserProviders>
  );
}