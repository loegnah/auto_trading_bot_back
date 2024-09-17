import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "@/schema/userSchema";

export const bybitTable = sqliteTable("bybit", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
