import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createSupabaseClient } from "@/lib/supabase.server";
import { PATH } from "@/shared/path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? PATH.PRIVATE;
	if (code) {
		const supabase = await createSupabaseClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				try {
					const displayName =
						(user.user_metadata?.full_name as string | undefined) ??
						(user.user_metadata?.name as string | undefined) ??
						null;
					const avatarUrl =
						(user.user_metadata?.avatar_url as string | undefined) ?? null;
					const email = (user.email ?? "").trim().toLowerCase();
					await db
						.insert(users)
						.values({
							id: user.id,
							email,
							displayName,
							avatarUrl,
						})
						.onConflictDoUpdate({
							target: users.id,
							set: {
								email,
								displayName: displayName ?? undefined,
								avatarUrl: avatarUrl ?? undefined,
								updatedAt: new Date(),
							},
						});
				} catch {
					// DB might be unavailable; continue with redirect
				}
			}
			return NextResponse.redirect(`${origin}${next}`);
		}
	}
	return NextResponse.redirect(`${origin}${PATH.LOGIN}?error=auth`);
}
