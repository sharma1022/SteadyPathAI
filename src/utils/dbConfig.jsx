import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://steady_path_db_owner:Yltes1RwgG9Q@ep-weathered-glitter-a6m6lptl.us-west-2.aws.neon.tech/steady_path_db?sslmode=require",
);
export const db = drizzle(sql, { schema });
