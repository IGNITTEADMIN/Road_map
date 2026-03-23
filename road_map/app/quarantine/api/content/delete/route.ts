//DELETE

import { NextResponse } from "next/server";
import { deleteContentEntry } from "@/src/_quarantine/db/queries";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing content id" },
        { status: 400 }
      );
    }

    const result = await deleteContentEntry(Number(id));
    return NextResponse.json({ deleted: result[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
