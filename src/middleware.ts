import { PATH } from "@/shared/path";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = [PATH.LOGIN, PATH.SIGNUP];
const PROTECTED_PREFIXES = ["/dashboard", "/activities", "/guard"];

function isAuthRoute(pathname: string) {
	return AUTH_ROUTES.some(
		(r) => pathname === r || pathname.startsWith(`${r}/`),
	);
}

function isProtectedRoute(pathname: string) {
	return PROTECTED_PREFIXES.some(
		(p) => pathname === p || pathname.startsWith(`${p}/`),
	);
}

export async function middleware(request: NextRequest) {
	const response = NextResponse.next({ request });
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !anonKey) return response;
	const supabase = createServerClient(url, anonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				for (const { name, value } of cookiesToSet) {
					response.cookies.set(name, value);
				}
			},
		},
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (isProtectedRoute(request.nextUrl.pathname) && !user) {
		const url = request.nextUrl.clone();
		url.pathname = PATH.LOGIN;
		url.searchParams.set("next", request.nextUrl.pathname);
		return NextResponse.redirect(url);
	}

	if (isAuthRoute(request.nextUrl.pathname) && user) {
		const url = request.nextUrl.clone();
		url.pathname = PATH.PRIVATE;
		return NextResponse.redirect(url);
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
