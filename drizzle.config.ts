import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/dbSchema.ts",
  out: `${process.env.DB_DIR}/${process.env.DB_MIGRATION_DIR}`,
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'
});
