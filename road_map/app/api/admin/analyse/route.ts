import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getOBUsers, Track } from "@/src/db/queries";
import { computeStudentAnalyse } from "@/src/services/progressService";

const RANGE_DAYS: Record<string, number | null> = {
  "7d": 7,
  "14d": 14,
  "30d": 30,
  "90d": 90,
  all: null,
};

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requester = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.email, session.user.email));

    if (requester[0]?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const track = (searchParams.get("track") as Track | null) ?? "JEE";
    const rangeKey = searchParams.get("range") ?? "all";
    const rangeDays = RANGE_DAYS[rangeKey] ?? null;

    const obUsers = await getOBUsers();

    const results = await Promise.all(
      obUsers.map((u) => computeStudentAnalyse(u.id, track, u.name ?? "Unnamed", u.email, rangeDays))
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to compute analyse data" }, { status: 500 });
  }
}