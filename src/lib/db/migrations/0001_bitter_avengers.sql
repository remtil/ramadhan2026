CREATE TYPE "public"."activity_type" AS ENUM('daily', 'optional');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"points" integer DEFAULT 0 NOT NULL,
	"icon" varchar(255),
	"type" "activity_type" DEFAULT 'optional' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
