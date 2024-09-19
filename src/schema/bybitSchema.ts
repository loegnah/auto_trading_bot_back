import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { userTable } from "@/schema/userSchema";

export const bybitTable = pgTable("bybit", {
  id: serial("id").primaryKey(),
  apiKey: text("api_key").notNull(),
  apiSecret: text("api_secret").notNull(),
  testnet: integer("testnet").default(0),

  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
});

export const bybitRelations = relations(bybitTable, ({ one }) => ({
  user: one(userTable, {
    fields: [bybitTable.userId],
    references: [userTable.id],
  }),
}));

export type Bybit = typeof bybitTable.$inferSelect;
export type BybitInsert = typeof bybitTable.$inferInsert;
