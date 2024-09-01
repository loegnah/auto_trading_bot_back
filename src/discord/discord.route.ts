import { Hono } from 'hono';
import { discordVerify } from './discord.middle';
import { InteractionResponseType } from 'discord-interactions';

export const discordRoute = new Hono();

discordRoute.use(discordVerify).post('/interactions', async (c) => {
  return c.json({ type: InteractionResponseType.PONG });
});
