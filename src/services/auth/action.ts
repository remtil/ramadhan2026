"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createSupabaseClient } from "@/lib/supabase.server";
import { eq } from "drizzle-orm";

export async function signOut() {
	const supabase = await createSupabaseClient();
	await supabase.auth.signOut();
}

/** Cek apakah email sudah terdaftar (punya akun). Hanya yang terdaftar boleh sign in. */
export async function checkEmailRegistered(
	email: string,
): Promise<{ registered: boolean; error?: string }> {
	try {
		const normalized = email.trim().toLowerCase();
		const rows = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.email, normalized))
			.limit(1);
		return { registered: rows.length > 0 };
	} catch {
		// DB tidak tersedia: izinkan sign in agar app tetap bisa dipakai
		return { registered: true };
	}
}
