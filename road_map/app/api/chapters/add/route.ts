//./app/api/chapters/add/route.ts
import { NextResponse } from "next/server";
import { insertChapter } from "@/src/db/queries";
import type { Subject } from "@/src/db/queries";
import { requireAdmin } from "@/src/lib/apiAuth";

export async function POST(req: Request) {
  await requireAdmin();
  try {
    const { subject, chapterName, clusterTag } = await req.json();

    if (!chapterName) {
      return NextResponse.json({ error: "Chapter name required" }, { status: 400 });
    }

    const result = await insertChapter(
      subject as Subject,
      chapterName,
      clusterTag
    );

    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}