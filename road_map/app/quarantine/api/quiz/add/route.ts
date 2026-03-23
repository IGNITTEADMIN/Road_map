import { NextResponse } from "next/server";
import { addQuizQuestion } from "@/src/_quarantine/db/queries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /**
     * Required fields:
     * quiz_id
     * question_number
     * question_type ("MCQ" | "NUM")
     * question_text
     */
    const {
      quiz_id,
      question_number,
      question_type,
      question_text,
    } = body;

    if (
      !quiz_id ||
      !question_number ||
      !question_type ||
      !question_text
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await addQuizQuestion(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
