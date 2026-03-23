//db/schema.ts
import { pgEnum, pgTable, serial, varchar, text, integer, char, timestamp } from "drizzle-orm/pg-core";

export const subjectEnum=pgEnum("subject_enum",["PHYSICS","CHEMISTRY","MATHS",]);
export const chapter = pgTable("chapter",{
    id: serial("id").primaryKey(),

    subject: subjectEnum("subject").notNull(),
    chapterName: varchar("chapter_name",{ length:150}).notNull(),
});

export const concept= pgTable("concept",{
    id: serial("id").primaryKey(),

    chapterId: integer("chapter_id").notNull().references(()=>chapter.id,{onDelete:  "cascade" }),
    conceptName: varchar("concept_name",{length: 250}).notNull(),
    orderIndex: integer("order_index").notNull(),
    videoTitle: varchar("video_title",{length: 200}).notNull(),
    videoUrl: text("video_url").notNull(),
});

export const quizQuestion = pgTable("quiz_question", {
  id: serial("id").primaryKey(),

  conceptId: integer("concept_id")
    .notNull()
    .references(() => concept.id, { onDelete: "cascade" }),

  type: varchar("type", { length: 20 }).notNull().default("mcq"),

  question: text("question").notNull(),
  questionImage: text("question_image"),

  optionA: text("optiona"),
  optionAImage: text("optiona_image"),

  optionB: text("optionb"),
  optionBImage: text("optionb_image"),

  optionC: text("optionc"),
  optionCImage: text("optionc_image"),

  optionD: text("optiond"),
  optionDImage: text("optiond_image"),

  answer: char("answer", { length: 1 }),

  solutionText: text("solution_text"),
  solutionImage: text("solution_image"),

  orderIndex: integer("order_index").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  googleId: varchar("google_id", { length: 255 }).notNull().unique(),

  name: varchar("name", { length: 255 }),

  email: varchar("email", { length: 255 }).notNull().unique(),

  avatarUrl: text("avatar_url"),

  role: varchar("role", { length: 20 }).default("user"),

  createdAt: timestamp("created_at").defaultNow(),
});