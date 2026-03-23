import { NextResponse } from "next/server";
import {
  updateQuizQuestion,
  deleteQuizQuestion,
} from "@/src/_quarantine/db/queries";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const questionId = Number(id);

  if (isNaN(questionId)) {
    return NextResponse.json(
      { error: "Invalid question id" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const result = await updateQuizQuestion(questionId, body);

  return NextResponse.json(result);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const questionId = Number(id);

  if (isNaN(questionId)) {
    return NextResponse.json(
      { error: "Invalid question id" },
      { status: 400 }
    );
  }

  const result = await deleteQuizQuestion(questionId);
  return NextResponse.json(result);
}
