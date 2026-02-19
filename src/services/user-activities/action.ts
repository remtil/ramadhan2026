"use server";

import { db } from "@/lib/db"; // Adjust this import to your actual db instance
import { userActivity, activities } from "@/lib/db/schema";
import { logActivitySchema } from "@/lib/validations/schemas/user_activities";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export async function logUserActivity(input: unknown) {
    try {
        const { userId, activityId, localDate } = logActivitySchema.parse(input);
        const [activityRecord] = await db
            .select({ points: activities.points })
            .from(activities)
            .where(eq(activities.id, activityId));

        if (!activityRecord) {
            return { success: false, message: "Activity not found." };
        }
        await db.insert(userActivity).values({
            userId,
            activityId,
            date: localDate,
            pointsEarned: activityRecord.points,
        });

        revalidatePath("/user-activities");
        return { success: true, message: "Activity completed! Points awarded." };

    } catch (error: any) {
        if (error.code === "23505" || error.message?.includes("unique_user_activity")) {
            return {
                success: false,
                message: "You have already completed this activity today!",
                isDuplicate: true
            };
        }
        console.error("DATABASE INSERT ERROR:", error);
        return { success: false, message: "Something went wrong. Try again." };
    }
}

export async function calculateUserStreak(userId: string, localToday: string) {

    const history = await db
        .select({ date: userActivity.date })
        .from(userActivity)
        .where(eq(userActivity.userId, userId))
        .groupBy(userActivity.date)
        .orderBy(desc(userActivity.date));

    if (history.length === 0) return 0;

    let streak = 0;
    const expectedDate = new Date(`${localToday}T00:00:00Z`);
    const mostRecentActivityDate = new Date(`${history[0].date}T00:00:00Z`);
    const diffInTime = expectedDate.getTime() - mostRecentActivityDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays > 1) {
        return 0;
    }
    for (const record of history) {
        const recordDate = new Date(`${record.date}T00:00:00Z`);
        if (recordDate.getTime() === expectedDate.getTime()) {
            streak++;
            expectedDate.setTime(expectedDate.getTime() - (1000 * 3600 * 24));
        } else {
            break;
        }
    }

    return streak;
}