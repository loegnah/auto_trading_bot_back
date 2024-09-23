CREATE TABLE IF NOT EXISTS "bot" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"meta" json DEFAULT '{}' NOT NULL,
	"client_id" integer NOT NULL,
	"strategy_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "strategy" DROP CONSTRAINT "strategy_client_id_client_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot" ADD CONSTRAINT "bot_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bot" ADD CONSTRAINT "bot_strategy_id_strategy_id_fk" FOREIGN KEY ("strategy_id") REFERENCES "public"."strategy"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "strategy" DROP COLUMN IF EXISTS "client_id";