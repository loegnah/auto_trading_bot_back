import { relations } from "drizzle-orm";
import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { clientTable } from "./client.schema";
import { strategyTable } from "./strategy.schema";

export const botTable = pgTable("bot", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  meta: json("meta").notNull().default("{}"),

  clientId: integer("client_id")
    .references(() => clientTable.id)
    .notNull(),

  strategyId: integer("strategy_id")
    .references(() => strategyTable.id)
    .notNull(),
});

export const botRelations = relations(botTable, ({ one }) => ({
  client: one(clientTable, {
    fields: [botTable.clientId],
    references: [clientTable.id],
  }),
  strategy: one(strategyTable, {
    fields: [botTable.strategyId],
    references: [strategyTable.id],
  }),
}));

export const botSchema = createSelectSchema(botTable);
export const botInsertSchema = createInsertSchema(botTable);

export type Bot = typeof botSchema.static;
export type BotInsert = typeof botInsertSchema.static;
