import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: PostgresJsDatabase<typeof schema> | null = null;

function getDb(): PostgresJsDatabase<typeof schema> {
	if (!_db) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) {
			throw new Error(
				"DATABASE_URL is not set. Add it to .env for Drizzle (Supabase connection string).",
			);
		}
		const client = postgres(connectionString, { prepare: false });
		_db = drizzle(client, { schema });
	}
	return _db;
}

export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
	get(_, prop) {
		return (getDb() as unknown as Record<string, unknown>)[prop as string];
	},
});
