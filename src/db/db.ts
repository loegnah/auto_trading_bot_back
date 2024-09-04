import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { env } from "@/lib/env";

const DB_PATH = `${env.DB_DIR}/${env.DB_FILE}`;

function connectDB() {
  const sqlite = new Database(DB_PATH);
  const db = drizzle(sqlite);
  return db;
}

export const db = connectDB();
