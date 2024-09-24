import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./common/env";
import { botRelations, botTable } from "./schema/bot.schema";
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
      botTable,
      botRelations,
    },
  });
}

export const db = connectDB();
