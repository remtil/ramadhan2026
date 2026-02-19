import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Enum for activity type
 */
export const activityTypeEnum = pgEnum("activity_type", ["daily", "optional"]);

export const activities = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  points: integer("points").notNull().default(0),

  icon: varchar("icon", { length: 255 }),

  type: activityTypeEnum("type").notNull().default("optional"),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
