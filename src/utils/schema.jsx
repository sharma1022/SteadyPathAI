import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial } from "drizzle-orm/pg-core";

// users schema
export const Users = pgTable("users", {
  id: serial("user_id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  username: varchar("username").notNull(),
  age: integer("age").notNull(),
  location: varchar("location").notNull(),
  createdBy: varchar("created_by").unique().notNull(),
});

// records schema
export const Records = pgTable("records", {
  id: serial("record_id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  recordName: varchar("record_name").notNull(),
  analysisResult: varchar("analysis_result").notNull(),
  kanbanRecords: varchar("kanban_records").notNull(),
  createdBy: varchar("created_by").notNull(),
});
