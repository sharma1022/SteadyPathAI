const neonConnctionString = import.meta.env.VITE_NEON_CONNECTION_STRING;

export default {
    dialect: "postgresql",
    schema: "./src/utils/schema.jsx",
    out: "./drizzle",
    dbCredentials: {
      url: neonConnctionString,
      connectionString:
      neonConnctionString,
    },
  };