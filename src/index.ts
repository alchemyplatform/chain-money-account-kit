import "dotenv/config";
import postgres from "postgres";

// Create the postgres connection
const client = postgres(process.env.DATABASE_URL!);

async function main() {
  try {
    // do some stuff with the db
  } finally {
    // Close the database connection
    await client.end();
    console.log("Database connection closed!");
  }
}

main();
