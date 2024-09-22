import { defineConfig } from "drizzle-kit";
import { env } from "@/common/env";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/schema/*.ts"],
  out: env.DB_MIGRATION_DIR,
  dbCredentials: {
    url: env.DB_URL,
  },
});
