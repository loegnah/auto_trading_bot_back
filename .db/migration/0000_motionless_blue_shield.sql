CREATE TABLE IF NOT EXISTS "bybit" (
	"id" serial PRIMARY KEY NOT NULL,
	"api_key" text NOT NULL,
	"api_secret" text NOT NULL,
	"testnet" integer DEFAULT 0,
	"user_id" integer NOT NULL
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
 ALTER TABLE "bybit" ADD CONSTRAINT "bybit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
