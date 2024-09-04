import { Hono } from "hono";
import { migrateDB } from "@/db/dbMigrate";

export const dbRoute = new Hono();

dbRoute.get("/migrate", async (c) => {
  migrateDB();
  return c.json({ message: "Migrated" });
});
