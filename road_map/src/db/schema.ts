import { pgTable, serial, varchar, text, jsonb } from "drizzle-orm/pg-core";

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 50 }).notNull(),
  chapter_name: varchar("chapter_name", { length: 255 }).notNull(),
  concept_covered: varchar("concept_covered", { length: 255 }).notNull(),
  video_link: text("video_link").notNull(),
  quiz_identifier: varchar("quiz_identifier", { length: 100 }).notNull(),
});
 

export const quiz = pgTable("quiz", {
  quiz_id: serial("quiz_id").primaryKey(),
  quiz_identifier: varchar("quiz_identifier", { length: 100 }).notNull(),
  question_type: varchar("question_type", { length: 50 }).notNull(),
  question_text: text("question_text").notNull(),

  // IMAGE URL FROM CLOUDINARY
  question_image: text("question_image"),

  options: jsonb("options").notNull(),
  correct_answer: jsonb("correct_answer").notNull(),

  solution_text: text("solution_text"),
  solution_image: text("solution_image"),
});
/*options: [
  { text: "...", image: "optional url" },
  { text: "...", image: null }
] */