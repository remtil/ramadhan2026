"use client";

import { env } from "@/lib/env";
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
	return createBrowserClient(
		env().NEXT_PUBLIC_SUPABASE_URL,
		env().NEXT_PUBLIC_SUPABASE_ANON_KEY,
	);
}
