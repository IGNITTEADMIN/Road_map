import { NextResponse } from "next/server";
import { getFullProgress, computeStreak } from "@/src/services/progressService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get userId from DB
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email));

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;

    const progress = await getFullProgress(userId);
    const streak = computeStreak(progress);

    return NextResponse.json({
      progress,
      streak,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}