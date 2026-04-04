// app/api/quiz/get/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getQuizQuestions } from "@/src/db/queries"; 
import { requireAuth } from "@/src/lib/apiAuth";

export async function GET(req: NextRequest) {
  await requireAuth();
  try {
    const { searchParams } = new URL(req.url);
    const conceptId = searchParams.get("conceptId");

    if (!conceptId) {
      return NextResponse.json(
        { error: "conceptId is required" },
        { status: 400 }
      );
    }

    const questions = await getQuizQuestions(Number(conceptId));
    //console.log("Fetched questions:", questions);
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}