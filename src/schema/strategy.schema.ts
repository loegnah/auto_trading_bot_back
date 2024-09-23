import { relations } from "drizzle-orm";
import { json, pgTable, serial, text } from "drizzle-orm/pg-core";
import { TOPIC } from "../trade/lib/topic";

export const strategyTable = pgTable("strategy", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  topics: text("topics", { enum: TOPIC }).array().notNull(),
  symbol: text("symbol").notNull(),
  interval: text("interval").notNull(),
  meta: json("meta").notNull().default("{}"),
});

export const strategyRelations = relations(strategyTable, ({}) => ({}));

export type Strategy = typeof strategyTable.$inferSelect;
export type StrategyInsert = typeof strategyTable.$inferInsert;
