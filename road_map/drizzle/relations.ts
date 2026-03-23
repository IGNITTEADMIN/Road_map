import { relations } from "drizzle-orm/relations";
import { chapter, concept, quizQuestion } from "./schema";

export const conceptRelations = relations(concept, ({one, many}) => ({
	chapter: one(chapter, {
		fields: [concept.chapterId],
		references: [chapter.id]
	}),
	quizQuestions: many(quizQuestion),
}));

export const chapterRelations = relations(chapter, ({many}) => ({
	concepts: many(concept),
}));

export const quizQuestionRelations = relations(quizQuestion, ({one}) => ({
	concept: one(concept, {
		fields: [quizQuestion.conceptId],
		references: [concept.id]
	}),
}));