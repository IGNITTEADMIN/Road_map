CREATE TABLE "quiz_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"concept_id" integer NOT NULL,
	"question" text NOT NULL,
	"question_image" text,
	"option_a" text,
	"option_a_image" text,
	"option_b" text,
	"option_b_image" text,
	"option_c" text,
	"option_c_image" text,
	"option_d" text,
	"option_d_image" text,
	"answer" char(1) NOT NULL,
	"solution_text" text,
	"solution_image" text
);
--> statement-breakpoint
ALTER TABLE "quiz_question" ADD CONSTRAINT "quiz_question_concept_id_concept_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concept"("id") ON DELETE cascade ON UPDATE no action;