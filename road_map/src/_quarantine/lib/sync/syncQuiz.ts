// /lib/sync/syncQuiz.ts

import { db } from "@/src/_quarantine/db/client";
import { content, quiz } from "@/src/_quarantine/db/schema";
import { getNotionQuiz } from "@/src/_quarantine/lib/notion/getQuiz";
import { eq } from "drizzle-orm";

export async function syncQuiz() {
  const notionRows = await getNotionQuiz();

  for (const row of notionRows) {
    // Find the content row for this question
    const matches = await db
      .select()
      .from(content)
      .where(
        eq(content.subject, row.subject) &&
        eq(content.chapter, row.chapter) &&
        eq(content.concept, row.concept)
      );

    if (matches.length === 0) {
      console.error("No matching concept for: ", row);
      continue;
    }

    const quiz_id = matches[0].quiz_id;

    // Insert question
    await db.insert(quiz).values({
      quiz_id: quiz_id,
      question_number: row.question_number,
      question_type: row.question_type,
      question_text: row.question_text,
      question_image: row.question_image,

      optionA_text: row.optionA_text,
      optionA_image: row.optionA_image,

      optionB_text: row.optionB_text,
      optionB_image: row.optionB_image,

      optionC_text: row.optionC_text,
      optionC_image: row.optionC_image,

      optionD_text: row.optionD_text,
      optionD_image: row.optionD_image,

      answer_key: row.answer_key,
      numeric_answer: row.numeric_answer,

      solution_text: row.solution_text,
      solution_image: row.solution_image,
    });
  }

  return { success: true };
}
