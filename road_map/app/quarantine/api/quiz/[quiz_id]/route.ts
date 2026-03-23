import { NextResponse } from "next/server";
import { getQuizQuestions } from "@/src/_quarantine/db/queries";

export async function GET(
  _req: Request,
  context: { params: Promise<{ quiz_id: string }> }
) {
  const { quiz_id } = await context.params; // 👈 IMPORTANT FIX

  const quizId = Number(quiz_id);
  if (isNaN(quizId)) {
    return NextResponse.json(
      { error: "Invalid quiz_id" },
      { status: 400 }
    );
  }

  const result = await getQuizQuestions(quizId);
  return NextResponse.json(result);
}
