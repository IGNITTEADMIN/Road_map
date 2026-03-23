// /lib/sync/syncContent.ts

import { db } from "@/src/_quarantine/db/client";
import { content } from "@/src/_quarantine/db/schema";

import { getNotionContent } from "@/src/_quarantine/lib/notion/getContent";
import { eq } from "drizzle-orm";

export async function syncContent() {
  const notionRows = await getNotionContent();

  for (const row of notionRows) {
    // Check if this concept already exists
    const existing = await db
      .select()
      .from(content)
      .where(
        eq(content.subject, row.subject) &&
        eq(content.chapter, row.chapter) &&
        eq(content.concept, row.concept)
      );

    // If already in DB → update instead of re-insert
    if (existing.length > 0) {
      await db
        .update(content)
        .set({
          order_index: row.order_index,
          video_title: row.video_title,
          video_url: row.video_url,
        })
        .where(eq(content.id, existing[0].id));

      continue;
    }

    // Otherwise insert new row
    // Generate quiz_id yourself (random or sequential)
    const quiz_id = Math.floor(Math.random() * 1000000000);

    await db.insert(content).values({
      subject: row.subject,
      chapter: row.chapter,
      concept: row.concept,
      order_index: row.order_index,
      video_title: row.video_title,
      video_url: row.video_url,
      quiz_id: quiz_id,
    });
  }

  return { success: true };
}
