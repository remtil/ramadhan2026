import { z } from "zod";

export const logActivitySchema = z.object({
    userId: z.string().uuid(),
    activityId: z.string().uuid(),
    localDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
});