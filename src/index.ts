import { Hono } from 'hono';
import { connectDB } from './db';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { users } from './schema';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
  verifyKey,
} from 'discord-interactions';
import { webcrypto } from 'node:crypto';

const app = new Hono();
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY as string;

async function main() {
  const db = connectDB();
  await migrate(db, { migrationsFolder: './drizzle' });

  app.get('/', (c) => {
    return c.text('Hello Hono!');
  });

  app
    .use(async (c, next) => {
      const signature = c.req.header('X-Signature-Ed25519') || '';
      const timestamp = c.req.header('X-Signature-Timestamp') || '';
      if (!signature || !timestamp) {
        console.error('No signature or timestamp');
        return c.status(401);
      }
      console.log('1');
      const body = (await c.req.raw.body?.getReader().read())?.value;
      if (!body) {
        console.error('No body');
        return c.status(401);
      }
      console.log('2');
      const isValid = await verifyKey(body as any, signature, timestamp, DISCORD_PUBLIC_KEY);
      if (!isValid) {
        // console.error('Invalid signature');
        c.status(401);
        return await next();
      }
      console.log('OK!');
      return await next();
    })
    .post('/interactions6', async (c) => {
      return c.json({ type: InteractionResponseType.PONG });
    });

  app.get('/db/test', async (c) => {
    const result = await db.select().from(users).all();
    console.log(result);
    return c.json({ result });
  });
}

main();
export default app;
