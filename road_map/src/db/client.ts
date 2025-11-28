//initialize database client

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);

// Drizzle client with schema included for types
export const db = drizzle(sql, { schema });
