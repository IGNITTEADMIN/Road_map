//@src/db/queries.ts
import {db} from "./client";
import {chapter , concept, subjectEnum , quizQuestion, userProgress } from "./schema";
import {eq, and, asc,sql, desc} from "drizzle-orm";
import { QuizQuestionRow } from "../types/content";

export type Subject=(typeof subjectEnum.enumValues)[number];
export type QuizQuestionInsert = {
  conceptId: number;
  question: string;
  questionImage?: string;

  optionA?: string;
  optionAImage?: string;

  optionB?: string;
  optionBImage?: string;

  optionC?: string;
  optionCImage?: string;

  optionD?: string;
  optionDImage?: string;

  answer: string;         
  solutionText?: string;
  solutionImage?: string;
}

export async function insertChapter(
  subject: Subject,
  chapterName: string,
  clusterTag?: string
) {
  const maxOrderRow = await db
    .select({
      maxOrder: sql<number>`MAX("order")`
    })
    .from(chapter)
    .where(eq(chapter.subject, subject))
    .execute();

  const nextOrder = (maxOrderRow[0]?.maxOrder ?? 0) + 1;

  return await db.insert(chapter).values({
    subject,
    chapterName,
    clusterTag: clusterTag ?? chapterName,
    order: nextOrder,
  });
}

export async function insertConcept(chapterId:number, conceptName:string,orderIndex:number, videoTitle: string, videoUrl:string ){
    return await db.insert(concept).values(
        {chapterId,conceptName,orderIndex,videoTitle,videoUrl}
    );
}

export async function getChaptersBySubject(subjectName: Subject) {
  return await db
    .select({
      chapterId: chapter.id,
      chapterName: chapter.chapterName,
      clusterTag: chapter.clusterTag,
    })
    .from(chapter)
    .where(eq(chapter.subject, subjectName));
}

export async function getConceptsByChapter(chapterId: number){
    return await db.select().from(concept).
    where(eq(concept.chapterId,chapterId)).
    orderBy(asc(concept.orderIndex));
}

export async function deleteConcept(conceptId:number){
    return await db.delete(concept).where(eq(concept.id,conceptId));
}

export async function deleteChapter(chapterId:number){
    return await db.delete(chapter).where(eq(chapter.id,chapterId));
}

export async function editConcept(conceptId:number, data : {conceptName?:string;orderIndex?:number;videoTitle?:string; videoUrl?:string} ){
    const result =  await db.update(concept).set(data).where(eq(concept.id,conceptId)).returning();
}

export async function renameChapter(chapterId:number, data:{chapterName?:string}){
    await db.update(chapter).set(data).where(eq(chapter.id,chapterId));
}


export async function getQuizQuestions(conceptId: number) {
  return await db
    .select()
    .from(quizQuestion)
    .where(eq(quizQuestion.conceptId, conceptId))
    .orderBy(quizQuestion.orderIndex);
}
export async function replaceQuizQuestions(
  conceptId: number,
  questions: QuizQuestionRow[]
) {
  await db
    .delete(quizQuestion)
    .where(eq(quizQuestion.conceptId, conceptId));

  if (questions.length > 0) {
    await db.insert(quizQuestion).values(
      questions.map((q, index) => ({
        conceptId,
        orderIndex: index,

        question: q.question,
        questionImage: q.questionImage,

        optionA: q.optionA,
        optionAImage: q.optionAImage,

        optionB: q.optionB,
        optionBImage: q.optionBImage,

        optionC: q.optionC,
        optionCImage: q.optionCImage,

        optionD: q.optionD,
        optionDImage: q.optionDImage,

        answer: q.answer,

        solutionText: q.solutionText,
        solutionImage: q.solutionImage,
      }))
    );
  }
}

export async function getUserProgress(userId: number) {
  return await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));
}

export async function upsertUserProgress({
  userId,
  conceptId,
  completed,
  score,
}: {
  userId: number;
  conceptId: number;
  completed?: boolean;
  score?: number;
}) {
  const existing = await db
    .select()
    .from(userProgress)
    .where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.conceptId, conceptId)
      )
    );

  if (existing.length > 0) {
    return await db
      .update(userProgress)
      .set({
        ...(completed !== undefined && { completed }),
        ...(score !== undefined && { score }),
        lastAccessedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.conceptId, conceptId)
        )
      );
  } else {
    return await db.insert(userProgress).values({
      userId,
      conceptId,
      completed: completed ?? false,
      score,
      lastAccessedAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export async function markConceptAccessedDB(
  userId: number,
  conceptId: number
) {
  return await upsertUserProgress({
    userId,
    conceptId,
  });
}

export async function markConceptCompletedDB(
  userId: number,
  conceptId: number
) {
  return await upsertUserProgress({
    userId,
    conceptId,
    completed: true,
  });
}

export async function unmarkConceptCompletedDB(
  userId: number,
  conceptId: number
) {
  return await db
    .update(userProgress)
    .set({
      completed: false,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.conceptId, conceptId)
      )
    );
}