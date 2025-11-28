    import { db } from "./client";
import { content, quiz } from "./schema";
import { eq } from "drizzle-orm";

export async function addContentEntry(data: {
  subject: string;
  chapter_name: string;
  concept_covered: string;
  video_link: string;
  quiz_identifier: string;
}) {
  return await db.insert(content).values(data).returning();
}


export async function addQuizQuestion(data: {
  quiz_identifier: string;
  question_type: string;
  question_text: string;
  question_image?: string | null;
  options: any;
  correct_answer: any;
  solution_text?: string;
  solution_image?: string | null;
}) {
  return await db.insert(quiz).values(data).returning();
}
