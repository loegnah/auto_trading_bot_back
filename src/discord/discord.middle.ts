import { verifyKey } from 'discord-interactions';
import { Context, Next } from 'hono';

const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY as string;

export const discordVerify = async (c: Context, next: Next) => {
  const signature = c.req.header('X-Signature-Ed25519') || '';
  const timestamp = c.req.header('X-Signature-Timestamp') || '';
  const rawBody = (await c.req.raw.body?.getReader().read())?.value;
  if (!rawBody) {
    console.error('No body');
    return c.status(401);
  }
  const isValid = await verifyKey(rawBody as any, signature, timestamp, DISCORD_PUBLIC_KEY);
  if (!isValid) {
    c.status(401);
    return await next();
  }
  return await next();
};
