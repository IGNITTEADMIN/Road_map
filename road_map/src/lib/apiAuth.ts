import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

export async function requireUser() {
  const session = await requireAuth();

  if (session.user?.role !== "user") {
    throw new Error("FORBIDDEN");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user?.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  return session;
}