import { integer, pgTable, varchar, timestamp, decimal, text, boolean } from "drizzle-orm/pg-core";

export const profilesTable = pgTable("profiles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text().notNull().unique(), // Account Kit user ID (email or other identifier)
  username: varchar({ length: 50 }).notNull().unique(),
  displayName: varchar({ length: 100 }).notNull(),
  paymentAddress: varchar({ length: 255 }), // Smart account address (LightAccount)
  isEarningYield: boolean().default(false).notNull(), // Track if user has yield earning enabled
});

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  transactionHash: varchar({ length: 66 }).notNull().unique(), // 0x prefix + 64 hex chars
  fromUserId: text().notNull(), // References profiles.userId
  toUserId: text().notNull(), // References profiles.userId
  amount: decimal({ precision: 20, scale: 6 }).notNull(), // Support up to 6 decimal places
  message: varchar({ length: 500 }), // Optional message
  createdAt: timestamp().notNull().defaultNow(),
});
