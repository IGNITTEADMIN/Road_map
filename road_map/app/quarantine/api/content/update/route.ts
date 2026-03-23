//PUT

import { NextResponse } from "next/server";
import { updateContentEntry } from "@/src/_quarantine/db/queries";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing content id" },
        { status: 400 }
      );
    }

    const result = await updateContentEntry(Number(id), updateData);
    return NextResponse.json(result[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
