"use server";

import { db } from "@/lib/db";
import { activities } from "@/lib/db/schema";
import {
	createActivitySchema,
	updateActivitySchema,
} from "@/lib/validations/schemas/activities";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createActivity(input: unknown) {
	const data = createActivitySchema.parse(input);

	await db.insert(activities).values(data);

	revalidatePath("/activities");

	return { success: true };
}

export async function updateActivity(id: string, input: unknown) {
	const data = updateActivitySchema.parse(input);

	await db.update(activities).set(data).where(eq(activities.id, id));

	revalidatePath("/activities");

	return { success: true };
}

export async function deleteActivity(id: string) {
	await db.delete(activities).where(eq(activities.id, id));

	revalidatePath("/activities");

	return { success: true };
}

export async function getActivity() {
	const activity = await db
		.select()
		.from(activities)
		.orderBy(desc(activities.isActive));

	return activity;
}
