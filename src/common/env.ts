import { z } from "zod";
import { zBoolean } from "./validate";

export const env = z
  .object({
    DB_MIGRATION_DIR: z.string(),
    DB_URL: z.string(),

    DISCORD_APP_ID: z.string(),
    DISCORD_TOKEN: z.string(),
    DISCORD_PUBLIC_KEY: z.string(),

    BYBIT_API_KEY: z.string(),
    BYBIT_API_SECRET: z.string(),
    BYBIT_TESTNET: zBoolean(),
  })
  .parse(process.env);
