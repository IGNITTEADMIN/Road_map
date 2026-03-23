import { NextResponse } from "next/server";
import { getContentBySubject } from "@/src/_quarantine/db/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");

  if (!subject) {
    return NextResponse.json(
      { error: "subject required" },
      { status: 400 }
    );
  }

  const data = await getContentBySubject(subject);
  return NextResponse.json(data);
}
