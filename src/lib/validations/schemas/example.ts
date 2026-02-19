import { z } from "zod";

export const createExampleSchema = z.object({
	name: z.string().min(1).max(255),
	slug: z
		.string()
		.min(1)
		.max(255)
		.regex(/^[a-z0-9-]+$/),
	isActive: z.boolean().optional().default(true),
});

export const updateExampleSchema = createExampleSchema.partial();

export type CreateExampleInput = z.infer<typeof createExampleSchema>;
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>;
