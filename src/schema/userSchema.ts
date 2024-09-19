import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { bybitTable } from "@/schema/bybitSchema";

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  bybit: many(bybitTable),
}));

export type User = typeof userTable.$inferSelect;
export type UserInsert = typeof userTable.$inferInsert;
