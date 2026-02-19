import {
	date,
	integer,
	pgTable,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { activities } from "./activities";

export const userActivity = pgTable(
	"user_activities",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: uuid("user_id")
			.notNull()
			.references(() => activities.id),
		activityId: uuid("activity_id").defaultRandom().notNull(),
		date: date("date", { mode: "string" }).notNull(),
		pointsEarned: integer("points_earned").notNull().default(0),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		unique("unique_user_activity").on(
			table.userId,
			table.activityId,
			table.date,
		),
	],
);
