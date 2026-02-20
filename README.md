# Next Architecture

## Setup

### 1. Clone & install

```bash
git clone <repository-url>
cd ramadhan2026
pnpm install
```

### 2. Environment

Copy the sample env file for your environment:

```bash
# Development
cp .env.development.sample .env.development

# Or for staging/production
cp .env.staging.sample .env.staging
cp .env.production.sample .env.production
```

Edit the env file and fill in the real values:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (Dashboard → Project Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `DATABASE_URL` | Postgres connection string (Supabase: Project Settings → Database → Connection string → **URI**, use pooler mode) |

For local development, you can use a single `.env.local` file in the project root (Next.js loads it automatically):

```bash
cp .env.development.sample .env.local
# Then edit .env.local
```

### 3. Run the dev server

```bash
pnpm run dev
```

Open http://localhost:3000

---

## Database (Drizzle + Supabase)

This project uses **Drizzle ORM** with **Supabase (Postgres)**. Schema and migrations live in `src/lib/db/`.

### Prerequisites

- `DATABASE_URL` is set in your env (Supabase connection string, pooler).
- A Supabase project is created.

### Structure

```
src/lib/db/
├── index.ts          # db instance (import { db } from "@/lib/db")
├── schema/           # Table definitions (.ts)
│   ├── index.ts      # Export all schemas
│   └── example.ts    # Example table
└── migrations/      # Generated output (SQL files, do not edit manually)
```

### Adding or changing tables

1. **Create or edit a schema file** in `src/lib/db/schema/`, e.g. `src/lib/db/schema/users.ts`:

```ts
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
```

2. **Export it** in `src/lib/db/schema/index.ts`:

```ts
export * from "./example";
export * from "./users";
```

3. **Generate a migration** (creates SQL files in `src/lib/db/migrations/`):

```bash
pnpm db:generate
```

Follow the prompt to name the migration (e.g. `add_users_table`).

4. **Run the migration** against your database:

```bash
pnpm db:migrate
```

Your new or updated tables will then be in Supabase.

### Database scripts

| Command | Description |
|---------|-------------|
| `pnpm db:generate` | Generate migration files from schema (does not apply to DB) |
| `pnpm db:migrate` | Run pending migrations |
| `pnpm db:studio` | Open Drizzle Studio (GUI to inspect data and schema) |

### Using the db in code (server only)

```ts
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

// Example query
const allUsers = await db.select().from(users);
```
