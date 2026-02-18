import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error(
		"DATABASE_URL is not set. Add it to .env for Drizzle (Supabase connection string).",
	);
}

/**
 * Postgres client dengan prepare: false untuk Supabase Connection Pooler
 * (Transaction mode). Untuk Session mode bisa pakai prepare: true.
 */
const client = postgres(connectionString, { prepare: false });

/**
 * Drizzle instance — hanya dipakai di server (RSC, Route Handlers, Server Actions).
 * Import: import { db } from "@/lib/db";
 */
export const db = drizzle(client, { schema });
