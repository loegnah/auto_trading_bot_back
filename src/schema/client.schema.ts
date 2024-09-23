import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const clientTable = pgTable("client", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category", { enum: ["bybit"] }).notNull(),
  apiKey: text("api_key").notNull().default(""),
  apiSecret: text("api_secret").notNull().default(""),
  testnet: boolean("testnet").notNull().default(false),
  meta: json("meta").notNull().default("{}"),

  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
});

export const clientRelations = relations(clientTable, ({ one }) => ({
  user: one(userTable, {
    fields: [clientTable.userId],
    references: [userTable.id],
  }),
}));

export type Client = typeof clientTable.$inferSelect;
export type ClientInsert = typeof clientTable.$inferInsert;
