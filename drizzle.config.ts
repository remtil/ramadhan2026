import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error("DATABASE_URL is required for drizzle-kit. Add it to .env");
}

export default defineConfig({
	schema: "./src/lib/db/schema/index.ts",
	out: "./src/lib/db/migrations",
	dialect: "postgresql",
	dbCredentials: { url: connectionString },
});
