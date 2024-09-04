import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "@/db/db";
import { env } from "@/lib/env";

const DB_MIGRATIONS_DIR = `${env.DB_DIR}/${env.DB_MIGRATION_DIR}`;

export function migrateDB() {
  migrate(db, { migrationsFolder: DB_MIGRATIONS_DIR });
}
