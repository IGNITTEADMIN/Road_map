import { NextResponse } from "next/server";
import { getAllSubjects } from "@/src/_quarantine/db/queries";

export async function GET() {
  try {
    const rows = await getAllSubjects();
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
