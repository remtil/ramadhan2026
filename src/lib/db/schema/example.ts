import {
	boolean,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const example = pgTable("example", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull().unique(),
	isActive: boolean("is_active").notNull().default(true),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});
