import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

export function connectDB() {
  const sqlite = new Database('db/sqlite.db');
  const db = drizzle(sqlite);

  return db;
}
