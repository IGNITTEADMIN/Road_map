///api/chapters/get/route.ts
import {NextResponse} from "next/server";
import {getChaptersBySubject} from "@/src/db/queries";
import type { Subject, Track } from "@/src/db/queries";
import { requireAuth} from "@/src/lib/apiAuth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject") as Subject | null;
  const track = (searchParams.get("track") as Track | null) ?? "JEE"; // 🆕 defaults to JEE

  if (!subject) {
    return NextResponse.json({ error: "Missing subject" }, { status: 400 });
  }

  try {
    const chapters = await getChaptersBySubject(subject, track);
    return NextResponse.json(chapters);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 });
  }
}