import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const neonConnctionString = import.meta.env.VITE_NEON_CONNECTION_STRING;

const sql = neon(neonConnctionString);
export const db = drizzle(sql, { schema });
