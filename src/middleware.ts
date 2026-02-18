// import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- signature Next.js membutuhkan parameter request
export async function middleware(request: NextRequest) {
	return NextResponse.next();
}

export const config = {
	matcher: ["/guard/:path*", "/contact"],
};
