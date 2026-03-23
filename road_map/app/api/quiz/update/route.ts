// /api/quiz/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import { replaceQuizQuestions } from "@/src/db/queries";
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const conceptIdParam = searchParams.get("conceptId");

    const conceptId = Number(conceptIdParam);

    if (!conceptIdParam || isNaN(conceptId)) {
      return NextResponse.json(
        { error: "Invalid conceptId" },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body must be an array of questions" },
        { status: 400 }
      );
    }

    await replaceQuizQuestions(conceptId, body);

    return NextResponse.json(
      { message: "Quiz updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating quiz:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}