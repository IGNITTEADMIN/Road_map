// components/quiz/mappers.ts

import { Question } from "./types";
import { QuizQuestionRow } from "@/src/types/content";


export function mapRowToQuestion(row: QuizQuestionRow): Question {
  const options = ["A", "B", "C", "D"].map(letter => ({
    text: row[`option${letter}` as keyof QuizQuestionRow] as string || "",
    imageUrl: row[`option${letter}Image` as keyof QuizQuestionRow] as string || undefined,
  }));

  const correctIndex = ["A", "B", "C", "D"].indexOf(row.answer);

  return {
  text: row.question,
  imageUrl: row.questionImage || undefined,
  solutionText: row.solutionText || undefined,
  solutionImage: row.solutionImage || undefined,
  type: "mcq",
  options,
  correctIndex: correctIndex >= 0 ? correctIndex : 0,
};
}


export function mapQuestionToRow(
  question: Question,
  conceptId: number
): QuizQuestionRow {
  const row: Partial<QuizQuestionRow> = {
    conceptId,
    question: question.text,
    questionImage: question.imageUrl || null,
    solutionText: question.solutionText || null,
    solutionImage: question.solutionImage || null,
    answer: ["A", "B", "C", "D"][question.correctIndex],
  };

  question.options.forEach((opt, idx) => {
    const letter = ["A", "B", "C", "D"][idx];

    (row as any)[`option${letter}`] = opt.text || null;
    (row as any)[`option${letter}Image`] = opt.imageUrl || null;
  });

  return row as QuizQuestionRow;
}