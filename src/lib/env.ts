import { z } from "zod";

// const booleanParser = z.coerce.string().transform((val) => val === 'true');

export const env = z
  .object({
    DB_DIR: z.string(),
    DB_FILE: z.string(),
    DB_MIGRATION_DIR: z.string(),

    DISCORD_APP_ID: z.string(),
    DISCORD_TOKEN: z.string(),
    DISCORD_PUBLIC_KEY: z.string(),

    BYBIT_API_KEY: z.string(),
    BYBIT_API_SECRET: z.string(),
  })
  .parse(process.env);
