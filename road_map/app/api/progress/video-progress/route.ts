import { NextResponse } from "next/server";
import { logVideoProgress } from "@/src/services/progressService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conceptId, percentWatched, watchedSeconds, durationSeconds } = await req.json();

    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email));

    const userId = user[0].id;

    await logVideoProgress(userId, conceptId, {
      percentWatched,
      watchedSeconds,
      durationSeconds,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}