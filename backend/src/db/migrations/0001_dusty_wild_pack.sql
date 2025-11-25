CREATE TABLE "pantry_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"quantity" text,
	"brand" text,
	"expiration" date,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "saved_recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"ingredients" text NOT NULL,
	"filters" text,
	"recipe" text NOT NULL,
	"cook_time" text,
	"servings" text,
	"nutrition_info" text,
	"created_at" timestamp DEFAULT now()
);
