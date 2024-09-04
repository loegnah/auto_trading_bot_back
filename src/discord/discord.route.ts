import { InteractionResponseType } from "discord-interactions";
import { Hono } from "hono";
import { discordVerify } from "@/discord/discord.middle";

export const discordRoute = new Hono();

discordRoute.use(discordVerify).post("/interactions", async (c) => {
  return c.json({ type: InteractionResponseType.PONG });
});
