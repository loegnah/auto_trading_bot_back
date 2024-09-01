import { Hono } from 'hono';
import { connectDB } from './db';
import { discordRoute } from '@/discord/discord.route';
// import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
// import { users } from './schema';

function runApp() {
  const app = new Hono();
  // const db = connectDB();
  // await migrate(db, { migrationsFolder: './drizzle' });

  app.route('/discord', discordRoute);

  // app.get('/db/test', async (c) => {
  //   const result = await db.select().from(users).all();
  //   console.log(result);
  //   return c.json({ result });
  // });
  return app;
}

export default runApp();
