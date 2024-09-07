import { defineConfig } from "drizzle-kit";
import { env } from "./src/lib/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: `${process.env.DB_DIR}/${process.env.DB_MIGRATION_DIR}`,
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
