CREATE TYPE "public"."subject_enum" AS ENUM('PHYSICS', 'CHEMISTRY', 'MATHS');--> statement-breakpoint
CREATE TABLE "chapter" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" "subject_enum" NOT NULL,
	"chapter_name" varchar(150) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "concept" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer NOT NULL,
	"concept_name" varchar(250) NOT NULL,
	"order_index" integer NOT NULL,
	"video_title" varchar(200) NOT NULL,
	"video_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "concept" ADD CONSTRAINT "concept_chapter_id_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter"("id") ON DELETE cascade ON UPDATE no action;