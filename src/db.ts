import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./common/env";
import { clientRelations, clientTable } from "./schema/clientSchema";
import { strategyRelations, strategyTable } from "./schema/strategySchema";
import { userRelations, userTable } from "./schema/userSchema";

function connectDB() {
  const pgClient = postgres(env.DB_URL);
  return drizzle(pgClient, {
    schema: {
      userTable,
      userRelations,
      clientTable,
      clientRelations,
      strategyTable,
      strategyRelations,
    },
  });
}

export const db = connectDB();
