import { z } from "zod";

const clientSchema = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const serverSchema = z.object({
	DATABASE_URL: z.string().url().optional(),
});

export const envSchema = clientSchema.merge(serverSchema);
export type EnvClient = z.infer<typeof clientSchema>;

let cached: EnvClient | null = null;

export function env(): EnvClient {
	if (cached) return cached;
	const parsed = clientSchema.safeParse({
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	});
	if (!parsed.success) {
		throw new Error(
			"Invalid client environment variables. Check NEXT_PUBLIC_SUPABASE_*.",
		);
	}
	cached = parsed.data;
	return cached;
}
