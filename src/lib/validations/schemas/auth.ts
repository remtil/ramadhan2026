import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().min(1, "Required").max(255),
	email: z.string().email(),
});

export const signInSchema = z.object({
	email: z.string().email(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
