import { pgTable, serial, varchar, foreignKey, integer, text, check, char, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const subjectEnum = pgEnum("subject_enum", ['PHYSICS', 'CHEMISTRY', 'MATHS'])


export const chapter = pgTable("chapter", {
	id: serial().primaryKey().notNull(),
	subject: subjectEnum().notNull(),
	chapterName: varchar("chapter_name", { length: 150 }).notNull(),
});

export const concept = pgTable("concept", {
	id: serial().primaryKey().notNull(),
	chapterId: integer("chapter_id").notNull(),
	conceptName: varchar("concept_name", { length: 250 }).notNull(),
	orderIndex: integer("order_index").notNull(),
	videoTitle: varchar("video_title", { length: 200 }).notNull(),
	videoUrl: text("video_url").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.chapterId],
			foreignColumns: [chapter.id],
			name: "concept_chapter_id_chapter_id_fk"
		}).onDelete("cascade"),
]);

export const quizQuestion = pgTable("quiz_question", {
	id: serial().primaryKey().notNull(),
	conceptId: integer("concept_id").notNull(),
	question: text().notNull(),
	questionImage: text("question_image"),
	optiona: text(),
	optionaImage: text("optiona_image"),
	optionb: text(),
	optionbImage: text("optionb_image"),
	optionc: text(),
	optioncImage: text("optionc_image"),
	optiond: text(),
	optiondImage: text("optiond_image"),
	answer: char({ length: 1 }).notNull(),
	solutionText: text("solution_text"),
	solutionImage: text("solution_image"),
}, (table) => [
	foreignKey({
			columns: [table.conceptId],
			foreignColumns: [concept.id],
			name: "quiz_question_concept_id_fkey"
		}).onDelete("cascade"),
	check("quiz_question_answer_check", sql`answer = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar])`),
]);
