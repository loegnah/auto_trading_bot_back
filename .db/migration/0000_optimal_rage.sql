CREATE TABLE IF NOT EXISTS "client" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"api_key" text DEFAULT '' NOT NULL,
	"api_secret" text DEFAULT '' NOT NULL,
	"testnet" boolean DEFAULT false NOT NULL,
	"meta" json DEFAULT '{}' NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "strategy" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"topics" text[] NOT NULL,
	"symbol" text NOT NULL,
	"interval" text NOT NULL,
	"meta" json DEFAULT '{}' NOT NULL,
	"client_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "strategy" ADD CONSTRAINT "strategy_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
