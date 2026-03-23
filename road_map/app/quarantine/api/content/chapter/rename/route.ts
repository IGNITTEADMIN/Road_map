import { NextResponse } from "next/server";
import { renameChapter } from "@/src/_quarantine/db/queries";

export async function PUT(req: Request) {
  const { subject, oldChapter, newChapter } = await req.json();

  if (!subject || !oldChapter || !newChapter) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await renameChapter(subject, oldChapter, newChapter);
  return NextResponse.json({ success: true });
}
