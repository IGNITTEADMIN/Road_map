import { NextResponse } from "next/server";
import { addContentEntry } from "@/src/_quarantine/db/queries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await addContentEntry(body);

    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
