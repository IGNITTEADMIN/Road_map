import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { quizQuestion } from "@/drizzle/schema";

export async function GET() {
  try {
    const questions = await db.select().from(quizQuestion);
    return NextResponse.json(questions, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}