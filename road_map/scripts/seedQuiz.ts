import "dotenv/config";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { db } from "@/src/db/client";
import { quizQuestion } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type QuizRow = {
  concept_id: string;
  order_index: string;
  question: string;
  optiona: string;
  optionb: string;
  optionc: string;
  optiond: string;
  answer: string;
  solution_text: string;
};

// 🔹 Read CSV
const csvData = fs.readFileSync("./scripts/quiz_upload.csv", "utf-8");

const rows = parse(csvData, {
  columns: true,
  trim: true,
}) as QuizRow[];

const cleanRows = rows.filter((r: any) => {
  return r.concept_id && r.order_index && r.question;
});

// 🔹 Transform rows
const quizRows = cleanRows.map((r) => ({
  conceptId: Number(r.concept_id),
  orderIndex: Number(r.order_index),
  question: r.question,
  optionA: r.optiona,
  optionB: r.optionb,
  optionC: r.optionc,
  optionD: r.optiond,
  answer: r.answer,
  solutionText: r.solution_text,
  type: "mcq" as const,
}));

// 🔹 Seed function
async function seed() {
  for (const q of quizRows) {
    await db.insert(quizQuestion).values({
      conceptId: q.conceptId,
      orderIndex: q.orderIndex,
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      answer: q.answer,
      solutionText: q.solutionText,
      type: "mcq",
    });

    console.log(
      `Inserted: Concept ${q.conceptId}, Order ${q.orderIndex}`
    );
  }
console.log("Rows parsed:", rows.length);
  console.log("✅ All quiz questions imported!");
}

// 🔹 Run
seed().catch((err) => {
  console.error(err);
  process.exit(1);
});