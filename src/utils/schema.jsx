import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text } from "drizzle-orm/pg-core";

// users schema
export const Users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username").notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  age: integer("age").notNull(),
  location: varchar("location").notNull(),
  createdBy: varchar("created_by").notNull(),
});

// records schema
export const Records = pgTable("medical_records", {
  recordId: serial("record_id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  recordName: varchar("record_name").notNull(),
  aiAnalysis: varchar("ai_analysis").notNull(),
  kanbanRecords: varchar("kanban_records").notNull(),
  createdBy: varchar("created_by").notNull(),
});
