import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/lib/env";
import { bybitRelations, bybitTable } from "@/schema/bybitSchema";
import { userRelations, userTable } from "@/schema/userSchema";

function connectDB() {
  const turso = createClient({
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
  return drizzle(turso, {
    schema: {
      userTable,
      userRelations,
      bybitTable,
      bybitRelations,
    },
  });
}

export const db = connectDB();
