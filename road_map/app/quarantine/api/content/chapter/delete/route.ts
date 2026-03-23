import { NextResponse } from "next/server";
import { deleteChapter } from "@/src/_quarantine/db/queries";

export async function DELETE(req: Request) {
  const { subject, chapter } = await req.json();

  if (!subject || !chapter) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await deleteChapter(subject, chapter);
  return NextResponse.json({ success: true });
}
