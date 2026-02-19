import { z } from "zod";

export const activityTypeEnum = z.enum(["daily", "optional"]);

export const createActivitySchema = z.object({
	title: z.string().min(1).max(255),

	description: z.string().optional(),

	points: z.number().int().min(0).default(0),

	icon: z.string().max(255).optional(),

	type: activityTypeEnum.default("optional"),

	isActive: z.boolean().optional().default(true),
});

export const updateActivitySchema = createActivitySchema.partial();

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
