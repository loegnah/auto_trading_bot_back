import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { botTable } from "./bot.schema";
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

export const clientRelations = relations(clientTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [clientTable.userId],
    references: [userTable.id],
  }),
  bots: many(botTable),
}));

export const clientSchema = createSelectSchema(clientTable);
export const clientInsertSchema = createInsertSchema(clientTable);

export type Client = typeof clientSchema.static;
export type ClientInsert = typeof clientInsertSchema.static;
