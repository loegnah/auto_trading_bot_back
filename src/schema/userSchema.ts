import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { bybitTable } from "@/schema/bybitSchema";

export const userTable = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  bybit: many(bybitTable),
}));

export type User = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;
