import { z } from 'zod';

// const booleanParser = z.coerce.string().transform((val) => val === 'true');

export const env = z
  .object({
    DISCORD_APP_ID: z.string(),
    DISCORD_TOKEN: z.string(),
    DISCORD_PUBLIC_KEY: z.string(),
  })
  .parse(process.env);
