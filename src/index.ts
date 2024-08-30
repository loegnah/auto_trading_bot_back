import { Hono } from 'hono';
import { connectDB } from './db';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { users } from './schema';

const app = new Hono();

async function main() {
  const db = connectDB();
  await migrate(db, { migrationsFolder: './drizzle' });

  app.get('/', (c) => {
    return c.text('Hello Hono!');
  });

  app.get('/db/test', async (c) => {
    const result = await db.select().from(users).all();
    console.log(result);
    return c.json({ result });
  });
}

main();
export default app;
