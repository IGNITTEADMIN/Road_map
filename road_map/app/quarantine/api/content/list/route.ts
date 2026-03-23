//Given subject and chapter name,lists all concepts under them
// /app/api/content/list/route.ts

//GET /api/content/list?subject=Physics&chapter=Kinematics

import { NextResponse } from "next/server";
import { getConcepts } from "@/src/_quarantine/db/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  const chapter = searchParams.get("chapter");

  if (!subject || !chapter) {
    return NextResponse.json(
      { error: "subject and chapter required" },
      { status: 400 }
    );
  }

  const data = await getConcepts(subject, chapter);
  return NextResponse.json(data);
}
