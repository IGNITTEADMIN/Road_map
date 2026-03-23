import { NextResponse } from "next/server";
import { addChapter } from "@/src/_quarantine/db/queries";

export async function POST(req: Request) {
  const { subject, chapter } = await req.json();

  if (!subject || !chapter) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await addChapter(subject, chapter);
  return NextResponse.json({ success: true });
}
