CREATE TYPE "public"."event_type_enum" AS ENUM('video_access', 'video_progress', 'quiz_attempt');--> statement-breakpoint
CREATE TABLE "learning_event" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"concept_id" integer NOT NULL,
	"event_type" "event_type_enum" NOT NULL,
	"score" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_concept_id_concept_id_fk" FOREIGN KEY ("concept_id") REFERENCES "public"."concept"("id") ON DELETE cascade ON UPDATE no action;