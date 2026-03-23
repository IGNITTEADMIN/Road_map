import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";

/* -------------------------------------------------------------------------- */
/*                               CONTENT TABLE                                */
/* -------------------------------------------------------------------------- */
/*
One row per concept.
Linked to quiz via quiz_id.
*/

export const content = pgTable("content", {
  id: serial("id").primaryKey(),

  subject: varchar("subject", { length: 50 }).notNull(),
  chapter: varchar("chapter", { length: 255 }).notNull(),
  concept: varchar("concept", { length: 255 }).notNull(),

  order_index: integer("order_index").notNull(),

  video_title: varchar("video_title", { length: 255 }).notNull(),
  video_url: text("video_url").notNull(),

  // FK → quiz.quiz_id (not defined here, but used in app logic)
  quiz_id: integer("quiz_id").notNull(),
});


/* -------------------------------------------------------------------------- */
/*                                 QUIZ TABLE                                 */
/* -------------------------------------------------------------------------- */
/*
One row per question.
Supports MCQ + NUM both.
*/

export const quiz = pgTable("quiz", {
  id: serial("id").primaryKey(),

  quiz_id: integer("quiz_id").notNull(), // Groups 5 questions per concept
  question_number: integer("question_number").notNull(), // 1..5

  question_type: varchar("question_type", { length: 10 }).notNull(), // "MCQ" or "NUM"

  question_text: text("question_text").notNull(),
  question_image: text("question_image"), // Cloudinary URL (nullable)

  /* ----------------------------- MCQ columns ------------------------------ */
  optionA_text: text("optionA_text"),
  optionA_image: text("optionA_image"),

  optionB_text: text("optionB_text"),
  optionB_image: text("optionB_image"),

  optionC_text: text("optionC_text"),
  optionC_image: text("optionC_image"),

  optionD_text: text("optionD_text"),
  optionD_image: text("optionD_image"),

  answer_key: varchar("answer_key", { length: 5 }), // A/B/C/D for MCQ

  /* --------------------------- NUMERIC question --------------------------- */
  numeric_answer: integer("numeric_answer"), // NUM only

  /* ------------------------- Solution / Explanation ------------------------ */
  solution_text: text("solution_text"),
  solution_image: text("solution_image"),
});
