import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Create the connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

// Export the schema for use in other files
export { profilesTable } from "./schema";
