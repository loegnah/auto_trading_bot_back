import { Hono } from 'hono';
import { InteractionResponseType } from 'discord-interactions';
import { discordVerify } from '@/discord/discord.middle';

export const discordRoute = new Hono();

discordRoute.use(discordVerify).post('/interactions', async (c) => {
  return c.json({ type: InteractionResponseType.PONG });
});
