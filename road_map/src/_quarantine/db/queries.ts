import { db } from "./client";
import { content, quiz } from "./schema";
import { eq, and , asc, sql} from "drizzle-orm";

/** Get all subjects (distinct) */
export async function getAllSubjects() {
  return await db.selectDistinct({ subject: content.subject }).from(content);
}

/** Get all chapters for a subject */
export async function getChaptersBySubject(subjectName: string) {
  return await db
    .selectDistinct({ chapter: content.chapter })
    .from(content)
    .where(eq(content.subject, subjectName));
}

export async function getContentBySubject(subject: string) {
  return db
    .select()
    .from(content)
    .where(eq(content.subject, subject))
    .orderBy(asc(content.chapter), asc(content.order_index));
}

/** Get all concepts for a subject + chapter */

export function getConcepts(subject: string, chapter: string) {
  return db
    .select()
    .from(content)
    .where(
      and(
        eq(content.subject, subject),
        eq(content.chapter, chapter)
      )
    )
    .orderBy(asc(content.order_index)); // ✅ CRITICAL
}

/** Add new concept (with video + quiz_id) */
export async function addContentEntry(data: {
  subject: string;
  chapter: string;
  concept: string;
  video_title: string;
  video_url: string;
}) {
  const [{ max }] = await db
    .select({ max: sql<number>`max(${content.order_index})` })
    .from(content)
    .where(
      and(
        eq(content.subject, data.subject),
        eq(content.chapter, data.chapter)
      )
    );

  const orderIndex = (max ?? 0) + 1;

  return db
    .insert(content)
    .values({
      ...data,
      order_index: orderIndex,
      quiz_id: -1,
    })
    .returning();
}


/** Update content entry */
export async function updateContentEntry(
  id: number,
  data: Partial<{
    concept: string;
    video_title: string;
    video_url: string;
    quiz_id: number;
    order_index: number;
  }>
) {
  // 🔐 remove undefined keys
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  if (Object.keys(cleanedData).length === 0) {
    throw new Error("No valid fields to update");
  }

  return db
    .update(content)
    .set(cleanedData)
    .where(eq(content.id, id))
    .returning();
}


/** Delete concept */
export async function deleteContentEntry(contentId: number) {
  return await db.delete(content).where(eq(content.id, contentId)).returning();
}

// ADD CHAPTER
export async function addChapter(subject: string, chapter: string) {
  return db.insert(content).values({
    subject,
    chapter,
    concept: "__EMPTY__",
    order_index: 0,
    video_title: "",
    video_url: "",
    quiz_id: -1,
  });
}

// RENAME CHAPTER
export async function renameChapter(
  subject: string,
  oldChapter: string,
  newChapter: string
) {
  return db
    .update(content)
    .set({ chapter: newChapter })
    .where(
      and(
        eq(content.subject, subject),
        eq(content.chapter, oldChapter)
      )
    );
}

// DELETE CHAPTER
export async function deleteChapter(subject: string, chapter: string) {
  return db
    .delete(content)
    .where(
      and(
        eq(content.subject, subject),
        eq(content.chapter, chapter)
      )
    );
}

/* -------------------------------------------------------------------------- */
/*                            QUIZ TABLE CRUD                                 */
/* -------------------------------------------------------------------------- */

/** Get all questions for a quiz_id */
export async function getQuizQuestions(quiz_id_value: number) {
  return await db
    .select()
    .from(quiz)
    .where(eq(quiz.quiz_id, quiz_id_value))
    .orderBy(quiz.question_number);
}

/** Add a question */
export async function addQuizQuestion(data: {
  quiz_id: number;
  question_number: number;
  question_type: string;
  question_text: string;
  question_image?: string | null;
  optionA_text?: string | null;
  optionA_image?: string | null;
  optionB_text?: string | null;
  optionB_image?: string | null;
  optionC_text?: string | null;
  optionC_image?: string | null;
  optionD_text?: string | null;
  optionD_image?: string | null;
  answer_key?: string | null;
  numeric_answer?: number | null;
  solution_text?: string | null;
  solution_image?: string | null;
}) {
  return await db.insert(quiz).values(data).returning();
}

/** Update a quiz question */
export async function updateQuizQuestion(
  questionId: number,
  data: Partial<{
    question_number: number;
    question_type: string;
    question_text: string;
    question_image?: string | null;
    optionA_text?: string | null;
    optionA_image?: string | null;
    optionB_text?: string | null;
    optionB_image?: string | null;
    optionC_text?: string | null;
    optionC_image?: string | null;
    optionD_text?: string | null;
    optionD_image?: string | null;
    answer_key?: string | null;
    numeric_answer?: number | null;
    solution_text?: string | null;
    solution_image?: string | null;
  }>
) {
  return await db
    .update(quiz)
    .set(data)
    .where(eq(quiz.id, questionId))
    .returning();
}

/** Delete a quiz question */
export async function deleteQuizQuestion(questionId: number) {
  return await db.delete(quiz).where(eq(quiz.id, questionId)).returning();
}
