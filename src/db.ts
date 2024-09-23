import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./common/env";
import { clientRelations, clientTable } from "./schema/client.schema";
import { strategyRelations, strategyTable } from "./schema/strategy.schema";
import { userRelations, userTable } from "./schema/user.schema";

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
