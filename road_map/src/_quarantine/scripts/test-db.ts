import { db } from "@/src/_quarantine/db/client";
import { content, quiz } from "@/src/_quarantine/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Running DB tests...");

  /* ------------------------------------------------------------- */
  /*                1) INSERT into content table                   */
  /* ------------------------------------------------------------- */

  const insertedContent = await db
    .insert(content)
    .values({
      subject: "Physics",
      chapter: "Motion",
      concept: "Velocity-Time Graph",
      order_index: 1,
      video_title: "VT Basics",
      video_url: "https://youtu.be/test",
      quiz_id: 101, // temporary for testing
    })
    .returning();

  console.log("Inserted content:", insertedContent);


  /* ------------------------------------------------------------- */
  /*                2) SELECT from content table                   */
  /* ------------------------------------------------------------- */
  const rows = await db.select().from(content);
  console.log("Content rows:", rows);


  /* ------------------------------------------------------------- */
  /*                3) INSERT into quiz table                      */
  /* ------------------------------------------------------------- */

  const insertedQuiz = await db
    .insert(quiz)
    .values({
      quiz_id: 101,
      question_number: 1,
      question_type: "MCQ",
      question_text: "Slope of VT graph gives?",
      question_image: null,
      optionA_text: "Velocity",
      optionB_text: "Acceleration",
      optionC_text: "Distance",
      optionD_text: "Time",
      answer_key: "B",
      numeric_answer: null,
      solution_text: "Slope is acceleration",
      solution_image: null,
    })
    .returning();

  console.log("Inserted quiz:", insertedQuiz);


  /* ------------------------------------------------------------- */
  /*                4) SELECT from quiz table                      */
  /* ------------------------------------------------------------- */
  const quizRows = await db.select().from(quiz);
  console.log("Quiz rows:", quizRows);
}

main()
  .then(() => {
    console.log("Test completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
