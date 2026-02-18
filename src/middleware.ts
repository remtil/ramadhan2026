// import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth dinonaktifkan sementara — semua halaman bisa diakses tanpa login
export async function middleware(request: NextRequest) {
	return NextResponse.next();
}

export const config = {
	matcher: ["/guard/:path*", "/contact"],
};
