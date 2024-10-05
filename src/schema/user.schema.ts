import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { clientTable } from "./client.schema";

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  bybit: many(clientTable),
}));

export const userSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable);

export type User = typeof userSchema.static;
export type UserInsert = typeof userInsertSchema.static;
