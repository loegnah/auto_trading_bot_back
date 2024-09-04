import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

export function connectDB() {
  const sqlite = new Database("db/sqlite.db");
  const db = drizzle(sqlite);

  return db;
}
