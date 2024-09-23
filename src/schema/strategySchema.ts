import { relations } from "drizzle-orm";
import { integer, json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { TOPIC } from "../trade/lib/tradeConst";
import { clientTable } from "./clientSchema";

export const strategyTable = pgTable("strategy", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  topics: text("topics", { enum: TOPIC }).array().notNull(),
  symbol: text("symbol").notNull(),
  interval: text("interval").notNull(),
  meta: json("meta").notNull().default("{}"),

  clientId: integer("client_id")
    .references(() => clientTable.id)
    .notNull(),
});

export const strategyRelations = relations(strategyTable, ({ one }) => ({
  bybitClient: one(clientTable, {
    fields: [strategyTable.clientId],
    references: [clientTable.id],
  }),
}));

export type Strategy = typeof strategyTable.$inferSelect;
export type StrategyInsert = typeof strategyTable.$inferInsert;
