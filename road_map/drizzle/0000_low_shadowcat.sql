CREATE TABLE "content" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(50) NOT NULL,
	"chapter_name" varchar(255) NOT NULL,
	"concept_covered" varchar(255) NOT NULL,
	"video_link" text NOT NULL,
	"quiz_identifier" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"quiz_id" serial PRIMARY KEY NOT NULL,
	"quiz_identifier" varchar(100) NOT NULL,
	"question_type" varchar(50) NOT NULL,
	"question_text" text NOT NULL,
	"question_image" text,
	"options" jsonb NOT NULL,
	"correct_answer" jsonb NOT NULL,
	"solution_text" text,
	"solution_image" text
);
