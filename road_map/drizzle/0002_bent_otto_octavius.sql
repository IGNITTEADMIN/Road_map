CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"google_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"avatar_url" text,
	"date_of_birth" date,
	"school_name" varchar(255),
	"district" varchar(100),
	"class_studying" varchar(20),
	"phone_number" varchar(15),
	"profile_completed" boolean DEFAULT false,
	"role" varchar(20) DEFAULT 'user',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "quiz_question" ALTER COLUMN "answer" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chapter" ADD COLUMN "cluster_tag" varchar(150);--> statement-breakpoint
ALTER TABLE "chapter" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "type" varchar(20) DEFAULT 'mcq' NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optiona" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optiona_image" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optionb" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optionb_image" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optionc" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optionc_image" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optiond" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "optiond_image" text;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "order_index" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "quiz_question" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_a";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_a_image";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_b";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_b_image";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_c";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_c_image";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_d";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "option_d_image";