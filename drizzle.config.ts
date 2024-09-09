import { defineConfig } from "drizzle-kit";
import { env } from "./src/lib/env";

export default defineConfig({
  schema: ["./src/schema/*.ts"],
  out: env.DB_MIGRATION_DIR,
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
