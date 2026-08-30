//./app/api/progress/meta/route.ts
import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { chapter, concept } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const track = (searchParams.get("track") as "JEE" | "BRIDGE" | null) ?? "JEE";

    const chapters = await db
      .select()
      .from(chapter)
      .where(eq(chapter.track, track))
      .orderBy(chapter.subject, chapter.order);

    const chapterIds = chapters.map((ch) => ch.id);
    const allConcepts = await db
      .select()
      .from(concept)
      .orderBy(concept.chapterId, concept.orderIndex);

    const concepts = allConcepts.filter((c) => chapterIds.includes(c.chapterId));

    const map: Record
      string,
      Record<number, { order: number; concepts: { id: number; orderIndex: number }[] }>
    > = {
      PHYSICS: {},
      CHEMISTRY: {},
      MATHS: {},
    };

    chapters.forEach((ch) => {
      if (!map[ch.subject]) return;

      map[ch.subject][ch.id] = {
        order: ch.order,
        concepts: [],
      };
    });

    concepts.forEach((c) => {
      const ch = chapters.find((ch) => ch.id === c.chapterId);
      if (!ch) return;

      map[ch.subject][ch.id].concepts.push({
        id: c.id,
        orderIndex: c.orderIndex,
      });
    });

    return NextResponse.json(map);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch meta" }, { status: 500 });
  }
}