import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import { bybitRelations, bybitTable } from "@/schema/bybitSchema";
import { userRelations, userTable } from "@/schema/userSchema";

function connectDB() {
  const pgClient = postgres(env.DB_URL);
  return drizzle(pgClient, {
    schema: {
      userTable,
      userRelations,
      bybitTable,
      bybitRelations,
    },
  });
}

export const db = connectDB();
