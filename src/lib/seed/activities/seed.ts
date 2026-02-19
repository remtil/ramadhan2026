import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { activities } from "@/lib/db/schema";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL not set");
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);
const dummyActivities = [
    {
        title: "Morning Focus",
        description: "Complete 30 minutes of deep, uninterrupted work.",
        points: 10,
        icon: "🌅",
        type: "daily" as const,
    },
    {
        title: "Read a Chapter",
        description: "Read at least one chapter of a non-fiction book.",
        points: 15,
        icon: "📚",
        type: "daily" as const,
    },
    {
        title: "Hydration Goal",
        description: "Drink 2 liters of water today.",
        points: 5,
        icon: "💧",
        type: "daily" as const,
    },
    {
        title: "Inbox Zero",
        description: "Clear out all pending emails and messages.",
        points: 20,
        icon: "📨",
        type: "optional" as const,
    },
];

async function seed() {
    console.log("🌱 Seeding database...");
    try {
        await db.insert(activities).values(dummyActivities);
        console.log("Seeding complete!");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        process.exit(0);
    }
}

seed();