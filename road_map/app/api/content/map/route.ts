import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { chapter, concept } from "@/src/db/schema";

export async function GET() {
  try {
    const chapters = await db.select().from(chapter);

    const concepts = await db.select().from(concept);

    const map: Record<string, Record<number, number[]>> = {
      PHYSICS: {},
      CHEMISTRY: {},
      MATHS: {},
    };

    chapters.forEach((ch) => {
      if (!map[ch.subject]) return;
      map[ch.subject][ch.id] = [];
    });

    concepts.forEach((c) => {
      const ch = chapters.find((ch) => ch.id === c.chapterId);
      if (!ch) return;

      map[ch.subject][ch.id].push(c.id);
    });

    return NextResponse.json(map);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}