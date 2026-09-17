CREATE TYPE "public"."track_enum" AS ENUM('JEE', 'BRIDGE');--> statement-breakpoint
ALTER TABLE "chapter" ADD COLUMN "track" "track_enum" DEFAULT 'JEE' NOT NULL;