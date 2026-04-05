import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { chapter, concept } from "@/src/db/schema";

export async function GET() {
  try {
    // 1. Fetch chapters (ordered)
    const chapters = await db
      .select()
      .from(chapter)
      .orderBy(chapter.subject, chapter.order);

    // 2. Fetch concepts (ordered)
    const concepts = await db
      .select()
      .from(concept)
      .orderBy(concept.chapterId, concept.orderIndex);

    // 3. Prepare map
    const map: Record<
      string,
      Record<number, { order: number; concepts: { id: number; orderIndex: number }[] }>
    > = {
      PHYSICS: {},
      CHEMISTRY: {},
      MATHS: {},
    };

    // 4. Initialize chapters
    chapters.forEach((ch) => {
      if (!map[ch.subject]) return;

      map[ch.subject][ch.id] = {
        order: ch.order,
        concepts: [],
      };
    });

    // 5. Fill concepts
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