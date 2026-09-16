import { Pool } from "pg";

export type DatabaseStatus = "ready" | "missing-url" | "unavailable";

export interface DatabaseState {
  status: DatabaseStatus;
  databaseName?: string;
  host?: string;
  serverVersion?: string;
}

let pool: Pool | undefined;

function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    return null;
  }
  pool ??= new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });
  return pool;
}

// Proves the managed connection described in the guide's "Database" section:
// DATABASE_URL is injected by the ApplicationStack, never by this repository.
export async function loadDatabaseState(): Promise<DatabaseState> {
  const client = getPool();
  if (!client) {
    return { status: "missing-url" };
  }
  const parsed = safeDatabaseUrl(process.env.DATABASE_URL ?? "");
  try {
    const result = await client.query<{ version: string }>(
      "SELECT split_part(version(), ' ', 2) AS version",
    );
    return {
      status: "ready",
      ...parsed,
      serverVersion: result.rows[0]?.version,
    };
  } catch {
    return { status: "unavailable", ...parsed };
  }
}

function safeDatabaseUrl(connectionString: string) {
  try {
    const parsed = new URL(connectionString);
    return {
      databaseName: parsed.pathname.replace(/^\//, "") || undefined,
      host: parsed.hostname || undefined,
    };
  } catch {
    return {};
  }
}
